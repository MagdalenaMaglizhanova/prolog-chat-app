"use client";
import { useState, useRef, useEffect } from "react";

const availableFiles = [
  "example1.pl",
  "mineral_water.pl",
  "history.pl",
];

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState(availableFiles[0]);
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendQuery() {
    if (!query.trim() || isLoading) return;

    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, file: selectedFile }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [
          ...prev,
          { user: false, text: data.result },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { user: false, text: "Error: " + data.error },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Network error or server is not responding" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Prolog Chat Interface</h1>
          <p className="text-indigo-200">Ask your Prolog queries and get responses</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col max-w-3xl">
        <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center space-x-4">
            <div className="flex flex-col">
              <label htmlFor="file-select" className="text-sm text-gray-600 mb-1">
                Избери Prolog файл:
              </label>
              <select
                id="file-select"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
                disabled={isLoading}
              >
                {availableFiles.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              <span>🗂️ Активен файл: </span>
              <strong>{selectedFile}</strong>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg">Welcome to Prolog Chat!</p>
                  <p>Type your Prolog query below to get started.</p>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex mb-4 ${msg.user ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                      msg.user
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-200 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendQuery()}
                placeholder="Type your Prolog query here..."
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={sendQuery}
                disabled={isLoading || !query.trim()}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  isLoading || !query.trim()
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } transition-colors`}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Prolog Chat Interface</p>
      </footer>
    </div>
  );
}
