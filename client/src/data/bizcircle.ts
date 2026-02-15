export interface BizVenture {
  name: string;
  sector: string;
  stage: "Idea" | "Prototype" | "Pilot" | "Scaling";
  oneLiner: string;
  highlights: string[];
  website?: string;
}

export interface BizMilestone {
  period: string;
  title: string;
  description: string;
}

export const bizCircleVentures: BizVenture[] = [
  {
    name: "Mazenel Industries",
    sector: "Energy Systems + Industrial Automation",
    stage: "Scaling",
    oneLiner:
      "Building practical renewable-energy and automation systems for industry and underserved contexts.",
    highlights: [
      "Mobile power platforms (PowerHive concept)",
      "Embedded control + field automation prototypes",
      "System engineering delivery for operations teams",
    ],
    website: "https://www.mazenel.co.zw",
  },
  {
    name: "IQAL Inc.",
    sector: "AI Platforms + Smart Operations",
    stage: "Pilot",
    oneLiner:
      "Designing AI-driven products that automate workflows and improve technical decision making.",
    highlights: [
      "CASSIE adaptive automation platform",
      "Horizon intelligent travel-tech framework",
      "Utility fault/deployment workflow systems",
    ],
    website: "https://www.iqal.co.zw",
  },
  {
    name: "AmaSaiSai",
    sector: "Connectivity + Edge Intelligence",
    stage: "Prototype",
    oneLiner:
      "R&D for resilient communications and edge-ready intelligence in distributed systems.",
    highlights: [
      "IoT/IIoT connectivity experiments",
      "Network-aware AI infrastructure concepts",
      "Urban-rural deployment readiness models",
    ],
    website: "https://www.telqon.co.zw",
  },
  {
    name: "Usorvax",
    sector: "Experience Technology + Cultural Travel",
    stage: "Pilot",
    oneLiner:
      "A speculative-tech venture crafting story-driven, experience-first travel products.",
    highlights: [
      "Travel planning with contextual intelligence",
      "Cultural storytelling as product layer",
      "Platform-first tourism service architecture",
    ],
    website: "https://www.usorvax.com",
  },
];

export const bizMilestones: BizMilestone[] = [
  {
    period: "Foundation",
    title: "Cross-domain systems grounding",
    description:
      "Merged engineering, software, and venture design into one operating approach for product building.",
  },
  {
    period: "Build",
    title: "Prototype pipeline execution",
    description:
      "Shipped multiple early-stage systems across energy, AI, automation, and operations tooling.",
  },
  {
    period: "Scale",
    title: "Portfolio orchestration",
    description:
      "Structured startup ideas into a cohesive portfolio with shared technical primitives and clearer GTM paths.",
  },
  {
    period: "Next",
    title: "Institutional readiness",
    description:
      "Preparing ventures for partnerships, market expansion, and repeatable operational deployment.",
  },
];

export const bizOperatingPrinciples = [
  "Build in public, validate in context, then scale with evidence.",
  "Design systems that remain useful outside ideal lab conditions.",
  "Use AI and automation to augment teams, not replace judgment.",
  "Prioritize sustainable economics and long-term maintainability.",
];
