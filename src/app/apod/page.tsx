'use client';

import { useState, useEffect } from 'react';
import { fetchAPOD } from '../../lib/api';
import Image from 'next/image';

export default function APODPage() {
  const [apodData, setApodData] = useState<APODResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAPOD() {
      try {
        const data = await fetchAPOD();
        setApodData(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError('Failed to fetch APOD data');
      } finally {
        setLoading(false);
      }
    }
    loadAPOD();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!apodData) return <div>No data available</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{apodData.title}</h1>
      {apodData.media_type === 'image' ? (
        <Image src={apodData.url} alt={apodData.title} width={800} height={600} className="mb-4" />
      ) : (
        <iframe src={apodData.url} title={apodData.title} className="w-full h-96 mb-4" />
      )}
      <p className="mb-2">{apodData.date}</p>
      <p>{apodData.explanation}</p>
    </div>
  );
}
