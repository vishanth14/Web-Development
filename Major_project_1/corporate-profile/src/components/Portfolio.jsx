import { useState, useEffect, useRef } from 'react'

const fallbackPortfolio = [
  {
    title: "Luxury Brand Identity",
    description: "Complete digital identity system for a premium lifestyle brand including web presence and brand guidelines.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Corporate Web Platform",
    description: "High-performance Next.js website with CMS integration for a multinational consulting firm.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "E-Commerce Experience",
    description: "Premium e-commerce platform with custom checkout flow and analytics dashboard.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "SaaS Product Design",
    description: "End-to-end UX/UI design and frontend development for a B2B SaaS platform.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
  }
]

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([])
  const [loading, setLoading] = useState(true)
  const [hovered, setHovered] = useState(null)
  const [visible, setVisible] = useState([])
  const cardRefs = useRef([])

  useEffect(() => {
    const base = "https://outpro-backend-4yr0.onrender.com"

    fetch(`${base}/api/content/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(data => {
        const result = Array.isArray(data) ? data : data.data || []
        setPortfolio(result.length ? result : fallbackPortfolio)
        setLoading(false)
      })
      .catch(() => {
        setPortfolio(fallbackPortfolio)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => [...new Set([...prev, i])])
          }
        },
        { threshold: 0.2 }
      )

      observer.observe(ref)
      return observer
    })

    return () => observers.forEach(o => o && o.disconnect())
  }, [portfolio])

  return (
    <section id="portfolio" className="py-28 px-8 overflow-hidden">
      <style>{`
        @keyframes goldShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .shimmer-text {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShimmer 4s linear infinite;
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-visible {
          animation: slideUpFade 0.7s ease forwards;
        }

        .card-hidden {
          opacity: 0;
          transform: translateY(60px);
        }

        .portfolio-img {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.6s ease;
        }

        .portfolio-img:hover {
          transform: scale(1.04);
          box-shadow: 0 30px 60px rgba(212, 175, 55, 0.3);
        }

        .gold-line {
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #D4AF37, #FFD700);
          transition: width 0.5s ease;
        }

        .card-hover .gold-line {
          width: 100%;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-serif shimmer-text mb-6 inline-block">
          Selected Work
        </h2>

        <p className="text-lg text-[#6E5A28] mb-16 max-w-2xl">
          A glimpse into premium digital solutions crafted for forward-thinking organizations.
        </p>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="rounded-3xl bg-[#D4AF37]/10 h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10">
            {portfolio.map((item, index) => (
              <div
                key={item._id || index}
                ref={el => cardRefs.current[index] = el}
                className={`
                  ${index % 2 === 1 ? 'md:translate-y-20' : ''}
                  ${visible.includes(index) ? 'card-visible' : 'card-hidden'}
                  ${hovered === index ? 'card-hover' : ''}
                `}
                style={{ animationDelay: `${index * 0.15}s` }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative overflow-hidden rounded-3xl mb-4">
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.title}
                    className="portfolio-img w-full object-cover h-64 rounded-3xl"
                  />
                </div>

                <div className="gold-line mb-3 rounded-full" />

                <h3 className="text-2xl font-serif text-[#B8860B] transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-[#6E5A28] mt-2 leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}