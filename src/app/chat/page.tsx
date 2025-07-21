"use client";

import { useState } from "react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);

  async function sendQuery() {
    if (!query.trim()) return;

    // Добавяме заявката от потребителя в чата
    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");

    try {
      const res = await fetch("/api/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      // Добавяме отговора от Prolog в чата
      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "Error: " + data.error }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { user: false, text: "Network error" }]);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>Prolog Chat</h1>

      <div style={{ border: "1px solid #ccc", padding: 10, height: 400, overflowY: "auto" }}>
        {messages.map((msg, i) => (
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
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendQuery()}
          placeholder="Напиши Prolog заявка тук..."
          style={{ width: "80%", padding: 10, fontSize: 16 }}
        />
        <button onClick={sendQuery} style={{ padding: "10px 20px", marginLeft: 10, fontSize: 16 }}>
          Изпрати
        </button>
      </div>
    </div>
  );
}
