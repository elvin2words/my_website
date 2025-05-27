import React from 'react';
import { ArrowLeft, ArrowRight, Code, Server, Database, Globe } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Developer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="w-1/3 text-left">
                <Link href="/">
                  <Button variant="ghost" className="text-accent2 hover:text-accent2 flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent2">
                  Systems Developer
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Software & Systems Design
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/designer">
                  <Button variant="ghost" className="text-accent3 hover:text-accent3 flex items-center gap-2 ml-auto">
                    Designer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Code className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Frontend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>React & Next.js</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Node.js + Express UI & Tailwind</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Python (Flask UI)</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>HTML, CSS, JavaScript, Bootstrap</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Server className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Backend Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Python (Django, FastAPI)</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Node.js & Express</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>REST APIs & WebSocket Servers</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>AI & ML Integrations (YOLO, TensorFlow)</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Database className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Database & Storage</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>MongoDB, Firebase</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>MySQL & PostgreSQL</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Realtime Cloud Sync & LocalStorage</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Globe className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>DevOps & Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Docker & Raspberry Pi Deployment</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>GitHub Actions & Bash Scripting</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Custom Linux Server Setup</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Featured Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                                        <li>
                      <h3 className="font-semibold text-accent2">Interactive Data Visualization Platform</h3>
                      <p className="text-sm mt-1">
                        Built a real-time data visualization dashboard using React, D3.js, and WebSockets to display
                        complex metrics and analytics for enterprise customers.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">Microservices Architecture Implementation</h3>
                      <p className="text-sm mt-1">
                        Refactored a monolithic application into a scalable microservices architecture using 
                        Node.js, Docker, and Kubernetes, resulting in improved performance and maintainability.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">Transit Optimization System</h3>
                      <p className="text-sm mt-1">
                        Developed a web-based platform using Python, React, and Node.js for real-time route planning and schedule optimization with ML-based dispatch.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">FPGA Optical Inspection System</h3>
                      <p className="text-sm mt-1">
                        Engineered a defect detection and rejection system using YOLOv5, Raspberry Pi + FPGA board integration, with real-time GUI and auto-sorting.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent2">M.A.A.S & M.A.A.P Systems</h3>
                      <p className="text-sm mt-1">
                        Built intelligent B2B systems to connect manufacturers, service providers, and innovators using a dynamic recommendation and collaboration engine.
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

export default Developer;
