"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface Coordinates {
  lat: number;
  lon: number;
}

interface Position {
  x: number;
  y: number;
  z: number;
}

interface Quaternions {
  q0: number;
  q1: number;
  q2: number;
  q3: number;
}

interface EpicImage {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: Coordinates;
  dscovr_j2000_position: Position;
  lunar_j2000_position: Position;
  sun_j2000_position: Position;
  attitude_quaternions: Quaternions;
  date: string;
  coords: {
    centroid_coordinates: Coordinates;
    dscovr_j2000_position: Position;
    lunar_j2000_position: Position;
    sun_j2000_position: Position;
    attitude_quaternions: Quaternions;
  };
  imageUrl: string;
}

export default function EpicPage() {
  const [images, setImages] = useState<EpicImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLagrangeTooltip, setShowLagrangeTooltip] = useState(false);
  const [showDscovrTooltip, setShowDscovrTooltip] = useState(false);
  const lagrangeTooltipRef = useRef<HTMLDivElement>(null);
  const dscovrTooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/epic/getLatestImages");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
        const data = await response.json();
        console.log("API response data:", JSON.stringify(data, null, 2));
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
    <div className="container mx-auto px-4 py-4 bg-black min-h-screen text-white">
      <div className="mb-6 bg-gray-800 rounded-lg p-4 text-sm">
        <h2 className="text-xl font-semibold mb-2 text-blue-300">About EPIC</h2>
        <p className="mb-2">
          EPIC (Earth Polychromatic Imaging Camera) is a camera aboard{" "}
          <span
            className="relative inline-block cursor-help text-blue-300 group"
            onMouseEnter={() => setShowDscovrTooltip(true)}
            onMouseLeave={() => setShowDscovrTooltip(false)}
          >
            NOAA&apos;s DSCOVR satellite
            <InformationCircleIcon className="inline-block w-4 h-4 ml-1 text-blue-400 animate-pulse group-hover:animate-none" />
            <div
              ref={dscovrTooltipRef}
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-900 rounded-lg shadow-lg z-10 ${
                showDscovrTooltip ? "block" : "hidden"
              }`}
              style={{ width: "200px", height: "200px" }}
            >
              <Image
                src="/dscovr-satellite.jpg"
                alt="DSCOVR Satellite"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </span>
          , positioned at{" "}
          <span
            className="relative inline-block cursor-help text-yellow-300 group"
            onMouseEnter={() => setShowLagrangeTooltip(true)}
            onMouseLeave={() => setShowLagrangeTooltip(false)}
          >
            Lagrange point 1
            <InformationCircleIcon className="inline-block w-4 h-4 ml-1 text-blue-400 animate-pulse group-hover:animate-none" />
            <div
              ref={lagrangeTooltipRef}
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-900 rounded-lg shadow-lg z-10 ${
                showLagrangeTooltip ? "block" : "hidden"
              }`}
              style={{ width: "200px", height: "200px" }}
            >
              <Image
                src="/lagrange-point-1.gif"
                alt="Lagrange point 1 orbit"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </span>
          , about 1 million miles from Earth.
        </p>
        <p className="mb-2">
          EPIC captures unique images of the entire sunlit side of Earth every
          1-2 hours, providing a daily series of images of our planet's
          ever-changing atmosphere, clouds, landmasses, and oceans.
        </p>
        <p>
          These images are retrieved daily from{" "}
          <a
            href="https://epic.gsfc.nasa.gov/about/api"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            NASA&apos;s API
          </a>{" "}
          and displayed here, along with detailed positional and orientation
          data for each image.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="lg:w-3/4 rounded-lg shadow-md overflow-hidden relative">
          <div className="relative w-full" style={{ paddingBottom: "95%" }}>
            <Image
              src={currentImage.imageUrl}
              alt={currentImage.caption}
              fill
              sizes="(max-width: 1024px) 100vw, 75vw"
              className="object-contain"
            />
          </div>
          <button
            onClick={goToPreviousImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronLeftIcon className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={goToNextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75 transition-opacity"
          >
            <ChevronRightIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="lg:w-1/4 bg-gray-800 rounded-lg shadow-md p-4 text-xs lg:ml-auto">
          <h2 className="text-sm font-semibold mb-2 text-blue-300">
            Image Information
          </h2>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <p className="col-span-2">
              <strong className="text-yellow-300">ID:</strong>{" "}
              {currentImage.identifier}
            </p>
            <p className="col-span-2">
              <strong className="text-purple-300">Version:</strong>{" "}
              {currentImage.version}
            </p>
            <p className="col-span-2">
              <strong className="text-cyan-300">Date (UTC):</strong>{" "}
              {new Date(currentImage.date).toLocaleString("en-US", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                timeZoneName: "short",
              })}
            </p>
            <p className="col-span-2">
              <strong className="text-orange-300">Image:</strong>{" "}
              {currentIndex + 1} of {images.length}
            </p>
            <p className="col-span-2">
              <strong className="text-orange-300">Latitude:</strong>{" "}
              {currentImage.centroid_coordinates.lat.toFixed(2)}°
            </p>
            <p className="col-span-2">
              <strong className="text-teal-300">Longitude:</strong>{" "}
              {currentImage.centroid_coordinates.lon.toFixed(2)}°
            </p>
          </div>
          <p className="text-xs mt-2 text-gray-400">
            Positions are given in the J2000 reference frame, a standard
            astronomical coordinate system.
          </p>
          <h3 className="text-sm font-semibold mt-2 mb-1 text-blue-300">
            Positions (km)
          </h3>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1">
            <div>
              <p className="font-medium text-red-300">Spacecraft</p>
              <p>
                <span className="text-yellow-300">X:</span>{" "}
                {(currentImage.dscovr_j2000_position.x / 1000).toFixed(0)}
              </p>
              <p>
                <span className="text-yellow-300">Y:</span>{" "}
                {(currentImage.dscovr_j2000_position.y / 1000).toFixed(0)}
              </p>
              <p>
                <span className="text-yellow-300">Z:</span>{" "}
                {(currentImage.dscovr_j2000_position.z / 1000).toFixed(0)}
              </p>
            </div>
            <div>
              <p className="font-medium text-indigo-300">Moon</p>
              <p>
                <span className="text-yellow-300">X:</span>{" "}
                {(currentImage.lunar_j2000_position.x / 1000).toFixed(0)}
              </p>
              <p>
                <span className="text-yellow-300">Y:</span>{" "}
                {(currentImage.lunar_j2000_position.y / 1000).toFixed(0)}
              </p>
              <p>
                <span className="text-yellow-300">Z:</span>{" "}
                {(currentImage.lunar_j2000_position.z / 1000).toFixed(0)}
              </p>
            </div>
            <div>
              <p className="font-medium text-amber-300">Sun (M km)</p>
              <p>
                <span className="text-yellow-300">X:</span>{" "}
                {(currentImage.sun_j2000_position.x / 1000000).toFixed(1)}
              </p>
              <p>
                <span className="text-yellow-300">Y:</span>{" "}
                {(currentImage.sun_j2000_position.y / 1000000).toFixed(1)}
              </p>
              <p>
                <span className="text-yellow-300">Z:</span>{" "}
                {(currentImage.sun_j2000_position.z / 1000000).toFixed(1)}
              </p>
            </div>
          </div>
          <h3 className="text-sm font-semibold mt-2 mb-1 text-blue-300">
            Spacecraft Orientation
          </h3>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            <p>
              <span className="text-fuchsia-300">Q0:</span>{" "}
              {currentImage.attitude_quaternions.q0.toFixed(3)}
            </p>
            <p>
              <span className="text-fuchsia-300">Q1:</span>{" "}
              {currentImage.attitude_quaternions.q1.toFixed(3)}
            </p>
            <p>
              <span className="text-fuchsia-300">Q2:</span>{" "}
              {currentImage.attitude_quaternions.q2.toFixed(3)}
            </p>
            <p>
              <span className="text-fuchsia-300">Q3:</span>{" "}
              {currentImage.attitude_quaternions.q3.toFixed(3)}
            </p>
          </div>
          <p className="text-xs mt-2 text-gray-400">
            Quaternions represent the spacecraft&apos;s orientation in 3D space,
            providing a compact and efficient way to describe its attitude.
          </p>
          <p className="text-xs mt-2">
            <a
              href="https://epic.gsfc.nasa.gov/about/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              NASA EPIC API Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
