"use client";
import { Smartphone } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="text-[#D4AF37] w-8 h-8" />
          <span className="font-playfair text-2xl font-bold tracking-tighter text-white">
            SECTOR7<span className="text-[#D4AF37]">LAB</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-gray-400">
          <a href="#services" className="hover:text-[#D4AF37] transition">Services</a>
          <a href="#tracking" className="hover:text-[#D4AF37] transition">Tracking</a>
          <a href="#" className="hover:text-[#D4AF37] transition">About</a>
        </div>
        <button className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2 hover:bg-[#D4AF37] hover:text-black transition duration-300 font-medium">
          CONTACT
        </button>
      </div>
    </nav>
  );
}