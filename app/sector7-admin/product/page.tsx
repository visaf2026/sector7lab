"use client";
import { useState, useEffect } from "react";

export default function ProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // 1. LOAD DATA DARI BROWSER SAAT PERTAMA KALI DIBUKA
  useEffect(() => {
    const saved = localStorage.getItem("myProducts");
    if (saved) {
      try {
        setProducts(JSON.parse(saved));
      } catch (e) {
        console.error("Gagal baca data:", e);
      }
    }
  }, []);

  // 2. FORM STATE
  const [formData, setFormData] = useState({ 
    name: "", category: "", unit: "", stock: 0, modal: 0, price: 0, wholesale: 0, promo: 0 
  });

  // 3. FUNGSI SIMPAN DATA
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto Generate SKU
    const lastSkuNum = products.length > 0 ? parseInt(products[products.length - 1].sku.split("-")[1]) : 0;
    const newSku = `S7-${(lastSkuNum + 1).toString().padStart(4, '0')}`;
    
    const newProduct = { sku: newSku, ...formData };
    const updatedProducts = [...products, newProduct];
    
    setProducts(updatedProducts);
    localStorage.setItem("myProducts", JSON.stringify(updatedProducts)); // Simpan paksa
    
    setFormData({ name: "", category: "", unit: "", stock: 0, modal: 0, price: 0, wholesale: 0, promo: 0 });
    setIsModalOpen(false);
  };

  // 4. FUNGSI HAPUS
  const handleDelete = (sku: string) => {
    const updatedProducts = products.filter((p) => p.sku !== sku);
    setProducts(updatedProducts);
    localStorage.setItem("myProducts", JSON.stringify(updatedProducts));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Product Inventory</h1>
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Cari produk..." 
            className="bg-[#151515] border border-white/10 px-4 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-[#d4af37]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(true)} className="bg-[#d4af37] hover:bg-[#b8962f] text-black font-bold px-6 py-2 rounded-lg text-sm">+ ADD PRODUCT</button>
        </div>
      </div>

      <div className="bg-[#151515] rounded-2xl border border-white/5 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-black/20 text-white uppercase text-[10px]">
            <tr>
              <th className="p-4">SKU</th>
              <th className="p-4">Nama Produk</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Stok</th>
              <th className="p-4">Modal</th>
              <th className="p-4 text-[#d4af37]">Total Modal</th>
              <th className="p-4">Jual</th>
              <th className="p-4">Grosir</th>
              <th className="p-4">Promo</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products
              .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((p, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="p-4 font-mono text-[#d4af37] font-bold">{p.sku}</td>
                  <td className="p-4 text-white font-bold">{p.name}</td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4 font-mono">{p.stock}</td>
                  <td className="p-4">Rp {p.modal.toLocaleString()}</td>
                  <td className="p-4 text-[#d4af37] font-bold">Rp {(p.stock * p.modal).toLocaleString()}</td>
                  <td className="p-4">Rp {p.price.toLocaleString()}</td>
                  <td className="p-4">Rp {p.wholesale.toLocaleString()}</td>
                  <td className="p-4">Rp {p.promo.toLocaleString()}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(p.sku)} className="text-red-500 hover:text-red-300 font-bold px-2 py-1 bg-red-500/10 rounded">Hapus</button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#151515] p-8 rounded-2xl border border-white/10 w-[500px]">
            <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
              <input required placeholder="Nama Produk" className="col-span-2 bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Kategori" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, category: e.target.value})} />
              <input required placeholder="Satuan" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, unit: e.target.value})} />
              <input required type="number" placeholder="Stok" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})} />
              <input required type="number" placeholder="Harga Modal" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, modal: parseInt(e.target.value)})} />
              <input required type="number" placeholder="Harga Jual" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} />
              <input required type="number" placeholder="Harga Grosir" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, wholesale: parseInt(e.target.value)})} />
              <input required type="number" placeholder="Harga Promo" className="bg-black/20 border border-white/10 p-3 rounded-lg text-white" onChange={(e) => setFormData({...formData, promo: parseInt(e.target.value)})} />
              <div className="col-span-2 flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-full bg-white/5 p-3 rounded-lg text-gray-400">Cancel</button>
                <button type="submit" className="w-full bg-[#d4af37] p-3 rounded-lg text-black font-bold">Save Data</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}