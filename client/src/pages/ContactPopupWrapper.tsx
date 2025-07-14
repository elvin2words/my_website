import React, { useEffect, useRef } from 'react';
import ContactPopup from './ContactPopup';

type Props = {
  onClose: () => void;
};

const ContactPopupWrapper: React.FC<Props> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on click outside the popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    // Close on back button
    window.history.pushState({ popup: true }, "");
    const handlePopState = () => onClose();

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div ref={popupRef}>
        <ContactPopup onLinkClick={onClose} />
      </div>
    </div>
  );
};

export default ContactPopupWrapper;
