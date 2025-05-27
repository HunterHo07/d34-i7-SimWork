'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'

// Lazy load heavy components with error handling
const GameCanvas = dynamic(() => import('@/components/game/GameCanvas'), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900 rounded-lg">
      <div className="text-center text-white">
        <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4" />
        <div>Loading 3D Environment...</div>
      </div>
    </div>
  ),
  ssr: false
})

const AssessmentModal = dynamic(() => import('@/components/assessment/AssessmentModal'), {
  ssr: false
})

export default function DemoPage() {
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    score: 0,
    timeElapsed: 0,
    isPlaying: false,
    isPaused: false
  })
  const [selectedRole, setSelectedRole] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)
  const [showAssessment, setShowAssessment] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [gameError, setGameError] = useState(null)
  const gameCanvasRef = useRef(null)

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

  const handleGameStateChange = useCallback((newState) => {
    setGameState(newState)
  }, [])

  const handleGameError = useCallback((error) => {
    console.error('Demo game error:', error)
    setGameError(error.message || 'Failed to load 3D environment')
  }, [])

  const startDemo = (roleId) => {
    setSelectedRole(roleId)
    setShowInstructions(false)
    if (gameCanvasRef.current) {
      gameCanvasRef.current.startGame(roleId)
    }
  }

  const resetDemo = () => {
    setSelectedRole(null)
    setShowInstructions(true)
    setShowAssessment(false)
    setCurrentChallenge(null)
    setGameError(null)
    setGameState({
      currentLevel: 1,
      score: 0,
      timeElapsed: 0,
      isPlaying: false,
      isPaused: false
    })
    if (gameCanvasRef.current) {
      gameCanvasRef.current.restartGame()
    }
  }

  const startAssessment = () => {
    const roleData = roles.find(role => role.id === selectedRole)
    if (roleData) {
      setCurrentChallenge({
        title: roleData.challenges[0],
        role: selectedRole,
        description: `Complete this ${roleData.title.toLowerCase()} challenge`
      })
      setShowAssessment(true)
    }
  }

  const handleAssessmentSubmit = (results) => {
    console.log('Assessment results:', results)
    // Update game state with results
    setGameState(prev => ({
      ...prev,
      score: prev.score + (results.score || 0),
      currentLevel: prev.currentLevel + 1
    }))
    setShowAssessment(false)
  }

  const handleAssessmentClose = () => {
    setShowAssessment(false)
    setCurrentChallenge(null)
  }

  const selectedRoleData = roles.find(role => role.id === selectedRole)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Demo Controls - Only show when role is selected */}
      {selectedRole && (
        <div className="fixed top-20 right-4 z-30">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetDemo}
              className="bg-gray-800 text-white border-gray-500 hover:bg-gray-700"
            >
              Change Role
            </Button>
          </div>
        </div>
      )}

      {/* Role Selection */}
      {showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Assessment Role
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Select a role to experience SimWork's immersive assessment environment.
              Each role features real-world challenges and professional tools.
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
                onClick={() => startDemo(role.id)}
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
              <h3 className="text-lg font-semibold text-white mb-3">What to Expect</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-100">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Real-world scenarios and tools
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Interactive 3D environment
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Real-time performance tracking
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Immediate feedback and insights
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Game Environment */}
      {selectedRole && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Game Canvas */}
          <div className="h-screen relative">
            {gameError ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center text-white max-w-md">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold mb-4">3D Environment Unavailable</h3>
                  <p className="text-gray-300 mb-6">
                    The 3D environment couldn't load. You can still experience the assessment tools.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setShowAssessment(true)}
                    className="mb-4"
                  >
                    Try Assessment Tools
                  </Button>
                  <br />
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    size="sm"
                  >
                    Reload Page
                  </Button>
                </div>
              </div>
            ) : (
              <GameCanvas
                ref={gameCanvasRef}
                onGameStateChange={handleGameStateChange}
                onError={handleGameError}
                className="w-full h-full"
              />
            )}

            {/* Role Info Overlay */}
            <div className="absolute top-20 left-4 z-20">
              <div className="bg-gray-900/90 border border-gray-600 rounded-lg p-4 text-white max-w-sm shadow-lg">
                <div className="flex items-center mb-3">
                  <div className="text-2xl mr-3">{selectedRoleData?.icon}</div>
                  <div>
                    <div className="font-semibold">{selectedRoleData?.title}</div>
                    <div className="text-sm text-gray-200">Assessment Mode</div>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <div>Level: {gameState.currentLevel}</div>
                  <div>Score: {gameState.score.toLocaleString()}</div>
                  <div>Time: {Math.floor(gameState.timeElapsed / 1000)}s</div>
                  {gameState.nearWorkstation && (
                    <div className="text-green-400">
                      Near: {gameState.nearWorkstation} station
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quest Info */}
            <div className="absolute top-20 right-4 z-20">
              <div className="bg-gray-900/90 border border-gray-600 rounded-lg p-4 text-white max-w-md shadow-lg">
                {gameState.currentQuest ? (
                  <>
                    <div className="font-semibold mb-2">{gameState.currentQuest.title}</div>
                    <div className="text-sm text-gray-200 mb-3">
                      {gameState.currentQuest.description}
                    </div>
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-gray-200 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((gameState.currentQuest.progress || 0) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(gameState.currentQuest.progress || 0) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-200">
                      Objective: {gameState.currentQuest.objectives?.[gameState.currentQuest.currentObjective || 0]}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-semibold mb-2">Current Challenge</div>
                    <div className="text-sm text-gray-200">
                      {selectedRoleData?.challenges[gameState.currentLevel - 1] || selectedRoleData?.challenges[0]}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Workstation Interaction Prompt */}
            {gameState.nearWorkstation && gameState.nearWorkstation === selectedRole && (
              <div className="absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
                <div className="bg-blue-600/90 backdrop-blur-md rounded-lg p-4 text-white text-center">
                  <div className="font-semibold mb-2">🎯 Workstation Available</div>
                  <div className="text-sm mb-3">Press E to start assessment</div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={startAssessment}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Start Assessment
                  </Button>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute bottom-4 right-4 z-20">
              <div className="flex space-x-2">
                {gameState.isPlaying ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => gameCanvasRef.current?.pauseGame()}
                      className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                    >
                      {gameState.isPaused ? 'Resume' : 'Pause'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => gameCanvasRef.current?.restartGame()}
                      className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                    >
                      Restart
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => gameCanvasRef.current?.startGame()}
                  >
                    Start Assessment
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetDemo}
                  className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
                >
                  Exit
                </Button>
              </div>
            </div>

            {/* Instructions Overlay */}
            {!gameState.isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
                <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 text-white text-center max-w-md">
                  <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
                  <div className="text-sm space-y-2 mb-6">
                    <div>• Use mouse to navigate the 3D environment</div>
                    <div>• Click on objects to interact</div>
                    <div>• Complete challenges to earn points</div>
                    <div>• Your performance is tracked in real-time</div>
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => gameCanvasRef.current?.startGame()}
                    className="w-full"
                  >
                    Start {selectedRoleData?.title} Assessment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

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
