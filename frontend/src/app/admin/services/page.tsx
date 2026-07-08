'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Layout, Save, Link as LinkIcon, Info } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { ListTable, FilterConfig, ColumnDef } from '@/components/admin/ListTable'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

type Service = {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  icon: string
  technologies: string[]
  useCases: string[]
  benefits: string[]
  ctaLabel: string
  isPublished: boolean
  order: number
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
]

const COLUMNS: ColumnDef[] = [
  { key: 'order', label: '#', className: 'w-12' },
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: '', className: 'w-24 text-right' },
]

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    description: '',
    icon: '',
    technologies: '',
    useCases: '',
    benefits: '',
    ctaLabel: 'Get Started',
    isPublished: true,
    order: 0,
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get('/services')
      setServices(data.services)
    } catch (err) {
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  const handleOpenModal = (service: Service | null = null) => {
    if (service) {
      setEditingService(service)
      setFormData({
        title: service.title,
        slug: service.slug,
        summary: service.summary,
        description: service.description,
        icon: service.icon || '',
        technologies: service.technologies.join(', '),
        useCases: service.useCases.join(', '),
        benefits: service.benefits.join(', '),
        ctaLabel: service.ctaLabel,
        isPublished: service.isPublished,
        order: service.order,
      })
    } else {
      setEditingService(null)
      setFormData({
        title: '',
        slug: '',
        summary: '',
        description: '',
        icon: '',
        technologies: '',
        useCases: '',
        benefits: '',
        ctaLabel: 'Get Started',
        isPublished: true,
        order: services.length,
      })
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(s => s.trim()).filter(Boolean),
      useCases: formData.useCases.split(',').map(s => s.trim()).filter(Boolean),
      benefits: formData.benefits.split(',').map(s => s.trim()).filter(Boolean),
      order: Number(formData.order),
    }
    try {
      if (editingService) {
        await apiClient.put(`/services/${editingService.id}`, payload)
        toast.success('Service updated')
      } else {
        await apiClient.post('/services', payload)
        toast.success('Service created')
      }
      setModalOpen(false)
      fetchServices()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Operation failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return
    try {
      await apiClient.delete(`/services/${id}`)
      toast.success('Service deleted')
      fetchServices()
    } catch (err) {
      toast.error('Failed to delete service')
    }
  }

  const renderRow = (service: Service) => (
    <>
      <td className="px-6 py-4 text-sm text-white/40 font-mono">{service.order}</td>
      <td className="px-6 py-4">
        <p className="font-medium text-white">{service.title}</p>
        <p className="text-xs text-white/40 line-clamp-1 mt-0.5">{service.summary}</p>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <LinkIcon className="w-3 h-3 text-white/20" />
          <span className="text-xs text-white/40 font-mono">/{service.slug}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={cn(
          'px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider',
          service.isPublished ? 'bg-bt-cyan-subtle text-bt-cyan' : 'bg-white/5 text-white/40'
        )}>
          {service.isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => handleOpenModal(service)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </>
  )

  const renderCard = (service: Service) => (
    <div className="glass-card p-6 flex flex-col group relative">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-bt-cyan-subtle flex items-center justify-center text-bt-cyan font-bold">
          {service.order}
        </div>
        <span className={cn(
          'px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider',
          service.isPublished ? 'bg-bt-cyan-subtle text-bt-cyan' : 'bg-white/5 text-white/40'
        )}>
          {service.isPublished ? 'Published' : 'Draft'}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
      <p className="text-sm text-white/40 line-clamp-2 mb-6">{service.summary}</p>

      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5 text-white/20" />
          <span className="text-xs text-white/20 font-mono">/{service.slug}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => handleOpenModal(service)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDelete(service.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
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
          <h2 className="text-xl font-bold text-white">Services Management</h2>
          <p className="text-sm text-white/40 mt-0.5">{services.length} total</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 w-full rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <ListTable<Service>
          items={services}
          searchKeys={['title', 'summary', 'slug']}
          filters={FILTERS}
          columns={COLUMNS}
          renderRow={renderRow}
          renderCard={renderCard}
          storageKey="admin-services-view"
          emptyState={
            <EmptyState
              icon={Layout}
              title="No services"
              description="Build out your portfolio by adding your first core service."
              actionLabel="Add Service"
              onAction={() => handleOpenModal()}
            />
          }
          actions={
            <button
              onClick={() => handleOpenModal()}
              className="btn-primary py-2.5 text-sm"
            >
              <Plus className="w-4 h-4" /> Add Service
            </button>
          }
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Slug</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Summary</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Description (Long Form)</label>
              <textarea
                required rows={5}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-2 text-white/40 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              <p className="text-[10px] uppercase font-bold tracking-widest">Optional Metadata</p>
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Technologies (comma separated)</label>
              <input
                type="text"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.technologies}
                onChange={e => setFormData({ ...formData, technologies: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Order</label>
              <input
                type="number"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.order}
                onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">CTA Label</label>
              <input
                type="text"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={formData.ctaLabel}
                onChange={e => setFormData({ ...formData, ctaLabel: e.target.value })}
              />
            </div>

            <div className="col-span-2 flex items-center gap-3 pt-2">
              <input
                type="checkbox" id="isPublished"
                className="w-4 h-4 rounded border-white/10 bg-slate-900 text-bt-cyan focus:ring-bt-cyan/50"
                checked={formData.isPublished}
                onChange={e => setFormData({ ...formData, isPublished: e.target.checked })}
              />
              <label htmlFor="isPublished" className="text-sm text-white/60">Visible on public site</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 px-8">
              <Save className="w-4 h-4" />
              {editingService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
