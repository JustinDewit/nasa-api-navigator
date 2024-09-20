import Link from "next/link";
import { FaHome, FaStar, FaGlobe, FaUser, FaGithub } from "react-icons/fa";

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">NASA Navigator</h2>
      <ul>
        <li className="mb-2">
          <Link href="/" className="hover:text-blue-300 flex items-center">
            <FaHome className="mr-2" /> Home
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/apod" className="hover:text-blue-300 flex items-center">
            <FaStar className="mr-2" /> Astronomy Picture of the Day
          </Link>
        </li>
        <li className="mb-2">
          <Link href="/epic" className="hover:text-blue-300 flex items-center">
            <FaGlobe className="mr-2" /> EPIC Earth Images
          </Link>
        </li>
        <li className="my-4">
          <hr className="border-gray-600" />
        </li>
        <li className="mb-2">
          <Link
            href="https://justindewit.com"
            className="hover:text-blue-300 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaUser className="mr-2" /> Justindewit.com
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="https://github.com/JustinDewit/nasa-api-navigator"
            className="hover:text-blue-300 flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="mr-2" /> Source Code (GitHub)
          </Link>
        </li>
      </ul>
    </nav>
  );
}
