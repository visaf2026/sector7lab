"use client";
import { useRouter } from "next/navigation";

export default function VisiofixCorporatePage() {
  const router = useRouter();

  return (
    <main className="w-full min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden selection:bg-[#d4af37]/30">
      {/* 1. HEADER / NAVBAR PORTAL */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-white/5 py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-lg font-black tracking-widest text-white">
            VISIOFIX <span className="text-[#d4af37]">SYSTEM</span>
          </div>
          <button 
            onClick={() => window.open("https://visiofix-pos-system.vercel.app", "_blank")} // Hubungkan ke link URL aplikasi POS/Kasir Master hhe
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider transition-all"
          >
            Masuk POS ➔
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION - PENAWARAN SOFTWARE */}
      <section className="relative pt-40 pb-24 px-6 flex items-center justify-center min-h-[85vh]">
        {/* Lingkaran Dekorasi Latar Emas */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="max-w-4xl text-center relative z-10 space-y-6">
          <span className="text-[10px] bg-[#d4af37]/10 text-[#d4af37] px-4 py-1.5 rounded-full font-black tracking-[0.25em] uppercase">
            Next-Gen POS & Tracking Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white pt-2">
            Revolusi Manajemen <br />
            <span className="text-[#d4af37]">Konter HP Modern</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Tingkatkan kredibilitas tempat servis Anda dengan fitur <span className="text-white font-bold">Live Tracking Status</span> berbasis WhatsApp, Pre-Repair Checklist digital, dan Point of Sale (POS) inventory parts akurat dalam satu ekosistem SaaS terintegrasi.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => router.push("/sector7lab")} // Tombol demo langsung melempar ke toko flagship Master!
              className="w-full sm:w-auto bg-[#d4af37] text-black px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#d4af37]/10 hover:scale-[1.02] active:scale-95 transition-all"
            >
              🚀 Lihat Demo Web Mitra
            </button>
            <a 
              href="https://wa.me/62853395717317?text=Halo%20Admin%20Visiofix,%20saya%20tertarik%20untuk%20berlangganan%20dan%20sewa%20sistem%20POS%20Servis" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto border border-white/10 bg-white/5 px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/10 active:scale-95 transition-all text-center"
            >
              📞 Hubungi Kemitraan
            </a>
          </div>
        </div>
      </section>

      {/* 3. FITUR UNGGULAN (FEATURES) */}
      <section className="py-20 bg-[#141414] border-t border-white/5 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-xs font-bold text-[#d4af37] tracking-[0.3em] uppercase">Fitur Premium</h2>
            <p className="text-2xl font-black text-white uppercase">Mengapa Memilih Visiofix System?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kardus Fitur 1 */}
            <div className="bg-black/40 border border-white/5 p-8 rounded-2xl space-y-3">
              <div className="text-2xl">📱</div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Multi-Tenant Subdomain</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Setiap pemilik konter yang mendaftar akan otomatis mendapatkan halaman profil web dan link tracking eksklusif sesuai nama brand mereka sendiri.
              </p>
            </div>
            {/* Kardus Fitur 2 */}
            <div className="bg-black/40 border border-white/5 p-8 rounded-2xl space-y-3">
              <div className="text-2xl">🔍</div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">Live Tracking Service</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Pelanggan cukup memasukkan kode unik nota (Cth: VSF-878) untuk memonitor progres perbaikan perangkat mereka secara real-time kapan saja.
              </p>
            </div>
            {/* Kardus Fitur 3 */}
            <div className="bg-black/40 border border-white/5 p-8 rounded-2xl space-y-3">
              <div className="text-2xl">💬</div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">WhatsApp Gate Integrated</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Kirim tanda terima servis digital dan notifikasi nota otomatis langsung ke nomor WhatsApp pelanggan hanya dengan sekali klik dari tablet kasir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER PORTAL CORPORATE */}
      <footer className="bg-black py-12 border-t border-white/5 px-6 text-xs text-gray-600">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="tracking-wider">
            &copy; {new Date().getFullYear()} VISIOFIX SYSTEM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6 tracking-widest uppercase text-[10px]">
            <span className="text-gray-500">Empowering Repair Technicians 🇮🇩</span>
          </div>
        </div>
      </footer>
    </main>
  );
}