"use client";

import { useState } from "react";

interface ChatInterfaceProps {
  messages: { role: string; content: string }[];
  setMessages: (messages: { role: string; content: string }[]) => void;
  language: string | null;
  setLanguage: (language: string | null) => void;
}

const FarmerAIChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  setMessages,
  language,
  setLanguage,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!language) {
      // Handle language selection
      const selectedLang = input.trim().toLowerCase();
      if (selectedLang === "hindi") {
        setLanguage("hi_IN");
        setMessages([
          {
            role: "assistant",
            content: "आपने हिंदी चुनी है। अब आप कोई सवाल पूछ सकते हैं।",
          },
        ]);
      } else if (selectedLang === "english") {
        setLanguage("en_XX");
        setMessages([
          {
            role: "assistant",
            content: "You chose English. Now you can ask any question.",
          },
        ]);
      } else {
        setMessages([
          ...messages,
          { role: "assistant", content: "Please choose 'Hindi' or 'English'." },
        ]);
      }
      setInput("");
      return;
    }

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/farmer-ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, language }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.answer },
        ]);
      } else {
        setMessages([
          ...newMessages,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Error: ${String(error)}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="h-[70vh] overflow-y-auto border rounded p-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-blue-100" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder={
            language
              ? "Type your query..."
              : "Choose language: Hindi or English"
          }
          disabled={loading}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default FarmerAIChatInterface;
