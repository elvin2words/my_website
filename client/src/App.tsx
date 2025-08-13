// src/App.tsx

import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { DragProvider } from "./context/DragContext";

import React, { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

import Home from "@/pages/Home";
import Engineer from "@/pages/Engineer";
import Developer from "@/pages/Developer";
import Designer from "@/pages/Designer";
import Technopreneur from "@/pages/Technopreneur";
import Human from "@/pages/Human";
import NotFound from "@/pages/not-found";
import Admin from './pages/Admin';
import CodeCirclePage from "./pages/CodeCircle";
// import BizCircle from "./pages/BusinessCircle";
// import DesCircle from "./pages/DesignCircle";
// import ViewAll from "./pages/ProjectShowcase";

import ContactProfilePage from "./pages/ContactProfileCard";
import ResumePage from "./pages/ResumePage";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


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

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className=" z-50 fixed bottom-14 right-6 bg-accent2 text-white p-3 rounded-full shadow-md hover:scale-105 transition will-change-transform translate-z-0 backface-hidden"
    >
      <ArrowUp className="h-5 w-5" />
      {/* <span className="sr-only">Scroll to top</span> */}
    </button>
  ) : null;
};


function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/engineer" component={Engineer} />
          <Route path="/developer" component={Designer} />
          <Route path="/technopreneur" component={Developer} />
          <Route path="/designer" component={Technopreneur} />
          <Route path="/human" component={Human} />
          <Route path="/admin" component={Admin} />
          <Route path="/contact-profile-card" component={ContactProfilePage} />
          <Route path="/resume" component={ResumePage} />
          {/* <Route path="/projects" component={ViewAll} /> */}
          {/* <Route path="/codecircle" component={CodeCircle} /> */}
          {/* <Route path="/bizcircle" component={BizCircle} /> */}
          {/* <Route path="/descircle" component={DesCircle} /> */}
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
      <ScrollToTop />   
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DragProvider>
          <div className="bg-gradient-to-br from-primary to-secondary min-h-screen text-white font-inter overflow-x-hidden">
            <Toaster />
            <Router />
          </div>
        </DragProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;