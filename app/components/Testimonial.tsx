"use client";
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  { name: "Andi Wijaya", device: "iPhone 13 Pro", comment: "Servis LCD sangat rapi, warna layar tetap tajam seperti original. Sangat puas!", rating: 5 },
  { name: "Siska Putri", device: "Samsung S22 Ultra", comment: "Sistem tracking-nya keren banget, jadi gak perlu bolak-balik tanya admin lewat WA.", rating: 5 },
  { name: "Budi Santoso", device: "iPhone 11", comment: "Ganti baterai cuma 30 menit. Teknisi ramah dan tempatnya sangat premium.", rating: 5 },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-playfair text-4xl text-center text-white mb-16 underline decoration-[#D4AF37] underline-offset-8 italic">
          What Our Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev, i) => (
            <div key={i} className="relative p-8 bg-gradient-to-br from-white/10 to-transparent border border-white/5 rounded-3xl backdrop-blur-sm">
              <Quote className="absolute top-4 right-4 text-[#D4AF37]/20" size={40} />
              
              <div className="flex gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 font-light italic leading-relaxed">"{rev.comment}"</p>
              
              <div>
                <h5 className="text-white font-bold">{rev.name}</h5>
                <p className="text-[#D4AF37] text-xs uppercase tracking-widest">{rev.device}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}