import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { validate } from '../middleware/validate'
import { contactLimiter } from '../middleware/rateLimiter'
import { sendInquiryNotification, sendAutoReply } from '../services/emailService'
import { sendWhatsAppNotification } from '../services/whatsappService'
import { prisma } from '../config/postgres'

const router = Router()

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().max(100).optional(),
  phone: z
    .string()
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number'),
  email: z.string().email(),
  service: z.string().min(1),
  location: z.string().max(100).optional(),
  message: z.string().min(10).max(1000),
})

router.post('/', contactLimiter, validate(contactSchema), async (req: Request, res: Response) => {
  const data = req.body as z.infer<typeof contactSchema>

  try {
    // 1. Save to PostgreSQL
    await prisma.inquiry.create({
      data: {
        name: data.name,
        company: data.company,
        phone: data.phone,
        email: data.email,
        service: data.service,
        location: data.location,
        message: data.message,
        source: 'website',
        ipAddress: req.ip,
        status: 'new',
      },
    })

    // 2. Send notification email (non-blocking failures)
    sendInquiryNotification(data).catch((err) =>
      console.error('Notification email failed:', err.message)
    )

    // 3. Send auto-reply
    sendAutoReply(data).catch((err) =>
      console.error('Auto-reply email failed:', err.message)
    )

    // 4. Send WhatsApp notification
    sendWhatsAppNotification(data).catch((err) =>
      console.error('WhatsApp notification failed:', err.message)
    )

    res.status(200).json({ success: true, message: 'Inquiry received. We will contact you within 24 hours.' })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again or call +971 50 455 2652.' })
  }
})

export default router
