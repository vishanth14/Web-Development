import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ onAdminClick, isAuthenticated, onLogout }) {
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    onLogout()
  }

  const links = ['Portfolio', 'Testimonials', 'FAQ', 'Contact']

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-[#D4AF37]/30 px-8 shadow-sm transition-all duration-300 ${isAuthenticated ? 'py-3' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-serif tracking-[0.2em] text-[#B8860B]">
          OUTPRO INDIA
        </h1>

        <div className="hidden md:flex items-center gap-8 uppercase text-sm tracking-widest">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#D4AF37] transition">
              {link}
            </a>
          ))}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition duration-300">
              Logout
            </button>
          ) : (
            <button onClick={onAdminClick} className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#B8860B] hover:bg-[#D4AF37] hover:text-white transition duration-300">
              Login / Register
            </button>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-[#B8860B]">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 rounded-2xl bg-white/80 p-4 border border-[#D4AF37]/20 flex flex-col gap-4">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#B8860B]">
              Logout
            </button>
          ) : (
            <button onClick={() => { onAdminClick(); setOpen(false) }} className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#B8860B]">
              Login / Register
            </button>
          )}
        </div>
      )}
    </nav>
  )
}