'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#050e12]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative text-center space-y-8 max-w-xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-red-500/10 border border-red-500/20 mb-4"
        >
          <AlertCircle className="w-10 h-10 text-red-400" />
        </motion.div>

        <div className="space-y-4">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-white relative z-10"
          >
            System <span className="text-red-400">Anomalies</span>
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-lg"
          >
            We encountered an unexpected error while processing this request. Our systems are working on a resolution.
          </motion.p>
          {error.digest && (
            <p className="text-[10px] text-white/10 font-mono uppercase tracking-widest pt-2">
              Trace ID: {error.digest}
            </p>
          )}
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => reset()}
            className="btn-primary bg-red-500 hover:bg-red-600 shadow-red-500/20 flex items-center gap-2 px-8"
          >
            <RefreshCw className="w-4 h-4" /> Try Recovery
          </button>
          <Link href="/" className="px-8 py-3 rounded-2xl border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 font-bold font-display">
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
