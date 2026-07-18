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
            onClick={() => window.open("https://sector7-admin-core.vercel.app/", "_blank")} // Hubungkan ke link URL aplikasi POS/Kasir Master hhe
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

          {/* ========================================================================= */}
{/* 🛠️ POIN 1: PREMIUM MOCKUP PREVIEW APLIKASI OPERASIONAL (DENGAN EFFECT GLOW) */}
{/* ========================================================================= */}
<div className="w-full max-w-4xl relative group mt-12 mx-auto">
  
  {/* Efek Cahaya Emas di Belakang Laptop saat di-Hover */}
  <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-[#d4af37]/30 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none" />
  
  {/* Bingkai Kaca / Frame Dashboard */}
  <div className="relative bg-[#141414] border border-white/10 p-3 rounded-2xl shadow-2xl shadow-black/80">
    
    {/* Dekorasi Tombol Mac/Window di Pojok Kiri Atas */}
    <div className="flex gap-1.5 mb-3 px-2">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
    </div>

    {/* Gambar Screenshot Dashboard POS / Papan Antrean Master */}
    <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0f0f0f] aspect-[16/9] relative">
      <img 
        src="/ds.png" // 👈 Taruh file screenshot POS Master di folder public/images/
        alt="Visiofix POS Dashboard Preview"
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      />
    </div>
    
  </div>
</div>
{/* ========================================================================= */}

        </div>

        
      </section>

      {/* ========================================================================= */}


{/* 📊 GALERI FITUR PREMIUM (SHOWCASE GRID - 3 SAMPAI 6 FITUR KUNCI)         */}
{/* ========================================================================= */}
<div className="w-full max-w-5xl mx-auto mt-10 mb-28 px-4">
  
  {/* Judul Seksi Fitur */}
  <div className="text-center mb-12">
    <h2 className="text-xs uppercase font-mono tracking-widest text-[#d4af37] mb-2">EXPLORE VISIOFIX</h2>
    <p className="text-2xl md:text-3xl font-black uppercase text-white">Sebagian Kecil Fitur Unggulan</p>
  </div>

  {/* Grid Sistem: Otomatis 1 kolom di HP, 3 kolom di Desktop */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* KARTU FITUR 1: KASIR & RETAL */}
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-[#d4af37]/30 transition-all duration-300">
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0f0f0f] aspect-[4/3] mb-4 relative">
        <img 
          src="/kr.png" // 👈 Ganti dengan screenshot fitur kasir
          alt="Fitur Kasir Retail"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide">⚡ Kasir Retail Kilat</h3>
      <p className="text-gray-500 text-xs font-light leading-relaxed">
        Input transaksi aksesoris dan sparepart langsung dalam hitungan detik, terintegrasi otomatis dengan potong stok global konter Anda.
      </p>
    </div>

    {/* KARTU FITUR 2: PRE-REPAIR CHECKLIST */}
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-[#d4af37]/30 transition-all duration-300">
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0f0f0f] aspect-[4/3] mb-4 relative">
        <img 
          src="/cl.png" // 👈 Ganti dengan screenshot checklist kondisi HP
          alt="Pre-Repair Checklist"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide">📋 Pre-Repair Checklist</h3>
      <p className="text-gray-500 text-xs font-light leading-relaxed">
        Kunci kondisi fisik HP pelanggan (Kamera, LCD, Tombol) sebelum dibongkar. Menghindari komplain palsu dari customer nakal.
      </p>
    </div>

    {/* KARTU FITUR 3: CETAK NOTA TERMAL */}
    <div className="bg-[#141414] border border-white/5 rounded-2xl p-4 flex flex-col group hover:border-[#d4af37]/30 transition-all duration-300">
      <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0f0f0f] aspect-[4/3] mb-4 relative">
        <img 
          src="/pt.png" // 👈 Ganti dengan screenshot/preview cetak nota
          alt="Cetak Nota Termal"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
      </div>
      <h3 className="text-white font-bold text-sm mb-1 uppercase tracking-wide">🖨️ Cetak Nota Otomatis</h3>
      <p className="text-gray-500 text-xs font-light leading-relaxed">
        Support langsung cetak struk via printer thermal bluetooth atau desktop. Dilengkapi barcode unik untuk pelacakan instan.
      </p>
    </div>

  </div>
</div>
{/* ========================================================================= */}

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
      {/* ========================================================================= */}
{/* ========================================================================= */}
{/* 📞 TOMBOL CONTACT US TEMA EMAS LUXURY MELAYANG PRESIZI                     */}
{/* ========================================================================= */}
<a
  href="https://wa.me/6281333329181?text=Halo%20Admin%20Visiofix,%20saya%20tertarik%20untuk%20tanya%20kemitraan%20aplikasi%20POS" // 👈 Tetap sesuaikan nomor WA Master hhe
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8952e] text-black font-extrabold px-5 py-3.5 rounded-full shadow-xl shadow-[#d4af37]/10 border border-[#d4af37]/20 transition-all duration-300 hover:scale-105 active:scale-95 group animate-bounce"
  style={{ animationDuration: '3s' }}
  title="Hubungi Admin Visiofix via WhatsApp"
>
  {/* Ikon WhatsApp Menggunakan SVG Murni */}
  <svg
    className="w-4 h-4 fill-current transition-transform group-hover:rotate-12"
    viewBox="0 0 24 24"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.516 2.266 2.27 3.507 5.289 3.505 8.492-.005 6.657-5.343 11.997-11.953 11.997-2.005-.001-3.973-.5-5.713-1.448L0 24zm6.59-4.846c1.6.95 3.498 1.45 5.421 1.451 5.462 0 9.904-4.44 9.909-9.904.002-2.647-1.02-5.136-2.88-6.999a9.858 9.858 0 0 0-7.006-2.884c-5.467 0-9.914 4.444-9.919 9.908-.002 1.942.508 3.84 1.479 5.468l-.982 3.585 3.678-.965zm10.435-4.088c-.304-.153-1.8-.888-2.077-.989-.278-.101-.48-.153-.681.153-.202.306-.779.989-.955 1.192-.177.204-.355.229-.659.077-1.354-.678-2.315-1.185-3.235-2.766-.242-.415.242-.385.693-1.285.076-.153.038-.287-.019-.39-.057-.102-.48-1.158-.659-1.588-.174-.419-.365-.362-.503-.369-.13-.007-.279-.008-.427-.008-.148 0-.39.055-.593.278-.203.223-.778.761-.778 1.852 0 1.091.793 2.146.904 2.298.111.152 1.56 2.382 3.78 3.339.528.228.94.364 1.263.467.53.169 1.012.145 1.393.088.425-.064 1.801-.736 2.053-1.448.254-.712.254-1.321.178-1.448-.076-.127-.278-.203-.582-.356z" />
  </svg>

  {/* Teks Pendamping */}
  <span className="text-xs uppercase tracking-wider">Contact Us</span>
</a>
    </main>
  );
}    