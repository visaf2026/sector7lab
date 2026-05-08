"use client";

import { useState } from "react";

interface Booking {
  id: string;
  name: string;
  deviceModel: string;
  status: string;
  issue: string;
  createdAt: string;
}

export default function TrackingStatus() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState<Booking | null>(null);
  const [error, setError] = useState("");

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // 1. Ambil semua data dari LocalStorage
    const savedData = localStorage.getItem("service_bookings");
    
    if (savedData) {
      const bookings: Booking[] = JSON.parse(savedData);
      
      // 2. Cari booking berdasarkan ID yang diinput (case-insensitive)
      const found = bookings.find(
        (b) => b.id.toLowerCase() === searchId.trim().toLowerCase()
      );

      if (found) {
        setResult(found);
      } else {
        setError("Booking ID tidak ditemukan. Periksa kembali kode Anda.");
      }
    } else {
      setError("Belum ada data booking tersimpan.");
    }
  };

  return (
    <section id="track" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-xl mx-auto border border-white/10 p-8 bg-white/5 backdrop-blur-sm">
        <h2 className="text-2xl font-playfair text-[#D4AF37] mb-6 text-center uppercase tracking-widest">
          Track Your Repair
        </h2>
        
        <form onSubmit={handleTrack} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Enter Booking ID (e.g. ST7-1234)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 bg-black border border-white/20 p-3 text-white outline-none focus:border-[#D4AF37]"
            required
          />
          <button 
            type="submit"
            className="bg-[#D4AF37] px-6 py-3 text-black font-bold hover:bg-[#b8962d] transition-all"
          >
            CHECK
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center p-4 border border-red-400/20 bg-red-400/5 mb-4">
            {error}
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="border-l-4 border-[#D4AF37] bg-white/5 p-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-tighter">Booking ID</p>
                <h3 className="text-[#D4AF37] font-bold text-lg">{result.id}</h3>
              </div>
              <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold rounded-full">
                {result.status}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-xs uppercase">Customer</p>
                <p className="text-white">{result.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Device</p>
                <p className="text-white">{result.deviceModel}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase">Issue</p>
                <p className="text-gray-400 italic text-sm">"{result.issue}"</p>
              </div>
              <div className="pt-4 border-t border-white/10 text-[10px] text-gray-600">
                REGISTERED ON: {new Date(result.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}