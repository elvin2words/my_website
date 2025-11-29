// src/pages/Developer.tsx

import React from "react";
import { ArrowLeft, ArrowRight, Code, Database, Globe, Headset, Server, Settings } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Animations
import { fadeUp, fadeUpParent, fadeUpItem } from "@/utils/animations";
//import data
import { stack, backend, projects, philosophy, coreIdentity1, coreIdentity2 } from "@/data/developer";

// import BackgroundEffect from '@/components/home/BackgroundEffect';

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";

// Optimized Background Effect
const BackgroundEffect: React.FC = React.memo(() => {
  const circles = [
    { className: "top-0 right-0 bg-accent1", size: "w-1/3 h-1/3" },
    { className: "bottom-0 left-0 bg-accent2", size: "w-1/3 h-1/3" },
    { className:
        "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent4",
      size: "w-1/3 h-1/3",
    },
  ];
  return (
    <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
      {circles.map((c, i) => (
        <div
          key={i}
          className={`absolute ${c.className} ${c.size} rounded-full blur-[150px] animate-pulse-slow will-change-transform`}
        />
      ))}
    </div>
  );
});
BackgroundEffect.displayName = "BackgroundEffect";


const Developer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <Header />

      <div className="relative z-10">
        <main
          id="developer"
          className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen"
        >
          <div className="container mx-auto max-w-7xl">
            
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center justify-between mb-4"
            >
              <div className="w-1/3 text-left">
                <Link
                  href="/"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <Button
                    variant="ghost"
                    className="text-accent2 hover:text-accent2 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent2">
                  Full Stack Developer 
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Crafting systems That Think, Adapt, and Connect
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link
                  href="/creative"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <Button
                    variant="ghost"
                    className="text-accent3 hover:text-accent3 flex items-center gap-2 ml-auto"
                  >
                    Creative
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>         
            
            <motion.div {...fadeUp} className="mb-10">
              <Card className="bg-white bg-opacity-5 text-white backdrop-blur-sm border border-white border-opacity-10 col-span-2">
                <CardHeader className="flex flex-row items-center justify-center">
                  <CardTitle>Core</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-row items-start justify-start">
                  <p className="text-sm md:text-base leading-relaxed">{coreIdentity1}</p>
                </CardContent>
                <CardContent className="flex flex-row items-endjustify-end">
                  <p className="text-sm md:text-base leading-relaxed">{coreIdentity2}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {/* Frontend & UI */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Code className="h-6 w-6 text-accent2 mr-2" />
                    <CardTitle>Stack & Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {stack.map((skill, idx) => (
                        <motion.li key={idx} variants={fadeUpItem}   className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 rounded-full bg-accent2 mr-2" />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </motion.ul>    
                  </CardContent>
                </Card>
              {/* </motion.div> */}

              {/* Backend */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Server className="h-6 w-6 text-accent2 mr-2" />
                    <CardTitle>Backend & Control Logic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {backend.map((skill, idx) => (
                      // {backend.filter((_, idx) => idx).map((skill, idx) => (
                        <motion.li key={idx} variants={fadeUpItem}  className="flex items-center text-sm md:text-base" >
                          <div className="h-2 w-2 rounded-full bg-accent2 mr-2" />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </motion.ul> 
                  </CardContent>
                </Card>
              </motion.div>
            {/* </motion.div> */}

            {/* Infra & Data */}
            {/* 
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
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
              </div> 
            </motion.div>
            */}

            {/* Projects */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport="viewport"
              className="mb-12"
            >
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Projects Highlights (IqalInc)</CardTitle>
                </CardHeader>
                <CardContent>
                  {projects.map((p, idx) => (
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      <motion.li key={idx} variants={fadeUpItem} >
                        <h3 className="font-semibold text-accent2">
                          {p.title}
                        </h3>
                        <p className=" text-sm md:text-base mt-1">{p.description}</p>
                        <div className="text-xs md:text-sm mt-1 text-white/80">
                          {p.tech.join(" • ")}
                        </div>
                        <div className="text-xs md:text-sm mt-1 italic text-white/50">
                          {p.architecture.join(" • ")}
                        </div>
                      </motion.li>
                    </motion.ul>  
                  ))}               
                </CardContent>
              </Card>
            </motion.div>

            {/* Philosophy */}
            <motion.div
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport="viewport"
              className="mb-10"
            >
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex items-center">
                  <Settings className="h-6 w-6 text-accent2 mr-2" />
                  <CardTitle>Dev Philosophy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed text-sm md:text-base">
                    {philosophy}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Developer;

