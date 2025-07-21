"use client";

import { useState } from "react";

type Message = { user: boolean; text: string };

const knowledgeBases = [
  {
    label: "Mineral Springs in Bulgaria",
    file: "mineral_water.pl",
    options: [
      { label: "Classify spring", command: "classify_spring(Name)" },
      { label: "Spring medical issues", command: "spring_medical_issues(Name)" },
      { label: "Springs by temperature class", command: "springs_by_temperature_class(TempClass)" },
    ],
  },
  {
    label: "Historical Sites",
    file: "history.pl",
    options: [
      { label: "Details about Plovdiv", command: "site_details('Plovdiv')" },
      { label: "List all historical sites", command: "list_sites" },
    ],
  },
  {
    label: "Medicinal Herbs",
    file: "herbs.pl",
    options: [
      { label: "Details about Chamomile", command: "herb_details('Chamomile')" },
      { label: "List all medicinal herbs", command: "list_herbs" },
    ],
  },
];

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { user: false, text: "Hello! I'm your Prolog assistant. How can I help you today?" },
    {
      user: false,
      text: "Please choose from the following options:",
    },
  ]);
  const [activeBase, setActiveBase] = useState<string>("");

  const apiUrl = "https://prolog-api-server-1.onrender.com/prolog";

  const sendQuery = async (code: string) => {
    if (!code.trim()) return;

    if (!activeBase) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "⚠️ Please select a knowledge base first." },
      ]);
      return;
    }

    const fullCommand = `consult('${activeBase}'), ${code}`;
    setMessages((prev) => [...prev, { user: true, text: code }]);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: fullCommand }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "❌ Error: " + data.error }]);
      }
    } catch (_) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "❌ Network error or server is not responding." },
      ]);
    }
  };

  const handleSend = () => {
    sendQuery(query);
    setQuery("");
  };

  return (
    <div className="container" style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
      <div className="chat-header" style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/pic/logo_shevici.jpg" alt="Logo" style={{ height: 50 }} />
        <h2>Digital Bulgaria in Prolog</h2>
      </div>

      <div
        className="chat-box"
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 20,
          marginTop: 20,
          height: 400,
          overflowY: "auto",
          backgroundColor: "#fefefe",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.user ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.user ? "#10a37f" : "#eee",
                color: msg.user ? "white" : "black",
                padding: "10px 14px",
                borderRadius: 20,
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="knowledge-options" style={{ marginTop: 20 }}>
        {knowledgeBases.map((kb) => (
          <div key={kb.file} style={{ marginBottom: 10 }}>
            <button
              onClick={() => {
                setActiveBase(kb.file);
                setMessages((prev) => [
                  ...prev,
                  {
                    user: false,
                    text: `✅ Loaded knowledge base: ${kb.label}`,
                  },
                ]);
              }}
              className="knowledge-link"
              style={{
                display: "inline-block",
                border: "1px solid #e5e5e6",
                padding: "8px 12px",
                borderRadius: 8,
                backgroundColor: activeBase === kb.file ? "#f0f7f4" : "white",
                color: "#10a37f",
                cursor: "pointer",
              }}
            >
              {kb.label}
            </button>

            {activeBase === kb.file && (
              <div className="special-buttons" style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
                {kb.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => sendQuery(opt.command)}
                    style={{
                      padding: "6px 10px",
                      fontSize: 14,
                      backgroundColor: "#e5f7f0",
                      border: "1px solid #ccc",
                      borderRadius: 6,
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="input-area" style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Enter Prolog code or question..."
          style={{ flex: 1, padding: 10, fontSize: 16, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button onClick={handleSend} style={{ padding: "10px 16px", fontSize: 16, borderRadius: 8, backgroundColor: "#10a37f", color: "white", border: "none" }}>
          Send
        </button>
      </div>
    </div>
  );
}
