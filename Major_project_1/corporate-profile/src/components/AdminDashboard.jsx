import { useState, useEffect } from 'react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [faqs, setFaqs] = useState([])
  const [form, setForm] = useState({})
  const [editId, setEditId] = useState(null)

  const base = import.meta.env.VITE_API_URL || ""
  const token = localStorage.getItem('adminToken')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const fetchAll = async () => {
    const [c, t, p, f] = await Promise.all([
      fetch(`${base}/api/contact`, { headers }).then(r => r.json()),
      fetch(`${base}/api/content/testimonials`).then(r => r.json()),
      fetch(`${base}/api/content/portfolio`).then(r => r.json()),
      fetch(`${base}/api/content/faq`).then(r => r.json()),
    ])
    setContacts(c.data || [])
    setTestimonials(t.data || [])
    setPortfolio(p.data || [])
    setFaqs(f.data || [])
  }

  useEffect(() => { fetchAll() }, [])

  const handleDelete = async (section, id) => {
    await fetch(`${base}/api/admin/${section}/${id}`, { method: 'DELETE', headers })
    fetchAll()
  }

  const handleSubmit = async (section, fields) => {
    const url = editId ? `${base}/api/admin/${section}/${editId}` : `${base}/api/admin/${section}`
    const method = editId ? 'PUT' : 'POST'
    await fetch(url, { method, headers, body: JSON.stringify(fields) })
    setForm({})
    setEditId(null)
    fetchAll()
  }

  const tabs = ['contacts', 'testimonials', 'portfolio', 'faqs']

  return (
    <div className="py-24 px-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif text-[#B8860B] mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setForm({}); setEditId(null) }}
              className={`px-6 py-2 rounded-full capitalize font-semibold border transition ${activeTab === tab ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'border-[#D4AF37] text-[#B8860B]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-[#B8860B] mb-4">Contact Submissions</h2>
            {contacts.length === 0 && <p className="text-[#6E5A28]">No submissions yet.</p>}
            {contacts.map(c => (
              <div key={c._id} className="bg-white/80 rounded-2xl p-6 shadow flex justify-between items-start gap-4">
                <div>
                  <p className="font-semibold text-[#B8860B]">{c.name} — {c.email}</p>
                  <p className="text-sm text-[#6E5A28]">{c.company}</p>
                  <p className="mt-2 text-[#4A3B18]">{c.message}</p>
                </div>
                <button onClick={() => handleDelete('contact', c._id)} className="text-red-400 hover:text-red-600 text-sm font-semibold">Delete</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <h2 className="text-2xl font-serif text-[#B8860B] mb-4">Testimonials</h2>
            <div className="bg-white/80 rounded-2xl p-6 shadow mb-6 space-y-3">
              <input placeholder="Name" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <input placeholder="Company" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <textarea placeholder="Message" value={form.message || ''} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <input placeholder="Rating (1-5)" type="number" min="1" max="5" value={form.rating || ''} onChange={e => setForm({ ...form, rating: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <button onClick={() => handleSubmit('testimonials', form)} className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-semibold">
                {editId ? 'Update' : 'Add'} Testimonial
              </button>
            </div>
            <div className="space-y-4">
              {testimonials.map(t => (
                <div key={t._id} className="bg-white/80 rounded-2xl p-6 shadow flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-[#B8860B]">{t.name} — {t.company}</p>
                    <p className="italic text-[#6E5A28] mt-1">"{t.message}"</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setForm(t); setEditId(t._id) }} className="text-[#B8860B] text-sm font-semibold">Edit</button>
                    <button onClick={() => handleDelete('testimonials', t._id)} className="text-red-400 hover:text-red-600 text-sm font-semibold">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div>
            <h2 className="text-2xl font-serif text-[#B8860B] mb-4">Portfolio</h2>
            <div className="bg-white/80 rounded-2xl p-6 shadow mb-6 space-y-3">
              <input placeholder="Title" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <input placeholder="Category" value={form.category || ''} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <input placeholder="Image URL" value={form.imageUrl || ''} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <input placeholder="KPI (e.g. 3x leads)" value={form.kpi || ''} onChange={e => setForm({ ...form, kpi: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <button onClick={() => handleSubmit('portfolio', form)} className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-semibold">
                {editId ? 'Update' : 'Add'} Portfolio Item
              </button>
            </div>
            <div className="space-y-4">
              {portfolio.map(p => (
                <div key={p._id} className="bg-white/80 rounded-2xl p-6 shadow flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-[#B8860B]">{p.title} — {p.category}</p>
                    <p className="text-[#6E5A28] mt-1">{p.description}</p>
                    <p className="text-sm text-[#8A7540] mt-1">KPI: {p.kpi}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setForm(p); setEditId(p._id) }} className="text-[#B8860B] text-sm font-semibold">Edit</button>
                    <button onClick={() => handleDelete('portfolio', p._id)} className="text-red-400 hover:text-red-600 text-sm font-semibold">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div>
            <h2 className="text-2xl font-serif text-[#B8860B] mb-4">FAQs</h2>
            <div className="bg-white/80 rounded-2xl p-6 shadow mb-6 space-y-3">
              <input placeholder="Question" value={form.question || ''} onChange={e => setForm({ ...form, question: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <textarea placeholder="Answer" value={form.answer || ''} onChange={e => setForm({ ...form, answer: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#D4AF37]/30 outline-none" />
              <button onClick={() => handleSubmit('faq', form)} className="px-8 py-3 rounded-full bg-[#D4AF37] text-white font-semibold">
                {editId ? 'Update' : 'Add'} FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map(f => (
                <div key={f._id} className="bg-white/80 rounded-2xl p-6 shadow flex justify-between items-start gap-4">
                  <div>
                    <p className="font-semibold text-[#B8860B]">{f.question}</p>
                    <p className="text-[#6E5A28] mt-1">{f.answer}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setForm(f); setEditId(f._id) }} className="text-[#B8860B] text-sm font-semibold">Edit</button>
                    <button onClick={() => handleDelete('faq', f._id)} className="text-red-400 hover:text-red-600 text-sm font-semibold">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}