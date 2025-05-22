import React from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import IdentitySections from '@/components/home/IdentitySections';
import SkillPills from '@/components/home/SkillPills';

const Home: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main className="pt-28 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            {/* Intro Section - Responsive sizes */}
            <section className="flex flex-col items-center justify-center mb-16 md:mb-24 relative text-center">
              <div className="max-w-4xl mx-auto">
                {/* Maintain small text on mobile, but use larger text on web view */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi! I'm Elvin, <span className="text-accent2">an ardent Electronics and Software Engineer</span>, <span className="text-accent3">Business and Law Enthusiast</span>; <span className="text-accent4">Aspiring Philosopher</span>; <span className="text-accent2">Ambitious Technopreneur</span> & <span className="text-accent3">Igniting Influencer</span>
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  with an endearing love for the fine arts, food, knowledge, gaming and a lot more but above all God first.
                </p>

                <p className="text-xs md:text-sm text-white text-opacity-70 mt-4">
                  These are some of my relevant skills
                </p>
              </div>
            </section>

            <SkillPills />
            {/* Skills/Identity Sections */}
            <IdentitySections />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;