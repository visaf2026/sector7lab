"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InvoiceListPage() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mengambil data dari database Invoice permanen
    const saved = JSON.parse(localStorage.getItem("myInvoices") || "[]");
    setInvoices(saved);
  }, []);

  const deleteInvoice = (id: string) => {
    if (confirm("Hapus data riwayat invoice ini?")) {
      const updated = invoices.filter((inv: any) => inv.invoiceId !== id);
      setInvoices(updated);
      localStorage.setItem("myInvoices", JSON.stringify(updated));
    }
  };

  // --- LOGIKA FILTER PENCARIAN ---
  // Mimin bisa cari berdasarkan nama Teknisi, Nama Customer, No Invoice, atau Metode Bayar
  const filteredInvoices = invoices.filter((inv: any) => {
    const search = searchTerm.toLowerCase();
    return (
      (inv.technician && inv.technician.toLowerCase().includes(search)) ||
      inv.customer.toLowerCase().includes(search) ||
      inv.invoiceId.toLowerCase().includes(search) ||
      (inv.paymentMethod && inv.paymentMethod.toLowerCase().includes(search))
    );
  });

  // --- LOGIKA HITUNG OTOMATIS TOTAL PENDAPATAN ---
  // Menghitung total uang masuk berdasarkan hasil filter pencarian di atas
  const totalIncome = filteredInvoices.reduce((sum: number, inv: any) => sum + (inv.total || 0), 0);

  return (
    <div className="p-6 text-white max-w-6xl mx-auto space-y-6 pb-20">
      {/* HEADER & FILTER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold italic tracking-tighter text-[#d4af37]">RIWAYAT <span className="text-white">INVOICE</span></h1>
          <p className="text-gray-500 text-sm">Laporan keuangan, metode pembayaran, dan performa teknisi.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Ketik Nama Teknisi, Customer, atau Metode..." 
            className="bg-[#151515] border border-white/10 p-2 px-4 rounded-xl text-sm outline-none w-full sm:w-64 focus:border-[#d4af37] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href="/sector7-admin/repair/invoice" className="bg-white/5 border border-white/10 text-center px-6 py-2 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
            ← Antrian & Add
          </Link>
        </div>
      </div>

      {/* CARD LAPORAN PENDAPATAN / OMSET OTOMATIS */}
      <div className="bg-gradient-to-r from-black via-[#151515] to-black p-6 rounded-3xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
        <div>
          <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest">Total Pendapatan Terfilter</h4>
          <p className="text-sm text-gray-400 mt-1">
            {searchTerm ? `Menampilkan omset untuk pencarian: "${searchTerm}"` : "Menampilkan total omset seluruh transaksi"}
          </p>
        </div>
        <div className="text-left md:text-right">
          <span className="text-[10px] bg-[#d4af37]/20 text-[#d4af37] px-3 py-1 rounded-full font-black uppercase tracking-wider">Total Omset</span>
          <h2 className="text-3xl font-black text-[#d4af37] mt-1 font-mono">
            Rp {totalIncome.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* TABEL DATA INVOICE */}
      <div className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-gray-400 uppercase text-[10px] font-bold tracking-widest">
            <tr>
              <th className="p-4">No. Invoice</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Device / Item</th>
              <th className="p-4">Teknisi</th> {/* KOLOM TEKNISI */}
              <th className="p-4 text-center">Metode</th> {/* KOLOM METODE PEMBAYARAN */}
              <th className="p-4 text-right">Total</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv: any, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-[#d4af37] font-bold">{inv.invoiceId}</td>
                  <td className="p-4 text-xs text-gray-500">{inv.date}</td>
                  <td className="p-4 font-bold">{inv.customer}</td>
                  <td className="p-4 text-gray-300 text-xs">{inv.device}</td>
                  <td className="p-4">
                    <span className="bg-white/5 px-2 py-1 rounded-md text-xs font-medium text-white">
                      {inv.technician || "-"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      inv.paymentMethod === "QRIS" ? "bg-purple-500/20 text-purple-400" :
                      inv.paymentMethod === "TF" ? "bg-blue-500/20 text-blue-400" :
                      "bg-green-500/20 text-green-400"
                    }`}>
                      {inv.paymentMethod || "CASH"}
                    </span>
                  </td>
                  <td className="p-4 text-right font-black text-[#d4af37] font-mono">
                    Rp {inv.total?.toLocaleString()}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => deleteInvoice(inv.invoiceId)} 
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1 rounded-md text-[10px] font-bold transition-all"
                    >
                      HAPUS
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="p-10 text-center text-gray-500 italic">
                  Data tidak ditemukan atau belum ada transaksi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}