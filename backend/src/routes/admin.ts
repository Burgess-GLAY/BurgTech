import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin } from '../middleware/auth'

export const adminRouter = Router()

adminRouter.get('/stats', requireAuth, requireAdmin, async (_req, res) => {
  const [messages, projects, team, posts, testimonials, services] = await Promise.all([
    prisma.message.count({ where: { status: 'UNREAD' } }),
    prisma.project.count(),
    prisma.teamMember.count(),
    prisma.blogPost.count({ where: { isPublished: true } }),
    prisma.testimonial.count(),
    prisma.service.count(),
  ])
  const recentMessages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  })
  res.json({ messages, projects, team, posts, testimonials, services, recentMessages })
})
