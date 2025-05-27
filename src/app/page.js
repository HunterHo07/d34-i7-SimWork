import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/sections/HeroSection'

// Simple loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
  </div>
)

// Lazy load heavy components
const ProblemSection = dynamic(() => import('@/components/sections/ProblemSection'), {
  loading: () => <LoadingSpinner />
})

const SolutionSection = dynamic(() => import('@/components/sections/SolutionSection'), {
  loading: () => <LoadingSpinner />
})

const FeaturesSection = dynamic(() => import('@/components/sections/FeaturesSection'), {
  loading: () => <LoadingSpinner />
})

const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), {
  loading: () => <LoadingSpinner />
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section - Load immediately */}
      <HeroSection />

      {/* Lazy loaded sections */}
      <Suspense fallback={<LoadingSpinner />}>
        <ProblemSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <SolutionSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
    </main>
  );
}
