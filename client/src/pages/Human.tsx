import React from 'react';
import { ArrowLeft, ArrowRight, Heart, Music, Book, Globe, Camera } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackgroundEffect from '@/components/home/BackgroundEffect';

const Human: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between mb-8">
              <div className="w-1/3 text-left">
                <Link href="/">
                  <Button variant="ghost" className="text-accent5 hover:text-accent5 flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" />
                    Home
                  </Button>
                </Link>
              </div>

              <div className="w-1/3 text-center">
                <h1 className="text-2xl md:text-3xl font-poppins font-bold text-accent5">
                  Human Being
                </h1>
                <p className="text-sm md:text-base opacity-80 mt-1">
                  Personal & Reflective Side
                </p>
              </div>

              <div className="w-1/3 text-right">
                <Link href="/engineer">
                  <Button variant="ghost" className="text-accent1 hover:text-accent1 flex items-center gap-2 ml-auto">
                    Engineer
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Heart className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>What Makes Me Tick</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 leading-relaxed">
                    Beyond the professional titles and technical skills, I'm driven by curiosity and a desire to create meaningful 
                    impact through the intersection of technology and human experience. I believe in continuous growth, both personally 
                    and professionally, and find joy in connecting seemingly disparate ideas into innovative solutions.
                  </p>
                  <p className="leading-relaxed">
                    My approach to life balances analytical thinking with creative exploration, allowing me to see patterns and 
                    possibilities others might miss. I value authenticity, meaningful connections, and experiences that challenge 
                    my perspectives and expand my understanding of the world.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Music className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Hobbies & Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Music Production</h3>
                      <p className="text-sm mt-1">
                        Experimenting with electronic music production, blending digital and analog instruments
                        to create ambient soundscapes.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Adventure Travel</h3>
                      <p className="text-sm mt-1">
                        Exploring off-the-beaten-path destinations, immersing in different cultures,
                        and finding inspiration in diverse landscapes and communities.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Culinary Exploration</h3>
                      <p className="text-sm mt-1">
                        Discovering new flavors and techniques through cooking, with a special interest
                        in fusion cuisine that blends traditions across cultures.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Book className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Learning & Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Continuous Education</h3>
                      <p className="text-sm mt-1">
                        Always engaged in learning something new, from online courses on emerging technologies
                        to philosophical readings that expand my worldview.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Mindfulness Practice</h3>
                      <p className="text-sm mt-1">
                        Dedicated to daily meditation and reflection, helping to maintain balance and clarity
                        amidst the fast-paced technology landscape.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Community Workshops</h3>
                      <p className="text-sm mt-1">
                        Participating in and occasionally leading workshops on creative problem-solving
                        and interdisciplinary approaches to innovation.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Globe className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Causes I Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Digital Inclusion</h3>
                      <p className="text-sm mt-1">
                        Volunteer with initiatives aimed at bridging the digital divide, providing skills
                        and access to underserved communities.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Environmental Sustainability</h3>
                      <p className="text-sm mt-1">
                        Advocate for and contribute to projects focusing on sustainable technology practices
                        and reducing the environmental impact of digital infrastructure.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">STEM Education</h3>
                      <p className="text-sm mt-1">
                        Mentor young students interested in technology and engineering, with a particular
                        focus on encouraging diversity and inclusion in tech fields.
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Camera className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Creative Expression</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Photography</h3>
                      <p className="text-sm mt-1">
                        Capturing urban landscapes and architectural details, exploring the intersection
                        of natural and human-made environments.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Writing</h3>
                      <p className="text-sm mt-1">
                        Maintaining a personal blog on technology ethics and the future of work,
                        exploring how innovation impacts society and individual experience.
                      </p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Digital Art</h3>
                      <p className="text-sm mt-1">
                        Experimenting with generative art and creative coding, using technology
                        as both medium and subject for artistic exploration.
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

export default Human;
