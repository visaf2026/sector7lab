export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-black to-black"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="font-playfair text-5xl md:text-8xl font-bold mb-6 text-white leading-tight">
          Elegance in <br />
          <span className="bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-700 bg-clip-text text-transparent">
            Sector7lab
          </span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light tracking-wide">
          Layanan servis eksklusif untuk perangkat premium Anda. Profesional, transparan, dan bergaransi.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-[#D4AF37] text-black px-10 py-4 font-bold hover:bg-yellow-500 transition shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            PESAN SERVIS
          </button>
          <a href="#tracking" className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-10 py-4 font-bold hover:bg-white/10 transition">
            CEK STATUS
          </a>
        </div>
      </div>
    </section>
  );
}