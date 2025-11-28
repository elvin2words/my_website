// src/pages/CodeCircle.tsx

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const roles = [
  "Frontend Developer",
  "Fullstack Engineer",
  "Creative Technologist",
  "React + Typescript Builder",
  "Systems Integrator",
];

export default function CodeCircle() {
  const [currentRole, setCurrentRole] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  // -----------------------------------------------------
  // ✅ Fixed Typing Effect — No Infinite Loops
  // -----------------------------------------------------
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

  // -----------------------------------------------------
  // UI
  // -----------------------------------------------------
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-6">
      <div className="max-w-3xl w-full text-center">

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to the <span className="text-accent2">CodeCircle</span>
        </h1>

        {/* Typing Effect */}
        <p className="text-xl md:text-2xl h-10 font-mono text-accent2 mb-8">
          {displayedText}
          <span className="animate-pulse">|</span>
        </p>

        {/* Description */}
        <p className="text-gray-300 text-lg mb-10 leading-relaxed">
          A space where engineering, creativity, and technology merge into one
          powerful workflow. Explore my dev stack, processes, experiments, and
          the systems behind how I build modern experiences.
        </p>

        {/* CTA Button */}
        <button className="flex items-center gap-2 bg-accent2 hover:bg-accent2/80 transition px-6 py-3 rounded-lg text-white font-semibold">
          Dive In <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
