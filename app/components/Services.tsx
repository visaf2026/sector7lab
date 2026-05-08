"use client";
import { 
  Smartphone, 
  Battery, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Monitor 
} from 'lucide-react';

// 1. Definisikan Data Layanan dalam Array agar mudah diubah
const SERVICES_DATA = [
  {
    title: "Ganti Layar / LCD",
    description: "Perbaikan layar retak atau tidak responsif dengan suku cadang kualitas original dan garansi warna akurat.",
    icon: Monitor,
  },
  {
    title: "Ganti Baterai",
    description: "Kembalikan performa gadget Anda dengan baterai baru bersertifikasi tinggi untuk daya tahan lebih lama.",
    icon: Battery,
  },
  {
    title: "Perbaikan Mesin (IC)",
    description: "Teknisi ahli kami menangani kerusakan motherboard, korsleting, hingga masalah micro-soldering yang rumit.",
    icon: Cpu,
  },
  {
    title: "Kemasukan Air",
    description: "Penanganan cepat untuk perangkat yang terkena cairan guna menyelamatkan data dan komponen internal.",
    icon: Zap,
  },
  {
    title: "Service Software",
    description: "Update sistem, unlock, hingga pemulihan data yang hilang dengan prosedur keamanan data yang ketat.",
    icon: Smartphone,
  },
  {
    title: "Pemeriksaan Menyeluruh",
    description: "General check-up gratis untuk mendeteksi potensi kerusakan sebelum menjadi masalah besar.",
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Dekorasi Background Halus */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-[#D4AF37]">Signature</span> Services
          </h2>
          <div className="h-1 w-24 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Kami menyediakan layanan perbaikan kelas atas dengan standar presisi tinggi untuk memastikan perangkat Anda kembali sempurna.
          </p>
        </div>

        {/* Grid Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm 
                           hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Efek Hover Glow di Pojok */}
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#D4AF37]/10 blur-2xl group-hover:bg-[#D4AF37]/20 transition-all"></div>

                {/* Icon dengan Background Lingkaran Emas Transparan */}
                <div className="w-16 h-16 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-6 
                                group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                  <IconComponent size={32} className="text-[#D4AF37] group-hover:text-black" />
                </div>

                {/* Teks Konten */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                  {service.description}
                </p>

                {/* Border Bottom yang muncul saat Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* CTA Singkat di bawah Card */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 italic text-sm">
            *Semua perbaikan menggunakan peralatan standar pabrikan dan teknisi bersertifikat.
          </p>
        </div>
      </div>
    </section>
  );
}