import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { userStorage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { sendContactEmail } from "./email";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".bmp",
  ".svg",
  ".jfif",
  ".heic",
  ".heif",
  ".tif",
  ".tiff",
]);

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v", ".avi"]);
const MODEL_EXTENSIONS = new Set([".glb", ".gltf", ".obj", ".fbx", ".blend", ".stl", ".usdz"]);
const DOCUMENT_EXTENSIONS = new Set([".pdf", ".psd", ".ai", ".xd", ".fig"]);

const DESIGN_EXTENSIONS = new Set([
  ...IMAGE_EXTENSIONS,
  ...VIDEO_EXTENSIONS,
  ...MODEL_EXTENSIONS,
  ...DOCUMENT_EXTENSIONS,
]);

const WRITING_EXTENSIONS = new Set([".md", ".markdown", ".txt"]);

type WritingKind = "blog" | "writing";
type WritingStatus = "published" | "in-progress" | "draft";
type MediaType = "image" | "video" | "model" | "document" | "other";

interface MediaItem {
  id: string;
  title: string;
  url: string;
  relativePath: string;
  conceptKey: string;
  conceptName: string;
  updatedAt: number;
  mediaType: MediaType;
  extension: string;
}

interface MediaConcept {
  id: string;
  key: string;
  name: string;
  count: number;
  coverUrl: string | null;
  previewUrls: string[];
}

interface MediaManifest {
  folder: string;
  concepts: MediaConcept[];
  items: MediaItem[];
}

interface WritingEntry {
  id: string;
  slug: string;
  title: string;
  conceptKey: string;
  conceptName: string;
  kind: WritingKind;
  status: WritingStatus;
  publishedOn: string;
  publishedAt: number;
  readTime: string;
  excerpt: string;
  tags: string[];
  href?: string;
  sourceUrl: string;
  coverImage?: string;
}

interface WritingsManifest {
  folder: string;
  concepts: Array<{ id: string; key: string; name: string; count: number }>;
  entries: WritingEntry[];
}

function toPosixPath(value: string) {
  return value.split(path.sep).join("/");
}

function toTitleCase(value: string) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPublicUrl(relativePath: string) {
  return `/${toPosixPath(relativePath)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function resolvePublicRoot() {
  const candidates = [
    path.resolve(import.meta.dirname, "..", "client", "public"),
    path.resolve(import.meta.dirname, "public"),
  ];

  const existing = candidates.find((candidate) => fs.existsSync(candidate));
  return existing ?? candidates[0];
}

function safeResolveFolder(publicRoot: string, relativeFolder: string) {
  const resolved = path.resolve(publicRoot, relativeFolder);
  const normalizedRoot = path.resolve(publicRoot);
  if (!(resolved === normalizedRoot || resolved.startsWith(`${normalizedRoot}${path.sep}`))) {
    throw new Error("Invalid folder path");
  }
  return resolved;
}

function resolveContentFolder(publicRoot: string, candidates: string[]) {
  for (const candidate of candidates) {
    const absPath = safeResolveFolder(publicRoot, candidate);
    if (fs.existsSync(absPath)) {
      return { folder: candidate, absPath, exists: true };
    }
  }

  const fallbackFolder = candidates[0];
  return {
    folder: fallbackFolder,
    absPath: safeResolveFolder(publicRoot, fallbackFolder),
    exists: false,
  };
}

async function walkFilesRecursive(root: string): Promise<string[]> {
  if (!fs.existsSync(root)) return [];

  const files: string[] = [];
  const entries = await fsp.readdir(root, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      const nested = await walkFilesRecursive(fullPath);
      files.push(...nested);
      continue;
    }
    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function conceptFromPath(relativeToRoot: string) {
  const normalized = toPosixPath(relativeToRoot);
  const [firstSegment] = normalized.split("/");
  return normalized.includes("/") ? firstSegment : "general";
}

function conceptNameFromKey(key: string) {
  return key === "general" ? "General" : toTitleCase(key);
}

async function buildMediaManifest(
  publicRoot: string,
  folderCandidates: string[],
  options?: {
    allowedExtensions?: Set<string>;
    inferMediaType?: (extension: string) => MediaType;
  },
): Promise<MediaManifest> {
  const selectedFolder = resolveContentFolder(publicRoot, folderCandidates);
  if (!selectedFolder.exists) {
    return { folder: selectedFolder.folder, concepts: [], items: [] };
  }

  const topLevelEntries = await fsp.readdir(selectedFolder.absPath, { withFileTypes: true });
  const topLevelConcepts = topLevelEntries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  const allowedExtensions = options?.allowedExtensions ?? IMAGE_EXTENSIONS;
  const inferType =
    options?.inferMediaType ??
    ((extension: string): MediaType => (IMAGE_EXTENSIONS.has(extension) ? "image" : "other"));

  const allFiles = await walkFilesRecursive(selectedFolder.absPath);
  const mediaFiles = allFiles.filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return allowedExtensions.has(extension);
  });

  const items = (
    await Promise.all(
      mediaFiles.map(async (filePath): Promise<MediaItem | null> => {
        try {
          const stats = await fsp.stat(filePath);
          const extension = path.extname(filePath).toLowerCase();
          const relativeToPublic = path.relative(publicRoot, filePath);
          const relativeToFolder = path.relative(selectedFolder.absPath, filePath);
          const conceptKey = conceptFromPath(relativeToFolder);
          return {
            id: slugify(toPosixPath(relativeToFolder)),
            title: toTitleCase(path.basename(filePath)),
            url: toPublicUrl(relativeToPublic),
            relativePath: toPosixPath(relativeToFolder),
            conceptKey,
            conceptName: conceptNameFromKey(conceptKey),
            updatedAt: stats.mtimeMs,
            mediaType: inferType(extension),
            extension,
          };
        } catch {
          return null;
        }
      }),
    )
  ).filter((item): item is MediaItem => item !== null);

  items.sort((a, b) => b.updatedAt - a.updatedAt || a.title.localeCompare(b.title));

  const conceptsMap = new Map<string, MediaConcept>();
  for (const conceptFolder of topLevelConcepts) {
    const conceptName = conceptNameFromKey(conceptFolder);
    conceptsMap.set(conceptFolder, {
      id: slugify(conceptName) || conceptFolder,
      key: conceptFolder,
      name: conceptName,
      count: 0,
      coverUrl: null,
      previewUrls: [],
    });
  }

  for (const item of items) {
    const previewable = item.mediaType === "image" || item.mediaType === "video";
    const existing = conceptsMap.get(item.conceptKey);
    if (!existing) {
      conceptsMap.set(item.conceptKey, {
        id: slugify(item.conceptName) || item.conceptKey,
        key: item.conceptKey,
        name: item.conceptName,
        count: 1,
        coverUrl: previewable ? item.url : null,
        previewUrls: previewable ? [item.url] : [],
      });
      continue;
    }

    existing.count += 1;
    if (!existing.coverUrl && previewable) {
      existing.coverUrl = item.url;
    }
    if (previewable && existing.previewUrls.length < 4) {
      existing.previewUrls.push(item.url);
    }
  }

  const concepts = Array.from(conceptsMap.values()).sort((a, b) => {
    if (a.key === "general") return -1;
    if (b.key === "general") return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    folder: selectedFolder.folder,
    concepts,
    items,
  };
}

function inferDesignMediaType(extension: string): MediaType {
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  if (MODEL_EXTENSIONS.has(extension)) return "model";
  if (DOCUMENT_EXTENSIONS.has(extension)) return "document";
  return "other";
}

function normalizeReferenceUrl(value: string | undefined, relativeDirToPublic: string) {
  if (!value) return undefined;
  const cleaned = value.trim().replace(/^["']|["']$/g, "");
  if (!cleaned) return undefined;

  if (/^(https?:\/\/|mailto:|tel:)/i.test(cleaned)) return cleaned;
  if (cleaned.startsWith("/")) return cleaned;

  const relativeDir = toPosixPath(relativeDirToPublic);
  const normalized = path.posix.normalize(path.posix.join(relativeDir, cleaned));
  if (normalized.startsWith("..")) return undefined;

  return toPublicUrl(normalized);
}

function parseFrontMatter(raw: string) {
  const frontMatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!frontMatterMatch) {
    return { meta: {} as Record<string, string>, body: raw };
  }

  const [, block, body = ""] = frontMatterMatch;
  const meta: Record<string, string> = {};
  for (const line of block.split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (!key || !value) continue;
    meta[key] = value;
  }

  return { meta, body };
}

function stripMarkdown(text: string) {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)]\(([^)]+)\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/>\s?/g, "")
    .replace(/\r?\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeading(body: string) {
  const headingMatch = body.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : undefined;
}

function estimateReadTime(body: string) {
  const words = stripMarkdown(body).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function parsePublishedDate(value: string | undefined, fallback: Date) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function formatPublishedDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeKind(value: string | undefined, conceptKey: string): WritingKind {
  if (value === "blog" || value === "writing") return value;
  return conceptKey.includes("blog") ? "blog" : "writing";
}

function normalizeStatus(value: string | undefined): WritingStatus {
  if (value === "in-progress" || value === "draft" || value === "published") {
    return value;
  }
  return "published";
}

function parseTags(value: string | undefined) {
  if (!value) return [] as string[];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

async function buildWritingsManifest(
  publicRoot: string,
  folderCandidates: string[],
): Promise<WritingsManifest> {
  const selectedFolder = resolveContentFolder(publicRoot, folderCandidates);
  if (!selectedFolder.exists) {
    return { folder: selectedFolder.folder, concepts: [], entries: [] };
  }

  const topLevelEntries = await fsp.readdir(selectedFolder.absPath, { withFileTypes: true });
  const topLevelConcepts = topLevelEntries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  const allFiles = await walkFilesRecursive(selectedFolder.absPath);
  const writingFiles = allFiles.filter((filePath) =>
    WRITING_EXTENSIONS.has(path.extname(filePath).toLowerCase()),
  );

  const entries = (
    await Promise.all(
      writingFiles.map(async (filePath): Promise<WritingEntry | null> => {
        try {
          const [raw, stats] = await Promise.all([
            fsp.readFile(filePath, "utf-8"),
            fsp.stat(filePath),
          ]);

          const { meta, body } = parseFrontMatter(raw);
          const relativeToPublic = path.relative(publicRoot, filePath);
          const relativeToFolder = path.relative(selectedFolder.absPath, filePath);
          const relativeDirToPublic = path.dirname(relativeToPublic);
          const conceptKey = meta.collection
            ? slugify(meta.collection)
            : conceptFromPath(relativeToFolder);
          const conceptName = meta.collection ?? conceptNameFromKey(conceptKey);
          const title =
            meta.title ??
            extractHeading(body) ??
            toTitleCase(path.basename(filePath, path.extname(filePath)));

          const publishedDate = parsePublishedDate(meta.date, stats.mtime);
          const plainBody = stripMarkdown(body);
          const excerpt =
            meta.excerpt ??
            (plainBody.length > 300 ? `${plainBody.slice(0, 300).trimEnd()}...` : plainBody);

          return {
            id: slugify(toPosixPath(relativeToFolder)),
            slug: toPosixPath(relativeToFolder).replace(/\.[^.]+$/, ""),
            title,
            conceptKey,
            conceptName,
            kind: normalizeKind(meta.kind, conceptKey),
            status: normalizeStatus(meta.status),
            publishedOn: formatPublishedDate(publishedDate),
            publishedAt: publishedDate.getTime(),
            readTime: meta.readtime ?? meta["read_time"] ?? estimateReadTime(body),
            excerpt,
            tags: parseTags(meta.tags),
            href: normalizeReferenceUrl(meta.link ?? meta.url, relativeDirToPublic),
            sourceUrl: toPublicUrl(relativeToPublic),
            coverImage: normalizeReferenceUrl(
              meta.coverimage ?? meta["cover_image"],
              relativeDirToPublic,
            ),
          };
        } catch {
          return null;
        }
      }),
    )
  ).filter((entry): entry is WritingEntry => entry !== null);

  entries.sort((a, b) => b.publishedAt - a.publishedAt || a.title.localeCompare(b.title));

  const conceptsMap = new Map<string, { id: string; key: string; name: string; count: number }>();
  for (const conceptFolder of topLevelConcepts) {
    const conceptName = conceptNameFromKey(conceptFolder);
    conceptsMap.set(conceptFolder, {
      id: slugify(conceptName) || conceptFolder,
      key: conceptFolder,
      name: conceptName,
      count: 0,
    });
  }

  for (const entry of entries) {
    const concept = conceptsMap.get(entry.conceptKey);
    if (!concept) {
      conceptsMap.set(entry.conceptKey, {
        id: slugify(entry.conceptName) || entry.conceptKey,
        key: entry.conceptKey,
        name: entry.conceptName,
        count: 1,
      });
      continue;
    }
    concept.count += 1;
  }

  const concepts = Array.from(conceptsMap.values()).sort((a, b) => {
    if (a.key === "general") return -1;
    if (b.key === "general") return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    folder: selectedFolder.folder,
    concepts,
    entries,
  };
}


export async function registerRoutes(app: Express): Promise<Server> {
  // For this portfolio site, we're using static file serving
  // No special API routes are required
  
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Content management endpoints
  let siteContent = {
    intro: '',
    engineerDescription: '',
    developerDescription: '',
    designerDescription: '',
    technopreneurDescription: '',
    humanDescription: ''
  };

  app.get('/api/content', (_req, res) => {
    res.json(siteContent);
  });

  app.post('/api/content', (req, res) => {
    siteContent = { ...siteContent, ...req.body };
    res.json({ success: true });
  });

  app.get("/api/content/gallery", async (_req, res) => {
    try {
      const publicRoot = resolvePublicRoot();
      const manifest = await buildMediaManifest(publicRoot, ["gallery"], {
        allowedExtensions: IMAGE_EXTENSIONS,
        inferMediaType: () => "image",
      });
      res.json(manifest);
    } catch {
      res.status(500).json({ message: "Failed to load gallery content" });
    }
  });

  app.get("/api/content/designs", async (_req, res) => {
    try {
      const publicRoot = resolvePublicRoot();
      const manifest = await buildMediaManifest(publicRoot, [
        "creatives",
        "creative-designs",
        "designs",
        "creative-assets",
      ], {
        allowedExtensions: DESIGN_EXTENSIONS,
        inferMediaType: inferDesignMediaType,
      });
      res.json(manifest);
    } catch {
      res.status(500).json({ message: "Failed to load design content" });
    }
  });

  app.get("/api/content/writings", async (_req, res) => {
    try {
      const publicRoot = resolvePublicRoot();
      const manifest = await buildWritingsManifest(publicRoot, [
        "writings",
        "blog-writings",
        "posts",
        "blog",
      ]);
      res.json(manifest);
    } catch {
      res.status(500).json({ message: "Failed to load writing content" });
    }
  });


  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const contactSubmission = await userStorage.createContactSubmission(validatedData);
      
      await sendContactEmail(validatedData);
      
      res.json({ success: true, data: contactSubmission });
    } catch (error: any) {
      if (error.name === "ZodError") {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed", 
          details: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          error: "Failed to submit contact form" 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
