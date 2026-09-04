'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ChevronDown, ArrowRight,
  Code2, BarChart3, Cloud, TrendingUp,
  Building2, Users, Handshake,
  GraduationCap, BookOpen, Laptop, CalendarDays
} from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICE_CATEGORIES = [
  {
    category: 'Development',
    Icon: Code2,
    color: 'text-bt-cyan',
    headerBg: 'bg-bt-cyan/10 border-bt-cyan/20',
    services: [
      {
        label: 'Web Development',
        href: '/services/web-development',
        desc: 'Full-stack web applications'
      },
      {
        label: 'Web Design',
        href: '/services/web-design',
        desc: 'UI/UX and visual design'
      },
      {
        label: 'Mobile App Development',
        href: '/services/mobile-apps',
        desc: 'iOS and Android apps'
      },
      {
        label: 'Software Development',
        href: '/services/software-development',
        desc: 'Custom software solutions'
      },
      {
        label: 'Database Systems',
        href: '/services/database-systems',
        desc: 'Database design and management'
      },
      {
        label: 'API Integration',
        href: '/services/api-integration',
        desc: 'Connect and automate your tools'
      },
    ],
  },
  {
    category: 'Data & Intelligence',
    Icon: BarChart3,
    color: 'text-bt-teal',
    headerBg: 'bg-bt-teal/10 border-bt-teal/20',
    services: [
      {
        label: 'Data Analytics & BI',
        href: '/services/data-analytics',
        desc: 'Dashboards and business intelligence'
      },
      {
        label: 'Predictive Analytics',
        href: '/services/predictive-analytics',
        desc: 'AI models that forecast trends'
      },
      {
        label: 'Data Science',
        href: '/services/data-science',
        desc: 'Research-driven data solutions'
      },
      {
        label: 'AI & Machine Learning',
        href: '/services/ai-ml',
        desc: 'Custom AI model development'
      },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    Icon: Cloud,
    color: 'text-bt-cyan-light',
    headerBg: 'bg-bt-cyan-light/10 border-bt-cyan-light/20',
    services: [
      {
        label: 'Cloud Migration',
        href: '/services/cloud-migration',
        desc: 'AWS, GCP, and Azure migration'
      },
      {
        label: 'Cloud Architecture',
        href: '/services/cloud-architecture',
        desc: 'Scalable infrastructure design'
      },
      {
        label: 'DevOps & CI/CD',
        href: '/services/devops',
        desc: 'Automated deployment pipelines'
      },
    ],
  },
  {
    category: 'Growth & Strategy',
    Icon: TrendingUp,
    color: 'text-emerald-400',
    headerBg: 'bg-emerald-500/10 border-emerald-500/20',
    services: [
      {
        label: 'SEO & Content Strategy',
        href: '/services/seo-content',
        desc: 'Rank higher and convert better'
      },
      {
        label: 'Project Management',
        href: '/services/project-management',
        desc: 'Agile delivery frameworks'
      },
      {
        label: 'Digital Transformation',
        href: '/services/digital-transformation',
        desc: 'Modernise your operations'
      },
    ],
  },
]

const ABOUT_LINKS = [
  { label: 'About Us', href: '/about', desc: 'Our story, mission, values and ethics', Icon: Building2 },
  { label: 'Our Team', href: '/team', desc: 'Meet the people behind Burtech', Icon: Users },
  { label: 'Partners', href: '/about/partners', desc: 'Organisations we work and grow with', Icon: Handshake },
]

const ACADEMY_LINKS = [
  { label: 'Burtech Academy', href: '/academy', desc: 'All training programmes and sessions', Icon: GraduationCap },
  { label: 'Sessions', href: '/academy/sessions', desc: 'All workshops and classes', Icon: BookOpen },
  { label: 'Remote Internship', href: '/academy/internship', desc: 'Join our remote internship programme', Icon: Laptop },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [academyOpen, setAcademyOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)
  const [mobileAcademyOpen, setMobileAcademyOpen] = useState(false)

  const servicesTimer = useRef<ReturnType<typeof setTimeout>>()
  const aboutTimer = useRef<ReturnType<typeof setTimeout>>()
  const academyTimer = useRef<ReturnType<typeof setTimeout>>()

  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMobileServicesOpen(false)
    setMobileAboutOpen(false)
    setMobileAcademyOpen(false)
  }, [pathname])

  const openServices = () => { clearTimeout(servicesTimer.current); setServicesOpen(true) }
  const closeServices = () => { servicesTimer.current = setTimeout(() => setServicesOpen(false), 130) }
  const openAbout = () => { clearTimeout(aboutTimer.current); setAboutOpen(true) }
  const closeAbout = () => { aboutTimer.current = setTimeout(() => setAboutOpen(false), 130) }
  const openAcademy = () => { clearTimeout(academyTimer.current); setAcademyOpen(true) }
  const closeAcademy = () => { academyTimer.current = setTimeout(() => setAcademyOpen(false), 130) }

  return (
    <header className={cn(
      'bt-navbar fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'bt-navbar--scrolled' : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="bt-navbar__logo">
          <span className="text-2xl font-bold text-white tracking-tight">BURGTECH</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          <li>
            <Link href="/" className={cn('px-3 py-2 rounded-lg text-base transition-colors', pathname === '/' ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Home
            </Link>
          </li>

          <li className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
            <button className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-base transition-colors', pathname.startsWith('/services') ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Services <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', servicesOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {servicesOpen && <ServicesMegaMenu onClose={() => setServicesOpen(false)} />}
            </AnimatePresence>
          </li>

          <li className="relative" onMouseEnter={openAbout} onMouseLeave={closeAbout}>
            <button className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-base transition-colors', pathname.startsWith('/about') ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              About <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', aboutOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {aboutOpen && <SmallDropdown links={ABOUT_LINKS} onClose={() => setAboutOpen(false)} />}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/projects" className={cn('px-3 py-2 rounded-lg text-base transition-colors', pathname === '/projects' ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Projects
            </Link>
          </li>

          <li className="relative" onMouseEnter={openAcademy} onMouseLeave={closeAcademy}>
            <button className={cn('flex items-center gap-1 px-3 py-2 rounded-lg text-base transition-colors', pathname.startsWith('/academy') ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Academy <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', academyOpen && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {academyOpen && <SmallDropdown links={ACADEMY_LINKS} onClose={() => setAcademyOpen(false)} />}
            </AnimatePresence>
          </li>

          <li>
            <Link href="/insights" className={cn('px-3 py-2 rounded-lg text-base transition-colors', pathname === '/insights' ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Insights
            </Link>
          </li>

          <li>
            <Link href="/contact" className={cn('px-3 py-2 rounded-lg text-base transition-colors', pathname === '/contact' ? 'text-white font-medium' : 'text-white/60 hover:text-white')}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact"
            className="btn-primary">
            Get in touch
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button className="lg:hidden p-2 text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-white/[0.06] bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <Link href="/" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">Home</Link>

              <div>
                <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <span>Services</span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', mobileServicesOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pl-6 space-y-4 py-2">
                        {SERVICE_CATEGORIES.map(cat => (
                          <div key={cat.category}>
                            <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", cat.color)}>{cat.category}</p>
                            <div className="space-y-1">
                              {cat.services.map(s => (
                                <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)} className="block py-1.5 text-base text-white/50 hover:text-white transition-colors">{s.label}</Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button onClick={() => setMobileAboutOpen(!mobileAboutOpen)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <span>About</span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', mobileAboutOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileAboutOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pl-6 space-y-1 py-1">
                        {ABOUT_LINKS.map(link => (
                          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-base text-white/50 hover:text-white transition-colors">
                            <link.Icon className="w-4 h-4 text-bt-cyan-light" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/projects" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">Projects</Link>

              <div>
                <button onClick={() => setMobileAcademyOpen(!mobileAcademyOpen)} className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                  <span>Academy</span>
                  <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', mobileAcademyOpen && 'rotate-180')} />
                </button>
                <AnimatePresence>
                  {mobileAcademyOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="pl-6 space-y-1 py-1">
                        {ACADEMY_LINKS.map(link => (
                          <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-base text-white/50 hover:text-white transition-colors">
                            <link.Icon className="w-4 h-4 text-bt-cyan-light" />
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/insights" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">Insights</Link>

              <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-base text-white/70 hover:text-white hover:bg-white/5 transition-colors">Contact</Link>

              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full mt-4">
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function ServicesMegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                 w-[920px] max-w-[95vw] z-50"
    >
      <div
        className="rounded-2xl border border-white/[0.09] overflow-hidden
                   shadow-2xl shadow-black/50"
        style={{ background: 'rgba(5,14,18,0.97)', backdropFilter: 'blur(28px)' }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-bt-cyan/50 to-transparent" />

        <div className="p-4 grid grid-cols-4 gap-4">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.category} className="space-y-1">
              <div className={cn("flex items-center gap-2 px-3 py-2 rounded-xl border mb-3", cat.headerBg)}>
                <cat.Icon className={cn("w-3.5 h-3.5", cat.color)} />
                <span className={cn("text-sm font-semibold uppercase tracking-wider", cat.color)}>
                  {cat.category}
                </span>
              </div>

              {cat.services.map((s) => (
                <Link key={s.href} href={s.href} onClick={onClose}
                  className="group flex items-center px-3 py-1.5 rounded-xl hover:bg-white/[0.06] transition-all duration-150"
                >
                  <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                    {s.label}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-sm text-white/25">
            Services across 4 specialisations
          </span>
          <Link href="/services" onClick={onClose}
            className="flex items-center gap-1 text-sm text-bt-cyan hover:text-bt-cyan-light transition-colors">
            View all services <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

interface DropLink {
  label: string
  href: string
  desc: string
  Icon: React.ElementType
}

function SmallDropdown({ links, onClose }: { links: DropLink[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className="absolute top-full left-0 mt-2 w-72 z-50"
    >
      <div
        className="rounded-2xl border border-white/[0.09] overflow-hidden shadow-2xl shadow-black/50 p-2"
        style={{ background: 'rgba(5,14,18,0.97)', backdropFilter: 'blur(28px)' }}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-bt-cyan/40 to-transparent mb-2" />
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClose}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.06] transition-all duration-150"
          >
            <div className="w-8 h-8 rounded-lg bg-bt-cyan/10 border border-bt-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:bg-bt-cyan/20 transition-colors">
              <link.Icon className="w-4 h-4 text-bt-cyan" />
            </div>
            <p className="text-sm font-medium text-white/85 group-hover:text-white transition-colors leading-snug">
              {link.label}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
