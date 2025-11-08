import React, { useState } from "react";
import { URL } from "./api";

export default function Chatbot() {

  const [Question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async () => {
    if (!Question.trim()) return;

    // Add user message to chat
    const userMessage = { type: "user", text: Question };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setQuestion("");

    try {
      const payload = {
        contents: [{
          parts: [{ text: Question }]
        }]
      };

      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      // Extract AI response
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
      const aiMessage = { type: "ai", text: aiText };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [...prev, { type: "ai", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-xl w-full max-w-md h-[70vh] mx-auto mt-[9rem]">
      <div className="bg-pink-500 text-white py-3 text-center rounded-t-2xl font-semibold">
        Women Health Chatbot 💬
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-400 italic text-center mt-8">
            Ask me anything about women's health!
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.type === "user" 
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
          onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
          placeholder="Ask about women's health..."
          className="flex-1 border rounded-full px-3 py-2 focus:outline-none"
          disabled={isLoading}
        />

        <button
          className="bg-pink-500 text-white rounded-full px-4 py-2 hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={askQuestion}
          disabled={isLoading || !Question.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

