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
    let hemiLight = null
    let ambientLight = null
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
    let paletteIndex = 0
    let cubeMeshes = []

    const palettes = [
        {
            name: "Aurora",
            clearColor: 0x03111a,
            fogColor: 0x021018,
            fogNear: 220,
            fogFar: 1500,
            hemiSky: 0x9bf7ff,
            hemiGround: 0x0c0c18,
            hemiIntensity: 0.36,
            ambientColor: 0xffffff,
            ambientIntensity: 0.10,
            light1: { color: 0xffffff, intensity: 2.8 },
            light2: { color: 0x18ffb2, intensity: 2.0 },
            exposure: 1.25,
            cubeStops: [0x2bffb1, 0x00ffd1, 0x00a3ff, 0x2b7bff, 0xc300ff, 0xff3bc8],
            emissiveIntensity: 0.30
        },
        {
            name: "Sunset",
            clearColor: 0x1a0310,
            fogColor: 0x14020b,
            fogNear: 215,
            fogFar: 1400,
            hemiSky: 0xffc8a6,
            hemiGround: 0x190112,
            hemiIntensity: 0.30,
            ambientColor: 0xffffff,
            ambientIntensity: 0.09,
            light1: { color: 0xfff0e8, intensity: 2.6 },
            light2: { color: 0xff5a2a, intensity: 2.0 },
            exposure: 1.35,
            cubeStops: [0xffb703, 0xff8f2b, 0xff5d8f, 0xff2b6a, 0x7b2cff, 0x00d4ff],
            emissiveIntensity: 0.28
        },
        {
            name: "Ice",
            clearColor: 0x03050e,
            fogColor: 0x040717,
            fogNear: 235,
            fogFar: 1700,
            hemiSky: 0x96d9ff,
            hemiGround: 0x05040a,
            hemiIntensity: 0.38,
            ambientColor: 0xffffff,
            ambientIntensity: 0.11,
            light1: { color: 0xe9fbff, intensity: 3.1 },
            light2: { color: 0x2b7bff, intensity: 1.6 },
            exposure: 1.10,
            cubeStops: [0x00f5ff, 0x00d5ff, 0x00a3ff, 0x96d9ff, 0xffffff, 0x8a2bff],
            emissiveIntensity: 0.26
        },
        {
            name: "Lime",
            clearColor: 0x030f06,
            fogColor: 0x020a04,
            fogNear: 210,
            fogFar: 1350,
            hemiSky: 0xcfff6b,
            hemiGround: 0x070b05,
            hemiIntensity: 0.28,
            ambientColor: 0xffffff,
            ambientIntensity: 0.08,
            light1: { color: 0xf3ffe9, intensity: 2.5 },
            light2: { color: 0xa8ff00, intensity: 2.0 },
            exposure: 1.30,
            cubeStops: [0xa8ff00, 0x7cff00, 0x00ff8f, 0x00d5ff, 0xffea00, 0xff6a00],
            emissiveIntensity: 0.28
        },
        {
            name: "Neon",
            clearColor: 0x07000f,
            fogColor: 0x05000a,
            fogNear: 215,
            fogFar: 1400,
            hemiSky: 0xff7cff,
            hemiGround: 0x060010,
            hemiIntensity: 0.26,
            ambientColor: 0xffffff,
            ambientIntensity: 0.08,
            light1: { color: 0xffffff, intensity: 2.7 },
            light2: { color: 0x00d5ff, intensity: 2.1 },
            exposure: 1.45,
            cubeStops: [0xff00c8, 0xff3bc8, 0x8f00ff, 0xc300ff, 0x00d5ff, 0x00ff8f],
            emissiveIntensity: 0.32
        }
    ]

    function _colorFromStops(stops, t01) {
        const t = clamp(Number(t01) || 0, 0, 1)
        const list = Array.isArray(stops) ? stops : []
        if(list.length === 0) return new THREE.Color(0xffffff)
        if(list.length === 1) return new THREE.Color(list[0])

        const scaled = t * (list.length - 1)
        const i0 = Math.floor(scaled)
        const i1 = Math.min(list.length - 1, i0 + 1)
        const lt = scaled - i0
        const c0 = new THREE.Color(list[i0])
        const c1 = new THREE.Color(list[i1])
        return c0.lerp(c1, lt)
    }

    function applyPalette(index) {
        if(!renderer) setup()
        const idx = Math.max(0, Math.min(palettes.length - 1, Math.floor(Number(index) || 0)))
        paletteIndex = idx
        const p = palettes[paletteIndex]

        renderer.setClearColor(p.clearColor, 1)
        renderer.toneMappingExposure = p.exposure
        if(scene?.fog) {
            scene.fog.color = new THREE.Color(p.fogColor)
            scene.fog.near = p.fogNear
            scene.fog.far = p.fogFar
        }

        if(hemiLight) {
            hemiLight.color = new THREE.Color(p.hemiSky)
            hemiLight.groundColor = new THREE.Color(p.hemiGround)
            hemiLight.intensity = p.hemiIntensity
        }

        if(ambientLight) {
            ambientLight.color = new THREE.Color(p.ambientColor)
            ambientLight.intensity = p.ambientIntensity
        }

        if(light) {
            light.color = new THREE.Color(p.light1.color)
            light.intensity = p.light1.intensity
        }
        if(light2) {
            light2.color = new THREE.Color(p.light2.color)
            light2.intensity = p.light2.intensity
        }

        for(const cube of cubeMeshes) {
            const { mesh, ringIndex, cubeIndex } = cube
            const tA = ringCount <= 1 ? 0 : (ringIndex / (ringCount - 1))
            const tB = cubesPerRing <= 1 ? 0 : (cubeIndex / (cubesPerRing - 1))
            const tMix = (tA * 0.78 + tB * 0.22) % 1
            const color = _colorFromStops(p.cubeStops, tMix)
            const mat = mesh.material
            if(mat) {
                mat.color.copy(color)
                mat.emissive.copy(color)
                mat.emissiveIntensity = p.emissiveIntensity
                mat.needsUpdate = true
            }
        }

        renderFrame()
    }

    function nextPalette() {
        const next = (paletteIndex + 1) % palettes.length
        applyPalette(next)
    }

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

        hemiLight = new THREE.HemisphereLight(0x9cc7ff, 0x100714, 0.40)
        scene.add(hemiLight)

        ambientLight = new THREE.AmbientLight(0xffffff, 0.10)
        scene.add(ambientLight)

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

        cubeMeshes = []

        for(let i = 0; i < ringCount; i++) {
            const ring = new THREE.Object3D()

            for(let j = 0; j < cubesPerRing; j++) {
                const a = (Math.PI * 2 * j) / cubesPerRing
                const color = new THREE.Color(0xffffff)

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

                cubeMeshes.push({ mesh: cube, ringIndex: i, cubeIndex: j })
            }

            ring.position.z = -i * ringSpacing
            elements.add(ring)
        }

        farthestZ = - (ringCount - 1) * ringSpacing

        applyPalette(paletteIndex)
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
        hemiLight = null
        ambientLight = null
        geometry = null
        pmrem = null
        envTexture = null
        envSourceTexture = null
        cubeMeshes = []
    }

    return {
        start,
        stop,
        reset,
        nextPalette,
        destroy,
        setSize
    }
}
