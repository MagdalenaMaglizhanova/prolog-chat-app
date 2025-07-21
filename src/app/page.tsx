'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stemProjects = [
    {
      title: "Robotics with Prolog",
      description: "Program robot behavior using logical rules.",
      image: "/stem-images/children-standing-sideways-camera-looking-charge-boards.jpg"
    },
    {
      title: "Biology Knowledge Base",
      description: "Model ecosystems and species interactions.",
      image: "/stem-images/examining-molecular-model.jpg"
    },
    {
      title: "Math Theorem Solver",
      description: "Automate geometric proofs with Prolog.",
      image: "/stem-images/group-multiethnic-kids-wearing-vr-headsets-teacher-watching-them.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stemProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [stemProjects.length]); // добавена липсваща зависимост

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <Image
            src="/logo.png"
            alt="IDEAS Logo"
            width={60}
            height={60}
            style={{
              borderRadius: '12px',
              objectFit: 'contain',
              border: '2px solid white'
            }}
            priority
          />
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0
          }}>
            Intelligent Data Educational Analysis System
          </h1>
        </div>

        {/* Main Text */}
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{
            fontSize: '3.2rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Build STEM Knowledge with Prolog
          </h2>
          <p style={{
            fontSize: '1.3rem',
            opacity: '0.9',
            marginBottom: '3rem'
          }}>
            A platform for schools to develop AI-powered STEM projects using logical programming.
          </p>
          {/* Buttons */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a href="/chat" style={{
              background: 'white',
              color: '#1e40af',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              transition: 'all 0.3s',
              boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'
            }}>
              Try Now →
            </a>
            <a href="/learn" style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '1rem 2.5rem',
              borderRadius: '50px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              transition: 'all 0.3s'
            }}>
              Learn Prolog
            </a>
          </div>
        </div>
      </div>

      {/* Carousel Section (оставено със стандартни <img>, ако искаш и тях мога да преработя) */}
      {/* TODO: По желание можем да заменим и project.image със <Image /> компонент, ако имаш нужда. */}

    </div>
  );
}
