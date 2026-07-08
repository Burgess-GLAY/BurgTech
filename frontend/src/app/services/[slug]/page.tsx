import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

async function getService(slug: string) {
  try {
    const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const url = `${base}/api/v1/services/${slug}`
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) {
      console.error(`Service fetch failed: ${res.status} ${url}`)
      return null
    }
    const data = await res.json()
    return data.service ?? null
  } catch (err) {
    console.error('getService error:', err)
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await getService(params.slug)
  if (!service) return { title: 'Service Not Found | BurgTech Solutions' }
  return {
    title: `${service.title} | BurgTech Solutions`,
    description: service.summary,
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)

  if (!service) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Service not found</h1>
        <p className="text-white/40 mb-8 max-w-md">This service does not exist or may have been removed.</p>
        <Link href="/services" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white font-medium">
          Back to all services
        </Link>
      </div>
    )
  }

  // Split title for gradient effect on last word
  const titleWords = service.title.split(' ')
  const lastWord = titleWords.pop()
  const mainTitle = titleWords.join(' ')

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* 1. Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm font-medium">
          <Link href="/services" className="text-white/40 hover:text-white transition-colors">Services</Link>
          <span className="text-white/10">/</span>
          <span className="text-white/60">{service.title}</span>
        </div>

        {/* 2. & 3. Title and Summary */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            {mainTitle} <span className="gradient-text-brand">{lastWord}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 leading-relaxed max-w-3xl">
            {service.summary}
          </p>
        </div>

        {/* 4. Three-column info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bt-cyan mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan" /> Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies?.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-white/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bt-cyan mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan" /> Use Cases
            </h3>
            <ul className="space-y-3">
              {service.useCases?.map((useCase: string) => (
                <li key={useCase} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                  <CheckCircle size={16} className="text-bt-cyan flex-shrink-0 mt-0.5" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-bt-cyan mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan" /> Key Benefits
            </h3>
            <ul className="space-y-3">
              {service.benefits?.map((benefit: string) => (
                <li key={benefit} className="flex items-start gap-3 text-sm text-white/50 leading-relaxed">
                  <CheckCircle size={16} className="text-bt-cyan flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Full description */}
        <div className="max-w-4xl mb-24">
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: service.description.replace(/\n/g, '<br/>') }}
          />
        </div>

        {/* 6. CTA banner */}
        <div className="glass-card p-12 md:p-16 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-bt-cyan-subtle to-transparent opacity-50 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Ready to get started?</h2>
            <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
              Let's discuss how {service.title} can help your business achieve its digital objectives.
            </p>
            <Link
              href="/contact"
              className="btn-primary"
            >
              {service.ctaLabel || 'Get Started'} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
