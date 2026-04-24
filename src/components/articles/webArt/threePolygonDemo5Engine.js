import * as THREE from "three"

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function ringColorHsl(index, count, time = 0) {
    const t = count <= 1 ? 0 : index / (count - 1)
    const swirl = time * 0.12
    const waveA = Math.sin((t * 8.0 + swirl) * Math.PI * 2)
    const waveB = Math.sin((t * 3.5 - swirl * 1.6) * Math.PI * 2)
    const hue = (290 + t * 210 + waveA * 48 + waveB * 26 + time * 34) % 360
    const saturation = clamp(0.72 + 0.16 * Math.sin((t * 5.0 + time * 0.28) * Math.PI * 2), 0.62, 0.94)
    const lightness = clamp(0.42 + 0.14 * Math.cos((t * 7.0 - time * 0.2) * Math.PI * 2), 0.32, 0.62)
    return new THREE.Color().setHSL(((hue % 360) + 360) % 360 / 360, saturation, lightness)
}

function applyRingPalette(mesh, index, count, time) {
    if(!mesh?.material) return

    const baseColor = ringColorHsl(index, count, time)
    const edgeColor = ringColorHsl(index + 0.8, count, time + 0.65)
    const material = mesh.material

    material.color.copy(baseColor).multiplyScalar(0.28)
    material.emissive.copy(baseColor)
    material.emissiveIntensity = 0.14 + 0.08 * Math.sin(time * 1.8 + index * 0.42)

    const lines = mesh.userData?.lines
    if(lines?.material?.color) {
        lines.material.color.copy(edgeColor)
        lines.material.opacity = 0.74 + 0.16 * Math.sin(time * 1.5 + index * 0.35)
    }
}

function polygonPoints(n, x, y, s, r) {
    const dt = (2 * Math.PI) / n
    const points = []
    for(let i = 0; i < n; i++) {
        const t = Math.PI / 2 + r + i * dt
        const px = x + Math.cos(t) * s
        const py = y + Math.sin(t) * s
        points.push([px, py])
    }
    return points
}

function polygonGeometry(n, s, thickness, depth) {
    let points = polygonPoints(n, 0, 0, s + thickness, 0)
    const shape = new THREE.Shape()
    points.forEach((p, i) => {
        if(i === 0) shape.moveTo(p[0], p[1])
        else shape.lineTo(p[0], p[1])
    })
    shape.lineTo(points[0][0], points[0][1])

    points = polygonPoints(n, 0, 0, s, 0)
    const hole = new THREE.Path()
    points.forEach((p, i) => {
        if(i === 0) hole.moveTo(p[0], p[1])
        else hole.lineTo(p[0], p[1])
    })
    hole.lineTo(points[0][0], points[0][1])
    shape.holes.push(hole)

    const extrudeSettings = { steps: 1, depth, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.translate(0, 0, -depth / 2)
    return geometry
}

export function createThreePolygonDemo5Engine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const fitFactor = Number.isFinite(options.fitFactor) ? clamp(options.fitFactor, 0.75, 1.05) : 0.82

    // “Demo 5” config (kept semantically, scaled-to-fit in the tile)
    const nbVertexes = 4
    const nbObjects = clampInt(options.nbObjects, 10, 80, 25)
    const objectMinRadius = 1
    const objectRadiusCoef = 10
    const objectThickness = 2
    const objectDepth = 0.5
    const rotationXDeg = 0
    const rotationYDeg = 360
    const rotationZDeg = 0
    const animationDuration = Number.isFinite(options.animationDuration) ? options.animationDuration : 7
    const animationDelay = Number.isFinite(options.animationDelay) ? options.animationDelay : 0.1
    const cameraZ = Number.isFinite(options.cameraZ) ? options.cameraZ : 75

    let renderer = null
    let scene = null
    let camera = null
    let group = null
    let width = 1
    let height = 1
    let running = false
    let rafId = null
    let simTime = 0
    let lastFrameMs = 0
    let boostEnergy = 0
    let boostTail = 0
    let held = false
    let pmrem = null
    let envTexture = null
    let envSourceTexture = null

    function setup() {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        })
        renderer.setClearColor(0x02020a, 1)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = 1.10

        scene = new THREE.Scene()

        camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000)
        camera.position.z = cameraZ
        scene.add(camera)

        scene.add(new THREE.AmbientLight(0xffffff, 0.22))

        const lightIntensity = 0.85
        const lightDistance = 340
        const positions = [
            [0, 70, 0],
            [0, -70, 0],
            [70, 0, 0],
            [-70, 0, 0],
            [0, 0, 70],
            [0, 0, -70]
        ]

        for(const [x, y, z] of positions) {
            const light = new THREE.PointLight(0xffffff, lightIntensity, lightDistance)
            light.position.set(x, y, z)
            scene.add(light)
        }

        // Environment map for shiny metallic reflections (procedural gradient)
        scene.environment = null

        group = new THREE.Group()
        scene.add(group)

        const baseMat = new THREE.MeshStandardMaterial({
            color: 0x060715,
            emissive: new THREE.Color(0x44ccff),
            emissiveIntensity: 0.04,
            roughness: 0.22,
            metalness: 0.88,
            polygonOffset: true,
            polygonOffsetFactor: -1,
            polygonOffsetUnits: -1
        })

        for(let i = 0; i < nbObjects; i++) {
            const radius = objectMinRadius + objectRadiusCoef * i
            const geo = polygonGeometry(nbVertexes, radius, objectThickness, objectDepth)
            const mat = baseMat.clone()

            const mesh = new THREE.Mesh(geo, mat)
            mesh.position.z = -objectDepth * i
            mesh.userData = { index: i }

            // Bright “strip” outline so the rings stand out against the dark background.
            const edges = new THREE.EdgesGeometry(geo, 18)
            const edgeMat = new THREE.LineBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.88,
                blending: THREE.NormalBlending,
                depthWrite: false
            })
            const lines = new THREE.LineSegments(edges, edgeMat)
            mesh.userData.lines = lines
            mesh.add(lines)
            applyRingPalette(mesh, i, nbObjects, 0)

            group.add(mesh)
        }

        fitToView()
    }

    function fitToView() {
        if(!group) return
        group.scale.setScalar(1)
        const box = new THREE.Box3().setFromObject(group)
        const size = new THREE.Vector3()
        box.getSize(size)

        const maxSide = Math.max(size.x, size.y, 1e-6)
        const viewFit = fitFactor * Math.min(width, height)
        const scale = clamp(viewFit / maxSide, 0.12, 1.2)
        group.scale.setScalar(scale)
    }

    function renderFrame() {
        if(!renderer || !scene || !camera) return
        renderer.render(scene, camera)
    }

    function tick(nowMs) {
        if(!running) return

        if(lastFrameMs <= 0) lastFrameMs = nowMs
        const dt = Math.min(0.05, Math.max(0.001, (nowMs - lastFrameMs) / 1000))
        lastFrameMs = nowMs

        if(held) {
            boostTail = Math.max(0, boostTail - dt * 2.8)
            boostEnergy = Math.max(0, boostEnergy - dt * (1.6 + boostEnergy * 0.6))
        }
        else if(boostTail > 0) {
            boostTail = Math.max(0, boostTail - dt)
            boostEnergy = Math.max(0, boostEnergy - dt * 0.08)
        }
        else {
            boostEnergy = Math.max(0, boostEnergy - dt * 0.45)
        }

        const t = simTime
        const ampX = (rotationXDeg * Math.PI) / 180
        const ampY = (rotationYDeg * Math.PI) / 180
        const ampZ = (rotationZDeg * Math.PI) / 180
        const currentDuration = animationDuration / Math.max(1, 1 + boostEnergy)
        const omega = (Math.PI * 2) / Math.max(0.1, currentDuration)

        for(let i = 0; i < group.children.length; i++) {
            const mesh = group.children[i]
            const delay = i * animationDelay
            const phase = (t - delay) * omega
            const yoyo = 0.5 + 0.5 * Math.sin(phase) // 0..1

            mesh.rotation.x = ampX * yoyo
            mesh.rotation.y = ampY * yoyo
            mesh.rotation.z = ampZ * yoyo
            applyRingPalette(mesh, i, group.children.length, t + i * 0.08)
        }

        simTime += dt
        renderFrame()
        rafId = requestAnimationFrame(tick)
    }

    function setSize(w, h, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(w || 1))
        height = Math.max(1, Math.floor(h || 1))
        const dpr = clamp(Number(devicePixelRatio) || 1, 1, 2)

        if(!renderer) setup()

        renderer.setPixelRatio(dpr)
        renderer.setSize(width, height, false)

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        // Re-fit scale on resize
        fitToView()

        lastFrameMs = 0
        if(reduceMotion) renderFrame()
    }

    function start() {
        if(!renderer) setup()
        if(reduceMotion) {
            lastFrameMs = 0
            renderFrame()
            return
        }
        if(running) return
        running = true
        lastFrameMs = 0
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        lastFrameMs = 0
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function reset() {
        if(!renderer) setup()
        stop()
        simTime = 0
        boostEnergy = 0
        boostTail = 0
        held = false
        for(let i = 0; i < group.children.length; i++) {
            group.children[i].rotation.set(0, 0, 0)
            applyRingPalette(group.children[i], i, group.children.length, 0)
        }
        renderFrame()
    }

    function boost() {
        boostEnergy = clamp(boostEnergy + 0.45, 0, 4.0)
        boostTail = clamp(boostTail + 0.9, 0, 5.5)
        if(!running) renderFrame()
    }

    function setHeld(nextHeld) {
        held = Boolean(nextHeld)
        if(!running) renderFrame()
    }

    function destroy() {
        stop()

        group?.traverse((obj) => {
            if(!obj) return
            if(obj.geometry?.dispose) obj.geometry.dispose()
            const material = obj.material
            if(Array.isArray(material)) material.forEach((m) => m?.dispose?.())
            else material?.dispose?.()
        })
        envTexture?.dispose?.()
        envSourceTexture?.dispose?.()
        pmrem?.dispose?.()
        renderer?.dispose?.()

        renderer = null
        scene = null
        camera = null
        group = null
        pmrem = null
        envTexture = null
        envSourceTexture = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        setSize,
        boost,
        setHeld
    }
}
