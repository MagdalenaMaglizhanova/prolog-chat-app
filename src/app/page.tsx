'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const stemProjects = [
    {
      title: "Robotics with Prolog",
      description: "Program robot behavior using logical rules and AI principles.",
      image: "/stem-images/children-standing-sideways-camera-looking-charge-boards.jpg"
    },
    {
      title: "Biology Knowledge Base",
      description: "Model ecosystems and species interactions with logical programming.",
      image: "/stem-images/examining-molecular-model.jpg"
    },
    {
      title: "Math Theorem Solver",
      description: "Automate geometric proofs and algebraic solutions with Prolog.",
      image: "/stem-images/group-multiethnic-kids-wearing-vr-headsets-teacher-watching-them.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stemProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans bg-white antialiased">
      <Head>
        <title>IDEAS | STEM Education with Prolog</title>
        <meta name="description" content="Platform for schools to develop AI-powered STEM projects using logical programming" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

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
            <a 
              href="/chat" 
              className={`px-5 py-2 rounded-full font-semibold transition-all ${scrolled ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
            >
              Try Now
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl rounded-lg mx-6 mt-2 py-4 px-6 absolute w-[calc(100%-3rem)]">
            <a href="#features" className="block py-2 font-medium text-gray-800 hover:text-blue-600">Features</a>
            <a href="#projects" className="block py-2 font-medium text-gray-800 hover:text-blue-600">Projects</a>
            <a href="#how-it-works" className="block py-2 font-medium text-gray-800 hover:text-blue-600">How It Works</a>
            <a href="/chat" className="block mt-2 py-2 px-4 bg-blue-600 text-white rounded-full font-semibold text-center">Try Now</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 filter blur-3xl animate-float1"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-500 filter blur-3xl animate-float2"></div>
          <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-600 filter blur-3xl animate-float3"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
              Intelligent Data Educational Analysis System
            </span>
          </h1>

          {/* Hero Content */}
          <div>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              We teach students logical programming to build AI and apply their skills through hands-on STEM projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="/chat"
                className="px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started for Free →
              </a>
              <a 
                href="https://www.swi-prolog.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn Prolog Basics
              </a>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Why Schools Choose Our Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrating Logic Programming with STEM Education
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Logical Thinking",
                description: "Develop computational thinking skills through declarative programming",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "AI Foundations",
                description: "Introduce artificial intelligence concepts through expert systems",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                )
              },
              {
                title: "Cross-Disciplinary",
                description: "Apply programming skills across math, science, and engineering",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-blue-100"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEM Projects Carousel */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">Showcase</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              Featured STEM Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how schools are using Prolog for AI and problem-solving across disciplines.
            </p>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {stemProjects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div className="aspect-[16/9]">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end p-8">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-xl text-blue-100">{project.description}</p>
                        <a href="#" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                          View Case Study
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-all"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + stemProjects.length) % stemProjects.length)}
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/40 transition-all"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % stemProjects.length)}
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {stemProjects.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-semibold uppercase tracking-wider">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to integrate logical programming into your STEM curriculum.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Define Rules",
                description: "Teachers create knowledge bases with logical facts and rules that model domain-specific concepts.",
                icon: "1"
              },
              {
                title: "Interactive Learning",
                description: "Students query the system to explore logical relationships and test hypotheses in real-time.",
                icon: "2"
              },
              {
                title: "Build Projects",
                description: "Apply logic programming to solve real-world STEM challenges with guided projects.",
                icon: "3"
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-2xl font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {step.icon}
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-16 h-1 bg-gray-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your STEM Program?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Join hundreds of schools using IDEAS to teach AI and logical programming concepts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="/contact"
              className="px-8 py-4 bg-white text-blue-700 rounded-full font-bold text-lg shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all duration-300"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-white font-bold text-lg">IDEAS</span>
              </div>
              <p className="text-gray-400">
                Helping the next generation think critically through programming.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Lesson Plans</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>contact@ideas.edu</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
              
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} IDEAS Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        .animate-float1 { animation: float1 8s ease-in-out infinite; }
        .animate-float2 { animation: float2 10s ease-in-out infinite; }
        .animate-float3 { animation: float3 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
