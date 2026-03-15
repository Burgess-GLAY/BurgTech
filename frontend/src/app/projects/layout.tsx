import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our track record of delivering high-impact digital solutions across industries.',
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
