'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const stemProjects = [
    {'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Актуализиран масив с правилни пътища за картинките от /public/stem-images/
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
  }, []);

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Хедър със заоблено лого */}
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
        {/* Заоблено лого (със същия стил като бутоните) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <img 
            src="/logo.png" 
            alt="IDEAS Logo" 
            style={{ 
              height: '60px', 
              width: '60px',
              borderRadius: '50%', // Заобляне като бутоните
              objectFit: 'cover', // Запазва пропорциите
              border: '2px solid white' // Допълнителен стил
            }} 
          />
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0
          }}>
            Intelligent Data Educational Analysis System
          </h1>
        </div>

        {/* Останалия код... */}
      </div>
    </div>
  );
}
      title: "Robotics with Prolog",
      description: "Program robot behavior using logical rules.",
      image: "/children-standing-sideways-camera-looking-charge-boards.jpg" // Example: add your actual images to /public
    },
    {
      title: "Biology Knowledge Base",
      description: "Model ecosystems and species interactions.",
      image: "/group-multiethnic-kids-wearing-vr-headsets-teacher-watching-them.jpg"
    },
    {
      title: "Math Theorem Solver",
      description: "Automate geometric proofs with Prolog.",
      image: "/examining-molecular-model.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % stemProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      {/* Full-Width Dark Blue Hero Section */}
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
        {/* Logo + Title Group */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '3rem'
        }}>
          <img 
            src="/logo.png" 
            alt="IDEAS Logo" 
            style={{ height: '60px', width: 'auto' }} 
          />
          <h1 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            margin: 0
          }}>
            Intelligent Data Educational Analysis System
          </h1>
        </div>

        {/* Main Content */}
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
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <a 
              href="/chat"
              style={{
                background: 'white',
                color: '#1e40af',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
                boxShadow: '0 4px 14px rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 255, 255, 0.2)';
              }}
            >
              Try Now →
            </a>
            <a 
              href="/learn"
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '1rem 2.5rem',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              Learn Prolog
            </a>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '4rem 2rem' 
      }}>
        {/* STEM Projects Carousel */}
        <div style={{ marginBottom: '5rem' }}>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            Featured STEM Projects
          </h3>
          <p style={{
            fontSize: '1.1rem',
            color: '#64748b',
            textAlign: 'center',
            marginBottom: '3rem',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            See how schools use Prolog for AI and problem-solving.
          </p>

          <div style={{
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'flex',
              transition: 'transform 0.5s ease',
              transform: `translateX(-${currentSlide * 100}%)`
            }}>
              {stemProjects.map((project, index) => (
                <div key={index} style={{ minWidth: '100%', position: 'relative' }}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{ 
                      width: '100%', 
                      height: '500px', 
                      objectFit: 'cover' 
                    }} 
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '2rem'
                  }}>
                    <h4 style={{ 
                      fontSize: '2rem', 
                      marginBottom: '0.5rem' 
                    }}>
                      {project.title}
                    </h4>
                    <p style={{ fontSize: '1.1rem' }}>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              marginTop: '1.5rem'
            }}>
              {stemProjects.map((_, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: 'none',
                    background: currentSlide === index ? '#1e40af' : '#e2e8f0',
                    cursor: 'pointer',
                    transition: 'background 0.3s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div>
          <h3 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            How It Works
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              flex: '1',
              minWidth: '300px',
              maxWidth: '350px',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: '#1e40af',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>
                1
              </div>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Define Rules
              </h4>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                Teachers create knowledge bases with logical facts and rules.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              flex: '1',
              minWidth: '300px',
              maxWidth: '350px',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: '#1e40af',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>
                2
              </div>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Interactive Learning
              </h4>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                Students query the system to explore logical relationships.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              flex: '1',
              minWidth: '300px',
              maxWidth: '350px',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: '#1e40af',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>
                3
              </div>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Build Projects
              </h4>
              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                Apply logic programming to real-world STEM challenges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
