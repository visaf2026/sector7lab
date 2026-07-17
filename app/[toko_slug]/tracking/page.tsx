"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // 🟢 1. IMPORT PARAMETER URL BROWSER
import { supabase } from "../../lib/supabase"; 

export default function TrackingPage() {
  const params = useParams(); // 🟢 2. AMBIL URL SLUG AKTIF
  
  const [searchId, setSearchId] = useState("");
  const [bookingData, setBookingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleTrack = async (e) => {
  e.preventDefault();
  if (!searchId.trim()) return;

  setLoading(true);
  setError("");
  setBookingData(null);

  try {
    // 1. Bersihkan prefix ID Tracking (VSF-880 -> 880)
    const cleanIdForQuery = searchId
      .toUpperCase()
      .replace("VSF-", "")
      .replace("JOB-", "")
      .trim();

    if (isNaN(Number(cleanIdForQuery))) {
      setLoading(false);
      return setError("Format ID Tracking tidak valid!");
    }

    // 2. Deteksi slug dari URL browser
    let currentSlug = (params?.toko_slug || params?.slug) || "";
    if (!currentSlug && typeof window !== "undefined") {
      const pathSegments = window.location.pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) currentSlug = pathSegments[0];
    }

    if (!currentSlug) {
      setLoading(false);
      return setError("Gagal membaca identitas konter dari URL.");
    }

    // Bersihkan slug dari browser (hapus strip jika ada) -> cth: "ratu-repair" atau "raturepair" jadi "raturepair"
    const cleanBrowserSlug = currentSlug.toLowerCase().replace(/-/g, "").trim();

    // 🚀 TAHAP 1: Tarik semua store_settings untuk dicocokkan secara pintar di memori lokal
    const { data: allStores, error: storeError } = await supabase
      .from("store_settings")
      .select("owner_username, slug");

    if (storeError || !allStores) {
      setLoading(false);
      return setError("Gagal terhubung ke server database cloud.");
    }

    // Cari store yang kalau dihilangkan strip-nya, hasilnya sama dengan slug di URL browser!
    const matchedStore = allStores.find(store => {
      const cleanDbSlug = store.slug.toLowerCase().replace(/-/g, "").trim();
      return cleanDbSlug === cleanBrowserSlug;
    });

    if (!matchedStore) {
      setLoading(false);
      return setError(`Toko dengan alamat "${currentSlug}" tidak ditemukan di database cloud.`);
    }

    // 🚀 TAHAP 2: KUNCI NOTA BERDASARKAN ID DAN OWNER YANG SAH
    const { data: jobData, error: dbError } = await supabase
      .from("jobsheets")
      .select("*")
      .eq("id", parseInt(cleanIdForQuery))
      .eq("owner_username", matchedStore.owner_username)
      .single();

    if (dbError || !jobData) {
      setError(`ID Tracking VSF-${cleanIdForQuery} tidak ditemukan di sistem konter ini.`);
      setLoading(false);
      return;
    }

    // Berhasil tembus!
    setBookingData(jobData);
  } catch (err) {
    setError("Korslet jaringan: " + err.message);
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
                    <span className="font-semibold uppercase">{bookingData.customerName}</span>
                  </div>
                  <div className="flex justify-between">
  <span className="text-gray-400">Tipe Perangkat</span>
  <span className="text-white font-bold">
    {`${bookingData.brand || "IPHONE"} ${bookingData.deviceModel || bookingData.device || "XS MAX"}`.toUpperCase()}
  </span>
</div>
                  <div className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Estimasi Biaya</span>
                    <span className="font-bold text-green-400">
                      Rp {Number(bookingData.estimatedPrice).toLocaleString("id-ID")}
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
                    <p className="italic text-gray-300">"{bookingData.problem}"</p>
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
          <Link href={`/${(params?.toko_slug || params?.slug) as string}`} className="text-gray-500 hover:text-[#d4af37] text-sm transition-colors">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}