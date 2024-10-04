// API documentation: https://epic.gsfc.nasa.gov/about/api
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface EpicData {
  identifier: string;
  caption: string;
  imageUrl: string;
  date: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
}

export default function EpicPage() {
  const [epicData, setEpicData] = useState<EpicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEpicData();
  }, []);

  const fetchEpicData = async () => {
    try {
      const response = await fetch("/api/epic");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setEpicData(data);
    } catch (err) {
      setError("Error fetching EPIC data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">EPIC Earth Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {epicData.map((item) => (
          <div
            key={item.identifier}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={item.imageUrl}
              alt={item.caption}
              width={600}
              height={600}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {new Date(item.date).toLocaleString()}
              </h2>
              <p className="text-gray-600 mb-2">{item.caption}</p>
              <p className="text-sm text-gray-500">
                Lat: {item.centroid_coordinates.lat.toFixed(2)}, Lon:{" "}
                {item.centroid_coordinates.lon.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
