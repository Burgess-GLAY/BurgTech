'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    date:        'November 18, 2026',
    instructor:  'Burgess Awalayah Glay',
    status:      'upcoming',
  },
]

const SESSIONS_PER_PAGE = 4

export function SessionHistory() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(RECENT_SESSIONS.length / SESSIONS_PER_PAGE)
  const startIndex = (currentPage - 1) * SESSIONS_PER_PAGE
  const endIndex = startIndex + SESSIONS_PER_PAGE
  const displayedSessions = RECENT_SESSIONS.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <section className="section-pad border-t border-white/[0.06]">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Session History</h2>
        <p className="text-white/50 mt-4 max-w-xl mx-auto">
          Explore our recent and upcoming technology workshops. All sessions are delivered live and online.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {displayedSessions.map((session) => (
          <div key={session.id} className="glass-card p-6 relative flex flex-col">
            {/* Badge */}
            <div className="absolute top-6 right-6">
              {session.status === 'completed' ? (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20">
                  Completed
                </span>
              ) : (
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-bt-cyan animate-pulse" />
                  Upcoming
                </span>
              )}
            </div>

            <h3 className="font-semibold text-white text-lg mb-2 pr-24">{session.title}</h3>

            <div className="flex items-center gap-2 text-sm text-white/50 mb-4">
              <Calendar className="w-4 h-4" />
              <span>{session.date}</span>
            </div>

            <p className="text-sm mb-1"><span className="text-white/40">Instructor:</span> <span className="text-bt-cyan font-medium">{session.instructor}</span></p>
            <p className="text-sm text-white/40 mb-6">Format: Online · Google Meet</p>

            <div className="mt-auto pt-5 border-t border-white/[0.06]">
              {session.status === 'completed' ? (
                <Link href={`/academy/sessions#${session.id}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">
                  View session details →
                </Link>
              ) : (
                <Link href="/contact" className="btn-primary inline-block px-5 py-2.5 text-sm">
                  Register now
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "p-2 rounded-lg border transition-colors",
              currentPage === 1
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
            )}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={cn(
                  "w-10 h-10 rounded-lg text-sm font-medium transition-colors",
                  currentPage === page
                    ? "bg-bt-cyan text-bg-primary"
                    : "border border-white/20 text-white/70 hover:text-white hover:border-white/30"
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "p-2 rounded-lg border transition-colors",
              currentPage === totalPages
                ? "border-white/10 text-white/30 cursor-not-allowed"
                : "border-white/20 text-white/70 hover:text-white hover:border-white/30"
            )}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  )
}
