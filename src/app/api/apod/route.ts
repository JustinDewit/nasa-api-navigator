// app/api/apod/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://api.nasa.gov/planetary/apod';
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key not found' }, { status: 500 });
  }

  const url = `${baseUrl}?api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
