import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://api.nasa.gov/planetary/apod';
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  const currentDate = new Date().toISOString().split('T')[0];
  const url = `${baseUrl}?api_key=${apiKey}&date=${currentDate}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    
    if (!res.ok) {
      throw new Error(`NASA API responded with status: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching APOD:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// TODO: Add more (optional) parameters to the API call (e.g. date, hd, etc.)
// TODO: Add caching to reduce API calls and improve performance
