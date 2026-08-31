import express from 'express'
import http from 'http'
import { Server as SocketServer } from 'socket.io'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { createRateLimiter } from './middleware/rateLimiter'
import { errorHandler } from './middleware/errorHandler'
import { registerSocketHandlers } from './services/socketService'
import { prisma } from './lib/prisma'

// Routes
import { authRouter } from './routes/auth'
import { usersRouter } from './routes/users'
import { teamRouter } from './routes/team'
import { servicesRouter } from './routes/services'
import { projectsRouter } from './routes/projects'
import { testimonialsRouter } from './routes/testimonials'
import { blogRouter } from './routes/blog'
import { messagesRouter } from './routes/messages'
import { chatRouter } from './routes/chat'
import { aiRouter } from './routes/ai'
import { adminRouter } from './routes/admin'

const app = express()
app.set('trust proxy', 1)
const server = http.createServer(app)

export const io = new SocketServer(server, {
  cors: {
    origin: (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, ''),
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

registerSocketHandlers(io)

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/\/$/, ''),
  credentials: true,
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(createRateLimiter())

// Health
app.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    })
  } catch (error) {
    res.status(503).json({ 
      status: 'error', 
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// API Routes
const api = '/api/v1'
app.use(`${api}/auth`,         authRouter)
app.use(`${api}/users`,        usersRouter)
app.use(`${api}/team`,         teamRouter)
app.use(`${api}/services`,     servicesRouter)
app.use(`${api}/projects`,     projectsRouter)
app.use(`${api}/testimonials`, testimonialsRouter)
app.use(`${api}/blog`,         blogRouter)
app.use(`${api}/messages`,     messagesRouter)
app.use(`${api}/chat`,         chatRouter)
app.use(`${api}/ai`,           aiRouter)
app.use(`${api}/admin`,        adminRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Burtech API running on http://localhost:${PORT}`)
})

export default app
