import { Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { BlogCoverImage } from '@/components/blog/BlogCoverImage'

const CATEGORY_BADGE: Record<string, string> = {
  AI_DATA_SCIENCE: 'bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20',
  COMPANY_NEWS: 'bg-bt-cyan-subtle   text-bt-cyan   border border-bt-cyan-border',
  TECH_INSIGHTS: 'bg-bt-teal-subtle   text-bt-cyan   border border-bt-teal/20',
  PROJECT_ANNOUNCEMENT: 'bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border',
  TUTORIAL: 'bg-bt-teal-subtle  text-bt-cyan  border border-bt-teal/20',
}

async function getPost(slug: string) {
  const base = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  try {
    const res = await fetch(`${base}/api/v1/blog/${slug}`, {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.post ?? null
  } catch (err) {
    console.error('getPost error:', err)
    return null
  }
}

function NotFoundState() {
  return (
    <div className="pt-48 pb-24 max-w-3xl mx-auto px-4 text-center">
      <p className="text-6xl mb-6">📄</p>
      <h1 className="text-3xl font-bold mb-4">Article not found</h1>
      <p className="text-white/50 mb-8">
        This article may have been removed or the link may be incorrect.
      </p>
      <Link href="/insights"
        className="btn-primary">
        Browse all insights
      </Link>
    </div>
  )
}

function ArticleLayout({ post }: { post: any }) {
  return (
    <div className="pt-28 pb-24 max-w-3xl mx-auto px-4 md:px-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-white/40 mb-8 flex-wrap">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span className="text-white/20">/</span>
        <Link href="/insights" className="hover:text-white transition-colors">
          Insights
        </Link>
        <span className="text-white/20">/</span>
        <span className="text-white/60 line-clamp-1 max-w-[200px]">
          {post.title}
        </span>
      </nav>

      {/* Cover Image */}
      <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
        <BlogCoverImage
          src={post.coverImage}
          alt={post.title}
          category={post.category}
          title={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Metadata Row */}
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${CATEGORY_BADGE[post.category] || 'bg-white/5 border-white/10 text-white/40'}`}>
          {post.category?.replace(/_/g, ' ')}
        </span>
        <span className="text-white/30 text-xs">·</span>
        <span className="text-white/50 text-sm flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {post.publishedAt ? formatDate(post.publishedAt) : 'Unpublished'}
        </span>
        <span className="text-white/30 text-xs">·</span>
        <span className="text-white/50 text-sm flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {post.readTimeMin || 5} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
        {post.title}
      </h1>

      {/* Author Block */}
      <div className="flex items-center gap-3 py-4 border-y border-white/[0.08] mb-8">
        <div className="w-10 h-10 rounded-full bg-bt-cyan-subtle flex items-center justify-center text-sm font-bold text-bt-cyan flex-shrink-0">
          {post.author?.name?.charAt(0) || 'B'}
        </div>
        <div>
          <p className="text-sm font-semibold">
            {post.author?.name || 'BurgTech Solutions'}
          </p>
          <p className="text-xs text-white/40">
            {post.publishedAt ? formatDate(post.publishedAt) : ''}
            {post.readTimeMin ? ` · ${post.readTimeMin} min read` : ''}
          </p>
        </div>
      </div>

      {/* Article Content */}
      <article
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />

      {/* Tags Row */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-10 pt-8 border-t border-white/[0.08]">
          <span className="text-xs text-white/40 mr-1">Tags:</span>
          {post.tags.map((tag: string) => (
            <span key={tag}
              className="text-[10px] px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/50">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t border-white/[0.08]">
        <Link href="/insights"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to all insights
        </Link>
      </div>
    </div>
  )
}

export default async function InsightDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)
  if (!post) return <NotFoundState />
  return <ArticleLayout post={post} />
}

export async function generateMetadata({
  params
}: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Article Not Found | BurgTech Solutions' }
  return {
    title: `${post.title} | BurgTech Solutions`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}
