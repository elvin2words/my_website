import React from 'react';
import { ArrowDown } from 'lucide-react';

const PrimaryStatement: React.FC = () => {
  return (
    <div className="w-full md:w-3/5 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-white border-opacity-20 shadow-lg">
      <h2 className="text-xl md:text-2xl font-light leading-relaxed mb-6">
        <span className="font-semibold text-xl">Welcome to a snapshot of my world</span> where <span className="text-accent1 font-medium">Eng</span> X <span className="text-accent3 font-medium">Creativity</span> X <span className="text-accent2 font-medium">Innovation</span> X <span className="text-accent4 font-medium">Imagination</span>. That's the goal anyway, enjoy the ride. Do explore more about me:
      </h2>
      
      <div className="flex items-center justify-center">
        <div className="animate-pulse-slow">
          <ArrowDown className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
};

export default PrimaryStatement;
