import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Download, ExternalLink, FileText, Github, Image as ImageIcon, Video } from "lucide-react";
import type { Project, ProjectArtifact } from "../../../shared/schema";
import { projects as fallbackProjects } from "../../../shared/projects";
import type { CodeCircleProjectsResponse } from "@/types/projects";
import { PROJECT_STATUS_CLASSNAMES, PROJECT_STATUS_LABELS } from "@/types/projects";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

type ArtifactPreviewKind = "image" | "video" | "pdf" | "none";

function getFileExtension(value?: string) {
  if (!value) return "";
  const normalized = value.split("?")[0] ?? "";
  const dotIndex = normalized.lastIndexOf(".");
  if (dotIndex < 0) return "";
  return normalized.slice(dotIndex).toLowerCase();
}

function getArtifactPreview(artifact: ProjectArtifact): { kind: ArtifactPreviewKind; url?: string } {
  const candidate = artifact.previewUrl ?? artifact.downloadUrl;
  if (!candidate) return { kind: "none" };

  const extension = getFileExtension(candidate);
  if (IMAGE_EXTENSIONS.has(extension)) return { kind: "image", url: candidate };
  if (VIDEO_EXTENSIONS.has(extension)) return { kind: "video", url: candidate };
  if (extension === ".pdf") return { kind: "pdf", url: candidate };
  return { kind: "none" };
}

function artifactDomainLabel(domain: ProjectArtifact["domain"]) {
  if (domain === "simulink") return "Simulink";
  if (domain === "autocad") return "AutoCAD";
  if (domain === "etap") return "ETAP";
  if (domain === "simulation") return "Simulation";
  if (domain === "report") return "Report";
  if (domain === "diagram") return "Diagram";
  if (domain === "media") return "Media";
  return "Other";
}

export default function ProjectDetail() {
  const [, params] = useRoute("/codecircle/portfolio/project/:id");
  const [, setLocation] = useLocation();
  const [projectPool, setProjectPool] = useState<Project[]>(fallbackProjects);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProjects = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const response = await fetch("/api/projects/codecircle?source=hybrid&visibility=public");

        if (!response.ok) {
          throw new Error(`Failed to load projects (${response.status})`);
        }

        const payload = (await response.json()) as CodeCircleProjectsResponse;
        if (cancelled) return;

        if (Array.isArray(payload.projects) && payload.projects.length > 0) {
          setProjectPool(payload.projects);
        } else {
          setProjectPool(fallbackProjects);
        }
      } catch (error) {
        if (cancelled) return;
        setLoadError(error instanceof Error ? error.message : "Failed to load project");
        setProjectPool(fallbackProjects);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    loadProjects();
    return () => {
      cancelled = true;
    };
  }, []);

  const project = useMemo(
    () => projectPool.find((entry) => entry.id === params?.id),
    [projectPool, params?.id],
  );

  if (isLoading && !project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 text-foreground">
        <div className="text-center space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">Loading project...</h1>
          <p className="text-muted-foreground text-sm">Syncing portfolio data</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 text-foreground">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          {loadError && <p className="text-sm text-destructive mb-4">{loadError}</p>}
          <Button
            onClick={() => {
              setLocation("/codecircle/portfolio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-testid="button-back-home"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => {
              setLocation("/codecircle/portfolio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-testid="button-back"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.status && (
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${PROJECT_STATUS_CLASSNAMES[project.status]}`}
              >
                {PROJECT_STATUS_LABELS[project.status]}
              </span>
            )}
            {project.badges?.map((badge) => (
              <Badge key={badge} className="bg-primary/90">
                {badge}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-project-title">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-4">
            {project.liveDemo && (
              <Button size="lg" data-testid="button-live-demo" asChild>
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" size="lg" className="bg-inherit" data-testid="button-github" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <img
              src={project.image}
              alt={project.title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />

            {project.fullDescription && (
              <Card className="mb-8 bg-card/70 border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl text-foreground font-bold mb-4">About This Project</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.fullDescription}</p>
                </CardContent>
              </Card>
            )}

            {project.features && (
              <Card className="mb-8 bg-card/70 border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl text-foreground font-bold mb-4">Key Features</h2>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {project.challenges && (
              <Card className="mb-8 bg-card/70 border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl text-foreground font-bold mb-4">Challenges & Solutions</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.challenges}</p>
                </CardContent>
              </Card>
            )}

            {project.outcome && (
              <Card className="mb-8 bg-card/70 border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl text-foreground font-bold mb-4">Outcome & Impact</h2>
                  <p className="text-lg leading-relaxed text-muted-foreground">{project.outcome}</p>
                </CardContent>
              </Card>
            )}

            {(project.environment || (project.artifacts && project.artifacts.length > 0)) && (
              <Card className="mb-8 bg-card/70 border-border">
                <CardContent className="pt-6">
                  <h2 className="text-2xl text-foreground font-bold mb-4">
                    Project Environment & Engineering Artifacts
                  </h2>

                  {project.environment && (
                    <div className="mb-6 space-y-4">
                      {project.environment.context && (
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {project.environment.context}
                        </p>
                      )}

                      {project.environment.tools && project.environment.tools.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">
                            Tools
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.environment.tools.map((tool) => (
                              <Badge key={tool} variant="secondary">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.environment.platforms && project.environment.platforms.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">
                            Platforms
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {project.environment.platforms.map((platform) => (
                              <Badge key={platform} variant="outline">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.environment.methods && project.environment.methods.length > 0 && (
                        <div>
                          <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground mb-2">
                            Methods
                          </p>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {project.environment.methods.map((method) => (
                              <li key={method}>- {method}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {project.artifacts && project.artifacts.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-5">
                      {project.artifacts.map((artifact) => {
                        const preview = getArtifactPreview(artifact);

                        return (
                          <div
                            key={artifact.id}
                            className="rounded-lg border border-border/60 bg-background/30 overflow-hidden"
                          >
                            <div className="aspect-video bg-black/40">
                              {preview.kind === "image" && preview.url && (
                                <img
                                  src={preview.url}
                                  alt={artifact.title}
                                  className="h-full w-full object-cover"
                                />
                              )}
                              {preview.kind === "video" && preview.url && (
                                <video
                                  src={preview.url}
                                  controls
                                  preload="metadata"
                                  className="h-full w-full object-cover"
                                />
                              )}
                              {preview.kind === "pdf" && preview.url && (
                                <iframe
                                  src={`${preview.url}#view=FitH`}
                                  title={artifact.title}
                                  className="h-full w-full border-0"
                                />
                              )}
                              {preview.kind === "none" && (
                                <div className="h-full w-full grid place-items-center text-muted-foreground">
                                  <div className="flex flex-col items-center gap-2">
                                    <FileText className="h-6 w-6" />
                                    <p className="text-xs uppercase tracking-[0.12em]">
                                      Download-only file
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="p-4 space-y-3">
                              <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">{artifactDomainLabel(artifact.domain)}</Badge>
                                <Badge variant="outline">{artifact.format}</Badge>
                              </div>

                              <h3 className="text-base font-semibold">{artifact.title}</h3>

                              {artifact.description && (
                                <p className="text-sm text-muted-foreground">{artifact.description}</p>
                              )}

                              <div className="flex flex-wrap gap-2">
                                {artifact.previewUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={artifact.previewUrl} target="_blank" rel="noopener noreferrer">
                                      {preview.kind === "video" ? (
                                        <Video className="h-4 w-4 mr-2" />
                                      ) : (
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                      )}
                                      Open Preview
                                    </a>
                                  </Button>
                                )}

                                {artifact.downloadUrl && (
                                  <Button size="sm" asChild>
                                    <a href={artifact.downloadUrl} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </a>
                                  </Button>
                                )}

                                {artifact.sourceUrl && (
                                  <Button size="sm" variant="ghost" asChild>
                                    <a href={artifact.sourceUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Source
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title} gallery ${index + 1}`}
                      className="w-full aspect-video object-cover rounded-lg hover-elevate"
                      data-testid={`img-gallery-${index}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <Card className="sticky top-24 bg-card/70 border-border">
              <CardContent className="pt-6">
                <h3 className="text-xl text-foreground font-bold mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="border-t border-border pt-6 space-y-6">
                  <div>
                    <h3 className="text-xl text-foreground font-bold mb-4">Category</h3>
                    <Badge variant="outline" className="capitalize">
                      {project.category}
                    </Badge>
                  </div>
                  {project.status && (
                    <div>
                      <h3 className="text-xl text-foreground font-bold mb-4">Status</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${PROJECT_STATUS_CLASSNAMES[project.status]}`}
                      >
                        {PROJECT_STATUS_LABELS[project.status]}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
