// src/pages/ContactPopup.tsx


import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Instagram, Download, MessageSquare, Share2, QrCode, X, Text } from 'lucide-react';
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from 'framer-motion';

const vCardUrl = '/contact.vcf';
const profileCardUrl = `${window.location.origin}/contact-profile-card`;

const ContactPopup = ({ onLinkClick }) => {
  const [showQR, setShowQR] = useState(false);

  const linkStyle =
    'flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded transition-colors';
  const divider = <hr className="border-t border-gray-300 dark:border-gray-700" />;

  const handleShare = () => {
    // const vcardUrl = window.location.origin + profileCardUrl;
    const vcardUrl = profileCardUrl;
    if (navigator.share) {
      navigator.share({
        title: "Elvin E Mazwimairi's Contact",
        text: "Add me to your contacts instantly.",
        url: vcardUrl,
      }).catch(err => console.log("Share cancelled", err));
    } else {
      setShowQR(true);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg shadow-lg p-4 w-72 z-50">
      {/* Reach Out */}
      <a href="https://wa.me/263783074722?text=Hi%20Elvin%2C%20I%20saw%20your%20work%20and%20wanted%20to%20reach%20out!" 
         target="_blank" rel="noopener noreferrer"
         onClick={onLinkClick} className={`${linkStyle} text-green-600`}>
        <MessageSquare size={18} /> WhatsApp Me
      </a>
      {divider}
      <a href="sms:+263783074722?body=Hi%20Elvin%2C%20I%20found%20your%20portfolio%20and..." 
         onClick={onLinkClick} className={`${linkStyle} text-yellow-900 dark:text-gray-300`}>
        <Text size={18} /> Text Me (SMS)
      </a>
      {divider}

      {/* Email / Call */}
      <a href="mailto:elvinmazwimairi@gmail.com" onClick={onLinkClick}
         className={`${linkStyle} text-blue-600`}>
        <Mail size={18} /> Email Me
      </a>
      {divider}
      <a href="tel:+263783074722" onClick={onLinkClick}
         className={`${linkStyle} text-gray-700 dark:text-gray-300`}>
        <Phone size={18} /> Call Me
      </a>
      {divider}

      {/* Socials */}
      <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" rel="noopener noreferrer"
         onClick={onLinkClick} className={`${linkStyle} text-blue-800`}>
        <Linkedin size={18} /> LinkedIn
      </a>
      {divider}
      <a href="https://instagram.com/young_mazwi" target="_blank" rel="noopener noreferrer"
         onClick={onLinkClick} className={`${linkStyle} text-pink-600`}>
        <Instagram size={18} /> Instagram
      </a>
      {divider}

      {/* Share & Download */}
      <button onClick={handleShare} className={`${linkStyle} text-indigo-600 w-full`}>
        <Share2 size={18} /> Share My Contact
      </button>
      {divider}
      <a href="/contact.vcf" download="EngElvin.vcf"
         onClick={onLinkClick} className={`${linkStyle} text-purple-600`}>
        <Download size={18} /> Download Contact Card
      </a>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl relative"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setShowQR(false)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
                <X size={20} />
              </button>
              <h3 className="text-lg font-semibold mb-4">Scan to Save</h3>
              <QRCodeCanvas value={profileCardUrl} size={200}/>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactPopup;
