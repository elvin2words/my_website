export type AiReferenceType = "page" | "project" | "writing" | "gallery" | "design" | "external";

export interface AiReference {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  sourceType: AiReferenceType;
  score: number;
}

export interface AiAction {
  label: string;
  link: string;
}

export interface AiSearchResponse {
  query: string;
  summary: string;
  results: AiReference[];
  provider: "eddy" | "local";
  generatedAt: string;
}

export interface AiChatResponse {
  reply: string;
  references: AiReference[];
  actions: AiAction[];
  provider: "eddy" | "local";
  generatedAt: string;
}

export interface AiChatHistoryItem {
  role: "user" | "assistant";
  content: string;
}
