import { useEffect, useState } from 'react'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100)
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const parallaxX = (mousePos.x / window.innerWidth - 0.5) * 15
  const parallaxY = (mousePos.y / window.innerHeight - 0.5) * 15

  return (
    <section className="min-h-screen pt-36 px-8 flex items-center overflow-hidden" id="home">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes goldShimmerH {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px #D4AF3740; }
          50% { box-shadow: 0 0 40px #D4AF3770; }
        }
        @keyframes expandWidth {
          from { width: 0; }
          to { width: 120px; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hero-tag { opacity: 0; animation: fadeUp 0.6s ease forwards; animation-delay: 0.1s; }
        .hero-h1 { opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: 0.3s; }
        .hero-quote { opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: 0.45s; }
        .hero-p { opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: 0.5s; }
        .hero-cta { opacity: 0; animation: fadeUp 0.7s ease forwards; animation-delay: 0.7s; }
        .hero-img-wrap { opacity: 0; animation: fadeRight 0.9s ease forwards; animation-delay: 0.4s; }
        .shimmer-h1 {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmerH 4s linear infinite;
          display: inline-block;
        }
        .hero-img { animation: float 6s ease-in-out infinite; }
        .cta-btn { animation: glowPulse 3s ease-in-out infinite; transition: transform 0.3s ease; }
        .cta-btn:hover { transform: scale(1.1) translateY(-4px); }
        .gold-line-h { height: 3px; background: linear-gradient(90deg, #D4AF37, #FFD700); border-radius: 999px; width: 0; animation: expandWidth 1s ease forwards; animation-delay: 0.8s; }
        .orbit-ring { position: absolute; border-radius: 50%; border: 1px solid #D4AF3730; animation: spinSlow 12s linear infinite; }
        .badge { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .badge:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(212,175,55,0.3); }
      `}</style>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center relative w-full">

        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#B8860B]/5 blur-3xl pointer-events-none" />

        <div>
          <p className="hero-tag uppercase tracking-[0.3em] text-sm mb-4 text-[#A17B16]">✦ Outpro India 2026 ✦</p>

          <h1 className="hero-h1 text-6xl md:text-8xl font-serif leading-[0.95] mb-4">
            <span className="shimmer-h1">Crafted To<br />Define Prestige</span>
          </h1>

          <blockquote className="hero-quote border-l-4 border-[#D4AF37] pl-5 mb-4 italic text-[#8A7540] text-lg leading-8">
            "Your brand is the promise you make. Your website is where that promise lives."
          </blockquote>

          <div className={`gold-line-h mb-6 ${loaded ? '' : 'hidden'}`} />

          <p className="hero-p text-lg max-w-xl leading-8 text-[#6E5A28] mb-8">
            Outpro India builds digital experiences for brands that demand distinction. Elegant strategy, premium design, and refined engineering.
          </p>

          <div className="hero-cta flex items-center gap-6 flex-wrap mb-10">
            <a href="#portfolio" className="cta-btn px-10 py-4 rounded-full bg-[#D4AF37] text-white font-semibold shadow-lg">
              View Portfolio
            </a>
            <a href="#contact" className="px-10 py-4 rounded-full border border-[#D4AF37] text-[#B8860B] font-semibold transition duration-300 hover:bg-[#D4AF37] hover:text-white">
              Contact Us
            </a>
          </div>

          <div className="flex gap-6 flex-wrap">
            {[{ value: '50+', label: 'Projects' }, { value: '30+', label: 'Clients' }, { value: '5+', label: 'Years' }].map(stat => (
              <div key={stat.label} className="badge bg-white/60 border border-[#D4AF37]/20 rounded-2xl px-5 py-3 shadow text-center">
                <p className="text-xl font-bold text-[#B8860B]">{stat.value}</p>
                <p className="text-xs text-[#7A6A3A] tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-img-wrap flex justify-center lg:justify-end relative">
          <div className="orbit-ring w-[420px] h-[420px] absolute -top-4 -right-4" />
          <div className="orbit-ring w-[480px] h-[480px] absolute -top-8 -right-8" style={{ animationDirection: 'reverse', animationDuration: '18s' }} />

          <img
            src="https://images.unsplash.com/photo-1774953037913-af0cf688491a?q=80&w=1633&auto=format&fit=crop"
            alt="Corporate Team"
            className="hero-img w-full max-w-xl rounded-3xl shadow-2xl border border-[#D4AF37]/20 relative z-10"
            style={{ transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)` }}
          />

          <div className="absolute bottom-6 left-0 z-20 bg-white/90 backdrop-blur-sm border border-[#D4AF37]/30 rounded-2xl px-5 py-3 shadow-xl badge">
            <p className="text-xs uppercase tracking-widest text-[#8A7540]">Latest Project</p>
            <p className="font-semibold text-[#B8860B]">Luxury Brand Identity ✦</p>
          </div>
        </div>
      </div>
    </section>
  )
}