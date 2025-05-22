import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { DragProvider } from "./context/DragContext";

// Pages
import Home from "@/pages/Home";
import Engineer from "@/pages/Engineer";
import Developer from "@/pages/Developer";
import Designer from "@/pages/Designer";
import Technopreneur from "@/pages/Technopreneur";
import Human from "@/pages/Human";
import NotFound from "@/pages/not-found";
import Admin from './pages/Admin';

// Layout
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/engineer" component={Engineer} />
          <Route path="/developer" component={Developer} />
          <Route path="/designer" component={Designer} />
          <Route path="/technopreneur" component={Technopreneur} />
          <Route path="/human" component={Human} />
          <Route path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
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