"use client";
import { useState } from 'react';
import { CreditCard, Wallet, Landmark, ShieldCheck, ArrowRight } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'ewallet', name: 'E-Wallet / QRIS', icon: Wallet, desc: 'Dana, OVO, GoPay, ShopeePay' },
  { id: 'va', name: 'Virtual Account', icon: Landmark, desc: 'BCA, Mandiri, BNI, BRI' },
  { id: 'cc', name: 'Credit Card', icon: CreditCard, desc: 'Visa, Mastercard, JCB' },
];

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('ewallet');
  const [amount, setAmount] = useState('');

  const handlePayment = () => {
    alert(`Mengalihkan ke gerbang pembayaran aman... \nMetode: ${selectedMethod} \nTotal: Rp ${amount}`);
    // Di sini nantinya Anda memanggil API Midtrans/Xendit
  };

  return (
    <section id="payment" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl text-white mb-4">Pembayaran Aman</h2>
          <p className="text-gray-400">Selesaikan pembayaran servis Anda secara instan.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Sisi Kiri: Detail Pembayaran */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-white/10">
              <label className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold block mb-4">Nominal Pembayaran</label>
              <div className="relative mb-8">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                <input 
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-2xl text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                />
              </div>

              <div className="space-y-4">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#D4AF37]" />
                  Enkripsi SSL 256-bit Aman
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Dengan mengklik tombol bayar, Anda menyetujui syarat dan ketentuan layanan Sector7lab.
                </p>
              </div>
            </div>

            {/* Sisi Kanan: Metode Pembayaran */}
            <div className="p-8 bg-white/[0.02]">
              <label className="text-[#D4AF37] text-xs uppercase tracking-[0.2em] font-bold block mb-6">Pilih Metode</label>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${
                        selectedMethod === method.id 
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                        : 'border-white/5 bg-black/20 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        selectedMethod === method.id ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-gray-400'
                      }`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-bold">{method.name}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{method.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button 
                onClick={handlePayment}
                className="w-full mt-8 bg-[#D4AF37] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-yellow-500 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.2)] group"
              >
                BAYAR SEKARANG
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}