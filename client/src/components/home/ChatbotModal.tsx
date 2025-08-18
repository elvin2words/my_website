import React, { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import ChatMessage from "./ChatMessage";

// const mockAnswers = {
//   hello: "Hi 👋 I’m ElvinBot! Ask me anything about Elvin.",
//   services: "Elvin offers engineering, photography, and creative tech solutions 🚀",
//   hire: "You can hire Elvin via the Hire Me page or reach out directly via WhatsApp or email 📩",
//   projects: "Check out Elvin’s portfolio projects on the Projects page 🔗",
//   default: "I’m still learning 🤔 — try asking about services, hire, or projects!"
// };

const mockAnswers = [
  {
    keywords: ["hello", "hi"],
    reply: {
      text: "Hey 👋 I’m ElvinBot. I can tell you all about Elvin — his work, ventures, and passions. and most importantly, what he can do for you.",
      actions: [
        { label: "📄 View Resume", link: "/resume.pdf" },
        { label: "💼 Hire Me", link: "/hire-me" },
      ],
    },
  },
  {
    keywords: ["services", "work", "do"],
    reply: {
      text: "Elvin is an engineer ⚡, creative technologist 💡, and photographer 📸. He builds sustainable energy solutions and digital tools.",
      actions: [
        { label: "⚡ Engineering Projects", link: "/projects/engineering" },
        { label: "📸 Photography", link: "/projects/photography" },
      ],
      context: "services",      
    },
  },
  {
    keywords: ["hire", "job", "work with"],
    reply: {
      text: "You can hire Elvin for engineering, photography, or tech projects 🚀",
      actions: [
        { label: "💼 Hire Me", link: "/hire-me" },
        { label: "📞 Contact", link: "/my-card" },
      ],
    },
  },
  {
    keywords: ["engineering"],
    reply: {
      text: "Elvin works on power systems ⚡, smart grids, and solar solutions ☀️",
      context: "engineering",
    },
  },
  {
    keywords: ["photography", "photos"],
    reply: {
      text: "Elvin captures stories through streets, spaces, and portraits 📸",
      context: "photography",
    },
  },
  {
    keywords: ["resume", "cv"],
    reply: {
      text: "Here’s Elvin’s CV 📄",
      actions: [{ label: "Open Resume", link: "/resume.pdf" }],
      context: "resume",
    },
  },
];


export default function ChatbotModal({ onClose }) {
  const modalRef = useRef(null);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey 👋 I’m ElvinBot. Ask me anything about Elvin!" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const [context, setContext] = useState(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const lower = input.toLowerCase();
    const userMsg = { from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    // Mock AI response
    // const lower = input.toLowerCase();
    // let reply = mockAnswers.default;
    // if (lower.includes("hello") || lower.includes("hi")) reply = mockAnswers.hello;
    // else if (lower.includes("service")) reply = mockAnswers.services;
    // else if (lower.includes("hire")) reply = mockAnswers.hire;
    // else if (lower.includes("project")) reply = mockAnswers.projects;

    const match = mockAnswers.find((a) =>
    a.keywords.some((k) => lower.includes(k))
    );

    let reply = match
    ? match.reply
    : { text: "I’m still learning 🤔 Try asking about services, resume, or how to hire Elvin." };

    setTimeout(() => {
    setMessages((prev) => [...prev, { from: "bot", ...reply }]);
    }, 600);


    setInput("");
  };


//   const sendMessage = () => {
//   if (!input.trim()) return;
//   const lower = input.toLowerCase();

//   // add user message
//   setMessages((prev) => [...prev, { from: "user", text: input }]);

//   let reply;

//   // look for a match
//   const match = mockAnswers.find((a) =>
//     a.keywords.some((k) => lower.includes(k))
//   );

//   if (match) {
//     reply = match.reply;
//     setContext(match.reply.context || null);
//   } else if (["more", "tell me more"].some((k) => lower.includes(k)) && context) {
//     if (context === "services") {
//       reply = { text: "Would you like to explore engineering ⚡ or photography 📸 in more detail?" };
//     } else if (context === "engineering") {
//       reply = { text: "Elvin has worked on power distribution, control systems, and solar microgrids 🌍⚡" };
//     } else if (context === "photography") {
//       reply = { text: "Check out Elvin’s photography portfolio 📷", actions: [{ label: "View Photos", link: "/projects/photography" }] };
//     } else {
//       reply = { text: "I don’t have more details yet 🤔" };
//     }
//   } else {
//     reply = { text: "I’m still learning 🤖 Try asking about services, resume, or how to hire Elvin." };
//   }

//   // simulate bot reply
//   setTimeout(() => {
//     setMessages((prev) => [...prev, { from: "bot", ...reply }]);
//   }, 600);

//   setInput("");
// };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        className="bg-gradient-to-b w-full max-w-md h-[500px] rounded-2xl shadow-xl flex flex-col overflow-hidden ">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
        {/* <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"> */}
          <h2 className="font-semibold text-lg">Ask ElvinBot 🤖</h2>
          <button onClick={onClose} >
            <X size={22} className="text-gray-600 hover:text-white" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 bg-accent6">
          {messages.map((m, idx) => (
            <ChatMessage key={idx} from={m.from} text={m.text} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center p-3 border-t">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask something..."
            className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
