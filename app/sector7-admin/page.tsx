'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('service_bookings')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setBookings(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  // FUNGSI BARU: Update Status ke Supabase
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('service_bookings')
        .update({ status: newStatus })
        .eq('id', id) // Mencari data berdasarkan ID

      if (error) throw error
      
      // Refresh data di layar setelah berhasil update
      fetchBookings() 
      alert(`Status berhasil diubah ke ${newStatus}`)
    } catch (error) {
      console.error('Error update:', error)
      alert('Gagal update status')
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sector7Lab Admin Dashboard</h1>
        <button onClick={fetchBookings} className="bg-slate-700 px-4 py-2 rounded hover:bg-slate-600">
          Refresh Data
        </button>
      </div>
      
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div className="overflow-x-auto bg-slate-800 rounded-lg border border-slate-700">
          <table className="w-full text-left">
           <thead>
  <tr className="bg-slate-700/50">
    <th className="p-4">Pelanggan & Unit</th>
    <th className="p-4">WhatsApp</th> {/* Kolom Baru */}
    <th className="p-4">Kendala</th>
    <th className="p-4">Status</th>
    <th className="p-4 text-center">Aksi</th>
  </tr>
</thead>
<tbody>
  {bookings.map((item: any) => (
    <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-800/50">
      <td className="p-4">
        <div className="font-bold text-white">{item.name}</div>
        <div className="text-xs text-cyan-400 font-mono">{item.booking_id}</div>
        <div className="text-[10px] text-slate-400">{item.device_model}</div>
      </td>
      
      {/* KOLOM WHATSAPP DENGAN TOMBOL OTOMATIS */}
      <td className="p-4">
        <a 
          href={`https://wa.me/${item.phone?.replace(/[^0-9]/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 flex items-center gap-1 text-sm font-medium"
        >
          <span className="bg-green-900/30 px-2 py-1 rounded border border-green-800">
            {item.phone} ↗
          </span>
        </a>
      </td>

      <td className="p-4 text-sm text-slate-300">{item.issue}</td>
      
      <td className="p-4">
        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
          item.status === 'DONE' ? 'bg-green-900 text-green-300' : 
          item.status === 'CANCEL' ? 'bg-red-900 text-red-300' : 'bg-yellow-900 text-yellow-300'
        }`}>
          {item.status}
        </span>
      </td>

      <td className="p-4">
        <div className="flex justify-center gap-2">
          <button 
            onClick={() => updateStatus(item.id, 'DONE')}
            className="bg-green-600 hover:bg-green-500 text-white text-[10px] px-2 py-1 rounded"
          >
            Selesai
          </button>
          <button 
            onClick={() => updateStatus(item.id, 'CANCEL')}
            className="bg-red-600 hover:bg-red-500 text-white text-[10px] px-2 py-1 rounded"
          >
            Batal
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      )}
    </div>
  )
}