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
      {/* Navigation with updated larger circular logo */}
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
              <div className="absolute inset-0 rounded-full border-2 border-white/30 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-white/10 transition-all duration-300 pointer-events-none"></div>
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

      {/* останалата част от компонента остава непроменена */}
      {/* ... */}
    </div>
  );
}
