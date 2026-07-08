'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ShieldCheck, Scale, Lock, Handshake,
  GraduationCap, Globe, ArrowRight
} from 'lucide-react'

const ETHICS = [
  {
    Icon: ShieldCheck,
    title: 'Transparency first',
    body: 'We tell clients exactly what we are building, why we are building it that way, and what trade-offs exist. No hidden complexity, no inflated scope, no surprises.',
  },
  {
    Icon: Scale,
    title: 'Honest pricing',
    body: 'We price work fairly for the value delivered. We have turned down engagements where the budget did not match the genuine scope.',
  },
  {
    Icon: Lock,
    title: 'Data privacy',
    body: 'We treat client and end-user data as sacred. We never store what we do not need, never share what is not ours, and build privacy into architecture from day one.',
  },
  {
    Icon: Handshake,
    title: 'Long-term relationships',
    body: 'We are not a churn-and-burn agency. Our best work comes from clients who trust us enough to be fully honest with us.',
  },
  {
    Icon: GraduationCap,
    title: 'Knowledge sharing',
    body: 'We believe in elevating technical capability wherever we work. We document, explain, and train — so clients leave every engagement more capable.',
  },
  {
    Icon: Globe,
    title: 'African-first perspective',
    body: 'Founded in Liberia on April 18, 2025, we design solutions for African realities — variable connectivity, local payment systems, and diverse contexts.',
  },
]

export function EthicsSection() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <div className="text-center mb-14">
        <span className="text-bt-cyan text-sm font-medium
                         uppercase tracking-wide">
          How we operate
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Our <span className="gradient-text-brand">core ethics</span>
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto mt-4">
          These are not aspirational statements. They are the principles
          that govern every decision we make, every line of code we write,
          and every relationship we build.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ETHICS.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="glass-card p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-bt-cyan-subtle border
                            border-bt-cyan-border flex items-center
                            justify-center mb-4">
              <e.Icon className="w-5 h-5 text-bt-cyan" />
            </div>
            <h3 className="font-semibold text-lg mb-2">{e.title}</h3>
            <p className="text-white/55 text-sm leading-relaxed">{e.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export function PartnersSection() {
  return (
    <section className="section-pad border-t border-white/[0.06]">
      <div className="text-center mb-12">
        <span className="text-bt-cyan text-sm font-medium
                         uppercase tracking-wide">
          Collaborations
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-3">
          Our <span className="gradient-text-brand">partners</span>
        </h2>
        <p className="text-white/50 text-lg max-w-2xl mx-auto mt-4">
          We grow through partnerships with organisations and individuals
          who share our commitment to technology-driven progress across Africa.
        </p>
      </div>
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-bt-cyan-subtle border
                        border-bt-cyan-border flex items-center justify-center
                        mx-auto mb-5">
          <Handshake className="w-8 h-8 text-bt-cyan" />
        </div>
        <h3 className="text-xl font-semibold mb-3">
          Partnership programme launching in 2026
        </h3>
        <p className="text-white/50 max-w-lg mx-auto text-sm
                      leading-relaxed mb-6">
          BurgTech Solutions is establishing formal partnerships with
          technology companies, academic institutions, and development
          organisations across Africa and globally. Interested in
          partnering with us?
        </p>
        <Link
          href="/contact"
          className="btn-primary text-sm"
        >
          Discuss a partnership <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="text-center mt-6">
        <Link
          href="/about/partners"
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          View full partners page →
        </Link>
      </div>
    </section>
  )
}
