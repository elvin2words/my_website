// client/src/pages/CodeCircle.tsx

import React, { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Code2, Github, Mail, MapPin, Palette, Phone, Server, Twitter } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertContactSchema, type InsertContact } from "../../../shared/schema";
import { projects } from "../../../shared/projects";

import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {roles, skills} from "../data/codecircle";
import Header from "@/components/layout/NavHeader";
import PortfolioNav from "@/components/layout/portfolioHeader";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiGithub, SiLinkedin, SiWhatsapp } from "react-icons/si";
import BackgroundEffect from "@/components/home/BackgroundEffect";


export default function CodeCircle() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  // const form = useForm<InsertContact>({
  //   resolver: zodResolver(insertContactSchema),
  //   defaultValues: {
  //     name: "",
  //     email: "",
  //     subject: "",
  //     message: "",
  //   },
  // });

  // const contactMutation = useMutation({
  //   mutationFn: async (data: InsertContact) => {
  //     return await apiRequest("POST", "/api/contact", data);
  //   },
  //   onSuccess: () => {
  //     toast({
  //       title: "Message sent!",
  //       description: "Thank you for reaching out. I'll get back to you soon.",
  //     });
  //     form.reset();
  //   },
  //   onError: () => {
  //     toast({
  //       title: "Error",
  //       description: "Failed to send message. Please try again.",
  //       variant: "destructive",
  //     });
  //   },
  // });
    
  // Fixed Typing Effect 
  useEffect(() => {
    const fullText = roles[currentRole];
    // Still typing the word
    if (currentIndex < fullText.length) {
      const t = setTimeout(() => {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex((i) => i + 1);
      }, 80);
      return () => clearTimeout(t);
    }
    // Finished typing — pause, then move to next role
    const pause = setTimeout(() => {
      setDisplayedText("");
      setCurrentIndex(0);
      setCurrentRole((r) => (r + 1) % roles.length);
    }, 1500);

    return () => clearTimeout(pause);
  }, [currentIndex, currentRole]);


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollY(scrollTop);
      setScrollProgress(scrolled);
      setShowScrollTop(scrollTop > 200);

      const sections = ["hero", "about", "projects", "skills", "contact"];
      let currentActive = "hero";

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentActive = sectionId;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const onSubmit = (data: InsertContact) => {
  //   contactMutation.mutate(data);
  // };

  // const onSubmit = (data: InsertContact) => {
  //   contactMutation.mutate(data);
  // };

  // UI
  return (
    // <div className="min-h-screen ">
    <>
      <BackgroundEffect />

      <div className="min-h-screen">
        {/* <nav 
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border transition-all duration-300"
          style={{
            boxShadow: scrollY > 50 
              ? "0 8px 32px rgba(139, 92, 246, " + (Math.min(scrollY / 500, 0.15)) + ")"
              : "none"
          }}
        >
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary transition-all duration-300" style={{ width: `${scrollProgress}%` }} />
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => scrollToSection("hero")}
                className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent"
                data-testid="button-logo"
              >
                EM
              </button>
              
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => scrollToSection("about")}
                  className={`text-sm transition-all duration-300 relative ${
                    activeSection === "about" 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-about"
                >
                  About
                  {activeSection === "about" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 animate-pulse-slow" />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`text-sm transition-all duration-300 relative ${
                    activeSection === "projects" 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-projects"
                >
                  Projects
                  {activeSection === "projects" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 animate-pulse-slow" />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className={`text-sm transition-all duration-300 relative ${
                    activeSection === "skills" 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-skills"
                >
                  Skills
                  {activeSection === "skills" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 animate-pulse-slow" />
                  )}
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`text-sm transition-all duration-300 relative ${
                    activeSection === "contact" 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid="link-contact"
                >
                  Contact
                  {activeSection === "contact" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-chart-2 animate-pulse-slow" />
                  )}
                </button>
                <ThemeToggle />
              </div>

              <div className="md:hidden flex items-center gap-2">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  data-testid="button-mobile-menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 bg-background/50 backdrop-blur-md md:hidden animate-in fade-in duration-200">
                <div className="h-full w-full flex flex-col items-center justify-center px-4 gap-8">
                  <button
                    onClick={() => {
                      scrollToSection("about");
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-all duration-300 text-center ${
                      activeSection === "about" 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid="link-mobile-about"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("projects");
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-all duration-300 text-center ${
                      activeSection === "projects" 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid="link-mobile-projects"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("skills");
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-all duration-300 text-center ${
                      activeSection === "skills" 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid="link-mobile-skills"
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => {
                      scrollToSection("contact");
                      setMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-all duration-300 text-center ${
                      activeSection === "contact" 
                        ? "text-primary font-bold" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid="link-mobile-contact"
                  >
                    Contact
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav> */}

        {/* <PortfolioNav /> */}
        <PortfolioNav />

        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl font-bold text-primary/5 animate-falling-code"
                style={{
                  left: `${(i * 5) % 100}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                01
              </div>
            ))}
          </div>
          {/* Title */}
          {/* <div className="max-w-3xl w-full text-center"> */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to the <span className="text-accent2">CodeCircle</span>
          </h1>

          {/* Typing Effect */}
          <p className="text-2xl md:text-2xl h-10 font-mono text-accent2 mb-8">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-10 max-w-3xl leading-relaxed">
            A space where engineering, creativity, and technology merge into one
            powerful workflow. Explore my dev stack, processes, experiments, and
            the systems behind how I build modern experiences.
          </p>

          {/* CTA Button */}
          <button className="flex items-center gap-2 bg-accent2 hover:bg-accent2/80 transition px-6 py-3 rounded-lg text-white font-semibold">
            Dive In <ArrowRight className="h-4 w-4" />
          </button>
          {/* </div> */}
        </section>

        
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-black">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Crafting digital experiences with clean code and innovative solutions
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => scrollToSection("projects")}
                data-testid="button-view-work"
              >
                View My Work
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection("contact")}
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 animate-bounce"
            data-testid="button-scroll-down"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </button>
        </section>

        <section id="about" className="relative py-20 md:py-32 px-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 pointer-events-none overflow-hidden hidden md:block">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-5xl font-bold text-primary/8 animate-falling-design"
                style={{
                  left: `${(i * 7) % 100}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                ◯
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-about-heading">About Me</h2>
              <p className="text-muted-foreground text-lg">Passionate developer with expertise in modern web technologies</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6 relative z-10">
                <p className="text-lg leading-relaxed text-foreground">
                  I'm a passionate full-stack developer with expertise in creating robust, scalable web applications.
                  My journey in web development spans across various technologies and frameworks, with a focus on
                  delivering exceptional user experiences and clean, maintainable code.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  From corporate websites to e-commerce platforms, admin dashboards to mobile applications,
                  I enjoy tackling diverse challenges and bringing ideas to life through code.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Code2 className="h-4 w-4 mr-2" />
                    Clean, efficient code
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Palette className="h-4 w-4 mr-2" />
                    Mobile-first approach
                  </Badge>
                  <Badge variant="secondary" className="text-sm px-4 py-2">
                    <Server className="h-4 w-4 mr-2" />
                    Performance optimized
                  </Badge>
                </div>
              </div>

              <Card className="bg-card/50 backdrop-blur border-card-border hover-elevate">
                <CardHeader>
                  <CardTitle className="font-mono text-sm text-muted-foreground">developer.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm font-mono leading-relaxed">
                    <code className="text-foreground">
  {`const developer = {
    name: "Elvin E. Mazwimairi",
    role: "Full-Stack Systems Developer",
    skills: [
      "JavaScript", "Python", "React",
      "Node.js", "MongoDB", "PostgreSQL"
    ],
    passion: "Creating amazing digital experiences",

    getCurrentFocus() {
      return "Building scalable web applications";
    }
  };

  console.log(developer.getCurrentFocus());`}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>   

        <section id="projects" className="py-20 md:py-32 px-4 bg-gradient-to-br from-background via-card/30 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-projects-heading">Featured Projects</h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">A collection of my recent work and contributions, showcasing expertise across various technologies and industries</p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {["all", "corporate", "ecommerce", "dashboard", "portfolio"].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                    data-testid={`button-filter-${category}`}
                  >
                    {category === "all" ? "All Projects" : category === "ecommerce" ? "E-commerce" : category === "dashboard" ? "Dashboards" : category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="group relative h-full cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setLocation(`/codecircle/portfolio/project/${project.id}`);
                  }}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Card 
                    className="overflow-hidden border-card-border h-full flex flex-col bg-card/50 backdrop-blur hover-elevate relative"
                    data-testid={`card-project-${project.id}`}
                  >
                    {/* Featured Badge */}
                    {project.badges?.includes("Featured") && (
                      <div className="absolute top-0 right-0 z-20">
                        <div className="relative w-32 h-32 overflow-hidden">
                          <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-bl from-primary to-chart-2 rotate-45 flex items-center justify-center">
                            <span className="text-white text-xs font-bold transform -rotate-45">Featured</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-video bg-muted">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-1"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Overlay Actions */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        {project.liveDemo && (
                          <Button size="sm" data-testid={`button-demo-${project.id}`} className="bg-primary/95 backdrop-blur">
                            Live Demo
                          </Button>
                        )}
                        <Button size="sm" variant="outline" data-testid={`button-view-details-${project.id}`} className="backdrop-blur bg-background/50">
                          View Details
                        </Button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3 z-20">
                        <Badge className="bg-primary/90 backdrop-blur text-primary-foreground capitalize">
                          {project.category}
                        </Badge>
                      </div>

                      {/* Other Badges */}
                      {project.badges && project.badges.filter(b => b !== "Featured").length > 0 && (
                        <div className="absolute top-3 left-3 flex gap-2 flex-wrap z-20">
                          {project.badges.filter(b => b !== "Featured").map((badge) => (
                            <Badge key={badge} className="bg-chart-2/90 backdrop-blur text-primary-foreground text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <CardHeader className="flex-grow">
                      <div className="space-y-2">
                        <CardTitle className="text-xl line-clamp-2" data-testid={`text-project-title-${project.id}`}>
                          {project.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    {/* Technologies */}
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Technologies</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="secondary" 
                              className="text-xs px-2 py-0.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 4 && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-muted">
                              +{project.technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="pt-2 border-t border-border/50 grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Stack Size</p>
                          <p className="font-semibold text-foreground">{project.technologies.length} techs</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Features</p>
                          <p className="font-semibold text-foreground">{project.features?.length || 0}+</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button 
                variant="outline" 
                size="lg" 
                data-testid="button-view-github"
                className="gap-2 hover-elevate"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  View All on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="skills" className="py-20 md:py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-heading">Technical Skills</h2>
              <p className="text-muted-foreground text-lg">Technologies and tools I work with</p>
            </div>

            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="h-10 w-1 bg-gradient-to-b from-primary to-chart-2 rounded-full" />
                  Frontend Development
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {skills.frontend.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="group relative h-40 rounded-lg overflow-hidden border border-border hover-elevate cursor-default transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                        data-testid={`skill-card-${skill.name}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-3 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</span>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="h-10 w-1 bg-gradient-to-b from-chart-2 to-primary rounded-full" />
                  Backend & Databases
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {skills.backend.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="group relative h-40 rounded-lg overflow-hidden border border-border hover-elevate cursor-default transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                        data-testid={`skill-card-${skill.name}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-3 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</span>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-chart-2 via-primary to-chart-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="h-10 w-1 bg-gradient-to-b from-primary to-chart-2 rounded-full" />
                  Tools & Platforms
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {skills.tools.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="group relative h-40 rounded-lg overflow-hidden border border-border hover-elevate cursor-default transition-all duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                        data-testid={`skill-card-${skill.name}`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                          <div className="mb-3 p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{skill.name}</span>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* <div className="mt-8 flex justify-end">
                  <div className="hidden md:block">
                    <ThemeToggle />
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>


      <section id="contact" className="py-20 md:py-32 px-4 bg-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-heading">Get In Touch</h2>
            <p className="text-muted-foreground text-lg">Let's discuss your next project</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* <Card className="border-card-border">
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                {...field} 
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="john@example.com" 
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Project Inquiry" 
                                {...field}
                                data-testid="input-subject"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell me about your project..." 
                                rows={6}
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        // disabled={contactMutation.isPending}
                        data-testid="button-send-message"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card> */}
            </div>

            <div className="space-y-4">
              <Card className="border-card-border hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" data-testid="text-email">elvinmazwimairi@gmail.com</p>
                </CardContent>
              </Card>

              <Card className="border-card-border hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" data-testid="text-phone">+263 71 210 4928</p>
                </CardContent>
              </Card>

              <Card className="border-card-border hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-lg">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground" data-testid="text-location">Remote, Global</p>
                </CardContent>
              </Card>

              <Card className="border-card-border bg-gradient-to-br from-primary/10 to-chart-2/10">
                <CardHeader>
                  <CardTitle className="text-lg mb-4">Connect With Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://wa.me/263712104928"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-md bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30 transition-all duration-300 hover-elevate"
                      title="WhatsApp"
                      data-testid="link-whatsapp"
                    >
                      <SiWhatsapp className="h-5 w-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/elvinmazwi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-all duration-300 hover-elevate"
                      title="LinkedIn"
                      data-testid="link-linkedin"
                    >
                      <SiLinkedin className="h-5 w-5" />
                    </a>
                    <a
                      href="https://twitter.com/elvinmazwi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-md bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-500/30 transition-all duration-300 hover-elevate"
                      title="Twitter"
                      data-testid="link-twitter"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="https://github.com/elvinmazwi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center h-10 w-10 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 transition-all duration-300 hover-elevate"
                      title="GitHub"
                      data-testid="link-github"
                    >
                      <SiGithub className="h-5 w-5" />
                    </a>
                    <a
                      href="mailto:elvinmazwimairi@gmail.com"
                      className="flex items-center justify-center h-10 w-10 rounded-md bg-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/30 transition-all duration-300 hover-elevate"
                      title="Email"
                      data-testid="link-email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


        <footer className="border-t border-border bg-gradient-to-br from-background via-card/30 to-background py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Contact Info</h3>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Phone</p>
                    <p className="text-muted-foreground">+263 71 210 4928</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground">Remote, Global</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/elvin2words"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-foreground/10 text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="GitHub"
                    data-testid="footer-link-github"
                  >
                    <SiGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/elvin-mazwimairi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="LinkedIn"
                    data-testid="footer-link-linkedin"
                  >
                    <SiLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/elvinmazwi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-500/30 transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="Twitter"
                    data-testid="footer-link-twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/263783074722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 hover:bg-green-500/30 transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="WhatsApp"
                    data-testid="footer-link-whatsapp"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-6">Navigation</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid="footer-link-home"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid="footer-link-about"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid="footer-link-projects"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    data-testid="footer-link-contact"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} 
                  <span className="text-primary font-semibold"> Elvin E. Mazwimairi</span>. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground">
                  Built with <span className="text-primary">React</span> &amp; <span className="text-chart-2">TypeScript</span>
                </p>
              </div>
            </div>
          </div>
        </footer>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-8 md:bottom-8 z-50 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-chart-2 text-primary-foreground shadow-lg hover-elevate flex items-center justify-center transition-all duration-300 hover:shadow-2xl animate-in fade-in duration-300"
            title="Scroll to top"
            data-testid="button-scroll-to-top"
          >
            <ChevronDown className="h-6 w-6 rotate-180" />
          </button>
        )}

        {/* <div className="fixed top-8 right-8 z-50">
          <ThemeToggle />
        </div> */}
      </div>
    </>
  );
}
