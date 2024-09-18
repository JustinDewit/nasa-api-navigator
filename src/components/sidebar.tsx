import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">NASA Navigator</h2>
      <ul>
        <li className="mb-2">
          <Link href="/" className="hover:text-blue-300">Home</Link>
        </li>
        <li className="mb-2">
          <Link href="/apod" className="hover:text-blue-300">Astronomy Picture of the Day</Link>
        </li>
        <li className="mb-2">
          <Link href="/epic" className="hover:text-blue-300">EPIC Earth Images</Link>
        </li>
      </ul>
    </nav>
  );
}
