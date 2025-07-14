import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Engineer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main id="engineer" className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">

            {/* Nav + Title */}
            <motion.div 
              {...fadeUp}
              className="flex items-center justify-between mb-12"
            >
              <Link href="/" className="w-1/3 text-left">
                <Button variant="ghost" className="text-accent1 hover:text-accent1 flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Home
                </Button>
              </Link>

              <div className="w-1/3 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-accent1">
                  Electrical Engineer
                </h1>
                <p className="text-base md:text-lg opacity-80 mt-1">Technical & Academic Identity</p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/developer">
                  <Button variant="ghost" className="text-accent2 hover:text-accent2 flex items-center gap-2 ml-auto">
                    Developer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Education & Skills */}
            <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold">BSc (Hons) in Electrical Engineering</h3>
                      <p className="opacity-70">University of Zimbabwe, 2019–2024</p>
                      <p className="text-sm mt-1 text-white/70">
                        Upper Second Class Honours - with a concentration in Power Systems, Renewable Energy Integration, and Embedded Control Systems.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Electrical Power Systems Design & Control (Grid + Microgrid)",
                      "Simulation Tools: MATLAB/Simulink, PowerFactory, ETAP, AutoCAD Electrical",
                      "Embedded Systems Design: STM32, VHDL, Vivado, Altium Designer, KiCAD",
                      "Programming: Python, C/C++, TypeScript, React, Node.js",
                      "Battery Management Systems (BMS) & Renewable Integration",
                      "Project Execution: Technical Docs, Standards Compliance (IEEE/NEC)"
                    ].map((skill, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-4 w-2 rounded-full bg-accent1 mr-2" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Projects */}
            <motion.div {...fadeUp} className="mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Notable Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {[
                      {
                        title: "BESS Optimization for Grid Stability",
                        description:
                          "Engineered an FPGA-based real-time controller for battery energy storage systems (BESS) to enhance grid frequency and voltage stability in renewables-integrated environments, simulated using MATLAB/Simulink and PowerFactory."
                      },
                      {
                        title: "Portable Off-Grid Power System",
                        description:
                          "Designed a compact solar-AC hybrid off-grid power system with integrated battery management, PCB layouts in Altium/KiCAD, and user-centric interface elements for field deployment."
                      },
                      {
                        title: "Automated Optical Inspection System",
                        description:
                          "Built a real-time FPGA-assisted optical inspection system leveraging YOLOv5 for defect classification, integrated with servo-based rejection hardware and a custom GUI for packaging quality assurance."
                      },
                      {
                        title: "Transit Optimization System",
                        description:
                          "Developed a smart city-ready public transportation platform using Python, Node.js, and React with machine-learning-driven dispatch and routing optimization."
                      }
                    ].map((proj, i) => (
                      <li key={i}>
                        <h3 className="font-semibold text-accent1">{proj.title}</h3>
                        <p className="text-sm mt-1 text-white/70">{proj.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Experience */}
            <motion.div {...fadeUp} className="mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    {[
                      {
                        title: "Systems Design Engineer",
                        org: "Mazenel Industries",
                        time: "Oct 2024 – Present",
                        desc: "Spearheading design and deployment of renewable energy systems — including PV array layouts, BESS integration, and regulatory-compliant implementations (IEEE, NEC) — for commercial and industrial clients."
                      },
                      {
                        title: "Electrical Engineering Intern",
                        org: "Delta Beverages",
                        time: "Mar 2023 – Aug 2023",
                        desc: "Assisted in power system diagnostics, predictive maintenance, and operational reporting in a high-demand industrial manufacturing facility."
                      },
                      {
                        title: "Motor Rewinding Technician Assistant",
                        org: "Elgen Electrical",
                        time: "Jan 2023 – Mar 2023",
                        desc: "Supported motor/generator rewinding operations with precision testing, coil assembly, and insulation verification under mentorship of senior technicians."
                      },
                      {
                        title: "Projects R&D Officer",
                        org: "Enactus UZ",
                        time: "Aug 2021 – Aug 2022",
                        desc: "Led research and rapid prototyping efforts for sustainable community solutions, applying systems thinking to social innovation and environmental resilience."
                      }
                      
                    ].map((job, i) => (
                      <li key={i}>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="opacity-70">{job.org}, {job.time}</p>
                        <p className="text-sm mt-1 text-white/70">{job.desc}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </main>
      </div>
    </>
  );
};

export default Engineer;
