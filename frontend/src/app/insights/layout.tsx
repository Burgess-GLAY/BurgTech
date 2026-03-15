import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Deep dives into technology, engineering, and digital transformation at Burtech Solution.',
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
