import { useState, useEffect, useRef } from 'react'

const fallbackFAQs = [
  {
    question: "What services do you offer?",
    answer: "We offer premium web design, development, branding, and digital strategy services tailored to corporate clients."
  },
  {
    question: "How long does a project take?",
    answer: "Typical projects range from 4 to 12 weeks depending on scope, complexity, and client feedback cycles."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes, we offer maintenance plans covering bug fixes, security updates, and content updates after launch."
  },
  {
    question: "What technologies do you use?",
    answer: "We primarily work with React, Next.js, Node.js, and cloud platforms like AWS and Vercel."
  },
]

export default function FAQ() {
  const [faqs, setFAQs] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)
  const [visible, setVisible] = useState([])
  const itemRefs = useRef([])

  useEffect(() => {
    const base = "https://outpro-backend-4yr0.onrender.com"

    fetch(`${base}/api/content/faq`)
      .then(res => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then(data => {
        setFAQs(data.data || data)
        setLoading(false)
      })
      .catch(() => {
        setFAQs(fallbackFAQs)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const observers = itemRefs.current.map((ref, i) => {
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
  }, [faqs])

  return (
    <section id="faq" className="py-28 px-8 overflow-hidden">
      <style>{`
        @keyframes goldShimmerF {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .shimmer-text-f {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmerF 4s linear infinite;
          display: inline-block;
        }

        @keyframes slideUpF {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .faq-visible {
          animation: slideUpF 0.6s ease forwards;
        }

        .faq-hidden {
          opacity: 0;
          transform: translateY(40px);
        }

        .faq-card {
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          border: 1px solid transparent;
        }

        .faq-card:hover {
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.15);
          border-color: #D4AF3730;
          transform: translateX(4px);
        }

        .faq-card.active {
          border-color: #D4AF3760;
          box-shadow: 0 8px 32px rgba(212, 175, 55, 0.2);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
          opacity: 0;
        }

        .faq-answer.open {
          max-height: 200px;
          opacity: 1;
        }

        .faq-icon {
          transition: transform 0.4s ease;
          color: #D4AF37;
          font-size: 1.2rem;
        }

        .faq-icon.rotated {
          transform: rotate(45deg);
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-serif shimmer-text-f mb-4 text-center">
          Frequently Asked Questions
        </h2>

        <p className="text-center text-[#8A7540] mb-12 tracking-widest uppercase text-sm">
          Everything you need to know
        </p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="rounded-2xl bg-[#D4AF37]/10 h-16 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div
                key={item._id || i}
                ref={el => itemRefs.current[i] = el}
                className={`
                  faq-card bg-white/80 rounded-2xl shadow-lg overflow-hidden
                  ${visible.includes(i) ? 'faq-visible' : 'faq-hidden'}
                  ${open === i ? 'active' : ''}
                `}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full px-6 py-5 text-left font-semibold text-[#B8860B] flex justify-between items-center gap-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-[#D4AF37] text-lg">✦</span>
                    {item.question}
                  </span>

                  <span className={`faq-icon ${open === i ? 'rotated' : ''}`}>
                    +
                  </span>
                </button>

                <div className={`faq-answer ${open === i ? 'open' : ''} px-6 pb-5 text-[#6E5A28] leading-8`}>
                  <div className="border-t border-[#D4AF37]/20 pt-4">
                    {item.answer}
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