// src/data/developer.ts
// This file contains data related to the Developer role, including skills, projects, and development philosophy.

export const coreIdentity1 = 
  "I build software systems the way I approach core engineering - as a living system designed to evolve, communicate, and solve real problems.";

export const coreIdentity2 = 
  "From embedded devices to enterprise-scale digital platforms, my work explores how intelligence, design, and infrastructure converge into seamless, human-centered systems.";

export const stack = [
  "Languages: TypeScript, JS, Python, C/C++, SQL",
  "Frameworks & Tools: React, RN, Node.js, Tailwind CSS, Express, Flask, Django",
  "Embedded & Control: STM32, Vivado HDL, firmware design, serial comms",
  "UI/UX Design: Figma to code workflows, responsive design, motion UI",
  "Databases: mySQL, PostgreSQL, MongoDB, Supabase",
];

export const backend = [
  "AI/ML: Custom models, OpenAI API, LangChain",
  "Systems Integration: Control logic bridging physical systems and UI",
  "APIs & Protocols: REST APIs, payment gateways, OAuth, WebSockets, MQTT",
  "DevOps & CI/CD: Git, Docker, GitHub Actions, automated testing",
  "Data: IoT pipelines, real-time telemetry, fault diagnostics, and data visualization",
];

export const projects = [
  {
    title: "Utility Field Deployment & Fault Management System",
    description:
      "A cross-platform field operations platform for utility networks integrating real-time faults, jobs, outage coordination, and analytics, streamlined workflows across distributed field operations teams.",
    tech: ["ReactNative", "Node.js", "PostgreSQL", "Python", "Expo", "WebSockets"],
    architecture: ["REST APIs", "Real-time Streams", "Microservices", "GridOperations Integration"],
  },
  {
    title: "C.A.S.S.I.E - Candidate Assesment & Selection System with Intelligence Evaluation",
    description:
      "A Human-Centered, AI-Augmented Hiring Intelligence Platform designed to revolutionize talent acquisition by merging advanced AI technologies with inclusive, recruiter-friendly design. It manages the entire lifecycle of recruitment: from multi-channel application intake, intelligent resume parsing, semantic matching, to interview assistance and post-hire analysis.",
    tech: ["React", "TypeScript", "PostgreSQL", "Socket.io", "Gemini API", "Flask"],
    architecture: ["REST + Event-Driven State", "Role-based Microservices"],
  },
  {
    title: "EDDY AI (Lab Rats Inspired)",
    description:
      "Interactive generative AI assistant powered by emotion-aware expressions and dialogue, bridges different appications for specialised use-cases.",
    tech: ["React", "GSAP", "SVG", "WebSocket", "Express"],
    architecture: ["SPA", "SVG Motion Layer", "Chat socket layer"],
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
      "Vision inspection software with GUI + control logic for mechanical rejector systems; YOLOv5 + sorting animations + Pi integration.",
    tech: ["Python", "OpenCV", "React", "Raspberry Pi", "C++"],
    architecture: ["Local Event System", "Hardware-Synced MVC"],
  },
  {
    title: "Transit Optimization System",
    description:
      "Developed a smart public transportation platform using Python, Node.js, and React with machine-learning-driven dispatch and routing optimization.",
    tech: ["Python", "Node.js", "React", "PostgreSQL", "Scikit-learn"],
    architecture: ["Microservices", "ML Integration", "REST APIs"],
  },
  {
    title: "Portfolio Web Platforms & Interactive Experiences",
    description:
      "Digital infrastructure for different ventures (UI/UX + backend architecture) and companies requiring digital presence and/or distributed asset monitoring; \
      Adaptive Monitoring Dashboards; Embedded Device - Cloud DB Data Pipelines; Aggregation, Control and Visualisation Systems; \
      Focusing on interoperability and low-latency event handling.",
    tech: ["React", "Html", "JS", "CSS", "Node.js", "TypeScript", "Tailwind CSS", "Figma", "Web3", "MQTT"],
    architecture: ["Web Dev", "REST APIs"],
  },
];

export const philosophy = `
    Software should do more than function - it should extend human capability. \
    Every system begins with a question: What interaction are we trying to improve - between people, data, or devices? \
    Each service, device, and data flow should communicate meaningfully, creating systems that adapt intelligently and feel natural to use.
`;
