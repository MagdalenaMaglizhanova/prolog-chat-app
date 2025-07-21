"use client";

import { useState } from "react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [showExamples, setShowExamples] = useState(false);

  const exampleQueries = [
    "parent(magi, X).",
    "parent(ivan, Y).",
    "grandparent(magi, maria).",
    "grandparent(magi, X).",
    "parent(X, maria)."
  ];

  async function sendQuery() {
    if (!query.trim()) return;

    // Добавяме заявката от потребителя в чата
    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");
    setShowExamples(false);

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
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Prolog Family Relations Chat</h1>
      <p style={{ color: "#666" }}>Работи с база от знания за семейни връзки (example1.pl)</p>

      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "auto",
          marginBottom: 10,
          backgroundColor: "#f9f9f9"
        }}
      >
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", color: "#999", paddingTop: "40%" }}>
            Започни да задаваш въпроси за семейни връзки
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.user ? "right" : "left", margin: "8px 0" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: 20,
                  backgroundColor: msg.user ? "#0070f3" : "#eaeaea",
                  color: msg.user ? "white" : "black",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ marginBottom: 10 }}>
        <button 
          onClick={() => setShowExamples(!showExamples)} 
          style={{ 
            padding: "8px 15px", 
            backgroundColor: "#f0f0f0", 
            border: "1px solid #ddd",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          {showExamples ? "Скрий примери" : "Покажи примерни заявки"}
        </button>
        
        {showExamples && (
          <div style={{ 
            border: "1px solid #eee", 
            padding: 10, 
            marginTop: 10,
            backgroundColor: "#f5f5f5",
            borderRadius: 5
          }}>
            <p style={{ marginTop: 0 }}>Примерни заявки:</p>
            <ul style={{ paddingLeft: 20 }}>
              {exampleQueries.map((example, i) => (
                <li key={i} style={{ marginBottom: 5 }}>
                  <span 
                    style={{ 
                      cursor: "pointer", 
                      color: "#0070f3",
                      textDecoration: "underline"
                    }}
                    onClick={() => {
                      setQuery(example);
                      setShowExamples(false);
                    }}
                  >
                    {example}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendQuery()}
          placeholder="Напиши Prolog заявка (напр. parent(magi, X))..."
          style={{ 
            flex: 1, 
            padding: 10, 
            fontSize: 16,
            border: "1px solid #ccc",
            borderRadius: 5
          }}
        />
        <button 
          onClick={sendQuery} 
          style={{ 
            padding: "10px 20px", 
            marginLeft: 10, 
            fontSize: 16,
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer"
          }}
        >
          Изпрати
        </button>
      </div>
    </div>
  );
}
