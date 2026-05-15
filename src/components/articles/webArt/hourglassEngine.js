import Matter from "matter-js"

const { Engine, Bodies, Body, Composite, Sleeping } = Matter

const DEFAULT_PARAMS = {
    gravity: 2.8,
    neckRatio: 0.01
}

const CONFIG = {
    maxParticles: 6000,
    wallThickness: 36,
    colors: [
        "#ff3f70",
        "#ff7626",
        "#ffe600",
        "#33ff66",
        "#00f0ff",
        "#4a7dff",
        "#d645ff"
    ],
    collision: {
        particle: { category: 0x0001, mask: 0x0002 | 0x0001 },
        wall: { category: 0x0002, mask: 0x0001 }
    },
    physics: {
        dtBase: 16.667,
        maxDt: 50,
        posIters: 10,
        velIters: 8
    }
}

const LIMITS = {
    gravity: { min: 0.25, max: 2.8 },
    neckRatio: { min: 0.01, max: 0.2 }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function groupParticlesByColor(particles) {
    const groups = new Map()
    for(const particle of particles) {
        const color = particle?.render?.fillStyle || "#ffffff"
        const list = groups.get(color)
        if(list) list.push(particle)
        else groups.set(color, [particle])
    }
    return groups
}

export function createHourglassEngine(canvas) {
    const ctx = canvas.getContext("2d", { alpha: true })
    if(!ctx) throw new Error("Canvas 2D context not available")

    const params = { ...DEFAULT_PARAMS }
    const engine = Engine.create({
        enableSleeping: true,
        positionIterations: CONFIG.physics.posIters,
        velocityIterations: CONFIG.physics.velIters
    })

    engine.world.gravity.x = 0
    engine.world.gravity.y = params.gravity

    const dimensions = { cx: 0, cy: 0, width: 0, height: 0 }
    const geometry = {
        height: 200,
        maxWidth: 130,
        neckWidth: 1,
        particleRadius: 2
    }
    const angles = {
        draw: 0,
        targetDraw: 0,
        gravity: 0,
        targetGravity: 0
    }
    const entities = {
        walls: [],
        particles: []
    }
    const paths = {
        right: [],
        left: [],
        glass: null
    }

    let frostGradient = null
    let lastTimestamp = null
    let rafId = null
    let rebuildRafId = null
    let running = false

    function buildGeometry() {
        const { width, height } = dimensions

        geometry.height = Math.min(height * 0.44, 300)
        geometry.maxWidth = Math.min(width * 0.34, 220)
        geometry.particleRadius = Math.max(
            Math.min(geometry.maxWidth / 44, 3.5),
            2
        )
        geometry.neckWidth = Math.max(
            geometry.maxWidth * params.neckRatio,
            geometry.particleRadius * 1.5
        )

        const H = geometry.height
        const maxW = geometry.maxWidth
        const neckW = geometry.neckWidth

        paths.right = []
        paths.left = []

        for(let y = -H; y <= H; y += 8) {
            const x = neckW + (maxW - neckW) * Math.pow(
                Math.sin((Math.abs(y) / H) * (Math.PI / 2)),
                2.5
            )

            paths.right.push({ x, y })
            paths.left.push({ x: -x, y })
        }

        const glassPath = new Path2D()
        glassPath.moveTo(paths.right[0].x, paths.right[0].y)
        paths.right.forEach((pt) => glassPath.lineTo(pt.x, pt.y))

        const lastLeft = paths.left[paths.left.length - 1]
        glassPath.lineTo(lastLeft.x, lastLeft.y)

        for(let i = paths.left.length - 2; i >= 0; i--) {
            glassPath.lineTo(paths.left[i].x, paths.left[i].y)
        }

        glassPath.closePath()
        paths.glass = glassPath

        frostGradient = ctx.createLinearGradient(-maxW, 0, maxW, 0)
        frostGradient.addColorStop(0, "rgba(255,255,255,0.45)")
        frostGradient.addColorStop(0.15, "rgba(255,255,255,0.1)")
        frostGradient.addColorStop(0.85, "rgba(255,255,255,0.1)")
        frostGradient.addColorStop(1, "rgba(255,255,255,0.55)")
    }

    function createWallSegment(ptA, ptB, isLeft) {
        const { cx, cy } = dimensions
        const { wallThickness } = CONFIG
        const wallCollision = CONFIG.collision.wall

        const dx = ptB.x - ptA.x
        const dy = ptB.y - ptA.y
        const length = Math.hypot(dx, dy)
        const angle = Math.atan2(dy, dx)

        let nx = isLeft ? -dy : dy
        let ny = isLeft ? dx : -dx
        const normalLength = Math.hypot(nx, ny) || 1
        nx /= normalLength
        ny /= normalLength

        const mx = (ptA.x + ptB.x) / 2 + (nx * wallThickness) / 2
        const my = (ptA.y + ptB.y) / 2 + (ny * wallThickness) / 2

        const body = Bodies.rectangle(
            cx + mx,
            cy + my,
            length + 2,
            wallThickness,
            {
                isStatic: true,
                friction: 0.001,
                restitution: 0.1,
                collisionFilter: wallCollision
            }
        )

        Body.setAngle(body, angle)
        return body
    }

    function populateWorld() {
        const { cx, cy } = dimensions
        const { right: ptR, left: ptL } = paths
        const H = geometry.height
        const maxW = geometry.maxWidth
        const particleRadius = geometry.particleRadius
        const neckW = geometry.neckWidth
        const { wallThickness, maxParticles, colors } = CONFIG
        const particleCollision = CONFIG.collision.particle
        const wallCollision = CONFIG.collision.wall

        Composite.clear(engine.world)
        entities.particles = []
        entities.walls = []

        for(let i = 0; i < ptR.length - 1; i++) {
            entities.walls.push(createWallSegment(ptR[i], ptR[i + 1], false))
            entities.walls.push(createWallSegment(ptL[i], ptL[i + 1], true))
        }

        const capOptions = {
            isStatic: true,
            friction: 0.001,
            restitution: 0.1,
            collisionFilter: wallCollision
        }

        const capWidth = maxW * 2 + 40
        const capOffset = H + wallThickness / 2 - 2

        entities.walls.push(
            Bodies.rectangle(cx, cy - capOffset, capWidth, wallThickness, capOptions)
        )
        entities.walls.push(
            Bodies.rectangle(cx, cy + capOffset, capWidth, wallThickness, capOptions)
        )

        Composite.add(engine.world, entities.walls)

        const particleOptions = {
            restitution: 0.05,
            friction: 0.001,
            frictionAir: 0.001,
            density: 0.05,
            sleepThreshold: 60,
            collisionFilter: particleCollision
        }

        const step = particleRadius * 1.8
        const spawnPasses = 3
        const startY = -H + particleRadius * 5
        const endY = -H * 0.17
        const yRange = endY - startY || 1

        for(let pass = 0; pass < spawnPasses; pass++) {
            const yOffset = (pass / spawnPasses) * step
            const xOffset = ((pass + 1) / spawnPasses) * step

            for(let y = startY + yOffset; y < endY; y += step) {
                const rowWidth = neckW + (maxW - neckW) * Math.pow(
                    Math.sin((Math.abs(y) / H) * (Math.PI / 2)),
                    2.5
                )
                const limit = rowWidth - wallThickness / 2 - particleRadius * 2
                if(limit <= 0) continue

                const colorProgress = (y - startY) / yRange
                const colorIndex = clamp(Math.floor(colorProgress * colors.length), 0, colors.length - 1)
                const color = colors[colorIndex]

                for(let x = -limit + xOffset; x <= limit; x += step) {
                    if(entities.particles.length >= maxParticles) break

                    const randomizedRadius = particleRadius * (0.8 + Math.random() * 0.4)
                    const particle = Bodies.circle(
                        cx + x + (Math.random() - 0.5),
                        cy + y + (Math.random() - 0.5),
                        randomizedRadius,
                        {
                            ...particleOptions,
                            render: { fillStyle: color }
                        }
                    )

                    entities.particles.push(particle)
                }

                if(entities.particles.length >= maxParticles) break
            }

            if(entities.particles.length >= maxParticles) break
        }

        Composite.add(engine.world, entities.particles)
    }

    function renderGlassBackground() {
        const { cx, cy } = dimensions
        ctx.save()
        ctx.translate(cx, cy)
        ctx.fillStyle = "rgba(0,0,0,0.15)"
        ctx.fill(paths.glass)
        ctx.restore()
    }

    function renderParticles() {
        const buckets = groupParticlesByColor(entities.particles)

        for(const [color, particles] of buckets.entries()) {
            ctx.beginPath()

            for(const particle of particles) {
                const radius = particle.circleRadius || geometry.particleRadius
                ctx.moveTo(particle.position.x + radius, particle.position.y)
                ctx.arc(
                    particle.position.x,
                    particle.position.y,
                    radius,
                    0,
                    Math.PI * 2
                )
            }

            ctx.fillStyle = color
            ctx.fill()
        }
    }

    function renderGlassForeground() {
        const { cx, cy } = dimensions
        const { right: ptR, left: ptL } = paths
        const H = geometry.height
        const maxW = geometry.maxWidth

        ctx.save()
        ctx.translate(cx, cy)

        ctx.fillStyle = frostGradient
        ctx.fill(paths.glass)

        ctx.strokeStyle = "rgba(255,255,255,0.85)"
        ctx.lineWidth = 3

        ctx.beginPath()
        ctx.moveTo(ptL[0].x, ptL[0].y)
        ptL.forEach((pt) => ctx.lineTo(pt.x, pt.y))
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(ptR[0].x, ptR[0].y)
        ptR.forEach((pt) => ctx.lineTo(pt.x, pt.y))
        ctx.stroke()

        ctx.strokeStyle = "#4a2f14"
        ctx.lineWidth = 14
        ctx.lineCap = "round"

        ctx.beginPath()
        ctx.moveTo(-maxW - 16, -H)
        ctx.lineTo(maxW + 16, -H)
        ctx.moveTo(-maxW - 16, H)
        ctx.lineTo(maxW + 16, H)
        ctx.stroke()

        ctx.strokeStyle = "#8b5a2b"
        ctx.lineWidth = 8

        ctx.beginPath()
        ctx.moveTo(-maxW - 14, -H)
        ctx.lineTo(maxW + 14, -H)
        ctx.moveTo(-maxW - 14, H)
        ctx.lineTo(maxW + 14, H)
        ctx.stroke()

        ctx.restore()
    }

    function drawFrame(timestamp = performance.now()) {
        const { dtBase, maxDt } = CONFIG.physics
        const { width, height, cx, cy } = dimensions

        const dt = lastTimestamp != null ? Math.min(timestamp - lastTimestamp, maxDt) : dtBase
        lastTimestamp = timestamp

        const timeScale = Math.min(dt / dtBase, 2) * 0.065

        const diffDraw = angles.targetDraw - angles.draw
        angles.draw = Math.abs(diffDraw) < 0.0005
            ? angles.targetDraw
            : angles.draw + diffDraw * timeScale

        const diffGrav = angles.targetGravity - angles.gravity
        angles.gravity = Math.abs(diffGrav) < 0.0005
            ? angles.targetGravity
            : angles.gravity + diffGrav * timeScale

        engine.world.gravity.x = Math.sin(angles.gravity) * params.gravity
        engine.world.gravity.y = Math.cos(angles.gravity) * params.gravity

        entities.particles.forEach((particle) => {
            if(particle.isSleeping && Math.random() < 0.02) {
                Sleeping.set(particle, false)
            }
        })

        const subSteps = clamp(Math.ceil(dt / 8.333), 1, 6)
        const stepDt = dt / subSteps
        for(let i = 0; i < subSteps; i++) {
            Engine.update(engine, stepDt)
        }

        ctx.clearRect(0, 0, width, height)
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(angles.draw)
        ctx.translate(-cx, -cy)

        renderGlassBackground()
        renderParticles()
        renderGlassForeground()

        ctx.restore()
    }

    function tick(timestamp) {
        if(!running) return
        drawFrame(timestamp)
        rafId = requestAnimationFrame(tick)
    }

    function rebuildWorld() {
        lastTimestamp = null
        buildGeometry()
        populateWorld()
        drawFrame()
    }

    function scheduleRebuild() {
        if(rebuildRafId != null) cancelAnimationFrame(rebuildRafId)
        rebuildRafId = requestAnimationFrame(() => {
            rebuildRafId = null
            rebuildWorld()
        })
    }

    function reset() {
        angles.draw = 0
        angles.targetDraw = 0
        angles.gravity = 0
        angles.targetGravity = 0
        rebuildWorld()
    }

    function setGravity(nextGravity) {
        params.gravity = clamp(Number(nextGravity) || params.gravity, LIMITS.gravity.min, LIMITS.gravity.max)
        engine.world.gravity.x = Math.sin(angles.gravity) * params.gravity
        engine.world.gravity.y = Math.cos(angles.gravity) * params.gravity
        entities.particles.forEach((particle) => Sleeping.set(particle, false))
        drawFrame()
    }

    function setNeckRatio(nextNeckRatio) {
        params.neckRatio = clamp(Number(nextNeckRatio) || params.neckRatio, LIMITS.neckRatio.min, LIMITS.neckRatio.max)
        scheduleRebuild()
    }

    function setSize(width, height, devicePixelRatio = 1) {
        const w = Math.max(1, Math.floor(width || 1))
        const h = Math.max(1, Math.floor(height || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        dimensions.width = w
        dimensions.height = h
        dimensions.cx = w / 2
        dimensions.cy = h / 2

        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        reset()
    }

    function start() {
        if(running) return
        running = true
        lastTimestamp = null
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
    }

    function flip() {
        angles.targetDraw += Math.PI
        angles.targetGravity += Math.PI
        entities.particles.forEach((particle) => Sleeping.set(particle, false))
    }

    function renderStatic() {
        drawFrame()
    }

    function destroy() {
        stop()
        if(rebuildRafId != null) cancelAnimationFrame(rebuildRafId)
        rebuildRafId = null
        Composite.clear(engine.world)
    }

    return {
        setSize,
        setGravity,
        setNeckRatio,
        start,
        stop,
        flip,
        renderStatic,
        destroy,
        getState: () => ({
            gravity: params.gravity,
            neckRatio: params.neckRatio,
            limits: LIMITS
        })
    }
}
