export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    </div>
  )
}
