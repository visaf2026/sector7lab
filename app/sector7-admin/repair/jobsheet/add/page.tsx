"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddJobsheetPage() {
  const router = useRouter();
  
  const [customers, setCustomers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [jobsheets, setJobsheets] = useState([]);
  
  const [form, setForm] = useState({
    location: "Sector 7 - Utama",
    customer: "",
    brand: "",
    device: "",
    model: "",
    damage: "", // FIELD BARU: Jenis Kerusakan
    imei_sn: "",
    color: "",
    os_version: "",
    technician: "",
    estimate: 0,
    status: "Proses",
    checklist: {
      speaker: false, mic: false, camera_front: false, camera_rear: false,
      wifi: false, cellular: false, face_id: false, charging: false, buttons: false
    }
  });

  useEffect(() => {
    setCustomers(JSON.parse(localStorage.getItem("myCustomers") || "[]"));
    setBrands(JSON.parse(localStorage.getItem("myBrands") || "[]"));
    setJobsheets(JSON.parse(localStorage.getItem("myJobsheets") || "[]"));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCustData = customers.find((c: any) => c.name === form.customer);

    const newJob = { 
      id: `JOB-${Date.now().toString().slice(-4)}`, 
      date: new Date().toLocaleDateString(), 
      phone: selectedCustData ? selectedCustData.phone : "No WA",
      ...form 
    };
    
    const updatedJobs = [...jobsheets, newJob];
    localStorage.setItem("myJobsheets", JSON.stringify(updatedJobs));
    
    alert(`Jobsheet ${newJob.id} Berhasil Disimpan!`);
    router.push("/sector7-admin/repair/jobsheet");
  };

  const handleChecklist = (item: string) => {
    setForm({
      ...form,
      checklist: { ...form.checklist, [item]: !form.checklist[item as keyof typeof form.checklist] }
    });
  };

  return (
    <div className="p-6 text-white max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold italic tracking-tighter">ADD NEW <span className="text-[#d4af37]">JOBSHEET</span></h1>
        <button onClick={() => router.back()} className="text-gray-500 text-sm hover:text-white">Kembali</button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-4">Customer & Device</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Lokasi Cabang</label>
                <select className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
                  value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}>
                  <option>Sector 7 - Utama</option>
                  <option>Sector 7 - Cabang 2</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Customer Data</label>
                <select required className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm"
                  onChange={(e) => setForm({...form, customer: e.target.value})}>
                  <option value="">-- Pilih Customer --</option>
                  {customers.map((c: any, i) => <option key={i} value={c.name}>{c.name} ({c.phone})</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Brand</label>
                <select required className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm"
                  onChange={(e) => setForm({...form, brand: e.target.value})}>
                  <option value="">-- Pilih Brand --</option>
                  {brands.map((b: any, i) => <option key={i} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Device Name</label>
                <input placeholder="Contoh: iPhone 13 Pro" className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
                  onChange={(e) => setForm({...form, device: e.target.value})}/>
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Model / Variant</label>
                <input placeholder="Contoh: 256GB / iBox" className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
                  onChange={(e) => setForm({...form, model: e.target.value})}/>
              </div>
              
              {/* INPUT BARU: JENIS KERUSAKAN */}
              <div className="flex flex-col gap-2 col-span-2">
                <label className="text-[10px] text-[#d4af37] font-bold uppercase">Jenis Kerusakan</label>
                <textarea 
                  required
                  placeholder="Deskripsikan kerusakan (Contoh: Mati Total, LCD Pecah, Ganti Baterai)" 
                  className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm min-h-[100px] focus:border-[#d4af37] outline-none"
                  onChange={(e) => setForm({...form, damage: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase tracking-widest mb-6 text-center">Fungsional Pre-Checklist</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(form.checklist).map((item) => (
                <button type="button" key={item} onClick={() => handleChecklist(item)}
                  className={`p-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                    form.checklist[item as keyof typeof form.checklist] 
                    ? "bg-[#d4af37] border-[#d4af37] text-black" 
                    : "bg-black/20 border-white/10 text-gray-500"
                  }`}>
                  {item.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase mb-4">Technical Details</h3>
            <input placeholder="SN / IMEI" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, imei_sn: e.target.value})}/>
            <input placeholder="Warna Unit" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, color: e.target.value})}/>
            <input placeholder="Versi OS" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, os_version: e.target.value})}/>
          </div>

          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase mb-4">Service Info</h3>
            <input placeholder="Nama Teknisi" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, technician: e.target.value})}/>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Estimasi Biaya</label>
              <input type="number" className="bg-black/40 border border-white/10 p-3 rounded-xl text-[#d4af37] font-bold text-lg" 
                onChange={(e) => setForm({...form, estimate: parseInt(e.target.value)})}/>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 font-bold uppercase">Status Awal</label>
              <select className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm"
                onChange={(e) => setForm({...form, status: e.target.value})}>
                <option>Proses</option>
                <option>Selesai Belum Diambil</option>
                <option>Selesai Sudah Diambil</option>
                <option>Cancel Belum Diambil</option>
                <option>Cancel Sudah Diambil</option>
                <option>Menunggu Sparepart</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-[#d4af37] text-black font-black py-4 rounded-3xl shadow-[0_10px_20px_rgba(212,175,55,0.2)] hover:scale-[1.02] transition-transform">
            SAVE JOBSHEET DATA
          </button>
        </div>
      </form>
    </div>
  );
}