// src/pages/ContactProfileCard.tsx

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { Phone, Mail, Linkedin, MessageSquare, Share2, Download, QrCode } from "lucide-react";
import {QRCodeCanvas} from 'qrcode.react';
import { motion } from 'framer-motion';
import BackgroundEffect from "@/components/home/BackgroundEffect";

import Header from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";


export default function ContactProfilePage() {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    // const img = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    // link.href = img;
    link.href = canvas.toDataURL();
    link.download = "engElvin-contact-card.png";
    link.click();
  };

  const shareCard = async () => {
    if (!navigator.share) {
      alert("Sharing not supported on this device");
      return;
    }
    const url = window.location.href;
    await navigator.share({
      title: "Elvin's Contact Card",
      text: "Here’s my digital business card - click to connect!",
      url,
    });
  };

  const handleNativeShare = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
    const blob = await (await fetch(canvas.toDataURL("image/png"))).blob();
    const file = new File([blob], "contact-card.png", { type: "image/png" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "Elvin's Contact Card",
          text: "Add me to your contacts!"
        });
      } catch (err) {
        console.error("Sharing failed", err);
      }
    } else {
      handleDownloadImage();
    }
  };  

  const cardVariants = {
    initial: { rotateY: 0 },
    flipped: { rotateY: 180 },
  };


  return (
    <>

      <Header />

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-300 p-4 md:pt-24">
        <BackgroundEffect />
        <div className="flex gap-10 items-center justify-center">
          {/* CARD OG */}
          {/* <motion.div
              ref={cardRef}
              className="bg-accent5 shadow-xl rounded-2xl py-4 max-w-sm w-full relative overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.9)), url('/textures/paper.png')",
                backgroundSize: "cover",
                border: "1px solid #ddd",
                color: 'white',
                fontFamily: 'sans-serif',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              
              <div className="flex justify-center">
                <img
                    src="/prof.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>

              <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
                Elvin E. Mazwimairi
              </h1>
              <p className="text-center text-gray-500 text-sm">
                Engineer • Developer • Technologist
              </p>

              <div className="mt-4 space-y-4 px-4 items-center justify-center">
                <a
                    href="tel:+263783074722"
                    className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    <Phone size={18} /> Call Me +263783074722
                </a>
                <a
                    href="mailto:elvinmazwimairi@gmail.com"
                    className="flex items-center justify-center gap-3 bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
                >
                    <Mail size={18} /> elvinmazwimairi@gmail.com
                </a>
                <a
                    href="https://wa.me/263783074722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-emerald-500 text-white py-2 px-4 rounded-lg shadow hover:bg-emerald-600 transition"
                >
                    <MessageSquare size={18} /> WhatsApp +263783074722
                </a>
                <a
                    href="https://linkedin.com/in/elvin-mazwimairi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                    <Linkedin size={18} /> LinkedIn @ elvin-mazwimairi
                </a>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="/contact.vcf" download="engelvinContact.vcf"
                  className="flex items-center justify-center bg-yellow-700 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-800 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Add to Phone
                </a>
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center justify-center bg-gray-700 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Save as Image
                </button>
                <button
                  onClick={shareCard}
                  className="flex items-center justify-center bg-purple-600 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-700 transition min-w-[400px]"
                >
                  <Download size={18} className="mr-1" /> Share Contact
                </button>
              </div>
          </motion.div> */}
          
          {/* CARD 1 */}
          <motion.div
              ref={cardRef}
              className="bg-accent5 shadow-xl rounded-2xl py-4 [transform-style:preserve-3d]  relative overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.9)), url('/textures/paper.png')",
                // background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                backgroundSize: "cover",
                border: "1px solid #ddd",
                color: 'white',
                fontFamily: 'sans-serif',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              variants={cardVariants}
              animate={flipped ? "flipped" : "initial"}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={() => setFlipped(!flipped)}
            >
              
              {/* <div className="absolute inset-0 opacity-10 bg-[url('/textures/paper.png')] bg-cover pointer-events-none" /> */}
              
              {/* Front (OTHER DESIGN) */}
              {/* <div className="absolute inset-0 flex flex-col justify-center items-center backface-hidden"> */}
              <div className="flex flex-col justify-center items-center backface-hidden">
                {/* Profile Picture */}
                <div className="flex justify-center">
                  <img
                      src="/prof.jpg"
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                  />
                </div>

                {/* Name & Bio */}
                <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
                  Elvin E. Mazwimairi
                </h1>
                <p className="text-center text-gray-500 text-sm">
                  {/* Engineer • Developer • Technologist */}
                  {/* <h2 className="text-lg font-semibold mt-1">Electrical Eng × Systems Developer</h2> */}
                  Electrical Eng × Systems Developer
                </p>

                <p className="text-xl text-black font-semibold mb-2">Let’s Build Something</p>
                <p className="text-sm text-gray-500 opacity-80">Innovation • Systems • Energy • Software</p>
              </div>            



              {/* Buttons */}
              {/* <div className="mt-4 space-y-4 px-4 items-center justify-center">
                <a
                    href="tel:+263783074722"
                    className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    <Phone size={18} /> Call Me +263783074722
                </a>
                <a
                    href="mailto:elvinmazwimairi@gmail.com"
                    className="flex items-center justify-center gap-3 bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
                >
                    <Mail size={18} /> elvinmazwimairi@gmail.com
                </a>
                <a
                    href="https://wa.me/263783074722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-emerald-500 text-white py-2 px-4 rounded-lg shadow hover:bg-emerald-600 transition"
                >
                    <MessageSquare size={18} /> WhatsApp +263783074722
                </a>
                <a
                    href="https://linkedin.com/in/elvin-mazwimairi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                    <Linkedin size={18} /> LinkedIn @ elvin-mazwimairi
                </a>
              </div> */}

              {/* Footer Actions */}
              {/* <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a
                  href="/contact.vcf" download="engelvinContact.vcf"
                  className="flex items-center justify-center bg-yellow-700 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-800 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Add to Phone
                </a>
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center justify-center bg-gray-700 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Save as Image
                </button>
                <button
                  onClick={shareCard}
                  className="flex items-center justify-center bg-purple-600 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-700 transition min-w-[400px]"
                >
                  <Download size={18} className="mr-1" /> Share Contact
                </button>
              </div> */}

              <div className="p-6 text-black backface-hidden">             
                <ul className="mt-4 space-y-1 text-sm">
                  <li>Renewable Energy × Power Systems Design & Install</li>
                  <li>Embedded & Control Systems Design & Integration</li>
                  <li>Software & Custom Systems Development</li>
                  <li>Engineering Design & Simulation × Project Manager</li>
                  <li>Electrical Design × Onsite Inspections</li>
                  <li>Digital Systems Engineering & Operations</li>
                </ul>
              </div>

              {/* FRONT — MAIN PROFILE */}
              {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-center items-center backface-hidden p-4">
                <img src="/prof.jpg" className="w-24 h-24 rounded-full shadow-lg mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Elvin E. Mazwimairi</h2>
                <p className="text-gray-500 text-sm">Engineer • Developer • Technologist</p>
                <div className="mt-3"><QRCodeCanvas value="https://elvinmazwi.me" size={60} /></div>
              </div> */}

              {/* BACK — CYBER FUTURISTIC */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-indigo-800 text-white rounded-2xl shadow-xl border border-indigo-600 flex flex-col justify-center items-center rotate-y-180 backface-hidden p-4">
                <p className="text-xl font-semibold mb-2 tracking-wide">FUTURE-DRIVEN SYSTEMS</p>
                <p className="text-sm opacity-70 text-center">Energy • Automation • Software • Intelligence</p>
                <div className="mt-4 w-32 h-1 bg-indigo-500 rounded-full animate-pulse" />
              </div>                             */}

              {/* Back (MAIN INFO CARD) */}
              {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-300 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Me</h2>
                <div className="flex flex-col gap-2 text-sm text-gray-700 mt-1">
                  <a href="tel:+263783074722" className="flex items-center gap-2 hover:text-blue-500 transition"><Phone size={16}/> +263783074722</a>
                  <a href="mailto:elvinmazwimairi@gmail.com" className="flex items-center gap-2 hover:text-green-500 transition"><Mail size={16}/> elvinmazwimairi@gmail.com</a>
                  <a href="https://wa.me/263783074722" target="_blank" className="flex items-center gap-2 hover:text-emerald-500 transition"><MessageSquare size={16}/> WhatsApp</a>
                  <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" className="flex items-center gap-2 hover:text-indigo-500 transition"><Linkedin size={16}/> LinkedIn</a>
                </div>
              </div>                */}
          </motion.div>

          {/* CARD 2 */}
          <motion.div
              ref={cardRef}
              className="bg-accent5 shadow-xl rounded-2xl py-4 [transform-style:preserve-3d]  relative overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.9)), url('/textures/paper.png')",
                // background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                backgroundSize: "cover",
                border: "1px solid #ddd",
                color: 'white',
                fontFamily: 'sans-serif',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
              whileHover={{ scale: 1.02 }}
              variants={cardVariants}
              animate={flipped ? "flipped" : "initial"}
              transition={{ type: 'spring', stiffness: 200 }}
              onClick={() => setFlipped(!flipped)}
            >
              
              {/* <div className="absolute inset-0 opacity-10 bg-[url('/textures/paper.png')] bg-cover pointer-events-none" /> */}

              {/* Front (OTHER DESIGN) */}
              {/* <div className="absolute inset-0  rounded-2xl shadow-xl border border-gray-800 flex flex-col justify-center items-center backface-hidden">
                <p className="text-xl font-semibold mb-2">Let’s Build Something</p>
                <p className="text-sm opacity-80">Innovation • Systems • Energy • Software</p>
              </div> */}

              {/* Profile Picture */}
              <div className="flex justify-center">
                <img
                    src="/prof.jpg"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              </div>

              {/* Name & Bio */}
              <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
                Elvin E. Mazwimairi
              </h1>
              <p className="text-center text-gray-500 text-sm">
                Engineer • Developer • Technologist
              </p>

              {/* Buttons */}
              <div className="mt-4 space-y-4 px-4 items-center justify-center">
                <a
                    href="tel:+263783074722"
                    className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
                >
                    <Phone size={18} /> Call Me +263783074722
                </a>
                <a
                    href="mailto:elvinmazwimairi@gmail.com"
                    className="flex items-center justify-center gap-3 bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
                >
                    <Mail size={18} /> elvinmazwimairi@gmail.com
                </a>
                <a
                    href="https://wa.me/263783074722"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-emerald-500 text-white py-2 px-4 rounded-lg shadow hover:bg-emerald-600 transition"
                >
                    <MessageSquare size={18} /> WhatsApp +263783074722
                </a>
                <a
                    href="https://linkedin.com/in/elvin-mazwimairi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
                >
                    <Linkedin size={18} /> LinkedIn @ elvin-mazwimairi
                </a>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {/* If you have 3 buttons */}
                <a
                  href="/contact.vcf" download="engelvinContact.vcf"
                  className="flex items-center justify-center bg-yellow-700 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-800 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Add to Phone
                </a>
                <button
                  onClick={handleDownloadImage}
                  className="flex items-center justify-center bg-gray-700 text-white py-2 px-5 rounded-lg shadow hover:bg-blue-700 transition min-w-[140px]"
                >
                  <Download size={18} className="mr-1" /> Save as Image
                </button>
                <button
                  onClick={shareCard}
                  className="flex items-center justify-center bg-purple-600 text-white py-2 px-5 rounded-lg shadow hover:bg-gray-700 transition min-w-[400px]"
                >
                  <Download size={18} className="mr-1" /> Share Contact
                </button>
              </div>

              {/* FRONT — FUTURISTIC */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-indigo-800 text-white rounded-2xl shadow-xl border border-indigo-600 flex flex-col justify-center items-center backface-hidden p-4">
                <p className="text-xl font-semibold mb-2 tracking-wide">FUTURE-DRIVEN SYSTEMS</p>
                <p className="text-sm opacity-70 text-center">Energy • Automation • Software • Intelligence</p>
              </div> */}

              {/* BACK — CONTACT INFO */}
              {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col justify-center items-center rotate-y-180 backface-hidden p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Me</h2>
                <div className="flex flex-col gap-2 text-sm text-gray-700 mt-1">
                  <motion.a whileHover={{ scale: 1.1 }} href="tel:+263783074722" className="flex items-center gap-2"><Phone size={16} /> +263783074722</motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="mailto:elvinmazwimairi@gmail.com" className="flex items-center gap-2"><Mail size={16} /> elvinmazwimairi@gmail.com</motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://wa.me/263783074722" target="_blank" className="flex items-center gap-2"><MessageSquare size={16} /> WhatsApp</motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" className="flex items-center gap-2"><Linkedin size={16} /> LinkedIn</motion.a>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="mt-3 bg-gray-900 text-white px-4 py-1.5 rounded-lg shadow hover:bg-black transition flex items-center gap-2"
                  onClick={handleDownloadImage}
                >
                  <Download size={16} /> Download Both
                </motion.button>
              </div> */}

            {/* Back (MAIN INFO CARD) */}
            {/* <div className="absolute inset-0 bg-white rounded-2xl shadow-xl border border-gray-300 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Me</h2>
              <div className="flex flex-col gap-2 text-sm text-gray-700 mt-1">
                <a href="tel:+263783074722" className="flex items-center gap-2 hover:text-blue-500 transition"><Phone size={16}/> +263783074722</a>
                <a href="mailto:elvinmazwimairi@gmail.com" className="flex items-center gap-2 hover:text-green-500 transition"><Mail size={16}/> elvinmazwimairi@gmail.com</a>
                <a href="https://wa.me/263783074722" target="_blank" className="flex items-center gap-2 hover:text-emerald-500 transition"><MessageSquare size={16}/> WhatsApp</a>
                <a href="https://linkedin.com/in/elvin-mazwimairi" target="_blank" className="flex items-center gap-2 hover:text-indigo-500 transition"><Linkedin size={16}/> LinkedIn</a>
              </div>
            </div>               */}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
