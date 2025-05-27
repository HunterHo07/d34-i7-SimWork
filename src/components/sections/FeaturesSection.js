'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      id: 'developer',
      title: 'Developer Station',
      icon: '💻',
      description: 'Real coding challenges in live development environments',
      details: [
        'Monaco Editor (VS Code engine) integration',
        'Live terminal with bash/cmd simulation',
        'Git workflow simulation',
        'Real codebase debugging challenges',
        'API integration tasks',
        'Code review scenarios'
      ],
      preview: {
        title: 'Fix the Authentication Bug',
        subtitle: 'Debug a real-world login system issue',
        code: `// TODO: Fix the authentication logic
function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return generateToken(user);
  }
  return null; // Security issue here!
}`
      }
    },
    {
      id: 'designer',
      title: 'Design Studio',
      icon: '🎨',
      description: 'Creative briefs using professional-grade design tools',
      details: [
        'Fabric.js canvas for vector design',
        'Comprehensive asset library',
        'Advanced color picker and typography',
        'Logo design challenges',
        'UI/UX mockup creation',
        'Brand guideline development'
      ],
      preview: {
        title: 'Design a SaaS Dashboard',
        subtitle: 'Create a modern, user-friendly interface',
        mockup: 'Dashboard wireframe with sidebar navigation, data cards, and charts'
      }
    },
    {
      id: 'manager',
      title: 'PM Command Center',
      icon: '📊',
      description: 'Project management scenarios with real stakeholder challenges',
      details: [
        'Interactive Kanban boards',
        'Gantt chart timeline planning',
        'Resource allocation simulation',
        'Stakeholder communication scenarios',
        'Risk assessment challenges',
        'Agile ceremony facilitation'
      ],
      preview: {
        title: 'Launch Product Feature',
        subtitle: 'Coordinate cross-functional team delivery',
        tasks: ['Backend API', 'Frontend UI', 'QA Testing', 'Documentation']
      }
    },
    {
      id: 'data',
      title: 'Data Processing Hub',
      icon: '📈',
      description: 'Data entry and analysis with quality metrics',
      details: [
        'Dynamic form builder interface',
        'Excel-like spreadsheet manipulation',
        'Data validation and cleaning',
        'OCR simulation for document processing',
        'Quality metrics tracking',
        'Report generation tasks'
      ],
      preview: {
        title: 'Process Customer Data',
        subtitle: 'Clean and validate 1000+ records',
        metrics: { accuracy: '98.5%', speed: '45 WPM', quality: 'A+' }
      }
    }
  ]

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
    <section ref={ref} className="py-20 bg-gradient-to-b from-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-medium mb-6"
          >
            <span className="mr-2">🚀</span>
            Assessment Stations
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Multi-Role Assessment
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              In One Platform
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate between specialized workstations, each designed to test specific skills 
            with real-world tools and authentic job scenarios.
          </p>
        </motion.div>

        {/* Feature Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeFeature === index
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl mr-2">{feature.icon}</span>
              <span className="font-medium">{feature.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Feature Display */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Feature Details */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-4xl mr-4">{features[activeFeature].icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {features[activeFeature].title}
                </h3>
                <p className="text-gray-300">
                  {features[activeFeature].description}
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              {features[activeFeature].details.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span className="text-gray-300">{detail}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Try {features[activeFeature].title}
            </motion.button>
          </div>

          {/* Feature Preview */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-400">SimWork Assessment</div>
              </div>
              
              <div className="text-white">
                <h4 className="font-semibold mb-1">{features[activeFeature].preview.title}</h4>
                <p className="text-sm text-gray-400 mb-4">{features[activeFeature].preview.subtitle}</p>
                
                {/* Dynamic Preview Content */}
                {features[activeFeature].id === 'developer' && (
                  <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                    <pre className="text-green-400">{features[activeFeature].preview.code}</pre>
                  </div>
                )}
                
                {features[activeFeature].id === 'designer' && (
                  <div className="bg-gray-800 rounded p-4 text-center">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded border-2 border-dashed border-gray-600 flex items-center justify-center">
                      <span className="text-gray-400 text-sm">{features[activeFeature].preview.mockup}</span>
                    </div>
                  </div>
                )}
                
                {features[activeFeature].id === 'manager' && (
                  <div className="space-y-2">
                    {features[activeFeature].preview.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-800 rounded p-2">
                        <span className="text-sm">{task}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          index < 2 ? 'bg-green-400' : index < 3 ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                )}
                
                {features[activeFeature].id === 'data' && (
                  <div className="bg-gray-800 rounded p-3">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-green-400 font-bold">{features[activeFeature].preview.metrics.accuracy}</div>
                        <div className="text-xs text-gray-400">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-bold">{features[activeFeature].preview.metrics.speed}</div>
                        <div className="text-xs text-gray-400">Speed</div>
                      </div>
                      <div>
                        <div className="text-purple-400 font-bold">{features[activeFeature].preview.metrics.quality}</div>
                        <div className="text-xs text-gray-400">Quality</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Real-time performance tracking</div>
              <div className="flex justify-center space-x-4 text-xs">
                <span className="text-green-400">✓ Accuracy</span>
                <span className="text-blue-400">⚡ Speed</span>
                <span className="text-purple-400">🎯 Quality</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Why SimWork Beats Traditional Assessments
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-red-400 mb-4">❌ Traditional Methods</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Artificial coding puzzles</li>
                <li>• Single-skill focus</li>
                <li>• No real-world context</li>
                <li>• Poor candidate experience</li>
                <li>• Limited behavioral insights</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-green-400 mb-4">✅ SimWork Approach</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Real job scenarios</li>
                <li>• Multi-skill assessment</li>
                <li>• Authentic work environment</li>
                <li>• Engaging game experience</li>
                <li>• Comprehensive analytics</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
