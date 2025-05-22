import React from 'react';
import { ArrowLeft } from 'lucide-react';
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
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="flex items-center text-accent1 hover:text-accent1">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-accent1">
                Electrical Engineer
              </h1>
              <p className="text-xl opacity-80 mb-8">
                Technical & Academic Identity
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold">Master of Electrical Engineering</h3>
                      <p className="opacity-70">University of Technology, 2018-2020</p>
                      <p className="text-sm mt-1">Specialized in Power Systems and Automation</p>
                    </li>
                    <li>
                      <h3 className="font-semibold">Bachelor of Electrical Engineering</h3>
                      <p className="opacity-70">State Technical University, 2014-2018</p>
                      <p className="text-sm mt-1">Graduated with Honors</p>
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
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Power System Analysis and Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Circuit Design and Simulation</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Embedded Systems Programming</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Industrial Automation Systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Signal Processing</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent1 mr-2"></div>
                      <span>Control Systems Design</span>
                    </li>
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
                      <h3 className="font-semibold text-accent1">Smart Grid Monitoring System</h3>
                      <p className="text-sm mt-1">
                        Designed and implemented a real-time monitoring system for power distribution networks
                        using IoT sensors and cloud-based analytics.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent1">Renewable Energy Integration</h3>
                      <p className="text-sm mt-1">
                        Developed control algorithms for integrating renewable energy sources into existing power grids
                        with minimal disruption and maximum efficiency.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent1">Autonomous Factory Control System</h3>
                      <p className="text-sm mt-1">
                        Created an automated control system for manufacturing processes, reducing human intervention
                        while improving safety and production rates.
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
                      <h3 className="font-semibold">Senior Electrical Engineer</h3>
                      <p className="opacity-70">TechPower Solutions, 2020-Present</p>
                      <p className="text-sm mt-1">
                        Leading design and implementation of power distribution systems for commercial buildings.
                        Responsible for a team of junior engineers and project coordination.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold">Electrical Design Engineer</h3>
                      <p className="opacity-70">Energy Systems Inc., 2018-2020</p>
                      <p className="text-sm mt-1">
                        Designed control systems for industrial automation. Specialized in power efficiency
                        and system reliability enhancements.
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
