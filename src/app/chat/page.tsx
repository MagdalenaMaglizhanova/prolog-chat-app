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
  const [savedConversations, setSavedConversations] = useState<{id: string, title: string}[]>([]);
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [activeHint, setActiveHint] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKnowledgeBaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newKnowledgeBase = e.target.value;
    setKnowledgeBase(newKnowledgeBase);
    setMessages([]);
    setActiveAnalysis(null);
    setActiveHint(null);
  };

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
        body: JSON.stringify({ query: finalQuery, knowledgeBase }),
      });

      const data = await res.json();

      if (data.result) {
        setMessages((prev) => [...prev, { 
          user: false, 
          text: data.result,
          id: Date.now().toString(),
          timestamp: new Date()
        }]);
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

  const mineralWaterQueries = [
    { label: "Classify Spring", query: "classify_spring(X)" },
    { label: "Spring Medical Issues", query: "spring_medical_issues(X)" },
    { label: "Springs by Temperature", query: "springs_by_temperature_class(X)" },
    { label: "Springs by Gas Class", query: "springs_by_gas_class(X)" },
    { label: "Springs by Mineralization", query: "springs_by_mineralization_class(X)" },
    { label: "Bio Active: Silica", query: "springs_by_bio_active_class('Silica')" },
  ];

  const historyQueries = [
    { label: "All Historical Sites", query: "historical_site(Name, _, _, _)" },
    { label: "Thracian Sites", query: "sites_by_period(thracian, Name)" },
    { label: "Roman Sites", query: "sites_by_period(roman, Name)" },
    { label: "Medieval Sites", query: "sites_by_period(medieval, Name)" },
    { label: "Fortresses", query: "sites_by_type(fortress, Name)" },
    { label: "Churches", query: "sites_by_type(church, Name)" },
    { label: "Sites in Plovdiv", query: "sites_in_location('Plovdiv', Name)" },
    { label: "Site Details", query: "site_details('Rila Monastery', Details)" },
  ];

  const cavesQueries = [
    { label: "All Caves", query: "cave(Name, _, _, _, _, _, _)" },
    { label: "Caves by Mountain", query: "caves_by_mountain('Rhodope Mountains', Name)" },
    { label: "Longest Caves", query: "caves_longer_than(1000, Name)" },
    { label: "Deepest Caves", query: "caves_deeper_than(50, Name)" },
    { label: "Cave Details", query: "cave_details('Devetaška Cave', Details)" },
  ];

  const birdsQueries = [
    { label: "All Birds", query: "bird(Name, _, _, _, _)" },
    { label: "Birds by Type", query: "birds_by_type('Raptor', Name)" },
    { label: "Birds by Habitat", query: "birds_by_habitat('Wetlands', Name)" },
    { label: "Migratory Birds", query: "birds_by_migration('Migratory', Name)" },
    { label: "Bird Details", query: "bird_details('White Stork', Details)" },
  ];

  const quickQueries = (() => {
    switch (knowledgeBase) {
      case "mineral_waters": return mineralWaterQueries;
      case "history": return historyQueries;
      case "caves": return cavesQueries;
      case "birds": return birdsQueries;
      default: return [];
    }
  })();

  const welcomeMessage = (() => {
    switch (knowledgeBase) {
      case "mineral_waters": return "Hello! I can help you explore knowledge about mineral waters in Bulgaria. What would you like to know?";
      case "history": return "Hello! I can help you explore Bulgarian historical sites. What would you like to know?";
      case "caves": return "Hello! I can help you explore Bulgarian caves. What would you like to know?";
      case "birds": return "Hello! I can help you explore birds of Bulgaria. What would you like to know?";
      default: return "Hello! What would you like to explore?";
    }
  })();

  const knowledgeBaseInfo = (() => {
    switch (knowledgeBase) {
      case "mineral_waters": return `The knowledge base contains structured information about mineral springs in Bulgaria, represented by facts of the type spring/9.`;
      case "history": return `The historical sites knowledge base contains information about important archaeological and historical sites in Bulgaria.`;
      case "caves": return `The caves knowledge base contains structured information about caves in Bulgaria, with details like mountain range, length, and depth.`;
      case "birds": return `The birds knowledge base contains information about birds in Bulgaria, including type, habitat, migration status, and notable features.`;
      default: return "";
    }
  })();

  const handleSendEmail = async () => {
    if (!email) return;
    
    try {
      const conversation = messages.map(m => `${m.user ? 'You:' : 'Bot:'} ${m.text}`).join('\n\n');
      console.log('Sending email to:', email);
      console.log('Conversation:', conversation);
      
      alert(`Conversation sent to ${email}`);
      setShowEmailForm(false);
      setEmail("");
      
      setSavedConversations(prev => [...prev, {
        id: Date.now().toString(),
        title: `Conversation about ${knowledgeBase} - ${new Date().toLocaleString()}`
      }]);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white shadow-lg' : 'py-5 bg-blue-900'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-4 group">
              <div className="relative h-20 w-20 rounded-full p-1.5 bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg transition-transform duration-300 group-hover:rotate-6">
                <div className="relative h-full w-full rounded-full overflow-hidden bg-white p-1 border-2 border-white/20">
                  <Image 
                    src="/logo.png" 
                    alt="Digital Bulgaria Logo" 
                    fill
                    className="object-contain rounded-full transition-transform duration-300 group-hover:scale-95"
                    priority
                  />
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Home</Link>
              <a href="#features" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Features</a>
              <a href="#how-it-works" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>How It Works</a>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto p-4 flex flex-col max-w-4xl mt-28">
          <div className="flex-grow bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full p-1 bg-gradient-to-br from-blue-300 to-blue-400 mr-3 shadow-md">
                  <div className="relative h-full w-full rounded-full overflow-hidden bg-white p-0.5 border border-white/20">
                    <Image 
                      src="/logo_shevici.jpg" 
                      alt="Digital Bulgaria Logo" 
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">Digital Bulgaria in Prolog</h2>
                  <p className="text-blue-100">Ask about {knowledgeBase.replace('_',' ')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={knowledgeBase}
                    onChange={handleKnowledgeBaseChange}
                    className="appearance-none bg-white/90 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    <option value="mineral_waters">Mineral Waters</option>
                    <option value="history">Bulgarian History</option>
                    <option value="caves">Bulgarian Caves</option>
                    <option value="birds">Birds of Bulgaria</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                
                {messages.length > 0 && (
                  <button 
                    onClick={() => setShowEmailForm(true)}
                    className="px-3 py-1 bg-white/90 text-blue-600 rounded-lg text-sm font-medium hover:bg-white transition-all"
                  >
                    Share
                  </button>
                )}
              </div>
            </div>

            {/* Quick Query Buttons */}
            <div className="p-4 flex flex-wrap gap-3 border-b border-gray-200 bg-gray-50">
              {quickQueries.map((btn, index) => (
                <button
                  key={index}
                  onClick={() => sendQuery(btn.query)}
                  className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto bg-gray-50" style={{ maxHeight: "60vh" }}>
              {(messages.length === 0
                ? [{ user: false, text: welcomeMessage, id: 'welcome', timestamp: new Date() }]
                : messages
              ).map((msg, i) => (
                <div key={msg.id} className={`flex mb-6 ${msg.user ? "justify-end" : "justify-start"}`}>
                  <div className={`flex ${msg.user ? "flex-row-reverse" : ""} max-w-[90%]`}>
                    <div className={`flex-shrink-0 h-10 w-10 rounded-full overflow-hidden ${msg.user ? "ml-3" : "mr-3"} border-2 border-white shadow-md`}>
                      {msg.user ? (
                        <div className="bg-blue-500 text-white h-full w-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden">
                            <Image 
                              src="/logo_shevici.jpg" 
                              alt="Chat Logo" 
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className={`rounded-xl px-4 py-3 ${msg.user ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendQuery()}
                  placeholder={`Type your query about ${knowledgeBase.replace('_',' ')} here...`}
                  className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendQuery()}
                  disabled={isLoading || !query.trim()}
                  className={`px-6 py-3 rounded-lg text-white font-medium ${isLoading || !query.trim() ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} IDEAS Platform. All rights reserved.</p>
        </footer>
      </div>

      {/* Knowledge Base Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-4 hidden md:block overflow-y-auto">
        <div className="sticky top-0">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {knowledgeBase.replace('_',' ').toUpperCase()} Knowledge Base
          </h3>
          <div className="prose prose-sm text-gray-600">
            <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm">
              {knowledgeBase === "mineral_waters" 
                ? `spring(ID, Name, Temperature, Altitude, H2SiO3, CO2, HS, Anions, Cations).`
                : knowledgeBase === "history" 
                ? `historical_site(Name, Period, Type, Location).`
                : knowledgeBase === "caves" 
                ? `cave(Name, Mountain, Length, Depth, Location, Type, Notes).`
                : `bird(Name, Type, Habitat, Migration, Notes).`}
            </pre>
            <div className="mt-4 text-sm">{knowledgeBaseInfo}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
