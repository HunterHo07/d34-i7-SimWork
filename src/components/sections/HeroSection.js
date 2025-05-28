'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ParticleField from '@/components/effects/ParticleField'

export default function HeroSection() {
  // Typing effect state
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const textArray = [
    "Real Company Workspaces",
    "Google's daily tasks",
    "Meta's project workflows",
    "Stripe's real challenges",
    "Netflix's code reviews",
    "Airbnb's design sprints",
    "Authentic workplace scenarios",
    "Live work simulation"
  ]

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = textArray[currentTextIndex]

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1))
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500) // Pause before deleting
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentTextIndex((currentTextIndex + 1) % textArray.length)
      }
    }, isDeleting ? 30 : 80) // Faster deletion, smoother typing

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, textArray])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <ParticleField
        particleCount={50}
        particleColor="#3b82f6"
        speed={0.3}
        interactive={true}
        className="opacity-30"
      />

      {/* Dynamic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.15),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.15),transparent_50%)] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_50%)] animate-pulse" style={{ animationDelay: '4s' }} />

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse"></div>
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Logo and Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center lg:justify-start mb-8"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span className="text-3xl font-bold text-white">SimWork</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
          >
            The Future of
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills Assessment
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md"
          >
            Experience actual day-to-day work from real companies in immersive 3D environments.
            No more artificial tests—step into authentic workplace scenarios and prove your skills through real work simulation.
          </motion.p>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">95%+</div>
              <div className="text-sm text-gray-200">Real Work Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">500+</div>
              <div className="text-sm text-gray-200">Company Tasks Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">85%</div>
              <div className="text-sm text-gray-200">Faster Hiring Decisions</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/demo">
              <Button
                variant="primary"
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                Try Live Demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-gray-800/90 text-white border-gray-400 hover:bg-gray-700/90 hover:border-gray-300"
              >
                View Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 pt-8 border-t border-gray-700"
          >
            <p className="text-sm text-gray-200 mb-4">Trusted by innovative companies</p>
            <div className="flex items-center justify-center lg:justify-start space-x-8 opacity-70">
              {/* Company logos */}
              <div className="flex items-center justify-center w-20 h-8 bg-gray-700 rounded px-2">
                <span className="text-xs font-bold text-gray-200">TechCorp</span>
              </div>
              <div className="flex items-center justify-center w-20 h-8 bg-gray-700 rounded px-2">
                <span className="text-xs font-bold text-gray-200">InnovateLab</span>
              </div>
              <div className="flex items-center justify-center w-20 h-8 bg-gray-700 rounded px-2">
                <span className="text-xs font-bold text-gray-200">DataFlow</span>
              </div>
              <div className="flex items-center justify-center w-20 h-8 bg-gray-700 rounded px-2">
                <span className="text-xs font-bold text-gray-200">CloudTech</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - Animated Work Simulation Display */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Main Display Container */}
          <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
            {/* Enhanced Background with Animated Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse"></div>
            </div>

            {/* Animated Work Simulation Display */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-ping"></div>
              </div>

              {/* Central Content - Typing Effect Work Scenarios */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-center"
                >
                  <div className="text-6xl mb-4 filter drop-shadow-lg">🏢</div>
                  <div className="text-white text-xl font-bold mb-2 drop-shadow-lg min-h-[2rem] flex items-center justify-center">
                    {currentText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                      className="ml-1 text-blue-400 font-normal text-2xl"
                    >
                      |
                    </motion.span>
                  </div>
                  <div className="text-blue-300 text-sm mb-4 drop-shadow-md">
                    Experience real work from top companies
                  </div>
                </motion.div>

                {/* Floating Work Task Indicators */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-2 text-white text-xs font-medium shadow-lg"
                >
                  📊 Data Analysis Task
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute top-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-2 text-white text-xs font-medium shadow-lg"
                >
                  💻 Code Review
                </motion.div>

                <motion.div
                  animate={{
                    x: [-5, 5, -5],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-6 left-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-2 text-white text-xs font-medium shadow-lg"
                >
                  🎨 UI Design Sprint
                </motion.div>

                <motion.div
                  animate={{
                    x: [5, -5, 5],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute bottom-6 right-6 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg p-2 text-white text-xs font-medium shadow-lg"
                >
                  📋 Project Planning
                </motion.div>
              </div>

              {/* Animated Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 animate-pulse"></div>
            </div>

            {/* Enhanced Floating Status Indicators */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full p-3 text-white text-sm font-medium shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-400 rounded-full"
                ></motion.div>
                <span>Live Tasks</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-3 text-white text-sm font-medium shadow-xl border border-white/20"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-lg"
                >
                  ⚡
                </motion.div>
                <span>Real-Time</span>
              </div>
            </motion.div>
          </div>

          {/* Real Work Simulation Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg p-4 border border-blue-400/30 backdrop-blur-sm"
            >
              <div className="text-blue-400 font-semibold mb-1 flex items-center">
                <span className="mr-2">🏢</span>
                Real Company Tasks
              </div>
              <div className="text-sm text-gray-100">Actual work from Google, Meta, Stripe</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-4 border border-purple-400/30 backdrop-blur-sm"
            >
              <div className="text-purple-400 font-semibold mb-1 flex items-center">
                <span className="mr-2">⚡</span>
                Live Environments
              </div>
              <div className="text-sm text-gray-100">3D workspaces with real tools & data</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-lg p-4 border border-green-400/30 backdrop-blur-sm"
            >
              <div className="text-green-400 font-semibold mb-1 flex items-center">
                <span className="mr-2">🎯</span>
                Day-to-Day Work
              </div>
              <div className="text-sm text-gray-100">No puzzles—just real job responsibilities</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-gradient-to-br from-pink-600/20 to-red-600/20 rounded-lg p-4 border border-pink-400/30 backdrop-blur-sm"
            >
              <div className="text-pink-400 font-semibold mb-1 flex items-center">
                <span className="mr-2">📊</span>
                Real Performance
              </div>
              <div className="text-sm text-gray-100">Measure actual work output & quality</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
