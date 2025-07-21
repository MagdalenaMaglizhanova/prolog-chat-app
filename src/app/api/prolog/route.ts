// app/api/prolog/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Задаване на динамичен endpoint

interface PrologRequest {
  query: string;
}

export async function POST(request: Request) {
  try {
    const { query } = (await request.json()) as PrologRequest;

    if (!query) {
      return NextResponse.json(
        { error: 'No query provided' },
        { status: 400 }
      );
    }

    // Изпращане към оригиналния Prolog сървър на Render
    const renderResponse = await fetch('https://prolog-api-server-1.onrender.com/prolog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!renderResponse.ok) {
      const errorData = await renderResponse.text();
      return NextResponse.json(
        { error: errorData || 'Prolog server error' },
        { status: renderResponse.status }
      );
    }

    const data = await renderResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Prolog route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Допълнителен GET endpoint за проверка на връзката
export async function GET() {
  return NextResponse.json({
    status: 'ready',
    message: 'Prolog API proxy is operational',
    prologServer: 'https://prolog-api-server-1.onrender.com/prolog'
  });
}
