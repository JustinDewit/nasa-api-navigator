import { NextResponse } from 'next/server';

export async function GET() {
  const NASA_API_KEY = process.env.NASA_API_KEY;

  if (!NASA_API_KEY) {
    return NextResponse.json({ error: 'NASA API key is not configured' }, { status: 500 });
  }

  try {
    // fetch the array of available dates
    const datesResponse = await fetch(`https://api.nasa.gov/EPIC/api/natural/all?api_key=${NASA_API_KEY}`);
    
    if (!datesResponse.ok) {
      throw new Error('Failed to fetch dates from NASA API');
    }

    const datesData = await datesResponse.json();
    const dates = datesData.map((item: { date: string }) => item.date);

    // Get the latest date
    const latestDate = dates[0]; // Assuming the API returns dates in descending order

    // fetch the images for the latest date
    const imagesResponse = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${latestDate}?api_key=${NASA_API_KEY}`);

    if (!imagesResponse.ok) {
      throw new Error('Failed to fetch images from NASA API');
    }

    const imagesData = await imagesResponse.json();

    // Process the image data to include full image URLs
    const processedImageData = imagesData.map((item: any) => {
      const { image, date } = item;
      const [year, month, day] = date.split(' ')[0].split('-');
      const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${image}.png`;
      return { ...item, imageUrl };
    });

    return NextResponse.json(processedImageData);
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}