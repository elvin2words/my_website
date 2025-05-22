import React, { useEffect, useState, useCallback } from 'react';

const SVGConnections: React.FC = () => {
  const [paths, setPaths] = useState<string[]>([]);

  const calculatePaths = useCallback(() => {
    const cards = document.querySelectorAll('#identityCards .flex');
    const newPaths: string[] = [];

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        const rect1 = card.getBoundingClientRect();
        const rect2 = cards[index + 1].getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;

        const path = `M ${x1} ${y1} L ${x2} ${y2}`;
        newPaths.push(path);
      }
    });

    setPaths(newPaths);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      requestAnimationFrame(calculatePaths);
    };

    // Initial calculation after a brief delay to ensure DOM is ready
    const timer = setTimeout(calculatePaths, 100);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []); // Remove calculatePaths from dependencies

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
          fill="none"
        />
      ))}
    </svg>
  );
};

export default SVGConnections;