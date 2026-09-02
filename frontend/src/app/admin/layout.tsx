'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, FolderOpen, Users, Layers, MessageSquare, FileText, Star, Settings, LogOut, Bell, Menu, X } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Overview', href: '/admin', icon: LayoutDashboard },
  { label: 'Messages', href: '/admin/messages', icon: MessageSquare },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Services', href: '/admin/services', icon: Layers },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Users', href: '/admin/users', icon: Users, superOnly: true },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isLoading } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) router.push('/admin/login')
  }, [user, isLoading, router, isLoginPage])

  // Prefetch admin stats on mount
  useEffect(() => {
    if (user) {
      queryClient.prefetchQuery({
        queryKey: ['admin-stats'],
        queryFn: () => apiClient.get('/admin/stats').then(r => r.data),
        staleTime: 60_000,
      })
    }
  }, [user, queryClient])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  if (isLoading) return (
    <div className="min-h-screen bg-[#050e12] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-bt-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!user && !isLoginPage) return null

  if (isLoginPage) return <>{children}</>

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#050e12] flex overflow-hidden">
      {/* Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-[#050e12] border-r border-white/[0.06] flex flex-col z-50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:flex-shrink-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold text-xs">B</div>
            <span className="font-semibold text-sm">Burtech <span className="text-bt-cyan">Admin</span></span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {NAV.filter(n => !n.superOnly || user.role === 'SUPER_ADMIN').map(item => {
            const Icon = item.icon
            const active = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-base transition-all relative group',
                active ? 'text-bt-cyan font-semibold' : 'text-white/40 hover:text-white hover:bg-white/[0.03]'
              )}>
                {active && <motion.div layoutId="nav-bg" className="absolute inset-0 bg-bt-cyan/10 rounded-xl" />}
                <Icon className={cn("w-4 h-4 flex-shrink-0 relative z-10", active ? "text-bt-cyan" : "text-white/30 group-hover:text-white")} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="px-4 py-6 border-t border-white/[0.06] bg-white/[0.01]">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-bt-cyan/20 to-bt-teal/20 flex items-center justify-center text-xs font-bold text-bt-cyan border border-bt-cyan/20">{user.name.charAt(0)}</div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold truncate text-white/90">{user.name}</p>
              <p className="text-sm uppercase tracking-wider text-white/40 font-bold">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
          <button onClick={logout} className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400/60 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300">
            <LogOut className="w-4 h-4" /> <span className="font-medium">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/[0.06] bg-[#050e12]/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 flex-shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-white/40 hover:text-white bg-white/5 rounded-xl transition-colors">
              <Menu size={20} />
            </button>
            <h1 className="font-semibold text-base text-white/80">
              {NAV.find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-white/30 hover:text-white rounded-xl hover:bg-white/5 transition-colors hidden sm:block">
              <Bell className="w-4 h-4" />
            </button>
            <Link href="/" target="_blank" className="text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10 text-white/40 hover:text-white hover:border-bt-cyan/30 hover:bg-bt-cyan/5 transition-all duration-300">
              View site
            </Link>
          </div>
        </header>

        {/* Content */}
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  )
}
