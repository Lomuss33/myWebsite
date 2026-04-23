import * as THREE from "three"

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function easeOutCubic(t) {
    const x = clamp(t, 0, 1)
    return 1 - Math.pow(1 - x, 3)
}

export function createPrismFieldEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const objectRadius = Number.isFinite(options.objectRadius) ? options.objectRadius : 2.5
    const objectDepth = Number.isFinite(options.objectDepth) ? options.objectDepth : 1
    const lookAtZ = Number.isFinite(options.lookAtZ) ? options.lookAtZ : 40

    let renderer = null
    let scene = null
    let camera = null
    let lights = []
    let group = null
    let geometry = null
    let meshes = []
    let raycaster = null
    let mousePlane = null
    let mouseWorld = new THREE.Vector3(0, 0, lookAtZ)
    let mouseNdc = new THREE.Vector2()
    let mouseActive = false
    let running = false
    let rafId = null
    let width = 1
    let height = 1
    let lastFrameMs = 0
    let sceneSeed = 0

    const cornerColors = {
        topLeft: new THREE.Color(0x00f6ff),
        topRight: new THREE.Color(0xff39d4),
        bottomLeft: new THREE.Color(0x7dff31),
        bottomRight: new THREE.Color(0x566bff)
    }

    function blendCornerColor(tx, ty) {
        const top = cornerColors.topLeft.clone().lerp(cornerColors.topRight, tx)
        const bottom = cornerColors.bottomLeft.clone().lerp(cornerColors.bottomRight, tx)
        return top.lerp(bottom, ty)
    }

    function setup() {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
        })
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setClearColor(0x000000, 1)

        scene = new THREE.Scene()
        scene.background = new THREE.Color(0x000000)

        camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
        camera.position.z = 75

        raycaster = new THREE.Raycaster()
        mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), lookAtZ)

        geometry = new THREE.CylinderGeometry(objectRadius, objectRadius, objectDepth, 6, 1, false)
        geometry.rotateX(Math.PI / 2)
    }

    function clearScene() {
        for(const light of lights) scene.remove(light)
        lights = []

        if(group) {
            for(const mesh of meshes) {
                mesh.material?.dispose?.()
                group.remove(mesh)
            }
            scene.remove(group)
        }

        meshes = []
        group = null
    }

    function initLights() {
        const r = 100
        const intensity = 0.9
        const distance = 360

        const ambient = new THREE.AmbientLight(0x05070d, 0.08)
        scene.add(ambient)
        lights.push(ambient)

        const lightConfigs = [
            { color: cornerColors.topLeft, position: [-r, r, r] },
            { color: cornerColors.topRight, position: [r, r, r] },
            { color: cornerColors.bottomLeft, position: [-r, -r, r] },
            { color: cornerColors.bottomRight, position: [r, -r, r] }
        ]

        for(const config of lightConfigs) {
            const light = new THREE.PointLight(config.color, intensity, distance)
            light.position.set(config.position[0], config.position[1], config.position[2])
            scene.add(light)
            lights.push(light)
        }
    }

    function initScene() {
        clearScene()
        initLights()

        group = new THREE.Group()
        scene.add(group)

        const nx = Math.max(8, Math.round(width / 20))
        const ny = Math.max(8, Math.round(height / 15))
        const dx = Math.cos(Math.PI / 6) * objectRadius * 2
        const dy = objectRadius * 1.5

        for(let j = 0; j < ny; j++) {
            for(let i = 0; i < nx; i++) {
                const tx = nx <= 1 ? 0.5 : i / (nx - 1)
                const ty = ny <= 1 ? 0.5 : j / (ny - 1)
                const baseColor = blendCornerColor(tx, ty)
                const mesh = new THREE.Mesh(
                    geometry,
                    new THREE.MeshStandardMaterial({
                        color: baseColor,
                        emissive: baseColor.clone().multiplyScalar(0.65),
                        roughness: 0.18,
                        metalness: 0.92
                    })
                )
                mesh.position.x = (-nx / 2 + i) * dx + ((j % 2) * dx) / 2
                mesh.position.y = (-ny / 2 + j) * dy
                mesh.position.z = -200 - Math.random() * 50
                mesh.rotation.x = (Math.random() * 2 - 1) * Math.PI * 2
                mesh.rotation.y = (Math.random() * 2 - 1) * Math.PI * 2
                mesh.rotation.z = (Math.random() * 2 - 1) * Math.PI * 2

                mesh.userData = {
                    introProgress: 0,
                    introDuration: 1 + Math.random() * 2,
                    startZ: mesh.position.z,
                    startRotation: mesh.rotation.clone(),
                    baseColor
                }

                meshes.push(mesh)
                group.add(mesh)
            }
        }
    }

    function updatePointerWorld() {
        if(!mouseActive) {
            mouseWorld.set(0, 0, 10000)
            return
        }

        raycaster.setFromCamera(mouseNdc, camera)
        raycaster.ray.intersectPlane(mousePlane, mouseWorld)
        mouseWorld.z = lookAtZ
    }

    function renderFrame(nowMs = performance.now()) {
        if(!renderer) setup()

        const dt = lastFrameMs > 0 ? Math.min(0.05, (nowMs - lastFrameMs) / 1000) : 0.016
        lastFrameMs = nowMs

        const time = nowMs * 0.001
        const d = 100
        if(lights[1]) {
            lights[1].position.x = Math.sin(time * 0.1) * d
            lights[1].position.y = Math.cos(time * 0.2) * d
        }
        if(lights[2]) {
            lights[2].position.x = Math.cos(time * 0.3) * d
            lights[2].position.y = Math.sin(time * 0.4) * d
        }
        if(lights[3]) {
            lights[3].position.x = Math.sin(time * 0.5) * d
            lights[3].position.y = Math.sin(time * 0.6) * d
        }
        if(lights[4]) {
            lights[4].position.x = Math.sin(time * 0.7) * d
            lights[4].position.y = Math.cos(time * 0.8) * d
        }

        updatePointerWorld()
        const reactiveTarget = mouseActive
            ? new THREE.Vector3(mouseWorld.x * 2.8, mouseWorld.y * 2.8, 2)
            : new THREE.Vector3(0, 0, 10000)

        for(const mesh of meshes) {
            const data = mesh.userData
            if(data.introProgress < 1) {
                data.introProgress = Math.min(1, data.introProgress + dt / data.introDuration)
                const t = easeOutCubic(data.introProgress)
                mesh.position.z = data.startZ * (1 - t)
                mesh.rotation.x = data.startRotation.x * (1 - t)
                mesh.rotation.y = data.startRotation.y * (1 - t)
                mesh.rotation.z = data.startRotation.z * (1 - t)
            }
            else if(!reduceMotion) {
                mesh.lookAt(reactiveTarget)
            }
        }

        renderer.render(scene, camera)
    }

    function tick(nowMs) {
        if(!running) return
        renderFrame(nowMs)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)

        renderer.setPixelRatio(dpr)
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        initScene()
        lastFrameMs = 0
        renderFrame(performance.now())
    }

    function setPointer(x, y) {
        mouseActive = true
        mouseNdc.x = clamp(x, 0, 1) * 2 - 1
        mouseNdc.y = -(clamp(y, 0, 1) * 2 - 1)
    }

    function clearPointer() {
        mouseActive = false
    }

    function reset() {
        sceneSeed += 1
        void sceneSeed
        initScene()
        lastFrameMs = 0
        renderFrame(performance.now())
    }

    function renderStatic() {
        renderFrame(performance.now())
    }

    function start() {
        if(reduceMotion) {
            renderFrame(performance.now())
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

    function destroy() {
        stop()
        clearScene()
        geometry?.dispose()
        renderer?.dispose()
    }

    setup()

    return {
        start,
        stop,
        destroy,
        reset,
        renderStatic,
        setSize,
        setPointer,
        clearPointer
    }
}
