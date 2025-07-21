"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<
    { user: boolean; text: string }[]
  >([
    {
      user: false,
      text: `Hello! I'm your Prolog assistant. Let's explore family relations.\n\nLoaded knowledge base: example1.pl\n\nYou can try queries like:\n• parent(magi, ivan).\n• grandparent(magi, maria).\n• grandparent(X, maria).`,
    },
  ]);

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const sampleQueries = [
    "parent(magi, ivan).",
    "parent(ivan, maria).",
    "grandparent(magi, maria).",
    "grandparent(X, maria).",
  ];

  async function sendQuery() {
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { user: true, text: query }]);
    setQuery("");

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "Error: " + data.error }]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Network error or the server is unreachable." },
      ]);
    }
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="container">
      <div className="chat-container">
        <div className="chat-header">
          <div className="header-content">
            <img src="/pic/logo_shevici.jpg" alt="Logo" className="header-logo" />
            <h2>Digital Bulgaria in Prolog</h2>
          </div>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.user ? "user-message" : "bot-message"}`}
            >
              {msg.text}
            </div>
          ))}
          <div className="knowledge-options">
            {sampleQueries.map((q, idx) => (
              <a
                key={idx}
                className="knowledge-link"
                onClick={() => setQuery(q)}
              >
                {q}
              </a>
            ))}
          </div>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendQuery()}
            placeholder="Enter a Prolog query..."
          />
          <button onClick={sendQuery}>Send</button>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
        }

        .chat-container {
          border: 1px solid #ccc;
          border-radius: 12px;
          overflow: hidden;
          background-color: #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .chat-header {
          background-color: #f7f7f8;
          padding: 12px 16px;
          border-bottom: 1px solid #e5e5e6;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-logo {
          width: 40px;
          height: 40px;
          border-radius: 6px;
        }

        .chat-box {
          height: 400px;
          overflow-y: auto;
          padding: 16px;
          background-color: #fafafa;
        }

        .chat-message {
          margin-bottom: 12px;
          padding: 10px 14px;
          border-radius: 16px;
          max-width: 80%;
          word-wrap: break-word;
        }

        .bot-message {
          background-color: #eaeaea;
          color: #000;
          align-self: flex-start;
        }

        .user-message {
          background-color: #10a37f;
          color: white;
          margin-left: auto;
          text-align: right;
        }

        .input-area {
          display: flex;
          padding: 12px;
          border-top: 1px solid #e5e5e6;
        }

        .input-area input {
          flex: 1;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .input-area button {
          margin-left: 10px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #10a37f;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .knowledge-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .knowledge-link {
          color: #10a37f;
          text-decoration: none;
          padding: 8px 12px;
          border: 1px solid #e5e5e6;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
          max-width: max-content;
        }

        .knowledge-link:hover {
          background-color: #f0f7f4;
        }
      `}</style>
    </div>
  );
}
