'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, Send, User, Bot, Loader2, Search, Clock, CheckCircle2 } from 'lucide-react'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '@/hooks/useAuth'
import { cn, formatDate } from '@/lib/utils'

let socket: Socket | null = null

export default function AdminChatPage() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<any[]>([])
  const [activeSession, setActiveSession] = useState<any>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      transports: ['websocket'],
    })

    socket.on('connect', () => {
      socket!.emit('chat:getSessions')
    })

    socket.on('chat:sessions', (data: any[]) => {
      setSessions(data)
    })

    socket.on('chat:message', (msg: any) => {
      if (activeSession && msg.sessionId === activeSession.id) {
        setMessages(p => [...p, msg])
      }
      // Refresh sessions to update snippets
      socket?.emit('chat:getSessions')
    })

    socket.on('chat:session', ({ history }: any) => {
      setMessages(history)
    })

    socket.on('chat:typing', ({ isTyping, role }: any) => {
      if (role === 'visitor') setTyping(isTyping)
    })

    return () => {
      socket?.disconnect()
    }
  }, [activeSession?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const selectSession = (session: any) => {
    setActiveSession(session)
    socket?.emit('chat:adminJoin', { sessionId: session.id, adminId: user?.id })
    // Joined session, now messages should be loaded via chat:session listener
  }

  const sendMessage = () => {
    if (!input.trim() || !activeSession) return
    socket?.emit('chat:message', { content: input.trim() })
    setInput('')
  }

  const filteredSessions = sessions.filter(s => 
    s.visitorId.toLowerCase().includes(search.toLowerCase()) ||
    s.messages?.[0]?.content.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="h-[calc(100vh-140px)] flex glass-card overflow-hidden relative">
      {/* Sidebar */}
      <div className={cn(
        "w-full lg:w-80 border-r border-white/[0.06] flex flex-col transition-all duration-300",
        activeSession && "hidden lg:flex"
      )}>
        <div className="p-4 border-b border-white/[0.06]">
          <h2 className="text-lg font-bold text-white mb-4 lg:hidden">Live Assistance</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search chats..." 
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/30 outline-none focus:border-cyan-400/40 transition-colors" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-white/20">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs">No active chats</p>
            </div>
          ) : (
            filteredSessions.map(s => (
              <button 
                key={s.id} 
                onClick={() => selectSession(s)}
                className={cn(
                  "w-full text-left p-4 hover:bg-white/[0.02] transition-colors group",
                  activeSession?.id === s.id && "bg-cyan-400/5"
                )}
              >
                <div className="flex items-start justify-between mb-1">
                  <p className="text-sm font-semibold truncate flex-1 pr-2 text-white">Visitor {s.visitorId.slice(0, 8)}</p>
                  <span className="text-[10px] text-white/20 whitespace-nowrap">{formatDate(s.updatedAt)}</span>
                </div>
                <p className="text-xs text-white/40 truncate italic">
                  {s.messages?.[0]?.content || "No messages yet"}
                </p>
                {!s.adminJoined && (
                  <span className="inline-block mt-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={cn(
        "flex-1 flex flex-col bg-white/[0.01] transition-all duration-300",
        !activeSession && "hidden lg:flex"
      )}>
        {activeSession ? (
          <>
            <div className="px-4 lg:px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setActiveSession(null)} className="lg:hidden p-2 -ml-2 text-white/40 hover:text-white transition-colors">
                  <Search className="w-5 h-5 rotate-90" /> {/* Back icon placeholder */}
                </button>
                <div>
                  <h3 className="font-semibold text-sm text-white">Visitor {activeSession.visitorId.slice(0, 12)}...</h3>
                  <p className="text-[10px] text-white/40 flex items-center gap-1.5 capitalize">
                    <Clock className="w-3 h-3" /> Started {formatDate(activeSession.createdAt)}
                  </p>
                </div>
              </div>
              {activeSession.adminJoined && (
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 lg:px-6 py-6 space-y-4">
              {messages.map((m, i) => (
                <div key={m.id || i} className={cn("flex gap-3", m.sender === 'ADMIN' ? "flex-row-reverse" : "flex-row")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    m.sender === 'ADMIN' ? "bg-cyan-400/20 text-cyan-400" : "bg-blue-500/20 text-blue-400"
                  )}>
                    {m.sender === 'ADMIN' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="space-y-1">
                    <div className={cn(
                      "px-4 py-2 rounded-2xl text-sm leading-relaxed max-w-[280px] sm:max-w-md",
                      m.sender === 'ADMIN' ? "bg-cyan-400 text-slate-900 rounded-tr-sm" : "bg-white/[0.06] text-white/90 rounded-tl-sm"
                    )}>
                      {m.content}
                    </div>
                    <p className={cn("text-[10px] text-white/20", m.sender === 'ADMIN' ? "text-right" : "text-left")}>
                      {formatDate(m.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Bot className="w-4 h-4" /></div>
                  <div className="bg-white/[0.06] px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, delay: i*0.15, repeat: Infinity }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-4 lg:px-6 pb-6 pt-2">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-2 flex items-end gap-2 focus-within:border-cyan-400/40 transition-colors">
                <textarea 
                  value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                  placeholder="Type a response..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 resize-none outline-none py-2.5 px-3 min-h-[44px] max-h-32"
                />
                <button 
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-3 rounded-xl bg-cyan-400 text-slate-900 disabled:opacity-40 hover:bg-cyan-300 transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
              <MessageSquare className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Real-Time Assistance</h3>
            <p className="text-sm text-white/40 max-w-sm">Select a chat session from the sidebar to start providing live support to your visitors.</p>
          </div>
        )}
      </div>
    </div>
  )
}
