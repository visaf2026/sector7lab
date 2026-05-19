"use client";
import { useState, useEffect } from "react";
import Footer from '@/app/components/Footer';

export default function GalleryPage() {
  const [gallery, setGallery] = useState<{ image: string; caption: string }[]>([]);
  const [newImage, setNewImage] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [showAdminForm, setShowAdminForm] = useState(false);

  // Load data awal dari LocalStorage saat halaman diakses
  useEffect(() => {
    const savedGallery = localStorage.getItem("sector7_gallery_v2");
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    } else {
      const initialData = [
        {
          image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80f02e?q=80&w=600&auto=format&fit=crop",
          caption: "Proses reballing IC Power iPhone menggunakan mikroskop trinokuler."
        },
        {
          image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
          caption: "Penyelesaian kasus Swab Board iPhone 13 Pro Max patah jalur."
        },
        {
          image: "https://images.unsplash.com/photo-1601524909162-be87252be298?q=80&w=600&auto=format&fit=crop",
          caption: "Kondisi meja lab sterilisasi Sector 7 Lab siap eksekusi hardware berat."
        }
      ];
      setGallery(initialData);
      localStorage.setItem("sector7_gallery_v2", JSON.stringify(initialData));
    }
  }, []);

  // --- BYPASS SECURITY: FUNGSI CEK PIN SEBELUM BUKA PANEL ADMIN ---
  const handleToggleAdminPanel = () => {
    if (showAdminForm) {
      // Jika panel sedang terbuka, langsung tutup tanpa minta PIN
      setShowAdminForm(false);
    } else {
      // Jika panel mau dibuka, tantang user dengan prompt PIN keamanan
      const pinInput = prompt("Masukkan PIN Keamanan Owner Sector 7:");
      if (pinInput === "7777") { // <-- Master bisa ganti "7777" dengan PIN lain sesuka hati hhe
        setShowAdminForm(true);
      } else if (pinInput !== null) {
        alert("PIN Salah! Akses ditolak, sirkuit panel terkunci hhe. 🔒");
      }
    }
  };

  // Fungsi membaca file gambar langsung dari laptop/HP (Convert ke Base64)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1500000) {
        alert("Waduh kegedean Master! Kompres dulu gambarnya di tinypng.com sampai di bawah 1.5MB biar loading web kita tetap sat-set hhe.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setNewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Fungsi submit menyiarkan foto garapan baru ke etalase web
  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImage || !newCaption) return alert("Pilih file gambar dan isi keterangan kasus dulu, Master!");

    const updatedGallery = [
      { image: newImage, caption: newCaption },
      ...gallery
    ];

    setGallery(updatedGallery);
    localStorage.setItem("sector7_gallery_v2", JSON.stringify(updatedGallery));
    
    setNewImage("");
    setNewCaption("");
    alert("Foto garapan asli komputer sukses mendarat di etalase, Jos Gandos! 🔥");
  };

  // Fungsi hapus foto
  const handleDeletePhoto = (indexToDelete: number) => {
    if (confirm("Apakah foto garapan ini mau dihapus dari galeri, Master?")) {
      const updatedGallery = gallery.filter((_, index) => index !== indexToDelete);
      setGallery(updatedGallery);
      localStorage.setItem("sector7_gallery_v2", JSON.stringify(updatedGallery));
    }
  };

  return (
    <main className="w-full overflow-x-hidden bg-[#0f0f0f] text-white min-h-screen">
      
      {/* HEADER SEKSYEN */}
      <section className="relative pt-40 pb-16 px-6 text-center bg-gradient-to-b from-[#141414] to-[#0f0f0f] border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-[#d4af37] text-xs font-bold tracking-[0.4em] mb-4 uppercase">Portofolio Kerja</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            WORK <span className="text-[#d4af37]">GALLERY</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Dokumentasi nyata hasil eksekusi hardware mikro, swab board, dan perbaikan snoop-snoop sirkuit smartphone di Sector 7 Lab Manado.
          </p>
          
          {/* Tombol Rahasia Pengaktif Panel yang Sudah Dikunci PIN */}
          <button 
            onClick={handleToggleAdminPanel}
            className="mt-8 text-xs border border-[#d4af37]/30 text-[#d4af37] px-4 py-2 rounded-full hover:bg-[#d4af37]/10 transition-all font-semibold"
          >
            {showAdminForm ? "Sembunyikan Panel Input" : "Panel Input Garapan (Owner Only)"}
          </button>
        </div>
      </section>

      {/* PANEL INPUT GAMBAR BARU (TERKUNCI PIN) */}
      {showAdminForm && (
        <section className="max-w-xl mx-auto mt-10 p-6 bg-[#141414] rounded-2xl border border-[#d4af37]/20 px-6 mx-4">
          <h3 className="text-[#d4af37] font-bold text-lg mb-4 text-center">Upload Hasil Eksekusi Unit</h3>
          <form onSubmit={handleAddPhoto} className="space-y-4 text-black">
            
            {/* OPSI A: FILE LOCAL */}
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Opsi A: Upload File dari Komputer</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full bg-[#1f1f1f] text-gray-400 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[#d4af37] file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-black hover:file:bg-[#b8962e]"
              />
            </div>

            <div className="text-center text-gray-600 text-xs font-bold my-2">— ATAU —</div>

            {/* OPSI B: LINK URL */}
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Opsi B: Ketik / Paste Link URL Gambar</label>
              <input 
                type="text" 
                placeholder="Masukkan link url gambar internet jika ada..."
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="w-full bg-[#1f1f1f] text-white border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* AUTO PREVIEW BOX */}
            {newImage && (
              <div className="mt-2 border border-[#d4af37]/20 p-2 rounded-xl bg-black/40">
                <p className="text-gray-500 text-[10px] uppercase font-bold mb-1">Preview Gambar:</p>
                <img src={newImage} alt="Preview" className="h-24 w-auto object-cover rounded-md" />
              </div>
            )}

            {/* CAPTION TEXT */}
            <div>
              <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Keterangan Kasus / Nota</label>
              <textarea 
                placeholder="Contoh: iPhone 12 Pro Max bypass hardware + pindah mesin donor. Done!"
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="w-full bg-[#1f1f1f] text-white border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-[#d4af37] h-24 resize-none"
              />
            </div>

            <button type="submit" className="w-full bg-[#d4af37] text-black font-bold p-3 rounded-xl hover:bg-[#b8962e] transition-all">
              TAYANGKAN DI WEBSITE
            </button>
          </form>
        </section>
      )}

      {/* GRID DAFTAR FOTO UTAMA PORTFOLIO */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {gallery.map((item, index) => (
            <div key={index} className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden group shadow-xl relative flex flex-col justify-between">
              
              <div className="aspect-square w-full overflow-hidden relative bg-[#1a1a1a]">
                <img 
                  src={item.image} 
                  alt={item.caption} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Tombol Hapus Ikut Terkunci Hanya Bisa Keluar Jika PIN Sukses Diinput */}
                {showAdminForm && (
                  <button 
                    onClick={() => handleDeletePhoto(index)}
                    className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full z-30 transition-all text-xs font-bold shadow-lg"
                  >
                    Hapus
                  </button>
                )}
              </div>

              <div className="p-4 bg-[#141414] border-t border-white/5 flex-grow flex items-center">
                <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed break-words w-full">
                  <span className="text-[#d4af37] font-semibold block mb-1">Sector 7 Case Study:</span>
                  {item.caption}
                </p>
              </div>

            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}