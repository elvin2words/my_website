// pages/Services.tsx
import React from "react";
import { Cpu, Zap, Code, Ruler, Home } from "lucide-react";
import { Link } from "wouter";

const services = [
  {
    icon: <Zap size={24} />,
    title: "Renewable Energy / Power Systems",
    desc: "Solar, storage & microgrid design & install",
    tools: ["MATLAB", "pvSyst", "Simulink"],
    portfolio: "/projects#energy",
  },
  {
    icon: <Cpu size={24} />,
    title: "Embedded & IoT Systems Design",
    desc: "Micro-controllers, firmware & control",
    tools: ["STM32", "Arduino", "Python", "C/C++"],
    portfolio: "/projects#embedded",
  },
  {
    icon: <Code size={24} />,
    title: "Software Development",
    desc: "Web dashboards, full-stack apps, API integrations",
    tools: ["React", "Node.js", "Python", "MongoDB"],
    portfolio: "/projects#software",
  },
  {
    icon: <Ruler size={24} />,
    title: "Engineering Design & Simulation",
    desc: "Circuits, PCB, MATLAB, AutoCAD, pvSyst",
    tools: ["MATLAB", "AutoCAD", "Altium", "LTSpice"],
    portfolio: "/projects#design",
  },
  {
    icon: <Home size={24} />,
    title: "Electrical / Architectural House Plans",
    desc: "Wiring, installations & house plan design",
    tools: ["AutoCAD", "Revit", "SketchUp"],
    portfolio: "/projects#house-plans",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white px-6 md:px-12 py-12">
      
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          End-to-end solutions: from energy systems to software platforms
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          Transforming ideas into functional, real-world solutions.
        </p>
        <a
          href="#contact"
          className="inline-block bg-accent2 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent3 transition"
        >
          Work With Me
        </a>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-4">
              {s.icon}
              <h2 className="text-xl font-semibold">{s.title}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{s.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {s.tools.map((tool, i) => (
                <span
                  key={i}
                  className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                >
                  {tool}
                </span>
              ))}
            </div>
            <Link
              to={s.portfolio}
              className="mt-auto text-accent2 font-medium hover:underline inline-flex items-center gap-1"
            >
              See My Work →
            </Link>
          </div>
        ))}
      </section>

      {/* Why Hire Me */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Hire Me?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          <li>Multidisciplinary: Electrical + Software + IoT</li>
          <li>Hands-on: Proven in real-world projects</li>
          <li>Future-ready: EVSE, smart grids, microgrids</li>
        </ul>
      </section>

      {/* Engagement Models */}
      <section className="mt-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Engagement Models</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          I’m available for consulting, freelance projects, or long-term opportunities. Let’s discuss what fits your needs.
        </p>
      </section>

      {/* CTA */}
      <section id="contact" className="mt-12 text-center">
        <a
          href="mailto:youremail@example.com"
          className="inline-block bg-accent2 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent3 transition"
        >
          Work With Me
        </a>
      </section>
    </div>
  );
}





// pages/Services.tsx
import React, { useState } from "react";
import { Link } from "wouter";
import { Cpu, Zap, Code, Ruler, Home } from "lucide-react";

const servicesData = [
  {
    icon: <Zap size={28} />,
    title: "Renewable Energy & Power Systems",
    description:
      "Design and optimization of solar, storage, and power distribution systems.",
    details: [
      "Hybrid PV + BESS design and simulations",
      "Grid-tied and off-grid microgrids",
      "Substation & power protection schemes",
      "Load flow, fault analysis, and optimization (MATLAB/ETAP/DIgSILENT)",
      "Energy yield forecasting",
    ],
    tools: ["MATLAB/Simulink", "ETAP", "AutoCAD", "PVSyst", "HOMER", "PSCAD"],
    portfolio: "/projects#energy",
  },
  {
    icon: <Cpu size={28} />,
    title: "Embedded & IoT Systems",
    description: "Smart devices and control systems bridging hardware & software.",
    details: [
      "Firmware for STM32, TI C2000, Arduino, ESP32",
      "Motor control (FOC, VFD, PWM inverters)",
      "IoT telemetry (MQTT, Modbus, LoRa, Zigbee, Wi-Fi)",
      "PCB design (KiCad, Altium)",
      "Energy/EVSE device controllers",
    ],
    tools: ["C", "C++", "Embedded Python", "FreeRTOS", "MATLAB CodeGen"],
    portfolio: "/projects#embedded",
  },
  {
    icon: <Code size={28} />,
    title: "Software Development",
    description: "Full-stack software powering engineering systems & apps.",
    details: [
      "Web apps & dashboards (React, Node.js, Python/Django, PostgreSQL)",
      "Energy monitoring & fault management systems",
      "Custom APIs for IoT integration",
      "Portfolio & business websites",
    ],
    tools: ["React", "Node.js", "Django", "Flask", "PostgreSQL", "Firebase"],
    portfolio: "/projects#software",
  },
  {
    icon: <Ruler size={28} />,
    title: "Engineering Design & Simulation",
    description: "Professional schematics, models, and system documentation.",
    details: [
      "MATLAB/Simulink modeling of power systems",
      "PCB circuit design & simulation (Proteus, LTspice, Multisim)",
      "Electrical schematics & layouts (AutoCAD Electrical)",
      "Control systems tuning (PI/PID, FOC, MPPT)",
    ],
    tools: ["MATLAB", "Proteus", "AutoCAD Electrical", "Multisim", "LTspice"],
    portfolio: "/projects#design",
  },
  {
    icon: <Home size={28} />,
    title: "Electrical & Architectural House Plans",
    description: "Energy-ready building designs for residential & commercial projects.",
    details: [
      "House wiring schematics & load balancing",
      "Integration of renewable systems (PV-ready homes)",
      "2D/3D architectural drafting & visualization",
      "Compliance with safety and building standards",
    ],
    tools: ["AutoCAD", "Revit", "SketchUp"],
    portfolio: "/projects#house-plans",
  },
];

export default function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (idx: number) =>
    setExpanded(expanded === idx ? null : idx);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white px-6 md:px-12 py-12">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          End-to-end solutions: from energy systems to software platforms
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6">
          I specialize in blending Electrical Engineering, Software Development,
          and System Design to deliver modern energy, automation, and digital
          solutions.
        </p>
        <a
          href="#contact"
          className="inline-block bg-accent2 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-accent3 transition"
        >
          Work With Me
        </a>
      </section>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((s, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-800 shadow-md rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition cursor-pointer"
            onClick={() => toggleExpand(idx)}
          >
            <div className="flex items-center gap-3 mb-4">
              {s.icon}
              <h2 className="text-xl font-semibold">{s.title}</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-3">{s.description}</p>

            {/* Expandable details */}
            {expanded === idx && (
              <div className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <ul className="list-disc list-inside space-y-1">
                  {s.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2 mt-2">
                  {s.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <Link
                  to={s.portfolio}
                  className="mt-3 inline-block text-accent2 font-medium hover:underline"
                >
                  See My Work →
                </Link>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Why Work With Me */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Work With Me?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          <li>Hybrid Skillset → Energy systems + embedded control + digital tools</li>
          <li>Future-Ready → EV charging, microgrids, smart homes, IoT telemetry</li>
          <li>Flexibility → Solo freelance engineer today, scalable with subcontractors tomorrow</li>
          <li>Affordable & Efficient → Simulation-first approach reduces cost and risk</li>
          <li>Hands-On Projects → Practical experience across renewable setups & prototypes</li>
        </ul>
      </section>

      {/* CTA */}
      <section id="contact" className="mt-12 text-center">
        <a
          href="mailto:youremail@example.com"
          className="inline-block bg-accent2 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent3 transition"
        >
          Work With Me
        </a>
        <Link
          to="/projects"
          className="inline-block ml-4 px-6 py-3 text-accent2 font-semibold hover:underline"
        >
          View My Work
        </Link>
      </section>
    </div>
  );
}




import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Bolt,
  Cpu,
  Code2,
  PenTool,
  Home,
  ExternalLink,
  Mail,
  ChevronRight,
} from "lucide-react";

// Simple section fade/slide animation
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Reusable chip/badge
const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  className = "",
  children,
}) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-white/20 bg-white/5 ${className}`}>
    {children}
  </span>
);

// Section header
const SectionHead: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  id?: string;
}> = ({ icon, title, subtitle, id }) => (
  <div id={id} className="flex items-start gap-3 mb-6">
    <div className="shrink-0 rounded-2xl p-2 bg-white/10 border border-white/10">
      {icon}
    </div>
    <div>
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">{title}</h2>
      <p className="text-white/70 text-sm md:text-base">{subtitle}</p>
    </div>
  </div>
);

// CTA button
const CTA: React.FC<React.PropsWithChildren<{ to: string; variant?: "primary" | "ghost"; className?: string }>> = ({
  to,
  children,
  variant = "primary",
  className = "",
}) => (
  <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <button
      className={
        variant === "primary"
          ? `inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent2 text-white hover:opacity-90 transition shadow ${className}`
          : `inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition ${className}`
      }
    >
      {children}
      <ChevronRight className="h-4 w-4" />
    </button>
  </Link>
);

const services = [
  {
    id: "energy",
    icon: <Bolt className="h-5 w-5" />,
    title: "Renewable Energy & Power Systems",
    subtitle:
      "Design and optimization of solar PV, storage, and power distribution systems.",
    whatIDo: [
      "Hybrid PV + BESS design and simulations",
      "Grid-tied and off-grid microgrids",
      "Substation & power protection schemes",
      "Load flow, fault analysis, and optimization (MATLAB/DIgSILENT)",
      "Energy yield forecasting and feasibility/ROI",
    ],
    tools: ["MATLAB/Simulink", "DIgSILENT", "AutoCAD", "PVsyst", "PSCAD"],
    workLinkText: "See My Energy Projects",
    workLinkTo: "/projects?tag=energy",
  },
  {
    id: "embedded",
    icon: <Cpu className="h-5 w-5" />,
    title: "Embedded & IoT Systems",
    subtitle:
      "Smart devices and control systems that bridge hardware with software.",
    whatIDo: [
      "Firmware for STM32, ESP32, ARM Cortex (bare‑metal/RTOS)",
      "Motor control (FOC, VFD, PWM inverters)",
      "IoT telemetry (MQTT, Modbus, LoRa, Zigbee, Wi‑Fi)",
      "PCB bring‑up, prototyping & debugging",
      "Energy/EVSE device communication",
    ],
    tools: ["C/C++", "FreeRTOS", "MATLAB CodeGen", "Altium", "KiCad"],
    workLinkText: "Explore IoT & Embedded Work",
    workLinkTo: "/projects?tag=embedded",
  },
  {
    id: "software",
    icon: <Code2 className="h-5 w-5" />,
    title: "Software Development",
    subtitle:
      "Full‑stack software to power engineering systems and digital apps.",
    whatIDo: [
      "Web apps & dashboards (React, Node.js, Python/Django)",
      "Energy monitoring & fault management platforms",
      "Custom APIs and integrations for IoT",
      "Portfolio/business websites & portals",
    ],
    tools: ["React", "Node.js", "Django/Flask", "PostgreSQL", "Firebase"],
    workLinkText: "See Software Projects",
    workLinkTo: "/projects?tag=software",
  },
  {
    id: "design",
    icon: <PenTool className="h-5 w-5" />,
    title: "Engineering Design & Simulation",
    subtitle: "Professional schematics, models, and system documentation.",
    whatIDo: [
      "MATLAB/Simulink modeling of power & control systems",
      "PCB/circuit design & simulation (LTspice, Multisim)",
      "Electrical schematics & layouts (AutoCAD Electrical)",
      "Control tuning (PI/PID, MPPT, FOC)",
    ],
    tools: ["MATLAB", "LTspice", "Multisim", "AutoCAD Electrical", "Python"],
    workLinkText: "View Engineering Design Work",
    workLinkTo: "/projects?tag=design",
  },
  {
    id: "architecture",
    icon: <Home className="h-5 w-5" />,
    title: "Electrical/Architectural House Plans",
    subtitle:
      "Energy‑ready building designs for residential and small commercial projects.",
    whatIDo: [
      "House wiring schematics & load balancing",
      "PV‑ready and backup‑ready provisions",
      "2D architectural drafting & visualization",
      "Compliance with safety/building standards",
    ],
    tools: ["AutoCAD", "Revit", "SketchUp"],
    workLinkText: "See House Plan Designs",
    workLinkTo: "/projects?tag=architecture",
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen text-white">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30 bg-accent2" />
        <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20 bg-accent3" />
      </div>

      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Services
            </h1>
            <p className="mt-3 text-white/80 md:text-lg">
              End‑to‑end solutions across <span className="text-accent2">Energy Systems</span>,
              <span className="text-accent3"> Embedded & IoT</span>, and
              <span className="text-accent4"> Software</span> — from modeling and design to implementation.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>Freelance</Badge>
              <Badge>Consulting</Badge>
              <Badge>Open to Full‑time</Badge>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <CTA to="/contact-profile-card">Contact Me</CTA>
              <CTA to="/projects" variant="ghost">View Projects</CTA>
              <CTA to="/resume" variant="ghost">Resume/CV</CTA>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left: Services list */}
          <div className="md:col-span-8 space-y-10">
            {services.map((s, idx) => (
              <motion.article
                key={s.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-sm backdrop-blur"
              >
                <SectionHead icon={s.icon} title={s.title} subtitle={s.subtitle} id={s.id} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">What I Do</h3>
                    <ul className="space-y-1.5 text-sm text-white/85 list-disc pl-5">
                      {s.whatIDo.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tools & Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((t, i) => (
                        <Badge key={i}>{t}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <CTA to={s.workLinkTo}>{s.workLinkText}</CTA>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
                  >
                    Permalink <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Right: Sticky panel */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <nav className="space-y-2 text-sm">
                  {services.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="block hover:underline">
                      {s.title}
                    </a>
                  ))}
                  <Link to="/projects">
                    <a className="block hover:underline">Projects</a>
                  </Link>
                  <Link to="/resume">
                    <a className="block hover:underline">Resume / CV</a>
                  </Link>
                  <Link to="/contact-profile-card">
                    <a className="block hover:underline">Contact</a>
                  </Link>
                </nav>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="font-semibold mb-2">Why Work With Me?</h3>
                <ul className="text-sm text-white/85 list-disc pl-5 space-y-1.5">
                  <li>Multidisciplinary: Electrical, Embedded, and Software.</li>
                  <li>Simulation‑first approach reduces cost & risk.</li>
                  <li>Future‑ready: EVSE, microgrids, smart homes, IoT.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CTA to="/contact-profile-card">Let’s Work Together</CTA>
                  <a
                    href="mailto:youremail@example.com"
                    className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    <Mail className="h-4 w-4" /> Email Me
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA band */}
      <section className="py-10 px-4 border-t border-white/10 bg-white/5">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Ready to build something great?</h3>
            <p className="text-white/70 text-sm">Available for freelance, consulting, and open to full‑time roles.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CTA to="/contact-profile-card">Start a Conversation</CTA>
            <CTA to="/projects" variant="ghost">Browse Projects</CTA>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;






<motion.article
  whileHover={{ scale: 1.03, boxShadow: "0 15px 35px rgba(0,0,0,0.2)" }}
  transition={{ type: "spring", stiffness: 300 }}
>
  ...
</motion.article>


<motion.div whileHover={{ rotate: 20, scale: 1.2 }} transition={{ duration: 0.3 }}>
  {s.icon}
</motion.div>

<div className="bg-white/10 rounded-full h-2 w-full overflow-hidden">
  <motion.div initial={{ width: 0 }} animate={{ width: `${skillLevel}%` }} className="bg-accent2 h-full rounded-full" />
</div>


import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Link } from "wouter";

const FloatingCTA: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Link to="/contact">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-3 bg-accent2 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition"
        >
          <Mail className="h-5 w-5" />
          Contact Me
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingCTA;




import { motion } from "framer-motion";
import { useState } from "react";

const ServiceCard = ({ service }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="w-full md:w-80 h-64 perspective"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        className="relative w-full h-full rounded-2xl shadow-lg cursor-pointer transform-style-preserve-3d transition-transform duration-500"
      >
        {/* Front */}
        <div className="absolute backface-hidden w-full h-full bg-white/5 text-white p-6 rounded-2xl flex flex-col justify-center items-start">
          <div className="mb-3">{service.icon}</div>
          <h3 className="text-xl font-semibold">{service.title}</h3>
          <p className="text-sm mt-1">{service.subtitle}</p>
        </div>

        {/* Back */}
        <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-accent2 p-6 rounded-2xl flex flex-col justify-center items-start text-white">
          <h3 className="text-lg font-semibold mb-2">Tools & Skills</h3>
          <div className="flex flex-wrap gap-2">
            {service.tools.map((tool, idx) => (
              <span key={idx} className="bg-white/20 px-2 py-1 rounded text-xs">{tool}</span>
            ))}
          </div>
          <a
            href={service.workLinkTo}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline"
          >
            See My Work
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};


for home:


{!isMobile && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="fixed bottom-8 right-8 z-50"
  >
    <button
      onClick={() => setShowHirePopup(true)}
      className="bg-accent2 text-black px-5 py-3 rounded-full shadow-lg hover:scale-105 transition"
    >
      Hire Me
    </button>
  </motion.div>
)}



<div className="fixed top-0 left-0 h-1 bg-accent2 z-50" style={{ width: `${scrollPercent}%` }} />


Perfect! Let’s break down the implementation plan for your **Home page enhancements** and integrate them cleanly with your current React setup.

---

## **1. Hero Typing Effect**

We'll replace the static role spans with a **cycling typing animation**. Using `react-typed` or a simple custom hook with `framer-motion`:

```bash
npm install react-typed
```

**Hero Section snippet:**

```tsx
import Typed from 'react-typed';

<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
  Hi, I’m Elvin, a{' '}
  <span className="text-accent2">
    <Typed
      strings={["Electrical Engineer", "Systems Developer", "Creative Technologist"]}
      typeSpeed={80}
      backSpeed={50}
      loop
    />
  </span>.
</h1>
```

✨ This will **cycle the roles continuously** in the hero, giving a dynamic first impression.

---

## **2. Interactive Floating Background Effects**

Enhance your existing `BackgroundEffect` with:

* **Particle connections reacting to cursor**
* **Glow or subtle movement on CTA hover**

**Example using particles.js (or similar custom canvas effect):**

```tsx
import { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx || !canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();

        // Lines
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if(dist < 100) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist/100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
      requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20" />;
};

export default ParticleBackground;
```

* Place `<ParticleBackground />` **behind your hero/content** like `BackgroundEffect`.
* Hover glow on CTA: just add `hover:shadow-lg hover:scale-105 transition` (you already have this).

---

## **3. Lazy-loaded Flip Cards for Services/Portfolio**

* Use your existing `LazySection` wrapper.
* Flip cards show **front: service title/icon**, **back: tools + “View Project” CTA**.
* CSS transform for flip effect:

```tsx
const FlipCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  tools: string[];
  link: string;
}> = ({ title, icon, tools, link }) => {
  return (
    <div className="group perspective w-full md:w-1/3">
      <div className="relative w-full h-64 duration-700 transform-style preserve-3d group-hover:rotate-y-180">
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white/5 rounded-xl p-5 flex flex-col items-center justify-center">
          {icon}
          <h3 className="mt-4 font-semibold text-lg">{title}</h3>
        </div>
        {/* Back */}
        <div className="absolute w-full h-full backface-hidden bg-white/10 rounded-xl p-5 flex flex-col items-center justify-center rotate-y-180">
          <h4 className="font-semibold mb-2">Tools</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {tools.map((t) => <Badge key={t}>{t}</Badge>)}
          </div>
          <Link to={link} className="text-accent2 hover:underline">View Project</Link>
        </div>
      </div>
    </div>
  );
};
```

**Usage with `LazySection`:**

```tsx
<LazySection>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {services.map((s) => (
      <FlipCard 
        key={s.id} 
        title={s.title} 
        icon={s.icon} 
        tools={s.tools} 
        link={s.workLinkTo} 
      />
    ))}
  </div>
</LazySection>
```

✅ This creates **interactive flip cards** that lazy-load for performance.

---

If you want, I can **rewrite your Home page fully** with these three features integrated:

* Hero typing animation
* Interactive floating particles
* Lazy-loaded flip cards for services

It will be fully ready for React + Tailwind + Framer Motion.

Do you want me to do that next?




import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Bolt, Cpu, Code2, PenTool, Home, ExternalLink, Mail, ChevronRight } from 'lucide-react';

// ==========================
// Helper Components
// ==========================
const Badge: React.FC<{ className?: string }> = ({ children, className }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-white/20 bg-white/5 ${className}`}>
    {children}
  </span>
);

const SectionHead: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; id?: string }> = ({ icon, title, subtitle, id }) => (
  <div id={id} className="flex items-start gap-3 mb-6">
    <div className="shrink-0 rounded-2xl p-2 bg-white/10 border border-white/10">{icon}</div>
    <div>
      <h2 className="text-xl md:text-2xl font-semibold leading-tight">{title}</h2>
      <p className="text-white/70 text-sm md:text-base">{subtitle}</p>
    </div>
  </div>
);

const CTA: React.FC<{ to: string; variant?: "primary" | "ghost"; className?: string }> = ({ to, children, variant = "primary", className }) => (
  <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <button className={`${variant === "primary" ? "bg-accent2 text-white" : "border border-white/20 text-white"} inline-flex items-center gap-2 px-4 py-2 rounded-xl hover:opacity-90 transition shadow ${className}`}>
      {children} <ChevronRight className="h-4 w-4" />
    </button>
  </Link>
);

// ==========================
// Typing Hero Effect
// ==========================
const useTypingEffect = (words: string[], speed = 150, pause = 1500) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = words[wordIndex];

    if (typing) {
      if (displayed.length < currentWord.length) {
        timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(currentWord.slice(0, displayed.length - 1)), speed / 2);
      } else {
        setWordIndex((prev) => (prev + 1) % words.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, wordIndex, words, speed, pause]);

  return displayed;
};

// ==========================
// Lazy-loaded Section
// ==========================
const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref}>{visible ? children : null}</div>;
};

// ==========================
// Particle Background
// ==========================
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    const num = 60;
    for (let i = 0; i < num; i++) {
      particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
    }

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
      }
      // Lines
      for (let i = 0; i < num; i++) {
        for (let j = i + 1; j < num; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
            ctx.stroke();
          }
        }
      }

      // Move
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      requestAnimationFrame(draw);
    };
    draw();

    const handleResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-20" />;
};

// ==========================
// Flip Card for Services
// ==========================
const FlipCard: React.FC<{ title: string; subtitle: string; whatIDo: string[]; tools: string[]; icon: React.ReactNode; link: string }> = ({ title, subtitle, whatIDo, tools, icon, link }) => (
  <motion.div whileHover={{ rotateY: 180 }} className="relative w-full h-64 perspective">
    <div className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d">
      {/* Front */}
      <div className="absolute w-full h-full backface-hidden rounded-2xl border border-white/10 bg-white/5 p-5 flex flex-col justify-between">
        <div className="flex items-center gap-2">{icon}<h3 className="text-lg font-semibold">{title}</h3></div>
        <p className="text-sm text-white/70 mt-2">{subtitle}</p>
      </div>
      {/* Back */}
      <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl border border-white/10 bg-white/10 p-5 flex flex-col justify-between">
        <div>
          <h4 className="font-semibold mb-2">Tools & Skills</h4>
          <div className="flex flex-wrap gap-1">
            {tools.map((t) => <Badge key={t}>{t}</Badge>)}
          </div>
        </div>
        <CTA to={link}>View Project</CTA>
      </div>
    </div>
  </motion.div>
);

// ==========================
// Main Home Page
// ==========================
const Home: React.FC = () => {
  const roles = ["Electrical Engineer", "Systems Developer", "Creative Technologist"];
  const typedRole = useTypingEffect(roles);

  const services = [
    { id: "energy", icon: <Bolt />, title: "Renewable Energy & Power Systems", subtitle: "Solar, storage & microgrids", whatIDo: ["Hybrid PV + BESS design", "Grid-tied/off-grid microgrids"], tools: ["MATLAB", "DIgSILENT"], link: "/projects?tag=energy" },
    { id: "embedded", icon: <Cpu />, title: "Embedded & IoT", subtitle: "Smart devices & firmware", whatIDo: ["STM32 firmware", "IoT telemetry"], tools: ["C/C++", "FreeRTOS"], link: "/projects?tag=embedded" },
    { id: "software", icon: <Code2 />, title: "Software Development", subtitle: "Full-stack apps & dashboards", whatIDo: ["React dashboards", "API integration"], tools: ["React", "Node.js"], link: "/projects?tag=software" },
  ];

  return (
    <div className="relative text-white min-h-screen">
      <ParticleBackground />

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I’m Elvin — <span className="text-accent2">{typedRole}</span><span className="blink">|</span>
        </h1>
        <p className="max-w-2xl text-white/70 mb-6">
          I design smart systems and seamless digital experiences – from energy solutions to intuitive digital platforms.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <CTA to="/projects">See My Work</CTA>
          <CTA to="/contact" variant="ghost">Contact Me</CTA>
        </div>
      </section>

      {/* Services Flip Cards */}
      <section className="px-4 py-16 container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <LazySection key={s.id}>
            <FlipCard {...s} />
          </LazySection>
        ))}
      </section>

      {/* Floating Contact Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/contact">
          <button className="px-5 py-3 rounded-full bg-accent2 text-black shadow-lg hover:shadow-2xl transition-all">
            Contact Me
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;






import React, { useState, Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { Link } from "wouter";
import * as THREE from "three";
import LazySection from "@/components/home/LazySection"; // Your LazySection wrapper

// Sample projects
const projects = [
  {
    id: 1,
    title: "Solar Microgrid",
    identity: "Engineer",
    thumbnail: "/images/microgrid.jpg",
    video: "/videos/microgrid.mp4",
    tools: ["MATLAB", "DIgSILENT"],
  },
  {
    id: 2,
    title: "IoT Smart Meter",
    identity: "Developer",
    thumbnail: "/images/iot.jpg",
    video: "/videos/iot.mp4",
    tools: ["C/C++", "FreeRTOS"],
  },
  {
    id: 3,
    title: "Portfolio Web App",
    identity: "Technopreneur",
    thumbnail: "/images/webapp.jpg",
    video: "/videos/webapp.mp4",
    tools: ["React", "Node.js"],
  },
  // Add more projects here
];

// 3D Project Card Component
const ProjectCard3D = ({ project, position }) => {
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(project.thumbnail);

  const meshRef = useRef();

  // Subtle floating animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() / 2) * 0.1;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() / 3) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeBufferGeometry args={[2.5, 3.5]} />
      <meshStandardMaterial map={texture} toneMapped={false} />
      {hovered && (
        <Html center distanceFactor={1.5}>
          <div className="bg-black/80 text-white p-2 rounded-md text-center w-40 shadow-lg">
            <h3 className="font-bold">{project.title}</h3>
            <p className="text-sm mt-1">{project.identity}</p>
            <div className="flex flex-wrap justify-center gap-1 mt-1">
              {project.tools.map((t, i) => (
                <span key={i} className="px-1 text-xs bg-white/20 rounded">{t}</span>
              ))}
            </div>
          </div>
        </Html>
      )}
    </mesh>
  );
};

// Particle background component
const Particles = () => {
  const points = useRef();
  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
  }

  useFrame(({ mouse }) => {
    if (points.current) {
      points.current.rotation.y = mouse.x * 0.5;
      points.current.rotation.x = -mouse.y * 0.5;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.1} />
    </points>
  );
};

// Main Projects Showcase Page
const ProjectsShowcase: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);

  const filteredProjects = filter
    ? projects.filter((p) => p.identity === filter)
    : projects;

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      {/* Identity Filters */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {["Engineer", "Developer", "Technopreneur", "Creative Technologist"].map((id) => (
          <button
            key={id}
            className={`px-4 py-2 rounded-full border ${filter === id ? "bg-accent2 text-black" : "border-white/30"}`}
            onClick={() => setFilter(filter === id ? null : id)}
          >
            {id}
          </button>
        ))}
      </div>

      {/* 3D Canvas with lazy-loading */}
      <LazySection>
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <Suspense fallback={null}>
            {filteredProjects.map((proj, i) => {
              const angle = (i / filteredProjects.length) * Math.PI * 2;
              return <ProjectCard3D key={proj.id} project={proj} position={[Math.cos(angle) * 6, Math.sin(angle) * 2, Math.sin(angle) * 6]} />;
            })}
            <Particles />
          </Suspense>
          <OrbitControls enableZoom={true} enablePan={false} />
        </Canvas>
      </LazySection>

      {/* Floating Contact CTA */}
      <motion.div className="fixed bottom-8 right-8 z-50" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
        <Link to="/contact">
          <button className="px-6 py-3 rounded-full bg-accent2 text-black shadow-lg hover:shadow-2xl transition-all">
            Contact Me
          </button>
        </Link> 
      </motion.div>
    </div>
  );
};

export default ProjectsShowcase;

