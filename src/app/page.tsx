import Image from "next/image";
import { FaReact, FaGithub } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BsGearWideConnected } from "react-icons/bs";
import { MdDynamicForm, MdDevices } from "react-icons/md";
import { AiOutlineCloudServer } from "react-icons/ai";
import { GrReactjs } from "react-icons/gr";
import { IoImageOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";

// Array of NASA missions with their details
const missions = [
  {
    name: "Astronomy Picture Of The Day",
    image: "apod-picture.jpg",
    description: "Daily curated space imagery from NASA's APOD API",
    link: "/apod",
  },
  {
    name: "EPIC Earth Images",
    image: "epic-page.webp",
    description:
      "Daily full-color views of Earth from NASA's deep space satellite",
    link: "/epic",
  },
  {
    name: "Mars Rover Photos",
    image: "curiosity-rover-image.webp",
    description: "Explore Mars through the eyes of NASA's robotic explorers",
    link: "/mars-photos",
  },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Header section with NASA logo and title */}
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
          Your Gateway to NASA's Public API Database
        </h1>
        <p className="text-xl text-blue-200">
          Explore millions of images, satellite data, and real-time Earth
          observations extracted from NASA's public API, all showcased in a
          user-friendly interface for easy exploration and discovery.
        </p>
      </header>

      {/* Mission cards section */}
      <section className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <a
              key={mission.name}
              href={mission.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 flex flex-col"
            >
              <div className="mb-4 w-full h-48 relative">
                <Image
                  src={`/${mission.image}`}
                  alt={`${mission.name} Image`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2">{mission.name}</h2>
                <p className="text-blue-200">{mission.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Detailed explanation section */}
      <section className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          How This Web App Was Created
        </h2>
        <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-filter backdrop-blur-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-300">
            Core Technologies
          </h3>
          <ul className="list-none pl-6 mb-6 space-y-4">
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <SiNextdotjs className="mr-2 text-white w-6 h-6 flex-shrink-0" />
                <strong className="text-yellow-300">Next.js 14</strong>
              </div>
              <span className="ml-8">
                This project leverages the latest version of Next.js, utilizing
                its App Router for efficient server-side rendering and API route
                handling.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <SiTypescript className="mr-2 text-blue-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-yellow-300">TypeScript</strong>
              </div>
              <span className="ml-8">
                The entire codebase is written in TypeScript, ensuring type
                safety and improved developer experience.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <FaReact className="mr-2 text-blue-500 w-6 h-6 flex-shrink-0" />
                <strong className="text-yellow-300">React 18</strong>
              </div>
              <span className="ml-8">
                Utilizing the latest React features for building interactive
                user interfaces.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <SiTailwindcss className="mr-2 text-teal-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-yellow-300">Tailwind CSS</strong>
              </div>
              <span className="ml-8">
                For rapid and responsive UI development with utility-first CSS.
              </span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-blue-300">
            Key Features and Implementation
          </h3>
          <ul className="list-none pl-6 mb-6 space-y-4">
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <TbApi className="mr-2 text-green-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-green-300">NASA API Integration</strong>
              </div>
              <span className="ml-8">
                Custom API routes are implemented to securely fetch data from
                various NASA APIs, including APOD, EPIC, and Mars Rover Photos.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <MdDynamicForm className="mr-2 text-purple-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-green-300">Dynamic Routing</strong>
              </div>
              <span className="ml-8">
                Utilizing Next.js's dynamic routing for different NASA mission
                pages.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <MdDevices className="mr-2 text-yellow-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-green-300">Responsive Design</strong>
              </div>
              <span className="ml-8">
                Tailwind CSS is used to create a fully responsive layout that
                adapts to different screen sizes.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <AiOutlineCloudServer className="mr-2 text-blue-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-green-300">
                  Server-Side Rendering (SSR)
                </strong>
              </div>
              <span className="ml-8">
                Leveraging Next.js's SSR capabilities for improved performance
                and SEO.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <GrReactjs className="mr-2 text-cyan-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-green-300">
                  Client-Side Interactivity
                </strong>
              </div>
              <span className="ml-8">
                React hooks like useState and useEffect are used for managing
                state and side effects in components.
              </span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-blue-300">
            Additional Libraries and Tools
          </h3>
          <ul className="list-none pl-6 mb-6 space-y-4">
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <IoImageOutline className="mr-2 text-pink-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-purple-300">next/image</strong>
              </div>
              <span className="ml-8">
                For optimized image loading and responsive images.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <FaReact className="mr-2 text-blue-500 w-6 h-6 flex-shrink-0" />
                <strong className="text-purple-300">react-icons</strong>
              </div>
              <span className="ml-8">
                For easily integrating a wide variety of icons.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <BsGearWideConnected className="mr-2 text-gray-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-purple-300">@heroicons/react</strong>
              </div>
              <span className="ml-8">
                Additional icon set for enhanced UI elements.
              </span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-4 text-blue-300">
            Development and Deployment
          </h3>
          <ul className="list-none pl-6 space-y-4">
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <FaGithub className="mr-2 text-white w-6 h-6 flex-shrink-0" />
                <strong className="text-red-300">Version Control</strong>
              </div>
              <span className="ml-8">
                Git for version control, with the repository hosted on GitHub.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <RiLockPasswordLine className="mr-2 text-yellow-400 w-6 h-6 flex-shrink-0" />
                <strong className="text-red-300">Environment Variables</strong>
              </div>
              <span className="ml-8">
                Secure handling of API keys using Next.js environment variables.
              </span>
            </li>
            <li className="flex flex-col">
              <div className="flex items-center mb-1">
                <SiVercel className="mr-2 text-white w-6 h-6 flex-shrink-0" />
                <strong className="text-red-300">Deployment</strong>
              </div>
              <span className="ml-8">
                The app is deployed on Vercel, taking advantage of its seamless
                integration with Next.js projects.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

// TODO: Consider adding a loading state for images
// TODO: Implement error handling for missing images
