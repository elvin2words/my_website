
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skills = [
  "TypeScript", "React", "Node.js", "Python", "System Design", 
  "UI/UX", "Innovation", "Leadership", "Problem Solving",
  "Engineering", "Design Thinking", "Business Strategy"
];

const SkillPills: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full py-8 overflow-hidden">
      <AnimatePresence>
        {mounted && (
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                className="bg-white bg-opacity-10 backdrop-blur-sm px-4 py-1 rounded-full 
                          border border-white border-opacity-20 cursor-pointer"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{
                  scale: 0.9,
                  rotate: Math.random() * 30 - 15,
                }}
                onClick={() => {
                  const x = (Math.random() - 0.5) * 500;
                  const y = (Math.random() - 0.5) * 300;
                  const el = document.getElementById(`skill-${index}`);
                  if (el) {
                    el.style.transform = `translate(${x}px, ${y}px)`;
                    setTimeout(() => {
                      el.style.transform = 'translate(0, 0)';
                    }, 1000);
                  }
                }}
                id={`skill-${index}`}
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
