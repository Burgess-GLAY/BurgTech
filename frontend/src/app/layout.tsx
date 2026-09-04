import type { Metadata } from 'next'
import { Providers } from '@/components/layout/Providers'
import { LayoutShell } from '@/components/layout/LayoutShell'
import './globals.css'

import localFont from 'next/font/local'

const inter = localFont({
  src: [
    {
      path: '../fonts/inter-300.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/inter-400.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/inter-500.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/inter-600.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/inter-700.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/inter-800.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/inter-900.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

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
      <body className={`${inter.variable} font-sans bg-surface text-white antialiased`}>
        <Providers>
          <LayoutShell>{children}</LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
