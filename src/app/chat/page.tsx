"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Автоматично скролване към последното съобщение
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendQuery() {
    if (!query.trim()) return;

    // Добавяме заявката от потребителя в чата
    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      // Добавяме отговора от Prolog в чата
      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "Грешка: " + data.error }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Мрежова грешка или сървърът не отговаря" },
      ]);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Prolog Chat Assistant</h1>
        <p className="text-indigo-200 text-sm">Задавайте вашите Prolog заявки тук</p>
      </header>

      {/* Chat container */}
      <div className="flex-1 p-4 overflow-hidden max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-xl shadow-md h-full flex flex-col">
          {/* Messages area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p>Започнете разговор с вашата Prolog заявка</p>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex mb-4 ${msg.user ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.user
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.user ? "text-indigo-200" : "text-gray-500"
                      }`}
                    >
                      {msg.user ? "Вие" : "Prolog"}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendQuery()}
                placeholder="Напишете Prolog заявка..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={sendQuery}
                disabled={!query.trim()}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Изпрати
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Натиснете Enter за изпращане
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
