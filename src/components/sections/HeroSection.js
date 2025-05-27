'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ParticleField from '@/components/effects/ParticleField'

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <ParticleField
        particleCount={30}
        particleColor="#3b82f6"
        speed={0.2}
        interactive={false}
        className="opacity-20"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />

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
            Transform hiring with immersive 3D simulations that test real-world skills.
            No more broken interviews—just authentic, engaging assessments that predict job performance.
          </motion.p>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mb-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">90%+</div>
              <div className="text-sm text-gray-200">Job Performance Correlation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">10x</div>
              <div className="text-sm text-gray-200">Higher Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400">$4.7K</div>
              <div className="text-sm text-gray-200">Average Hiring Cost Saved</div>
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

        {/* Right Column - Demo Preview */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Demo Preview Container */}
          <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-white/10"></div>

            {/* Demo Preview Image/Video Placeholder */}
            <div className="w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏢</div>
                <div className="text-white text-xl font-semibold mb-2">3D Office Environment</div>
                <div className="text-gray-100 text-sm mb-4">Immersive assessment experience</div>
                <Link href="/demo">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Enter Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating UI Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute top-4 right-4 bg-black/70 rounded-lg p-3 text-white text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Live Demo Available</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white text-sm"
            >
              <div>Interactive 3D Office</div>
              <div className="text-xs text-gray-100">Click to explore</div>
            </motion.div>
          </div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-blue-400 font-semibold mb-1">Multi-Role Assessment</div>
              <div className="text-sm text-gray-100">Developer, Designer, PM, Data Entry</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-purple-400 font-semibold mb-1">AI-Powered</div>
              <div className="text-sm text-gray-100">Adaptive difficulty & real-time feedback</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-pink-400 font-semibold mb-1">Real-World Tasks</div>
              <div className="text-sm text-gray-100">Actual job scenarios, not puzzles</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="text-green-400 font-semibold mb-1">Instant Analytics</div>
              <div className="text-sm text-gray-100">Performance insights & predictions</div>
            </div>
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
