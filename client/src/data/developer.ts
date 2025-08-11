// src/data/developer.ts

export const skills = [
  "Frontend Development: React, TypeScript, GSAP, Framer Motion",
  "UI/UX Systems: Next.js, Tailwind CSS, Chakra UI, HTML5, SVG, Bootstrap",
  "Design to Code Pipelines: Figma → React",
  "Backend Development: Django, Flask, FastAPI, Node.js, Express",
  "AI/ML Integrations: Custom Python-based models",
  "Systems Integration: Control logic bridging physical systems and UI",
  "APIs & Protocols: REST APIs, WebSockets, MQTT pipelines",
];

export const projects = [
  {
    title: "UFMS (Utility Grid Fault Management System)",
    description:
      "Full-stack outage monitoring platform with live grid fault detection, automated technician dispatch, GIS-integrated mobile apps, and analytics backend.",
    tech: ["React", "Node.js", "PostgreSQL", "Python", "Leaflet", "WebSockets"],
    architecture: ["REST APIs", "Real-time Streams", "Microservices", "MVC"],
  },
  {
    title: "M.A.A.S / M.A.A.P Platforms",
    description:
      "Early-stage modular collaboration platforms for dynamic matchmaking, task pipelines, and creative community discovery.",
    tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"],
    architecture: ["REST + Event-Driven State", "Role-based Microservices"],
  },
  {
    title: "Horizon: Travel UX for Africa",
    description:
      "Web-first experience design for cultural exploration across Africa, with smart filtering, animations, and emotion-led UI.",
    tech: ["React", "GSAP", "Node.js", "Supabase"],
    architecture: ["SPA-first", "SSR considered for SEO expansion"],
  },
  {
    title: "FPGA AOI Vision System",
    description:
      "Vision + inspection software with GUI + control logic for mechanical rejector systems; YOLOv5 + sorting animations + Pi integration.",
    tech: ["Python", "OpenCV", "React", "Raspberry Pi", "C++"],
    architecture: ["Local Event System", "Hardware-Synced MVC"],
  },
  {
    title: "EDDY (Lab Rats Inspired)",
    description:
      "Interactive web-native assistant powered by emotion-aware expressions and dialogue, bridging frontend motion and contextual UX.",
    tech: ["React", "GSAP", "SVG", "WebSocket", "Express"],
    architecture: ["SPA", "SVG Motion Layer", "Chat socket layer"],
  },
];

export const philosophy = `
    My development mindset blends systems thinking with creative software architecture, bridging control theory with modern web-native tools.
    I’m focused on building software ecosystems with essence of intelligence, modularity, resilience, expression, and purpose.
    All grounded in: performance, clarity, and thoughtful interaction.
`;
