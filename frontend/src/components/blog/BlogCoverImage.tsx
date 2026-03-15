'use client'
import { useMemo } from 'react'

interface BlogCoverImageProps {
  src?: string | null
  alt: string
  category: string
  title: string
  className?: string
}

const CATEGORY_CONFIG: Record<string, {
  bg1: string; bg2: string; accent: string;
  label: string; icon: string
}> = {
  AI_DATA_SCIENCE:       { bg1:'#0d1b3e', bg2:'#1a0a4e', accent:'#818cf8',
                            label:'AI & Data Science',    icon:'⬡' },
  COMPANY_NEWS:          { bg1:'#0a1f2e', bg2:'#0f2a3a', accent:'#00d9ff',
                            label:'Company News',          icon:'◈' },
  TECH_INSIGHTS:         { bg1:'#0d1836', bg2:'#0a2040', accent:'#3b82f6',
                            label:'Tech Insights',         icon:'◎' },
  PROJECT_ANNOUNCEMENT:  { bg1:'#0a2018', bg2:'#0f2a1e', accent:'#34d399',
                            label:'Projects',              icon:'◆' },
  TUTORIAL:              { bg1:'#2a1a08', bg2:'#3a2010', accent:'#fbbf24',
                            label:'Tutorial',              icon:'▣' },
}

export function BlogCoverImage({ src, alt, category, title, className }: BlogCoverImageProps) {
  const config = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.TECH_INSIGHTS
  const slugifiedCategory = category.toLowerCase().replace(/_/g, '-')

  const titleLines = useMemo(() => {
    const maxLen = 38
    if (title.length <= maxLen) return [title]
    const words = title.split(' ')
    const lines: string[] = []
    let current = ''
    for (const word of words) {
      if ((current + ' ' + word).trim().length <= maxLen) {
        current = (current + ' ' + word).trim()
      } else {
        if (current) lines.push(current)
        current = word
        if (lines.length === 1) break
      }
    }
    if (current) lines.push(current)
    return lines.slice(0, 2)
  }, [title])

  if (src && src.trim() !== '') {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
      />
    )
  }

  return (
    <svg
      width="100%"
      viewBox="0 0 800 420"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={`bg-${slugifiedCategory}`}
                        x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={config.bg1} />
          <stop offset="100%" stopColor={config.bg2} />
        </linearGradient>
      </defs>
      {/* Background */}
      <rect width="800" height="420"
            fill={`url(#bg-${slugifiedCategory})`} />
      {/* Decorative circles */}
      <circle cx="680" cy="80"  r="120"
              fill={config.accent} fillOpacity="0.07" />
      <circle cx="100" cy="340" r="90"
              fill={config.accent} fillOpacity="0.05" />
      <circle cx="400" cy="210" r="200"
              fill={config.accent} fillOpacity="0.03" />
      {/* Horizontal accent line */}
      <line x1="80" y1="300" x2="720" y2="300"
            stroke={config.accent} strokeOpacity="0.12"
            strokeWidth="1" />
      {/* Icon */}
      <text x="400" y="175" textAnchor="middle"
            fontSize="72" fill={config.accent}
            fillOpacity="0.32" fontFamily="monospace">
        {config.icon}
      </text>
      {/* Category label */}
      <text x="400" y="220" textAnchor="middle"
            fontSize="11" fill={config.accent}
            letterSpacing="3" fontFamily="sans-serif"
            style={{ textTransform: 'uppercase' }}>
        {config.label.toUpperCase()}
      </text>
      {/* Post title — split at 38 chars */}
      {titleLines.map((line, i) => (
        <text key={i} x="400" y={255 + i * 28}
              textAnchor="middle" fontSize="19"
              fill="rgba(255,255,255,0.88)"
              fontFamily="sans-serif" fontWeight="600">
          {line}
        </text>
      ))}
      {/* Watermark */}
      <text x="780" y="408" textAnchor="end"
            fontSize="10" fill="rgba(255,255,255,0.18)"
            fontFamily="sans-serif">
        Burtech Solution
      </text>
    </svg>
  )
}
