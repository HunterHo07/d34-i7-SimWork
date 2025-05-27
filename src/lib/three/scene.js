import * as THREE from 'three'

export class SceneManager {
  constructor(canvas) {
    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.camera = null
    this.renderer = null
    this.clock = new THREE.Clock()
    this.mixers = []
    
    this.init()
  }

  init() {
    this.setupRenderer()
    this.setupCamera()
    this.setupLighting()
    this.setupEnvironment()
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.set(0, 5, 10)
    this.camera.lookAt(0, 0, 0)
  }

  setupLighting() {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    this.scene.add(ambientLight)

    // Main directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -10
    directionalLight.shadow.camera.right = 10
    directionalLight.shadow.camera.top = 10
    directionalLight.shadow.camera.bottom = -10
    this.scene.add(directionalLight)

    // Fill light
    const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3)
    fillLight.position.set(-5, 5, -5)
    this.scene.add(fillLight)

    // Point lights for atmosphere
    const pointLight1 = new THREE.PointLight(0xff6b6b, 0.5, 20)
    pointLight1.position.set(5, 3, 5)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4ecdc4, 0.5, 20)
    pointLight2.position.set(-5, 3, -5)
    this.scene.add(pointLight2)
  }

  setupEnvironment() {
    // Create a simple ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50)
    const groundMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2c3e50,
      transparent: true,
      opacity: 0.8
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.scene.add(ground)

    // Add some basic geometry for testing
    const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x3498db })
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    cube.position.set(0, 1, 0)
    cube.castShadow = true
    this.scene.add(cube)

    // Add fog for depth
    this.scene.fog = new THREE.Fog(0x1a1a1a, 20, 100)
  }

  addObject(object) {
    this.scene.add(object)
  }

  removeObject(object) {
    this.scene.remove(object)
  }

  addAnimationMixer(mixer) {
    this.mixers.push(mixer)
  }

  update() {
    const deltaTime = this.clock.getDelta()
    
    // Update animation mixers
    this.mixers.forEach(mixer => mixer.update(deltaTime))
    
    // Render the scene
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    const width = window.innerWidth
    const height = window.innerHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  dispose() {
    this.renderer.dispose()
    this.scene.clear()
    this.mixers.length = 0
  }
}
