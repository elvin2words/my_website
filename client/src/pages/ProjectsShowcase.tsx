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
