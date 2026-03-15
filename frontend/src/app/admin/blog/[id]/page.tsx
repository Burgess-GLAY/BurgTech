'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { apiClient } from '@/lib/api'
import { BlogEditor } from '@/components/admin/BlogEditor'
import { Skeleton } from '@/components/ui/Skeleton'

export default function EditBlogPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      // Note: We need a way to get post by ID. 
      // Current API only has get by SLUG for public.
      // I'll check if I need to add GET /api/v1/blog/id/:id
      const { data } = await apiClient.get(`/blog?limit=1000`) // Temporary hack if no by-id endpoint
      const found = data.posts.find((p: any) => p.id === id)
      setPost(found)
    } catch (err) {
      console.error('Failed to fetch post')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Skeleton lines={10} className="w-full h-64" />

  return (
    <div className="container mx-auto">
      <BlogEditor initialData={post} id={id as string} />
    </div>
  )
}
