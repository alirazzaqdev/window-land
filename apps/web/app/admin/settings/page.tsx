'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function AdminSettingsPage() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setMsg('')
    setError('')
    if (newPw !== confirmPw) {
      setError('New passwords do not match.')
      return
    }
    if (newPw.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    try {
      await api.post('/api/auth/change-password', { currentPw, newPw })
      setMsg('Password updated successfully.')
      setCurrentPw('')
      setNewPw('')
      setConfirmPw('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update password')
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="font-display text-[28px] text-white font-light mb-8">Settings</h1>

      <section className="border border-brand-gold-border p-6 mb-6">
        <h2 className="text-[14px] font-medium text-white mb-5">Change Admin Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {[
            { label: 'Current Password', value: currentPw, set: setCurrentPw },
            { label: 'New Password', value: newPw, set: setNewPw },
            { label: 'Confirm New Password', value: confirmPw, set: setConfirmPw },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">
                {label}
              </label>
              <input
                type="password"
                value={value}
                onChange={(e) => set(e.target.value)}
                required
                className="w-full bg-brand-black border border-brand-gold-border px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
          ))}
          {error && <p className="text-[13px] text-red-400">{error}</p>}
          {msg && <p className="text-[13px] text-green-400">{msg}</p>}
          <button
            type="submit"
            className="bg-brand-gold text-brand-black text-[12px] uppercase tracking-[2px] px-6 py-2.5 hover:brightness-110 transition-all"
          >
            Update Password
          </button>
        </form>
      </section>

      <section className="border border-brand-gold-border p-6">
        <h2 className="text-[14px] font-medium text-white mb-3">Company Info</h2>
        <div className="space-y-2 text-[13px] text-brand-text-muted">
          <p>License No.: <span className="text-white">1441416</span></p>
          <p>Phone: <span className="text-white">+971 50 455 2652</span></p>
          <p>Email: <span className="text-white">info@windowland.ae</span></p>
          <p>CEO Phone: <span className="text-white">+971 50 908 4979</span></p>
        </div>
        <p className="text-caption text-brand-text-muted mt-4">
          To update company info, edit <code className="text-brand-gold">CLAUDE.md</code> or contact your developer.
        </p>
      </section>
    </div>
  )
}
