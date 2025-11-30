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
import CreativeTechnologist from "@/pages/Creative";
import Technopreneur from "@/pages/Technopreneur";
import JustElvin from "@/pages/JustElvin";
import NotFound from "@/pages/not-found";
import Admin from './pages/Admin';
import CodeCircle from "./pages/CodeCircle";
import ProjectDetail from "./pages/ProjectDetail";
// import BizCircle from "./pages/BusinessCircle";
// import DesCircle from "./pages/DesignCircle";
// import ViewAll from "./pages/ProjectShowcase";

import ContactProfilePage from "./pages/ContactProfileCard";
import ResumePage from "./pages/ResumePage";
import ServicesPage from "./pages/Services";

import Header from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";
import ChatbotButton from "@/components/home/ChatbotButton";


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

    <div className="flex-grow">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/engineer" component={Engineer} />
        <Route path="/creative" component={CreativeTechnologist} />
        <Route path="/developer" component={Developer} />
        <Route path="/technopreneur" component={Technopreneur} />
        <Route path="/beyond" component={JustElvin} />
        <Route path="/admin" component={Admin} />

        <Route path="/contact-profile-card" component={ContactProfilePage} />
        <Route path="/resume" component={ResumePage} />
        <Route path="/hire" component={ServicesPage} />

        <Route path="/codecircle/portfolio" component={CodeCircle} />
        {/* <Route path="/projects" component={ViewAll} /> */}
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


// App Root — super light, fast, stable
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={100}>
        <DragProvider>
          <div className="bg-gradient-to-br from-primary to-secondary min-h-screen text-white font-inter overflow-x-hidden">
            <Toaster />
            <Router />
          </div>
        </DragProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;