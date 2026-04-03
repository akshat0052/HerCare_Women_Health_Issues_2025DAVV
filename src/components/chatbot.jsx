import React, { useEffect, useRef, useState } from "react";
import { URL } from "./api";

export default function Chatbot() {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  // Speech refs
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);

  const suggestions = [
    "Common menopause symptoms?",
    "How to manage anxiety naturally?",
    "पीसीओएस शुरुआती लक्षण और ऐसे में क्या करें?",
    "मासिक के दौरान बेहतर नींद के लिए सुझाव"
  ];

  /* ================= Auto Scroll ================= */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  /* ================= Toggle Mic ================= */
  const toggleVoiceInput = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    // If already listening, stop the current session
    if (listeningRef.current && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    // Create a fresh instance every time to avoid reuse issues
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      listeningRef.current = true;
      setIsListening(true);
    };

    recognition.onend = () => {
      listeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setQuestion(text);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      listeningRef.current = false;
      setIsListening(false);
      recognitionRef.current = null;
      if (event.error === "not-allowed") {
        alert("Please allow microphone permission in your browser settings.");
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.error("Start error:", err);
    }
  };

  /* ================= Ask Question ================= */
  const askQuestion = async (customText = null) => {

    const text = customText || question;

    if (!text.trim()) return;

    const userMessage = {
      type: "user",
      text
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {

      const history = messages.map(m => ({
        role: m.type === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const payload = {
        systemInstruction: {
          role: "system",
          parts: [{
            text:
              "You are a women's health assistant. Give summary, tips, red flags, disclaimer."
          }]
        },
        contents: [
          ...history,
          {
            role: "user",
            parts: [{ text }]
          }
        ]
      };

      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Failed");

      const parts = data?.candidates?.[0]?.content?.parts || [];

      const aiText = parts
        .map(p => p?.text)
        .filter(Boolean)
        .join("\n");

      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: aiText || "No response."
        }
      ]);

    } catch (err) {

      console.error(err);

      const msg =
        err.name === "AbortError"
          ? "Stopped."
          : "Something went wrong.";

      setMessages(prev => [
        ...prev,
        { type: "ai", text: msg }
      ]);

    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4">
      <div className="flex flex-col bg-white rounded-2xl shadow-xl mx-auto max-w-3xl h-[70vh] md:h-[75vh]">

        {/* Header */}
        <div className="bg-pink-500 text-white py-3 text-center rounded-t-2xl font-semibold text-sm md:text-base">
          Women Health Chatbot 💬
        </div>

      {/* Chat */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >

        {messages.length === 0 && (
          <div className="text-gray-500 text-center mt-8 space-y-3">

            <div className="italic">
              Try asking:
            </div>

            <div className="flex flex-wrap gap-2 justify-center">

              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => askQuestion(s)}
                  className="text-sm bg-pink-50 text-pink-700 border px-3 py-1 rounded-full hover:bg-pink-100"
                >
                  {s}
                </button>
              ))}

            </div>
          </div>
        )}

        {messages.map((msg, i) => (

          <div
            key={i}
            className={`flex ${
              msg.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap ${
                msg.type === "user"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

          </div>
        ))}

        {isLoading && (
          <div className="italic text-gray-400">
            Typing...
          </div>
        )}

      </div>

      {/* Input */}
      <div className="flex border-t p-3 gap-2">

        {/* Mic */}
        <button
          onClick={toggleVoiceInput}
          disabled={isLoading}
          className={`rounded-full px-3 py-2 ${
            isListening
              ? "bg-red-500 text-white animate-pulse"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          🎤
        </button>

        {/* Text */}
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              askQuestion();
            }
          }}
          placeholder={
            isListening
              ? "Listening..."
              : "Ask about women's health..."
          }
          disabled={isLoading}
          className="flex-1 min-w-0 border rounded-full px-3 py-2 outline-none text-sm md:text-base"
        />

        {/* Send */}
        {isLoading ? (
          <button
            onClick={() => abortRef.current?.abort()}
            className="bg-gray-300 px-3 md:px-4 py-2 rounded-full text-sm"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => askQuestion()}
            disabled={!question.trim()}
            className="bg-pink-500 text-white px-3 md:px-4 py-2 rounded-full disabled:opacity-50 text-sm"
          >
            Send
          </button>
        )}

        {/* Clear */}
        <button
          onClick={() => setMessages([])}
          disabled={isLoading}
          className="hidden sm:block border px-3 md:px-4 py-2 rounded-full text-sm"
        >
          Clear
        </button>
      </div>
    </div>
    </div>
  );
}