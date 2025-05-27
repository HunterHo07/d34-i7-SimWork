'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeEditor from './CodeEditor'
import DesignCanvas from './DesignCanvas'
import Button from '@/components/ui/Button'

export default function AssessmentModal({
  isOpen = false,
  role = null,
  challenge = null,
  onSubmit = () => {},
  onClose = () => {}
}) {
  // Ensure challenge has default structure
  const safeChallenge = challenge || {
    title: 'Assessment Challenge',
    description: 'Complete this assessment',
    requirements: [],
    constraints: []
  }
  const [currentTool, setCurrentTool] = useState(null)
  const [results, setResults] = useState(null)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (isOpen && role) {
      // Set the appropriate tool based on role
      switch (role) {
        case 'developer':
          setCurrentTool('code')
          break
        case 'designer':
          setCurrentTool('design')
          break
        case 'manager':
          setCurrentTool('project')
          break
        case 'data':
          setCurrentTool('data')
          break
        default:
          setCurrentTool('code')
      }
    }
  }, [isOpen, role])

  const handleToolSubmit = (result) => {
    setResults(result)
    setIsCompleted(true)
  }

  const handleFinalSubmit = () => {
    onSubmit(results)
    handleClose()
  }

  const handleClose = () => {
    setCurrentTool(null)
    setResults(null)
    setIsCompleted(false)
    onClose()
  }

  const renderTool = () => {
    switch (currentTool) {
      case 'code':
        return (
          <CodeEditor
            challenge={safeChallenge}
            onSubmit={handleToolSubmit}
            onClose={handleClose}
            className="h-full"
          />
        )
      case 'design':
        return (
          <DesignCanvas
            challenge={safeChallenge}
            onSubmit={handleToolSubmit}
            onClose={handleClose}
            className="h-full"
          />
        )
      case 'project':
        return (
          <ProjectManager
            challenge={safeChallenge}
            onSubmit={handleToolSubmit}
            onClose={handleClose}
            className="h-full"
          />
        )
      case 'data':
        return (
          <DataProcessor
            challenge={safeChallenge}
            onSubmit={handleToolSubmit}
            onClose={handleClose}
            className="h-full"
          />
        )
      default:
        return null
    }
  }

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-8 text-center max-w-md mx-auto"
    >
      <div className="text-6xl mb-4">🎉</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Assessment Complete!</h3>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <div className="text-3xl font-bold text-blue-600 mb-2">
          {results?.score || 0}
        </div>
        <div className="text-sm text-gray-600">Final Score</div>

        {results?.testResults && (
          <div className="mt-4 text-sm">
            <div className="text-gray-700">
              Tests Passed: {results.testResults.passed}/{results.testResults.total}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Accuracy:</span>
          <span className="font-medium">
            {Math.round((results?.score || 0) * 0.9)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Speed:</span>
          <span className="font-medium">
            {Math.round((results?.score || 0) * 0.8)}%
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quality:</span>
          <span className="font-medium">
            {Math.round((results?.score || 0) * 0.95)}%
          </span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={handleClose}
          className="flex-1"
        >
          Try Again
        </Button>
        <Button
          variant="primary"
          onClick={handleFinalSubmit}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          Submit Results
        </Button>
      </div>
    </motion.div>
  )

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-6xl max-h-[90vh] overflow-hidden"
        >
          {isCompleted ? renderResults() : renderTool()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Placeholder components for other assessment tools
function ProjectManager({ challenge, onSubmit, onClose, className }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Define project scope', status: 'todo', priority: 'high' },
    { id: 2, title: 'Allocate team resources', status: 'todo', priority: 'medium' },
    { id: 3, title: 'Create timeline', status: 'todo', priority: 'high' },
    { id: 4, title: 'Risk assessment', status: 'todo', priority: 'low' }
  ])

  const moveTask = (taskId, newStatus) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const calculateScore = () => {
    const completedTasks = tasks.filter(task => task.status === 'done').length
    return Math.round((completedTasks / tasks.length) * 100)
  }

  const submitProject = () => {
    onSubmit({
      tasks,
      score: calculateScore(),
      challenge
    })
  }

  return (
    <div className={`bg-gray-900 rounded-lg ${className}`}>
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Project Management Dashboard</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-700">✕</Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {['todo', 'doing', 'done'].map(status => (
            <div key={status} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="font-medium mb-4 capitalize text-white">{status}</h4>
              <div className="space-y-2">
                {tasks.filter(task => task.status === status).map(task => (
                  <div
                    key={task.id}
                    className="bg-gray-700 p-3 rounded border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      const nextStatus = status === 'todo' ? 'doing' : status === 'doing' ? 'done' : 'todo'
                      moveTask(task.id, nextStatus)
                    }}
                  >
                    <div className="font-medium text-sm text-white">{task.title}</div>
                    <div className={`text-xs mt-1 px-2 py-1 rounded inline-block font-medium ${
                      task.priority === 'high' ? 'bg-red-600 text-white' :
                      task.priority === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-green-600 text-white'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-200">
            Score: {calculateScore()}/100
          </div>
          <Button variant="primary" onClick={submitProject}>
            Submit Project Plan
          </Button>
        </div>
      </div>
    </div>
  )
}

function DataProcessor({ challenge, onSubmit, onClose, className }) {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'valid' },
    { id: 2, name: '', email: 'invalid-email', status: 'invalid' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', status: 'valid' },
    { id: 4, name: 'Bob Johnson', email: '', status: 'invalid' }
  ])

  const [processed, setProcessed] = useState(0)

  const processData = () => {
    // Simulate data processing
    const validRecords = data.filter(record => record.status === 'valid').length
    const accuracy = (validRecords / data.length) * 100
    setProcessed(validRecords)

    setTimeout(() => {
      onSubmit({
        processedRecords: validRecords,
        totalRecords: data.length,
        accuracy,
        score: Math.round(accuracy),
        challenge
      })
    }, 1000)
  }

  return (
    <div className={`bg-gray-900 rounded-lg ${className}`}>
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Data Processing Interface</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-700">✕</Button>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-medium mb-4 text-white">Customer Data Validation</h4>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-600 rounded-lg overflow-hidden">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-white">ID</th>
                  <th className="px-4 py-2 text-left text-white">Name</th>
                  <th className="px-4 py-2 text-left text-white">Email</th>
                  <th className="px-4 py-2 text-left text-white">Status</th>
                </tr>
              </thead>
              <tbody className="bg-gray-700">
                {data.map(record => (
                  <tr key={record.id} className="border-t border-gray-600">
                    <td className="px-4 py-2 text-white">{record.id}</td>
                    <td className="px-4 py-2 text-white">{record.name || '—'}</td>
                    <td className="px-4 py-2 text-white">{record.email || '—'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        record.status === 'valid'
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-200">
            Valid Records: {data.filter(r => r.status === 'valid').length}/{data.length}
          </div>
          <Button variant="primary" onClick={processData}>
            Process Data
          </Button>
        </div>
      </div>
    </div>
  )
}
