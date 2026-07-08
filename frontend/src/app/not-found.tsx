'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#050e12]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-bt-cyan/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-bt-teal/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative text-center space-y-8 max-w-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/5 border border-white/10 mb-4"
        >
          <Search className="w-10 h-10 text-bt-cyan" />
        </motion.div>

        <div className="space-y-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-black text-white/5 tracking-tighter absolute -top-12 left-1/2 -translate-x-1/2 select-none"
          >
            404
          </motion.h1>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold text-white relative z-10"
          >
            Lost in <span className="text-bt-cyan">Cyberspace</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/40 text-lg"
          >
            The page you're searching for has moved to a different dimension or never existed in this timeline.
          </motion.p>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link href="/" className="btn-primary flex items-center gap-2 px-8">
            <Home className="w-4 h-4" /> Back to Base
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 font-bold"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </motion.div>
      </div>
    </main>
  )
}
