import React from 'react';
import { ArrowLeft, ArrowRight, Code, Server, Database, Globe, Settings } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Developer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main id="developer" className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            {/* Header */}
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
                  Developer & Systems Architect
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
            
            {/* Dev Stacks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white  text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Code className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Frontend & UI Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>React, TypeScript, GSAP, Framer Motion</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Next.js, Tailwind CSS, Chakra UI, HTML5, SVG</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Figma → React UI pipelines</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>HTML, CSS, JavaScript, Bootstrap</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white  text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Server className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Backend & Control Logic</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Django, Flask, FastAPI, Node.js, Express</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Custom Python AI/ML integrations</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Control logic bridging physical systems and UI</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>REST APIs, WebSockets, MQTT pipelines</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            {/* Infra & Data */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white  text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Database className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Data & Cloud Systems</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>PostgreSQL, MongoDB, Firebase</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Raspberry Pi + IndexedDB + LocalStorage UIs</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Data pipelines for grid, EV, and inspection systems</span></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white  text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Globe className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Infrastructure & Deployment</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Docker, GitHub Actions</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Netlify, Render, Raspberry Pi orchestration</span></li>
                    <li className="flex items-center"><div className="h-2 w-2 rounded-full bg-accent2 mr-2"></div><span>Custom Linux Server Setup</span></li>
                  </ul>
                </CardContent>
              </Card>
            </div> */}
            
            <div className="mb-12">
              <Card className="bg-white  text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Projects Highlights (IqalInc)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-6">

                    <li>
                      <h3 className="font-semibold text-accent2">UFMS (Utility Grid Fault Management System)</h3>
                      <p className="text-sm mt-1">
                        Full-stack outage monitoring platform with live grid fault detection, automated technician dispatch, GIS-integrated mobile apps, and analytics backend.
                      </p>
                      <div className="text-xs mt-1 text-white/80">React • Node.js • PostgreSQL • Python • Leaflet • WebSockets</div>
                      <div className="text-xs mt-1 italic text-white/50">Architecture: REST APIs • Real-time Streams • Microservices • MVC</div>
                    </li>

                    <li>
                      <h3 className="font-semibold text-accent2">M.A.A.S / M.A.A.P Platforms</h3>
                      <p className="text-sm mt-1">
                        Early-stage modular collaboration platforms for dynamic matchmaking, task pipelines, and creative community discovery.
                      </p>
                      <div className="text-xs mt-1 text-white/80">React • TypeScript • Node.js • PostgreSQL • Socket.io</div>
                      <div className="text-xs mt-1 italic text-white/50">Architecture: REST + Event-Driven State • Role-based Microservices</div>
                    </li>

                    <li>
                      <h3 className="font-semibold text-accent2">Horizon: Travel UX for Africa</h3>
                      <p className="text-sm mt-1">
                        Web-first experience design for cultural exploration across Africa, with smart filtering, animations, and emotion-led UI.
                      </p>
                      <div className="text-xs mt-1 text-white/80">React • GSAP • Node.js • Supabase</div>
                      <div className="text-xs mt-1 italic text-white/50">SPA-first • SSR considered for SEO expansion</div>
                    </li>

                    <li>
                      <h3 className="font-semibold text-accent2">FPGA AOI Vision System</h3>
                      <p className="text-sm mt-1">
                        Vision + inspection software with GUI + control logic for mechanical rejector systems; YOLOv5 + sorting animations + Pi integration.
                      </p>
                      <div className="text-xs mt-1 text-white/80">Python • OpenCV • React • Raspberry Pi • C++</div>
                      <div className="text-xs mt-1 italic text-white/50">Architecture: Local Event System • Hardware-Synced MVC</div>
                    </li>

                    <li>
                      <h3 className="font-semibold text-accent2">EDDY (Lab Rats Inspired)</h3>
                      <p className="text-sm mt-1">
                        Interactive web-native assistant powered by emotion-aware expressions and dialogue, bridging frontend motion and contextual UX.
                      </p>
                      <div className="text-xs mt-1 text-white/80">React • GSAP • SVG • WebSocket • Express</div>
                      <div className="text-xs mt-1 italic text-white/50">SPA • SVG Motion Layer • Chat socket layer</div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Dev Philosophy */}
            <div className="mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex items-center">
                  <Settings className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Dev Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    My development mindset blends systems thinking with creative software architecture, bridging control theory with modern web-native tools.
                    I’m focused on building software ecosystems with essence of intelligence, modularity, resilience, expression, and purpose.
                    All grounded in: performance, clarity, and thoughtful interaction.
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

export default Developer;
