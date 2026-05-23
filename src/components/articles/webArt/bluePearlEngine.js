import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js"

const DEFAULT_OPTIONS = {
    particleCount: 900,
    reflectionProbeSize: 96,
    maxPixelRatio: 1.25,
    reduceMotion: false,
    showCore: false
}

const randomBetween = (a = 0, b = 1) => a + Math.random() * (b - a)
const signedRandom = (a = 0, b = 1) => randomBetween(a, b) * (Math.random() - 0.5) * 2

const disposeObject = (object) => {
    object.traverse((child) => {
        child.geometry?.dispose?.()

        const materials = Array.isArray(child.material) ? child.material : [child.material]
        materials.filter(Boolean).forEach((material) => {
            Object.values(material).forEach((value) => {
                if(value?.isTexture) value.dispose()
            })
            material.dispose?.()
        })
    })
}

export function createBluePearlEngine(canvas, options = {}) {
    const config = {...DEFAULT_OPTIONS, ...options}
    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: false,
        antialias: true,
        powerPreference: "high-performance"
    })
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 1000)
    const controls = new OrbitControls(camera, canvas)
    const clock = new THREE.Clock()
    const dummy = new THREE.Object3D()
    const tempPosition = new THREE.Vector3()
    const tempQuaternion = new THREE.Quaternion()
    const shardData = []

    let animationFrame = 0
    let isRunning = false
    let destroyed = false

    camera.position.set(0, 0, 100)

    controls.enableDamping = true
    controls.rotateSpeed = 0.48
    controls.zoomSpeed = 0.62
    controls.enablePan = false
    controls.minDistance = 72
    controls.maxDistance = 132
    controls.maxPolarAngle = Math.PI
    controls.enabled = false

    const light = new THREE.PointLight(0xffffff, 18000, 420, 1.5)
    scene.add(light)
    scene.add(new THREE.AmbientLight(0x264a88, 0.28))

    const cubeTarget = new THREE.WebGLCubeRenderTarget(config.reflectionProbeSize, {
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
        colorSpace: THREE.SRGBColorSpace
    })
    const cubeCamera = new THREE.CubeCamera(1, 260, cubeTarget)
    scene.add(cubeCamera)

    const shardGeometry = new THREE.IcosahedronGeometry(1.85, 1)
    const shardMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.46,
        metalness: 0.18,
        emissive: new THREE.Color(0x071426),
        vertexColors: true
    })
    const shards = new THREE.InstancedMesh(shardGeometry, shardMaterial, config.particleCount)
    shards.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    shards.frustumCulled = false

    for(let index = 0; index < config.particleCount; index++) {
        const theta = randomBetween(0, Math.PI * 2)
        const phi = Math.acos(randomBetween(-1, 1))
        const radius = randomBetween(52, 202)
        const position = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta),
            Math.cos(phi),
            Math.sin(phi) * Math.sin(theta)
        ).multiplyScalar(radius)
        const scale = randomBetween(0.78, 3.2) * (Math.random() < 0.16 ? randomBetween(1.25, 1.85) : 1)
        const rotation = new THREE.Euler(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        )
        const color = new THREE.Color(
            randomBetween(0.02, 0.22),
            randomBetween(0.2, 0.62),
            randomBetween(0.58, 1)
        )

        dummy.position.copy(position)
        dummy.rotation.copy(rotation)
        dummy.scale.setScalar(scale)
        dummy.updateMatrix()
        shards.setMatrixAt(index, dummy.matrix)
        shards.setColorAt(index, color)
        shardData.push({
            basePosition: position.clone(),
            position,
            rotation,
            scale,
            orbitAxis: new THREE.Vector3(
                signedRandom(0.15, 1),
                signedRandom(0.15, 1),
                signedRandom(0.15, 1)
            ).normalize(),
            orbitPhase: randomBetween(0, Math.PI * 2),
            orbitSpeed: signedRandom(0.0009, 0.0042),
            wobbleSpeed: randomBetween(0.25, 0.9),
            wobbleAmount: randomBetween(2, 9),
            spin: new THREE.Vector3(
                signedRandom(0.0026, 0.014),
                signedRandom(0.0026, 0.016),
                signedRandom(0.0026, 0.012)
            )
        })
    }
    shards.instanceMatrix.needsUpdate = true
    shards.instanceColor.needsUpdate = true
    scene.add(shards)

    const pearl = new THREE.Mesh(
        new THREE.SphereGeometry(25, 64, 32),
        new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(0xdfe8ff),
            roughness: 0.82,
            metalness: 0,
            clearcoat: 1,
            clearcoatRoughness: 0.22,
            envMap: cubeTarget.texture,
            envMapIntensity: 1.25,
            emissive: new THREE.Color(0x505a74),
            emissiveIntensity: 0.7
        })
    )
    pearl.visible = config.showCore
    scene.add(pearl)

    const halo = new THREE.Mesh(
        new THREE.SphereGeometry(27.5, 48, 24),
        new THREE.MeshBasicMaterial({
            color: 0x7fb6ff,
            transparent: true,
            opacity: 0.14,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
    )
    halo.visible = config.showCore
    scene.add(halo)

    const renderReflection = () => {
        if(!config.showCore) return
        const shouldRestorePearl = pearl.visible
        const shouldRestoreHalo = halo.visible
        pearl.visible = false
        halo.visible = false
        cubeCamera.update(renderer, scene)
        pearl.visible = shouldRestorePearl
        halo.visible = shouldRestoreHalo
    }

    const renderFrame = () => {
        if(destroyed) return

        const time = clock.elapsedTime

        for(let index = 0; index < shardData.length; index++) {
            const shard = shardData[index]
            shard.rotation.x += shard.spin.x
            shard.rotation.y += shard.spin.y
            shard.rotation.z += shard.spin.z

            tempQuaternion.setFromAxisAngle(shard.orbitAxis, time * shard.orbitSpeed + shard.orbitPhase)
            tempPosition.copy(shard.basePosition).applyQuaternion(tempQuaternion)
            tempPosition.addScaledVector(
                shard.orbitAxis,
                Math.sin(time * shard.wobbleSpeed + shard.orbitPhase) * shard.wobbleAmount
            )

            dummy.position.copy(tempPosition)
            dummy.rotation.copy(shard.rotation)
            dummy.scale.setScalar(shard.scale * (0.92 + Math.sin(time * 1.8 + shard.orbitPhase) * 0.08))
            dummy.updateMatrix()
            shards.setMatrixAt(index, dummy.matrix)
        }
        shards.instanceMatrix.needsUpdate = true
        shards.rotation.x = Math.sin(time * 0.13) * 0.24
        shards.rotation.y += 0.0042
        shards.rotation.z = Math.cos(time * 0.11) * 0.15
        halo.scale.setScalar(1 + Math.sin(time * 1.4) * 0.018)
        controls.update()

        renderer.render(scene, camera)
    }

    const loop = () => {
        if(!isRunning || destroyed) return
        animationFrame = window.requestAnimationFrame(loop)
        clock.getDelta()
        renderFrame()
    }

    renderReflection()
    renderFrame()

    return {
        start() {
            if(destroyed || isRunning) return

            if(config.reduceMotion) {
                renderFrame()
                return
            }

            isRunning = true
            clock.start()
            loop()
        },

        stop() {
            if(destroyed || !isRunning) return
            isRunning = false
            if(animationFrame) window.cancelAnimationFrame(animationFrame)
            animationFrame = 0
            clock.stop()
        },

        reset() {
            if(destroyed) return
            camera.position.set(0, 0, 100)
            controls.target.set(0, 0, 0)
            controls.update()
            renderFrame()
        },

        destroy() {
            if(destroyed) return
            destroyed = true
            this.stop()
            controls.dispose()
            disposeObject(scene)
            cubeTarget.dispose()
            renderer.dispose()
            renderer.forceContextLoss()
        },

        setSize(width, height, pixelRatio = 1) {
            if(destroyed) return
            const ratio = Math.min(config.maxPixelRatio, Math.max(1, pixelRatio || 1))
            camera.aspect = width / Math.max(1, height)
            camera.updateProjectionMatrix()
            renderer.setPixelRatio(ratio)
            renderer.setSize(width, height, false)
            renderFrame()
        },

        setInteractionEnabled(enabled) {
            if(destroyed) return
            controls.enabled = enabled
        }
    }
}
