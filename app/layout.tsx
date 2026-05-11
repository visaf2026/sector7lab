import type { Metadata } from "next";
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Navbar from "@/app/components/Navbar";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-gray-200 antialiased">
      
        <Navbar />
        {children}

      </body>
    </html>
  );
}
