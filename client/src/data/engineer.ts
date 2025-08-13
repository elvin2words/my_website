// src/data/engineer.ts
// This file contains data related to the Engineer role, including expertise, projects, and professional philosophy.

export const education = [
  {
    degree: "BSc (Hons) in Electrical Engineering",
    school: "University of Zimbabwe, 2019 – 2024",
    details:
      "Upper Second Class Honours - with a concentration in Power Systems, Renewable Energy Integration, and Embedded Control Systems.",
  },
];

export const skills = [
  "Electrical Power Systems Design & Control (Grid + Microgrid)",
  "Simulation Tools: MATLAB/Simulink, PowerFactory, ETAP, AutoCAD Electrical",
  "Embedded Systems Design: STM32, VHDL, Vivado, Altium Designer, KiCAD",
  "Programming: Python, C/C++, TypeScript, React, Node.js",
  "Battery Management Systems (BMS) & Renewable Integration",
  "Project Execution: Technical Docs, Standards Compliance (IEEE/NEC)",
];

export const projects = [
  {
    title: "BESS Optimization for Grid Stability",
    description:
      "Engineered an FPGA-based real-time controller for battery energy storage systems (BESS) to enhance grid frequency and voltage stability in renewables-integrated environments, simulated using MATLAB/Simulink and PowerFactory.",
  },
  {
    title: "Portable Off-Grid Power System",
    description:
      "Designed a compact solar-AC hybrid off-grid power system with integrated battery management, PCB layouts in Altium/KiCAD, and user-centric interface elements for field deployment.",
  },
  {
    title: "Automated Optical Inspection System",
    description:
      "Built a real-time FPGA-assisted optical inspection system leveraging YOLOv5 for defect classification, integrated with servo-based rejection hardware and a custom GUI for packaging quality assurance.",
  },
  {
    title: "Transit Optimization System",
    description:
      "Developed a smart city-ready public transportation platform using Python, Node.js, and React with machine-learning-driven dispatch and routing optimization.",
  },
];

export const experience = [
  {
    title: "Systems Design Engineer",
    org: "Mazenel Industries",
    time: "Oct 2024 – Present",
    desc: "Spearheading design and deployment of renewable energy systems — including PV array layouts, BESS integration, and regulatory-compliant implementations (IEEE, NEC) — for commercial and industrial clients.",
  },
  {
    title: "Electrical Engineering Intern",
    org: "Delta Beverages",
    time: "Mar 2023 – Aug 2023",
    desc: "Assisted in power system diagnostics, predictive maintenance, and operational reporting in a high-demand industrial manufacturing facility.",
  },
  {
    title: "Motor Rewinding Technician Assistant",
    org: "Elgen Electrical",
    time: "Jan 2023 – Mar 2023",
    desc: "Supported motor/generator rewinding operations with precision testing, coil assembly, and insulation verification under mentorship of senior technicians.",
  },
  {
    title: "Projects R&D Officer",
    org: "Enactus UZ",
    time: "Aug 2021 – Aug 2022",
    desc: "Led research and rapid prototyping efforts for sustainable community solutions, applying systems thinking to social innovation and environmental resilience.",
  },
];

export const certifications = [
  {
    title: "Certified LabVIEW Associate Developer (CLAD)",
    issuer: "National Instruments",
    date: "2023",
  },
  {
    title: "MATLAB Fundamentals",
    issuer: "MathWorks",
    date: "2022",
  },
  {
    title: "Embedded Systems Design with STM32",
    issuer: "Coursera",
    date: "2021",
  },
];