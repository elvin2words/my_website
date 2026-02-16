export type EngineeringAssetKind = "pdf" | "image" | "video" | "link";

export type EngineeringCaseStudyStage = "featured" | "active" | "prototype";
export type EngineeringVisualType = "sld" | "before-after" | "profile";

export interface EngineeringStat {
  label: string;
  value: string;
  hint?: string;
}

export interface EngineeringSldNode {
  id: string;
  label: string;
  level: string;
  x: number;
  y: number;
  detail?: string;
}

export interface EngineeringSldEdge {
  from: string;
  to: string;
  label?: string;
}

export interface EngineeringBeforeAfterMetric {
  label: string;
  before: number;
  after: number;
  unit: string;
  direction?: "higher" | "lower";
  note?: string;
}

export interface EngineeringProfileMetric {
  label: string;
  value: number;
  max: number;
  note?: string;
}

export interface EngineeringVisual {
  id: string;
  title: string;
  type: EngineeringVisualType;
  subtitle?: string;
  note?: string;
  sld?: {
    nodes: EngineeringSldNode[];
    edges: EngineeringSldEdge[];
  };
  beforeAfter?: EngineeringBeforeAfterMetric[];
  profile?: EngineeringProfileMetric[];
}

export interface EngineeringDeepDiveBlock {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface EngineeringLearningTrack {
  title: string;
  summary: string;
  modules: string[];
  audience: string;
  outcome: string;
}

export interface EngineeringSection {
  id: string;
  title: string;
  subtitle?: string;
  body?: string;
  bullets?: string[];
  stats?: EngineeringStat[];
  expandedInsights?: string[];
  visualIds?: string[];
}

export interface EngineeringAsset {
  id: string;
  title: string;
  kind: EngineeringAssetKind;
  href: string;
  note?: string;
}

export interface EngineeringMedia {
  id: string;
  title: string;
  kind: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  poster?: string;
}

export interface EngineeringCaseStudy {
  id: string;
  title: string;
  navigationTitle: string;
  subtitle: string;
  stage: EngineeringCaseStudyStage;
  published: string;
  readTimeMins: number;
  domainTags: string[];
  tools: string[];
  hero: {
    headline: string;
    subhead: string;
    badges: string[];
  };
  quickFacts: EngineeringStat[];
  sections: EngineeringSection[];
  visuals: EngineeringVisual[];
  deepDive: EngineeringDeepDiveBlock[];
  learningTrack?: EngineeringLearningTrack;
  disclaimer?: string;
  assets: EngineeringAsset[];
  media: EngineeringMedia[];
}

export const engineeringCaseStudies: EngineeringCaseStudy[] = [
  {
    id: "industrial-power-system-validation",
    title: "Industrial Power System Simulation and Validation",
    navigationTitle: "Industrial Power Validation",
    subtitle:
      "An ETAP-based multi-voltage network study covering load-flow diagnostics, mitigation design, and short-circuit verification for equipment and protection readiness.",
    stage: "featured",
    published: "2026-01",
    readTimeMins: 8,
    domainTags: [
      "Power Systems",
      "Industrial Distribution",
      "Load Flow",
      "Short Circuit",
      "Protection Validation",
    ],
    tools: ["ETAP", "AutoCAD", "Simulation Analysis", "Engineering Reporting"],
    hero: {
      headline: "Diagnostics to mitigation, then compliance-ready validation",
      subhead:
        "The study was structured to move from baseline issues into corrective interventions, then into fault-level checks to confirm breaker duties and protection behavior.",
      badges: ["132kV to LV hierarchy", "Baseline vs optimized", "Max + Min fault scenarios"],
    },
    quickFacts: [
      { label: "Supply Design", value: "Dual utility in-feeds" },
      { label: "Voltage Levels", value: "132 kV / 13.8 kV / 4.16 kV / 0.48 kV" },
      { label: "Validation Focus", value: "Thermal + voltage + fault duties" },
      { label: "Study Outcome", value: "Improved operating margins" },
    ],
    sections: [
      {
        id: "system-context",
        title: "System Context",
        subtitle: "Architecture and reliability intent",
        bullets: [
          "Built around two independent 132 kV grid sources with dual incoming lines and redundant step-down transformers.",
          "Structured across 132 kV, 13.8 kV, 4.16 kV, and 0.48 kV voltage levels for industrial realism.",
          "Targeted N-1 continuity so operations remain serviceable during planned or unplanned outages.",
        ],
        expandedInsights: [
          "The architecture mirrors medium-to-large industrial sites that need continuity during maintenance windows.",
          "By preserving dual-source topology in simulation, loading behavior under contingency was evaluated with stronger confidence.",
        ],
        visualIds: ["industrial-sld"],
      },
      {
        id: "baseline-findings",
        title: "Baseline Findings",
        subtitle: "Where risks surfaced before intervention",
        bullets: [
          "Detected undervoltage at key buses: 4.16 kV around 96.8% and 0.48 kV around 96.5%.",
          "Found low-voltage feeder overload risk driven by impedance and conductor constraints.",
          "Confirmed elevated losses and reduced thermal margin under the baseline setup.",
        ],
        stats: [
          { label: "4.16 kV baseline", value: "96.8%" },
          { label: "0.48 kV baseline", value: "96.5%" },
          { label: "LV feeder loading", value: "Critical on selected paths" },
        ],
        expandedInsights: [
          "These conditions were inside a warning envelope where cumulative losses and thermal stress would increase operating risk.",
          "Baseline instability validated the need for pre-implementation design correction rather than field trial-and-error.",
        ],
        visualIds: ["industrial-before-after"],
      },
      {
        id: "mitigation-approach",
        title: "Mitigation Approach",
        subtitle: "Applied corrections in model before field recommendation",
        bullets: [
          "Applied transformer tap correction (-2.5%) to recover downstream voltage profile.",
          "Increased conductors per phase and reduced feeder impedance in overloaded corridors.",
          "Re-ran load-flow with revised parameters to confirm systemic impact.",
        ],
        expandedInsights: [
          "Mitigation was sequenced so each intervention could be isolated and validated before combining changes.",
          "The model captured redistribution effects to avoid moving stress from one branch to another.",
        ],
        visualIds: ["industrial-before-after"],
      },
      {
        id: "fault-validation",
        title: "Fault Validation",
        subtitle: "Maximum and minimum short-circuit checks",
        bullets: [
          "Maximum fault checks confirmed breaker and switchgear duties stayed inside interrupting limits.",
          "Minimum fault checks validated relay pickup and sensitivity across MV and LV levels.",
          "Representative currents: ~11.5 kA at 4.16 kV and ~30 kA at 0.48 kV in maximum scenario.",
        ],
        expandedInsights: [
          "Minimum fault levels remained above practical pickup thresholds, reducing the chance of undetected low-current faults.",
          "Combined max/min studies closed both equipment-duty and protection-coordination risk loops.",
        ],
        visualIds: ["industrial-capability-profile"],
      },
      {
        id: "delivery",
        title: "Delivery Package",
        subtitle: "Client-ready outputs for engineering and review",
        body:
          "The final package combined ETAP outcomes, one-line visual artifacts, engineering assumptions, and structured reporting for implementation planning.",
        expandedInsights: [
          "Documentation was prepared so technical and non-technical stakeholders could review the same evidence trail.",
          "The resulting package supports design review, onboarding, and educational interpretation.",
        ],
      },
    ],
    visuals: [
      {
        id: "industrial-sld",
        title: "System Single-Line Sketch",
        type: "sld",
        subtitle: "Interactive architecture trace from utility to low-voltage loads",
        note: "Click nodes to inspect each stage in the distribution chain.",
        sld: {
          nodes: [
            { id: "grid-a", label: "Grid A", level: "132 kV", x: 12, y: 18, detail: "Independent utility source with defined short-circuit capacity." },
            { id: "grid-b", label: "Grid B", level: "132 kV", x: 12, y: 78, detail: "Redundant source for continuity and N-1 resilience." },
            { id: "hv-bus", label: "HV Bus", level: "132 kV", x: 34, y: 48, detail: "High-voltage collection point for dual in-feeds." },
            { id: "tx-1", label: "T1", level: "132/13.8 kV", x: 52, y: 32, detail: "Primary step-down transformer with tap capability." },
            { id: "tx-2", label: "T2", level: "132/13.8 kV", x: 52, y: 64, detail: "Redundant step-down path and load-sharing point." },
            { id: "mv-bus", label: "MV Bus", level: "13.8 kV", x: 68, y: 48, detail: "Primary distribution level feeding plant sections." },
            { id: "imv-bus", label: "IMV", level: "4.16 kV", x: 83, y: 35, detail: "Intermediate distribution for heavy process loads." },
            { id: "lv-bus", label: "LV", level: "0.48 kV", x: 83, y: 67, detail: "Final stage supplying motors and local loads." },
          ],
          edges: [
            { from: "grid-a", to: "hv-bus", label: "Line A" },
            { from: "grid-b", to: "hv-bus", label: "Line B" },
            { from: "hv-bus", to: "tx-1" },
            { from: "hv-bus", to: "tx-2" },
            { from: "tx-1", to: "mv-bus" },
            { from: "tx-2", to: "mv-bus" },
            { from: "mv-bus", to: "imv-bus" },
            { from: "mv-bus", to: "lv-bus" },
          ],
        },
      },
      {
        id: "industrial-before-after",
        title: "Before vs After Mitigation",
        type: "before-after",
        subtitle: "Load-flow metrics after tap and feeder corrections",
        beforeAfter: [
          {
            label: "4.16 kV bus profile",
            before: 96.8,
            after: 99.4,
            unit: "%",
            direction: "higher",
            note: "Recovered into preferred operating window.",
          },
          {
            label: "0.48 kV bus profile",
            before: 96.5,
            after: 100.2,
            unit: "%",
            direction: "higher",
            note: "Restored margin at low-voltage level.",
          },
          {
            label: "LV feeder loading",
            before: 109,
            after: 82,
            unit: "%",
            direction: "lower",
            note: "Thermal stress reduced below overload region.",
          },
          {
            label: "Voltage drop on critical feeders",
            before: 4.1,
            after: 1.8,
            unit: "%",
            direction: "lower",
            note: "Improved delivery quality and asset comfort.",
          },
        ],
      },
      {
        id: "industrial-capability-profile",
        title: "Project Capability Profile",
        type: "profile",
        subtitle: "Performance and engineering confidence indicators",
        profile: [
          { label: "Voltage Regulation Readiness", value: 90, max: 100, note: "Strong post-mitigation margin." },
          { label: "Thermal Compliance Confidence", value: 88, max: 100, note: "Cable and feeder stress reduced." },
          { label: "Fault Duty Validation", value: 93, max: 100, note: "Breaker duty checks completed." },
          { label: "Protection Sensitivity Assurance", value: 87, max: 100, note: "Minimum fault levels support relay pickup." },
          { label: "Reporting and Reuse Quality", value: 92, max: 100, note: "Suitable for both review and training." },
        ],
      },
    ],
    deepDive: [
      {
        id: "deep-system-overview",
        title: "System Overview and Architecture",
        paragraphs: [
          "The network was modeled as a representative multi-voltage industrial electrical system with deliberate redundancy in supply paths.",
          "Two 132 kV utility in-feeds and dual step-down transformer paths were used to reflect reliability-driven industrial design.",
        ],
        bullets: [
          "Transmission interface: 132 kV",
          "Primary plant distribution: 13.8 kV",
          "Intermediate distribution: 4.16 kV",
          "Final local loads: 0.48 kV",
        ],
      },
      {
        id: "deep-modelling-framework",
        title: "Modeling and Study Framework",
        paragraphs: [
          "The simulation used balanced three-phase assumptions, steady-state load modeling, and Newton-Raphson power flow convergence.",
          "Transformers, cables, and utility sources were parameterized using structured impedance and configuration data.",
        ],
        bullets: [
          "Utility short-circuit capacity and X/R ratio included",
          "Transformer Dyn configuration and tap behavior represented",
          "Cable resistance/reactance treated with practical assumptions",
        ],
      },
      {
        id: "deep-results-validation",
        title: "Results, Mitigation, and Fault Validation",
        paragraphs: [
          "Baseline analysis exposed undervoltage and feeder loading concerns, then mitigation was implemented through tap correction and conductor strategy updates.",
          "Maximum and minimum short-circuit studies confirmed equipment duty compliance and protection sensitivity sufficiency.",
        ],
      },
      {
        id: "deep-boundaries",
        title: "Professional Boundary",
        paragraphs: [
          "This is a simulation-led technical study used to demonstrate modeling, diagnostics, and validation capability.",
          "It supports engineering decisions but does not replace licensed design approval for live installations.",
        ],
      },
    ],
    learningTrack: {
      title: "Student Learning Track: Industrial Power Study",
      summary:
        "A curated path that teaches how to move from single-line context to validated recommendations using reproducible engineering logic.",
      modules: [
        "Interpreting layered voltage architectures",
        "Running and reading load-flow diagnostics",
        "Designing mitigation and validating impact",
        "Checking maximum and minimum short-circuit duty",
        "Packaging findings into professional technical reports",
      ],
      audience: "Final-year students and junior engineers building applied power-system confidence.",
      outcome: "Ability to produce an end-to-end simulation summary with defensible engineering decisions.",
    },
    disclaimer:
      "Simulation-only educational and portfolio material. Licensed engineering review remains mandatory for real-world installations.",
    assets: [
      {
        id: "industrial-design-report",
        title: "Microgrid Design Report (PDF)",
        kind: "pdf",
        href: "/project-assets/engineering/microgrid-design-report.pdf",
        note: "Primary narrative report with engineering assumptions and outcomes.",
      },
      {
        id: "industrial-etap-summary",
        title: "ETAP Load-flow Summary",
        kind: "image",
        href: "/project-assets/engineering/etap-loadflow-summary.png",
        note: "Visual snapshot of load-flow findings.",
      },
      {
        id: "industrial-layout",
        title: "AutoCAD Layout Snapshot",
        kind: "image",
        href: "/project-assets/engineering/microgrid-autocad-layout.png",
        note: "Layout reference used for engineering communication.",
      },
    ],
    media: [
      {
        id: "media-industrial-etap",
        title: "ETAP Summary",
        kind: "image",
        src: "/project-assets/engineering/etap-loadflow-summary.png",
        alt: "ETAP load-flow summary view",
        caption: "Load-flow and operating-state summary output.",
      },
      {
        id: "media-industrial-cad",
        title: "AutoCAD Layout",
        kind: "image",
        src: "/project-assets/engineering/microgrid-autocad-layout.png",
        alt: "AutoCAD electrical layout",
        caption: "Distribution and layout communication sheet.",
      },
    ],
  },
  {
    id: "portable-microgrid-power-hive",
    title: "Portable Microgrid Power Hive and BESS Integration",
    navigationTitle: "Portable Microgrid Hive",
    subtitle:
      "A compact off-grid/backup architecture combining solar, storage, and intelligent control logic for resilient deployment scenarios.",
    stage: "active",
    published: "2025-11",
    readTimeMins: 6,
    domainTags: [
      "Microgrids",
      "Energy Storage",
      "Embedded Control",
      "Renewable Integration",
      "Field Deployment",
    ],
    tools: ["MATLAB/Simulink", "ETAP", "AutoCAD", "BMS Design", "System Integration"],
    hero: {
      headline: "Portable resilience through clean power architecture",
      subhead:
        "Designed for practical use cases where grid dependence is constrained, while preserving engineering rigor in control, safety, and maintainability.",
      badges: ["Portable architecture", "Solar + storage + AC output", "Control-driven reliability"],
    },
    quickFacts: [
      { label: "Application", value: "Portable off-grid and backup use" },
      { label: "Core Components", value: "PV, BESS, hybrid control" },
      { label: "Engineering Lens", value: "Reliability and maintainability" },
      { label: "Current State", value: "Active evolution and refinement" },
    ],
    sections: [
      {
        id: "problem-space",
        title: "Problem Space",
        subtitle: "Why this system needed to exist",
        bullets: [
          "Conventional backup setups are often rigid, expensive, or hard to maintain.",
          "Portable and modular energy systems are needed for diverse deployment realities.",
          "Design had to prioritize both performance and field practicality.",
        ],
        expandedInsights: [
          "The objective was to avoid single-purpose systems that become unusable outside one deployment scenario.",
          "Portability and maintainability were treated as core requirements, not optional additions.",
        ],
      },
      {
        id: "architecture",
        title: "Architecture and Controls",
        subtitle: "How the energy stack was structured",
        bullets: [
          "Mapped generation, storage, and output conversion around deployment simplicity.",
          "Integrated BESS behavior with charge/discharge strategy awareness.",
          "Preserved flexibility for future telemetry and automation improvements.",
        ],
        visualIds: ["hive-sld"],
      },
      {
        id: "validation",
        title: "Simulation and Validation Flow",
        subtitle: "Evidence before wider rollout",
        bullets: [
          "Used simulation snapshots to evaluate key operational states.",
          "Assessed practical loading and voltage behavior for representative scenarios.",
          "Compiled structured outputs for design review and stakeholder communication.",
        ],
        visualIds: ["hive-before-after", "hive-profile"],
      },
      {
        id: "next-steps",
        title: "Next Steps",
        subtitle: "Scale path and engineering priorities",
        bullets: [
          "Expand hardware-level test cases and telemetry detail.",
          "Finalize modular deployment variants for different operating environments.",
          "Integrate richer health monitoring for long-cycle reliability insight.",
        ],
        expandedInsights: [
          "Future versions can support tailored kits for student labs, field teams, and deployment pilots.",
          "Telemetry-driven diagnostics is the next milestone for reliability and predictive maintenance.",
        ],
      },
    ],
    visuals: [
      {
        id: "hive-sld",
        title: "Portable Microgrid Flow",
        type: "sld",
        subtitle: "Generation, storage, conversion, and load path",
        sld: {
          nodes: [
            { id: "pv", label: "PV Array", level: "DC Source", x: 12, y: 26, detail: "Solar generation input." },
            { id: "bess", label: "BESS", level: "Storage", x: 12, y: 70, detail: "Battery bank with BMS controls." },
            { id: "dc-bus", label: "DC Bus", level: "Core Bus", x: 34, y: 48, detail: "Energy aggregation point." },
            { id: "hybrid", label: "Hybrid Ctrl", level: "Control", x: 53, y: 48, detail: "Charge/discharge and dispatch logic." },
            { id: "inv", label: "Inverter", level: "DC/AC", x: 70, y: 48, detail: "Power conversion to AC output." },
            { id: "loads", label: "Loads", level: "AC Output", x: 86, y: 36, detail: "Primary connected loads." },
            { id: "aux", label: "Aux/Backup", level: "Optional", x: 86, y: 68, detail: "Secondary or backup branch." },
          ],
          edges: [
            { from: "pv", to: "dc-bus" },
            { from: "bess", to: "dc-bus" },
            { from: "dc-bus", to: "hybrid" },
            { from: "hybrid", to: "inv" },
            { from: "inv", to: "loads" },
            { from: "inv", to: "aux" },
          ],
        },
      },
      {
        id: "hive-before-after",
        title: "Refinement Snapshot",
        type: "before-after",
        subtitle: "Comparison between early and refined architecture behavior",
        beforeAfter: [
          {
            label: "Voltage consistency",
            before: 92,
            after: 97,
            unit: "%",
            direction: "higher",
            note: "Reduced variation under load transitions.",
          },
          {
            label: "Conversion losses",
            before: 11.2,
            after: 7.4,
            unit: "%",
            direction: "lower",
            note: "Improved dispatch and conversion path efficiency.",
          },
          {
            label: "Usable backup window",
            before: 2.8,
            after: 4.1,
            unit: "hrs",
            direction: "higher",
            note: "Extended support under representative duty cycle.",
          },
        ],
      },
      {
        id: "hive-profile",
        title: "Design Profile",
        type: "profile",
        subtitle: "Portability, reliability, and readiness indicators",
        profile: [
          { label: "Portability Index", value: 85, max: 100, note: "Compact and modular packaging." },
          { label: "Control Robustness", value: 82, max: 100, note: "Hybrid logic supports stable transitions." },
          { label: "Maintainability", value: 88, max: 100, note: "Clear subsystem boundaries for servicing." },
          { label: "Education Potential", value: 91, max: 100, note: "Strong candidate for practical training kits." },
        ],
      },
    ],
    deepDive: [
      {
        id: "hive-deep-architecture",
        title: "Architecture Intent",
        paragraphs: [
          "The system blends portable energy generation and storage with practical control behavior for real deployment constraints.",
          "It was designed to remain understandable for operators while preserving extensibility for telemetry and automation.",
        ],
      },
      {
        id: "hive-deep-validation",
        title: "Validation Strategy",
        paragraphs: [
          "Simulation checkpoints were used to compare transitional behavior, voltage response, and practical load support windows.",
          "The outputs were prepared for both technical evaluation and communication with non-specialist stakeholders.",
        ],
      },
    ],
    learningTrack: {
      title: "Student Track: Portable Energy Systems",
      summary: "A practical path for learning microgrid architecture, control logic, and deployment-oriented design choices.",
      modules: [
        "Portable power architecture principles",
        "Storage integration and operating envelopes",
        "Control strategy and transition stability",
        "How to document validation findings",
      ],
      audience: "Students in electrical, mechatronic, and renewable energy pathways.",
      outcome: "Ability to propose and evaluate a portable microgrid concept with measurable design criteria.",
    },
    disclaimer:
      "Concept and simulation portfolio content for capability demonstration and educational packaging.",
    assets: [
      {
        id: "microgrid-simulink-overview",
        title: "Simulink Overview Snapshot",
        kind: "image",
        href: "/project-assets/engineering/microgrid-simulink-overview.png",
        note: "High-level simulation artifact for system flow understanding.",
      },
      {
        id: "microgrid-report",
        title: "Engineering Report (PDF)",
        kind: "pdf",
        href: "/project-assets/engineering/microgrid-design-report.pdf",
        note: "Consolidated design/report reference.",
      },
      {
        id: "microgrid-reference",
        title: "Engineering Profile Context",
        kind: "link",
        href: "/engineer",
        note: "Broader engineering context and role detail.",
      },
    ],
    media: [
      {
        id: "media-microgrid-sim",
        title: "Simulink Overview",
        kind: "image",
        src: "/project-assets/engineering/microgrid-simulink-overview.png",
        alt: "Microgrid Simulink overview",
        caption: "Simulation overview used in design communication.",
      },
      {
        id: "media-microgrid-layout",
        title: "AutoCAD Layout",
        kind: "image",
        src: "/project-assets/engineering/microgrid-autocad-layout.png",
        alt: "Microgrid AutoCAD layout",
        caption: "Layout used to align electrical and deployment assumptions.",
      },
    ],
  },
];
