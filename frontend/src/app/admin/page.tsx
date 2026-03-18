'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { MessageSquare, FolderOpen, Users, FileText, Star, Plus, Layers } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({ queryKey: ['admin-stats'], queryFn: () => apiClient.get('/admin/stats').then(r => r.data) })

  const stats = [
    { label: 'Unread messages', value: data?.messages   ?? '—', icon: MessageSquare, color: 'bg-blue-500/10 text-blue-400' },
    { label: 'Total projects',  value: data?.projects   ?? '—', icon: FolderOpen,    color: 'bg-violet-500/10 text-violet-400' },
    { label: 'Team members',    value: data?.team       ?? '—', icon: Users,          color: 'bg-emerald-500/10 text-emerald-400' },
    { label: 'Published posts', value: data?.posts      ?? '—', icon: FileText,       color: 'bg-amber-500/10 text-amber-400' },
    { label: 'Testimonials',    value: data?.testimonials ?? '—', icon: Star,          color: 'bg-pink-500/10 text-pink-400' },
    { label: 'Services offered', value: data?.services   ?? '—', icon: Layers,        color: 'bg-blue-500/10 text-blue-400' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-white/40">Welcome back. Here's what's happening at Burtech.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="glass-card p-4">
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center mb-3', s.color)}><Icon className="w-4 h-4" /></div>
              <p className="text-2xl font-bold mb-0.5">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="glass-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h3 className="font-medium text-sm">Recent messages</h3>
          <a href="/admin/messages" className="text-xs text-cyan-400 hover:underline">View all</a>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {isLoading
            ? Array(4).fill(0).map((_, i) => (
                <div key={i} className="px-5 py-4 flex gap-3 animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                  <div className="flex-1 space-y-2"><div className="h-3 bg-white/10 rounded w-32" /><div className="h-2.5 bg-white/5 rounded w-56" /></div>
                </div>
              ))
            : (data?.recentMessages ?? []).length === 0
              ? <p className="px-5 py-8 text-center text-white/30 text-sm">No messages yet</p>
              : (data?.recentMessages ?? []).map((msg: any) => (
                  <div key={msg.id} className="px-5 py-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400 flex-shrink-0">{msg.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium">{msg.name}</p>
                        {msg.status === 'UNREAD' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                        <p className="text-xs text-white/30 ml-auto">{formatDate(msg.createdAt)}</p>
                      </div>
                      <p className="text-xs text-white/40 truncate">{msg.body}</p>
                    </div>
                  </div>
                ))
          }
        </div>
      </div>
    </div>
  )
}
