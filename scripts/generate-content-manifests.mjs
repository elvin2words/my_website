import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";

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
const WRITING_EXTENSIONS = new Set([".md", ".markdown", ".txt"]);

const DESIGN_EXTENSIONS = new Set();
for (const extension of IMAGE_EXTENSIONS) DESIGN_EXTENSIONS.add(extension);
for (const extension of VIDEO_EXTENSIONS) DESIGN_EXTENSIONS.add(extension);
for (const extension of MODEL_EXTENSIONS) DESIGN_EXTENSIONS.add(extension);
for (const extension of DOCUMENT_EXTENSIONS) DESIGN_EXTENSIONS.add(extension);

const PROJECT_ROOT = process.cwd();
const PUBLIC_ROOT = path.resolve(PROJECT_ROOT, "client", "public");
const OUTPUT_DIR = path.resolve(PROJECT_ROOT, "server", "generated", "content");

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function toTitleCase(value) {
  return value
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toPublicUrl(relativePath) {
  return `/${toPosixPath(relativePath)
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/")}`;
}

function safeResolveFolder(relativeFolder) {
  const resolved = path.resolve(PUBLIC_ROOT, relativeFolder);
  const normalizedRoot = path.resolve(PUBLIC_ROOT);
  if (!(resolved === normalizedRoot || resolved.startsWith(`${normalizedRoot}${path.sep}`))) {
    throw new Error(`Invalid folder path: ${relativeFolder}`);
  }
  return resolved;
}

function resolveContentFolder(candidates) {
  for (const candidate of candidates) {
    const absPath = safeResolveFolder(candidate);
    if (fs.existsSync(absPath)) {
      return { folder: candidate, absPath, exists: true };
    }
  }

  const fallbackFolder = candidates[0];
  return {
    folder: fallbackFolder,
    absPath: safeResolveFolder(fallbackFolder),
    exists: false,
  };
}

async function walkFilesRecursive(root) {
  if (!fs.existsSync(root)) return [];

  const files = [];
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

function conceptFromPath(relativeToRoot) {
  const normalized = toPosixPath(relativeToRoot);
  const [firstSegment] = normalized.split("/");
  return normalized.includes("/") ? firstSegment : "general";
}

function conceptNameFromKey(key) {
  return key === "general" ? "General" : toTitleCase(key);
}

function inferDesignMediaType(extension) {
  if (IMAGE_EXTENSIONS.has(extension)) return "image";
  if (VIDEO_EXTENSIONS.has(extension)) return "video";
  if (MODEL_EXTENSIONS.has(extension)) return "model";
  if (DOCUMENT_EXTENSIONS.has(extension)) return "document";
  return "other";
}

async function buildMediaManifest(folderCandidates, options = {}) {
  const selectedFolder = resolveContentFolder(folderCandidates);
  if (!selectedFolder.exists) {
    return { folder: selectedFolder.folder, concepts: [], items: [] };
  }

  const topLevelEntries = await fsp.readdir(selectedFolder.absPath, { withFileTypes: true });
  const topLevelConcepts = topLevelEntries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);

  const allowedExtensions = options.allowedExtensions ?? IMAGE_EXTENSIONS;
  const inferType = options.inferMediaType ?? ((extension) => (IMAGE_EXTENSIONS.has(extension) ? "image" : "other"));

  const allFiles = await walkFilesRecursive(selectedFolder.absPath);
  const mediaFiles = allFiles.filter((filePath) => {
    const extension = path.extname(filePath).toLowerCase();
    return allowedExtensions.has(extension);
  });

  const items = (
    await Promise.all(
      mediaFiles.map(async (filePath) => {
        try {
          const stats = await fsp.stat(filePath);
          const extension = path.extname(filePath).toLowerCase();
          const relativeToPublic = path.relative(PUBLIC_ROOT, filePath);
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
  ).filter(Boolean);

  items.sort((a, b) => b.updatedAt - a.updatedAt || a.title.localeCompare(b.title));

  const conceptsMap = new Map();
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

function normalizeReferenceUrl(value, relativeDirToPublic) {
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

function parseFrontMatter(raw) {
  const frontMatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!frontMatterMatch) {
    return { meta: {}, body: raw };
  }

  const [, block, body = ""] = frontMatterMatch;
  const meta = {};
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

function stripMarkdown(text) {
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

function extractHeading(body) {
  const headingMatch = body.match(/^#\s+(.+)$/m);
  return headingMatch ? headingMatch[1].trim() : undefined;
}

function estimateReadTime(body) {
  const words = stripMarkdown(body).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min read`;
}

function parsePublishedDate(value, fallback) {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed;
}

function formatPublishedDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeKind(value, conceptKey) {
  if (value === "blog" || value === "writing") return value;
  return conceptKey.includes("blog") ? "blog" : "writing";
}

function normalizeStatus(value) {
  if (value === "in-progress" || value === "draft" || value === "published") {
    return value;
  }
  return "published";
}

function parseTags(value) {
  if (!value) return [];
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

async function buildWritingsManifest(folderCandidates) {
  const selectedFolder = resolveContentFolder(folderCandidates);
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
      writingFiles.map(async (filePath) => {
        try {
          const [raw, stats] = await Promise.all([
            fsp.readFile(filePath, "utf-8"),
            fsp.stat(filePath),
          ]);

          const { meta, body } = parseFrontMatter(raw);
          const relativeToPublic = path.relative(PUBLIC_ROOT, filePath);
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
  ).filter(Boolean);

  entries.sort((a, b) => b.publishedAt - a.publishedAt || a.title.localeCompare(b.title));

  const conceptsMap = new Map();
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

async function writeJson(fileName, data) {
  const outputPath = path.join(OUTPUT_DIR, fileName);
  await fsp.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}

async function main() {
  if (!fs.existsSync(PUBLIC_ROOT)) {
    throw new Error(`Missing public folder: ${PUBLIC_ROOT}`);
  }

  await fsp.mkdir(OUTPUT_DIR, { recursive: true });

  const [gallery, designs, writings] = await Promise.all([
    buildMediaManifest(["gallery"], {
      allowedExtensions: IMAGE_EXTENSIONS,
      inferMediaType: () => "image",
    }),
    buildMediaManifest(["creatives", "creative-designs", "designs", "creative-assets"], {
      allowedExtensions: DESIGN_EXTENSIONS,
      inferMediaType: inferDesignMediaType,
    }),
    buildWritingsManifest(["writings", "blog-writings", "posts", "blog"]),
  ]);

  await Promise.all([
    writeJson("gallery.json", gallery),
    writeJson("designs.json", designs),
    writeJson("writings.json", writings),
  ]);

  console.log(
    `[content-manifests] gallery=${gallery.items.length} designs=${designs.items.length} writings=${writings.entries.length}`,
  );
}

main().catch((error) => {
  console.error("[content-manifests] failed to generate manifests");
  console.error(error);
  process.exitCode = 1;
});
