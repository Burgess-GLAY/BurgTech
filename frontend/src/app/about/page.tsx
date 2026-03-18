import type { Metadata } from 'next'
import { FounderSection, CTASection } from '@/components/sections'
import { EthicsSection, PartnersSection }
  from '@/components/sections/AboutSections'

export const metadata: Metadata = {
  title: 'About | Burtech Solution',
  description: 'Learn about Burtech Solution — our story, mission, values, core ethics, and technology focus.',
}

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* Hero */}
      <div className="section-pad text-center">
        <span className="text-cyan-400 text-sm font-medium
                         tracking-wide uppercase">
          About us
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6">
          A technology company{' '}
          <span className="gradient-text-brand">driven by research</span>
        </h1>
        <p className="text-white/50 text-xl max-w-3xl mx-auto leading-relaxed">
          Burtech Solution was founded on April 18, 2025, with a clear
          mission: deliver advanced digital solutions grounded in academic
          rigour and shaped by real-world business experience. Based in
          Liberia with research at Nanjing University of Post and
          Telecommunications in China, we bring a uniquely global,
          technically deep perspective to every project we take on.
        </p>
      </div>

      {/* Mission, Vision, Values */}
      <section className="section-pad">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Our Mission',
              body: 'To bridge the gap between cutting-edge research in AI and Data Science and the practical solutions modern businesses need to compete and grow.',
            },
            {
              title: 'Our Vision',
              body: 'A world where every business, regardless of size, has access to enterprise-grade digital tools powered by intelligent, human-centred design.',
            },
            {
              title: 'Our Values',
              body: 'Technical excellence, transparency with clients, continuous learning, and building solutions that genuinely solve problems — not just look good on paper.',
            },
          ].map((v) => (
            <div key={v.title} className="glass-card p-6">
              <h3 className="font-semibold text-lg mb-3 text-cyan-400">
                {v.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ethics — Client Component (uses framer-motion) */}
      <EthicsSection />

      {/* Partners — Client Component (uses framer-motion) */}
      <PartnersSection />

      {/* Founder — already a Client Component in sections/index.tsx */}
      <FounderSection />

      {/* CTA */}
      <CTASection />

    </div>
  )
}
