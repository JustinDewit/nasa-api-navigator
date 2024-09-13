import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA API Navigator",
  description: "Explore NASA's data through their public API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-blue-900 text-white min-h-screen flex flex-col`}>
        <header className="p-4 text-center">
          <h1 className="text-3xl font-bold">NASA API Navigator</h1>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="p-4 text-center text-sm">
          © {new Date().getFullYear()} NASA API Navigator
        </footer>
      </body>
    </html>
  );
}
