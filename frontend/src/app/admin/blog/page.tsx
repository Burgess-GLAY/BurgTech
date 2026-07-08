'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, FileText, Search, Calendar, ChevronRight, Eye, EyeOff } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const MOBILE_CATEGORY_BADGE: Record<string, string> = {
  AI_DATA_SCIENCE: 'text-xs px-2.5 py-0.5 rounded-full bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20',
  COMPANY_NEWS: 'text-xs px-2.5 py-0.5 rounded-full bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border',
  TECH_INSIGHTS: 'text-xs px-2.5 py-0.5 rounded-full bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20',
  PROJECT_ANNOUNCEMENT: 'text-xs px-2.5 py-0.5 rounded-full bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border',
  TUTORIAL: 'text-xs px-2.5 py-0.5 rounded-full bg-bt-teal-subtle text-bt-cyan border border-bt-teal/20',
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [deleteId, setDeleteId] = useState<string | null>(null) // Added for delete modal/confirm consistency

  useEffect(() => {
    fetchPosts()
  }, [currentPage])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get(`/blog?page=${currentPage}&limit=10`)
      setPosts(data.posts)
      setTotalPages(data.pages)
    } catch (err) {
      toast.error('Failed to load blog posts')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    try {
      await apiClient.delete(`/blog/${id}`)
      toast.success('Post deleted')
      fetchPosts()
    } catch (err) {
      toast.error('Failed to delete post')
    }
  }

  const togglePublish = async (post: any) => {
    try {
      await apiClient.put(`/blog/${post.id}`, { isPublished: !post.isPublished })
      toast.success(post.isPublished ? 'Post unpublished' : 'Post published')
      fetchPosts()
    } catch (err) {
      toast.error('Failed to update status')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Blog Management</h2>
          <p className="text-sm text-white/40 mt-0.5">{posts.length} total</p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="btn-primary py-2.5 text-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Create Post
        </Link>
      </div>

      {loading ? (
        <Skeleton lines={5} className="h-20 w-full rounded-2xl" />
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          {/* DESKTOP TABLE — hidden on mobile */}
          <div className="hidden md:block glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/40">
                  <th className="px-6 py-4 font-medium">Article</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {posts.map((post: any) => (
                  <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 max-w-md">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 border border-white/5">
                          {post.coverImage ? (
                            <img src={post.coverImage} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/10 italic text-[10px]">No BG</div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white truncate">{post.title}</p>
                          <p className="text-xs text-white/30 truncate">{post.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-[10px] font-bold tracking-wider">
                        {post.category?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/40">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 uppercase">
                      <span className={cn(
                        'text-[10px] font-black tracking-widest',
                        post.isPublished ? 'text-bt-cyan' : 'text-white/20'
                      )}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/blog/${post.id}`} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS — hidden on desktop */}
          <div className="md:hidden space-y-3">
            {posts.map((post: any) => (
              <div key={post.id} className="glass-card p-4 flex flex-col gap-3">
                {/* ROW 1 — Cover thumbnail + Title + Summary */}
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/[0.05]">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-bt-teal flex items-center justify-center text-white/40 text-xs font-bold">
                        {post.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{post.title}</p>
                    <p className="text-xs text-white/40 mt-0.5">By {post.author?.name || 'Unknown'}</p>
                  </div>
                </div>

                {/* ROW 2 — Category + Status side by side */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Category</p>
                    <span className={MOBILE_CATEGORY_BADGE[post.category] || 'text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/10'}>
                      {post.category?.replace(/_/g, ' ') || 'Uncategorised'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Status</p>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full",
                      post.isPublished ? "bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border" : "bg-white/[0.05] text-white/40 border border-white/[0.08]"
                    )}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* ROW 3 — Date + Read time side by side */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Published</p>
                    <p className="text-xs text-white/50">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Read time</p>
                    <p className="text-xs text-white/50">{post.readTimeMin || 5} min</p>
                  </div>
                </div>

                {/* ROW 4 — Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                  <button
                    onClick={() => togglePublish(post)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium"
                  >
                    {post.isPublished ? (
                      <><EyeOff className="w-3.5 h-3.5" /> Unpublish</>
                    ) : (
                      <><Eye className="w-3.5 h-3.5" /> Publish</>
                    )}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/20 text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors text-xs font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : (
        <EmptyState 
          icon={FileText}
          title="No blog posts"
          description="Start sharing your tech insights by creating your first post."
          actionLabel="Create Post"
          onAction={() => window.location.href = '/admin/blog/new'}
        />
      )}
    </div>
  )
}
