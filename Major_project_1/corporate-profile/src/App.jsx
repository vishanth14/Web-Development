import { useState, useEffect, useRef } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import AdminDashboard from './components/AdminDashboard'
import AuthModal from './components/AuthModal'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authType, setAuthType] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [scrollY, setScrollY] = useState(0)

  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        document
          .getElementById('admin-dashboard')
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [isAuthenticated])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px'
        cursorDotRef.current.style.top = e.clientY + 'px'
      }
    }

    const growCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          'translate(-50%, -50%) scale(1.8)'
      }
    }

    const shrinkCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          'translate(-50%, -50%) scale(1)'
      }
    }

    window.addEventListener('mousemove', moveCursor)

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', growCursor)
      el.addEventListener('mouseleave', shrinkCursor)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
    }
  }, [])

  const handleAuth = async (formData) => {
    setLoading(true)
    setError('')

    try {
      const base = "https://outpro-backend-4yr0.onrender.com"

      const res = await fetch(`${base}/api/admin/${authType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        localStorage.setItem('adminToken', data.token)

        setIsAuthenticated(true)
        setShowAuthModal(false)
      } else {
        setError(data.message || 'Authentication failed')
      }
    } catch {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  return (
    <div
      className="min-h-screen bg-[#F6F1E7] text-[#4A3B18] overflow-x-hidden relative"
      style={{ cursor: 'none' }}
    >
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          border: '2px solid #D4AF37',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease, border-color 0.3s ease',
          boxShadow: '0 0 12px #D4AF3780'
        }}
      />

      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#D4AF37',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px #D4AF37'
        }}
      />

      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/topography.png')]" />

      <div
        className="fixed inset-0 -z-10 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(
            ellipse at ${50 + scrollY * 0.01}% ${
              30 + scrollY * 0.005
            }%,
            #D4AF3715 0%,
            transparent 70%
          )`
        }}
      />

      <Navbar
        onAdminClick={() => {
          setAuthType('login')
          setShowAuthModal(true)
        }}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      {isAuthenticated && (
        <div className="fixed top-[72px] w-full z-40 bg-[#D4AF37] px-8 py-2 text-center text-sm text-white font-medium tracking-widest uppercase shadow-md">
          Welcome, Admin — Manage your website below ↓
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }

          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .scroll-reveal {
          opacity: 0;
          animation: fadeSlideUp 0.7s ease forwards;
        }

        .scroll-reveal-left {
          opacity: 0;
          animation: fadeSlideIn 0.7s ease forwards;
        }

        section {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        * {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #F6F1E7;
        }

        ::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #B8860B;
        }

        a,
        button {
          transition: all 0.3s ease;
        }
      `}</style>

      <div
        id="admin-dashboard"
        className={isAuthenticated ? 'pt-[108px]' : ''}
      >
        {isAuthenticated && (
          <div className="scroll-reveal">
            <AdminDashboard />
          </div>
        )}
      </div>

      <div>
        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.1s' }}
        >
          <Hero />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.2s' }}
        >
          <About />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.3s' }}
        >
          <Services />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.4s' }}
        >
          <Portfolio />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.5s' }}
        >
          <Testimonials />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.6s' }}
        >
          <FAQ />
        </div>

        <div
          className="scroll-reveal"
          style={{ animationDelay: '0.7s' }}
        >
          <Contact />
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          authType={authType}
          onAuth={handleAuth}
          onClose={() => {
            setShowAuthModal(false)
            setError('')
          }}
          onToggleAuthType={() =>
            setAuthType((prev) =>
              prev === 'login' ? 'register' : 'login'
            )
          }
          loading={loading}
          error={error}
        />
      )}
    </div>
  )
}