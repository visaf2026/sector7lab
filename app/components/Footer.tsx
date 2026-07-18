"use client";

// 🟢 STEP 1: DEKLARASI PROPS TYPESCRIPT AGAR BISA TERIMA LEMPARAN DATA DARI PAGE UTAMA
interface FooterProps {
  storeName?: string;
  address?: string;
  phone?: string;
}

export default function Footer({ storeName, address, phone }: FooterProps) {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
       {/* Kolom 1: Brand */}
        <div>
          {/* 🔥 SEKARANG NAMA BRAND SANGAT DINAMIS */}
          <h2 className="text-2xl font-playfair font-bold text-[#D4AF37] mb-4 uppercase tracking-wider">
            {storeName || "VISIOFIX SYSTEM"}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Premium repair service center for mobile devices. 
            Micro-soldering, hardware specialist, and original spare parts.
          </p>

          {/* 🌐 ROW SOSIAL MEDIA AMAN & PREMIUM (Diselipkan di bawah deskripsi) */}
          <div className="flex items-center gap-3 mt-4">
            {/* FACEBOOK */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.88 0-4 1.5-4 3v3z"/>
              </svg>
            </a>

            {/* INSTAGRAM */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>

            {/* TIKTOK */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" title="TikTok">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.37-.28-.2-.53-.43-.77-.68v6.52c.03 2.53-1.18 4.98-3.32 6.27-2.14 1.29-4.94 1.42-7.18.34-2.25-1.07-3.79-3.41-3.95-5.91-.18-2.79 1.44-5.5 4.07-6.47 1.48-.55 3.12-.51 4.57.1v4.1c-1.02-.48-2.26-.45-3.23.11-.98.57-1.55 1.65-1.47 2.78.08 1.13.84 2.11 1.9 2.48 1.05.37 2.27.05 2.97-.8.52-.63.57-1.47.56-2.25V.02z"/>
              </svg>
            </a>
          </div>
          
        </div>


        

        {/* Kolom 2: Quick Links (Tetap Aman Bawaan Master) */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Our Services</a></li>
            <li><a href="#prices" className="hover:text-[#D4AF37] transition-colors">Price List</a></li>
            <li><a href="#booking" className="hover:text-[#D4AF37] transition-colors">Book Repair</a></li>
            <li><a href="#track" className="hover:text-[#D4AF37] transition-colors">Track Status</a></li>
          </ul>
        </div>

        {/* Kolom 3: Contact Info */}
        <div>
          <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Visit Our Lab</h3>
          {/* 🔥 ALAMAT DAN WHATSAPP LUNCURAN LIVE DARI SETTING DATABASE POS */}
          <p className="text-gray-400 text-sm mb-2">{address || "Alamat belum dikonfigurasi."}</p>
          <p className="text-green-400 text-sm mb-2 font-mono">
            WhatsApp: {phone ? (phone.startsWith("0") ? `+62 ${phone.slice(1)}` : `+${phone}`) : "Belum diatur"}
          </p>
          <p className="text-gray-400 text-sm italic">Mon - Sat: 10:00 - 20:00</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* 🔥 TULISAN COPYRIGHT IKUT SELEBIHNYA BERUBAH PRO */}
        <p className="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
          &copy; {new Date().getFullYear()} {storeName || "VISIOFIX SYSTEM"}. ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6 text-gray-600 text-[10px] tracking-widest uppercase">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
      
    </footer>
  );
}