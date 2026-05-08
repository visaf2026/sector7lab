"use client";
import { useState } from "react";

const PRICE_LIST = [
  { device: "iPhone XR", lcd: 850000, battery: 350000, housing: 450000 },
  { device: "iPhone 11", lcd: 1100000, battery: 450000, housing: 550000 },
  { device: "iPhone 12", lcd: 1800000, battery: 650000, housing: 800000 },
  { device: "iPhone 13", lcd: 2500000, battery: 850000, housing: 950000 },
];

export default function PriceEstimator() {
  const [selectedDevice, setSelectedDevice] = useState(PRICE_LIST[0]);

  return (
    <section id="prices" className="py-24 px-6 bg-[#050505]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-playfair text-center text-[#D4AF37] mb-12 uppercase tracking-widest">
          Service Price Estimator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border border-white/10 p-8 bg-white/5 backdrop-blur-md">
          {/* Sisi Kiri: Pilih Device */}
          <div>
            <label className="text-gray-400 text-sm block mb-2 uppercase">Select Device Model</label>
            <select 
              onChange={(e) => setSelectedDevice(PRICE_LIST.find(d => d.device === e.target.value) || PRICE_LIST[0])}
              className="w-full bg-black border border-[#D4AF37]/30 p-4 text-white outline-none focus:border-[#D4AF37] appearance-none cursor-pointer"
            >
              {PRICE_LIST.map((item) => (
                <option key={item.device} value={item.device}>{item.device}</option>
              ))}
            </select>
            <p className="mt-4 text-xs text-gray-500 italic">
              *Harga estimasi termasuk biaya pasang & garansi 3 bulan.
            </p>
          </div>

          {/* Sisi Kanan: Daftar Harga */}
          <div className="space-y-4">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-300">LCD Replacement</span>
              <span className="text-[#D4AF37] font-bold">Rp {selectedDevice.lcd.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-300">Battery Health</span>
              <span className="text-[#D4AF37] font-bold">Rp {selectedDevice.battery.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-300">Housing / Backglass</span>
              <span className="text-[#D4AF37] font-bold">Rp {selectedDevice.housing.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}