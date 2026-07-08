import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'
import { notFound } from 'next/navigation'

async function getProject(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
    const res = await fetch(`${base}/api/v1/projects/${slug}`, { next: { revalidate: 10 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) return notFound()

  const year = project.completedAt ? new Date(project.completedAt).getFullYear() : 'Ongoing'
  const mainImage = project.imageUrls?.[0] || ''

  return (
    <div className="bt-detail">
      {/* Hero — text only, centered, no background image */}
      <header className="bt-detail__hero">
        {project.category && (
          <span className="eyebrow bt-detail__eyebrow">{project.category}</span>
        )}
        <h1 className="bt-detail__title">{project.title}</h1>
        {project.summary && (
          <p className="bt-detail__summary">{project.summary}</p>
        )}
        {(project.client || year || project.technologies) && (
          <div className="bt-detail__meta">
            {project.client && <span>Client: <strong>{project.client}</strong></span>}
            {year && <span>Year: <strong>{year}</strong></span>}
            {project.technologies && (
              <span>
                Stack: <strong>
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(', ')
                    : project.technologies}
                </strong>
              </span>
            )}
          </div>
        )}
      </header>

      {/* Cover image — contained, NOT full bleed */}
      {mainImage && (
        <div className="bt-detail__cover-wrap">
          <div className="bt-detail__cover-box">
            <img
              src={mainImage}
              alt={`${project.title} preview`}
              className="bt-detail__cover-img"
            />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="bt-detail__body">
        <div className="space-y-16">
          <div className="bt-detail__section">
            <h2>Overview</h2>
            <div className="prose-custom">
              {project.description.split('\n\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {project.highlights?.length > 0 && (
            <div className="bt-detail__section">
              <h2>Key Features</h2>
              <ul className="bt-detail__features-list">
                {project.highlights.map((f: string, i: number) => (
                  <li key={i}>
                    <span className="bt-detail__check">✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional screenshots — 2-col grid, contained */}
          {project.imageUrls?.length > 1 && (
            <div className="bt-detail__section">
              <h2>Screenshots</h2>
              <div className="bt-detail__gallery">
                {project.imageUrls.map((img: string, i: number) => (
                  <div key={i} className="bt-detail__gallery-item">
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stack */}
          <div className="bt-detail__section">
            <h2>Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span key={tech} className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] text-white/80 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {(project.liveUrl || project.repoUrl) && (
            <div className="bt-detail__section">
              <h2>Links</h2>
              <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener"
                    className="btn-primary"
                  >
                    Live Demo <ExternalLink size={16} />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
                  >
                    View Source <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div className="bt-detail__back-wrap">
        <a href="/#projects" className="bt-detail__back">← Back to Projects</a>
      </div>
    </div>
  )
}
