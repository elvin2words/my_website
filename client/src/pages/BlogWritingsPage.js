import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brush,
  Camera,
  ExternalLink,
  Loader2,
  NotebookPen,
  Paintbrush,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { linkedInFollowUrl } from "@/data/designCircle";
import type { WritingEntry, WritingKind, WritingStatus, WritingsManifest } from "@/types/content";

type FilterKind = "all" | WritingKind;
type StatusFilter = "all" | WritingStatus;

const emptyManifest: WritingsManifest = {
  folder: "writings",
  concepts: [],
  entries: [],
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const BlogWritingsPage: React.FC = () => {
  const [manifest, setManifest] = useState<WritingsManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);

  const loadWritings = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await fetch(
        "/api/content/writings",
        refresh
          ? {
              cache: "no-store",
              headers: { "cache-control": "no-cache", pragma: "no-cache" },
            }
          : undefined,
      );

      if (!response.ok) {
        throw new Error(`Failed to load writing content (${response.status})`);
      }

      const data = (await response.json()) as WritingsManifest;
      setManifest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load writings");
      setManifest(emptyManifest);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWritings();
  }, [loadWritings]);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedEntry(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const visibleEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return manifest.entries
      .filter((entry) => {
        const byKind = activeFilter === "all" || entry.kind === activeFilter;
        const byStatus = activeStatus === "all" || entry.status === activeStatus;
        const byConcept = activeConcept === "all" || entry.conceptKey === activeConcept;
        const byQuery =
          !q ||
          [entry.title, entry.excerpt, entry.conceptName, entry.kind, entry.status, ...entry.tags]
            .join(" ")
            .toLowerCase()
            .includes(q);
        return byKind && byStatus && byConcept && byQuery;
      })
      .sort((a, b) => b.publishedAt - a.publishedAt);
  }, [activeConcept, activeFilter, activeStatus, manifest.entries, query]);

  const stats = useMemo(() => {
    const published = manifest.entries.filter((entry) => entry.status === "published").length;
    const inProgress = manifest.entries.filter((entry) => entry.status === "in-progress").length;
    return {
      total: manifest.entries.length,
      concepts: manifest.concepts.length,
      published,
      inProgress,
    };
  }, [manifest.concepts.length, manifest.entries]);

  const featured = visibleEntries[0] ?? null;

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Creatives Portfolio
                  </Button>
                </Link>
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="mr-2 h-4 w-4" />
                    Gallery
                  </Button>
                </Link>
                <Link href="/creative/visual-designs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="mr-2 h-4 w-4" />
                    Visual Designs
                  </Button>
                </Link>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                >
                  Explore More on LinkedIn
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <section className="relative mb-8 items-center overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm md:p-8">
            {/* <section className="relative text-center mb-8 overflow-hidden rounded-3xl border border-border border-gray-700 p-6 backdrop-blur-sm md:p-8"> */}
              <div
                className="pointer-events-none absolute -right-20 top-[-70px] h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent3) / 0.22)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-88px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.14)" }}
              />

              <div className="relative items-center z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <NotebookPen className="mr-1.5 h-3.5 w-3.5" />
                  Blog + Writings
                  <Sparkles className="ml-1.5 h-3.5 w-3.5" />
                </Badge>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Ideas, reflections, and creative notes with technical depth
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  A writing space for systems thinking, engineering creativity, design insight, and working frameworks.
                </p>
                {/* <div className="mt-5">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => loadWritings(true)}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Refresh Writings
                  </Button>
                </div> */}
              </div>
            </section>

            {/* <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.total}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.concepts}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.published}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.inProgress}</p>
                </CardContent>
              </Card>
            </section> */}

            <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="mb-3 flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                <Search className="h-4 w-4 text-foreground/60" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, tags, concepts, and excerpts..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(["all", "blog", "writing"] as FilterKind[]).map((kind) => (
                  <button
                    key={kind}
                    onClick={() => setActiveFilter(kind)}
                    className={cx(
                      "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                      activeFilter === kind
                        ? "border-accent3 bg-accent3 text-black"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10",
                    )}
                  >
                    {kind}
                  </button>
                ))}

                {(["all", "published", "in-progress", "draft"] as StatusFilter[]).map((status) => (
                  <button
                    key={status}
                    onClick={() => setActiveStatus(status)}
                    className={cx(
                      "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                      activeStatus === status
                        ? "border-accent3 bg-accent3 text-black"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10",
                    )}
                  >
                    {status === "in-progress" ? "in progress" : status}
                  </button>
                ))}

                <select
                  value={activeConcept}
                  onChange={(event) => setActiveConcept(event.target.value)}
                  className="h-8 rounded-full border border-white/20 bg-white/5 px-3 text-xs text-white/90 outline-none"
                >
                  <option value="all">All Concepts</option>
                  {manifest.concepts.map((concept) => (
                    <option key={concept.key} value={concept.key}>
                      {concept.name}
                    </option>
                  ))}
                </select>

                <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                  {visibleEntries.length} matched
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setActiveFilter("all");
                    setActiveStatus("all");
                    setActiveConcept("all");
                    setQuery("");
                  }}
                  className="inline-flex h-8 items-center rounded-full border border-white/20 px-3 text-xs text-white/82 transition hover:bg-white/10"
                >
                  Clear
                </button>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-sm text-white/80">Loading writing content from folder structure...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && featured && (
              <section className="mb-8 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.12em] text-foreground/58">Featured Entry</p>
                  <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/75 capitalize">
                    {featured.kind}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{featured.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/78">{featured.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground/65">
                  <span>{featured.publishedOn}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                  <span>•</span>
                  <span className="capitalize">{featured.status === "in-progress" ? "in progress" : featured.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge key={`${featured.id}-${tag}`} variant="outline" className="border-white/20 text-white/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(featured)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                  >
                    Open Preview
                  </button>
                  {featured.href && (
                    <a
                      href={featured.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      Open Embedded Link
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={featured.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                  >
                    View Source Text
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>
            )}

            {!isLoading && !error && (
              <>
                {visibleEntries.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No writing files found for this filter combination.
                  </div>
                ) : (
                  <section className="grid gap-5 md:grid-cols-2">
                    {visibleEntries.map((entry, index) => (
                      <motion.button
                        key={entry.id}
                        type="button"
                        onClick={() => setSelectedEntry(entry)}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.22, delay: index * 0.03 }}
                        whileHover={{ y: -3 }}
                        className="text-left"
                      >
                        <Card className="h-full border-white/10 bg-white/5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent3/40 hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                          <CardHeader className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-white/10 capitalize text-white/90">
                                {entry.kind}
                              </Badge>
                              <Badge variant="secondary" className="bg-white/10 text-white/90">
                                {entry.conceptName}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className={
                                  entry.status === "published"
                                    ? "bg-green-600/20 text-green-200"
                                    : entry.status === "in-progress"
                                      ? "bg-yellow-600/20 text-yellow-200"
                                      : "bg-slate-600/30 text-slate-200"
                                }
                              >
                                {entry.status === "published"
                                  ? "Published"
                                  : entry.status === "in-progress"
                                    ? "In progress"
                                    : "Draft"}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl">{entry.title}</CardTitle>
                            <div className="text-xs text-white/60">
                              {entry.publishedOn} • {entry.readTime}
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            {entry.coverImage && (
                              <StableMediaImage
                                src={entry.coverImage}
                                alt={entry.title}
                                containerClassName="aspect-video w-full rounded-md border border-white/10"
                                className="object-cover"
                              />
                            )}

                            <p className="text-sm leading-relaxed text-white/80">{entry.excerpt}</p>
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.map((tag) => (
                                <Badge key={`${entry.id}-${tag}`} variant="outline" className="border-white/20 text-white/80">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex flex-wrap gap-3 pt-1">
                              {entry.href && (
                                <a
                                  href={entry.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center text-sm font-medium text-accent3 hover:text-accent3/80"
                                >
                                  Open embedded link
                                  <ExternalLink className="ml-1.5 h-4 w-4" />
                                </a>
                              )}
                              <a
                                href={entry.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) => event.stopPropagation()}
                                className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-200"
                              >
                                View source text
                                <ExternalLink className="ml-1.5 h-4 w-4" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.button>
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] bg-black/70 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedEntry(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/85 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] capitalize text-white/85">
                      {selectedEntry.kind}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] text-white/85">
                      {selectedEntry.conceptName}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">{selectedEntry.title}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {selectedEntry.publishedOn} • {selectedEntry.readTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEntry(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close entry preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
                {selectedEntry.coverImage && (
                  <StableMediaImage
                    src={selectedEntry.coverImage}
                    alt={selectedEntry.title}
                    containerClassName="aspect-video w-full rounded-xl border border-white/15 bg-black/40"
                    className="h-full w-full object-cover"
                  />
                )}
                <p className="mt-4 text-sm leading-relaxed text-white/82">{selectedEntry.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <span
                      key={`${selectedEntry.id}-modal-${tag}`}
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/82"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/12 px-4 py-3 md:px-5">
                {selectedEntry.href && (
                  <a
                    href={selectedEntry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    Open Embedded Link
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={selectedEntry.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                >
                  View Source Text
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default BlogWritingsPage;












import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brush,
  Camera,
  ExternalLink,
  Loader2,
  NotebookPen,
  Paintbrush,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { linkedInFollowUrl } from "@/data/designCircle";
import type { WritingEntry, WritingKind, WritingStatus, WritingsManifest } from "@/types/content";

type FilterKind = "all" | WritingKind;
type StatusFilter = "all" | WritingStatus;
type LinkedInFilter = "all" | "linkedin-only" | "not-linkedin";

const emptyManifest: WritingsManifest = {
  folder: "writings",
  concepts: [],
  entries: [],
};

const podcastCtaUrl = "https://open.spotify.com";
const tiktokCtaUrl = "https://www.tiktok.com";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function isLinkedInEntry(entry: WritingEntry) {
  const searchableText = [entry.href, entry.sourceUrl, entry.title, entry.excerpt, ...entry.tags]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return searchableText.includes("linkedin.com") || searchableText.includes("linkedin");
}

const BlogWritingsPage: React.FC = () => {
  const [manifest, setManifest] = useState<WritingsManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");
  const [activeStatus, setActiveStatus] = useState<StatusFilter>("all");
  const [linkedInFilter, setLinkedInFilter] = useState<LinkedInFilter>("all");
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry | null>(null);

  const loadWritings = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const response = await fetch(
        "/api/content/writings",
        refresh
          ? {
              cache: "no-store",
              headers: { "cache-control": "no-cache", pragma: "no-cache" },
            }
          : undefined,
      );

      if (!response.ok) {
        throw new Error(`Failed to load writing content (${response.status})`);
      }

      const data = (await response.json()) as WritingsManifest;
      setManifest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load writings");
      setManifest(emptyManifest);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWritings();
  }, [loadWritings]);

  const visibleEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return manifest.entries
      .filter((entry) => {
        const byKind = activeFilter === "all" || entry.kind === activeFilter;
        const byStatus = activeStatus === "all" || entry.status === activeStatus;
        const byConcept = activeConcept === "all" || entry.conceptKey === activeConcept;
        const linkedIn = isLinkedInEntry(entry);
        const byLinkedIn =
          linkedInFilter === "all" ||
          (linkedInFilter === "linkedin-only" ? linkedIn : !linkedIn);
        const byQuery =
          !q ||
          [entry.title, entry.excerpt, entry.conceptName, entry.kind, entry.status, ...entry.tags]
            .join(" ")
            .toLowerCase()
            .includes(q);
        return byKind && byStatus && byConcept && byLinkedIn && byQuery;
      })
      .sort((a, b) => b.publishedAt - a.publishedAt);
  }, [activeConcept, activeFilter, activeStatus, linkedInFilter, manifest.entries, query]);

  const stats = useMemo(() => {
    const published = manifest.entries.filter((entry) => entry.status === "published").length;
    const inProgress = manifest.entries.filter((entry) => entry.status === "in-progress").length;
    return {
      total: manifest.entries.length,
      concepts: manifest.concepts.length,
      published,
      inProgress,
    };
  }, [manifest.concepts.length, manifest.entries]);

  const featured = visibleEntries[0] ?? null;
  const visibleLinkedInCount = useMemo(
    () => visibleEntries.filter((entry) => isLinkedInEntry(entry)).length,
    [visibleEntries],
  );
  const selectedIndex = useMemo(
    () => (selectedEntry ? visibleEntries.findIndex((entry) => entry.id === selectedEntry.id) : -1),
    [selectedEntry, visibleEntries],
  );
  const canPrev = selectedIndex > 0;
  const canNext = selectedIndex >= 0 && selectedIndex < visibleEntries.length - 1;

  const openAdjacentEntry = useCallback(
    (delta: number) => {
      if (selectedIndex < 0) return;
      const nextEntry = visibleEntries[selectedIndex + delta];
      if (nextEntry) setSelectedEntry(nextEntry);
    },
    [selectedIndex, visibleEntries],
  );

  useEffect(() => {
    if (!selectedEntry) return;
    const isStillVisible = visibleEntries.some((entry) => entry.id === selectedEntry.id);
    if (!isStillVisible) {
      setSelectedEntry(visibleEntries[0] ?? null);
    }
  }, [selectedEntry, visibleEntries]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selectedEntry) return;
      if (event.key === "Escape") {
        setSelectedEntry(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        openAdjacentEntry(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        openAdjacentEntry(1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openAdjacentEntry, selectedEntry]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Creatives Portfolio
                  </Button>
                </Link>
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="mr-2 h-4 w-4" />
                    Gallery
                  </Button>
                </Link>
                <Link href="/creative/visual-designs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="mr-2 h-4 w-4" />
                    Visual Designs
                  </Button>
                </Link>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                >
                  Explore More on LinkedIn
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            <section className="relative mb-8 items-center overflow-hidden rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm md:p-8">
            {/* <section className="relative text-center mb-8 overflow-hidden rounded-3xl border border-border border-gray-700 p-6 backdrop-blur-sm md:p-8"> */}
              <div
                className="pointer-events-none absolute -right-20 top-[-70px] h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent3) / 0.22)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-88px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.14)" }}
              />

              <div className="relative items-center z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <NotebookPen className="mr-1.5 h-3.5 w-3.5" />
                  Blog + Writings
                  <Sparkles className="ml-1.5 h-3.5 w-3.5" />
                </Badge>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Ideas, reflections, and creative notes with technical depth
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  A writing space for systems thinking, engineering creativity, design insight, and working frameworks.
                </p>
                {/* <div className="mt-5">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => loadWritings(true)}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Refresh Writings
                  </Button>
                </div> */}
              </div>
            </section>

            {/* <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Entries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.total}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.concepts}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.published}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">In Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.inProgress}</p>
                </CardContent>
              </Card>
            </section> */}

            <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                      <Search className="h-4 w-4 text-foreground/60" />
                      <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search titles, tags, concepts, and excerpts..."
                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuery((value) => value.trim())}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-accent3/45 bg-accent3/15 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-accent3 transition hover:bg-accent3/24"
                    >
                      Search
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-foreground/62">
                    Search first, then narrow quickly with grouped filters on the right.
                  </p>
                </div>

                <div className="grid gap-3 xl:w-[44rem]">

                  <div className="rounded-xl border border-white/12 bg-background/35 p-3">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.11em] text-foreground/58">Blog Specifics</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {(["all", "blog", "writing"] as FilterKind[]).map((kind) => (
                        <button
                          key={kind}
                          onClick={() => setActiveFilter(kind)}
                          className={cx(
                            "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                            activeFilter === kind
                              ? "border-accent3 bg-accent3 text-black"
                              : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10",
                          )}
                        >
                          {kind}
                        </button>
                      ))}
                      <select
                        value={activeConcept}
                        onChange={(event) => setActiveConcept(event.target.value)}
                        className="h-8 min-w-[10rem] rounded-full border border-white/20 bg-white/5 px-3 text-xs text-white/90 outline-none"
                      >
                        <option value="all">All Concepts</option>
                        {manifest.concepts.map((concept) => (
                          <option key={concept.key} value={concept.key}>
                            {concept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/12 bg-background/35 p-3">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.11em] text-foreground/58">Other Misc</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {(["all", "published", "in-progress", "draft"] as StatusFilter[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => setActiveStatus(status)}
                          className={cx(
                            "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                            activeStatus === status
                              ? "border-accent3 bg-accent3 text-black"
                              : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10",
                          )}
                        >
                          {status === "in-progress" ? "in progress" : status}
                        </button>
                      ))}
                      <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
                        {visibleEntries.length} matched
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveFilter("all");
                          setActiveStatus("all");
                          setLinkedInFilter("all");
                          setActiveConcept("all");
                          setQuery("");
                        }}
                        className="inline-flex h-8 items-center rounded-full border border-white/20 px-3 text-xs text-white/82 transition hover:bg-white/10"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-blue-400/25 bg-blue-500/10 p-3">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.11em] text-blue-100">LinkedIn Posts</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {(
                        [
                          { value: "all", label: "all entries" },
                          { value: "linkedin-only", label: "linkedin only" },
                          { value: "not-linkedin", label: "without linkedin" },
                        ] as Array<{ value: LinkedInFilter; label: string }>
                      ).map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setLinkedInFilter(option.value)}
                          className={cx(
                            "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
                            linkedInFilter === option.value
                              ? "border-blue-300 bg-blue-200 text-blue-950"
                              : "border-blue-300/45 bg-blue-950/15 text-blue-100 hover:bg-blue-900/25",
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                      <span className="rounded-full border border-blue-300/40 bg-blue-950/15 px-2.5 py-1 text-[11px] text-blue-100/90">
                        {visibleLinkedInCount} linked in current result
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <a
                        href={podcastCtaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/55 px-3 py-1.5 text-xs text-blue-100 transition hover:bg-blue-900/25"
                      >
                        Checkout my Podcast
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={tiktokCtaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/55 px-3 py-1.5 text-xs text-blue-100 transition hover:bg-blue-900/25"
                      >
                        Checkout my TikTok
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href={linkedInFollowUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-blue-300/55 px-3 py-1.5 text-xs text-blue-100 transition hover:bg-blue-900/25"
                      >
                        Open LinkedIn Feed
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-sm text-white/80">Loading writing content from folder structure...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && featured && (
              <section className="mb-8 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.12em] text-foreground/58">Featured Entry</p>
                  <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/75 capitalize">
                    {featured.kind}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">{featured.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/78">{featured.excerpt}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-foreground/65">
                  <span>{featured.publishedOn}</span>
                  <span>•</span>
                  <span>{featured.readTime}</span>
                  <span>•</span>
                  <span className="capitalize">{featured.status === "in-progress" ? "in progress" : featured.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge key={`${featured.id}-${tag}`} variant="outline" className="border-white/20 text-white/80">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEntry(featured)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                  >
                    Open Preview
                  </button>
                  {featured.href && (
                    <a
                      href={featured.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                    >
                      Open Embedded Link
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={featured.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white/85 transition hover:bg-white/10"
                  >
                    View Source Text
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </section>
            )}

            {!isLoading && !error && (
              <>
                {visibleEntries.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No writing files found for this filter combination.
                  </div>
                ) : (
                  <section className="grid gap-5 md:grid-cols-2">
                    {visibleEntries.map((entry, index) => {
                      const linkedInEntry = isLinkedInEntry(entry);
                      const linkedInTextCard = linkedInEntry && !entry.coverImage;

                      return (
                        <motion.button
                          key={entry.id}
                          type="button"
                          onClick={() => setSelectedEntry(entry)}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.35 }}
                          transition={{ duration: 0.22, delay: index * 0.03 }}
                          whileHover={{ y: -3 }}
                          className="text-left"
                        >
                          <Card
                            className={cx(
                              "h-full border-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)]",
                              linkedInTextCard
                                ? "bg-blue-950/18 hover:border-blue-300/45"
                                : "bg-white/5 hover:border-accent3/40",
                            )}
                          >
                            <CardHeader className="space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="bg-white/10 capitalize text-white/90">
                                  {entry.kind}
                                </Badge>
                                <Badge variant="secondary" className="bg-white/10 text-white/90">
                                  {entry.conceptName}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className={
                                    entry.status === "published"
                                      ? "bg-green-600/20 text-green-200"
                                      : entry.status === "in-progress"
                                        ? "bg-yellow-600/20 text-yellow-200"
                                        : "bg-slate-600/30 text-slate-200"
                                  }
                                >
                                  {entry.status === "published"
                                    ? "Published"
                                    : entry.status === "in-progress"
                                      ? "In progress"
                                      : "Draft"}
                                </Badge>
                                {linkedInEntry && (
                                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-100">
                                    LinkedIn
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-xl">{entry.title}</CardTitle>
                              <div className="text-xs text-white/60">
                                {entry.publishedOn} • {entry.readTime}
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                              {entry.coverImage && (
                                <StableMediaImage
                                  src={entry.coverImage}
                                  alt={entry.title}
                                  containerClassName="aspect-video w-full rounded-md border border-white/10"
                                  className="object-cover"
                                />
                              )}

                              {linkedInTextCard ? (
                                <div className="rounded-xl border border-blue-300/28 bg-blue-950/35 p-3">
                                  <p className="text-sm leading-relaxed text-blue-100/90">{entry.excerpt}</p>
                                </div>
                              ) : (
                                <p className="text-sm leading-relaxed text-white/80">{entry.excerpt}</p>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {entry.tags.map((tag) => (
                                  <Badge
                                    key={`${entry.id}-${tag}`}
                                    variant="outline"
                                    className={cx(
                                      "border-white/20 text-white/80",
                                      linkedInTextCard && "border-blue-300/30 text-blue-100/90",
                                    )}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex flex-wrap gap-3 pt-1">
                                {entry.href && (
                                  <a
                                    href={entry.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                    className={cx(
                                      "inline-flex items-center text-sm font-medium",
                                      linkedInEntry
                                        ? "text-blue-200 hover:text-blue-100"
                                        : "text-accent3 hover:text-accent3/80",
                                    )}
                                  >
                                    {linkedInEntry ? "Check on LinkedIn" : "Open embedded link"}
                                    <ExternalLink className="ml-1.5 h-4 w-4" />
                                  </a>
                                )}
                                <a
                                  href={entry.sourceUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(event) => event.stopPropagation()}
                                  className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-200"
                                >
                                  View source text
                                  <ExternalLink className="ml-1.5 h-4 w-4" />
                                </a>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.button>
                      );
                    })}
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] bg-black/70 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedEntry(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/85 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] capitalize text-white/85">
                      {selectedEntry.kind}
                    </span>
                    <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] text-white/85">
                      {selectedEntry.conceptName}
                    </span>
                    {isLinkedInEntry(selectedEntry) && (
                      <span className="rounded-full border border-blue-300/45 bg-blue-500/15 px-2.5 py-1 text-[10px] text-blue-100">
                        LinkedIn
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">{selectedEntry.title}</h3>
                  <p className="mt-1 text-xs text-white/70">
                    {selectedEntry.publishedOn} • {selectedEntry.readTime}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedEntry(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close entry preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
                {selectedEntry.coverImage && (
                  <StableMediaImage
                    src={selectedEntry.coverImage}
                    alt={selectedEntry.title}
                    containerClassName="aspect-video w-full rounded-xl border border-white/15 bg-black/40"
                    className="h-full w-full object-cover"
                  />
                )}
                {isLinkedInEntry(selectedEntry) && !selectedEntry.coverImage ? (
                  <div className="mt-4 rounded-xl border border-blue-300/28 bg-blue-950/35 p-4">
                    <p className="text-sm leading-relaxed text-blue-100/90">{selectedEntry.excerpt}</p>
                  </div>
                ) : (
                  <p className="mt-4 text-sm leading-relaxed text-white/82">{selectedEntry.excerpt}</p>
                )}
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag) => (
                    <span
                      key={`${selectedEntry.id}-modal-${tag}`}
                      className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/82"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/12 px-4 py-3 md:px-5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={!canPrev}
                    onClick={() => openAdjacentEntry(-1)}
                    className={cx(
                      "inline-flex items-center rounded-lg border px-3 py-1.5 text-xs transition",
                      canPrev
                        ? "border-white/25 text-white hover:bg-white/10"
                        : "cursor-not-allowed border-white/10 text-white/45",
                    )}
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    disabled={!canNext}
                    onClick={() => openAdjacentEntry(1)}
                    className={cx(
                      "inline-flex items-center rounded-lg border px-3 py-1.5 text-xs transition",
                      canNext
                        ? "border-white/25 text-white hover:bg-white/10"
                        : "cursor-not-allowed border-white/10 text-white/45",
                    )}
                  >
                    Next
                  </button>
                  <span className="text-[11px] text-white/62">
                    {selectedIndex >= 0 ? selectedIndex + 1 : 0} of {visibleEntries.length}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {selectedEntry.href && (
                    <a
                      href={selectedEntry.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition",
                        isLinkedInEntry(selectedEntry)
                          ? "border-blue-300/45 text-blue-100 hover:bg-blue-900/25"
                          : "border-white/25 text-white hover:bg-white/10",
                      )}
                    >
                      {isLinkedInEntry(selectedEntry) ? "Check on LinkedIn" : "Open Embedded Link"}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  <a
                    href={selectedEntry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    View Source Text
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default BlogWritingsPage;
