import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, Compass, GitBranch, Layers3, Workflow } from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { roles } from "@/data/codecircle";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { projects as fallbackProjects } from "@/../../shared/projects";

const journeyPhases = [
  {
    phase: "Phase 01",
    title: "Web Foundations",
    description:
      "Started with static web systems and progressively shaped stronger frontend patterns, reusable components, and cleaner UX structure.",
  },
  {
    phase: "Phase 02",
    title: "System Integration",
    description:
      "Moved into API-first product work with stateful dashboards, data pipelines, and service-oriented backend integration.",
  },
  {
    phase: "Phase 03",
    title: "Product Engineering",
    description:
      "Focused on building complete products with architecture thinking, maintainable deployment flows, and outcome-driven iteration.",
  },
  {
    phase: "Phase 04",
    title: "AI-Augmented Delivery",
    description:
      "Blended automation, AI workflows, and operational intelligence into production-minded software delivery systems.",
  },
];

const executionModel = [
  {
    title: "Discover",
    description: "Translate idea ambiguity into constraints, risks, and measurable product outcomes.",
    icon: Compass,
  },
  {
    title: "Architect",
    description: "Design modular system boundaries to keep scale, maintainability, and delivery speed aligned.",
    icon: Layers3,
  },
  {
    title: "Build + Ship",
    description: "Implement in iterative slices, validate quickly, and keep technical debt visible.",
    icon: Workflow,
  },
  {
    title: "Evolve",
    description: "Use real usage signals to refine UX, harden reliability, and improve system leverage.",
    icon: GitBranch,
  },
];

const CodeCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

  const stats = useMemo(() => {
    const categories = new Set(fallbackProjects.map((project) => project.category)).size;
    const shipped = fallbackProjects.filter((project) => project.status === "shipped").length;
    return {
      total: fallbackProjects.length,
      categories,
      shipped,
    };
  }, []);

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-24 pb-16 px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Button onClick={goBack} variant="ghost" className="text-accent2 hover:text-accent2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Link href="/codecircle/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent2/50">
                  Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <Badge className="mb-4 bg-accent2/20 text-accent2 border border-accent2/40">
                CodeCircle Journey
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">How the Builder Evolved</h1>
              <p className="text-white/75 max-w-3xl">
                This page maps the progression from early web implementation into systems-oriented
                product engineering and AI-augmented software delivery.
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 mb-10">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Projects tracked</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{stats.total}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Delivery domains</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent2">{stats.categories}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Shipped status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent2">{stats.shipped}</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10 grid md:grid-cols-2 gap-5">
              {journeyPhases.map((phase) => (
                <Card key={phase.title} className="bg-white/5 border-white/10 hover:border-accent2/40 transition-all duration-300">
                  <CardHeader>
                    <p className="text-xs uppercase tracking-[0.14em] text-accent2">{phase.phase}</p>
                    <CardTitle className="text-xl">{phase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-white/80 leading-relaxed">{phase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="mb-10">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Execution Model</h2>
              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
                {executionModel.map((step) => {
                  const Icon = step.icon;
                  return (
                    <Card key={step.title} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent2/15 border border-accent2/30">
                          <Icon className="h-5 w-5 text-accent2" />
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-white/80 leading-relaxed">{step.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Current Focus Themes</h2>
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <Badge key={role} className="bg-white/10 text-white border border-white/15">
                    {role}
                  </Badge>
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

export default CodeCircleJourney;
