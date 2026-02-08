export const linkedInFollowUrl =
  "https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=elvin-mazwimairi";

export const InstagramFollowUrl = "https://instagram.com/young_mazwi";

export interface CreativeDesign {
  id: string;
  title: string;
  summary: string;
  focus: string;
  tools: string[];
  image: string;
}

export const creativeDesigns: CreativeDesign[] = [
  {
    id: "design-01",
    title: "Brand Story Frames",
    summary:
      "A lightweight visual system for social storytelling, built around clean layout rhythms and clear messaging.",
    focus: "Brand visuals",
    tools: ["Canva", "Lightroom", "Typography"],
    image: "/gallery/TidbitsWithElvin1/3.jpg",
  },
  {
    id: "design-02",
    title: "Motion Poster Concepts",
    summary:
      "Poster-style compositions shaped for short-form video, balancing punchy visuals with strong legibility.",
    focus: "Motion-first design",
    tools: ["CapCut", "After Effects", "Color grading"],
    image: "/gallery/Zz4/20250623_120419.jpg",
  },
  {
    id: "design-03",
    title: "Editorial Carousel Kits",
    summary:
      "Carousel templates for thought leadership content, structured for swipe-flow and narrative pacing.",
    focus: "Content systems",
    tools: ["Figma", "Canva", "Grid systems"],
    image: "/gallery/Zz3/Screenshot_20240619_135541_TikTok.jpg",
  },
  {
    id: "design-04",
    title: "Creative Campaign Visuals",
    summary:
      "Campaign visuals designed to keep a consistent voice across posts, stories, and launch snippets.",
    focus: "Campaign art direction",
    tools: ["Photoshop", "Lightroom", "Visual direction"],
    image: "/gallery/Zz2/20220421_161459.jpg",
  },
  {
    id: "design-05",
    title: "Event & Culture Artwork",
    summary:
      "Visuals that blend atmosphere, people, and narrative moments into reusable design assets.",
    focus: "Culture storytelling",
    tools: ["Lightroom", "Composition", "Creative retouching"],
    image: "/gallery/Zz1/20250621_063837.jpg",
  },
  {
    id: "design-06",
    title: "Minimal Identity Experiments",
    summary:
      "Fast concept studies exploring type, contrast, and icon direction for fresh identity routes.",
    focus: "Identity exploration",
    tools: ["Figma", "Illustrator", "Design systems"],
    image: "/gallery/TidbitsWithElvin1/11.jpg",
  },
];

export interface PhotoShot {
  id: string;
  title: string;
  collection: string;
  year: number;
  image: string;
}

export const photoShots: PhotoShot[] = [
  {
    id: "shot-01",
    title: "Afterglow Lines",
    collection: "Street",
    year: 2025,
    image: "/gallery/Zz4/20250628_204311.jpg",
  },
  {
    id: "shot-02",
    title: "Blue Hour Layers",
    collection: "Street",
    year: 2025,
    image: "/gallery/Zz4/20250623_120419.jpg",
  },
  {
    id: "shot-03",
    title: "Still Sidewalk",
    collection: "Urban Moments",
    year: 2024,
    image: "/gallery/Zz4/20241126_133144.jpg",
  },
  {
    id: "shot-04",
    title: "Patterned Shadows",
    collection: "Urban Moments",
    year: 2024,
    image: "/gallery/Zz4/20240502_162518.jpg",
  },
  {
    id: "shot-05",
    title: "Morning Texture",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz3/20250621_063523.jpg",
  },
  {
    id: "shot-06",
    title: "Quiet Expression",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz3/20250621_062856.jpg",
  },
  {
    id: "shot-07",
    title: "Color Drift",
    collection: "Moodboard",
    year: 2024,
    image: "/gallery/Zz3/Screenshot_20240825_122336_Instagram.jpg",
  },
  {
    id: "shot-08",
    title: "Signal Frame",
    collection: "Moodboard",
    year: 2024,
    image: "/gallery/Zz3/Screenshot_20240619_135523_TikTok.jpg",
  },
  {
    id: "shot-09",
    title: "Raw Geometry",
    collection: "Archive",
    year: 2022,
    image: "/gallery/Zz2/IMG-20220318-WA0003.jpg",
  },
  {
    id: "shot-10",
    title: "Clouded Light",
    collection: "Archive",
    year: 2021,
    image: "/gallery/Zz2/20201121_081553.jpg",
  },
  {
    id: "shot-11",
    title: "Late Window",
    collection: "Portraits",
    year: 2025,
    image: "/gallery/Zz1/20250621_063837.jpg",
  },
  {
    id: "shot-12",
    title: "City Pause",
    collection: "Street",
    year: 2024,
    image: "/gallery/Zz1/20240803_101147.jpg",
  },
  {
    id: "shot-13",
    title: "First Light",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/1.jpg",
  },
  {
    id: "shot-14",
    title: "Warm Palette",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/7.jpg",
  },
  {
    id: "shot-15",
    title: "Framed Silence",
    collection: "Creative Series",
    year: 2025,
    image: "/gallery/TidbitsWithElvin1/12.jpg",
  },
];

export type WritingKind = "blog" | "writing";
export type WritingStatus = "published" | "in-progress";

export interface WritingEntry {
  id: string;
  title: string;
  kind: WritingKind;
  status: WritingStatus;
  publishedOn: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  href?: string;
}

export const writingEntries: WritingEntry[] = [
  {
    id: "writing-01",
    title: "Designing Systems People Can Feel",
    kind: "blog",
    status: "published",
    publishedOn: "November 24, 2025",
    readTime: "6 min read",
    excerpt:
      "A practical breakdown of how systems thinking and interface emotion can coexist in the same product decisions.",
    tags: ["Systems design", "UX", "Creative tech"],
  },
  {
    id: "writing-02",
    title: "When Engineering Meets Storytelling",
    kind: "writing",
    status: "published",
    publishedOn: "September 18, 2025",
    readTime: "4 min read",
    excerpt:
      "Reflections on translating technical depth into narratives people can understand, trust, and act on.",
    tags: ["Communication", "Engineering", "Narrative"],
  },
  {
    id: "writing-03",
    title: "From Idea to Visual Prototype in One Sprint",
    kind: "blog",
    status: "in-progress",
    publishedOn: "Draft in progress",
    readTime: "5 min read",
    excerpt:
      "A repeatable sprint format for validating visual concepts before committing engineering resources.",
    tags: ["Prototyping", "Workflow", "Design ops"],
  },
  {
    id: "writing-04",
    title: "Creative Discipline for Technical Builders",
    kind: "writing",
    status: "in-progress",
    publishedOn: "Draft in progress",
    readTime: "7 min read",
    excerpt:
      "Notes on building a consistent creative practice while shipping code, systems, and client work.",
    tags: ["Creativity", "Productivity", "Personal practice"],
  },
  {
    id: "writing-05",
    title: "Interfaces for Real-World Complexity",
    kind: "blog",
    status: "published",
    publishedOn: "June 2, 2025",
    readTime: "8 min read",
    excerpt:
      "How to reduce cognitive load in dashboards and data-heavy experiences without removing useful detail.",
    tags: ["Interface design", "Data UX", "Product strategy"],
  },
  {
    id: "writing-06",
    title: "On Building a Creative Career Stack",
    kind: "writing",
    status: "published",
    publishedOn: "March 11, 2025",
    readTime: "5 min read",
    excerpt:
      "A personal framework for blending engineering, design, and venture thinking into one cohesive path.",
    tags: ["Career", "Creative direction", "Interdisciplinary"],
  },
];
