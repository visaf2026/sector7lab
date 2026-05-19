"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditJobsheetPage() {
  const router = useRouter();
  const params = useParams(); // Mengambil ID dari URL
  const jobID = params.id;

  const [customers, setCustomers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const savedCust = JSON.parse(localStorage.getItem("myCustomers") || "[]");
    const savedBrands = JSON.parse(localStorage.getItem("myBrands") || "[]");
    const savedJobs = JSON.parse(localStorage.getItem("myJobsheets") || "[]");
    
    setCustomers(savedCust);
    setBrands(savedBrands);

    // CARI DATA JOBSHEET BERDASARKAN ID
    const currentJob = savedJobs.find((j: any) => j.id === jobID);
    if (currentJob) {
      setForm(currentJob);
    } else {
      alert("Data tidak ditemukan!");
      router.push("/sector7-admin/repair/jobsheet");
    }
  }, [jobID]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const savedJobs = JSON.parse(localStorage.getItem("myJobsheets") || "[]");
    
    // Update data di array
    const updatedJobs = savedJobs.map((j: any) => j.id === jobID ? form : j);
    
    localStorage.setItem("myJobsheets", JSON.stringify(updatedJobs));
    alert(`Jobsheet ${jobID} berhasil diperbarui!`);
    router.push("/sector7-admin/repair/jobsheet");
  };

  if (!form) return <div className="p-10 text-white text-center">Memuat Data...</div>;

  return (
    <div className="p-6 text-white max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
        <h1 className="text-2xl font-bold italic tracking-tighter">EDIT JOBSHEET <span className="text-[#d4af37]">{jobID}</span></h1>
        <button onClick={() => router.back()} className="text-gray-500 text-sm hover:text-white">Batal</button>
      </div>

      <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase mb-4">Customer & Device</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Lokasi</label>
                <select className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
                  value={form.location} onChange={(e) => setForm({...form, location: e.target.value})}>
                  <option>Sector 7 - Utama</option>
                  <option>Sector 7 - Cabang 2</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Customer</label>
                <select className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm"
                  value={form.customer} onChange={(e) => setForm({...form, customer: e.target.value})}>
                  {customers.map((c: any, i) => <option key={i} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Brand</label>
                <select className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm"
                  value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})}>
                  {brands.map((b: any, i) => <option key={i} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-gray-500 font-bold uppercase">Device</label>
                <input value={form.device} className="bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
                  onChange={(e) => setForm({...form, device: e.target.value})}/>
              </div>
            </div>
          </div>

          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase mb-6 text-center">Fungsional Checklist</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.keys(form.checklist).map((item) => (
                <button type="button" key={item} 
                  onClick={() => setForm({...form, checklist: {...form.checklist, [item]: !form.checklist[item]}})}
                  className={`p-3 rounded-xl border text-[10px] font-bold uppercase transition-all ${
                    form.checklist[item] ? "bg-[#d4af37] text-black border-[#d4af37]" : "bg-black/20 border-white/10 text-gray-500"
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
            <input value={form.imei_sn} placeholder="SN / IMEI" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, imei_sn: e.target.value})}/>
            <input value={form.color} placeholder="Warna" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, color: e.target.value})}/>
          </div>

          <div className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
            <h3 className="text-[#d4af37] font-bold text-sm uppercase mb-4">Service Info</h3>
            <input value={form.technician} placeholder="Teknisi" className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-white text-sm" 
              onChange={(e) => setForm({...form, technician: e.target.value})}/>
            <input type="number" value={form.estimate} className="w-full bg-black/40 border border-white/10 p-3 rounded-xl text-[#d4af37] font-bold" 
                onChange={(e) => setForm({...form, estimate: parseInt(e.target.value)})}/>
          </div>

          <button type="submit" className="w-full bg-[#d4af37] text-black font-black py-4 rounded-3xl shadow-lg hover:scale-[1.02] transition-transform">
            UPDATE DATA JOBSHEET
          </button>
        </div>
      </form>
    </div>
  );
}