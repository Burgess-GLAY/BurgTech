import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Laptop, CalendarDays } from 'lucide-react'
import { SessionHistory } from './SessionHistory'

// Server component - metadata export requires server component

export const metadata: Metadata = {
  title: 'BurgTech Academy - Training and Internships',
  description: 'Practical technology training, professional workshops, and remote internship programmes by BurgTech Solutions.'
}

export default function AcademyPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-20">
        <span className="text-bt-cyan text-sm font-medium tracking-wide uppercase">BurgTech Academy</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          Learn from people <span className="gradient-text-brand">building real things</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
          BurgTech Academy is the education arm of BurgTech Solutions. We deliver practical technology training online, host workshops taught by industry practitioners, and run remote internship programmes for developers and analysts across Africa and beyond.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/academy/sessions"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900">
            View past sessions
          </Link>
          <Link href="/academy/internship"
            className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
            Join internship
          </Link>
        </div>
      </section>

      {/* What we offer */}
      <section className="section-pad border-t border-white/[0.06]">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">What we offer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-bt-teal-subtle border border-bt-teal/20 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-bt-cyan" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Training Sessions</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              We run one-day and multi-day workshops on technology topics including web development, data science, cloud computing, MATLAB, and AI tools. Taught by certified practitioners and delivered online via Google Meet.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-bt-cyan-subtle border border-bt-cyan-border flex items-center justify-center mb-6">
              <Laptop className="w-6 h-6 text-bt-cyan" />
            </div>
            <h3 className="text-xl font-bold mb-3">Remote Internship Programme</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              A structured remote internship where participants work on real BurgTech client projects. Mentored by the founding team. Builds a genuine production portfolio.
            </p>
          </div>

          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-bt-teal-subtle border border-bt-teal/20 flex items-center justify-center mb-6">
              <CalendarDays className="w-6 h-6 text-bt-cyan" />
            </div>
            <h3 className="text-xl font-bold mb-3">Upcoming Sessions</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              We regularly announce new training dates on our website and Facebook page. Register your interest to be notified when new sessions open.
            </p>
          </div>
        </div>
      </section>

      {/* Session History */}
      <SessionHistory />

      {/* Social Proof */}
      <section className="section-pad pb-0 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/70">
            Follow BurgTech on Facebook for live updates on all sessions
          </p>
          <a href="https://www.facebook.com/share/1CaiH7iYSw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
             className="px-5 py-2 bg-bt-cyan text-bg-primary font-medium rounded-lg hover:bg-bt-cyan-light transition-colors">
            View Facebook Page
          </a>
        </div>
      </section>
    </div>
  )
}
