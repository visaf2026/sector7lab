'use client'

import { useState } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function TrackingPage() {
  const [bookingId, setBookingId] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setNotFound(false)

    try {
      // Koneksi ke Supabase - Mencari berdasarkan booking_id
      const { data, error } = await supabase
        .from('service_bookings')
        .select('*')
        .eq('booking_id', bookingId.toUpperCase().trim()) // Trim untuk hapus spasi tak sengaja
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setResult(data)
      }
    } catch (err) {
      console.error(err)
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <div className="max-w-md mx-auto mt-16">
        {/* Header - Gold Style */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-[#D4AF37] tracking-tighter">
          TRACKING STATUS
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-widest">Sector7 Electronics Lab</p>
        
        <form onSubmit={handleTracking} className="flex flex-col gap-3 mb-10">
          <input 
            type="text" 
            placeholder="KODE BOOKING (ST7-XXXX)" 
            className="w-full p-4 rounded-lg bg-zinc-900 border border-[#D4AF37]/30 text-[#D4AF37] outline-none focus:border-[#D4AF37] text-center font-mono placeholder:text-zinc-600 transition-all"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-[#D4AF37] text-black font-black py-4 rounded-lg hover:bg-[#B8962E] transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] active:scale-95"
            disabled={loading}
          >
            {loading ? 'MENGECEK...' : 'CEK STATUS SEKARANG'}
          </button>
        </form>

        {/* Not Found Message */}
        {notFound && (
          <div className="text-center p-4 border border-red-900/50 bg-red-950/20 rounded-lg">
            <p className="text-red-500 text-sm italic">Waduh, kode tidak terdaftar. Coba cek lagi struknya, Min.</p>
          </div>
        )}

        {/* Result Card - Luxury Black & Gold */}
        {result && (
          <div className="bg-zinc-900 border-2 border-[#D4AF37] p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,1)] relative overflow-hidden">
            {/* Dekorasi Aksen Emas di pojok */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#D4AF37] opacity-10 rotate-45 translate-x-8 -translate-y-8"></div>
            
            <div className="mb-6 border-b border-[#D4AF37]/20 pb-4">
              <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-widest mb-1">Status Perbaikan</p>
              <h2 className={`text-2xl font-black ${
                result.status === 'DONE' ? 'text-green-500' : 'text-[#D4AF37] animate-pulse'
              }`}>
                {result.status === 'DONE' ? '✓ SELESAI' : '⏳ DALAM PENGERJAAN'}
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Unit</p>
                <p className="font-bold text-white uppercase">{result.device_model}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase">Pemilik</p>
                <p className="font-bold text-white uppercase">{result.name}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-black/50 rounded-lg border border-[#D4AF37]/10">
              <p className="text-sm text-gray-300 leading-relaxed italic">
                "{result.status === 'DONE' 
                  ? 'Unit sudah lulus QC dan siap jemput! Jangan lupa bawa kode booking ini ya.' 
                  : 'Sabar ya kak, teknisi kami sedang menangani bagian ' + result.issue + '. Kualitas adalah prioritas kami.'}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}