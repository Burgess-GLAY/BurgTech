import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, BookOpen, Clock, Video } from 'lucide-react'
import { CTASection } from '@/components/sections'

export const metadata: Metadata = { 
  title: 'Upcoming Sessions | Burtech Academy',
  description: 'Register for the next live technology workshop or masterclass at Burtech Academy.'
}

export default function UpcomingPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Register for our <span className="gradient-text-brand">next session</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Our upcoming sessions are announced here and on our Facebook page. All sessions are online via Google Meet and open to participants worldwide.
          </p>
        </div>

        {/* Featured Session */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-bt-cyan/5 to-bt-teal/5 pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-bt-cyan/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-bt-teal/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-semibold text-white/50">
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-bt-cyan" /> April 11, 2026</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-bt-cyan" /> One Day</span>
                  <span className="hidden sm:inline">·</span>
                  <span className="flex items-center gap-1.5"><Video className="w-4 h-4 text-bt-cyan" /> Google Meet</span>
                </div>
                <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-bt-cyan/15 text-bt-cyan border border-bt-cyan/25 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan animate-pulse" />
                  Upcoming
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">Prompt Engineering Masterclass</h2>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 overflow-hidden relative">
                  <img src="/images/burgessprofile.jpeg" alt="Burgess Awalayah Glay" className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold text-white/90">Burgess Awalayah Glay</p>
                  <p className="text-sm text-bt-cyan">Founder, Burtech Solution</p>
                </div>
              </div>

              <div className="prose prose-invert max-w-none mb-10 text-white/70">
                <p>
                  A one-day hands-on masterclass on prompt engineering and working with AI agents. Learn how to write effective prompts, understand how large language models think, and how to use modern AI coding tools including Windsurf and Antigravity to build faster and smarter.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 mb-10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-bt-cyan" /> What you will learn
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    'How large language models work',
                    'Prompt structure and best practices',
                    'Zero-shot and few-shot prompting',
                    'Chain-of-thought prompting techniques',
                    'Using AI coding agents: Windsurf and Antigravity',
                    'Building automated workflows with AI tools',
                    'Practical hands-on exercises'
                  ].map((topic, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-bt-cyan/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan" />
                      </span>
                      <span className="leading-relaxed">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-bt-cyan text-bg-primary font-bold rounded-xl hover:bg-bt-cyan-light transition-colors text-center inline-flex justify-center items-center gap-2">
                  Register now — it is free <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="https://www.facebook.com/share/1CaiH7iYSw/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-center">
                  Announcement on Facebook
                </a>
              </div>
              <p className="text-sm text-white/40 mt-4 text-center sm:text-left">
                Registration via our contact form. We will confirm your spot and send the Google Meet link before the session.
              </p>
            </div>
          </div>
        </div>

        {/* Past Sessions Link */}
        <div className="text-center">
          <p className="text-white/50 mb-4">Missed a previous session? View our complete session history.</p>
          <Link href="/academy/sessions" className="text-bt-cyan font-medium hover:text-bt-cyan-light transition-colors">
            View all past sessions →
          </Link>
        </div>

      </div>
      <CTASection />
    </div>
  )
}
