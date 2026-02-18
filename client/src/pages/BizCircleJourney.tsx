import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, Compass, Layers, Rocket, Sparkles, Target } from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { bizCircleVentures, bizMilestones, bizOperatingPrinciples } from "@/data/bizcircle";

const BizCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");

  const summary = useMemo(() => {
    const sectors = new Set(bizCircleVentures.map((venture) => venture.sector)).size;
    const inExecution = bizCircleVentures.filter(
      (venture) => venture.stage === "Pilot" || venture.stage === "Scaling",
    ).length;
    const scaling = bizCircleVentures.filter((venture) => venture.stage === "Scaling").length;

    return {
      ventures: bizCircleVentures.length,
      sectors,
      inExecution,
      scaling,
    };
  }, []);

  const stageSnapshot = useMemo(() => {
    return [
      { stage: "Idea", count: bizCircleVentures.filter((venture) => venture.stage === "Idea").length },
      {
        stage: "Prototype",
        count: bizCircleVentures.filter((venture) => venture.stage === "Prototype").length,
      },
      { stage: "Pilot", count: bizCircleVentures.filter((venture) => venture.stage === "Pilot").length },
      { stage: "Scaling", count: bizCircleVentures.filter((venture) => venture.stage === "Scaling").length },
    ];
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
              <Link href="/biz/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="border-border bg-transparent">
                  Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-20 top-[-72px] h-56 w-56 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent4) / 0.24)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-88px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/50 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  BizCircle Journey
                </Badge>
                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Venture orchestration from systems experimentation to operational scale
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  This page focuses on sequence, maturity movement, and execution logic across the
                  portfolio. Detailed venture cards remain in the BizCircle Portfolio.
                </p>
              </div>
            </section>

            <section className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Ventures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{summary.ventures}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Sectors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{summary.sectors}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Active Execution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{summary.inExecution}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Scaling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{summary.scaling}</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Operating Arc</h2>
                  <p className="mt-1 text-sm text-foreground/72">
                    Progression from foundation to institutional readiness.
                  </p>
                </div>
                <Link href="/biz/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="border-border bg-transparent text-xs">
                    Open Venture Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {bizMilestones.map((milestone, index) => (
                  <article
                    key={milestone.title}
                    className="rounded-2xl border border-border bg-background/35 p-4"
                    style={
                      index === bizMilestones.length - 1
                        ? {
                            backgroundColor: "hsl(var(--accent2) / 0.14)",
                            borderColor: "hsl(var(--accent2) / 0.4)",
                          }
                        : undefined
                    }
                  >
                    <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/58">
                      {milestone.period}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/78">{milestone.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-10 grid gap-5 lg:grid-cols-[1.05fr_minmax(0,1fr)]">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Rocket className="h-5 w-5" />
                    Stage Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-2">
                  {stageSnapshot.map((entry) => (
                    <article key={entry.stage} className="rounded-xl border border-border bg-background/35 p-3">
                      <p className="text-xs uppercase tracking-[0.1em] text-foreground/58">{entry.stage}</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">{entry.count}</p>
                    </article>
                  ))}
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Compass className="h-5 w-5" />
                      Strategic Direction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-foreground/82">
                    Venture strategy is anchored in operationally realistic deployment, measurable
                    value creation, and long-cycle resilience.
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Layers className="h-5 w-5" />
                      Portfolio Mechanics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-foreground/82">
                    Shared technical primitives and cross-venture reuse reduce cycle time and improve
                    strategic alignment across products.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="mb-8">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5" />
                    Operating Principles
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 md:grid-cols-2">
                  {bizOperatingPrinciples.map((principle) => (
                    <p
                      key={principle}
                      className="rounded-xl border border-border bg-background/35 px-3 py-2 text-sm leading-relaxed text-foreground/82"
                    >
                      {principle}
                    </p>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BizCircleJourney;
