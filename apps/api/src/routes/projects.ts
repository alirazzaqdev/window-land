import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { Project } from '../models/Project'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { cacheGet, cacheSet, cacheDel } from '../config/redis'

const router = Router()

const CACHE_KEY = 'projects:all'
const FEATURED_CACHE_KEY = 'projects:featured'

// GET /api/projects
router.get('/', async (_req: Request, res: Response) => {
  try {
    const cached = await cacheGet<unknown[]>(CACHE_KEY)
    if (cached) return res.json(cached)

    const projects = await Project.find().sort({ order: 1 }).lean()
    await cacheSet(CACHE_KEY, projects, 60)
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// GET /api/projects/featured
router.get('/featured', async (_req: Request, res: Response) => {
  try {
    const cached = await cacheGet<unknown[]>(FEATURED_CACHE_KEY)
    if (cached) return res.json(cached)

    const projects = await Project.find({ featured: true }).sort({ order: 1 }).limit(6).lean()
    await cacheSet(FEATURED_CACHE_KEY, projects, 60)
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Failed to fetch featured projects' })
  }
})

// GET /api/projects/:slug
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const cacheKey = `project:${req.params.slug}`
    const cached = await cacheGet<unknown>(cacheKey)
    if (cached) return res.json(cached)

    const project = await Project.findOne({ slug: req.params.slug }).lean()
    if (!project) return res.status(404).json({ error: 'Project not found' })

    await cacheSet(cacheKey, project, 60)
    res.json(project)
  } catch {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  description: z.string().min(10),
  scope: z.array(z.string()).min(1),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

// POST /api/projects — admin only
router.post('/', requireAuth, validate(projectSchema), async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body)
    await cacheDel(CACHE_KEY)
    await cacheDel(FEATURED_CACHE_KEY)
    res.status(201).json(project)
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to create project'
    res.status(400).json({ error: msg })
  }
})

// PUT /api/projects/:id — admin only
router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    await cacheDel(CACHE_KEY)
    await cacheDel(FEATURED_CACHE_KEY)
    await cacheDel(`project:${project.slug}`)
    res.json(project)
  } catch {
    res.status(500).json({ error: 'Failed to update project' })
  }
})

// DELETE /api/projects/:id — admin only
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ error: 'Project not found' })
    await cacheDel(CACHE_KEY)
    await cacheDel(FEATURED_CACHE_KEY)
    res.json({ message: 'Project deleted' })
  } catch {
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

export default router
