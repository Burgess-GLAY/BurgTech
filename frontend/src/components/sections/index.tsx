'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, Sparkles, Globe, Palette, Smartphone, BarChart3, Cloud, Plug, Search, Layers, Brain, Star, User, Award, Quote, ChevronLeft, ChevronRight, Calendar, Clock, Code2, Server, GitBranch, TrendingUp, Database, ChevronDown } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api'
import { formatDate, cn } from '@/lib/utils'
export { HeroSection } from './HeroSection'
export { StatsMarquee } from './StatsMarquee'

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
    color: 'text-bt-cyan',
    slugs: [
      'web-development', 'web-design', 'mobile-apps',
      'software-development', 'database-systems', 'api-integration',
    ],
  },
  {
    label: 'Data & Intelligence',
    color: 'text-bt-teal',
    slugs: [
      'data-analytics', 'predictive-analytics',
      'data-science', 'ai-ml',
    ],
  },
  {
    label: 'Cloud & Infrastructure',
    color: 'text-bt-cyan-light',
    slugs: ['cloud-migration', 'cloud-architecture', 'devops'],
  },
  {
    label: 'Growth & Strategy',
    color: 'text-bt-teal',
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
      className="glass-card group p-8 rounded-2xl border border-white/10 hover:border-bt-cyan/30 transition-all hover:bg-white/[0.04] relative flex flex-col h-full"
    >
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} size={14} className={j < t.rating ? "fill-bt-cyan text-bt-cyan" : "text-white/10"} />
        ))}
      </div>

      <p className="text-slate-300 leading-relaxed text-lg flex-1 mb-8 italic">
        "{t.content}"
      </p>

      <div className="flex items-center gap-4 pt-6 border-t border-white/5">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-bt-cyan/20 to-bt-teal/20 flex items-center justify-center text-bt-cyan font-bold border border-white/10">
          {t.authorName.charAt(0)}
        </div>
        <div>
          <div className="font-display font-bold text-white group-hover:text-bt-cyan transition-colors">{t.authorName}</div>
          <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">
            {t.authorRole} {t.company ? `· ${t.company}` : ''}
          </div>
        </div>
      </div>
      <Quote size={40} className="absolute top-8 right-8 text-white/5 group-hover:text-bt-cyan/10 transition-colors pointer-events-none" />
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
          isActive ? "bg-bt-cyan/10" : "hover:bg-white/[0.03]"
        )}
      >
        <span className={cn(
          'text-base transition-colors text-left',
          isActive ? 'text-bt-cyan font-semibold' : 'text-white/80 font-medium'
        )}>
          {service.title}
        </span>
        <div className="flex items-center gap-3">
          <ChevronDown className={cn(
            'w-4 h-4 text-white/40 transition-transform duration-200 flex-shrink-0 lg:hidden',
            isOpen && 'rotate-180 text-bt-cyan'
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
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
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
    if (grouped.length > 0 && !activeSlug && grouped[0].services.length > 0) {
      setActiveSlug(grouped[0].services[0].slug)
    }
  }, [grouped.length, activeSlug])

  const selectedService = services.find((s: any) => s.slug === activeSlug)

  return (
    <section className="section-pad">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="text-bt-cyan text-base font-semibold uppercase tracking-widest">What we do</span>
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
                      <p className="text-bt-cyan font-medium">Description</p>
                    </div>
                    {(() => {
                      const Icon = SERVICE_ICONS[selectedService.slug] || Code2
                      return <div className="w-16 h-16 rounded-2xl bg-bt-cyan-subtle flex items-center justify-center text-bt-cyan border border-bt-cyan-border"><Icon size={32} /></div>
                    })()}
                  </div>
                  <p className="text-white/60 text-lg leading-relaxed mb-10">{selectedService.summary}</p>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {selectedService.useCases?.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-white/40">Use Cases</h4>
                        <ul className="space-y-3">
                          {selectedService.useCases.slice(0, 4).map((u: string) => (
                            <li key={u} className="flex items-start gap-3 text-sm text-white/70"><span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />{u}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <Link href={`/services/${selectedService.slug}`} className="btn-primary">
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

// ─── Featured Projects Carousel ───────────────────────────────────────────────
interface Project {
  id: string
  slug: string
  title: string
  summary: string
  imageUrls: string[]
  category: string
  status: string
  technologies: string[]
}

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds per slide

export function FeaturedProjects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const res = await apiClient.get('/projects?featured=true');
      return res.data.projects;
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning || !projects?.length) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning, projects?.length]);

  const next = useCallback(() => {
    if (!projects?.length) return;
    goTo((activeIndex + 1) % projects.length);
  }, [activeIndex, projects?.length, goTo]);

  const prev = useCallback(() => {
    if (!projects?.length) return;
    goTo((activeIndex - 1 + projects.length) % projects.length);
  }, [activeIndex, projects?.length, goTo]);

  // Auto-play engine
  useEffect(() => {
    if (!projects?.length) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!isPausedRef.current) {
          setActiveIndex(i => (i + 1) % projects.length);
        }
      }, AUTO_PLAY_INTERVAL);
    };

    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [projects?.length]);

  // Pause on hover
  const handleMouseEnter = () => { isPausedRef.current = true; };
  const handleMouseLeave = () => { isPausedRef.current = false; };

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  if (isLoading || !projects?.length) {
    return (
      <section id="projects" className="bt-projects-section">
        <div className="bt-projects-section__inner">
          <div className="bt-projects-section__header">
            <span className="eyebrow bt-projects-section__eyebrow">Portfolio</span>
            <h2 className="bt-projects-section__heading">
              Our <span className="bt-projects-section__heading-accent">Projects</span>
            </h2>
            <p className="bt-projects-section__subheading">
              We build digital products that move the needle. From mission-critical
              platforms to AI-driven initiatives.
            </p>
          </div>
          <div className="bt-projects-list">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bt-project-card animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bt-carousel-section">
      <div className="bt-carousel-section__inner">

        {/* Section header */}
        <div className="bt-carousel-section__header">
          <span className="eyebrow bt-carousel-section__eyebrow">Portfolio</span>
          <h2 className="bt-carousel-section__heading">
            Our <span className="bt-carousel-section__heading-accent">Projects</span>
          </h2>
          <p className="bt-carousel-section__subheading">
            We build digital products that move the needle. From mission-critical
            platforms to AI-driven initiatives.
          </p>
        </div>

      </div>

      {/* Carousel viewport — full width, overflow hidden */}
      <div
        className="bt-carousel-viewport"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sliding track */}
        <div
          className="bt-carousel-track"
          style={{
            transform: `translateX(calc(-${activeIndex} * (860px + 2rem)))`,
          }}
        >
          {projects.map((project: Project, i: number) => {
            const isActive  = i === activeIndex;
            const isPrev    = i === (activeIndex - 1 + projects.length) % projects.length;
            const isNext    = i === (activeIndex + 1) % projects.length;
            const isVisible = isActive || isPrev || isNext;

            return (
              <div
                key={project.slug || i}
                className={[
                  'bt-carousel-slide',
                  isActive  ? 'bt-carousel-slide--active'  : '',
                  isPrev    ? 'bt-carousel-slide--prev'    : '',
                  isNext    ? 'bt-carousel-slide--next'    : '',
                  !isVisible ? 'bt-carousel-slide--hidden' : '',
                ].join(' ')}
                aria-hidden={!isActive}
                onClick={() => {
                  if (isPrev) prev();
                  if (isNext) next();
                }}
              >
                {/* This is your existing bt-project-card structure */}
                <article className="bt-project-card">

                  {/* LEFT: Text content */}
                  <div className="bt-project-card__content">
                    {project.category && (
                      <span className="bt-project-card__tag eyebrow">
                        {project.category}
                      </span>
                    )}
                    <h3 className="bt-project-card__title">{project.title}</h3>
                    <p className="bt-project-card__desc">{project.summary}</p>

                    {project.technologies?.length > 0 && (
                      <ul className="bt-project-card__features">
                        {project.technologies.slice(0, 3).map((feat, fi) => (
                          <li key={fi} className="bt-project-card__feature-item">
                            <span className="bt-project-card__check">✓</span>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="bt-project-card__cta"
                      tabIndex={isActive ? 0 : -1}
                    >
                      LEARN MORE ↗
                    </Link>
                  </div>

                  {/* RIGHT: Image panel */}
                  <div className="bt-project-card__visual">
                    <img
                      src={project.imageUrls?.[0] || '/images/project-placeholder.jpg'}
                      alt={project.title}
                      className="bt-project-card__img"
                      loading={isActive ? 'eager' : 'lazy'}
                    />
                  </div>

                </article>
              </div>
            );
          })}
        </div>

        {/* Left / right click zones on the peeking edges */}
        <button
          className="bt-carousel-edge bt-carousel-edge--left"
          onClick={prev}
          aria-label="Previous project"
        >
          ‹
        </button>
        <button
          className="bt-carousel-edge bt-carousel-edge--right"
          onClick={next}
          aria-label="Next project"
        >
          ›
        </button>
      </div>

      {/* Dot indicators + progress bar */}
      <div className="bt-carousel-section__inner">
        <div className="bt-carousel-dots" role="tablist" aria-label="Project slides">
          {projects.map((_: any, i: number) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to project ${i + 1}`}
              className={[
                'bt-carousel-dot',
                i === activeIndex ? 'bt-carousel-dot--active' : '',
              ].join(' ')}
              onClick={() => goTo(i)}
            >
              {/* Progress fill animates when active */}
              {i === activeIndex && (
                <span
                  className="bt-carousel-dot__fill"
                  style={{ animationDuration: `${AUTO_PLAY_INTERVAL}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bt-cyan-subtle border border-bt-cyan-border text-bt-cyan text-base font-medium mb-4">
            <Quote size={14} /><span>Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            What our clients <span className="gradient-text-brand">say</span>
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
                        i === page ? 'w-8 bg-bt-cyan' : 'bg-white/20'
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
                <div className="absolute inset-0 bg-bt-cyan/20 rounded-3xl rotate-6 -z-10" />
                <div className="absolute inset-0 border border-white/10 rounded-3xl -z-10" />
                <img
                  src="/images/burgessprofile.jpeg"
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
                <span className="text-brand-400 text-xs font-black tracking-[0.4em] uppercase">Our Founder</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">Burgess Awalayah <span className="gradient-text-brand">Glay</span></h2>
                <div className="w-20 h-1 bg-bt-cyan rounded-full mb-8" />
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
                  <div className="w-12 h-12 rounded-full bg-bt-cyan/20 flex items-center justify-center text-bt-cyan">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-white font-bold">2+ Years</p>
                    <p className="text-sm text-white/40">Years of leadership</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 w-fit">
                  <div className="w-12 h-12 rounded-full bg-bt-cyan/20 flex items-center justify-center text-bt-cyan">
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
            <span className="text-bt-cyan text-base font-semibold uppercase tracking-widest">Resources</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Latest <span className="gradient-text-brand">Insights</span></h2>
          </motion.div>
          <Link href="/insights" className="hidden md:flex items-center gap-2 text-white/60 hover:text-bt-cyan transition-colors font-medium">
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
                      <h3 className="font-display text-xl font-bold mb-4 group-hover:text-bt-cyan transition-colors line-clamp-2 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-white/55 text-base line-clamp-3 mb-6 flex-1 leading-relaxed">
                        {p.summary}
                      </p>
                      <div className="flex items-center gap-2 text-bt-cyan font-bold text-base">
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

// ─── BUILD SECTION ─────────────────────────────────────────────────────────────
const PROMPTS = [
  "Ask BurgTech to build something great for you...",
  "Build a high-converting landing page for my startup...",
  "Create a full-stack SaaS platform with auth and payments...",
  "Design a mobile-first e-commerce experience from scratch...",
  "Build an AI-powered dashboard for my business data...",
  "Develop a custom CRM tailored to my exact workflow...",
  "Launch a blazing-fast portfolio that wins clients...",
  "Build a scalable API backend that grows with you...",
  "Create a real-time app with live notifications...",
  "Transform my Figma design into pixel-perfect production code...",
];

const CONTACTS = [
  {
    id: 'whatsapp',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp',
    href: 'https://wa.me/YOURPHONENUMBER',
    expandable: false,
  },
  {
    id: 'email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: 'Email',
    display: 'burgtechsolutions@gmail.com',
    href: 'mailto:burgtechsolutions@gmail.com',
    expandable: true,
  },
  {
    id: 'facebook',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    label: 'Facebook',
    href: 'https://facebook.com/burgtechsolutions',
    expandable: false,
  },
  {
    id: 'linkedin',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/burgtech',
    expandable: false,
  },
];

export function CTASection() {
  const [promptIdx, setPromptIdx]     = useState(0);
  const [displayed, setDisplayed]     = useState('');
  const [charIdx, setCharIdx]         = useState(0);
  const [deleting, setDeleting]       = useState(false);
  const [openContact, setOpenContact] = useState<string | null>(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    const current = PROMPTS[promptIdx];
    const speed   = deleting ? 28 : 52;

    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIdx + 1);
        setDisplayed(next);
        setCharIdx(c => c + 1);
        if (charIdx + 1 === current.length) {
          pauseRef.current = true;
          setTimeout(() => {
            pauseRef.current = false;
            setDeleting(true);
          }, 2400);
        }
      } else {
        const next = current.slice(0, charIdx - 1);
        setDisplayed(next);
        setCharIdx(c => c - 1);
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setPromptIdx(i => (i + 1) % PROMPTS.length);
        }
      }
    }, pauseRef.current ? 99999 : speed);

    return () => clearTimeout(t);
  }, [charIdx, deleting, promptIdx]);

  return (
    <section className="bt-build">
      <div className="bt-build__inner">

        <h2 className="bt-build__heading">What should we build?</h2>

        {/* Prompt box */}
        <div className="bt-build__box">
          <div className="bt-build__prompt-area">
            <span className="bt-build__typed">{displayed}</span>
            <span className="bt-build__cursor" aria-hidden="true">|</span>
          </div>
          <div className="bt-build__box-footer">
            <button className="bt-build__attach" type="button">+ Attach</button>
            <a
              href="mailto:burgtechsolutions@gmail.com?subject=Project%20Inquiry"
              className="bt-build__send"
              aria-label="Send message"
            >
              ↑
            </a>
          </div>
        </div>

        {/* Reach row label */}
        <p className="bt-build__reach-label">Reach us directly</p>

        {/* Contact pills */}
        <div className="bt-build__contacts">
          {CONTACTS.map(c => (
            <div key={c.id} className="bt-build__contact-wrap">
              {c.expandable ? (
                <button
                  type="button"
                  className="bt-build__pill"
                  onClick={() => setOpenContact(openContact === c.id ? null : c.id)}
                  aria-expanded={openContact === c.id}
                >
                  {c.icon}
                  <span>{c.label}</span>
                </button>
              ) : (
                <a
                  href={c.href}
                  className="bt-build__pill"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.icon}
                  <span>{c.label}</span>
                </a>
              )}

              {c.expandable && openContact === c.id && (
                <div className="bt-build__dropdown" role="tooltip">
                  <span className="bt-build__dropdown-email">{c.display}</span>
                  <a href={c.href} className="bt-build__dropdown-link">
                    Open Mailbox ↗
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="bt-build__availability">
          🟢 Available 24/7 — We respond within hours, not days.
        </p>

      </div>
    </section>
  );
}
