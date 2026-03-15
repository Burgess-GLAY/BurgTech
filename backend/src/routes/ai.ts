import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { getAIResponse, getQuickReplies } from '../services/aiService'
import { aiLimiter } from '../middleware/rateLimiter'

export const aiRouter = Router()

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(20),
})

aiRouter.post('/chat', aiLimiter, async (req: Request, res: Response) => {
  const result = chatSchema.safeParse(req.body)
  if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
  try {
    const reply = await getAIResponse(result.data.messages)
    const lastMsg = result.data.messages[result.data.messages.length - 1]?.content ?? ''
    res.json({ reply, quickReplies: getQuickReplies(lastMsg) })
  } catch {
    res.json({ reply: "I'm having trouble right now. Please try the contact form!" })
  }
})
