import { useEffect, useRef, useState } from 'react'

const services = [
  { name: 'Corporate Website Development', icon: '🌐' },
  { name: 'Brand Identity Design', icon: '✦' },
  { name: 'UI/UX Strategy', icon: '◈' },
  { name: 'SEO Optimization', icon: '◎' },
  { name: 'Analytics Consulting', icon: '▲' },
  { name: 'Cloud Solutions', icon: '❖' },
]

export default function Services() {
  const [visible, setVisible] = useState([])
  const [hovered, setHovered] = useState(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(prev => [...prev, i])
        },
        { threshold: 0.2 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach(o => o && o.disconnect())
  }, [])

  return (
    <section id="services" className="py-24 px-8 overflow-hidden">
      <style>{`
        @keyframes goldShimmerS {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text-s {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmerS 4s linear infinite;
        }
        @keyframes slideUpS {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-visible {
          animation: slideUpS 0.6s ease forwards;
        }
        .service-hidden {
          opacity: 0;
          transform: translateY(50px);
        }
        .service-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #D4AF3710, #FFD70005);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 1.5rem;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 48px rgba(212, 175, 55, 0.2);
        }
        .service-icon {
          font-size: 2rem;
          color: #D4AF37;
          transition: transform 0.4s ease;
          display: inline-block;
        }
        .service-card:hover .service-icon {
          transform: scale(1.3) rotate(10deg);
        }
        .gold-bar {
          height: 2px;
          width: 0;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          transition: width 0.5s ease;
          border-radius: 999px;
          margin-bottom: 1rem;
        }
        .service-card:hover .gold-bar {
          width: 100%;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0px #D4AF3740; }
          50% { box-shadow: 0 0 20px #D4AF3760; }
        }
        .service-card:hover {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif shimmer-text-s mb-4 inline-block">Our Services</h2>
        <p className="text-[#8A7540] mb-12 tracking-widest uppercase text-sm">
          Premium solutions for distinguished brands
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div
              key={service.name}
              ref={el => cardRefs.current[i] = el}
              className={`service-card bg-white/70 border border-[#D4AF37]/20 p-8 rounded-3xl shadow-lg
                ${visible.includes(i) ? 'service-visible' : 'service-hidden'}
              `}
              style={{ animationDelay: `${i * 0.12}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="service-icon mb-4">{service.icon}</div>
              <div className="gold-bar" />
              <h3 className="text-xl font-semibold mb-3 text-[#4A3B18]">{service.name}</h3>
              <p className="text-[#7A6A3A] leading-7">Premium and scalable solutions tailored to business excellence.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}