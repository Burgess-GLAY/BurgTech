import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin, optionalAuth, AuthRequest } from '../middleware/auth'

export const teamRouter = Router()

const teamSchema = z.object({
  userId:      z.string().cuid(),
  title:       z.string().min(2).max(100),
  bio:         z.string().min(10),
  photoUrl:    z.string().url().optional().or(z.literal('')),
  skills:      z.array(z.string()).default([]),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  githubUrl:   z.string().url().optional().or(z.literal('')),
  twitterUrl:  z.string().url().optional().or(z.literal('')),
  order:       z.number().int().default(0),
  isVisible:   z.boolean().default(true),
})

teamRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user && ['SUPER_ADMIN', 'ADMIN'].includes(req.user.role)
  const where = isAdmin ? {} : { isVisible: true }
  
  const team = await prisma.teamMember.findMany({
    where,
    include: { user: { select: { name: true, email: true, role: true } } },
    orderBy: { order: 'asc' },
  })
  res.json({ team })
})

teamRouter.post('/', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const result = teamSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const member = await prisma.teamMember.create({ data: result.data as any })
  res.status(201).json({ member })
})

teamRouter.put('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  const result = teamSchema.partial().safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const member = await prisma.teamMember.update({ 
    where: { id: req.params.id }, 
    data: result.data as any 
  })
  res.json({ member })
})

teamRouter.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  await prisma.teamMember.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
