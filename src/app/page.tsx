import Image from "next/image";

// Array of NASA missions with their details
const missions = [
  { name: "James Webb Space Telescope", image: "webb.jpg", description: "Observing the universe's first galaxies" },
  { name: "Mars 2020 Perseverance", image: "perseverance.jpg", description: "Seeking signs of ancient microbial life on Mars" },
  { name: "Artemis Program", image: "artemis.jpg", description: "Returning humans to the Moon by 2024" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white flex flex-col items-center justify-center p-8 overflow-hidden relative">
      {/* Starry background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>

      {/* Header section with NASA logo and title */}
      <header className="mb-12 text-center relative z-10">
        <Image
          src="/nasa-logo.png"
          alt="NASA Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-500">
          NASA: Exploring the Unknown
        </h1>
        <p className="text-xl text-blue-200">Discover the wonders of space exploration</p>
      </header>

      {/* Mission cards section */}
      <section className="max-w-4xl text-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((mission) => (
            <div key={mission.name} className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-filter backdrop-blur-lg hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105">
              <Image
                src={`/${mission.image}`}
                alt={`${mission.name} Image`}
                width={200}
                height={150}
                className="mx-auto mb-4 rounded-lg"
              />
              <h2 className="text-2xl font-semibold mb-2">{mission.name}</h2>
              <p className="text-blue-200">{mission.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Link to Astronomy Picture of the Day */}
      <section className="mt-12 text-center relative z-10">
        <a href="/apod" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 transform hover:scale-105">
          Discover Astronomy Picture of the Day
        </a>
      </section>
    </main>
  );
}

// TODO: Consider adding a loading state for images
// TODO: Implement error handling for missing images
