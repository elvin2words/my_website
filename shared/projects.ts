import type { Project } from "./schema";

export type ProjectStatus = NonNullable<Project["status"]>;

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  beta: "Beta",
  shipped: "Shipped",
  "r-and-d": "R&D",
  "in-prototype": "In Prototype",
};

export const CODECIRCLE_CATEGORIES = ["all", "corporate", "ecommerce", "dashboard", "portfolio"];

export const projects: Project[] = [
  {
    id: "1",
    title: "UtilityOps",
    description:
      "A versatile corporate website template featuring 9 customisable colour themes, responsive layout, and integrated portfolio and contact sections.",
    fullDescription:
      "UtilityOps is a fully responsive corporate website template built with HTML5, CSS3, Bootstrap, and jQuery. It ships with 9 distinct colour themes, each meeting accessibility contrast standards, switchable at runtime without a page reload. The template includes a portfolio showcase section, smooth UI transitions, and a contact form — making it a ready-to-deploy foundation for business and agency sites.",
    image: "/projects/utilityops.png",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["HTML5", "CSS3", "Bootstrap", "jQuery"],
    category: "corporate",
    badges: ["Featured", "Theme System"],
    status: "shipped",
    source: "manual",
    features: [
      "9 customizable color themes",
      "Fully responsive layout",
      "Portfolio showcase section",
      "Contact form integration",
      "Smooth UI transitions",
    ],
    challenges:
      "The main challenge was implementing a theme system that maintained accessibility standards across all 9 color schemes while ensuring smooth transitions.",
    outcome:
      "Successfully delivered a versatile corporate website template that has been adopted by multiple businesses.",
    liveDemo: "https://elvin2words.github.io",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "2",
    title: "padheni",
    description:
      "Comprehensive car dealership platform with inventory management and contact integration.",
    fullDescription:
      "PremiumCars is a full-featured car dealership platform designed to streamline the vehicle browsing and purchasing experience. The platform includes advanced filtering, inventory management, and integrated contact workflows.",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["HTML5", "CSS3", "PHP", "JavaScript"],
    category: "ecommerce",
    badges: ["Automotive", "E-commerce"],
    status: "beta",
    source: "manual",
    features: [
      "Dynamic inventory management",
      "Advanced search filters",
      "Vehicle comparison tool",
      "Integrated contact system",
      "Image galleries for each vehicle",
    ],
    challenges:
      "Implementing an efficient filtering system that could handle large inventories while maintaining fast page load times.",
    outcome:
      "The platform successfully manages over 500 vehicle listings with instant search and filter results, improving customer engagement.",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "3",
    title: "TutorKonnekt",
    description:
      "Professional construction company website with project galleries and service showcases.",
    fullDescription:
      "BuildCorp is a professional website for construction companies featuring extensive project galleries, service showcases, and client testimonials.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "AOS"],
    category: "corporate",
    badges: ["Construction", "Professional"],
    status: "in-prototype",
    source: "manual",
    features: [
      "Project portfolio gallery",
      "Service showcase pages",
      "Client testimonials section",
      "Scroll-triggered animations",
      "Mobile-optimized galleries",
    ],
    challenges:
      "Optimizing image-heavy content for fast loading while maintaining high visual quality across all devices.",
    outcome:
      "Achieved high performance scores while preserving visual quality and project storytelling.",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "4",
    title: "VisionSecSys",
    description:
      "IoT and analytics platform with real-time data visualization and industry solution patterns.",
    fullDescription:
      "DataFlow is an enterprise-grade IoT analytics platform providing real-time data visualization and insights for industrial applications.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Charts.js"],
    category: "dashboard",
    badges: ["Analytics", "IoT"],
    status: "r-and-d",
    source: "manual",
    features: [
      "Real-time data visualization",
      "Customizable dashboards",
      "Multi-device support",
      "Export workflows",
      "Alert notifications",
    ],
    challenges:
      "Implementing real-time updates without performance degradation when handling large data streams.",
    outcome:
      "Platform processes large volumes of data points while preserving smooth visualization updates.",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "5",
    title: "NetcommMS",
    description:
      "Professional admin dashboard with multiple themes and comprehensive management features.",
    fullDescription:
      "AdminPro is a versatile admin dashboard template featuring multiple pre-built themes, data management tools, and customizable widgets.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    category: "dashboard",
    badges: ["Dashboard", "Multi-theme"],
    status: "beta",
    source: "manual",
    features: [
      "Multiple theme options",
      "Responsive data tables",
      "Chart and graph widgets",
      "User management",
      "Role-based controls",
    ],
    challenges:
      "Designing a flexible theme system that is easy to customize while maintaining component consistency.",
    outcome:
      "Reusable dashboard baseline used as a foundation for multiple admin interfaces.",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "6",
    title: "EddyAI",
    description: "Personal portfolio website with blog system and project showcase.",
    fullDescription:
      "A modern personal portfolio built with Gatsby featuring a blog system, project showcases, and progressive web app capabilities.",
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    technologies: ["Gatsby", "React", "GraphQL", "PWA"],
    category: "portfolio",
    badges: ["Personal", "Blog"],
    status: "shipped",
    source: "manual",
    features: [
      "Static site generation",
      "GraphQL data layer",
      "Progressive web app support",
      "Markdown blog system",
      "SEO optimization",
    ],
    challenges:
      "Balancing fast build times with a growing content set and richer data relationships.",
    outcome:
      "Consistently high Lighthouse scores with globally fast content delivery through CDN.",
    liveDemo: "https://elvin2words.github.io",
    githubUrl: "https://github.com/elvin2words",
  },
  {
    id: "7",
    title: "Microgrid Stability and Protection Study",
    description:
      "Engineering study portfolio demonstrating modeling, protection coordination, and layout planning artifacts.",
    fullDescription:
      "A technical project package focused on microgrid behavior under variable loading and fault scenarios. The showcase combines simulation artifacts, design layouts, and supporting technical reports so stakeholders can review both engineering process and outcomes.",
    image: "/project-assets/engineering/microgrid-simulink-overview.png",
    gallery: [
      "/project-assets/engineering/microgrid-simulink-overview.png",
      "/project-assets/engineering/microgrid-autocad-layout.png",
      "/project-assets/engineering/etap-loadflow-summary.png",
    ],
    technologies: ["MATLAB", "Simulink", "ETAP", "AutoCAD Electrical"],
    category: "portfolio",
    badges: ["Engineering", "Simulation", "Power Systems"],
    status: "r-and-d",
    source: "manual",
    features: [
      "System-level dynamic model setup and validation workflow",
      "Protection coordination and load-flow scenario documentation",
      "Electrical layout artifacts prepared for review handoff",
      "Consolidated report package for non-technical stakeholders",
    ],
    challenges:
      "Keeping simulation outputs, design documentation, and review-ready visuals synchronized across tools with different file formats.",
    outcome:
      "Produced a single project narrative where reviewers can inspect assumptions, diagrams, and outputs without leaving the portfolio.",
    environment: {
      context: "Local engineering workstation + controlled simulation toolchain",
      tools: ["MATLAB R2024a", "Simulink", "ETAP 22.x", "AutoCAD Electrical"],
      platforms: ["Windows 11", "Vercel-hosted artifact previews"],
      methods: ["Load flow studies", "Protection checks", "Scenario simulation", "Design export reviews"],
    },
    artifacts: [
      {
        id: "mg-simulink-overview",
        title: "Simulink Model Overview",
        domain: "simulink",
        format: "PNG Export",
        description: "High-level block diagram snapshot exported for web review.",
        previewUrl: "/project-assets/engineering/microgrid-simulink-overview.png",
        downloadUrl: "/project-assets/engineering/microgrid-simulink-overview.png",
      },
      {
        id: "mg-autocad-layout",
        title: "AutoCAD Single-Line Layout",
        domain: "autocad",
        format: "PNG Export",
        description: "Layout sheet preview used for architecture walkthroughs.",
        previewUrl: "/project-assets/engineering/microgrid-autocad-layout.png",
        downloadUrl: "/project-assets/engineering/microgrid-autocad-layout.png",
      },
      {
        id: "mg-etap-summary",
        title: "ETAP Load-Flow Summary",
        domain: "etap",
        format: "PNG Export",
        description: "Load-flow and system state snapshot prepared for fast inspection.",
        previewUrl: "/project-assets/engineering/etap-loadflow-summary.png",
        downloadUrl: "/project-assets/engineering/etap-loadflow-summary.png",
      },
      {
        id: "mg-design-report",
        title: "Engineering Report Pack",
        domain: "report",
        format: "PDF",
        description: "Supporting report bundle suitable for review and archival.",
        previewUrl: "/project-assets/engineering/microgrid-design-report.pdf",
        downloadUrl: "/project-assets/engineering/microgrid-design-report.pdf",
      },
    ],
    githubUrl: "https://github.com/elvin2words",
  },
];
