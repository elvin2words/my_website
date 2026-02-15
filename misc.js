import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Box,
  Brush,
  Camera,
  ExternalLink,
  FileText,
  Loader2,
  NotebookPen,
  RefreshCw,
  Sparkles,
  Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { creativeDesigns, InstagramFollowUrl, linkedInFollowUrl } from "@/data/designCircle";
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
    <div className="h-full w-full bg-black/40 grid place-items-center text-white/70">
      <div className="flex flex-col items-center gap-2">
        {item.mediaType === "model" ? <Box className="h-8 w-8" /> : <FileText className="h-8 w-8" />}
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

  const loadDesigns = useCallback(async (refresh = false) => {
    try {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);
      const response = await fetch("/api/content/designs", {
        cache: "no-store",
        headers: { "cache-control": "no-cache" },
      });
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

  const visibleDesigns = useMemo(() => {
    if (activeConcept === "all") return manifest.items;
    return manifest.items.filter((item) => item.conceptKey === activeConcept);
  }, [activeConcept, manifest.items]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

            <section className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Creatives</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>
              {/* <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Creative designs, visual studies, and future-ready assets
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-4">
                Add screenshots now, then scale into video and 3D assets later. Files inside
                `client/public/{manifest.folder}` are auto-listed, and subfolders become concept
                mini-showcases.
              </p>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-6">
                This keeps room for Blender, Adobe, Canva, and richer design workflows as your
                portfolio grows.
              </p> */}

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Creative work across design, visuals, and storytelling
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-6">
                A space for general creative design work, creative photography shots, and selected
                writing. This is my extended visual and narrative corner on the internet.
              </p>
              

              <div className="mb-6">
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
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Creative Work on IG
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button className="bg-accent3 text-black hover:bg-accent3/80">
                    <Camera className="h-4 w-4 mr-2" />
                    Open Gallery
                  </Button>
                </Link>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog + Writings
                  </Button>
                </Link>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Feed on LinkedIn
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-6 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-white/80 text-sm">Loading creative folders...</p>
              </div>
            )}

            {error && (
              <div className="mb-10 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                {error}
              </div>
            )}

            {!isLoading && !error && (
              <section className="mb-8">
                <div className="flex items-center gap-2 mb-5">
                  <Brush className="h-5 w-5 text-accent3" />
                  <h2 className="text-2xl md:text-3xl font-semibold">Creative Concepts</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                  <button
                    onClick={() => setActiveConcept("all")}
                    className={`rounded-xl border p-3 text-left transition-colors ${
                      activeConcept === "all"
                        ? "border-accent3 bg-accent3/20"
                        : "border-white/15 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="text-sm font-semibold">All Concepts</p>
                    <p className="text-xs text-white/70 mt-1">{manifest.items.length} assets</p>
                  </button>

                  {manifest.concepts.map((concept) => (
                    <button
                      key={concept.key}
                      onClick={() => setActiveConcept(concept.key)}
                      className={`rounded-xl border overflow-hidden text-left transition-all duration-300 ease-out ${
                        activeConcept === concept.key
                          ? "border-accent3 bg-accent3/20"
                          : "border-white/15 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5"
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
                          <div className="h-full w-full grid place-items-center text-xs text-white/60">
                            <span className="inline-flex items-center gap-1">
                              <Video className="h-3.5 w-3.5" />
                              Asset folder
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-semibold">{concept.name}</p>
                        <p className="text-xs text-white/70 mt-1">{concept.count} assets</p>
                      </div>
                    </button>
                  ))}
                </div>

                {visibleDesigns.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No design files found yet. Add screenshots into `client/public/{manifest.folder}`
                    and they will appear automatically.
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visibleDesigns.map((design) => (
                      <Card
                        key={design.id}
                        className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
                      >
                        <div className="aspect-video overflow-hidden">{renderAssetPreview(design)}</div>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg">{design.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="text-xs text-white/75">{design.relativePath}</div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {design.conceptName}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {mediaTypeLabel(design.mediaType)}
                            </Badge>
                            <Badge variant="secondary" className="bg-white/10 text-white">
                              {new Date(design.updatedAt).toLocaleDateString("en-US")}
                            </Badge>
                          </div>
                          <a
                            href={design.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                          >
                            Open asset
                            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </section>
            )}

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Brush className="h-5 w-5 text-accent3" />
                <h2 className="text-2xl md:text-3xl font-semibold">General Creative Designs</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {creativeDesigns.map((design) => (
                  <Card
                    key={design.id}
                    className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-colors"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{design.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-white/75">{design.summary}</p>
                      <div className="text-xs text-accent3">{design.focus}</div>
                      <div className="flex flex-wrap gap-2">
                        {design.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="bg-white/10 text-white">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DesignCircle;










import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Filter, Loader2, RefreshCw, X } from "lucide-react";
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

const GalleryPage: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [selectedShot, setSelectedShot] = useState<MediaItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);




  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [selectedShot2, setSelectedShot2] = useState<PhotoShot | null>(null);
  


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




  const collections = useMemo(() => {
    return ["all", ...Array.from(new Set(photoShots.map((shot) => shot.collection)))];
  }, []);

  const visibleShots2 = useMemo(() => {
    if (activeCollection === "all") return photoShots;
    return photoShots.filter((shot) => shot.collection === activeCollection);
  }, [activeCollection]);
    




  
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
              {/* <p className="text-white/75 max-w-3xl">
                Upload images into `client/public/{manifest.folder}`. Root files appear under General,
                and subfolders become concept mini-showcases you can filter by.
              </p> */}

              <p className="text-white/75 max-w-3xl">
                A curated set of shots from different seasons and moods. Tap any photo to view
                it larger.
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
                        className={`rounded-xl border overflow-hidden text-left transition-all duration-300 ease-out ${
                          activeConcept === concept.key
                            ? "border-accent3 bg-accent3/20"
                            : "border-white/15 bg-white/5 hover:bg-white/10 hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="h-24 bg-black/40 relative">
                          {concept.coverUrl ? (
                            <StableMediaImage
                              src={concept.coverUrl}
                              alt={concept.name}
                              containerClassName="h-full w-full"
                              className="object-cover opacity-90"
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
                  <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleShots.map((shot) => (
                      <button
                        key={shot.id}
                        onClick={() => setSelectedShot(shot)}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.28)]"
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
              </>
            )}









            <section className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                  <Filter className="h-4 w-4" />
                  Collections:
                </span>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setActiveCollection(collection)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      activeCollection === collection
                        ? "bg-accent3 text-black border-accent3"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </section>


            <section className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {visibleShots2.map((shot) => (
                <button
                  key={shot.id}
                  onClick={() => setSelectedShot2(shot)}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-colors"
                >
                  <img
                    src={shot.image}
                    alt={shot.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
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

         



          </div>
        </main>
      </div>

      {/* {selectedShot && (
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
              decoding="async"
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
      )} */}





      {/* {selectedShot && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedShot2(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl border border-white/20 bg-primary/80 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot2(null)}
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
      )} */}


      {selectedShot2 && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedShot2(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl border border-white/20 bg-primary/80 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot2(null)}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={selectedShot2.image}
              alt={selectedShot2.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedShot2.title}</h2>
              <p className="text-sm text-white/70 mt-1">
                {selectedShot2.collection} • {selectedShot2.year}
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




















import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Loader2, NotebookPen, RefreshCw } from "lucide-react";
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













import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Camera,
  Code2,
  Cpu,
  ListFilter,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { projects as engineerProjects } from "@/data/engineer";
import { projects as developerProjects } from "@/data/developer";

type ProjectDomain = "Engineering" | "Developer";
type ProjectFilter = "all" | ProjectDomain;

interface ShowcaseProject {
  id: string;
  title: string;
  summary: string;
  highlight: string;
  domain: ProjectDomain;
  image: string;
  tags: string[];
  sourceHref: string;
}

const engineeringProjectVisuals = [
  "/gallery/Zz4/c74a1339e57e69ecf9d7bea55dc5c447.png",
  "/gallery/Zz4/c14079459042483b6b4140885788a392.png",
  "/gallery/Zz4/7110b2204f825e6877b5eae9f3bf36ab.png",
  "/gallery/Zz4/68670673560bc8fd790f1086ed6312d9.png",
  "/gallery/Zz4/20250628_204311.jpg",
  "/gallery/Zz4/20240607_185944.jpg",
];

const developerProjectVisuals = [
  "/projects/codecircle.png",
  "/gallery/Zz3/f46057f7cefdc09387d135e73e2c33a2.png",
  "/gallery/Zz3/Screenshot_20240825_122336_Instagram.jpg",
  "/gallery/Zz3/Screenshot_20240619_135541_TikTok.jpg",
  "/gallery/Zz1/Screenshot_20250226_233353_WhatsAppBusiness.jpg",
  "/gallery/Zz1/Screenshot_20241016_192552_WhatsApp.jpg",
  "/gallery/Zz4/20231015_141306.jpg",
];

function toTagList(raw: string, fallback: string[]) {
  const parsed = raw
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return parsed.length > 0 ? parsed : fallback;
}

const showcaseProjects: ShowcaseProject[] = [
  ...engineerProjects.map((project, index) => ({
    id: `engineering-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.extra,
    domain: "Engineering" as const,
    image: engineeringProjectVisuals[index % engineeringProjectVisuals.length],
    tags: toTagList(project.extra ?? "", ["Power Systems", "Control", "Embedded"]),
    sourceHref: "/engineer",
  })),
  ...developerProjects.map((project, index) => ({
    id: `developer-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.architecture.slice(0, 2).join(" • "),
    domain: "Developer" as const,
    image: developerProjectVisuals[index % developerProjectVisuals.length],
    tags: project.tech.slice(0, 3),
    sourceHref: "/developer",
  })),
];

const filterOptions: Array<{ key: ProjectFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "Engineering", label: "Engineering" },
  { key: "Developer", label: "Developer" },
];

const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => {
    const engineeringCount = showcaseProjects.filter((project) => project.domain === "Engineering").length;
    const developerCount = showcaseProjects.filter((project) => project.domain === "Developer").length;

    return {
      total: showcaseProjects.length,
      engineeringCount,
      developerCount,
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return showcaseProjects.filter((project) => {
      const matchesDomain = activeFilter === "all" || project.domain === activeFilter;
      const matchesQuery =
        query.length === 0 ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.highlight.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesDomain && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Gallery
                  </Button>
                </Link>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog
                  </Button>
                </Link>
              </div>
            </div>

            <section className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Project Showcase</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Engineering x Software Portfolio
              </h1>
              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto">
                A combined showcase - but you can filter through
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent1">{stats.engineeringCount}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent2">{stats.developerCount}</p>
                </CardContent>
              </Card>
            </section>

            <section className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5 mb-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                    <ListFilter className="h-4 w-4" />
                    Domain:
                  </span>
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        activeFilter === filter.key
                          ? "bg-accent3 text-black border-accent3"
                          : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-80">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects, tech, or keywords..."
                    className="pl-9 bg-black/20 border-white/20"
                  />
                </div>
              </div>
            </section>

            {visibleProjects.length === 0 ? (
              <section className="rounded-xl border border-white/15 bg-white/5 p-8 text-center text-white/75">
                No projects match your current filter/search. Try a broader query.
              </section>
            ) : (
              <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black/30">
                      <StableMediaImage
                        src={project.image}
                        alt={`${project.title} preview`}
                        containerClassName="h-full w-full"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                      <Badge className="absolute top-3 left-3 border border-white/20 bg-black/60 text-white">
                        <Cpu className="h-3.5 w-3.5 mr-1.5" />
                        {project.domain}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-white/75">{project.summary}</p>
                      <p className="text-xs text-accent3">{project.highlight}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={`${project.id}-${tag}`} variant="secondary" className="bg-white/10 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <Link href={project.sourceHref} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Code2 className="h-4 w-4 mr-2" />
                          Open {project.domain} Persona
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProjectsShowcase;











{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}










import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    // Commenting this because it's ESM-only and breaks build
    // runtimeErrorOverlay(),
  ],
  // base: '/', // or '' if you run into issues
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      // Optional: if you ensure these folders exist within client/ or via workspaces
      // "@shared": path.resolve(__dirname, "../shared"),
      // "@assets": path.resolve(__dirname, "../attached_assets"),
    },
  },
  build: {
    // outDir: path.resolve(__dirname, "../dist/public"),
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    host: true,
  },
});







import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import {
  linkedInFollowUrl,
  photoShots,
  type PhotoShot,
} from "@/data/designCircle";

const GalleryPage: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [selectedShot, setSelectedShot] = useState<PhotoShot | null>(null);

  const collections = useMemo(() => {
    return ["all", ...Array.from(new Set(photoShots.map((shot) => shot.collection)))];
  }, []);

  const visibleShots = useMemo(() => {
    if (activeCollection === "all") return photoShots;
    return photoShots.filter((shot) => shot.collection === activeCollection);
  }, [activeCollection]);

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
                href={linkedInFollowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
              >
                Follow on LinkedIn
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>

            <section className="mb-6">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Photography Gallery</h1>
              <p className="text-white/75 max-w-3xl">
                A curated set of shots from different seasons and moods. Tap any photo to view
                it larger.
              </p>
            </section>

            <section className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                  <Filter className="h-4 w-4" />
                  Collections:
                </span>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setActiveCollection(collection)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      activeCollection === collection
                        ? "bg-accent3 text-black border-accent3"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </section>

            <section className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {visibleShots.map((shot) => (
                <button
                  key={shot.id}
                  onClick={() => setSelectedShot(shot)}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-colors"
                >
                  <img
                    src={shot.image}
                    alt={shot.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
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
              src={selectedShot.image}
              alt={selectedShot.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedShot.title}</h2>
              <p className="text-sm text-white/70 mt-1">
                {selectedShot.collection} • {selectedShot.year}
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














import Engineer from "@/pages/Engineer";
import Developer from "@/pages/Developer";
import CreativeTechnologist from "@/pages/Creative";
import Technopreneur from "@/pages/Technopreneur";
import JustElvin from "@/pages/JustElvin";
import NotFound from "@/pages/not-found";
import Developer from "@/pages/Developer";
import CreativeTechnologist from "@/pages/Creative";
import DesignCircle from "@/pages/DesignCircle";
import GalleryPage from "@/pages/Gallery";
import BlogWritingsPage from "@/pages/BlogWritings";
import Technopreneur from "@/pages/Technopreneur";
import JustElvin from "@/pages/JustElvin";
import NotFound from "@/pages/not-found";
import Admin from './pages/Admin';
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/engineer" component={Engineer} />
        <Route path="/creative" component={CreativeTechnologist} />
        <Route path="/developer" component={Developer} />
        <Route path="/technopreneur" component={Technopreneur} />
        <Route path="/beyond" component={JustElvin} />
        <Route path="/" component={Home} />
        <Route path="/engineer" component={Engineer} />
        <Route path="/creative" component={CreativeTechnologist} />
        <Route path="/creative/journey" component={CreativeTechnologist} />
        <Route path="/creative/portfolio" component={DesignCircle} />
        <Route path="/creative/gallery" component={GalleryPage} />
        <Route path="/creative/blog" component={BlogWritingsPage} />
        <Route path="/designcircle" component={DesignCircle} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/blog" component={BlogWritingsPage} />
        <Route path="/developer" component={Developer} />
        <Route path="/technopreneur" component={Technopreneur} />
        <Route path="/beyond" component={JustElvin} />
        <Route path="/admin" component={Admin} />

export default App;
export default App;







import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Filter, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

const GalleryPage: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<string>("all");
  const [selectedShot, setSelectedShot] = useState<MediaItem | null>(null);

  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [selectedShot2, setSelectedShot2] = useState<PhotoShot | null>(null);
  

  useEffect(() => {
    let cancelled = false;

    const loadGallery = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/content/gallery");
        if (!response.ok) {
          throw new Error(`Failed to load gallery content (${response.status})`);
        }

        const data = (await response.json()) as MediaManifest;
        if (!cancelled) {
          setManifest(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load gallery");
          setManifest(emptyManifest);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleShots = useMemo(() => {
    if (activeConcept === "all") return manifest.items;
    return manifest.items.filter((shot) => shot.conceptKey === activeConcept);
  }, [activeConcept, manifest.items]);

  const totalItems = manifest.items.length;




  const collections = useMemo(() => {
    return ["all", ...Array.from(new Set(photoShots.map((shot) => shot.collection)))];
  }, []);

  const visibleShots2 = useMemo(() => {
    if (activeCollection === "all") return photoShots;
    return photoShots.filter((shot) => shot.collection === activeCollection);
  }, [activeCollection]);
    
  




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
                A curated set of shots from different seasons and moods. Tap any photo to view
                it larger.
              </p>
            </section>

            <section className="mb-6">
              <p className="text-white/75 max-w-3xl">
                Upload any images into `client/public/{manifest.folder}`. Subfolders become concept
                showcases automatically, and files in root go under General.
              </p>
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
                      <p className="text-xs text-white/70 mt-1">{totalItems} shots</p>
                    </button>

                    {manifest.concepts.map((concept) => (
                      <button
                        key={concept.id}
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






            <section className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                  <Filter className="h-4 w-4" />
                  Collections:
                </span>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setActiveCollection(collection)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      activeCollection === collection
                        ? "bg-accent3 text-black border-accent3"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </section>


            <section className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {visibleShots2.map((shot) => (
                <button
                  key={shot.id}
                  onClick={() => setSelectedShot2(shot)}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-colors"
                >
                  <img
                    src={shot.image}
                    alt={shot.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
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

          </div>
        </main>
      </div>

      {selectedShot && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedShot2(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl border border-white/20 bg-primary/80 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot2(null)}
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

      {/* {selectedShot2 && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center"
          onClick={() => setSelectedShot2(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl border border-white/20 bg-primary/80 overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelectedShot2(null)}
              className="absolute top-3 right-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={selectedShot2.image}
              alt={selectedShot2.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedShot2.title}</h2>
              <p className="text-sm text-white/70 mt-1">
                {selectedShot2.collection} • {selectedShot2.year}
              </p>
            </div>
          </div>
        </div>
      )} */}

      <Footer />
    </>
  );
};

export default GalleryPage;































import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Brush,
  Camera,
  ExternalLink,
  Loader2,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { creativeDesigns, InstagramFollowUrl, linkedInFollowUrl } from "@/data/designCircle";
import type { MediaManifest } from "@/types/content";

const emptyManifest: MediaManifest = {
  folder: "creative-designs",
  concepts: [],
  items: [],
};

const DesignCircle: React.FC = () => {
  const [manifest, setManifest] = useState<MediaManifest>(emptyManifest);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeConcept, setActiveConcept] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;

    const loadDesigns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/content/designs");
        if (!response.ok) {
          throw new Error(`Failed to load design content (${response.status})`);
        }

        const data = (await response.json()) as MediaManifest;
        if (!cancelled) {
          setManifest(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load design content");
          setManifest(emptyManifest);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadDesigns();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleDesigns = useMemo(() => {
    if (activeConcept === "all") return manifest.items;
    return manifest.items.filter((item) => item.conceptKey === activeConcept);
  }, [activeConcept, manifest.items]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>

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
                A space for general creative design work, photography selections, and published
                writing. This is the visual and narrative side of how I build.
              </p>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-6">
                Drop visuals into `client/public/{manifest.folder}`. Concept subfolders become mini
                showcases automatically and keep this space expandable for Blender, Adobe, Canva,
                and future 3D-first presentation.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Creative Work on IG
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button className="bg-accent3 text-black hover:bg-accent3/80">
                    <Camera className="h-4 w-4 mr-2" />
                    Open Gallery
                  </Button>
                </Link>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog + Writings
                  </Button>
                </Link>
                <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  Feed on LinkedIn
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-6 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-white/80 text-sm">Loading creative-design folders...</p>
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
                  <div className="flex items-center gap-2 mb-5">
                    <Brush className="h-5 w-5 text-accent3" />
                    <h2 className="text-2xl md:text-3xl font-semibold">General Creative Designs</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    <button
                      onClick={() => setActiveConcept("all")}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        activeConcept === "all"
                          ? "border-accent3 bg-accent3/20"
                          : "border-white/15 bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      <p className="text-sm font-semibold">All Concepts</p>
                      <p className="text-xs text-white/70 mt-1">{manifest.items.length} visuals</p>
                    </button>

                    {manifest.concepts.map((concept) => (
                      <button
                        key={concept.id}
                        onClick={() => setActiveConcept(concept.key)}
                        className={`rounded-xl border overflow-hidden text-left transition-colors ${
                          activeConcept === concept.key
                            ? "border-accent3 bg-accent3/20"
                            : "border-white/15 bg-white/5 hover:bg-white/10"
                        }`}
                      >
                        <div className="h-20 bg-black/40">
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
                          <p className="text-xs text-white/70 mt-1">{concept.count} visuals</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {visibleDesigns.length === 0 ? (
                    <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                      No visual files found yet. Add files into `client/public/{manifest.folder}`.
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {visibleDesigns.map((design) => (
                        <Card
                          key={design.id}
                          className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-colors"
                        >
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={design.url}
                              alt={design.title}
                              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{design.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="text-xs text-white/75">{design.relativePath}</div>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className="bg-white/10 text-white">
                                {design.conceptName}
                              </Badge>
                              <Badge variant="secondary" className="bg-white/10 text-white">
                                {new Date(design.updatedAt).toLocaleDateString("en-US")}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Brush className="h-5 w-5 text-accent3" />
                <h2 className="text-2xl md:text-3xl font-semibold">General Creative Designs</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {creativeDesigns.map((design) => (
                  <Card
                    key={design.id}
                    className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-colors"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{design.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-white/75">{design.summary}</p>
                      <div className="text-xs text-accent3">{design.focus}</div>
                      <div className="flex flex-wrap gap-2">
                        {design.tools.map((tool) => (
                          <Badge key={tool} variant="secondary" className="bg-white/10 text-white">
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DesignCircle;









export const linkedInFollowUrl =
  "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=elvin-mazwimairi";

export const InstagramFollowUrl = "https://instagram.com/young_mazwi";


export interface CreativeDesign {
  id: string;
  title: string;
  summary: string;
  focus: string;
  tools: string[];
  image: string;
}

export const creativeDesigns: CreativeDesign[] = [
  {
    id: "design-01",
    title: "Brand Story Frames",
    summary:
      "A lightweight visual system for social storytelling, built around clean layout rhythms and clear messaging.",
    focus: "Brand visuals",
    tools: ["Canva", "Lightroom", "Typography"],
    image: "/gallery/TidbitsWithElvin1/3.jpg",
  },
  {
    id: "design-02",
    title: "Motion Poster Concepts",
    summary:
      "Poster-style compositions shaped for short-form video, balancing punchy visuals with strong legibility.",
    focus: "Motion-first design",
    tools: ["CapCut", "After Effects", "Color grading"],
    image: "/gallery/Zz4/20250623_120419.jpg",
  },
  {
    id: "design-03",
    title: "Editorial Carousel Kits",
    summary:
      "Carousel templates for thought leadership content, structured for swipe-flow and narrative pacing.",
    focus: "Content systems",
    tools: ["Figma", "Canva", "Grid systems"],
    image: "/gallery/Zz3/Screenshot_20240619_135541_TikTok.jpg",
  },
  {
    id: "design-04",
    title: "Creative Campaign Visuals",
    summary:
      "Campaign visuals designed to keep a consistent voice across posts, stories, and launch snippets.",
    focus: "Campaign art direction",
    tools: ["Photoshop", "Lightroom", "Visual direction"],
    image: "/gallery/Zz2/20220421_161459.jpg",
  },
  {
    id: "design-05",
    title: "Event & Culture Artwork",
    summary:
      "Visuals that blend atmosphere, people, and narrative moments into reusable design assets.",
    focus: "Culture storytelling",
    tools: ["Lightroom", "Composition", "Creative retouching"],
    image: "/gallery/Zz1/20250621_063837.jpg",
  },
  {
    id: "design-06",
    title: "Minimal Identity Experiments",
    summary:
      "Fast concept studies exploring type, contrast, and icon direction for fresh identity routes.",
    focus: "Identity exploration",
    tools: ["Figma", "Illustrator", "Design systems"],
    image: "/gallery/TidbitsWithElvin1/11.jpg",
  },
];

export interface PhotoShot {
  id: string;
  title: string;
  collection: string;
  year: number;
  image: string;
}

export const photoShots: PhotoShot[] = [
  {
    id: "shot-01",
    title: "Afterglow Lines",
    collection: "Street",
    year: 2025,
    image: "/gallery/Zz4/20250628_204311.jpg",
  },
  {
    id: "shot-02",
    title: "Blue Hour Layers",
    collection: "Street",
    year: 2025,
    image: "/gallery/Zz4/20250623_120419.jpg",
  },
  {
    id: "shot-03",
    title: "Still Sidewalk",
    collection: "Urban Moments",
    year: 2024,
    image: "/gallery/Zz4/20241126_133144.jpg",
  },
  {
    id: "shot-04",
    title: "Patterned Shadows",
    collection: "Urban Moments",
    year: 2024,
    image: "/gallery/Zz4/20240502_162518.jpg",
  },
  {
    id: "shot-05",
    title: "Morning Texture",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz3/20250621_063523.jpg",
  },
  {
    id: "shot-06",
    title: "Quiet Expression",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz3/20250621_062856.jpg",
  },
  {
    id: "shot-07",
    title: "Color Drift",
    collection: "Moodboard",
    year: 2024,
    image: "/gallery/Zz3/Screenshot_20240825_122336_Instagram.jpg",
  },
  {
    id: "shot-08",
    title: "Signal Frame",
    collection: "Moodboard",
    year: 2024,
    image: "/gallery/Zz3/Screenshot_20240619_135523_TikTok.jpg",
  },
  {
    id: "shot-09",
    title: "Raw Geometry",
    collection: "Archive",
    year: 2022,
    image: "/gallery/Zz2/IMG-20220318-WA0003.jpg",
  },
  {
    id: "shot-10",
    title: "Clouded Light",
    collection: "Archive",
    year: 2021,
    image: "/gallery/Zz2/20201121_081553.jpg",
  },
  {
    id: "shot-11",
    title: "Late Window",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz1/20250621_063837.jpg",
  },
  {
    id: "shot-12",
    title: "City Pause",
    collection: "Street",
    year: 2024,
    image: "/gallery/Zz1/20240803_101147.jpg",
  },
  {
    id: "shot-13",
    title: "First Light",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/1.jpg",
  },
  {
    id: "shot-14",
    title: "Warm Palette",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/7.jpg",
  },
  {
    id: "shot-15",
    title: "Framed Silence",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/12.jpg",
  },
];

export type WritingKind = "blog" | "writing";
export type WritingStatus = "published" | "in-progress";

export interface WritingEntry {
  id: string;
  title: string;
  kind: WritingKind;
  status: WritingStatus;
  publishedOn: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  href?: string;
}

export const writingEntries: WritingEntry[] = [
  {
    id: "writing-01",
    title: "Designing Systems People Can Feel",
    kind: "blog",
    status: "published",
    publishedOn: "November 24, 2025",
    readTime: "6 min read",
    excerpt:
      "A practical breakdown of how systems thinking and interface emotion can coexist in the same product decisions.",
    tags: ["Systems design", "UX", "Creative tech"],
  },
  {
    id: "writing-02",
    title: "When Engineering Meets Storytelling",
    kind: "writing",
    status: "published",
    publishedOn: "September 18, 2025",
    readTime: "4 min read",
    excerpt:
      "Reflections on translating technical depth into narratives people can understand, trust, and act on.",
    tags: ["Communication", "Engineering", "Narrative"],
  },
  {
    id: "writing-03",
    title: "From Idea to Visual Prototype in One Sprint",
    kind: "blog",
    status: "in-progress",
    publishedOn: "Draft in progress",
    readTime: "5 min read",
    excerpt:
      "A repeatable sprint format for validating visual concepts before committing engineering resources.",
    tags: ["Prototyping", "Workflow", "Design ops"],
  },
  {
    id: "writing-04",
    title: "Creative Discipline for Technical Builders",
    kind: "writing",
    status: "in-progress",
    publishedOn: "Draft in progress",
    readTime: "7 min read",
    excerpt:
      "Notes on building a consistent creative practice while shipping code, systems, and client work.",
    tags: ["Creativity", "Productivity", "Personal practice"],
  },
  {
    id: "writing-05",
    title: "Interfaces for Real-World Complexity",
    kind: "blog",
    status: "published",
    publishedOn: "June 2, 2025",
    readTime: "8 min read",
    excerpt:
      "How to reduce cognitive load in dashboards and data-heavy experiences without removing useful detail.",
    tags: ["Interface design", "Data UX", "Product strategy"],
  },
  {
    id: "writing-06",
    title: "On Building a Creative Career Stack",
    kind: "writing",
    status: "published",
    publishedOn: "March 11, 2025",
    readTime: "5 min read",
    excerpt:
      "A personal framework for blending engineering, design, and venture thinking into one cohesive path.",
    tags: ["Career", "Creative direction", "Interdisciplinary"],
  },
];









import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import {
  linkedInFollowUrl,
  photoShots,
  type PhotoShot,
} from "@/data/designCircle";

const GalleryPage: React.FC = () => {
  const [activeCollection, setActiveCollection] = useState<string>("all");
  const [selectedShot, setSelectedShot] = useState<PhotoShot | null>(null);

  const collections = useMemo(() => {
    return ["all", ...Array.from(new Set(photoShots.map((shot) => shot.collection)))];
  }, []);

  const visibleShots = useMemo(() => {
    if (activeCollection === "all") return photoShots;
    return photoShots.filter((shot) => shot.collection === activeCollection);
  }, [activeCollection]);

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
                href={linkedInFollowUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
              >
                Follow on LinkedIn
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>

            <section className="mb-6">
              <h1 className="text-3xl md:text-5xl font-bold mb-3">Photography Gallery</h1>
              <p className="text-white/75 max-w-3xl">
                A curated set of shots from different seasons and moods. Tap any photo to view
                it larger.
              </p>
            </section>

            <section className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                  <Filter className="h-4 w-4" />
                  Collections:
                </span>
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setActiveCollection(collection)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      activeCollection === collection
                        ? "bg-accent3 text-black border-accent3"
                        : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {collection}
                  </button>
                ))}
              </div>
            </section>

            <section className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {visibleShots.map((shot) => (
                <button
                  key={shot.id}
                  onClick={() => setSelectedShot(shot)}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:border-accent3/50 text-left transition-colors"
                >
                  <img
                    src={shot.image}
                    alt={shot.title}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
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
              src={selectedShot.image}
              alt={selectedShot.title}
              className="w-full max-h-[75vh] object-contain bg-black"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{selectedShot.title}</h2>
              <p className="text-sm text-white/70 mt-1">
                {selectedShot.collection} • {selectedShot.year}
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











import React, { useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Brush,
  Camera,
  Code2,
  Cpu,
  ListFilter,
  NotebookPen,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { projects as engineerProjects } from "@/data/engineer";
import { projects as developerProjects } from "@/data/developer";

type ProjectDomain = "Engineering" | "Developer";
type ProjectFilter = "all" | ProjectDomain;

interface ShowcaseProject {
  id: string;
  title: string;
  summary: string;
  highlight: string;
  domain: ProjectDomain;
  image: string;
  tags: string[];
  sourceHref: string;
}

const engineeringProjectVisuals = [
  "/gallery/Zz4/c74a1339e57e69ecf9d7bea55dc5c447.png",
  "/gallery/Zz4/c14079459042483b6b4140885788a392.png",
  "/gallery/Zz4/7110b2204f825e6877b5eae9f3bf36ab.png",
  "/gallery/Zz4/68670673560bc8fd790f1086ed6312d9.png",
  "/gallery/Zz4/20250628_204311.jpg",
  "/gallery/Zz4/20240607_185944.jpg",
];

const developerProjectVisuals = [
  "/projects/codecircle.png",
  "/gallery/Zz3/f46057f7cefdc09387d135e73e2c33a2.png",
  "/gallery/Zz3/Screenshot_20240825_122336_Instagram.jpg",
  "/gallery/Zz3/Screenshot_20240619_135541_TikTok.jpg",
  "/gallery/Zz1/Screenshot_20250226_233353_WhatsAppBusiness.jpg",
  "/gallery/Zz1/Screenshot_20241016_192552_WhatsApp.jpg",
  "/gallery/Zz4/20231015_141306.jpg",
];

function toTagList(raw: string, fallback: string[]) {
  const parsed = raw
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return parsed.length > 0 ? parsed : fallback;
}

const showcaseProjects: ShowcaseProject[] = [
  ...engineerProjects.map((project, index) => ({
    id: `engineering-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.extra,
    domain: "Engineering" as const,
    image: engineeringProjectVisuals[index % engineeringProjectVisuals.length],
    tags: toTagList(project.extra ?? "", ["Power Systems", "Control", "Embedded"]),
    sourceHref: "/engineer",
  })),
  ...developerProjects.map((project, index) => ({
    id: `developer-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.architecture.slice(0, 2).join(" • "),
    domain: "Developer" as const,
    image: developerProjectVisuals[index % developerProjectVisuals.length],
    tags: project.tech.slice(0, 3),
    sourceHref: "/developer",
  })),
];

const filterOptions: Array<{ key: ProjectFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "Engineering", label: "Engineering" },
  { key: "Developer", label: "Developer" },
];

const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const stats = useMemo(() => {
    const engineeringCount = showcaseProjects.filter((project) => project.domain === "Engineering").length;
    const developerCount = showcaseProjects.filter((project) => project.domain === "Developer").length;

    return {
      total: showcaseProjects.length,
      engineeringCount,
      developerCount,
    };
  }, []);

  const visibleProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return showcaseProjects.filter((project) => {
      const matchesDomain = activeFilter === "all" || project.domain === activeFilter;
      const matchesQuery =
        query.length === 0 ||
        project.title.toLowerCase().includes(query) ||
        project.summary.toLowerCase().includes(query) ||
        project.highlight.toLowerCase().includes(query) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesDomain && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="ghost" className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Home
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Gallery
                  </Button>
                </Link>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog
                  </Button>
                </Link>
                <Link href="/creative/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="h-4 w-4 mr-2" />
                    Visual Designs
                  </Button>
                </Link>
              </div>
            </div>

            <section className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Project Showcase</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Engineering x Software Portfolio
              </h1>
              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto">
                A combined showcase - but you can filter through
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent1">{stats.engineeringCount}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Developer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent2">{stats.developerCount}</p>
                </CardContent>
              </Card>
            </section>

            <section className="rounded-xl border border-white/15 bg-white/5 p-4 md:p-5 mb-8">
              <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-sm text-white/80 mr-1">
                    <ListFilter className="h-4 w-4" />
                    Domain:
                  </span>
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                        activeFilter === filter.key
                          ? "bg-accent3 text-black border-accent3"
                          : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-80">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search projects, tech, or keywords..."
                    className="pl-9 bg-black/20 border-white/20"
                  />
                </div>
              </div>
            </section>

            {visibleProjects.length === 0 ? (
              <section className="rounded-xl border border-white/15 bg-white/5 p-8 text-center text-white/75">
                No projects match your current filter/search. Try a broader query.
              </section>
            ) : (
              <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
                  >
                    <div className="relative aspect-video overflow-hidden bg-black/30">
                      <StableMediaImage
                        src={project.image}
                        alt={`${project.title} preview`}
                        containerClassName="h-full w-full"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                      <Badge className="absolute top-3 left-3 border border-white/20 bg-black/60 text-white">
                        <Cpu className="h-3.5 w-3.5 mr-1.5" />
                        {project.domain}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-white/75">{project.summary}</p>
                      <p className="text-xs text-accent3">{project.highlight}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={`${project.id}-${tag}`} variant="secondary" className="bg-white/10 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* <Link href={project.sourceHref} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                        <Button variant="outline" className="w-full bg-transparent">
                          <Code2 className="h-4 w-4 mr-2" />
                          Open {project.domain} Persona
                        </Button>
                      </Link> */}
                    </CardContent>
                  </Card>
                ))}
              </section>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ProjectsShowcase;
