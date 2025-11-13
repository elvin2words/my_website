import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility to get card position and dimensions for drawing SVG connections
export function getCardPosition(
  element: HTMLElement | null,
  svgContainer: HTMLElement | null
): { x: number; y: number; width: number; height: number } | null {
  if (!element || !svgContainer) return null;

  const rect = element.getBoundingClientRect();
  const containerRect = svgContainer.getBoundingClientRect();

  return {
    x: rect.left - containerRect.left + rect.width / 2,
    y: rect.top - containerRect.top,
    width: rect.width,
    height: rect.height,
  };
}

// Generate path between two points for SVG connections
export function generatePath(
  startX: number,
  startY: number,
  endX: number,
  endY: number
): string {
  // Calculate control points for the curve
  const controlX1 = startX;
  const controlY1 = startY + (endY - startY) / 3;
  const controlX2 = endX;
  const controlY2 = startY + (2 * (endY - startY)) / 3;

  return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
}

// Generate identity colors
export const identityColors: Record<string, { color: string; bgColor: string }> = {
  engineer: {
    color: 'text-accent1',
    bgColor: 'bg-accent1',
  },
  developer: {
    color: 'text-accent2',
    bgColor: 'bg-accent2',
  },
  designer: {
    color: 'text-accent3',
    bgColor: 'bg-accent3',
  },
  technopreneur: {
    color: 'text-accent4',
    bgColor: 'bg-accent4',
  },
  human: {
    color: 'text-accent5',
    bgColor: 'bg-accent5',
  },
};

// Identity icons mapping
export const identityIcons: Record<string, string> = {
  engineer: 'zap',
  developer: 'code',
  designer: 'pen-tool',
  technopreneur: 'trending-up',
  human: 'heart',
};

// Identity descriptions
export const identityDescriptions: Record<string, { title: string, role: string, description: string }> = {
  engineer: {
    title: "Electrical Engineer",
    role: "As An",
    description: "Technical & Academic",
  },
  developer: {
    title: "Systems Developer",
    role: "As A",
    description: "Software & Systems",
  },
  designer: {
    title: "Creative Technologist",
    role: "As A",
    description: "Engineering X Imagination",
  },
  technopreneur: {
    title: "Budding Technopren",
    role: "As A",
    description: "Venture Building",
  },
  human: {
    title: "Elvin - Beyond All Else",
    role: "As Just",
    description: "The Reflective Soul",
  },
};
