"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Contact, 
  Package, 
  Wrench, 
  ShoppingCart, 
  ChevronDown, 
  ChevronUp,
  FileText, // Ikon baru untuk Invoice Center
  History  // Ikon baru untuk Riwayat
} from "lucide-react"; 

export default function Sidebar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSellOpen, setIsSellOpen] = useState(false); // STATE BARU UNTUK DROPDOWN SELL

  return (
    <div className="w-60 h-screen bg-[#151515] border-r border-white/10 p-6 flex flex-col fixed left-0 top-0 z-50">
      <h2 className="text-[#d4af37] font-black text-xl mb-10 tracking-widest">SECTOR 7</h2>
      
      <nav className="space-y-2">
        <Link href="/sector7-admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] transition-all text-sm">
          <LayoutDashboard size={18} /> Home
        </Link>
        
        {/* DROPDOWN CONTACT */}
        <div>
          <button 
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] text-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <Contact size={18} /> Contact
            </div>
            {isContactOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isContactOpen && (
            <div className="pl-10 mt-1 space-y-1">
              <Link href="/sector7-admin/contact/customer" className="block p-2 text-xs text-gray-500 hover:text-[#d4af37]">Customer</Link>
            </div>
          )}
        </div>

        <Link href="/sector7-admin/product" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] text-sm transition-all">
          <Package size={18} /> Product
        </Link>
        
        <Link href="/sector7-admin/repair" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] text-sm transition-all">
          <Wrench size={18} /> Repair
        </Link>

        {/* DROPDOWN SELL (SUDAH DI-UPGRADE DENGAN INVOICE) */}
        <div>
          <button 
            type="button"
            onClick={() => setIsSellOpen(!isSellOpen)}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#d4af37]/10 text-gray-400 hover:text-[#d4af37] text-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart size={18} /> Sell
            </div>
            {isSellOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {isSellOpen && (
            <div className="pl-10 mt-1 space-y-1 animate-in fade-in duration-200">
              {/* MENU ANTRIAN & INPUT MANUAL */}
              <Link href="/sector7-admin/repair/invoice" className="flex items-center gap-2 p-2 text-xs text-gray-500 hover:text-[#d4af37] transition-colors">
                <FileText size={14} /> Invoice Center
              </Link>
              {/* MENU RIWAYAT LAPORAN FINANSIAL */}
              <Link href="/sector7-admin/repair/invoice/list" className="flex items-center gap-2 p-2 text-xs text-gray-500 hover:text-[#d4af37] transition-colors">
                <History size={14} /> List Invoice
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}