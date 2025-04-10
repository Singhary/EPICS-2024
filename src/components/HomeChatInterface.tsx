"use client";

import { useState, useEffect } from "react";

interface ChatInterfaceProps {
  messages: { role: string; content: string }[];
  setMessages: (messages: { role: string; content: string }[]) => void;
  language: string | null;
  setLanguage: (language: string | null) => void;
  onClose: () => void;
}

const HomeChatInterface: React.FC<ChatInterfaceProps> = ({
  messages: initialMessages,
  setMessages: setInitialMessages,
  language: initialLanguage,
  setLanguage: setInitialLanguage,
  onClose,
}) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string | null>(initialLanguage);
  const [languageSelected, setLanguageSelected] = useState<boolean>(!!initialLanguage);

  // Set initial prompt only if no language is selected and messages are empty
  useEffect(() => {
    if (!languageSelected && messages.length === 0) {
      setMessages([{ role: "assistant", content: "Please select your preferred language:" }]);
    }
  }, [languageSelected, messages.length]);

  // Sync local and parent state
  useEffect(() => {
    setInitialMessages(messages);
  }, [messages, setInitialMessages]);

  useEffect(() => {
    setInitialLanguage(language);
  }, [language, setInitialLanguage]);

  const handleLanguageSelect = (lang: string) => {
    const languageCode = lang === "Hindi" ? "hi_IN" : "en_XX";
    setLanguage(languageCode);
    setLanguageSelected(true);
    const message = lang === "Hindi" 
      ? "आपने हिंदी चुनी है। अब आप कोई सवाल हिंदी में पूछ सकते हैं।" 
      : "You chose English. Now you can ask any question in English.";
    setMessages([{ role: "assistant", content: message }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !language) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/landing-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, language }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages([...newMessages, { role: "assistant", content: data.answer }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: `Error: ${data.error}` }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: `Error: ${String(error)}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border border-green-200 rounded-lg font-sans">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      
      <div className="h-64 overflow-y-auto mb-4 border-b border-green-200">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-blue-100" : "bg-green-50"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>
      
      {!languageSelected ? (
        <div className="mb-4 flex gap-2 justify-center">
          <button
            onClick={() => handleLanguageSelect("Hindi")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Hindi
          </button>
          <button
            onClick={() => handleLanguageSelect("English")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            English
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border border-green-300 rounded font-sans"
            placeholder={language === "hi_IN" ? "हिंदी में प्रश्न पूछें..." : "Ask a question in English..."}
            disabled={loading}
          />
          <button
            type="submit"
            className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      )}
    </div>
  );
};

export default HomeChatInterface;