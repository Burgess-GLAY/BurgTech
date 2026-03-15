import { Metadata } from 'next'
import { apiClient } from '@/lib/api'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { data } = await apiClient.get(`/blog/${params.slug}`)
    const post = data.post

    return {
      title: post.title,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Post Not Found',
    }
  }
}

export default function InsightDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
