"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";// 👈 Diubah ke relative path agar tidak error 'Module not found'

export default function TrackingPage() {
  const [searchId, setSearchId] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    setLoading(true);
    setError("");
    setBookingData(null);

    try {
      const parts = searchId.split("-");
      
      if (parts.length < 2) {
        throw new Error("Format ID salah! Gunakan format PREFIX-NOMOR (Contoh: VSF-878)");
      }

      const prefix = parts[0].toUpperCase().trim(); // "VSF" atau "JOB"
      const jobsheetNum = parts.slice(1).join("-").trim(); // "878"

      // 1. Validasi apakah nomor nota berupa angka valid
      if (isNaN(Number(jobsheetNum))) {
        throw new Error("Nomor nota harus berupa angka murni setelah tanda strip!");
      }

      // 2. Tentukan bos konternya berdasarkan awalan kode
      let ownerUsername = "";
      if (prefix === "VSF" || prefix === "JOB") {
        ownerUsername = "sector7lab"; 
      } else if (prefix === "RAJA") {
        ownerUsername = "rajarepair"; 
      } else {
        throw new Error(`Toko dengan kode "${prefix}" belum terdaftar di Visiofix System.`);
      }

      // 3. Eksekusi query bersih: Tembak langsung ID angka eksak
      const { data, error: dbError } = await supabase
        .from("jobsheets")
        .select("*")
        .eq("owner_username", ownerUsername)
        .eq("id", Number(jobsheetNum)) // Diubah jadi Number murni agar match dengan int8
        .maybeSingle(); // Menggunakan maybeSingle agar tidak crash jika kosong

      if (dbError) {
        console.error("Database Error:", dbError);
        throw new Error("Terjadi masalah saat membaca data dari server.");
      }

      if (!data) {
        throw new Error(`ID Tracking ${searchId.toUpperCase()} tidak ditemukan di sistem konter.`);
      }

      // 4. Petakan data ke UI dengan aman
      setBookingData({
        id: searchId.toUpperCase(),
        customer: data.customerName || data.customer_name || "Pelanggan",
        device: `${data.brand || ""} ${data.deviceModel || ""}`.trim() || "Gadget",
        status: data.status || "Proses",
        issue: data.problem || "-",
        cost: data.estimatedPrice || 0,
        notes: data.notes || ""
      });

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mencari data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="max-w-lg mx-auto pt-40 px-4 pb-20">
        <div className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden p-8">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-[#d4af37] tracking-tight">
              TRACKING SERVICE
            </h1>
            <div className="h-1 w-20 bg-[#d4af37] mx-auto mt-2 rounded-full"></div>
            <p className="text-gray-400 mt-4 text-xs">
              Monitor status perbaikan gadget Anda secara real-time di <span className="text-white font-bold">Visiofix System</span>
            </p>
          </div>

          {/* Form Input */}
          <form onSubmit={handleTrack} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#d4af37] mb-2">
                Nomor ID Tracking
              </label>
              <input
                type="text"
                placeholder="Masukkan ID (contoh: VSF-1024)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-3 bg-[#262626] border border-gray-700 rounded-xl focus:ring-2 focus:ring-[#d4af37] focus:border-transparent outline-none transition-all text-white placeholder-gray-500 font-mono uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] text-black py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-[#b8962e] active:scale-95 transition-all shadow-lg shadow-[#d4af37]/20 disabled:opacity-50 text-xs"
            >
              {loading ? "Mencari Data..." : "Cek Status Sekarang"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-400 text-xs text-center font-bold">
              {error}
            </div>
          )}

          {/* Result Card */}
          {bookingData && (
            <div className="mt-10 animate-in fade-in duration-500">
              <div className="p-6 bg-gradient-to-br from-[#262626] to-[#1a1a1a] border border-[#d4af37]/50 rounded-xl shadow-inner">
                <h2 className="text-[#d4af37] font-bold mb-4 flex items-center gap-2 text-xs tracking-wider">
                  <span className="w-2 h-2 bg-[#d4af37] rounded-full animate-ping"></span>
                  DETAIL STATUS UNIT
                </h2>
                
                <div className="space-y-4 text-xs">
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">ID Tracking</span>
                    <span className="font-bold text-[#d4af37]">{bookingData.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Nama Pelanggan</span>
                    <span className="font-semibold uppercase">{bookingData.customer}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Tipe Perangkat</span>
                    <span className="font-semibold uppercase">{bookingData.device}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Estimasi Biaya</span>
                    <span className="font-bold text-green-400">
                      Rp {Number(bookingData.cost).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-700 pb-2 items-center">
                    <span className="text-gray-400">Status Progress</span>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black rounded-full uppercase">
                      {bookingData.status}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-gray-400 block mb-1">Diagnosa Kerusakan:</span>
                    <p className="italic text-gray-300">"{bookingData.issue}"</p>
                  </div>
                  {bookingData.notes && (
                    <div className="pt-2 border-t border-gray-700/50">
                      <span className="text-amber-400 block mb-1 font-bold text-[10px] uppercase">Catatan Teknisi:</span>
                      <p className="text-gray-400">"{bookingData.notes}"</p>
                    </div>
                  )}
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