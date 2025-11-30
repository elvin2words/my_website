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
        <PortfolioNav />

        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl font-bold text-white/5 animate-falling-code"
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
            Welcome to my <span className="text-accent2">CodeCircle</span>
          </h1>

          {/* Typing Effect */}
          <p className="text-2xl md:text-3xl h-10 font-mono text-accent2 mb-8">
            {displayedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-10 max-w-3xl leading-relaxed">
            A space for systems development and technological creativity. Trying to leverage
            creative engineering and emerging technologies to drive impactful, sustainable 
            innovation in an evolving technical landscape. Explore my dev stack, processes, 
            experiments, and the systems I build here.
          </p>

          {/* CTA Button */}
          <div className="flex flex-wrap gap-4 justify-center ">
            <Button 
              size="lg" 
              onClick={() => scrollToSection("projects")}
              data-testid="button-view-work"
              className="hover:bg-accent2/80 transition px-6 py-3 rounded-lg"
            >
              {/* View My Work */}
              Dive Into Work
              {/* Dive In */}
              {/* <ArrowRight className="h-4 w-4" /> */}
            </Button>
            <Button 
              size="lg" 
              // variant="outline"
              onClick={() => scrollToSection("contact")}
              data-testid="button-et-in-touch"
            >
              Get In Touch
            </Button>
          </div>          
          {/* </div> */}

          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 animate-bounce"
            data-testid="button-scroll-down"
          >
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-gray-500 transition-colors">
              <span className="text-sm">Scroll Down</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </button>          
        </section>

        {/* <section id="about" className="relative py-20 md:py-20 px-4 overflow-hidden bg-gradient-to-br from-bg-accent2 via-card/10 to-bg-accent5"> */}
        <section id="about" className="relative py-20 md:py-20 px-4 ">
          <div className="absolute left-0 top-0 bottom-0 w-full pointer-events-none overflow-hidden hidden md:block">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl font-bold text-primary/100 animate-falling-design"
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
              <p className="text-slate-400 text-lg">Elvin Builds Stuff</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-6 relative z-10">
                {/* <p className="text-lg leading-relaxed text-white"> */}
                <p className="text-gray-300 text-lg mb-1 max-w-3xl leading-relaxed">
                  Innovative Systems Engineer & Full Stack Developer with a strong foundation in electrical
                  systems, software, and AI-driven technologies. Experienced in designing and implementing
                  solutions using React.js, Node.js, and Python, integrating optimization, automation, and
                  intelligent control systems to enhance functionality and efficiency. 
                </p>
                {/* <p className="text-lg leading-relaxed text-slate-400"> */}
                <p className="text-gray-400 text-lg mb-10 max-w-3xl leading-relaxed">
                  Bridging engineering, software, and business domains, delivering scalable, user-centered systems
                  with clean APIs, responsive UIs, and AI-enhanced features.
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

              <Card className="bg-card/60 backdrop-blur border-card-border hover-elevate">
                <CardHeader>
                  <CardTitle className="font-mono text-sm text-slate-800">developer.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-sm font-mono leading-relaxed">
                    <code className="text-primary">
  {`const developer = {
    name: "Elvin E. Mazwimairi",
    role: "Full-Stack Systems Developer",
    skills: [
      "JavaScript", "Python", "React",
      "Node.js", "MongoDB", "PostgreSQL"
    ],
    passion: "Building engineering that listens, 
      design that adapts, and technology that imagines forward.",

    getCurrentFocus() {
      return "Building scalable intelligent systems";
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

        {/* <section id="about" className="relative py-20 md:py-20 px-4 overflow-hidden"> */}
        {/* <section id="projects" className="relative py-20 md:py-20 px-4 bg-gradient-to-br from-bg-accent2 via-card/10 to-bg-accent5"> */}
        <section id="projects" className="relative py-20 md:py-20 px-4">
          <div className="absolute left-0 top-0 bottom-0 w-full pointer-events-none overflow-hidden hidden md:block">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl font-bold text-primary/100 animate-falling-design"
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-projects-heading">Featured Projects</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">A collection of my recent work and contributions, across various technologies and use cases.</p>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {["all", "corporate", "ecommerce", "dashboard", "portfolio"].map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "capitalize border-b-2 border-slate-500" : "capitalize bg-slate-500"}
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
                  className="group relative h-full cursor-pointer transform transition-all duration-100 hover:scale-105"
                  style={{ animationDelay: `${index * 10}ms` }}
                >
                  <Card 
                    className="overflow-hidden border-card-border h-full flex flex-col bg-card/60 backdrop-blur hover-elevate relative"
                    data-testid={`card-project-${project.id}`}
                  >
                    {/* Featured Badge */}
                    {project.badges?.includes("Featured") && (
                      <div className="absolute top-0 right-0 z-20">
                        <div className="relative w-32 h-32 overflow-hidden">
                          <div className="absolute -right-8 -top-8 w-32 h-32 bg-accent4 from-primary to-chart-2 rotate-45 flex items-center justify-center">
                            <span className="text-white text-xs font-bold transform -rotate-45">Featured</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative overflow-hidden aspect-video bg-accent2">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-100 group-hover:scale-125 group-hover:rotate-1"
                      />
                      {/* <div className="absolute inset-0 bg-gradient-to-t from-bg-accent2 via-bg-accent4/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
                      
                      {/* Overlay Actions */}
                      {/* Exxpose these buttons such that each can be cicked */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        {project.liveDemo && (
                          <Button 
                            // onClick={() => {
                            //   window.scrollTo(0, 0);
                            //   setLocation(`/codecircle/portfolio/project/${project.id}`);
                            // }}
                            // Make the onclick navigate to foreign link
                            size="sm" data-testid={`button-demo-${project.id}`} className="bg-primary/95 backdrop-blur"
                          >
                            Live Demo
                          </Button>
                        )}
                        <Button 
                          onClick={() => {
                            window.scrollTo(0, 0);
                            setLocation(`/codecircle/portfolio/project/${project.id}`);
                          }}
                          size="sm" variant="outline" data-testid={`button-view-details-${project.id}`} className="backdrop-blur bg-background/50"
                        >
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
                        <CardDescription className="line-clamp-2 text-sm text-slate-900 leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    {/* Technologies */}
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Technologies</p>
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
                          <p className="text-slate-600">Stack Size</p>
                          <p className="font-semibold text-white">{project.technologies.length} techs</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-slate-600">Features</p>
                          <p className="font-semibold text-slate-400">{project.features?.length || 0}+</p>
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
                className="gap-2 hover-elevate bg-slate-900"
                asChild
              >
                <a href="https://github.com/elvin2words" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
        
        <section id="skills" className=" relative py-20 md:py-20 px-4">
          <div className="absolute left-0 top-0 bottom-0 w-full pointer-events-none overflow-hidden hidden md:block">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl font-bold text-primary/100 animate-falling-design"
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
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-skills-heading">Technical Skills</h2>
              <p className="text-slate-400 text-lg">Technologies and tools I work with</p>
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
                          <div className="mb-3 p-3 rounded-lg bg-accent2/10 group-hover:bg-primary/20 transition-colors duration-100">
                            <Icon className="h-8 w-8 text-slate-300 group-hover:scale-110 group-hover:text-white transition-transform duration-100" />
                          </div>
                          <span className="font-semibold text-slate-500 group-hover:text-white transition-colors duration-300">{skill.name}</span>
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
                            <Icon className="h-8 w-8 text-slate-300 group-hover:scale-110 group-hover:text-white transition-transform duration-100" />
                          </div>
                          <span className="font-semibold text-slate-500 group-hover:text-white transition-colors duration-300">{skill.name}</span>
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
                            <Icon className="h-8 w-8 text-slate-300 group-hover:scale-110 group-hover:text-white transition-transform duration-100" />
                          </div>
                          <span className="font-semibold text-slate-500 group-hover:text-white transition-colors duration-300">{skill.name}</span>
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

        {/* <section id="contact" className="py-20 md:py-20 px-4 bg-gradient-to-br from-bg-accent2 via-card/10 to-bg-accent5"> */}
        <section id="contact" className="relative py-20 md:py-20 px-4 ">
          <div className="absolute left-0 top-0 bottom-0 w-full pointer-events-none overflow-hidden hidden md:block">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl font-bold text-primary/100 animate-falling-design"
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-heading">Get In Touch</h2>
              <p className="text-slate-500 text-lg">Let's discuss your next project</p>
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
                <Card className="border-card-border bg-gray-800 hover-elevate">
                  {/* <BackgroundEffect /> */}
                  <CardHeader>
                    <CardTitle className="flex items-center text-white gap-3 text-lg">
                      <div className="h-10 w-10 rounded-md bg-white/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400" data-testid="text-email">elvinmazwimairi@gmail.com</p>
                  </CardContent>
                </Card>

                <Card className="border-card-border bg-gray-800 hover-elevate">
                  <CardHeader>
                    <CardTitle className="flex items-center  text-white gap-3 text-lg">
                      <div className="h-10 w-10 rounded-md bg-white/10 flex items-center justify-center">
                        <Phone className="h-5 w-5  text-white" />
                      </div>
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400" data-testid="text-phone">+263 71 210 4928</p>
                  </CardContent>
                </Card>

                <Card className="border-card-border bg-gray-800 hover-elevate">
                  <CardHeader>
                    <CardTitle className="flex items-center  text-white gap-3 text-lg">
                      <div className="h-10 w-10 rounded-md bg-white/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400" data-testid="text-location">Remote, Global</p>
                  </CardContent>
                </Card>

                <div className="border-card-border rounded-lg py-3 px-3 justify-between bg-gray-800 bg-gradient-to-br from-primary/10 to-chart-2/10">
                  <p className="text-lg mb-4 text-center">Connect With Me</p>
                  <div className="flex flex-wrap justify-between mb-3 px-3">
                      <a
                        href="https://wa.me/26378074722"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-green-800 text-green-50 dark:text-green-400 hover:bg-green-500 transition-all duration-300 hover-elevate"
                        title="WhatsApp"
                        data-testid="link-whatsapp"
                      >
                        <SiWhatsapp className="h-5 w-5" />
                      </a>
                      <a
                        href="https://linkedin.com/in/elvin-mazwimairi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-800 text-blue-100 dark:text-blue-400 hover:bg-blue-500 transition-all duration-300 hover-elevate"
                        title="LinkedIn"
                        data-testid="link-linkedin"
                      >
                        <SiLinkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="https://twitter.com/young_mazwi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-sky-800 text-sky-100 dark:text-sky-400 hover:bg-sky-500 transition-all duration-300 hover-elevate"
                        title="Twitter"
                        data-testid="link-twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href="https://github.com/elvin2words"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-black text-white hover:bg-white/20 transition-all duration-300 hover-elevate"
                        title="GitHub"
                        data-testid="link-github"
                      >
                        <SiGithub className="h-5 w-5" />
                      </a>
                      <a
                        href="mailto:elvinmazwimairi@gmail.com"
                        className="flex items-center justify-center h-10 w-10 rounded-md bg-red-800 text-red-100 dark:text-red-400 hover:bg-red-500 transition-all duration-300 hover-elevate"
                        title="Email"
                        data-testid="link-email"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        <footer className=" py-12 px-4 bg-primary/60 backdrop-blur-lg  border-border transition-all duration-300">
          {/* <BackgroundEffect /> */}
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Contact Info</h3>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Phone</p>
                    <p className="text-slate-400">+263 71 210 4928</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Location</p>
                    <p className="text-slate-400">Remote, Global</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Let's Connect</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/elvin2words"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-black text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="GitHub"
                    data-testid="footer-link-github"
                  >
                    <SiGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/elvin-mazwimairi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-blue-800 text-blue-100 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="LinkedIn"
                    data-testid="footer-link-linkedin"
                  >
                    <SiLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://twitter.com/elvinmazwi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-sky-800 text-sky-100 dark:text-sky-400 hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="Twitter"
                    data-testid="footer-link-twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/263783074722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-green-800 text-green-100 dark:text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center hover-elevate"
                    title="WhatsApp"
                    data-testid="footer-link-whatsapp"
                  >
                    <SiWhatsapp className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-6">Navigation</h3>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection("hero")}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid="footer-link-home"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid="footer-link-about"
                  >
                    About
                  </button>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                    data-testid="footer-link-projects"
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
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
                <p className="text-sm text-slate-400">
                  &copy; {new Date().getFullYear()} 
                  <span className="text-white font-semibold"> Elvin E. Mazwimairi</span>. All rights reserved.
                </p>
                <p className="text-sm text-slate-400">
                  Built with <span className="text-white">React</span> &amp; <span className="text-chart-2">TypeScript</span>
                </p>
              </div>
            </div>
          </div>
        </footer>


        {/* <div className="fixed top-8 right-8 z-50">
          <ThemeToggle />
        </div> */}
      </div>
    </>
  );
}
