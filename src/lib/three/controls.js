import * as THREE from 'three'

export class CameraControls {
  constructor(camera, domElement) {
    this.camera = camera
    this.domElement = domElement
    
    // Control settings
    this.enabled = true
    this.enableDamping = true
    this.dampingFactor = 0.05
    this.enableZoom = true
    this.enableRotate = true
    this.enablePan = true
    
    // Limits
    this.minDistance = 5
    this.maxDistance = 50
    this.minPolarAngle = 0
    this.maxPolarAngle = Math.PI / 2
    
    // Internal state
    this.target = new THREE.Vector3()
    this.spherical = new THREE.Spherical()
    this.sphericalDelta = new THREE.Spherical()
    this.scale = 1
    this.panOffset = new THREE.Vector3()
    
    // Mouse/touch state
    this.rotateStart = new THREE.Vector2()
    this.rotateEnd = new THREE.Vector2()
    this.rotateDelta = new THREE.Vector2()
    this.panStart = new THREE.Vector2()
    this.panEnd = new THREE.Vector2()
    this.panDelta = new THREE.Vector2()
    this.zoomStart = new THREE.Vector2()
    this.zoomEnd = new THREE.Vector2()
    this.zoomDelta = new THREE.Vector2()
    
    // State tracking
    this.state = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    }
    this.currentState = this.state.NONE
    
    this.init()
  }

  init() {
    this.addEventListeners()
    this.update()
  }

  addEventListeners() {
    // Mouse events
    this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this))
    this.domElement.addEventListener('contextmenu', this.onContextMenu.bind(this))
    
    // Touch events
    this.domElement.addEventListener('touchstart', this.onTouchStart.bind(this))
    this.domElement.addEventListener('touchend', this.onTouchEnd.bind(this))
    this.domElement.addEventListener('touchmove', this.onTouchMove.bind(this))
    
    // Window events
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
  }

  onMouseDown(event) {
    if (!this.enabled) return
    
    event.preventDefault()
    
    switch (event.button) {
      case 0: // Left mouse button
        if (this.enableRotate) {
          this.handleMouseDownRotate(event)
          this.currentState = this.state.ROTATE
        }
        break
      case 1: // Middle mouse button
        if (this.enableZoom) {
          this.handleMouseDownDolly(event)
          this.currentState = this.state.DOLLY
        }
        break
      case 2: // Right mouse button
        if (this.enablePan) {
          this.handleMouseDownPan(event)
          this.currentState = this.state.PAN
        }
        break
    }
  }

  onMouseMove(event) {
    if (!this.enabled) return
    
    event.preventDefault()
    
    switch (this.currentState) {
      case this.state.ROTATE:
        if (this.enableRotate) {
          this.handleMouseMoveRotate(event)
        }
        break
      case this.state.DOLLY:
        if (this.enableZoom) {
          this.handleMouseMoveDolly(event)
        }
        break
      case this.state.PAN:
        if (this.enablePan) {
          this.handleMouseMovePan(event)
        }
        break
    }
  }

  onMouseUp() {
    if (!this.enabled) return
    this.currentState = this.state.NONE
  }

  onMouseWheel(event) {
    if (!this.enabled || !this.enableZoom) return
    
    event.preventDefault()
    this.handleMouseWheel(event)
  }

  onTouchStart(event) {
    if (!this.enabled) return
    
    event.preventDefault()
    
    switch (event.touches.length) {
      case 1: // Single touch - rotate
        if (this.enableRotate) {
          this.handleTouchStartRotate(event)
          this.currentState = this.state.TOUCH_ROTATE
        }
        break
      case 2: // Two touches - zoom and pan
        if (this.enableZoom && this.enablePan) {
          this.handleTouchStartDollyPan(event)
          this.currentState = this.state.TOUCH_DOLLY_PAN
        }
        break
    }
  }

  onTouchMove(event) {
    if (!this.enabled) return
    
    event.preventDefault()
    
    switch (this.currentState) {
      case this.state.TOUCH_ROTATE:
        if (this.enableRotate) {
          this.handleTouchMoveRotate(event)
        }
        break
      case this.state.TOUCH_DOLLY_PAN:
        if (this.enableZoom && this.enablePan) {
          this.handleTouchMoveDollyPan(event)
        }
        break
    }
  }

  onTouchEnd() {
    if (!this.enabled) return
    this.currentState = this.state.NONE
  }

  onContextMenu(event) {
    if (!this.enabled) return
    event.preventDefault()
  }

  // Mouse handlers
  handleMouseDownRotate(event) {
    this.rotateStart.set(event.clientX, event.clientY)
  }

  handleMouseMoveRotate(event) {
    this.rotateEnd.set(event.clientX, event.clientY)
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(0.01)
    
    this.sphericalDelta.theta -= this.rotateDelta.x
    this.sphericalDelta.phi -= this.rotateDelta.y
    
    this.rotateStart.copy(this.rotateEnd)
  }

  handleMouseDownPan(event) {
    this.panStart.set(event.clientX, event.clientY)
  }

  handleMouseMovePan(event) {
    this.panEnd.set(event.clientX, event.clientY)
    this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(0.01)
    
    this.pan(this.panDelta.x, this.panDelta.y)
    
    this.panStart.copy(this.panEnd)
  }

  handleMouseDownDolly(event) {
    this.zoomStart.set(event.clientX, event.clientY)
  }

  handleMouseMoveDolly(event) {
    this.zoomEnd.set(event.clientX, event.clientY)
    this.zoomDelta.subVectors(this.zoomEnd, this.zoomStart)
    
    if (this.zoomDelta.y > 0) {
      this.dollyOut()
    } else if (this.zoomDelta.y < 0) {
      this.dollyIn()
    }
    
    this.zoomStart.copy(this.zoomEnd)
  }

  handleMouseWheel(event) {
    if (event.deltaY < 0) {
      this.dollyIn()
    } else if (event.deltaY > 0) {
      this.dollyOut()
    }
  }

  // Touch handlers
  handleTouchStartRotate(event) {
    this.rotateStart.set(event.touches[0].pageX, event.touches[0].pageY)
  }

  handleTouchMoveRotate(event) {
    this.rotateEnd.set(event.touches[0].pageX, event.touches[0].pageY)
    this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart).multiplyScalar(0.01)
    
    this.sphericalDelta.theta -= this.rotateDelta.x
    this.sphericalDelta.phi -= this.rotateDelta.y
    
    this.rotateStart.copy(this.rotateEnd)
  }

  handleTouchStartDollyPan(event) {
    if (this.enableZoom) {
      const dx = event.touches[0].pageX - event.touches[1].pageX
      const dy = event.touches[0].pageY - event.touches[1].pageY
      const distance = Math.sqrt(dx * dx + dy * dy)
      this.zoomStart.set(0, distance)
    }
    
    if (this.enablePan) {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX)
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY)
      this.panStart.set(x, y)
    }
  }

  handleTouchMoveDollyPan(event) {
    if (this.enableZoom) {
      const dx = event.touches[0].pageX - event.touches[1].pageX
      const dy = event.touches[0].pageY - event.touches[1].pageY
      const distance = Math.sqrt(dx * dx + dy * dy)
      this.zoomEnd.set(0, distance)
      this.zoomDelta.set(0, Math.pow(this.zoomEnd.y / this.zoomStart.y, 0.5))
      
      this.dollyOut(this.zoomDelta.y)
      this.zoomStart.copy(this.zoomEnd)
    }
    
    if (this.enablePan) {
      const x = 0.5 * (event.touches[0].pageX + event.touches[1].pageX)
      const y = 0.5 * (event.touches[0].pageY + event.touches[1].pageY)
      this.panEnd.set(x, y)
      this.panDelta.subVectors(this.panEnd, this.panStart).multiplyScalar(0.01)
      
      this.pan(this.panDelta.x, this.panDelta.y)
      this.panStart.copy(this.panEnd)
    }
  }

  // Camera manipulation
  dollyIn(dollyScale = 0.95) {
    this.scale *= dollyScale
  }

  dollyOut(dollyScale = 1.05) {
    this.scale *= dollyScale
  }

  pan(deltaX, deltaY) {
    const offset = new THREE.Vector3()
    offset.copy(this.camera.position).sub(this.target)
    
    let targetDistance = offset.length()
    targetDistance *= Math.tan((this.camera.fov / 2) * Math.PI / 180.0)
    
    const panLeft = new THREE.Vector3()
    panLeft.setFromMatrixColumn(this.camera.matrix, 0)
    panLeft.multiplyScalar(-2 * deltaX * targetDistance / this.domElement.clientHeight)
    
    const panUp = new THREE.Vector3()
    panUp.setFromMatrixColumn(this.camera.matrix, 1)
    panUp.multiplyScalar(2 * deltaY * targetDistance / this.domElement.clientHeight)
    
    this.panOffset.copy(panLeft).add(panUp)
  }

  update() {
    const offset = new THREE.Vector3()
    const quat = new THREE.Quaternion().setFromUnitVectors(this.camera.up, new THREE.Vector3(0, 1, 0))
    const quatInverse = quat.clone().invert()
    
    offset.copy(this.camera.position).sub(this.target)
    offset.applyQuaternion(quat)
    
    this.spherical.setFromVector3(offset)
    
    if (this.enableDamping) {
      this.spherical.theta += this.sphericalDelta.theta * this.dampingFactor
      this.spherical.phi += this.sphericalDelta.phi * this.dampingFactor
    } else {
      this.spherical.theta += this.sphericalDelta.theta
      this.spherical.phi += this.sphericalDelta.phi
    }
    
    this.spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this.spherical.phi))
    this.spherical.makeSafe()
    this.spherical.radius *= this.scale
    this.spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this.spherical.radius))
    
    this.target.add(this.panOffset)
    
    offset.setFromSpherical(this.spherical)
    offset.applyQuaternion(quatInverse)
    
    this.camera.position.copy(this.target).add(offset)
    this.camera.lookAt(this.target)
    
    if (this.enableDamping) {
      this.sphericalDelta.theta *= (1 - this.dampingFactor)
      this.sphericalDelta.phi *= (1 - this.dampingFactor)
    } else {
      this.sphericalDelta.set(0, 0, 0)
    }
    
    this.scale = 1
    this.panOffset.set(0, 0, 0)
  }

  dispose() {
    this.domElement.removeEventListener('mousedown', this.onMouseDown)
    this.domElement.removeEventListener('wheel', this.onMouseWheel)
    this.domElement.removeEventListener('contextmenu', this.onContextMenu)
    this.domElement.removeEventListener('touchstart', this.onTouchStart)
    this.domElement.removeEventListener('touchend', this.onTouchEnd)
    this.domElement.removeEventListener('touchmove', this.onTouchMove)
    
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  }
}
