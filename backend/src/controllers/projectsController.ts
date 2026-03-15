import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

const projectSchema = z.object({
  title:        z.string().min(2).max(120),
  slug:         z.string().min(2).regex(/^[a-z0-9-]+$/),
  summary:      z.string().min(10).max(300),
  description:  z.string().min(20),
  client:       z.string().optional(),
  partner:      z.string().optional(),
  technologies: z.array(z.string()),
  imageUrls:    z.array(z.string()).default([]),
  liveUrl:      z.string().url().optional().or(z.literal('')),
  repoUrl:      z.string().url().optional().or(z.literal('')),
  status:       z.enum(['COMPLETED', 'IN_PROGRESS', 'ARCHIVED']).default('COMPLETED'),
  isFeatured:   z.boolean().default(false),
  completedAt:  z.string().datetime().optional(),
})

export async function listProjects(req: Request, res: Response) {
  const { featured, status, limit = '12', page = '1' } = req.query
  const where: any = {}
  if (featured === 'true') where.isFeatured = true
  if (status) where.status = status

  const take = Math.min(parseInt(limit as string), 50)
  const skip = (parseInt(page as string) - 1) * take

  const [projects, total] = await Promise.all([
    prisma.project.findMany({ where, take, skip, orderBy: [{ isFeatured: 'desc' }, { completedAt: 'desc' }] }),
    prisma.project.count({ where }),
  ])
  res.json({ projects, total, page: parseInt(page as string), pages: Math.ceil(total / take) })
}

export async function getProject(req: Request, res: Response) {
  const project = await prisma.project.findUnique({ where: { slug: req.params.slug } })
  if (!project) return res.status(404).json({ error: 'Project not found' })
  res.json({ project })
}

export async function createProject(req: Request, res: Response) {
  const result = projectSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const existing = await prisma.project.findUnique({ where: { slug: result.data.slug } })
  if (existing) return res.status(409).json({ error: 'Slug already exists' })
  const project = await prisma.project.create({ data: result.data as any })
  res.status(201).json({ project })
}

export async function updateProject(req: Request, res: Response) {
  const result = projectSchema.partial().safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  const project = await prisma.project.update({ where: { id: req.params.id }, data: result.data as any })
  res.json({ project })
}

export async function deleteProject(req: Request, res: Response) {
  await prisma.project.delete({ where: { id: req.params.id } })
  res.status(204).send()
}
