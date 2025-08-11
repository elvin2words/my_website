import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import MobileMenu from './MobileMenu';
import { Menu, Search, ChevronDown, Moon, Sun, Cat, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme  } from '@/hooks/use-theme';
import ContactPopup from '@/pages/ContactPopup';
import ContactHoverWrapper from '@/pages/ContactHoverWrapper';


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
      const fullName = "ELVIN MAZWIMAIRI";
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
            <div className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center font-medium text-lg text-white hover:text-accent2 focus:outline-none">
                    <span className={location === '/codecircle' ? 'text-accent2' : ''}>
                      CodeCircle
                    </span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary border border-white border-opacity-20 p-2">
                  <DropdownMenuItem className="text-white hover:text-accent2 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/developer/codecircle" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-accent2 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/developer/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Journey</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent2 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center font-medium text-lg text-white hover:text-accent3 focus:outline-none">
                    <span className={location === '/designer' ? 'text-accent3' : ''}>
                      DesignCircle
                    </span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary border border-white border-opacity-20 p-2">
                  <DropdownMenuItem className="text-white hover:text-accent3 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/designer/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-accent3 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/designer/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Journey</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent3 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center font-medium text-lg text-white hover:text-accent4 focus:outline-none">
                    <span className={location === '/technopreneur' ? 'text-accent4' : ''}>
                      BizCircle
                    </span>
                    <ChevronDown className="ml-1 w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-primary border border-white border-opacity-20 p-2">
                  <DropdownMenuItem className="text-white hover:text-accent4 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/technopreneur/portfolio" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Portfolio</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:text-accent4 hover:bg-white hover:bg-opacity-10 cursor-pointer">
                    <Link href="/technopreneur/journey" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >Journey</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent4 transition-all duration-300 group-hover:w-full"></span>
            </div>
          </nav>

          {/* Column 3: Right Action Buttons (Right aligned) */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              onClick={toggleTheme}
              className="text-white dark:text-gray-200 p-2 hover:bg-white/10 rounded"
              aria-label="Toggle theme"
              title="Toggle light/dark mode"
            >
              {theme === 'light' ? <Moon/> : <Sun/>}
            </Button>
            {/* <div className="relative group">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2 bg-transparent text-white border border-white border-opacity-30 rounded-full px-4 hover:bg-white hover:bg-opacity-10 hover:border-opacity-100 transition-all"
              >
                CONTACT
              </Button>
              <div className="absolute top-full right-0 hidden group-hover:block mt-2">
                <ContactPopup />
              </div>
            </div> */}
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

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;