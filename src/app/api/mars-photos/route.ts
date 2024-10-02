import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rover = searchParams.get('rover');

  if (!rover) {
    return new NextResponse('A rover needs to be passed on', { status: 400 });
  }

  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY'; // Use DEMO_KEY if NASA_API_KEY is not set
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`;

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
