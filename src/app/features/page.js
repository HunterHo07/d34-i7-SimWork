import FeaturesSection from '@/components/sections/FeaturesSection'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Features - SimWork | Immersive Skills Assessment Platform',
  description: 'Explore SimWork\'s comprehensive assessment features including code challenges, design tools, project management scenarios, and data processing tasks.',
}

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <FeaturesSection />
      <CTASection />
    </main>
  )
}
