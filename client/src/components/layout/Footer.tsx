import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Linkedin, Github, Twitter, Mail, Code } from 'lucide-react';
import ContactPopupWrapper from '@/pages/ContactPopupWrapper';


const Footer: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


  // This handler closes the modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-secondary bg-opacity-70 backdrop-blur-md py-8 px-6 md:px-12 mt-auto relative z-10">
        {/* Mobile Navigation Links (only visible on small screens) */}
        <div className="sm:hidden w-full mb-6">
          <div className="flex justify-center items-center space-x-4">
            <Link href="/developer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-accent2 text-sm font-medium px-2 py-1">
              CodeCircle
            </Link>
            <Link href="/designer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-accent3 text-sm font-medium px-2 py-1">
              DesignCircle
            </Link>
            <Link href="/technopreneur" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-accent4 text-sm font-medium px-2 py-1">
              BizCircle
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
            <div className="mb-6 md:mb-0 order-1 md:order-1 text-center md:text-left">
              <h3 className="text-xl font-poppins font-semibold mb-2">Elvin Mazwimairi</h3>
              <p className="text-white text-opacity-70 text-sm">Portfolio & Personal Brand</p>
            </div>

            <div className="flex flex-col items-center md:items-end order-2 md:order-2">
              <div className="flex space-x-6 mb-3">
                <a 
                  href="https://linkedin.com/in/elvin-mazwimairi/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white text-opacity-70 hover:text-opacity-100 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a 
                  href="https://github.com/elvin2words" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white text-opacity-70 hover:text-opacity-100 transition"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>

                <a 
                  href="https://x.com/young_mazwi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white text-opacity-70 hover:text-opacity-100 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>

                <a 
                  href="mailto:elvinmazwimairi@gmail.com" 
                  className="text-white text-opacity-70 hover:text-opacity-100 transition"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              {/* IqalInc attribution */}
              <div className="flex items-center text-white text-opacity-50 text-xs">
                {/* <Code className="w-3 h-3" /> */}
                <span>Made by</span>
                <span className="mx-1 font-semibold text-cyan-400"><a href="https://iqal.co.zw/" color='blue' target="_blank" >IqalInc</a></span> @ <span className="mx-1 font-semibold text-cyan-400"><a href="https://instagram.com/young_mazwi" color='blue' target="_blank">young_mazwi</a></span>
                {/* <Code className="w-3 h-3" /> */}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-opacity-50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Elvin E. Mazwimairi. All rights reserved.
            </p>

            <div className="mt-4 md:mt-0 flex flex-wrap justify-center space-x-6">
              <Link href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition">
                Privacy Policy
              </Link>

              <Link href="#" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition">
                Terms of Service
              </Link> 

              <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPopupOpen(true);
                  }}
                  className="text-white text-opacity-50 text-sm hover:text-opacity-70 transition cursor-pointer"
                >
                  Contact
                </Link>
            </div>
          </div>
        </div>
      </footer>

      {isPopupOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
        >
          <ContactPopupWrapper onClose={() => setIsPopupOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Footer;