import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { requireAuth, requireAdmin, requireTeamMember, optionalAuth, AuthRequest } from '../middleware/auth'

export const blogRouter = Router()

const blogPostSchema = z.object({
  title:       z.string().min(2).max(120),
  slug:        z.string().min(2).regex(/^[a-z0-9-]+$/),
  summary:     z.string().min(10).max(300),
  content:     z.string().min(20),
  coverImage:  z.string().url().optional().or(z.literal('')),
  category:    z.enum(['COMPANY_NEWS', 'TECH_INSIGHTS', 'PROJECT_ANNOUNCEMENT', 'AI_DATA_SCIENCE', 'TUTORIAL']),
  tags:        z.array(z.string()).default([]),
  isPublished: z.boolean().default(false),
})

blogRouter.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  const isAdmin = req.user && ['SUPER_ADMIN', 'ADMIN', 'TEAM_MEMBER'].includes(req.user.role)
  const { category, limit = '10', page = '1' } = req.query
  
  const where: any = isAdmin ? {} : { isPublished: true }
  if (category) where.category = category
  
  const take = Math.min(parseInt(limit as string), 50)
  const skip = (parseInt(page as string) - 1) * take
  
  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where, take, skip,
      orderBy: { publishedAt: 'desc' },
      include: { author: { select: { name: true } } },
    }),
    prisma.blogPost.count({ where }),
  ])
  res.json({ posts, total, pages: Math.ceil(total / take) })
})

blogRouter.get('/:slug', async (req: Request, res: Response) => {
  const post = await prisma.blogPost.findUnique({
    where: { slug: req.params.slug },
    include: { author: { select: { name: true } } },
  })
  if (!post) return res.status(404).json({ error: 'Post not found' })
  res.json({ post })
})

blogRouter.post('/', requireAuth, requireTeamMember, async (req: AuthRequest, res: Response) => {
  const result = blogPostSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  
  const existing = await prisma.blogPost.findUnique({ where: { slug: result.data.slug } })
  if (existing) return res.status(409).json({ error: 'Slug already exists' })

  const post = await prisma.blogPost.create({
    data: { 
      ...result.data, 
      authorId: req.user!.id, 
      publishedAt: result.data.isPublished ? new Date() : null 
    },
  })
  res.status(201).json({ post })
})

blogRouter.put('/:id', requireAuth, requireTeamMember, async (req: AuthRequest, res: Response) => {
  const result = blogPostSchema.partial().safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  
  const data: any = { ...result.data }
  if (result.data.isPublished !== undefined) {
    data.publishedAt = result.data.isPublished ? new Date() : null
  }

  const post = await prisma.blogPost.update({
    where: { id: req.params.id },
    data,
  })
  res.json({ post })
})

blogRouter.delete('/:id', requireAuth, requireAdmin, async (req: Request, res: Response) => {
  await prisma.blogPost.delete({ where: { id: req.params.id } })
  res.status(204).send()
})
