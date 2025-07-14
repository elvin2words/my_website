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
        <main className="pt-24 pb-2 px-4 md:px-0 flex flex-col items-center min-h-screen">
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

            {/* Intro Narrative */}
            <div className="mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Heart className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>What Makes Me Tick</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="mb-6 leading-relaxed">
                    At the intersection of the Engineer, the Designer, and the Technopreneur lives someone always reaching for more. My journey blends a technical grounding that has rooted passion in smart grids, EV tech, embedded systems, and real-time solutions - with a heart wired for curiosity, creativity, and collective growth.
                  </p>
                  <p className="mb-6 leading-relaxed">
                    Life, to me, is like a multidimensional project - constantly being iterated through thoughtful design, reflective learning, and a deep desire to harmonize human experience with technological innovation. I seek not just to solve problems but to understand their emotional gravity, crafting meaningful systems that respect both logic and soul.
                  </p>
                  <p className="leading-relaxed">
                    Whether I’m prototyping a Fault Management System, sketching ideas for an EVSE platform, composing ambient tracks, or meditating on systems design, my focus is clear: build what matters, remain curious, and always leave space for awe.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Section: Hobbies & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Music className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Hobbies & Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Music Production</h3>
                      <p className="text-sm mt-1">Creating lo-fi and experimental sounds, blending digital instruments and field samples into emotional atmospheres.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Anime & Symbolic Storytelling</h3>
                      <p className="text-sm mt-1">Exploring visual and philosophical themes through anime, sci-fi, and cinematics that inspire design and innovation.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Travel & Movement</h3>
                      <p className="text-sm mt-1">Swimming, hiking, and exploring new cultures—all as ways to reconnect, reflect, and draw inspiration from nature and people.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Culinary Play</h3>
                      <p className="text-sm mt-1">Fusing culinary traditions, experimenting with textures and flavor profiles—another creative outlet with sensory rewards.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section: Learning & Growth */}
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Book className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Learning & Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Philosophy & Psychology</h3>
                      <p className="text-sm mt-1">Deeply interested in how people think, decide, and grow. Often reading about cognitive science, ethics, and introspection.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Personal Development</h3>
                      <p className="text-sm mt-1">Practicing clarity, journaling, and goal-setting. Reflecting on growth with both structure and spontaneity.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Public Speaking & Expression</h3>
                      <p className="text-sm mt-1">Learning how to speak with clarity and connection. Toastmasters and poetic expression have been key to this path.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Section: Causes I Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Globe className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Causes I Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Youth & STEM Empowerment</h3>
                      <p className="text-sm mt-1">Mentoring emerging engineers, designers, and creatives—especially from underrepresented communities.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Mental Health & Expression</h3>
                      <p className="text-sm mt-1">Promoting emotional literacy, safe spaces, and creative outlets for healing and self-awareness.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Sustainable & Ethical Tech</h3>
                      <p className="text-sm mt-1">Building with environmental awareness and advocating for responsible innovation across disciplines.</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Section: Creative Expression */}
              <Card className="bg-white text-white bg-opacity-5 backdrop-blur-sm border border-white border-opacity-10">
                <CardHeader className="flex flex-row items-center">
                  <Camera className="h-6 w-6 text-accent5 mr-2" />
                  <CardTitle>Creative Expression</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <h3 className="font-semibold text-accent5">Photography</h3>
                      <p className="text-sm mt-1">Exploring contrast, composition, and candid moments—especially in urban or industrial landscapes.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Writing & Blogging</h3>
                      <p className="text-sm mt-1">Using words to reflect, challenge norms, and imagine better futures—whether through essays, poetry, or personal musings.</p>
                    </li>
                    <li>
                      <h3 className="font-semibold text-accent5">Creative Coding</h3>
                      <p className="text-sm mt-1">Generating art and emotion from code, blending logic with visual storytelling via tools like p5.js and generative systems.</p>
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
