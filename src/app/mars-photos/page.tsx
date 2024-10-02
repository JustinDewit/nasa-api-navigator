"use client";

import React, { useState, useEffect } from "react";

type Photo = {
  id: number;
  img_src: string;
  earth_date: string;
  camera: {
    full_name: string;
  };
};

type Manifest = {
  photo_manifest: {
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    photos: {
      sol: number;
      earth_date: string;
      total_photos: number;
      cameras: string[];
    }[];
  };
};

const rovers = ["Curiosity", "Perseverance"];

export default function MarsPhotosPage() {
  const [selectedRover, setSelectedRover] = useState("Curiosity");
  const [manifestData, setManifestData] = useState<Manifest | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchManifestAndPhotos = async () => {
      setIsLoading(true);
      try {
        // Fetch mission manifest data
        const manifestRes = await fetch(
          `/api/rover-manifests/${selectedRover.toLowerCase()}`
        );
        if (!manifestRes.ok) {
          throw new Error("Failed to fetch mission manifest data");
        }
        const manifestData: Manifest = await manifestRes.json();
        setManifestData(manifestData);

        // Fetch latest photos data
        const photosRes = await fetch(
          `/api/mars-photos?rover=${selectedRover.toLowerCase()}`
        );
        if (!photosRes.ok) {
          throw new Error("Failed to fetch photos data");
        }
        const photosData = await photosRes.json();
        setPhotos(photosData.latest_photos);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManifestAndPhotos();
  }, [selectedRover]);

  return (
    <div className="flex justify-center">
      <div className="p-4 max-w-4xl w-full">
        {/* Rover Selection */}
        <div className="mb-4 flex justify-center items-center">
          <label
            htmlFor="rover"
            className="mr-2 font-semibold whitespace-nowrap"
          >
            Select Rover:
          </label>
          <select
            id="rover"
            value={selectedRover}
            onChange={(e) => setSelectedRover(e.target.value)}
            className="border p-2 rounded bg-white text-gray-800 font-semibold cursor-pointer w-40"
          >
            {rovers.map((rover) => (
              <option key={rover} value={rover}>
                {rover}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            {manifestData && (
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Launch Date</p>
                    <p>{manifestData.photo_manifest.launch_date}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Landing Date</p>
                    <p>{manifestData.photo_manifest.landing_date}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Status</p>
                    <p>{manifestData.photo_manifest.status}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Max Sol</p>
                    <p>{manifestData.photo_manifest.max_sol}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Max Date</p>
                    <p>{manifestData.photo_manifest.max_date}</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded text-gray-800">
                    <p className="font-semibold">Total Photos</p>
                    <p>
                      {manifestData.photo_manifest.total_photos.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Photos */}
            <h2 className="text-xl font-bold mb-2">Latest Photos</h2>
            {photos.length === 0 ? (
              <p>No latest photos found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="border rounded overflow-hidden"
                  >
                    <img
                      src={photo.img_src}
                      alt={`Mars Rover Photo ${photo.id}`}
                      className="w-full"
                    />
                    <div className="p-2">
                      <p className="text-sm font-semibold">
                        {photo.camera.full_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {photo.earth_date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
