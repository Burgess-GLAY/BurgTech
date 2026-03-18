import type { Metadata } from 'next'
import Link from 'next/link'
import { Handshake, Globe, GraduationCap, Building2, ArrowRight } from 'lucide-react'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = { 
  title: 'Partners | Burtech Solution',
  description: 'Our partnerships with African-focused organisations, academic institutions, and technology companies.'
}

export default function PartnersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="section-pad text-center">
        <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Partnerships</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6">
          Built on <span className="gradient-text-brand">strong partnerships</span>
        </h1>
        <p className="text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">
          We believe the most impactful technology solutions are built collaboratively. We partner with organisations that share our vision of advancing digital capability across Africa and beyond.
        </p>
      </div>

      {/* Status Card */}
      <section className="px-4 md:px-8 max-w-4xl mx-auto mb-20">
        <div className="glass-card p-10 md:p-14 text-center">
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6">
            <Handshake className="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Partnership programme launching in 2026
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
            Burtech Solution is formalising a partnership network to collaborate on larger-scale projects, share technical resources, and co-develop specialised solutions for the African market. 
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 transition-colors text-sm md:text-base">
            Discuss a partnership <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* What we look for */}
      <section className="section-pad border-t border-white/[0.06]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What we look for</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Our upcoming partnership tiers are designed for three specific types of organisations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-8 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Globe className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">African-focused Organisations</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              NGOs, development agencies, and pan-African enterprises looking for a technical reliable partner to digitise their operations or build civic tech tools that actually work in low-bandwidth environments.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <GraduationCap className="w-7 h-7 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Academic Institutions</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Universities and research centers seeking private-sector partners to turn research into commercial products, or to provide practical internship opportunities for their computer science students.
            </p>
          </div>
          
          <div className="glass-card p-8 text-center md:text-left">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 mx-auto md:mx-0">
              <Building2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Technology Companies</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Global software and cloud providers looking for an implementing partner in West Africa capable of selling, designing, and maintaining their solutions with local context and expertise.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
