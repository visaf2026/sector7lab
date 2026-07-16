"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Pastikan path ke config supabase Master sudah benar hhe

interface NavbarProps {
  storeName?: string;
}

export default function Navbar({ storeName }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [localStoreName, setLocalStoreName] = useState("");
  const isPortalUtama = pathname === "/";

  // 🔍 SCRIPT PINTAR MENCARI NAMA TOKO SECARA MANDIRI BERDASARKAN URL BROWSER
  useEffect(() => {
    if (isPortalUtama) return;

    // Jika storeName dari props sudah ada bawaan dari halaman utama, pakai itu saja hhe
    if (storeName) {
      setLocalStoreName(storeName);
      return;
    }

    const fetchNavbarBrand = async () => {
      try {
        // Ambil segmen pertama dari path URL (Cth: "/raturepair" -> mengambil "raturepair")
        const currentSlug = pathname.split("/")[1];
        if (!currentSlug) return;

        const cleanSlug = currentSlug.toLowerCase().replace(/[-_]/g, "");

        const { data, error } = await supabase
          .from("store_settings")
          .select("store_name, slug");

        if (data) {
          const matchedStore = data.find(
            (store: any) => store.slug.toLowerCase().replace(/[-_]/g, "") === cleanSlug
          );
          if (matchedStore) {
            setLocalStoreName(matchedStore.store_name);
          }
        }
      } catch (err) {
        console.error("Gagal memuat brand logo navbar:", err);
      }
    };

    fetchNavbarBrand();
  }, [pathname, storeName, isPortalUtama]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* LOGO BRAND KIRI ATAS */}
        <div 
          onClick={() => router.push(isPortalUtama ? "/" : `/${pathname.split('/')[1]}`)} 
          className="text-lg font-black tracking-widest text-white cursor-pointer select-none uppercase font-mono"
        >
          {isPortalUtama ? (
            <>VISIOFIX <span className="text-[#d4af37]">SYSTEM</span></>
          ) : (
            // 🔥 JURUS FINAL: Menampilkan nama toko asli dari database cloud!
            <span className="text-[#d4af37]">{localStoreName || "VISIOFIX STORE"}</span>
          )}
        </div>

        {/* STRATEGI MENU NAVIGASI LIST (Tetap aman bawaan Master) */}
        <ul className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
          {isPortalUtama ? (
            <>
              <li><a href="#" className="hover:text-white transition-colors text-white">Home</a></li>
              <li><a href="#features" className="hover:text-[#d4af37] transition-colors">Fitur Aplikasi</a></li>
              <li><a href="/sector7lab" className="hover:text-[#d4af37] transition-colors">Demo Web</a></li>
              <li><a href="https://wa.me/62853395717317" target="_blank" className="hover:text-[#d4af37] transition-colors">Kemitraan</a></li>
            </>
          ) : (
            <>
              <li><a href="#" className="hover:text-white transition-colors text-white">Home</a></li>
              <li><a href="#about" className="hover:text-[#d4af37] transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-[#d4af37] transition-colors">Services</a></li>
              <li><a href="#gallery" className="hover:text-[#d4af37] transition-colors">Work Gallery</a></li>
            </>
          )}
        </ul>

        {/* TOMBOL CALL TO ACTION */}
        <button 
          onClick={() => window.open("https://wa.me/62853395717317?text=Halo%20Admin,%20saya%20tertarik%20sewa%20sistem%20POS%20Visiofix", "_blank")}
          className="bg-[#d4af37] text-black font-bold text-[10px] uppercase tracking-widest px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#d4af37]/10"
        >
          {isPortalUtama ? "Coba Sekarang" : "Hubungi Kami"}
        </button>

      </div>
    </nav>
  );
}