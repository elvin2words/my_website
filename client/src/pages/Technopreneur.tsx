import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users, BarChart } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Technopreneur: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="w-1/3 text-left">
                <Link href="/">
                  <Button variant="ghost" className="text-accent4 hover:text-accent4 flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent4">
                  Budding Technopreneur
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Innovation & Business
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/human">
                  <Button variant="ghost" className="text-accent5 hover:text-accent5 flex items-center gap-2 ml-auto">
                    Human
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Lightbulb className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Entrepreneurial Mindset</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Systems Thinking & Innovation</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Lean Startup Methodology</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Market Gap Identification</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Strategic Ideation & Planning</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Growth Mindset & Resilience</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <TrendingUp className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Business Acumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Business Modeling & Strategy</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Pitch Decks & Market Validation</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Funding Pathways & Partnerships</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Product-Market Fit Analysis</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Revenue Stream Exploration</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Users className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Leadership & Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Cross-functional Team Building</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Agile Project Leadership</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Vision & Mission Alignment</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Collaboration & Delegation</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Strategic Partnerships</span></li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <BarChart className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Technical Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Systems Architecture & Integration</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>IoT & Automation Platforms</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Prototyping & Validation</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Data-Driven Optimization</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Sustainable Tech Solutions</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Venture Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent4">Mazenel Industries</h3>
                      <p className="text-sm mt-1">
                        Founder of an innovation-driven company providing intelligent, sustainable, and integrated solutions across industries. Operates through AI-powered platforms like MAAS & MAAP for automation and collaboration.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">IQAL Inc.</h3>
                      <p className="text-sm mt-1">
                        Co-founded a data-intelligent platform offering solutions in business intelligence, security, agriculture, and automation by leveraging intelligent systems and data analytics.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Youth STEM 2030 & Enactus UZ</h3>
                      <p className="text-sm mt-1">
                        Key contributor to sustainable and tech-driven youth initiatives. Focused on problem-solving, leadership, and community empowerment through innovation and entrepreneurship.
                      </p>
                    </li>
                     <li>
                      <h3 className="font-semibold text-accent4">IQAL Inc.</h3>
                      <p className="text-sm mt-1">
                        Co-founded a platform specializing in intelligent algorithm-driven solutions for automation, data analytics, and systems integration across agriculture, manufacturing, and security sectors.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Telqon Technologies</h3>
                      <p className="text-sm mt-1">
                        A rising-edge R&D lab focused on futuristic consumer and industrial technologies, including embedded AI, smart devices, and connectivity frameworks.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Usorvax</h3>
                      <p className="text-sm mt-1">
                        An exploratory venture focusing on experimental innovation, merging biotechnology, energy, and digital ecosystems to reimagine how humans interact with advanced tech.
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

export default Technopreneur;
