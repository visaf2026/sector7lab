"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "../lib/supabase"; // 👈 Pastikan path menuju file supabase client Master sudah benar

// 🟢 PERBAIKAN IMPORT PATH RELATIF AGAR TIDAK ERROR BUILD
import Services from "../components/Services";
import PriceEstimator from "../components/PriceEstimator";
import BookingForm from "../components/BookingForm";
import Payment from "../components/Payment";
import Testimonials from "../components/Testimonial";
import Footer from "../components/Footer";

export default function Home() {
  const params = useParams();
  const tokoSlug = params?.toko_slug as string;

  // 🟢 STATE MULTI-TENANT DATABASE
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState<{ image: string; caption: string }[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🗺️ DAFTAR GAMBAR BANNER HERO ASLI MASTER
  const heroImages = [
    "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop"
  ];

// 🔍 TARIK DATA PROFILE TOKO LIVE DARI DATABASE SUPABASE (VERSI ANTI-SPASI & STRIP)
  useEffect(() => {
    if (!tokoSlug) return;

    const fetchStoreSettings = async () => {
      try {
        const cleanSlug = tokoSlug.toLowerCase().replace(/[-_]/g, ""); // Hapus tanda strip/underscore untuk dicocokkan

        // 🚀 Ambil semua data store untuk dicocokkan secara pintar di sisi client
        const { data, error } = await supabase
          .from("store_settings")
          .select("*");

        if (error) throw error;

        if (data) {
          // Cari data toko yang slug-nya mirip (walaupun user lupa ngetik tanda strip di URL browser)
          const matchedStore = data.find(
            (store: any) => store.slug.toLowerCase().replace(/[-_]/g, "") === cleanSlug
          );

          if (matchedStore) {
            setStoreData(matchedStore);
          } else {
            setStoreData(null);
          }
        }
      } catch (err) {
        console.error("Gagal menarik data profil toko:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreSettings();
  }, [tokoSlug]);

  // Timer Slider Banner Hero
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(slideTimer);
  }, [heroImages.length]);

  // Load Gallery Lama Master
  useEffect(() => {
    const savedGallery = localStorage.getItem("sector7_gallery_v2");
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center font-mono text-xs tracking-widest">
        MEMUAT LAYANAN EKOSISTEM VISIOFIX SYSTEM...
      </div>
    );
  }

  // 🌍 PENGENDALIAN VARIABEL DINAMIS (Jika Toko Belum Set Up, Pakai Nilai Default Master)
  const finalStoreName = storeData?.store_name || "VISIOFIX SYSTEM";
  const finalDescription = storeData?.description || "Gadget Repair Specialist dengan sistem Tracking Real-Time & Standar Laboratorium Profesional.";
  const finalAddress = storeData?.address || "Alamat Toko Belum Dikonfigurasi.";
  const finalPhone = storeData?.phone || "Nomor HP Belum Dikonfigurasi.";

  return (
    <main className="w-full overflow-x-hidden bg-[#0f0f0f] text-white">
      
      {/* 1. HERO SECTION WITH AUTO-PLAY CAROUSEL BACKGROUND */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-white/5 min-h-[85vh] flex items-center bg-transparent">
        
        {/* WADAH BACKGROUND SLIDER GAMBAR */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden bg-[#0f0f0f]">
          {heroImages.map((imgUrl, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${imgUrl})` }}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform ${
                index === currentSlide 
                  ? "opacity-40 scale-105 z-10 visible" 
                  : "opacity-0 scale-100 z-0 invisible"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/60 z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent z-20" />
        </div>

        {/* Lingkaran Dekorasi Emas */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-72 h-72 md:w-96 md:h-96 bg-[#d4af37]/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        {/* ISI KONTEN TEXT HERO DENGAN VALUE DINAMIS */}
        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tighter text-white uppercase animate-in fade-in slide-in-from-top-6 duration-700">
            {finalStoreName}
          </h1>
          <p className="text-gray-300 text-base md:text-xl max-w-2xl mx-auto mb-10 px-2 font-medium">
            {finalDescription}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center px-4">
            <Link href={`/${tokoSlug}/tracking`} className="w-full md:w-auto bg-[#d4af37] text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-[#b8962e] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20">
              CEK STATUS SERVIS
            </Link>
            <a href="#booking" className="w-full md:w-auto border border-white/20 bg-black/40 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 active:scale-95 transition-all">
              BOOKING SERVICE
            </a>
          </div>

          {/* INDIKATOR TITIK KECIL (SLIDER DOTS) */}
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

      {/* 2. SECTION ABOUT DENGAN VALUE DINAMIS */}
      <section id="about" className="py-24 bg-[#0f0f0f] px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1 w-full text-center md:text-left">
            <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.3em] mb-4 uppercase">Company Profile</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">Expertise & Precision.</h3>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              <span className="text-white font-bold">{finalStoreName}</span> adalah pusat solusi perbaikan gadget yang mengedepankan kualitas sparepart dan transparansi pengerjaan.
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
                    alt={`${finalStoreName} Repair`} 
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

      <section id="booking" className="py-20 bg-[#141414] px-4">
        <div className="max-w-4xl mx-auto text-black">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">Reservasi <span className="text-[#d4af37]">Servis</span></h2>
          <BookingForm />
        </div>
      </section>
      
      <Testimonials />

      {/* 5. FOOTER MULTI-TENANT DENGAN PROPS LIVE DATABASE */}
      <Footer 
        storeName={finalStoreName}
        address={finalAddress}
        phone={finalPhone}
      />
    </main>
  );
}