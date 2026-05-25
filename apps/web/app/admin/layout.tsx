'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { clsx } from 'clsx'
import {
  IconLayoutDashboard,
  IconBuildingArch,
  IconMail,
  IconSettings,
  IconLogout,
} from '@tabler/icons-react'
import { api } from '@/lib/api'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: IconLayoutDashboard, exact: true },
  { href: '/admin/projects', label: 'Projects', icon: IconBuildingArch },
  { href: '/admin/inquiries', label: 'Inquiries', icon: IconMail },
  { href: '/admin/settings', label: 'Settings', icon: IconSettings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function logout() {
    await api.post('/api/auth/logout', {})
    router.push('/admin/login')
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div className="min-h-screen bg-brand-black flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-brand-gold-border flex flex-col">
        <div className="p-6 border-b border-brand-gold-border">
          <p className="font-display text-[16px] text-white tracking-[2px]">WINDOW LAND</p>
          <p className="text-[9px] text-brand-text-muted uppercase tracking-[2px] mt-0.5">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 text-[13px] transition-all duration-200',
                  active
                    ? 'bg-brand-gold-dim text-brand-gold border-l-2 border-brand-gold'
                    : 'text-brand-text-muted hover:text-white hover:bg-brand-black-card border-l-2 border-transparent'
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-brand-gold-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] text-brand-text-muted hover:text-red-400 transition-colors w-full"
          >
            <IconLogout size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
