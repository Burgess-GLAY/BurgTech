'use client'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, ExternalLink } from 'lucide-react'
import { apiClient } from '@/lib/api'
import { CTASection } from '@/components/sections'

interface TeamMember {
  id: string
  name?: string // Fallback name
  user?: { name: string; email: string } // API user name
  title: string
  bio: string
  photoUrl?: string
  skills: string[]
  linkedinUrl?: string
  githubUrl?: string
  twitterUrl?: string
}

export default function TeamPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['team'],
    queryFn: () => apiClient.get('/team').then(r => r.data.team),
    staleTime: 5 * 60 * 1000,
  })

  const team: TeamMember[] = data ?? []

  return (
    <div className="pt-32 pb-24 bg-[#020617] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">World Class Talent</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            The minds moving <span className="gradient-text-brand">Burtech</span> forward
          </h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Our multidisciplinary team unites engineering precision with creative vision to solve complex digital challenges.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => <TeamSkeleton key={i} />)}
          </div>
        ) : team.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((m, i) => (
              <TeamCard key={m.id} member={m} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-white/40 text-lg">Team information coming soon</p>
          </div>
        )}
      </div>
      <CTASection />
    </div>
  )
}

function TeamCard({ member, index }: { member: TeamMember, index: number }) {
  // Safe access to name from either API record or fallback
  const name = member.user?.name || member.name || "Team Member"
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      <div className="relative glass-card-premium overflow-hidden rounded-[2rem] p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 group-hover:scale-105 transition-transform duration-500">
            {member.photoUrl ? (
              <img src={member.photoUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl glass-card flex items-center justify-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink size={14} />
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-blue-400 text-sm font-semibold mb-4 tracking-wide uppercase">{member.title}</p>
        
        <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
          {member.bio}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {member.skills.slice(0, 3).map(skill => (
            <span key={skill} className="text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/50 uppercase tracking-tight">
              {skill}
            </span>
          ))}
          {member.skills.length > 3 && (
            <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400">
              +{member.skills.length - 3}
            </span>
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 flex gap-4">
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noopener" className="text-white/20 hover:text-white transition-colors">
              <Linkedin size={18} />
            </a>
          )}
          {member.githubUrl && (
            <a href={member.githubUrl} target="_blank" rel="noopener" className="text-white/20 hover:text-white transition-colors">
              <Github size={18} />
            </a>
          )}
          {member.twitterUrl && (
            <a href={member.twitterUrl} target="_blank" rel="noopener" className="text-white/20 hover:text-white transition-colors">
              <Twitter size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function TeamSkeleton() {
  return (
    <div className="rounded-[2rem] p-6 border border-white/5 bg-white/[0.02] animate-pulse">
      <div className="w-20 h-20 rounded-2xl bg-white/5 mb-6" />
      <div className="h-6 w-3/4 bg-white/5 rounded-md mb-2" />
      <div className="h-4 w-1/2 bg-white/5 rounded-md mb-6" />
      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-white/5 rounded-md" />
        <div className="h-3 w-5/6 bg-white/5 rounded-md" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-white/5 rounded-md" />
        <div className="h-5 w-16 bg-white/5 rounded-md" />
      </div>
    </div>
  )
}
