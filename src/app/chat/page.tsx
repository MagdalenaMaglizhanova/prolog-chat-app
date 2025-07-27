'use client';
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

type KnowledgeBaseType = 'mineral_waters' | 'history';

interface AnalysisData {
  springName: string;
  classifications: {
    gas?: string;
    mineral?: string;
    bioActive?: string;
    temperature?: string;
    mineralization?: string;
  };
  researchQuestions: string[];
  nextSteps: string[];
  hint: string;
}

interface Message {
  user: boolean;
  text: string;
  id: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBaseType>("mineral_waters");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [explorationStep, setExplorationStep] = useState(0);
  const [currentFocus, setCurrentFocus] = useState("");

  const welcomeMessage = `Welcome to the ${knowledgeBase === "mineral_waters" ? "Mineral Waters" : "History"} Explorer! Start by typing a query or using the guided exploration.`;

  const explorationPrompts: Record<KnowledgeBaseType, string[]> = {
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

  const analyzeResponse = (text: string): AnalysisData => {
    const analysis: AnalysisData = {
      springName: "",
      classifications: {},
      researchQuestions: [],
      nextSteps: [],
      hint: ""
    };

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
    else if (knowledgeBase === "history") {
      // Similar analysis for history knowledge base
    }

    return analysis;
  };

  async function sendQuery(customQuery?: string) {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    const newMessage: Message = { 
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow container mx-auto p-4 flex flex-col max-w-4xl mt-28">
          <div className="flex-grow bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: "60vh" }}>
              {showExplorationPrompt()}

              {(messages.length === 0
                ? [{ user: false, text: welcomeMessage, id: 'welcome', timestamp: new Date() }]
                : messages
              ).map((msg, i) => {
                const analysisData = analyzeResponse(msg.text);
                return (
                  <div key={msg.id} className={`flex mb-6 ${msg.user ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-3/4 rounded-lg p-4 ${msg.user ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    {activeAnalysis === msg.id && (
                      <div className="mt-2 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3">Research Insights:</h4>
                        
                        {analysisData.springName && (
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-700 mb-2">Classifications:</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              {analysisData.classifications.gas && (
                                <div>
                                  <span className="font-semibold">Gas:</span> {analysisData.classifications.gas}
                                </div>
                              )}
                              {analysisData.classifications.mineral && (
                                <div>
                                  <span className="font-semibold">Mineral:</span> {analysisData.classifications.mineral}
                                </div>
                              )}
                              {analysisData.classifications.bioActive && (
                                <div>
                                  <span className="font-semibold">Bio-Active:</span> {analysisData.classifications.bioActive}
                                </div>
                              )}
                              {analysisData.classifications.temperature && (
                                <div>
                                  <span className="font-semibold">Temperature:</span> {analysisData.classifications.temperature}
                                </div>
                              )}
                              {analysisData.classifications.mineralization && (
                                <div>
                                  <span className="font-semibold">Mineralization:</span> {analysisData.classifications.mineralization}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-700 mb-2">Questions to Explore:</h5>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            {analysisData.researchQuestions.map((q, i) => (
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
                            {analysisData.nextSteps.map((step, i) => (
                              <button
                                key={i}
                                onClick={() => {
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
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendQuery()}
                  placeholder="Type your query here..."
                  className="flex-grow px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendQuery()}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
