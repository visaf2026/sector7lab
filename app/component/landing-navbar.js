"use client";
import { useState } from "react";
import Link from "next/link";

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO BRAND */}
        <Link href="/" className="flex flex-col select-none">
          <span className="font-black text-2xl tracking-tighter text-[#d4af37]">
            VSF <span className="text-white">POS</span>
          </span>
          <span className="text-[8px] text-gray-400 font-bold tracking-widest uppercase -mt-1">
            VisioFix System
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-gray-300">
          <a href="#fitur" className="hover:text-[#d4af37] transition-colors">
            ⚡Home
          </a>
          <a href="#tutorial" className="hover:text-[#d4af37] transition-colors flex items-center gap-1.5 text-[#d4af37]">
            <span>🎬</span> Tutorial & Panduan
          </a>
          <a href="#keunggulan" className="hover:text-[#d4af37] transition-colors">
            💎 Keunggulan
          </a>
          <a href="#kontak" className="hover:text-[#d4af37] transition-colors">
            📞 Kontak
          </a>
        </nav>

        {/* TOMBOL ACTION (CTA) */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://app.visiofixsystem.com/login"
            className="bg-[#d4af37] hover:bg-yellow-400 text-black font-black px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95"
          >
            🚀 Login Sistem
          </Link>
        </div>

        {/* HAMBURGER BUTTON MOBILE */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[#d4af37] bg-white/5 p-2 rounded-lg border border-white/10 text-xs font-black uppercase"
        >
          {isMobileMenuOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      {/* DRAWER MENU MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#141414] border-b border-white/10 px-6 py-6 space-y-4">
          <a
            href="#fitur"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-bold uppercase text-gray-300 hover:text-[#d4af37]"
          >
            ⚡ Fitur Utama
          </a>
          <a
            href="#tutorial"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-bold uppercase text-[#d4af37]"
          >
            🎬 Tutorial & Panduan
          </a>
          <a
            href="#keunggulan"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-bold uppercase text-gray-300 hover:text-[#d4af37]"
          >
            💎 Keunggulan
          </a>
          <a
            href="#kontak"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-xs font-bold uppercase text-gray-300 hover:text-[#d4af37]"
          >
            📞 Kontak
          </a>
          <div className="pt-4 border-t border-white/5">
            <Link
              href="https://app.visiofixsystem.com/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full block text-center bg-[#d4af37] text-black font-black py-3 rounded-xl text-xs uppercase tracking-wider"
            >
              🚀 Login Sistem
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}