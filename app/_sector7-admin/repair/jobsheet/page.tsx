"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; 

export default function JobsheetListPage() {
  const [jobsheets, setJobsheets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    const savedJobs = localStorage.getItem("myJobsheets");
    if (savedJobs) {
      setJobsheets(JSON.parse(savedJobs));
    }
  }, []);

  // --- FUNGSI PRINT NOTA ---
  const handlePrintNota = (job: any) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nota Servis - \${job.id}</title>
            <style>
              body { font-family: sans-serif; padding: 20px; color: #000; }
              .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; }
              .details { margin-top: 20px; line-height: 1.6; }
              .footer { margin-top: 30px; text-align: center; border-top: 1px solid #000; padding-top: 10px; font-size: 12px; }
              .row { display: flex; justify-content: space-between; margin-bottom: 5px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>SECTOR 7 REPAIR HUB</h2>
              <p>Bukti Tanda Terima Unit Servis (\${job.location || 'Utama'})</p>
            </div>
            <div class="details">
              <div class="row"><span>No. Jobsheet:</span> <strong>\${job.id}</strong></div>
              <div class="row"><span>Tanggal:</span> \${job.date}</div>
              <div class="row"><span>Nama Customer:</span> \${job.customer}</div>
              <div class="row"><span>No. WA:</span> \${job.phone}</div>
              <hr/>
              <div class="row"><span>Unit:</span> \${job.brand} \${job.device} (\${job.model || '-'})</div>
              <div class="row"><span>Warna / OS:</span> \${job.color || '-'} / \${job.os_version || '-'}</div>
              <div class="row"><span>Kerusakan:</span> \${job.damage || '-'}</div>
              <div class="row"><span>IMEI/SN:</span> \${job.imei_sn || '-'}</div>
              <div class="row"><span>Teknisi:</span> \${job.technician || '-'}</div>
              <div class="row"><span>Estimasi:</span> Rp \${job.estimate?.toLocaleString() || '0'}</div>
            </div>
            <div class="footer">
              <p>Simpan nota ini untuk bukti pengambilan.</p>
              <p>Terima kasih - Sector 7</p>
            </div>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleUpdateStatus = () => {
    const updatedJobs = jobsheets.map((job: any) => {
      if (job.id === selectedJob.id) return { ...job, ...selectedJob };
      return job;
    });
    setJobsheets(updatedJobs);
    localStorage.setItem("myJobsheets", JSON.stringify(updatedJobs));
    setIsEditModalOpen(false);
    alert(`Status Jobsheet ${selectedJob.id} Berhasil Diperbarui!`);
  };

  const handleDeleteJob = (id: string) => {
    if (confirm(`Hapus Jobsheet ${id}?`)) {
      const filtered = jobsheets.filter((job: any) => job.id !== id);
      setJobsheets(filtered);
      localStorage.setItem("myJobsheets", JSON.stringify(filtered));
    }
  };

  // --- LOGIKA FILTER PENCARIAN PINTAR ---
  const filteredJobsheets = jobsheets.filter((job: any) => {
    const matchesSearch = 
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.technician && job.technician.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.damage && job.damage.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.imei_sn && job.imei_sn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.location && job.location.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "Pending") return matchesSearch && (job.status === "Proses" || job.status === "Menunggu Sparepart");
    if (activeTab === "Selesai") return matchesSearch && job.status.includes("Selesai");
    if (activeTab === "Cancel") return matchesSearch && job.status.includes("Cancel");
    return matchesSearch;
  });

  const countByStatus = (type: string) => {
    if (type === "Pending") return jobsheets.filter((j: any) => j.status === "Proses" || j.status === "Menunggu Sparepart").length;
    if (type === "Selesai") return jobsheets.filter((j: any) => j.status.includes("Selesai")).length;
    if (type === "Cancel") return jobsheets.filter((j: any) => j.status.includes("Cancel")).length;
    return jobsheets.length;
  };

  return (
    <div className="p-6 pt-2 md:pt-3 w-full max-w-full text-white bg-[#0f0f11] min-h-screen pb-20 overflow-x-hidden">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 w-full">
        <div>
          <h1 className="text-2xl font-bold italic tracking-tighter">LIST <span className="text-[#d4af37]">JOBSHEET</span></h1>
          <p className="text-gray-500 text-[10px] mt-0.5">Sistem integrasi data perbaikan unit Sector7Lab.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <input 
            type="text" placeholder="Cari data servis..." 
            className="bg-[#151515] border border-white/10 p-2 px-4 rounded-xl text-sm outline-none w-full md:w-64 focus:border-[#d4af37] transition-all"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href="/sector7-admin/repair/jobsheet/add" className="bg-[#d4af37] text-black font-black px-6 py-2 rounded-xl text-xs tracking-wider whitespace-nowrap hover:scale-105 transition-transform">+ ADD NEW</Link>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-2 p-1 bg-[#151515] rounded-2xl border border-white/5 w-fit mb-4">
        {["All", "Pending", "Selesai", "Cancel"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase transition-all ${
              activeTab === tab ? "bg-[#d4af37] text-black shadow-lg" : "text-gray-500 hover:text-white"
            }`}>
            {tab} <span className="opacity-50 ml-1">{countByStatus(tab)}</span>
          </button>
        ))}
      </div>

      {/* TABEL DENGAN KOLOM TEKNISI YANG SUDAH KEMBALI */}
      <div className="w-full bg-[#151516] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        <table className="w-full text-left text-[11px] table-fixed">
          <thead className="bg-black/50 text-gray-400 uppercase text-[9px] font-bold tracking-widest border-b border-white/5">
            <tr>
              {/* RACIKAN LEBAR KOLOM PRESISI TOTAL 100% */}
              <th className="p-3 px-2 w-[10%] text-[#d4af37]">ID Job</th>
              <th className="p-3 px-2 w-[9%]">Cabang</th>
              <th className="p-3 px-2 w-[11%]">Customer</th>
              <th className="p-3 px-2 w-[11%]">No. WA</th>
              <th className="p-3 px-2 w-[18%]">Unit / Seri</th> 
              <th className="p-3 px-2 w-[11%]">Kerusakan</th>
              <th className="p-3 px-2 w-[10%] text-center text-blue-400">Teknisi</th> {/* KOLOM TEKNISI KEMBALI */}
              <th className="p-3 px-2 w-[10%] text-right">Estimasi</th>
              <th className="p-3 px-2 w-[11%] text-center">Status</th>
              <th className="p-3 px-2 w-[8%] text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-medium">
            {filteredJobsheets.length > 0 ? filteredJobsheets.map((job: any, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                
                <td className="p-3 px-2 font-mono text-[#d4af37] font-black truncate">{job.id}</td>
                <td className="p-3 px-2 text-gray-400 truncate">{job.location || "Utama"}</td>
                <td className="p-3 px-2 text-white font-bold truncate">{job.customer}</td>
                <td className="p-3 px-2 font-mono text-gray-300 whitespace-nowrap">{job.phone}</td>
                
                {/* UNIT / SERI */}
                <td className="p-3 px-2 text-white font-semibold whitespace-normal break-words leading-tight">
                  <span className="text-[9px] bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-1 py-0.5 rounded font-black inline-block mb-1">{job.brand}</span>
                  <span className="ml-1 text-white">{job.device}</span> 
                  {job.model && <span className="text-gray-400 text-[10px] inline-block font-normal ml-0.5">({job.model})</span>}
                </td>

                <td className="p-3 px-2 truncate">
                  <span className="text-gray-400 italic">{job.damage || "-"}</span>
                </td>

                {/* DATA NAMA TEKNISI */}
                <td className="p-3 px-2 text-center text-white font-semibold truncate">
                  {job.technician ? (
                    <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded text-[10px]">
                      {job.technician}
                    </span>
                  ) : (
                    <span className="text-gray-600 italic text-[10px]">Belum Ada</span>
                  )}
                </td>
                
                <td className="p-3 px-2 text-right font-bold font-mono text-[#d4af37] whitespace-nowrap">
                  Rp {job.estimate ? job.estimate.toLocaleString() : "0"}
                </td>
                
                {/* STATUS */}
                <td className="p-3 px-2 text-center">
                  <button
                    type="button"
                    onClick={() => { setSelectedJob(job); setIsEditModalOpen(true); }}
                    className={`text-[8px] font-black uppercase tracking-wide px-1 py-1 rounded transition-all active:scale-95 border hover:brightness-125 cursor-pointer w-full text-center block truncate ${
                      job.status.includes("Selesai") ? "bg-green-500/20 text-green-400 border-green-500/30" :
                      job.status.includes("Cancel") ? "bg-red-500/20 text-red-400 border-red-500/30" :
                      job.status === "Menunggu Sparepart" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }`}
                  >
                    {job.status} ✏️
                  </button>
                </td>

                {/* AKSI */}
                <td className="p-3 px-2 text-center">
                  <div className="flex gap-1 justify-center">
                    <button onClick={() => handlePrintNota(job)} className="bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white px-1.5 py-1 rounded-md font-bold text-[8px] transition-all">PRINT</button>
                    <button onClick={() => handleDeleteJob(job.id)} className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-1.5 py-1 rounded-md font-bold text-[8px] transition-all">✕</button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={10} className="p-10 text-center opacity-50 italic">Data jobsheet tidak ditemukan.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL POP UP EDIT STATUS */}
      {isEditModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#151515] p-8 rounded-3xl border border-white/10 w-full max-w-md animate-in zoom-in duration-200 shadow-2xl">
            <div className="border-b border-white/5 pb-3 mb-6">
              <h2 className="text-xl font-black italic tracking-tight text-[#d4af37]">UPDATE STATUS</h2>
              <p className="text-xs text-gray-500 mt-1 font-mono">ID Jobsheet: <span className="text-white font-bold">{selectedJob.id}</span></p>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Status Pengerjaan Baru</label>
                <select className="w-full bg-black border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#d4af37] text-sm"
                  value={selectedJob.status} onChange={(e) => setSelectedJob({...selectedJob, status: e.target.value})}>
                  <option>Proses</option>
                  <option>Menunggu Sparepart</option>
                  <option>Selesai Belum Diambil</option>
                  <option>Selesai Sudah Diambil</option>
                  <option>Cancel Belum Diambil</option>
                  <option>Cancel Sudah Diambil</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Teknisi</label>
                <input type="text" className="w-full bg-black border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#d4af37] text-sm" 
                  placeholder="Nama Teknisi" value={selectedJob.technician || ""} onChange={(e) => setSelectedJob({...selectedJob, technician: e.target.value})} />
              </div>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-gray-500 font-bold uppercase ml-1">Biaya Perbaikan Akhir (Rp)</label>
                <input type="number" className="w-full bg-black border border-white/10 p-3 rounded-xl text-[#d4af37] font-bold outline-none focus:border-[#d4af37] text-sm" 
                  placeholder="Estimasi Biaya" value={selectedJob.estimate || 0} onChange={(e) => setSelectedJob({...selectedJob, estimate: parseInt(e.target.value) || 0})} />
              </div>
              
              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="w-full py-3 opacity-50 font-bold hover:text-white text-xs tracking-wider">BATAL</button>
                <button type="button" onClick={handleUpdateStatus} className="w-full py-3 bg-[#d4af37] text-black font-black rounded-xl text-xs tracking-wider shadow-lg">UPDATE DATA</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}