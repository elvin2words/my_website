import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDrag } from '@/context/DragContext';
import { identityColors, identityIcons, identityDescriptions } from '@/lib/utils';

interface IdentityCardProps {
  identity: string;
  bulletPoints?: string[];
}

const IdentityCard: React.FC<IdentityCardProps> = ({ identity, bulletPoints = [] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerDraggable } = useDrag();
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (ref.current) {
      registerDraggable(`identity-${identity}`, ref);
    }
  }, [identity, registerDraggable]);

  const { color, bgColor } = identityColors[identity] || { 
    color: 'text-white', 
    bgColor: 'bg-white' 
  };
  
  const { title, role, description } = identityDescriptions[identity] || {
    title: 'Unknown Identity',
    role: 'As A',
    description: 'Description',
  };

  const iconName = identityIcons[identity] || 'help-circle';

  const dragConstraints = {
    left: -100,
    right: 100,
    top: -50,
    bottom: 50,
  };

  // Image paths for each identity (could be imported from assets)
  const backgroundImage = identity === 'human' ? 
    'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))' : 
    'none';

  return (
    <div className="identity-card group w-full" data-identity={identity}>
      <motion.div
        ref={ref}
        drag
        dragConstraints={dragConstraints}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        dragElastic={0.5}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        animate={isDragging ? {} : { x: 0, y: 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25,
          // Ensures the return to original position is smooth
          when: "afterChildren" 
        }}
        className="bg-white bg-opacity-5 backdrop-blur-sm hover:bg-opacity-10 transition-all duration-300 rounded-xl p-6 border-2 border-white border-opacity-20 cursor-grab relative overflow-hidden shadow-lg h-full w-full"
        style={{ backgroundImage }}
      >
        <div className={`absolute top-0 right-0 ${bgColor} w-1/3 h-1.5`}></div>
        <div className={`identity-marker uppercase text-xs tracking-wider font-semibold ${color} mb-2`}>
          {role}
        </div>
        
        <h3 className="text-xl md:text-2xl font-poppins font-bold mb-4 flex items-center">
          <span className="mr-2">{title}</span>
          <span className={`${color} text-sm`}>✦</span>
        </h3>
        
        <div className="flex items-center mb-4">
          <div className={`p-3 rounded-full ${bgColor} bg-opacity-30 mr-4 shadow-inner flex-shrink-0`}>
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
              {iconName === 'zap' && (
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              )}
              {iconName === 'code' && (
                <>
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </>
              )}
              {iconName === 'pen-tool' && (
                <>
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </>
              )}
              {iconName === 'trending-up' && (
                <>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </>
              )}
              {iconName === 'heart' && (
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              )}
              {iconName === 'help-circle' && (
                <>
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </>
              )}
            </svg>
          </div>
          <div className="text-sm text-white font-medium">{description}</div>
        </div>
        
        <Link 
          href={`/${identity}`} 
          className={`inline-flex items-center ${color} text-sm font-medium border border-opacity-30 border-white px-3 py-1.5 rounded-lg hover:bg-opacity-10 hover:bg-white transition-all mt-2`}
        >
          Click to Explore
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>

        {bulletPoints && bulletPoints.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white border-opacity-20">
            <div className="text-sm text-white">
              {bulletPoints.map((point, index) => (
                <p key={index} className="flex items-start mb-1">
                  <span className={`${color} mr-2`}>•</span> 
                  <span>{point}</span>
                </p>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default IdentityCard;
