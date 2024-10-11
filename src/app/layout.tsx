import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NASA API Navigator",
  description: "Explore NASA's data through their public API",
  icons: {
    icon: "/site-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex bg-black`}>
        <Sidebar />
        <div className="flex-1 ml-64 bg-black text-white min-h-screen">
          <main className="p-8">{children}</main>
          <footer className="p-4 text-center text-sm">
            © {new Date().getFullYear()} NASA API Navigator
          </footer>
        </div>
      </body>
    </html>
  );
}
