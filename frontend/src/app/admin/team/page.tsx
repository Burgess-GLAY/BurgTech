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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Team Management</h2>
          <p className="text-sm text-white/40">Manage your expert team members here.</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <Skeleton lines={5} className="h-20 w-full rounded-2xl" />
      ) : members.length > 0 ? (
        <div className="glass-card overflow-hidden">
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
