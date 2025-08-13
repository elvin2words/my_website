// src/components/home/IdentitySections.tsx

import React, { useRef, useState, useEffect } from 'react';
import IdentityCard from './IdentityCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu , Code ,PenTool, FolderOpen,  } from 'lucide-react';

const identities = [
  { identity: "engineer", bulletPoints: ["Power systems design & control", "Embedded hardware development", "Energy automation & optimization"], icon: <Cpu className="h-8 w-8" /> },
  { identity: "developer", bulletPoints: ["Python, React, Node.js, TypeScript", "RESTful APIs & database architecture", "Progressive UI/UX design systems"] },
  { identity: "designer", bulletPoints: ["Figma + Framer Motion workflows", "Systems thinking & human-centered design", "Responsive layout & accessibility"] },
  { identity: "technopreneur", bulletPoints: ["MVP design & market fit testing", "Lean startup & value proposition design", "Social entrepreneurship"] },
  { identity: "human", bulletPoints: ["Visual arts, music, and storytelling", "Faith and purpose-driven living", "Reflective writing and philosophy"] }
];

const IdentitySections: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

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

  return (
    <section id="identityCards" className="relative">
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 md:p-6 sm:gap-6 md:gap-8"
      >
        {/* {identities.map((item, index) => (
          <motion.div
            key={item.identity} 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="identity-card-observe h-full w-full flex"
            data-index={index}
          >
            <IdentityCard
              identity={item.identity}
              bulletPoints={item.bulletPoints}
              animateIn={visibleIndexes.includes(index)}
              delay={index * 0.08}
            />
          </motion.div>
        ))} */}

        {/* <AnimatePresence>
          {identities.map((item, index) => (
            visibleIndexes.includes(index) && (
              <motion.div
                key={item.identity}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.08 }}
                className="identity-card-observe h-full w-full flex"
                data-index={index}
              >
                <IdentityCard {...item} animateIn delay={index * 0.08} />
              </motion.div>
            )
          ))}
        </AnimatePresence>  */}

        <AnimatePresence>
          {identities.map((item, index) => (
            // visibleIndexes.includes(index) && ( 
              <motion.div
                key={item.identity}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.08 }}
                className="identity-card-observe h-full w-full flex"
                data-index={index}
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

