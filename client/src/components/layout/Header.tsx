// client/src/components/layout/Header.tsx
// This component renders the header of the application, including navigation links, search functionality, and theme

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { Menu, Search, ChevronDown, Moon, Sun, Cat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme  } from '@/hooks/use-theme';
import ContactPopup from '@/pages/ContactPopup';
import ContactHoverWrapper from '@/pages/ContactHoverWrapper';
import { QrCode } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion, AnimatePresence } from "framer-motion";


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const [displayText, setDisplayText] = useState("ELVIN MAZWIMAIRI");
  const [isTyping, setIsTyping] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, toggleTheme } = useTheme(); 
  const typingRef = useRef(false);

  const qrDialogRef = useRef<HTMLDialogElement>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    // Function to handle the typing animation
    const animateTyping = async () => {
      const fullName = "ELVIN E MAZWIMAIRI";
      // Skip animation if already typing
      // if (isTyping) return;
      if (typingRef.current) return;
      typingRef.current = true;
      setIsTyping(true);
      // Delete the current text
      for (let i = fullName.length; i >= 0; i--) {
        setDisplayText(fullName.substring(0, i));
        await new Promise(r => setTimeout(r, 100)); // Delete character speed
      }
      // Small pause before typing again
      await new Promise(r => setTimeout(r, 500));
      // Type the text again
      for (let i = 0; i <= fullName.length; i++) {
        setDisplayText(fullName.substring(0, i));
        await new Promise(r => setTimeout(r, 150)); // Type character speed
      }
      setIsTyping(false);
      typingRef.current = false;
    };
    // Start animation after a delay on initial load
    const initialTimeout = setTimeout(() => {
      animateTyping();
    }, 5000);
    // Schedule repeated animations
    const interval = setInterval(() => {
      animateTyping();
    }, 15000);
    // Clean up
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isTyping]);

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

  const openQrDialog = () => {
    if (qrDialogRef.current) {
      qrDialogRef.current.showModal();
    }
  };

  const closeQrDialog = () => {
    if (qrDialogRef.current) {
      qrDialogRef.current.close();
    }
  };

  const profileUrl = "https://elvinmazwi.me/contact-profile-card";

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

        {/* Mobile Layout - Logo and menu toggle */}
        <div className="flex justify-between items-center w-full md:hidden">
          {/* Logo and text */}
          <div className="flex items-center">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center text-xl font-poppins font-bold tracking-wide">
              <Cat className="w-5 h-5 mr-2" />
              <span>{displayText}</span>
              <span className={`ml-1 ${isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            </Link>
          </div>
          
          {/* Menu toggle and theme button */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={toggleTheme}
              className="text-white dark:text-gray-200 p-3 hover:bg-white/10 rounded"
              aria-label="Toggle theme"
              title="Toggle light/dark mode"
            >
              {theme === 'light' ? <Moon/> : <Sun/>}
            </Button>
            {/* <Button 
              variant="ghost" 
              size="icon"
              className="text-white dark:text-gray-200 hover:bg-white/10 rounded"
              onClick={toggleSearchBar}
            >
              <Search className="w-5 h-5" />
            </Button> */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white p-0 focus:outline-none hover:bg-white hover:bg-opacity-10"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 animate-in fade-in duration-200" />
              ) : (
                <Menu className="w-6 h-6 animate-in fade-in duration-200" />
              )}
            </Button>
          </div>
        </div>

        {/* Desktop 3 Column Layout with centered navigation */}
        <div className="hidden md:grid grid-cols-3 items-center w-full mx-auto max-w-7xl relative">
          {/* Column 1: Logo (Left aligned) */}
          <div className="flex items-center">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center text-xl font-poppins font-bold tracking-wide">
              <Cat className="w-6 h-6 mr-2" />
              <span>{displayText}</span>
              <span className={`ml-1 ${isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            </Link>
          </div>

          {/* Column 2: Navigation Links (Center aligned) */}
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
                <span className={location === '/codecircle' ? 'text-accent2' : ''}>
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
                      href="/developer/codecircle"
                      className="block px-4 py-2 text-white hover:text-accent2 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link 
                      href="/developer/journey"
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
                <span className={location === '/technopreneur' ? 'text-accent4' : ''}>
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
                      href="/technopreneur/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent4 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link 
                      href="/technopreneur/portfolio"
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
                <span className={location === '/designer' ? 'text-accent3' : ''}>
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
                      href="/designer/portfolio"
                      className="block px-4 py-2 text-white hover:text-accent3 hover:bg-white/10 rounded"
                      onClick={() => {
                        setOpenMenu(null);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Portfolio
                    </Link>
                    <Link 
                      href="/designer/journey"
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

          {/* Column 3: Right Action Buttons (Right aligned) */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              // className="p-2 bg-white rounded-full shadow hover:scale-105 transition"
              className="text-white dark:text-gray-200 p-2 hover:bg-white/10 rounded shadow "
              onClick={openQrDialog}
            >
              <QrCode className="text-gray-600" />
            </Button>
            <Button
              onClick={toggleTheme}
              className="text-white dark:text-gray-200 p-2 hover:bg-white/10 rounded"
              aria-label="Toggle theme"
              title="Toggle light/dark mode"
            >
              {theme === 'light' ? <Moon/> : <Sun/>}
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

        {/* Full-width border line under header that spans from cat icon to search/menu icon */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="border-b border-white border-opacity-20"></div>
        </div>
      </header>
      
      <div 
        // className="container mx-auto max-w-7xl pt-16 md:pt-20"
        // className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"

      >
        {/* QR Code Modal */}
        <dialog
          id="qrPopup"
          ref={qrDialogRef}
          className="rounded-lg p-6 bg-primary border border-white border-opacity-30 shadow-lg max-w-xs w-full"
          // className="fixed inset-0 w-full h-full bg-black/70 z-50 flex justify-center items-center p-4"
          // className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
          onClick={(e) => {
            // Close when clicking outside the modal content
            if (e.target === qrDialogRef.current) {
              closeQrDialog();
            }
          }}
        >
      {/* <div className="bg-primary rounded-lg p-6 border border-white border-opacity-30 shadow-lg max-w-xs w-full"> */}
        <div className="flex flex-col items-center space-y-4">
          <button
            className="self-end text-white hover:text-accent2"
            onClick={closeQrDialog}
            aria-label="Close QR code popup"
          >
            ✕
          </button>
          <div className="bg-white p-4 rounded shadow">
            <QRCodeCanvas value={profileUrl} size={200} />
          </div>
          <p className="text-white text-center">Scan this QR code to connect</p>
        </div>
      {/* </div> */}
        </dialog>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;