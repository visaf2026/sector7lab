"use client";

import { useState } from "react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    deviceModel: "",
    issue: "",
    serviceDate: ""
  });

  const [lastBookingId, setLastBookingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Membuat ID Unik
    const bookingId = `ST7-${Math.floor(Math.random() * 10000)}`;
    
    const newBooking = {
      ...formData,
      id: bookingId,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    // Simpan ke LocalStorage
    try {
      const existingBookings = JSON.parse(localStorage.getItem("service_bookings") || "[]");
      localStorage.setItem("service_bookings", JSON.stringify([...existingBookings, newBooking]));
      
      setLastBookingId(bookingId);
      setShowSuccess(true);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsApp = () => {
    const message = `Halo Sector7Lab, saya ingin konfirmasi booking servis:%0A%0A*ID:* ${lastBookingId}%0A*Nama:* ${formData.name}%0A*Device:* ${formData.deviceModel}%0A*Keluhan:* ${formData.issue}`;
    window.open(`https://wa.me/628888771981?text=${message}`, "_blank");
  };

  return (
    <section id="booking" className="py-20 bg-black text-white px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-playfair mb-8 border-b border-[#D4AF37] pb-2 inline-block uppercase tracking-widest text-[#D4AF37]">
          Book a Repair
        </h2>

        {showSuccess ? (
          /* ============================================================
             TAMPILAN SUKSES (SETELAH KLIK CONFIRM)
             ============================================================ */
          <div className="p-8 border border-[#D4AF37] bg-[#D4AF37]/5 text-center animate-in fade-in duration-500">
            <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 uppercase tracking-widest">Booking Registered!</h3>
            <p className="text-gray-300 mb-2 text-sm">Nomor Tracking Anda:</p>
            <div className="text-3xl font-mono text-white mb-8 bg-white/10 py-4 inline-block px-8 border border-white/10">
              {lastBookingId}
            </div>
            
            <div className="flex flex-col gap-4 max-w-sm mx-auto">
              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white font-bold py-4 px-6 rounded-sm hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
              >
                <span>📱</span> Kirim Detail ke WhatsApp
              </button>

              <button
                onClick={handlePrint}
                className="bg-white text-black font-bold py-4 px-6 hover:bg-gray-200 transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
              >
                <span>🖨️</span> Cetak Struk Fisik
              </button>
              
              <button 
                onClick={() => {
                  setShowSuccess(false);
                  setFormData({ name: "", phone: "", deviceModel: "", issue: "", serviceDate: "" });
                }}
                className="text-gray-500 hover:text-white text-xs underline mt-4"
              >
                Buat Pesanan Baru
              </button>
            </div>

            {/* --- AREA STRUK (TERSEMBUNYI DI LAYAR, MUNCUL SAAT PRINT) --- */}
            <div className="hidden-print-area">
              <div className="receipt-container p-6 text-black bg-white font-mono text-[12px] leading-tight w-[80mm] mx-auto text-left border border-gray-200">
                <div className="text-center border-b border-dashed border-black pb-3 mb-3">
                  <h2 className="font-bold text-lg">SECTOR7LAB</h2>
                  <p>iPhone Repair Specialist</p>
                  <p className="text-[10px]">Jl. Kualabuha Ling5 Kec Bunaken, Kota Manado</p>
                  <p className="text-[10px]">WA: 0813-3332-981</p>
                </div>
                
                <div className="mb-3 space-y-1">
                  <p>TANGGAL : {new Date().toLocaleString("id-ID")}</p>
                  <p>NO. ID  : <span className="font-bold">{lastBookingId}</span></p>
                  <p>NAMA    : {formData.name}</p>
                  <p>TELP    : {formData.phone}</p>
                </div>

                <div className="border-b border-dashed border-black mb-3"></div>
                
                <div className="mb-4 space-y-1">
                  <p className="font-bold underline">UNIT DETAIL:</p>
                  <p>Model  : {formData.deviceModel}</p>
                  <p>Keluhan: {formData.issue}</p>
                  <p>Status : PENDING / PENGECEKAN</p>
                </div>

                <div className="border-b border-dashed border-black mb-3"></div>

                <div className="text-[9px] leading-tight mb-6">
                  <p className="font-bold mb-1 italic">SYARAT & KETENTUAN:</p>
                  <p>1. Unit tidak diambil {" > "} 30 hari di luar tanggung jawab kami.</p>
                  <p>2. Backup data Anda. Data hilang bukan tanggung jawab kami.</p>
                  <p>3. Garansi hanya berlaku pada sparepart yang diganti.</p>
                  <p>4. Segel rusak atau terbongkar = Garansi Hangus.</p>
                  <p>5. Pembatalan setelah pengerjaan kena biaya cek Rp 50.000.</p>
                </div>

                <div className="text-center pt-6 border-t border-dashed border-black">
                  <p>Tanda Tangan Pelanggan,</p>
                  <br /><br /><br />
                  <p>( ____________________ )</p>
                  <p className="mt-4 font-bold text-[10px]">TRUSTED REPAIR SOLUTION</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ============================================================
             TAMPILAN FORM (SEBELUM BERHASIL)
             ============================================================ */
          <form onSubmit={handleSaveBooking} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none text-white transition-all"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Nomor WhatsApp"
                value={formData.phone}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none text-white transition-all"
                required
              />
            </div>
            <input
              type="text"
              name="deviceModel"
              placeholder="Tipe Perangkat (Contoh: iPhone 13 Pro)"
              value={formData.deviceModel}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 focus:border-[#D4AF37] outline-none text-white transition-all"
              required
            />
            <textarea
              name="issue"
              placeholder="Jelaskan kerusakan perangkat Anda..."
              value={formData.issue}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 p-4 h-32 focus:border-[#D4AF37] outline-none text-white transition-all"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-black font-bold py-5 hover:bg-[#b8962d] transition-all uppercase tracking-[0.2em] shadow-lg"
            >
              Konfirmasi Booking
            </button>
          </form>
        )}
      </div>

      {/* --- CSS KHUSUS PRINT --- */}
      <style jsx global>{`
        @media screen {
          .hidden-print-area { display: none !important; }
        }
        @media print {
          body * { visibility: hidden !important; }
          .hidden-print-area, .hidden-print-area * { visibility: visible !important; }
          .hidden-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          @page {
            size: auto;
            margin: 0mm;
          }
        }
      `}</style>
    </section>
  );
}