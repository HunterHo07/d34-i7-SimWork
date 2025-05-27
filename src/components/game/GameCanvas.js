'use client'

import { useEffect, useRef, useState } from 'react'
import { GameManager } from '@/lib/game-engine/GameManager'

export default function GameCanvas({
  className = '',
  onGameStateChange = () => {},
  onError = () => {},
  ...props
}) {
  const canvasRef = useRef(null)
  const gameManagerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [gameState, setGameState] = useState({
    currentLevel: 1,
    score: 0,
    timeElapsed: 0,
    isPlaying: false,
    isPaused: false
  })
  const [fps, setFps] = useState(0)

  useEffect(() => {
    if (!canvasRef.current || gameManagerRef.current) return // Prevent multiple instances

    const initializeGame = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Create game manager
        gameManagerRef.current = new GameManager(canvasRef.current)

        // Set up game state monitoring
        const updateGameState = () => {
          if (gameManagerRef.current) {
            const newState = gameManagerRef.current.getGameState()
            const newFps = gameManagerRef.current.getFPS()

            setGameState(newState)
            setFps(newFps)
            onGameStateChange(newState)
          }
        }

        // Update game state every 200ms (reduced frequency)
        const stateInterval = setInterval(updateGameState, 200)

        // Store interval reference for cleanup
        gameManagerRef.current.stateInterval = stateInterval

        setIsLoading(false)
      } catch (err) {
        console.error('Failed to initialize game:', err)
        setError(err.message)
        setIsLoading(false)
        onError(err)
      }
    }

    initializeGame()

    // Cleanup function
    return () => {
      if (gameManagerRef.current) {
        if (gameManagerRef.current.stateInterval) {
          clearInterval(gameManagerRef.current.stateInterval)
        }
        gameManagerRef.current.dispose()
        gameManagerRef.current = null
      }
    }
  }, []) // Remove dependencies to prevent re-initialization

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (gameManagerRef.current) {
        gameManagerRef.current.handleResize()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Game control methods
  const startGame = (role = null) => {
    if (gameManagerRef.current) {
      gameManagerRef.current.startGame()
      if (role) {
        gameManagerRef.current.setRole(role)
      }
    }
  }

  const pauseGame = () => {
    if (gameManagerRef.current) {
      gameManagerRef.current.pause()
    }
  }

  const resumeGame = () => {
    if (gameManagerRef.current) {
      gameManagerRef.current.resume()
    }
  }

  const restartGame = () => {
    if (gameManagerRef.current) {
      gameManagerRef.current.restart()
    }
  }

  const setRole = (role) => {
    if (gameManagerRef.current) {
      gameManagerRef.current.setRole(role)
    }
  }

  const interactWithWorkstation = () => {
    if (gameManagerRef.current) {
      return gameManagerRef.current.interactWithWorkstation()
    }
    return false
  }

  // Expose game controls through ref
  useEffect(() => {
    if (props.ref && typeof props.ref === 'object') {
      props.ref.current = {
        startGame,
        pauseGame,
        resumeGame,
        restartGame,
        setRole,
        interactWithWorkstation,
        getGameState: () => gameState,
        getFPS: () => fps,
        getGameManager: () => gameManagerRef.current
      }
    }
  }, [gameState, fps, props.ref])

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-8 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Failed to load 3D environment
          </div>
          <div className="text-red-500 text-sm mb-4">
            {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-white text-lg font-semibold">
              Loading 3D Environment...
            </div>
            <div className="text-gray-300 text-sm mt-2">
              Initializing SimWork experience
            </div>
          </div>
        </div>
      )}

      {/* Game canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          touchAction: 'none' // Prevent default touch behaviors
        }}
      />

      {/* Game UI overlay */}
      {!isLoading && !error && (
        <div className="absolute top-4 left-4 z-20">
          <div className="bg-black bg-opacity-50 text-white p-3 rounded-lg backdrop-blur-sm">
            <div className="text-sm space-y-1">
              <div>Level: {gameState.currentLevel}</div>
              <div>Score: {gameState.score.toLocaleString()}</div>
              <div>Time: {Math.floor(gameState.timeElapsed / 1000)}s</div>
              <div>FPS: {fps}</div>
            </div>
          </div>
        </div>
      )}

      {/* Game controls */}
      {!isLoading && !error && (
        <div className="absolute bottom-4 right-4 z-20">
          <div className="flex space-x-2">
            {!gameState.isPlaying ? (
              <button
                onClick={startGame}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Start Game
              </button>
            ) : (
              <>
                {gameState.isPaused ? (
                  <button
                    onClick={resumeGame}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={pauseGame}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                  >
                    Pause
                  </button>
                )}
                <button
                  onClick={restartGame}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Restart
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Instructions overlay for new users */}
      {!isLoading && !error && !gameState.isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="text-center text-white bg-black bg-opacity-50 p-6 rounded-lg backdrop-blur-sm pointer-events-auto">
            <h3 className="text-xl font-bold mb-4">Welcome to SimWork</h3>
            <div className="text-sm space-y-2 mb-4">
              <div>• Left click and drag to rotate camera</div>
              <div>• Right click and drag to pan</div>
              <div>• Scroll wheel to zoom</div>
              <div>• Space to pause/resume</div>
              <div>• R to restart</div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Enter SimWork
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
