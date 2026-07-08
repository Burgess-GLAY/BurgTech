'use client'

import { useState, useEffect } from 'react'
import { Save, ChevronLeft, Image as ImageIcon, Send } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { ImageInput } from './ImageInput'
import { RichTextEditor } from './RichTextEditor'

interface BlogEditorProps {
  initialData?: any
  id?: string
}

const CATEGORIES = [
  { value: 'COMPANY_NEWS', label: 'Company News' },
  { value: 'TECH_INSIGHTS', label: 'Tech Insights' },
  { value: 'PROJECT_ANNOUNCEMENT', label: 'Projects' },
  { value: 'AI_DATA_SCIENCE', label: 'AI & Data' },
  { value: 'TUTORIAL', label: 'Tutorials' },
]

export function BlogEditor({ initialData, id }: BlogEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    coverImage: '',
    category: 'TECH_INSIGHTS',
    tags: '',
    isPublished: false,
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        tags: initialData.tags?.join(', ') || '',
      })
    }
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    }

    try {
      if (id) {
        await apiClient.put(`/blog/${id}`, payload)
        toast.success('Post updated successfully')
      } else {
        await apiClient.post('/blog', payload)
        toast.success('Post created successfully')
      }
      router.push('/admin/blog')
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-20">
      <div className="flex items-center justify-between sticky top-16 z-10 py-4 bg-[#050e12]/80 backdrop-blur-xl border-b border-white/5 -mx-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 rounded-lg hover:bg-white/5 transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/40" />
          </Link>
          <h2 className="text-xl font-bold text-white">{id ? 'Edit' : 'New'} Blog Post</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, isPublished: !formData.isPublished })}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${formData.isPublished
              ? 'bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border'
              : 'bg-white/5 text-white/40 border border-white/10'
              }`}
          >
            {formData.isPublished ? 'Published' : 'Draft'}
          </button>
          <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 px-8">
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
            <input
              type="text" required
              className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-4 text-2xl font-bold text-white focus:outline-none focus:border-bt-cyan/50 transition-colors placeholder:text-white/10"
              placeholder="Post Title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Slug</label>
            <input
              type="text" required
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm text-bt-cyan/60 font-mono focus:outline-none focus:border-bt-cyan/50 transition-colors"
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Content</label>
            <RichTextEditor
              value={formData.content}
              onChange={html => setFormData({ ...formData, content: html })}
              minHeight="400px"
            />
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
              <select
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="Tech, Engineering..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>
          </div>

          <div className="glass-card p-6">
            <ImageInput
              label="Cover Image"
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
            />
          </div>

          <div className="glass-card p-6 space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Summary</label>
            <textarea
              rows={4}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white/40 focus:outline-none focus:border-bt-cyan/50 transition-colors"
              placeholder="Short excerpt for lists..."
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
