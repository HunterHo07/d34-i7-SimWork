'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const solutions = [
    {
      icon: "🏢",
      title: "Immersive 3D Simulation",
      description: "Navigate realistic office environments with different workstations for each role",
      features: ["3D Office Environment", "Interactive Workstations", "Realistic Scenarios"]
    },
    {
      icon: "🎯",
      title: "Multi-Role Assessment",
      description: "Test technical, creative, management, and operational skills in one platform",
      features: ["Developer Challenges", "Design Briefs", "PM Scenarios", "Data Tasks"]
    },
    {
      icon: "🤖",
      title: "AI-Powered Adaptivity",
      description: "Dynamic difficulty adjustment and personalized scenarios based on performance",
      features: ["Smart Difficulty", "Real-time Guidance", "Performance Analysis"]
    },
    {
      icon: "📊",
      title: "Real-Time Analytics",
      description: "Comprehensive insights for both candidates and employers with predictive modeling",
      features: ["Performance Metrics", "Behavioral Analysis", "Success Prediction"]
    }
  ]

  const benefits = [
    {
      metric: "90%+",
      label: "Job Performance Correlation",
      description: "Our assessments predict actual job success"
    },
    {
      metric: "10x",
      label: "Higher Engagement",
      description: "Candidates enjoy the gamified experience"
    },
    {
      metric: "75%",
      label: "Faster Hiring",
      description: "Reduce time-to-hire with better screening"
    },
    {
      metric: "60%",
      label: "Cost Reduction",
      description: "Lower mis-hire rates save money"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-800 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">✨</span>
            The SimWork Solution
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Immersive Assessment
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              That Actually Works
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            SimWork transforms hiring with game-like 3D environments where candidates complete 
            real-world tasks, providing accurate insights into their actual job performance.
          </p>
        </motion.div>

        {/* Solution Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-sm border border-blue-500/20 p-6 rounded-2xl hover:border-blue-400/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  {solution.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {solution.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2">
                  {solution.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            How SimWork Works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Enter the Office</h4>
              <p className="text-gray-400">Candidates create avatars and navigate a realistic 3D office environment</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Complete Real Tasks</h4>
              <p className="text-gray-400">Work on authentic job scenarios using professional tools and workflows</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Get Insights</h4>
              <p className="text-gray-400">Receive detailed analytics and performance predictions for better decisions</p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Proven Results
          </h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {benefit.metric}
                </div>
                <div className="text-white font-semibold mb-1">
                  {benefit.label}
                </div>
                <div className="text-sm text-gray-400">
                  {benefit.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">
            Ready to revolutionize your hiring process?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-2xl transition-all duration-300"
          >
            Experience SimWork Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
