import React from 'react';
import IdentityCard from './IdentityCard';
import SVGConnections from './SVGConnections';

const IdentitySections: React.FC = () => {
  return (
    <section id="identityCards" className="relative">
      <div className="hidden md:block absolute top-0 left-1/2 w-px h-24 bg-white bg-opacity-20"></div>
      
      {/* Identity cards container - full width on mobile, grid on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 relative">
        <div className="h-full w-full flex">
          <IdentityCard identity="engineer" />
        </div>
        <div className="h-full w-full flex">
          <IdentityCard identity="developer" />
        </div>
        <div className="h-full w-full flex">
          <IdentityCard identity="designer" />
        </div>
        <div className="h-full w-full flex">
          <IdentityCard identity="technopreneur" />
        </div>
        <div className="h-full w-full flex">
          <IdentityCard 
            identity="human" 
            bulletPoints={[
              "What makes me tick",
              "Hobbies & Interests",
              "Causes I support"
            ]}
          />
        </div>
      </div>
      
      {/* SVG connections between cards - only visible on larger screens */}
      <SVGConnections />
    </section>
  );
};

export default IdentitySections;
