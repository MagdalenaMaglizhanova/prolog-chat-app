'use client';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#f8fafc',
      padding: '2rem',
      color: '#0f172a'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        padding: '3rem',
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#6366f1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          λ
        </div>
        
        <h1 style={{ 
          color: '#6366f1', 
          fontSize: '2.5rem', 
          fontWeight: '800',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          Prolog Knowledge Base for STEM Learning
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#475569', 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          An interactive platform that helps schools implement STEM projects by building 
          Prolog knowledge bases and developing computational thinking skills.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a 
            href="/chat"
            style={{
              backgroundColor: '#6366f1',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              boxShadow: '0 4px 6px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Building
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          
          <a 
            href="/learn"
            style={{
              backgroundColor: 'transparent',
              color: '#6366f1',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '1rem',
              border: '2px solid #6366f1',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#e0e7ff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Learn Prolog
          </a>
        </div>
        
        <div style={{
          marginTop: '3rem',
          paddingTop: '2rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: '#334155',
            marginBottom: '1rem'
          }}>
            About This Project
          </h3>
          <p style={{
            fontSize: '0.9rem',
            color: '#64748b',
            lineHeight: '1.6'
          }}>
            This platform enables schools to create structured knowledge bases in Prolog, 
            helping students develop logical reasoning and problem-solving skills essential 
            for STEM education. Teachers can build domain-specific knowledge bases while 
            students learn through interactive querying and experimentation.
          </p>
        </div>
      </div>
    </main>
  );
}
