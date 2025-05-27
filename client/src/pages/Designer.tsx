import React from 'react';
import { ArrowLeft, ArrowRight, Palette, Layout, Monitor, Film } from 'lucide-react';
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
            <div className="flex items-center justify-between mb-8">
              <div className="w-1/3 text-left">
                <Link href="/">
                  <Button variant="ghost" className="text-accent3 hover:text-accent3 flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent3">
                  Artistic Designer
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Creative & UI/UX Design
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/technopreneur">
                  <Button variant="ghost" className="text-accent4 hover:text-accent4 flex items-center gap-2 ml-auto">
                    Technopreneur
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Palette className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Design Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>UI/UX Design for Web & Mobile</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Visual Identity & Branding Systems</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Interaction & Experience Design</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Component Libraries & Design Systems</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Conceptual Design Thinking</span></li>
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
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Figma, Adobe XD</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Illustrator, Photoshop, Lightroom</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Canva, Inkscape</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Blender & SketchUp (3D Modeling)</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>DaVinci Resolve, CapCut</span></li>
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
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Responsive Web Interfaces</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Mobile-First App Design</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Data Dashboards & Analytics UI</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Interactive & Immersive Experiences</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Cross-Platform Design Assets</span></li>
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
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Brand Communication & Messaging</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Visual & Narrative Storytelling</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Content Planning & Campaigns</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Design Mentorship & Team Leadership</span></li>
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
                      <h3 className="font-semibold text-accent3">Transit System UX Interface</h3>
                      <p className="text-sm mt-1">
                        Designed a clean and intuitive UI for the smart transit web app, improving usability and reducing friction for first-time users.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">Mazenel Brand System</h3>
                      <p className="text-sm mt-1">
                        Developed a brand identity system for Mazenel Industries, including logo design, iconography, and internal documentation templates.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">FPGA AOI GUI & Animations</h3>
                      <p className="text-sm mt-1">
                        Created real-time interface and feedback animations for the FPGA AOI system, enhancing user control and visibility into sorting events.
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
