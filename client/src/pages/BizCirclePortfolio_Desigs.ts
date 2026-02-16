import React, { useMemo } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Rocket, Sparkles } from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import { bizCircleVentures } from "@/data/bizcircle";

const BizCirclePortfolio: React.FC = () => {
  const goBack = useBackNavigation("/");

  const summary = useMemo(() => {
    const sectors = new Set(bizCircleVentures.map((venture) => venture.sector)).size;
    const scalingCount = bizCircleVentures.filter((venture) => venture.stage === "Scaling").length;
    return {
      ventures: bizCircleVentures.length,
      sectors,
      scalingCount,
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
              <Button onClick={goBack} variant="ghost" className="text-accent4 hover:text-accent4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <Button variant="outline" className="bg-transparent border-accent4/50">
                  Journey
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <section className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent4/40 mb-4">
                <Sparkles className="h-4 w-4 text-accent4" />
                <span className="text-sm text-white/90">BizCircle Portfolio</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Startups and Venture Systems</h1>
              <p className="text-white/75 max-w-3xl">
                A structured look at current startup work across energy, automation, AI, connectivity,
                and experience-tech products.
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Ventures</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-white">{summary.ventures}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Sectors</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent4">{summary.sectors}</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/70">Scaling Stage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-accent4">{summary.scalingCount}</p>
                </CardContent>
              </Card>
            </section>

            <section className="grid lg:grid-cols-2 gap-5">
              {bizCircleVentures.map((venture) => (
                <Card
                  key={venture.name}
                  className="bg-white/5 border-white/10 hover:border-accent4/40 transition-all duration-300"
                >
                  <CardHeader className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-accent4/25 text-accent4 border border-accent4/40">
                        <Rocket className="h-3.5 w-3.5 mr-1.5" />
                        {venture.stage}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/10 text-white/85">
                        {venture.sector}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl">{venture.name}</CardTitle>
                    <p className="text-white/80 text-sm leading-relaxed">{venture.oneLiner}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {venture.highlights.map((highlight) => (
                        <p key={highlight} className="text-sm text-white/75 flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent4" />
                          <span>{highlight}</span>
                        </p>
                      ))}
                    </div>
                    {venture.website && (
                      <a
                        href={venture.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200"
                      >
                        Visit website
                        <ExternalLink className="h-4 w-4 ml-1.5" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default BizCirclePortfolio;













import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ExternalLink,
  Filter,
  Globe2,
  Layers,
  Rocket,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import {
  bizCircleVentures,
  bizMilestones,
  bizOperatingPrinciples,
  type BizVenture,
} from "@/data/bizcircle";

type StageFilter = "All" | BizVenture["stage"];

const stageOrder: StageFilter[] = ["All", "Idea", "Prototype", "Pilot", "Scaling"];

const stageStyles: Record<BizVenture["stage"], React.CSSProperties> = {
  Idea: {
    backgroundColor: "hsl(var(--accent4) / 0.17)",
    borderColor: "hsl(var(--accent4) / 0.42)",
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

const BizCirclePortfolio: React.FC = () => {
  const goBack = useBackNavigation("/");
  const [stage, setStage] = useState<StageFilter>("All");
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");
  const [activeName, setActiveName] = useState(bizCircleVentures[0]?.name ?? "");

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

  useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some((venture) => venture.name === activeName)) {
      setActiveName(filtered[0].name);
    }
  }, [activeName, filtered]);

  const activeVenture = useMemo(
    () => filtered.find((venture) => venture.name === activeName) ?? filtered[0] ?? null,
    [activeName, filtered],
  );

  const activeIndex = activeVenture ? filtered.findIndex((venture) => venture.name === activeVenture.name) : -1;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < filtered.length - 1;

  const moveActive = (delta: -1 | 1) => {
    if (activeIndex < 0) return;
    const next = filtered[activeIndex + delta];
    if (next) setActiveName(next.name);
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <div className="flex flex-wrap items-center gap-2">
                <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="border-border bg-transparent">
                    Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button className="bg-accent4/90 text-white hover:bg-accent4">Work With Me</Button>
                </Link>
              </div>
            </div>

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

            <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                    <Search className="h-4 w-4 text-foreground/60" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search ventures, sectors, highlights..."
                      className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {stageOrder.map((entry) => (
                      <button
                        key={entry}
                        type="button"
                        onClick={() => setStage(entry)}
                        className={cx(
                          "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition",
                          stage === entry
                            ? "border-transparent text-foreground"
                            : "border-border bg-background/35 text-foreground/72 hover:bg-background/55",
                        )}
                        style={stage === entry && entry !== "All" ? stageStyles[entry] : undefined}
                      >
                        {entry}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={sector}
                    onChange={(event) => setSector(event.target.value)}
                    className="rounded-lg border border-border bg-background/45 px-3 py-2 text-sm text-foreground outline-none"
                  >
                    <option value="All">All Sectors</option>
                    {sectorOptions.map((entry) => (
                      <option key={entry} value={entry}>
                        {entry}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setStage("All");
                      setSector("All");
                      setQuery("");
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground/82 transition hover:bg-background/60"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Clear
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-foreground/62">{filtered.length} venture(s) matched</p>
            </section>

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Rocket className="h-4 w-4" />
                      Operating Arc
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {bizMilestones.map((milestone, index) => (
                      <article
                        key={milestone.title}
                        className="rounded-xl border border-border bg-background/35 p-3"
                        style={index === bizMilestones.length - 1 ? stageStyles.Scaling : undefined}
                      >
                        <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/58">
                          {milestone.period}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-foreground">{milestone.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-foreground/75">
                          {milestone.description}
                        </p>
                      </article>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Target className="h-4 w-4" />
                      Principles
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
              </aside>

              <section className="space-y-4">
                {!activeVenture && (
                  <Card className="border-border bg-card/80 p-6 text-sm text-foreground/72">
                    No venture matches current filters.
                  </Card>
                )}

                {activeVenture && (
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={activeVenture.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="relative overflow-hidden rounded-3xl border border-border bg-card/85 p-5 backdrop-blur-sm md:p-6"
                    >
                      <div
                        className="pointer-events-none absolute -right-16 top-[-64px] h-52 w-52 rounded-full blur-3xl"
                        style={{ backgroundColor: "hsl(var(--accent4) / 0.2)" }}
                      />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                              style={stageStyles[activeVenture.stage]}
                            >
                              {activeVenture.stage}
                            </span>
                            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-foreground/62">
                              {activeVenture.sector}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => moveActive(-1)}
                              disabled={!canPrev}
                              className={cx(
                                "inline-flex h-8 items-center rounded-lg border px-2.5 text-xs transition",
                                canPrev
                                  ? "border-border text-foreground/82 hover:bg-background/60"
                                  : "cursor-not-allowed border-border text-foreground/35",
                              )}
                            >
                              Prev
                            </button>
                            <button
                              type="button"
                              onClick={() => moveActive(1)}
                              disabled={!canNext}
                              className={cx(
                                "inline-flex h-8 items-center rounded-lg border px-2.5 text-xs transition",
                                canNext
                                  ? "border-border text-foreground/82 hover:bg-background/60"
                                  : "cursor-not-allowed border-border text-foreground/35",
                              )}
                            >
                              Next
                            </button>
                          </div>
                        </div>

                        <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
                          {activeVenture.name}
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/82">
                          {activeVenture.oneLiner}
                        </p>

                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {activeVenture.highlights.map((highlight) => (
                            <div
                              key={`active-${activeVenture.name}-${highlight}`}
                              className="rounded-xl border border-border bg-background/35 px-3 py-2 text-sm text-foreground/82"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {activeVenture.website && (
                            <a
                              href={activeVenture.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-foreground/84 transition hover:bg-background/60"
                            >
                              Visit Website
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-foreground/84 transition hover:bg-background/60">
                              View Journey
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                )}

                <section className="grid gap-4 md:grid-cols-2">
                  {filtered.map((venture, index) => {
                    const selected = venture.name === activeVenture?.name;
                    return (
                      <motion.button
                        key={venture.name}
                        type="button"
                        onClick={() => setActiveName(venture.name)}
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
                            Venture Card
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

export default BizCirclePortfolio;














import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ExternalLink,
  Filter,
  Globe2,
  Layers,
  Rocket,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Link } from "wouter";

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import BackgroundEffect from "@/components/home/BackgroundEffect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBackNavigation } from "@/hooks/use-back-navigation";
import {
  bizCircleVentures,
  bizMilestones,
  bizOperatingPrinciples,
  type BizVenture,
} from "@/data/bizcircle";

type StageFilter = "All" | BizVenture["stage"];

const stageOrder: StageFilter[] = ["All", "Idea", "Prototype", "Pilot", "Scaling"];

const stageStyles: Record<BizVenture["stage"], React.CSSProperties> = {
  Idea: {
    backgroundColor: "hsl(var(--accent4) / 0.17)",
    borderColor: "hsl(var(--accent4) / 0.42)",
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

const BizCirclePortfolio: React.FC = () => {
  const goBack = useBackNavigation("/");
  const [stage, setStage] = useState<StageFilter>("All");
  const [sector, setSector] = useState("All");
  const [query, setQuery] = useState("");
  const [activeName, setActiveName] = useState(bizCircleVentures[0]?.name ?? "");

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

  useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some((venture) => venture.name === activeName)) {
      setActiveName(filtered[0].name);
    }
  }, [activeName, filtered]);

  const activeVenture = useMemo(
    () => filtered.find((venture) => venture.name === activeName) ?? filtered[0] ?? null,
    [activeName, filtered],
  );

  const activeIndex = activeVenture ? filtered.findIndex((venture) => venture.name === activeVenture.name) : -1;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < filtered.length - 1;

  const moveActive = (delta: -1 | 1) => {
    if (activeIndex < 0) return;
    const next = filtered[activeIndex + delta];
    if (next) setActiveName(next.name);
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="min-h-screen px-4 pb-16 pt-24 md:px-6">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <Button onClick={goBack} variant="ghost" className="text-foreground/85 hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              <div className="flex flex-wrap items-center gap-2">
                <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button variant="outline" className="border-border bg-transparent">
                    Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button className="bg-accent4/90 text-white hover:bg-accent4">Work With Me</Button>
                </Link>
              </div>
            </div>

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

            <section className="mb-8 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm md:p-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-background/35 px-3 py-2">
                  <Search className="h-4 w-4 text-foreground/60" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search ventures, sectors, highlights..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {stageOrder.map((entry) => (
                    <button
                      key={entry}
                      type="button"
                      onClick={() => setStage(entry)}
                      className={cx(
                        "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition",
                        stage === entry
                          ? "border-transparent text-foreground"
                          : "border-border bg-background/35 text-foreground/72 hover:bg-background/55",
                      )}
                      style={stage === entry && entry !== "All" ? stageStyles[entry] : undefined}
                    >
                      {entry}
                    </button>
                  ))}

                  <select
                    value={sector}
                    onChange={(event) => setSector(event.target.value)}
                    className="h-8 rounded-full border border-border bg-background/45 px-3 text-xs text-foreground outline-none"
                  >
                    <option value="All">All Sectors</option>
                    {sectorOptions.map((entry) => (
                      <option key={entry} value={entry}>
                        {entry}
                      </option>
                    ))}
                  </select>

                  <span className="rounded-full border border-border bg-background/35 px-2.5 py-1 text-[11px] text-foreground/65">
                    {filtered.length} matched
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setStage("All");
                      setSector("All");
                      setQuery("");
                    }}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs text-foreground/82 transition hover:bg-background/60"
                  >
                    <Filter className="h-3.5 w-3.5" />
                    Clear
                  </button>
                </div>
              </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-1">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Rocket className="h-4 w-4" />
                      Operating Arc
                    </CardTitle>
                    <p className="text-xs leading-relaxed text-foreground/65">
                      From foundation to institutional readiness.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-1">
                    {bizMilestones.map((milestone, index) => (
                      <article
                        key={milestone.title}
                        className="rounded-xl border border-border bg-background/35 p-3.5"
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

                <Card className="border-border bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Target className="h-4 w-4" />
                      Principles
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
              </aside>

              <section className="space-y-4">
                {!activeVenture && (
                  <Card className="border-border bg-card/80 p-6 text-sm text-foreground/72">
                    No venture matches current filters.
                  </Card>
                )}

                {activeVenture && (
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={activeVenture.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22 }}
                      className="relative overflow-hidden rounded-3xl border border-border bg-card/85 p-5 backdrop-blur-sm md:p-6"
                    >
                      <div
                        className="pointer-events-none absolute -right-16 top-[-64px] h-52 w-52 rounded-full blur-3xl"
                        style={{ backgroundColor: "hsl(var(--accent4) / 0.2)" }}
                      />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                              style={stageStyles[activeVenture.stage]}
                            >
                              {activeVenture.stage}
                            </span>
                            <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-foreground/62">
                              {activeVenture.sector}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => moveActive(-1)}
                              disabled={!canPrev}
                              className={cx(
                                "inline-flex h-8 items-center rounded-lg border px-2.5 text-xs transition",
                                canPrev
                                  ? "border-border text-foreground/82 hover:bg-background/60"
                                  : "cursor-not-allowed border-border text-foreground/35",
                              )}
                            >
                              Prev
                            </button>
                            <button
                              type="button"
                              onClick={() => moveActive(1)}
                              disabled={!canNext}
                              className={cx(
                                "inline-flex h-8 items-center rounded-lg border px-2.5 text-xs transition",
                                canNext
                                  ? "border-border text-foreground/82 hover:bg-background/60"
                                  : "cursor-not-allowed border-border text-foreground/35",
                              )}
                            >
                              Next
                            </button>
                          </div>
                        </div>

                        <h2 className="mt-4 text-2xl font-semibold text-foreground md:text-3xl">
                          {activeVenture.name}
                        </h2>
                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/82">
                          {activeVenture.oneLiner}
                        </p>

                        <div className="mt-4 grid gap-2 sm:grid-cols-2">
                          {activeVenture.highlights.map((highlight) => (
                            <div
                              key={`active-${activeVenture.name}-${highlight}`}
                              className="rounded-xl border border-border bg-background/35 px-3 py-2 text-sm text-foreground/82"
                            >
                              {highlight}
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {activeVenture.website && (
                            <a
                              href={activeVenture.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-foreground/84 transition hover:bg-background/60"
                            >
                              Visit Website
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}

                          <Link href="/biz/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <span className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-foreground/84 transition hover:bg-background/60">
                              View Journey
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                )}

                <section className="grid gap-4 md:grid-cols-2">
                  {filtered.map((venture, index) => {
                    const selected = venture.name === activeVenture?.name;
                    return (
                      <motion.button
                        key={venture.name}
                        type="button"
                        onClick={() => setActiveName(venture.name)}
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
                            Venture Card
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

export default BizCirclePortfolio;
