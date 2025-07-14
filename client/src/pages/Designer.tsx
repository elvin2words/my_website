import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users, BarChart, 
  Target, Palette, Layout, Monitor, Film, PenTool, } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Designer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main id="designer" className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
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
                  Creative Technologist
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Storytelling, UI Systems & Expressive Design
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/technopreneur">
                  <Button variant="ghost" className="text-accent4 hover:text-accent4 flex items-center gap-2 ml-auto">
                    Techno
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Section: Design Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Palette className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Creative Design Foundations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>UI/UX Design for Web & Mobile</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Visual Identity & Branding Systems</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Interactive & Inclusive Digital Aesthetics</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Component Libraries & Design Systems</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Conceptual Design Thinking</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              {/* Section: Tools */}
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Layout className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Tools & Visual Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Figma, Adobe XD, Framer Motion</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Illustrator, Photoshop, Lightroom</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Canva, CapCut, Blender</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>React + SVG-based Interactive Interfaces</span></li>
                    {/* <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>DaVinci Resolve (Visual storytelling + audio)</span></li> */}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Section: Digital Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Monitor className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Digital System Interfaces</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Web UI & Landing Pages (React, GSAP)</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Mobile-First App Design</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Custom Dashboards & Analytics UI</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Interactive & Immersive Experiences</span></li>
                    {/* <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Cross-Platform Design Assets</span></li> */}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Section: Creative Direction */}
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Film className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Creative Direction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Brand architecture & iconography</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Visual communication & storytelling</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Creative system architecture for digital products</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent3 mr-2"></div><span>Experimental motion and expression design</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Section: Projects */}
            <div className="mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Portfolio Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">
                    <li>
                      <h3 className="font-semibold text-accent3">Horizon Travel App UI</h3>
                      <p className="text-sm mt-1 text-white/70">
                        Designed a mobile-first travel discovery platform for African destinations, emphasizing cultural vibrancy and adaptive UI patterns with Ursovax.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">Transit System UX Interface</h3>
                      <p className="text-sm mt-1">
                        Designed a clean and intuitive UI for the smart transit web app, improving usability and reducing friction for first-time users.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent3">Brand Identity</h3>
                      <p className="text-sm mt-1">
                        Mazenel Industries: Minimalist & Industrial Elegance
                      </p>                      <p className="text-sm mt-1">
                        Usorvax Travel: Vibrant, Pan-African Identity
                      </p>                      <p className="text-sm mt-1">
                        Iqal Inc
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section: Personal Design Ethos */}
            <div className="mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <PenTool className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Creative Design Ethos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    I approach design as both 'system and story' - blending expressive visual language with functional clarity. Whether building responsive dashboards for technical systems or crafting soft motion for human-centered platforms, I strive to bring out the *soul of the product*. My creative process is rooted in **designing with intent**, prototyping rapidly, and shaping products that feel alive and intuitive.
                  </p>
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
