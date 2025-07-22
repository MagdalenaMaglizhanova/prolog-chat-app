'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

export default function PrologPlaygroundPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setScrolled(window.scrollY > 50);
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Get the code from the iframe (this would need proper CORS setup)
      // Note: This is a simplified version - in production you'd need proper CORS handling
      const iframe = document.getElementById('swish-iframe') as HTMLIFrameElement;
      const code = iframe?.contentWindow?.document.getElementById('code')?.textContent;

      if (!code || !email || !name) {
        throw new Error('Please fill all fields and write some Prolog code');
      }

      // In a real app, you would send this to your backend
      console.log('Submitting:', { name, email, code });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitStatus('success');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadCode = () => {
    try {
      const iframe = document.getElementById('swish-iframe') as HTMLIFrameElement;
      const code = iframe?.contentWindow?.document.getElementById('code')?.textContent || '';

      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prolog-program.pl';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading code:', error);
      alert('Error downloading code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Head>
        <title>Prolog Playground | Digital Bulgaria</title>
        <meta name="description" content="Write and test Prolog code directly in your browser" />
      </Head>

      {/* Navigation Bar */}
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
            <Link href="/chat" className={`font-medium transition-colors ${scrolled ? 'text-gray-800 hover:text-blue-600' : 'text-white hover:text-blue-200'}`}>Chat</Link>
            <Link href="/playground" className={`font-medium transition-colors ${scrolled ? 'text-blue-600' : 'text-blue-200'}`}>Prolog Playground</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-4 flex flex-col max-w-7xl mt-28">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Prolog Code Playground</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Write, test and share Prolog code directly in your browser. Experiment with logical programming and AI concepts.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Information Panel */}
          <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md h-fit sticky top-32">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">About This Playground</h2>
            <div className="prose text-gray-600 mb-6">
              <p>
                This interactive environment allows you to write and test Prolog code using the SWI-Prolog engine.
                You can:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Write and execute Prolog queries</li>
                <li>Test your knowledge base</li>
                <li>Experiment with logical programming concepts</li>
                <li>Download your code as .pl files</li>
                <li>Submit interesting programs to our team</li>
              </ul>
              <p className="mt-4">
                The playground is powered by <a href="https://swish.swi-prolog.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">SWISH</a>, 
                a web-based SWI-Prolog environment.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Submit Your Code</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Code to Admin'}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg">
                  Code submitted successfully! We'll review it soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  Error submitting code. Please try again.
                </div>
              )}

              <button
                onClick={downloadCode}
                className="mt-4 w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download as .pl file
              </button>
            </div>
          </div>

          {/* Prolog Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-[600px]">
              <iframe
                id="swish-iframe"
                src="https://swish.swi-prolog.org/"
                className="w-full h-full border-0"
                allow="clipboard-write"
                title="SWI-Prolog SWISH Editor"
              />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Note: The editor above is hosted on swish.swi-prolog.org. Your code remains in your browser unless you submit it.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white p-4 border-t border-gray-200 text-center text-gray-600 text-sm">
        <p>© {new Date().getFullYear()} Digital Bulgaria. All rights reserved.</p>
      </footer>
    </div>
  );
}
