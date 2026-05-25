'use client'

import { useState } from 'react'
import { api } from '@/lib/api'
import { formatAED } from '@/lib/utils'

const SERVICES = [
  { key: 'curtain_wall', label: 'Curtain Wall System', subtypes: ['thermal', 'normal'] },
  { key: 'sliding_doors', label: 'Sliding Doors', subtypes: ['lift_and_slide', 'bifold', 'automatic', 'standard'] },
  { key: 'pergola', label: 'Aluminium Pergola', subtypes: ['louvered', 'fixed'] },
  { key: 'glass_balustrade', label: 'Glass Balustrade', subtypes: [] },
  { key: 'acp_cladding', label: 'ACP Cladding', subtypes: [] },
  { key: 'office_partitions', label: 'Office Partitions', subtypes: [] },
  { key: 'shower_partitions', label: 'Shower Partitions', subtypes: [] },
  { key: 'tempered_glass', label: 'Tempered Glass Works', subtypes: [] },
  { key: 'double_glazing', label: 'Double Glazing', subtypes: [] },
  { key: 'ventilation_windows', label: 'Ventilation Windows', subtypes: [] },
]

interface QuoteResult {
  service: string
  dimensions: string
  area_sqm: number
  estimate: { min_aed: number; max_aed: number; min_with_vat: number; max_with_vat: number }
  breakdown: { item: string; min: number; max: number }[]
  timeline_weeks: string
  notes: string
  disclaimer: string
}

const inputClass =
  'w-full bg-brand-black border border-brand-gold-border px-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none'

export default function QuoteCalculator() {
  const [service, setService] = useState(SERVICES[0].key)
  const [subtype, setSubtype] = useState('normal')
  const [width, setWidth] = useState(5)
  const [height, setHeight] = useState(3)
  const [floors, setFloors] = useState(1)
  const [result, setResult] = useState<QuoteResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedService = SERVICES.find((s) => s.key === service)!

  async function calculate() {
    setLoading(true)
    setError('')
    try {
      const data = await api.post<QuoteResult>('/api/quote/calculate', {
        service,
        subtype: subtype || 'normal',
        width,
        height,
        floors,
      })
      setResult(data)
    } catch {
      setError('Quote service unavailable. Please contact us directly.')
    }
    setLoading(false)
  }

  return (
    <div className="border border-brand-gold-border bg-brand-black-card p-6">
      <h3 className="font-display text-[24px] text-white font-light mb-6">Quick Quote Estimator</h3>

      <div className="space-y-4 mb-5">
        <div>
          <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">Service</label>
          <select
            value={service}
            onChange={(e) => { setService(e.target.value); setSubtype('normal') }}
            className={inputClass}
          >
            {SERVICES.map((s) => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>

        {selectedService.subtypes.length > 0 && (
          <div>
            <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">Type</label>
            <select value={subtype} onChange={(e) => setSubtype(e.target.value)} className={inputClass}>
              {selectedService.subtypes.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}</option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Width (m)', value: width, set: setWidth },
            { label: 'Height (m)', value: height, set: setHeight },
            { label: 'Floors', value: floors, set: setFloors },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2">{label}</label>
              <input
                type="number"
                min={0.5}
                max={label === 'Floors' ? 50 : 200}
                step={0.5}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className={inputClass}
              />
            </div>
          ))}
        </div>

        <button
          onClick={calculate}
          disabled={loading}
          className="w-full bg-brand-gold text-brand-black text-[12px] uppercase tracking-[2px] py-3 font-medium hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Get Estimate'}
        </button>

        {error && <p className="text-[12px] text-red-400">{error}</p>}
      </div>

      {result && (
        <div className="border-t border-brand-gold-border pt-5">
          <p className="text-caption text-brand-text-muted uppercase tracking-[2px] mb-2">{result.service}</p>
          <div className="text-center py-4 bg-brand-gold-dim border border-brand-gold-border mb-4">
            <p className="text-caption text-brand-text-muted mb-1">Estimated Range</p>
            <p className="font-display text-[28px] text-brand-gold font-light">
              {formatAED(result.estimate.min_aed)} – {formatAED(result.estimate.max_aed)}
            </p>
            <p className="text-caption text-brand-text-muted mt-1">
              {formatAED(result.estimate.min_with_vat)} – {formatAED(result.estimate.max_with_vat)} incl. 5% VAT
            </p>
          </div>
          <div className="space-y-1.5 mb-3">
            {result.breakdown.map((b) => (
              <div key={b.item} className="flex justify-between text-[12px]">
                <span className="text-brand-text-muted">{b.item}</span>
                <span className="text-white">{formatAED(b.min)} – {formatAED(b.max)}</span>
              </div>
            ))}
          </div>
          <p className="text-caption text-brand-gold mb-1">Timeline: {result.timeline_weeks} weeks</p>
          <p className="text-[11px] text-brand-text-muted leading-relaxed">{result.disclaimer}</p>
        </div>
      )}
    </div>
  )
}
