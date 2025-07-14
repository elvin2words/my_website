import React, { useRef, useEffect } from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import IdentitySections from '@/components/home/IdentitySections';
import { motion } from 'framer-motion';
import ContactPopupWrapper from './ContactPopupWrapper';
import SkillPills from '@/components/home/SkillPills';
import { Link } from 'wouter';
import { Download } from 'lucide-react';

const ScrollToTop = () => {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-5 right-5 bg-accent3 text-white p-3 rounded-full shadow-md hover:scale-105 transition"
    >
      ↑
    </button>
  ) : null;
};


const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10">
        <main className="pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-4 md:px-6 flex flex-col items-center min-h-screen">
          <div id="home" className="container mx-auto max-w-7xl w-full">
            {/* Intro Section - Responsive sizes */}
            <section className="flex flex-col items-center justify-center mb-2 md:mb-4 relative text-center">
              <div className="max-w-4xl mx-auto">
                {/* Maintain small text on mobile, but use larger text on web view */}
                {/* <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi! I'm Elvin, <span className="text-accent2">an ardent Electronics and Software Engineer</span>, <span className="text-accent3">Business and Law Enthusiast</span>; <span className="text-accent4">Aspiring Philosopher</span>; <span className="text-accent2">Ambitious Technopreneur</span> & <span className="text-accent3">Igniting Influencer</span>
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  with an endearing love for the fine arts, food, knowledge, gaming and a lot more but above all God first.
                </p> */}
                {/* <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5"> */}
                  {/* Hi, I’m Elvin, <span className="text-accent2">an Electrical Engineer</span>, who also dabbles in */}
                {/* </h1>
                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  , who also dabbles in
                </p>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5"> */}
                  {/* <span className="text-accent3"> Systems Development</span>, <span className="text-accent4"> Design</span>,  */}
                  {/* <span className="text-accent2"> Technopreneurship</span> and <span className="text-accent3"> Others</span>. */}
                {/* </h1> */}

                {/* <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I build smart systems and seamless digital experiences, driven by purpose and powered by innovation. 
                  Whether it's engineering resilient power solutions, developing intuitive web apps, designing engaging interfaces, or working on my ventures tryna solve some real-world problems, I shoot to bring vision to life. 
                  Explore the different sides of me below:
                </p> */}
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi, I’m Elvin, an <span className="text-accent2">Electrical Engineer</span>, <span className="text-accent3">Systems Developer</span>, and <span className="text-accent4">Design-Driven Technopreneur</span>.
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I craft smart systems and seamless digital experiences - 
                  from resilient energy solutions to intuitive web platforms - 
                  all powered by innovation and purpose. 
                  <br></br>Explore the many sides of me below:
                </p>

                {/* 「+An+Electrical+&+Systems+Engineer+|+Embedded+Developer+with+a+passion+for+innovation+」;「
                +Specializing+in+energy+systems,+automation,+and+intelligent+control+」;
                「I+design+smart+systems+across+EVs,+power+grids,+and+industrial+control.+」 */}

                </div>
            </section>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-8 md:mb-8">
              {/* See My Work – always visible */}
              <Link to="/projects" className="w-full sm:w-1/2">
                <button 
                  className="w-full bg-accent2 text-white px-5 py-2 rounded-lg shadow hover:scale-105  hover:text-black transition"
                  >
                  See My Work
                </button>
              </Link>

              {/* Contact Elvin – only visible on small screens */}
              {/* {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
                  <ContactPopup />
                </div>
              )}
              <a
                href="mailto:you@example.com"
                className="w-full sm:hidden"
                onClick={() => setIsPopupOpen(true)}
              >
                <button 
                  onClick={() => setIsPopupOpen(true)}
                  className="w-full border border-white px-5 py-2 rounded-lg text-white hover:bg-white hover:text-black transition"
                >
                  Contact Elvin
                </button>
              </a> */}
              {isPopupOpen && 
                <ContactPopupWrapper onClose={
                  () => setIsPopupOpen(false)} />}
              <button 
                className="w-full sm:hidden border  border-white px-5 py-2 rounded-lg shadow text-white hover:bg-white hover:scale-105 hover:text-black transition"
                  // className="w-full bg-accent2 text-white px-5 py-2 rounded-lg shadow hover:scale-105  hover:text-black transition"
                onClick={(e) => {
                  e.preventDefault();
                  setIsPopupOpen(true);
                }}
              >
                Contact Me
              </button>
              {/* Hire Me – only visible on medium+ screens */}
              <Link
                to="/hire"
                className="hidden sm:block w-full sm:w-1/2"
              >
                <button className="w-full border border-white bg-slate-400 px-5 py-2 rounded-lg text-black hover:bg-white hover:text-black transition">
                  Hire Me
                </button>
              </Link>

              <Link
                to="/cv/elvin-mazwimairi-cv.pdf"
                // className="hidden sm:block w-full sm:w-1/2"
                className="w-full sm:w-1/2"
              >
                <button 
                  className="w-full border border-white bg-green-500 px-5 py-2 rounded-lg text-black hover:bg-cyan-600 hover:text-black transition"
                  // className="w-full sm:hidden border border-white px-5 py-2 rounded-lg text-white hover:bg-white hover:text-black transition"
                  >
                  {/* <Document className="mr-2" size={18} /> */}
                  PDF Resume
                </button>
              </Link>
            </div>


            {/* <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <SkillPills skills={['React', 'Embedded C', 'Node.js']} />
            </motion.div> */}

            {/* Identity Sections */}
            <IdentitySections />

            <section className="flex flex-col items-center justify-center mt-8 md:mb-4 relative text-center">
              <a href="/cv/elvin-mazwimairi-cv.pdf" download
                className="inline-flex items-center px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
              >
                <Download className="mr-2" size={18} />
                Download My Contact Card
              </a>
            </section>

          </div>
        </main>
      </div>
    </>
  );
};

export default Home;