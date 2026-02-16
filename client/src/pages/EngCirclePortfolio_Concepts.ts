import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Zap,
  Gauge,
  Layers,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  Tag,
  LayoutGrid,
} from "lucide-react";

import BackgroundEffect from '@/components/home/BackgroundEffect';
import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";

/**
 * Engineering Case Study Presentation Page
 * - React + TypeScript (single-file)
 * - Tailwind for styling
 * - Designed to scale: add more case studies by appending to CASE_STUDIES
 *
 * Notes:
 * - Replace `assets` links with your own hosted PDFs/images.
 * - Add screenshots later: just populate `gallery` for a case study.
 */

type AssetKind = "pdf" | "image" | "link";

type Asset = {
  id: string;
  title: string;
  kind: AssetKind;
  href: string;
  note?: string;
};

type Stat = {
  label: string;
  value: string;
  hint?: string;
};

type Section = {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  bullets?: string[];
  body?: string;
  stats?: Stat[];
};

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  domainTags: string[];
  tools: string[];
  published: string; // YYYY-MM
  readTimeMins: number;
  hero: {
    headline: string;
    subhead: string;
    badges: string[];
  };
  quickFacts: Stat[];
  sections: Section[];
  assets: Asset[];
  gallery?: { id: string; alt: string; src: string }[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "industrial-power-system-etap",
    title: "Industrial Power System — Simulation & Validation",
    subtitle:
      "End-to-end ETAP study: baseline load flow, mitigation, and short-circuit verification (maximum & minimum).",
    domainTags: [
      "Power Systems",
      "Load Flow",
      "Short Circuit",
      "Industrial Distribution",
      "Voltage Regulation",
      "Equipment Duty",
    ],
    tools: ["ETAP", "Adaptive Newton–Raphson", "IEC Short-Circuit Methods"],
    published: "2026-01",
    readTimeMins: 7,
    hero: {
      headline: "From diagnostics → mitigation → fault-level verification",
      subhead:
        "A multi-voltage industrial network assessed under steady-state and fault conditions to validate operational and protection adequacy.",
      badges: ["132 kV → 13.8 kV → 4.16 kV → 0.48 kV", "Baseline vs Mitigated", "Max + Min Fault"],
    },
    quickFacts: [
      { label: "Supply", value: "Dual 132 kV utility in-feeds" },
      { label: "Voltage Levels", value: "132 kV / 13.8 kV / 4.16 kV / 0.48 kV" },
      { label: "Core Studies", value: "Load Flow + Short Circuit (Max/Min)" },
      { label: "Outcome", value: "Voltage profile improved; cable loading reduced; duties validated" },
    ],
    sections: [
      {
        id: "overview",
        title: "System Overview",
        subtitle: "Architecture, supply strategy, and distribution hierarchy",
        icon: <Layers className="h-5 w-5" />,
        bullets: [
          "Dual 132 kV utility sources improve reliability and operational flexibility.",
          "Step-down transformers feed 13.8 kV MV distribution, then 4.16 kV, then 0.48 kV LV buses.",
          "Topology reflects typical industrial distribution with mixed motor and static loads.",
        ],
        stats: [
          { label: "Topology", value: "Redundant dual-source" },
          { label: "Focus", value: "Voltage regulation + thermal loading" },
          { label: "Use Cases", value: "Industry, mining, renewables tie-in, microgrids" },
        ],
      },
      {
        id: "modelling",
        title: "Modelling Framework",
        subtitle: "Assumptions, data inputs, and solver strategy",
        icon: <Gauge className="h-5 w-5" />,
        bullets: [
          "Balanced three-phase, steady-state analysis.",
          "Loads represented primarily as constant PQ where applicable.",
          "Transmission/cable impedances and transformer %Z modeled from structured dataset.",
          "Load flow solved using Adaptive Newton–Raphson.",
        ],
      },
      {
        id: "lf-baseline",
        title: "Load Flow — Baseline",
        subtitle: "Identify voltage and loading violations",
        icon: <Zap className="h-5 w-5" />,
        bullets: [
          "Initial run indicated marginal undervoltage at key buses (notably MV/LV regions).",
          "Selected LV feeders/cables showed significant loading due to impedance and conductor configuration.",
          "Risks: elevated losses, thermal stress, and reduced equipment life.",
        ],
      },
      {
        id: "mitigation",
        title: "Engineering Mitigation",
        subtitle: "Corrective actions applied inside the model",
        icon: <ShieldCheck className="h-5 w-5" />,
        bullets: [
          "Transformer tap adjustments to restore voltage margins.",
          "Increased conductors-per-phase for overloaded cables to reduce effective impedance.",
          "Verification run to confirm improved voltage profile and reduced feeder stress.",
        ],
      },
      {
        id: "lf-post",
        title: "Load Flow — Post-Mitigation",
        subtitle: "Confirm performance after interventions",
        icon: <Zap className="h-5 w-5" />,
        bullets: [
          "Voltage profile improved to within acceptable tolerance across affected buses.",
          "Cable/feeder loading reduced with restored thermal margins.",
          "Demonstrates the value of simulation-led design decisions prior to implementation.",
        ],
      },
      {
        id: "sc-max",
        title: "Short Circuit — Maximum Fault",
        subtitle: "Equipment duty, interrupting and withstand validation",
        icon: <ShieldCheck className="h-5 w-5" />,
        bullets: [
          "3-phase maximum fault currents computed at key buses.",
          "Breaker making/breaking duties compared against device capabilities.",
          "Supports switchgear adequacy checks and design verification.",
        ],
      },
      {
        id: "sc-min",
        title: "Short Circuit — Minimum Fault",
        subtitle: "Protection sensitivity and low-current fault detection",
        icon: <ShieldCheck className="h-5 w-5" />,
        bullets: [
          "Minimum fault currents assessed for line-to-ground and related conditions.",
          "Ensures protection devices can still detect and isolate faults.",
          "Highlights the importance of minimum fault levels for relay pickup and coordination.",
        ],
      },
      {
        id: "deliverables",
        title: "Deliverables",
        subtitle: "Study artifacts available for review",
        icon: <FileText className="h-5 w-5" />,
        bullets: [
          "Load Flow — Normal Conditions (baseline).",
          "Load Flow — Mitigated Issues (optimized).",
          "Maximum Short-Circuit Summary.",
          "Minimum Short-Circuit Report.",
          "Compiled Engineering Portfolio (narrative report + figures).",
        ],
      },
    ],
    assets: [
      {
        id: "asset-lf-normal",
        title: "Load Flow — Normal Conditions (PDF)",
        kind: "pdf",
        href: "/assets/pdfs/Load-Flow-Normal.pdf",
        note: "Baseline load flow report (pre-mitigation).",
      },
      {
        id: "asset-lf-fixed",
        title: "Load Flow — Mitigated Issues (PDF)",
        kind: "pdf",
        href: "/assets/pdfs/Load-Flow-Mitigated.pdf",
        note: "Post-intervention verification run.",
      },
      {
        id: "asset-sc-max",
        title: "Maximum Short-Circuit Summary (PDF)",
        kind: "pdf",
        href: "/assets/pdfs/SC-Maximum-Summary.pdf",
        note: "3-phase max fault currents and device duty checks.",
      },
      {
        id: "asset-sc-min",
        title: "Minimum Short-Circuit Report (PDF)",
        kind: "pdf",
        href: "/assets/pdfs/SC-Minimum-Report.pdf",
        note: "Minimum fault levels for protection sensitivity.",
      },
      {
        id: "asset-portfolio",
        title: "Engineering Portfolio (PDF)",
        kind: "pdf",
        href: "/assets/pdfs/Engineering-Portfolio.pdf",
        note: "Narrative report: overview, methodology, results, and recommendations.",
      },
    ],
    gallery: [],
  },
];

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const pillColors = [
  "bg-neutral-900 text-white border-neutral-800",
  "bg-white text-neutral-900 border-neutral-200",
];

function Pill({ text, inverted = false }: { text: string; inverted?: boolean }) {
  const cls = inverted ? pillColors[0] : pillColors[1];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        cls
      )}
    >
      <Tag className={cx("h-3.5 w-3.5", inverted ? "text-white" : "text-neutral-700")} />
      {text}
    </span>
  );
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-medium text-neutral-500">{stat.label}</div>
      <div className="mt-1 text-sm font-semibold text-neutral-900">{stat.value}</div>
      {stat.hint ? <div className="mt-1 text-xs text-neutral-500">{stat.hint}</div> : null}
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <motion.section
      variants={fadeUp}
      className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50">
              {section.icon}
            </div>
            <h3 className="text-base font-semibold text-neutral-900">{section.title}</h3>
          </div>
          {section.subtitle ? (
            <p className="mt-2 text-sm text-neutral-600">{section.subtitle}</p>
          ) : null}
        </div>
      </div>

      {section.body ? <p className="mt-4 text-sm text-neutral-700">{section.body}</p> : null}

      {section.bullets?.length ? (
        <ul className="mt-4 grid gap-2">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-neutral-700">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
              <span className="leading-6">{b}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.stats?.length ? (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {section.stats.map((s) => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>
      ) : null}
    </motion.section>
  );
}

function AssetButton({ asset }: { asset: Asset }) {
  const icon =
    asset.kind === "pdf" ? (
      <FileText className="h-4 w-4" />
    ) : asset.kind === "image" ? (
      <LayoutGrid className="h-4 w-4" />
    ) : (
      <ExternalLink className="h-4 w-4" />
    );

  return (
    <a
      href={asset.href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-neutral-300"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
            {icon}
          </span>
          <span className="truncate">{asset.title}</span>
        </div>
        {asset.note ? <div className="mt-2 text-xs text-neutral-500">{asset.note}</div> : null}
      </div>
      <ArrowUpRight className="mt-2 h-4 w-4 text-neutral-400 transition group-hover:text-neutral-700" />
    </a>
  );
}

function SidebarItem({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "w-full rounded-2xl px-4 py-3 text-left text-sm transition",
        active
          ? "bg-neutral-900 text-white"
          : "bg-white text-neutral-800 hover:bg-neutral-50"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="truncate font-medium">{label}</span>
        <ChevronRight className={cx("h-4 w-4", active ? "text-white" : "text-neutral-400")} />
      </div>
    </button>
  );
}

export default function EngineeringPresentationPage() {
  const [activeId, setActiveId] = useState<string>(CASE_STUDIES[0]?.id ?? "");
  const [query, setQuery] = useState<string>("");
  const [tag, setTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const s = new Set<string>();
    CASE_STUDIES.forEach((c) => c.domainTags.forEach((t) => s.add(t)));
    return ["All", ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CASE_STUDIES.filter((c) => {
      const tagOk = tag === "All" || c.domainTags.includes(tag);
      const qOk =
        !q ||
        [c.title, c.subtitle, c.hero.headline, c.hero.subhead, ...c.domainTags, ...c.tools]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return tagOk && qOk;
    });
  }, [query, tag]);

  const active = useMemo(() => {
    return filtered.find((c) => c.id === activeId) ?? filtered[0] ?? CASE_STUDIES[0];
  }, [activeId, filtered]);

  const activeIndex = filtered.findIndex((c) => c.id === active?.id);

  function nav(delta: number) {
    if (activeIndex < 0) return;
    const next = filtered[activeIndex + delta];
    if (next) setActiveId(next.id);
  }

  return (
    <>
      <BackgroundEffect />
  
      <Header />

      <div className="min-h-screen bg-neutral-50">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
            <div className="min-w-0">
              <div className="text-xs font-semibold tracking-wide text-neutral-500">ENGINEERING SHOWCASE</div>
              <div className="truncate text-base font-bold text-neutral-900">
                Simulation Studies • Power Systems • Technical Validation
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => nav(-1)}
                disabled={activeIndex <= 0}
                className={cx(
                  "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition",
                  activeIndex <= 0
                    ? "cursor-not-allowed border-neutral-200 text-neutral-300"
                    : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                onClick={() => nav(1)}
                disabled={activeIndex < 0 || activeIndex >= filtered.length - 1}
                className={cx(
                  "inline-flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition",
                  activeIndex < 0 || activeIndex >= filtered.length - 1
                    ? "cursor-not-allowed border-neutral-200 text-neutral-300"
                    : "border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                )}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[360px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2">
                <Search className="h-4 w-4 text-neutral-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search studies, tools, tags…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700">
                  <Filter className="h-4 w-4 text-neutral-500" />
                  <select
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    {allTags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="ml-auto text-xs text-neutral-500">{filtered.length} study(s)</div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="mb-3 text-xs font-semibold tracking-wide text-neutral-500">CASE STUDIES</div>
              <div className="space-y-2">
                {filtered.map((c) => (
                  <SidebarItem
                    key={c.id}
                    active={c.id === active?.id}
                    label={c.title}
                    onClick={() => setActiveId(c.id)}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="text-xs font-semibold tracking-wide text-neutral-500">ADD MORE LATER</div>
              <p className="mt-2 text-sm text-neutral-700">
                To add another study: append a new object to <span className="font-mono">CASE_STUDIES</span>.
                The page automatically supports filtering, navigation, sections, and assets.
              </p>
            </div>
          </aside>

          {/* Main */}
          <main className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {/* Hero */}
                <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 p-7 text-white shadow-sm">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="text-xs font-semibold tracking-wide text-neutral-300">CASE STUDY</div>
                      <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
                        {active?.title}
                      </h1>
                      <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-200">
                        {active?.subtitle}
                      </p>
                    </div>

                    <div className="rounded-3xl bg-white/5 p-5">
                      <div className="text-sm font-semibold">{active?.hero.headline}</div>
                      <div className="mt-2 text-sm text-neutral-200">{active?.hero.subhead}</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {active?.hero.badges.map((b) => (
                          <Pill key={b} text={b} inverted />
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-neutral-300">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Published: {active?.published}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Reading time: ~{active?.readTimeMins} min
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                          Tools: {active?.tools.join(" • ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Facts */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {active?.quickFacts.map((s) => (
                    <StatCard key={s.label} stat={s} />
                  ))}
                </div>

                {/* Tags */}
                <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    {active?.domainTags.map((t) => (
                      <Pill key={t} text={t} />
                    ))}
                  </div>
                </div>

                {/* Content Sections */}
                <motion.div
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 gap-6"
                >
                  {active?.sections.map((sec) => (
                    <SectionBlock key={sec.id} section={sec} />
                  ))}
                </motion.div>

                {/* Assets */}
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold text-neutral-900">Study Files</h2>
                      <p className="mt-1 text-sm text-neutral-600">
                        PDFs and reference materials (replace links with your hosted assets).
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {active?.assets.map((a) => (
                      <AssetButton key={a.id} asset={a} />
                    ))}
                  </div>
                </div>

                {/* Footer CTA */}
                <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-base font-semibold text-neutral-900">Want this for a real facility?</div>
                      <div className="mt-1 text-sm text-neutral-600">
                        We can package studies into a clean deliverable: load flow, fault level, and compliance-ready report.
                      </div>
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                    >
                      Contact
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Simple Contact Anchor */}
            <div id="contact" className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-base font-semibold text-neutral-900">Contact</div>
              <p className="mt-2 text-sm text-neutral-600">
                Replace with your real contact component or embed a form (e.g., Tally/Typeform) later.
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs font-medium text-neutral-500">Email</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">you@domain.com</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs font-medium text-neutral-500">Phone</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">+263 …</div>
                </div>
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="text-xs font-medium text-neutral-500">Location</div>
                  <div className="mt-1 text-sm font-semibold text-neutral-900">Zimbabwe / Remote</div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom spacing */}
        <div className="h-10" />
      </div>

      <Footer />
      
    </>
  );
}
















import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Filter,
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
  type EngineeringCaseStudyStage,
  type EngineeringMedia,
} from "@/data/engCirclePortfolio";
import { useBackNavigation } from "@/hooks/use-back-navigation";

type PreviewKind = "image" | "video" | "pdf";
type Preview = { title: string; src: string; kind: PreviewKind; note?: string };

const stageLabels: Record<EngineeringCaseStudyStage, string> = {
  featured: "Featured",
  active: "Active",
  prototype: "Prototype",
};

const accentSurface = { backgroundColor: "hsl(var(--accent1) / 0.12)", borderColor: "hsl(var(--accent1) / 0.35)" };

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function stageChipStyle(stage: EngineeringCaseStudyStage) {
  if (stage === "featured") return { backgroundColor: "hsl(var(--accent1) / 0.18)", borderColor: "hsl(var(--accent1) / 0.45)", color: "hsl(var(--accent1))" };
  if (stage === "active") return { backgroundColor: "hsl(var(--accent2) / 0.18)", borderColor: "hsl(var(--accent2) / 0.45)", color: "hsl(var(--accent2))" };
  return { backgroundColor: "hsl(var(--accent5) / 0.16)", borderColor: "hsl(var(--accent5) / 0.4)", color: "hsl(var(--accent5))" };
}

function isPreviewable(kind: EngineeringAsset["kind"]) {
  return kind === "image" || kind === "video" || kind === "pdf";
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

  const domainOptions = useMemo(() => Array.from(new Set(engineeringCaseStudies.flatMap((s) => s.domainTags))).sort(), []);
  const toolOptions = useMemo(() => Array.from(new Set(engineeringCaseStudies.flatMap((s) => s.tools))).sort(), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return engineeringCaseStudies.filter((s) => {
      const matchesDomain = domain === "All" || s.domainTags.includes(domain);
      const matchesTool = tool === "All" || s.tools.includes(tool);
      const matchesStage = stage === "All" || s.stage === stage;
      const hay = [s.title, s.subtitle, s.hero.headline, s.hero.subhead, ...s.domainTags, ...s.tools, ...s.sections.flatMap((sec) => [sec.title, sec.subtitle ?? "", sec.body ?? "", ...(sec.bullets ?? [])])].join(" ").toLowerCase();
      const matchesQuery = !q || hay.includes(q);
      return matchesDomain && matchesTool && matchesStage && matchesQuery;
    });
  }, [domain, query, stage, tool]);

  useEffect(() => {
    if (!filtered.length) return;
    if (!filtered.some((s) => s.id === activeId)) setActiveId(filtered[0].id);
  }, [activeId, filtered]);

  const active = useMemo(() => filtered.find((s) => s.id === activeId) ?? filtered[0] ?? null, [activeId, filtered]);
  const activeIndex = active ? filtered.findIndex((s) => s.id === active.id) : -1;
  const canPrev = activeIndex > 0;
  const canNext = activeIndex >= 0 && activeIndex < filtered.length - 1;

  useEffect(() => {
    if (!active) return;
    const first = active.sections[0]?.id ?? "";
    setExpanded(first ? [first] : []);
    setActiveSectionId(first);
  }, [active?.id]);

  useEffect(() => {
    if (!active) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = (visible?.target as HTMLElement | undefined)?.dataset.sectionid;
        if (id) setActiveSectionId(id);
      },
      { root: mainRef.current, threshold: [0.25, 0.45, 0.7] },
    );
    active.sections.forEach((sec) => {
      const node = sectionRefs.current[sec.id];
      if (node) obs.observe(node);
    });
    return () => obs.disconnect();
  }, [active?.id, expanded]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const navigate = (delta: -1 | 1) => {
    if (activeIndex < 0) return;
    const next = filtered[activeIndex + delta];
    if (!next) return;
    setActiveId(next.id);
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
                <button onClick={goBack} type="button" className="inline-flex h-9 items-center gap-1 rounded-xl border border-border px-3 text-sm text-foreground/85 transition hover:bg-background/60">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <div className="min-w-0">
                  <p className="truncate text-[11px] uppercase tracking-[0.14em] text-foreground/55">EngCircle Portfolio</p>
                  <p className="truncate text-sm font-semibold text-foreground">Applied power systems, microgrids, and validation</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 md:justify-end">
                <Link href="/engineer/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <span className="inline-flex h-9 items-center rounded-xl border border-border px-3 text-xs text-foreground/80 transition hover:bg-background/60">Journey</span>
                </Link>
                <button type="button" onClick={() => navigate(-1)} disabled={!canPrev} className={cx("inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-sm transition", canPrev ? "border-border text-foreground/85 hover:bg-background/60" : "cursor-not-allowed border-border text-foreground/35")}>
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <button type="button" onClick={() => navigate(1)} disabled={!canNext} className={cx("inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-sm transition", canNext ? "border-border text-foreground/85 hover:bg-background/60" : "cursor-not-allowed border-border text-foreground/35")}>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 md:px-6">
            <div className="grid gap-6 lg:h-[calc(100vh-11.5rem)] lg:grid-cols-[340px_minmax(0,1fr)] lg:overflow-hidden">
              <aside className="lg:h-full lg:overflow-hidden">
                <div className="space-y-4 lg:flex lg:h-full lg:flex-col lg:overflow-hidden">
                  <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-background/40 px-3 py-2">
                      <Search className="h-4 w-4 text-foreground/60" />
                      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search studies, sections, tools..." className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/45" />
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                      <select value={domain} onChange={(e) => setDomain(e.target.value)} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"><option value="All">All Domains</option>{domainOptions.map((d) => <option key={d} value={d}>{d}</option>)}</select>
                      <select value={tool} onChange={(e) => setTool(e.target.value)} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"><option value="All">All Tools</option>{toolOptions.map((t) => <option key={t} value={t}>{t}</option>)}</select>
                      <select value={stage} onChange={(e) => setStage(e.target.value as "All" | EngineeringCaseStudyStage)} className="rounded-lg border border-border bg-background/40 px-3 py-2 text-sm text-foreground outline-none"><option value="All">All Stages</option><option value="featured">Featured</option><option value="active">Active</option><option value="prototype">Prototype</option></select>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-foreground/65">
                      <span>{filtered.length} match(es)</span>
                      <button type="button" onClick={() => { setQuery(""); setDomain("All"); setTool("All"); setStage("All"); }} className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 transition hover:bg-background/60"><Filter className="h-3.5 w-3.5" />Clear</button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm lg:min-h-0 lg:flex-1 lg:overflow-hidden">
                    <p className="mb-3 text-xs uppercase tracking-[0.12em] text-foreground/55">Case Studies</p>
                    <div className="space-y-2 lg:max-h-full lg:overflow-y-auto lg:pr-1">
                      {filtered.length === 0 && <div className="rounded-xl border border-border bg-background/35 p-3 text-xs text-foreground/65">No study matches current filters.</div>}
                      {filtered.map((s) => (
                        <button key={s.id} type="button" onClick={() => { setActiveId(s.id); mainRef.current?.scrollTo({ top: 0, behavior: "smooth" }); }} className={cx("w-full rounded-2xl border px-3 py-3 text-left transition-all", s.id === active?.id ? "border-transparent bg-card text-foreground shadow-[0_12px_26px_rgba(2,6,23,0.2)]" : "border-border bg-card/70 text-foreground/85 hover:bg-card hover:border-foreground/20")} style={s.id === active?.id ? accentSurface : undefined}>
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0"><p className="truncate text-sm font-semibold">{s.navigationTitle}</p><p className="mt-0.5 line-clamp-2 text-xs text-foreground/65">{s.subtitle}</p></div>
                            <span className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em]" style={stageChipStyle(s.stage)}>{stageLabels[s.stage]}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {active && (
                    <div className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                      <p className="mb-2 text-xs uppercase tracking-[0.12em] text-foreground/55">Section Jump</p>
                      <div className="grid gap-1.5">
                        {active.sections.map((sec) => (
                          <button key={sec.id} type="button" onClick={() => { setActiveSectionId(sec.id); if (!expanded.includes(sec.id)) setExpanded((p) => [...p, sec.id]); sectionRefs.current[sec.id]?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className={cx("flex items-center justify-between rounded-lg border px-2.5 py-2 text-left text-xs transition", activeSectionId === sec.id ? "border-transparent bg-card text-foreground" : "border-border bg-background/35 text-foreground/70 hover:bg-background/55")} style={activeSectionId === sec.id ? accentSurface : undefined}>
                            <span className="truncate">{sec.title}</span><ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>

              <main ref={mainRef} className="space-y-5 lg:h-full lg:overflow-y-auto lg:pr-1">
                {!active && <div className="rounded-2xl border border-border bg-card/80 p-6 text-sm text-foreground/70">No case study available for this filter combination.</div>}
                {active && (
                  <AnimatePresence mode="wait">
                    <motion.div key={active.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="space-y-5">
                      <section className="rounded-3xl border border-border bg-card/85 p-5 backdrop-blur-sm md:p-7">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={stageChipStyle(active.stage)}>{stageLabels[active.stage]}</span>
                          <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground/70">Published {active.published}</span>
                          <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-foreground/70">~{active.readTimeMins} min read</span>
                        </div>
                        <h1 className="mt-4 text-2xl font-bold leading-tight text-foreground md:text-3xl">{active.title}</h1>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/78">{active.subtitle}</p>
                        <div className="mt-5 rounded-2xl border p-4" style={accentSurface}>
                          <p className="text-sm font-semibold text-foreground">{active.hero.headline}</p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{active.hero.subhead}</p>
                          <div className="mt-3 flex flex-wrap gap-2">{active.hero.badges.map((b) => <span key={b} className="rounded-full border px-2.5 py-1 text-xs" style={{ backgroundColor: "hsl(var(--accent1) / 0.16)", borderColor: "hsl(var(--accent1) / 0.4)", color: "hsl(var(--accent1))" }}>{b}</span>)}</div>
                        </div>
                      </section>

                      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{active.quickFacts.map((f) => <div key={f.label} className="rounded-2xl border border-border bg-card/75 p-4 transition hover:-translate-y-0.5 hover:border-foreground/25"><p className="text-xs uppercase tracking-[0.1em] text-foreground/55">{f.label}</p><p className="mt-1 text-sm font-semibold text-foreground">{f.value}</p>{f.hint && <p className="mt-1 text-xs text-foreground/60">{f.hint}</p>}</div>)}</section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-foreground/55">Focus Domains & Tools</p>
                        <div className="flex flex-wrap gap-2">{active.domainTags.map((d) => <button key={d} type="button" onClick={() => setDomain(d)} className={cx("rounded-full border px-2.5 py-1 text-xs transition", domain === d ? "border-transparent text-foreground" : "border-border text-foreground/75 hover:bg-background/55")} style={domain === d ? accentSurface : undefined}>{d}</button>)}{active.tools.map((t) => <button key={t} type="button" onClick={() => setTool(t)} className={cx("rounded-full border px-2.5 py-1 text-xs transition", tool === t ? "border-transparent text-foreground" : "border-border text-foreground/75 hover:bg-background/55")} style={tool === t ? accentSurface : undefined}>{t}</button>)}</div>
                      </section>

                      <section className="space-y-4">
                        {active.sections.map((sec) => {
                          const open = expanded.includes(sec.id);
                          return (
                            <motion.section key={sec.id} data-sectionid={sec.id} ref={(n) => { sectionRefs.current[sec.id] = n; }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className={cx("overflow-hidden rounded-2xl border bg-card/80 backdrop-blur-sm transition-colors", activeSectionId === sec.id ? "border-transparent" : "border-border")} style={activeSectionId === sec.id ? accentSurface : undefined}>
                              <button type="button" onClick={() => setExpanded((p) => (p.includes(sec.id) ? p.filter((id) => id !== sec.id) : [...p, sec.id]))} className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"><div className="min-w-0"><p className="truncate text-sm font-semibold text-foreground">{sec.title}</p>{sec.subtitle && <p className="mt-0.5 truncate text-xs text-foreground/65">{sec.subtitle}</p>}</div><ChevronDown className={cx("h-4 w-4 text-foreground/65 transition-transform", open ? "rotate-180" : "rotate-0")} /></button>
                              <AnimatePresence initial={false}>
                                {open && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="border-t border-border px-4 py-4">
                                    {sec.body && <p className="text-sm leading-relaxed text-foreground/82">{sec.body}</p>}
                                    {sec.bullets?.length && <ul className="mt-3 grid gap-2 text-sm text-foreground/82">{sec.bullets.map((b) => <li key={b} className="flex items-start gap-2.5"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent1" /><span className="leading-relaxed">{b}</span></li>)}</ul>}
                                    {sec.stats?.length && <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{sec.stats.map((s) => <div key={`${sec.id}-${s.label}`} className="rounded-2xl border border-border bg-card/75 p-4"><p className="text-xs uppercase tracking-[0.1em] text-foreground/55">{s.label}</p><p className="mt-1 text-sm font-semibold text-foreground">{s.value}</p>{s.hint && <p className="mt-1 text-xs text-foreground/60">{s.hint}</p>}</div>)}</div>}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.section>
                          );
                        })}
                      </section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-foreground">Media Preview</p><span className="text-xs text-foreground/60">{active.media.length} item(s)</span></div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {active.media.map((m) => (
                            <button key={m.id} type="button" onClick={() => openMedia(m)} className="group overflow-hidden rounded-xl border border-border bg-background/35 text-left transition hover:-translate-y-0.5 hover:border-foreground/25">
                              <div className="relative aspect-[16/10] overflow-hidden bg-black/30">
                                {m.kind === "image" ? <StableMediaImage src={m.src} alt={m.alt} containerClassName="h-full w-full" className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" /> : <div className="grid h-full w-full place-items-center"><div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs text-white"><Video className="h-3.5 w-3.5" />Video</div></div>}
                                <div className="absolute bottom-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white"><Eye className="h-3.5 w-3.5" /></div>
                              </div>
                              <div className="p-3"><p className="text-sm font-semibold text-foreground">{m.title}</p>{m.caption && <p className="mt-1 line-clamp-2 text-xs text-foreground/65">{m.caption}</p>}</div>
                            </button>
                          ))}
                        </div>
                      </section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <p className="text-sm font-semibold text-foreground">Study Assets</p>
                        <p className="mt-1 text-xs text-foreground/65">Preview files directly here or open them externally.</p>
                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                          {active.assets.map((a) => (
                            <div key={a.id} className="rounded-2xl border border-border bg-card/75 p-4">
                              <div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="text-sm font-semibold text-foreground">{a.title}</p>{a.note && <p className="mt-1 text-xs text-foreground/65">{a.note}</p>}</div><span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-foreground/60">{a.kind}</span></div>
                              <div className="mt-3 flex flex-wrap items-center gap-2">
                                {isPreviewable(a.kind) && <button type="button" onClick={() => openAsset(a)} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:bg-background/60"><Eye className="h-3.5 w-3.5" />Preview</button>}
                                <a href={a.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:bg-background/60">Open<ExternalLink className="h-3.5 w-3.5" /></a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="rounded-2xl border border-border bg-card/80 p-4 backdrop-blur-sm">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div><p className="text-sm font-semibold text-foreground">Need a simulation-driven engineering package?</p><p className="mt-1 text-xs text-foreground/65">Structured delivery can include load flow, fault studies, and implementation guidance.</p></div>
                          <Link href="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><span className="inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-background/60">Start Discussion<ArrowUpRight className="h-3.5 w-3.5" /></span></Link>
                        </div>
                      </section>
                    </motion.div>
                  </AnimatePresence>
                )}
              </main>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {preview && (
        <div className="fixed inset-0 z-[120] bg-black/80 p-4 backdrop-blur-sm md:p-8" onClick={() => setPreview(null)} role="presentation">
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/20 bg-primary/95" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="min-w-0"><p className="truncate text-sm font-semibold text-white">{preview.title}</p>{preview.note && <p className="truncate text-xs text-white/70">{preview.note}</p>}</div>
              <button type="button" onClick={() => setPreview(null)} className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"><X className="h-4 w-4" /></button>
            </div>
            <div className="min-h-0 flex-1 bg-black/55 p-2 md:p-4">
              {preview.kind === "image" && <StableMediaImage src={preview.src} alt={preview.title} containerClassName="h-full w-full rounded-xl bg-black" className="h-full w-full object-contain" />}
              {preview.kind === "video" && <video src={preview.src} controls className="h-full w-full rounded-xl bg-black object-contain" />}
              {preview.kind === "pdf" && <iframe src={preview.src} title={preview.title} className="h-full w-full rounded-xl bg-white" />}
            </div>
            <div className="flex items-center justify-end border-t border-white/10 px-4 py-3"><a href={preview.src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/10">Open in new tab<ArrowUpRight className="h-3.5 w-3.5" /></a></div>
          </div>
        </div>
      )}
    </>
  );
}
