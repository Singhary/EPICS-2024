"use client";
import { Chatbot } from "@/components/chatbot";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main>
        <Hero />
        <Features />
        <Chatbot />
      </main>
    </div>
  );
}
