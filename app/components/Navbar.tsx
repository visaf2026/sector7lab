import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0f0f0f]/90 backdrop-blur-md border-b border-[#d4af37]/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* SISI KIRI: NAMA TOKO */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-[#d4af37] font-black text-lg tracking-tighter">
              SECTOR7<span className="text-white">LAB</span>
            </span>
          </Link>

          {/* SISI KANAN: MENU (Tampil di HP & Laptop) */}
          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="text-[11px] md:text-sm font-bold text-gray-300 hover:text-[#d4af37] px-2 py-1 transition-all"
            >
              SERVICE
            </Link>
            
            <Link 
              href="/tracking" 
              className="text-[11px] md:text-sm font-bold bg-[#d4af37] text-black px-3 py-1.5 rounded-lg hover:bg-yellow-500 transition-all shadow-sm shadow-[#d4af37]/20"
            >
              TRACKING
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}