'use client'
import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { cn, formatDate } from '@/lib/utils'
import { BlogCoverImage } from '@/components/blog/BlogCoverImage'

const CATEGORIES = [
  { key: 'ALL',                   label: 'All' },
  { key: 'AI_DATA_SCIENCE',       label: 'AI & Data Science' },
  { key: 'COMPANY_NEWS',          label: 'Company News' },
  { key: 'TECH_INSIGHTS',         label: 'Tech Insights' },
  { key: 'PROJECT_ANNOUNCEMENT',  label: 'Projects' },
  { key: 'TUTORIAL',              label: 'Tutorials' },
]

const PAGE_SIZE = 9

function PostCard({ post, index }: { post: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Link href={`/insights/${post.slug}`} className="block h-full">
        <div className="glass-card overflow-hidden group hover:border-cyan-400/20 transition-all duration-300 h-full flex flex-col">
          <div className="h-48 overflow-hidden">
            <BlogCoverImage
              src={post.coverImage}
              alt={post.title}
              category={post.category}
              title={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-cyan-400">
                {post.category?.replace(/_/g, ' ')}
              </span>
              <span className="text-[10px] text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTimeMin || 5} min read
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-white/50 text-sm mb-4 line-clamp-3">
              {post.summary}
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-[10px] font-bold text-cyan-400">
                  {post.author?.name?.charAt(0) || 'B'}
                </div>
                <div className="text-[10px]">
                  <p className="text-white/80 font-medium">{post.author?.name || 'Burtech Solution'}</p>
                  <p className="text-white/30">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden h-full flex flex-col animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-white/5 rounded" />
          <div className="h-4 w-16 bg-white/5 rounded" />
        </div>
        <div className="h-6 w-full bg-white/5 rounded" />
        <div className="h-4 w-full bg-white/5 rounded" />
        <div className="h-4 w-2/3 bg-white/5 rounded" />
      </div>
    </div>
  )
}

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-all'],
    queryFn: () => apiClient.get('/blog?limit=100').then(r => r.data.posts),
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory])

  const filtered = useMemo(() => {
    if (!posts) return []
    if (activeCategory === 'ALL') return posts
    return posts.filter((p: any) => p.category === activeCategory)
  }, [posts, activeCategory])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return (
    <main className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <div className="pt-28 pb-12 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-wide">Insights & News</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Latest from <span className="gradient-text-brand">Burtech</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            AI research, data science insights, company news,
            and technology updates — all from May 2025 onwards.
          </p>
        </motion.div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center mb-10 px-4">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeCategory === cat.key
                ? 'bg-cyan-400/15 text-cyan-400 border border-cyan-400/25 shadow-[0_0_12px_rgba(0,217,255,0.1)]'
                : 'border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
            )}
          >
            {cat.label}
            {activeCategory === cat.key && filtered.length > 0 && (
              <span className="ml-2 text-xs text-cyan-400/60">
                {filtered.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${currentPage}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {paginated.map((post: any, index: number) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-white/10 text-white disabled:opacity-20 transition-all hover:bg-white/5"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={cn(
                        'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                        currentPage === i + 1
                          ? 'bg-cyan-400 text-slate-900 font-bold'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-white/10 text-white disabled:opacity-20 transition-all hover:bg-white/5"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/40 text-lg mb-6">No articles in this category yet.</p>
            <button
              onClick={() => setActiveCategory('ALL')}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4"
            >
              Back to all insights
            </button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
