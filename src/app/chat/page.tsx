'use client';

import { useState } from 'react';

type Message = {
  user: boolean;
  text: string;
};

const knowledgeBases = [
  {
    label: 'Mineral Springs in Bulgaria',
    command: "consult('mineral_water.pl')",
    examples: [
      { label: 'Classify spring', command: 'classify_spring(Name)' },
      { label: 'Spring medical issues', command: 'spring_medical_issues(Name)' },
      { label: 'Springs by temperature class', command: 'springs_by_temperature_class(TempClass)' },
    ],
  },
  {
    label: 'Historical Sites',
    command: "consult('history.pl')",
    examples: [
      { label: 'Details about Plovdiv', command: "site_details('Plovdiv')" },
      { label: 'List all historical sites', command: 'list_sites' },
    ],
  },
  {
    label: 'Medicinal Herbs',
    command: "consult('herbs.pl')",
    examples: [
      { label: 'Details about Chamomile', command: "herb_details('Chamomile')" },
      { label: 'List all medicinal herbs', command: 'list_herbs' },
    ],
  },
];

export default function ChatPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { user: false, text: "Hello! I&apos;m your Prolog assistant. How can I help you today?" },
  ]);
  const [activeKB, setActiveKB] = useState<string | null>(null);
  const [examples, setExamples] = useState<{ label: string; command: string }[]>([]);

  async function sendQuery(command?: string) {
    const userInput = command || query.trim();
    if (!userInput || !activeKB) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: '⚠️ Please select a knowledge base and enter a query.' },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { user: true, text: command || query }]);
    setQuery('');

    try {
      const fullQuery = `${activeKB}, ${userInput}`;
      const res = await fetch('https://prolog-api-server-1.onrender.com/prolog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: fullQuery }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: 'Грешка: ' + data.error }]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { user: false, text: '❌ Network error or server not responding.' },
      ]);
    }
  }

  function selectKnowledgeBase(kbCommand: string, exampleSet: typeof examples) {
    setActiveKB(kbCommand);
    setExamples(exampleSet);
    setMessages((prev) => [
      ...prev,
      {
        user: false,
        text: `✅ Knowledge base loaded. You can now run queries.`,
      },
    ]);
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="/logo_shevici.jpg" alt="Logo" width={60} height={60} />
        <h2>Digital Bulgaria in Prolog</h2>
      </div>

      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          height: 400,
          overflowY: 'auto',
          marginTop: 20,
          borderRadius: 8,
          background: '#f9f9f9',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.user ? 'right' : 'left', margin: '8px 0' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 20,
                backgroundColor: msg.user ? '#0070f3' : '#eaeaea',
                color: msg.user ? 'white' : 'black',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>Select a knowledge base:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
          {knowledgeBases.map((kb) => (
            <button
              key={kb.label}
              onClick={() => selectKnowledgeBase(kb.command, kb.examples)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                cursor: 'pointer',
              }}
            >
              {kb.label}
            </button>
          ))}
        </div>
      </div>

      {examples.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <strong>Try one of these:</strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {examples.map((ex) => (
              <button
                key={ex.label}
                onClick={() => sendQuery(ex.command)}
                style={{
                  padding: '8px 12px',
                  borderRadius: 8,
                  backgroundColor: '#10a37f',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendQuery()}
          placeholder="Enter Prolog code or question..."
          style={{ flex: 1, padding: 10, fontSize: 16 }}
        />
        <button
          onClick={() => sendQuery()}
          style={{ padding: '10px 20px', fontSize: 16, backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: 8 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
