// NavHeader - Updated Header.tsx with Back Button replacing title

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Menu, Search, ChevronDown, Moon, Sun, QrCode, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/hooks/use-theme';
import ContactHoverWrapper from '@/pages/ContactHoverWrapper';
import MobileMenu from './MobileMenu';
import { QRCodeCanvas } from 'qrcode.react';
import AISearchOverlay from "@/components/ai/AISearchOverlay";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, navigate] = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Track last visited page to enable "Back"
  const lastPageRef = useRef<string | null>(null);

  // useEffect(() => {
  //   // Save previous page on navigation
  //   return navigate((current) => {
  //     if (current !== location) lastPageRef.current = location;
  //     return current;
  //   });
  // }, [location]);

  const goBack = () => {
    if (lastPageRef.current) navigate(lastPageRef.current);
    else navigate('/');
  };

  const qrDialogRef = useRef<HTMLDialogElement>(null);
  const openQrDialog = () => qrDialogRef.current?.showModal();
  const closeQrDialog = () => qrDialogRef.current?.close();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setShowSearchBar(true);
      }
    };

    document.addEventListener("keydown", handleSearchShortcut);
    return () => document.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);  

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 py-4 lg:py-5 px-4 sm:px-6 lg:px-12 flex items-center z-50 transition-all duration-300 ${
          isScrolled ? 'bg-primary backdrop-blur-md' : 'bg-primary'
        }`}
      >
        {/* Mobile Layout */}
        <div className="flex justify-between items-center w-full lg:hidden">

          <button
            onClick={goBack}
            className="flex items-center text-white hover:text-accent2 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              className="text-white dark:text-gray-200 p-3 hover:bg-white/10 rounded"
              aria-label="Toggle theme"
              title="Toggle light/dark mode"
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white dark:text-gray-200 hover:bg-white/10 rounded"
              onClick={toggleSearchBar}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-white p-0 hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid grid-cols-3 items-center w-full max-w-7xl mx-auto relative">
          <div className="flex items-center">
            <button
              onClick={goBack}
              className="flex items-center font-semibold text-white hover:text-accent2 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 mr-2" /> 
              <span>Back</span>
            </button>
          </div>

          {/* Center Navigation (unchanged) */}
          <nav className="flex justify-center space-x-8">
            <div
              className="relative group"
              onMouseEnter={() => setOpenMenu("eng")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                onClick={() => setOpenMenu(openMenu === "eng" ? null : "eng")}
                className="flex items-center font-medium text-lg text-white hover:text-accent1 focus:outline-none"
              >
                <span className={location.startsWith('/engineer') ? 'text-accent1' : ''}>
                  EngCircle
                </span>
                <ChevronDown
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    openMenu === "eng" ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openMenu === "eng" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-primary border border-white border-opacity-20 rounded-lg shadow-lg p-2 z-50"
                  >
                    <Link
                      href="/engineer/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent1 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link
                      href="/engineer/journey"
                      className="block px-4 py-2 text-white hover:text-accent1 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Journey
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent1 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setOpenMenu("code")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Trigger */}
              <button 
                onClick={() => setOpenMenu(openMenu === "code" ? null : "code")}
                className="flex items-center font-medium text-lg text-white hover:text-accent2 focus:outline-none"
              >
                <span className={location === '/codecircle/portfolio' ? 'text-accent2' : ''}>
                  CodeCircle
                </span>
                <ChevronDown 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    openMenu === "code" ? "rotate-180" : "rotate-0"
                  }`} 
                />
              </button>
              {/* Animated Dropdown */}
              <AnimatePresence>
                {openMenu === "code" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-primary border border-white border-opacity-20 rounded-lg shadow-lg p-2 z-50"
                  >
                    <Link 
                      href="/codecircle/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent2 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link 
                      href="/codecircle/journey"
                      className="block px-4 py-2 text-white hover:text-accent2 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Journey
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent2 transition-all duration-300 group-hover:w-full"></span>
            </div>
            
            <div 
              className="relative group"
              onMouseEnter={() => setOpenMenu("biz")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Trigger */}
              <button 
                onClick={() => setOpenMenu(openMenu === "biz" ? null : "biz")}
                className="flex items-center font-medium text-lg text-white hover:text-accent4 focus:outline-none"
              >
                <span className={location === '/biz' ? 'text-accent4' : ''}>
                  BizCircle
                </span>
                <ChevronDown 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    openMenu === "biz" ? "rotate-180" : "rotate-0"
                  }`} 
                />
              </button>
              {/* Animated Dropdown */}
              <AnimatePresence>
                {openMenu === "biz" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-primary border border-white border-opacity-20 rounded-lg shadow-lg p-2 z-50"
                  >
                    <Link 
                      href="/biz/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent4 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link 
                      href="/biz/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent4 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Journey
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent4 transition-all duration-300 group-hover:w-full"></span>
            </div>            

            <div className="relative group">
              <Link
                href="/blog"
                className={`flex items-center font-medium text-lg text-white hover:text-accent3 ${
                  location.startsWith('/blog') || location.startsWith('/creative/blog') ? 'text-accent3' : ''
                }`}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Blog
              </Link>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent3 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setOpenMenu("des")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {/* Trigger */}
              <button 
                onClick={() => setOpenMenu(openMenu === "des" ? null : "des")}
                className="flex items-center font-medium text-lg text-white hover:text-accent3 focus:outline-none"
              >
                <span className={location.startsWith('/creative') ? 'text-accent3' : ''}>
                  DesignCircle
                </span>
                <ChevronDown 
                  className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                    openMenu === "des" ? "rotate-180" : "rotate-0"
                  }`} 
                />
              </button>
              {/* Animated Dropdown */}
              <AnimatePresence>
                {openMenu === "des" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-primary border border-white border-opacity-20 rounded-lg shadow-lg p-2 z-50"
                  >
                    <Link
                      href="/creative/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent3 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Creatives
                    </Link>
                    <Link
                      href="/creative/gallery"
                      className="block px-4 py-2 text-white hover:text-accent3 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Gallery
                    </Link>
                    <Link
                      href="/creative/journey"
                      className="block px-4 py-2 text-white hover:text-accent3 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Visual Designs
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Underline animation */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent3 transition-all duration-300 group-hover:w-full"></span>
            </div>
          </nav>   

          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-4">
            <Button className="text-white p-2 hover:bg-white/10 rounded" onClick={openQrDialog}>
              <QrCode />
            </Button>
            <Button className="text-white p-2 hover:bg-white/10 rounded" onClick={toggleTheme}>
              {theme === 'light' ? <Moon /> : <Sun />}
            </Button>
            <ContactHoverWrapper />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-accent2 focus:outline-none hover:bg-white hover:bg-opacity-10 p-1.5 rounded-full transition-all"
              onClick={toggleSearchBar}
            >
              <Search className="w-5 h-5" />
            </Button>            
          </div>
        </div>
      </header>

      <AISearchOverlay open={showSearchBar} onClose={() => setShowSearchBar(false)} />

      {/* QR Dialog */}
      <dialog
        ref={qrDialogRef}
        className="rounded-lg p-6 bg-primary border border-white border-opacity-20 shadow-lg max-w-xs w-full"
        onClick={(e) => e.target === qrDialogRef.current && closeQrDialog()}
      >
        <div className="flex flex-col items-center space-y-4">
          <button
            className="self-end text-white hover:text-accent2"
            onClick={closeQrDialog}
          >
            ✕
          </button>
          <div className="bg-white p-4 rounded">
            <QRCodeCanvas value="https://elvinmazwi.me/contact-profile-card" size={200} />
          </div>
          <p className="text-white text-center">Get my Contact Card</p>
        </div>
      </dialog>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
