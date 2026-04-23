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

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function clampMs(value, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(0, Math.min(5000, n))
}

function smoothstep01(t) {
    const x = clamp(t, 0, 1)
    return x * x * (3 - 2 * x)
}

export function createSpiralDotsEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 1)
    const reduceMotion = Boolean(options.reduceMotion)
    const dotsCount = clampInt(options.dotsCount, 40, 320, 160)
    const introDurationMs = clampMs(options.introDurationMs, 900)

    const dotsSpeed = Number.isFinite(options.dotsSpeed) ? options.dotsSpeed : 10
    const dotsWobbleFactor = Number.isFinite(options.dotsWobbleFactor) ? options.dotsWobbleFactor : 0.90
    const dotsWobbleSpeed = Number.isFinite(options.dotsWobbleSpeed) ? options.dotsWobbleSpeed : 0.05
    const dotsMouseDistanceSensitivity = Number.isFinite(options.dotsMouseDistanceSensitivity) ? options.dotsMouseDistanceSensitivity : 110
    const dotsMaxEscapeRouteLength = Number.isFinite(options.dotsMaxEscapeRouteLength) ? options.dotsMaxEscapeRouteLength : 110

    const random = mulberry32(seed)

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let running = false
    let rafId = null

    let mouse = { x: -10000, y: -10000, active: false }
    let dots = []
    let hueShift = 0
    let introStart = 0

    function rebuildDots() {
        const cx = maxx / 2
        const cy = maxy / 2
        const minSide = Math.min(maxx, maxy)
        const maxR = minSide * 0.42

        const baseRadius = clamp(minSide / 150, 1.4, 3.8)
        const spiralTightness = 0.62 + random() * 0.22
        const angleStep = 0.58 + random() * 0.18
        const angleOffset = random() * Math.PI * 2

        dots = new Array(dotsCount).fill(null).map((_, i) => {
            const t = dotsCount <= 1 ? 0 : (i / (dotsCount - 1))
            const rNorm = Math.sqrt(t)

            const a = angleOffset + i * angleStep
            const r = rNorm * maxR * spiralTightness

            const jitter = (1 - rNorm) * 4.0
            const px = cx + Math.cos(a) * r + (random() - 0.5) * jitter
            const py = cy + Math.sin(a) * r + (random() - 0.5) * jitter

            const hue = (a * 180 / Math.PI + t * 280 + seed * 0.03) % 360
            const dot = {
                cx: px,
                cy: py,
                x: px,
                y: py,
                sx: 0,
                sy: 0,
                r0: baseRadius * (0.9 + random() * 0.6),
                r: baseRadius,
                hue,
                active: 0
            }
            dot.r = dot.r0
            return dot
        })
    }

    function clear() {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)
    }

    function draw(introFactor = 1, withTrails = true) {
        // Subtle fade for trails (keeps it clean without heavy pixel loops)
        ctx.globalCompositeOperation = "source-over"
        if(withTrails) {
            ctx.fillStyle = `rgba(0,0,0,${0.28 * clamp(introFactor, 0, 1)})`
            ctx.fillRect(0, 0, maxx, maxy)
        }

        const mx = mouse.x
        const my = mouse.y
        const mouseActive = mouse.active
        const introAlpha = clamp(introFactor, 0, 1)
        const introMotion = clamp(introFactor, 0, 1)
        const effectiveDotsSpeed = dotsSpeed * (1 + (1 - introMotion) * 2.2)
        const effectiveWobbleSpeed = dotsWobbleSpeed * (0.25 + 0.75 * introMotion)

        for(let i = 0; i < dots.length; i++) {
            const dot = dots[i]
            const dx = dot.cx - mx
            const dy = dot.cy - my
            const distMouse = mouseActive ? Math.hypot(dx, dy) : 999999

            if(distMouse < dotsMouseDistanceSensitivity) {
                const angle = Math.atan2(my - dot.cy, mx - dot.cx)
                const dirX = Math.cos(angle) * -1
                const dirY = Math.sin(angle) * -1
                const targetPosX = dot.cx + dirX * dotsMaxEscapeRouteLength
                const targetPosY = dot.cy + dirY * dotsMaxEscapeRouteLength

                dot.x += (targetPosX - dot.x) / effectiveDotsSpeed
                dot.y += (targetPosY - dot.y) / effectiveDotsSpeed
                dot.active = 1

                const rTarget = dot.r0 * 2
                if(dot.r < rTarget) dot.r += (rTarget - dot.r) / (effectiveDotsSpeed * 2)
            }
            else {
                dot.sx = dot.sx * dotsWobbleFactor + (dot.cx - dot.x) * effectiveWobbleSpeed
                dot.sy = dot.sy * dotsWobbleFactor + (dot.cy - dot.y) * effectiveWobbleSpeed

                dot.x = dot.x + dot.sx
                dot.y = dot.y + dot.sy
                dot.active = 0

                if(dot.r > dot.r0) dot.r += (dot.r0 - dot.r) / effectiveDotsSpeed
            }

            dot.x = clamp(dot.x, -20, maxx + 20)
            dot.y = clamp(dot.y, -20, maxy + 20)
        }

        dots.sort((a, b) => (a.active - b.active))

        ctx.globalCompositeOperation = "lighter"
        for(let i = 0; i < dots.length; i++) {
            const dot = dots[i]
            const hue = (dot.hue + hueShift) % 360

            const lineAlphaBase = dot.active ? 0.95 : 0.55
            const lineAlpha = lineAlphaBase * introAlpha
            ctx.strokeStyle = `hsla(${hue} 100% 60% / ${lineAlpha})`
            ctx.lineWidth = dot.active ? 1.25 : 0.9
            ctx.beginPath()
            ctx.moveTo(dot.cx, dot.cy)
            ctx.lineTo(dot.x, dot.y)
            ctx.stroke()

            ctx.fillStyle = `hsla(${hue} 100% 62% / ${0.85 * introAlpha})`
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
            ctx.fill()

            ctx.fillStyle = `hsla(${hue} 100% 50% / ${0.22 * introAlpha})`
            ctx.beginPath()
            ctx.arc(dot.cx, dot.cy, Math.max(1, dot.r0 * 0.9), 0, Math.PI * 2)
            ctx.fill()
        }

        ctx.globalCompositeOperation = "source-over"
    }

    function tick(now) {
        if(!running) return
        const introT = introDurationMs > 0 ? ((now - introStart) / introDurationMs) : 1
        const intro = smoothstep01(introT)
        hueShift = (hueShift + (0.08 + 0.52 * intro)) % 360
        draw(intro, true)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(width, height, devicePixelRatio = 1) {
        const w = Math.max(1, Math.floor(width || 1))
        const h = Math.max(1, Math.floor(height || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        maxx = w
        maxy = h

        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        rebuildDots()
        clear()

        if(reduceMotion) {
            draw(1, false)
        }
    }

    function setMouse(x, y) {
        mouse.x = x
        mouse.y = y
        mouse.active = true
    }

    function clearMouse() {
        mouse.x = -10000
        mouse.y = -10000
        mouse.active = false
    }

    function start() {
        if(reduceMotion) {
            // Static render only (still reacts visually to last mouse if set)
            clear()
            draw(1, false)
            return
        }

        if(running) return
        introStart = performance.now()
        running = true
        // Quick first paint so it doesn't "pop" in on the first RAF tick.
        draw(0.12, false)
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        dots = []
        ctx = null
    }

    function renderStatic() {
        clear()
        draw(1, false)
    }

    return {
        start,
        stop,
        destroy,
        setSize,
        setMouse,
        clearMouse,
        rebuildDots,
        renderStatic
    }
}
