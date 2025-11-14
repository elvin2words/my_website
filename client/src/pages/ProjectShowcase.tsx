// client/src/pages/ProjectShowcase.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectData from '@/data/projects'; // All projects array
import './ProjectShowcase.css';

const categories = ['electrical', 'design', 'code'];

export default function ProjectShowcase() {
  const [filter, setFilter] = useState<'electrical' | 'design' | 'code'>('code');

  const filtered = projectData.filter(p => p.type === filter);

  return (
    <section className="project-showcase">

      <span>
        I build, design, and innovate across energy systems, digital platforms, and emerging technologies. \
        Explore my portfolio across engineering, software development, and venture-driven innovation, \
        demonstrating practical impact and creative problem-solving.
      </span>
      <div className="project-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat as any)}
          >
            {cat === 'electrical' ? '⚡ Electrical' : cat === 'design' ? '🎨 Design' : '💻 Code'}
          </button>
        ))}
        <span>
          [cat1] Engineering Projects - (Electrical, Energy Systems, Embedded & Industrial Control)
          Project Template:
          Project Name – Timeline / Status
          Tools & Tech: MATLAB, Simulink, PowerFactory, Vivado, Altium, Python, STM32…
          Overview: 1–2 sentence description of purpose and context.
          Key Contributions:
          •	Bullet points for specific technical achievements or design contributions.
          Outcome & Impact:
          •	Bullet points or concise sentences explaining the results, efficiency gains, scalability, or societal benefit.
          Skills Highlighted: Power Systems, Embedded Design, Simulation, BMS, Industrial Automation, etc.
          Project Live Link / Repo: [GitHub, Figma, Live Demo, Download]

          Example:
          Optimizing Battery Energy Storage System (BESS) Performance – Jan 2025 – Present
          Tools & Tech: MATLAB/Simulink, Vivado FPGA, PowerFactory, Python
          Overview: Designed a real-time FPGA-based controller to optimize BESS performance for grid stability in renewable-heavy networks.
          Key Contributions:
          •	Developed adaptive predictive control algorithms to manage inverter response.
          •	Integrated 4 MWh BESS and 50 MW solar plant into a simulated urban feeder network.
          •	Conducted real-time hardware-in-the-loop testing of power electronics and battery management systems.
          Outcome & Impact:
          •	Achieved real-time grid stabilization within milliseconds.
          •	Improved BESS charge-discharge efficiency by ~12%.
          •	Scalable architecture applicable to national smart grid initiatives.
          Skills Highlighted: FPGA Design, Power Electronics, BESS Integration, Grid Simulation, Real-Time Control
        </span>

        <span>
          [cat2] Development & Digital Systems Projects
          (Web, AI, Software, IoT, Automation)
          Project Template:
          Project Name – Timeline / Status
          Tech Stack: React, Node.js, Python, Flask, Django, LangChain, OpenAI API, PostgreSQL…
          Overview: 1–2 sentences describing purpose, domain, and problem solved.
          Key Contributions:
          •	Core features or systems built.
          •	Integration of AI/ML, APIs, or IoT components.
          Outcome & Impact:
          •	How the system improved operations, usability, or performance.
          Skills Highlighted: Full-stack dev, AI integration, API design, UX/UI, Data Handling
          
          Example:
          Utility Field Deployment & Fault Management System – April 2025 – Present
          Tech Stack: React Native, Node.js, Python, PostgreSQL, WebSockets
          Overview: Mobile-first field management platform for utility teams to track faults, assets, and job dispatch in real time.
          Key Contributions:
          •	Developed live fault tracking and GIS-integrated asset mapping.
          •	Implemented AI-driven predictive fault analytics.
          •	Designed backend microservices for real-time data streaming.
          Outcome & Impact:
          •	Reduced response times for field technicians.
          •	Improved predictive maintenance efficiency.
          Skills Highlighted: React Native, Node.js, Python, Microservices, Real-Time Data, AI Analytics
        </span>

        <span>
          [cat3] Innovation & Venture Projects
          (Entrepreneurial, Technopreneurship, Social Impact, Startup Initiatives)
          Project Template:
          Project Name / Venture – Timeline / Status
          Focus Area: Renewable Energy, Smart Systems, AI, IoT, Social Innovation…
          Overview: 1–2 sentence description of vision, solution, and target impact.
          Key Contributions:
          •	Product design, MVP development, or prototyping work.
          •	Market entry or system strategy contributions.
          Outcome & Impact:
          •	Early results, societal or industry impact, scalability potential.
          Skills Highlighted: Systems Thinking, Product Design, Prototyping, Business Strategy, Innovation
          
          Example:
          Mazenel Power Hive – 2024 – Present
          Focus Area: Portable off-grid energy systems
          Overview: Modular, versatile DC–AC power system for mobile, remote, and emergency power deployment.
          Key Contributions:
          •	Designed scalable inverter and DC–DC converter stages.
          •	Built and optimized custom lithium-ion battery pack with BMS.
          •	Created user-friendly monitoring interface for energy flow and load management.
          Outcome & Impact:
          •	Achieved >90% power conversion efficiency under mixed loads.
          •	Enabled mobile, sustainable power for remote communities and industrial use.
          Skills Highlighted: Power Electronics, Embedded Systems, Renewable Integration, BMS, User-Centric Design
        </span>

      </div>

      <div className="project-grid">
        <AnimatePresence>
          {filtered.map(project => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {project.image && <img src={project.image} alt={project.title} className="project-img" />}
              <h3>{project.title}</h3>
              <p>{project.description}</p>

              <div className="project-tags">
                {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>

              <div className="project-actions">
                {project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>}
                {project.figma && <a href={project.figma} target="_blank" rel="noreferrer">Figma</a>}
                {project.link && <a href={project.link} target="_blank" rel="noreferrer">View</a>}
                {project.download && <a href={project.download}>Download</a>}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
 