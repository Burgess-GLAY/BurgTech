'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, X, Check, Save, Users } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

export default function AdminTeamPage() {
  const [members, setMembers] = useState([])
  const [allUsers, setAllUsers] = useState([]) // For selection
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<any>(null)
  const [formData, setFormData] = useState({
    userId: '',
    title: '',
    bio: '',
    skills: '',
    isVisible: true,
    order: 0,
    photoUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    twitterUrl: '',
  })

  useEffect(() => {
    fetchTeam()
    fetchUsers()
  }, [])

  const fetchTeam = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get('/team')
      setMembers(data.team)
    } catch (err) {
      toast.error('Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const { data } = await apiClient.get('/users')
      setAllUsers(data.users)
    } catch (err) {
      console.error('Failed to load users for selection')
    }
  }

  const handleOpenModal = (member: any = null) => {
    if (member) {
      setEditingMember(member)
      setFormData({
        userId: member.userId,
        title: member.title,
        bio: member.bio,
        skills: member.skills.join(', '),
        isVisible: member.isVisible,
        order: member.order,
        photoUrl: member.photoUrl || '',
        linkedinUrl: member.linkedinUrl || '',
        githubUrl: member.githubUrl || '',
        twitterUrl: member.twitterUrl || '',
      })
    } else {
      setEditingMember(null)
      setFormData({
        userId: '',
        title: '',
        bio: '',
        skills: '',
        isVisible: true,
        order: members.length,
        photoUrl: '',
        linkedinUrl: '',
        githubUrl: '',
        twitterUrl: '',
      })
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      order: Number(formData.order)
    }

    try {
      if (editingMember) {
        await apiClient.put(`/team/${editingMember.id}`, payload)
        toast.success('Member updated successfully')
      } else {
        await apiClient.post('/team', payload)
        toast.success('Member added successfully')
      }
      setModalOpen(false)
      fetchTeam()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Operation failed')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return
    try {
      await apiClient.delete(`/team/${id}`)
      toast.success('Member removed')
      fetchTeam()
    } catch (err) {
      toast.error('Failed to remove member')
    }
  }

  const toggleVisibility = async (member: any) => {
    try {
      await apiClient.put(`/team/${member.id}`, { isVisible: !member.isVisible })
      toast.success(member.isVisible ? 'Member hidden' : 'Member visible')
      fetchTeam()
    } catch (err) {
      toast.error('Failed to update visibility')
    }
  }

  const [deleteId, setDeleteId] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Team Management</h2>
          <p className="text-sm text-white/40 mt-0.5">{members.length} total</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 px-4 py-2.5 bg-cyan-400 text-slate-900 text-sm font-semibold rounded-xl hover:bg-cyan-300 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <Skeleton lines={5} className="h-20 w-full rounded-2xl" />
      ) : members.length > 0 ? (
        <div className="space-y-6">
          {/* DESKTOP TABLE — hidden on mobile */}
          <div className="hidden md:block glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/40">
                  <th className="px-6 py-4 font-medium">Member</th>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Visibility</th>
                  <th className="px-6 py-4 font-medium">Order</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member: any) => (
                  <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden flex items-center justify-center text-white/40">
                          {member.photoUrl ? (
                            <img src={member.photoUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Users className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{member.user.name}</p>
                          <p className="text-xs text-white/40">{member.user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{member.title}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider',
                        member.isVisible ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-white/40'
                      )}>
                        {member.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40">{member.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(member)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(member.id)} className="p-2 rounded-lg hover:bg-white/5 text-red-400 hover:bg-red-500/10 transition-all">
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
            {members.map((member: any) => (
              <div key={member.id} className="glass-card p-4 flex flex-col gap-3">
                {/* ROW 1 — Avatar + Name + Title */}
                <div className="flex items-center gap-3">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.user?.name} className="w-11 h-11 rounded-xl object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                      {member.user?.name?.charAt(0) || '?'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{member.user?.name || 'Team Member'}</p>
                    <p className="text-xs text-cyan-400 truncate">{member.title}</p>
                  </div>
                </div>

                {/* ROW 2 — Skills pills */}
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1.5">Skills</p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                    {member.skills?.slice(0, 4).map((skill: string) => (
                      <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/50 whitespace-nowrap flex-shrink-0">
                        {skill}
                      </span>
                    ))}
                    {member.skills?.length > 4 && (
                      <span className="text-[10px] text-white/30 flex-shrink-0 py-0.5">+{member.skills.length - 4} more</span>
                    )}
                  </div>
                </div>

                {/* ROW 3 — Order + Visibility side by side */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Display order</p>
                    <span className="text-sm font-mono text-white/70 bg-white/[0.06] px-2 py-0.5 rounded-md">#{member.order}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Visibility</p>
                    <button
                      onClick={() => toggleVisibility(member)}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all font-medium",
                        member.isVisible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-white/[0.05] text-white/40 border-white/[0.08]'
                      )}
                    >
                      {member.isVisible ? <><Check className="w-3 h-3" /> Visible</> : <><X className="w-3 h-3" /> Hidden</>}
                    </button>
                  </div>
                </div>

                {/* ROW 4 — Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
                  <button onClick={() => handleOpenModal(member)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-red-500/20 text-red-400/70 hover:text-red-400 hover:bg-red-500/[0.07] transition-colors text-xs font-medium">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState 
          icon={Users}
          title="No team members"
          description="Start by adding your first team member to show case your expertise."
          actionLabel="Add Representative"
          onAction={() => handleOpenModal()}
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Select User</label>
              <select 
                disabled={!!editingMember}
                required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.userId}
                onChange={e => setFormData({ ...formData, userId: e.target.value })}
              >
                <option value="">Select a user...</option>
                {allUsers.map((u: any) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Professional Title</label>
              <input 
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Display Order</label>
              <input 
                type="number" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.order}
                onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Bio</label>
              <textarea 
                required rows={3}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Skills (comma separated)</label>
              <input 
                type="text" placeholder="Engineering, Python, Cloud..."
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.skills}
                onChange={e => setFormData({ ...formData, skills: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Photo URL</label>
              <input 
                type="url"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.photoUrl}
                onChange={e => setFormData({ ...formData, photoUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">LinkedIn URL</label>
              <input 
                type="url"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.linkedinUrl}
                onChange={e => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>

            <div className="col-span-2 flex items-center gap-3 pt-2">
              <input 
                type="checkbox" id="isVisible"
                className="w-4 h-4 rounded border-white/10 bg-slate-900 text-cyan-400 focus:ring-cyan-400/50"
                checked={formData.isVisible}
                onChange={e => setFormData({ ...formData, isVisible: e.target.checked })}
              />
              <label htmlFor="isVisible" className="text-sm text-white/60">Visible on public site</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 px-8">
              {editingMember ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {editingMember ? 'Update Member' : 'Add Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
