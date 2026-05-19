"use client";
import { useState, useEffect } from "react";

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  const [formData, setFormData] = useState({ name: "", address: "", email: "", phone: "" });

  // Load data saat pertama kali buka halaman
  useEffect(() => {
    const saved = localStorage.getItem("myCustomers");
    if (saved) setCustomers(JSON.parse(saved));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    let lastIdNum = 0;
    if (customers.length > 0) {
      const idList = customers
        .map(c => parseInt(c.id.substring(1)))
        .filter(num => !isNaN(num));
      
      if (idList.length > 0) {
        lastIdNum = Math.max(...idList);
      }
    }
    const newId = `C${(lastIdNum + 1).toString().padStart(3, '0')}`;

    const newCustomer = {
      id: newId,
      ...formData,
      added: new Date().toISOString().split('T')[0]
    };
    
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem("myCustomers", JSON.stringify(updatedCustomers));
    setFormData({ name: "", address: "", email: "", phone: "" });
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus customer "${name}" (${id})?`)) {
      const updatedCustomers = customers.filter((c) => c.id !== id);
      setCustomers(updatedCustomers);
      localStorage.setItem("myCustomers", JSON.stringify(updatedCustomers));
    }
  };

  // Filter pencarian data customer
  const filteredCustomers = customers.filter((c: any) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Customer Data</h1>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Cari customer..." 
            className="bg-[#151515] border border-white/10 px-4 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-[#d4af37]" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#d4af37] hover:bg-[#b8962f] text-black font-bold px-6 py-2 rounded-lg text-sm transition-all"
          >
            + ADD CUSTOMER
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#151515] p-8 rounded-2xl border border-white/10 w-[400px]">
            <h2 className="text-xl font-bold text-white mb-6">Add New Customer</h2>
            <form onSubmit={handleSave} className="space-y-4">
              <input required placeholder="Nama Lengkap" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#d4af37]" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Alamat" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#d4af37]" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
              <input required placeholder="No. Handphone" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#d4af37]" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              <input placeholder="Email (Opsional)" className="w-full bg-black/20 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-[#d4af37]" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}/>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-white/5 p-3 rounded-lg text-gray-400">Cancel</button>
                <button type="submit" className="w-full bg-[#d4af37] p-3 rounded-lg text-black font-bold">Save Data</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black/20 text-white uppercase text-[10px] tracking-wider">
            <tr>
              <th className="p-4">Contact ID</th>
              <th className="p-4">Nama</th>
              <th className="p-4">Alamat</th>
              <th className="p-4">Email</th>
              <th className="p-4">No. HP</th>
              <th className="p-4">Tanggal</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c: any) => (
                <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-mono text-[#d4af37] font-bold">{c.id}</td>
                  <td className="p-4 text-white font-bold">{c.name}</td>
                  <td className="p-4">{c.address}</td>
                  <td className="p-4">{c.email || "-"}</td>
                  <td className="p-4 font-mono">{c.phone}</td>
                  <td className="p-4 text-xs">{c.added}</td>
                  <td className="p-4 text-center">
                    <button 
                      type="button"
                      onClick={() => handleDelete(c.id, c.name)}
                      className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all"
                    >
                      HAPUS
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-10 text-center text-gray-600 italic">
                  Belum ada data customer atau pencarian tidak ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}