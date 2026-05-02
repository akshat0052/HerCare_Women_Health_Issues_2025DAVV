import React, { useEffect, useRef, useState } from "react";
import { URL } from "./api";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [micLang, setMicLang] = useState("en-IN");
  const [micStatus, setMicStatus] = useState(""); // "" | "listening" | "speaking" | "processing"

  const scrollRef = useRef(null);
  const abortRef = useRef(null);
  const recognitionRef = useRef(null);
  const listeningRef = useRef(false);
  const transcriptRef = useRef("");

  const suggestions = [
    "Common menopause symptoms?",
    "How to manage anxiety naturally?",
    "पीसीओएस शुरुआती लक्षण और ऐसे में क्या करें?",
    "मासिक के दौरान बेहतर नींद के लिए सुझाव"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      recognitionRef.current?.stop();
    };
  }, []);

  /* =============== VOICE INPUT =============== */
  const toggleVoiceInput = () => {
    setMicError("");

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError("Please use Chrome or Edge browser for voice input.");
      return;
    }

    // Stop if already listening
    if (listeningRef.current && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    transcriptRef.current = "";

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false; // fire ONCE with the complete final result
    recognition.lang = micLang;

    // Step 1 — recognition engine started
    recognition.onstart = () => {
      listeningRef.current = true;
      setIsListening(true);
      setMicStatus("listening");
    };

    // Step 2 — mic is physically picking up your voice
    recognition.onspeechstart = () => {
      setMicStatus("speaking");
    };

    // Step 3 — voice stopped, processing
    recognition.onspeechend = () => {
      setMicStatus("processing");
    };

    // Step 4 — final result received
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      transcriptRef.current = transcript;
    };

    recognition.onerror = (event) => {
      if (event.error === "aborted") return;
      const errors = {
        "not-allowed" : "Permission denied. Click the 🔒 lock icon in address bar → Allow Microphone.",
        "audio-capture": "No microphone found. Connect a mic and try again.",
        "network"      : "Speech service network error. Check your internet connection.",
        "no-speech"    : "No speech detected. Speak clearly after clicking the mic.",
      };
      setMicError(errors[event.error] || `Mic error: ${event.error}`);
      setMicStatus("");
    };

    // onend always fires last — apply transcript here to avoid React batching issues
    recognition.onend = () => {
      if (transcriptRef.current.trim()) {
        setQuestion(transcriptRef.current.trim());
      }
      transcriptRef.current = "";
      listeningRef.current = false;
      setIsListening(false);
      setMicStatus("");
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      listeningRef.current = false;
      setIsListening(false);
      setMicStatus("");
      recognitionRef.current = null;
      setMicError("Could not start mic: " + err.message);
    }
  };

  /* =============== SEND MESSAGE =============== */
  const askQuestion = async (customText = null) => {
    const text = (customText ?? question).trim();
    if (!text) return;

    const updatedMessages = [...messages, { type: "user", text }];
    setMessages(updatedMessages);
    setQuestion("");
    setIsLoading(true);
    setMicError("");

    try {
      const payload = {
        systemInstruction: {
          role: "system",
          parts: [
            {
              text: "You are a women's health assistant. Give a short summary, practical tips, red flags to watch for, and a brief medical disclaimer."
            }
          ]
        },
        contents: updatedMessages.map((msg) => ({
          role: msg.type === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }))
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
      if (!res.ok) throw new Error(data?.error?.message || "API error");

      const parts = data?.candidates?.[0]?.content?.parts || [];
      const aiText = parts
        .map((p) => p?.text)
        .filter(Boolean)
        .join("\n")
        .trim();

      setMessages((prev) => [
        ...prev,
        { type: "ai", text: aiText || "No response received." }
      ]);
    } catch (err) {
      const errorText =
        err.name === "AbortError" ? "Stopped." : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { type: "ai", text: errorText }]);
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  /* =============== UI =============== */
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-8 px-4">
      <div className="flex flex-col bg-white rounded-2xl shadow-xl mx-auto max-w-3xl h-[70vh] md:h-[75vh]">

        {/* Header */}
        <div className="bg-pink-500 text-white py-3 text-center rounded-t-2xl font-semibold text-sm md:text-base">
          Women Health Chatbot 💬
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">

          {messages.length === 0 && (
            <div className="text-gray-500 text-center mt-8 space-y-3">
              <p className="italic text-sm">Try asking:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => askQuestion(s)}
                    className="text-sm bg-pink-50 text-pink-700 border px-3 py-1 rounded-full hover:bg-pink-100 transition"
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
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-wrap text-sm md:text-base ${
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
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-none flex gap-1">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
        </div>

        {/* Mic status */}
        {micStatus === "listening" && (
          <div className="px-4 py-2 text-xs text-blue-600 bg-blue-50 border-t border-blue-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block"></span>
            Listening... please speak now
          </div>
        )}
        {micStatus === "speaking" && (
          <div className="px-4 py-2 text-xs text-green-600 bg-green-50 border-t border-green-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block"></span>
            🎙️ Voice detected! Keep speaking...
          </div>
        )}
        {micStatus === "processing" && (
          <div className="px-4 py-2 text-xs text-yellow-700 bg-yellow-50 border-t border-yellow-100">
            ⏳ Processing your speech...
          </div>
        )}

        {/* Mic error */}
        {micError && (
          <div className="px-4 py-2 text-xs text-red-600 bg-red-50 border-t border-red-100">
            🎤 {micError}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex border-t p-3 gap-2 items-center">

          {/* Language toggle */}
          <button
            onClick={() =>
              setMicLang((l) => (l === "en-IN" ? "hi-IN" : "en-IN"))
            }
            disabled={isLoading || isListening}
            title="Toggle mic language"
            className="rounded-full px-2 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-bold w-10 flex-shrink-0"
          >
            {micLang === "en-IN" ? "EN" : "हिं"}
          </button>

          {/* Mic button */}
          <button
            onClick={toggleVoiceInput}
            disabled={isLoading}
            title={isListening ? "Stop listening" : `Speak in ${micLang === "en-IN" ? "English" : "Hindi"}`}
            className={`rounded-full px-3 py-2 flex-shrink-0 transition ${
              isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            🎤
          </button>

          {/* Text input */}
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { e.preventDefault(); askQuestion(); }
            }}
            placeholder={isListening ? "Listening... speak now" : "Ask about women's health..."}
            disabled={isLoading}
            className="flex-1 min-w-0 border rounded-full px-3 py-2 outline-none text-sm md:text-base focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
          />

          {/* Send / Stop */}
          {isLoading ? (
            <button
              onClick={() => abortRef.current?.abort()}
              className="bg-gray-300 px-3 md:px-4 py-2 rounded-full text-sm flex-shrink-0"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={() => askQuestion()}
              disabled={!question.trim()}
              className="bg-pink-500 text-white px-3 md:px-4 py-2 rounded-full disabled:opacity-50 text-sm hover:bg-pink-600 flex-shrink-0"
            >
              Send
            </button>
          )}

          {/* Clear */}
          <button
            onClick={() => setMessages([])}
            disabled={isLoading}
            className="hidden sm:block border px-3 md:px-4 py-2 rounded-full text-sm hover:bg-gray-50 flex-shrink-0"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
