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
  
      {/* <Header /> */}

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
