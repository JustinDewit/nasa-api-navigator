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
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPreviousImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (images.length === 0) return <div>No images available.</div>;

  const currentImage = images[currentIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest EPIC Images</h1>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
            src={currentImage.imageUrl}
            alt={currentImage.caption}
            width={600}
            height={600}
            className="w-full h-96 object-cover"
          />
          <div className="p-4">
            <p className="text-sm text-gray-600">{currentImage.caption}</p>
            <p className="text-sm text-gray-500 mt-2">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={goToPreviousImage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={goToNextImage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
