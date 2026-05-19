"use client";
import Link from "next/link";

export default function RepairDashboard() {
  // Menu navigasi disesuaikan dengan struktur sistem invoice yang baru
  const repairMenus = [
    { id: "dashboard", label: "DASHBOARD", path: "/sector7-admin/repair" },
    { id: "jobsheet", label: "LIST JOBSHEET", path: "/sector7-admin/repair/jobsheet" },
    { id: "add", label: "ADD JOBSHEET", path: "/sector7-admin/repair/jobsheet/add" },
    { id: "add_invoice", label: "ADD INVOICE", path: "/sector7-admin/repair/invoice" }, // Menuju pusat pembuatan & antrian invoice
    { id: "list_invoice", label: "LIST INVOICE", path: "/sector7-admin/repair/invoice/list" }, // Menuju riwayat invoice
    { id: "brand", label: "BRAND", path: "/sector7-admin/repair/brand" },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="border-b border-white/5 pb-6">
        <h1 className="text-3xl font-bold text-white tracking-tighter italic">REPAIR <span className="text-[#d4af37]">HUB</span></h1>
        <p className="text-gray-500 text-sm mt-2">Pilih menu operasional di bawah ini:</p>
      </div>

      {/* GRID MENU NAVIGASI */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {repairMenus.map((menu) => (
          <Link 
            key={menu.id} 
            href={menu.path}
            className="bg-[#151515] p-8 rounded-3xl border border-white/5 hover:border-[#d4af37] transition-all group flex flex-col justify-between h-40 shadow-lg"
          >
            <div className="flex justify-between items-start w-full">
              <span className="text-[#d4af37] text-3xl group-hover:scale-110 transition-transform duration-300">
                <i className="fa-solid fa-wrench"></i>
              </span>
              {/* Indikator penunjuk kecil agar tampilan makin dinamis */}
              <span className="text-gray-600 group-hover:text-[#d4af37] text-xs transition-colors">➔</span>
            </div>
            <span className="text-white font-black text-sm tracking-widest">{menu.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}