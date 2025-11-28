// src/pages/JustElvin.tsx 

import React from "react";
import { ArrowLeft, ArrowRight, Heart, Music, Book, Globe, Camera } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundEffect from "@/components/home/BackgroundEffect";

import { role, introNarrative, hobbiesInterests, learningGrowth, causesISupport, creativeExpression, } from "@/data/elvinbeyond";
import { fadeUp, fadeUpParent, fadeUpItem } from "@/utils/animations";


const JustElvin: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            
            {/* Navigation & Header */}
            <motion.div
              className="flex items-center justify-between mb-8"
              {...fadeUp}
            >
              <div className="w-1/3 text-left">
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  <Button
                    variant="ghost"
                    className="text-accent5 hover:text-accent5 flex items-center gap-2"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent5">
                  {role.title}
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">{role.subtitle}</p>
              </div>

              <div className="w-1/3 text-right">
                <Link
                  href="/engineer"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <Button
                    variant="ghost"
                    className="text-accent1 hover:text-accent1 flex items-center gap-2 ml-auto"
                  >
                    Engineer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Intro Narrative */}
            <motion.div
              className="mb-12"
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Heart className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>What Makes Me Tick</CardTitle>
                </CardHeader>
                <CardContent>
                  {introNarrative.map((para, i) => (
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >    
                      <p key={i} className="mb-6 leading-relaxed text-sm md:text-base">
                        {para}
                      </p>
                    </motion.ul>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sections: Hobbies, Learning, Causes, Creative Expression */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Hobbies & Interests */}
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Music className="h-6 w-6 text-accent5 mr-2" />
                    <CardTitle>Creative & Explorative</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {hobbiesInterests.map(({ title, description }, i) => (
                      <motion.ul
                        variants={fadeUpParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <motion.li key={i} variants={fadeUpItem} >
                          <h3 className="font-semibold text-accent5">{title}</h3>
                          <p className="text-sm md:text-base mt-1">{description}</p>
                        </motion.li >
                      </motion.ul>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Learning & Growth */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Book className="h-6 w-6 text-accent5 mr-2" />
                    <CardTitle>Mindset Development & Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {learningGrowth.map(({ title, description }, i) => (
                      <motion.ul
                        variants={fadeUpParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <motion.li key={i} variants={fadeUpItem} >
                          <h3 className="font-semibold text-accent5">{title}</h3>
                          <p className="text-sm md:text-base mt-1">{description}</p>
                        </motion.li>
                      </motion.ul>
                    ))}
                  </CardContent>
                </Card>
              {/* </motion.div> */}
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10"
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Causes I Support */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Globe className="h-6 w-6 text-accent5 mr-2" />
                    <CardTitle>Causes I Care About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {causesISupport.map(({ title, description }, i) => (
                      <motion.ul
                        variants={fadeUpParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <motion.li key={i} variants={fadeUpItem} >
                          <h3 className="font-semibold text-accent5">{title}</h3>
                          <p className="text-sm md:text-base mt-1">{description}</p>
                        </motion.li>
                      </motion.ul>
                    ))}
                  </CardContent>
                </Card>
              {/* </motion.div> */}

              {/* Creative Expression */}
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Camera className="h-6 w-6 text-accent5 mr-2" />
                    <CardTitle>Creative Expression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {creativeExpression.map(({ title, description }, i) => (
                        <motion.ul
                          variants={fadeUpParent}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true }}
                          className="space-y-2"
                        >
                          <motion.li key={i} variants={fadeUpItem} >
                            <h3 className="font-semibold text-accent5">{title}</h3>
                            <p className="text-sm md:text-base mt-1">{description}</p>
                          </motion.li>
                        </motion.ul>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default JustElvin;
