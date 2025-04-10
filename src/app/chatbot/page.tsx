"use client";

import { useState } from "react";
import ChatInterface from "@/components/ChatInterface";
import Sidebar from "@/components/Sidebar";

const ChatbotPage = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [model, setModel] = useState<string>("gemini-1.5-flash"); // Default model

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setModel={setModel} />
      <ChatInterface
        messages={messages}
        setMessages={setMessages}
        sessionId={sessionId}
        setSessionId={setSessionId}
        model={model}
      />
    </div>
  );
};

export default ChatbotPage;
