// src/data/engineer.ts
// This file contains data related to the Engineer role, including expertise, projects, and professional philosophy.

export const coreIdentity1 = 
  "Trained in Electrical Engineering, my focus has evolved around power systems design, \
  control, and automation systems; renewable energy integration; embedded systems; \
  and the emerging synergy between digital intelligence and physical standardized grids and sustainability.";

export const coreIdentity2 = 
  "I specialize in the design and control of electrical power systems \
  — from grid-scale and microgrid optimization to embedded automation and battery energy management.";

export const education = [
  {
    degree: "BSc (Hons) in Electrical Engineering",
    school: "University of Zimbabwe, 2019 – 2024",
    details:
      "Honours with a concentration in Power Systems, Renewable Energy Integration, and Embedded Control Systems.",
  },
];

export const skills = [
  "Electrical Power Systems Design & Control (Grid + Microgrid)",
  "Simulation Tools: MATLAB/Simulink, PowerFactory, ETAP, AutoCAD Electrical",
  "Embedded Systems Design: STM32, VHDL, Vivado, Altium Designer, KiCAD",
  "Programming & Data: Python, C/C++, TypeScript, React, Node.js",
  "Battery Management Systems (BMS) & Renewable Integration",
  "Project Execution: Technical Docs, Standards Compliance (IEEE/NEC)",
];

export const projects = [
  {
    title: "Optimizing Battery Energy Storage for Grid Stability",
    description:
      "Engineered an FPGA-based real-time controller for battery energy storage systems (BESS) to enhance grid frequency and voltage stability in renewables-integrated environments, simulated using MATLAB/Simulink and PowerFactory.",
    extra: "Focused on control algorithms, power electronics interfacing, and grid code compliance.",
  },
  {
    title: "Mazenel Power Hive – A Portable Off-Grid Power System",
    description:
      "Designed a compact solar-AC hybrid power system with custom BMS and PCB design with >90% power conversion efficiency. Applied electrical systems, renewable integration, and embedded control.",
    extra: "Applied electrical systems, renewable integration, and embedded control."
  },
  {
    title: "Real-Time Monitoring & Adaptive Protection for RES Grids",
    description:
      "R&D for a proactive renewable-integrated protection system with dynamic fault detection and real-time operator interfaces.",
    extra:"Leveraged embedded systems, data analytics, and control theory."
  },
  {
    title: "Automated FPGA-Based Optical Inspection System",
    description:
      "Vision-assisted FPGA controller for industrial packaging QA. Implemented real-time image processing and defect detection algorithms on a Xilinx FPGA platform.",
    extra: "Industrial automation meets embedded AI - FPGA processing, YOLOv5, and servo-based automation."
  },
];

export const experience = [
  {
    title: "Systems Design Engineer",
    org: "Mazenel Industries",
    time: "Oct 2024 – Present",
    desc: "Designing renewable, automation and intelligent systems for industrial and field deployment — IEEE/NEC compliant for commercial and industrial usecases - with innovation in control and clean energy design.",
  },
  {
    title: "Electrical Engineering Intern",
    org: "Delta Beverages",
    time: "Mar 2023 – Aug 2023",
    desc: "Hands-on diagnostics, maintenance, and process optimization in a high-demand industrial environment.",
  },
  {
    title: "Motor Rewinding Technician Assistant",
    org: "Elgen Electrical",
    time: "Jan 2023 – Mar 2023",
    desc: "Motor/generator rewinding operations with precision testing, motor assembly, and insulation testing under senior technicians.",
  },
  {
    title: "Projects R&D Officer",
    org: "Enactus UZ",
    time: "Aug 2021 – Aug 2022",
    desc: "Led research and rapid prototyping efforts for sustainable community solutions, applying systems thinking to community-centered sustainable solutions.",
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
    date: "2024",
  },
  {
    title: "Embedded Systems Design with STM32",
    issuer: "Coursera",
    date: "2024",
  },
];

export const philosophy = 
  "To me, engineering is applied imagination — the bridge between physical reality and visionary possibility. \
  Every design I create, from microcontroller firmware to grid-level optimization, is part of a greater pursuit: \
  to enable smarter systems that empower people, improve reliability, and inspire sustainable progress. ";