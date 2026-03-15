import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { sendWelcomeEmail } from '../services/emailService'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password needs uppercase, lowercase, and number'),
})

function signToken(payload: object) {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })

  const { email, password } = result.data
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.isActive) return res.status(401).json({ error: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })

  const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatarUrl: user.avatarUrl } })
}

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })

  const { name, email, password } = result.data
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(409).json({ error: 'Email already registered' })

  const passwordHash = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: 'CLIENT' },
    select: { id: true, name: true, email: true, role: true },
  })

  const token = signToken({ id: user.id, email: user.email, role: user.role, name: user.name })
  sendWelcomeEmail(user.email, user.name).catch(err => console.error('[Welcome Email]', err))
  res.status(201).json({ token, user })
}

export async function me(req: Request & { user?: any }, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, role: true, avatarUrl: true, createdAt: true },
  })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user })
}
