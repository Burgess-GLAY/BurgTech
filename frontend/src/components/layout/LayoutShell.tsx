'use client'
import { usePathname } from 'next/navigation'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ChatWidget } from '@/components/chat/ChatWidget'

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? 'min-h-screen' : ''}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <ChatWidget />}
    </>
  )
}
