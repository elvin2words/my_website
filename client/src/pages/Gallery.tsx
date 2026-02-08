import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Filter, Loader2, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { InstagramFollowUrl } from "@/data/designCircle";
import type { MediaManifest, MediaItem } from "@/types/content";

const emptyManifest: MediaManifest = {
  folder: "gallery",
  concepts: [],
  items: [],
};

const GalleryPage: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [selectedShot, setSelectedShot] = useState<MediaItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadGallery = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetch("/api/content/gallery", {
        cache: "no-store",
        headers: { "cache-control": "no-cache" },
      });
      if (!response.ok) {
        throw new Error(`Failed to load gallery content (${response.status})`);
      }

      const data = (await response.json()) as MediaManifest;
      setManifest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
      setManifest(emptyManifest);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  const visibleShots = useMemo(() => {
    if (activeConcept === "all") return manifest.items;
    return manifest.items.filter((shot) => shot.conceptKey === activeConcept);
  }, [activeConcept, manifest.items]);

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
              <a
                href={InstagramFollowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
              >
                Check out more on my Instagram
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>

            <section className="mb-6">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Photography Gallery</h1>
              <p className="text-white/75 max-w-3xl">
                Upload images into `client/public/{manifest.folder}`. Root files appear under General,
                and subfolders become concept mini-showcases you can filter by.
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => loadGallery(true)}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh Gallery
                </Button>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-6 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-white/80 text-sm">Loading gallery from folder structure...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <>
                <section className="mb-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                      <Filter className="h-4 w-4" />
                      Concepts:
                    </span>
                  </div>

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
                      <p className="text-xs text-white/70 mt-1">{manifest.items.length} shots</p>
                    </button>

                    {manifest.concepts.map((concept) => (
                      <button
                        key={concept.key}
                        onClick={() => setActiveConcept(concept.key)}
                        className={`rounded-xl border overflow-hidden text-left transition-colors ${
                          activeConcept === concept.key
                            ? "border-accent3 bg-accent3/20"
                            : "border-white/15 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="h-24 bg-black/40 relative">
                          {concept.coverUrl ? (
                            <img
                              src={concept.coverUrl}
                              alt={concept.name}
                              loading="lazy"
                              className="h-full w-full object-cover opacity-85"
                            />
                          ) : (
                            <div className="h-full w-full grid place-items-center text-xs text-white/60">
                              No preview
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="text-sm font-semibold">{concept.name}</p>
                          <p className="text-xs text-white/70 mt-1">{concept.count} shots</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                {visibleShots.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No images found yet. Add files into `client/public/{manifest.folder}` and refresh.
                  </div>
                ) : (
                  <section className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                    {visibleShots.map((shot) => (
                      <button
                        key={shot.id}
                        onClick={() => setSelectedShot(shot)}
                        className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-colors"
                      >
                        <img
                          src={shot.url}
                          alt={shot.title}
                          loading="lazy"
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-3">
                          <p className="font-medium">{shot.title}</p>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white/90">
                              {shot.conceptName}
                            </Badge>
                            <span className="text-xs text-white/60">
                              {new Date(shot.updatedAt).getFullYear()}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </div>

      {selectedShot && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedShot(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl border border-white/20 bg-primary/80 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot(null)}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={selectedShot.url}
              alt={selectedShot.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedShot.title}</h2>
              <p className="text-sm text-white/70 mt-1">
                {selectedShot.conceptName} - {new Date(selectedShot.updatedAt).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default GalleryPage;
