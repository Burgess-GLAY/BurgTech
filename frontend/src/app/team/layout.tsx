import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the expert engineers, designers, and strategists behind Burtech Solution.',
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
