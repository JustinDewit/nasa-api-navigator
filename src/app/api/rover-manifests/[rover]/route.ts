import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { rover: string } }
) {
  const { rover } = params;

  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

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
