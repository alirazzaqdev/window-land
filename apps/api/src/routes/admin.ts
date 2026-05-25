import { Router, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { prisma } from '../config/postgres'
import { Project } from '../models/Project'

const router = Router()
router.use(requireAuth)

router.get('/stats', async (_req, res: Response) => {
  try {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startOfWeek = new Date(startOfToday)
    startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay())
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [today, week, month, total, projects, recentInquiries] = await Promise.all([
      prisma.inquiry.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: startOfWeek } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.inquiry.count(),
      Project.countDocuments(),
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 8,
        select: { id: true, name: true, service: true, status: true, createdAt: true },
      }),
    ])

    res.json({
      inquiries: { today, week, month, total },
      projects,
      recentInquiries,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router
