import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <header className="mb-8 text-center">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className="mt-4 text-3xl font-bold">Welcome to My Next.js App</h1>
      </header>

      <section className="max-w-2xl text-center">
        <p className="mb-8 text-xl">
          This is a simple layout for your Next.js application. You can start building your project from here.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <a
            href="https://nextjs.org/docs"
            className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">Documentation</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-xl font-semibold mb-2">Learn</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </div>
      </section>

      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 My Next.js App. All rights reserved.
      </footer>
    </main>
  );
}
