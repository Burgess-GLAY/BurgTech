import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Laptop, CalendarDays, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export const metadata: Metadata = { 
  title: 'Burtech Academy | Training and Internships',
  description: 'Practical technology training, professional workshops, and remote internship programmes by Burtech Solution.'
}

const RECENT_SESSIONS = [
  {
    id:          'html-css-starter-2025',
    title:       'HTML and CSS Starter Guide',
    date:        'April 27, 2025',
    instructor:  'Burgess Awalayah Glay',
    status:      'completed',
  },
  {
    id:          'matlab-beginner-2025',
    title:       'MATLAB Beginner Guide',
    date:        'October 9, 2025',
    instructor:  'Burgess Awalayah Glay',
    status:      'completed',
  },
  {
    id:          'cloud-computing-essentials-2026',
    title:       'Cloud Computing Essentials',
    date:        'February 21, 2026',
    instructor:  'Naison Faray',
    status:      'completed',
  },
  {
    id:          'prompt-engineering-2026',
    title:       'Prompt Engineering Masterclass',
    date:        'April 11, 2026',
    instructor:  'Burgess Awalayah Glay',
    status:      'upcoming',
  },
]

export default function AcademyPage() {
  return (
    <div className="pt-28 pb-20">
      {/* Hero */}
      <section className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-20">
        <span className="text-cyan-400 text-sm font-medium tracking-wide uppercase">Burtech Academy</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          Learn from people <span className="gradient-text-brand">building real things</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8">
          Burtech Academy is the education arm of Burtech Solution. We deliver practical technology training online, host workshops taught by industry practitioners, and run remote internship programmes for developers and analysts across Africa and beyond.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/academy/sessions"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/90 transition-colors">
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
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Live Training Sessions</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              We run one-day and multi-day workshops on technology topics including web development, data science, cloud computing, MATLAB, and AI tools. Taught by certified practitioners and delivered online via Google Meet.
            </p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6">
              <Laptop className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Remote Internship Programme</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              A structured remote internship where participants work on real Burtech client projects. Mentored by the founding team. Builds a genuine production portfolio.
            </p>
          </div>
          
          <div className="glass-card p-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <CalendarDays className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Upcoming Sessions</h3>
            <p className="text-white/55 text-sm leading-relaxed">
              We regularly announce new training dates on our website and Facebook page. Register your interest to be notified when new sessions open.
            </p>
          </div>
        </div>
      </section>

      {/* Real Sessions */}
      <section className="section-pad border-t border-white/[0.06]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Session History</h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto">
            Explore our recent and upcoming technology workshops. All sessions are delivered live and online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {RECENT_SESSIONS.map((session) => (
            <div key={session.id} className="glass-card p-6 relative flex flex-col">
              {/* Badge */}
              <div className="absolute top-6 right-6">
                {session.status === 'completed' ? (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-400/15 text-cyan-400 border border-cyan-400/25 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    Upcoming
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-white text-lg mb-2 pr-24">{session.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
                <Calendar className="w-4 h-4" />
                <span>{session.date}</span>
              </div>
              
              <p className="text-sm mb-1"><span className="text-white/40">Instructor:</span> <span className="text-cyan-400 font-medium">{session.instructor}</span></p>
              <p className="text-sm text-white/40 mb-6">Format: Online · Google Meet</p>

              <div className="mt-auto pt-5 border-t border-white/[0.06]">
                {session.status === 'completed' ? (
                  <Link href={`/academy/sessions#${session.id}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                    View session details →
                  </Link>
                ) : (
                  <Link href="/contact" className="inline-block px-5 py-2.5 bg-cyan-400 text-slate-900 text-sm font-semibold rounded-lg hover:bg-cyan-300 transition-colors">
                    Register now
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof */}
      <section className="section-pad pb-0 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-white/70">
            Follow BurgTech on Facebook for live updates on all sessions
          </p>
          <a href="https://www.facebook.com/burgtech" target="_blank" rel="noopener noreferrer"
             className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 transition-colors">
            View Facebook Page
          </a>
        </div>
      </section>
    </div>
  )
}
