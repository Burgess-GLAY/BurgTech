'use client'

import { useState } from 'react'
import { Key, User, Shield, Save, LogOut, Smartphone } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { toast } from 'react-hot-toast'
import { useAuth } from '@/hooks/useAuth'

export default function AdminSettingsPage() {
  const { user, logout } = useAuth()
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // MFA state
  const [mfaEnabled, setMfaEnabled] = useState<boolean>((user as any)?.mfaEnabled ?? false)
  const [mfaStep, setMfaStep] = useState<'idle' | 'pending-otp'>('idle')
  const [otpValue, setOtpValue] = useState('')
  const [mfaLoading, setMfaLoading] = useState(false)

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiClient.put(`/users/${user?.id}`, profileData)
      toast.success('Profile updated successfully')
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return toast.error('Passwords do not match')
    }
    setLoading(true)
    try {
      await apiClient.put(`/users/${user?.id}`, { password: passwordData.newPassword })
      toast.success('Password changed successfully')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleEnableMfa = async () => {
    setMfaLoading(true)
    try {
      await apiClient.post('/auth/mfa/enable')
      setMfaStep('pending-otp')
      setOtpValue('')
      toast.success('OTP sent to your email')
    } catch (err) {
      toast.error('Failed to initiate MFA setup')
    } finally {
      setMfaLoading(false)
    }
  }

  const handleConfirmOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setMfaLoading(true)
    try {
      await apiClient.post('/auth/mfa/confirm', { otp: otpValue })
      toast.success('MFA enabled successfully')
      setMfaEnabled(true)
      setMfaStep('idle')
      setOtpValue('')
    } catch (err) {
      toast.error('Invalid or expired OTP')
    } finally {
      setMfaLoading(false)
    }
  }

  const handleDisableMfa = async () => {
    setMfaLoading(true)
    try {
      await apiClient.post('/auth/mfa/disable')
      toast.success('MFA disabled')
      setMfaEnabled(false)
      setMfaStep('idle')
    } catch (err) {
      toast.error('Failed to disable MFA')
    } finally {
      setMfaLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <p className="text-sm text-white/40">Manage your profile and security preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-bt-cyan" />
            <h3 className="font-bold text-white">Profile Information</h3>
          </div>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Display Name</label>
              <input
                type="text" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={profileData.name}
                onChange={e => setProfileData({ ...profileData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Email Address</label>
              <input
                type="email" required
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                value={profileData.email}
                onChange={e => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>
            <div className="pt-2">
              <button disabled={loading} className="btn-primary flex items-center gap-2 px-8">
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Security */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white">Security & Password</h3>
          </div>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">New Password</label>
              <div className="relative">
                <input
                  type="password" required
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                  value={passwordData.newPassword}
                  onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
                <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Confirm Password</label>
              <div className="relative">
                <input
                  type="password" required
                  className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-bt-cyan/50 transition-colors"
                  value={passwordData.confirmPassword}
                  onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
                <Key className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>
            <div className="pt-2">
              <button disabled={loading} className="btn-outline flex items-center gap-2 px-8 text-white/60 hover:text-white">
                <Save className="w-4 h-4" /> Update Password
              </button>
            </div>
          </form>
        </div>

        {/* MFA */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="w-5 h-5 text-bt-teal" />
            <h3 className="font-bold text-white">MFA / Two-Factor Authentication</h3>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${mfaEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-white/30 border border-white/10'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${mfaEnabled ? 'bg-emerald-400' : 'bg-white/20'}`} />
              {mfaEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>

          {!mfaEnabled && mfaStep === 'idle' && (
            <button
              onClick={handleEnableMfa}
              disabled={mfaLoading}
              className="btn-primary flex items-center gap-2 px-8"
            >
              <Smartphone className="w-4 h-4" /> Enable MFA
            </button>
          )}

          {mfaStep === 'pending-otp' && (
            <form onSubmit={handleConfirmOtp} className="space-y-4">
              <p className="text-xs text-white/40 leading-relaxed">
                An OTP has been sent to your registered email. Enter it below to confirm.
              </p>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">One-Time Password</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  required
                  placeholder="000000"
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-white text-center tracking-[0.5em] text-lg font-mono focus:outline-none focus:border-violet-400/50 transition-colors"
                  value={otpValue}
                  onChange={e => setOtpValue(e.target.value.replace(/\D/g, ''))}
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button type="submit" disabled={mfaLoading || otpValue.length < 6} className="btn-primary flex items-center gap-2 px-8">
                  Verify OTP
                </button>
                <button
                  type="button"
                  onClick={() => { setMfaStep('idle'); setOtpValue('') }}
                  className="text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {mfaEnabled && mfaStep === 'idle' && (
            <button
              onClick={handleDisableMfa}
              disabled={mfaLoading}
              className="px-6 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
            >
              Disable MFA
            </button>
          )}
        </div>

        {/* Sessions */}
        <div className="glass-card p-6 border-red-500/10 hover:border-red-500/20 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-red-400">
            <LogOut className="w-5 h-5" />
            <h3 className="font-bold">Danger Zone</h3>
          </div>
          <p className="text-xs text-white/30 mb-6 leading-relaxed">
            Logging out will clear your session and require you to sign back in.
            Ensure all your changes are saved before proceeding.
          </p>
          <button
            onClick={logout}
            className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
          >
            Revoke Session
          </button>
        </div>
      </div>
    </div>
  )
}
