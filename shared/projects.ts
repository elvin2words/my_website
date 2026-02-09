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
    title: "CodeBlue",
    description:
      "Modern corporate website with 9 color themes, responsive design, and portfolio showcase.",
    fullDescription:
      "CodeBlue is a comprehensive corporate website solution featuring a dynamic theme system that allows users to personalize their experience with 9 distinct color schemes. Built with modern web technologies, it provides a fully responsive design that adapts seamlessly across devices.",
    image: "/projects/codecircle.png",
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
    title: "PremiumCars",
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
    title: "BuildCorp",
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
    title: "DataFlow",
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
    title: "AdminPro",
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
    title: "Personal Portfolio",
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
];
