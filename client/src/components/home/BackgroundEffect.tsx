import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 opacity-30">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent1 rounded-full filter blur-[150px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent2 rounded-full filter blur-[150px] animate-pulse-slow"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-accent4 rounded-full filter blur-[150px] animate-pulse-slow"></div>
    </div>
  );
};

export default BackgroundEffect;
