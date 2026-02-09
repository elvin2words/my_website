// src/components/layout/MobileMenu.tsx
// This component renders a mobile menu for navigation, allowing users to switch between different sections of the

import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  // onClose : {() => window.scrollTo({ top: 0, behavior: "smooth" })} 

}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();

  const menuSections = [
    {
      id: "eng",
      label: "EngCircle",
      accentClass: "text-accent1",
      links: [
        { label: "Portfolio", href: "/engineer/portfolio", matchPrefixes: ["/engineer"] },
        { label: "Journey", href: "/engineer/journey", matchPrefixes: ["/engineer/journey"] },
      ],
    },
    {
      id: "code",
      label: "CodeCircle",
      accentClass: "text-accent2",
      links: [
        { label: "Portfolio", href: "/codecircle/portfolio", matchPrefixes: ["/codecircle/portfolio"] },
        { label: "Journey", href: "/codecircle/journey", matchPrefixes: ["/codecircle/journey"] },
      ],
    },
    {
      id: "design",
      label: "DesignCircle",
      accentClass: "text-accent3",
      links: [
        { label: "Creatives", href: "/creative/portfolio", matchPrefixes: ["/creative/portfolio"] },
        { label: "Gallery", href: "/creative/gallery", matchPrefixes: ["/creative/gallery"] },
        { label: "Blog + Writings", href: "/creative/blog", matchPrefixes: ["/creative/blog"] },
        {
          label: "Visual Designs",
          href: "/creative/journey",
          matchPrefixes: ["/creative/journey", "/creative/visual-designs"],
        },
      ],
    },
    {
      id: "biz",
      label: "BizCircle",
      accentClass: "text-accent4",
      links: [
        { label: "Portfolio", href: "/biz/portfolio", matchPrefixes: ["/biz/portfolio"] },
        { label: "Journey", href: "/biz/journey", matchPrefixes: ["/biz/journey"] },
      ],
    },
  ];

  const isLinkActive = (prefixes: string[]) => {
    return prefixes.some((prefix) => location.startsWith(prefix));
  };
  
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
    <div className="fixed inset-0 bg-primary/70 backdrop-blur-xl z-40 lg:hidden animate-in fade-in duration-300 ease-in-out">
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-6 right-6 text-white focus:outline-none" 
        // onClick={onClose}
        onClick={() => {
          onClose();
          // window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <X className="w-6 h-6" />
      </Button>

      <div className="h-full overflow-y-auto pt-20 pb-8 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-2xl grid gap-4 md:grid-cols-2">
          {menuSections.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-white/15 bg-white/5 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.28)] h-fit"
            >
              <p className={`text-lg font-semibold mb-3 ${section.accentClass}`}>
                {section.label}
              </p>

              <div className="grid gap-2">
                {section.links.map((item) => {
                  const active = isLinkActive(item.matchPrefixes);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-2 text-sm transition-colors ${
                        active
                          ? "bg-white/20 text-white border border-white/25"
                          : "bg-white/5 text-white/85 border border-white/10 hover:bg-white/10"
                      }`}
                      onClick={() => {
                        onClose();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
