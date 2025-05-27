import * as THREE from 'three'

export class OfficeEnvironment {
  constructor(scene) {
    this.scene = scene
    this.workstations = []
    this.interactiveObjects = []
    this.init()
  }

  init() {
    this.createFloor()
    this.createWalls()
    this.createCeiling()
    this.createWorkstations()
    this.createLighting()
    this.createDecorations()
  }

  createFloor() {
    // Main floor
    const floorGeometry = new THREE.PlaneGeometry(40, 30)
    const floorMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2c3e50,
      transparent: true,
      opacity: 0.9
    })
    const floor = new THREE.Mesh(floorGeometry, floorMaterial)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = true
    floor.userData = { type: 'floor' }
    this.scene.add(floor)

    // Floor grid pattern
    const gridHelper = new THREE.GridHelper(40, 40, 0x34495e, 0x34495e)
    gridHelper.material.opacity = 0.3
    gridHelper.material.transparent = true
    this.scene.add(gridHelper)
  }

  createWalls() {
    const wallMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x34495e,
      transparent: true,
      opacity: 0.8
    })

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(40, 8)
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial)
    backWall.position.set(0, 4, -15)
    backWall.receiveShadow = true
    this.scene.add(backWall)

    // Side walls
    const sideWallGeometry = new THREE.PlaneGeometry(30, 8)
    
    const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    leftWall.position.set(-20, 4, 0)
    leftWall.rotation.y = Math.PI / 2
    leftWall.receiveShadow = true
    this.scene.add(leftWall)

    const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial)
    rightWall.position.set(20, 4, 0)
    rightWall.rotation.y = -Math.PI / 2
    rightWall.receiveShadow = true
    this.scene.add(rightWall)
  }

  createCeiling() {
    const ceilingGeometry = new THREE.PlaneGeometry(40, 30)
    const ceilingMaterial = new THREE.MeshLambertMaterial({ 
      color: 0x2c3e50,
      transparent: true,
      opacity: 0.7
    })
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)
    ceiling.position.y = 8
    ceiling.rotation.x = Math.PI / 2
    this.scene.add(ceiling)
  }

  createWorkstations() {
    // Developer Station
    this.createDeveloperStation()
    
    // Designer Station
    this.createDesignerStation()
    
    // PM Station
    this.createPMStation()
    
    // Data Station
    this.createDataStation()
  }

  createDeveloperStation() {
    const stationGroup = new THREE.Group()
    
    // Desk
    const deskGeometry = new THREE.BoxGeometry(3, 0.1, 2)
    const deskMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const desk = new THREE.Mesh(deskGeometry, deskMaterial)
    desk.position.set(-10, 0.75, -8)
    desk.castShadow = true
    desk.receiveShadow = true
    stationGroup.add(desk)

    // Monitor
    const monitorGeometry = new THREE.BoxGeometry(1.5, 1, 0.1)
    const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a })
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial)
    monitor.position.set(-10, 1.5, -7.5)
    monitor.castShadow = true
    stationGroup.add(monitor)

    // Screen glow
    const screenGeometry = new THREE.PlaneGeometry(1.4, 0.9)
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00ff00,
      transparent: true,
      opacity: 0.7
    })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.set(-10, 1.5, -7.45)
    stationGroup.add(screen)

    // Keyboard
    const keyboardGeometry = new THREE.BoxGeometry(1, 0.05, 0.4)
    const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial)
    keyboard.position.set(-10, 0.8, -6.8)
    keyboard.castShadow = true
    stationGroup.add(keyboard)

    // Chair
    this.createChair(stationGroup, -10, 0, -5.5)

    // Station label
    this.createStationLabel(stationGroup, -10, 2.5, -8, 'Developer Station', 0x3498db)

    stationGroup.userData = { 
      type: 'workstation', 
      role: 'developer',
      interactionPoint: new THREE.Vector3(-10, 0, -6)
    }
    
    this.workstations.push(stationGroup)
    this.scene.add(stationGroup)
  }

  createDesignerStation() {
    const stationGroup = new THREE.Group()
    
    // Desk
    const deskGeometry = new THREE.BoxGeometry(3, 0.1, 2)
    const deskMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const desk = new THREE.Mesh(deskGeometry, deskMaterial)
    desk.position.set(10, 0.75, -8)
    desk.castShadow = true
    desk.receiveShadow = true
    stationGroup.add(desk)

    // Large Monitor
    const monitorGeometry = new THREE.BoxGeometry(2, 1.2, 0.1)
    const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a })
    const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial)
    monitor.position.set(10, 1.6, -7.5)
    monitor.castShadow = true
    stationGroup.add(monitor)

    // Design screen
    const screenGeometry = new THREE.PlaneGeometry(1.9, 1.1)
    const screenMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.7
    })
    const screen = new THREE.Mesh(screenGeometry, screenMaterial)
    screen.position.set(10, 1.6, -7.45)
    stationGroup.add(screen)

    // Graphics tablet
    const tabletGeometry = new THREE.BoxGeometry(0.8, 0.02, 0.6)
    const tabletMaterial = new THREE.MeshPhongMaterial({ color: 0x34495e })
    const tablet = new THREE.Mesh(tabletGeometry, tabletMaterial)
    tablet.position.set(9.2, 0.8, -6.8)
    tablet.castShadow = true
    stationGroup.add(tablet)

    // Chair
    this.createChair(stationGroup, 10, 0, -5.5)

    // Station label
    this.createStationLabel(stationGroup, 10, 2.8, -8, 'Design Studio', 0xe74c3c)

    stationGroup.userData = { 
      type: 'workstation', 
      role: 'designer',
      interactionPoint: new THREE.Vector3(10, 0, -6)
    }
    
    this.workstations.push(stationGroup)
    this.scene.add(stationGroup)
  }

  createPMStation() {
    const stationGroup = new THREE.Group()
    
    // Conference table
    const tableGeometry = new THREE.BoxGeometry(4, 0.1, 2.5)
    const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const table = new THREE.Mesh(tableGeometry, tableMaterial)
    table.position.set(-10, 0.75, 5)
    table.castShadow = true
    table.receiveShadow = true
    stationGroup.add(table)

    // Laptop
    const laptopGeometry = new THREE.BoxGeometry(1, 0.05, 0.7)
    const laptopMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
    const laptop = new THREE.Mesh(laptopGeometry, laptopMaterial)
    laptop.position.set(-10, 0.8, 5)
    laptop.castShadow = true
    stationGroup.add(laptop)

    // Whiteboard
    const whiteboardGeometry = new THREE.PlaneGeometry(3, 2)
    const whiteboardMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
    const whiteboard = new THREE.Mesh(whiteboardGeometry, whiteboardMaterial)
    whiteboard.position.set(-10, 2, 2.5)
    whiteboard.castShadow = true
    stationGroup.add(whiteboard)

    // Multiple chairs around table
    this.createChair(stationGroup, -10, 0, 3.5)
    this.createChair(stationGroup, -11.5, 0, 5)
    this.createChair(stationGroup, -8.5, 0, 5)

    // Station label
    this.createStationLabel(stationGroup, -10, 3, 2.5, 'PM Command Center', 0x27ae60)

    stationGroup.userData = { 
      type: 'workstation', 
      role: 'manager',
      interactionPoint: new THREE.Vector3(-10, 0, 4)
    }
    
    this.workstations.push(stationGroup)
    this.scene.add(stationGroup)
  }

  createDataStation() {
    const stationGroup = new THREE.Group()
    
    // L-shaped desk
    const desk1Geometry = new THREE.BoxGeometry(3, 0.1, 1.5)
    const desk2Geometry = new THREE.BoxGeometry(1.5, 0.1, 2)
    const deskMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    
    const desk1 = new THREE.Mesh(desk1Geometry, deskMaterial)
    desk1.position.set(10, 0.75, 5)
    desk1.castShadow = true
    desk1.receiveShadow = true
    stationGroup.add(desk1)

    const desk2 = new THREE.Mesh(desk2Geometry, deskMaterial)
    desk2.position.set(11.25, 0.75, 3.5)
    desk2.castShadow = true
    desk2.receiveShadow = true
    stationGroup.add(desk2)

    // Multiple monitors
    for (let i = 0; i < 3; i++) {
      const monitorGeometry = new THREE.BoxGeometry(1, 0.8, 0.1)
      const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a })
      const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial)
      monitor.position.set(9 + i * 1.2, 1.4, 5.7)
      monitor.castShadow = true
      stationGroup.add(monitor)

      // Data screens
      const screenGeometry = new THREE.PlaneGeometry(0.9, 0.7)
      const screenMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4ecdc4,
        transparent: true,
        opacity: 0.7
      })
      const screen = new THREE.Mesh(screenGeometry, screenMaterial)
      screen.position.set(9 + i * 1.2, 1.4, 5.75)
      stationGroup.add(screen)
    }

    // Chair
    this.createChair(stationGroup, 10, 0, 3.5)

    // Station label
    this.createStationLabel(stationGroup, 10, 2.5, 6, 'Data Processing Hub', 0xf39c12)

    stationGroup.userData = { 
      type: 'workstation', 
      role: 'data',
      interactionPoint: new THREE.Vector3(10, 0, 4)
    }
    
    this.workstations.push(stationGroup)
    this.scene.add(stationGroup)
  }

  createChair(parent, x, y, z) {
    const chairGroup = new THREE.Group()
    
    // Seat
    const seatGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8)
    const chairMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
    const seat = new THREE.Mesh(seatGeometry, chairMaterial)
    seat.position.set(0, 0.5, 0)
    seat.castShadow = true
    chairGroup.add(seat)

    // Backrest
    const backrestGeometry = new THREE.BoxGeometry(0.8, 1, 0.1)
    const backrest = new THREE.Mesh(backrestGeometry, chairMaterial)
    backrest.position.set(0, 1, -0.35)
    backrest.castShadow = true
    chairGroup.add(backrest)

    chairGroup.position.set(x, y, z)
    parent.add(chairGroup)
  }

  createStationLabel(parent, x, y, z, text, color) {
    // Create a simple text representation using geometry
    const labelGeometry = new THREE.PlaneGeometry(2, 0.3)
    const labelMaterial = new THREE.MeshBasicMaterial({ 
      color: color,
      transparent: true,
      opacity: 0.8
    })
    const label = new THREE.Mesh(labelGeometry, labelMaterial)
    label.position.set(x, y, z)
    label.userData = { type: 'label', text: text }
    parent.add(label)
  }

  createLighting() {
    // Ceiling lights
    for (let i = -15; i <= 15; i += 10) {
      for (let j = -10; j <= 10; j += 10) {
        const light = new THREE.PointLight(0xffffff, 0.3, 15)
        light.position.set(i, 7, j)
        light.castShadow = true
        light.shadow.mapSize.width = 512
        light.shadow.mapSize.height = 512
        this.scene.add(light)

        // Light fixture
        const fixtureGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1)
        const fixtureMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const fixture = new THREE.Mesh(fixtureGeometry, fixtureMaterial)
        fixture.position.set(i, 7.5, j)
        this.scene.add(fixture)
      }
    }
  }

  createDecorations() {
    // Plants
    this.createPlant(-15, 0, -10)
    this.createPlant(15, 0, -10)
    this.createPlant(-15, 0, 10)
    this.createPlant(15, 0, 10)

    // Coffee station
    this.createCoffeeStation(0, 0, 12)
  }

  createPlant(x, y, z) {
    const plantGroup = new THREE.Group()
    
    // Pot
    const potGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.5)
    const potMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const pot = new THREE.Mesh(potGeometry, potMaterial)
    pot.position.set(0, 0.25, 0)
    pot.castShadow = true
    plantGroup.add(pot)

    // Plant
    const plantGeometry = new THREE.SphereGeometry(0.4)
    const plantMaterial = new THREE.MeshPhongMaterial({ color: 0x27ae60 })
    const plant = new THREE.Mesh(plantGeometry, plantMaterial)
    plant.position.set(0, 0.8, 0)
    plant.castShadow = true
    plantGroup.add(plant)

    plantGroup.position.set(x, y, z)
    this.scene.add(plantGroup)
  }

  createCoffeeStation(x, y, z) {
    const coffeeGroup = new THREE.Group()
    
    // Counter
    const counterGeometry = new THREE.BoxGeometry(2, 0.1, 1)
    const counterMaterial = new THREE.MeshPhongMaterial({ color: 0x8b4513 })
    const counter = new THREE.Mesh(counterGeometry, counterMaterial)
    counter.position.set(0, 0.75, 0)
    counter.castShadow = true
    counter.receiveShadow = true
    coffeeGroup.add(counter)

    // Coffee machine
    const machineGeometry = new THREE.BoxGeometry(0.5, 0.6, 0.4)
    const machineMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 })
    const machine = new THREE.Mesh(machineGeometry, machineMaterial)
    machine.position.set(0, 1.1, 0)
    machine.castShadow = true
    coffeeGroup.add(machine)

    coffeeGroup.position.set(x, y, z)
    coffeeGroup.userData = { type: 'decoration', name: 'coffee_station' }
    this.scene.add(coffeeGroup)
  }

  getWorkstationByRole(role) {
    return this.workstations.find(station => station.userData.role === role)
  }

  getInteractionPoint(role) {
    const station = this.getWorkstationByRole(role)
    return station ? station.userData.interactionPoint : null
  }

  getAllWorkstations() {
    return this.workstations
  }

  dispose() {
    this.workstations.forEach(station => {
      this.scene.remove(station)
    })
    this.workstations = []
    this.interactiveObjects = []
  }
}
