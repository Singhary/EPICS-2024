"use client";

import { useState } from "react";

interface ChatInterfaceProps {
  messages: { role: string; content: string }[];
  setMessages: (messages: { role: string; content: string }[]) => void;
  sessionId: string | null;
  setSessionId: (sessionId: string | null) => void;
  model: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  setMessages,
  sessionId,
  setSessionId,
  model,
}) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, session_id: sessionId, model }),
      });

      const data = await response.json();
      if (response.ok) {
        setSessionId(data.session_id);
        setMessages([...newMessages, { role: "assistant", content: data.answer }]);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6">
      <div className="h-[70vh] overflow-y-auto border rounded p-4 bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
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
          placeholder="Type your query..."
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

export default ChatInterface;