import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin } from '../middleware/auth'

export const chatRouter = Router()

chatRouter.get('/sessions', requireAuth, requireAdmin, async (_req, res) => {
  const sessions = await prisma.chatSession.findMany({
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 1 } },
    orderBy: { updatedAt: 'desc' },
    take: 50,
  })
  res.json({ sessions })
})

chatRouter.get('/sessions/:id/messages', requireAuth, requireAdmin, async (req, res) => {
  const messages = await prisma.chatMessage.findMany({
    where: { sessionId: req.params.id },
    orderBy: { createdAt: 'asc' },
  })
  res.json({ messages })
})

chatRouter.patch('/sessions/:id/close', requireAuth, requireAdmin, async (req, res) => {
  const session = await prisma.chatSession.update({
    where: { id: req.params.id },
    data: { isActive: false },
  })
  res.json({ session })
})
