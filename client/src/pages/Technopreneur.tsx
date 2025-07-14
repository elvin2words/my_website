import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users, BarChart, Target, } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Technopreneur: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main id="technopreneur" className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            {/* Navigation & Header */}
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
                  Budding Technopren
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Innovation & Venture Building
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

            {/* Vision Statement */}
            <div className="mb-10">
              <Card className="bg-white bg-opacity-5 text-white backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Target className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Vision Statement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base md:text-lg leading-relaxed">
                    Driving forward purposeful innovation through smart systems, creative engineering, and human-centered technology across energy, AI, automation, and digital ecosystems.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Core Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Lightbulb className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Entrepreneurial Mindset</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Systems Thinking & Innovation</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Lean Startup Methodology</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Venture Design Across Energy, AI, and AgTech</li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Strategic Ideation & Planning</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Experimentation + Prototyping Culture</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <TrendingUp className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Business Acumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Business Modeling for Smart Systems & Platforms</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Pitch Decks & Market Validation</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Funding Pathways & Partnerships</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Product-Market Fit Discovery</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div><span>Impact-Oriented Scaling & Ecosystem Building</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Leadership & Tech */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Users className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Leadership & Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Startup Team Formation & Vision Alignment</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Agile Product Development</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Mentorship & Community Engagement</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Collaborative & Cross-disciplinary Projects</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <BarChart className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Technical Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Embedded Systems, FPGA, & Automation</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>EV Systems, BMS, and Energy Platforms</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>AI-Driven Analytics & Control Systems</li>
                    <li className="flex items-center"><div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>Cloud/Edge Integration for Smart Grids</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Ventures */}
            <div className="mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Venture Portfolio</CardTitle>
                </CardHeader>
                 <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent4">Mazenel Industries</h3>
                      <p className="text-sm mt-1">
                        Lead founder of a systems-oriented startup exploring clean energy integration, automation, drone services, and smart logistics. Currently prototyping mobile energy systems (like PowerHive) and embedded control platforms—targeting sectors like smart farming and industrial automation.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">IQAL Inc.</h3>
                      <p className="text-sm mt-1">
                        A data-intelligence venture focused on automation, analytics, and smart system design. Core projects include CASSIE (adaptive automation platform), Horizon (AI-enhanced travel tech), EddyUI, and UFMS (Utility Fault Management System).
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Telqon Technologies</h3>
                      <p className="text-sm mt-1">
                        Exploratory R&D lab targeting next-gen communications, connectivity frameworks, edge computing, and network-aware AI for both urban and rural innovation ecosystems.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Usorvax</h3>
                      <p className="text-sm mt-1">
                        Experimental venture focused on speculative tech and immersive experiences—currently leading the Usorvax Travel & Tourism platform which reimagines cultural exchange through smart, story-driven travel tech.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Youth STEM 2030 & Enactus UZ</h3>
                      <p className="text-sm mt-1">
                        Co-led youth-centered innovation projects fostering sustainable tech, social entrepreneurship, and community transformation through hands-on initiatives.
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
