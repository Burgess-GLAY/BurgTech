'use client'

import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  lines?: number
  height?: string
}

export function Skeleton({ className, lines = 1, height }: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-full animate-pulse rounded bg-white/10"
            style={i === lines - 1 ? { width: '80%' } : {}}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn('animate-pulse rounded bg-white/10', className)}
      style={height ? { height } : {}}
    />
  )
}
