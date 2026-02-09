import type { Express } from "express";
import { createServer, type Server } from "http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { contactStorage } from "./storage";
import { insertContactSchema, type Project } from "@shared/schema";
import { projects as manualProjects } from "@shared/projects";
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

const DESIGN_EXTENSIONS = new Set<string>();
Array.from(IMAGE_EXTENSIONS).forEach((extension) => DESIGN_EXTENSIONS.add(extension));
Array.from(VIDEO_EXTENSIONS).forEach((extension) => DESIGN_EXTENSIONS.add(extension));
Array.from(MODEL_EXTENSIONS).forEach((extension) => DESIGN_EXTENSIONS.add(extension));
Array.from(DOCUMENT_EXTENSIONS).forEach((extension) => DESIGN_EXTENSIONS.add(extension));

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

type ProjectSourceMode = "manual" | "github" | "hybrid";
type RepoVisibility = "public" | "all";
type ProjectStatus = Exclude<Project["status"], undefined>;

interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  open_issues_count: number;
  fork: boolean;
  private?: boolean;
  archived?: boolean;
  updated_at: string;
  pushed_at: string;
  owner: {
    login: string;
  };
}

const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_GITHUB_USERNAME = "elvin2words";
const DEFAULT_SOURCE_MODE: ProjectSourceMode = "hybrid";
const DEFAULT_VISIBILITY: RepoVisibility = "public";
const DEFAULT_MAX_REPOS = 30;

const STATUS_TOPICS: Record<ProjectStatus, string[]> = {
  beta: ["beta"],
  shipped: ["shipped", "production", "prod", "live"],
  "r-and-d": ["r-and-d", "rnd", "research", "research-and-development"],
  "in-prototype": ["in-prototype", "prototype", "proto", "mvp"],
};

const CATEGORY_TOPIC_KEYWORDS: Record<string, string[]> = {
  ecommerce: ["ecommerce", "shop", "store", "commerce", "marketplace"],
  dashboard: ["dashboard", "analytics", "monitoring", "admin", "insights"],
  corporate: ["corporate", "business", "company", "landing-page"],
  portfolio: ["portfolio", "personal-site", "resume", "showcase"],
};

const PROJECT_CATEGORY_PREFERENCE = ["corporate", "ecommerce", "dashboard", "portfolio"];
const PROJECT_SOURCE_MODES = new Set<ProjectSourceMode>(["manual", "github", "hybrid"]);
const PROJECT_VISIBILITIES = new Set<RepoVisibility>(["public", "all"]);
const NOISY_TOPIC_TOKENS = new Set([
  "featured",
  "portfolio",
  "corporate",
  "dashboard",
  "ecommerce",
  "status-beta",
  "status-shipped",
  "status-r-and-d",
  "status-in-prototype",
  "beta",
  "shipped",
  "prototype",
  "in-prototype",
  "r-and-d",
  "rnd",
  "research",
  "research-and-development",
  "mvp",
  "prod",
  "production",
  "live",
]);

const SPECIAL_TECH_LABELS: Record<string, string> = {
  js: "JavaScript",
  ts: "TypeScript",
  node: "Node.js",
  nodejs: "Node.js",
  "next-js": "Next.js",
  nextjs: "Next.js",
  reactjs: "React",
  csharp: "C#",
  cpp: "C++",
  ai: "AI",
  llm: "LLM",
  ui: "UI",
  ux: "UX",
  mongodb: "MongoDB",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  firebase: "Firebase",
  fastapi: "FastAPI",
};

function normalizeExternalUrl(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed || trimmed === "#") return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith("www.")) return `https://${trimmed}`;
  return undefined;
}

function normalizeProjectImage(image: string) {
  if (!image) return "/projects/codecircle.png";
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("/")) {
    return image;
  }
  const stripped = image
    .replace(/^(\.\.\/)+client\/public\//, "")
    .replace(/^client\/public\//, "")
    .replace(/^\/+/, "");
  return stripped ? `/${stripped}` : "/projects/codecircle.png";
}

function parseProjectSource(raw: unknown, fallback: ProjectSourceMode) {
  const value = typeof raw === "string" ? raw.toLowerCase().trim() : "";
  return PROJECT_SOURCE_MODES.has(value as ProjectSourceMode)
    ? (value as ProjectSourceMode)
    : fallback;
}

function parseRepoVisibility(raw: unknown, fallback: RepoVisibility) {
  const value = typeof raw === "string" ? raw.toLowerCase().trim() : "";
  return PROJECT_VISIBILITIES.has(value as RepoVisibility)
    ? (value as RepoVisibility)
    : fallback;
}

function parseBoolean(raw: unknown, fallback: boolean) {
  if (typeof raw !== "string") return fallback;
  const value = raw.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(value)) return true;
  if (["0", "false", "no", "off"].includes(value)) return false;
  return fallback;
}

function parsePositiveInt(raw: unknown, fallback: number) {
  const value = typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function parseCsvSet(raw: unknown) {
  if (typeof raw !== "string") return new Set<string>();
  return new Set(
    raw
      .split(",")
      .map((part) => part.trim().toLowerCase())
      .filter(Boolean),
  );
}

function prettifyTopic(token: string) {
  const direct = SPECIAL_TECH_LABELS[token];
  if (direct) return direct;

  return token
    .split(/[-_]+/)
    .map((part) => {
      const mapped = SPECIAL_TECH_LABELS[part];
      if (mapped) return mapped;
      return part ? part.charAt(0).toUpperCase() + part.slice(1) : "";
    })
    .join(" ")
    .trim();
}

function inferProjectStatus(topics: string[]): ProjectStatus {
  const topicSet = new Set(topics);
  const explicit = topics.find((topic) => topic.startsWith("status-"));
  if (explicit) {
    const value = explicit.slice("status-".length);
    if (value === "beta") return "beta";
    if (value === "shipped") return "shipped";
    if (value === "r-and-d") return "r-and-d";
    if (value === "in-prototype") return "in-prototype";
  }

  if (STATUS_TOPICS.shipped.some((value) => topicSet.has(value))) return "shipped";
  if (STATUS_TOPICS.beta.some((value) => topicSet.has(value))) return "beta";
  if (STATUS_TOPICS["in-prototype"].some((value) => topicSet.has(value))) return "in-prototype";
  if (STATUS_TOPICS["r-and-d"].some((value) => topicSet.has(value))) return "r-and-d";

  return "in-prototype";
}

function inferProjectCategory(topics: string[]) {
  const topicSet = new Set(topics);
  for (const category of PROJECT_CATEGORY_PREFERENCE) {
    const keywords = CATEGORY_TOPIC_KEYWORDS[category] ?? [];
    if (keywords.some((keyword) => topicSet.has(keyword))) {
      return category;
    }
  }
  return "portfolio";
}

function extractTechnologies(language: string | null, topics: string[]) {
  const technologies: string[] = [];
  const seen = new Set<string>();

  const addTech = (value?: string | null) => {
    if (!value) return;
    const normalized = value.trim();
    if (!normalized) return;
    const key = normalized.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    technologies.push(normalized);
  };

  if (language) addTech(language);

  for (const topic of topics) {
    if (NOISY_TOPIC_TOKENS.has(topic)) continue;
    if (topic.startsWith("status-")) continue;
    const pretty = prettifyTopic(topic);
    if (!pretty) continue;
    addTech(pretty);
    if (technologies.length >= 8) break;
  }

  return technologies.length > 0 ? technologies : ["TypeScript", "React"];
}

function buildFeatureHints(topics: string[]) {
  const hints = topics
    .filter((topic) => !topic.startsWith("status-"))
    .filter((topic) => !NOISY_TOPIC_TOKENS.has(topic))
    .slice(0, 5)
    .map((topic) => `Implements ${prettifyTopic(topic)} patterns`);

  return hints.length > 0 ? hints : undefined;
}

function isFeaturedRepo(repo: GithubRepo, featuredRepos: Set<string>) {
  const topicSet = new Set((repo.topics ?? []).map((topic) => topic.toLowerCase()));
  if (topicSet.has("featured")) return true;
  if (featuredRepos.size === 0) return false;
  return featuredRepos.has(repo.name.toLowerCase()) || featuredRepos.has(repo.full_name.toLowerCase());
}

function mapGithubRepoToProject(repo: GithubRepo, featuredRepos: Set<string>): Project {
  const normalizedTopics = (repo.topics ?? []).map((topic) => topic.toLowerCase());
  const featured = isFeaturedRepo(repo, featuredRepos);
  const status = inferProjectStatus(normalizedTopics);
  const category = inferProjectCategory(normalizedTopics);
  const starsBadge = repo.stargazers_count > 0 ? `${repo.stargazers_count} stars` : undefined;
  const badges = [featured ? "Featured" : undefined, "GitHub Sync", starsBadge, repo.archived ? "Archived" : undefined]
    .filter((value): value is string => Boolean(value));

  const pushedDate = new Date(repo.pushed_at || repo.updated_at);
  const projectTitle = toTitleCase(repo.name);
  const fullDescription =
    repo.description?.trim() ||
    `GitHub repository ${repo.full_name} maintained by ${repo.owner.login}.`;

  return {
    id: slugify(`gh-${repo.owner.login}-${repo.name}`),
    title: projectTitle,
    description: repo.description?.trim() || `${projectTitle} synced from GitHub.`,
    fullDescription: `${fullDescription} Last updated ${formatPublishedDate(pushedDate)}.`,
    image: `https://opengraph.githubassets.com/${repo.id}/${repo.full_name}`,
    technologies: extractTechnologies(repo.language, normalizedTopics),
    category,
    badges,
    status,
    source: "github",
    liveDemo: normalizeExternalUrl(repo.homepage ?? undefined),
    githubUrl: normalizeExternalUrl(repo.html_url),
    features: buildFeatureHints(normalizedTopics),
    repoName: repo.name,
    repoOwner: repo.owner.login,
  };
}

function normalizeManualProject(project: Project): Project {
  return {
    ...project,
    image: normalizeProjectImage(project.image),
    status: project.status ?? "in-prototype",
    source: "manual",
    liveDemo: normalizeExternalUrl(project.liveDemo),
    githubUrl: normalizeExternalUrl(project.githubUrl),
  };
}

function buildCategoryList(projects: Project[]) {
  const categories = Array.from(
    new Set(
      projects
        .map((project) => project.category?.toLowerCase().trim())
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort((a, b) => a.localeCompare(b));

  return ["all", ...categories];
}

async function fetchGithubRepos(options: {
  username: string;
  visibility: RepoVisibility;
  token?: string;
  includeForks: boolean;
  maxRepos: number;
}) {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "mps-portfolio",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const repos: GithubRepo[] = [];
  const perPage = Math.min(100, options.maxRepos);
  let page = 1;

  while (repos.length < options.maxRepos) {
    const endpoint =
      options.token && options.visibility === "all"
        ? `/user/repos?sort=updated&type=owner&per_page=${perPage}&page=${page}`
        : `/users/${encodeURIComponent(options.username)}/repos?sort=updated&type=${
            options.visibility === "all" ? "owner" : "public"
          }&per_page=${perPage}&page=${page}`;

    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      const details = (await response.text()).slice(0, 220);
      throw new Error(`GitHub sync failed (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as GithubRepo[];
    if (!Array.isArray(payload) || payload.length === 0) break;

    for (const repo of payload) {
      if (!options.includeForks && repo.fork) continue;
      if (options.visibility === "public" && repo.private) continue;
      repos.push(repo);
      if (repos.length >= options.maxRepos) break;
    }

    if (payload.length < perPage) break;
    page += 1;
  }

  return repos;
}

type AiReferenceType = "page" | "project" | "writing" | "gallery" | "design" | "external";
type AiChatRole = "user" | "assistant";
type EddyPayloadMode = "chat" | "search";

interface AiSearchReference {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  sourceType: AiReferenceType;
  score: number;
}

interface AiSearchDocument extends AiSearchReference {
  keywords: string[];
  content: string;
}

interface AiChatHistoryMessage {
  role: AiChatRole;
  content: string;
}

interface EddyResult {
  reply: string;
  references: AiSearchReference[];
}

interface EddyBackendConfig {
  endpoint: string;
  apiKey?: string;
  authHeader: string;
  model?: string;
  timeoutMs: number;
  mode: "generic" | "openai";
}

const AI_INDEX_TTL_MS = 5 * 60 * 1000;
const DEFAULT_AI_LIMIT = 8;
const MAX_AI_LIMIT = 12;
const DEFAULT_EDDY_TIMEOUT_MS = 20_000;
const DEFAULT_AI_SYSTEM_PROMPT =
  "You are Elvin's portfolio AI assistant. Answer clearly, keep it practical, and cite relevant links when possible.";

const STATIC_AI_PAGES: Array<{
  title: string;
  url: string;
  excerpt: string;
  sourceType: AiReferenceType;
  keywords: string[];
}> = [
  {
    title: "Home",
    url: "/",
    excerpt:
      "Main introduction to Elvin Mazwimairi with links to engineering, development, creative work, services, and contact.",
    sourceType: "page",
    keywords: ["home", "overview", "elvin", "intro", "portfolio"],
  },
  {
    title: "Engineer Circle",
    url: "/engineer",
    excerpt:
      "Electrical engineering journey, projects, technical skills, certifications, and professional path.",
    sourceType: "page",
    keywords: ["engineer", "electrical", "power", "energy", "systems"],
  },
  {
    title: "Developer Circle",
    url: "/developer",
    excerpt:
      "Full stack development profile, architecture approach, backend logic, and software project highlights.",
    sourceType: "page",
    keywords: ["developer", "software", "full stack", "backend", "frontend", "code"],
  },
  {
    title: "Creative Circle",
    url: "/creative",
    excerpt:
      "Creative technologist profile with process philosophy, design dimensions, and portfolio highlights.",
    sourceType: "page",
    keywords: ["creative", "design", "technologist", "visual", "portfolio"],
  },
  {
    title: "Design Portfolio",
    url: "/creative/portfolio",
    excerpt: "Creative portfolio and design-centric work collection from DesignCircle.",
    sourceType: "design",
    keywords: ["designcircle", "portfolio", "creative work", "showcase"],
  },
  {
    title: "Gallery",
    url: "/creative/gallery",
    excerpt: "Photography and media gallery collections grouped by concepts.",
    sourceType: "gallery",
    keywords: ["gallery", "photos", "photography", "creative assets", "media"],
  },
  {
    title: "Blog and Writings",
    url: "/creative/blog",
    excerpt: "Writing collection with blog posts, published notes, and long-form thought pieces.",
    sourceType: "writing",
    keywords: ["blog", "writings", "articles", "notes", "thoughts"],
  },
  {
    title: "Technopreneur Track",
    url: "/technopreneur",
    excerpt:
      "Business and innovation track for technology-driven ventures and product experimentation.",
    sourceType: "page",
    keywords: ["technopreneur", "business", "ventures", "innovation", "startup"],
  },
  {
    title: "Services and Hire",
    url: "/hire",
    excerpt: "Services, collaboration options, and engagement pathways for client work.",
    sourceType: "page",
    keywords: ["services", "hire", "work", "consulting", "collaboration"],
  },
  {
    title: "Resume",
    url: "/resume",
    excerpt: "Resume page with professional profile and downloadable CV.",
    sourceType: "page",
    keywords: ["resume", "cv", "experience", "profile"],
  },
  {
    title: "Contact Card",
    url: "/contact-profile-card",
    excerpt: "Profile contact card with methods to connect directly.",
    sourceType: "page",
    keywords: ["contact", "card", "email", "phone", "reach out"],
  },
];

let aiDocumentCache: { builtAt: number; docs: AiSearchDocument[] } | null = null;

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trimEnd()}...`;
}

function tokenizeForSearch(value: string) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length >= 2);
}

function normalizeSearchUrl(value: string) {
  const normalized = value.trim();
  if (!normalized) return "/";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(normalized)) return normalized;
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}

function inferReferenceTypeFromUrl(url: string): AiReferenceType {
  if (url.startsWith("http://") || url.startsWith("https://")) return "external";
  if (url.startsWith("/creative/blog") || url.startsWith("/blog") || url.includes("/writings/")) {
    return "writing";
  }
  if (url.startsWith("/creative/gallery") || url.startsWith("/gallery")) return "gallery";
  if (url.startsWith("/creative/portfolio") || url.startsWith("/design")) return "design";
  if (url.startsWith("/codecircle")) return "project";
  return "page";
}

function createAiDocument(input: {
  title: string;
  url: string;
  excerpt: string;
  sourceType: AiReferenceType;
  keywords?: string[];
  content?: string;
  id?: string;
}): AiSearchDocument {
  const title = normalizeText(input.title) || "Untitled";
  const url = normalizeSearchUrl(input.url);
  const excerpt = truncateText(normalizeText(input.excerpt), 320);
  const keywordBase = [
    ...tokenizeForSearch(title),
    ...tokenizeForSearch(excerpt),
    ...(input.keywords ?? []).map((keyword) => keyword.toLowerCase().trim()).filter(Boolean),
  ];
  const keywords = Array.from(new Set(keywordBase)).slice(0, 40);
  const content = truncateText(normalizeText(input.content ?? excerpt), 2500);
  const generatedId =
    slugify(`${input.sourceType}-${url}-${title}`) || slugify(`${title}-${url}`);
  const id = input.id ?? generatedId;

  return {
    id: id || `${input.sourceType}-${Date.now()}`,
    title,
    url,
    excerpt,
    sourceType: input.sourceType,
    score: 0,
    keywords,
    content,
  };
}

function dedupeAiDocuments(docs: AiSearchDocument[]) {
  const byKey = new Map<string, AiSearchDocument>();
  for (const doc of docs) {
    const key = `${doc.url.toLowerCase()}::${doc.title.toLowerCase()}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, doc);
      continue;
    }

    if ((doc.content?.length ?? 0) > (existing.content?.length ?? 0)) {
      byKey.set(key, doc);
    }
  }
  return Array.from(byKey.values());
}

function normalizeChatHistory(raw: unknown): AiChatHistoryMessage[] {
  if (!Array.isArray(raw)) return [];
  const normalized: AiChatHistoryMessage[] = [];

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const candidate = item as { role?: unknown; content?: unknown };
    if (candidate.role !== "user" && candidate.role !== "assistant") continue;
    if (typeof candidate.content !== "string") continue;
    const content = truncateText(normalizeText(candidate.content), 1800);
    if (!content) continue;

    normalized.push({ role: candidate.role, content });
    if (normalized.length >= 12) break;
  }

  return normalized.slice(-10);
}

function scoreAiDocument(query: string, doc: AiSearchDocument) {
  const normalizedQuery = normalizeText(query).toLowerCase();
  const tokens = tokenizeForSearch(query);
  if (tokens.length === 0) return 0;

  const title = doc.title.toLowerCase();
  const excerpt = doc.excerpt.toLowerCase();
  const content = doc.content.toLowerCase();
  const keywordBlob = ` ${doc.keywords.join(" ")} `;

  let score = 0;
  for (const token of tokens) {
    if (title.includes(token)) score += 8;
    if (keywordBlob.includes(` ${token} `)) score += 6;
    if (excerpt.includes(token)) score += 4;
    if (content.includes(token)) score += 2;
    if (doc.url.toLowerCase().includes(token)) score += 1;
  }

  if (normalizedQuery.length > 3) {
    if (title.includes(normalizedQuery)) score += 14;
    if (excerpt.includes(normalizedQuery)) score += 8;
    if (content.includes(normalizedQuery)) score += 4;
  }

  return score;
}

function mergeReferencesByPriority(references: AiSearchReference[], limit: number) {
  const deduped = new Map<string, AiSearchReference>();
  for (const reference of references) {
    const key = `${reference.url.toLowerCase()}::${reference.title.toLowerCase()}`;
    if (!deduped.has(key)) {
      deduped.set(key, reference);
      continue;
    }

    const current = deduped.get(key);
    if (!current) continue;
    if (reference.score > current.score) {
      deduped.set(key, reference);
    }
  }

  return Array.from(deduped.values()).slice(0, limit);
}

function parseRequestedLimit(raw: unknown, fallback: number) {
  const parsed =
    typeof raw === "number"
      ? raw
      : typeof raw === "string"
        ? Number.parseInt(raw, 10)
        : Number.NaN;

  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(1, Math.min(MAX_AI_LIMIT, parsed));
}

function getEddyBackendConfig(): EddyBackendConfig | null {
  const endpoint = process.env.EDDY_AI_BACKEND_URL?.trim();
  if (!endpoint) return null;

  const modeRaw = process.env.EDDY_AI_MODE?.trim().toLowerCase();
  const endpointSuggestsOpenAi = /\/v\d+\/chat\/completions/i.test(endpoint) || /chat\/completions/i.test(endpoint);
  const mode: EddyBackendConfig["mode"] =
    modeRaw === "openai" || endpointSuggestsOpenAi ? "openai" : "generic";

  return {
    endpoint,
    apiKey: process.env.EDDY_AI_API_KEY?.trim(),
    authHeader: process.env.EDDY_AI_AUTH_HEADER?.trim() || "Authorization",
    model: process.env.EDDY_AI_MODEL?.trim() || undefined,
    timeoutMs: parsePositiveInt(process.env.EDDY_AI_TIMEOUT_MS, DEFAULT_EDDY_TIMEOUT_MS),
    mode,
  };
}

function getAiSystemPrompt() {
  const fromEnv = process.env.EDDY_AI_SYSTEM_PROMPT?.trim();
  return fromEnv || DEFAULT_AI_SYSTEM_PROMPT;
}

function serializeReferencesForPrompt(references: AiSearchReference[]) {
  if (references.length === 0) return "No references available.";
  return references
    .map((reference, index) => {
      const excerpt = truncateText(reference.excerpt, 220);
      return `${index + 1}. ${reference.title} (${reference.url}) - ${excerpt}`;
    })
    .join("\n");
}

function extractReplyText(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const data = payload as Record<string, unknown>;

  const directCandidates = [
    data.reply,
    data.answer,
    data.message,
    data.text,
    data.output,
    data.output_text,
    (data.result as Record<string, unknown> | undefined)?.reply,
    (data.result as Record<string, unknown> | undefined)?.text,
  ];
  for (const candidate of directCandidates) {
    if (typeof candidate === "string") {
      const text = normalizeText(candidate);
      if (text) return text;
    }
  }

  const choices = Array.isArray(data.choices) ? data.choices : [];
  if (choices.length > 0) {
    const firstChoice = choices[0] as Record<string, unknown>;
    const choiceText = firstChoice?.text;
    if (typeof choiceText === "string" && normalizeText(choiceText)) {
      return normalizeText(choiceText);
    }

    const message = firstChoice?.message as Record<string, unknown> | undefined;
    const messageContent = message?.content;
    if (typeof messageContent === "string" && normalizeText(messageContent)) {
      return normalizeText(messageContent);
    }

    if (Array.isArray(messageContent)) {
      const parts = messageContent
        .map((entry) => {
          if (!entry || typeof entry !== "object") return "";
          const chunk = entry as Record<string, unknown>;
          const text = chunk.text;
          return typeof text === "string" ? text : "";
        })
        .filter(Boolean);
      if (parts.length > 0) {
        return normalizeText(parts.join(" "));
      }
    }
  }

  return undefined;
}

function normalizeReferenceCandidate(candidate: unknown): AiSearchReference | null {
  if (!candidate) return null;

  if (typeof candidate === "string") {
    const maybeUrl = candidate.trim();
    if (!maybeUrl) return null;
    return {
      id: slugify(`external-${maybeUrl}`) || maybeUrl,
      title: maybeUrl,
      url: normalizeSearchUrl(maybeUrl),
      excerpt: "External reference",
      sourceType: inferReferenceTypeFromUrl(maybeUrl),
      score: 0,
    };
  }

  if (typeof candidate !== "object") return null;
  const record = candidate as Record<string, unknown>;
  const urlRaw = record.url ?? record.href ?? record.link;
  if (typeof urlRaw !== "string" || !urlRaw.trim()) return null;

  const url = normalizeSearchUrl(urlRaw);
  const titleRaw = record.title ?? record.name ?? record.label ?? url;
  const excerptRaw = record.excerpt ?? record.summary ?? record.snippet ?? record.description ?? "";
  const sourceTypeRaw = record.sourceType;
  const sourceType =
    sourceTypeRaw === "page" ||
    sourceTypeRaw === "project" ||
    sourceTypeRaw === "writing" ||
    sourceTypeRaw === "gallery" ||
    sourceTypeRaw === "design" ||
    sourceTypeRaw === "external"
      ? sourceTypeRaw
      : inferReferenceTypeFromUrl(url);
  const scoreRaw = record.score;
  const score =
    typeof scoreRaw === "number"
      ? scoreRaw
      : typeof scoreRaw === "string"
        ? Number.parseFloat(scoreRaw)
        : 0;

  return {
    id: slugify(`ref-${url}-${String(titleRaw)}`) || slugify(url) || url,
    title: normalizeText(String(titleRaw)) || url,
    url,
    excerpt: truncateText(normalizeText(String(excerptRaw)), 320) || "Referenced source",
    sourceType,
    score: Number.isFinite(score) ? score : 0,
  };
}

function extractReferencesFromPayload(payload: unknown): AiSearchReference[] {
  if (!payload || typeof payload !== "object") return [];
  const data = payload as Record<string, unknown>;
  const result = data.result as Record<string, unknown> | undefined;

  const candidates = [
    data.references,
    data.sources,
    data.citations,
    data.results,
    result?.references,
    result?.sources,
    result?.citations,
  ];

  for (const candidate of candidates) {
    if (!Array.isArray(candidate)) continue;
    const normalized = candidate
      .map((entry) => normalizeReferenceCandidate(entry))
      .filter((entry): entry is AiSearchReference => entry !== null);

    if (normalized.length > 0) return normalized;
  }

  return [];
}

async function callEddyBackend(options: {
  mode: EddyPayloadMode;
  query: string;
  history: AiChatHistoryMessage[];
  references: AiSearchReference[];
}): Promise<EddyResult | null> {
  const config = getEddyBackendConfig();
  if (!config) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (config.apiKey) {
      const authValue =
        config.authHeader.toLowerCase() === "authorization" &&
        !config.apiKey.toLowerCase().startsWith("bearer ")
          ? `Bearer ${config.apiKey}`
          : config.apiKey;
      headers[config.authHeader] = authValue;
    }

    const contextRefs = serializeReferencesForPrompt(options.references);
    const systemPrompt = getAiSystemPrompt();
    const payload =
      config.mode === "openai"
        ? {
            model: config.model || "gpt-4.1-mini",
            temperature: 0.2,
            messages: [
              {
                role: "system",
                content: systemPrompt,
              },
              {
                role: "system",
                content: `Relevant site references:\n${contextRefs}`,
              },
              ...options.history.map((entry) => ({
                role: entry.role,
                content: entry.content,
              })),
              {
                role: "user",
                content: options.query,
              },
            ],
          }
        : {
            mode: options.mode,
            query: options.query,
            model: config.model,
            systemPrompt,
            history: options.history,
            context: {
              site: "Elvin Mazwimairi Portfolio",
              referencesText: contextRefs,
              references: options.references,
            },
          };

    const response = await fetch(config.endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const body = (await response.json()) as unknown;
    const reply = extractReplyText(body);
    if (!reply) return null;

    return {
      reply,
      references: extractReferencesFromPayload(body),
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function buildAiSearchDocuments() {
  const staticDocs = STATIC_AI_PAGES.map((page) =>
    createAiDocument({
      title: page.title,
      url: page.url,
      excerpt: page.excerpt,
      sourceType: page.sourceType,
      keywords: page.keywords,
      content: `${page.excerpt} ${page.keywords.join(" ")}`,
    }),
  );

  const projectDocs = manualProjects.map((project) =>
    createAiDocument({
      title: project.title,
      url: project.githubUrl || project.liveDemo || "/codecircle/portfolio",
      excerpt: project.description,
      sourceType: "project",
      keywords: [
        "project",
        project.category,
        ...(project.technologies ?? []),
        ...(project.badges ?? []),
      ],
      content: [
        project.description,
        project.fullDescription,
        ...(project.features ?? []),
        project.challenges,
        project.outcome,
      ]
        .filter(Boolean)
        .join(" "),
    }),
  );

  const publicRoot = resolvePublicRoot();
  const docs: AiSearchDocument[] = [...staticDocs, ...projectDocs];

  try {
    const writings = await buildWritingsManifest(publicRoot, ["writings", "blog-writings", "posts", "blog"]);
    for (const entry of writings.entries.slice(0, 80)) {
      docs.push(
        createAiDocument({
          title: entry.title,
          url: entry.href || "/creative/blog",
          excerpt: entry.excerpt,
          sourceType: "writing",
          keywords: [
            "writing",
            "blog",
            entry.kind,
            entry.status,
            entry.conceptName,
            ...entry.tags,
          ],
          content: `${entry.title} ${entry.excerpt} ${entry.tags.join(" ")}`,
        }),
      );
    }
  } catch {
    // Ignore dynamic writing indexing failures and keep static search available.
  }

  try {
    const gallery = await buildMediaManifest(publicRoot, ["gallery"], {
      allowedExtensions: IMAGE_EXTENSIONS,
      inferMediaType: () => "image",
    });

    for (const concept of gallery.concepts) {
      docs.push(
        createAiDocument({
          title: `${concept.name} Gallery`,
          url: "/creative/gallery",
          excerpt: `${concept.count} gallery item(s) in ${concept.name}.`,
          sourceType: "gallery",
          keywords: ["gallery", "photo", "photography", concept.key, concept.name],
          content: `${concept.name} gallery with ${concept.count} item(s).`,
        }),
      );
    }
  } catch {
    // Ignore gallery indexing failures and keep static search available.
  }

  try {
    const designs = await buildMediaManifest(publicRoot, ["creatives", "creative-designs", "designs", "creative-assets"], {
      allowedExtensions: DESIGN_EXTENSIONS,
      inferMediaType: inferDesignMediaType,
    });

    for (const concept of designs.concepts) {
      docs.push(
        createAiDocument({
          title: `${concept.name} Design Collection`,
          url: "/creative/portfolio",
          excerpt: `${concept.count} design asset(s) in ${concept.name}.`,
          sourceType: "design",
          keywords: ["design", "creative", concept.key, concept.name],
          content: `${concept.name} design concept with ${concept.count} asset(s).`,
        }),
      );
    }
  } catch {
    // Ignore design indexing failures and keep static search available.
  }

  return dedupeAiDocuments(docs);
}

async function getAiSearchDocuments() {
  const now = Date.now();
  if (aiDocumentCache && now - aiDocumentCache.builtAt < AI_INDEX_TTL_MS) {
    return aiDocumentCache.docs;
  }

  const docs = await buildAiSearchDocuments();
  aiDocumentCache = { builtAt: now, docs };
  return docs;
}

async function searchSiteReferences(query: string, limit: number) {
  const docs = await getAiSearchDocuments();
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [] as AiSearchReference[];

  const scored = docs
    .map((doc) => ({ ...doc, score: scoreAiDocument(normalizedQuery, doc) }))
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return scored.slice(0, limit).map((doc) => ({
    id: doc.id,
    title: doc.title,
    url: doc.url,
    excerpt: doc.excerpt,
    sourceType: doc.sourceType,
    score: doc.score,
  }));
}

function buildLocalSearchSummary(query: string, references: AiSearchReference[]) {
  if (references.length === 0) {
    return `No strong matches found for "${query}" yet. Try terms like engineer, projects, gallery, blog, resume, or services.`;
  }

  const topTitles = references.slice(0, 3).map((entry) => entry.title);
  if (topTitles.length === 1) {
    return `Best match for "${query}" is "${topTitles[0]}".`;
  }

  return `Top matches for "${query}" include ${topTitles.join(", ")}.`;
}

function buildLocalChatReply(message: string, references: AiSearchReference[]) {
  if (references.length === 0) {
    return `I could not find a direct portfolio match for "${message}" yet. Ask about engineering, software projects, creative work, writings, resume, or services.`;
  }

  const [primary, secondary] = references;
  if (!secondary) {
    return `The best portfolio reference for that is "${primary.title}". Open ${primary.url} for details.`;
  }

  return `The strongest matches are "${primary.title}" and "${secondary.title}". Start with ${primary.url}, then check ${secondary.url}.`;
}

function referencesToActions(references: AiSearchReference[]) {
  return references.slice(0, 3).map((reference) => ({
    label:
      reference.title.length > 34 ? `${reference.title.slice(0, 31).trimEnd()}...` : reference.title,
    link: reference.url,
  }));
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

  app.post("/api/ai/search", async (req, res) => {
    try {
      const queryRaw = typeof req.body?.query === "string" ? req.body.query : "";
      const query = truncateText(normalizeText(queryRaw), 220);
      if (query.length < 2) {
        res.status(400).json({ message: "Search query must be at least 2 characters" });
        return;
      }

      const limit = parseRequestedLimit(req.body?.limit, DEFAULT_AI_LIMIT);
      const localReferences = await searchSiteReferences(query, Math.max(limit, 6));
      const eddy = await callEddyBackend({
        mode: "search",
        query,
        history: [],
        references: localReferences,
      });

      const references = mergeReferencesByPriority(
        [...(eddy?.references ?? []), ...localReferences],
        limit,
      );

      const summary = eddy?.reply ?? buildLocalSearchSummary(query, references);

      res.json({
        query,
        summary,
        results: references,
        provider: eddy ? "eddy" : "local",
        generatedAt: new Date().toISOString(),
      });
    } catch {
      res.status(500).json({ message: "AI search failed" });
    }
  });

  app.post("/api/ai/chat", async (req, res) => {
    try {
      const messageRaw = typeof req.body?.message === "string" ? req.body.message : "";
      const message = truncateText(normalizeText(messageRaw), 1400);
      if (!message) {
        res.status(400).json({ message: "Message is required" });
        return;
      }

      const history = normalizeChatHistory(req.body?.history);
      const localReferences = await searchSiteReferences(message, 8);
      const eddy = await callEddyBackend({
        mode: "chat",
        query: message,
        history,
        references: localReferences,
      });

      const references = mergeReferencesByPriority(
        [...(eddy?.references ?? []), ...localReferences],
        6,
      );

      res.json({
        reply: eddy?.reply ?? buildLocalChatReply(message, references),
        references,
        actions: referencesToActions(references),
        provider: eddy ? "eddy" : "local",
        generatedAt: new Date().toISOString(),
      });
    } catch {
      res.status(500).json({ message: "AI chat failed" });
    }
  });

  app.post("/api/ai/reindex", async (_req, res) => {
    aiDocumentCache = null;
    try {
      const docs = await getAiSearchDocuments();
      res.json({
        success: true,
        indexedDocuments: docs.length,
        indexedAt: new Date().toISOString(),
      });
    } catch {
      res.status(500).json({ message: "AI reindex failed" });
    }
  });

  app.get("/api/projects/codecircle", async (req, res) => {
    const sourceMode = parseProjectSource(req.query.source, parseProjectSource(process.env.CODECIRCLE_PROJECT_SOURCE, DEFAULT_SOURCE_MODE));
    const requestedVisibility = parseRepoVisibility(
      req.query.visibility,
      parseRepoVisibility(process.env.CODECIRCLE_PROJECT_VISIBILITY, DEFAULT_VISIBILITY),
    );

    const includeForks = parseBoolean(
      req.query.includeForks,
      parseBoolean(process.env.GITHUB_INCLUDE_FORKS, false),
    );
    const maxRepos = parsePositiveInt(
      req.query.maxRepos,
      parsePositiveInt(process.env.GITHUB_MAX_REPOS, DEFAULT_MAX_REPOS),
    );
    const username = (typeof req.query.username === "string" ? req.query.username : process.env.GITHUB_USERNAME || DEFAULT_GITHUB_USERNAME).trim();
    const topicFilter =
      typeof req.query.topic === "string" && req.query.topic.trim().length > 0
        ? req.query.topic.trim().toLowerCase()
        : undefined;

    const featuredFromEnv = parseCsvSet(process.env.GITHUB_FEATURED_REPOS);
    const featuredFromQuery = parseCsvSet(req.query.featured);
    const featuredRepos = new Set<string>();
    featuredFromEnv.forEach((repo) => featuredRepos.add(repo));
    featuredFromQuery.forEach((repo) => featuredRepos.add(repo));

    const manualPortfolio = manualProjects.map(normalizeManualProject);
    let githubPortfolio: Project[] = [];
    let githubError: string | undefined;
    let effectiveVisibility = requestedVisibility;
    const syncNotes: string[] = [];

    if (sourceMode !== "manual") {
      if (!username) {
        if (sourceMode === "github") {
          res.status(400).json({ message: "Missing GitHub username for project sync" });
          return;
        }
        syncNotes.push("GitHub sync skipped because no username is configured.");
      } else {
        try {
          const token = process.env.GITHUB_TOKEN?.trim();
          if (requestedVisibility === "all" && !token) {
            effectiveVisibility = "public";
            syncNotes.push("Falling back to public repositories because GITHUB_TOKEN is not set.");
          }

          const repos = await fetchGithubRepos({
            username,
            visibility: effectiveVisibility,
            token,
            includeForks,
            maxRepos,
          });

          const filteredRepos = topicFilter
            ? repos.filter((repo) =>
                (repo.topics ?? []).some((topic) => topic.toLowerCase() === topicFilter),
              )
            : repos;

          githubPortfolio = filteredRepos.map((repo) => mapGithubRepoToProject(repo, featuredRepos));
        } catch (error) {
          githubError = error instanceof Error ? error.message : "GitHub sync failed";
          if (sourceMode === "github") {
            res.status(502).json({ message: githubError });
            return;
          }
        }
      }
    }

    let projects: Project[];
    if (sourceMode === "manual") {
      projects = manualPortfolio;
    } else if (sourceMode === "github") {
      projects = githubPortfolio;
    } else {
      const seen = new Set<string>();
      const merged: Project[] = [];
      for (const project of [...manualPortfolio, ...githubPortfolio]) {
        const dedupeKey = (project.githubUrl ?? `${project.title}-${project.category}`).toLowerCase();
        if (seen.has(dedupeKey)) continue;
        seen.add(dedupeKey);
        merged.push(project);
      }
      projects = merged;
    }

    projects.sort((a, b) => {
      const aFeatured = a.badges?.includes("Featured") ? 1 : 0;
      const bFeatured = b.badges?.includes("Featured") ? 1 : 0;
      if (aFeatured !== bFeatured) return bFeatured - aFeatured;
      return a.title.localeCompare(b.title);
    });

    res.json({
      source: sourceMode,
      visibility: effectiveVisibility,
      username,
      includeForks,
      topicFilter: topicFilter ?? null,
      syncedAt: new Date().toISOString(),
      categories: buildCategoryList(projects),
      projects,
      githubError: githubError ?? null,
      notes: syncNotes,
    });
  });


  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      
      const contactSubmission = await contactStorage.createContactSubmission(validatedData);
      
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
