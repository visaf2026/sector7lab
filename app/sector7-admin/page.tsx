"use client";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false); // Tambahkan ini

  // 1. Pastikan komponen sudah terpasang di browser
  useEffect(() => {
    setIsMounted(true);
    const savedData = localStorage.getItem("service_bookings");
    if (savedData) setBookings(JSON.parse(savedData));
  }, []);

  // 2. Fungsi Update Status
  const updateStatus = (id: string, newStatus: string) => {
    const updated = bookings.map((b) => 
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
    localStorage.setItem("service_bookings", JSON.stringify(updated));
    alert(`Status Order ${id} berhasil diubah ke: ${newStatus}`);
  };

  // 3. Jika belum mounted, jangan render apapun dulu untuk menghindari error hydration
  if (!isMounted) {
    return <div className="min-h-screen bg-black" />; 
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* ... (Sisanya sama seperti kodingan sebelumnya) ... */}
      <h1 className="text-[#D4AF37] text-3xl font-bold mb-8 uppercase tracking-widest border-b border-[#D4AF37] pb-4">
        Sector7Lab - Admin Panel
      </h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-white/10">
          <thead>
            <tr className="bg-white/5 text-[#D4AF37]">
              <th className="p-4 border border-white/10">ID</th>
              <th className="p-4 border border-white/10">Customer</th>
              <th className="p-4 border border-white/10">Device</th>
              <th className="p-4 border border-white/10">Current Status</th>
              <th className="p-4 border border-white/10">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b.id} className="text-center hover:bg-white/5 transition-all">
                  <td className="p-4 border border-white/10 font-mono">{b.id}</td>
                  <td className="p-4 border border-white/10">{b.name}</td>
                  <td className="p-4 border border-white/10">{b.deviceModel}</td>
                  <td className="p-4 border border-white/10">
                    <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs">
                      {b.status}
                    </span>
                  </td>
                  <td className="p-4 border border-white/10 space-x-2">
                    <button 
                      onClick={() => updateStatus(b.id, "PROSES")}
                      className="bg-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-700"
                    >
                      Set Proses
                    </button>
                    <button 
                      onClick={() => updateStatus(b.id, "SELESAI")}
                      className="bg-green-600 px-3 py-1 text-xs rounded hover:bg-green-700"
                    >
                      Set Selesai
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-10 text-gray-500 italic text-center">
                  Belum ada data booking yang masuk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}