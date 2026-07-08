import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
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

async function getPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${apiUrl}/api/v1/blog?limit=100`, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.posts || []
  } catch (err) {
    return []
  }
}

function PostCard({ post }: { post: any }) {
  return (
    <div className="hover:-translate-y-1 transition-transform duration-200">
      <Link href={`/insights/${post.slug}`} className="block h-full">
        <div className="glass-card overflow-hidden group hover:border-bt-cyan-border transition-all duration-300 h-full flex flex-col">
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
              <span className="text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider bg-bt-cyan-subtle border border-bt-cyan-border text-bt-cyan">
                {post.category?.replace(/_/g, ' ')}
              </span>
              <span className="text-[10px] text-white/40 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {post.readTimeMin || 5} min read
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-bt-cyan transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-white/50 text-sm mb-4 line-clamp-3">
              {post.summary}
            </p>
            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-bt-cyan-subtle flex items-center justify-center text-[10px] font-bold text-bt-cyan">
                  {post.author?.name?.charAt(0) || 'B'}
                </div>
                <div className="text-[10px]">
                  <p className="text-white/80 font-medium">{post.author?.name || 'BurgTech Solutions'}</p>
                  <p className="text-white/30">{formatDate(post.publishedAt)}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-bt-cyan group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const posts = await getPosts()
  const activeCategory = searchParams.category || 'ALL'
  
  const filtered = activeCategory === 'ALL' 
    ? posts 
    : posts.filter((p: any) => p.category === activeCategory)

  return (
    <main className="min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <div className="pt-28 pb-12 text-center px-4">
        <div>
          <span className="text-bt-cyan text-sm font-medium uppercase tracking-wide">Insights & News</span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Latest from <span className="gradient-text-brand">BurgTech</span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            AI research, data science insights, company news,
            and technology updates — all from May 2025 onwards.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide justify-start md:justify-center mb-10 px-4">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.key}
            href={`/insights?category=${cat.key}`}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200',
              activeCategory === cat.key
                ? 'bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border shadow-[0_0_12px_rgba(61,214,200,0.1)]'
                : 'border border-white/[0.08] text-white/50 hover:text-white hover:border-white/20'
            )}
          >
            {cat.label}
            {activeCategory === cat.key && filtered.length > 0 && (
              <span className="ml-2 text-xs text-bt-cyan-border">
                {filtered.length}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post: any) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg mb-6">No articles in this category yet.</p>
            <Link
              href="/insights"
              className="text-bt-cyan hover:text-bt-cyan-light font-medium underline underline-offset-4"
            >
              Back to all insights
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
