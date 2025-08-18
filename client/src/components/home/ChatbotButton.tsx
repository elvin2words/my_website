import React, { useState } from "react";
import { Sparkles, X } from "lucide-react";
import ChatbotModal from "./ChatbotModal";

export default function ChatbotButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-6 right-5 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform"
      >
        <Sparkles size={24} />
      </button>

      {/* Modal */}
      {open && <ChatbotModal onClose={() => setOpen(false)} />}
    </>
  );
}
