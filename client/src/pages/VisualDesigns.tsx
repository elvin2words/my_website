import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brush,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  GalleryHorizontal,
  Grid3X3,
  Loader2,
  NotebookPen,
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
import { InstagramFollowUrl } from "@/data/designCircle";
import type { MediaItem, MediaManifest } from "@/types/content";



const emptyManifest: MediaManifest = {
  folder: "creatives",
  concepts: [],
  items: [],
};

type PopupView = "grid" | "carousel";
type ConceptPopup = {
  title: string;
  subtitle: string;
  items: MediaItem[];
};

const VisualDesignsPage: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [conceptPopup, setConceptPopup] = useState<ConceptPopup | null>(null);
  const [popupView, setPopupView] = useState<PopupView>("grid");
  const [popupIndex, setPopupIndex] = useState(0);
  const [feedLimit, setFeedLimit] = useState(9);

  const loadDesigns = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setError(null);
      const response = await fetch(
        "/api/content/designs",
        refresh
          ? {
              cache: "no-store",
              headers: { "cache-control": "no-cache", pragma: "no-cache" },
            }
          : undefined,
      );

      if (!response.ok) {
        throw new Error(`Failed to load design content (${response.status})`);
      }

      const data = (await response.json()) as MediaManifest;
      setManifest(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load visual designs");
      setManifest(emptyManifest);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (selectedImage) {
        setSelectedImage(null);
        return;
      }
      if (conceptPopup) {
        setConceptPopup(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [conceptPopup, selectedImage]);

  const imageItems = useMemo(
    () => manifest.items.filter((item) => item.mediaType === "image"),
    [manifest.items],
  );

  const imageConcepts = useMemo(() => {
    const conceptMap = new Map<string, { key: string; name: string; count: number; coverUrl: string | null }>();

    for (const image of imageItems) {
      const concept = conceptMap.get(image.conceptKey);
      if (!concept) {
        conceptMap.set(image.conceptKey, {
          key: image.conceptKey,
          name: image.conceptName,
          count: 1,
          coverUrl: image.url,
        });
        continue;
      }

      concept.count += 1;
      if (!concept.coverUrl) concept.coverUrl = image.url;
    }

    return Array.from(conceptMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [imageItems]);

  const filteredFeed = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return imageItems;
    return imageItems.filter((image) =>
      [image.title, image.conceptName, image.relativePath].join(" ").toLowerCase().includes(q),
    );
  }, [imageItems, query]);

  const visibleFeed = useMemo(() => filteredFeed.slice(0, feedLimit), [feedLimit, filteredFeed]);
  const canLoadMoreFeed = feedLimit < filteredFeed.length;

  useEffect(() => {
    setFeedLimit(9);
  }, [query, imageItems.length]);

  const stats = useMemo(
    () => ({
      totalImages: imageItems.length,
      concepts: imageConcepts.length,
      shown: visibleFeed.length,
    }),
    [imageConcepts.length, imageItems.length, visibleFeed.length],
  );

  const openConceptPopup = (conceptKey: string) => {
    if (conceptKey === "all") {
      setConceptPopup({
        title: "All Visual Concepts",
        subtitle: `${imageItems.length} image(s) across all concept folders`,
        items: imageItems,
      });
      setPopupView("grid");
      setPopupIndex(0);
      return;
    }
    const concept = imageConcepts.find((entry) => entry.key === conceptKey);
    const conceptItems = imageItems.filter((image) => image.conceptKey === conceptKey);
    setConceptPopup({
      title: concept?.name ?? conceptKey,
      subtitle: `${conceptItems.length} image(s) in this concept`,
      items: conceptItems,
    });
    setPopupView("grid");
    setPopupIndex(0);
  };

  const popupItem = conceptPopup?.items[popupIndex] ?? null;
  const movePopup = (delta: -1 | 1) => {
    if (!conceptPopup || conceptPopup.items.length === 0) return;
    const total = conceptPopup.items.length;
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
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    Gallery
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Blog
                  </Button>
                </Link>
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                >
                  More on Instagram
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            

            {/* <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-20 top-[-74px] h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent3) / 0.2)" }}
              />
              <div
                className="pointer-events-none absolute -left-20 bottom-[-84px] h-60 w-60 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.15)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Visual Designs
                </Badge>

                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Logos, flyers, posters, banners, and design concept work
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  Click any concept folder to open a popup, switch between grid/carousel, and open fullscreen image detail.
                </p>

                <div className="mt-5">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => loadDesigns(true)}
                    disabled={isRefreshing}
                  >
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Refresh Visual Designs
                  </Button>
                </div>
              </div>
            </section> */}

            <section className="relative text-center mb-8 overflow-hidden rounded-3xl border border-border border-gray-700 p-6 backdrop-blur-sm md:p-8">
            {/* <section className="mb-8 text-center"> */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Visual Designs</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Logos, Flyers, Banners & other Conceptual Design Work
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-5">
                A visual lane for graphical work and other creative design assets.
              </p>

              {/* <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => loadDesigns(true)}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  Refresh Visual Designs
                </Button>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  LinkedIn Feed
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Go to Blog
                  </Button>
                </Link>
              </div> */}
            </section>

            {/* <section className="mb-8 grid gap-3 sm:grid-cols-3">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.totalImages}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.concepts}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Shown</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.shown}</p>
                </CardContent>
              </Card>
            </section> */}

            {isLoading && (
              <div className="mb-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-sm text-white/80">Loading visual design assets...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <section className="rounded-2xl border border-border bg-card/30 p-4 backdrop-blur-sm md:p-5">
                {/* <div className="mb-4 flex items-center gap-2">
                  <Brush className="h-4 w-4 text-accent3" />
                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">Visual Design Concepts</h2>
                </div> */}

                <div className="mt-4 mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    onClick={() => openConceptPopup("all")}
                    className="rounded-xl border border-white/15 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                  >
                    <p className="text-sm font-semibold">All Visual Concepts</p>
                    <p className="mt-1 text-xs text-white/70">{imageItems.length} images</p>
                  </button>

                  {imageConcepts.map((concept) => (
                    <button
                      key={concept.key}
                      onClick={() => openConceptPopup(concept.key)}
                      className="rounded-xl border border-white/15 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
                    >
                      <p className="text-sm font-semibold">{concept.name}</p>
                      <p className="mt-1 text-xs text-white/70">{concept.count} images</p>
                    </button>
                  ))}
                </div>

                {/* <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                  <Search className="h-4 w-4 text-foreground/60" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search title, category, or file path..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                  />
                </div>

                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.12em] text-foreground/58">Library Feed</p>
                  <p className="text-xs text-foreground/62">
                    Showing {visibleFeed.length} of {filteredFeed.length}
                  </p>
                </div>

                {visibleFeed.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No visual design images found for this filter.
                  </div>
                ) : (
                  <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleFeed.map((image, index) => (
                      <motion.button
                        key={image.id}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.22, delay: index * 0.03 }}
                        whileHover={{ y: -4 }}
                        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left transition-all duration-300 ease-out hover:border-accent3/50 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <StableMediaImage
                            src={image.url}
                            alt={image.title}
                            containerClassName="h-full w-full bg-black/30"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base leading-snug">{image.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {image.conceptName}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {new Date(image.updatedAt).toLocaleDateString("en-US")}
                            </Badge>
                          </div>
                          <a
                            href={image.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                          >
                            Open full image
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        </CardContent>
                      </motion.button>
                    ))}
                  </section>
                )}

                {canLoadMoreFeed && (
                  <div className="mt-4 flex justify-center">
                    <Button variant="outline" className="bg-transparent" onClick={() => setFeedLimit((prev) => prev + 9)}>
                      View More
                    </Button>
                  </div>
                )} */}
              </section>
            )}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {conceptPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/65 p-4 backdrop-blur-md md:p-8"
            onClick={() => setConceptPopup(null)}
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
                  <p className="truncate text-sm font-semibold text-white">{conceptPopup.title}</p>
                  <p className="truncate text-xs text-white/70">{conceptPopup.subtitle}</p>
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
                    onClick={() => setConceptPopup(null)}
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
                    {conceptPopup.items.map((item, index) => (
                      <button
                        key={`${item.id}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(item)}
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
                          {popupIndex + 1}/{conceptPopup.items.length}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelectedImage(popupItem)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                      >
                        Open Fullscreen
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                      {conceptPopup.items.map((item, idx) => (
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
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setSelectedImage(null)}
            role="presentation"
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
                onClick={() => setSelectedImage(null)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Close image preview"
              >
                <X className="h-4 w-4" />
              </button>
              <StableMediaImage
                src={selectedImage.url}
                alt={selectedImage.title}
                containerClassName="w-full max-h-[82vh] bg-black"
                className="w-full max-h-[82vh] object-contain"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{selectedImage.title}</h2>
                <p className="mt-1 text-sm text-white/70">
                  {selectedImage.conceptName} • {new Date(selectedImage.updatedAt).getFullYear()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default VisualDesignsPage;
