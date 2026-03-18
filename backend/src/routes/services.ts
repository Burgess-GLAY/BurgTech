import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth'

export const servicesRouter = Router()

const serviceSchema = z.object({
  title:        z.string().min(2).max(100),
  slug:         z.string().min(2).regex(/^[a-z0-9-]+$/),
  summary:      z.string().min(10).max(300),
  description:  z.string().min(20),
  icon:         z.string().optional().or(z.literal('')),
  technologies: z.array(z.string()).default([]),
  useCases:     z.array(z.string()).default([]),
  benefits:     z.array(z.string()).default([]),
  ctaLabel:     z.string().default('Get Started'),
  isPublished:  z.boolean().default(true),
  order:        z.number().int().default(0),
})

servicesRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)
  const where = isAdmin ? {} : { isPublished: true }
  const services = await prisma.service.findMany({ where, orderBy: { order: 'asc' } })
  res.json({ services })
})

servicesRouter.get('/:slug', optionalAuth, async (req: AuthRequest, res: Response) => {
  const service = await prisma.service.findUnique({ where: { slug: req.params.slug } })
  if (!service) return res.status(404).json({ error: 'Service not found' })

  const isAdmin = req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)
  if (!service.isPublished && !isAdmin) {
    return res.status(404).json({ error: 'Service not found' })
  }

  res.json({ service })
})

servicesRouter.post('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const result = serviceSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  
  const existing = await prisma.service.findUnique({ where: { slug: result.data.slug } })
  if (existing) return res.status(409).json({ error: 'Slug already exists' })

  const service = await prisma.service.create({ data: result.data as any })
  res.status(201).json({ service })
})

servicesRouter.put('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const result = serviceSchema.partial().safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const service = await prisma.service.update({ where: { id: req.params.id }, data: result.data as any })
  res.json({ service })
})

servicesRouter.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  await prisma.service.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
