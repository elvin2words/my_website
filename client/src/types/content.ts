export type MediaType = "image" | "video" | "model" | "document" | "other";

export interface MediaItem {
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

export interface MediaConcept {
  id: string;
  key: string;
  name: string;
  count: number;
  coverUrl: string | null;
  previewUrls: string[];
}

export interface MediaManifest {
  folder: string;
  concepts: MediaConcept[];
  items: MediaItem[];
}

export type WritingKind = "blog" | "writing";
export type WritingStatus = "published" | "in-progress" | "draft";

export interface WritingEntry {
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

export interface WritingsManifest {
  folder: string;
  concepts: Array<{ id: string; key: string; name: string; count: number }>;
  entries: WritingEntry[];
}
