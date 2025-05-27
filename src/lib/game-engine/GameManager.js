import { SceneManager } from '../three/scene.js'
import { CameraControls } from '../three/controls.js'
import { OfficeEnvironment } from '../three/OfficeEnvironment.js'
import { CharacterController } from './CharacterController.js'
import { QuestSystem } from './QuestSystem.js'

export class GameManager {
  constructor(canvas) {
    this.canvas = canvas
    this.sceneManager = null
    this.controls = null
    this.officeEnvironment = null
    this.characterController = null
    this.questSystem = null
    this.isRunning = false
    this.animationId = null

    // Game state
    this.gameState = {
      currentLevel: 1,
      score: 0,
      timeElapsed: 0,
      isPlaying: false,
      isPaused: false,
      currentRole: null,
      currentQuest: null,
      nearWorkstation: null
    }

    // Performance monitoring
    this.stats = {
      fps: 0,
      frameCount: 0,
      lastTime: performance.now()
    }

    this.init()
  }

  init() {
    try {
      this.sceneManager = new SceneManager(this.canvas)
      this.controls = new CameraControls(this.sceneManager.camera, this.canvas)
      this.officeEnvironment = new OfficeEnvironment(this.sceneManager.scene)
      this.characterController = new CharacterController(this.sceneManager.scene, this.sceneManager.camera, this.canvas)
      this.questSystem = new QuestSystem()
      this.setupEventListeners()
      this.start()
    } catch (error) {
      console.error('Failed to initialize GameManager:', error)
      this.handleError(error)
    }
  }

  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', this.handleResize.bind(this))

    // Visibility change (pause when tab is hidden)
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this))

    // Keyboard controls
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
    window.addEventListener('keyup', this.handleKeyUp.bind(this))

    // Game events (character controller handles canvas clicks for movement)
  }

  handleResize() {
    if (this.sceneManager) {
      this.sceneManager.resize()
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.pause()
    } else {
      this.resume()
    }
  }

  handleKeyDown(event) {
    switch (event.code) {
      case 'Space':
        event.preventDefault()
        this.togglePause()
        break
      case 'KeyR':
        event.preventDefault()
        this.restart()
        break
      case 'Escape':
        event.preventDefault()
        this.showMenu()
        break
    }
  }

  handleKeyUp(event) {
    // Handle key release events
  }

  // Canvas clicks are now handled by CharacterController for movement

  start() {
    if (this.isRunning) return

    this.isRunning = true
    this.gameLoop()
  }

  stop() {
    if (!this.isRunning) return

    this.isRunning = false
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
  }

  pause() {
    this.gameState.isPaused = true
  }

  resume() {
    this.gameState.isPaused = false
  }

  togglePause() {
    if (this.gameState.isPaused) {
      this.resume()
    } else {
      this.pause()
    }
  }

  restart() {
    this.gameState = {
      currentLevel: 1,
      score: 0,
      timeElapsed: 0,
      isPlaying: false,
      isPaused: false
    }
    this.startGame()
  }

  startGame() {
    this.gameState.isPlaying = true
    this.gameState.isPaused = false
    this.gameState.timeElapsed = 0
  }

  endGame() {
    this.gameState.isPlaying = false
    this.gameState.isPaused = false
    // Handle game over logic
  }

  showMenu() {
    this.pause()
    // Show game menu
  }

  gameLoop() {
    if (!this.isRunning) return

    const currentTime = performance.now()
    const deltaTime = currentTime - this.stats.lastTime

    // Update FPS counter
    this.stats.frameCount++
    if (deltaTime >= 1000) {
      this.stats.fps = Math.round((this.stats.frameCount * 1000) / deltaTime)
      this.stats.frameCount = 0
      this.stats.lastTime = currentTime
    }

    // Update game logic only if not paused
    if (!this.gameState.isPaused) {
      this.update(deltaTime)
    }

    // Always render (even when paused)
    this.render()

    this.animationId = requestAnimationFrame(this.gameLoop.bind(this))
  }

  update(deltaTime) {
    // Convert deltaTime from milliseconds to seconds for consistent physics
    const deltaTimeSeconds = deltaTime / 1000

    // Update game time
    if (this.gameState.isPlaying) {
      this.gameState.timeElapsed += deltaTime
    }

    // Update controls
    if (this.controls) {
      this.controls.update()
    }

    // Update game-specific logic with seconds-based deltaTime
    this.updateGameLogic(deltaTimeSeconds)
  }

  updateGameLogic(deltaTime) {
    // Update character controller
    if (this.characterController) {
      this.characterController.update(deltaTime)

      // Check proximity to workstations
      this.checkWorkstationProximity()
    }

    // Update quest system
    if (this.questSystem && this.gameState.currentQuest) {
      // Simulate quest progress based on time and interactions
      this.updateQuestProgress(deltaTime)
    }

    // Update game score
    if (this.gameState.isPlaying) {
      this.updateScore(deltaTime)
    }
  }

  checkWorkstationProximity() {
    if (!this.officeEnvironment || !this.characterController) return

    const characterPosition = this.characterController.getPosition()
    const workstations = this.officeEnvironment.getAllWorkstations()

    let nearestWorkstation = null
    let minDistance = Infinity

    workstations.forEach(station => {
      const stationPosition = station.userData.interactionPoint
      const distance = characterPosition.distanceTo(stationPosition)

      if (distance < 3 && distance < minDistance) {
        minDistance = distance
        nearestWorkstation = station.userData.role
      }
    })

    if (nearestWorkstation !== this.gameState.nearWorkstation) {
      this.gameState.nearWorkstation = nearestWorkstation

      // Trigger workstation interaction UI
      if (nearestWorkstation) {
        this.onWorkstationEnter(nearestWorkstation)
      } else {
        this.onWorkstationExit()
      }
    }
  }

  onWorkstationEnter(role) {
    // This can be overridden by the UI to show interaction prompts
    console.log(`Near ${role} workstation - Press E to interact`)
  }

  onWorkstationExit() {
    // This can be overridden by the UI to hide interaction prompts
    console.log('Left workstation area')
  }

  updateQuestProgress(deltaTime) {
    if (!this.gameState.currentQuest) return

    // Simulate progress based on time spent at appropriate workstation
    if (this.gameState.nearWorkstation === this.gameState.currentRole) {
      const progressIncrement = deltaTime / 1000 * 0.01 // 1% per second

      this.questSystem.updateProgress({
        type: 'time_progress',
        data: { deltaTime, workstation: this.gameState.nearWorkstation }
      })

      this.gameState.currentQuest = this.questSystem.getCurrentQuest()
    }
  }

  updateScore(deltaTime) {
    // Base score increment
    this.gameState.score += Math.floor(deltaTime / 100)

    // Bonus for quest completion
    if (this.gameState.currentQuest) {
      this.gameState.score = this.gameState.currentQuest.score || this.gameState.score
    }
  }

  render() {
    if (this.sceneManager) {
      this.sceneManager.update()
    }
  }

  // Utility methods
  addObject(object) {
    if (this.sceneManager) {
      this.sceneManager.addObject(object)
    }
  }

  removeObject(object) {
    if (this.sceneManager) {
      this.sceneManager.removeObject(object)
    }
  }

  getCamera() {
    return this.sceneManager ? this.sceneManager.camera : null
  }

  getScene() {
    return this.sceneManager ? this.sceneManager.scene : null
  }

  getRenderer() {
    return this.sceneManager ? this.sceneManager.renderer : null
  }

  // Performance monitoring
  getFPS() {
    return this.stats.fps
  }

  getGameState() {
    return { ...this.gameState }
  }

  setGameState(newState) {
    this.gameState = { ...this.gameState, ...newState }
  }

  // Error handling
  handleError(error) {
    console.error('GameManager Error:', error)
    // Could emit events or show error UI here
  }

  // Role-specific methods
  setRole(role) {
    this.gameState.currentRole = role

    // Start a quest for the selected role
    if (this.questSystem) {
      const quest = this.questSystem.startQuest(role)
      this.gameState.currentQuest = quest
    }

    // Move character to appropriate workstation
    if (this.characterController && this.officeEnvironment) {
      const workstationPosition = this.officeEnvironment.getInteractionPoint(role)
      if (workstationPosition) {
        this.characterController.moveToPosition(workstationPosition)
      }
    }
  }

  interactWithWorkstation() {
    if (!this.gameState.nearWorkstation || this.gameState.nearWorkstation !== this.gameState.currentRole) {
      return false
    }

    // This would open the appropriate assessment interface
    console.log(`Interacting with ${this.gameState.nearWorkstation} workstation`)
    return true
  }

  completeCurrentQuest() {
    if (this.questSystem && this.gameState.currentQuest) {
      const completedQuest = this.questSystem.completeQuest()
      this.gameState.currentQuest = null

      // Award bonus points
      if (completedQuest) {
        this.gameState.score += completedQuest.finalScore
        this.gameState.currentLevel += 1
      }

      return completedQuest
    }
    return null
  }

  getAvailableRoles() {
    return ['developer', 'designer', 'manager', 'data']
  }

  getCurrentQuest() {
    return this.gameState.currentQuest
  }

  getQuestHistory() {
    return this.questSystem ? this.questSystem.getQuestHistory() : []
  }

  // Cleanup
  dispose() {
    this.stop()

    if (this.characterController) {
      this.characterController.dispose()
    }

    if (this.officeEnvironment) {
      this.officeEnvironment.dispose()
    }

    if (this.controls) {
      this.controls.dispose()
    }

    if (this.sceneManager) {
      this.sceneManager.dispose()
    }

    // Remove event listeners
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
    // Canvas click listener removed (handled by CharacterController)
  }
}
