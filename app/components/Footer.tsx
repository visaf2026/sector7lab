"use client";

// 🟢 STEP 1: DEKLARASI PROPS TYPESCRIPT AGAR BISA TERIMA LEMPARAN DATA DARI PAGE UTAMA
interface FooterProps {
  storeName: string;
  address: string;
  phone: string;
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