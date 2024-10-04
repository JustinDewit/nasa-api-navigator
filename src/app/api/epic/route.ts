// Create a server-side API route to handle EPIC API requests

// Import necessary modules (e.g., NextResponse)

// Securely access the EPIC API key from environment variables

// Define the GET handler function:
// - Parse query parameters from the request URL:
//   - 'category' (default to 'natural')
//   - 'endpoint' ('all', 'date', etc.)
//   - 'date' (if applicable)
// - Construct the EPIC API URL based on the parameters
// - Append the API key to the EPIC API URL
// - Fetch data from the EPIC API using the constructed URL
// - Handle potential errors during the fetch
// - Return the fetched data as a JSON response
// - Set appropriate HTTP status codes for success and error cases

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const baseUrl = 'https://epic.gsfc.nasa.gov/api';
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection') || 'natural';
  const date = searchParams.get('date');

  let url = `${baseUrl}/${collection}`;
  if (date) {
    url += `/date/${date}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.statusText}`);
    }
    const data = await res.json();

    // Add image URLs to the response
    const enhancedData = data.map((item: any) => {
      const { image, date } = item;
      const [year, month, day] = date.split(' ')[0].split('-');
      const imageUrl = `https://epic.gsfc.nasa.gov/archive/${collection}/${year}/${month}/${day}/png/${image}.png`;
      return { ...item, imageUrl };
    });

    return NextResponse.json(enhancedData);
  } catch (error) {
    console.error('Error fetching EPIC data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}

// TODO: Add caching to reduce API calls and improve performance
