export function SectionSkeleton() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto animate-pulse">
      <div className="flex flex-col items-center mb-16 space-y-4">
        <div className="h-4 w-24 bg-white/5 rounded-full" />
        <div className="h-10 w-64 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-64 glass-card rounded-2xl bg-white/[0.02]" />
        ))}
      </div>
    </section>
  )
}
