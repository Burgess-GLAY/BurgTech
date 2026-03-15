'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({ email: z.string().email(), password: z.string().min(1) })
type F = z.infer<typeof schema>

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false)
  const router = useRouter()
  const { login } = useAuth()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: F) => {
    try {
      await login(data.email, data.password)
      router.push('/admin')
    } catch (err: any) {
      toast.error(err?.response?.data?.error ?? 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(51,143,255,0.08) 0%, transparent 70%)' }} />
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-slate-900 font-bold">B</div>
            <span className="font-bold text-xl">Burtech <span className="text-cyan-400">Admin</span></span>
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
          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-400 text-slate-900 font-semibold rounded-xl hover:bg-cyan-300 disabled:opacity-60 transition-all mt-2">
            {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign in'}
          </button>
        </form>
        <p className="text-center text-xs text-white/20 mt-6">Burtech Solution Admin Panel</p>
      </motion.div>
    </div>
  )
}
