import { ShieldCheck, Mail, Lock, Database, Globe, Eye, User, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BurgTech Solutions collects, uses, and protects your personal data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#050e12] py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="text-bt-cyan text-sm font-semibold uppercase tracking-widest">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Privacy <span className="gradient-text-brand">Policy</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Introduction</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              BurgTech Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website burgtechsolutions.com and use our services.
            </p>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="space-y-3 text-white/60 text-sm">
              <div>
                <h3 className="font-semibold text-white mb-1">Personal Information</h3>
                <p className="leading-relaxed">Name, email address, phone number from contact forms, newsletter subscriptions, and service requests.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Technical Data</h3>
                <p className="leading-relaxed">IP address, browser type, device information, operating system, and browsing behavior via cookies.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Communication Data</h3>
                <p className="leading-relaxed">Records of email, contact form, and chat communications for service improvement and support.</p>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Provide, maintain, and improve our services</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Respond to inquiries and support requests</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Send newsletters and updates (with consent)</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Analyze usage patterns and improve UX</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Detect and address technical/security issues</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Data Security</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>SSL/TLS encryption for data transmission</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Secure hosting with regular security updates</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Access controls and authentication systems</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Regular security audits and vulnerability assessments</span>
              </li>
            </ul>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Cookies and Tracking</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              We use cookies to enhance browsing experience, analyze traffic, and personalize content. Control settings via browser preferences.
            </p>
            <div className="space-y-2 text-white/60 text-sm">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
                <div><span className="font-semibold text-white">Essential:</span> Required for basic functionality and security</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
                <div><span className="font-semibold text-white">Analytics:</span> Help understand visitor usage to improve performance</div>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-bt-cyan flex-shrink-0" />
                <div><span className="font-semibold text-white">Marketing:</span> Deliver relevant ads and track campaign effectiveness</div>
              </div>
            </div>
          </section>

          <section className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-bt-cyan" />
              </div>
              <h2 className="text-xl font-bold text-white">Your Rights</h2>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">You have the right to:</p>
            <ul className="space-y-2 text-white/60 text-sm">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Access and obtain a copy of your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Request correction of inaccurate data</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Request deletion of your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Object to processing of your data</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-bt-cyan flex-shrink-0 mt-0.5" />
                <span>Withdraw consent at any time</span>
              </li>
            </ul>
          </section>
        </div>

        <section className="glass-card p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-bt-cyan" />
            </div>
            <h2 className="text-xl font-bold text-white">Contact Us</h2>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-4">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="mailto:burgtechsolutions@gmail.com" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bt-cyan/10 border border-bt-cyan/20 text-bt-cyan hover:bg-bt-cyan/20 transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" />
              <span>burgtechsolutions@gmail.com</span>
            </a>
            <Link href="/contact" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm font-medium">
              <span>Visit Contact Page</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
