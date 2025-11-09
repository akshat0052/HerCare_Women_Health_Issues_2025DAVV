import React, { useEffect, useRef, useState } from "react";
import { URL } from "./api";

export default function Chatbot() {

  const [Question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  const suggestions = [
    "What are common menopause symptoms?",
    "How to manage anxiety naturally?",
    "Early signs of PCOS and what to do?",
    "Tips for better sleep during periods"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const askQuestion = async () => {
    if (!Question.trim()) return;

    // Add user message to chat
    const userMessage = { type: "user", text: Question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion("");

    try {
      // Build chat history for better context
      const history = messages.map(m => ({
        role: m.type === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));
      const payload = {
        systemInstruction: {
          role: "system",
          parts: [{
            text:
              "You are a women's health assistant. Respond concisely with: \n1) One-line summary, \n2) 4–6 bullet tips, \n3) Red flags (when to seek care), \n4) Short non-medical-advice disclaimer. \nKeep language clear and supportive; avoid diagnosing."
          }]
        },
        contents: [
          ...history,
          {
            role: "user",
            parts: [{ text: userMessage.text }]
          }
        ]
      };

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const data = await response.json();

      if (!response.ok) {
        const errText = data?.error?.message || "Request failed. Please try again.";
        setMessages(prev => [...prev, { type: "ai", text: errText }]);
        return;
      }

      const parts = data?.candidates?.[0]?.content?.parts || [];
      const aiText = parts.map(p => p?.text).filter(Boolean).join("\n");
      const finalText = aiText || "Sorry, I couldn't generate a response.";

      const aiMessage = { type: "ai", text: finalText };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const message = error.name === 'AbortError' ? 'Stopped.' : "Sorry, something went wrong. Please try again.";
      setMessages(prev => [...prev, { type: "ai", text: message }]);
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl m-[3rem] mt-[9rem] h-[28rem]">
      <div className="bg-pink-500 text-white py-3 text-center rounded-t-2xl font-semibold">
        Women Health Chatbot 💬
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-8 space-y-3">
            <div className="italic">Ask me anything about women's health, or try:</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setQuestion(s); setTimeout(askQuestion, 0); }}
                  className="text-sm bg-pink-50 text-pink-700 border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-100"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${msg.type === "user"
                ? "bg-pink-500 text-white rounded-br-none"
                : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 p-3 rounded-lg rounded-bl-none italic">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="flex border-t p-3 gap-2">
        <input
          type="text"
          value={Question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); askQuestion(); } }}
          placeholder="Ask about women's health..."
          className="flex-1 border rounded-full px-3 py-2 focus:outline-none"
          disabled={isLoading}
        />

        {isLoading ? (
          <button
            className="bg-gray-300 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-400"
            onClick={() => { if (abortRef.current) abortRef.current.abort(); }}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-pink-500 text-white rounded-full px-4 py-2 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={askQuestion}
            disabled={!Question.trim()}
          >
            Send
          </button>
        )}

        <button
          className="ml-2 bg-white border border-gray-300 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-50"
          onClick={() => setMessages([])}
          disabled={isLoading}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

