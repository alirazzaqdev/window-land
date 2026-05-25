'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import { ALL_SERVICES } from '@window-land/types'
import { IconCheck, IconAlertCircle } from '@tabler/icons-react'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  location: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

type FormData = z.infer<typeof schema>

const LOCATIONS = ['Dubai', 'Sharjah', 'Abu Dhabi', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'Other']

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="text-[11px] text-red-400 mt-1">{msg}</p>
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setSubmitError('')
    try {
      await api.post('/api/contact', { ...data, source: 'website' })
      setSubmitted(true)
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please call +971 50 455 2652'
      )
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mb-4">
          <IconCheck size={24} className="text-green-400" />
        </div>
        <h3 className="font-display text-[24px] text-white font-light mb-2">Thank you!</h3>
        <p className="text-body text-brand-text-muted max-w-sm">
          We&apos;ve received your inquiry and will contact you within 24 hours.
        </p>
        <p className="text-caption text-brand-text-muted mt-3">
          Urgent? Call <a href="tel:+971504552652" className="text-brand-gold">+971 50 455 2652</a>
        </p>
      </div>
    )
  }

  const inputClass =
    'w-full bg-brand-black border border-brand-gold-border px-4 py-3 text-[14px] text-white placeholder-brand-text-faint focus:outline-none focus:border-brand-gold transition-colors'
  const labelClass = 'text-caption text-brand-text-muted uppercase tracking-[2px] block mb-2'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            {...register('name')}
            type="text"
            placeholder="Muhammad Ali"
            className={inputClass}
            autoComplete="name"
          />
          <FieldError msg={errors.name?.message} />
        </div>
        <div>
          <label className={labelClass}>Company</label>
          <input
            {...register('company')}
            type="text"
            placeholder="ABC Contracting LLC"
            className={inputClass}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+971 50 XXX XXXX"
            className={inputClass}
            autoComplete="tel"
          />
          <FieldError msg={errors.phone?.message} />
        </div>
        <div>
          <label className={labelClass}>Email Address *</label>
          <input
            {...register('email')}
            type="email"
            placeholder="you@company.com"
            className={inputClass}
            autoComplete="email"
          />
          <FieldError msg={errors.email?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Service Required *</label>
          <select {...register('service')} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="">Select a service...</option>
            {ALL_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FieldError msg={errors.service?.message} />
        </div>
        <div>
          <label className={labelClass}>Project Location</label>
          <select {...register('location')} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="">Select location...</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="Describe your project requirements, dimensions, material preferences, timeline..."
          className={`${inputClass} resize-none`}
        />
        <FieldError msg={errors.message?.message} />
      </div>

      {submitError && (
        <div className="flex items-start gap-2 text-red-400 border border-red-900 bg-red-900/10 px-4 py-3 text-[13px]">
          <IconAlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-gold text-brand-black text-[13px] uppercase tracking-[2px] py-4 font-medium hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-3">
            <span className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
            Sending...
          </span>
        ) : (
          'Send Inquiry →'
        )}
      </button>

      <p className="text-caption text-brand-text-muted text-center">
        We respond within 24 hours. For urgent inquiries call{' '}
        <a href="tel:+971504552652" className="text-brand-gold">+971 50 455 2652</a>
      </p>
    </form>
  )
}
