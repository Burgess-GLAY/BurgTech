export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-bt-cyan/20 rounded-full" />
        <div className="w-8 h-8 border-2 border-bt-cyan border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
