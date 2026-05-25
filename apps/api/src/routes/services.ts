import { Router, Request, Response } from 'express'
import { Service } from '../models/Service'
import { cacheGet, cacheSet } from '../config/redis'

const router = Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const cached = await cacheGet<unknown[]>('services:all')
    if (cached) return res.json(cached)

    const services = await Service.find().sort({ order: 1 }).lean()
    await cacheSet('services:all', services, 300)
    res.json(services)
  } catch {
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug }).lean()
    if (!service) return res.status(404).json({ error: 'Service not found' })
    res.json(service)
  } catch {
    res.status(500).json({ error: 'Failed to fetch service' })
  }
})

export default router
