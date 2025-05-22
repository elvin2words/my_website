import React from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import WhoAmICloud from '@/components/home/WhoAmICloud';
import PrimaryStatement from '@/components/home/PrimaryStatement';
import IdentitySections from '@/components/home/IdentitySections';

const Home: React.FC = () => {
  return (
    <>
      <BackgroundEffect />
      
      <div className="relative z-10">
        <main className="pt-24 pb-16 px-4 md:px-0 flex flex-col items-center min-h-screen">
          <div className="container mx-auto max-w-7xl">
            {/* Intro Section */}
            <section className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16 md:mb-24 relative">
              {/* Show the cloud only on medium screens and larger */}
              <div className="hidden md:block w-full md:w-2/5">
                <WhoAmICloud />
              </div>
              
              {/* Primary statement takes full width on mobile */}
              <div className="w-full md:w-3/5">
                <PrimaryStatement />
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
