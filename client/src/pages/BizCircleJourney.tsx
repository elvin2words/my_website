import React, { useEffect, useMemo, useState  } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Globe2,
  Layers,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import {
  bizCircleVentures,
  bizMilestones,
  bizOperatingPrinciples,
  type BizVenture,
} from "@/data/bizcircle";

type StageFilter = "All" | BizVenture["stage"];




const stageStyles: Record<BizVenture["stage"], React.CSSProperties> = {
  Idea: {
    backgroundColor: "hsl(var(--accent4) / 0.17)",
    borderColor: "hsl(var(--accent4) / 0.4)",
    color: "hsl(var(--accent4))",
  },
  Prototype: {
    backgroundColor: "hsl(var(--accent3) / 0.18)",
    borderColor: "hsl(var(--accent3) / 0.45)",
    color: "hsl(var(--accent3))",
  },
  Pilot: {
    backgroundColor: "hsl(var(--accent1) / 0.18)",
    borderColor: "hsl(var(--accent1) / 0.45)",
    color: "hsl(var(--accent1))",
  },
  Scaling: {
    backgroundColor: "hsl(var(--accent2) / 0.18)",
    borderColor: "hsl(var(--accent2) / 0.45)",
    color: "hsl(var(--accent2))",
  },
};




function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}


const BizCircleJourney: React.FC = () => {
  const goBack = useBackNavigation("/");
  const [stage, setStage] = useState<StageFilter>("All");
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");
  const [activeName, setActiveName] = useState(bizCircleVentures[0]?.name ?? "");
  const [detailVenture, setDetailVenture] = useState<BizVenture | null>(null);


  const summary = useMemo(() => {
    const sectors = new Set(bizCircleVentures.map((venture) => venture.sector)).size;
    const scaling = bizCircleVentures.filter((venture) => venture.stage === "Scaling").length;
    const inExecution = bizCircleVentures.filter(
      (venture) => venture.stage === "Pilot" || venture.stage === "Scaling",
    ).length;
    return {
      ventures: bizCircleVentures.length,
      sectors,
      scaling,
      inExecution,
    };
  }, []);

  const stats = useMemo(() => {
    const sectors = new Set(bizCircleVentures.map((venture) => venture.sector)).size;
    const activeExecution = bizCircleVentures.filter(
      (venture) => venture.stage === "Pilot" || venture.stage === "Scaling",
    ).length;
    const scaling = bizCircleVentures.filter((venture) => venture.stage === "Scaling").length;
    return {
      ventures: bizCircleVentures.length,
      sectors,
      activeExecution,
      scaling,
    };
  }, []);





  const sectorOptions = useMemo(
    () => Array.from(new Set(bizCircleVentures.map((venture) => venture.sector))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bizCircleVentures.filter((venture) => {
      const byStage = stage === "All" || venture.stage === stage;
      const bySector = sector === "All" || venture.sector === sector;
      const byQuery =
        !q ||
        [venture.name, venture.sector, venture.oneLiner, ...venture.highlights]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return byStage && bySector && byQuery;
    });
  }, [query, sector, stage]);  

  const activeVenture = useMemo(
    () => filtered.find((venture) => venture.name === activeName) ?? filtered[0] ?? null,
    [activeName, filtered],
  );






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
                <Button variant="outline" className="bg-transparent border-border">
                  Portfolio
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <section className="relative mb-10 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
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
                  This journey reflects how technical ventures are sequenced, validated, and matured
                  into a coherent business portfolio with clear execution logic and sustainable growth paths.
                </p>
              </div>
            </section>

            
            
            <section className="relative mb-8 overflow-hidden rounded-3xl border border-border bg-card/80 p-6 backdrop-blur-sm md:p-8">
              <div
                className="pointer-events-none absolute -right-24 top-[-88px] h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent4) / 0.26)" }}
              />
              <div
                className="pointer-events-none absolute -left-24 bottom-[-92px] h-72 w-72 rounded-full blur-3xl"
                style={{ backgroundColor: "hsl(var(--accent2) / 0.18)" }}
              />

              <div className="relative z-10">
                <Badge className="mb-4 border border-border bg-background/45 text-foreground">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  BizCircle Venture Atlas
                </Badge>

                <h1 className="max-w-4xl text-3xl font-bold leading-tight text-foreground md:text-5xl">
                  Venture systems built across AI, energy, operations, and experience products
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/75 md:text-base">
                  A portfolio-first operating model where startups share reusable technical primitives,
                  execution lessons, and scale pathways.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Card className="border-border bg-background/45">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Ventures</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold text-foreground">{summary.ventures}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-background/45">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Sectors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold text-foreground">{summary.sectors}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-background/45">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">
                        Active Execution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold text-foreground">{summary.inExecution}</p>
                    </CardContent>
                  </Card>
                  <Card className="border-border bg-background/45">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/58">Scaling</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-semibold text-foreground">{summary.scaling}</p>
                    </CardContent>
                  </Card>
                </div>
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
                  <p className="text-3xl font-semibold text-foreground">{stats.ventures}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Sectors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.sectors}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Active Execution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.activeExecution}</p>
                </CardContent>
              </Card>
              <Card className="border-border bg-card/75">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xs uppercase tracking-[0.1em] text-foreground/60">
                    Scaling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold text-foreground">{stats.scaling}</p>
                </CardContent>
              </Card>
            </section>

            <section className="mb-10 rounded-3xl border border-border bg-card/80 p-5 backdrop-blur-sm md:p-7">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Venture Portfolio</h2>
                <p className="mt-1 text-sm text-foreground/72">
                  Each venture is positioned by sector role and maturity stage.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AnimatePresence initial={false}>
                  {bizCircleVentures.map((venture, index) => (
                    <motion.article
                      key={venture.name}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24, delay: index * 0.05 }}
                      className="rounded-2xl border border-border bg-background/35 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-foreground">{venture.name}</h3>
                          <p className="text-sm text-foreground/72">{venture.sector}</p>
                        </div>
                        <span
                          className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                          style={stageStyles[venture.stage]}
                        >
                          {venture.stage}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-relaxed text-foreground/82">{venture.oneLiner}</p>

                      <ul className="mt-3 grid gap-1.5 text-xs text-foreground/75">
                        {venture.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent4" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      {venture.website && (
                        <a
                          href={venture.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-foreground/82 transition hover:bg-background/60"
                        >
                          Visit Site
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            <section className="mb-10 grid gap-5 lg:grid-cols-[1.05fr_minmax(0,1fr)]">
              <Card className="border-border bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Rocket className="h-5 w-5" />
                    Operating Arc
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bizMilestones.map((milestone, index) => (
                    <article
                      key={milestone.title}
                      className="rounded-xl border border-border bg-background/35 p-3"
                      style={index === bizMilestones.length - 1 ? stageStyles.Scaling : undefined}
                    >
                      <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/58">
                        {milestone.period}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{milestone.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/78">
                        {milestone.description}
                      </p>
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

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Target className="h-5 w-5" />
                      Operating Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {bizOperatingPrinciples.map((principle) => (
                      <p key={principle} className="text-sm leading-relaxed text-foreground/82">
                        • {principle}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>


            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <Card className="border-border bg-card/85 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Rocket className="h-4 w-4" />
                      Operating Arc
                    </CardTitle>
                    <p className="text-xs leading-relaxed text-foreground/65">
                      From foundation to institutional readiness.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3.5 pt-2">
                    {bizMilestones.map((milestone, index) => (
                      <article
                        key={milestone.title}
                        className="rounded-xl border border-border bg-background/35 p-4"
                        style={index === bizMilestones.length - 1 ? stageStyles.Scaling : undefined}
                      >
                        <p className="text-[10px] uppercase tracking-[0.12em] text-foreground/58">
                          {milestone.period}
                        </p>
                        <p className="mt-1.5 text-sm font-semibold text-foreground">{milestone.title}</p>
                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/75">
                          {milestone.description}
                        </p>
                      </article>
                    ))}
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border-border bg-card/85 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Target className="h-4 w-4" />
                      Principles
                    </CardTitle>
                    <p className="text-xs leading-relaxed text-foreground/65">
                      Core rules that shape venture decisions across the portfolio.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-2.5 pb-4">
                    {bizOperatingPrinciples.map((principle, index) => (
                      <motion.div
                        key={principle}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.22, delay: index * 0.04 }}
                        className="rounded-xl border border-border bg-background/35 px-3 py-2.5"
                      >
                        <div className="flex items-start gap-2.5">
                          <span
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                            style={{
                              backgroundColor: "hsl(var(--accent4) / 0.2)",
                              color: "hsl(var(--accent4))",
                            }}
                          >
                            {index + 1}
                          </span>
                          <p className="text-sm leading-relaxed text-foreground/82">{principle}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </aside>

              <section className="space-y-4">
                <section className="grid gap-4 md:grid-cols-2">
                  {filtered.map((venture, index) => {
                    const selected = venture.name === activeVenture?.name;
                    return (
                      <motion.button
                        key={venture.name}
                        type="button"
                        onClick={() => {
                          setActiveName(venture.name);
                          setDetailVenture(venture);
                        }}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ duration: 0.22, delay: index * 0.04 }}
                        whileHover={{ y: -3 }}
                        className={cx(
                          "rounded-2xl border p-4 text-left transition",
                          selected
                            ? "border-transparent bg-card text-foreground shadow-[0_12px_26px_rgba(2,6,23,0.2)]"
                            : "border-border bg-card/75 text-foreground/84 hover:bg-card",
                        )}
                        style={selected ? { backgroundColor: "hsl(var(--accent4) / 0.1)" } : undefined}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-semibold">{venture.name}</h3>
                            <p className="text-xs text-foreground/62">{venture.sector}</p>
                          </div>
                          <span
                            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                            style={stageStyles[venture.stage]}
                          >
                            {venture.stage}
                          </span>
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/82">
                          {venture.oneLiner}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                            <Layers className="h-3.5 w-3.5" />
                            Click For Deep View
                          </span>
                          {venture.website && (
                            <a
                              href={venture.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[11px] text-foreground/82 transition hover:bg-background/60"
                            >
                              <Globe2 className="h-3 w-3" />
                              Site
                            </a>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </section>

                <section className="grid gap-3 md:grid-cols-2">
                  <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Compass className="h-4 w-4" />
                        Strategic Direction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-foreground/82">
                      Portfolio strategy prioritizes ventures that can share infrastructure, validate quickly,
                      and move from pilot proof to commercial reliability.
                    </CardContent>
                  </Card>

                  <Card className="border-border bg-card/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Target className="h-4 w-4" />
                        Build Thesis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm leading-relaxed text-foreground/82">
                      Execution depth over hype: design for real use conditions, reduce operational friction,
                      and make each venture strategically additive to the rest of the portfolio.
                    </CardContent>
                  </Card>
                </section>
              </section>
            </div>
            
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BizCircleJourney;
