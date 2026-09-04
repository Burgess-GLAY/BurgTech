import type { Metadata } from 'next'
import { Providers } from '@/components/layout/Providers'
import { LayoutShell } from '@/components/layout/LayoutShell'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'BurgTech Solutions', template: '%s | BurgTech Solutions' },
  description: 'Advanced digital solutions — web, mobile, data analytics, AI, and cloud services.',
  keywords: ['web development', 'mobile apps', 'data analytics', 'AI', 'cloud migration', 'Cyprus', 'tech company'],
  openGraph: {
    type: 'website',
    siteName: 'BurgTech Solutions',
    title: 'BurgTech Solutions — Advanced Digital Solutions',
    description: 'Web, mobile, data analytics, AI and cloud services for modern businesses.',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-sans bg-surface text-white antialiased">
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
