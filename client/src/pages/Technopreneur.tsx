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
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Problem-Solving Approach</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Innovation-Driven Thinking</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Risk Assessment & Management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Market Opportunity Identification</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Resilience & Adaptability</span>
                    </li>
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
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Business Model Development</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Financial Planning & Analysis</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Go-to-Market Strategy</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Product-Market Fit Analysis</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Investment & Funding Knowledge</span>
                    </li>
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
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Team Building & Development</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Project & Product Management</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Strategic Planning</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Decision Making</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Stakeholder Communication</span>
                    </li>
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
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Technology Trend Analysis</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Product Development Cycles</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Technical Feasibility Assessment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Technology Stack Selection</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                      <span>Intellectual Property Strategy</span>
                    </li>
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
                      <h3 className="font-semibold text-accent4">Smart Home Automation Startup</h3>
                      <p className="text-sm mt-1">
                        Co-founded a venture focused on developing affordable and accessible smart home solutions
                        for energy efficiency and convenience. Currently in seed funding stage.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">EdTech Platform Concept</h3>
                      <p className="text-sm mt-1">
                        Developing an innovative education technology platform that uses AI to personalize 
                        learning experiences for STEM subjects. Currently in prototype and validation phase.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent4">Sustainability Innovation Challenge Winner</h3>
                      <p className="text-sm mt-1">
                        Led a team that won a regional sustainability innovation challenge with a concept for 
                        urban waste management using IoT and data analytics to optimize collection routes.
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
