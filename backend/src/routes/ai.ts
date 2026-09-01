import { Router, Request, Response } from 'express'
import { z } from 'zod'
import { getAIResponse, getQuickReplies } from '../services/aiService'
import { aiLimiter } from '../middleware/rateLimiter'
import multer from 'multer'

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

export const aiRouter = Router()

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().max(2000),
  })).max(20),
})

aiRouter.post('/chat', aiLimiter, upload.single('file'), async (req: Request, res: Response) => {
  try {
    let messages
    
    if (req.file) {
      // Handle file upload
      const file = req.file
      const message = req.body.message || ''
      
      // For now, just acknowledge the file and process the text message
      // File processing can be added later if needed
      messages = [{
        role: 'user' as const,
        content: message || `I've uploaded a file: ${file.originalname}. Please help me with it.`
      }]
    } else {
      const result = chatSchema.safeParse(req.body)
      if (!result.success) return res.status(400).json({ error: result.error.flatten().fieldErrors })
      messages = result.data.messages
    }
    
    const reply = await getAIResponse(messages)
    const lastMsg = messages[messages.length - 1]?.content ?? ''
    res.json({ reply, quickReplies: getQuickReplies(lastMsg) })
  } catch (error) {
    console.error('AI chat error:', error)
    res.json({ reply: "I'm having trouble right now. Please try the contact form!" })
  }
})
