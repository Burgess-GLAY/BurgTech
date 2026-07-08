'use client'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit2, Trash2, Search, Loader2, X, ExternalLink } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { apiClient } from '@/lib/api'
import { cn } from '@/lib/utils'

function Modal({ project, onClose, onSaved }: { project?: any; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!project
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: project ? {
      ...project,
      technologies: project.technologies?.join(', ') ?? '',
      imageUrls: project.imageUrls?.join(', ') ?? '',
    } : { status: 'COMPLETED', isFeatured: false, technologies: '', imageUrls: '' }
  })

  const onSubmit = async (data: any) => {
    const payload = { ...data, technologies: data.technologies.split(',').map((t: string) => t.trim()).filter(Boolean), imageUrls: data.imageUrls ? data.imageUrls.split(',').map((u: string) => u.trim()).filter(Boolean) : [] }
    try {
      if (isEdit) await apiClient.put(`/projects/${project.id}`, payload)
      else await apiClient.post('/projects', payload)
      toast.success(isEdit ? 'Project updated' : 'Project created')
      onSaved()
    } catch (err: any) { toast.error(err.response?.data?.error ?? 'Failed to save') }
  }

  const inp = 'w-full px-3 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-bt-cyan/40 transition-colors'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl glass-card shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h3 className="font-semibold">{isEdit ? 'Edit project' : 'New project'}</h3>
          <button onClick={onClose} className="p-1.5 text-white/40 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/50 mb-1.5">Title *</label><input {...register('title', { required: true })} placeholder="Project title" className={inp} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5">Slug *</label><input {...register('slug', { required: true })} placeholder="project-slug" className={inp} /></div>
          </div>
          <div><label className="block text-xs text-white/50 mb-1.5">Summary *</label><input {...register('summary', { required: true })} placeholder="One-line description" className={inp} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5">Description *</label><textarea {...register('description', { required: true })} rows={4} placeholder="Full description..." className={`${inp} resize-none`} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/50 mb-1.5">Client</label><input {...register('client')} placeholder="Acme Corp" className={inp} /></div>
            <div><label className="block text-xs text-white/50 mb-1.5">Status</label>
              <select {...register('status')} className={inp}>
                <option value="COMPLETED">Completed</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>
          <div><label className="block text-xs text-white/50 mb-1.5">Technologies (comma-separated) *</label><input {...register('technologies', { required: true })} placeholder="Next.js, TypeScript, PostgreSQL" className={inp} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5">Image URLs (comma-separated)</label><input {...register('imageUrls')} placeholder="https://..." className={inp} /></div>
          <div><label className="block text-xs text-white/50 mb-1.5">Live URL</label><input {...register('liveUrl')} placeholder="https://..." className={inp} /></div>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('isFeatured')} /><span className="text-sm text-white/70">Featured project (shown on homepage)</span></label>
          <div className="flex gap-3 pt-2 border-t border-white/[0.06]">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-white/[0.08] rounded-xl text-sm text-white/50 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 py-2.5 text-sm">
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : (isEdit ? 'Save changes' : 'Create project')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminProjects() {
  const qc = useQueryClient()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatus] = useState('ALL')
  const [editProject, setEdit] = useState<any>(null)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['admin-projects', statusFilter],
    staleTime: 60_000,
    queryFn: () => apiClient.get(`/projects${statusFilter !== 'ALL' ? `?status=${statusFilter}` : ''}`).then(r => r.data),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/projects/${id}`),
    onSuccess: () => { toast.success('Project deleted'); qc.invalidateQueries({ queryKey: ['admin-projects'] }); setDeleteId(null) },
    onError: () => toast.error('Failed to delete'),
  })

  const filtered = (data?.projects ?? []).filter((p: any) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.client?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold">Projects</h2>
          <p className="text-sm text-white/40 mt-0.5">{data?.total ?? 0} total</p>
        </div>
        <button
          onClick={() => { setEdit(null); setShowModal(true) }}
          className="btn-primary px-4 py-2.5 text-sm w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> New project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." className="w-full pl-9 pr-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder-white/30 outline-none focus:border-bt-cyan/40 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['ALL', 'COMPLETED', 'IN_PROGRESS', 'ARCHIVED'].map(s => (
            <button key={s} onClick={() => setStatus(s)} className={cn('px-3 py-2 rounded-xl text-xs font-medium transition-colors', statusFilter === s ? 'bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border' : 'border border-white/[0.08] text-white/40 hover:text-white')}>
              {s === 'ALL' ? 'All' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {/* DESKTOP TABLE — hidden on mobile */}
        <div className="hidden md:block glass-card overflow-hidden">
          <table className="w-full">
            <thead><tr className="border-b border-white/[0.06]">{['Project', 'Client', 'Status', 'Tech', 'Actions'].map(h => <th key={h} className="text-left px-5 py-3 text-xs font-medium text-white/30 uppercase tracking-wide">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {isLoading
                ? Array(4).fill(0).map((_, i) => <tr key={i}>{Array(5).fill(0).map((_, j) => <td key={j} className="px-5 py-4"><div className="h-3 bg-white/10 rounded animate-pulse" /></td>)}</tr>)
                : filtered.length === 0
                  ? <tr><td colSpan={5} className="px-5 py-10 text-center text-white/30 text-sm">No projects found</td></tr>
                  : filtered.map((p: any) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-5 py-4"><p className="text-sm font-medium">{p.title}</p>{p.isFeatured && <span className="text-[10px] text-bt-cyan">Featured</span>}</td>
                      <td className="px-5 py-4 text-sm text-white/50">{p.client || '—'}</td>
                      <td className="px-5 py-4"><span className={cn('text-xs px-2 py-1 rounded-full font-medium', p.status === 'COMPLETED' ? 'bg-bt-cyan-subtle text-bt-cyan' : p.status === 'IN_PROGRESS' ? 'bg-bt-teal-subtle text-bt-cyan' : 'bg-white/10 text-white/40')}>{p.status.replace('_', ' ')}</span></td>
                      <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{p.technologies.slice(0, 3).map((t: string) => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">{t}</span>)}</div></td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => { setEdit(p); setShowModal(true) }} className="p-1.5 text-white/40 hover:text-white rounded-lg hover:bg-white/5 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-500/5 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS — hidden on desktop */}
        <div className="md:hidden space-y-3">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => <div key={i} className="glass-card p-4 h-40 animate-pulse" />)
          ) : filtered.length === 0 ? (
            <div className="glass-card p-10 text-center text-white/30 text-sm">No projects found</div>
          ) : (
            filtered.map((project: any) => (
              <div key={project.id} className="glass-card p-4 flex flex-col gap-3">
                {/* ROW 1 — Thumbnail + Title + Featured badge */}
                <div className="flex gap-3 items-start">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-white/[0.05]">
                    {project.imageUrls?.[0] ? (
                      <img src={project.imageUrls[0]} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-bt-teal flex items-center justify-center text-white/40 text-xl font-bold">
                        {project.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-white line-clamp-2 leading-snug">{project.title}</p>
                      {project.isFeatured && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-bt-cyan-subtle text-bt-cyan border border-bt-cyan-border whitespace-nowrap flex-shrink-0">
                          Featured
                        </span>
                      )}
                    </div>
                    {project.client && <p className="text-xs text-white/40 mt-0.5">Client: {project.client}</p>}
                  </div>
                </div>

                {/* ROW 2 — Status + Technologies side by side */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Status</p>
                    <span className={cn(
                      'text-xs px-2.5 py-0.5 rounded-full border font-medium',
                      project.status === 'COMPLETED' ? 'bg-bt-cyan-subtle text-bt-cyan border-bt-cyan-border' :
                        project.status === 'IN_PROGRESS' ? 'bg-bt-teal-subtle text-bt-cyan border-bt-cyan-border/20' :
                          'bg-white/[0.05] text-white/40 border-white/[0.08]'
                    )}>
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Technologies</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies?.slice(0, 3).map((t: string) => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.06] text-white/50">{t}</span>
                      ))}
                      {project.technologies?.length > 3 && (
                        <span className="text-[10px] text-white/30">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ROW 3 — Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button onClick={() => { setEdit(project); setShowModal(true) }} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeleteId(project.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/20 text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors text-xs font-medium">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && <Modal project={editProject} onClose={() => { setShowModal(false); setEdit(null) }} onSaved={() => { qc.invalidateQueries({ queryKey: ['admin-projects'] }); setShowModal(false) }} />}
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteId(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm glass-card p-6 shadow-2xl">
              <h3 className="font-semibold mb-2">Delete project</h3>
              <p className="text-sm text-white/50 mb-6">This action cannot be undone. The project will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 border border-white/[0.08] rounded-xl text-sm text-white/50 hover:text-white transition-colors">Cancel</button>
                <button onClick={() => deleteMutation.mutate(deleteId!)} disabled={deleteMutation.isPending} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 disabled:opacity-60 transition-colors">
                  {deleteMutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" />Deleting...</> : 'Delete'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
