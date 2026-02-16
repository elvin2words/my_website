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
  X,
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
  const [detailVenture, setDetailVenture] = useState<BizVenture | null>(null);


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

  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDetailVenture(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

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
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
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

            
            <section className="mb-4 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm md:p-5">
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



            <section className="grid gap-4 mb-8 md:grid-cols-2">
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




            <section className="mb-8">
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

                        <button
                          type="button"
                          onClick={() => setDetailVenture(activeVenture)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs text-foreground/84 transition hover:bg-background/60"
                        >
                          Open Detail Popup
                        </button>

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
            </section>

            

            
          </div>
        </main>
      </div>

      <AnimatePresence>
        {detailVenture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/55 p-4 backdrop-blur-md md:p-8"
            onClick={() => setDetailVenture(null)}
            role="presentation"
          >
            <motion.article
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-primary/82 backdrop-blur-2xl"
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/12 px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]"
                      style={stageStyles[detailVenture.stage]}
                    >
                      {detailVenture.stage}
                    </span>
                    <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-white/75">
                      {detailVenture.sector}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">{detailVenture.name}</h3>
                  <p className="mt-1 text-sm text-white/78">{detailVenture.oneLiner}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailVenture(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close venture detail"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
                <section className="rounded-2xl border border-white/14 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-white/62">Core Highlights</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {detailVenture.highlights.map((highlight) => (
                      <div
                        key={`${detailVenture.name}-${highlight}`}
                        className="rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-sm text-white/84"
                      >
                        {highlight}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="mt-4 grid gap-3 md:grid-cols-2">
                  <article className="rounded-2xl border border-white/14 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.1em] text-white/62">Execution Lens</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/82">
                      This venture sits in the <strong>{detailVenture.stage}</strong> phase. Priority is to
                      improve deployment readiness, validate outcomes in context, and scale on evidence.
                    </p>
                  </article>
                  <article className="rounded-2xl border border-white/14 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.1em] text-white/62">Portfolio Fit</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/82">
                      Strategic fit against shared venture principles and reusable systems for faster cross-domain
                      execution.
                    </p>
                  </article>
                </section>

                <section className="mt-4 rounded-2xl border border-white/14 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.1em] text-white/62">Operating Principles</p>
                  <div className="mt-2 grid gap-2">
                    {bizOperatingPrinciples.slice(0, 3).map((principle) => (
                      <p key={`${detailVenture.name}-${principle}`} className="text-sm leading-relaxed text-white/82">
                        • {principle}
                      </p>
                    ))}
                  </div>
                </section>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-white/12 px-4 py-3 md:px-5">
                {detailVenture.website && (
                  <a
                    href={detailVenture.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                  >
                    Visit Website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setDetailVenture(null)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-3 py-1.5 text-xs text-white transition hover:bg-white/10"
                >
                  Close
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
};

export default BizCirclePortfolio;
