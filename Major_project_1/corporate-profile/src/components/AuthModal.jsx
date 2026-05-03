import { useState } from 'react'

export default function AuthModal({ authType, onAuth, onClose, onToggleAuthType, loading, error }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-[#D4AF37]/20">
        <button onClick={onClose} className="absolute right-5 top-4 text-2xl text-[#B8860B] hover:scale-110 transition">×</button>

        <h2 className="text-3xl font-serif text-[#B8860B] mb-6 text-center">
          {authType === 'login' ? 'Admin Login' : 'Create Account'}
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); onAuth(formData) }} className="space-y-4">
          {authType === 'register' && (
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-[#D4AF37]/30 px-4 py-3 outline-none focus:border-[#B8860B]"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-xl border border-[#D4AF37]/30 px-4 py-3 outline-none focus:border-[#B8860B]"
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full rounded-xl border border-[#D4AF37]/30 px-4 py-3 outline-none focus:border-[#B8860B]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#D4AF37] py-3 text-white font-semibold hover:bg-[#B8860B] transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : authType === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <p className="mt-5 text-center text-sm text-[#6E5A28]">
          {authType === 'login' ? "Don't have an account?" : 'Already have an account?'}
          <button onClick={onToggleAuthType} className="ml-2 font-semibold text-[#D4AF37] hover:text-[#B8860B]">
            {authType === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}