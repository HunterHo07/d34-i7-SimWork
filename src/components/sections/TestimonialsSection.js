'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: 'Jennifer Walsh',
      role: 'VP of Engineering',
      company: 'TechFlow Inc.',
      avatar: '👩‍💻',
      rating: 5,
      quote: 'SimWork completely transformed our hiring process. We went from 40% mis-hire rate to less than 5% in just 6 months. The 3D environment gives us insights we never had before.',
      metrics: {
        improvement: '87% reduction in mis-hires',
        time: '60% faster hiring',
        satisfaction: '4.9/5 candidate experience'
      }
    },
    {
      name: 'David Kim',
      role: 'Head of Design',
      company: 'Creative Labs',
      avatar: '👨‍🎨',
      rating: 5,
      quote: 'As a design leader, I was skeptical about automated assessments. But SimWork\'s design challenges are incredibly realistic. Candidates actually enjoy the process!',
      metrics: {
        improvement: '92% assessment accuracy',
        time: '3x more applications',
        satisfaction: '4.8/5 candidate experience'
      }
    },
    {
      name: 'Maria Rodriguez',
      role: 'Chief People Officer',
      company: 'GrowthCorp',
      avatar: '👩‍💼',
      rating: 5,
      quote: 'The analytics SimWork provides are game-changing. We can predict job performance with 90%+ accuracy. Our retention rates have never been higher.',
      metrics: {
        improvement: '90% performance prediction',
        time: '45% faster onboarding',
        satisfaction: '95% employee retention'
      }
    },
    {
      name: 'Alex Thompson',
      role: 'Startup Founder',
      company: 'InnovateTech',
      avatar: '👨‍💻',
      rating: 5,
      quote: 'For a startup, every hire is critical. SimWork helps us identify A-players who fit our culture and can hit the ground running. Worth every penny.',
      metrics: {
        improvement: '100% hire success rate',
        time: '50% reduced time-to-productivity',
        satisfaction: '4.9/5 team satisfaction'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Talent Acquisition Director',
      company: 'Enterprise Solutions',
      avatar: '👩‍🔬',
      rating: 5,
      quote: 'We process 1000+ applications monthly. SimWork\'s AI-powered screening saves us 80% of our time while improving candidate quality dramatically.',
      metrics: {
        improvement: '80% time savings',
        time: '5x more qualified candidates',
        satisfaction: '4.7/5 recruiter efficiency'
      }
    }
  ]

  const companies = [
    { name: 'TechFlow', logo: '🚀' },
    { name: 'Creative Labs', logo: '🎨' },
    { name: 'GrowthCorp', logo: '📈' },
    { name: 'InnovateTech', logo: '💡' },
    { name: 'Enterprise Solutions', logo: '🏢' },
    { name: 'DataDriven', logo: '📊' },
    { name: 'CloudFirst', logo: '☁️' },
    { name: 'AI Ventures', logo: '🤖' }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-green-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm20 35a15 15 0 1 1 0-30 15 15 0 0 1 0 30z' fill-rule='nonzero'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            className="inline-flex items-center px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">⭐</span>
            Customer Success Stories
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Trusted by Industry
            <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Leaders Worldwide
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of companies that have revolutionized their hiring process 
            with SimWork's immersive assessment platform.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-blue-900/30 to-green-900/30 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Quote */}
              <div className="text-center mb-8">
                <div className="text-4xl text-blue-400 mb-4">"</div>
                <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
                  {testimonials[currentTestimonial].quote}
                </blockquote>
                
                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center mb-8">
                <div className="text-4xl mr-4">{testimonials[currentTestimonial].avatar}</div>
                <div className="text-center">
                  <div className="font-semibold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid sm:grid-cols-3 gap-6">
                {Object.entries(testimonials[currentTestimonial].metrics).map(([key, value], index) => (
                  <div key={key} className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{value}</div>
                    <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Testimonial Navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-blue-400 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-center text-gray-400 mb-8">
            Trusted by 500+ companies worldwide
          </h3>
          
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-center justify-items-center opacity-60">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center hover:opacity-100 transition-opacity duration-300"
              >
                <div className="text-2xl mb-1">{company.logo}</div>
                <div className="text-xs text-gray-500">{company.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Platform Statistics
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Companies Using SimWork</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300">Assessments Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
              <div className="text-gray-300">Performance Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">4.8/5</div>
              <div className="text-gray-300">Average User Rating</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
