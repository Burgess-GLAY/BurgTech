import Link from 'next/link'
import { Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react'

const LINKS = {
  Company:  [
    { label: 'About',    href: '/about' },
    { label: 'Team',     href: '/team' },
    { label: 'Projects', href: '/projects' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact',  href: '/contact' },
  ],
  Services: [
    { label: 'Web Development',  href: '/services/web-development' },
    { label: 'Mobile Apps',      href: '/services/mobile-apps' },
    { label: 'Data Analytics',   href: '/services/data-analytics' },
    { label: 'Cloud Migration',  href: '/services/cloud-migration' },
    { label: 'Predictive AI',    href: '/services/predictive-analytics' },
  ],
  Legal: [
    { label: 'Privacy Policy',   href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const SOCIALS = [
  { icon: Facebook,  href: 'https://www.facebook.com/profile.php?id=61575516834594', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/biggest_carpediem/',         label: 'Instagram' },
  { icon: Linkedin,  href: 'https://www.linkedin.com/in/burgess-awalayah-glay-4696112b4/', label: 'LinkedIn' },
  { icon: Github,    href: 'https://github.com/burtech',                             label: 'GitHub' },
  { icon: Mail,      href: 'mailto:burgtechsolutions@gmail.com',                      label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-sm">B</div>
              <span className="font-bold">Burtech <span className="text-cyan-400">Solution</span></span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-5">
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
              <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">{section}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-white/50 hover:text-white transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Burtech Solution. All rights reserved.</p>
          <p className="text-xs text-white/20">Cyprus · China · Liberia | Research at Nanjing University of Post and Telecommunications</p>
        </div>
      </div>
    </footer>
  )
}
