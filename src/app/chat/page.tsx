"use client";

import { useState, useEffect, useRef } from "react";

const knowledgeBases = {
  "mineral_water.pl": [
    { label: "Classify spring", command: "classify_spring(Name)" },
    { label: "Spring medical issues", command: "spring_medical_issues(Name)" },
    { label: "Springs by temperature class", command: "springs_by_temperature_class(TempClass)" },
  ],
  "history.pl": [
    { label: "Details about Plovdiv", command: "site_details('Plovdiv')" },
    { label: "List all historical sites", command: "list_sites" },
  ],
  "herbs.pl": [
    { label: "Details about Chamomile", command: "herb_details('Chamomile')" },
    { label: "List all medicinal herbs", command: "list_herbs" },
  ],
};

export default function PrologChat() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; html?: boolean; text: string }[]>([
    { user: false, text: "Hello! I'm your Prolog assistant. How can I help you today?" },
    {
      user: false,
      html: true,
      text: `Please choose from the following options:
        <div class="knowledge-options">
          <a href="#" data-filename="mineral_water.pl">Mineral Springs in Bulgaria</a>
          <a href="#" data-filename="history.pl">Historical Sites</a>
          <a href="#" data-filename="herbs.pl">Medicinal Herbs</a>
        </div>
        <div style="margin-top: 12px; font-style: italic;">
          Select an option to explore Bulgaria's rich cultural and natural heritage.
        </div>`,
    },
  ]);
  const [activeKB, setActiveKB] = useState<string | null>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const sendPrologQuery = async (userText: string) => {
    if (!userText.trim()) return;

    if (!activeKB) {
      setMessages((prev) => [
        ...prev,
        { user: true, text: userText },
        { user: false, text: "⚠️ Please select a knowledge base first." },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { user: true, text: userText }]);

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: `consult('${activeKB}'), ${userText}` }),
      });
      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { user: false, text: "❌ " + (data.error || "Unknown error") },
        ]);
      }
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: `❌ Network error: ${error.message}` },
      ]);
    }
  };

  const handleSelectKnowledge = async (filename: string) => {
    setActiveKB(filename);

    const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: `consult('${filename}')` }),
    });
    const data = await res.json();

    if (data.result) {
      const kbName = filename.replace(".pl", "").replace("_", " ");
      setMessages((prev) => [
        ...prev,
        {
          user: false,
          html: true,
          text: `✅ <strong>Knowledge base loaded:</strong> ${kbName}<br>You can try the following:`,
        },
      ]);

      const kbOptions = knowledgeBases[filename];
      if (kbOptions) {
        const buttonsHTML = kbOptions
          .map(
            (opt) =>
              `<a href="#" class="knowledge-link" data-command="${opt.command}">${opt.label}</a>`
          )
          .join("");
        setMessages((prev) => [
          ...prev,
          { user: false, html: true, text: `<div class="special-buttons">${buttonsHTML}</div>` },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "⚠️ Error loading knowledge base: " + data.error },
      ]);
    }
  };

  const handleSpecialCommand = (command: string, label: string) => {
    sendPrologQuery(command);
  };

  const handleClickInside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.matches("[data-filename]")) {
      e.preventDefault();
      const file = target.getAttribute("data-filename");
      if (file) handleSelectKnowledge(file);
    }
    if (target.matches("[data-command]")) {
      e.preventDefault();
      const command = target.getAttribute("data-command");
      const label = target.innerText;
      if (command) handleSpecialCommand(command, label);
    }
  };

  return (
    <div className="container" style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <div className="chat-header" style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <img
          src="/pic/logo_shevici.jpg"
          alt="Logo"
          style={{ width: 60, height: 60, marginRight: 16 }}
        />
        <h2>Digital Bulgaria in Prolog</h2>
      </div>

      <div
        className="chat-box"
        ref={chatBoxRef}
        onClick={handleClickInside}
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 12,
          height: 400,
          overflowY: "auto",
          backgroundColor: "#fefefe",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.user ? "user-message" : "bot-message"}`}
            style={{
              textAlign: msg.user ? "right" : "left",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 16,
                backgroundColor: msg.user ? "#0070f3" : "#eaeaea",
                color: msg.user ? "#fff" : "#000",
                maxWidth: "80%",
                wordWrap: "break-word",
              }}
              dangerouslySetInnerHTML={
                msg.html ? { __html: msg.text } : undefined
              }
            >
              {!msg.html && msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="input-area" style={{ marginTop: 10, display: "flex", gap: 8 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendPrologQuery(query)}
          placeholder="Enter Prolog code or question..."
          style={{ flexGrow: 1, padding: 12, fontSize: 16 }}
        />
        <button onClick={() => sendPrologQuery(query)} style={{ padding: "12px 20px", fontSize: 16 }}>
          Send
        </button>
      </div>

      <style jsx>{`
        .knowledge-link {
          color: #10a37f;
          text-decoration: none;
          padding: 8px 12px;
          border: 1px solid #e5e5e6;
          border-radius: 8px;
          transition: all 0.2s;
          display: inline-block;
          max-width: max-content;
          cursor: pointer;
        }

        .knowledge-link:hover {
          background-color: #f0f7f4;
        }

        .special-buttons {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
