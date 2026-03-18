'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Globe, Palette, Smartphone, BarChart3, Cloud, Plug, Search, Layers, Brain, Star, User, Award, Quote, ChevronLeft, ChevronRight, Calendar, Clock, Code2, Server, GitBranch, TrendingUp, Database, ChevronDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { formatDate, cn } from '@/lib/utils'

// ─── Constants ───────────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ElementType> = {
  'web-development': Globe,
  'web-design': Palette,
  'mobile-apps': Smartphone,
  'data-analytics': BarChart3,
  'cloud-migration': Cloud,
  'api-integration': Plug,
  'seo-content': Search,
  'project-management': Layers,
  'predictive-analytics': Brain,
  'software-development': Code2,
  'data-science': Globe, // Fallback if needed
  'ai-ml': Sparkles,
  'cloud-architecture': Server,
  'devops': GitBranch,
  'digital-transformation': TrendingUp,
  'database-systems': Database,
}

const CATEGORY_GROUPS = [
  {
    label: 'Development',
    color: 'text-blue-400',
    slugs: [
      'web-development', 'web-design', 'mobile-apps',
      'software-development', 'database-systems', 'api-integration',
    ],
  },
  {
    label: 'Data & Intelligence',
    color: 'text-violet-400',
    slugs: [
      'data-analytics', 'predictive-analytics',
      'data-science', 'ai-ml',
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    color: 'text-cyan-400',
    slugs: ['cloud-migration', 'cloud-architecture', 'devops'],
  },
  {
    label: 'Growth & Strategy',
    color: 'text-emerald-400',
    slugs: [
      'seo-content', 'project-management', 'digital-transformation',
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────
function TestimonialCard({ t, i }: { t: any; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      className="glass-card group p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/[0.04] relative flex flex-col h-full"
    >
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={14} className={j < t.rating ? "fill-blue-400 text-blue-400" : "text-white/10"} />
        ))}
      </div>

      <p className="text-slate-300 leading-relaxed text-lg flex-1 mb-8 italic">
        "{t.content}"
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-400 font-bold border border-white/10">
          {t.authorName.charAt(0)}
        </div>
        <div>
          <div className="font-display font-bold text-white group-hover:text-blue-400 transition-colors">{t.authorName}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">
            {t.authorRole} {t.company ? `· ${t.company}` : ''}
          </div>
        </div>
      </div>
      <Quote size={40} className="absolute top-8 right-8 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none" />
    </motion.div>
  )
}

function MobileServiceItem({
  service,
  isOpen,
  onToggle,
  isActive,
  onSelect,
}: {
  service: any
  isOpen: boolean
  onToggle: () => void
  isActive: boolean
  onSelect: () => void
}) {
  return (
    <div className="px-2">
      <button
        onClick={() => {
          onToggle()
          onSelect()
        }}
        className={cn(
          "w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all mt-1",
          isActive ? "bg-cyan-400/10" : "hover:bg-white/[0.03]"
        )}
      >
        <span className={cn(
          'text-base transition-colors text-left',
          isActive ? 'text-cyan-400 font-semibold' : 'text-white/80 font-medium'
        )}>
          {service.title}
        </span>
        <div className="flex items-center gap-3">
          <ChevronDown className={cn(
            'w-4 h-4 text-white/40 transition-transform duration-200 flex-shrink-0 lg:hidden',
            isOpen && 'rotate-180 text-cyan-400'
          )} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pb-6 pt-2 space-y-5">
              <p className="text-white/60 leading-relaxed text-sm">
                {service.summary}
              </p>
              {service.useCases?.length > 0 && (
                <ul className="grid grid-cols-1 gap-2 mt-4">
                  {service.useCases.slice(0, 4).map((u: string) => (
                    <li key={u} className="flex items-start gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="flex-1">{u}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col gap-3 pt-3">
                <Link href={`/services/${service.slug}`} className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm border border-white/[0.12] text-white/70 rounded-xl hover:text-white transition-all">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(51,143,255,0.1) 0%, transparent 70%)' }} />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24 md:pt-32"
        initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-base font-medium mb-8">
            <Sparkles className="w-3.5 h-3.5" /> AI-Driven Technology Company
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="gradient-text">Build smarter.</span><br />
            <span className="text-white">Scale faster.</span><br />
            <span className="gradient-text-brand">Grow further.</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Burtech Solution delivers advanced digital solutions — from web platforms and mobile apps to AI analytics and cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-9 py-4 bg-cyan-400 text-slate-900 font-semibold rounded-xl hover:bg-cyan-300 transition-all">
              Start a project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/projects" className="inline-flex items-center gap-2 px-9 py-4 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
              View our work
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Web Development', 'Mobile Apps', 'Data Analytics', 'Cloud Migration', 'AI Solutions'].map(t => (
              <span key={t} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/[0.08] bg-white/[0.02]">{t}</span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export function StatsSection() {
  const { data: services } = useQuery({
    queryKey: ['services-preview'],
    queryFn: () => apiClient.get('/services').then(r => r.data.services),
  })

  const stats = [
    { value: '30+', label: 'Projects delivered' },
    { value: services?.length?.toString() || '16', label: 'Services offered' },
    { value: '4', label: 'Expert team members' },
    { value: '100%', label: 'Client satisfaction' }
  ]
  return (
    <section className="border-y border-white/[0.06] py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
            <p className="text-3xl md:text-4xl font-bold gradient-text-brand">{s.value}</p>
            <p className="text-base text-white/40 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Services Preview ─────────────────────────────────────────────────────────
export function ServicesPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['services-all'],
    queryFn: () => apiClient.get('/services').then(r => r.data.services),
    staleTime: 5 * 60 * 1000,
  })
  const services: any[] = data ?? []

  const [activeSlug, setActiveSlug] = useState<string>('')
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const grouped = CATEGORY_GROUPS.map(group => ({
    ...group,
    services: group.slugs
      .map(slug => services.find((s: any) => s.slug === slug))
      .filter(Boolean),
  })).filter(g => g.services.length > 0)

  useEffect(() => {
    if (grouped.length > 0) {
      if (!openCategory) setOpenCategory(grouped[0].label)
      if (!activeSlug && grouped[0].services.length > 0) {
        setActiveSlug(grouped[0].services[0].slug)
      }
    }
  }, [grouped.length, openCategory, activeSlug])

  const selectedService = services.find((s: any) => s.slug === activeSlug)

  return (
    <section className="section-pad">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="text-cyan-400 text-base font-semibold uppercase tracking-widest">What we do</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
          End-to-end digital <span className="gradient-text-brand">solutions</span>
        </h2>
        <p className="text-white/55 text-xl max-w-2xl mx-auto leading-relaxed">
          {services.length} services across {CATEGORY_GROUPS.length} specialisations
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[400px,1fr] gap-12 items-start">
          {/* Navigator Column */}
          <div className="space-y-4">
            {isLoading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="glass-card h-16 animate-pulse rounded-2xl" />)
            ) : (
              grouped.map((group) => (
                <div key={group.label} className="glass-card overflow-hidden rounded-2xl border border-white/[0.05] transition-all">
                  <button
                    onClick={() => setOpenCategory(openCategory === group.label ? null : group.label)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className={`text-base md:text-lg font-bold ${group.color}`}>{group.label}</span>
                    <ChevronDown className={cn('w-4 h-4 text-white/40 transition-transform duration-300', openCategory === group.label && 'rotate-180')} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openCategory === group.label && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white/[0.01]">
                        <div className="border-t border-white/[0.05] p-1">
                          {group.services.map((service: any) => (
                            <MobileServiceItem
                              key={service.slug}
                              service={service}
                              isOpen={activeSlug === service.slug}
                              onToggle={() => { }}
                              isActive={activeSlug === service.slug}
                              onSelect={() => setActiveSlug(service.slug)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>

          {/* Desktop Detail Column */}
          <div className="hidden lg:block sticky top-24">
            <AnimatePresence mode="wait">
              {selectedService ? (
                <motion.div key={selectedService.slug} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-10 rounded-[2.5rem] border-white/10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-white">{selectedService.title}</h3>
                      <p className="text-cyan-400 font-medium">Description</p>
                    </div>
                    {(() => {
                      const Icon = SERVICE_ICONS[selectedService.slug] || Code2
                      return <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 border border-cyan-400/20"><Icon size={32} /></div>
                    })()}
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-10">{selectedService.summary}</p>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {selectedService.useCases?.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Use Cases</h4>
                        <ul className="space-y-3">
                          {selectedService.useCases.slice(0, 4).map((u: string) => (
                            <li key={u} className="flex items-start gap-3 text-sm text-white/70"><span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-cyan-400 flex-shrink-0" />{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <Link href={`/services/${selectedService.slug}`} className="px-8 py-3.5 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 transition-all inline-flex items-center gap-2">
                      Full Service Details <ArrowRight size={18} />
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Featured Projects ────────────────────────────────────────────────────────
export function FeaturedProjects() {
  const { data } = useQuery({
    queryKey: ['projects-featured-all'],
    queryFn: () => apiClient.get('/projects?featured=true&limit=4').then(r => r.data.projects),
  })
  const projects = data ?? []
  if (!projects.length) return null
  return (
    <section className="section-pad bg-white/[0.01]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="text-cyan-400 text-base font-semibold tracking-widest uppercase">Our work</span>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Featured <span className="gradient-text-brand">projects</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {projects.map((p: any, i: number) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group glass-card overflow-hidden hover:border-cyan-400/20 transition-all">
            <div className="h-48 bg-slate-900 flex items-center justify-center overflow-hidden">
              {p.imageUrls?.[0] ? <img src={p.imageUrls[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <span className="text-4xl font-bold text-white/10">{p.title.charAt(0)}</span>}
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="text-base text-white/55 mb-4 line-clamp-2 leading-relaxed">{p.summary}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const itemsPerPage = 3

  const { data, isLoading } = useQuery({
    queryKey: ['testimonials-featured'],
    queryFn: () => apiClient.get('/testimonials?featured=true&limit=4').then(r => r.data.testimonials),
    staleTime: 5 * 60 * 1000,
  })
  const items = (data ?? []).slice(0, 4)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-base font-medium mb-4">
            <Quote size={14} /><span>Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            What our clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">say</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">See how we've helped our partners scale.</p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-8 rounded-2xl animate-pulse h-64" />
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {items.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((t: any, i: number) => (
                  <TestimonialCard key={t.id} t={t} i={i} />
                ))}
              </AnimatePresence>
            </div>

            {items.length > itemsPerPage && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={prevPage}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all duration-300',
                        i === page ? 'w-8 bg-blue-400' : 'bg-white/20'
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/50 hover:text-white"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Founder ──────────────────────────────────────────────────────────────────
export function FounderSection() {
  return (
    <section id="founder" className="py-24 bg-white/[0.01]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-2 md:order-1"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-blue-500/20 rounded-3xl rotate-6 -z-10" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl -z-10" />
                <img
                  src="/images/burgess.jpg"
                  alt="Burgess Awalayah Glay"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 space-y-8"
            >
              <div>
                <span className="text-base font-semibold tracking-wider uppercase text-sm">Our Founder</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">Burgess Awalayah <span className="gradient-text-brand">Glay</span></h2>
                <div className="w-20 h-1 bg-blue-500 rounded-full mb-8" />
                <p className="text-xl text-white/80 leading-relaxed italic">
                  "Technology is most powerful when it's accessible, scalable, and serves a human purpose."
                </p>
              </div>

              <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                <p>
                  As the Chief Systems Architect and Founder of Burtech Solutions, Burgess leads the technical vision with a focus on Data Science, Analytics, and Artificial Intelligence.
                </p>
                <p>
                  Since founding the company on April 18, 2025, his commitment to engineering excellence and innovation has driven our team to deliver transformative solutions for our clients.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold">2+ Years</p>
                    <p className="text-sm text-white/40">Years of leadership</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Search size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold">Active</p>
                    <p className="text-sm text-white/40">Research</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Insights Preview ─────────────────────────────────────────────────────────
export function InsightsPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['blog-all'],
    queryFn: () => apiClient.get('/blog?limit=3').then(r => r.data.posts),
    staleTime: 5 * 60 * 1000,
  })
  const posts = data ?? []

  return (
    <section id="insights" className="section-pad">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-400 text-base font-semibold uppercase tracking-widest">Resources</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Latest <span className="gradient-text-brand">Insights</span></h2>
          </motion.div>
          <Link href="/insights" className="hidden md:flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors font-medium">
            View all articles <ArrowRight size={18} />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card h-[400px] animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((p: any, i: number) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/insights/${p.slug}`} className="group block h-full">
                  <div className="glass-card rounded-[2rem] overflow-hidden h-full border-white/5 hover:border-blue-500/30 transition-all flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {p.coverImage ? (
                        <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white/10 font-bold text-4xl">
                          {p.title.charAt(0)}
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-sm text-white/80 border border-white/10">
                          {p.category || 'Article'}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 text-sm text-white/40 mb-4">
                        <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(p.createdAt)}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> 5 min read</span>
                      </div>
                      <h3 className="font-display text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-white/55 text-base line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {p.summary}
                      </p>
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                        Read full story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 md:hidden">
          <Link href="/insights" className="flex items-center justify-center gap-2 w-full py-4 glass-card rounded-2xl text-white/70 font-medium">
            View all articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="px-4 py-24">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center glass-card p-12 relative overflow-hidden">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to build something <span className="gradient-text-brand">exceptional?</span></h2>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/contact" className="px-8 py-3.5 bg-cyan-400 text-slate-900 font-bold rounded-xl">Start a conversation</Link>
        </div>
      </motion.div>
    </section>
  )
}
