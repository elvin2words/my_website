import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Engineer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="w-1/3 text-left">
                <Button variant="ghost" className="text-accent1 hover:text-accent1 flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5" />
                  Home
                </Button>
              </Link>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent1">
                  Electrical Engineer
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Technical & Academic Identity
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/developer">
                  <Button variant="ghost" className="text-accent2 hover:text-accent2 flex items-center gap-2 ml-auto">
                    Developer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold">BSc (Hons) in Electrical Engineering</h3>
                      <p className="opacity-70">University of Zimbabwe, 2019-2024</p>
                      <p className="text-sm mt-1 text-white/70">Upper Second Class – Focused on Power Systems, Renewable Energy, and Embedded Systems</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>Power Systems & Control Design</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>MATLAB/Simulink, AutoCAD Electrical, ETAP, PowerFactory</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>Embedded Systems & FPGA (Vivado, VHDL)</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>Python, C/C++, Altium Designer</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>Renewable Energy Integration & BESS</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div><span>Project Management & Technical Documentation</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Notable Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent1">BESS Optimization for Grid Stability</h3>
                      <p className="text-sm mt-1 text-white/70">
                        Designed and simulated an FPGA-based control system to optimize battery energy storage system (BESS) performance in renewables-integrated grids using MATLAB/Simulink and DIgSILENT PowerFactory.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent1">Portable Off-Grid Power System</h3>
                      <p className="text-sm mt-1 text-white/70">
                        Developed a solar + AC charged power backup system with integrated BMS and user interfaces using Altium and KiCAD.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent1">Automated Optical Inspection System</h3>
                      <p className="text-sm mt-1 text-white/70">
                        Created a YOLOv5+FPGA-based defect detection and rejection system with GUI and servo motor-driven sorting mechanism for packaging quality control.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent1">Transit Optimization System</h3>
                      <p className="text-sm mt-1 text-white/70">
                        Built a real-time smart public transportation system using Python, Node.js, and React with ML-based dispatch optimization.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mb-8">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold">Systems Design Engineer</h3>
                      <p className="opacity-70">Mazenel Industries, Oct 2024 – Present</p>
                      <p className="text-sm mt-1 text-white/70">
                        Designed and implemented renewable energy systems, PV array layouts, and battery storage integration compliant with IEEE, NEC, and local standards.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold">Electrical Engineering Intern</h3>
                      <p className="opacity-70">Delta Beverages, Mar 2023 – Aug 2023</p>
                      <p className="text-sm mt-1 text-white/70">
                        Supported power system maintenance, fault diagnostics, and plant equipment reporting in a fast-paced industrial environment.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold">Motor Rewinding Technician Assistant</h3>
                      <p className="opacity-70">Elgen Electrical, Jan 2023 – Mar 2023</p>
                      <p className="text-sm mt-1 text-white/70">
                        Carried out diagnostic testing, assisted in motor/generator dismantling and rewinding, and ensured precision insulation.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold">Projects R&D Officer</h3>
                      <p className="opacity-70">Enactus UZ, Aug 2021 – Aug 2022</p>
                      <p className="text-sm mt-1 text-white/70">
                        Researched, designed, and supported community impact projects through feasibility assessments and prototype development.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Engineer;
