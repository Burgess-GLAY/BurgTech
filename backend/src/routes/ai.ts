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

aiRouter.post('/chat', aiLimiter, async (req: Request, res: Response) => {
  try {
    let messages
    
    // Check if this is a multipart/form-data request (file upload)
    const contentType = req.headers['content-type'] || ''
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload with multer
      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error('File upload error:', err)
          return res.status(400).json({ error: 'File upload failed' })
        }
        
        try {
          const file = (req as any).file
          const message = req.body.message || ''
          
          messages = [{
            role: 'user' as const,
            content: message || `I've uploaded a file: ${file?.originalname || 'unknown'}. Please help me with it.`
          }]
          
          const reply = await getAIResponse(messages)
          const lastMsg = messages[messages.length - 1]?.content ?? ''
          res.json({ reply, quickReplies: getQuickReplies(lastMsg) })
        } catch (error) {
          console.error('AI chat error with file:', error)
          res.json({ reply: "I'm having trouble right now. Please try the contact form!" })
        }
      })
    } else {
      // Handle regular JSON request
      const result = chatSchema.safeParse(req.body)
      if (!result.success) {
        console.error('Validation error:', result.error.flatten().fieldErrors)
        return res.status(400).json({ error: result.error.flatten().fieldErrors })
      }
      messages = result.data.messages
      
      const reply = await getAIResponse(messages)
      const lastMsg = messages[messages.length - 1]?.content ?? ''
      res.json({ reply, quickReplies: getQuickReplies(lastMsg) })
    }
  } catch (error) {
    console.error('AI chat error:', error)
    res.json({ reply: "I'm having trouble right now. Please try the contact form!" })
  }
})
