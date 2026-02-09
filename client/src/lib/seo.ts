export const SITE_URL = "https://www.elvinmazwi.me";
export const SITE_NAME = "Elvin Mazwimairi Portfolio";
export const DEFAULT_OG_IMAGE = "/preview.png";

const DEFAULT_KEYWORDS =
  "Elvin Mazwimairi, Electrical Engineer, Full Stack Developer, Systems Engineer, Embedded Systems, Renewable Energy, Portfolio";

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  keywords: string;
  type: "website" | "article";
  image: string;
  noindex?: boolean;
}

const EXACT_ALIASES: Record<string, string> = {
  "/engineer/portfolio": "/engineer",
  "/engineer/journey": "/engineer",
  "/designcircle": "/creative/portfolio",
  "/gallery": "/creative/gallery",
  "/blog": "/creative/blog",
  "/creative/visual-designs": "/creative/journey",
  "/codecircle/journey": "/codecircle/portfolio",
};

const PAGE_SEO: Record<string, Omit<SeoConfig, "path">> = {
  "/": {
    title: "Elvin Mazwimairi | Engineer, Developer, Technologist",
    description:
      "Explore the portfolio of Elvin Mazwimairi across engineering, software systems, creative technology, and innovation projects.",
    keywords: `${DEFAULT_KEYWORDS}, Creative Technologist, Technopreneur`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/engineer": {
    title: "Electrical Engineer Portfolio | Elvin Mazwimairi",
    description:
      "Electrical engineering portfolio featuring power systems, embedded control, renewable integration, and technical project delivery.",
    keywords: `${DEFAULT_KEYWORDS}, Power Systems, Electrical Engineering, Grid Optimization, BMS`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/developer": {
    title: "Full Stack Developer Portfolio | Elvin Mazwimairi",
    description:
      "Software and systems development portfolio spanning full stack applications, embedded integrations, real-time platforms, and AI-assisted tools.",
    keywords: `${DEFAULT_KEYWORDS}, React, Node.js, TypeScript, Full Stack Development`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/creative": {
    title: "Creative Technologist | Elvin Mazwimairi",
    description:
      "Creative technologist profile focused on design-led systems, innovation workflows, and human-centered digital experiences.",
    keywords: `${DEFAULT_KEYWORDS}, Creative Technology, Design Systems, Innovation`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/creative/portfolio": {
    title: "DesignCircle Creatives | Elvin Mazwimairi",
    description:
      "Creative portfolio showcasing design work, visual experiments, and multidisciplinary creative assets.",
    keywords: `${DEFAULT_KEYWORDS}, Design Portfolio, Creative Assets, Graphic Design`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/creative/gallery": {
    title: "Photography Gallery | Elvin Mazwimairi",
    description:
      "Photography gallery featuring curated visual shots, collections, and storytelling visuals.",
    keywords: `${DEFAULT_KEYWORDS}, Photography, Gallery, Visual Storytelling`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/creative/blog": {
    title: "Blog and Writings | Elvin Mazwimairi",
    description:
      "Blog posts and writings on systems thinking, engineering, design, innovation, and creative practice.",
    keywords: `${DEFAULT_KEYWORDS}, Blog, Writings, Systems Thinking, Engineering Insights`,
    type: "article",
    image: DEFAULT_OG_IMAGE,
  },
  "/creative/journey": {
    title: "Visual Designs | Elvin Mazwimairi",
    description:
      "Visual design showcase for logos, flyers, banners, and other graphical design work presented as image collections.",
    keywords: `${DEFAULT_KEYWORDS}, Visual Design, Logos, Flyers, Banners, Graphic Design`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/projects": {
    title: "Projects Showcase | Elvin Mazwimairi",
    description:
      "Combined showcase of engineering and software projects with highlights, filters, and visuals.",
    keywords: `${DEFAULT_KEYWORDS}, Project Showcase, Engineering Projects, Software Projects`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/codecircle/portfolio": {
    title: "CodeCircle Portfolio | Elvin Mazwimairi",
    description:
      "CodeCircle portfolio featuring full stack products, platform architecture, dashboards, and software delivery projects.",
    keywords: `${DEFAULT_KEYWORDS}, CodeCircle, Web Development, Product Engineering`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/technopreneur": {
    title: "Technopreneur Profile | Elvin Mazwimairi",
    description:
      "Technopreneur profile covering venture building, innovation strategy, and systems-driven impact initiatives.",
    keywords: `${DEFAULT_KEYWORDS}, Technopreneur, Innovation Strategy, Venture Building`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/beyond": {
    title: "Elvin Beyond | Personal Dimension",
    description:
      "A personal dimension of interests, creativity, values, and reflections beyond technical execution.",
    keywords: `${DEFAULT_KEYWORDS}, Personal Portfolio, Creative Journey`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/hire": {
    title: "Services | Work With Elvin Mazwimairi",
    description:
      "Professional services across engineering systems, software development, and cross-domain technical execution.",
    keywords: `${DEFAULT_KEYWORDS}, Services, Consulting, Engineering Services, Development Services`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/resume": {
    title: "Resume | Elvin Mazwimairi",
    description:
      "Resume and career overview with competencies, professional path, and key project highlights.",
    keywords: `${DEFAULT_KEYWORDS}, Resume, CV, Career Portfolio`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/contact-profile-card": {
    title: "Digital Contact Card | Elvin Mazwimairi",
    description:
      "Connect directly with Elvin Mazwimairi through a digital contact card with phone, email, WhatsApp, and LinkedIn.",
    keywords: `${DEFAULT_KEYWORDS}, Contact Card, Digital Business Card`,
    type: "website",
    image: "/prof.jpg",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Elvin Mazwimairi",
    description: "Privacy policy for the Elvin Mazwimairi portfolio website.",
    keywords: `${DEFAULT_KEYWORDS}, Privacy Policy`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/terms-of-service": {
    title: "Terms of Service | Elvin Mazwimairi",
    description: "Terms of service for the Elvin Mazwimairi portfolio website.",
    keywords: `${DEFAULT_KEYWORDS}, Terms of Service`,
    type: "website",
    image: DEFAULT_OG_IMAGE,
  },
  "/admin": {
    title: "Admin | Elvin Mazwimairi Portfolio",
    description: "Administration interface.",
    keywords: DEFAULT_KEYWORDS,
    type: "website",
    image: DEFAULT_OG_IMAGE,
    noindex: true,
  },
};

function normalizePath(pathname: string) {
  const withoutQuery = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (!withoutQuery.startsWith("/")) return `/${withoutQuery}`;
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

function resolveAlias(pathname: string) {
  let current = pathname;
  let safety = 0;
  while (EXACT_ALIASES[current] && safety < 8) {
    current = EXACT_ALIASES[current];
    safety += 1;
  }
  return current;
}

export function getSeoConfig(pathname: string): SeoConfig {
  const normalized = normalizePath(pathname);

  if (normalized.startsWith("/codecircle/portfolio/project/")) {
    return {
      title: "Project Detail | CodeCircle | Elvin Mazwimairi",
      description:
        "Detailed view of a selected CodeCircle project including technologies, architecture, and delivery outcomes.",
      path: normalized,
      keywords: `${DEFAULT_KEYWORDS}, Project Detail, Case Study`,
      type: "article",
      image: DEFAULT_OG_IMAGE,
    };
  }

  const canonicalPath = resolveAlias(normalized);
  const configured = PAGE_SEO[canonicalPath];

  if (configured) {
    return {
      ...configured,
      path: canonicalPath,
    };
  }

  return {
    title: "Page Not Found | Elvin Mazwimairi",
    description: "The requested page does not exist on this portfolio site.",
    path: canonicalPath,
    keywords: DEFAULT_KEYWORDS,
    type: "website",
    image: DEFAULT_OG_IMAGE,
    noindex: true,
  };
}
