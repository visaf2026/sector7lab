"use client";
import { useState } from "react";

export default function TutorialSection() {
  // 🎬 DAFTAR VIDEO TUTORIAL FACEBOOK PAGE
  // Master bisa menambah atau mengubah link video Facebook di array ini kapan saja!
  const tutorialList = [
    {
      id: "video-1",
      title: "Tur & Perkenalan Fitur Canggih VSF POS",
      desc: "Lihat ringkasan fitur Live Tracking WA, Pre-Repair Checklist, dan Cetak Struk Thermal.",
      // Ganti URL 'href=' di bawah dengan link video Facebook resmi Master
      embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1377312881010607&show_text=false",
      tag: "PERKENALAN"
    },
    {
      id: "video-2",
      title: "Tutorial Input Data Produk",
      desc: "Panduan bagaimana Input Edit Dan Buat Label Data Produk.",
      embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1357274175788570&show_text=false",
      tag: "Data Product"
    },
    {
      id: "video-3",
      title: "Panduan Menggunakan Jobsheet",
      desc: "Cara Menginput data Costumer pada jobsheet.",
      embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F2181033822679347&show_text=false",
      tag: "JOBSHEET"
    },
    {
      id: "video-4",
      title: "Panduan Menggunakan Kasir-retail",
      desc: "Penjelasan kasir retail.",
      embedUrl: "https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1989119518472901%2F&show_text=false",
      tag: "KASIR RETAIL"
    }
  ];

  const [activeVideo, setActiveVideo] = useState(tutorialList[0]);

  return (
    <section id="tutorial" className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12">
          <span className="text-[#d4af37] text-xs font-black tracking-widest uppercase bg-[#d4af37]/10 px-4 py-1.5 rounded-full border border-[#d4af37]/20">
            PUSAT PANDUAN & EDUKASI
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-4 uppercase tracking-tight">
            Tutorial Penggunaan <span className="text-[#d4af37]">VSF POS</span>
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl mx-auto">
            Pelajari cara memaksimalkan fitur VSF POS untuk mendongkrak efisiensi dan keuntungan konter Anda.
          </p>
        </div>

        {/* PLAYER VIDEO & PLAYLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#141414] border border-white/5 p-6 md:p-8 rounded-3xl shadow-2xl">
          
          {/* KOLOM KIRI: MAIN VIDEO PLAYER */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-inner relative">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full h-full border-none"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>

            <div>
              <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-wider bg-[#d4af37]/10 px-2.5 py-1 rounded-md border border-[#d4af37]/20">
                {activeVideo.tag}
              </span>
              <h3 className="text-lg font-bold text-white mt-2 uppercase tracking-tight">
                {activeVideo.title}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {activeVideo.desc}
              </p>
            </div>
          </div>

          {/* KOLOM KANAN: LIST VIDEO & LINK FB PAGE */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 border-t lg:border-t-0 lg:border-l border-white/5 lg:pl-8 pt-6 lg:pt-0">
            <div>
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                📋 Pilihan Modul Tutorial:
              </h4>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {tutorialList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveVideo(item)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                      activeVideo.id === item.id
                        ? "bg-[#d4af37]/10 border-[#d4af37] text-white shadow-lg"
                        : "bg-black/30 border-white/5 text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="text-lg">🎬</span>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold uppercase line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* TOMBOL KE FACEBOOK PAGE */}
            <div className="pt-4 border-t border-white/5">
              <a
                href="https://www.facebook.com/profile.php?id=61592371490640"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold p-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#1877F2]/20 active:scale-95"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Follow Facebook VisioFix System
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}