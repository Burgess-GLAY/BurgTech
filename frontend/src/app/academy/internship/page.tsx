import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Code2, LineChart, Target, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = { 
  title: 'Remote Internship | Burtech Academy',
  description: 'Join the Burtech Solution remote internship programme. Work on live projects and build a real portfolio.'
}

export default function InternshipPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Internship Programme</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Real work. Real mentorship.<br/>
            <span className="gradient-text-brand">Real portfolio.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            Burtech Solution's remote internship programme places you on live client projects alongside the founding team. You will ship real code, participate in client calls, and leave with a portfolio that proves your capability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 transition-colors">
              Apply now
            </Link>
            <Link href="/academy/sessions"
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
              View past sessions
            </Link>
          </div>
        </div>

        {/* Programme Details Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {[
            { label: 'Duration', value: '3 to 6 months' },
            { label: 'Format', value: 'Fully remote' },
            { label: 'Commitment', value: '20–30 hrs/week' },
            { label: 'Stipend', value: 'Performance-based' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 text-center">
              <p className="text-sm text-cyan-400 font-medium uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-lg md:text-xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          
          {/* What you will work on */}
          <div>
            <h2 className="text-3xl font-bold mb-8">What you will work on</h2>
            <div className="space-y-4">
              {[
                'Build features on live client web and mobile applications',
                'Contribute to data analytics dashboards and pipelines',
                'Participate in client meetings and technical discussions',
                'Write clean, documented, and code-reviewed work',
                'Attend weekly team standups and one-on-one mentorship calls',
                'Publish at least one technical insight on the Burtech blog'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process Stepper */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Application process</h2>
            <div className="relative pl-8 space-y-10 before:absolute before:inset-y-0 before:left-3.5 before:w-px before:bg-white/10 before:z-0">
              {[
                { title: 'Submit application', desc: 'Via our contact form — include your resume and GitHub/portfolio link.' },
                { title: 'Initial interview', desc: 'A 30-minute video call to discuss your background and goals.' },
                { title: 'Technical assessment', desc: 'A short take-home task representative of our actual work.' },
                { title: 'Offer and onboarding', desc: 'Documentation, system setup, and introduction to the team.' }
              ].map((step, i) => (
                <div key={i} className="relative z-10">
                  <div className="absolute -left-10 w-6 h-6 rounded-full bg-surface border-2 border-cyan-400 flex items-center justify-center text-xs font-bold text-cyan-400">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-white/60">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Who we look for */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Who we look for</h2>
            <p className="text-white/50 max-w-2xl mx-auto">We don't expect you to know everything. We expect you to be driven enough to figure it out.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-8">
              <Code2 className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Developers</h3>
              <p className="text-white/60 text-sm">Familiar with React, Node.js, or similar modern frameworks. Ready to move beyond tutorials into production codebases.</p>
            </div>
            <div className="glass-card p-8">
              <LineChart className="w-8 h-8 text-violet-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Analysts</h3>
              <p className="text-white/60 text-sm">Comfortable with Python and SQL. Interested in building dashboards and models that actually drive business decisions.</p>
            </div>
            <div className="glass-card p-8">
              <Target className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Learners with drive</h3>
              <p className="text-white/60 text-sm">No specific credential required. If you have a portfolio of projects you built just because you wanted to, we want to talk.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="glass-card p-12 text-center bg-gradient-to-t from-cyan-500/10 to-transparent">
          <h2 className="text-3xl font-bold mb-4">Applications for the next cohort are open</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">Submit your application today. We review submissions on a rolling basis.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cyan-400 text-slate-900 font-bold rounded-xl hover:bg-cyan-300 transition-colors">
            Apply for internship <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  )
}
