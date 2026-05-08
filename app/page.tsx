import Navbar from "@/app/components/Navbar";
import Hero from '@/app/components/Hero';
import TrackingStatus from '@/app/components/TrackingStatus';
import Services from '@/app/components/Services';
import Footer from '@/app/components/Footer';
import BookingForm from "./components/BookingForm";
import PriceEstimator from "./components/PriceEstimator";
import Testimonials from "./components/Testimonial";
import Payment from "./components/Payment";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <PriceEstimator />
      <BookingForm />
      <Payment />
      <Testimonials />
      <Footer />
      
      {/* Service Grid Section */}
      <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="font-playfair text-4xl text-center text-white mb-16 underline decoration-[#D4AF37] underline-offset-8">Our Signature Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'LCD Replacement', desc: 'Original quality display with vibrant colors.' },
            { title: 'Battery Health', desc: 'Premium battery cells for long-lasting power.' },
            { title: 'Motherboard Repair', desc: 'Expert micro-soldering for complex issues.' }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all group">
              <div className="w-12 h-12 bg-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors">
                <div className="w-6 h-6 border-2 border-[#D4AF37] group-hover:border-black"></div>
              </div>
              <h3 className="text-xl text-white font-bold mb-3 uppercase tracking-wider">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <TrackingStatus />

      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-600 text-sm tracking-[0.2em]">
          &copy; 2026 SECTOR7LAB. PRIVACY POLICY. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}