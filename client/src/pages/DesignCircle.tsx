import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Brush,
  Camera,
  ExternalLink,
  FileText,
  Loader2,
  NotebookPen,
  RefreshCw,
  Search,
  Sparkles,
  Video,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import {
  creativeDesigns,
  InstagramFollowUrl,
  type CreativeDesign,
} from "@/data/designCircle";
import type { MediaItem, MediaManifest, MediaType } from "@/types/content";




const emptyManifest: MediaManifest = {
  folder: "creatives",
  concepts: [],
  items: [],
};

function mediaTypeLabel(mediaType: MediaType) {
  if (mediaType === "image") return "Image";
  if (mediaType === "video") return "Video";
  if (mediaType === "model") return "3D Asset";
  if (mediaType === "document") return "Design File";
  return "Asset";
}

function renderAssetPreview(item: MediaItem) {
  if (item.mediaType === "image") {
    return (
      <StableMediaImage
        src={item.url}
        alt={item.title}
        containerClassName="h-full w-full bg-black/30"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    );
  }

  if (item.mediaType === "video") {
    return (
      <video
        src={item.url}
        controls
        preload="metadata"
        className="h-full w-full object-cover bg-black"
      />
    );
  }

  return (
    <div className="grid h-full w-full place-items-center bg-black/40 text-white/70">
      <div className="flex flex-col items-center gap-2">
        {item.mediaType === "model" ? <Brush className="h-8 w-8" /> : <FileText className="h-8 w-8" />}
        <span className="text-xs uppercase tracking-[0.12em]">
          {item.extension.replace(".", "") || "asset"}
        </span>
      </div>
    </div>
  );
}

const DesignCircle: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [designQuery, setDesignQuery] = useState("");
  const [assetQuery, setAssetQuery] = useState("");
  const [selectedGeneral, setSelectedGeneral] = useState<CreativeDesign | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<MediaItem | null>(null);

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
      setError(err instanceof Error ? err.message : "Failed to load design content");
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
      setSelectedGeneral(null);
      setSelectedAsset(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const visibleGeneralDesigns = useMemo(() => {
    const q = designQuery.trim().toLowerCase();
    if (!q) return creativeDesigns;
    return creativeDesigns.filter((design) =>
      [design.title, design.summary, design.focus, ...design.tools].join(" ").toLowerCase().includes(q),
    );
  }, [designQuery]);

  const visibleDesignAssets = useMemo(() => {
    const q = assetQuery.trim().toLowerCase();
    return manifest.items.filter((item) => {
      const byConcept = activeConcept === "all" || item.conceptKey === activeConcept;
      if (!byConcept) return false;
      if (!q) return true;
      return [item.title, item.conceptName, item.relativePath, mediaTypeLabel(item.mediaType)]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [activeConcept, assetQuery, manifest.items]);

  const stats = useMemo(
    () => ({
      generalDesigns: creativeDesigns.length,
      concepts: manifest.concepts.length,
      assets: manifest.items.length,
      filteredAssets: visibleDesignAssets.length,
    }),
    [manifest.concepts.length, manifest.items.length, visibleDesignAssets.length],
  );

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>

              {/* <div className="flex flex-wrap items-center gap-2">
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
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="mr-2 h-4 w-4" />
                    Blog
                  </Button>
                </Link>
              </div> */}
            </div>

            {/* <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-20 top-[-72px] h-52 w-52 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent3) / 0.2)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-88px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.15)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  DesignCircle
                </Badge>

                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Creative work across design, visuals, and storytelling systems
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  A central hub for visual explorations, creative assets, and concept-driven design iterations.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <Button variant="outline" className="bg-transparent" onClick={() => loadDesigns(true)} disabled={isRefreshing}>
                    {isRefreshing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Refresh Assets
                  </Button>
                  <a
                    href={InstagramFollowUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 transition-colors hover:bg-blue-500/20"
                  >
                    Creative Work on IG
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </section> */}

            <section className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Creatives</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>
              

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Creative work across design, visuals, and storytelling
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-6">
                A space for general creative design work, creative photography shots, and selected
                writing. This is my extended visual and narrative corner on the internet.
              </p>
              

              {/* <div className="mb-6">
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
                  Refresh Creatives
                </Button>
              </div> */}

              <div className="flex flex-wrap justify-center gap-3">
      
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button className="bg-accent3 text-black hover:bg-accent3/80">
                    <Camera className="h-4 w-4 mr-2" />
                    Open Gallery
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog + Writings
                  </Button>
                </Link>
                <Link href="/creative/visual-designs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="h-4 w-4 mr-2" />
                    Visual Designs
                  </Button>
                </Link>
                {/* <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Feed on LinkedIn
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a> */}
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Creative Work on IG
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </section>
            
            {/* <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">
                    General Designs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.generalDesigns}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">
                    Asset Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.concepts}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">
                    Total Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.assets}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">
                    Filtered Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.filteredAssets}</p>
                </CardContent>
              </Card>
            </section> */}

            <section className="mb-10 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Brush className="h-4 w-4 text-accent3" />
                <h2 className="text-xl font-semibold text-foreground md:text-2xl">General Creative Designs</h2>
              </div>


              <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                <Search className="h-4 w-4 text-foreground/60" />
                <input
                  value={designQuery}
                  onChange={(event) => setDesignQuery(event.target.value)}
                  placeholder="Search title, focus, tools..."
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {visibleGeneralDesigns.map((design, index) => (
                  <motion.button
                    key={design.id}
                    type="button"
                    onClick={() => setSelectedGeneral(design)}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.22, delay: index * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="overflow-hidden rounded-2xl border border-border bg-background/35 text-left transition hover:border-accent3/50"
                  >
                    <StableMediaImage
                      src={design.image}
                      alt={design.title}
                      containerClassName="aspect-video bg-black/35"
                      className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                    />
                    <div className="p-4">
                      <p className="text-lg font-semibold text-foreground">{design.title}</p>
                      <p className="mt-2 line-clamp-3 text-sm text-foreground/75">{design.summary}</p>
                      <p className="mt-2 text-xs text-accent3">{design.focus}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {design.tools.map((tool) => (
                          <Badge key={`${design.id}-${tool}`} variant="secondary" className="bg-white/10 text-white">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            {/* {isLoading && (
              <div className="mb-10 flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-6">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-sm text-white/80">Loading creative folders...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Video className="h-4 w-4 text-accent3" />
                  <h2 className="text-xl font-semibold text-foreground md:text-2xl">Creative Concepts</h2>
                </div>

                <div className="mb-4 flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                  <Search className="h-4 w-4 text-foreground/60" />
                  <input
                    value={assetQuery}
                    onChange={(event) => setAssetQuery(event.target.value)}
                    placeholder="Search concept, file path, media type..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                  />
                </div>

                <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <button
                    onClick={() => setActiveConcept("all")}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      activeConcept === "all"
                        ? "border-accent3 bg-accent3/20"
                        : "border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="text-sm font-semibold">All Concepts</p>
                    <p className="mt-1 text-xs text-white/70">{manifest.items.length} assets</p>
                  </button>

                  {manifest.concepts.map((concept) => (
                    <button
                      key={concept.key}
                      onClick={() => setActiveConcept(concept.key)}
                      className={`overflow-hidden rounded-xl border text-left transition-all duration-300 ease-out ${
                        activeConcept === concept.key
                          ? "border-accent3 bg-accent3/20"
                          : "border-white/15 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10"
                      }`}
                    >
                      <div className="h-20 bg-black/40">
                        {concept.coverUrl ? (
                          <StableMediaImage
                            src={concept.coverUrl}
                            alt={concept.name}
                            containerClassName="h-full w-full"
                            className="object-cover opacity-90"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-xs text-white/60">
                            <span className="inline-flex items-center gap-1">
                              <Video className="h-3.5 w-3.5" />
                              Asset folder
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold">{concept.name}</p>
                        <p className="mt-1 text-xs text-white/70">{concept.count} assets</p>
                      </div>
                    </button>
                  ))}
                </div>

                {visibleDesignAssets.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No design files found yet. Add assets into `client/public/{manifest.folder}`.
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {visibleDesignAssets.map((asset) => (
                      <Card
                        key={asset.id}
                        className="overflow-hidden border-white/10 bg-white/5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent3/50 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
                      >
                        <button type="button" onClick={() => setSelectedAsset(asset)} className="w-full text-left">
                          <div className="aspect-video overflow-hidden">{renderAssetPreview(asset)}</div>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{asset.title}</CardTitle>
                          </CardHeader>
                        </button>
                        <CardContent className="space-y-3">
                          <div className="text-xs text-white/75">{asset.relativePath}</div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {asset.conceptName}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {mediaTypeLabel(asset.mediaType)}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {new Date(asset.updatedAt).toLocaleDateString("en-US")}
                            </Badge>
                          </div>
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                          >
                            Open asset
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            )} */}
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedGeneral && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/60 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedGeneral(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/82 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{selectedGeneral.title}</p>
                  <p className="truncate text-xs text-white/70">{selectedGeneral.focus}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGeneral(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close design detail"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="grid min-h-0 flex-1 gap-0 md:grid-cols-[1.2fr_minmax(0,1fr)]">
                <StableMediaImage
                  src={selectedGeneral.image}
                  alt={selectedGeneral.title}
                  containerClassName="h-full w-full bg-black/45"
                  className="h-full w-full object-cover"
                />
                <div className="min-h-0 overflow-y-auto p-4 md:p-5">
                  <p className="text-sm leading-relaxed text-white/82">{selectedGeneral.summary}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.1em] text-white/65">Tools</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedGeneral.tools.map((tool) => (
                      <span
                        key={`${selectedGeneral.id}-${tool}`}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white/82"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {selectedAsset && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] bg-black/60 p-4 backdrop-blur-md md:p-8"
            onClick={() => setSelectedAsset(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/82 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{selectedAsset.title}</p>
                  <p className="truncate text-xs text-white/70">
                    {selectedAsset.conceptName} • {mediaTypeLabel(selectedAsset.mediaType)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close asset detail"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="min-h-0 flex-1 bg-black/45 p-2 md:p-4">
                {selectedAsset.mediaType === "image" && (
                  <StableMediaImage
                    src={selectedAsset.url}
                    alt={selectedAsset.title}
                    containerClassName="h-full w-full rounded-xl bg-black"
                    className="h-full w-full object-contain"
                  />
                )}
                {selectedAsset.mediaType === "video" && (
                  <video src={selectedAsset.url} controls className="h-full w-full rounded-xl bg-black object-contain" />
                )}
                {selectedAsset.mediaType !== "image" && selectedAsset.mediaType !== "video" && (
                  <div className="grid h-full w-full place-items-center rounded-xl border border-white/15 bg-white/5 p-5 text-center">
                    <div>
                      <p className="text-sm text-white/82">This asset opens in a new tab.</p>
                      <a
                        href={selectedAsset.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                      >
                        Open Asset
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence> */}

      <Footer />
    </>
  );
};

export default DesignCircle;
