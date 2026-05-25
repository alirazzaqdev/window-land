import { Router, Request, Response } from 'express'
import { requireAuth } from '../middleware/auth'
import { prisma } from '../config/postgres'

const router = Router()

// All routes require admin auth
router.use(requireAuth)

router.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page ?? 1)
  const limit = Number(req.query.limit ?? 20)
  const status = req.query.status as string | undefined
  const skip = (page - 1) * limit

  const where = status && status !== 'all' ? { status } : {}

  const [inquiries, total] = await Promise.all([
    prisma.inquiry.findMany({ where, orderBy: { createdAt: 'desc' }, skip, take: limit }),
    prisma.inquiry.count({ where }),
  ])

  res.json({ inquiries, total, page, pages: Math.ceil(total / limit) })
})

router.get('/:id', async (req: Request, res: Response) => {
  const inquiry = await prisma.inquiry.findUnique({ where: { id: Number(req.params.id) } })
  if (!inquiry) return res.status(404).json({ error: 'Inquiry not found' })
  res.json(inquiry)
})

router.put('/:id', async (req: Request, res: Response) => {
  const { status } = req.body
  const inquiry = await prisma.inquiry.update({
    where: { id: Number(req.params.id) },
    data: { status },
  })
  res.json(inquiry)
})

router.delete('/:id', async (req: Request, res: Response) => {
  await prisma.inquiry.delete({ where: { id: Number(req.params.id) } })
  res.json({ message: 'Inquiry deleted' })
})

export default router
