
import { useState } from "react";
import { askAI } from "../services/aiService";
import {
  Send,
  Sparkles,
  Trash2,
  Copy,
  ArrowLeft,
} from "lucide-react";

function AIAssistant({ onBack }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "👋 Hi PCU! I'm CampusOS AI. Ask me anything about coding, exams, projects, placements or college.",
    },
  ]);

  // Clear Chat
  const clearChat = () => {
    setMessages([
      {
        sender: "ai",
        text: "👋 Hi Mayur! I'm CampusOS AI. Ask me anything about coding, exams, projects, placements or college.",
      },
    ]);
  };

  // Copy Message
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Send Message
  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const reply = await askAI(currentMessage);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);
    } catch (error) {
  console.error("AI Error:", error);

  setMessages((prev) => [
    ...prev,
    {
      sender: "ai",
      text: "❌ " + error.message,
    },
  ]);
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex flex-col">

      {/* Header */}

      <header className="sticky top-0 bg-white shadow-sm border-b z-50">

        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

          <div className="flex items-center gap-4">

            <button
              onClick={onBack}
              className="rounded-lg border p-2 hover:bg-blue-50"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-3">

              <div className="bg-blue-600 p-3 rounded-xl">
                <Sparkles className="text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold">
                  CampusOS AI
                </h1>

                <p className="text-gray-500 text-sm">
                  Your Personal Campus Assistant
                </p>

              </div>

            </div>

          </div>

          <button
            onClick={clearChat}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100"
          >
            <Trash2 size={18} />
            Clear
          </button>

        </div>

      </header>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto">

        <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.sender === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-3xl rounded-3xl px-6 py-4 shadow-lg ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >

                <p className="whitespace-pre-wrap">
                  {msg.text}
                </p>

                {msg.sender === "ai" && (

                  <button
                    onClick={() => copyMessage(msg.text)}
                    className="mt-3 flex items-center gap-2 text-blue-600 text-sm hover:underline"
                  >
                    <Copy size={15} />
                    Copy
                  </button>

                )}

              </div>

            </div>

          ))}

          {loading && (

            <div className="flex justify-start">

              <div className="bg-white rounded-3xl px-6 py-4 shadow-lg">

                <p>🤖 Thinking...</p>

              </div>

            </div>

          )}

        </div>

      </div>

      {/* Input */}

      <div className="border-t bg-white">

        <div className="max-w-5xl mx-auto flex gap-4 px-6 py-5">

          <input
            type="text"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-600"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6"
          >
            <Send />
          </button>

        </div>

      </div>

    </div>
  );
}

export default AIAssistant;