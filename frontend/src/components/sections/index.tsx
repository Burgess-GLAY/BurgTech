'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Globe, Palette, Smartphone, BarChart3, Cloud, Plug, Search, Layers, Brain, Star, GraduationCap, BookOpen, FlaskConical, MapPin, User, Award, Quote, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { formatDate } from '@/lib/utils'

// ─── Hero ────────────────────────────────────────────────────────────────────
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(51,143,255,0.1) 0%, transparent 70%)' }} />

      <motion.div className="relative z-10 max-w-5xl mx-auto px-4 text-center"
        initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      >
        {['badge','h1','sub','cta','tags'].map((k, i) => (
          <motion.div key={k} variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}>
            {i === 0 && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/5 text-cyan-400 text-sm font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" /> AI-Driven Technology Company
              </span>
            )}
            {i === 1 && (
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="gradient-text">Build smarter.</span><br />
                <span className="text-white">Scale faster.</span><br />
                <span className="gradient-text-brand">Grow further.</span>
              </h1>
            )}
            {i === 2 && (
              <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                Burtech Solution delivers advanced digital solutions — from web platforms and mobile apps to AI analytics and cloud infrastructure.
              </p>
            )}
            {i === 3 && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
                <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-400 text-slate-900 font-semibold rounded-xl hover:bg-cyan-300 transition-all">
                  Start a project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/projects" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
                  View our work
                </Link>
              </div>
            )}
            {i === 4 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {['Web Development','Mobile Apps','Data Analytics','Cloud Migration','AI Solutions'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs text-white/40 border border-white/[0.08] bg-white/[0.02]">{t}</span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0,8,0] }} transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export function StatsSection() {
  const stats = [{ value: '30+', label: 'Projects delivered' }, { value: '9', label: 'Services offered' }, { value: '4', label: 'Expert team members' }, { value: '100%', label: 'Client satisfaction' }]
  return (
    <section className="border-y border-white/[0.06] py-12">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center">
            <p className="text-3xl md:text-4xl font-bold gradient-text-brand">{s.value}</p>
            <p className="text-sm text-white/40 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Services Preview ─────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Globe,      title: 'Web Development',       slug: 'web-development',      desc: 'Scalable, performant web apps built with modern frameworks.' },
  { icon: Palette,    title: 'Web Design',             slug: 'web-design',           desc: 'Pixel-perfect UI/UX that converts visitors into customers.' },
  { icon: Smartphone, title: 'Mobile Apps',            slug: 'mobile-apps',          desc: 'Cross-platform mobile experiences for iOS and Android.' },
  { icon: BarChart3,  title: 'Data Analytics',         slug: 'data-analytics',       desc: 'Turn raw data into actionable business intelligence.' },
  { icon: Cloud,      title: 'Cloud Migration',        slug: 'cloud-migration',      desc: 'Seamless migration to AWS, GCP, or Azure infrastructure.' },
  { icon: Plug,       title: 'API Integration',        slug: 'api-integration',      desc: 'Connect your tools and automate workflows end-to-end.' },
  { icon: Search,     title: 'SEO & Content',          slug: 'seo-content',          desc: 'Data-driven SEO and content strategies that rank.' },
  { icon: Layers,     title: 'Project Management',     slug: 'project-management',   desc: 'Modern PM frameworks that keep teams aligned and moving.' },
  { icon: Brain,      title: 'Predictive Analytics',   slug: 'predictive-analytics', desc: 'Custom AI models that forecast trends and guide decisions.' },
]

export function ServicesPreview() {
  return (
    <section className="section-pad">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">What we do</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">End-to-end digital <span className="gradient-text-brand">solutions</span></h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto">Every service your business needs to thrive in the digital era.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={s.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <Link href={`/services/${s.slug}`} className="group flex flex-col gap-4 p-6 glass-card hover:border-cyan-400/20 hover:bg-white/[0.05] transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-colors">
                  <Icon className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1 text-xs text-white/30 group-hover:text-cyan-400 transition-colors">
                  Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
      <div className="text-center mt-10">
        <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">View all services <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
  )
}

// ─── Featured Projects ────────────────────────────────────────────────────────
export function FeaturedProjects() {
  const { data } = useQuery({
    queryKey: ['projects-featured'],
    queryFn: () => apiClient.get('/projects?featured=true&limit=4').then(r => r.data),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  const projects = data?.projects ?? []
  if (!projects.length) return null
  return (
    <section className="section-pad bg-white/[0.01]">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
        <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Our work</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">Featured <span className="gradient-text-brand">projects</span></h2>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p: any, i: number) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group glass-card overflow-hidden hover:border-cyan-400/20 transition-all">
            <div className="h-48 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
              {p.imageUrls?.[0]
                ? <img src={p.imageUrls[0]} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                : <span className="text-4xl font-bold text-blue-700">{p.title.charAt(0)}</span>
              }
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
              <p className="text-sm text-white/50 mb-4 line-clamp-2">{p.summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.technologies.slice(0,5).map((t: string) => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/40">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link href="/projects" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">View all projects <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
// ─── Testimonials ─────────────────────────────────────────────────────────────
const FALLBACK_TESTIMONIALS = [
  { id: '1', authorName: 'Sarah K.', authorRole: 'CTO', company: 'TechVentures', content: 'Burtech delivered our data analytics platform ahead of schedule. The quality of work and communication throughout was exceptional.', rating: 5 },
  { id: '2', authorName: 'Marcus R.', authorRole: 'Founder', company: 'StartupXYZ', content: 'The mobile app exceeded our expectations. Clean code, great UX, and they genuinely understood our business goals from day one.', rating: 5 },
  { id: '3', authorName: 'Lena M.', authorRole: 'Head of Digital', company: 'RetailCo', content: 'Our cloud migration was seamless — zero downtime and 40% infrastructure cost reduction. Highly recommended.', rating: 5 },
  { id: '4', authorName: 'David W.', authorRole: 'Product VP', company: 'EduStream', content: 'Their technical depth in AI is impressive. They didn\'t just build the feature; they optimized the underlying data pipeline.', rating: 5 },
  { id: '5', authorName: 'Elena V.', authorRole: 'Operations Mgr', company: 'GlobalLogistics', content: 'The API integration unified our disparate systems. We\'ve seen a 30% increase in operational efficiency since launch.', rating: 5 },
  { id: '6', authorName: 'James L.', authorRole: 'Founder', company: 'FinTechPro', content: 'From MVP to production, Burtech has been a true partner. Their attention to security and scale is world-class.', rating: 5 },
]

export function TestimonialsSection() {
  const [page, setPage] = useState(0)
  const itemsPerPage = { mobile: 1, tablet: 2, desktop: 3 }
  
  const { data, isLoading } = useQuery({
    queryKey: ['testimonials-featured'],
    queryFn: () => apiClient.get('/testimonials?featured=true').then(r => r.data.testimonials),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  
  const items = data?.length ? data : FALLBACK_TESTIMONIALS
  const totalPages = Math.ceil(items.length / 3)

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages)

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
            <Quote size={14} />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            What our clients <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">say</span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            We measure our success by the impact we deliver to our partners. Here is what leading teams have to say about working with Burtech.
          </p>
        </motion.div>

        <div className="relative">
          {/* Skeleton Loaders */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 absolute inset-0 z-20 pointer-events-none">
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass-card p-8 rounded-2xl animate-pulse">
                  <div className="w-24 h-4 bg-white/5 rounded mb-6" />
                  <div className="w-full h-24 bg-white/5 rounded mb-8" />
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full" />
                    <div className="space-y-2">
                      <div className="w-20 h-3 bg-white/5 rounded" />
                      <div className="w-14 h-2 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="contents"
              >
                {items.slice(page * 3, (page + 1) * 3).map((t: any, i: number) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card group p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/[0.04] relative flex flex-col"
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
                        <div className="font-bold text-white group-hover:text-blue-400 transition-colors">{t.authorName}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                          {t.authorRole} {t.company ? `· ${t.company}` : ''}
                        </div>
                      </div>
                    </div>

                    <Quote size={40} className="absolute top-8 right-8 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8 mt-12">
            <button 
              onClick={prevPage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/40 text-slate-400 hover:text-blue-400 transition-all group"
            >
              <ChevronLeft size={20} className="group-active:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === page ? 'w-8 bg-blue-500' : 'w-1.5 bg-white/10'}`}
                />
              ))}
            </div>

            <button 
              onClick={nextPage}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-500/40 text-slate-400 hover:text-blue-400 transition-all group"
            >
              <ChevronRight size={20} className="group-active:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Founder ──────────────────────────────────────────────────────────────────
export function FounderSection() {
  return (
    <section id="founder" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <User size={14} />
              <span>The Founder</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Burgess Awalayah <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Glay</span>
            </h2>
            
            <p className="text-xl text-slate-400 font-medium">
              Chief Systems Architect & Founder
            </p>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Founder of Burtech Solution. Burgess holds a BSc in Software Engineering from Rauf Denktas University, Cyprus, 
                and is currently an MSc candidate in Computer Science at Nanjing University of Post and Telecommunications, China.
              </p>
              <p>
                His research focus lies at the intersection of Data Science, Data Analytics, and Artificial Intelligence, 
                driving the technical vision behind Burtech's most complex implementations.
              </p>
              <p>
                Based in Liberia, he is dedicated to bridging the global technology gap by delivering world-class 
                software solutions to the African market and beyond.
              </p>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-6">
              <div>
                <div className="text-blue-400 font-bold text-2xl">MSc Can.</div>
                <div className="text-slate-500 text-sm">Computer Science</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-2xl">BSc</div>
                <div className="text-slate-500 text-sm">Software Engineering</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Floating Glow Backdrop */}
              <div className="absolute -inset-4 bg-blue-500/15 blur-3xl rounded-full opacity-60 animate-pulse-slow pointer-events-none" />
              
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 glass-card p-2 group">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-slate-900 border border-white/5 relative">
                  <img 
                    src="/images/burgess.jpg" 
                    alt="Burgess Awalayah Glay" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {/* Premium Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={14} className="fill-blue-400 text-blue-400" />
                      ))}
                    </div>
                    <blockquote className="text-base md:text-lg italic text-white/95 leading-relaxed font-medium">
                      "Excellence is not an act, but a habit. We build systems that don't just work, but inspire."
                    </blockquote>
                    <cite className="block mt-4 text-xs font-bold text-blue-400 uppercase tracking-widest not-italic">
                      — Burgess Awalayah Glay
                    </cite>
                  </div>
                </div>
              </div>
              
              {/* Absolute Badges */}
              <div className="absolute -top-4 -right-4 md:-right-8 p-4 glass-card border-white/10 rounded-2xl shadow-xl animate-bounce-slow backdrop-blur-xl z-20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-blue-400/20">
                    <Award size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expertise</div>
                    <div className="text-xs font-bold text-white">AI & Data Science</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Insights Preview ─────────────────────────────────────────────────────────
export function InsightsPreview() {
  const [page, setPage] = useState(0)
  const { data, isLoading } = useQuery({
    queryKey: ['blog-preview'],
    queryFn: () => apiClient.get('/blog?limit=6').then(r => r.data.posts),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
  
  const posts = data ?? []
  const totalPages = Math.ceil(posts.length / 3)

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages)

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'AI_DATA_SCIENCE': return 'from-purple-500/20 to-blue-500/20 text-purple-400 border-purple-500/30'
      case 'TECH_INSIGHTS': return 'from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30'
      case 'COMPANY_NEWS': return 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
      default: return 'from-slate-500/20 to-slate-400/20 text-slate-400 border-slate-500/30'
    }
  }

  if (!isLoading && !posts.length) return null

  return (
    <section id="insights" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
              <Brain size={14} />
              <span>Thought Leadership</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Insights</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <Link href="/insights" className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
              View all articles <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex gap-2">
              <button onClick={prevPage} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                <ChevronLeft size={18} />
              </button>
              <button onClick={nextPage} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} className="glass-card rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-white/5" />
                    <div className="p-6 space-y-4">
                      <div className="w-20 h-4 bg-white/5 rounded" />
                      <div className="w-full h-6 bg-white/5 rounded" />
                      <div className="w-full h-12 bg-white/5 rounded" />
                    </div>
                  </div>
                ))
              ) : (
                posts.slice(page * 3, (page + 1) * 3).map((p: any, i: number) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={`/insights/${p.slug}`}
                      className="group block glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-blue-500/30 transition-all hover:translate-y-[-4px]"
                    >
                      <div className="aspect-video relative overflow-hidden bg-slate-900">
                        {p.coverImage ? (
                          <img 
                            src={p.coverImage} 
                            alt={p.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${getCategoryStyles(p.category)} opacity-40 group-hover:opacity-60 transition-opacity`} />
                        )}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getCategoryStyles(p.category)}`}>
                            {p.category?.replace(/_/g, ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {formatDate(p.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {p.readTimeMin} min read
                          </div>
                        </div>

                        <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                          {p.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm line-clamp-2 mb-8 leading-relaxed">
                          {p.summary}
                        </p>

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 border border-white/10">
                              <User size={14} />
                            </div>
                            <span className="text-xs font-medium text-slate-300">{p.author?.name}</span>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-slate-900 transition-all">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="px-4 py-24">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center glass-card p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-400/5 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build something <span className="gradient-text-brand">exceptional?</span></h2>
          <p className="text-white/50 mb-8 text-lg">Let's talk about your project. We'll get back to you within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-400 text-slate-900 font-semibold rounded-xl hover:bg-cyan-300 transition-all">
              Start a conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-all">
              Explore services
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
