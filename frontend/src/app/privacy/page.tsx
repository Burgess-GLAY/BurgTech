import { ShieldCheck, Mail, Lock, Database, Globe, Eye } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn how BurgTech Solutions collects, uses, and protects your personal data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#050e12] py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="text-bt-cyan text-sm font-semibold uppercase tracking-widest">Legal</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6">
            Privacy <span className="gradient-text-brand">Policy</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="space-y-12">
          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Introduction</h2>
                <p className="text-white/60 leading-relaxed">
                  BurgTech Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website burgtechsolutions.com and use our services.
                </p>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Information We Collect</h2>
                <div className="space-y-4 text-white/60">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Personal Information</h3>
                    <p className="leading-relaxed">We may collect personal identification information (Name, email address, phone number) that you voluntarily provide to us when you fill out contact forms, subscribe to our newsletter, or request services.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Technical Data</h3>
                    <p className="leading-relaxed">We automatically collect technical information including your IP address, browser type, device information, operating system, and browsing behavior through cookies and similar technologies.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Communication Data</h3>
                    <p className="leading-relaxed">When you communicate with us via email, contact forms, or chat, we may retain records of those communications for service improvement and support purposes.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>To provide, maintain, and improve our services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>To respond to your inquiries and support requests</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>To send you newsletters, marketing communications, and updates (with your consent)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>To analyze usage patterns and improve user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>To detect, prevent, and address technical issues and security threats</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Data Security</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These include:
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>SSL/TLS encryption for data transmission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Secure hosting infrastructure with regular security updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Access controls and authentication for internal systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Regular security audits and vulnerability assessments</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Cookies and Tracking</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
                </p>
                <div className="space-y-3 text-white/60">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Essential Cookies</h3>
                    <p className="leading-relaxed">Required for basic site functionality and security.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Analytics Cookies</h3>
                    <p className="leading-relaxed">Help us understand how visitors use our site to improve performance.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Marketing Cookies</h3>
                    <p className="leading-relaxed">Used to deliver relevant advertisements and track campaign effectiveness.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-bt-cyan/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-bt-cyan" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Your Rights</h2>
                <p className="text-white/60 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-3 text-white/60">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Access and obtain a copy of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Request correction of inaccurate data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Request deletion of your personal data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Object to processing of your data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 mt-2 rounded-full bg-bt-cyan flex-shrink-0" />
                    <span>Withdraw consent at any time</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="glass-card p-8 rounded-2xl border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-white/60 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-3">
              <a href="mailto:burgtechsolutions@gmail.com" className="flex items-center gap-3 text-bt-cyan hover:text-bt-cyan-light transition-colors">
                <Mail className="w-5 h-5" />
                <span>burgtechsolutions@gmail.com</span>
              </a>
              <Link href="/contact" className="flex items-center gap-3 text-bt-cyan hover:text-bt-cyan-light transition-colors">
                <span>Visit our Contact page</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
