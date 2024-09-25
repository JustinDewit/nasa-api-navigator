import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sol = searchParams.get('sol') || '1000'; // Default to sol 1000 if not provided
  const rover = searchParams.get('rover') || 'curiosity'; // Default to 'curiosity' if not provided

  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY'; // Use DEMO_KEY if NASA_API_KEY is not set
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${apiKey}&sol=${sol}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return new NextResponse('Failed to fetch data from NASA API', { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
