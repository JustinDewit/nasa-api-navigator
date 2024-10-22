import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log('Received GET request for Mars photos');

  const { searchParams } = new URL(request.url);
  const rover = searchParams.get('rover');
  console.log('Rover parameter:', rover);

  if (!rover) {
    console.log('Error: No rover specified');
    return new NextResponse('A rover needs to be passed on', { status: 400 });
  }

  const apiKey = process.env.NASA_API_KEY;
  if (!apiKey) {
    console.log('Error: NASA_API_KEY is not set');
    return new NextResponse('NASA_API_KEY is not set', { status: 500 });
  }
  
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/latest_photos?api_key=${apiKey}`;
  console.log('Fetching data from URL:', url);

  try {
    const res = await fetch(url);
    console.log('NASA API response status:', res.status);

    if (!res.ok) {
      console.log('Error: Failed to fetch data from NASA API');
      return new NextResponse('Failed to fetch data from NASA API', { status: 500 });
    }

    const data = await res.json();
    console.log('Successfully fetched and parsed NASA API data');
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error fetching NASA API data:', error);
    return new NextResponse(error.message, { status: 500 });
  }
}
