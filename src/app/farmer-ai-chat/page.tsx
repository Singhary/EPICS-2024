// app/farmer-ai-chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import ChatInterface from "@/components/FarmerAIChatInterface";
import Sidebar from "@/components/FarmerAISidebar";

const FarmerAIChatPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (!language) {
      setMessages([
        {
          role: "assistant",
          content:
            "Which language do you prefer? (e.g., English, Hindi, Spanish)",
        },
      ]);
    }
  }, [language]);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-50 p-20">
      <Sidebar />
      <ChatInterface
        messages={messages}
        setMessages={setMessages}
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  );
};

export default FarmerAIChatPage;
