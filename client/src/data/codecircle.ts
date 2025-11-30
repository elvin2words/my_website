import { ChevronDown, Mail, Phone, MapPin, Github, Code2, Database, Server, FileCode, GitBranch, Palette, Menu, X, Zap, Layers, Package, Twitter } from "lucide-react";
import { SiReact, SiPython, SiNodedotjs, SiMongodb, SiPostgresql, SiGit, SiGithub, SiFigma, SiLinkedin, SiWhatsapp } from "react-icons/si";

export const skills = {
  frontend: [
    { name: "React", icon: SiReact, color: "from-cyan-400 to-blue-500" },
    { name: "HTML5", icon: Code2, color: "from-orange-400 to-red-500" },
    { name: "CSS3", icon: Palette, color: "from-blue-400 to-purple-500" },
    { name: "JavaScript", icon: Zap, color: "from-yellow-400 to-orange-500" },
    { name: "Bootstrap", icon: Layers, color: "from-purple-400 to-indigo-500" },
  ],
  backend: [
    { name: "Node.js", icon: SiNodedotjs, color: "from-green-400 to-emerald-500" },
    { name: "Python", icon: SiPython, color: "from-blue-400 to-cyan-500" },
    { name: "MongoDB", icon: SiMongodb, color: "from-green-400 to-teal-500" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "from-blue-500 to-indigo-500" },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "from-red-400 to-orange-500" },
    { name: "GitHub", icon: SiGithub, color: "from-gray-600 to-black" },
    { name: "VS Code", icon: FileCode, color: "from-blue-400 to-purple-500" },
    { name: "Figma", icon: SiFigma, color: "from-purple-400 to-pink-500" },
    { name: "Docker", icon: Package, color: "from-pink-400 to-rose-500" },
  ],
};


export const roles = [
  "Full-Stack Development",
  "Backend Systems Integration",
  "UI/UX Designing",
  "Problem Solving",
  "Vibe Coding",
];
