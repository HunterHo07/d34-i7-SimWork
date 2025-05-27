import * as THREE from 'three'

export class CharacterController {
  constructor(scene, camera, canvas = null) {
    this.scene = scene
    this.camera = camera
    this.canvas = canvas
    this.character = null
    this.targetPosition = new THREE.Vector3()
    this.currentPosition = new THREE.Vector3(0, 0, 8)
    this.isMoving = false
    this.moveSpeed = 1.2
    this.rotationSpeed = 10

    // Input handling
    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false
    }

    // Mobile touch controls
    this.touchControls = {
      isActive: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    }

    this.init()
  }

  init() {
    this.createCharacter()
    this.setupControls()
    this.updateCameraPosition()
  }

  createCharacter() {
    const characterGroup = new THREE.Group()

    // Body
    const bodyGeometry = new THREE.CapsuleGeometry(0.3, 1.2)
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x3498db })
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
    body.position.y = 0.9
    body.castShadow = true
    characterGroup.add(body)

    // Head
    const headGeometry = new THREE.SphereGeometry(0.2)
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 })
    const head = new THREE.Mesh(headGeometry, headMaterial)
    head.position.y = 1.7
    head.castShadow = true
    characterGroup.add(head)

    // Simple face
    const eyeGeometry = new THREE.SphereGeometry(0.03)
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })

    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    leftEye.position.set(-0.08, 1.75, 0.15)
    characterGroup.add(leftEye)

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    rightEye.position.set(0.08, 1.75, 0.15)
    characterGroup.add(rightEye)

    // Arms
    const armGeometry = new THREE.CapsuleGeometry(0.1, 0.6)
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 })

    const leftArm = new THREE.Mesh(armGeometry, armMaterial)
    leftArm.position.set(-0.4, 1.2, 0)
    leftArm.castShadow = true
    characterGroup.add(leftArm)

    const rightArm = new THREE.Mesh(armGeometry, armMaterial)
    rightArm.position.set(0.4, 1.2, 0)
    rightArm.castShadow = true
    characterGroup.add(rightArm)

    // Legs
    const legGeometry = new THREE.CapsuleGeometry(0.12, 0.8)
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 })

    const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
    leftLeg.position.set(-0.15, 0.4, 0)
    leftLeg.castShadow = true
    characterGroup.add(leftLeg)

    const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
    rightLeg.position.set(0.15, 0.4, 0)
    rightLeg.castShadow = true
    characterGroup.add(rightLeg)

    characterGroup.position.copy(this.currentPosition)
    characterGroup.userData = { type: 'character' }

    this.character = characterGroup
    this.scene.add(characterGroup)
  }

  setupControls() {
    // Keyboard controls
    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))

    // Mouse controls for movement - only on canvas if available
    if (this.canvas) {
      this.canvas.addEventListener('click', this.onMouseClick.bind(this))
      this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this))
      this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this))
      this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this))
    } else {
      // Fallback to document if no canvas provided
      document.addEventListener('click', this.onMouseClick.bind(this))
      document.addEventListener('touchstart', this.onTouchStart.bind(this))
      document.addEventListener('touchmove', this.onTouchMove.bind(this))
      document.addEventListener('touchend', this.onTouchEnd.bind(this))
    }
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = true
        break
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = true
        break
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = true
        break
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = true
        break
    }
  }

  onKeyUp(event) {
    switch (event.code) {
      case 'KeyW':
      case 'ArrowUp':
        this.keys.forward = false
        break
      case 'KeyS':
      case 'ArrowDown':
        this.keys.backward = false
        break
      case 'KeyA':
      case 'ArrowLeft':
        this.keys.left = false
        break
      case 'KeyD':
      case 'ArrowRight':
        this.keys.right = false
        break
    }
  }

  onMouseClick(event) {
    // Prevent event bubbling to avoid conflicts
    event.stopPropagation()

    // Get canvas bounds for accurate mouse position
    const rect = this.canvas ? this.canvas.getBoundingClientRect() : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight }

    // Convert mouse position to world coordinates
    const mouse = new THREE.Vector2()
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.camera)

    // Raycast to floor
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const intersection = new THREE.Vector3()
    raycaster.ray.intersectPlane(floorPlane, intersection)

    if (intersection) {
      this.moveToPosition(intersection)
    }
  }

  onTouchStart(event) {
    if (event.touches.length === 1) {
      this.touchControls.isActive = true
      this.touchControls.startX = event.touches[0].clientX
      this.touchControls.startY = event.touches[0].clientY
    }
  }

  onTouchMove(event) {
    if (this.touchControls.isActive && event.touches.length === 1) {
      this.touchControls.currentX = event.touches[0].clientX
      this.touchControls.currentY = event.touches[0].clientY
    }
  }

  onTouchEnd(event) {
    if (this.touchControls.isActive) {
      const deltaX = this.touchControls.currentX - this.touchControls.startX
      const deltaY = this.touchControls.currentY - this.touchControls.startY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      // If it's a tap (small movement), treat as click
      if (distance < 10) {
        const mouse = new THREE.Vector2()
        mouse.x = (this.touchControls.startX / window.innerWidth) * 2 - 1
        mouse.y = -(this.touchControls.startY / window.innerHeight) * 2 + 1

        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(mouse, this.camera)

        const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const intersection = new THREE.Vector3()
        raycaster.ray.intersectPlane(floorPlane, intersection)

        if (intersection) {
          this.moveToPosition(intersection)
        }
      }

      this.touchControls.isActive = false
    }
  }

  moveToPosition(position) {
    this.targetPosition.copy(position)
    this.targetPosition.y = 0 // Keep on ground
    this.isMoving = true
  }

  update(deltaTime) {
    if (!this.character) return

    const moveVector = new THREE.Vector3()

    // Handle keyboard movement
    if (this.keys.forward) moveVector.z -= 1
    if (this.keys.backward) moveVector.z += 1
    if (this.keys.left) moveVector.x -= 1
    if (this.keys.right) moveVector.x += 1

    // Normalize and apply speed
    if (moveVector.length() > 0) {
      moveVector.normalize()
      moveVector.multiplyScalar(this.moveSpeed * deltaTime)

      this.currentPosition.add(moveVector)
      this.character.position.copy(this.currentPosition)

      // Rotate character to face movement direction
      if (moveVector.length() > 0) {
        const angle = Math.atan2(moveVector.x, moveVector.z)
        this.character.rotation.y = angle
      }
    }

    // Handle click-to-move
    if (this.isMoving) {
      const direction = new THREE.Vector3()
      direction.subVectors(this.targetPosition, this.currentPosition)
      const distance = direction.length()

      if (distance > 0.1) {
        direction.normalize()
        direction.multiplyScalar(this.moveSpeed * deltaTime)

        this.currentPosition.add(direction)
        this.character.position.copy(this.currentPosition)

        // Rotate character to face target
        const angle = Math.atan2(direction.x, direction.z)
        this.character.rotation.y = angle

        // Simple walking animation
        this.animateWalking(deltaTime)
      } else {
        this.isMoving = false
      }
    }

    // Keep character within bounds
    this.currentPosition.x = Math.max(-18, Math.min(18, this.currentPosition.x))
    this.currentPosition.z = Math.max(-13, Math.min(13, this.currentPosition.z))
    this.character.position.copy(this.currentPosition)

    this.updateCameraPosition()
  }

  animateWalking(deltaTime) {
    if (!this.character) return

    // Simple bobbing animation
    const time = Date.now() * 0.01
    const bobAmount = 0.05
    this.character.position.y = Math.sin(time) * bobAmount

    // Arm swinging
    const arms = this.character.children.filter(child =>
      child.position.x !== 0 && child.position.y > 1
    )
    arms.forEach((arm, index) => {
      const swingAmount = 0.2
      arm.rotation.x = Math.sin(time + index * Math.PI) * swingAmount
    })
  }

  updateCameraPosition() {
    if (!this.character) return

    // Third-person camera follow
    const cameraOffset = new THREE.Vector3(0, 8, 12)
    const desiredPosition = new THREE.Vector3()
    desiredPosition.copy(this.character.position).add(cameraOffset)

    // Smooth camera movement
    this.camera.position.lerp(desiredPosition, 0.05)

    // Look at character
    const lookAtTarget = new THREE.Vector3()
    lookAtTarget.copy(this.character.position)
    lookAtTarget.y += 1
    this.camera.lookAt(lookAtTarget)
  }

  getPosition() {
    return this.currentPosition.clone()
  }

  setPosition(position) {
    this.currentPosition.copy(position)
    if (this.character) {
      this.character.position.copy(position)
    }
    this.updateCameraPosition()
  }

  getDistanceToWorkstation(workstationPosition) {
    return this.currentPosition.distanceTo(workstationPosition)
  }

  isNearWorkstation(workstationPosition, threshold = 2) {
    return this.getDistanceToWorkstation(workstationPosition) < threshold
  }

  dispose() {
    if (this.character) {
      this.scene.remove(this.character)
      this.character = null
    }

    // Remove event listeners
    document.removeEventListener('keydown', this.onKeyDown)
    document.removeEventListener('keyup', this.onKeyUp)

    if (this.canvas) {
      this.canvas.removeEventListener('click', this.onMouseClick)
      this.canvas.removeEventListener('touchstart', this.onTouchStart)
      this.canvas.removeEventListener('touchmove', this.onTouchMove)
      this.canvas.removeEventListener('touchend', this.onTouchEnd)
    } else {
      document.removeEventListener('click', this.onMouseClick)
      document.removeEventListener('touchstart', this.onTouchStart)
      document.removeEventListener('touchmove', this.onTouchMove)
      document.removeEventListener('touchend', this.onTouchEnd)
    }
  }
}
