
// components/home/HireMePopup.tsx
import { Link } from "wouter";
import { Cpu, Zap, Code, Ruler, Home, ArrowRight } from "lucide-react";

const phone = "263783074722"; // no "+" for wa.me links

const services = [
  { 
    icon: <Zap size={18} />, 
    title: "Renewable Energy / Power Systems", 
    desc: "Solar, storage & microgrid design & install", 
    color: "text-yellow-600",
    message: "Hi Elvin, coming from your website.  I’d like to request your Design and Installation Services."
  },
  { 
    icon: <Cpu size={18} />, 
    title: "Embedded & IoT Systems Design", 
    desc: "Micro-controllers, firmware & control", 
    color: "text-gray-700 dark:text-gray-300",
    message: "Hi Elvin, coming from your website. I’d like your assistance with an Embedded & IoT Systems project i have..."
  },
  { 
    icon: <Code size={18} />, 
    title: "Software Development", 
    desc: "Web Apps, WebSites & Custom Software", 
    color: "text-blue-600",
    message: "Hi Elvin, coming from your website.  I’d like to request your assistance with a Software Development project i have..."
  },
  { 
    icon: <Ruler size={18} />, 
    title: "Engineering Design & Simulation", 
    desc: "Circuits, PCB, MATLAB, AutoCAD, pvSyst", 
    color: "text-purple-600",
    message: "Hi Elvin, coming from your website.  I’d like your assistance with an Engineering Design & Simulation project i have."
  },
  { 
    icon: <Home size={18} />, 
    title: "Electrical/Architectural House Plans", 
    desc: "Wiring/Installations & House Plan Design", 
    color: "text-green-600",
    message: "Hi Elvin, coming from your website.  I have an Electrical/Architectural House Plan design request."
  },
];

interface HireMePopupProps {
  onLinkClick?: () => void;
}

export default function HireMePopup({ onLinkClick }: HireMePopupProps) {
  const itemStyle =
    "flex items-start gap-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded transition-colors";
  const divider = <hr className="border-t border-gray-300 dark:border-gray-700" />;

  return (
    <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg shadow-lg p-4 w-80 z-50">
      {services.map((s, idx) => (
        <div key={idx}>
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(s.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${itemStyle} ${s.color}`}
          >
            {s.icon}
            <div className="flex flex-col">
              <span className="font-medium">{s.title}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">{s.desc}</span>
            </div>
          </a>
          {idx < services.length - 1 && divider}
        </div>
      ))}

      {/* <a href={`mailto:youremail@example.com?subject=${encodeURIComponent(s.title)}&body=${encodeURIComponent(s.message)}`} >
      <a href={`https://calendly.com/yourname/${s.slug}`} target="_blank">
      Instead of just linking, make each card expand in-place with more info, a mini gallery, or a “Get Started” button. */}

      {/* Full Services Button */}
      <div className="mt-4">
        <Link to="/hire">
          <button
            onClick={onLinkClick}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-accent2 rounded-lg hover:bg-accent3 transition"
          >
            View Full Services <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
}
