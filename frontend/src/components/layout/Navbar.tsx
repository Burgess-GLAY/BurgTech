'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const SERVICES = [
  { label: 'Web Development',      href: '/services/web-development' },
  { label: 'Web Design',           href: '/services/web-design' },
  { label: 'Mobile Apps',          href: '/services/mobile-apps' },
  { label: 'Data Analytics',       href: '/services/data-analytics' },
  { label: 'Cloud Migration',      href: '/services/cloud-migration' },
  { label: 'API Integration',      href: '/services/api-integration' },
  { label: 'SEO & Content',        href: '/services/seo-content' },
  { label: 'Project Management',   href: '/services/project-management' },
  { label: 'Predictive Analytics', href: '/services/predictive-analytics' },
]

const NAV = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services', dropdown: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Team',     href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [dropOpen, setDropOpen]       = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'bg-surface/90 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
    )}>
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-sm">B</div>
          <span className="font-bold text-lg">Burtech <span className="text-cyan-400">Solution</span></span>
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((link) =>
            link.dropdown ? (
              <li key={link.label} className="relative"
                onMouseEnter={() => setDropOpen(true)}
                onMouseLeave={() => setDropOpen(false)}
              >
                <button className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-colors',
                  pathname.startsWith('/services') ? 'text-white' : 'text-white/60 hover:text-white'
                )}>
                  {link.label} <ChevronDown className="w-3 h-3" />
                </button>
                <AnimatePresence>
                  {dropOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 pt-2 w-64"
                    >
                      <div className="glass-card p-2 shadow-2xl">
                        {SERVICES.map((s) => (
                          <Link key={s.href} href={s.href}
                            className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                          >{s.label}</Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className={cn(
                  'px-3 py-2 rounded-lg text-sm transition-colors',
                  pathname === link.href ? 'text-white font-medium' : 'text-white/60 hover:text-white'
                )}>{link.label}</Link>
              </li>
            )
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="px-4 py-2 bg-cyan-400 text-slate-900 text-sm font-semibold rounded-lg hover:bg-cyan-300 transition-colors">
            Get in touch
          </Link>
        </div>

        <button className="lg:hidden p-2 text-white/60 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/[0.06] bg-surface/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV.map((link) => (
                <Link key={link.label} href={link.href}
                  className="block px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >{link.label}</Link>
              ))}
              <Link href="/contact" className="block mt-3 px-4 py-2.5 bg-cyan-400 text-slate-900 text-sm font-semibold rounded-lg text-center">
                Get in touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
