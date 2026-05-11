"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link"; // Tambahkan ini untuk navigasi balik

export default function TrackingPage() {
  const [searchId, setSearchId] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBookingData(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", searchId)
        .single();

      if (fetchError) throw new Error("ID tidak ditemukan. Silakan cek kembali.");
      setBookingData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Jika Navbar global belum muncul, kamu bisa selipkan navbar manual di sini */}
      
      <div className="max-w-lg mx-auto pt-40 px-4">
        <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden p-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#d4af37] tracking-tight">
              TRACKING SERVICE
            </h1>
            <div className="h-1 w-20 bg-[#d4af37] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-4">
              Monitor status perbaikan iPhone kamu secara real-time
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#d4af37] mb-2">
                Nomor ID Booking
              </label>
              <input
                type="text"
                placeholder="Masukkan ID (contoh: 102)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-3 bg-[#262626] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] text-black py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b8962e] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
            >
              {loading ? "Mencari Data..." : "Cek Status Sekarang"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Result Card */}
          {bookingData && (
            <div className="mt-10 animate-fade-in">
              <div className="p-6 bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#d4af37]/50 rounded-xl shadow-inner">
                <h2 className="text-[#d4af37] font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-ping"></span>
                  DETAIL STATUS
                </h2>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Nama Pelanggan</span>
                    <span className="font-semibold">{bookingData.nama_lengkap}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Tipe iPhone</span>
                    <span className="font-semibold text-[#d4af37]">{bookingData.tipe_iphone}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Status Progress</span>
                    <span className="px-3 py-1 bg-[#d4af37] text-black text-[10px] font-black rounded-full uppercase">
                      {bookingData.status || "DITERIMA"}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-400 block mb-1">Update Kerusakan:</span>
                    <p className="italic text-gray-300">"{bookingData.kerusakan}"</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-gray-500 hover:text-[#d4af37] text-sm transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}