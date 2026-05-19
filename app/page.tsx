"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Services from '@/app/components/Services';
import PriceEstimator from "./components/PriceEstimator";
import BookingForm from "./components/BookingForm";
import Payment from "./components/Payment";
import Testimonials from "./components/Testimonial";
import Footer from '@/app/components/Footer';


export default function Home() {
  const [gallery, setGallery] = useState<{image: string, caption: string}[]>([]);
  
  // --- STATE UNTUK SLIDER GAMBAR AUTOMATIS ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // Daftar gambar banner lab Sector 7 yang mau diputar otomatis
  // DAFTAR GAMBAR BANNER HERO (VERSI FIX 100% REFRESH)
  const heroImages = [
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop", // Slide 1 (Aman)
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop", // Slide 2 (BARU: Foto Lab Mikroskop Elektronik Premium)
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop"   // Slide 3 (Aman)
  ];

  // Efek Timer untuk memutar gambar otomatis setiap 4 detik (4000ms)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 4000); // 4000 milidetik = 4 detik

    return () => clearInterval(slideTimer); // Bersihkan memori RAM browser jika user pindah halaman
  }, [heroImages.length]);

  useEffect(() => {
    const savedGallery = localStorage.getItem("sector7_gallery_v2");
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    }
  }, []);

  return (
    <main className="w-full overflow-x-hidden bg-[#0f0f0f] text-white">
      
     {/* 1. HERO SECTION WITH AUTO-PLAY CAROUSEL BACKGROUND */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5 min-h-[85vh] flex items-center bg-transparent">
        
        {/* WADAH BACKGROUND SLIDER GAMBAR (VERSI BYPASS - SEMUA SLIDE PASTI KELUAR) */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-[#0f0f0f]">
          {heroImages.map((imgUrl, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${imgUrl})` }}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
                index === currentSlide 
                  ? "opacity-40 scale-105 z-10 visible" // Saat aktif: Naik ke lapisan z-10 dan kelihatan
                  : "opacity-0 scale-100 z-0 invisible"  // Saat mati: Turun ke lapisan z-0 dan sembunyi
              }`}
            />
          ))}
          {/* Lapisan Gradasi Gelap Transparan (Kita naikkan ke z-20 agar selalu berada di atas semua gambar) */}
          <div className="absolute inset-0 bg-black/60 z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent z-20" />
        </div>

        {/* Lingkaran Dekorasi Emas */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        {/* ISI KONTEN TEXT HERO */}
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter animate-in fade-in slide-in-from-top-6 duration-700">
            SECTOR 7 <span className="text-[#d4af37]">LAB</span>
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto mb-10 px-2 font-medium">
            iPhone Repair Specialist dengan sistem <span className="text-[#d4af37] font-bold">Tracking Real-Time</span> & Standar Laboratorium Profesional.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center px-4">
            <Link href="/tracking" className="w-full md:w-auto bg-[#d4af37] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-[#b8962e] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20">
              CEK STATUS SERVIS
            </Link>
            <a href="#booking" className="w-full md:w-auto border border-white/20 bg-black/40 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 active:scale-95 transition-all">
              BOOKING SERVICE
            </a>
          </div>

          {/* INDIKATOR TITIK KECIL (SLIDER DOTS) DI BAWAH BUTTON HERO */}
          <div className="flex justify-center gap-2 mt-12">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-6 bg-[#d4af37]" : "w-1.5 bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. SECTION ABOUT */}
      <section id="about" className="py-24 bg-[#0f0f0f] px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] mb-4 uppercase">Company Profile</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Expertise & Precision.</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              Sector 7 Lab adalah pusat solusi perbaikan iPhone yang mengedepankan kualitas sparepart dan transparansi pengerjaan.
            </p>
          </div>
          <div className="flex-1 w-full bg-[#1a1a1a] p-8 rounded-2xl border border-[#d4af37]/20 text-center">
             <div className="text-[#d4af37] text-xl font-bold">1000+ Units Repaired</div>
             <p className="text-gray-500 text-xs mt-2 font-medium">Standard pengerjaan laboratorium profesional.</p>
          </div>
        </div>
      </section>

      <Services />

      {/* 4. SECTION GALLERY */}
      <section id="gallery" className="py-24 bg-[#141414] px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[#d4af37] font-bold text-center mb-12 uppercase tracking-widest text-xs">Work Gallery</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((item, index) => (
              <div key={index} className="flex flex-col min-w-0">
                <div className="aspect-square bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden relative shadow-2xl group">
                  <img 
                    src={item.image} 
                    alt="Sector 7 Repair" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/70 hidden md:flex items-center justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[#d4af37] text-[10px] font-bold text-center uppercase tracking-widest break-words">
                      {item.caption}
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 md:hidden">
                  <p className="text-[#d4af37] text-[9px] font-bold uppercase tracking-tight text-center leading-tight break-words px-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ESTIMASI & PAYMENT */}
      {/* <section className="py-16 bg-[#0f0f0f] px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 bg-[#1a1a1a] rounded-3xl border border-white/5 shadow-lg overflow-hidden">
              <h2 className="text-[#d4af37] text-2xl font-bold mb-6">Estimasi Biaya</h2>
              <PriceEstimator />
            </div>
            <div className="p-6 md:p-8 bg-[#1a1a1a] rounded-3xl border border-white/5 shadow-lg overflow-hidden">
              <h2 className="text-[#d4af37] text-2xl font-bold mb-6">Metode Pembayaran</h2>
              <Payment />
            </div>
        </div>
      </section> */}

      <section id="booking" className="py-20 bg-[#141414] px-4">
        <div className="max-w-4xl mx-auto text-black">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Reservasi <span className="text-[#d4af37]">Servis</span></h2>
          <BookingForm />
        </div>
      </section>

     
      <Testimonials />
      <Footer />
    </main>
  );
}