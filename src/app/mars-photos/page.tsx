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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Mars Rover Mission Manifests and Photos
      </h1>

      {/* Rover Selection */}
      <div className="mb-4">
        <label htmlFor="rover" className="mr-2 font-semibold">
          Select Rover:
        </label>
        <select
          id="rover"
          value={selectedRover}
          onChange={(e) => setSelectedRover(e.target.value)}
          className="border p-2 rounded bg-white text-gray-800 font-semibold cursor-pointer"
        >
          {rovers.map((rover) => (
            <option key={rover} value={rover}>
              {rover}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {manifestData && (
            <div className="mb-8">
              {/* Mission Manifest */}
              <h2 className="text-xl font-bold mb-2">
                Mission Manifest: {manifestData.photo_manifest.name}
              </h2>
              <p>
                <strong>Launch Date:</strong>{" "}
                {manifestData.photo_manifest.launch_date}
              </p>
              <p>
                <strong>Landing Date:</strong>{" "}
                {manifestData.photo_manifest.landing_date}
              </p>
              <p>
                <strong>Status:</strong> {manifestData.photo_manifest.status}
              </p>
              <p>
                <strong>Max Sol:</strong> {manifestData.photo_manifest.max_sol}
              </p>
              <p>
                <strong>Max Date:</strong>{" "}
                {manifestData.photo_manifest.max_date}
              </p>
              <p>
                <strong>Total Photos:</strong>{" "}
                {manifestData.photo_manifest.total_photos}
              </p>
            </div>
          )}

          {/* Photos */}
          <h2 className="text-xl font-bold mb-2">Latest Photos</h2>
          {photos.length === 0 ? (
            <p>No latest photos found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="border rounded overflow-hidden">
                  <img
                    src={photo.img_src}
                    alt={`Mars Rover Photo ${photo.id}`}
                    className="w-full"
                  />
                  <div className="p-2">
                    <p className="text-sm font-semibold">
                      {photo.camera.full_name}
                    </p>
                    <p className="text-sm text-gray-600">{photo.earth_date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
