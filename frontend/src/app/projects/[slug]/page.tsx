import { apiClient } from '@/lib/api'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, CheckCircle2, Globe, Cpu } from 'lucide-react'
import { cn } from '@/lib/utils'

async function getProject(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/v1/projects/${slug}`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.project
  } catch { return null }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) return (
    <div className="min-h-screen pt-32 pb-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Project not found</h1>
      <Link href="/projects" className="text-cyan-400 hover:underline">Back to portfolio</Link>
    </div>
  )

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/projects" className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Content */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={cn('text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border', 
                  project.status === 'COMPLETED' ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                )}>{project.status.replace('_', ' ')}</span>
                {project.isFeatured && (
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20">Featured</span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-brand">{project.title}</h1>
              <p className="text-xl text-white/60 leading-relaxed font-light">{project.summary}</p>
            </div>

            {/* Main Images */}
            <div className="space-y-6">
              {project.imageUrls?.map((url: string, i: number) => (
                <div key={i} className="glass-card overflow-hidden rounded-3xl group">
                  <img src={url} alt={`${project.title} - ${i + 1}`} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
              ))}
              {!project.imageUrls?.length && (
                <div className="h-96 glass-card rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-slate-900/20 border-dashed border-2 border-white/5">
                  <Globe className="w-16 h-16 text-white/10" />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">About the Project</h2>
              <div className="text-white/60 leading-relaxed space-y-4 whitespace-pre-wrap">
                {project.description}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-8 h-fit lg:sticky lg:top-32">
            <div className="glass-card p-8 rounded-3xl space-y-8">
              {project.client && (
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-3">Client</h4>
                  <p className="text-lg font-medium">{project.client}</p>
                </div>
              )}

              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white/70">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.liveUrl && (
                <div className="pt-4">
                  <a href={project.liveUrl} target="_blank" rel="noopener" className="btn-primary w-full flex items-center justify-center gap-2">
                    <ExternalLink className="w-4 h-4" /> Visit Live Project
                  </a>
                </div>
              )}
            </div>

            <div className="glass-card p-8 rounded-3xl bg-blue-500/5">
              <Cpu className="w-8 h-8 text-cyan-400 mb-4" />
              <h4 className="text-lg font-bold mb-2">Technical Rigor</h4>
              <p className="text-sm text-white/50 leading-relaxed">
                Every project at Burtech Solution is built with a focus on performance, scalability, and technical excellence, ensuring we deliver value that lasts.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
