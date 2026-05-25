'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { IconPlus, IconMail, IconBuildingArch } from '@tabler/icons-react'

interface Stats {
  inquiries: { today: number; week: number; month: number; total: number }
  projects: number
  recentInquiries: {
    id: number
    name: string
    service: string
    status: string
    createdAt: string
  }[]
}

const statusColors: Record<string, string> = {
  new: 'text-brand-gold bg-brand-gold-dim border-brand-gold-border',
  viewed: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  replied: 'text-green-400 bg-green-400/10 border-green-400/30',
  closed: 'text-brand-text-muted bg-brand-black-card border-brand-gold-border',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get<Stats>('/api/admin/stats')
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-[28px] text-white font-light">Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/admin/projects?action=new">
            <button className="flex items-center gap-2 bg-brand-gold text-brand-black text-[12px] uppercase tracking-[1.5px] px-4 py-2 hover:brightness-110 transition-all">
              <IconPlus size={14} /> Add Project
            </button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Today', value: stats?.inquiries.today ?? '—', icon: IconMail },
          { label: 'This Week', value: stats?.inquiries.week ?? '—', icon: IconMail },
          { label: 'This Month', value: stats?.inquiries.month ?? '—', icon: IconMail },
          { label: 'Projects', value: stats?.projects ?? '—', icon: IconBuildingArch },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="border border-brand-gold-border bg-brand-black-card p-5">
            <div className="flex items-center gap-2 text-brand-text-muted mb-2">
              <Icon size={14} />
              <span className="text-caption uppercase tracking-[2px]">{label}</span>
            </div>
            <p className="font-display text-[32px] text-brand-gold font-light">{value}</p>
          </div>
        ))}
      </div>

      {/* Recent inquiries */}
      <div className="border border-brand-gold-border">
        <div className="px-6 py-4 border-b border-brand-gold-border flex items-center justify-between">
          <h2 className="text-[14px] font-medium text-white">Recent Inquiries</h2>
          <Link
            href="/admin/inquiries"
            className="text-caption text-brand-gold uppercase tracking-[1.5px] hover:underline"
          >
            View All
          </Link>
        </div>
        {loading ? (
          <div className="p-6 text-brand-text-muted text-[13px]">Loading...</div>
        ) : (
          <div className="divide-y divide-brand-gold-border">
            {stats?.recentInquiries.length === 0 && (
              <div className="p-6 text-brand-text-muted text-[13px]">No inquiries yet.</div>
            )}
            {stats?.recentInquiries.map((inq) => (
              <Link
                key={inq.id}
                href={`/admin/inquiries?id=${inq.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-brand-black-card transition-colors"
              >
                <div>
                  <p className="text-[14px] text-white">{inq.name}</p>
                  <p className="text-caption text-brand-text-muted">{inq.service}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-[10px] uppercase tracking-[1px] border px-2 py-1 ${statusColors[inq.status] ?? ''}`}
                  >
                    {inq.status}
                  </span>
                  <span className="text-caption text-brand-text-faint">
                    {new Date(inq.createdAt).toLocaleDateString('en-AE')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
