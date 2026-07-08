'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { MessageSquare, FolderOpen, Users, FileText, Star, Layers } from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'
import { apiClient } from '@/lib/api'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => apiClient.get('/admin/stats').then(r => r.data),
    staleTime: 60_000,
  })

  const stats = [
    { label: 'Unread messages', value: data?.messages ?? '—', icon: MessageSquare, color: 'bg-bt-teal-subtle text-bt-cyan' },
    { label: 'Total projects', value: data?.projects ?? '—', icon: FolderOpen, color: 'bg-bt-cyan-subtle text-bt-cyan' },
    { label: 'Team members', value: data?.team ?? '—', icon: Users, color: 'bg-bt-teal-subtle text-bt-cyan' },
    { label: 'Published posts', value: data?.posts ?? '—', icon: FileText, color: 'bg-bt-cyan-subtle text-bt-cyan' },
    { label: 'Testimonials', value: data?.testimonials ?? '—', icon: Star, color: 'bg-bt-teal-subtle text-bt-cyan' },
    { label: 'Services offered', value: data?.services ?? '—', icon: Layers, color: 'bg-bt-cyan-subtle text-bt-cyan' },
  ]

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-white/40">Welcome back. Here's what's happening at BurgTech.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="glass-card p-5"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-4', s.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-3xl font-bold mb-1">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Messages over time */}
        <div className="glass-card p-5">
          <p className="text-sm font-medium mb-4">Messages — last 30 days</p>
          {isLoading ? (
            <div className="h-48 rounded-lg bg-white/5 animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={192}>
              <LineChart data={data?.messagesTimeSeries ?? []} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                  tickFormatter={(v: string) => v.slice(5)}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#050e12', border: '1px solid rgba(61, 214, 200, 0.1)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: '#3dd6c8' }}
                />
                <Line type="monotone" dataKey="count" stroke="#3dd6c8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Posts by category */}
        <div className="glass-card p-5">
          <p className="text-sm font-medium mb-4">Posts by category</p>
          {isLoading ? (
            <div className="h-48 rounded-lg bg-white/5 animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={192}>
              <BarChart data={data?.postsByCategory ?? []} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="category"
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
                  tickFormatter={(v: string) => v.replace(/_/g, ' ').slice(0, 10)}
                />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#050e12', border: '1px solid rgba(61, 214, 200, 0.1)', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
                  itemStyle={{ color: '#2d7a8a' }}
                />
                <Bar dataKey="count" fill="#2d7a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Recent messages */}
      <div className="glass-card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h3 className="font-medium text-sm">Recent messages</h3>
          <a href="/admin/messages" className="text-xs text-bt-cyan hover:underline">View all</a>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {isLoading
            ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="px-5 py-4 flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-32" />
                  <div className="h-2.5 bg-white/5 rounded w-56" />
                </div>
              </div>
            ))
            : (data?.recentMessages ?? []).length === 0
              ? <p className="px-5 py-8 text-center text-white/30 text-sm">No messages yet</p>
              : (data?.recentMessages ?? []).map((msg: any) => (
                <div key={msg.id} className="px-5 py-4 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                  <div className="w-8 h-8 rounded-full bg-bt-teal-subtle flex items-center justify-center text-xs font-semibold text-bt-teal flex-shrink-0">
                    {msg.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-medium">{msg.name}</p>
                      {msg.status === 'UNREAD' && <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan" />}
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
