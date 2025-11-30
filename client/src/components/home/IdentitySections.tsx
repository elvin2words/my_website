// src/components/home/IdentitySections.tsx

import React, { useRef, useState, useEffect } from 'react';
import IdentityCard from './IdentityCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu , Code ,PenTool, FolderOpen,  } from 'lucide-react';

// const isDesktop = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const identities = [
  { identity: "engineer", bulletPoints: ["Power systems design & control", "Embedded hardware development", "Energy automation & optimization"], icon: <Cpu className="h-8 w-8" /> },
  { identity: "developer", bulletPoints: ["Python, React, Node.js, TypeScript", "RESTful APIs & database architecture", "Progressive UI/UX design systems"] },
  { identity: "creative", bulletPoints: ["Figma + Framer Motion workflows", "Systems thinking & human-centered design", "Responsive layout & accessibility"] },
  { identity: "technopreneur", bulletPoints: ["MVP design & market fit testing", "Lean startup & value proposition design", "Social entrepreneurship"] },
  { identity: "beyond", bulletPoints: ["Visual arts, music, and storytelling", "Faith and purpose-driven living", "Reflective writing and philosophy"] }
];

const IdentitySections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
  //   const [dragStates, setDragStates] = useState<{[key: number]: {x: number, y: number}}>({});

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.identity-card-observe') || [];
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (entry.isIntersecting) {
            setVisibleIndexes(prev => (prev.includes(index) ? prev : [...prev, index]));
            observer.unobserve(entry.target); // instead of disconnecting all
          }
        });
      },
      { threshold: 0.15, rootMargin: '80px' }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  // // Drag handlers (desktop only)
  // const handleMouseDown = (e: React.MouseEvent, index: number) => {
  //   if (!isDesktop()) return;
  //   e.preventDefault();
  //   const startX = e.clientX;
  //   const startY = e.clientY;

  //   const onMouseMove = (moveEvent: MouseEvent) => {
  //     moveEvent.preventDefault();
  //     const dx = moveEvent.clientX - startX;
  //     const dy = moveEvent.clientY - startY;
  //     // Limit drag distance to ±15px
  //     const limitedX = Math.max(-15, Math.min(15, dx));
  //     const limitedY = Math.max(-15, Math.min(15, dy));
  //     setDragStates(prev => ({ ...prev, [index]: { x: limitedX, y: limitedY } }));
  //   };

  //   const onMouseUp = (upEvent: MouseEvent) => {
  //     upEvent.preventDefault();
  //     setDragStates(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  //     window.removeEventListener('mousemove', onMouseMove);
  //     window.removeEventListener('mouseup', onMouseUp);
  //   };
  //   window.addEventListener('mousemove', onMouseMove);
  //   window.addEventListener('mouseup', onMouseUp);
  // };

  return (
    <section id="identityCards" className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 md:p-6 sm:gap-6 md:gap-8"
      >
        <AnimatePresence>
          {identities.map((item, index) => (
            // visibleIndexes.includes(index) && ( 
              <motion.div
                key={item.identity}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                whileHover={{ scale: 1.05 }}
                // drag
                // dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                // dragElastic={0.15}
                // whileTap={{ cursor: "grabbing" }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.08 }}
                className="identity-card-observe h-full w-full flex"
                data-index={index}
                //  className={`identity-card-observe h-full w-full flex cursor-grab transition-transform duration-300 ease-out
                //    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                //    hover:z-10 hover:scale-105 hover:shadow-lg`}
                //  onMouseDown={e => handleMouseDown(e, index)}
                //  style={{
                //    transitionDelay: `${index * 80}ms`,
                //    transform: `translateX(${drag.x}px) translateY(calc(${drag.y}px + ${isVisible ? '0' : '3rem'})) scale(${drag.x !== 0 || drag.y !== 0 ? 1.05 : 1})`
                //  }}
              >
                <IdentityCard {...item} animateIn delay={index * 0.08} />
              </motion.div>
            // )
          ))}
        </AnimatePresence> 
      </div>
    </section>
  );
};

export default IdentitySections;
