'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Button from '@/components/ui/Button'
import ParticleField from '@/components/effects/ParticleField'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const benefits = [
    {
      icon: '🚀',
      title: 'Get Started in Minutes',
      description: 'No complex setup required'
    },
    {
      icon: '💳',
      title: 'No Credit Card Required',
      description: 'Start your free trial today'
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'We\'re here to help you succeed'
    },
    {
      icon: '📊',
      title: 'Instant Analytics',
      description: 'See results immediately'
    }
  ]

  const stats = [
    { number: '500+', label: 'Companies Trust SimWork' },
    { number: '50K+', label: 'Assessments Completed' },
    { number: '90%', label: 'Performance Accuracy' },
    { number: '4.8/5', label: 'Customer Rating' }
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <ParticleField 
        particleCount={60}
        particleColor="#8b5cf6"
        speed={0.2}
        interactive={true}
        className="opacity-20"
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8"
          >
            <span className="mr-2">🎯</span>
            Ready to Transform Your Hiring?
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your SimWork
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Journey Today
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of companies revolutionizing their hiring process with immersive, 
            AI-powered assessments that actually predict job performance.
          </p>

          {/* Primary CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Button
              variant="primary"
              size="xl"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Free Trial
            </Button>
            <Button
              variant="glass"
              size="xl"
              className="px-12 py-4 text-xl font-bold"
            >
              Schedule Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-gray-400"
          >
            ✓ 14-day free trial • ✓ No credit card required • ✓ Cancel anytime
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-gray-400 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Join the Revolution
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA with Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-gradient-to-r from-gray-900/50 to-purple-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Don't Let Great Candidates Slip Away
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Every day you wait is another day of potential mis-hires and missed talent. 
              Start your SimWork journey today and transform your hiring process forever.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg font-semibold"
              >
                Talk to Sales
              </Button>
            </div>
            
            <div className="text-sm text-gray-400">
              Questions? Email us at{' '}
              <a href="mailto:hello@simwork.ai" className="text-purple-400 hover:text-purple-300 transition-colors">
                hello@simwork.ai
              </a>
              {' '}or call{' '}
              <a href="tel:+1-555-SIMWORK" className="text-purple-400 hover:text-purple-300 transition-colors">
                +1 (555) SIMWORK
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-20 pt-8 border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">SimWork</span>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
            © 2024 SimWork. All rights reserved. Revolutionizing hiring through immersive assessment.
          </div>
        </div>
      </motion.footer>
    </section>
  )
}
