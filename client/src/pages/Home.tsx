import React, { useRef, useState, useEffect } from 'react';
import BackgroundEffect from '@/components/home/BackgroundEffect';
import IdentitySections from '@/components/home/IdentitySections';
import { motion } from 'framer-motion';
import ContactPopupWrapper from './ContactPopupWrapper';
import SkillPills from '@/components/home/SkillsPills';
import { Link } from 'wouter';
import { Download, ArrowUp, FolderOpen, } from 'lucide-react';
import HireMePopup from "@/components/home/HireMePopup";
import HireMeHoverWrapper from './HireMeHoverWrapper';
import { Button } from '@/components/ui/button';

import Header from "@/components/layout/HomeHeader";
import Footer from "@/components/layout/Footer";
import { Head } from 'react-day-picker';

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
  const [showHirePopup, setShowHirePopup] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isHireMeModalOpen, setIsHireMeModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //  Detect screen size for mobile vs desktop behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 300);
    }
  };

  // Close modal when clicking outside popup content
  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     setIsPopupOpen(false);
  //   }
  // };
  // Close modal when clicking outside popup content
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>, closeFn: () => void) => {
    if (e.target === e.currentTarget) {
      closeFn();
    }
  };
  
  return (
    <>
      <BackgroundEffect />

      <Header />


      <div className="relative z-10 overflow-x-hidden" style={{ scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' }}>
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
                  <span className="text-accent4">Creative Technologist</span>.
                </h1>

                {/* <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I design smart systems and seamless digital experiences - 
                  from energy and electrical power systems to embedded and control systems - 
                  across EVs, utility grids and industrial automation. 
                  <br />Explore the complementary sides to what i do below:
                </p> */}

                <p className="text-base md:text-xl text-white text-opacity-90 mb-6">
                  I design smart systems and seamless digital experiences - 
                  from power and energy solutions to intuitive digital platforms - 
                  across EVs, power systems and embedded control.
                  <br />
                  Explore the complementary sides to what i do below:
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
              {/* <Link to="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden sm:block w-full sm:w-1/2">
                <button className="w-full border border-white bg-slate-400 px-5 py-2 rounded-lg text-black hover:bg-white hover:text-black transition will-change-transform translate-z-0">
                  Hire Me
                </button>
              </Link> */}

              {/* Hire Me button – Desktop */}
              {/* <div 
                className="relative hidden sm:block w-full sm:w-1/2"
                onMouseEnter={() => setShowHirePopup(true)}
                onMouseLeave={() => setShowHirePopup(false)}
              >
                <Link to="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden sm:block w-full sm:w-1/2">
                  <button className="w-full border border-white bg-slate-400 px-5 py-2 rounded-lg text-black hover:bg-white transition">
                    Hire Me
                  </button>
                </Link>
                {showHirePopup && <HireMePopup />}
              </div> */}

              {/* <HireMeHoverWrapper /> */}
              <div 
                className="relative w-full md:w-auto"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >

                {isMobile ? (
                  <Button 
                    className="w-full md:w-auto text-white border border-white/30 rounded-full px-4 hover:bg-white/10"
                    onClick={() => setIsHireMeModalOpen(true)}
                  >
                    What I can Do for You
                  </Button>
                ) : (
                  <Link href="/hire">
                    <Button 
                      className="w-full md:w-auto text-white border border-white/30 rounded-full px-4 hover:bg-white/10"
                    >
                      HireMe
                    </Button>
                  </Link>
                )}

                {/* Popup for desktop */}
                {showPopup && !isMobile && (
                  // <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50">
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50">
                    <HireMePopup />
                  </div>
                )}

                {/* Modal for mobile */}
                {/* <Dialog open={isModalOpen} onOpenChange={setShowModal}>
                  <DialogContent className="p-0 bg-transparent border-none shadow-none">
                    <HireMePopup />
                  </DialogContent>
                </Dialog> */}
              </div>   
              

              {/* Hire Me button – Mobile (modal) */}
              {/* <Link to="/hire" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hidden sm:block w-full sm:w-1/2">
                <button
                  className="w-full sm:hidden border border-white px-5 py-2 rounded-lg shadow text-white hover:bg-white hover:text-black transition"
                  onClick={() => setIsPopupOpen(true)}
                >
                  Hire Me
                </button>
              </Link> */}

              {/* PDF Resume */}
              <Link
                to="/resume"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="w-full sm:w-1/2"
                target="_blank" rel="noopener noreferrer"
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
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(0,0,0,0.3)" }}
                className="inline-flex items-center px-5 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition"
              >
                <Link
                  to="/contact-profile-card"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Download className="mr-2" size={18} />
                  My Contact Card
                </Link>
              </motion.div>
            </section>

          </div>
        </main>
      </div>
      {/* Contact Popup Modal */}
      {isPopupOpen && (
        <div
          onClick={(e) => handleOverlayClick(e, () => setIsPopupOpen(false))}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
          <ContactPopupWrapper onClose={() => setIsPopupOpen(false)} />
        </div>
      )}

      <section className="flex flex-col items-center justify-center mb-2 md:mb-4 relative text-center will-change-transform translate-z-0">
        <div className="max-w-4xl mx-auto">
          <p className="text-base text-accent3 md:text-xl text-white text-opacity-90 mb-6">
            {/* I design smart systems and intuitive digital platfors -  */}
            {/* from energy and electrical power systems to intelligent software, and creative technology, -  */}
            {/* across EVs, utility grids and industrial automation.  */}
            {/* <br /> */}
            Building with depth, designing with empathy, and creating for impact.
            <br />
            <span className="text-sm sm:text-xs md:text-xs text-accent2">
              As an Electrical Engineer, I design and optimize the physical systems that power our world.
            </span>
            <br />
            <span className="text-sm sm:text-xs md:text-xs text-accent1">
              As a Systems Developer, I build the digital intelligence that connects those systems to people and data.
            </span>
            <br />
            <span className="text-sm sm:text-xs md:text-xs text-accent5">
              As a Creative Technologist, I explore new ways of thinking about what technology can be — expressive, adaptive, and humane.
            </span>
            {/* Explore the complementary sides to what i do below: */}
          </p>
        </div>
      </section>      

      {/* HireMe Modal on mobile */}
      {isHireMeModalOpen && (
        <div
          onClick={(e) => handleOverlayClick(e, () => setIsHireMeModalOpen(false))}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
          <HireMePopup onLinkClick={() => setIsHireMeModalOpen(false)} />
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
