// client/src/pages/ResumePage.tsx

import React from 'react';

import Header from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";


export default function ResumePage() {
  return (

    <>
      <Header />
      <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">
        <h1 className="text-3xl font-bold mb-4">My Resume</h1>

        <div className="w-full max-w-8xl h-[100vh] border border-gray-300 shadow-lg rounded">
          <iframe
            src="/cv/resume.pdf"
            title="Elvin Mazwi Resume"
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>

        {/* <a
          href="/cv/resume.pdf"
          download="ElvinMazwi_Resume.pdf"
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download Resume PDF
        </a> */}
      </div>

      <Footer />

    </>
  );
}
