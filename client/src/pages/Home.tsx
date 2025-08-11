import React, { useRef, useState, useEffect } from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import IdentitySections from '@/components/home/IdentitySections';
import { motion } from 'framer-motion';
import ContactPopupWrapper from './ContactPopupWrapper';
import SkillPills from '@/components/home/SkillPills';
import { Link } from 'wouter';
import { Download, ArrowUp, FolderOpen, } from 'lucide-react';


// Lazy loader for heavy sections
const LazySection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    ); // preload a bit before scroll
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="will-change-transform translate-z-0 contain-paint"
      style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}
    >
      {visible ? children : null}
    </div>
  )
};


const Home: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close modal when clicking outside popup content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };
  
  return (
    <>
      <BackgroundEffect />

      <div className="relative z-10 overflow-x-hidden" style={{ scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' }}>
      {/* <div className="relative z-10 overflow-x-hidden" > */}
        {/* <BackgroundEffect /> */}
            
        {/* <main className="bg-black pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-4 md:px-6 flex flex-col items-center min-h-screen"> */}
        <main className=" pt-24 sm:pt-24 md:pt-28 pb-8 sm:pb-12 px-4 sm:px-4 md:px-6 flex flex-col items-center min-h-screen">
          <BackgroundEffect />

          <div id="home" className="container mx-auto max-w-7xl w-full contain-layout">

            {/* Intro Section - Responsive sizes */}
            <section className="flex flex-col items-center justify-center mb-2 md:mb-4 relative text-center will-change-transform translate-z-0">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
                  Hi, I’m Elvin, an <span className="text-accent2">Electrical Engineer</span>,{' '}
                  <span className="text-accent3">Systems Developer</span>, and{' '}
                  <span className="text-accent4">Design-Driven Technopreneur</span>.
                </h1>

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I design smart systems and seamless digital experiences - 
                  from power and energy solutions to intuitive web platforms - 
                  across EVs, power systems and industrial control. 
                  <br />Explore the complementary sides to what i do below:
                </p>

              </div>
            </section>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto mb-8 md:mb-8">
              {/* See My Work – always visible */}
              <Link to="/projects" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full sm:w-1/2">
                <button className="w-full bg-accent2 text-white px-5 py-2 rounded-lg shadow hover:scale-105  hover:text-black transition will-change-transform translate-z-0">
                  {/* <FolderOpen className="mr-2 h-5 w-5" /> */}
                  See My Work
                </button>
              </Link>

              {/* Contact Me button - only on small screens */}
              <button
                className="w-full sm:hidden border border-white px-5 py-2 rounded-lg shadow text-white hover:bg-white hover:scale-105 hover:text-black transition will-change-transform translate-z-0"
                onClick={() => setIsPopupOpen(true)}
                ref={buttonRef}
              >
                Contact Me
              </button>

              {/* Hire Me – only visible on medium+ screens */}
              <Link to="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden sm:block w-full sm:w-1/2">
                <button className="w-full border border-white bg-slate-400 px-5 py-2 rounded-lg text-black hover:bg-white hover:text-black transition will-change-transform translate-z-0">
                  Hire Me
                </button>
              </Link>

              {/* PDF Resume */}
              <Link
                to="/assets/resume.pdf"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="w-full sm:w-1/2"
              >
                <button 
                  className="w-full border border-white bg-green-500 px-5 py-2 rounded-lg text-black hover:bg-cyan-600 hover:text-black transition will-change-transform translate-z-0"
                >
                  {/* <Document className="mr-2" size={18} /> */}
                  {/* <FileText className="mr-2 h-5 w-5" />  */}
                  PDF Resume
                </button>
              </Link>
            </div>

            {/* Lazy-loaded identity sections */}
            <LazySection>
              <IdentitySections />
            </LazySection>

            <section className="flex flex-col items-center justify-center mt-8 md:mb-4 relative text-center">
              <a 
                href="/cv/elvin-mazwimairi-cv.pdf"
                download
                className="inline-flex items-center px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition will-change-transform translate-z-0"
              >
                <Download className="mr-2" size={18} />
                Download My Contact Card
              </a>
            </section>

          </div>
        </main>
      </div>
      {/* Contact Popup Modal */}
      {isPopupOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
          <ContactPopupWrapper onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Home;