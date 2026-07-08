'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Loader2, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { apiClient } from '@/lib/api'

const schema = z.object({ email: z.string().email(), password: z.string().min(1) })
type F = z.infer<typeof schema>

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false)
  const [mfaStep, setMfaStep] = useState(false)
  const [pendingUserId, setPendingUserId] = useState('')
  const [otpValue, setOtpValue] = useState('')
  const [otpSubmitting, setOtpSubmitting] = useState(false)

  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: F) => {
    try {
      const { data: res } = await apiClient.post('/auth/login', { email: data.email, password: data.password })

      if (res.mfaPending && res.userId) {
        // MFA required — move to OTP step
        setPendingUserId(res.userId)
        setMfaStep(true)
        return
      }

      // No MFA — store token and redirect
      if (typeof window !== 'undefined') localStorage.setItem('bt_token', res.token)
      useAuth.setState({ user: res.user, token: res.token, isLoading: false })
      router.push('/admin')
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Login failed')
    }
  }

  const onOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpValue.trim()) return

    setOtpSubmitting(true)
    try {
      const { data: res } = await apiClient.post('/auth/verify-otp', { userId: pendingUserId, otp: otpValue })

      if (typeof window !== 'undefined') localStorage.setItem('bt_token', res.token)
      useAuth.setState({ user: res.user, token: res.token, isLoading: false })
      router.push('/admin')
    } catch (err: any) {
      toast.error('Invalid or expired OTP')
    } finally {
      setOtpSubmitting(false)
    }
  }

  if (mfaStep) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(51,143,255,0.08) 0%, transparent 70%)' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold">B</div>
              <span className="font-bold text-xl">Burtech <span className="text-bt-cyan">Admin</span></span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-bt-cyan" />
              <p className="text-white/80 text-sm font-medium">Two-Factor Authentication</p>
            </div>
            <p className="text-white/40 text-sm">Enter the 6-digit code sent to your email</p>
          </div>
          <form onSubmit={onOtpSubmit} className="glass-card p-8 space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5">One-Time Password</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="000000"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                className="input-base text-center tracking-[0.5em] text-lg font-mono"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={otpSubmitting || otpValue.length !== 6}
              className="w-full flex items-center justify-center gap-2 py-3 bg-bt-cyan text-bg-primary font-semibold rounded-xl hover:bg-bt-cyan-light disabled:opacity-60 transition-all mt-2"
            >
              {otpSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Verifying...</> : 'Verify'}
            </button>
            <button
              type="button"
              onClick={() => { setMfaStep(false); setOtpValue(''); setPendingUserId('') }}
              className="w-full text-center text-xs text-white/30 hover:text-white/60 transition-colors pt-1"
            >
              Back to login
            </button>
          </form>
          <p className="text-center text-xs text-white/20 mt-6">Burtech Solution Admin Panel</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(51,143,255,0.08) 0%, transparent 70%)' }} />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold">B</div>
            <span className="font-bold text-xl">Burtech <span className="text-bt-cyan">Admin</span></span>
          </div>
          <p className="text-white/40 text-sm">Sign in to your dashboard</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-4">
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Email</label>
            <input {...register('email')} type="email" placeholder="burgtechsolutions@gmail.com" className="input-base" />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1.5">Password</label>
            <div className="relative">
              <input {...register('password')} type={showPass ? 'text' : 'password'} placeholder="••••••••" className="input-base pr-10" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 py-3 bg-bt-cyan text-bg-primary font-semibold rounded-xl hover:bg-bt-cyan-light disabled:opacity-60 transition-all mt-2">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-xs text-white/20 mt-6">Burtech Solution Admin Panel</p>
      </motion.div>
    </div>
  )
}
