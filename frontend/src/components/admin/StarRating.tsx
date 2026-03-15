'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  max?: number
  onChange?: (rating: number) => void
  className?: string
  readonly?: boolean
}

export function StarRating({
  rating,
  max = 5,
  onChange,
  className,
  readonly = false
}: StarRatingProps) {
  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const starValue = i + 1
        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => onChange?.(starValue)}
            className={cn(
              'transition-all focus:outline-none',
              readonly ? 'cursor-default' : 'hover:scale-110'
            )}
          >
            <Star
              className={cn(
                'w-5 h-5 transition-colors',
                starValue <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-white/10 fill-transparent'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
