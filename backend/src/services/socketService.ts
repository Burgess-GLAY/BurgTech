import { Server, Socket } from 'socket.io'
import { prisma } from '../lib/prisma'
import { sendChatNotificationEmail } from './emailService'
import jwt from 'jsonwebtoken'

export function registerSocketHandlers(io: Server) {

  io.use((socket: any, next) => {
    const token = socket.handshake.auth.token
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        socket.data.user = decoded
        next()
      } catch (err) {
        console.log('[Socket] Invalid token, allowing anonymous connection')
        next() // Allow anonymous connections for visitors
      }
    } else {
      next() // Allow anonymous connections for visitors
    }
  })

  io.on('connection', (socket: Socket) => {
    console.log(`[Socket] Connected: ${socket.id}, User: ${socket.data.user?.email || 'anonymous'}`)

    socket.on('chat:join', async ({ visitorId, sessionId }: { visitorId: string; sessionId?: string }) => {
      let session = sessionId
        ? await prisma.chatSession.findUnique({ where: { id: sessionId } })
        : null

      if (!session) {
        session = await prisma.chatSession.create({ data: { visitorId } })
      }

      socket.join(session.id)
      socket.data.sessionId = session.id
      socket.data.role = 'visitor'

      const history = await prisma.chatMessage.findMany({
        where: { sessionId: session.id },
        orderBy: { createdAt: 'asc' },
        take: 30,
      })
      socket.emit('chat:session', { sessionId: session.id, history })
    })

    socket.on('chat:adminJoin', async ({ sessionId, adminId }: { sessionId: string; adminId: string }) => {
      const session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
      if (!session) return
      socket.join(sessionId)
      socket.data.sessionId = sessionId
      socket.data.role = 'admin'
      socket.data.adminId = adminId
      await prisma.chatSession.update({ where: { id: sessionId }, data: { adminJoined: true } })
      io.to(sessionId).emit('chat:adminJoined', { sessionId })
    })

    socket.on('chat:message', async ({ content }: { content: string }) => {
      const sessionId = socket.data.sessionId
      if (!sessionId || !content?.trim()) return
      const sender = socket.data.role === 'admin' ? 'ADMIN' : 'VISITOR'
      const message = await prisma.chatMessage.create({
        data: { sessionId, sender, content: content.trim() },
      })
      io.to(sessionId).emit('chat:message', {
        id: message.id, sender: message.sender,
        content: message.content, createdAt: message.createdAt,
      })
      if (sender === 'VISITOR') {
        const session = await prisma.chatSession.findUnique({ where: { id: sessionId } })
        if (session && !session.adminJoined) {
          sendChatNotificationEmail(content.trim(), session.visitorId).catch(console.error)
        }
      }
    })

    socket.on('chat:typing', ({ isTyping }: { isTyping: boolean }) => {
      const sessionId = socket.data.sessionId
      if (sessionId) socket.to(sessionId).emit('chat:typing', { isTyping, role: socket.data.role })
    })

    socket.on('chat:getSessions', async () => {
      const sessions = await prisma.chatSession.findMany({
        where: { 
          OR: [
            { isActive: true },
            { updatedAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } } // Sessions updated in last 24 hours
          ]
        },
        include: { messages: { orderBy: { createdAt: 'desc' }, take: 1 } },
        orderBy: { updatedAt: 'desc' },
        take: 50,
      })
      socket.emit('chat:sessions', sessions)
    })

    socket.on('disconnect', async () => {
      const sessionId = socket.data.sessionId
      if (sessionId && socket.data.role === 'visitor') {
        await prisma.chatSession.update({
          where: { id: sessionId },
          data: { isActive: false },
        }).catch(() => {})
      }
    })
  })
}
