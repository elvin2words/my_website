import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown, Code2, Github, Mail, MapPin, Palette, Phone, Server, Twitter } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "../../../shared/schema";
import { projects as fallbackProjects } from "../../../shared/projects";
import { useToast } from "@/hooks/use-toast";
import { roles, skills } from "../data/codecircle";
import PortfolioNav from "@/components/layout/portfolioHeader";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import {
  type CodeCircleProjectsResponse,
  PROJECT_STATUS_CLASSNAMES,
  PROJECT_STATUS_LABELS,
} from "@/types/projects";

const CONTACT_EMAIL = "elvinmazwimairi@gmail.com";
const CONTACT_PHONE = "+263 71 210 4928";
const CONTACT_LOCATION = "Remote, Global";

function formatCategoryLabel(category: string) {
  if (category === "all") return "All Projects";
  if (category === "ecommerce") return "E-commerce";
  if (category === "r-and-d") return "R&D";
  return category.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function CodeCircle() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [projectPool, setProjectPool] = useState<Project[]>(fallbackProjects);
  const [projectCategories, setProjectCategories] = useState<string[]>(["all"]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [syncSource, setSyncSource] = useState<CodeCircleProjectsResponse["source"]>("hybrid");

  const [, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const fullText = roles[currentRole] ?? "";
    if (currentIndex < fullText.length) {
      const timer = window.setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((value) => value + 1);
      }, 80);
      return () => window.clearTimeout(timer);
    }
    const pause = window.setTimeout(() => {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentRole((value) => (value + 1) % roles.length);
    }, 1500);
    return () => window.clearTimeout(pause);
  }, [currentIndex, currentRole]);

  useEffect(() => {
    let cancelled = false;
    const loadProjects = async () => {
      setProjectsLoading(true);
      setProjectsError(null);
      try {
        const response = await fetch("/api/projects/codecircle?source=hybrid&visibility=public", {
          cache: "no-store",
          headers: { "cache-control": "no-cache", pragma: "no-cache" },
        });
        if (!response.ok) throw new Error(`Failed to load projects (${response.status})`);
        const payload = (await response.json()) as CodeCircleProjectsResponse;
        if (cancelled) return;
        setProjectPool(Array.isArray(payload.projects) && payload.projects.length > 0 ? payload.projects : fallbackProjects);
        setProjectCategories(
          Array.isArray(payload.categories) && payload.categories.length > 0
            ? payload.categories
            : ["all", ...new Set(fallbackProjects.map((project) => project.category))],
        );
        setSyncSource(payload.source);
        if (payload.githubError) {
          toast({ title: "GitHub sync warning", description: payload.githubError, variant: "destructive" });
        }
      } catch (error) {
        if (cancelled) return;
        setProjectsError(error instanceof Error ? error.message : "Failed to load projects");
        setProjectPool(fallbackProjects);
        setProjectCategories(["all", ...new Set(fallbackProjects.map((project) => project.category))]);
      } finally {
        if (!cancelled) setProjectsLoading(false);
      }
    };
    loadProjects();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  const availableCategories = useMemo(
    () =>
      projectCategories.length > 0
        ? projectCategories
        : ["all", ...new Set(projectPool.map((project) => project.category))],
    [projectCategories, projectPool],
  );

  useEffect(() => {
    if (!availableCategories.includes(selectedCategory)) setSelectedCategory("all");
  }, [availableCategories, selectedCategory]);

  const filteredProjects = useMemo(
    () => (selectedCategory === "all" ? projectPool : projectPool.filter((p) => p.category === selectedCategory)),
    [projectPool, selectedCategory],
  );
  const skillSections: Array<{
    title: string;
    list: typeof skills.frontend;
  }> = [
    { title: "Frontend Development", list: skills.frontend },
    { title: "Backend & Databases", list: skills.backend },
    { title: "Tools & Platforms", list: skills.tools },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BackgroundEffect />
      <div className="min-h-screen text-foreground">
        <PortfolioNav />

        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute text-4xl font-bold text-foreground/10 animate-falling-code" style={{ left: `${(i * 5) % 100}%`, animationDelay: `${i * 0.2}s` }}>
                01
              </div>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Welcome to my <span className="text-accent2">CodeCircle</span></h1>
          <p className="text-2xl md:text-3xl h-10 font-mono text-accent2 mb-8">{displayedText}<span className="animate-pulse">|</span></p>
          <p className="text-muted-foreground text-lg mb-10 max-w-3xl leading-relaxed text-center">
            A space for systems development and technological creativity. I build practical products that merge engineering depth with clean user experience.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection("projects")} data-testid="button-view-work">Dive Into Work</Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} data-testid="button-et-in-touch">Get In Touch</Button>
          </div>
          <button onClick={() => scrollToSection("about")} className="absolute bottom-8 animate-bounce" data-testid="button-scroll-down">
            <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </button>
        </section>

        <section id="about" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-about-heading">About Me</h2>
              <p className="text-muted-foreground text-lg">Building systems that are clear, useful, and scalable.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Innovative Systems Engineer and Full Stack Developer with strong grounding in software, infrastructure, and AI-driven products.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  I bridge engineering and product constraints to ship reliable, user-centered systems.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Badge variant="secondary" className="text-sm px-4 py-2"><Code2 className="h-4 w-4 mr-2" />Clean code</Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2"><Palette className="h-4 w-4 mr-2" />UI quality</Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2"><Server className="h-4 w-4 mr-2" />Scalable systems</Badge>
                </div>
              </div>
              <Card className="bg-card/70 backdrop-blur border-border">
                <CardHeader><CardTitle className="font-mono text-sm text-foreground/80">developer.js</CardTitle></CardHeader>
                <CardContent><pre className="text-sm font-mono leading-relaxed whitespace-pre-wrap"><code className="text-primary">{`const developer = {\n  name: "Elvin E. Mazwimairi",\n  role: "Full-Stack Systems Developer",\n  focus: "Scalable systems + strong UX",\n};`}</code></pre></CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="projects" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-projects-heading">Featured Projects</h2>
              <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">A collection of recent builds across product, systems, and full-stack delivery.</p>
              <p className="text-xs text-muted-foreground mb-5">Sync source: <span className="uppercase tracking-wide font-semibold">{syncSource}</span>{projectsLoading ? " • refreshing..." : ""}</p>
              {projectsError && <p className="text-xs text-destructive mb-5">{projectsError} (showing fallback projects)</p>}
              <div className="flex flex-wrap gap-2 justify-center">
                {availableCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "capitalize border-b-2 border-primary/70" : "capitalize border-border bg-card/70 text-muted-foreground hover:bg-card"}
                    data-testid={`button-filter-${category}`}
                  >
                    {formatCategoryLabel(category)}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full rounded-xl border border-border/50 bg-card/40 p-6 text-center text-muted-foreground">No projects found in this category yet.</div>
              ) : (
                filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden border-border h-full flex flex-col bg-card/70 backdrop-blur hover-elevate" data-testid={`card-project-${project.id}`}>
                    <div className="relative overflow-hidden aspect-video bg-muted/30">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 left-3 z-10"><Badge className="bg-primary/90 text-primary-foreground capitalize">{project.category}</Badge></div>
                    </div>
                    <CardHeader className="flex-grow">
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {project.status && <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${PROJECT_STATUS_CLASSNAMES[project.status]}`}>{PROJECT_STATUS_LABELS[project.status]}</span>}
                          {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">Demo</a>}
                          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">GitHub</a>}
                        </div>
                        <CardTitle className="text-xl line-clamp-2" data-testid={`text-project-title-${project.id}`}>{project.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">{project.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary">{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => setLocation(`/codecircle/portfolio/project/${project.id}`)}>View Details</Button>
                        {project.liveDemo && <Button size="sm" className="flex-1" asChild><a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a></Button>}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" data-testid="button-view-github" className="gap-2 hover-elevate bg-card/80" asChild>
                <a href="https://github.com/elvin2words" target="_blank" rel="noopener noreferrer"><Github className="h-5 w-5" />View on GitHub</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="skills" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-heading">Technical Skills</h2>
              <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
            </div>
            <div className="space-y-12">
              {skillSections.map(({ title, list }) => (
                <div key={title}>
                  <h3 className="text-2xl font-bold mb-6">{title}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {list.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div key={skill.name} className="group relative h-36 rounded-lg overflow-hidden border border-border hover-elevate transition-all duration-300 bg-card/70" data-testid={`skill-card-${skill.name}`}>
                          <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                            <Icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground" />
                            <span className="mt-2 font-semibold text-muted-foreground group-hover:text-foreground">{skill.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-heading">Contact Me</h2>
              <p className="text-muted-foreground text-lg">Open to collaborations, product builds, and technical consulting.</p>
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
              <Card className="border-border bg-card/80 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-2xl">Let&apos;s Build Something Strong</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">If you need end-to-end technical execution, from architecture to shipped product, I can help.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-3">
                    <Button asChild size="lg"><a href={`mailto:${CONTACT_EMAIL}`}><Mail className="h-4 w-4 mr-2" />Email Me</a></Button>
                    <Button asChild size="lg" variant="outline"><a href="https://wa.me/263783074722" target="_blank" rel="noopener noreferrer"><SiWhatsapp className="h-4 w-4 mr-2" />WhatsApp</a></Button>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="rounded-lg border border-border bg-background/40 p-4 text-center"><p className="text-xs text-muted-foreground">Email</p><p className="text-sm text-foreground break-all" data-testid="text-email">{CONTACT_EMAIL}</p></div>
                    <div className="rounded-lg border border-border bg-background/40 p-4 text-center"><p className="text-xs text-muted-foreground">Phone</p><p className="text-sm text-foreground" data-testid="text-phone">{CONTACT_PHONE}</p></div>
                    <div className="rounded-lg border border-border bg-background/40 p-4 text-center"><p className="text-xs text-muted-foreground">Location</p><p className="text-sm text-foreground" data-testid="text-location">{CONTACT_LOCATION}</p></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border bg-gradient-to-br from-primary/10 via-card/90 to-chart-2/10 backdrop-blur">
                <CardHeader><CardTitle className="text-lg">Connect With Me</CardTitle><CardDescription className="text-muted-foreground">Follow updates or reach out directly.</CardDescription></CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                  <a href="https://wa.me/263783074722" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground" data-testid="link-whatsapp"><SiWhatsapp className="h-4 w-4 text-green-500" />WhatsApp</a>
                  <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground" data-testid="link-linkedin"><SiLinkedin className="h-4 w-4 text-blue-500" />LinkedIn</a>
                  <a href="https://twitter.com/young_mazwi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground" data-testid="link-twitter"><Twitter className="h-4 w-4 text-sky-500" />Twitter</a>
                  <a href="https://github.com/elvin2words" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-foreground" data-testid="link-github"><SiGithub className="h-4 w-4" />GitHub</a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-border bg-card/60 backdrop-blur">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} <span className="text-foreground font-semibold">Elvin E. Mazwimairi</span>. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="https://github.com/elvin2words" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-border bg-background/80 text-foreground flex items-center justify-center" data-testid="footer-link-github"><SiGithub className="h-5 w-5" /></a>
              <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-border bg-background/80 text-foreground flex items-center justify-center" data-testid="footer-link-linkedin"><SiLinkedin className="h-5 w-5 text-blue-500" /></a>
              <a href="https://twitter.com/elvinmazwi" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-border bg-background/80 text-foreground flex items-center justify-center" data-testid="footer-link-twitter"><Twitter className="h-5 w-5 text-sky-500" /></a>
              <a href="https://wa.me/263783074722" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-border bg-background/80 text-foreground flex items-center justify-center" data-testid="footer-link-whatsapp"><SiWhatsapp className="h-5 w-5 text-green-500" /></a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
