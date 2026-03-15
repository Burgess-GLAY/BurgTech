import { Suspense } from 'react'
import { HeroSection, StatsSection, ServicesPreview, FeaturedProjects, FounderSection, TestimonialsSection, InsightsPreview, CTASection } from '@/components/sections'
import { SectionSkeleton } from '@/components/ui/SectionSkeleton'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <Suspense fallback={<SectionSkeleton />}>
        <ServicesPreview />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedProjects />
      </Suspense>
      <FounderSection />
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <InsightsPreview />
      </Suspense>
      <CTASection />
    </>
  )
}
