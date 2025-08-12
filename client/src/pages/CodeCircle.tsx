// client/src/pages/CodeCircle.tsx
// CodeCircle Page with enhanced animations and interactions

import React, { useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Optional: you can move these to styled-components or CSS modules
// import './style.css'; // your base styles including variables, themes, animations, layout

const CodeCirclePage: React.FC = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navToggleRef = useRef<HTMLButtonElement>(null);
  const navMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ===== Preloader =====
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (preloader) preloader.style.opacity = '0';
        setTimeout(() => {
          if (preloader) preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });

    // ===== Typing Effect =====
    const texts = [
      'Full-Stack Development',
      'Frontend Specialism',
      'Backend Engineering',
      'UI/UX Designing',
      'Problem Solving',
      'Vibe Coding',
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
      const currentText = texts[textIndex];
      if (typingRef.current) {
        if (isDeleting) {
          typingRef.current.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          typingRef.current.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        if (!isDeleting && charIndex === currentText.length) {
          typeSpeed = 2000;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
      }
    };
    typeEffect();

    // ===== AOS =====
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });

    // ===== Navigation Toggle =====
    const navToggle = navToggleRef.current;
    const navMenu = navMenuRef.current;

    const toggleMenu = () => {
      navToggle?.classList.toggle('active');
      navMenu?.classList.toggle('active');
    };

    navToggle?.addEventListener('click', toggleMenu);

    // ===== Scroll Effects =====
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.width = `${(scrollY / maxScroll) * 100}%`;

      if (scrollY > 100) {
        navRef.current?.classList.add('scrolled');
      } else {
        navRef.current?.classList.remove('scrolled');
      }
    });

    // ===== Service Worker =====
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => console.log('SW registered', reg))
        .catch((err) => console.log('SW registration failed', err));
    }
  }, []);

  return (
    <>
      {/* ===== Preloader ===== */}
      <div id="preloader" className="preloader"></div>

      {/* ===== Navbar ===== */}
      <nav id="navbar" className="navbar" ref={navRef}>
        <div className="nav-brand">CodeCircle</div>
        <button id="nav-toggle" ref={navToggleRef} className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div id="nav-menu" ref={navMenuRef} className="nav-menu">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
      </nav>

      {/* ===== Hero Section ===== */}
      <section id="hero" className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content" data-aos="fade-up">
          <h1>Hello, I'm Elvin</h1>
          <h2>
            I do <span className="typing-text" ref={typingRef}></span>
          </h2>
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="projects" className="projects">
        <div className="section-header">My Projects</div>
        <div className="filters">
          <button className="filter-btn active" data-filter="all">All</button>
          <button className="filter-btn" data-filter="web">Web</button>
          <button className="filter-btn" data-filter="mobile">Mobile</button>
        </div>
        <div className="project-grid">
          <div className="project-card" data-category="web" data-aos="zoom-in">Web Project 1</div>
          <div className="project-card" data-category="mobile" data-aos="zoom-in">Mobile Project 1</div>
          {/* Add more cards as needed */}
        </div>
      </section>

      {/* ===== Skills Section ===== */}
      <section id="skills" className="skills">
        <div className="section-header">Skills</div>
        <div className="skill-category" data-aos="fade-right">React</div>
        <div className="skill-category" data-aos="fade-right">Node.js</div>
        <div className="skill-category" data-aos="fade-right">Tailwind</div>
      </section>

      {/* ===== Contact Section ===== */}
      <section id="contact" className="contact">
        <div className="section-header">Contact Me</div>
        <form className="contact-form">
          <div className="form-group">
            <input type="text" name="name" placeholder="Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Message" rows={5} required></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
    </>
  );
};

export default CodeCirclePage;
