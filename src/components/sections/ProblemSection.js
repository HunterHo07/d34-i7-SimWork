'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const problems = [
    {
      icon: "💸",
      title: "Wrong Hires Cost Millions",
      description: "Average cost per hire is $4,700 with 23% turnover in first year",
      stat: "$4.7K",
      statLabel: "Cost per hire"
    },
    {
      icon: "🎭",
      title: "Broken Assessment Methods",
      description: "Traditional interviews and coding challenges don't predict real job performance",
      stat: "23%",
      statLabel: "First year turnover"
    },
    {
      icon: "⚡",
      title: "Skills Gap Crisis",
      description: "87% of executives report critical skills gaps in their workforce",
      stat: "87%",
      statLabel: "Report skills gaps"
    },
    {
      icon: "🔄",
      title: "Inefficient Hiring Process",
      description: "Multiple rounds of interviews with no real proof of capability",
      stat: "6-8",
      statLabel: "Interview rounds"
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
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">🚨</span>
            The Hiring Crisis
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Traditional Hiring is
            <span className="block text-red-400">Fundamentally Broken</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Companies waste billions on mis-hires while talented candidates are rejected due to 
            outdated assessment methods that don't reflect real-world job performance.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {problem.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                  {problem.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {problem.description}
                </p>
                
                {/* Stat */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {problem.stat}
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    {problem.statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-2xl p-8 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The Real Cost of Broken Hiring
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-red-400 mb-2">$240B</div>
                <div className="text-sm text-gray-300">Annual cost of bad hires in US alone</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-400 mb-2">6 months</div>
                <div className="text-sm text-gray-300">Average time to identify a mis-hire</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">2.5x</div>
                <div className="text-sm text-gray-300">Salary cost to replace bad hire</div>
              </div>
            </div>
            <p className="text-gray-300 text-lg">
              Meanwhile, qualified candidates are rejected because they don't perform well in 
              artificial interview scenarios that have no correlation with actual job success.
            </p>
          </div>
        </motion.div>

        {/* Transition to Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center text-blue-400 font-medium">
            <span className="mr-2">But there's a better way</span>
            <motion.svg
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
