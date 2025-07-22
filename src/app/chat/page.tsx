'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ChatPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ user: boolean; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState("mineral_waters");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

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

  async function sendQuery(customQuery?: string) {
    const finalQuery = customQuery || query;
    if (!finalQuery.trim() || isLoading) return;

    setMessages((prev) => [...prev, { user: true, text: finalQuery }]);
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
        setMessages((prev) => [...prev, { user: false, text: data.result }]);
      } else if (data.error) {
        setMessages((prev) => [...prev, { user: false, text: "Error: " + data.error }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { user: false, text: "Network error or server not responding." },
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

  const quickQueries = knowledgeBase === "mineral_waters" ? mineralWaterQueries : historyQueries;

  const welcomeMessage = knowledgeBase === "mineral_waters" 
    ? "Hello! I can help you explore knowledge about mineral waters in Bulgaria. What would you like to know?"
    : "Hello! I can help you explore Bulgarian historical sites. What would you like to know?";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation with enhanced logo frame */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white shadow-lg' : 'py-5 bg-blue-900'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-16 w-16 rounded-full p-1.5 bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl ring-4 ring-white/20 ring-offset-2 ring-offset-blue-900 transition-all duration-300 group-hover:rotate-6 group-hover:ring-blue-300/30">
              <div className="relative h-full w-full rounded-full overflow-hidden bg-white p-1 border-2 border-white/30">
                <Image 
                  src="/logo.png" 
                  alt="Digital Bulgaria Logo" 
                  width={64}
                  height={64}
                  className="h-full w-full object-cover rounded-full transition-transform duration-300 group-hover:scale-95"
                  priority
                />
              </div>
            </div>
            <span className={`text-xl font-bold ${scrolled ? 'text-blue-900' : 'text-white'} transition-colors duration-300`}>IDEAS</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Home</Link>
            <a href="#features" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Features</a>
            <a href="#how-it-works" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>How It Works</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 flex flex-col max-w-4xl mt-20">
        <div className="flex-grow bg-white rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full p-1 bg-gradient-to-br from-blue-300 to-blue-400 mr-3 shadow-md">
                <div className="relative h-full w-full rounded-full overflow-hidden bg-white p-0.5 border border-white/20">
                  <Image 
                    src="/logo.png" 
                    alt="Digital Bulgaria Logo" 
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Digital Bulgaria in Prolog</h2>
                <p className="text-blue-100">Ask about {knowledgeBase === "mineral_waters" ? "mineral waters" : "Bulgarian history"}</p>
              </div>
            </div>
            
            <div className="relative">
              <select
                value={knowledgeBase}
                onChange={(e) => setKnowledgeBase(e.target.value)}
                className="appearance-none bg-white/90 border border-gray-200 rounded-lg px-4 py-2 pr-8 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <option value="mineral_waters">Mineral Waters</option>
                <option value="history">Bulgarian History</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
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
              ? [{ user: false, text: welcomeMessage }]
              : messages
            ).map((msg, i) => (
              <div
                key={i}
                className={`flex mb-6 ${msg.user ? "justify-end" : "justify-start"}`}
              >
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
                            src="/logo.png" 
                            alt="Chat Logo" 
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-xl px-4 py-3 ${
                      msg.user
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="flex">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden mr-3 border-2 border-white shadow-md">
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <div className="relative h-8 w-8 rounded-full overflow-hidden">
                        <Image 
                          src="/logo.png" 
                          alt="Chat Logo" 
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-200 text-gray-800 rounded-xl rounded-bl-none px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                placeholder={`Type your ${knowledgeBase === "mineral_waters" ? "mineral waters" : "history"} query here...`}
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => sendQuery()}
                disabled={isLoading || !query.trim()}
                className={`px-6 py-3 rounded-lg text-white font-medium flex items-center ${
                  isLoading || !query.trim()
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-all duration-200 shadow-md hover:shadow-lg`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                    </svg>
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} IDEAS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
