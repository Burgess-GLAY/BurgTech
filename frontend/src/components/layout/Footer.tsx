'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, Facebook, Instagram, Twitter, Youtube, MessageCircle, Send, Loader2, CheckCircle, ArrowRight, MapPin, ShieldCheck, GraduationCap } from 'lucide-react'
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

const SOCIALS = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61575516834594', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/biggest_carpediem/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/burgess-awalayah-glay-4696112b4/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/burtech', label: 'GitHub' },
  { icon: Mail, href: 'mailto:burgtechsolutions@gmail.com', label: 'Email' },
]

const NEW_SOCIALS = [
  { Icon: Facebook, href: 'https://www.facebook.com/burgtech', label: 'Facebook' },
  { Icon: Instagram, href: 'https://www.instagram.com/burgtech', label: 'Instagram' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/burtech', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://twitter.com/burtechsolution', label: 'Twitter / X' },
  { Icon: Youtube, href: 'https://www.youtube.com/@burgtech', label: 'YouTube' },
  { Icon: Github, href: 'https://github.com/burtech', label: 'GitHub' },
  { Icon: MessageCircle, href: 'https://wa.me/message/burgtech', label: 'WhatsApp' },
]

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    try {
      await apiClient.post('/messages', {
        name: 'Newsletter Subscriber',
        email: email,
        subject: 'Newsletter Signup',
        body: `${email} subscribed to Burtech Solution newsletter.`,
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-sm">B</div>
              <span className="font-bold">Burtech <span className="text-cyan-400">Solution</span></span>
            </Link>
            <p className="text-base text-white/50 leading-relaxed mb-5">
              Advanced digital solutions for forward-thinking businesses. Built with care, delivered with precision.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">{section}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-base text-white/55 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] mt-12 pt-10 pb-10 text-center">
          {/* Part 1 — Newsletter */}
          <div className="mb-8">
            <p className="text-lg font-semibold text-white mb-1">
              Stay updated with Burtech
            </p>
            <p className="text-base text-white/50 mb-5">
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
                  className="flex-1 px-4 py-3 bg-white/[0.06] border border-white/[0.10] border-r-0 rounded-l-xl text-sm text-white placeholder-white/30 outline-none focus:border-cyan-400/50 focus:bg-white/[0.08] transition-all"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-900 rounded-r-xl transition-colors flex items-center justify-center border border-cyan-400 disabled:opacity-60"
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
          <div className="flex items-center justify-center gap-3 mt-8 flex-wrap">
            {NEW_SOCIALS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl border border-white/[0.10] bg-white/[0.03] flex items-center justify-center text-white/45 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Part 3 — Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-[10px] flex-shrink-0">
                B
              </div>
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Founded</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  April 18, 2025
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Based in</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  Liberia, West Africa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Secure</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  SSL Protected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <GraduationCap className="w-4 h-4 text-violet-400 flex-shrink-0" />
              <div className="text-left">
                <p className="text-[10px] text-white/30 leading-none">Education</p>
                <p className="text-xs font-semibold text-white/70 leading-none mt-0.5">
                  Burtech Academy
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/35">© {new Date().getFullYear()} Burtech Solution. All rights reserved.</p>
          <p className="text-sm text-white/20">Cyprus · China · Liberia | Research at Nanjing University of Post and Telecommunications</p>
        </div>
      </div>
    </footer>
  )
}
