"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InvoicePage() {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("myJobsheets") || "[]");
    // Hanya tampilkan yang berstatus Selesai
    const finished = savedJobs.filter((job: any) => job.status.includes("Selesai"));
    setCompletedJobs(finished);
  }, []);

  const handlePrintInvoice = (job: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>INVOICE - ${job.id}</title>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
              .header { display: flex; justify-content: space-between; border-bottom: 4px solid #d4af37; padding-bottom: 20px; }
              .logo { font-size: 24px; font-weight: 900; italic; }
              .invoice-title { font-size: 32px; color: #d4af37; font-weight: bold; }
              .details { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
              table { width: 100%; margin-top: 40px; border-collapse: collapse; }
              th { background: #f4f4f4; padding: 15px; text-align: left; border-bottom: 2px solid #ddd; }
              td { padding: 15px; border-bottom: 1px solid #eee; }
              .total-box { margin-top: 30px; text-align: right; font-size: 20px; font-weight: bold; }
              .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 20px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">SECTOR 7 <span style="color:#d4af37">REPAIR HUB</span></div>
              <div class="invoice-title">INVOICE</div>
            </div>
            
            <div class="details">
              <div>
                <strong>DITAGIHKAN KEPADA:</strong><br/>
                \${job.customer}<br/>
                \${job.phone}
              </div>
              <div style="text-align: right;">
                <strong>NOMOR INVOICE:</strong> INV-\${job.id.split('-')[1]}-\${Date.now().toString().slice(-3)}<br/>
                <strong>TANGGAL:</strong> \${new Date().toLocaleDateString()}<br/>
                <strong>UNIT:</strong> \${job.brand} \${job.device}
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>DESKRIPSI PERBAIKAN</th>
                  <th style="text-align: right;">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Servis & Perbaikan</strong><br/>
                    <small>Keluhan: \${job.damage || '-'}</small>
                  </td>
                  <td style="text-align: right;">Rp \${job.estimate?.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <div class="total-box">
              GRAND TOTAL: <span style="color:#d4af37">Rp \${job.estimate?.toLocaleString()}</span>
            </div>

            <div class="footer">
              <p>Terima kasih telah melakukan perbaikan di Sector 7.</p>
              <p>Barang yang sudah diambil tidak dapat dikembalikan kecuali terdapat garansi resmi.</p>
            </div>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="p-6 text-white max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold italic">GENERATE <span className="text-[#d4af37]">INVOICE</span></h1>
          <p className="text-gray-500 text-sm">Pilih unit yang sudah selesai untuk cetak tagihan.</p>
        </div>
        <input 
          type="text" placeholder="Cari nama atau ID..." 
          className="bg-[#151515] border border-white/10 p-2 px-4 rounded-xl text-sm outline-none w-64"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/40 text-gray-400 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-4">ID Jobsheet</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Device & Damage</th>
              <th className="p-4 text-right">Total Biaya</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {completedJobs.filter((j:any) => j.customer.toLowerCase().includes(searchTerm.toLowerCase()) || j.id.includes(searchTerm)).map((job: any, i) => (
              <tr key={i} className="hover:bg-white/[0.02]">
                <td className="p-4 font-mono text-[#d4af37]">{job.id}</td>
                <td className="p-4 font-bold">{job.customer}</td>
                <td className="p-4">
                  <div>{job.brand} {job.device}</div>
                  <div className="text-[11px] opacity-50 italic">{job.damage}</div>
                </td>
                <td className="p-4 text-right font-bold text-[#d4af37]">Rp {job.estimate?.toLocaleString()}</td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => handlePrintInvoice(job)}
                    className="bg-[#d4af37] text-black font-black px-4 py-2 rounded-lg hover:scale-105 transition-all text-[10px]"
                  >
                    CETAK INVOICE
                  </button>
                </td>
              </tr>
            ))}
            {completedJobs.length === 0 && (
              <tr><td colSpan={5} className="p-10 text-center text-gray-500 italic">Belum ada unit yang selesai untuk dibuatkan invoice.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}