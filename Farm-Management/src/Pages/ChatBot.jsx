import React, { useState, useRef, useEffect } from "react";
import { Send, MessageCircle } from "lucide-react";

export default function GeminiChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState(true);
  const messagesEndRef = useRef(null);

  const apiKey = "AIzaSyB5ZrVH5gjOFUuNQnH0hKo0g0ek9wYFkBg";
  const model = "gemini-2.0-flash-exp";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;
    setWelcome(false);
    setLoading(true);

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: userMessage }] }],
          }),
        }
      );

      const data = await res.json();
      const responseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ No response from AI.";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: responseText },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Error generating response. Please try again.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <MessageCircle size={28} />
          <h1 className="text-2xl font-bold">AI Chatbot</h1>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 md:px-20 lg:px-40 space-y-4">
        {welcome && messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-full">
                  <MessageCircle size={48} className="text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Start Your Journey
              </h2>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 text-2xl font-bold">
                With AI (Artificial Intelligence)
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                msg.role === "user"
                  ? "bg-green-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{msg.content}</p>
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-300 p-4 md:px-20 lg:px-40 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border-2 border-green-500 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent font-light text-gray-800 placeholder-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt here"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <button
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 rounded-full font-bold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={sendMessage}
            disabled={loading}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
