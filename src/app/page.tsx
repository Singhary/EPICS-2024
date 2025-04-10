"use client";

import React, { useState } from "react";
import { Hero } from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonial";
import Footer from "@/components/Footer";
import HomeChatInterface from "@/components/HomeChatInterface";

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Hero />
      <Benefits />
      <Testimonials />
      <Footer />

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-700 z-50"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-3 3v-3z"
          />
        </svg>
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg z-50">
          <HomeChatInterface
            messages={[]}
            setMessages={() => {}}
            language={null}
            setLanguage={() => {}}
            onClose={() => setIsChatOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;