'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Mail, Check, Archive, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { apiClient } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const STATUSES = ['ALL', 'UNREAD', 'READ', 'REPLIED', 'ARCHIVED']

export default function AdminMessages() {
  const router = useRouter()
  const qc = useQueryClient()
  const [filter, setFilter] = useState('ALL')
  const [selected, setSelected] = useState<any>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-messages', filter],
    staleTime: 60_000,
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/messages${filter !== 'ALL' ? `?status=${filter}` : ''}`)
        return res.data
      } catch (err: any) {
        if (err?.response?.status === 401) {
          // Token expired — redirect to login without triggering a global logout
          router.push('/admin/login')
          return null
        }
        toast.error('Failed to load messages')
        throw err
      }
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => apiClient.patch(`/messages/${id}`, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-messages'] }); toast.success('Updated') },
  })

  const messages = data?.messages ?? []

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Messages</h2>
          <p className="text-sm text-white/40 mt-0.5">{data?.total ?? 0} total messages</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {STATUSES.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={cn('px-3 py-1.5 rounded-xl text-xs font-medium transition-colors whitespace-nowrap', filter === s ? 'bg-bt-cyan/15 text-bt-cyan border border-bt-cyan/25' : 'border border-white/[0.08] text-white/40 hover:text-white')}>
            {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Message list — Hidden on mobile if a message is selected */}
        <div className={cn(
          "lg:col-span-2 glass-card overflow-hidden h-fit transition-all duration-300",
          selected && "hidden lg:block"
        )}>
          <div className="divide-y divide-white/[0.04]">
            {isLoading ? Array(6).fill(0).map((_, i) => (
              <div key={i} className="px-4 py-4 animate-pulse flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                <div className="flex-1 space-y-2"><div className="h-3 bg-white/10 rounded w-28" /><div className="h-2 bg-white/5 rounded w-40" /></div>
              </div>
            )) : messages.length === 0 ? (
              <p className="py-12 text-center text-white/30 text-sm">No messages found</p>
            ) : messages.map((msg: any) => (
              <button key={msg.id} onClick={() => { setSelected(msg); updateMutation.mutate({ id: msg.id, status: 'READ' }) }}
                className={cn('w-full text-left px-4 py-4 flex gap-3 hover:bg-white/[0.03] transition-colors', selected?.id === msg.id && 'bg-white/[0.04]')}
              >
                <div className="w-8 h-8 rounded-full bg-bt-cyan/20 flex items-center justify-center text-xs font-semibold text-bt-cyan flex-shrink-0">{msg.name.charAt(0)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-medium truncate">{msg.name}</p>
                    {msg.status === 'UNREAD' && <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-white/40 truncate">{msg.body}</p>
                  <p className="text-xs text-white/20 mt-1">{formatDate(msg.createdAt)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Message detail */}
        <div className={cn(
          "lg:col-span-3",
          !selected && "hidden lg:block"
        )}>
          {selected ? (
            <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 h-full">
              <div className="lg:hidden mb-4">
                <button onClick={() => setSelected(null)} className="text-xs text-bt-cyan flex items-center gap-1 hover:underline">
                  ← Back to messages
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-bt-cyan hover:underline">{selected.email}</a>
                  {selected.subject && <p className="text-sm text-white/50 mt-1">Subject: {selected.subject}</p>}
                  <p className="text-xs text-white/30 mt-1">{formatDate(selected.createdAt)}</p>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <button onClick={() => updateMutation.mutate({ id: selected.id, status: 'REPLIED' })} title="Mark replied" className="p-2 text-white/40 hover:text-emerald-400 rounded-lg hover:bg-emerald-500/5 transition-colors border border-white/[0.06]"><Check className="w-4 h-4" /></button>
                  <button onClick={() => updateMutation.mutate({ id: selected.id, status: 'ARCHIVED' })} title="Archive" className="p-2 text-white/40 hover:text-amber-400 rounded-lg hover:bg-amber-500/5 transition-colors border border-white/[0.06]"><Archive className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="bg-white/[0.03] rounded-xl p-4 mb-6">
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{selected.body}</p>
              </div>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject || 'Your message to Burtech'}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-bt-cyan text-bg-primary text-sm font-semibold rounded-xl hover:bg-bt-cyan-light transition-colors w-full sm:w-auto">
                <Mail className="w-4 h-4" /> Reply via email
              </a>
            </motion.div>
          ) : (
            <div className="glass-card p-6 h-[400px] flex items-center justify-center">
              <div className="text-center text-white/20">
                <Mail className="w-10 h-10 mx-auto mb-3" />
                <p className="text-sm">Select a message to view it</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
