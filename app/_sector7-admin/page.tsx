"use client";

import { useState, useEffect } from "react";
import { supabase } from '@/app/lib/supabase';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ totalBookings: 0, activeRepairs: 0, completedToday: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Ambil Data Booking dari Supabase
      const { data, error } = await supabase
        .from('service_bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5); // Ambil 5 terbaru saja untuk dashboard

      if (!error && data) {
        setRecentBookings(data);
        setStats(prev => ({ ...prev, totalBookings: data.length }));
      }
    } catch (e) {
      console.error("Gagal load data dashboard", e);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* 1. HEADER DASHBOARD */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">DASHBOARD OVERVIEW</h1>
          <p className="text-gray-500 text-sm">Selamat datang kembali di sistem kendali Sector 7 Lab.</p>
        </div>
        <div className="text-right">
          <p className="text-[#d4af37] font-mono text-sm font-bold uppercase">{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* 2. STATS CARDS (RINGKASAN CEPAT) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151515] border border-white/5 p-6 rounded-2xl shadow-xl">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Bookings</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-white">{stats.totalBookings}</h3>
            <span className="text-green-500 text-xs font-bold mb-2">+12%</span>
          </div>
        </div>

        <div className="bg-[#151515] border border-white/5 p-6 rounded-2xl shadow-xl">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Active Repairs</p>
          <div className="flex items-end gap-3">
            <h3 className="text-4xl font-black text-[#d4af37]">0</h3>
            <span className="text-gray-600 text-xs font-bold mb-2">On Workshop</span>
          </div>
        </div>

        <div className="bg-[#151515] border border-[#d4af37]/20 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-[#d4af37]/5 to-transparent">
          <p className="text-[#d4af37] text-xs font-bold uppercase tracking-widest mb-1">Revenue Estimate</p>
          <div className="flex items-end gap-3">
            <h3 className="text-3xl font-black text-white">Rp 0</h3>
          </div>
        </div>
      </div>

      {/* 3. TABEL UTAMA (INFORMASI TERKINI) */}
      <section className="bg-[#151515] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="text-white font-bold text-lg">Recent Activities</h2>
            <p className="text-gray-500 text-xs">Informasi antrian masuk dari pelanggan.</p>
          </div>
          <button onClick={fetchDashboardData} className="bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold px-4 py-2 rounded-full transition-all">REFRESH DATA</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20 text-gray-500 text-[10px] uppercase tracking-tighter">
              <tr>
                <th className="p-5">Customer / Device</th>
                <th className="p-5">Status</th>
                <th className="p-5">Issue</th>
                <th className="p-5 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-10 text-center text-gray-600 italic">Belum ada data aktivitas terbaru...</td>
                </tr>
              ) : recentBookings.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-5">
                    <div className="font-bold text-white group-hover:text-[#d4af37] transition-colors">{item.name}</div>
                    <div className="text-[10px] text-gray-500">{item.device_model}</div>
                  </td>
                  <td className="p-5">
                    <span className="bg-blue-500/10 text-blue-400 text-[9px] px-2 py-1 rounded-full font-bold border border-blue-500/20 uppercase">
                      {item.status || 'NEW'}
                    </span>
                  </td>
                  <td className="p-5 text-gray-400 text-xs max-w-[200px] truncate">{item.issue}</td>
                  <td className="p-5 text-right text-gray-600 font-mono text-[10px]">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. FOOTER INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
          <h4 className="text-blue-400 font-bold text-xs mb-2 italic">Sistem Cloud (Supabase)</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Menampilkan data yang dikirim oleh customer melalui form booking di website utama.</p>
        </div>
        <div className="p-6 bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/10">
          <h4 className="text-[#d4af37] font-bold text-xs mb-2 italic">Workshop Management</h4>
          <p className="text-gray-500 text-xs leading-relaxed">Silakan pindah ke menu "Repair" untuk mengelola teknis pengerjaan unit di workshop.</p>
        </div>
      </div>

    </div>
  );
}