"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [language, setLanguage] = useState<"en" | "bg">("bg");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Language Switcher */}
      <header className="flex justify-end p-4 bg-white shadow">
        <Button
          onClick={() => setLanguage(language === "en" ? "bg" : "en")}
          variant="outline"
        >
          {language === "en" ? "BG" : "EN"}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-blue-600 to-blue-400 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold mb-6"
        >
          {language === "en"
            ? "Discover STEM Through Logic Programming"
            : "Открий STEM чрез Логическо Програмиране"}
        </motion.h1>
        <p className="text-lg max-w-2xl mb-8">
          {language === "en"
            ? "An interactive educational platform where students learn Computer Science, Math, and Logic through Prolog."
            : "Интерактивна образователна платформа, където учениците изучават информатика, математика и логика чрез Prolog."}
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
            {language === "en" ? "Get Started" : "Започни сега"}
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white">
            {language === "en" ? "Learn More" : "Научи повече"}
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "en" ? "Features" : "Функционалности"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">
              {language === "en" ? "Interactive Lessons" : "Интерактивни уроци"}
            </h3>
            <p>
              {language === "en"
                ? "Step-by-step Prolog tutorials with real-time feedback."
                : "Стъпка по стъпка уроци по Prolog с обратна връзка в реално време."}
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">
              {language === "en"
                ? "STEM Problem Solving"
                : "STEM Решаване на задачи"}
            </h3>
            <p>
              {language === "en"
                ? "Learn math, logic, and computer science concepts."
                : "Учи математика, логика и концепции по информатика."}
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">
              {language === "en" ? "Gamified Challenges" : "Геймифицирани предизвикателства"}
            </h3>
            <p>
              {language === "en"
                ? "Earn points and badges while solving logic puzzles."
                : "Печели точки и значки, докато решаваш логически задачи."}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "en" ? "How It Works" : "Как работи"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Learn Basics" : "Научи основите"}
            </h3>
          </div>
          <div>
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Practice" : "Практикувай"}
            </h3>
          </div>
          <div>
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="font-semibold mb-2">
              {language === "en" ? "Build Projects" : "Създавай проекти"}
            </h3>
          </div>
        </div>
      </section>

      {/* Example Code Section */}
      <section className="py-16 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12">
          {language === "en" ? "Try It Out" : "Изпробвай"}
        </h2>
        <div className="max-w-2xl mx-auto bg-gray-900 text-white rounded-xl shadow p-6 font-mono text-sm">
          <div className="text-yellow-400">{"parent(simeon, ivan)."}</div>
          <div className="text-yellow-400">{"parent(ivan, petar)."}</div>
          <div className="text-yellow-400">{"grandparent(X, Y) :-"}</div>
          <div className="text-yellow-400 ml-4">{"parent(X, Z), parent(Z, Y)."}</div>
          <div className="mt-4 text-green-400">{"?- grandparent(simeon, petar)."}</div>
          <div className="text-green-400">{"> true"}</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">IDEAS</h4>
              <p>
                {language === "en"
                  ? "STEM education through Prolog."
                  : "STEM образование чрез Prolog."}
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                {language === "en" ? "Links" : "Линкове"}
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "Home" : "Начало"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "Features" : "Функции"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "About" : "За нас"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                {language === "en" ? "Resources" : "Ресурси"}
              </h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "Docs" : "Документация"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "Tutorials" : "Уроци"}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{language === "en" ? "API Reference" : "API референция"}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                {language === "en" ? "Contact" : "Контакт"}
              </h4>
              <ul className="space-y-2">
                <li><a href="mailto:info@ideas-platform.com" className="hover:text-white transition-colors">info@ideas-platform.com</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">{language === "en" ? "Contact Form" : "Форма за контакт"}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} IDEAS. {language === "en" ? "All rights reserved." : "Всички права запазени."}
          </div>
        </div>
      </footer>
    </div>
  );
}
