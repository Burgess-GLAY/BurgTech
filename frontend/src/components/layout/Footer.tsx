'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Facebook, Instagram, Twitter, Youtube, MessageCircle, Send, Loader2, CheckCircle, MapPin, ShieldCheck, GraduationCap } from 'lucide-react'
import { apiClient } from '@/lib/api'

const LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/team' },
    { label: 'Projects', href: '/projects' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'Web Development', href: '/services/web-development' },
    { label: 'Mobile Apps', href: '/services/mobile-apps' },
    { label: 'Data Analytics', href: '/services/data-analytics' },
    { label: 'Cloud Migration', href: '/services/cloud-migration' },
    { label: 'Predictive AI', href: '/services/predictive-analytics' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const NEW_SOCIALS = [
  { Icon: Facebook, href: 'https://www.facebook.com/share/1T74GwKndw/?mibextid=wwXIfr', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/burgess.glay?igsh=MWJtazIyaWxzcXJ5dQ%3D%3D&utm_source=qr', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/burgess-awalayah-glay-4696112b4?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com/burtechsolution', label: 'Twitter / X' },
  { Icon: Github, href: 'https://github.com/Burgess-GLAY', label: 'GitHub' },
  { Icon: MessageCircle, href: 'https://wa.me/231881952954', label: 'WhatsApp' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState(2025)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await apiClient.post('/messages', {
        name: 'Newsletter Subscriber',
        email: email,
        subject: 'Newsletter Signup',
        body: `${email} subscribed to BurgTech Solutions newsletter.`,
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="border-t border-white/[0.06] mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="bt-navbar__logo mb-3">
              <span className="text-lg font-bold text-white tracking-tight">BURGTECH</span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Advanced digital solutions for forward-thinking businesses. Built with care, delivered with precision.
            </p>
          </div>
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">{section}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/55 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] mt-8 pt-8 pb-6 text-center">
          {/* Part 1 — Newsletter */}
          <div className="mb-8">
            <p className="text-base font-semibold text-white mb-1">
              Stay updated with Burtech
            </p>
            <p className="text-sm text-white/50 mb-4">
              Get the latest insights, training announcements, and company
              news delivered to your inbox. No spam.
            </p>

            {submitted ? (
              <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                You are subscribed. Thank you!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex items-center gap-0 max-w-md w-full mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-3 py-2.5 bg-white/[0.06] border border-white/[0.10] border-r-0 rounded-l-xl text-xs text-white placeholder-white/30 outline-none focus:border-bt-cyan/50 focus:bg-white/[0.08] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2.5 bg-bt-cyan hover:bg-bt-cyan-light text-bg-primary rounded-r-xl transition-colors flex items-center justify-center border border-bt-cyan disabled:opacity-60"
                  aria-label="Subscribe"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            )}
            {!submitted && (
              <p className="text-[11px] text-white/25 mt-3">
                We respect your privacy. Unsubscribe at any time.
              </p>
            )}
          </div>

          {/* Part 2 — Socials */}
          <div className="flex items-center justify-center gap-2.5 mt-6 flex-wrap">
            {NEW_SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-white/45 hover:text-bt-cyan hover:border-bt-cyan/40 hover:bg-bt-cyan/5 transition-all duration-200"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Part 3 — Trust badges */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
              <div className="w-4 h-4 rounded bg-bt-cyan flex items-center justify-center flex-shrink-0">
                <span className="text-[7px] font-bold text-bg-primary">BT</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Founded</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  April 18, 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
              <MapPin className="w-3.5 h-3.5 text-bt-cyan flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Based in</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  Liberia, West Africa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
              <ShieldCheck className="w-3.5 h-3.5 text-bt-cyan flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Secure</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  SSL Protected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
              <GraduationCap className="w-3.5 h-3.5 text-bt-teal flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Education</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  BurgTech Academy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">© {year} BurgTech Solutions. All rights reserved.</p>
          <p className="text-xs text-white/20">Cyprus · China · Liberia | Research at Nanjing University of Post and Telecommunications</p>
        </div>
      </div>
    </footer>
  )
}
