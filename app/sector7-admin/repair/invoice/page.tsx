"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function InvoicePage() {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState<any[]>([]);

  // State Pengendali Utama Kasir Aktif
  const [isGenModalOpen, setIsGenModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<any>(null);
  
  // Keranjang Belanja Sparepart
  const [cart, setCart] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("myJobsheets") || "[]");
    const savedInvoices = JSON.parse(localStorage.getItem("myInvoices") || "[]");
    const savedProducts = JSON.parse(localStorage.getItem("myProducts") || "[]");

    const finished = savedJobs.filter((job: any) => 
      job.status.toLowerCase().includes("selesai") && 
      !savedInvoices.some((inv: any) => inv.jobId === job.id)
    );
    
    setCompletedJobs(finished);
    setInvoices(savedInvoices);
    setProducts(savedProducts);
  }, []);

  const addToCart = (product: any) => {
    const existing = cart.find(item => item.sku === product.sku);
    const currentStock = parseInt(product.stock) || 0;

    if (existing) {
      if (existing.qty >= currentStock) {
        alert(`Stok ${product.name} tidak mencukupi!`);
        return;
      }
      setCart(cart.map(item => item.sku === product.sku ? { ...item, qty: item.qty + 1 } : item));
    } else {
      if (currentStock < 1) {
        alert("Stok barang habis!");
        return;
      }
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (sku: string) => {
    setCart(cart.filter(item => item.sku !== sku));
  };

  const repairCost = activeJob ? (parseInt(activeJob.estimate) || 0) : 0;
  const totalPartsCost = cart.reduce((sum, item) => sum + ((parseInt(item.price) || 0) * item.qty), 0);
  const totalPayable = repairCost + totalPartsCost;

  const handleCheckout = (statusBayar: "Lunas" | "Draft") => {
    if (!activeJob) return;

    const invoiceId = `INV-${activeJob.id.split('-')[1] || 'S7'}-${Date.now().toString().slice(-3)}`;
    
    const newInvoice = {
      invoiceId,
      jobId: activeJob.id,
      date: new Date().toLocaleDateString(),
      customer: activeJob.customer,
      phone: activeJob.phone || "-",
      brand: activeJob.brand || "",
      device: activeJob.device,
      model: activeJob.model || "-",
      damage: activeJob.damage,
      technician: activeJob.technician || "Admin",
      paymentMethod: paymentMethod,
      status: statusBayar,
      repairCost: repairCost,
      parts: cart.map(item => ({ name: item.name, qty: item.qty, subtotal: parseInt(item.price) * item.qty })),
      total: totalPayable
    };

    const updatedInvoices = [newInvoice, ...invoices];
    localStorage.setItem("myInvoices", JSON.stringify(updatedInvoices));
    setInvoices(updatedInvoices);

    const updatedProducts = products.map((prod: any) => {
      const cartItem = cart.find(item => item.sku === prod.sku);
      if (cartItem) {
        return { ...prod, stock: Math.max(0, (parseInt(prod.stock) || 0) - cartItem.qty) };
      }
      return prod;
    });
    localStorage.setItem("myProducts", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    setIsGenModalOpen(false);
    setCart([]);

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>INVOICE - \${newInvoice.invoiceId}</title></head>
          <body style="font-family:sans-serif; padding:20px; font-size:12px; color:#333;">
            <center><h2>SECTOR 7 REPAIR</h2><p>Nota Resmi Transaksi</p></center>
            <hr/>
            <p><b>Inv No:</b> \${newInvoice.invoiceId} (\${newInvoice.date})</p>
            <p><b>Pelanggan:</b> \${newInvoice.customer} / <b>Unit:</b> \${newInvoice.brand} \${newInvoice.device}</p>
            <p><b>Jasa Servis:</b> \${newInvoice.damage} (Rp \${repairCost.toLocaleString()})</p>
            \${cart.length > 0 ? '<p><b>Sparepart:</b></p>' + cart.map(i => \`<p>- \${i.name} x\${i.qty} (Rp \${(parseInt(i.price)*i.qty).toLocaleString()})</p>\`).join('') : ''}
            <hr/>
            <h3 style="text-align:right;">TOTAL NOTA: Rp \${totalPayable.toLocaleString()}</h3>
            <p style="text-align:center; font-size:10px; margin-top:20px;">Metode Bayar: \${paymentMethod} - Terima Kasih</p>
            <script>window.print(); window.close();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
    alert("Transaksi Selesai & Nota Berhasil Dicetak!");
  };

  return (
    /* PERBAIKAN FIT LAYAR:
       - Menggunakan `w-full max-w-full block` agar halaman mengunci otomatis ke grid bodi utama Master.
       - Dipastikan tidak ada elemen yang memaksa melar ke kanan secara browser global.
    */
    <div className="w-full max-w-full p-6 flex flex-col justify-start items-start text-white bg-[#0f0f11] min-h-screen pb-20">
      
      {/* HEADER & RIWAYAT */}
      <div className="w-full flex flex-col justify-start items-start gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold italic tracking-tighter text-[#d4af37]">INVOICE <span className="text-white">CENTER</span></h1>
          <p className="text-gray-500 text-xs mt-1">Daftar unit jobsheet selesai yang siap dilakukan penagihan & potong sparepart.</p>
        </div>
        <Link href="/sector7-admin/repair/invoice/list" className="bg-[#d4af37] text-black font-black px-4 py-2 rounded-xl text-[10px] tracking-wider shadow-lg hover:scale-105 transition-all mt-1">
          ← LIHAT RIWAYAT FINANSIAL
        </Link>
      </div>

      {/* SPREADSHEET TABLE ANTRIAN (DIPERKECIL PAS SATU LAYAR MONITOR) */}
      <div className="w-full space-y-3">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Antrian Pembayaran Unit Selesai</h3>
        
        {/* UKURAN AMBLAS SCROLLBAR:
          - `min-w-[1300px]` saya hapus total dan diganti ke `w-full`.
          - Lebar tiap kolom disusutkan (w-16, w-24, w-32) agar pas berjejer rapi di layar monitor Master.
        */}
        <div className="w-full bg-[#151516] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
          <table className="w-full text-left text-[11px] table-fixed">
            <thead className="bg-black/50 text-gray-400 uppercase text-[9px] font-bold border-b border-white/5">
              <tr>
                <th className="p-3 w-[10%] text-[#d4af37]">ID Job</th>
                <th className="p-3 w-[12%]">Tgl Masuk</th>
                <th className="p-3 w-[15%]">Customer</th>
                <th className="p-3 w-[10%]">Brand</th>
                <th className="p-3 w-[15%]">Model HP</th>
                <th className="p-3 w-[18%]">Kerusakan</th>
                <th className="p-3 w-[12%]">Teknisi PJ</th>
                <th className="p-3 w-[13%] text-right">Biaya Jasa</th>
                <th className="p-3 w-[10%] text-center">Kasir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {completedJobs.length > 0 ? completedJobs.map((job: any, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-mono text-[#d4af37] font-bold truncate">{job.id}</td>
                  <td className="p-3 text-gray-500 font-mono truncate">{job.date}</td>
                  <td className="p-3 text-white font-bold truncate">{job.customer}</td>
                  <td className="p-3 truncate">
                    <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-400 font-bold">{job.brand}</span>
                  </td>
                  <td className="p-3 text-white font-semibold truncate">{job.device} <span className="text-gray-500 text-[10px]">({job.model || "-"})</span></td>
                  <td className="p-3 truncate">
                    <span className="text-[#d4af37] italic">{job.damage}</span>
                  </td>
                  <td className="p-3 text-white font-bold truncate">{job.technician}</td>
                  <td className="p-3 text-right font-mono font-bold text-white truncate">
                    Rp {parseInt(job.estimate || 0).toLocaleString()}
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      type="button" 
                      onClick={() => { setActiveJob(job); setCart([]); setIsGenModalOpen(true); }} 
                      className="bg-[#d4af37] hover:bg-[#b8962f] text-black font-black px-3 py-1.5 rounded-lg text-[9px] tracking-wider active:scale-95 transition-transform shadow-md"
                    >
                      PROCESS
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={9} className="p-12 text-center text-gray-600 font-mono text-xs italic">
                    Tidak ada antrian unit selesai saat ini...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL SPLIT SCREEN --- */}
      {isGenModalOpen && activeJob && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col z-50 animate-in fade-in duration-200 text-sm">
          {/* TOP BAR MODAL */}
          <div className="bg-[#151515] border-b border-white/10 p-4 flex justify-between items-center px-8">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-black text-[#d4af37] italic tracking-tight">POS KASIR - SECTOR 7 REPAIR</h2>
              <span className="text-xs bg-white/5 px-3 py-1 rounded-full text-gray-400 font-mono">Ref: {activeJob.id}</span>
            </div>
            <button type="button" onClick={() => setIsGenModalOpen(false)} className="text-gray-400 hover:text-white font-bold text-lg">✕ CLOSE</button>
          </div>

          {/* MAIN GRID BODY */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 p-6 gap-6 overflow-hidden">
            {/* SISI KIRI */}
            <div className="flex flex-col bg-[#151515] rounded-3xl border border-white/5 p-6 overflow-y-auto space-y-4">
              <h3 className="text-[#d4af37] text-[11px] font-black tracking-widest uppercase">1. DETAIL PELANGGAN & JASA REPAIR</h3>
              <div className="grid grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/5 text-xs">
                <div><span className="text-gray-500 block">Customer</span><strong className="text-white text-sm">{activeJob.customer}</strong></div>
                <div><span className="text-gray-500 block">Teknisi PJ</span><strong className="text-white text-sm">{activeJob.technician}</strong></div>
                <div className="col-span-2"><span className="text-gray-500 block">Device & Seri</span><strong className="text-white">{activeJob.brand} {activeJob.device} ({activeJob.model || "-"})</strong></div>
                <div className="col-span-2 border-t border-white/5 pt-2"><span className="text-gray-500 block">Problem Reported</span><p className="text-[#d4af37] italic font-medium mt-0.5">{activeJob.damage}</p></div>
              </div>

              <h3 className="text-[#d4af37] text-[11px] font-black tracking-widest uppercase pt-2">2. RINGKASAN ITEM DAFTAR BELANJA</h3>
              <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 text-gray-400 uppercase text-[9px] font-bold">
                    <tr>
                      <th className="p-3">Nama Deskripsi Item</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Subtotal</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr>
                      <td className="p-3 font-sans"><span className="text-[#d4af37] font-bold">[Jasa Repair]</span> {activeJob.damage}</td>
                      <td className="p-3 text-center">1</td>
                      <td className="p-3 text-right text-white font-bold">Rp {repairCost.toLocaleString()}</td>
                      <td className="p-3 text-center text-gray-600">-</td>
                    </tr>
                    {cart.map((item) => (
                      <tr key={item.sku} className="text-gray-300">
                        <td className="p-3 font-sans"><span className="text-green-400 font-bold">[Part]</span> {item.name}</td>
                        <td className="p-3 text-center font-bold text-white">{item.qty}</td>
                        <td className="p-3 text-right text-white">Rp {((parseInt(item.price) || 0) * item.qty).toLocaleString()}</td>
                        <td className="p-3 text-center"><button type="button" onClick={() => removeFromCart(item.sku)} className="text-red-500 hover:text-red-400 font-bold">✕</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SISI KANAN */}
            <div className="flex flex-col bg-[#151515] rounded-3xl border border-white/5 p-6 overflow-hidden space-y-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <h3 className="text-[#d4af37] text-[11px] font-black tracking-widest uppercase">3. PILIHAN SPAREPART / AKSESORIS</h3>
                <input 
                  type="text" placeholder="Ketik Nama Sparepart / SKU..." 
                  className="bg-black border border-white/10 p-2 px-4 rounded-xl text-xs w-full md:w-64 outline-none focus:border-[#d4af37] text-white"
                  value={productSearch} onChange={(e) => setProductSearch(e.target.value)}
                />
              </div>

              <div className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-3 pr-1 custom-scrollbar">
                {products
                  .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.sku.toLowerCase().includes(productSearch.toLowerCase()))
                  .map((prod) => {
                    const isOutOfStock = parseInt(prod.stock) <= 0;
                    return (
                      <button
                        type="button" key={prod.sku} disabled={isOutOfStock} onClick={() => addToCart(prod)}
                        className={`p-4 rounded-2xl border text-left flex flex-col justify-between h-28 transition-all active:scale-95 ${
                          isOutOfStock ? "bg-black/40 border-white/5 opacity-30 cursor-not-allowed" : "bg-black/30 border-white/5 hover:border-[#d4af37] group shadow-md"
                        }`}
                      >
                        <div className="w-full">
                          <span className="text-[9px] font-mono font-bold text-gray-500 group-hover:text-[#d4af37]">{prod.sku}</span>
                          <h4 className="text-xs font-bold text-white mt-0.5 line-clamp-2 leading-tight">{prod.name}</h4>
                        </div>
                        <div className="w-full flex justify-between items-end border-t border-white/5 pt-1.5 mt-1">
                          <span className="text-[10px] text-gray-400 font-mono">Stok: {prod.stock}</span>
                          <span className="text-xs font-mono font-black text-green-400">Rp {parseInt(prod.price || 0).toLocaleString()}</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* BOTTOM BAR ACTION */}
          <div className="bg-[#101010] border-t border-white/10 p-4 px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] uppercase font-bold text-gray-500 ml-1">Metode Bayar</span>
                <select 
                  className="bg-[#151515] border border-white/10 p-2.5 rounded-xl text-xs text-white outline-none focus:border-[#d4af37]"
                  value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash">💵 Cash / Tunai</option>
                  <option value="TF">🏦 Transfer Bank</option>
                  <option value="QRIS">📱 QRIS / E-Wallet</option>
                </select>
              </div>
              <div className="flex gap-2 items-end h-full pt-4">
                <button type="button" onClick={() => handleCheckout("Lunas")} className="bg-green-600 hover:bg-green-700 text-white font-black px-5 py-2.5 rounded-xl text-xs tracking-wider active:scale-95 transition-transform shadow-lg">⚡ CASH / OUT</button>
                <button type="button" onClick={() => handleCheckout("Draft")} className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold px-4 py-2.5 rounded-xl text-xs tracking-wider active:scale-95 transition-transform">📝 QUOTATION / DRAFT</button>
              </div>
            </div>
            <div className="bg-black border border-white/10 rounded-2xl p-3 px-8 text-right shadow-2xl flex items-center gap-6">
              <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Payable</span>
              <span className="text-2xl font-mono font-black text-[#d4af37]">Rp {totalPayable.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}