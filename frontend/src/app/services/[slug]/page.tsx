import { apiClient } from '@/lib/api'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

async function getService(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/v1/services/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.service
  } catch { return null }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)
  if (!service) return (
    <div className="pt-28 pb-24 text-center">
      <h1 className="text-3xl font-bold mb-4">Service not found</h1>
      <Link href="/services" className="text-cyan-400 hover:underline">View all services</Link>
    </div>
  )
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-4">
          <Link href="/services" className="text-sm text-white/40 hover:text-white transition-colors">Services</Link>
          <span className="text-white/20 mx-2">/</span>
          <span className="text-sm text-white/60">{service.title}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-brand">{service.title}</h1>
        <p className="text-xl text-white/60 mb-10 leading-relaxed">{service.description}</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Technologies', items: service.technologies },
            { title: 'Use Cases',    items: service.useCases },
            { title: 'Benefits',     items: service.benefits },
          ].map(sec => (
            <div key={sec.title} className="glass-card p-5">
              <h3 className="font-semibold text-sm text-cyan-400 mb-3 uppercase tracking-wide">{sec.title}</h3>
              <ul className="space-y-2">
                {sec.items?.map((item: string) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
          <p className="text-white/50 mb-6">Let's discuss how {service.title} can help your business grow.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-400 text-slate-900 font-semibold rounded-xl hover:bg-cyan-300 transition-all">
            {service.ctaLabel || 'Get started'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
