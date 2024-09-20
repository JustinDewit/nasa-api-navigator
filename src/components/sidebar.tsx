import Link from "next/link";
import Image from "next/image";
import { FaHome, FaStar, FaGlobe, FaUser, FaGithub } from "react-icons/fa";

export default function Sidebar() {
  return (
    <nav className="bg-gradient-to-b from-blue-900 to-black text-white w-64 min-h-screen p-4 relative overflow-hidden">
      <div className="stars absolute inset-0"></div>
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <Image
            src="/nasa-logo.png"
            alt="NASA Logo"
            width={60}
            height={60}
            className="rounded-full bg-white p-2"
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          NASA Navigator
        </h2>
        <ul className="space-y-4">
          <li>
            <Link
              href="/"
              className="hover:text-blue-300 flex items-center transition-colors duration-200 group"
            >
              <FaHome className="mr-3 text-blue-400 group-hover:text-yellow-400 transition-colors duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/apod"
              className="hover:text-blue-300 flex items-center transition-colors duration-200 group"
            >
              <FaStar className="mr-3 text-yellow-400 group-hover:text-yellow-200 transition-colors duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Astronomy Picture
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/epic"
              className="hover:text-blue-300 flex items-center transition-colors duration-200 group"
            >
              <FaGlobe className="mr-3 text-green-400 group-hover:text-green-200 transition-colors duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                EPIC Earth Images
              </span>
            </Link>
          </li>
        </ul>
        <div className="my-6 relative">
          <Image
            src="/earth-satellite.png"
            alt="Earth and Satellite"
            width={200}
            height={100}
            className="mx-auto"
          />
        </div>
        <ul className="space-y-4">
          <li>
            <Link
              href="https://justindewit.com"
              className="hover:text-blue-300 flex items-center transition-colors duration-200 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaUser className="mr-3 text-purple-400 group-hover:text-purple-200 transition-colors duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Justindewit.com
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="https://github.com/JustinDewit/nasa-api-navigator"
              className="hover:text-blue-300 flex items-center transition-colors duration-200 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="mr-3 text-gray-400 group-hover:text-gray-200 transition-colors duration-200" />
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Source Code
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
