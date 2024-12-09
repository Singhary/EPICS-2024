"use client";
import React, { useEffect } from "react";

declare global {
  interface Window {
    embeddedChatbotConfig: {
      chatbotId: string;
      domain: string;
    };
  }
}

export const Chatbot = () => {
  useEffect(() => {
    window.embeddedChatbotConfig = {
      chatbotId: "MHIUJd852xIng5jJZ_957",
      domain: "www.chatbase.co",
    };
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute("chatbotId", "MHIUJd852xIng5jJZ_957");
    script.setAttribute("domain", "www.chatbase.co");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <></>;
};
