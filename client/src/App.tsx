// src/App.tsx

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip"; 
import { ThemeProvider } from "@/components/theme-provider";
import { DragProvider } from "./context/DragContext";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

import Home from "@/pages/Home";
import Engineer from "@/pages/Engineer";
import Developer from "@/pages/Developer";
import CreativeTechnologist from "@/pages/Creative";
import DesignCircle from "@/pages/DesignCircle";
import GalleryPage from "@/pages/Gallery";
import BlogWritingsPage from "@/pages/BlogWritings";
import VisualDesignsPage from "@/pages/VisualDesigns";
import PrivacyPolicyPage from "@/pages/PrivacyPolicy";
import TermsOfServicePage from "@/pages/TermsOfService";
import Technopreneur from "@/pages/Technopreneur";
import JustElvin from "@/pages/JustElvin";
import NotFound from "@/pages/not-found";
import Admin from './pages/Admin';
import CodeCircle from "./pages/CodeCircle";
import ProjectDetail from "./pages/ProjectDetail";
// import BizCircle from "./pages/BusinessCircle";
// import DesCircle from "./pages/DesignCircle";
import Showcase from "./pages/ProjectsShowcase";

import ContactProfilePage from "./pages/ContactProfileCard";
import ResumePage from "./pages/ResumePage";
import ServicesPage from "./pages/Services";

import ChatbotButton from "@/components/home/ChatbotButton";
import RouteSeo from "@/components/seo/RouteSeo";


// Smooth scroll to top button
const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // if (!visible) return null;

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className=" z-50 fixed bottom-20 right-6 bg-accent2 text-white p-3 rounded-full shadow-md hover:scale-105 transition will-change-transform translate-z-0 backface-hidden"
    >
      <ArrowUp className="h-4 w-4" />
      {/* <span className="sr-only">Scroll to top</span> */}
    </button>
  ) : null;
};


// function Router() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
   
//     </div>
//   );
// }

// Memoized Router so layout does NOT re-mount
const Router = React.memo(() => (
  <div className="flex flex-col min-h-screen">
    {/* <Header /> */}
    <RouteSeo />

    <div className="flex-grow">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/engineer" component={Engineer} />
        <Route path="/engineer/portfolio" component={Engineer} />
        <Route path="/engineer/journey" component={Engineer} />
        <Route path="/creative" component={CreativeTechnologist} />
        <Route path="/creative/journey" component={VisualDesignsPage} />
        <Route path="/creative/visual-designs" component={VisualDesignsPage} />
        <Route path="/creative/portfolio" component={DesignCircle} />
        <Route path="/creative/gallery" component={GalleryPage} />
        <Route path="/creative/blog" component={BlogWritingsPage} />
        <Route path="/designcircle" component={DesignCircle} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/blog" component={BlogWritingsPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/developer" component={Developer} />
        <Route path="/technopreneur" component={Technopreneur} />
        <Route path="/beyond" component={JustElvin} />
        <Route path="/admin" component={Admin} />

        <Route path="/contact-profile-card" component={ContactProfilePage} />
        <Route path="/resume" component={ResumePage} />
        <Route path="/hire" component={ServicesPage} />

        <Route path="/codecircle/portfolio" component={CodeCircle} />
        <Route path="/codecircle/journey" component={CodeCircle} />
        <Route path="/projects" component={Showcase} />
        <Route path="/codecircle/portfolio/project/:id" component={ProjectDetail} />
        {/* <Route path="/bizcircle" component={BizCircle} /> */}
        {/* <Route path="/descircle" component={DesCircle} /> */}

        <Route component={NotFound} />
      </Switch>
    </div>

    <ChatbotButton />
    {/* <Footer /> */}
    <ScrollToTop />
  </div>
));

const AppPreloader: React.FC<{ exiting: boolean }> = ({ exiting }) => (
  <div
    className={`fixed inset-0 z-[120] flex items-center justify-center transition-opacity duration-500 ${
      exiting ? "opacity-0 pointer-events-none" : "opacity-100"
    }`}
  >
    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm transition-colors duration-300" />
    <div
      className={`relative flex flex-col items-center gap-4 rounded-3xl border border-border bg-card/70 px-8 py-8 shadow-[0_20px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-transform duration-500 ${
        exiting ? "scale-95" : "scale-100"
      }`}
    >
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 rounded-full border border-border" />
        <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-accent2 border-r-accent3 animate-spin" />
        <div
          className="absolute inset-4 rounded-full border-2 border-transparent border-b-accent4"
          style={{ animation: "spin 1.8s linear infinite reverse" }}
        />
        <div className="absolute inset-[38%] rounded-full bg-foreground/80 shadow-[0_0_18px_rgba(51,65,85,0.45)] animate-pulse" />
      </div>
      <p className="text-sm md:text-base font-medium tracking-[0.14em] uppercase text-foreground/90">
        Loading Portfolio
      </p>
      <p className="text-xs text-foreground/65">Preparing a smoother experience...</p>
    </div>
  </div>
);


// App Root — super light, fast, stable
const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderExiting, setPreloaderExiting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const visibleMs = reducedMotion ? 450 : 1100;
    const exitMs = 380;

    const beginExit = window.setTimeout(() => setPreloaderExiting(true), visibleMs);
    const hide = window.setTimeout(() => setShowPreloader(false), visibleMs + exitMs);

    return () => {
      window.clearTimeout(beginExit);
      window.clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showPreloader ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider delayDuration={20}>
          <DragProvider>
            <div className="bg-gradient-to-br from-primary to-secondary min-h-screen text-foreground transition-colors duration-300 overflow-x-hidden">
              {showPreloader && <AppPreloader exiting={preloaderExiting} />}
              <Toaster />
              <Router />
            </div>
          </DragProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
