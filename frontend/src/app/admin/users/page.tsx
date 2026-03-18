'use client'

import { useState, useEffect } from 'react'
import { Key, Shield, User as UserIcon, Check, X, ShieldAlert, Edit2, Save } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { Skeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/admin/Modal'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

export default function AdminUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'CLIENT',
    isActive: true,
    password: '',
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get('/users')
      setUsers(data.users)
    } catch (err: any) {
      if (err.response?.status === 403) {
        toast.error('Access denied. Super Admin required.')
      } else {
        toast.error('Failed to load users')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleOpenEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      password: '',
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload: any = { ...formData }
    if (!payload.password) delete payload.password

    try {
      await apiClient.put(`/users/${editingUser.id}`, payload)
      toast.success('User updated successfully')
      setModalOpen(false)
      fetchUsers()
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Update failed')
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Identity & Access</h2>
          <p className="text-sm text-white/40 mt-0.5">{users.length} total</p>
        </div>
      </div>

      {loading ? (
        <Skeleton lines={5} className="h-20 w-full rounded-2xl" />
      ) : users.length > 0 ? (
        <div className="space-y-4">
          {/* DESKTOP TABLE — hidden on mobile */}
          <div className="hidden md:block glass-card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs uppercase tracking-widest text-white/40">
                  <th className="px-6 py-4 font-medium">Identity</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Last Active</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/20">
                          <UserIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-medium text-white text-sm">{user.name}</p>
                          <p className="text-[10px] text-white/20 font-mono tracking-tighter">{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                         {user.role === 'SUPER_ADMIN' && <ShieldAlert className="w-3.5 h-3.5 text-red-400" />}
                         {user.role === 'ADMIN' && <Shield className="w-3.5 h-3.5 text-cyan-400" />}
                         <span className={cn(
                           'text-[10px] font-black tracking-widest',
                           user.role === 'SUPER_ADMIN' ? 'text-red-400' : 
                           user.role === 'ADMIN' ? 'text-cyan-400' : 'text-white/40'
                         )}>
                           {user.role.replace('_', ' ')}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'bg-white/10'}`} />
                        <span className="text-xs text-white/60">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/20">
                      {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleOpenEdit(user)} className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS — hidden on desktop */}
          <div className="md:hidden space-y-3">
            {users.map((user: any) => (
              <div key={user.id} className="glass-card p-4 flex flex-col gap-3">
                {/* ROW 1 — Avatar + Name + Email */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400 flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                    <p className="text-xs text-white/40 truncate">{user.email}</p>
                  </div>
                </div>

                {/* ROW 2 — Role + Status side by side */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Role</p>
                    <span className={cn(
                      "inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium border",
                      user.role === 'SUPER_ADMIN' ? 'bg-violet-500/15 text-violet-400 border-violet-500/20' :
                      user.role === 'ADMIN' ? 'bg-blue-500/15 text-blue-400 border-blue-500/20' :
                      user.role === 'TEAM_MEMBER' ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20' :
                      'bg-white/[0.05] text-white/40 border-white/[0.08]'
                    )}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Status</p>
                    <span className={cn(
                      "inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full",
                      user.isActive 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-white/[0.05] text-white/40 border border-white/[0.08]"
                    )}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* ROW 3 — Last login */}
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Last login</p>
                  <p className="text-xs text-white/50">{user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'Never'}</p>
                </div>

                {/* ROW 4 — Joined date */}
                <div>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">Joined</p>
                  <p className="text-xs text-white/50">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>

                {/* ROW 5 — Action buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06] mt-1">
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors text-xs font-medium"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState 
          icon={Shield}
          title="No users found"
          description="If you see this, there might be a synchronization issue with the database."
        />
      )}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modify User Status"
        className="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Full Name</label>
              <input 
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email Address</label>
              <input 
                type="email" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">System Role</label>
              <select 
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="CLIENT">Client</option>
                <option value="TEAM_MEMBER">Team Member</option>
                <option value="ADMIN">Administrator</option>
                <option value="SUPER_ADMIN">Super Administrator</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">New Password (leave blank to keep)</label>
              <div className="relative">
                <input 
                  type="password"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-cyan-400/50 transition-colors"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input 
                type="checkbox" id="isActive"
                className="w-4 h-4 rounded border-white/10 bg-slate-900 text-cyan-400 focus:ring-cyan-400/50"
                checked={formData.isActive}
                onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              />
              <label htmlFor="isActive" className="text-sm text-white/60">Account is active</label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-2.5 rounded-xl text-white/40 hover:text-white transition-colors text-sm font-medium">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2 px-8">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
