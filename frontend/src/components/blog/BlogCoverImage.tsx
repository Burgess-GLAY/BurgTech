'use client'
import { useMemo } from 'react'
import { getInsightImage } from '@/utils/insightImages'

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
  COMPANY_NEWS:          { bg1:'#0a1f2e', bg2:'#0f2a3a', accent:'#3dd6c8',
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
  const fallbackImage = getInsightImage(category)

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

  const imageSrc = (src && src.trim() !== '') ? src : fallbackImage

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
    />
  )
}
