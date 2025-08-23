// pages/Services.tsx
import React, { useState } from "react";
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

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs border border-white/20 bg-white/5 ${className}`}>{children}</span>
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

const CTA: React.FC<React.PropsWithChildren<{ to: string; variant?: "primary" | "ghost"; className?: string }>> = ({ to, children, variant = "primary", className = "" }) => (
  <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    <button className={variant === "primary" ? `inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent2 text-white hover:opacity-90 transition shadow ${className}` : `inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 text-white hover:bg-white/10 transition ${className}`}>
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
    subtitle: "Design and optimization of solar PV, storage, and power distribution systems.",
    whatIDo: ["Hybrid PV + BESS design and simulations","Grid-tied/off-grid microgrids","Substation & protection schemes","Load flow, fault analysis (MATLAB/DIgSILENT)","Energy yield forecasting"],
    tools: ["MATLAB/Simulink","DIgSILENT","AutoCAD","PVsyst","PSCAD"],
    workLinkText: "See My Energy Projects",
    workLinkTo: "/projects?tag=energy",
  },
  {
    id: "embedded",
    icon: <Cpu className="h-5 w-5" />,
    title: "Embedded & IoT Systems",
    subtitle: "Smart devices and control systems bridging hardware & software.",
    whatIDo: ["Firmware for STM32, ESP32, ARM Cortex","Motor control (FOC, VFD, PWM inverters)","IoT telemetry (MQTT, Modbus, LoRa, Zigbee, Wi-Fi)","PCB prototyping & debugging","Energy/EVSE device communication"],
    tools: ["C/C++","FreeRTOS","MATLAB CodeGen","Altium","KiCad"],
    workLinkText: "Explore IoT & Embedded Work",
    workLinkTo: "/projects?tag=embedded",
  },
  {
    id: "software",
    icon: <Code2 className="h-5 w-5" />,
    title: "Software Development",
    subtitle: "Full-stack software powering engineering systems & apps.",
    whatIDo: ["Web apps & dashboards (React, Node.js, Python/Django)","Energy monitoring & fault platforms","Custom APIs & integrations for IoT","Portfolio/business websites & portals"],
    tools: ["React","Node.js","Django/Flask","PostgreSQL","Firebase"],
    workLinkText: "See Software Projects",
    workLinkTo: "/projects?tag=software",
  },
  {
    id: "design",
    icon: <PenTool className="h-5 w-5" />,
    title: "Engineering Design & Simulation",
    subtitle: "Professional schematics, models, and system documentation.",
    whatIDo: ["MATLAB/Simulink modeling of power & control systems","PCB/circuit design & simulation","Electrical schematics & layouts (AutoCAD Electrical)","Control tuning (PI/PID, MPPT, FOC)"],
    tools: ["MATLAB","LTspice","Multisim","AutoCAD Electrical","Python"],
    workLinkText: "View Engineering Design Work",
    workLinkTo: "/projects?tag=design",
  },
  {
    id: "architecture",
    icon: <Home className="h-5 w-5" />,
    title: "Electrical/Architectural House Plans",
    subtitle: "Energy-ready building designs for residential & small commercial projects.",
    whatIDo: ["House wiring schematics & load balancing","PV-ready and backup-ready provisions","2D architectural drafting & visualization","Compliance with safety/building standards"],
    tools: ["AutoCAD","Revit","SketchUp"],
    workLinkText: "See House Plan Designs",
    workLinkTo: "/projects?tag=architecture",
  },
];

const ServicesPage: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const toggleExpand = (id: string) => setExpanded(expanded === id ? null : id);

  return (
    <div className="relative min-h-screen text-white">
      {/* Hero */}
      <section className="pt-28 md:pt-32 pb-8 px-4 text-center">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Services</h1>
          <p className="mt-3 text-white/80 md:text-lg">
            End-to-end solutions across <span className="text-accent2">Energy Systems</span>, <span className="text-accent3">Embedded & IoT</span>, and <span className="text-accent4">Software</span> — from modeling and design to implementation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Badge>Freelance</Badge>
            <Badge>Consulting</Badge>
            <Badge>Open to Full-time</Badge>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <CTA to="/contact-profile-card">Contact Me</CTA>
            <CTA to="/projects" variant="ghost">View Projects</CTA>
            <CTA to="/resume" variant="ghost">Resume/CV</CTA>
          </div>
        </motion.div>
      </section>

      {/* Services Grid / List */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 space-y-8">
            {services.map((s) => (
              <motion.article
                key={s.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6 shadow-sm backdrop-blur cursor-pointer"
                onClick={() => toggleExpand(s.id)}
              >
                <SectionHead icon={s.icon} title={s.title} subtitle={s.subtitle} id={s.id} />

                {expanded === s.id && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                      <h3 className="font-semibold mb-2">What I Do</h3>
                      <ul className="space-y-1.5 text-sm text-white/85 list-disc pl-5">
                        {s.whatIDo.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Tools & Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {s.tools.map((t, i) => <Badge key={i}>{t}</Badge>)}
                      </div>
                    </div>
                  </div>
                )}

                {expanded === s.id && (
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <CTA to={s.workLinkTo}>{s.workLinkText}</CTA>
                    <a href={`#${s.id}`} className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
                      Permalink <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.article>
            ))}
          </div>

          {/* Right Sticky Panel */}
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="font-semibold mb-3">Quick Links</h3>
                <nav className="space-y-2 text-sm">
                  {services.map((s) => <a key={s.id} href={`#${s.id}`} className="block hover:underline">{s.title}</a>)}
                  <Link to="/projects"><a className="block hover:underline">Projects</a></Link>
                  <Link to="/resume"><a className="block hover:underline">Resume / CV</a></Link>
                  <Link to="/contact-profile-card"><a className="block hover:underline">Contact</a></Link>
                </nav>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <h3 className="font-semibold mb-2">Why Work With Me?</h3>
                <ul className="text-sm text-white/85 list-disc pl-5 space-y-1.5">
                  <li>Multidisciplinary: Electrical, Embedded, and Software.</li>
                  <li>Simulation-first approach reduces cost & risk.</li>
                  <li>Future-ready: EVSE, microgrids, smart homes, IoT.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <CTA to="/contact-profile-card">Let’s Work Together</CTA>
                  <a href="mailto:youremail@example.com" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"><Mail className="h-4 w-4" /> Email Me</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-10 px-4 border-t border-white/10 bg-white/5">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Ready to build something great?</h3>
            <p className="text-white/70 text-sm">Available for freelance, consulting, and open to full-time roles.</p>
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
