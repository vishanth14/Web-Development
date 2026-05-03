import { useEffect, useRef, useState } from 'react'

export default function About() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 px-8 overflow-hidden" ref={sectionRef}>
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes goldShimmerA {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text-a {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmerA 4s linear infinite;
        }
        .slide-left {
          animation: slideInLeft 0.8s ease forwards;
        }
        .slide-right {
          animation: slideInRight 0.8s ease forwards;
        }
        .about-img {
          transition: transform 0.6s ease, box-shadow 0.6s ease;
        }
        .about-img:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 30px 60px rgba(212, 175, 55, 0.25);
        }
        @keyframes expandLine {
          from { width: 0; }
          to { width: 80px; }
        }
        .gold-accent-line {
          height: 3px;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          border-radius: 999px;
          width: 0;
          animation: expandLine 1s ease forwards;
          animation-delay: 0.6s;
        }
        .stat-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-box:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(212, 175, 55, 0.2);
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className={visible ? 'slide-left' : 'opacity-0'}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=900&q=80"
              alt="Team Meeting"
              className="about-img rounded-3xl shadow-xl w-full object-cover"
            />
            <div className="absolute -bottom-5 -right-5 bg-[#D4AF37] text-white px-6 py-4 rounded-2xl shadow-xl">
              <p className="text-2xl font-bold">5+</p>
              <p className="text-xs tracking-widest uppercase">Years of Excellence</p>
            </div>
          </div>
        </div>

        <div className={`${visible ? 'slide-right' : 'opacity-0'} space-y-6`} style={{ animationDelay: '0.2s' }}>
          <p className="uppercase tracking-[0.3em] text-sm text-[#A17B16]">Who We Are</p>
          <h2 className="text-5xl font-serif shimmer-text-a inline-block">About Us</h2>
          <div className={`gold-accent-line ${visible ? '' : 'hidden'}`} />
          <p className="leading-8 text-[#7A6A3A]">
            We combine strategy, design, and engineering to help businesses establish a distinguished online identity. Our work focuses on premium branding, scalable architecture, and measurable outcomes.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {[
              { value: '50+', label: 'Projects' },
              { value: '30+', label: 'Clients' },
              { value: '99%', label: 'Satisfaction' },
            ].map(stat => (
              <div key={stat.label} className="stat-box bg-white/70 border border-[#D4AF37]/20 rounded-2xl p-4 text-center shadow">
                <p className="text-2xl font-bold text-[#B8860B]">{stat.value}</p>
                <p className="text-xs text-[#7A6A3A] tracking-widest uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}