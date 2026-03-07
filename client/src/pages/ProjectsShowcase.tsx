import React, { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Brush,
  Camera,
  CheckCircle2,
  CircleX,
  Clock3,
  Code2,
  Cpu,
  Expand,
  Sparkle,
  ListFilter,
  NotebookPen,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
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
import { useBackNavigation } from "@/hooks/use-back-navigation";

type ProjectDomain = "Engineering" | "Developer";
type ProjectFilter = "all" | ProjectDomain;

interface ShowcaseProject {
  id: string;
  title: string;
  summary: string;
  highlight: string;
  narrative: string;
  domain: ProjectDomain;
  image: string;
  visualGallery: string[];
  tags: string[];
  details: string[];
  stack: string[];
  architecture: string[];
  outcome: {
    status: "implemented" | "in-progress" | "concept";
    note: string;
  };
  sourceHref: string;
}

const DEFAULT_PROJECT_VISUAL = "/projects/codecircle.png";

const engineeringProjectVisuals: string[] = [
  // "/gallery/Zz4/c74a1339e57e69ecf9d7bea55dc5c447.png",
  // "/gallery/Zz4/c14079459042483b6b4140885788a392.png",
  // "/gallery/Zz4/7110b2204f825e6877b5eae9f3bf36ab.png",
  // "/gallery/Zz4/68670673560bc8fd790f1086ed6312d9.png",
  // "/gallery/Zz4/20250628_204311.jpg",
  // "/gallery/Zz4/20240607_185944.jpg",
];

const developerProjectVisuals: string[] = [
  // "/projects/codecircle.png",
  // "/gallery/Zz3/f46057f7cefdc09387d135e73e2c33a2.png",
  // "/gallery/Zz3/Screenshot_20240825_122336_Instagram.jpg",
  // "/gallery/Zz3/Screenshot_20240619_135541_TikTok.jpg",
  // "/gallery/Zz1/Screenshot_20250226_233353_WhatsAppBusiness.jpg",
  // "/gallery/Zz1/Screenshot_20241016_192552_WhatsApp.jpg",
  // "/gallery/Zz4/20231015_141306.jpg",
];

function compactSentence(raw: string, fallback: string) {
  const text = raw?.trim();
  if (!text) return fallback;
  return text.endsWith(".") ? text.slice(0, -1) : text;
}

function toTagList(raw: string, fallback: string[]) {
  const parsed = raw
    .split(",")
    .map((item) => item.replace(/\.$/, "").trim())
    .filter(Boolean)
    .slice(0, 3);

  return parsed.length > 0 ? parsed : fallback;
}

function pickVisual(visuals: string[], index: number) {
  if (visuals.length === 0) {
    return DEFAULT_PROJECT_VISUAL;
  }
  return visuals[index % visuals.length];
}

function getOutcomeStatus(index: number): ShowcaseProject["outcome"]["status"] {
  if (index % 3 === 0) return "implemented";
  if (index % 3 === 1) return "in-progress";
  return "concept";
}

const showcaseProjects: ShowcaseProject[] = [
  ...engineerProjects.map((project, index) => ({
    id: `engineering-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.extra,
    narrative: `Engineering project focused on ${compactSentence(project.extra, "system optimization")} with practical delivery context and execution-ready insights.`,
    domain: "Engineering" as const,
    image: pickVisual(engineeringProjectVisuals, index),
    visualGallery: [
      pickVisual(engineeringProjectVisuals, index),
      pickVisual(engineeringProjectVisuals, index + 1),
      "/project-assets/engineering/etap-loadflow-summary.png",
    ],
    // image: project.visual,
    tags: toTagList(project.extra ?? "", ["Power Systems", "Control", "Embedded"]),
    details: [
      compactSentence(project.description, "Applied engineering solution"),
      compactSentence(project.extra, "Validated with practical implementation considerations"),
      "Structured for technical reporting, review, and stakeholder communication.",
    ],
    stack: ["ETAP", "MATLAB/Simulink", "PowerFactory", "AutoCAD Electrical"],
    architecture: [
      "Simulation baseline setup",
      "Iterative optimization and validation",
      "Engineering recommendation package",
    ],
    outcome: {
      status: getOutcomeStatus(index),
      note: "Design direction validated with simulation-led reasoning and measurable performance indicators.",
    },
    sourceHref: "/engineer",
  })),
  ...developerProjects.map((project, index) => ({
    id: `developer-${index + 1}`,
    title: project.title,
    summary: project.description,
    highlight: project.architecture.slice(0, 2).join(" • "),
    narrative: `Software delivery case centered on ${project.tech.slice(0, 2).join(" + ")} with product-level architecture choices and implementation patterns.`,
    domain: "Developer" as const,
    image: pickVisual(developerProjectVisuals, index),
    visualGallery: [
      pickVisual(developerProjectVisuals, index),
      pickVisual(developerProjectVisuals, index + 1),
      "/projects/codecircle.png",
    ],
    // image: project.visual,
    tags: project.tech.slice(0, 3),
    details: [
      compactSentence(project.description, "Software system delivery with practical usage focus"),
      `Primary architecture path: ${project.architecture.join(", ")}.`,
      "Designed with scalability, maintainability, and real-world operations in mind.",
    ],
    stack: project.tech.slice(0, 6),
    architecture: project.architecture,
    outcome: {
      status: getOutcomeStatus(index),
      note: "Incremental delivery model balancing user experience, system resilience, and operational visibility.",
    },
    sourceHref: "/developer",
  })),
];


const filterOptions: Array<{ key: ProjectFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "Engineering", label: "Engineering" },
  { key: "Developer", label: "Developer" },
];

const outcomeStyleByStatus: Record<
  ShowcaseProject["outcome"]["status"],
  {
    label: string;
    icon: typeof CheckCircle2;
    style: React.CSSProperties;
  }
> = {
  implemented: {
    label: "Implemented",
    icon: CheckCircle2,
    style: {
      backgroundColor: "hsl(var(--accent2) / 0.18)",
      borderColor: "hsl(var(--accent2) / 0.42)",
      color: "hsl(var(--accent2))",
    },
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock3,
    style: {
      backgroundColor: "hsl(var(--accent3) / 0.2)",
      borderColor: "hsl(var(--accent3) / 0.45)",
      color: "hsl(var(--accent3))",
    },
  },
  concept: {
    label: "Concept",
    icon: CircleX,
    style: {
      backgroundColor: "hsl(var(--accent5) / 0.18)",
      borderColor: "hsl(var(--accent5) / 0.42)",
      color: "hsl(var(--accent5))",
    },
  },
};

const ProjectsShowcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const goBack = useBackNavigation("/");
  
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

  const activeProject = useMemo(
    () => showcaseProjects.find((project) => project.id === activeProjectId) ?? null,
    [activeProjectId],
  );

  useEffect(() => {
    if (!activeProjectId) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProjectId(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [activeProjectId]);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}> */}
                <Button 
                  onClick={goBack}
                  variant="ghost" 
                  className="text-accent3 hover:text-accent3">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              {/* </Link> */}

              <div className="flex flex-wrap items-center gap-3">
                <Link href="/creative/gallery" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="h-4 w-4 mr-2" />
                    Gallery
                  </Button>
                </Link>
                <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <NotebookPen className="h-4 w-4 mr-2" />
                    Blog
                  </Button>
                </Link>
                <Link href="/creative/visual-designs" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="bg-transparent">
                    <Brush className="h-4 w-4 mr-2" />
                    Visual Des
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
                    onClick={() => setActiveProjectId(project.id)}
                    className="group cursor-pointer bg-white/5 border-white/10 overflow-hidden hover:border-accent3/50 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.26)]"
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
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
                        <Expand className="h-4 w-4 text-white/60 transition group-hover:text-accent3" />
                      </div>
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
                      {/* <Button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setActiveProjectId(project.id);
                        }}
                        variant="outline"
                        className="w-full bg-transparent border-white/20"
                      >
                        <Sparkle className="h-4 w-4 mr-2" />
                        Open Project View
                      </Button> */}

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

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/55 p-3 backdrop-blur-md md:p-8"
            onClick={() => setActiveProjectId(null)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.24 }}
              className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/25 bg-primary/80 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{activeProject.title}</p>
                  <p className="truncate text-xs text-white/70">
                    Project Spotlight • {activeProject.domain}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectId(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close project view"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                <section className="grid gap-4 lg:grid-cols-[1.25fr_minmax(0,1fr)]">
                  <article className="overflow-hidden rounded-2xl border border-white/14 bg-white/5">
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/35">
                      <StableMediaImage
                        src={activeProject.image}
                        alt={`${activeProject.title} hero visual`}
                        containerClassName="h-full w-full"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <Badge className="absolute top-3 left-3 border border-white/25 bg-black/60 text-white">
                        <Cpu className="h-3.5 w-3.5 mr-1.5" />
                        {activeProject.domain}
                      </Badge>
                    </div>
                    <div className="space-y-3 p-4">
                      <h2 className="text-xl font-semibold text-white md:text-2xl">{activeProject.title}</h2>
                      <p className="text-sm leading-relaxed text-white/82">{activeProject.summary}</p>
                      <p className="text-xs leading-relaxed text-white/70">{activeProject.narrative}</p>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tags.map((tag) => (
                          <Badge key={`${activeProject.id}-${tag}`} className="border border-white/20 bg-white/10 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </article>

                  <div className="space-y-4">
                    <article className="rounded-2xl border border-white/14 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.11em] text-white/55">Project Outcome</p>
                      <div className="mt-2 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-white">{activeProject.highlight}</p>
                          <p className="mt-1 text-xs text-white/70">{activeProject.outcome.note}</p>
                        </div>
                        <span
                          className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={outcomeStyleByStatus[activeProject.outcome.status].style}
                        >
                          {React.createElement(outcomeStyleByStatus[activeProject.outcome.status].icon, {
                            className: "h-3.5 w-3.5",
                          })}
                          {outcomeStyleByStatus[activeProject.outcome.status].label}
                        </span>
                      </div>
                    </article>

                    <article className="rounded-2xl border border-white/14 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.11em] text-white/55">Key Details</p>
                      <ul className="mt-2 grid gap-2 text-sm text-white/82">
                        {activeProject.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent3" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </article>

                    <article className="rounded-2xl border border-white/14 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.11em] text-white/55">Tech + Architecture</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {activeProject.stack.map((item) => (
                          <Badge key={`${activeProject.id}-stack-${item}`} className="border border-white/20 bg-white/10 text-white">
                            {item}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {activeProject.architecture.map((item) => (
                          <Badge key={`${activeProject.id}-arch-${item}`} className="border border-accent3/35 bg-accent3/12 text-white">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  </div>
                </section>

                <section className="mt-4 rounded-2xl border border-white/14 bg-white/5 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Project Visuals</p>
                    <span className="text-xs text-white/62">{activeProject.visualGallery.length} frame(s)</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {activeProject.visualGallery.map((src, index) => (
                      <div key={`${activeProject.id}-visual-${index}`} className="overflow-hidden rounded-xl border border-white/12 bg-black/20">
                        <div className="relative aspect-[4/3]">
                          <StableMediaImage
                            src={src}
                            alt={`${activeProject.title} visual ${index + 1}`}
                            containerClassName="h-full w-full"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* <div className="flex items-center justify-end gap-2 border-t border-white/12 px-4 py-3 md:px-5">
                <Link href={activeProject.sourceHref} onClick={() => { setActiveProjectId(null); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  <Button variant="outline" className="bg-transparent border-white/25 text-white">
                    <Code2 className="h-4 w-4 mr-2" />
                    Open {activeProject.domain} Persona
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/25 text-white"
                  onClick={() => setActiveProjectId(null)}
                >
                  Close
                  <X className="h-4 w-4 ml-2" />
                </Button>
              </div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsShowcase;
