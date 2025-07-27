'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string; id: string; timestamp: Date }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("mineral_waters");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [explorationStep, setExplorationStep] = useState(0); // Track exploration progress
  const [currentFocus, setCurrentFocus] = useState(""); // Track current exploration topic

  // Initial exploration prompts based on knowledge base
  const explorationPrompts = {
    mineral_waters: [
      "Let's start by exploring all mineral springs. Try: classify_all",
      "Now let's examine one spring in detail. Choose a spring name from the list and try: classify_spring('Belchin-Verila')",
      "Interesting! What medical conditions might this spring help with? Try: spring_medical_issues('Belchin-Verila')",
      "Let's compare with other springs. Try: springs_by_temperature_class('Thermal')",
      "Now let's look at chemical composition. Try: springs_by_mineralization_class('High Mineralization')",
      "Would you like to explore bio-active properties? Try: springs_by_bio_active_class('Silica')"
    ],
    history: [
      "Let's start by exploring historical sites. Try: historical_site(Name, _, _, _)",
      "Now let's examine sites by period. Try: sites_by_period(thracian, Name)",
      "Interesting! Let's look at specific types. Try: sites_by_type(fortress, Name)",
      "Would you like to see sites in a specific location? Try: sites_in_location('Plovdiv', Name)"
    ]
  };

  // Add more functions from your original code...

  // Modified analyzeResponse to provide progressive hints
  const analyzeResponse = (text: string) => {
    const analysis = {
      springName: "",
      classifications: {},
      researchQuestions: [],
      nextSteps: [],
      hint: ""
    };

    // Mineral waters specific analysis
    if (knowledgeBase === "mineral_waters") {
      if (text.includes("is a") && (text.includes("water") || text.includes("spring"))) {
        const lines = text.split('\n');
        analysis.springName = lines[0].split(' is a ')[0];
        
        analysis.classifications = {
          gas: lines.find(l => l.includes('gas water'))?.split(' is a ')[1]?.replace('.', ''),
          mineral: lines.find(l => l.includes('mineralized water'))?.split(' is a ')[1]?.replace('.', ''),
          bioActive: lines.find(l => l.includes('bio-active water'))?.split(' is a ')[1]?.replace('.', ''),
          temperature: lines.find(l => l.includes('spring'))?.split(' is a ')[1]?.replace('.', ''),
          mineralization: lines.find(l => l.includes('has '))?.split('has ')[1]?.replace('.', '')
        };

        analysis.researchQuestions = [
          "What relationships do you see between chemical composition and medical properties?",
          "What are common characteristics of springs in the same class?",
          "How does temperature affect chemical composition?",
          "Is there a relationship between altitude and mineralization?"
        ];

        // Provide progressive hints based on exploration step
        if (explorationStep === 1) {
          analysis.hint = "Now try examining the medical properties of this spring. The query starts with 'spring_medical...'";
        } else if (explorationStep === 2) {
          analysis.hint = "Let's compare this with other springs. Try looking for springs with similar temperature using 'springs_by_temperature...'";
        } else if (explorationStep === 3) {
          analysis.hint = "Interesting! Now let's examine the chemical composition. Try 'springs_by_mineralization...'";
        }

        analysis.nextSteps = [
          "Compare with another spring",
          "Research medical applications",
          "Explore geographic patterns",
          "Analyze parameter relationships"
        ];
      }
    }

    // History specific analysis
    else if (knowledgeBase === "history") {
      // Similar analysis for history knowledge base
      // ...
    }

    return analysis;
  };

  // Modified sendQuery to track exploration progress
  async function sendQuery(customQuery?: string) {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    const newMessage = { 
      user: true, 
      text: finalQuery,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newMessage]);
    setQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("https://prolog-api-server-1.onrender.com/prolog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: finalQuery }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { 
          user: false, 
          text: data.result,
          id: Date.now().toString(),
          timestamp: new Date()
        }]);

        // Update exploration step
        if (finalQuery.includes("classify_all")) {
          setCurrentFocus("overview");
          setExplorationStep(1);
        } else if (finalQuery.includes("classify_spring")) {
          setCurrentFocus("single_spring");
          setExplorationStep(2);
        } else if (finalQuery.includes("spring_medical")) {
          setCurrentFocus("medical");
          setExplorationStep(3);
        }
        // Add more conditions for other query patterns

      } else if (data.error) {
        setMessages((prev) => [...prev, { 
          user: false, 
          text: "Error: " + data.error,
          id: Date.now().toString(),
          timestamp: new Date()
        }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { 
          user: false, 
          text: "Network error or server not responding.",
          id: Date.now().toString(),
          timestamp: new Date()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  // Add guided exploration prompt
  const showExplorationPrompt = () => {
    if (messages.length === 0 || (messages.length === 1 && !messages[0].user)) {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Exploration Guide</h4>
          <p className="text-blue-700">{explorationPrompts[knowledgeBase][explorationStep]}</p>
          <button 
            onClick={() => {
              const prompt = explorationPrompts[knowledgeBase][explorationStep];
              const query = prompt.split("Try: ")[1];
              if (query) sendQuery(query);
            }}
            className="mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm hover:bg-blue-200"
          >
            Try This Query
          </button>
        </div>
      );
    }
    return null;
  };

  // Modified messages area to include exploration prompts
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* ... (keep existing navigation and header code) ... */}

        <main className="flex-grow container mx-auto p-4 flex flex-col max-w-4xl mt-28">
          <div className="flex-grow bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
            {/* ... (keep existing chat header and quick query buttons) ... */}

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: "60vh" }}>
              {showExplorationPrompt()}

              {(messages.length === 0
                ? [{ user: false, text: welcomeMessage, id: 'welcome', timestamp: new Date() }]
                : messages
              ).map((msg, i) => {
                const analysisData = analyzeResponse(msg.text);
                return (
                  <div key={msg.id} className={`flex mb-6 ${msg.user ? "justify-end" : "justify-start"}`}>
                    {/* ... (keep existing message rendering code) ... */}
                    
                    {/* Modified analysis section to show progressive hints */}
                    {activeAnalysis === msg.id && (
                      <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">Research Insights:</h4>
                        
                        {analysisData.springName && (
                          <div className="mb-4">
                            {/* ... (keep existing classification display) ... */}
                          </div>
                        )}

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Questions to Explore:</h5>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {analysisData.researchQuestions?.map((q, i) => (
                              <li key={i}>{q}</li>
                            ))}
                          </ul>
                        </div>

                        {analysisData.hint && (
                          <div className="mb-3 p-3 bg-blue-100 rounded-lg text-sm text-blue-800">
                            <strong>Hint:</strong> {analysisData.hint}
                          </div>
                        )}

                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Possible Next Steps:</h5>
                          <div className="flex flex-wrap gap-2">
                            {analysisData.nextSteps?.map((step, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  // Provide more abstract guidance rather than exact queries
                                  let hint = "";
                                  if (step.includes("medical")) {
                                    hint = "Try a query starting with 'spring_medical...'";
                                  } else if (step.includes("compare")) {
                                    hint = "Try comparing with springs_by_... followed by a property";
                                  }
                                  setMessages(prev => [...prev, {
                                    user: false,
                                    text: hint,
                                    id: Date.now().toString(),
                                    timestamp: new Date()
                                  }]);
                                }}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200"
                              >
                                {step}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* ... (keep rest of the code) ... */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
