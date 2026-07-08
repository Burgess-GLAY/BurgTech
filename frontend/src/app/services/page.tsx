'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { apiClient } from '@/lib/api'

export default function ServicesPage() {
  const { data } = useQuery({
    queryKey: ['services'],
    queryFn: () => apiClient.get('/services').then(r => r.data.services),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  const services = data ?? []
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-bt-cyan text-sm font-medium tracking-wide uppercase">Services</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Everything you need to <span className="gradient-text-brand">scale digitally</span></h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">From concept to deployment, we cover every layer of the digital stack.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s: any, i: number) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/services/${s.slug}`} className="group flex flex-col gap-4 p-6 glass-card hover:border-bt-cyan/20 transition-all h-full">
                <h3 className="font-semibold text-lg group-hover:text-bt-cyan transition-colors">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{s.summary}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.technologies?.slice(0,4).map((t: string) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-white/30 group-hover:text-bt-cyan transition-colors">
                  Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
