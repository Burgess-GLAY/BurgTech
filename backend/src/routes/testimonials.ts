import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth'
import { auditLog } from '../middleware/audit'

export const testimonialsRouter = Router()

const testimonialSchema = z.object({
  authorName: z.string().min(2).max(80),
  authorRole: z.string().min(2).max(100),
  company: z.string().optional().or(z.literal('')),
  content: z.string().min(10).max(2000),
  rating: z.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().url().optional().or(z.literal('')),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
})

testimonialsRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)
  const where: any = isAdmin ? {} : { isPublished: true }

  if (req.query.featured === 'true') where.isFeatured = true
  const testimonials = await prisma.testimonial.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })
  res.json({ testimonials })
})

testimonialsRouter.post('/', requireAuth, requireAdmin, auditLog('Testimonial'), async (req: Request, res: Response) => {
  const result = testimonialSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const testimonial = await prisma.testimonial.create({ data: result.data as any })
  res.status(201).json({ testimonial })
})

testimonialsRouter.put('/:id', requireAuth, requireAdmin, auditLog('Testimonial'), async (req: Request, res: Response) => {
  const result = testimonialSchema.partial().safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const testimonial = await prisma.testimonial.update({
    where: { id: req.params.id },
    data: result.data as any
  })
  res.json({ testimonial })
})

testimonialsRouter.delete('/:id', requireAuth, requireAdmin, auditLog('Testimonial'), async (req: Request, res: Response) => {
  await prisma.testimonial.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
