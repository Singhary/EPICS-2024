import React from "react";
import { Hero } from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonial";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Hero />
      <Benefits />
      <Testimonials />
      <Footer/>
    </div>
  );
};

export default LandingPage;
