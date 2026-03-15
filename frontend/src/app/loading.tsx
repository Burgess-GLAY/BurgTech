import { Skeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-96 mx-auto rounded-xl" />
        <Skeleton className="h-6 w-[500px] mx-auto rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card p-6 space-y-4 rounded-3xl">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" lines={2} />
          </div>
        ))}
      </div>
    </div>
  )
}
