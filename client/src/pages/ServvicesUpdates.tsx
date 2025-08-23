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


