'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stemProjects = [
    {
      title: "Robotics with Prolog",
      description: "Program robot behavior using logical rules.",
      image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Robotics+AI"
    },
    {
      title: "Biology Knowledge Base",
      description: "Model ecosystems and species interactions.",
      image: "https://via.placeholder.com/600x400/10b981/ffffff?text=Bio+Logic"
    },
    {
      title: "Math Theorem Solver",
      description: "Automate geometric proofs with Prolog.",
      image: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=Math+AI"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stemProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      fontFamily: '"Inter", sans-serif',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Header with Logo and System Name */}
      <div style={{
        position: 'absolute',
        top: '2rem',
        left: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <img 
          src="/logo.png" 
          alt="IDEAS Logo" 
          style={{ height: '50px', width: 'auto' }} 
        />
        <span style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: '#1e293b',
          whiteSpace: 'nowrap'
        }}>
          Intelligent Data Educational Analysis System
        </span>
      </div>

      <div style={{
        maxWidth: '1000px',
        width: '100%',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        marginTop: '4rem' // Added space for header
      }}>
        {/* Hero Section */}
        <div style={{
          padding: '3rem 2rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.8rem',
            fontWeight: '800',
            marginBottom: '1rem'
          }}>
            Build <span style={{ borderBottom: '4px solid #fbbf24' }}>STEM Knowledge</span> with Prolog
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: '0.9',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            A platform for schools to develop AI-powered STEM projects using logical programming.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="/chat" style={{
              background: 'white',
              color: '#4f46e5',
              padding: '0.8rem 2rem',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'transform 0.2s',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Try Now →
            </a>
            <a href="/learn" style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid white',
              padding: '0.8rem 2rem',
              borderRadius: '50px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
               onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Learn Prolog
            </a>
          </div>
        </div>

        {/* STEM Projects Carousel */}
        <div style={{
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Featured STEM Projects
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>
            See how schools use Prolog for AI and problem-solving.
          </p>

          <div style={{
            position: 'relative',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentSlide * 100}%)`
            }}>
              {stemProjects.map((project, index) => (
                <div key={index} style={{
                  minWidth: '100%',
                  position: 'relative'
                }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: '1.5rem',
                    textAlign: 'left'
                  }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {stemProjects.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    background: currentSlide === index ? '#4f46e5' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div style={{
          background: '#f8fafc',
          padding: '3rem 2rem',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.5rem' }}>
            How It Works
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              flex: '1',
              minWidth: '250px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#6366f1',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem'
              }}>1</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Define Rules</h3>
              <p style={{ color: '#64748b' }}>Teachers create knowledge bases with logical facts and rules.</p>
            </div>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              flex: '1',
              minWidth: '250px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#10b981',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem'
              }}>2</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Interactive Learning</h3>
              <p style={{ color: '#64748b' }}>Students query the system to explore logical relationships.</p>
            </div>
            <div style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              flex: '1',
              minWidth: '250px'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#f59e0b',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem'
              }}>3</div>
              <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Build Projects</h3>
              <p style={{ color: '#64748b' }}>Apply logic programming to real-world STEM challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
