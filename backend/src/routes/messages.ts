import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin } from '../middleware/auth'
import { sendContactEmail } from '../services/emailService'

export const messagesRouter = Router()

const schema = z.object({
  name:    z.string().min(2).max(80),
  email:   z.string().email(),
  subject: z.string().max(160).optional(),
  body:    z.string().min(10).max(5000),
})

messagesRouter.post('/', async (req: Request, res: Response) => {
  const result = schema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const message = await prisma.message.create({ data: result.data })
  sendContactEmail(result.data).catch(err => console.error('[Email]', err))
  res.status(201).json({ id: message.id, success: true })
})

messagesRouter.get('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const { status, page = '1', limit = '20' } = req.query
  const where: any = {}
  if (status) where.status = status
  const take = Math.min(parseInt(limit as string), 50)
  const skip = (parseInt(page as string) - 1) * take
  const [messages, total] = await Promise.all([
    prisma.message.findMany({ where, take, skip, orderBy: { createdAt: 'desc' } }),
    prisma.message.count({ where }),
  ])
  res.json({ messages, total, pages: Math.ceil(total / take) })
})

messagesRouter.patch('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const message = await prisma.message.update({ where: { id: req.params.id }, data: { status: req.body.status } })
  res.json({ message })
})

messagesRouter.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  await prisma.message.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
