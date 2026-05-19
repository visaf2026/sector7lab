"use client";
import Footer from '@/app/components/Footer';

export default function AboutPage() {
  const visiMisi = [
    {
      title: "Visi Kami",
      desc: "Menjadi pusat perbaikan gadget premium nomor satu di Kota Manado yang diakui atas presisi teknis tingkat tinggi, transparansi biaya, dan kecepatan layanan berbasis teknologi digital."
    },
    {
      title: "Misi Kami",
      desc: "Menghadirkan solusi perbaikan tingkat sirkuit (micro-soldering) dengan standar laboratorium modern, menggunakan sparepart berkualitas tinggi, serta mengedukasi konsumen melalui sistem tracking jobsheet yang jujur dan real-time."
    }
  ];

  return (
    <main className="w-full overflow-x-hidden bg-[#0f0f0f] text-white min-h-screen">
      
      {/* 1. HEADER BANNER */}
      <section className="relative pt-40 pb-20 px-6 border-b border-white/5 bg-gradient-to-b from-[#141414] to-[#0f0f0f]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.4em] mb-4 uppercase">Tentang Kami</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            SECTOR7<span className="text-[#d4af37]">LAB</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Mengenal lebih dekat laboratorium perbaikan sirkuit smartphone terbaik dan paling tepercaya di Kota Manado.
          </p>
        </div>
      </section>

      {/* 2. CORE EXPERTISE SECTION (NARASI BISNIS) */}
      <section className="py-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-[#d4af37]/10 border border-[#d4af37]/20 px-4 py-1.5 rounded-full">
            <p className="text-[#d4af37] text-xs font-semibold tracking-wide uppercase">Manado Apple-Hardware Specialist</p>
          </div>
          <h3 className="text-3xl font-bold leading-tight text-white">
            Pusat Perbaikan Apple & Android Level <span className="text-[#d4af37]">Mikroskopis</span>.
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Sector 7 Lab hadir di Kota Manado bukan sekadar sebagai tempat pergantian part biasa. Kami adalah laboratorium khusus perbaikan internal motherboard smartphone Apple dan Android kelas atas.
          </p>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-medium">
            Dipersenjatai dengan alat medis elektronika modern seperti JTAG Box, BGA Rework Station, dan Mikroskop Trinokuler, kami mendominasi pengerjaan kasus ekstrem tingkat dewa seperti <span className="text-[#d4af37] font-semibold">CPU Reballing</span> dan <span className="text-[#d4af37] font-semibold">Swab Board</span> (pindah mesin total) dengan tingkat keberhasilan yang tinggi.
          </p>
        </div>
        
        {/* KOTAK STATISTIK DENGAN BORDER EMAS */}
        <div className="bg-[#141414] border border-[#d4af37]/10 p-8 rounded-3xl relative overflow-hidden group hover:border-[#d4af37]/30 transition-all duration-500">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#d4af37]/5 rounded-full blur-3xl group-hover:bg-[#d4af37]/10 transition-all"></div>
          <div className="space-y-6 relative z-10">
            <div className="border-b border-white/5 pb-4">
              <div className="text-[#d4af37] text-4xl font-black">01</div>
              <h4 className="text-lg font-bold mt-2">CPU Repair Specialist</h4>
              <p className="text-gray-500 text-xs mt-1">Mengatasi iPhone/Android mati total akibat kaki IC CPU korosi atau putus jalur sirkuit internal.</p>
            </div>
            <div className="border-b border-white/5 pb-4">
              <div className="text-[#d4af37] text-4xl font-black">02</div>
              <h4 className="text-lg font-bold mt-2">Swab Board Data Recovery</h4>
              <p className="text-gray-500 text-xs mt-1">Penyelamatan data data penting dari logic board yang hancur/patah dengan memindahkan core IC ke piringan mesin donor.</p>
            </div>
            <div>
              <div className="text-[#d4af37] text-4xl font-black">03</div>
              <h4 className="text-lg font-bold mt-2">100% Transparan</h4>
              <p className="text-gray-500 text-xs mt-1">Semua proses pengerjaan tercatat di database kasir dan bisa dipantau langsung statusnya oleh konsumen secara real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI SECTION */}
      <section className="py-20 bg-[#141414] px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-center text-2xl md:text-3xl font-bold mb-12">Komitmen & <span className="text-[#d4af37]">Arah Tujuan</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visiMisi.map((item, index) => (
              <div key={index} className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl shadow-xl hover:translate-y-[-4px] transition-all duration-300">
                <h4 className="text-[#d4af37] text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#d4af37]"></span>
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}