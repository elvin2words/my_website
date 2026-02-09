import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Brush, ExternalLink, Loader2, NotebookPen, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { InstagramFollowUrl, linkedInFollowUrl } from "@/data/designCircle";
import type { MediaManifest } from "@/types/content";

const emptyManifest: MediaManifest = {
  folder: "creatives",
  concepts: [],
  items: [],
};

const VisualDesignsPage: React.FC = () => {
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

  const visibleImages = useMemo(() => {
    if (activeConcept === "all") return imageItems;
    return imageItems.filter((image) => image.conceptKey === activeConcept);
  }, [activeConcept, imageItems]);

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
                    Gallery
                  </Button>
                </Link>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    Blog
                  </Button>
                </Link>
                <Link href="/projects" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    Projects
                  </Button>
                </Link>
                <a
                  href={InstagramFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  More on Instagram
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>

            <section className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 mb-4">
                <Sparkles className="h-4 w-4 text-accent3" />
                <span className="text-sm text-white/90">Visual Designs</span>
                <Sparkles className="h-4 w-4 text-accent3" />
              </div>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Logos, Flyers, Banners, and Design Work
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl mx-auto mb-5">
                A visual lane for graphical work and other creative design assets.
              </p>

              <div className="flex flex-wrap justify-center gap-3">
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
                {/* <a
                  href={linkedInFollowUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md border border-blue-400/60 px-4 py-2 text-sm font-medium text-blue-200 hover:bg-blue-500/20 transition-colors"
                >
                  LinkedIn Feed
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
                <Link href="/creative/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Go to Blog
                  </Button>
                </Link> */}
              </div>
            </section>

            {isLoading && (
              <div className="mb-10 rounded-xl border border-white/15 bg-white/5 p-6 flex items-center gap-3">
                <Loader2 className="h-5 w-5 animate-spin text-accent3" />
                <p className="text-white/80 text-sm">Loading visual design assets...</p>
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
                  <div className="flex items-center gap-2 mb-4">
                    <Brush className="h-4 w-4 text-accent3" />
                    <span className="text-sm text-white/80">Categories</span>
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
                      <p className="text-sm font-semibold">All Visual Designs</p>
                      <p className="text-xs text-white/70 mt-1">{imageItems.length} images</p>
                    </button>

                    {imageConcepts.map((concept) => (
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
                        <p className="text-xs text-white/70 mt-1">{concept.count} images</p>
                      </button>
                    ))}
                  </div>
                </section>

                {visibleImages.length === 0 ? (
                  <div className="rounded-xl border border-white/15 bg-white/5 p-6 text-sm text-white/75">
                    No visual design images found yet. Add image files into `client/public/{manifest.folder}`
                    and refresh.
                  </div>
                ) : (
                  <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visibleImages.map((image) => (
                      <Card
                        key={image.id}
                        className="bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
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
                            className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                          >
                            Open full image
                            <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                          </a>
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

export default VisualDesignsPage;
