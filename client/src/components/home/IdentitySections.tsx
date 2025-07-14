import React from 'react';
import IdentityCard from './IdentityCard';
// import SVGConnections from './SVGConnections';
import { motion } from 'framer-motion';


const identities = [
  {
    identity: "engineer",
    bulletPoints: [
      "Power systems design & control",
      "Embedded hardware development",
      "Energy automation & optimization"
    ]
  },
  {
    identity: "developer",
    bulletPoints: [
      "Python, React, Node.js, TypeScript",
      "RESTful APIs & database architecture",
      "Progressive UI/UX design systems"
    ]
  },
  {
    identity: "designer",
    bulletPoints: [
      "Figma + Framer Motion workflows",
      "Systems thinking & human-centered design",
      "Responsive layout & accessibility"
    ]
  },
  {
    identity: "technopreneur",
    bulletPoints: [
      "MVP design & market fit testing",
      "Lean startup & value proposition design",
      "Social entrepreneurship"
    ]
  },
  {
    identity: "human",
    bulletPoints: [
      "Visual arts, music, and storytelling",
      "Faith and purpose-driven living",
      "Reflective writing and philosophy"
    ]
  }
];

const IdentitySections: React.FC = () => {
  return (
    <section id="identityCards" className="relative">
      {/* Identity cards container - full width on mobile, grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 relative">
        {identities.map((item, index) => (
          <motion.div
            key={item.identity}
            className="h-full w-full flex"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <IdentityCard 
              identity={item.identity}
              bulletPoints={item.bulletPoints}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default IdentitySections;
