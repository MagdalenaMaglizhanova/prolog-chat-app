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

  // Автоматично скролване до последното съобщение
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendQuery() {
    if (!query.trim() || isLoading) return;

    // Добавяне на потребителското съобщение
    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");
    setIsLoading(true);

    try {
      const response = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query, 
          file: selectedFile,
          // userCode: "...", // Ако искате да добавяте custom Prolog код
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP грешка: ${response.status}`);
      }

      const data = await response.json();

      // Обработка на отговора
      if (data.result) {
        setMessages((prev) => [
          ...prev,
          { 
            user: false, 
            text: formatPrologResult(data.result) 
          },
        ]);
      } else if (data.error) {
        throw new Error(data.error);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { 
          user: false, 
          text: `❌ Грешка: ${error instanceof Error ? error.message : "Неизвестна грешка"}` 
        },
      ]);
      console.error("API грешка:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Форматиране на Prolog резултатите за по-добра четливост
  function formatPrologResult(result: string) {
    if (result === "true") return "✅ Вярно";
    if (result === "false") return "❌ Невярно";
    
    try {
      // Опит за форматиране на list от отговори
      if (result.startsWith("[") && result.endsWith("]")) {
        const items = result.slice(1, -1).split("],[").flatMap(s => s.split(","));
        return `🔍 Резултати:\n${items.map((item, i) => `${i + 1}. ${item.trim()}`).join("\n")}`;
      }
    } catch (e) {
      console.warn("Грешка при форматиране:", e);
    }
    
    return result;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Prolog Chat</h1>
          <p className="text-indigo-200">Задавайте Prolog заявки към {selectedFile}</p>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 flex flex-col max-w-3xl">
        <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
          {/* File selector */}
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label htmlFor="file-select" className="block text-sm text-gray-600 mb-1">
                Prolog файл:
              </label>
              <select
                id="file-select"
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={isLoading}
              >
                {availableFiles.map((file) => (
                  <option key={file} value={file}>
                    {file}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-sm bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg">
              <span className="font-medium">Endpoint: </span>
              <code>POST /prolog</code>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-grow p-4 overflow-y-auto" style={{ maxHeight: "70vh" }}>
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p className="text-lg">Добре дошли!</p>
                  <p>Задайте Prolog заявка като:</p>
                  <code className="block mt-2 p-2 bg-gray-100 rounded">
                    mineral_water(X)
                  </code>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex mb-4 ${msg.user ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-lg px-4 py-2 ${
                      msg.user
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                    }`}
                  >
                    <div className="whitespace-pre-wrap font-mono text-sm">
                      {msg.user ? msg.text : formatPrologResult(msg.text)}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2 border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <span>Processing...</span>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendQuery()}
                placeholder="Въведете Prolog заявка..."
                className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isLoading}
              />
              <button
                onClick={sendQuery}
                disabled={isLoading || !query.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLoading || !query.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Изпращане..." : "Изпрати"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Prolog Chat App | API: {selectedFile}</p>
      </footer>
    </div>
  );
}
