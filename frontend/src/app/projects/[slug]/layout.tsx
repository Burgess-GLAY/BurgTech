import { Metadata } from 'next'
import { apiClient } from '@/lib/api'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await apiClient.get(`/projects/${params.slug}`)
    const project = data.project

    return {
      title: project.title,
      description: project.summary,
      openGraph: {
        title: project.title,
        description: project.summary,
        images: project.imageUrls?.[0] ? [project.imageUrls[0]] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Project Not Found',
    }
  }
}

export default function ProjectDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
