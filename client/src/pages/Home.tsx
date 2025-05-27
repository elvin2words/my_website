import React from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import IdentitySections from '@/components/home/IdentitySections';
import SkillPills from '@/components/home/SkillPills';

const Home: React.FC = () => {
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl w-full">
            {/* Intro Section - Responsive sizes */}
            <section className="flex flex-col items-center justify-center mb-8 md:mb-12 relative text-center">
              <div className="max-w-4xl mx-auto">
                {/* Maintain small text on mobile, but use larger text on web view */}
                {/* <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi! I'm Elvin, <span className="text-accent2">an ardent Electronics and Software Engineer</span>, <span className="text-accent3">Business and Law Enthusiast</span>; <span className="text-accent4">Aspiring Philosopher</span>; <span className="text-accent2">Ambitious Technopreneur</span> & <span className="text-accent3">Igniting Influencer</span>
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  with an endearing love for the fine arts, food, knowledge, gaming and a lot more but above all God first.
                </p> */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi, I’m Elvin, <span className="text-accent2">an Electrical Engineer</span>, who also dabbles in
                {/* </h1>
                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  , who also dabbles in
                </p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5"> */}
                  <span className="text-accent3"> Systems Development</span>, <span className="text-accent4"> Arts & Design</span>, 
                  <span className="text-accent2"> Technopreneurship</span> and <span className="text-accent3"> Others</span>.
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I build smart systems and seamless digital experiences, driven by purpose and powered by innovation. 
                  Whether it's engineering resilient power solutions, developing intuitive web apps, designing engaging interfaces, or working on my ventures tryna solve some real-world problems, I shoot to bring vision to life. 
                  Explore the different sides of me below:
                </p>

                </div>
            </section>

            {/* Identity Sections */}
            <IdentitySections />
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;