// client/src/pages/HireMeHoverWrapper.tsx
// HireMeHoverWrapper Component for displaying HireMe popup on hover

import React, { useState, useEffect, useRef } from 'react';
import HireMePopup from '@/components/home/HireMePopup';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Dialog, DialogContent } from "@/components/ui/dialog";

const HireMeHoverWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  //  Detect screen size for mobile vs desktop behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setShowPopup(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 300);
    }
  };

  // Close modal on overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
       
    </>

  );
};

export default HireMeHoverWrapper;
