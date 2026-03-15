'use client'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { apiClient } from '@/lib/api'
import { cn } from '@/lib/utils'

const FILTERS = ['ALL', 'COMPLETED', 'IN_PROGRESS']

export default function ProjectsPage() {
  const [status, setStatus] = useState('ALL')
  const { data, isLoading } = useQuery({
    queryKey: ['projects', status],
    queryFn: () => apiClient.get(`/projects${status !== 'ALL' ? `?status=${status}` : ''}`).then(r => r.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  const projects = data?.projects ?? []

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Our <span className="gradient-text-brand">projects</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">A selection of work we've delivered for clients across industries.</p>
        </div>

        <div className="flex gap-2 justify-center mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setStatus(f)} className={cn('px-4 py-2 rounded-xl text-sm font-medium transition-colors', status === f ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/25' : 'border border-white/[0.08] text-white/40 hover:text-white')}>
              {f === 'ALL' ? 'All' : f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_, i) => <div key={i} className="glass-card h-64 animate-pulse" />)}
          </div>
        ) : projects.length === 0 ? (
          <p className="text-center text-white/30 py-20">No projects found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p: any, i: number) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Link href={`/projects/${p.slug}`} className="group block glass-card overflow-hidden hover:border-cyan-400/20 transition-all h-full">
                  <div className="h-44 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
                    {p.imageUrls?.[0]
                      ? <img src={p.imageUrls[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <span className="text-4xl font-bold text-blue-700">{p.title.charAt(0)}</span>
                    }
                    <div className="absolute top-2 right-2 flex gap-1">
                      {p.isFeatured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-400 border border-cyan-400/30">Featured</span>}
                      <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', p.status === 'COMPLETED' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20')}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                      {p.liveUrl && (
                        <div onClick={(e) => e.preventDefault()} className="inline-block">
                          <a href={p.liveUrl} target="_blank" rel="noopener" className="text-white/30 hover:text-cyan-400 transition-colors flex-shrink-0">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                    {p.client && <p className="text-xs text-white/40 mb-2">Client: {p.client}</p>}
                    <p className="text-sm text-white/50 mb-4 line-clamp-2">{p.summary}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.slice(0,4).map((t: string) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
