import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin, requireSuperAdmin } from '../middleware/auth'

export const adminRouter = Router()

adminRouter.get('/stats', requireAuth, requireAdmin, async (_req, res) => {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const [messages, projects, team, posts, testimonials, services, recentMessages, rawTimeSeries, postsByCategoryRaw] =
    await Promise.all([
      prisma.message.count({ where: { status: 'UNREAD' } }),
      prisma.project.count(),
      prisma.teamMember.count(),
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.testimonial.count(),
      prisma.service.count(),
      prisma.message.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.$queryRaw<{ date: Date; count: bigint }[]>`
        SELECT DATE("createdAt") AS date, COUNT(*) AS count
        FROM "Message"
        WHERE "createdAt" >= ${thirtyDaysAgo}
        GROUP BY DATE("createdAt")
        ORDER BY DATE("createdAt") ASC
      `,
      prisma.blogPost.groupBy({
        by: ['category'],
        _count: { _all: true },
      }),
    ])

  const messagesTimeSeries = rawTimeSeries.map((row) => ({
    date: row.date.toISOString().slice(0, 10),
    count: Number(row.count),
  }))

  const postsByCategory = postsByCategoryRaw.map((row) => ({
    category: row.category,
    count: row._count._all,
  }))

  res.set('Cache-Control', 'private, max-age=30')
  res.json({
    messages,
    projects,
    team,
    posts,
    testimonials,
    services,
    recentMessages,
    messagesTimeSeries,
    postsByCategory,
  })
})

adminRouter.get('/audit-logs', requireAuth, requireSuperAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page as string) || 1)
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 20))
  const action = req.query.action as string | undefined
  const entity = req.query.entity as string | undefined

  const where = {
    ...(action ? { action } : {}),
    ...(entity ? { entity } : {}),
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.auditLog.count({ where }),
  ])

  res.json({
    logs,
    total,
    page,
    pages: Math.ceil(total / limit),
  })
})
