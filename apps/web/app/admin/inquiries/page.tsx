'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { IconPhone, IconMail } from '@tabler/icons-react'

interface Inquiry {
  id: number
  name: string
  company?: string
  phone: string
  email: string
  service: string
  location?: string
  message: string
  status: string
  createdAt: string
}

const STATUSES = ['all', 'new', 'viewed', 'replied', 'closed']
const statusColors: Record<string, string> = {
  new: 'text-brand-gold border-brand-gold',
  viewed: 'text-blue-400 border-blue-400/50',
  replied: 'text-green-400 border-green-400/50',
  closed: 'text-brand-text-muted border-brand-gold-border',
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    try {
      const data = await api.get<{ inquiries: Inquiry[] }>(
        `/api/inquiries?status=${filter}`
      )
      setInquiries(data.inquiries)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  async function updateStatus(id: number, status: string) {
    await api.put(`/api/inquiries/${id}`, { status })
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)))
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s)
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-[28px] text-white font-light mb-6">Inquiries</h1>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-[11px] uppercase tracking-[2px] border transition-colors ${filter === s ? 'bg-brand-gold text-brand-black border-brand-gold' : 'text-brand-text-muted border-brand-gold-border hover:border-brand-gold'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className="flex-1 border border-brand-gold-border overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr_100px] text-caption text-brand-text-muted uppercase tracking-[1.5px] px-4 py-3 border-b border-brand-gold-border bg-brand-black-card">
            <span>Name</span>
            <span>Service</span>
            <span>Date</span>
            <span>Status</span>
          </div>
          {loading ? (
            <div className="p-6 text-brand-text-muted text-[13px]">Loading...</div>
          ) : (
            <div className="divide-y divide-brand-gold-border">
              {inquiries.map((inq) => (
                <button
                  key={inq.id}
                  onClick={() => setSelected(inq)}
                  className={`w-full grid grid-cols-[1fr_1fr_1fr_100px] text-left px-4 py-3 hover:bg-brand-black-card transition-colors text-[13px] ${selected?.id === inq.id ? 'bg-brand-black-card' : ''}`}
                >
                  <span className="text-white">{inq.name}{inq.company ? ` — ${inq.company}` : ''}</span>
                  <span className="text-brand-text-muted">{inq.service}</span>
                  <span className="text-brand-text-muted">{new Date(inq.createdAt).toLocaleDateString('en-AE')}</span>
                  <span className={`text-[10px] uppercase tracking-[1px] border px-2 py-1 inline-block ${statusColors[inq.status] ?? ''}`}>
                    {inq.status}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Detail pane */}
        {selected && (
          <div className="w-80 border border-brand-gold-border bg-brand-black-card p-5 flex-shrink-0 h-fit">
            <h3 className="text-[16px] text-white font-medium mb-4">{selected.name}</h3>
            {selected.company && (
              <p className="text-caption text-brand-text-muted mb-3">{selected.company}</p>
            )}
            <div className="space-y-2 mb-5">
              <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-[13px] text-brand-gold hover:underline">
                <IconPhone size={13} /> {selected.phone}
              </a>
              <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-[13px] text-brand-gold hover:underline">
                <IconMail size={13} /> {selected.email}
              </a>
            </div>
            <div className="border-t border-brand-gold-border pt-4 mb-4">
              <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">Service</p>
              <p className="text-[13px] text-white">{selected.service}</p>
            </div>
            {selected.location && (
              <div className="mb-4">
                <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">Location</p>
                <p className="text-[13px] text-white">{selected.location}</p>
              </div>
            )}
            <div className="mb-5">
              <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-1">Message</p>
              <p className="text-[13px] text-brand-text-secondary leading-relaxed">{selected.message}</p>
            </div>
            <div>
              <p className="text-caption text-brand-text-muted uppercase tracking-[1.5px] mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {['viewed', 'replied', 'closed'].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected.id, s)}
                    className={`text-[10px] uppercase tracking-[1px] border px-2 py-1 transition-colors ${selected.status === s ? 'bg-brand-gold text-brand-black border-brand-gold' : 'text-brand-text-muted border-brand-gold-border hover:border-brand-gold'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.service} Inquiry — Window Land`}
                className="block text-center text-[11px] uppercase tracking-[1.5px] border border-brand-gold text-brand-gold px-4 py-2 hover:bg-brand-gold hover:text-brand-black transition-all"
              >
                Reply via Email
              </a>
              <a
                href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-[11px] uppercase tracking-[1.5px] bg-[#25d366] text-white px-4 py-2"
              >
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
