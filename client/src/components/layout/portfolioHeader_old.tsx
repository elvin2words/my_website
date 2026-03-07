// client/src/components/layout/potfolioHeader.tsx

"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Menu, X } from "lucide-react";

export default function PortfolioNav() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  // ---- Scroll Tracking ----
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (y / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ---- Section Tracking ----
  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });
  };

  const handleBackClick = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-primary/60 backdrop-blur-lg  border-border transition-all duration-300"
      style={{
        boxShadow:
          scrollY > 50
            ? `0 8px 64px rgba(139, 92, 246, ${Math.min(
                scrollY / 500,
                0.15
              )})`
            : "none",
      }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary"
        style={{ width: `${scrollProgress}%` }}
        layout
        transition={{ duration: 0.2 }}
      />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo + Back Button */}
          <div className="flex items-center hover:text-accent2 gap-2">
            <Button
              variant="ghost"
              size="default"
              onClick={handleBackClick}
              className="p-0"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Main Site
            </Button>
            {/* <button
              onClick={() => scrollToSection("hero")}
              className="text-lg font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text "
              data-testid="button-logo"
            >
              Code Circle
            </button> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {["about", "projects", "skills", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => scrollToSection(sec)}
                className={`text-sm transition-all duration-300 relative capitalize ${
                  activeSection === sec
                    ? "text-white font-semibold"
                    : "text-muted hover:text-accent2"
                }`}
                data-testid={`link-${sec}`}
              >
                {sec}
                <AnimatePresence>
                  {activeSection === sec && (
                    <motion.div
                      layoutId="active-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2"
                      initial={{ opacity: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.8 }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
            {/* <ThemeToggle /> */}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* <ThemeToggle /> */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 animate-in fade-in duration-200" />
               ) : (
                <Menu className="w-6 h-6 animate-in fade-in duration-200" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              key="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              key="mobile-menu-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute right-0 top-0 flex h-full w-[86%] max-w-xs flex-col border-l border-border bg-primary/95 p-4 shadow-[0_16px_48px_rgba(2,6,23,0.35)]"
            >
              <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                <p className="text-xs uppercase tracking-[0.12em] text-foreground/65">CodeCircle Menu</p>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2">
                {["about", "projects", "skills", "contact"].map((sec) => (
                  <button
                    key={sec}
                    onClick={() => {
                      scrollToSection(sec);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm capitalize transition ${
                      activeSection === sec
                        ? "border-transparent bg-card text-foreground"
                        : "border-border bg-background/45 text-foreground/75 hover:bg-background/70"
                    }`}
                    data-testid={`mobile-${sec}`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Full-width border line under header that spans from cat icon to search/menu icon */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <div className="border-b border-white border-opacity-20"></div>
      </div> */}
    </motion.nav>
  );
}


// export default PortfolioNav;
