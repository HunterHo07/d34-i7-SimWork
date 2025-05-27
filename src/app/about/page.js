import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'About - SimWork | Revolutionizing Skills Assessment',
  description: 'Learn how SimWork is transforming the hiring process with immersive 3D assessment experiences that predict real job performance.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
