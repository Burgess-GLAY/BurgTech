import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Digital Services',
  description: 'Advanced digital solutions — from AI and Data Science to Web and Cloud Engineering.',
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
