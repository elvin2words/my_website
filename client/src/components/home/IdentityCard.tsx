// src/components/home/IdentityCard.tsx

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDrag } from '@/context/DragContext';
import { identityColors, identityIcons, identityDescriptions } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface IdentityCardProps {
  identity: string;
  bulletPoints?: string[];
  animateIn?: boolean;
  delay?: number;
}

const IdentityCard: React.FC<IdentityCardProps> = ({
  identity,
  bulletPoints = [],
  animateIn = false,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerDraggable } = useDrag();
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (ref.current) {
      registerDraggable(`identity-${identity}`, ref);
    }
  }, [identity, registerDraggable]);

  const { color, bgColor } = identityColors[identity] || { color: 'text-white', bgColor: 'bg-white' };
  const { title, role, description } = identityDescriptions[identity] || {
    title: 'Unknown Identity',
    role: 'As A',
    description: 'Description',
  };
  const iconName = identityIcons[identity] || 'help-circle';

  const dragConstraints = { left: -100, right: 100, top: -50, bottom: 50 };

  const backgroundImage =
    identity === 'human'
      ? 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))'
      : 'none';

  // Prevent click navigation if dragging
  const [preventClick, setPreventClick] = useState(false);      

  return (
    <Link to={`/${identity}#${identity}`} 
      // onClick={e => {
      //     if (preventClick) {
      //       e.preventDefault();
      //       setPreventClick(false);
      //     } else {
      //       window.scrollTo({ top: 0, behavior: 'smooth' });
      //     }
      //   }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block w-full h-full">
      <motion.div
        ref={ref}
        drag={isMobile ? false : true}
        dragConstraints={isMobile ? false : dragConstraints}
        dragElastic={0.5}
        whileHover={!isMobile ? { scale: 1.05, rotate: 0.3,  boxShadow: '0 8px 15px rgba(0,0,0,0.3)' } : {}}
        whileTap={{ scale: 0.97 }}
        animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
          boxShadow: { duration: 0.3 },
        }}
        className="bg-white bg-opacity-5 backdrop-blur-sm hover:bg-opacity-10 transition-all duration-300 rounded-xl p-6 border-2 border-white border-opacity-20 relative overflow-hidden shadow-lg h-full w-full will-change-transform translate-z-0 contain-paint"
        // className={`bg-white bg-opacity-5 backdrop-blur-sm hover:bg-opacity-10 transition-all duration-300 rounded-xl p-6 border-2 border-white border-opacity-20 relative overflow-hidden shadow-lg h-full w-full will-change-transform translate-z-0 contain-paint
        //   ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ backgroundImage }}
        onDragStart={() => {
          setIsDragging(true);
          setPreventClick(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
          setTimeout(() => setPreventClick(false), 100); // small delay to prevent accidental click
        }}
      >
        <div className={`absolute top-0 right-0 ${bgColor} w-1/3 h-1.5`}></div>
        <div className={`identity-marker uppercase text-xs tracking-wider font-semibold ${color} mb-2`}>
          {role}
        </div>
        {/* 
        <div
          className={`${color} rounded-full w-20 h-20 flex items-center justify-center text-white shadow-md`}
        >
          {icon}
        </div> */}
        <h3 className="text-xl md:text-2xl font-bold mb-4">
          {title} <span className={`${color} text-sm`}>✦</span>
        </h3>

        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full ${bgColor} bg-opacity-30 mr-4 shadow-inner flex-shrink-0`}>
            {/* Inline icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-6 h-6 ${color}`}
            >
              {/* icon paths same as before */}
            </svg>
          </div>
          <div className="text-sm text-white font-medium">{description}</div>
        </div>

        {/* <div
          className={`inline-flex items-center ${color} text-sm font-medium border border-opacity-30 border-white px-3 py-1.5 rounded-lg hover:bg-opacity-10 hover:bg-white transition-all mt-2`}
        >
          Click to Explore
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div> */}

        {bulletPoints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-20">
            <div className="text-sm text-white">
              {bulletPoints.map((point, idx) => (
                <p key={idx} className="flex items-start mb-1">
                  <span className={`${color} mr-2`}>•</span>
                  <span>{point}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default IdentityCard;

