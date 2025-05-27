'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CodeEditor({ 
  challenge = null,
  onSubmit = () => {},
  onClose = () => {},
  className = ''
}) {
  const editorRef = useRef(null)
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [testResults, setTestResults] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // Default challenge if none provided
  const defaultChallenge = {
    title: 'Fix Authentication Bug',
    description: 'Debug and fix the security vulnerability in the login function',
    initialCode: `// TODO: Fix the authentication logic
function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return generateToken(user);
  }
  return null; // Security issue here!
}

function findUserByEmail(email) {
  // Mock user database
  const users = [
    { id: 1, email: 'admin@test.com', password: 'admin123' },
    { id: 2, email: 'user@test.com', password: 'user123' }
  ];
  return users.find(u => u.email === email);
}

function generateToken(user) {
  return 'token_' + user.id + '_' + Date.now();
}`,
    hints: [
      'The password comparison is vulnerable to timing attacks',
      'Consider using a secure comparison method',
      'Add input validation for email and password'
    ],
    tests: [
      'Should authenticate valid users',
      'Should reject invalid passwords',
      'Should handle empty inputs safely',
      'Should use secure password comparison'
    ]
  }

  const currentChallenge = challenge || defaultChallenge

  useEffect(() => {
    setCode(currentChallenge.initialCode)
    setIsLoading(false)
  }, [currentChallenge])

  const runCode = async () => {
    setIsRunning(true)
    
    // Simulate code execution and testing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock test results based on code content
    const hasSecureComparison = code.includes('crypto') || code.includes('bcrypt') || code.includes('timingSafeEqual')
    const hasValidation = code.includes('validate') || code.includes('trim') || code.includes('length')
    const hasErrorHandling = code.includes('try') || code.includes('catch') || code.includes('throw')
    
    const results = {
      passed: 0,
      total: 4,
      tests: [
        { name: 'Valid user authentication', passed: true, message: 'Test passed' },
        { name: 'Invalid password rejection', passed: true, message: 'Test passed' },
        { name: 'Input validation', passed: hasValidation, message: hasValidation ? 'Test passed' : 'Missing input validation' },
        { name: 'Secure password comparison', passed: hasSecureComparison, message: hasSecureComparison ? 'Test passed' : 'Vulnerable to timing attacks' }
      ]
    }
    
    results.passed = results.tests.filter(t => t.passed).length
    setTestResults(results)
    setIsRunning(false)
  }

  const submitSolution = () => {
    const score = testResults ? (testResults.passed / testResults.total) * 100 : 0
    onSubmit({
      code,
      testResults,
      score,
      challenge: currentChallenge
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`bg-gray-900 rounded-lg border border-gray-700 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{currentChallenge.title}</h3>
            <p className="text-sm text-gray-400">{currentChallenge.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-0 h-96">
        {/* Code Editor */}
        <div className="border-r border-gray-700">
          <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-400 ml-2">main.js</span>
            </div>
          </div>
          
          <div className="h-full bg-gray-900">
            <textarea
              ref={editorRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none"
              style={{ minHeight: '320px' }}
              spellCheck={false}
            />
          </div>
        </div>

        {/* Test Panel */}
        <div className="bg-gray-800">
          <div className="px-4 py-2 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">Test Results</span>
              <Button
                variant="primary"
                size="sm"
                onClick={runCode}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRunning ? 'Running...' : 'Run Tests'}
              </Button>
            </div>
          </div>
          
          <div className="p-4 h-full overflow-y-auto">
            {testResults ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">
                    {testResults.passed}/{testResults.total} Tests Passed
                  </span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    testResults.passed === testResults.total 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {Math.round((testResults.passed / testResults.total) * 100)}%
                  </div>
                </div>
                
                {testResults.tests.map((test, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs ${
                      test.passed ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {test.passed ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{test.name}</div>
                      <div className={`text-xs ${test.passed ? 'text-green-400' : 'text-red-400'}`}>
                        {test.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400 mt-8">
                <div className="text-4xl mb-2">🧪</div>
                <div>Run tests to see results</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hints Panel */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-white">💡 Hints:</span>
        </div>
        <div className="space-y-1">
          {currentChallenge.hints.map((hint, index) => (
            <div key={index} className="text-sm text-gray-400">
              • {hint}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Complete the challenge to earn points
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={submitSolution}
              disabled={!testResults || testResults.passed === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Solution
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
