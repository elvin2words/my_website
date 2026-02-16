import React, { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Braces,
  GitBranch,
  Layers3,
  Radar,
  Sparkles,
  TerminalSquare,
  Workflow,
} from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roles } from "@/data/codecircle";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { PROJECT_STATUS_LABELS, projects as fallbackProjects } from "@/../../shared/projects";

const journeyPhases = [
  {
    id: "phase-1",
    phase: "Stage 01",
    title: "Frontend Craft Foundations",
    description:
      "Started by building responsive interfaces and design-aware components, then evolved toward reusable UI architecture.",
  },
  {
    id: "phase-2",
    phase: "Stage 02",
    title: "API + Integration Layer",
    description:
      "Progressed into backend-connected systems with stateful flows, data orchestration, and service communication patterns.",
  },
  {
    id: "phase-3",
    phase: "Stage 03",
    title: "Product System Thinking",
    description:
      "Shifted from feature coding to product engineering with maintainability, deployment continuity, and measurable outcomes.",
  },
  {
    id: "phase-4",
    phase: "Stage 04",
    title: "AI-Augmented Delivery",
    description:
      "Integrated intelligence workflows, automation pipelines, and operational signal loops into production-minded solutions.",
  },
];

const executionTracks = [
  {
    title: "Problem Framing",
    description: "Convert ambiguous requirements into clear boundaries, priorities, and delivery hypotheses.",
    icon: Radar,
  },
  {
    title: "System Blueprinting",
    description: "Design service boundaries and data flow edges for modular growth and clearer ownership.",
    icon: Layers3,
  },
  {
    title: "Delivery Engine",
    description: "Ship in iterative slices with feedback loops that reduce rework and surface risk early.",
    icon: Workflow,
  },
  {
    title: "Evolution Loop",
    description: "Use usage signals and reliability metrics to iteratively strengthen product architecture.",
    icon: GitBranch,
  },
];

const CodeCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

  const stats = useMemo(() => {
    const categories = new Set(fallbackProjects.map((project) => project.category)).size;
    const shipped = fallbackProjects.filter((project) => project.status === "shipped").length;
    const techSet = new Set(fallbackProjects.flatMap((project) => project.technologies ?? []));
    return {
      total: fallbackProjects.length,
      categories,
      shipped,
      techBreadth: techSet.size,
    };
  }, []);

  const statusBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    fallbackProjects.forEach((project) => {
      const key = project.status ?? "beta";
      counts[key] = (counts[key] ?? 0) + 1;
    });
    return counts;
  }, []);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <Link href="/codecircle/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-border">
                  Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-24 top-[-84px] h-56 w-56 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.25)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-92px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent1) / 0.2)" }}
              />
              <div className="pointer-events-none absolute inset-0 opacity-[0.14]">
                <div className="h-full w-full [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:28px_28px]" />
              </div>

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/50 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  CodeCircle Journey
                </Badge>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Builder evolution from component craft to intelligent product systems
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  A delivery-centered journey through frontend craft, backend orchestration, and
                  AI-augmented product engineering across real use cases.
                </p>
              </div>
            </section>

            <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Projects Tracked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.total}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Delivery Domains
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.categories}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Shipped
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.shipped}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Tech Breadth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.techBreadth}</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Build Pipeline</h2>
                  <p className="mt-1 text-sm text-foreground/72">
                    Progression stages that shaped the current execution model.
                  </p>
                </div>
                <Badge className="border border-border bg-background/50 text-foreground">
                  <TerminalSquare className="mr-1.5 h-3.5 w-3.5" />
                  Systems Lens
                </Badge>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AnimatePresence initial={false}>
                  {journeyPhases.map((phase, index) => (
                    <motion.article
                      key={phase.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: index * 0.05 }}
                      className="relative rounded-2xl border border-border bg-background/35 p-4"
                    >
                      <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/58">{phase.phase}</p>
                      <h3 className="mt-1 text-lg font-semibold text-foreground">{phase.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/82">{phase.description}</p>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            <section className="mb-10 grid gap-5 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Braces className="h-5 w-5" />
                    Execution Tracks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {executionTracks.map((track, index) => {
                    const Icon = track.icon;
                    return (
                      <article
                        key={track.title}
                        className="rounded-xl border border-border bg-background/35 p-3"
                        style={
                          index === executionTracks.length - 1
                            ? {
                                backgroundColor: "hsl(var(--accent2) / 0.12)",
                                borderColor: "hsl(var(--accent2) / 0.35)",
                              }
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background/45">
                            <Icon className="h-4 w-4 text-foreground/82" />
                          </span>
                          <p className="text-sm font-semibold text-foreground">{track.title}</p>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/82">{track.description}</p>
                      </article>
                    );
                  })}
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Workflow className="h-5 w-5" />
                      Delivery Signals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(statusBreakdown).map(([status, count]) => (
                        <Badge
                          key={status}
                          className="border border-border bg-background/45 text-foreground"
                        >
                          {PROJECT_STATUS_LABELS[status as keyof typeof PROJECT_STATUS_LABELS] ?? status}: {count}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <GitBranch className="h-5 w-5" />
                      Current Focus Roles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {roles.map((role) => (
                      <Badge key={role} className="border border-border bg-background/45 text-foreground">
                        {role}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default CodeCircleJourney;
