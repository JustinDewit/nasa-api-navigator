"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface EpicImage {
  identifier: string;
  caption: string;
  imageUrl: string;
}

export default function EpicPage() {
  const [images, setImages] = useState<EpicImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/epic/getLatestImages");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError("Error fetching images. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest EPIC Images</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.identifier}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Image
              src={image.imageUrl}
              alt={image.caption}
              width={600}
              height={600}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <p className="text-sm text-gray-600">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
