'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/api/auth/login', { username, password })
      router.push('/admin')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-[24px] text-white font-medium tracking-[2px]">
            WINDOW LAND
          </p>
          <p className="text-caption text-brand-text-muted uppercase tracking-[3px] mt-1">
            Admin Panel
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-brand-gold-border bg-brand-black-card p-8 space-y-6"
        >
          <div>
            <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full bg-brand-black border border-brand-gold-border px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          <div>
            <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full bg-brand-black border border-brand-gold-border px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-gold transition-colors"
            />
          </div>

          {error && (
            <p className="text-[13px] text-red-400 border border-red-900 px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gold text-brand-black text-[12px] uppercase tracking-[2px] py-3 font-medium hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
