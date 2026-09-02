'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'

type Sender = 'visitor' | 'bot'

interface Msg {
  id: string
  content: string
  sender: Sender
  createdAt: Date
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([{ 
      id: 'w', 
      content: "Hi! I'm Buri, Burtech's AI assistant. Ask me anything about our services!", 
      sender: 'bot', 
      createdAt: new Date() 
    }])
  }, [])

  useEffect(() => { 
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) 
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMsg = { id: Date.now().toString(), content: input.trim(), sender: 'visitor' as Sender, createdAt: new Date() }
    setMessages(p => [...p, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/v1/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages.map(m => ({ role: m.sender === 'visitor' ? 'user' : 'assistant', content: m.content }))
            .concat([{ role: 'user', content: input.trim() }])
        }),
      })

      const data = await response.json()
      
      if (data.reply) {
        setMessages(p => [...p, { 
          id: Date.now().toString(), 
          content: data.reply, 
          sender: 'bot' as Sender, 
          createdAt: new Date() 
        }])
      }
    } catch (err) {
      console.error('AI chat error:', err)
      setMessages(p => [...p, { 
        id: Date.now().toString(), 
        content: "Sorry, I'm having trouble connecting. Please try again or use the contact form.", 
        sender: 'bot' as Sender, 
        createdAt: new Date() 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Buri - AI Assistant</h3>
                <p className="text-xs text-blue-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'visitor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.sender === 'visitor'
                      ? 'bg-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
