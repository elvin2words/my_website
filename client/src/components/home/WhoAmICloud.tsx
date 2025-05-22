import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from '@/context/DragContext';
import { motion } from 'framer-motion';

interface WhoAmICloudProps {
  className?: string;
}

const WhoAmICloud: React.FC<WhoAmICloudProps> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { registerDraggable } = useDrag();
  const [isDragging, setIsDragging] = useState(false);
  
  useEffect(() => {
    if (ref.current) {
      registerDraggable('whoami-cloud', ref);
    }
  }, [registerDraggable]);

  const dragConstraints = {
    left: -100,
    right: 100,
    top: -50,
    bottom: 50,
  };

  return (
    <div className={`relative w-full md:w-2/5 ${className}`}>
      <motion.div
        ref={ref}
        id="whoAmICloud"
        drag
        dragConstraints={dragConstraints}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        dragElastic={0.5}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        animate={isDragging ? {} : { x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="cloud-shape bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white border-opacity-20 p-8 md:p-10 animate-float cursor-grab shadow-lg"
      >
        <h2 className="text-center text-3xl md:text-4xl font-poppins font-bold">
          Who Am I???
        </h2>
        <div className="absolute -top-6 -left-4 text-4xl opacity-80 font-bold">?</div>
        <div className="absolute top-0 right-2 text-5xl opacity-80 font-bold">?</div>
        <div className="absolute -bottom-4 left-6 text-5xl opacity-80 font-bold">?</div>
        <div className="absolute bottom-6 -right-4 text-3xl opacity-80 font-bold">?</div>
        <div className="absolute top-1/3 -left-5 text-4xl opacity-80 font-bold">?</div>
        <div className="absolute top-2/3 -right-3 text-3xl opacity-80 font-bold">?</div>
      </motion.div>
      
      {/* Cloud connector arrow (only visible on medium screens and larger) */}
      <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-full">
        <svg width="100" height="30" viewBox="0 0 100 30" className="fill-white">
          <path d="M0,15 C30,5 70,25 95,15 L95,10 L100,15 L95,20 L95,15" />
        </svg>
      </div>
    </div>
  );
};

export default WhoAmICloud;
