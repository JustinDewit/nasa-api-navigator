interface APODParams {
  date?: string;
  start_date?: string;
  end_date?: string;
  count?: number;
  thumbs?: boolean;
}

export async function fetchAPOD(params: APODParams = {}): Promise<APODResponse | APODResponse[]> {
  const baseUrl = 'https://api.nasa.gov/planetary/apod';
  const url = new URL(baseUrl);
  
  url.searchParams.append('api_key', process.env.NASA_API_KEY || '');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching APOD:', error);
    throw error;
  }
}

interface APODResponse {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
}
