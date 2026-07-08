'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { Mail, MapPin, Send, Loader2, Github, Linkedin, Facebook, Instagram, MessageCircle } from 'lucide-react'
import { apiClient } from '@/lib/api'

const schema = z.object({
  name:    z.string().min(2, 'At least 2 characters'),
  email:   z.string().email('Valid email required'),
  subject: z.string().optional(),
  body:    z.string().min(20, 'At least 20 characters'),
})
type F = z.infer<typeof schema>

export default function ContactPage() {
  const [done, setDone] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<F>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: F) => {
    try {
      await apiClient.post('/messages', data)
      setDone(true); reset()
      toast.success("Message sent! We'll be in touch soon.")
    } catch {
      toast.error('Failed to send. Please try again.')
    }
  }

  return (
    <div className="pt-28 pb-24 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <span className="text-bt-cyan text-sm font-medium tracking-wide uppercase">Get in touch</span>
        <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Let's build something <span className="gradient-text-brand">great together</span></h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">Have a project in mind? We'd love to hear from you.</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 space-y-8">
          {[
            { icon: Mail, label: 'Email', value: 'burgtechsolutions@gmail.com', href: 'mailto:burgtechsolutions@gmail.com' },
            { icon: MessageCircle, label: 'WhatsApp', value: '+231 881952954', href: 'https://wa.me/231881952954' },
            { icon: MessageCircle, label: 'WhatsApp Group', value: 'Join Community', href: 'https://chat.whatsapp.com/HzeNNLOODWALRsRx1eB9yZ' },
            { icon: MapPin, label: 'Based in', value: 'Cyprus / China / Liberia', href: null }
          ].map(c => {
            const Icon = c.icon
            return (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-bt-cyan/10 border border-bt-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-bt-cyan" />
                </div>
                <div>
                  <p className="text-xs text-white/40 mb-0.5">{c.label}</p>
                  {c.href ? <a href={c.href} target="_blank" rel="noopener" className="text-white hover:text-bt-cyan transition-colors font-medium">{c.value}</a> : <p className="text-white font-medium">{c.value}</p>}
                </div>
              </div>
            )
          })}
          <div>
            <p className="text-xs text-white/40 mb-3 uppercase tracking-wide">Follow us</p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: 'https://www.facebook.com/share/1T74GwKndw/?mibextid=wwXIfr', label: 'Facebook' },
                { icon: Instagram, href: 'https://www.instagram.com/burgess.glay?igsh=MWJtazIyaWxzcXJ5dQ%3D%3D&utm_source=qr', label: 'Instagram' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/burgess-awalayah-glay-4696112b4?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'LinkedIn' },
                { icon: Github, href: 'https://github.com/Burgess-GLAY', label: 'GitHub' }
              ].map(s => {
                const Icon = s.icon
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label} className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-white hover:border-bt-cyan/30 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>
          <div className="glass-card p-5">
            <p className="text-sm font-medium mb-1">Fast response</p>
            <p className="text-sm text-white/50">We typically reply within 24 hours on business days.</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="lg:col-span-3">
          {done ? (
            <div className="glass-card p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-bt-cyan/10 flex items-center justify-center mx-auto mb-4"><Send className="w-6 h-6 text-bt-cyan" /></div>
              <h3 className="text-xl font-semibold mb-2">Message sent!</h3>
              <p className="text-white/50 mb-6">Thanks for reaching out. We'll get back to you shortly.</p>
              <button onClick={() => setDone(false)} className="px-6 py-2.5 border border-white/15 rounded-xl text-sm hover:bg-white/5 transition-colors">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Your name *</label>
                  <input {...register('name')} placeholder="John Doe" className="input-base" />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5">Email *</label>
                  <input {...register('email')} type="email" placeholder="john@company.com" className="input-base" />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Subject</label>
                <input {...register('subject')} placeholder="Project inquiry, partnership..." className="input-base" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1.5">Message *</label>
                <textarea {...register('body')} rows={6} placeholder="Tell us about your project..." className="input-base resize-none" />
                {errors.body && <p className="mt-1 text-xs text-red-400">{errors.body.message}</p>}
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-bt-cyan text-bg-primary font-semibold rounded-xl hover:bg-bt-cyan-light disabled:opacity-60 disabled:cursor-not-allowed transition-all">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send message</>}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
