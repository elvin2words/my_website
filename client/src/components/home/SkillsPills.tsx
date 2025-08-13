// src/components/SkillsPills.tsx

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const skills = [
  "TypeScript", "React", "Node.js", "Python", "System Design", 
  "UI/UX", "Innovation", "Leadership", "Problem Solving",
  "Engineering", "Design Thinking", "Business Strategy"
];

const SkillPills: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAreaClick = async () => {
    // Animate all pills to bounce up to header and back
    await controls.start(i => ({
      y: [-400, 0],
      rotate: [Math.random() * 360, 0],
      transition: {
        duration: 1.5,
        type: "spring",
        bounce: 0.5,
        delay: i * 0.1
      }
    }));
  };

  const getGridColumn = (index: number, total: number) => {
    const midPoint = Math.floor(total / 2);
    if (index <= midPoint) {
      return `${index + 1} / span 2`;
    } else {
      return `${total - index} / span 2`;
    }
  };

  return (
    <div 
      className="w-full py-4 overflow-hidden cursor-pointer" 
      onClick={handleAreaClick}
    >
      <AnimatePresence>
        {mounted && (
          <div className="grid grid-cols-6 gap-2 max-w-3xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                style={{
                  gridColumn: getGridColumn(index, skills.length)
                }}
                className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-1 rounded-full 
                          border border-white border-opacity-20 text-center"
                initial={{ y: -100, opacity: 0 }}
                animate={controls}
                custom={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillPills;
