// src/data/technop.ts
// This file contains data related to the Technopreneur role, including vision, capabilities, ventures, and notable projects.

import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users,
  BarChart, Target, } from 'lucide-react';

export const role = { 
  title: "Budding Technopren",
  subtitle: "Architecting Innovation, Strategy, and Systems in Motion",
};

export const visionStatement =
  "Driving forward purposeful innovation through smart systems, creative engineering, and human-centered technology across energy, AI, automation, and digital ecosystems.";

export const coreIdentity = 
  "Tech has always been my go to platform for impact, so… through ventures, projects, and living labs, \
  I explore how engineering, AI, and smart systems can create scalable solutions that shape industries, communities, and experiences.";


export const coreCapabilities = {
  // {
  //   icon: <Lightbulb className="h-6 w-6 text-accent4 mr-2" />,
  //   title: 'Entrepreneurial Mindset',
  //   items: [
  //     'Systems Thinking & Innovation',
  //     'Lean Startup Methodology',
  //     'Venture Design Across Energy, AI, and AgTech',
  //     'Strategic Ideation & Planning',
  //     'Experimentation + Prototyping Culture',
  //   ],
  // },
  entrepreneurialMindset: [
    "Systems Thinking & Innovation",
    "Lean Experimentation & Prototyping",
    "Venture Design Across Energy, AI, and AgTech",
    "Strategic Ideation & Planning",
    "Product-Market Fit Discovery & Impact Design",
  ],
  focusAreas: [
    "Integrated Energy Solutions: Mobile power systems, BESS optimization, smart grid integration, and EV infrastructure.",
    "AI & Automation Platforms: Intelligent systems that analyze, predict, and optimize real-world operations — from transit networks to industrial workflows.",
    "Speculative Tech & Experiential Products: Immersive travel experiences, IoT-enabled networks, and exploratory R&D in communications and connectivity.",
  ],
};

export const leadershipAndTech = {
  leadershipManagement: [
    "Startup Team Formation & Vision Alignment",
    "Agile Product Development",
    "Systems Thinking - Interdependencies & workflow optimization",
    "R&D - Feasibility Studies, Prototyping, Iterative testing & operational scaling",
  ],
  technicalExpertise: [
    "Embedded Systems, FPGA, & Automation",
    "EV Systems, BMS, and Energy Platforms",
    "AI-Driven Analytics & Control Systems",
    "Cloud/Edge Integration for Smart Grids",
  ],
};

export const ventures = [
  {
    title: "Mazenel Industries",
    description:
      "Lead founder of a systems-oriented startup focused on renewable energy technologies, automation, UAV services, and systems engineering solutions. Currently prototyping mobile energy systems (the PowerHive) and embedded control platforms—targeting sectors like smart farming and industrial automation.",
    weblink:"www.mazenel.co.zw"
  },
  {
    title: "IQAL Inc.",
    description:
      "A data-intelligence venture focused on automation, analytics, and smart system design, with projects spanning smart applications, industrial automation, and digital services. Core projects include CASSIE (adaptive automation platform), Horizon (AI-enhanced travel tech), EddyUI, and Utility (the Field Deployment and Fault Management System).",
      weblink:"www.iqlal.co.zw"
  },
  {
    title: "Telqon Technologies",
    description:
      "Exploratory R&D lab targeting next-gen communications, connectivity frameworks in IoT/IIoT, edge computing, and network-aware AI networks for industrial, residential, decentralised and autonomous  systems with secure, scalable conncectivity in both urban and rural innovation ecosystems.",
    weblink:"www.telqon.co.zw"
  },
  {
    title: "Usorvax",
    description:
      "Experimental venture focused on speculative tech and immersive experiences - currently leading the Usorvax Travel & Tourism platform which reimagines cultural exchange through smart, story-driven travel tech inclusion.",
    weblink:"www.usorvax.com"
  },
  {
    title: "Youth STEM 2030 & Enactus UZ",
    description:
      "Co-led youth-centered innovation projects fostering sustainable tech, social entrepreneurship, and community transformation through hands-on initiatives.",
  },
];

export const notableProjects = [
  {
    title: "PowerHive",
    description:
      "A mobile energy system prototype designed to provide clean, portable power solutions for remote and underserved communities.",
  },
  {
    title: "CASSIE",
    description:
      "An adaptive automation platform that leverages AI to optimize industrial processes and enhance operational efficiency.",
  },
  {
    title: "Horizon",
    description:
      "An AI-enhanced travel tech platform that personalizes travel experiences through smart recommendations and cultural insights.",
  },
  {
    title: "EddyUI",
    description:
      "A user interface framework designed for edge computing applications, enabling seamless interaction with distributed systems.",
  },
];

export const whyItMatters = 
  "Being a technopreneur is about more than products - it’s about creating ecosystems that empower people and ideas. And how do we do that – we imagine, we experiment, we design, iteratively, interdisciplinary, and anchored in purpose. Innovation is not just invention, but orchestration to do something better.";

