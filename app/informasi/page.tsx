"use client";
import { useState } from "react";
import Footer from '@/app/components/Footer';

export default function InformasiPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", "iPhone", "Android", "Tips"];

  const articles = [
    {
      id: 1,
      category: "iPhone",
      title: "5 Penyebab Battery Health iPhone Turun Drastis & Cara Mencegahnya",
      excerpt: "Banyak user iPhone di Manado heran kenapa Battery Health cepat jeblok. Yuk bongkar kebiasaan salah saat nge-charge harian...",
      date: "19 Mei 2026",
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      category: "Tips",
      title: "Pertolongan Pertama Saat HP Kemasukan Air, Jangan Masuk Beras!",
      excerpt: "Mitos masuk beras justru bisa bikin komponen sirkuit korosi berjamur hhe. Ini langkah medis yang benar dari teknisi laboratorium...",
      date: "17 Mei 2026",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      category: "Android",
      title: "Mengenal Layar Green Screen / White Screen pada HP Flagship Premium",
      excerpt: "Kasus layar blank putih atau hijau sering melanda Android kelas atas. Apakah harus ganti LCD mahal atau cukup di-jumper sirkuit?",
      date: "15 Mei 2026",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=500&auto=format&fit=crop"
    }
  ];

  const filteredArticles = activeCategory === "Semua" 
    ? articles 
    : articles.filter(art => art.category === activeCategory);

  return (
    <main className="w-full overflow-x-hidden bg-[#0f0f0f] text-white min-h-screen">
      
      {/* HEADER BANNER HALAMAN */}
      <section className="relative pt-40 pb-16 px-6 text-center bg-gradient-to-b from-[#141414] to-[#0f0f0f] border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.4em] mb-4 uppercase">Edukasi & Berita Gadget</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            SECTOR7LAB <span className="text-[#d4af37]">INFO</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Pusat literasi, tips perawatan, dan wawasan hardware smartphone
          </p>
        </div>
      </section>

      {/* BLOK UTAMA ARTIKEL */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        
        {/* TAB FILTER KATEGORI */}
        <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                  : "bg-[#1a1a1a] text-gray-400 border border-white/5 hover:border-[#d4af37]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID KARTU ARTIKEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group shadow-xl hover:border-[#d4af37]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#1a1a1a] relative">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <span className="absolute top-4 left-4 bg-[#141414]/90 text-[#d4af37] border border-[#d4af37]/20 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-gray-600 text-xs font-semibold">{article.date}</span>
                  <h4 className="text-white font-bold text-lg mt-2 group-hover:text-[#d4af37] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm mt-3 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs font-bold text-[#d4af37] uppercase tracking-wider cursor-pointer group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <span>→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}