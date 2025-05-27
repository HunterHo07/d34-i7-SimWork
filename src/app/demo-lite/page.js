'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'

// Lazy load only the assessment modal
const AssessmentModal = dynamic(() => import('@/components/assessment/AssessmentModal'), {
  ssr: false
})

export default function DemoLitePage() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [showAssessment, setShowAssessment] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)

  const roles = [
    {
      id: 'developer',
      title: 'Software Developer',
      icon: '💻',
      description: 'Code, debug, and build applications',
      color: 'from-blue-500 to-cyan-500',
      skills: ['JavaScript', 'React', 'Node.js', 'Git', 'API Integration'],
      challenges: [
        'Fix authentication bug in login system',
        'Implement new feature with API integration',
        'Optimize database queries for performance',
        'Review and refactor legacy code'
      ]
    },
    {
      id: 'designer',
      title: 'UI/UX Designer',
      icon: '🎨',
      description: 'Create beautiful and functional designs',
      color: 'from-purple-500 to-pink-500',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      challenges: [
        'Design a modern SaaS dashboard',
        'Create a mobile app onboarding flow',
        'Redesign e-commerce checkout process',
        'Develop a comprehensive design system'
      ]
    },
    {
      id: 'manager',
      title: 'Project Manager',
      icon: '📊',
      description: 'Lead teams and deliver projects',
      color: 'from-green-500 to-emerald-500',
      skills: ['Agile', 'Scrum', 'Stakeholder Management', 'Risk Assessment'],
      challenges: [
        'Launch new product feature on time',
        'Manage cross-functional team conflicts',
        'Optimize resource allocation for Q4',
        'Handle scope creep in client project'
      ]
    },
    {
      id: 'data',
      title: 'Data Analyst',
      icon: '📈',
      description: 'Process and analyze data insights',
      color: 'from-orange-500 to-red-500',
      skills: ['Excel', 'SQL', 'Python', 'Data Visualization', 'Statistics'],
      challenges: [
        'Clean and validate customer dataset',
        'Create executive dashboard report',
        'Analyze user behavior patterns',
        'Build predictive sales model'
      ]
    }
  ]

  const startAssessment = (roleId) => {
    setSelectedRole(roleId)
    const roleData = roles.find(role => role.id === roleId)
    if (roleData) {
      setCurrentChallenge({
        title: roleData.challenges[0],
        role: roleId,
        description: `Complete this ${roleData.title.toLowerCase()} challenge`
      })
      setShowAssessment(true)
    }
  }

  const handleAssessmentSubmit = (results) => {
    console.log('Assessment results:', results)
    setShowAssessment(false)
    // Show results or next challenge
  }

  const handleAssessmentClose = () => {
    setShowAssessment(false)
    setCurrentChallenge(null)
    setSelectedRole(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Experience SimWork
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Assessment Tools
            </span>
          </h1>
          <p className="text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
            Try our assessment tools directly. Each role features real-world challenges
            and professional interfaces designed to evaluate actual job skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => startAssessment(role.id)}
            >
              <div className={`bg-gradient-to-br ${role.color} p-1 rounded-2xl group-hover:scale-105 transition-all duration-300`}>
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 h-full">
                  <div className="text-center">
                    <div className="text-4xl mb-4">{role.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                    <p className="text-gray-100 text-sm mb-4">{role.description}</p>

                    <div className="mb-4">
                      <div className="text-sm text-gray-200 mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {role.skills.slice(0, 3).map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-white/20 text-xs text-gray-100 rounded border border-white/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm text-gray-200 mb-2">Sample Challenge:</div>
                      <div className="text-xs text-gray-100 italic">
                        "{role.challenges[0]}"
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      className={`w-full bg-gradient-to-r ${role.color} hover:opacity-90`}
                    >
                      Start Assessment
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-900/80 border border-gray-600 rounded-xl p-6 max-w-2xl mx-auto shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-3">Assessment Features</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-100">
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Real-world scenarios and tools
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Professional interfaces
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Real-time performance tracking
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Immediate feedback and scoring
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-100 text-sm mb-4">
            Want the full immersive experience?
          </p>
          <Button
            variant="glass"
            onClick={() => window.location.href = '/demo'}
            className="bg-white/10 hover:bg-white/20"
          >
            Try Full 3D Demo
          </Button>
        </div>
      </main>

      {/* Assessment Modal */}
      <AssessmentModal
        isOpen={showAssessment}
        role={selectedRole}
        challenge={currentChallenge}
        onSubmit={handleAssessmentSubmit}
        onClose={handleAssessmentClose}
      />
    </div>
  )
}
