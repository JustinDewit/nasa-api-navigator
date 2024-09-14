'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ApodPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/apod')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-6 text-center">{data.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <Image
            src={data.url}
            alt={data.title}
            width={1024}
            height={1024}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-lg">
          <p className="text-sm text-blue-300 mb-2">Date: {data.date}</p>
          <p className="mb-4 text-lg">{data.explanation}</p>
          {data.copyright && (
            <p className="text-sm text-blue-300">Copyright: {data.copyright}</p>
          )}
        </div>
      </div>
    </div>
  );
}
