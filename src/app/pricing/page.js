import PricingSection from '@/components/sections/PricingSection'
import CTASection from '@/components/sections/CTASection'

export const metadata = {
  title: 'Pricing - SimWork | Simple, Transparent Pricing Plans',
  description: 'Choose the perfect SimWork plan for your team. Start free and scale as you grow with our flexible pricing options.',
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <PricingSection />
      <CTASection />
    </main>
  )
}
