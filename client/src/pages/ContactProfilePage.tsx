// // src/pages/ContactProfilePage.jsx
// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { Phone, Mail, Linkedin, Download, Share2, MessageCircle } from "lucide-react";

// const ContactProfilePage = () => {
//   const cardRef = useRef();

//   const handleDownloadImage = async () => {
//     if (!cardRef.current) return;
//     const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
//     const dataUrl = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = dataUrl;
//     link.download = "my-contact-card.png";
//     link.click();
//   };

//   const handleNativeShare = async () => {
//     if (!cardRef.current) return;
//     const canvas = await html2canvas(cardRef.current, { scale: 2, useCORS: true });
//     const blob = await (await fetch(canvas.toDataURL("image/png"))).blob();
//     const file = new File([blob], "contact-card.png", { type: "image/png" });

//     if (navigator.share && navigator.canShare({ files: [file] })) {
//       try {
//         await navigator.share({
//           files: [file],
//           title: "Elvin Beyond Contact Card",
//           text: "Add me to your contacts!"
//         });
//       } catch (err) {
//         console.error("Sharing failed", err);
//       }
//     } else {
//       handleDownloadImage();
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
//       <div
//         ref={cardRef}
//         className="bg-white shadow-2xl rounded-2xl p-6 max-w-sm w-full text-center space-y-4"
//       >
//         <img
//           src="/profile.jpg" // your profile image
//           alt="Profile"
//           className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500"
//         />
//         <h1 className="text-2xl font-bold">Elvin Beyond</h1>
//         <p className="text-gray-600">Engineer • Creator • Problem Solver</p>

//         <div className="flex flex-wrap gap-3 justify-center mt-4">
//           <a
//             href="tel:+263123456789"
//             className="p-3 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition"
//           >
//             <Phone />
//           </a>
//           <a
//             href="mailto:you@example.com"
//             className="p-3 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
//           >
//             <Mail />
//           </a>
//           <a
//             href="https://wa.me/263123456789"
//             className="p-3 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition"
//           >
//             <MessageCircle />
//           </a>
//           <a
//             href="https://linkedin.com/in/yourprofile"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="p-3 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200 transition"
//           >
//             <Linkedin />
//           </a>
//         </div>

//         <div className="mt-6 flex gap-3 justify-center">
//           <a
//             href="/contact.vcf"
//             download
//             className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//           >
//             <Download size={18} /> Add to Contacts
//           </a>
//           <button
//             onClick={handleNativeShare}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             <Share2 size={18} /> Share
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactProfilePage;



// import React, { useRef } from 'react';
// import { Phone, Mail, Linkedin, QrCode, Download, Share2, MessageCircle } from 'lucide-react';
// import html2canvas from 'html2canvas';
// import { motion } from 'framer-motion';
// import {QRCodeCanvas} from 'qrcode.react';

// export default function ContactProfilePage() {
//   const cardRef = useRef(null);
//   const profileUrl = window.location.href; // Link for QR & sharing

//   const handleDownloadImage = async () => {
//     if (!cardRef.current) return;
//     const canvas = await html2canvas(cardRef.current, { scale: 2 });
//     const link = document.createElement('a');
//     link.download = 'contact-card.png';
//     link.href = canvas.toDataURL('image/png');
//     link.click();
//   };

//   const handleShare = async () => {
//     if (!navigator.share) {
//       alert('Sharing not supported on this device');
//       return;
//     }
//     if (cardRef.current) {
//       const canvas = await html2canvas(cardRef.current, { scale: 2 });
//       const blob = await new Promise((resolve) => canvas.toBlob(resolve));
//       const file = new File([blob], 'contact-card.png', { type: 'image/png' });
//       navigator.share({
//         title: 'Elvin Beyond Contact',
//         text: 'Here’s my contact info',
//         url: profileUrl,
//         files: [file]
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
//       <div className="absolute top-4 right-4">
//         <button
//           className="p-2 bg-white rounded-full shadow hover:scale-105 transition"
//           onClick={() => document.getElementById('qrPopup').showModal()}
//         >
//           <QrCode className="w-6 h-6 text-gray-600" />
//         </button>
//       </div>

//       <motion.div
//         ref={cardRef}
//         className="max-w-sm w-full p-6 rounded-2xl shadow-2xl relative overflow-hidden"
//         style={{
//           background: 'linear-gradient(135deg, #0f172a, #1e293b)',
//           color: 'white',
//           fontFamily: 'sans-serif',
//           boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
//         }}
//         whileHover={{ scale: 1.02 }}
//         transition={{ type: 'spring', stiffness: 200 }}
//       >
//         {/* Subtle texture overlay */}
//         <div className="absolute inset-0 opacity-10 bg-[url('/textures/paper.png')] bg-cover pointer-events-none" />

//         {/* Profile image */}
//         <img
//           src="/profile.jpg"
//           alt="Profile"
//           className="w-20 h-20 rounded-full border-4 border-white shadow-lg mb-4"
//         />

//         {/* Name & Bio */}
//         <h1 className="text-2xl font-bold">Elvin Beyond</h1>
//         <p className="text-gray-300 text-sm">Engineer • Innovator • Creator</p>

//         {/* Buttons */}
//         <div className="mt-6 flex flex-col gap-3">
//           <a href="tel:+263123456789" className="flex items-center gap-3 bg-green-700 p-3 rounded-xl shadow hover:bg-green-600">
//             <Phone /> Call Me
//           </a>
//           <a href="mailto:email@example.com" className="flex items-center gap-3 bg-blue-700 p-3 rounded-xl shadow hover:bg-blue-600">
//             <Mail /> Email Me
//           </a>
//           <a href="https://wa.me/263123456789" className="flex items-center gap-3 bg-green-500 p-3 rounded-xl shadow hover:bg-green-400">
//             <MessageCircle /> WhatsApp Me
//           </a>
//           <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-blue-500 p-3 rounded-xl shadow hover:bg-blue-400">
//             <Linkedin /> LinkedIn
//           </a>
//         </div>

//         {/* Actions */}
//         <div className="mt-6 flex gap-4">
//           <button onClick={handleDownloadImage} className="flex-1 flex items-center justify-center gap-2 bg-gray-800 p-3 rounded-xl shadow hover:bg-gray-700">
//             <Download /> Save Card
//           </button>
//           <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 bg-gray-800 p-3 rounded-xl shadow hover:bg-gray-700">
//             <Share2 /> Share
//           </button>
//         </div>
//       </motion.div>

//       {/* QR Popup */}
//       <dialog id="qrPopup" className="p-4 rounded-lg">
//         <div className="flex flex-col items-center gap-2">
//           <QRCodeCanvas value={profileUrl} size={200} />
//           <button
//             onClick={() => document.getElementById('qrPopup').close()}
//             className="mt-2 text-sm text-gray-500"
//           >
//             Close
//           </button>
//         </div>
//       </dialog>
//     </div>
//   );
// }


// src/pages/ContactProfilePage.jsx
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { Phone, Mail, Linkedin, MessageSquare, Download, QrCode } from "lucide-react";
import { Helmet } from 'react-helmet';


export default function ContactProfilePage() {
  const cardRef = useRef(null);

  const downloadImage = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "contact-card.png";
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
      title: "My Contact Card",
      text: "Here’s my digital business card — click to connect!",
      url,
    });
  };

  return (
    <>
      <Helmet>
        <title>Elvin Beyond - Digital Business Card</title>

        <meta property="og:title" content="Elvin Beyond - Digital Business Card" />
        <meta property="og:description" content="Engineer • Developer • Creator. Connect with me easily via phone, email, WhatsApp, and LinkedIn." />
        <meta property="og:url" content="https://elvinmazwi.me/my-card" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elvinmazwi.me/path-to-profile-preview.jpg" />
        <meta property="og:image:alt" content="Elvin Beyond's Digital Business Card" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elvin Beyond - Digital Business Card" />
        <meta name="twitter:description" content="Engineer • Developer • Creator. Connect with me easily via phone, email, WhatsApp, and LinkedIn." />
        <meta name="twitter:image" content="https://elvinmazwi.me/path-to-profile-preview.jpg" />
      </Helmet>

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
        <div
            ref={cardRef}
            className="bg-white shadow-xl rounded-2xl p-6 max-w-sm w-full relative overflow-hidden"
            style={{
            backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(245,245,245,0.9)), url('/textures/paper.png')",
            backgroundSize: "cover",
            border: "1px solid #ddd",
            }}
        >
            {/* Profile Picture */}
            <div className="flex justify-center">
            <img
                src="/profile.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white shadow-md"
            />
            </div>

            {/* Name & Bio */}
            <h1 className="mt-4 text-center text-2xl font-bold text-gray-800">
            Elvin Beyond
            </h1>
            <p className="text-center text-gray-500 text-sm">
            Engineer • Developer • Creator
            </p>

            {/* Buttons */}
            <div className="mt-6 space-y-3">
            <a
                href="tel:+1234567890"
                className="flex items-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition"
            >
                <Phone size={18} /> Call Me
            </a>
            <a
                href="mailto:email@example.com"
                className="flex items-center gap-3 bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition"
            >
                <Mail size={18} /> Email Me
            </a>
            <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-emerald-500 text-white py-2 px-4 rounded-lg shadow hover:bg-emerald-600 transition"
            >
                <MessageSquare size={18} /> WhatsApp
            </a>
            <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition"
            >
                <Linkedin size={18} /> LinkedIn
            </a>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 flex gap-3 justify-center">
            <button
                onClick={downloadImage}
                className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-800 transition"
            >
                <Download size={18} /> Save as Image
            </button>
            <button
                onClick={shareCard}
                className="flex items-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition"
            >
                Share
            </button>
            </div>
        </div>
       </div>
    </>
  );
}
