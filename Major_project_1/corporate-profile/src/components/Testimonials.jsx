import { useState, useEffect, useRef } from 'react'

const fallbackTestimonials = [
  {
    message: "Outpro India transformed our digital presence completely. The attention to detail and premium quality of work exceeded our expectations.",
    name: "Vishanth K",
    company: "Vishanth Group, Mumbai"
  },
  {
    message: "Working with Outpro India was seamless. They delivered a world-class website that truly reflects our brand's prestige.",
    name: "Ajith Kumar",
    company: "Kumar Enterprises, Bangalore"
  },
  {
    message: "Exceptional strategy, design, and engineering. Our lead generation improved significantly after the new platform launched.",
    name: "Ranveer Singh",
    company: "Singh Holdings, Delhi"
  }
]

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState([])
  const cardRefs = useRef([])

  useEffect(() => {
    const base = import.meta.env.VITE_API_URL || ""
    fetch(`${base}/api/content/testimonials`)
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(data => {
        const result = Array.isArray(data) ? data : data.data || []
        setTestimonials(result.length ? result : fallbackTestimonials)
        setLoading(false)
      })
      .catch(() => {
        setTestimonials(fallbackTestimonials)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => [...prev, i])
          }
        },
        { threshold: 0.2 }
      )
      observer.observe(ref)
      return observer
    })
    return () => observers.forEach(o => o && o.disconnect())
  }, [testimonials])

  return (
    <section className="py-28 px-8 overflow-hidden" id="testimonials">
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text-t {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 4s linear infinite;
        }
        @keyframes slideUpFadeT {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card-visible-t {
          animation: slideUpFadeT 0.7s ease forwards;
        }
        .card-hidden-t {
          opacity: 0;
          transform: translateY(60px);
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-card {
          animation: floatCard 4s ease-in-out infinite;
        }
        .testimonial-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 24px 48px rgba(212, 175, 55, 0.25);
          background: linear-gradient(135deg, #fff9ee, #ffffff);
        }
        .quote-icon {
          font-size: 4rem;
          line-height: 1;
          color: #D4AF37;
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        .testimonial-card:hover .quote-icon {
          opacity: 0.5;
        }
        .gold-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D4AF37;
          display: inline-block;
          margin-right: 6px;
          box-shadow: 0 0 6px #D4AF37;
        }
        .stars {
          color: #D4AF37;
          letter-spacing: 2px;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-serif shimmer-text-t mb-4 text-center inline-block w-full">
          What Clients Say
        </h2>
        <p className="text-center text-[#8A7540] mb-16 tracking-widest uppercase text-sm">
          Trusted by premium brands across India
        </p>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-3xl bg-[#D4AF37]/10 h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <div
                key={item._id || index}
                ref={el => cardRefs.current[index] = el}
                className={`testimonial-card bg-white/80 p-8 rounded-3xl shadow-lg border border-[#D4AF37]/10
                  ${visible.includes(index) ? 'card-visible-t' : 'card-hidden-t'}
                  ${hovered === index ? 'float-card' : 'md:translate-y-10'}
                `}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="quote-icon">"</div>

                <div className="stars mb-3">★★★★★</div>

                <p className="italic text-[#6E5A28] leading-8 mt-2">"{item.message}"</p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center text-white font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#4A3B18] flex items-center">
                      <span className="gold-dot" />
                      {item.name}
                    </h4>
                    <span className="text-sm text-[#8A7540]">{item.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}