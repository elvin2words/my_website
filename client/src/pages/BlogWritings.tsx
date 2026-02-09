import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Camera, ExternalLink, Loader2, NotebookPen, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { linkedInFollowUrl } from "@/data/designCircle";
import type { WritingKind, WritingEntry, WritingsManifest } from "@/types/content";

type FilterKind = "all" | WritingKind;

const emptyManifest: WritingsManifest = {
  folder: "writings",
  concepts: [],
  entries: [],
};

const BlogWritingsPage: React.FC = () => {
  const [manifest, setManifest] = useState<WritingsManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterKind>("all");
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadWritings = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetch("/api/content/writings", {
        cache: "no-store",
        headers: { "cache-control": "no-cache" },
      });
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
    let entries: WritingEntry[] = manifest.entries;
    if (activeFilter !== "all") {
      entries = entries.filter((entry) => entry.kind === activeFilter);
    }
    if (activeConcept !== "all") {
      entries = entries.filter((entry) => entry.conceptKey === activeConcept);
    }
    return entries;
  }, [activeConcept, activeFilter, manifest.entries]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/creative/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to DesignCircle
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Go to Gallery
                  </Button>
                </Link>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Explore on LinkedIn
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            <section className="mb-8">
              <div className="inline-flex items-center gap-2 text-accent3 mb-4">
                <NotebookPen className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.12em]">Blog + Writings</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3">
                Ideas, reflections, and creative notes
              </h1>
              {/* <p className="text-white/75 max-w-3xl">
                Drop `.md`, `.markdown`, or `.txt` files into `client/public/{manifest.folder}`.
                Subfolders become concept collections automatically.
              </p> */}
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => loadWritings(true)}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh Writings
                </Button>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-6 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-white/80 text-sm">Loading writing content from folder structure...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <>
                <section className="mb-8 flex flex-wrap gap-2">
                  {(["all", "blog", "writing"] as FilterKind[]).map((kind) => (
                    <button
                      key={kind}
                      onClick={() => setActiveFilter(kind)}
                      className={`px-4 py-2 rounded-full border text-sm capitalize transition-colors ${
                        activeFilter === kind
                          ? "bg-accent3 text-black border-accent3"
                          : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {kind === "all" ? "All" : kind}
                    </button>
                  ))}
                </section>

                <section className="mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <button
                      onClick={() => setActiveConcept("all")}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        activeConcept === "all"
                          ? "border-accent3 bg-accent3/20"
                          : "border-white/15 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm font-semibold">All Concepts</p>
                      <p className="text-xs text-white/70 mt-1">{manifest.entries.length} entries</p>
                    </button>

                    {manifest.concepts.map((concept) => (
                      <button
                        key={concept.key}
                        onClick={() => setActiveConcept(concept.key)}
                        className={`rounded-xl border p-3 text-left transition-colors ${
                          activeConcept === concept.key
                            ? "border-accent3 bg-accent3/20"
                            : "border-white/15 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <p className="text-sm font-semibold">{concept.name}</p>
                        <p className="text-xs text-white/70 mt-1">{concept.count} entries</p>
                      </button>
                    ))}
                  </div>
                </section>

                {visibleEntries.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No writing files found yet. Add content files into `client/public/{manifest.folder}`
                    and refresh.
                  </div>
                ) : (
                  <section className="grid md:grid-cols-2 gap-5">
                    {visibleEntries.map((entry) => (
                      <Card
                        key={entry.id}
                        className="bg-white/5 border-white/10 h-full transition-all duration-300 ease-out hover:border-accent3/40 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.22)]"
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white/90 capitalize">
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
                            {entry.publishedOn} - {entry.readTime}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {entry.coverImage && (
                            <StableMediaImage
                              src={entry.coverImage}
                              alt={entry.title}
                              containerClassName="w-full aspect-video rounded-md border border-white/10"
                              className="object-cover"
                            />
                          )}

                          <p className="text-white/80 text-sm leading-relaxed">{entry.excerpt}</p>
                          <div className="flex flex-wrap gap-2">
                            {entry.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="border-white/20 text-white/80">
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
                                className="inline-flex items-center text-accent3 hover:text-accent3/80 text-sm font-medium"
                              >
                                Open embedded link
                                <ExternalLink className="h-4 w-4 ml-1.5" />
                              </a>
                            )}
                            <a
                              href={entry.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-300 hover:text-blue-200 text-sm font-medium"
                            >
                              View source text
                              <ExternalLink className="h-4 w-4 ml-1.5" />
                            </a>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BlogWritingsPage;
