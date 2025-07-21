'use client';

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#f3f4f6',
      padding: '0 20px'
    }}>
      <h1 style={{ color: '#4f46e5', fontSize: '3rem', marginBottom: '0.5rem' }}>
        Добре дошла в Prolog Chat!
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#374151', marginBottom: '2rem', maxWidth: 600, textAlign: 'center' }}>
        Това е мястото, където можеш да изпращаш Prolog команди и да виждаш резултатите директно в браузъра.
      </p>
      <a 
        href="/chat" 
        style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          boxShadow: '0 4px 6px rgba(79, 70, 229, 0.5)',
          transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#4338ca')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#4f46e5')}
      >
        Отиди на Чат
      </a>
    </main>
  );
}
