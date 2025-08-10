import React, { useState } from "react";
import { marked } from "marked";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) {
      setResponse("⚠️ Please enter a message.");
      return;
    }
    setResponse("⏳ PLEASE WAIT FOR SOME WHILE ...");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "https://www.sitename.com",
          "X-Title": "SiteName",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [{ role: "user", content: userInput }],
        }),
      });

      const data = await res.json();
      const markdownText =
        data.choices?.[0]?.message?.content || "❌ No response received.";
      setResponse(marked.parse(markdownText));
    } catch (error) {
      setResponse("❌ Error: " + error.message);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Circle Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gray-300 hover:bg-gray-400 text-black rounded-full shadow-lg flex items-center justify-center text-3xl transition-all"
        title={isOpen ? "Close Chat" : "Open Chat"}
      >
        💬
      </button>

      {/* Chat Popup */}
      <div
        className={`transform transition-all duration-300 ease-in-out origin-bottom-right fixed bottom-24 right-6 ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-0 translate-y-10 pointer-events-none"
        }`}
        style={{
          width: "420px",
          height: "560px",
        }}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="bg-black text-white text-center py-3 font-bold text-lg rounded-t-xl">
            AI Financial Assistant
          </div>

          {/* Input Section */}
          <div className="p-4 flex gap-2 border-b border-gray-300 bg-black rounded-b-lg">
            <input
              type="text"
              className="flex-1 border border-gray-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-black text-white placeholder-gray-400"
              placeholder="Ask your question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="px-5 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition"
              onClick={sendMessage}
            >
              Ask
            </button>
          </div>

          {/* Response Section */}
          <div
            className="p-4 flex-1 overflow-y-auto bg-gray-50 text-sm text-gray-800 rounded-b-xl"
            dangerouslySetInnerHTML={{ __html: response }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;