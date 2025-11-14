//src/pages/Designer.tsx

import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Users, BarChart, 
  Target, Palette, Layout, Monitor, Film, PenTool, } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import { motion } from "framer-motion";

import { fadeUp, fadeUpParent, fadeUpItem,} from "@/utils/animations";
import { coreIdentity1, coreIdentity2, role, creativeDirection, creativeDimensions, portfolioHighlights, designEthos, processPhilosophy,} from "@/data/designer";


const BulletItem: React.FC<{ text: string }> = ({ text }) => (
  <li className="flex items-center">
    <span className="h-2 w-2 rounded-full bg-accent3 mr-2" aria-hidden="true" />
    <span>{text}</span>
  </li>
);

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  items: string[];
}> = ({ icon, title, items }) => (
  <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
    <CardHeader className="flex flex-row items-center">
      {icon}
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <BulletItem key={i} text={item} />
        ))}
      </ul>
    </CardContent>
  </Card>
);

{/* <InfoCard
  icon={<Layout className="h-6 w-6 text-accent3 mr-2" />}
  title="Tools & Visual Systems"
  items={[
    "Figma, Adobe XD, Framer Motion",
    "Illustrator, Photoshop, Lightroom",
    "Canva, CapCut, Blender",
    "React + SVG-based Interactive Interfaces",
  ]}
/> */}


const Designer: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main id="designer" className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
          
            {/* Header */}
            <motion.div
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >
              <div className="w-1/3 text-left">
                <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                  <Button variant="ghost" className="text-accent3 hover:text-accent3 flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>
 
              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent3">
                  {role.title}
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  {role.subtitle}
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/technopreneur" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >
                  <Button variant="ghost" className="text-accent4 hover:text-accent4 flex items-center gap-2 ml-auto">
                    Techno
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
            
            {/* Portfolio Highlights */}
            <motion.div
              className="mb-12"
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader>
                  <CardTitle>Portfolio Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.ul
                    variants={fadeUpParent}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    {portfolioHighlights.map(({ title, description }, i) => (
                      <motion.li key={i} variants={fadeUpItem} >
                        <h3 className="font-semibold text-accent3">{title}</h3>
                        <p className=" text-sm md:text-base mt-1 text-white/70">{description}</p>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Sections Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              variants={fadeUpParent} 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Creative Design Foundations */}
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Palette className="h-6 w-6 text-accent3 mr-2" />
                    <CardTitle>Creative Direction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    > 
                      {creativeDirection.map((item, i) => (
                        <motion.li key={i} variants={fadeUpItem}  className="flex items-center text-sm md:text-base"               >
                          <div className="h-2 w-2 rounded-full bg-accent3 mr-2" />
                          <span>{item}</span>
                          </motion.li>
                      ))}
                    </motion.ul> 
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tools & Visual Systems */}
              {/* <motion.div variants={fadeUpItem}> */}
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Layout className="h-6 w-6 text-accent3 mr-2" />
                    <CardTitle>Process Flow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {processPhilosophy.map((item, i) => (
                        <motion.li key={i} variants={fadeUpItem} className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 rounded-full bg-accent3 mr-2" />
                          <span>{item}</span>
                        </motion.li>
                      ))}                     
                    </motion.ul>
                  </CardContent>
                </Card>
              {/* </motion.div> */}
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12"
              variants={fadeUpParent}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {/* Digital System Interfaces */}
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Monitor className="h-6 w-6 text-accent3 mr-2" />
                    <CardTitle>Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {creativeDimensions.map((item, i) => (
                        <motion.li key={i} variants={fadeUpItem} className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 rounded-full bg-accent3 mr-2" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div> 

              {/* Creative Direction */}
              <motion.div variants={fadeUpItem}>
                <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                  <CardHeader className="flex flex-row items-center">
                    <Film className="h-6 w-6 text-accent3 mr-2" />
                    <CardTitle>Creative Direction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.ul
                      variants={fadeUpParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      className="space-y-2"
                    >
                      {creativeDirection.map((item, i) => (
                        <motion.li key={i} variants={fadeUpItem}  className="flex items-center text-sm md:text-base">
                          <div className="h-2 w-2 rounded-full bg-accent3 mr-2" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
            

            {/* Creative Design Ethos */}
            <motion.div
              className="mb-10"
              variants={fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
            >
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <PenTool className="h-6 w-6 text-accent3 mr-2" />
                  <CardTitle>Creative Design Ethos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className="text-white/90 leading-relaxed text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: designEthos
                        .replace(/\n/g, "<br/>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>")
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Designer;
