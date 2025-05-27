'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import GameCanvas from '@/components/game/GameCanvas'
import Button from '@/components/ui/Button'

export default function DemoPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [gameState, setGameState] = useState({})
  const [isFullscreen, setIsFullscreen] = useState(false)
  const gameCanvasRef = useRef(null)

  const handleGameStateChange = (newState) => {
    setGameState(newState)
  }

  const handleGameError = (error) => {
    console.error('Demo game error:', error)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const demoFeatures = [
    {
      icon: '🏢',
      title: 'Immersive 3D Office',
      description: 'Navigate a realistic workplace environment'
    },
    {
      icon: '🎮',
      title: 'Interactive Gameplay',
      description: 'Engaging game mechanics with real assessments'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Live performance tracking and insights'
    },
    {
      icon: '🎯',
      title: 'Adaptive Difficulty',
      description: 'AI adjusts challenges to your skill level'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Developer',
      company: 'TechCorp',
      avatar: '👩‍💻',
      quote: 'Finally, an assessment that actually tests real coding skills instead of algorithm puzzles!'
    },
    {
      name: 'Marcus Johnson',
      role: 'Design Lead',
      company: 'CreativeStudio',
      avatar: '👨‍🎨',
      quote: 'The design challenges felt like actual client work. Much better than portfolio reviews.'
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Product Manager',
      company: 'StartupXYZ',
      avatar: '👩‍💼',
      quote: 'I could actually demonstrate my PM skills through realistic scenarios. Game-changing!'
    }
  ]

  return (
    <section id="demo-preview" ref={ref} className="py-20 bg-gradient-to-b from-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-blue-500/5" />
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
            className="inline-flex items-center px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-pink-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">🎮</span>
            Live Demo
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Experience SimWork
            <span className="block bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              In Action
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Step into our immersive 3D office environment and experience firsthand how 
            SimWork revolutionizes skills assessment through engaging, real-world scenarios.
          </p>
        </motion.div>

        {/* Demo Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'mb-16'}`}
        >
          <div className={`${isFullscreen ? 'w-full h-full' : 'aspect-video max-w-5xl mx-auto'} relative`}>
            {/* Demo Canvas */}
            <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-blue-900 rounded-2xl overflow-hidden border border-purple-500/20">
              <GameCanvas
                ref={gameCanvasRef}
                onGameStateChange={handleGameStateChange}
                onError={handleGameError}
                className="w-full h-full"
              />
              
              {/* Demo Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="glass"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="backdrop-blur-md"
                >
                  {isFullscreen ? '🗗' : '⛶'}
                </Button>
              </div>
              
              {/* Demo Info Overlay */}
              {!isFullscreen && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">Interactive Demo</h4>
                        <p className="text-sm text-gray-300">
                          Use mouse to navigate • Click objects to interact • Experience real assessments
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">Performance</div>
                        <div className="text-green-400 font-semibold">
                          {gameState.score || 0} points
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Fullscreen Exit */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-colors"
            >
              ✕ Exit Fullscreen
            </button>
          )}
        </motion.div>

        {/* Demo Features */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* User Testimonials */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              What Users Say About the Demo
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-2xl mr-3">{testimonial.avatar}</div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        {!isFullscreen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Hiring Process?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of companies already using SimWork to find better candidates 
              faster with our immersive assessment platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Start Free Trial
              </Button>
              <Button
                variant="glass"
                size="lg"
              >
                Schedule Demo
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-gray-400">
              No credit card required • 14-day free trial • Setup in minutes
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
