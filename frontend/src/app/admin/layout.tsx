'use client'
import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LayoutDashboard, FolderOpen, Users, Layers, MessageSquare, FileText, Star, Settings, LogOut, Bell } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Overview',     href: '/admin',              icon: LayoutDashboard },
  { label: 'Messages',     href: '/admin/messages',     icon: MessageSquare },
  { label: 'Chat',         href: '/admin/chat',         icon: MessageSquare },
  { label: 'Projects',     href: '/admin/projects',     icon: FolderOpen },
  { label: 'Services',     href: '/admin/services',     icon: Layers },
  { label: 'Team',         href: '/admin/team',         icon: Users },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Blog',         href: '/admin/blog',         icon: FileText },
  { label: 'Users',        href: '/admin/users',        icon: Users, superOnly: true },
  { label: 'Settings',     href: '/admin/settings',     icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) router.push('/admin/login')
  }, [user, isLoading, router, isLoginPage])

  if (isLoading) return (
    <div className="min-h-screen bg-[#080c18] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user && !isLoginPage) return null // Will redirect due to useEffect

  if (isLoginPage) return <>{children}</>

  // Re-check for type safety in subsequent blocks
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#080c18] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/[0.06] flex flex-col">
        <div className="h-16 flex items-center px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-xs">B</div>
            <span className="font-semibold text-sm">Burtech <span className="text-cyan-400">Admin</span></span>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.filter(n => !n.superOnly || user.role === 'SUPER_ADMIN').map(item => {
            const Icon = item.icon
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all', active ? 'bg-cyan-400/10 text-cyan-400 font-medium' : 'text-white/50 hover:text-white hover:bg-white/[0.04]')}>
                <Icon className="w-4 h-4 flex-shrink-0" />{item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-semibold text-blue-400">{user.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-white/30 truncate">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white hover:bg-white/[0.04] transition-colors">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 flex-shrink-0">
          <h1 className="font-semibold text-sm text-white/70">{NAV.find(n => pathname.startsWith(n.href))?.label || 'Dashboard'}</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <Link href="/" target="_blank" className="text-xs px-3 py-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition-colors">View site</Link>
          </div>
        </header>
        <motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex-1 overflow-auto p-6">
          {children}
        </motion.main>
      </div>
    </div>
  )
}
