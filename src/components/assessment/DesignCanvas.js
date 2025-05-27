'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function DesignCanvas({
  challenge = null,
  onSubmit = () => {},
  onClose = () => {},
  className = ''
}) {
  const canvasRef = useRef(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [selectedColor, setSelectedColor] = useState('#3498db')
  const [isDrawing, setIsDrawing] = useState(false)
  const [elements, setElements] = useState([])
  const [score, setScore] = useState(0)

  // Default challenge if none provided
  const defaultChallenge = {
    title: 'Design SaaS Dashboard',
    description: 'Create a modern, user-friendly dashboard interface',
    requirements: [
      'Header with navigation',
      'Sidebar with menu items',
      'Main content area with cards',
      'Data visualization section',
      'Responsive layout'
    ],
    constraints: [
      'Use modern color scheme',
      'Ensure good visual hierarchy',
      'Include proper spacing',
      'Make it mobile-friendly'
    ]
  }

  const currentChallenge = {
    ...defaultChallenge,
    ...challenge,
    requirements: challenge?.requirements || defaultChallenge.requirements || [],
    constraints: challenge?.constraints || defaultChallenge.constraints || []
  }

  const tools = [
    { id: 'select', name: 'Select', icon: '↖️' },
    { id: 'rectangle', name: 'Rectangle', icon: '⬜' },
    { id: 'circle', name: 'Circle', icon: '⭕' },
    { id: 'text', name: 'Text', icon: 'T' },
    { id: 'line', name: 'Line', icon: '📏' }
  ]

  const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12',
    '#9b59b6', '#1abc9c', '#34495e', '#95a5a6'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }
  }, [])

  const handleMouseDown = (e) => {
    if (selectedTool === 'select') return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)

    const newElement = {
      id: Date.now(),
      type: selectedTool,
      x,
      y,
      width: 0,
      height: 0,
      color: selectedColor
    }

    setElements(prev => [...prev, newElement])
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setElements(prev => {
      const newElements = [...prev]
      const currentElement = newElements[newElements.length - 1]
      currentElement.width = x - currentElement.x
      currentElement.height = y - currentElement.y
      return newElements
    })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    calculateScore()
  }

  const calculateScore = () => {
    // Simple scoring based on number and variety of elements
    const elementTypes = new Set(elements.map(el => el.type))
    const baseScore = elements.length * 10
    const varietyBonus = elementTypes.size * 20
    const newScore = Math.min(100, baseScore + varietyBonus)
    setScore(newScore)
  }

  const drawElements = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Clear and redraw background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw elements
    elements.forEach(element => {
      ctx.fillStyle = element.color
      ctx.strokeStyle = element.color
      ctx.lineWidth = 2

      switch (element.type) {
        case 'rectangle':
          ctx.fillRect(element.x, element.y, element.width, element.height)
          break
        case 'circle':
          const radius = Math.sqrt(element.width ** 2 + element.height ** 2) / 2
          ctx.beginPath()
          ctx.arc(element.x + element.width / 2, element.y + element.height / 2, radius, 0, 2 * Math.PI)
          ctx.fill()
          break
        case 'line':
          ctx.beginPath()
          ctx.moveTo(element.x, element.y)
          ctx.lineTo(element.x + element.width, element.y + element.height)
          ctx.stroke()
          break
        case 'text':
          ctx.font = '16px Arial'
          ctx.fillText('Sample Text', element.x, element.y)
          break
      }
    })
  }

  useEffect(() => {
    drawElements()
  }, [elements])

  const clearCanvas = () => {
    setElements([])
    setScore(0)
  }

  const submitDesign = () => {
    onSubmit({
      elements,
      score,
      challenge: currentChallenge,
      canvas: canvasRef.current.toDataURL()
    })
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
            <p className="text-sm text-gray-300">{currentChallenge.description}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-gray-700"
          >
            ✕
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-0">
        {/* Toolbar */}
        <div className="bg-gray-800 border-r border-gray-700 p-4">
          <div className="space-y-4">
            {/* Tools */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Tools</h4>
              <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`p-2 rounded text-sm border transition-colors ${
                      selectedTool === tool.id
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    <div className="text-lg mb-1">{tool.icon}</div>
                    <div className="text-xs">{tool.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Colors</h4>
              <div className="grid grid-cols-4 gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded border-2 transition-all ${
                      selectedColor === color ? 'border-white scale-110' : 'border-gray-500'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Score */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Score</h4>
              <div className="bg-gray-700 rounded p-2 border border-gray-600">
                <div className="text-2xl font-bold text-blue-400">{score}</div>
                <div className="text-xs text-gray-300">Design Quality</div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearCanvas}
                className="w-full"
              >
                Clear Canvas
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="lg:col-span-3 bg-white">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="w-full h-full cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />
        </div>
      </div>

      {/* Requirements Panel */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Requirements</h4>
            <ul className="space-y-1">
              {currentChallenge.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {req}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-white mb-2">Constraints</h4>
            <ul className="space-y-1">
              {currentChallenge.constraints.map((constraint, index) => (
                <li key={index} className="text-sm text-gray-300 flex items-center">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            Elements: {elements.length} | Score: {score}/100
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
              onClick={submitDesign}
              disabled={elements.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Submit Design
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
