// src/components/Technopreneur.tsx
      
import React from "react";
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users, BarChart, Target } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";

import { motion } from "framer-motion";

import { fadeUp, fadeUpParent, fadeUpItem, } from "@/utils/animations";

import { role, visionStatement, coreCapabilities, leadershipAndTech, ventures, } from "@/data/technop";


const Technopreneur: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main
          id="technopreneur"
          className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen"
        >
          <div className="container mx-auto max-w-7xl">
            {/* Navigation & Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              {...fadeUp}
            >
            {/* <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >  */}
              <div className="w-1/3 text-left">
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button
                    variant="ghost"
                    className="text-accent4 hover:text-accent4 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent4">
                  {role.title}
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">{role.subtitle}</p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/human" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button
                    variant="ghost"
                    className="text-accent5 hover:text-accent5 flex items-center gap-2 ml-auto"
                  >
                    Human
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Vision Statement */}
            <motion.div {...fadeUp} className="mb-10">
              <Card className="bg-white bg-opacity-5 text-white backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Target className="h-6 w-6 text-accent4 mr-2" />
                  <CardTitle>Vision Statement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm md:text-base leading-relaxed">{visionStatement}</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Core Capabilities */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Lightbulb className="h-6 w-6 text-accent4 mr-2" />
                    <CardTitle>Entrepreneurial Mindset</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    > 
                      {coreCapabilities.entrepreneurialMindset.map((item) => (
                        <motion.li key={item} variants={fadeUpItem}  className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>
                          {item}
                        </motion.li>
                      ))}   
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <TrendingUp className="h-6 w-6 text-accent4 mr-2" />
                    <CardTitle>Business Acumen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {coreCapabilities.businessAcumen.map((item) => (
                        <motion.li key={item} variants={fadeUpItem}  className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 rounded-full bg-accent4 mr-2"></div>
                          {item}
                        </motion.li>
                      ))} 
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Leadership & Tech */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Users className="h-6 w-6 text-accent4 mr-2" />
                    <CardTitle>Leadership & Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >   
                      {leadershipAndTech.leadershipManagement.map((item) => (
                        <motion.li key={item} variants={fadeUpItem}  className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul> 
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <BarChart className="h-6 w-6 text-accent4 mr-2" />
                    <CardTitle>Technical Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {leadershipAndTech.technicalExpertise.map((item) => (
                        <motion.li key={item} variants={fadeUpItem}  className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 bg-accent4 rounded-full mr-2"></div>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul> 
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Ventures */}
            <motion.div {...fadeUp} className="mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Venture Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {ventures.map(({ title, description }) => (
                      <motion.li variants={fadeUpItem} key={title}>
                        <h3 className="font-semibold text-accent4">{title}</h3>
                        <p className="text-sm md:text-base mt-1">{description}</p>
                      </motion.li>
                    ))} 
                  </motion.ul>            
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Technopreneur;
