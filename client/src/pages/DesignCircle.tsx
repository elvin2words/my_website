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
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { InstagramFollowUrl, linkedInFollowUrl } from "@/data/designCircle";
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
      <img
        src={item.url}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
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
                        className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-colors"
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
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DesignCircle;
