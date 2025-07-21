// app/api/prolog/route.ts
import { NextResponse } from 'next/server';

// Типове за заявката
interface PrologRequest {
  query: string;
  file: string;
  userCode?: string;
}

// Разрешени файлове (трябва да съвпадат с тези в клиента)
const ALLOWED_FILES = ['example1.pl', 'mineral_water.pl', 'history.pl'];

// URL на вашия Prolog сървър
const PROLOG_SERVER_URL = 'https://prolog-api-server-1.onrender.com/prolog';

export async function POST(request: Request) {
  try {
    // Валидация на заявката
    const { query, file, userCode } = (await request.json()) as PrologRequest;

    if (!query || !file) {
      return NextResponse.json(
        { error: 'Query and file are required' },
        { status: 400 }
      );
    }

    if (!ALLOWED_FILES.includes(file)) {
      return NextResponse.json(
        { error: `File not allowed. Allowed files: ${ALLOWED_FILES.join(', ')}` },
        { status: 403 }
      );
    }

    // Изпращане към Prolog сървъра
    const prologResponse = await fetch(PROLOG_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        file,
        ...(userCode && { userCode }),
      }),
    });

    // Ако Prolog сървърът върне грешка
    if (!prologResponse.ok) {
      const errorData = await prologResponse.json();
      return NextResponse.json(
        { error: errorData.error || 'Prolog server error' },
        { status: prologResponse.status }
      );
    }

    const data = await prologResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Prolog route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Опционално: Добавете GET endpoint за информация
export async function GET() {
  return NextResponse.json({
    description: 'Prolog API Proxy',
    allowed_files: ALLOWED_FILES,
    prolog_server: PROLOG_SERVER_URL,
  });
}
