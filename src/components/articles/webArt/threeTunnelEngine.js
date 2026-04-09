import * as THREE from "three"

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

export function createThreeTunnelEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const ringCount = clampInt(options.ringCount, 6, 16, 10)
    const cubesPerRing = clampInt(options.cubesPerRing, 8, 18, 10)
    const ringSpacing = Number.isFinite(options.ringSpacing) ? options.ringSpacing : 110
    const tunnelRadius = Number.isFinite(options.tunnelRadius) ? options.tunnelRadius : 80
    const speed = Number.isFinite(options.speed) ? options.speed : 3.6
    const exposure = Number.isFinite(options.exposure) ? options.exposure : 1.35

    let renderer = null
    let scene = null
    let camera = null
    let elements = null
    let light = null
    let light2 = null
    let geometry = null
    let running = false
    let rafId = null
    let farthestZ = 0
    let t = 0
    let width = 1
    let height = 1
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
        renderer.setClearColor(0x010013, 1)
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.toneMapping = THREE.ACESFilmicToneMapping
        renderer.toneMappingExposure = exposure
        renderer.useLegacyLights = false

        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x010013, 260, 1250)

        camera = new THREE.PerspectiveCamera(50, 1, 1, 4000)
        camera.position.z = 70
        scene.add(camera)

        const hemi = new THREE.HemisphereLight(0x9cc7ff, 0x100714, 0.40)
        scene.add(hemi)

        const ambient = new THREE.AmbientLight(0xffffff, 0.10)
        scene.add(ambient)

        light = new THREE.PointLight(0xffffff, 3.0, 2400)
        light.position.set(0, 0, -260)
        scene.add(light)

        light2 = new THREE.PointLight(0x00d5ff, 1.55, 2400)
        light2.position.set(0, 0, -420)
        scene.add(light2)

        elements = new THREE.Object3D()
        scene.add(elements)

        geometry = new THREE.BoxGeometry(24, 24, 78)

        // Environment map (procedural equirectangular gradient) for a reflective “deep tunnel” look
        scene.environment = null

        for(let i = 0; i < ringCount; i++) {
            const ring = new THREE.Object3D()

            for(let j = 0; j < cubesPerRing; j++) {
                const a = (Math.PI * 2 * j) / cubesPerRing
                const hue = ((i / Math.max(1, ringCount - 1)) * 320 + (j / cubesPerRing) * 170) % 360
                const color = new THREE.Color().setHSL(hue / 360, 1.0, 0.45)

                const material = new THREE.MeshStandardMaterial({
                    color,
                    metalness: 1.0,
                    roughness: 0.12,
                    emissive: color.clone(),
                    emissiveIntensity: 0.22
                })
                const cube = new THREE.Mesh(geometry, material)
                cube.position.set(Math.cos(a) * tunnelRadius, Math.sin(a) * tunnelRadius, 0)
                cube.rotation.z = a
                ring.add(cube)
            }

            ring.position.z = -i * ringSpacing
            elements.add(ring)
        }

        farthestZ = - (ringCount - 1) * ringSpacing
    }

    function renderFrame() {
        if(!renderer || !scene || !camera) return
        renderer.render(scene, camera)
    }

    function tick() {
        if(!running) return

        t += 1
        camera.rotation.z += 0.0065
        camera.position.z -= speed

        light.position.z = camera.position.z - 220
        light.position.y = Math.sin(t / 40) * 65
        light.position.x = Math.cos(t / 40) * 65

        light2.position.z = camera.position.z - 390
        light2.position.y = Math.sin(t / 34) * -85
        light2.position.x = Math.cos(t / 34) * 85

        for(let i = 0; i < elements.children.length; i++) {
            const ring = elements.children[i]
            if(camera.position.z < ring.position.z - ringSpacing) {
                farthestZ -= ringSpacing
                ring.position.z = farthestZ
            }
        }

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

        if(reduceMotion) renderFrame()
    }

    function start() {
        if(!renderer) setup()
        if(reduceMotion) {
            renderFrame()
            return
        }
        if(running) return
        running = true
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function reset() {
        if(!renderer) setup()
        stop()
        t = 0
        camera.position.z = 70
        camera.rotation.z = 0

        for(let i = 0; i < elements.children.length; i++) {
            elements.children[i].position.z = -i * ringSpacing
        }
        farthestZ = - (ringCount - 1) * ringSpacing
        renderFrame()
    }

    function destroy() {
        stop()

        if(elements) {
            elements.traverse((obj) => {
                if(obj && obj.isMesh) {
                    obj.material?.dispose?.()
                }
            })
        }
        geometry?.dispose?.()
        envTexture?.dispose?.()
        envSourceTexture?.dispose?.()
        pmrem?.dispose?.()
        renderer?.dispose?.()

        renderer = null
        scene = null
        camera = null
        elements = null
        light = null
        light2 = null
        geometry = null
        pmrem = null
        envTexture = null
        envSourceTexture = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        setSize
    }
}
