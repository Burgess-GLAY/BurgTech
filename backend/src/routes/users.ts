import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { requireAuth, requireSuperAdmin } from '../middleware/auth'
import { auditLog } from '../middleware/audit'

export const usersRouter = Router()

const userUpdateSchema = z.object({
  name: z.string().min(2).max(80).optional(),
  email: z.string().email().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'TEAM_MEMBER', 'CLIENT']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).optional(),
})

usersRouter.get('/', requireAuth, requireSuperAdmin, async (_req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json({ users })
})

usersRouter.put('/:id', requireAuth, requireSuperAdmin, auditLog('User'), async (req, res) => {
  const result = userUpdateSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })

  const { password, ...otherData } = result.data
  const data: any = { ...otherData }
  if (password) data.passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.user.update({
    where: { id: req.params.id },
    data,
    select: { id: true, name: true, email: true, role: true, isActive: true },
  })
  res.json({ user })
})

usersRouter.delete('/:id', requireAuth, requireSuperAdmin, auditLog('User'), async (req: any, res) => {
  if (req.params.id === req.user.id) return res.status(400).json({ error: 'Cannot delete your own account' })

  const target = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!target) return res.status(404).json({ error: 'User not found' })

  if (target.role === 'SUPER_ADMIN') {
    const superAdminCount = await prisma.user.count({ where: { role: 'SUPER_ADMIN' } })
    if (superAdminCount <= 1) return res.status(400).json({ error: 'Cannot delete the last super admin' })
  }

  await prisma.user.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
