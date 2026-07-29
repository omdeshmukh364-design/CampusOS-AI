import { useState } from "react";

function AIAssistant({ onBack }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const generateResponse = () => {
    if (!prompt.trim()) return;

    setResponse(
      "🤖 AI Response:\n\nThis is a demo response. Later it will come from the Gemini API through your FastAPI backend."
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <button
        onClick={onBack}
        className="mb-6 rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2">
        AI Faculty Assistant
      </h1>

      <p className="text-gray-600 mb-6">
        Generate assignments, quizzes, notices and question papers using AI.
      </p>

      <div className="bg-white rounded-xl shadow p-6">

        <textarea
          rows={6}
          className="w-full rounded-lg border p-4"
          placeholder="Example: Generate a Java assignment on Collections with 5 questions."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          onClick={generateResponse}
          className="mt-5 rounded-lg bg-indigo-600 px-8 py-3 text-white hover:bg-indigo-700"
        >
          Generate using AI
        </button>

      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          AI Output
        </h2>

        <pre className="whitespace-pre-wrap text-gray-700">
          {response || "No response yet."}
        </pre>

      </div>

    </div>
  );
}

export default AIAssistant;