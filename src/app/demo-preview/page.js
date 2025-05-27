import DemoPreview from '@/components/sections/DemoPreview'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Demo Preview - SimWork | Experience 3D Assessment Environment',
  description: 'Experience SimWork\'s immersive 3D assessment environment. See how our platform revolutionizes skills testing through interactive simulations.',
}

export default function DemoPreviewPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <DemoPreview />
      <CTASection />
    </main>
  )
}
