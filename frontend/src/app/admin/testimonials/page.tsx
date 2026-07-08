'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Star, Save, MessageSquare } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { StarRating } from '@/components/admin/StarRating'
import { ListTable, FilterConfig, ColumnDef } from '@/components/admin/ListTable'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { toast } from 'react-hot-toast'

type Testimonial = {
  id: string
  authorName: string
  authorRole: string
  company: string
  content: string
  rating: number
  avatarUrl: string
  isFeatured: boolean
  isPublished: boolean
  [key: string]: unknown
}

const FILTERS: FilterConfig[] = [
  {
    key: 'isPublished',
    label: 'Status',
    options: [
      { label: 'Published', value: 'true' },
      { label: 'Draft', value: 'false' },
    ],
  },
  {
    key: 'isFeatured',
    label: 'Featured',
    options: [
      { label: 'Featured', value: 'true' },
    ],
  },
]

const COLUMNS: ColumnDef[] = [
  { key: 'author', label: 'Author' },
  { key: 'content', label: 'Content', className: 'w-1/2' },
  { key: 'rating', label: 'Rating' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', className: 'w-24 text-right' },
]

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    authorName: '',
    authorRole: '',
    company: '',
    content: '',
    rating: 5,
    avatarUrl: '',
    isFeatured: false,
    isPublished: true,
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get('/testimonials')
      setTestimonials(data.testimonials)
    } catch (err) {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (t: Testimonial | null = null) => {
    if (t) {
      setEditingTestimonial(t)
      setFormData({
        authorName: t.authorName,
        authorRole: t.authorRole,
        company: t.company || '',
        content: t.content,
        rating: t.rating,
        avatarUrl: t.avatarUrl || '',
        isFeatured: t.isFeatured,
        isPublished: t.isPublished,
      })
    } else {
      setEditingTestimonial(null)
      setFormData({
        authorName: '',
        authorRole: '',
        company: '',
        content: '',
        rating: 5,
        avatarUrl: '',
        isFeatured: false,
        isPublished: true,
      })
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingTestimonial) {
        await apiClient.put(`/testimonials/${editingTestimonial.id}`, formData)
        toast.success('Testimonial updated')
      } else {
        await apiClient.post('/testimonials', formData)
        toast.success('Testimonial added')
      }
      setModalOpen(false)
      fetchTestimonials()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Operation failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    try {
      await apiClient.delete(`/testimonials/${id}`)
      toast.success('Testimonial deleted')
      fetchTestimonials()
    } catch (err) {
      toast.error('Failed to delete testimonial')
    }
  }

  const renderRow = (t: Testimonial) => (
    <>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
            {t.avatarUrl ? (
              <img src={t.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white/30 font-bold text-xs">{t.authorName.charAt(0)}</span>
            )}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{t.authorName}</p>
            <p className="text-white/40 text-xs">{t.authorRole}{t.company ? ` · ${t.company}` : ''}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <p className="text-white/60 text-sm line-clamp-2 italic">"{t.content}"</p>
      </td>
      <td className="px-6 py-4">
        <StarRating rating={t.rating} readonly className="scale-75 origin-left" />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {t.isFeatured && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-bt-cyan/10 text-bt-cyan text-[10px] uppercase font-black">
              <Star className="w-3 h-3 fill-bt-cyan" /> Featured
            </span>
          )}
          {!t.isPublished && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-wider">Draft</span>
          )}
          {t.isPublished && !t.isFeatured && (
            <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Published</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <button onClick={() => handleOpenModal(t)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </>
  )

  const renderCard = (t: Testimonial) => (
    <div className="glass-card p-6 flex flex-col group relative">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
          {t.avatarUrl ? (
            <img src={t.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-white/20 font-bold">{t.authorName.charAt(0)}</span>
          )}
        </div>
        <div>
          <h3 className="text-white font-bold text-sm">{t.authorName}</h3>
          <p className="text-white/40 text-xs">{t.authorRole}{t.company ? ` at ${t.company}` : ''}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StarRating rating={t.rating} readonly className="scale-75 origin-right" />
        </div>
      </div>

      <p className="text-white/60 text-sm leading-relaxed italic mb-6">"{t.content}"</p>

      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {t.isFeatured && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-bt-cyan/10 text-bt-cyan text-[10px] uppercase font-black">
              <Star className="w-3 h-3 fill-bt-cyan" /> Featured
            </div>
          )}
          {!t.isPublished && (
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-wider">Draft</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModal(t)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Testimonials</h2>
          <p className="text-sm text-white/40 mt-0.5">{testimonials.length} total</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-full rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ListTable<Testimonial>
          items={testimonials}
          searchKeys={['authorName', 'authorRole', 'company', 'content']}
          filters={FILTERS}
          columns={COLUMNS}
          renderRow={renderRow}
          renderCard={renderCard}
          storageKey="admin-testimonials-view"
          emptyState={
            <EmptyState
              icon={MessageSquare}
              title="No testimonials"
              description="Build trust by adding testimonials from your satisfied clients."
              actionLabel="Add Testimonial"
              onAction={() => handleOpenModal()}
            />
          }
          actions={
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2.5 bg-bt-cyan text-bg-primary text-sm font-semibold rounded-xl hover:bg-bt-cyan-light transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          }
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Author Name</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.authorName}
                onChange={e => setFormData({ ...formData, authorName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Author Role</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.authorRole}
                onChange={e => setFormData({ ...formData, authorRole: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Company</label>
              <input
                type="text"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Rating</label>
              <div className="h-[46px] flex items-center px-4 bg-slate-900 border border-white/10 rounded-xl">
                <StarRating
                  rating={formData.rating}
                  onChange={r => setFormData({ ...formData, rating: r })}
                />
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Testimonial Content</label>
              <RichTextEditor
                value={formData.content}
                onChange={html => setFormData({ ...formData, content: html })}
                minHeight="200px"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Avatar URL</label>
              <input
                type="url"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.avatarUrl}
                onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
              />
            </div>

            <div className="col-span-2 flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="isFeatured"
                  className="w-4 h-4 rounded border-white/10 bg-slate-900 text-bt-cyan focus:ring-bt-cyan/50"
                  checked={formData.isFeatured}
                  onChange={e => setFormData({ ...formData, isFeatured: e.target.checked })}
                />
                <label htmlFor="isFeatured" className="text-sm text-white/60 font-medium">Feature on Homepage</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="isPublished"
                  className="w-4 h-4 rounded border-white/10 bg-slate-900 text-bt-cyan focus:ring-bt-cyan/50"
                  checked={formData.isPublished}
                  onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
                />
                <label htmlFor="isPublished" className="text-sm text-white/60 font-medium">Publish publicly</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 px-8">
              <Save className="w-4 h-4" />
              {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
