// src/components/home/BackgroundEffect.tsx
// This component creates a visually appealing background effect with animated blurred circles.
// It uses absolute positioning to place circles in different corners and the center of the viewport. 

import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div
      className="fixed inset-0 z-0 opacity-30 pointer-events-none will-change-transform translate-z-0 contain-paint"
      style={{
        backfaceVisibility: 'hidden',
        transform: 'translate3d(0,0,0)'
      }}
    >
      <div
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent1 rounded-full filter blur-[150px] animate-scale-pulse"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'paint'
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent2 rounded-full filter blur-[150px] animate-scale-pulse"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'paint'
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-accent4 rounded-full filter blur-[150px] animate-scale-pulse"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          contain: 'paint'
        }}
      />
    </div>
  );
};

export default BackgroundEffect;
