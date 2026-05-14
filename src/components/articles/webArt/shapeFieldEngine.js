function mulberry32(seed) {
    let a = (seed >>> 0) || 1
    return function () {
        a |= 0
        a = (a + 0x6D2B79F5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

function smoothstep01(t) {
    const x = clamp(t, 0, 1)
    return x * x * (3 - 2 * x)
}

function durationToFactor(seconds) {
    if(seconds <= 0) return 1
    return 1 - Math.pow(0.05, 1 / (60 * seconds))
}

function pick(random, values) {
    return values[Math.floor(random() * values.length)]
}

function rnd(random, min, max) {
    return random() * (max - min) + min
}

function rndInt(random, min, max) {
    return Math.floor(rnd(random, min, max + 1))
}

const PALETTE = [
    { type: "solid", value: "#22c55e" },
    { type: "solid", value: "#06b6d4" },
    { type: "solid", value: "#f97316" },
    { type: "solid", value: "#ef4444" },
    { type: "solid", value: "#facc15" },
    { type: "solid", value: "#ec4899" },
    { type: "solid", value: "#9ca3af" },
    { type: "solid", value: "#a78bfa" },
    { type: "solid", value: "#60a5fa" },
    { type: "solid", value: "#34d399" },
    { type: "gradient", stops: ["#6366f1", "#3b82f6"] },
    { type: "gradient", stops: ["#06b6d4", "#6366f1"] },
    { type: "gradient", stops: ["#22c55e", "#06b6d4"] },
    { type: "gradient", stops: ["#f97316", "#ef4444"] },
    { type: "gradient", stops: ["#8b5cf6", "#06b6d4"] },
    { type: "gradient", stops: ["#3b82f6", "#8b5cf6"] },
    { type: "gradient", stops: ["#34d399", "#3b82f6"] }
]

const SHAPE_TYPES = ["circle", "pill", "star", "diamond", "triangle", "square", "cross", "hex", "octagon"]

function drawCircle(ctx, size) {
    ctx.beginPath()
    ctx.arc(0, 0, size, 0, Math.PI * 2)
    ctx.fill()
}

function drawPill(ctx, size) {
    const w = size * 0.48
    const h = size
    ctx.beginPath()
    if(typeof ctx.roundRect === "function") {
        ctx.roundRect(-w, -h, w * 2, h * 2, w)
    }
    else {
        ctx.moveTo(0, -h)
        ctx.arc(0, -h + w, w, -Math.PI / 2, Math.PI / 2)
        ctx.lineTo(0, h)
        ctx.arc(0, h - w, w, Math.PI / 2, Math.PI * 1.5)
    }
    ctx.fill()
}

function drawStar(ctx, size, points, innerRatio) {
    ctx.beginPath()
    for(let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2
        const radius = i % 2 === 0 ? size : size * innerRatio
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        if(i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
}

function drawPolygon(ctx, size, sides, rotation = 0) {
    ctx.beginPath()
    for(let i = 0; i < sides; i++) {
        const angle = rotation + (i * Math.PI * 2) / sides - Math.PI / 2
        const x = Math.cos(angle) * size
        const y = Math.sin(angle) * size
        if(i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
}

function drawCross(ctx, size, thicknessRatio = 0.36) {
    const arm = size
    const half = size * thicknessRatio
    ctx.beginPath()
    ctx.moveTo(-half, -arm)
    ctx.lineTo(half, -arm)
    ctx.lineTo(half, -half)
    ctx.lineTo(arm, -half)
    ctx.lineTo(arm, half)
    ctx.lineTo(half, half)
    ctx.lineTo(half, arm)
    ctx.lineTo(-half, arm)
    ctx.lineTo(-half, half)
    ctx.lineTo(-arm, half)
    ctx.lineTo(-arm, -half)
    ctx.lineTo(-half, -half)
    ctx.closePath()
    ctx.fill()
}

function drawShape(ctx, shape) {
    if(shape.type === "circle") {
        drawCircle(ctx, shape.size / 1.5)
        return
    }

    if(shape.type === "pill") {
        drawPill(ctx, shape.size / 1.4)
        return
    }

    if(shape.type === "star") {
        drawStar(ctx, shape.size, shape.points, shape.innerRatio)
        return
    }

    if(shape.type === "diamond") {
        drawPolygon(ctx, shape.size * 0.94, 4, Math.PI / 4)
        return
    }

    if(shape.type === "triangle") {
        drawPolygon(ctx, shape.size * 1.02, 3, shape.rotationBias || 0)
        return
    }

    if(shape.type === "square") {
        drawPolygon(ctx, shape.size * 0.9, 4, shape.rotationBias || 0)
        return
    }

    if(shape.type === "hex") {
        drawPolygon(ctx, shape.size * 0.96, 6, shape.rotationBias || 0)
        return
    }

    if(shape.type === "octagon") {
        drawPolygon(ctx, shape.size * 0.92, 8, shape.rotationBias || 0)
        return
    }

    if(shape.type === "cross") {
        drawCross(ctx, shape.size * 0.92, shape.thicknessRatio || 0.34)
        return
    }

    drawCircle(ctx, shape.size / 1.5)
}

function resolveFill(ctx, colorDef, size) {
    if(colorDef.type === "solid") return colorDef.value
    const grad = ctx.createRadialGradient(0, -size * 0.3, 0, 0, size * 0.3, size * 1.5)
    grad.addColorStop(0, colorDef.stops[0])
    grad.addColorStop(1, colorDef.stops[1])
    return grad
}

export function createShapeFieldEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 12345)
    const reduceMotion = Boolean(options.reduceMotion)
    const gap = Number.isFinite(options.gap) ? Math.max(14, options.gap) : 32
    const radiusRatio = Number.isFinite(options.radiusRatio) ? clamp(options.radiusRatio, 0.12, 0.7) : 0.30
    const speedIn = Number.isFinite(options.speedIn) ? options.speedIn : 0.5
    const speedOut = Number.isFinite(options.speedOut) ? options.speedOut : 0.6
    const restScale = Number.isFinite(options.restScale) ? options.restScale : 0.09
    const minHoverScale = Number.isFinite(options.minHoverScale) ? options.minHoverScale : 1
    const maxHoverScale = Number.isFinite(options.maxHoverScale) ? options.maxHoverScale : 3
    const waveSpeed = Number.isFinite(options.waveSpeed) ? options.waveSpeed : 1200
    const waveWidth = Number.isFinite(options.waveWidth) ? options.waveWidth : 180

    const random = mulberry32(seed)
    const ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let width = 1
    let height = 1
    let running = false
    let rafId = null

    let shapes = []
    let pointer = null
    let activity = 0
    let waves = []

    function randomStarProps() {
        return {
            points: rndInt(random, 4, 10),
            innerRatio: rnd(random, 0.1, 0.5)
        }
    }

    function randomShapeProps(type) {
        if(type === "star") return randomStarProps()
        if(type === "triangle" || type === "square" || type === "hex") {
            return {
                rotationBias: rnd(random, 0, Math.PI * 2)
            }
        }
        if(type === "cross") {
            return {
                thicknessRatio: rnd(random, 0.24, 0.42)
            }
        }
        return {}
    }

    function buildGrid() {
        const cols = Math.max(1, Math.floor(width / gap) + 1)
        const rows = Math.max(1, Math.floor(height / gap) + 1)
        const offsetX = cols <= 1 ? width / 2 : (width - (cols - 1) * gap) / 2
        const offsetY = rows <= 1 ? height / 2 : (height - (rows - 1) * gap) / 2
        const nextShapes = []

        for(let row = 0; row < rows; row++) {
            for(let col = 0; col < cols; col++) {
                const type = pick(random, SHAPE_TYPES)
                const shape = {
                    x: offsetX + col * gap,
                    y: offsetY + row * gap,
                    type,
                    color: pick(random, PALETTE),
                    angle: rnd(random, 0, Math.PI * 2),
                    size: gap * rnd(random, 0.34, 0.5),
                    scale: restScale,
                    maxScale: rnd(random, minHoverScale, maxHoverScale),
                    hovered: false
                }

                Object.assign(shape, randomShapeProps(type))

                nextShapes.push(shape)
            }
        }

        shapes = nextShapes
    }

    function drawFrame() {
        const radius = Math.min(width, height) * radiusRatio
        const now = performance.now()
        const maxDist = Math.hypot(width, height)

        ctx.clearRect(0, 0, width, height)
        ctx.fillStyle = "#080808"
        ctx.fillRect(0, 0, width, height)

        activity *= 0.93

        waves = waves.filter((wave) => {
            return ((now - wave.startTime) / 1000) * waveSpeed < maxDist + waveWidth
        })

        for(let i = 0; i < shapes.length; i++) {
            const shape = shapes[i]

            let pointerInfluence = 0
            if(pointer && activity > 0.001) {
                const dx = shape.x - pointer.x
                const dy = shape.y - pointer.y
                const dist = Math.hypot(dx, dy)
                pointerInfluence = smoothstep01(1 - dist / radius) * activity

                if(pointerInfluence > 0.05 && !shape.hovered) {
                    shape.hovered = true
                    shape.maxScale = rnd(random, minHoverScale, maxHoverScale)
                    shape.angle = rnd(random, 0, Math.PI * 2)
                    Object.assign(shape, randomShapeProps(shape.type))
                }
                else if(pointerInfluence <= 0.05) {
                    shape.hovered = false
                }
            }
            else {
                shape.hovered = false
            }

            let waveInfluence = 0
            for(let j = 0; j < waves.length; j++) {
                const wave = waves[j]
                const waveRadius = ((now - wave.startTime) / 1000) * waveSpeed
                const dx = shape.x - wave.x
                const dy = shape.y - wave.y
                const dist = Math.hypot(dx, dy)
                const t = 1 - Math.abs(dist - waveRadius) / waveWidth
                if(t > 0) {
                    waveInfluence = Math.max(waveInfluence, Math.sin(Math.PI * t))
                }
            }

            const pointerTarget = restScale + pointerInfluence * (shape.maxScale - restScale)
            const waveTarget = restScale + waveInfluence * (shape.maxScale - restScale)
            const target = Math.max(pointerTarget, waveTarget)
            const factor = target > shape.scale ? durationToFactor(speedIn) : durationToFactor(speedOut)

            shape.scale += (target - shape.scale) * factor

            if(shape.scale < restScale * 0.15) continue

            ctx.save()
            ctx.translate(shape.x, shape.y)
            ctx.rotate(shape.angle)
            ctx.scale(shape.scale, shape.scale)
            ctx.fillStyle = resolveFill(ctx, shape.color, shape.size)
            drawShape(ctx, shape)
            ctx.restore()
        }
    }

    function tick() {
        if(!running) return
        drawFrame()
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        buildGrid()
        drawFrame()
    }

    function start() {
        if(reduceMotion) {
            drawFrame()
            return
        }
        if(running) return
        running = true
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) {
            cancelAnimationFrame(rafId)
            rafId = null
        }
    }

    function setPointer(x, y) {
        pointer = { x, y }
        activity = 1
        if(reduceMotion) drawFrame()
    }

    function clearPointer() {
        pointer = null
        activity = 0
        if(reduceMotion) drawFrame()
    }

    function triggerWave(x = width / 2, y = height / 2) {
        waves.push({ x, y, startTime: performance.now() })
        if(reduceMotion) {
            drawFrame()
            return
        }
        start()
    }

    function renderStatic() {
        drawFrame()
    }

    function destroy() {
        stop()
        shapes = []
        waves = []
        pointer = null
    }

    return {
        setSize,
        start,
        stop,
        setPointer,
        clearPointer,
        triggerWave,
        renderStatic,
        destroy
    }
}
