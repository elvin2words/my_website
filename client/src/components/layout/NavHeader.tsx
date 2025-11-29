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

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, navigate] = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
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
    if (showSearchBar && searchInputRef.current) {
      searchInputRef.current.focus();
      const handleClickOutside = (event: MouseEvent) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
          setShowSearchBar(false);
        }
      };
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowSearchBar(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [showSearchBar]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearchBar = () => setShowSearchBar(!showSearchBar);  

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 py-4 md:py-5 px-6 md:px-12 flex items-center z-50 transition-all duration-300 ${
          isScrolled ? 'bg-primary backdrop-blur-md' : 'bg-primary'
        }`}
      >

        {/* Search bar overlay */}
        {showSearchBar && (
          <div className="absolute inset-0 flex items-center justify-center bg-primary bg-opacity-95 backdrop-blur-md py-3 px-6 md:px-12 z-10">
            <div className="w-full max-w-2xl relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className="w-full py-3 px-4 bg-transparent border-b-2 border-white border-opacity-30 focus:border-opacity-100 outline-none text-white text-lg"
                autoFocus
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-accent2 transition-colors"
                onClick={toggleSearchBar}
              >
                ESC
              </button>
            </div>
          </div>
        )}


        {/* Mobile Layout */}
        <div className="flex justify-between items-center w-full md:hidden">

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
              className="text-white p-0 hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 items-center w-full max-w-7xl mx-auto relative">
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
                <span className={location === '/creative' ? 'text-accent3' : ''}>
                  CreativeCircle
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
                      Portfolio
                    </Link>
                    <Link 
                      href="/creative/journey"
                      className="block px-4 py-2 text-white hover:text-accent3 hover:bg-white/10 rounded"
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
