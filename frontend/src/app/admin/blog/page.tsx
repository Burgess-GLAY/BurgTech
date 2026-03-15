'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, FileText, Search, Calendar, ChevronRight } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Blog Management</h2>
          <p className="text-sm text-white/40">Manage your company insights and news.</p>
        </div>
        <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Post
        </Link>
      </div>

      {loading ? (
        <Skeleton lines={5} className="h-20 w-full rounded-2xl" />
      ) : posts.length > 0 ? (
        <div className="space-y-6">
          <div className="glass-card overflow-hidden">
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
                        {post.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/40">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-6 py-4 uppercase">
                      <span className={cn(
                        'text-[10px] font-black tracking-widest',
                        post.isPublished ? 'text-cyan-400' : 'text-white/20'
                      )}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/blog/${post.id}`} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-white/5 text-red-400 hover:bg-red-500/10 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
