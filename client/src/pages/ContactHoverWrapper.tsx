import React, { useState, useRef } from 'react';
import ContactPopup from './ContactPopup';
import { Button } from '@/components/ui/button';

const ContactHoverWrapper = () => {
  const [showPopup, setShowPopup] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 300); // Delay allows time to move to popup
  };

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button className="text-white border border-white/30 rounded-full px-4 hover:bg-white/10">
        CONTACT
      </Button>

      {showPopup && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <ContactPopup />
        </div>
      )}
    </div>
  );
};

export default ContactHoverWrapper;
