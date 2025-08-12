// sr/pages/Engineer.tsx

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

// Animations
import { fadeUp, fadeUpParent, fadeUpItem } from '@/utils/animations';
// Import data
import { education, skills, projects, experience } from "@/data/engineer";

// Shared styles
const cardBase =
  'bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10';
  // "bg-white/5 text-white backdrop-blur-sm border border-white/10";


// ===== Component =====
const Engineer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main
          id="engineer"
          className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen"
        >
          <div className="container mx-auto max-w-7xl">
            
            {/* ===== Nav + Title ===== */}
            {/* <motion.div {...fadeUp} className="flex items-center justify-between mb-12"> */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >
              {/* Back */}
              <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-1/3 text-left">
                <Button
                  variant="ghost"
                  className="text-accent1 hover:text-accent1 flex items-center gap-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Home
                </Button>
              </Link>

              {/* Title */}
              <div className="w-1/3 text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-poppins text-accent1">
                  Electrical Engineer
                </h1>
                <p className="text-base md:text-lg opacity-80 mt-1">
                  Technical & Academic Identity
                </p>
              </div>

              {/* Next */}
              <div className="w-1/3 text-right">
                <Link href="/developer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                  <Button
                    variant="ghost"
                    className="text-accent2 hover:text-accent2 flex items-center gap-2 ml-auto"
                  >
                    Developer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* ===== Education & Skills ===== */}
            {/* <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"> */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            >
              {/* Education */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className={cardBase}>
                  <CardHeader>
                    <CardTitle>Education</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {education.map((edu, i) => (
                      <motion.ul
                        variants={fadeUpParent}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <motion.li key={i} variants={fadeUpItem} >
                          <h3 className="font-semibold">{edu.degree}</h3>
                          <p className="opacity-70">{edu.school}</p>
                          <p className=" text-sm md:text-base mt-1 text-white/70">{edu.details}</p>
                        </motion.li>
                      </motion.ul>
                    ))}
                  </CardContent>
                </Card>
              {/* </motion.div> */}

              {/* Skills */}
              <motion.div variants={fadeUpItem}>
                <Card className={cardBase}>
                  <CardHeader>
                    <CardTitle>Technical Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {skills.map((skill, index) => (
                        <motion.li
                          key={index}
                          variants={fadeUpItem}
                          className="flex items-center  text-sm md:text-base text-white/90"
                        >
                          <div className="h-4 w-2 rounded-full bg-accent1 mr-2" />
                          <span>{skill}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>

            </motion.div>

            {/* ===== Projects ===== */}
            {/* <motion.div {...fadeUp} className="mb-12"> */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-12"
            > 
              <Card className={cardBase}>
                <CardHeader>
                  <CardTitle>Notable Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    variants={fadeUpParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {projects.map((proj, i) => (
                      <motion.li key={i} variants={fadeUpItem}>
                        <h3 className="font-semibold text-accent1">
                          {proj.title}
                        </h3>
                        <p className="text-sm md:text-base mt-1 text-white/70">
                          {proj.description}
                        </p>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* ===== Experience ===== */}
            {/* <motion.div {...fadeUp} className="mb-10"> */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mb-10"
            >
              <Card className={cardBase}>
                <CardHeader>
                  <CardTitle>Professional Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    variants={fadeUpParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {experience.map((job, i) => (
                      <motion.li key={i} variants={fadeUpItem}>
                        <h3 className="font-semibold">{job.title}</h3>
                        <p className="opacity-70">
                          {job.org}, {job.time}
                        </p>
                        <p className=" text-sm md:text-base mt-1 text-white/70">
                          {job.desc}
                        </p>
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

export default Engineer;
