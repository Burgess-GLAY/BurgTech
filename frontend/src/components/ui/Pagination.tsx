'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
  const visiblePages = pages.filter(p => 
    p === 1 || p === totalPages || (p >= currentPage - 1 && p <= currentPage + 1)
  )

  const renderPage = (p: number, index: number) => {
    const prevPage = visiblePages[index - 1]
    const showEllipsis = prevPage && p - prevPage > 1

    return (
      <div key={p} className="flex items-center">
        {showEllipsis && <span className="px-2 text-white/20">...</span>}
        <button
          onClick={() => onPageChange(p)}
          className={cn(
            'w-10 h-10 rounded-lg border transition-all flex items-center justify-center font-medium',
            currentPage === p
              ? 'bg-bt-cyan/15 text-bt-cyan border-bt-cyan/25'
              : 'border-white/10 text-white/60 hover:border-white/20 hover:text-white'
          )}
        >
          {p}
        </button>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg border border-white/10 text-white/60 hover:border-white/20 hover:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {visiblePages.map(renderPage)}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg border border-white/10 text-white/60 hover:border-white/20 hover:text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
