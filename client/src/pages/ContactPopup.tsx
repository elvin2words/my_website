import React from 'react';
import { Mail, Phone, Linkedin, Instagram, Download, MessageSquare } from 'lucide-react';


const ContactPopup = ({ onLinkClick }: { onLinkClick: () => void }) => {
  const linkStyle =
    'flex items-center gap-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded transition-colors';
  const divider = <hr className="border-t border-gray-300 dark:border-gray-700" />;
  return (
    <div className="bg-white dark:bg-zinc-900 text-black text-center justify-center dark:text-white rounded-lg shadow-lg p-4 w-64 z-50">
      <a href="https://wa.me/263783074722" target="_blank" rel="noopener noreferrer"   
        onClick={onLinkClick} className={`${linkStyle} text-green-600`} >
        <MessageSquare size={18} />
        WhatsApp
      </a>
      {divider}
      <a href="mailto:elvinmazwimairi@gmail.com" onClick={onLinkClick}
        className={`${linkStyle} text-blue-600`} >
        <Mail size={18} />
        Email Me
      </a>
      {divider}
      <a href="tel:+263783074722" onClick={onLinkClick}
        className={`${linkStyle} text-gray-700 dark:text-gray-300`} >
        <Phone size={18} />
        Call Me
      </a>
      {divider}
      <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" rel="noopener noreferrer"
        onClick={onLinkClick} className={`${linkStyle} text-blue-800`} >
        <Linkedin size={18} />
        LinkedIn
      </a>
      {divider}
      <a href="https://instagram.com/young_mazwi" target="_blank" rel="noopener noreferrer"
        onClick={onLinkClick} className={`${linkStyle} text-pink-600`} >
        <Instagram size={18} />
        Instagram
      </a>
      {divider}
      <a
        href="/cv/v3y_CV for Elvin Mazwimairi (Graduate Electrical Engineer)  Other.pdf" 
        download onClick={onLinkClick} className={`${linkStyle} text-purple-600`}>
        <Download size={18} />
        Contact Card
      </a>      
    </div>
  );
};

export default ContactPopup;
