'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ExternalLink, ArrowRight, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CTASection } from '@/components/sections'

const SESSIONS = [
  {
    id:          'html-css-starter-2025',
    title:       'HTML and CSS Starter Guide',
    date:        'April 27, 2025',
    isoDate:     '2025-04-27',
    duration:    'One day',
    format:      'Online — Google Meet',
    instructor:  'Burgess Awalayah Glay',
    instructorRole: 'Founder, BurgTech Solutions',
    status:      'completed',
    description: 'An introductory one-day workshop covering the building blocks of web development. Participants learned HTML document structure, semantic elements, CSS styling, selectors, the box model, flexbox basics, and how to build a complete web page from scratch. No prior experience required.',
    topics: [
      'HTML document structure and syntax',
      'Semantic HTML elements',
      'CSS selectors and specificity',
      'The CSS box model',
      'Flexbox layout basics',
      'Building a complete web page',
    ],
    facebookUrl: 'https://www.facebook.com/share/p/1DSpFncksg/?mibextid=wwXIfr',
    image: '/images/teaching/html starter poster.jpeg',
    colorKey: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id:          'matlab-beginner-2025',
    title:       'MATLAB Beginner Guide',
    date:        'October 9, 2025',
    isoDate:     '2025-10-09',
    duration:    'One day',
    format:      'Online — Google Meet',
    instructor:  'Burgess Awalayah Glay',
    instructorRole: 'Founder, BurgTech Solutions',
    status:      'completed',
    description: 'A one-day beginner workshop introducing MATLAB to students and professionals. The session covered the MATLAB environment and workspace, variables and data types, matrix and array operations, basic plotting and data visualisation, writing scripts and functions, and practical exercises using real engineering and data problems.',
    topics: [
      'MATLAB environment and workspace',
      'Variables, data types, and arrays',
      'Matrix and vector operations',
      'Basic plotting and data visualisation',
      'Writing scripts and functions',
      'Practical engineering exercises',
    ],
    facebookUrl: 'https://www.facebook.com/share/r/1HUiVUGv71/?mibextid=wwXIfr',
    image: '/images/teaching/matlab teaching poster.jpeg',
    colorKey: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    id:          'cloud-computing-essentials-2026',
    title:       'Cloud Computing Essentials',
    date:        'February 21, 2026',
    isoDate:     '2026-02-21',
    duration:    'One day',
    format:      'Online — Google Meet',
    instructor:  'Naison Faray',
    instructorRole: 'Certified Cloud Engineer · MSc Computer Science · DR Congo',
    status:      'completed',
    description: 'A comprehensive one-day cloud computing workshop taught by certified cloud engineer Naison Faray. Participants gained a solid foundation in cloud computing concepts, major platforms, and hands-on deployment knowledge applicable to real-world infrastructure projects.',
    topics: [
      'What cloud computing is and why it matters',
      'Overview of AWS, Google Cloud, and Azure',
      'Core concepts: IaaS, PaaS, and SaaS',
      'Virtual machines and containers',
      'Cloud storage and managed databases',
      'Serverless computing fundamentals',
      'Cloud security basics',
      'Real-world deployment walkthrough',
    ],
    facebookUrl: 'https://www.facebook.com/burgtech',
    image: '/images/teaching/cloud computing poster.jpeg',
    colorKey: 'from-bt-cyan/20 to-bt-teal/20',
  },
  {
    id:          'prompt-engineering-2026',
    title:       'Prompt Engineering Masterclass',
    date:        'April 11, 2026',
    isoDate:     '2026-04-11',
    duration:    'One day',
    format:      'Online — Google Meet',
    instructor:  'Burgess Awalayah Glay',
    instructorRole: 'Founder, BurgTech Solutions',
    status:      'upcoming',
    description: 'A one-day hands-on masterclass on prompt engineering and working with AI agents. Learn how to write effective prompts, understand how large language models think, and how to use modern AI coding tools including Windsurf and Antigravity to build faster and smarter.',
    topics: [
      'How large language models work',
      'Prompt structure and best practices',
      'Zero-shot and few-shot prompting',
      'Chain-of-thought prompting techniques',
      'Using AI coding agents: Windsurf and Antigravity',
      'Building automated workflows with AI tools',
      'Practical hands-on exercises',
    ],
    facebookUrl: null,
    image: null,
    colorKey: 'from-indigo-500/20 to-purple-500/20',
  },
]

type FilterTab = 'ALL' | 'COMPLETED' | 'UPCOMING'

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('ALL')

  const filteredSessions = SESSIONS.filter(s => {
    if (activeTab === 'COMPLETED') return s.status === 'completed'
    if (activeTab === 'UPCOMING') return s.status === 'upcoming'
    return true
  })

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-bt-cyan text-sm font-medium tracking-wide uppercase">Training Sessions</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Workshops and classes from <span className="gradient-text-brand">BurgTech Academy</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Every session is taught online via Google Meet by practitioners with real-world experience. Beginner-friendly and hands-on from the first hour.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(['ALL', 'COMPLETED', 'UPCOMING'] as FilterTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200",
                activeTab === tab 
                  ? "bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border" 
                  : "bg-white/5 text-white/50 border border-transparent hover:text-white hover:bg-white/10"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Sessions Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredSessions.map((session, i) => (
              <motion.div
                key={session.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className="glass-card overflow-hidden flex flex-col"
                id={session.id}
              >
                {/* Image Section */}
                <div className="h-52 relative w-full bg-surface border-b border-white/[0.06] overflow-hidden">
                  {session.image ? (
                    <>
                      <img src={session.image} alt={session.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                    </>
                  ) : (
                    <div className={cn("w-full h-full bg-gradient-to-br flex items-center justify-center relative", session.colorKey)}>
                      <div className="absolute inset-0 bg-surface/80" />
                      <div className="relative z-10 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-sm font-medium mb-3 backdrop-blur-md">
                          Coming soon
                        </span>
                        <h4 className="text-xl font-bold text-white/90">{session.date}</h4>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    {session.status === 'completed' ? (
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20 shadow-lg backdrop-blur-md">
                        Completed
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 text-xs font-semibold rounded-full bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border shadow-lg backdrop-blur-md flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan animate-pulse" />
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{session.title}</h3>
                  <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                    <Calendar className="w-4 h-4 text-bt-cyan" />
                    <span>{session.date} · {session.duration}</span>
                  </div>
                  <p className="text-white/40 text-sm mb-4">Online · Google Meet</p>

                  {/* Instructor */}
                  <div className="mt-2 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bt-cyan to-bt-teal flex items-center justify-center text-slate-900 font-bold flex-shrink-0">
                      {session.instructor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{session.instructor}</p>
                      <p className="text-xs text-white/40">{session.instructorRole}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-white/60 leading-relaxed">
                    {session.description}
                  </p>

                  <div className="mt-6">
                    <p className="text-xs text-white/40 uppercase tracking-wider font-semibold mb-3">
                      What was covered
                    </p>
                    <ul className="space-y-2">
                      {session.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-white/65">
                          <span className="text-bt-cyan mt-0.5 flex-shrink-0">✓</span>
                          <span className="leading-snug">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Row */}
                  <div className="mt-auto pt-6 border-t border-white/[0.06] flex items-center gap-3">
                    {session.status === 'completed' && session.facebookUrl && (
                      <a href={session.facebookUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-bt-cyan hover:text-bt-cyan-light transition-colors">
                        View on Facebook <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {session.status === 'upcoming' && (
                      <Link href="/contact"
                        className="btn-primary w-full">
                        Register now <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Banner */}
        <div className="max-w-3xl mx-auto glass-card p-5 flex items-start sm:items-center gap-4 border-bt-cyan/10">
          <div className="w-10 h-10 rounded-full bg-bt-cyan/10 flex items-center justify-center flex-shrink-0 mt-1 sm:mt-0">
            <Info className="w-5 h-5 text-bt-cyan" />
          </div>
          <p className="text-white/60 text-sm leading-relaxed flex-1">
            When a new session is announced, it is also published in our Insights section. Follow BurgTech on Facebook for the latest announcements.
          </p>
          <a href="https://www.facebook.com/burgtech" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors">
            Follow Us
          </a>
        </div>

      </div>
      <CTASection />
    </div>
  )
}
