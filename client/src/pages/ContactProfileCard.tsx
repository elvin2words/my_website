// src/pages/ContactProfileCard.tsx

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Phone, Mail, Linkedin, MessageSquare, Share2, Download, QrCode } from "lucide-react";
import { Helmet } from 'react-helmet';
import {QRCodeCanvas} from 'qrcode.react';
import { motion } from 'framer-motion';
import BackgroundEffect from "@/components/home/BackgroundEffect";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function ContactProfilePage() {
  const cardRef = useRef(null);

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "engElvin-contact-card.png";
    link.href = canvas.toDataURL();
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

  return (
    <>

      <Header />

      <Helmet>
        <title>Elvin Mazwi - Digital Business Card</title>

        <meta property="og:title" content="Elvin Mazwi - Digital Business Card" />
        <meta property="og:description" content="Engineer • Developer • Creator. Connect with me easily via phone, email, WhatsApp, and LinkedIn." />
        <meta property="og:url" content="https://elvinmazwi.me/contact-profile-card" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elvinmazwi.me/public/prof.jpg" />
        <meta property="og:image:alt" content="Elvin Beyond's Digital Business Card" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elvin Beyond - Digital Business Card" />
        <meta name="twitter:description" content="Engineer • Developer • Creator. Connect with me easily via phone, email, WhatsApp, and LinkedIn." />
        <meta name="twitter:image" content="https://elvinmazwi.me/public/prof.jpg" />
      </Helmet>

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-300 p-4 md:pt-24">
        {/* <BackgroundEffect / > */}
        <motion.div
            ref={cardRef}
            className="bg-accent5 shadow-xl rounded-2xl py-4 max-w-sm w-full relative overflow-hidden"
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
            transition={{ type: 'spring', stiffness: 200 }}
          >
            
            {/* <div className="absolute inset-0 opacity-10 bg-[url('/textures/paper.png')] bg-cover pointer-events-none" /> */}

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
          </motion.div>
      </div>

      <Footer />
    </>
  );
}
