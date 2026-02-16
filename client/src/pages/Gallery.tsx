import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brush,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Filter,
  GalleryHorizontal,
  Grid3X3,
  Loader2,
  NotebookPen,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { photoShots, type PhotoShot, InstagramFollowUrl } from "@/data/designCircle";
import type { MediaManifest, MediaItem } from "@/types/content";


const emptyManifest: MediaManifest = {
  folder: "gallery",
  concepts: [],
  items: [],
};

type GalleryPreview =
  | { kind: "manifest"; item: MediaItem }
  | { kind: "collection"; item: PhotoShot };

type FolderPopup = {
  title: string;
  subtitle: string;
  items: MediaItem[];
};

type PopupView = "grid" | "carousel";

const GalleryPage: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [preview, setPreview] = useState<GalleryPreview | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [folderPopup, setFolderPopup] = useState<FolderPopup | null>(null);
  const [popupView, setPopupView] = useState<PopupView>("grid");
  const [popupIndex, setPopupIndex] = useState(0);
  const [folderFeedLimit, setFolderFeedLimit] = useState(9);

  const loadGallery = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetch(
        "/api/content/gallery",
        refresh
          ? {
              cache: "no-store",
              headers: { "cache-control": "no-cache", pragma: "no-cache" },
            }
          : undefined,
      );
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

  useEffect(() => {
    setFolderFeedLimit(9);
  }, [manifest.items.length]);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (preview) {
        setPreview(null);
        return;
      }
      if (folderPopup) {
        setFolderPopup(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [folderPopup, preview]);

  const collections = useMemo(
    () => ["all", ...Array.from(new Set(photoShots.map((shot) => shot.collection))).sort()],
    [],
  );

  const visibleCollectionShots = useMemo(() => {
    if (activeCollection === "all") return photoShots;
    return photoShots.filter((shot) => shot.collection === activeCollection);
  }, [activeCollection]);

  const visibleFolderFeed = useMemo(
    () => manifest.items.slice(0, folderFeedLimit),
    [folderFeedLimit, manifest.items],
  );
  const canLoadMoreFolderFeed = folderFeedLimit < manifest.items.length;

  const stats = useMemo(
    () => ({
      folderConcepts: manifest.concepts.length,
      folderShots: manifest.items.length,
      curatedShots: photoShots.length,
      filteredCurated: visibleCollectionShots.length,
    }),
    [manifest.concepts.length, manifest.items.length, visibleCollectionShots.length],
  );

  const openFolderPopup = (conceptKey: string) => {
    if (conceptKey === "all") {
      setFolderPopup({
        title: "All Folder Concepts",
        subtitle: `${manifest.items.length} item(s) from ${manifest.folder}`,
        items: manifest.items,
      });
      setPopupView("grid");
      setPopupIndex(0);
      return;
    }

    const concept = manifest.concepts.find((entry) => entry.key === conceptKey);
    const conceptItems = manifest.items.filter((item) => item.conceptKey === conceptKey);
    setFolderPopup({
      title: concept?.name ?? conceptKey,
      subtitle: `${conceptItems.length} item(s) in this concept`,
      items: conceptItems,
    });
    setPopupView("grid");
    setPopupIndex(0);
  };

  const popupItem = folderPopup?.items[popupIndex] ?? null;

  const movePopup = (delta: -1 | 1) => {
    if (!folderPopup || folderPopup.items.length === 0) return;
    const total = folderPopup.items.length;
    setPopupIndex((prev) => (prev + delta + total) % total);
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Link href="/creative/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Creatives Portfolio Home
                </Button>
              </Link>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Go to Blog
                  </Button>
                </Link>
                <Link href="/creative/visual-designs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="mr-2 h-4 w-4" />
                    Visual Designs
                  </Button>
                </Link>
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                >
                  Check More on Instagram
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            

            <section className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
            {/* <section className="mb-6"> */}
              <div
                className="pointer-events-none absolute -right-24 top-[-86px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent3) / 0.2)" }}
              />
              <div
                className="pointer-events-none absolute -left-20 bottom-[-72px] h-56 w-56 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.14)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  DesignCircle Gallery
                </Badge>
                <h1 className="text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Photography gallery across collections, seasons, and concepts.
                </h1>
                {/* <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  Click any folder concept to explore.
                </p> */}
                {/* <div className="mt-5">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => loadGallery(true)}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Refresh Gallery
                  </Button>
                </div> */}
              </div>
            </section>

            {/* <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border bg-card/75 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Folder Concepts</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">{stats.folderConcepts}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/75 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Folder Shots</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">{stats.folderShots}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/75 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Curated Shots</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">{stats.curatedShots}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card/75 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">Filtered Curated</p>
                <p className="mt-1 text-3xl font-semibold text-foreground">{stats.filteredCurated}</p>
              </div>
            </section> */}

            {isLoading && (
              <div className="mb-8 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-sm text-white/80">Loading gallery from folder structure...</p>
              </div>
            )}

            {error && (
              <div className="mb-8 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <section className="mb-2 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Filter className="h-4 w-4 text-accent3" />
                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">Curated Collections</h2>

                  <span className="mr-1 inline-flex items-center gap-2 text-sm text-white/80">
                  </span>
                  {collections.map((collection) => (
                    <button
                      key={collection}
                      onClick={() => setActiveCollection(collection)}
                      className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                        activeCollection === collection
                          ? "border-accent3 bg-accent3 text-black"
                          : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {collection}
                    </button>
                  ))}
                </div>

                <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {/* <button
                    onClick={() => openFolderPopup("all")}
                    className="rounded-xl border border-white/15 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                  >
                    <p className="text-sm font-semibold">All Concepts</p>
                    <p className="mt-1 text-xs text-white/70">{manifest.items.length} shots</p>
                  </button> */}

                  {manifest.concepts.map((concept) => (
                    <button
                      key={concept.key}
                      onClick={() => openFolderPopup(concept.key)}
                      className="overflow-hidden rounded-xl border border-white/15 bg-white/5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/10"
                    >
                      <div className="relative h-24 bg-black/40">
                        {concept.coverUrl ? (
                          <StableMediaImage
                            src={concept.coverUrl}
                            alt={concept.name}
                            containerClassName="h-full w-full"
                            className="object-cover opacity-90"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-xs text-white/60">
                            No preview
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold">{concept.name}</p>
                        <p className="mt-1 text-xs text-white/70">{concept.count} shots</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.12em] text-foreground/58">Complete Gallery Feed</p>
                  <p className="text-xs text-foreground/62">
                    Showing {visibleFolderFeed.length} of {manifest.items.length}
                  </p>
                </div>

                {visibleFolderFeed.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No images found yet. Add files into `client/public/{manifest.folder}` and refresh.
                  </div>
                ) : (
                  <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleFolderFeed.map((shot) => (
                      <button
                        key={shot.id}
                        onClick={() => setPreview({ kind: "manifest", item: shot })}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent3/50 hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
                      >
                        <StableMediaImage
                          src={shot.url}
                          alt={shot.title}
                          containerClassName="aspect-[4/5] bg-black/30"
                          className="object-cover"
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

                {canLoadMoreFolderFeed && (
                  <div className="mt-6 mb-2 flex justify-center">
                    <Button variant="outline" className="bg-transparent" onClick={() => setFolderFeedLimit((prev) => prev + 9)}>
                      View More
                    </Button>
                  </div>
                )}
              </section>
            )}

            {/* <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-2 text-sm text-white/80">
                  <Filter className="h-4 w-4" />
                  Curated Collections:
                </span>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setActiveCollection(collection)}
                    className={`rounded-full border px-3 py-1.5 text-sm capitalize transition-colors ${
                      activeCollection === collection
                        ? "border-accent3 bg-accent3 text-black"
                        : "border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>

              <section className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                {visibleCollectionShots.map((shot) => (
                  <button
                    key={shot.id}
                    onClick={() => setPreview({ kind: "collection", item: shot })}
                    className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left transition-colors hover:border-accent3/50"
                  >
                    <img src={shot.image} alt={shot.title} loading="lazy" className="h-auto w-full object-cover" />
                    <div className="p-3">
                      <p className="font-medium">{shot.title}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-white/10 text-white/90">
                          {shot.collection}
                        </Badge>
                        <span className="text-xs text-white/60">{shot.year}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </section>
            </section> */}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {folderPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/65 p-4 backdrop-blur-md md:p-8"
            onClick={() => setFolderPopup(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/82 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{folderPopup.title}</p>
                  <p className="truncate text-xs text-white/70">{folderPopup.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPopupView("grid")}
                    className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition ${
                      popupView === "grid"
                        ? "border-white/35 bg-white/20 text-white"
                        : "border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <Grid3X3 className="h-3.5 w-3.5" />
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setPopupView("carousel")}
                    className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs transition ${
                      popupView === "carousel"
                        ? "border-white/35 bg-white/20 text-white"
                        : "border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <GalleryHorizontal className="h-3.5 w-3.5" />
                    Carousel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFolderPopup(null)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close concept popup"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
                {popupView === "grid" && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {folderPopup.items.map((item, index) => (
                      <button
                        key={`${item.id}-${index}`}
                        type="button"
                        onClick={() => setPreview({ kind: "manifest", item })}
                        className="overflow-hidden rounded-xl border border-white/12 bg-white/5 text-left transition hover:border-white/30"
                      >
                        <StableMediaImage
                          src={item.url}
                          alt={item.title}
                          containerClassName="aspect-[4/3] bg-black/40"
                          className="object-cover"
                        />
                        <div className="p-3">
                          <p className="text-sm font-medium text-white">{item.title}</p>
                          <p className="mt-1 text-xs text-white/65">{item.conceptName}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {popupView === "carousel" && popupItem && (
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/45">
                      <StableMediaImage
                        src={popupItem.url}
                        alt={popupItem.title}
                        containerClassName="aspect-[16/10] w-full"
                        className="h-full w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => movePopup(-1)}
                        className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => movePopup(1)}
                        className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/65"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm text-white/82">
                        {popupItem.title}
                        <span className="ml-2 text-xs text-white/62">
                          {popupIndex + 1}/{folderPopup.items.length}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setPreview({ kind: "manifest", item: popupItem })}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                      >
                        Open Fullscreen
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                      {folderPopup.items.map((item, idx) => (
                        <button
                          key={`${item.id}-thumb-${idx}`}
                          type="button"
                          onClick={() => setPopupIndex(idx)}
                          className={`overflow-hidden rounded-md border ${
                            idx === popupIndex ? "border-white/60" : "border-white/20"
                          }`}
                        >
                          <StableMediaImage
                            src={item.url}
                            alt={item.title}
                            containerClassName="aspect-square bg-black/40"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setPreview(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/20 bg-primary/80"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Close gallery preview"
              >
                <X className="h-4 w-4" />
              </button>

              {preview.kind === "manifest" ? (
                <>
                  <StableMediaImage
                    src={preview.item.url}
                    alt={preview.item.title}
                    containerClassName="w-full max-h-[82vh] bg-black"
                    className="w-full max-h-[82vh] object-contain"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{preview.item.title}</h2>
                    <p className="mt-1 text-sm text-white/70">
                      {preview.item.conceptName} • {new Date(preview.item.updatedAt).getFullYear()}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={preview.item.image}
                    alt={preview.item.title}
                    className="w-full max-h-[82vh] object-contain bg-black"
                  />
                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{preview.item.title}</h2>
                    <p className="mt-1 text-sm text-white/70">
                      {preview.item.collection} • {preview.item.year}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default GalleryPage;
