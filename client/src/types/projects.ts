import type { Project } from "../../../shared/schema";

export type ProjectStatus = Exclude<Project["status"], undefined>;

export interface CodeCircleProjectsResponse {
  source: "manual" | "github" | "hybrid";
  visibility: "public" | "all";
  username: string;
  includeForks: boolean;
  topicFilter: string | null;
  syncedAt: string;
  categories: string[];
  projects: Project[];
  githubError: string | null;
  notes: string[];
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  beta: "Beta",
  shipped: "Shipped",
  "r-and-d": "R&D",
  "in-prototype": "In Prototype",
};

export const PROJECT_STATUS_CLASSNAMES: Record<ProjectStatus, string> = {
  beta: "bg-amber-500/20 text-amber-200 border border-amber-300/30",
  shipped: "bg-emerald-500/20 text-emerald-200 border border-emerald-300/30",
  "r-and-d": "bg-indigo-500/20 text-indigo-200 border border-indigo-300/30",
  "in-prototype": "bg-cyan-500/20 text-cyan-200 border border-cyan-300/30",
};
