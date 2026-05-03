import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState("");
  const [focused, setFocused] = useState("")
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      const base = import.meta.env.VITE_API_URL || ""
      const response = await fetch(`${base}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!response.ok) throw new Error("Server error")
      const data = await response.json()
      if (data.success) {
        setStatus("success")
        setFormData({ name: "", email: "", company: "", message: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const inputClass = (name) => `w-full px-5 py-4 rounded-xl border-2 outline-none bg-white/80 transition-all duration-300 ${
    focused === name ? 'border-[#D4AF37] shadow-[0_0_16px_#D4AF3740] scale-[1.01]' : 'border-[#D4AF37]/30'
  }`

  return (
    <section id="contact" className="py-28 px-8 overflow-hidden" ref={sectionRef}>
      <style>{`
        @keyframes goldShimmerC {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text-c {
          background: linear-gradient(90deg, #B8860B, #FFD700, #B8860B, #D4AF37);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: goldShimmerC 4s linear infinite;
          display: inline-block;
        }
        @keyframes slideUpC {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-visible { animation: slideUpC 0.7s ease forwards; }
        .contact-hidden { opacity: 0; transform: translateY(50px); }
        @keyframes glowPulseC {
          0%, 100% { box-shadow: 0 0 20px #D4AF3740; }
          50% { box-shadow: 0 0 40px #D4AF3770; }
        }
        .send-btn {
          transition: transform 0.3s ease;
          animation: glowPulseC 3s ease-in-out infinite;
        }
        .send-btn:hover { transform: scale(1.08) translateY(-3px); }
        .send-btn:disabled { animation: none; opacity: 0.5; }
        @keyframes successPop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .success-msg { animation: successPop 0.4s ease forwards; }
      `}</style>

      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-5xl font-serif shimmer-text-c mb-4 ${visible ? 'contact-visible' : 'contact-hidden'}`}>
          Let's Build Something Distinct
        </h2>
        <p className={`text-[#6E5A28] mb-10 text-lg ${visible ? 'contact-visible' : 'contact-hidden'}`} style={{ animationDelay: '0.15s' }}>
          Reach out to start your next premium digital project.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`space-y-5 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-[#D4AF37]/30 text-left ${visible ? 'contact-visible' : 'contact-hidden'}`}
          style={{ animationDelay: '0.3s' }}
        >
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              required
              className={inputClass('name')}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              required
              className={inputClass('email')}
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            onFocus={() => setFocused('company')}
            onBlur={() => setFocused('')}
            className={inputClass('company')}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused('')}
            required
            className={inputClass('message')}
          />

          <div className="text-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className="send-btn px-10 py-4 rounded-full bg-[#D4AF37] text-white font-semibold shadow-lg"
            >
              {status === "sending" ? "Sending..." : "Send Message ✦"}
            </button>
          </div>

          {status === "success" && (
            <p className="success-msg text-green-600 font-medium text-center">✦ Message Sent Successfully!</p>
          )}
          {status === "error" && (
            <p className="success-msg text-red-500 font-medium text-center">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  )
}