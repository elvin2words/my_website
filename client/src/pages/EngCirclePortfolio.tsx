import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Filter,
  Maximize2,
  Search,
  Video,
  X,
} from "lucide-react";
import { Link } from "wouter";

import BackgroundEffect from "@/components/home/BackgroundEffect";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/HomeHeader";
import { StableMediaImage } from "@/components/ui/stable-media-image";
import {
  engineeringCaseStudies,
  type EngineeringAsset,
  type EngineeringBeforeAfterMetric,
  type EngineeringCaseStudyStage,
  type EngineeringMedia,
  type EngineeringProfileMetric,
  type EngineeringSldEdge,
  type EngineeringSldNode,
  type EngineeringVisual,
} from "@/data/engCirclePortfolio";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type PreviewKind = "image" | "video" | "pdf";
type Preview = { title: string; src: string; kind: PreviewKind; note?: string };

type ExpandedView =
  | { kind: "project" }
  | { kind: "section"; sectionId: string }
  | { kind: "visual"; visualId: string };

const stageLabels: Record<EngineeringCaseStudyStage, string> = {
  featured: "Featured",
  active: "Active",
  prototype: "Prototype",
};

const accentSurface = {
  backgroundColor: "hsl(var(--accent1) / 0.12)",
  borderColor: "hsl(var(--accent1) / 0.35)",
};

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function stageChipStyle(stage: EngineeringCaseStudyStage) {
  if (stage === "featured") {
    return {
      backgroundColor: "hsl(var(--accent1) / 0.18)",
      borderColor: "hsl(var(--accent1) / 0.45)",
      color: "hsl(var(--accent1))",
    };
  }
  if (stage === "active") {
    return {
      backgroundColor: "hsl(var(--accent2) / 0.18)",
      borderColor: "hsl(var(--accent2) / 0.45)",
      color: "hsl(var(--accent2))",
    };
  }
  return {
    backgroundColor: "hsl(var(--accent5) / 0.16)",
    borderColor: "hsl(var(--accent5) / 0.4)",
    color: "hsl(var(--accent5))",
  };
}

function isPreviewable(kind: EngineeringAsset["kind"]) {
  return kind === "image" || kind === "video" || kind === "pdf";
}

function formatMetricValue(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function isVisual(value: EngineeringVisual | undefined): value is EngineeringVisual {
  return Boolean(value);
}

function SldVisual({
  nodes,
  edges,
}: {
  nodes: EngineeringSldNode[];
  edges: EngineeringSldEdge[];
}) {
  const [focusNodeId, setFocusNodeId] = useState(nodes[0]?.id ?? "");

  useEffect(() => {
    setFocusNodeId(nodes[0]?.id ?? "");
  }, [nodes]);

  const nodeById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );
  const focusedNode = nodeById.get(focusNodeId) ?? nodes[0];

  return (
    <div className="space-y-3">
      <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-background/40">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          {edges.map((edge, idx) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);
            if (!from || !to) return null;
            const active = focusNodeId === edge.from || focusNodeId === edge.to;
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 1.8;
            return (
              <motion.g
                key={`${edge.from}-${edge.to}-${idx}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: idx * 0.03 }}
              >
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? "hsl(var(--accent2))" : "hsl(var(--border))"}
                  strokeWidth={active ? 1.25 : 0.72}
                />
                {edge.label && (
                  <text
                    x={midX}
                    y={midY}
                    textAnchor="middle"
                    className="fill-foreground/65 text-[2.7px]"
                  >
                    {edge.label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </svg>

        {nodes.map((node, idx) => {
          const active = node.id === focusNodeId;
          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => setFocusNodeId(node.id)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, delay: idx * 0.04 }}
              className={cx(
                "absolute min-w-[84px] -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-1 text-left transition",
                active
                  ? "border-transparent bg-card text-foreground shadow-[0_10px_24px_rgba(2,6,23,0.24)]"
                  : "border-border bg-card/75 text-foreground/82 hover:bg-card",
              )}
              style={
                active
                  ? { ...accentSurface, left: `${node.x}%`, top: `${node.y}%` }
                  : { left: `${node.x}%`, top: `${node.y}%` }
              }
            >
              <span className="block text-[10px] font-semibold leading-tight">{node.label}</span>
              <span className="mt-0.5 block text-[10px] leading-tight text-foreground/62">
                {node.level}
              </span>
            </motion.button>
          );
        })}
      </div>

      {focusedNode && (
        <div className="rounded-xl border border-border bg-card/75 p-3">
          <p className="text-[11px] uppercase tracking-[0.1em] text-foreground/52">Focused Node</p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {focusedNode.label}
            <span className="ml-2 text-xs font-medium text-foreground/65">
              {focusedNode.level}
            </span>
          </p>
          {focusedNode.detail && (
            <p className="mt-1 text-xs leading-relaxed text-foreground/72">{focusedNode.detail}</p>
          )}
        </div>
      )}
    </div>
  );
}

function BeforeAfterVisual({ metrics }: { metrics: EngineeringBeforeAfterMetric[] }) {
  const ceiling = useMemo(
    () => Math.max(...metrics.flatMap((metric) => [metric.before, metric.after]), 1),
    [metrics],
  );

  return (
    <div className="space-y-3">
      {metrics.map((metric, idx) => {
        const beforeWidth = Math.max((metric.before / ceiling) * 100, 4);
        const afterWidth = Math.max((metric.after / ceiling) * 100, 4);
        const delta = metric.after - metric.before;
        const improved = metric.direction === "lower" ? delta < 0 : delta > 0;
        const deltaLabel = `${delta > 0 ? "+" : ""}${formatMetricValue(delta)}${metric.unit}`;

        return (
          <div key={`${metric.label}-${idx}`} className="rounded-xl border border-border bg-background/35 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground">{metric.label}</p>
              <span
                className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                style={
                  improved
                    ? {
                        backgroundColor: "hsl(var(--accent2) / 0.18)",
                        borderColor: "hsl(var(--accent2) / 0.42)",
                        color: "hsl(var(--accent2))",
                      }
                    : {
                        backgroundColor: "hsl(var(--accent4) / 0.18)",
                        borderColor: "hsl(var(--accent4) / 0.42)",
                        color: "hsl(var(--accent4))",
                      }
                }
              >
                {improved ? "Improved" : "Needs Review"} {deltaLabel}
              </span>
            </div>

            <div className="mt-3 grid gap-2">
              <div>
                <div className="mb-1 flex items-center justify-between text-[11px] text-foreground/60">
                  <span>Before</span>
                  <span>
                    {formatMetricValue(metric.before)}
                    {metric.unit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-background/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${beforeWidth}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: "hsl(var(--accent4))" }}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1 flex items-center justify-between text-[11px] text-foreground/60">
                  <span>After</span>
                  <span>
                    {formatMetricValue(metric.after)}
                    {metric.unit}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-background/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${afterWidth}%` }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 0.56, delay: 0.08 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: "hsl(var(--accent2))" }}
                  />
                </div>
              </div>
            </div>

            {metric.note && <p className="mt-2 text-xs text-foreground/62">{metric.note}</p>}
          </div>
        );
      })}
    </div>
  );
}

function ProfileVisual({ metrics }: { metrics: EngineeringProfileMetric[] }) {
  return (
    <div className="space-y-3">
      {metrics.map((metric, idx) => {
        const ratio = metric.max > 0 ? Math.min(100, (metric.value / metric.max) * 100) : 0;
        return (
          <div key={`${metric.label}-${idx}`} className="rounded-xl border border-border bg-background/35 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-foreground">{metric.label}</p>
              <p className="text-xs text-foreground/64">
                {formatMetricValue(metric.value)}/{formatMetricValue(metric.max)}
              </p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-background/60">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${ratio}%` }}
                viewport={{ once: true, amount: 0.7 }}
                transition={{ duration: 0.55, delay: idx * 0.04 }}
                className="h-full rounded-full"
                style={{ backgroundColor: "hsl(var(--accent1))" }}
              />
            </div>
            {metric.note && <p className="mt-2 text-xs text-foreground/62">{metric.note}</p>}
          </div>
        );
      })}
    </div>
  );
}

function VisualCard({
  visual,
  onExpand,
}: {
  visual: EngineeringVisual;
  onExpand?: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card/78 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{visual.title}</p>
          {visual.subtitle && (
            <p className="mt-1 text-xs leading-relaxed text-foreground/65">{visual.subtitle}</p>
          )}
        </div>
        {onExpand && (
          <button
            type="button"
            onClick={onExpand}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/78 transition hover:bg-background/60"
            aria-label={`Expand ${visual.title}`}
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {visual.type === "sld" && visual.sld && (
        <SldVisual nodes={visual.sld.nodes} edges={visual.sld.edges} />
      )}
      {visual.type === "before-after" && visual.beforeAfter && (
        <BeforeAfterVisual metrics={visual.beforeAfter} />
      )}
      {visual.type === "profile" && visual.profile && <ProfileVisual metrics={visual.profile} />}

      {visual.note && <p className="mt-3 text-xs text-foreground/62">{visual.note}</p>}
    </article>
  );
}

export default function EngCirclePortfolio() {
  const goBack = useBackNavigation("/engineer");
  const mainRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const [activeId, setActiveId] = useState(engineeringCaseStudies[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [tool, setTool] = useState("All");
  const [stage, setStage] = useState<"All" | EngineeringCaseStudyStage>("All");
  const [expanded, setExpanded] = useState<string[]>([]);
  const [activeSectionId, setActiveSectionId] = useState("");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [expandedView, setExpandedView] = useState<ExpandedView | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const domainOptions = useMemo(
    () => Array.from(new Set(engineeringCaseStudies.flatMap((study) => study.domainTags))).sort(),
    [],
  );
  const toolOptions = useMemo(
    () => Array.from(new Set(engineeringCaseStudies.flatMap((study) => study.tools))).sort(),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return engineeringCaseStudies.filter((study) => {
      const matchesDomain = domain === "All" || study.domainTags.includes(domain);
      const matchesTool = tool === "All" || study.tools.includes(tool);
      const matchesStage = stage === "All" || study.stage === stage;
      const hay = [
        study.title,
        study.subtitle,
        study.hero.headline,
        study.hero.subhead,
        ...study.domainTags,
        ...study.tools,
        ...study.sections.flatMap((section) => [
          section.title,
          section.subtitle ?? "",
          section.body ?? "",
          ...(section.bullets ?? []),
          ...(section.expandedInsights ?? []),
        ]),
        ...study.visuals.map((visual) => visual.title),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      return matchesDomain && matchesTool && matchesStage && matchesQuery;
    });
  }, [domain, query, stage, tool]);

  useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some((study) => study.id === activeId)) setActiveId(filtered[0].id);
  }, [activeId, filtered]);

  const active = useMemo(
    () => filtered.find((study) => study.id === activeId) ?? filtered[0] ?? null,
    [activeId, filtered],
  );
  const activeIndex = active ? filtered.findIndex((study) => study.id === active.id) : -1;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < filtered.length - 1;

  const activeVisualMap = useMemo(
    () => new Map(active?.visuals.map((visual) => [visual.id, visual]) ?? []),
    [active],
  );

  const expandedSection = useMemo(() => {
    if (!active || !expandedView || expandedView.kind !== "section") return null;
    return active.sections.find((section) => section.id === expandedView.sectionId) ?? null;
  }, [active, expandedView]);

  const expandedVisual = useMemo(() => {
    if (!expandedView || expandedView.kind !== "visual") return null;
    return activeVisualMap.get(expandedView.visualId) ?? null;
  }, [activeVisualMap, expandedView]);

  const sectionsUsingExpandedVisual = useMemo(() => {
    if (!active || !expandedVisual) return [];
    return active.sections.filter((section) => section.visualIds?.includes(expandedVisual.id));
  }, [active, expandedVisual]);

  useEffect(() => {
    if (!active) return;
    const first = active.sections[0]?.id ?? "";
    setExpanded(first ? [first] : []);
    setActiveSectionId(first);
    setExpandedView(null);
  }, [active?.id]);

  useEffect(() => {
    if (!active) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (visible?.target as HTMLElement | undefined)?.dataset.sectionid;
        if (id) setActiveSectionId(id);
      },
      { root: mainRef.current, threshold: [0.25, 0.45, 0.7] },
    );

    active.sections.forEach((section) => {
      const node = sectionRefs.current[section.id];
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [active?.id, expanded]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setPreview(null);
      setExpandedView(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const navigate = (delta: -1 | 1) => {
    if (activeIndex < 0) return;
    const next = filtered[activeIndex + delta];
    if (!next) return;
    setActiveId(next.id);
    setMobileSidebarOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openAsset = (asset: EngineeringAsset) => {
    if (asset.kind === "link") {
      window.open(asset.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (asset.kind === "image" || asset.kind === "video" || asset.kind === "pdf") {
      setPreview({ title: asset.title, src: asset.href, kind: asset.kind, note: asset.note });
    }
  };

  const openMedia = (media: EngineeringMedia) => {
    setPreview({ title: media.title, src: media.src, kind: media.kind, note: media.caption });
  };

  return (
    <>
      <BackgroundEffect />
      <Header />

      <div className="relative z-10 overflow-x-hidden">
        <main className="pt-20 lg:pt-24">
          <div className="sticky top-[72px] z-40 border-y border-border bg-card/85 backdrop-blur-md lg:top-[88px]">
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
              <div className="flex min-w-0 items-center gap-2">
                <button
                  onClick={goBack}
                  type="button"
                  className="inline-flex h-9 items-center gap-1 rounded-xl border border-border px-3 text-sm text-foreground/85 transition hover:bg-background/60"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="min-w-0">
                  <p className="truncate text-[11px] uppercase tracking-[0.14em] text-foreground/55">
                    EngCircle Portfolio
                  </p>
                  <p className="truncate text-sm font-semibold text-foreground">
                    Applied power systems, microgrids, and validation
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 md:justify-end">
                <Link
                  href="/engineer/journey"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <span className="inline-flex h-9 items-center rounded-xl border border-border px-3 text-xs text-foreground/80 transition hover:bg-background/60">
                    Journey
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={!canPrev}
                  className={cx(
                    "inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-sm transition",
                    canPrev
                      ? "border-border text-foreground/85 hover:bg-background/60"
                      : "cursor-not-allowed border-border text-foreground/35",
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => navigate(1)}
                  disabled={!canNext}
                  className={cx(
                    "inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-sm transition",
                    canNext
                      ? "border-border text-foreground/85 hover:bg-background/60"
                      : "cursor-not-allowed border-border text-foreground/35",
                  )}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen((prev) => !prev)}
                  className="inline-flex h-9 items-center gap-1 rounded-xl border border-border px-3 text-xs text-foreground/82 transition hover:bg-background/60 lg:hidden"
                >
                  {mobileSidebarOpen ? "Hide Filters" : "Filters and Navigation"}
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
              <aside
                className={cx(
                  "order-2 lg:order-1 lg:sticky lg:top-[9.5rem] lg:h-[calc(100vh-11rem)] lg:overflow-hidden",
                  mobileSidebarOpen ? "block" : "hidden lg:block",
                )}
              >
                <div className="space-y-4 lg:h-full lg:overflow-y-auto lg:pr-1">
                  <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
                      <Search className="h-4 w-4 text-foreground/60" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search studies, sections, visuals..."
                        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45"
                      />
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                      <select
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"
                      >
                        <option value="All">All Domains</option>
                        {domainOptions.map((entry) => (
                          <option key={entry} value={entry}>
                            {entry}
                          </option>
                        ))}
                      </select>
                      <select
                        value={tool}
                        onChange={(e) => setTool(e.target.value)}
                        className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"
                      >
                        <option value="All">All Tools</option>
                        {toolOptions.map((entry) => (
                          <option key={entry} value={entry}>
                            {entry}
                          </option>
                        ))}
                      </select>
                      <select
                        value={stage}
                        onChange={(e) => setStage(e.target.value as "All" | EngineeringCaseStudyStage)}
                        className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"
                      >
                        <option value="All">All Stages</option>
                        <option value="featured">Featured</option>
                        <option value="active">Active</option>
                        <option value="prototype">Prototype</option>
                      </select>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-foreground/65">
                      <span>{filtered.length} match(es)</span>
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setDomain("All");
                          setTool("All");
                          setStage("All");
                        }}
                        className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 transition hover:bg-background/60"
                      >
                        <Filter className="h-3.5 w-3.5" />
                        Clear
                      </button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                    <p className="mb-3 text-xs uppercase tracking-[0.12em] text-foreground/55">
                      Case Studies
                    </p>
                    <div className="space-y-2">
                      {filtered.length === 0 && (
                        <div className="rounded-xl border border-border bg-background/35 p-3 text-xs text-foreground/65">
                          No study matches current filters.
                        </div>
                      )}
                      {filtered.map((study) => (
                        <button
                          key={study.id}
                          type="button"
                          onClick={() => {
                            setActiveId(study.id);
                            setMobileSidebarOpen(false);
                            mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={cx(
                            "w-full rounded-2xl border px-3 py-3 text-left transition-all",
                            study.id === active?.id
                              ? "border-transparent bg-card text-foreground shadow-[0_12px_26px_rgba(2,6,23,0.2)]"
                              : "border-border bg-card/70 text-foreground/85 hover:bg-card hover:border-foreground/20",
                          )}
                          style={study.id === active?.id ? accentSurface : undefined}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold">{study.navigationTitle}</p>
                              <p className="mt-0.5 line-clamp-2 text-xs text-foreground/65">
                                {study.subtitle}
                              </p>
                            </div>
                            <span
                              className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]"
                              style={stageChipStyle(study.stage)}
                            >
                              {stageLabels[study.stage]}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {active && (
                    <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                      <p className="mb-2 text-xs uppercase tracking-[0.12em] text-foreground/55">
                        Section Jump
                      </p>
                      <div className="grid gap-1.5">
                        {active.sections.map((section) => (
                          <button
                            key={section.id}
                            type="button"
                            onClick={() => {
                              setActiveSectionId(section.id);
                              if (!expanded.includes(section.id)) {
                                setExpanded((prev) => [...prev, section.id]);
                              }
                              sectionRefs.current[section.id]?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                              setMobileSidebarOpen(false);
                            }}
                            className={cx(
                              "flex items-center justify-between rounded-lg border px-2.5 py-2 text-left text-xs transition",
                              activeSectionId === section.id
                                ? "border-transparent bg-card text-foreground"
                                : "border-border bg-background/35 text-foreground/70 hover:bg-background/55",
                            )}
                            style={activeSectionId === section.id ? accentSurface : undefined}
                          >
                            <span className="truncate">{section.title}</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
              <main
                ref={mainRef}
                className="order-1 space-y-5 lg:order-2 lg:h-[calc(100vh-11rem)] lg:overflow-y-auto lg:pr-1"
              >
                {!active && (
                  <div className="rounded-2xl border border-border bg-card/80 p-6 text-sm text-foreground/70">
                    No case study available for this filter combination.
                  </div>
                )}

                {active && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      <section className="rounded-3xl border border-border bg-card/85 p-5 backdrop-blur-sm md:p-7">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
                              style={stageChipStyle(active.stage)}
                            >
                              {stageLabels[active.stage]}
                            </span>
                            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground/70">
                              Published {active.published}
                            </span>
                            <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground/70">
                              ~{active.readTimeMins} min read
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setExpandedView({ kind: "project" })}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-xs text-foreground/82 transition hover:bg-background/60"
                          >
                            <Maximize2 className="h-3.5 w-3.5" />
                            Expand View
                          </button>
                        </div>

                        <h1 className="mt-4 text-2xl font-bold leading-tight text-foreground md:text-3xl">
                          {active.title}
                        </h1>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/78">
                          {active.subtitle}
                        </p>

                        <div className="mt-5 rounded-2xl border p-4" style={accentSurface}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground">
                                {active.hero.headline}
                              </p>
                              <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                                {active.hero.subhead}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setExpandedView({ kind: "project" })}
                              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-foreground/82 transition hover:bg-background/55"
                              style={accentSurface}
                              aria-label="Expand overview"
                            >
                              <Maximize2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {active.hero.badges.map((badge) => (
                              <span
                                key={badge}
                                className="rounded-full border px-2.5 py-1 text-xs"
                                style={{
                                  backgroundColor: "hsl(var(--accent1) / 0.16)",
                                  borderColor: "hsl(var(--accent1) / 0.4)",
                                  color: "hsl(var(--accent1))",
                                }}
                              >
                                {badge}
                              </span>
                            ))}
                          </div>
                        </div>
                      </section>
                      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {active.quickFacts.map((fact, idx) => (
                          <motion.div
                            key={fact.label}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.22, delay: idx * 0.04 }}
                            whileHover={{ y: -3 }}
                            className="rounded-2xl border border-border bg-card/75 p-4 transition hover:border-foreground/25"
                          >
                            <p className="text-xs uppercase tracking-[0.1em] text-foreground/55">
                              {fact.label}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-foreground">{fact.value}</p>
                            {fact.hint && <p className="mt-1 text-xs text-foreground/60">{fact.hint}</p>}
                          </motion.div>
                        ))}
                      </section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">Engineering Visual Lab</p>
                            <p className="text-xs text-foreground/62">
                              Interactive single-line, before/after outcomes, and project profiling.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setExpandedView({ kind: "project" })}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground/82 transition hover:bg-background/60"
                          >
                            Full Project View
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                          {active.visuals.map((visual) => (
                            <VisualCard
                              key={visual.id}
                              visual={visual}
                              onExpand={() => setExpandedView({ kind: "visual", visualId: visual.id })}
                            />
                          ))}
                        </div>
                      </section>
                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-foreground/55">
                          Focus Domains &amp; Tools
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {active.domainTags.map((entry) => (
                            <button
                              key={entry}
                              type="button"
                              onClick={() => setDomain(entry)}
                              className={cx(
                                "rounded-full border px-2.5 py-1 text-xs transition",
                                domain === entry
                                  ? "border-transparent text-foreground"
                                  : "border-border text-foreground/75 hover:bg-background/55",
                              )}
                              style={domain === entry ? accentSurface : undefined}
                            >
                              {entry}
                            </button>
                          ))}
                          {active.tools.map((entry) => (
                            <button
                              key={entry}
                              type="button"
                              onClick={() => setTool(entry)}
                              className={cx(
                                "rounded-full border px-2.5 py-1 text-xs transition",
                                tool === entry
                                  ? "border-transparent text-foreground"
                                  : "border-border text-foreground/75 hover:bg-background/55",
                              )}
                              style={tool === entry ? accentSurface : undefined}
                            >
                              {entry}
                            </button>
                          ))}
                        </div>
                      </section>

                      <section className="space-y-4">
                        {active.sections.map((section) => {
                          const open = expanded.includes(section.id);
                          const linkedVisuals = (section.visualIds ?? [])
                            .map((id) => activeVisualMap.get(id))
                            .filter(isVisual);
                          return (
                            <motion.section
                              key={section.id}
                              data-sectionid={section.id}
                              ref={(node) => {
                                sectionRefs.current[section.id] = node;
                              }}
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.26 }}
                              className={cx(
                                "overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-sm transition-colors",
                                activeSectionId === section.id ? "border-transparent" : "border-border",
                              )}
                              style={activeSectionId === section.id ? accentSurface : undefined}
                            >
                              <div className="flex items-start gap-2 px-4 py-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpanded((prev) =>
                                      prev.includes(section.id)
                                        ? prev.filter((id) => id !== section.id)
                                        : [...prev, section.id],
                                    )
                                  }
                                  className="flex min-w-0 flex-1 items-center justify-between gap-3 text-left"
                                >
                                  <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-foreground">
                                      {section.title}
                                    </p>
                                    {section.subtitle && (
                                      <p className="mt-0.5 truncate text-xs text-foreground/65">
                                        {section.subtitle}
                                      </p>
                                    )}
                                  </div>
                                  <ChevronDown
                                    className={cx(
                                      "h-4 w-4 text-foreground/65 transition-transform",
                                      open ? "rotate-180" : "rotate-0",
                                    )}
                                  />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedView({ kind: "section", sectionId: section.id })
                                  }
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-foreground/78 transition hover:bg-background/60"
                                  aria-label={`Expand ${section.title}`}
                                >
                                  <Maximize2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <AnimatePresence initial={false}>
                                {open && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-border px-4 py-4"
                                  >
                                    {section.body && (
                                      <p className="text-sm leading-relaxed text-foreground/82">
                                        {section.body}
                                      </p>
                                    )}

                                    {section.bullets?.length ? (
                                      <ul className="mt-3 grid gap-2 text-sm text-foreground/82">
                                        {section.bullets.map((bullet) => (
                                          <li key={bullet} className="flex items-start gap-2.5">
                                            <span
                                              className="mt-2 h-1.5 w-1.5 rounded-full"
                                              style={{ backgroundColor: "hsl(var(--accent1))" }}
                                            />
                                            <span className="leading-relaxed">{bullet}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : null}

                                    {section.stats?.length ? (
                                      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                        {section.stats.map((stat) => (
                                          <div
                                            key={`${section.id}-${stat.label}`}
                                            className="rounded-2xl border border-border bg-card/75 p-4"
                                          >
                                            <p className="text-xs uppercase tracking-[0.1em] text-foreground/55">
                                              {stat.label}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-foreground">
                                              {stat.value}
                                            </p>
                                            {stat.hint && (
                                              <p className="mt-1 text-xs text-foreground/60">{stat.hint}</p>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    ) : null}

                                    {section.expandedInsights?.length ? (
                                      <div className="mt-4 space-y-2 rounded-xl border border-border bg-background/35 p-3">
                                        <p className="text-xs uppercase tracking-[0.1em] text-foreground/55">
                                          Deeper Insight
                                        </p>
                                        {section.expandedInsights.map((insight) => (
                                          <p
                                            key={insight}
                                            className="text-sm leading-relaxed text-foreground/78"
                                          >
                                            {insight}
                                          </p>
                                        ))}
                                      </div>
                                    ) : null}

                                    {linkedVisuals.length ? (
                                      <div className="mt-4">
                                        <p className="text-xs uppercase tracking-[0.1em] text-foreground/55">
                                          Linked Visuals
                                        </p>
                                        <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                          {linkedVisuals.map((visual) => (
                                            <button
                                              key={`${section.id}-${visual.id}`}
                                              type="button"
                                              onClick={() =>
                                                setExpandedView({
                                                  kind: "visual",
                                                  visualId: visual.id,
                                                })
                                              }
                                              className="rounded-xl border border-border bg-card/70 px-3 py-2 text-left transition hover:border-foreground/25 hover:bg-card"
                                            >
                                              <p className="text-xs font-semibold text-foreground">
                                                {visual.title}
                                              </p>
                                              <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-foreground/58">
                                                {visual.type}
                                              </p>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    ) : null}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.section>
                          );
                        })}
                      </section>
                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">Media Preview</p>
                          <span className="text-xs text-foreground/60">
                            {active.media.length} item(s)
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {active.media.map((media) => (
                            <button
                              key={media.id}
                              type="button"
                              onClick={() => openMedia(media)}
                              className="group overflow-hidden rounded-xl border border-border bg-background/35 text-left transition hover:-translate-y-0.5 hover:border-foreground/25"
                            >
                              <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                                {media.kind === "image" ? (
                                  <StableMediaImage
                                    src={media.src}
                                    alt={media.alt}
                                    containerClassName="h-full w-full"
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                  />
                                ) : (
                                  <div className="grid h-full w-full place-items-center">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white">
                                      <Video className="h-3.5 w-3.5" />
                                      Video
                                    </div>
                                  </div>
                                )}
                                <div className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white">
                                  <Eye className="h-3.5 w-3.5" />
                                </div>
                              </div>
                              <div className="p-3">
                                <p className="text-sm font-semibold text-foreground">{media.title}</p>
                                {media.caption && (
                                  <p className="mt-1 line-clamp-2 text-xs text-foreground/65">
                                    {media.caption}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <p className="text-sm font-semibold text-foreground">Study Assets</p>
                        <p className="mt-1 text-xs text-foreground/65">
                          Preview files directly here or open them externally.
                        </p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {active.assets.map((asset) => (
                            <div
                              key={asset.id}
                              className="rounded-2xl border border-border bg-card/75 p-4"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold text-foreground">{asset.title}</p>
                                  {asset.note && (
                                    <p className="mt-1 text-xs text-foreground/65">{asset.note}</p>
                                  )}
                                </div>
                                <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-foreground/60">
                                  {asset.kind}
                                </span>
                              </div>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                {isPreviewable(asset.kind) && (
                                  <button
                                    type="button"
                                    onClick={() => openAsset(asset)}
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:bg-background/60"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Preview
                                  </button>
                                )}
                                <a
                                  href={asset.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:bg-background/60"
                                >
                                  Open
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="grid gap-3 lg:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                          <p className="text-sm font-semibold text-foreground">For Engineering Teams</p>
                          <p className="mt-1 text-xs leading-relaxed text-foreground/65">
                            Structured packages can include load flow, short-circuit validation,
                            implementation notes, and report-ready outputs.
                          </p>
                          <Link
                            href="/hire"
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                          >
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-background/60">
                              Start Engineering Discussion
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </div>

                        <div
                          className="rounded-2xl border p-4 backdrop-blur-sm"
                          style={{
                            backgroundColor: "hsl(var(--accent2) / 0.09)",
                            borderColor: "hsl(var(--accent2) / 0.32)",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-foreground/80" />
                            <p className="text-sm font-semibold text-foreground">
                              For Students and Junior Engineers
                            </p>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-foreground/72">
                            This project can be curated as paid learning content with practical
                            simulation reasoning, validation logic, and reporting examples.
                          </p>
                          {active.learningTrack && (
                            <div className="mt-3 rounded-xl border border-border bg-card/75 p-3">
                              <p className="text-xs font-semibold text-foreground">
                                {active.learningTrack.title}
                              </p>
                              <p className="mt-1 text-xs text-foreground/65">
                                {active.learningTrack.summary}
                              </p>
                              <ul className="mt-2 grid gap-1 text-[11px] text-foreground/72">
                                {active.learningTrack.modules.slice(0, 3).map((module) => (
                                  <li key={module} className="flex items-start gap-2">
                                    <span
                                      className="mt-1.5 h-1.5 w-1.5 rounded-full"
                                      style={{ backgroundColor: "hsl(var(--accent2))" }}
                                    />
                                    <span>{module}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <Link href="/blog" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <span className="mt-3 inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-background/60">
                              Explore Learning Content
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          </Link>
                        </div>
                      </section>

                      {active.disclaimer && (
                        <section className="rounded-2xl border border-border bg-card/75 p-4 text-xs leading-relaxed text-foreground/65">
                          {active.disclaimer}
                        </section>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </main>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <AnimatePresence>
        {expandedView && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[115] bg-black/55 p-3 backdrop-blur-md md:p-6"
            onClick={() => setExpandedView(null)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              className="mx-auto flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/25 bg-primary/78 backdrop-blur-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/12 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">
                    {expandedView.kind === "project" && `${active.navigationTitle} - Full Project View`}
                    {expandedView.kind === "section" && expandedSection?.title}
                    {expandedView.kind === "visual" && expandedVisual?.title}
                  </p>
                  <p className="truncate text-xs text-white/70">
                    {expandedView.kind === "project" &&
                      "Detailed overview, technical notes, visuals, and education pathway"}
                    {expandedView.kind === "section" &&
                      (expandedSection?.subtitle ?? "Expanded section view")}
                    {expandedView.kind === "visual" && "Expanded data visual and usage context"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedView(null)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                  aria-label="Close expanded view"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
                {expandedView.kind === "project" && (
                  <div className="space-y-5">
                    <section className="rounded-2xl border border-white/15 bg-white/5 p-4">
                      <h2 className="text-lg font-semibold text-white">{active.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/80">{active.subtitle}</p>
                      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
                        {active.quickFacts.map((fact) => (
                          <div key={fact.label} className="rounded-xl border border-white/12 bg-white/5 p-3">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-white/55">
                              {fact.label}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-white">{fact.value}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="space-y-3">
                      {active.deepDive.map((block) => (
                        <article key={block.id} className="rounded-2xl border border-white/14 bg-white/5 p-4">
                          <h3 className="text-sm font-semibold text-white">{block.title}</h3>
                          <div className="mt-2 space-y-2">
                            {block.paragraphs.map((paragraph) => (
                              <p key={paragraph} className="text-sm leading-relaxed text-white/78">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                          {block.bullets?.length ? (
                            <ul className="mt-3 grid gap-1.5 text-xs text-white/78">
                              {block.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/60" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </article>
                      ))}
                    </section>

                    <section className="space-y-3">
                      <p className="text-sm font-semibold text-white">Visuals and Data</p>
                      <div className="grid grid-cols-1 gap-3">
                        {active.visuals.map((visual) => (
                          <VisualCard key={`deep-${visual.id}`} visual={visual} />
                        ))}
                      </div>
                    </section>

                    {active.learningTrack && (
                      <section className="rounded-2xl border border-white/14 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">{active.learningTrack.title}</p>
                        <p className="mt-1 text-sm text-white/78">{active.learningTrack.summary}</p>
                        <div className="mt-3 grid gap-2">
                          {active.learningTrack.modules.map((module) => (
                            <div
                              key={module}
                              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/78"
                            >
                              {module}
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-xs text-white/68">
                          Audience: {active.learningTrack.audience}
                        </p>
                        <p className="mt-1 text-xs text-white/68">
                          Outcome: {active.learningTrack.outcome}
                        </p>
                      </section>
                    )}

                    {active.disclaimer && (
                      <section className="rounded-2xl border border-white/14 bg-white/5 p-4 text-xs leading-relaxed text-white/70">
                        {active.disclaimer}
                      </section>
                    )}
                  </div>
                )}

                {expandedView.kind === "section" && expandedSection && (
                  <div className="space-y-4">
                    <section className="rounded-2xl border border-white/14 bg-white/5 p-4">
                      <h2 className="text-lg font-semibold text-white">{expandedSection.title}</h2>
                      {expandedSection.subtitle && (
                        <p className="mt-1 text-sm text-white/74">{expandedSection.subtitle}</p>
                      )}
                      {expandedSection.body && (
                        <p className="mt-3 text-sm leading-relaxed text-white/80">
                          {expandedSection.body}
                        </p>
                      )}
                      {expandedSection.bullets?.length ? (
                        <ul className="mt-3 grid gap-2 text-sm text-white/80">
                          {expandedSection.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white/70" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>

                    {expandedSection.expandedInsights?.length ? (
                      <section className="rounded-2xl border border-white/14 bg-white/5 p-4">
                        <p className="text-sm font-semibold text-white">Extended Insights</p>
                        <div className="mt-2 space-y-2">
                          {expandedSection.expandedInsights.map((insight) => (
                            <p key={insight} className="text-sm leading-relaxed text-white/80">
                              {insight}
                            </p>
                          ))}
                        </div>
                      </section>
                    ) : null}

                    {expandedSection.stats?.length ? (
                      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {expandedSection.stats.map((stat) => (
                          <article key={stat.label} className="rounded-2xl border border-white/14 bg-white/5 p-4">
                            <p className="text-[11px] uppercase tracking-[0.08em] text-white/58">{stat.label}</p>
                            <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
                            {stat.hint && <p className="mt-1 text-xs text-white/65">{stat.hint}</p>}
                          </article>
                        ))}
                      </section>
                    ) : null}

                    {(expandedSection.visualIds ?? []).length ? (
                      <section className="space-y-3">
                        <p className="text-sm font-semibold text-white">Linked Visuals</p>
                        {(expandedSection.visualIds ?? [])
                          .map((id) => activeVisualMap.get(id))
                          .filter(isVisual)
                          .map((visual) => (
                            <VisualCard key={`section-expanded-${visual.id}`} visual={visual} />
                          ))}
                      </section>
                    ) : null}
                  </div>
                )}

                {expandedView.kind === "visual" && expandedVisual && (
                  <div className="space-y-4">
                    <VisualCard visual={expandedVisual} />
                    <section className="rounded-2xl border border-white/14 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-white">Where It Is Used</p>
                      {sectionsUsingExpandedVisual.length ? (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {sectionsUsingExpandedVisual.map((section) => (
                            <button
                              key={`visual-section-${section.id}`}
                              type="button"
                              onClick={() => setExpandedView({ kind: "section", sectionId: section.id })}
                              className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/82 transition hover:bg-white/10"
                            >
                              {section.title}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2 text-xs text-white/72">
                          This visual is currently used at project level.
                        </p>
                      )}
                    </section>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {preview && (
        <div
          className="fixed inset-0 z-[120] bg-black/58 p-4 backdrop-blur-md md:p-8"
          onClick={() => setPreview(null)}
          role="presentation"
        >
          <div
            className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/28 bg-primary/80 backdrop-blur-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{preview.title}</p>
                {preview.note && <p className="truncate text-xs text-white/70">{preview.note}</p>}
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 bg-black/45 p-2 md:p-4">
              {preview.kind === "image" && (
                <StableMediaImage
                  src={preview.src}
                  alt={preview.title}
                  containerClassName="h-full w-full rounded-xl bg-black"
                  className="h-full w-full object-contain"
                />
              )}
              {preview.kind === "video" && (
                <video
                  src={preview.src}
                  controls
                  className="h-full w-full rounded-xl bg-black object-contain"
                />
              )}
              {preview.kind === "pdf" && (
                <iframe src={preview.src} title={preview.title} className="h-full w-full rounded-xl bg-white" />
              )}
            </div>
            <div className="flex items-center justify-end border-t border-white/10 px-4 py-3">
              <a
                href={preview.src}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Open in new tab
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
