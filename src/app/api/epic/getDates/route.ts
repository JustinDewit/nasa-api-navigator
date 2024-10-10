import { NextResponse } from 'next/server';

export async function GET() {
  const NASA_API_KEY = process.env.NASA_API_KEY;

  if (!NASA_API_KEY) {
    return NextResponse.json({ error: 'NASA API key is not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/all?api_key=${NASA_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from NASA API');
    }

    const data = await response.json();
    const dates = data.map((item: { date: string }) => item.date);

    return NextResponse.json({ dates });
  } catch (error) {
    console.error('Error fetching EPIC dates:', error);
    return NextResponse.json({ error: 'Failed to fetch EPIC dates' }, { status: 500 });
  }
}
