import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/60 backdrop-blur-lg z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-in fade-in duration-300 ease-in-out">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-6 right-6 text-white focus:outline-none" 
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>
      
      <Link 
        href="/codeCircle" 
        // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
        className="text-xl font-medium py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
        onClick={onClose}
      >
        <span className={location === '/codeCircle' ? 'text-accent2' : ''}>
          CodeCircle
        </span>
      </Link>
      
      <Link 
        href="/designer" 
        // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
        className="text-xl font-medium py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
        onClick={onClose}
      >
        <span className={location === '/designer' ? 'text-accent3' : ''}>
          DesignCircle
        </span>
      </Link>
      
      <Link 
        href="/technopreneur" 
        // onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
        className="text-xl font-medium py-3 px-6 rounded-lg hover:bg-white hover:bg-opacity-10 transition"
        onClick={onClose}
      >
        <span className={location === '/technopreneur' ? 'text-accent4' : ''}>
          BizCircle
        </span>
      </Link>
    </div>
  );
};

export default MobileMenu;
