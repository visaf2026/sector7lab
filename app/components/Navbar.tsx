"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 left-0 border-b border-[#d4af37]/20 bg-[#0f0f0f]/95 backdrop-blur-md z-[999]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center">
        
        {/* ZONA 1: KIRI (LOGO) */}
        <div className="w-full flex justify-start items-center">
          <Link href="/" className="text-xl md:text-2xl font-black text-[#d4af37] tracking-tighter whitespace-nowrap">
            SECTOR7<span className="text-white">LAB</span>
          </Link>
        </div>

        {/* ZONA 2: TENGAH (MENU DESKTOP - FIX LINK NEXT.JS) */}
        <div className="hidden md:flex w-full justify-center items-center gap-8">
          <Link href="/" className="text-white hover:text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap">Home</Link>
          <Link href="/about" className="text-white hover:text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap">About</Link>
          <a href="/#services" className="text-white hover:text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap">Services</a>
          <Link href="/gallery" className="text-white hover:text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap">Gallery</Link>
          <Link href="/informasi" className="text-white hover:text-[#d4af37] text-[11px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap">Informasi</Link>
        </div>

        {/* ZONA 3: KANAN (TOMBOL/TOGGLE) */}
        <div className="w-full flex justify-end items-center gap-4">
          {/* Tombol WA Desktop */}
          <div className="hidden md:block">
            <a 
              href="https://wa.me/628123456789" 
              className="bg-[#d4af37] text-black px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-[#d4af37]/20"
            >
              Contact
            </a>
          </div>

          {/* Hamburger Menu (Hanya muncul di Mobile/HP) */}
          <button 
            className="md:hidden text-[#d4af37] focus:outline-none p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className="text-3xl font-bold leading-none">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN (VERSI FIX - SINKRON KE HALAMAN BARU) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0f0f0f] border-b border-[#d4af37]/20 flex flex-col p-8 gap-6 text-center animate-in fade-in slide-in-from-top-2">
          <Link href="/" className="text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsOpen(false)}>About</Link>
          <a href="/#services" className="text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsOpen(false)}>Services</a>
          <Link href="/gallery" className="text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/informasi" className="text-white font-bold uppercase tracking-widest text-xs" onClick={() => setIsOpen(false)}>Informasi</Link>
          <a href="https://wa.me/628123456789" className="bg-[#d4af37] text-black py-4 rounded-full text-xs font-black uppercase tracking-widest mt-2">Contact Admin</a>
        </div>
      )}
    </nav>
  );
}