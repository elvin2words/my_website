import React from 'react';
import { ArrowLeft, Palette, Layout, Monitor, Film } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Designer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8">
              <Link href="/">
                <Button variant="ghost" className="flex items-center text-accent3 hover:text-accent3">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-poppins font-bold mb-4 text-accent3">
                Artistic Designer
              </h1>
              <p className="text-xl opacity-80 mb-8">
                Creative & UI/UX Design
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Palette className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Design Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>UI/UX Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Visual Identity & Branding</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Interaction Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Design Systems</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Conceptual Design</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Layout className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Figma & Adobe XD</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Adobe Creative Suite</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Sketch & InVision</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>3D Modeling Software</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Motion Graphics Tools</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Monitor className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Digital Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Mobile App Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Web Interface Design</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Dashboard & Data Visualization</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Design Systems & Component Libraries</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Responsive & Adaptive Design</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Film className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Creative Direction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Brand Identity Development</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Visual Storytelling</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Art Direction</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Content Strategy</span>
                    </li>
                    <li className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div>
                      <span>Visual Communication</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Portfolio Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent3">Fintech App Redesign</h3>
                      <p className="text-sm mt-1">
                        Completely redesigned the user interface and experience for a financial technology 
                        application, resulting in a 40% increase in user engagement and improved conversion rates.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">Corporate Brand Identity</h3>
                      <p className="text-sm mt-1">
                        Developed comprehensive brand guidelines and visual identity system for a tech startup,
                        including logo design, color palette, typography, and marketing materials.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">Interactive Data Dashboard</h3>
                      <p className="text-sm mt-1">
                        Designed an intuitive and visually appealing data dashboard for complex analytics,
                        making information easily digestible while maintaining visual hierarchy and user flow.
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

export default Designer;
