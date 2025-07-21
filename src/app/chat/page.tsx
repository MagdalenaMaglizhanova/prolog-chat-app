"use client";

import { useState } from "react";
import Image from "next/image";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);

  async function sendQuery(customQuery?: string) {
    const actualQuery = customQuery ?? query.trim();
    if (!actualQuery) return;

    setMessages((prev) => [...prev, { user: true, text: actualQuery }]);
    setQuery("");

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: actualQuery }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "Грешка: " + data.error }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "❌ Мрежова грешка или сървърът не отговаря" },
      ]);
    }
  }

  const predefinedQueries = [
    {
      label: "Mineral Springs in Bulgaria",
      query: "consult('mineral_water.pl')",
    },
    {
      label: "Historical Sites",
      query: "consult('history.pl')",
    },
    {
      label: "Medicinal Herbs",
      query: "consult('herbs.pl')",
    },
  ];

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <Image
              src="/pic/logo_shevici.jpg"
              alt="Logo"
              className="header-logo"
              width={50}
              height={50}
            />
            <h2>Digital Bulgaria in Prolog</h2>
          </div>
        </div>

        <div className="chat-box" id="chatBox">
          <div className="chat-message bot-message">
            Hello! I'm your Prolog assistant. How can I help you today?
          </div>
          <div className="chat-message bot-message">
            Please choose from the following options:
            <div className="knowledge-options">
              {predefinedQueries.map((item, idx) => (
                <a
                  key={idx}
                  className="knowledge-link"
                  onClick={() => sendQuery(item.query)}
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div style={{ marginTop: 12, fontStyle: "italic" }}>
              Select an option to explore Bulgaria&apos;s rich cultural and natural heritage.
            </div>
          </div>

          {messages.map((msg, i) => (
            <div key={i} className={`chat-message ${msg.user ? "user-message" : "bot-message"}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendQuery()}
            placeholder="Enter Prolog code or question..."
          />
          <button onClick={() => sendQuery()}>Send</button>
        </div>
      </div>

      <style jsx>{`
        .container {
          padding: 40px;
          display: flex;
          justify-content: center;
        }

        .chat-container {
          width: 100%;
          max-width: 700px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .chat-header {
          background: #f8f8f8;
          padding: 12px 20px;
          border-bottom: 1px solid #eee;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-box {
          height: 400px;
          overflow-y: auto;
          padding: 20px;
          background: #fafafa;
        }

        .chat-message {
          margin-bottom: 12px;
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 20px;
          word-wrap: break-word;
        }

        .bot-message {
          background: #eaeaea;
          color: #333;
          align-self: flex-start;
        }

        .user-message {
          background: #0070f3;
          color: white;
          align-self: flex-end;
          margin-left: auto;
        }

        .input-area {
          display: flex;
          padding: 16px;
          border-top: 1px solid #eee;
        }

        .input-area input {
          flex-grow: 1;
          padding: 10px 14px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .input-area button {
          margin-left: 10px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .knowledge-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 10px;
        }

        .knowledge-link {
          color: #10a37f;
          text-decoration: none;
          padding: 8px 12px;
          border: 1px solid #e5e5e6;
          border-radius: 8px;
          transition: all 0.2s;
          max-width: max-content;
          cursor: pointer;
        }

        .knowledge-link:hover {
          background-color: #f0f7f4;
        }
      `}</style>
    </div>
  );
}
