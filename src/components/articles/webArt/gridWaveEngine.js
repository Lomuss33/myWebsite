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

function hslToRgb(h, s, l) {
    // h [0..360), s/l [0..100]
    const hh = ((h % 360) + 360) % 360
    const ss = clamp(s / 100, 0, 1)
    const ll = clamp(l / 100, 0, 1)

    const c = (1 - Math.abs(2 * ll - 1)) * ss
    const x = c * (1 - Math.abs(((hh / 60) % 2) - 1))
    const m = ll - c / 2

    let r1 = 0, g1 = 0, b1 = 0
    if(hh < 60) { r1 = c; g1 = x; b1 = 0 }
    else if(hh < 120) { r1 = x; g1 = c; b1 = 0 }
    else if(hh < 180) { r1 = 0; g1 = c; b1 = x }
    else if(hh < 240) { r1 = 0; g1 = x; b1 = c }
    else if(hh < 300) { r1 = x; g1 = 0; b1 = c }
    else { r1 = c; g1 = 0; b1 = x }

    return {
        r: Math.round((r1 + m) * 255),
        g: Math.round((g1 + m) * 255),
        b: Math.round((b1 + m) * 255)
    }
}

export function createGridWaveEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 1)
    const reduceMotion = Boolean(options.reduceMotion)

    const targetCellSize = Number.isFinite(options.targetCellSize) ? options.targetCellSize : 14
    const gapPx = Number.isFinite(options.gapPx) ? options.gapPx : 1.4

    const random = mulberry32(seed)

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let running = false
    let rafId = null
    let startTime = 0

    let cols = 10
    let rows = 10
    let cellSize = 10
    let gap = gapPx
    let paddingX = 0
    let paddingY = 0

    let filled = []
    let jitter = []
    let ripples = []

    function rebuildGrid() {
        cols = clampInt(Math.floor(maxx / (targetCellSize + gap)), 10, 44, 18)
        rows = clampInt(Math.floor(maxy / (targetCellSize + gap)), 10, 44, 18)

        cellSize = Math.floor((maxx - gap * (cols + 1)) / cols)
        cellSize = clampInt(cellSize, 6, 24, 12)

        const gridW = cols * cellSize + (cols + 1) * gap
        const gridH = rows * cellSize + (rows + 1) * gap
        paddingX = Math.max(0, Math.floor((maxx - gridW) / 2))
        paddingY = Math.max(0, Math.floor((maxy - gridH) / 2))

        filled = new Array(cols * rows).fill(false).map(() => random() < 0.09)
        jitter = new Array(cols * rows).fill(0).map(() => (random() - 0.5) * 2)
        ripples = []
    }

    function cellIndex(c, r) {
        return r * cols + c
    }

    function addRipple(cellX, cellY, nowMs) {
        ripples.push({
            cx: cellX,
            cy: cellY,
            t0: nowMs,
            speed: 7.0 + random() * 1.5,
            strength: 120 + random() * 80
        })
        if(ripples.length > 6) ripples.shift()
    }

    function rippleAt(px, py, nowMs = performance.now()) {
        const gx = px - paddingX
        const gy = py - paddingY
        if(gx < 0 || gy < 0) return

        const full = cellSize + gap
        const c = Math.floor((gx - gap) / full)
        const r = Math.floor((gy - gap) / full)
        if(c < 0 || c >= cols || r < 0 || r >= rows) return
        // Multi-burst ripple for a clearer/stronger click effect
        addRipple(c, r, nowMs - 110)
        addRipple(c, r, nowMs - 45)
        addRipple(c, r, nowMs)

        if(reduceMotion) {
            startTime = startTime || nowMs
            drawFrame(nowMs)
        }
    }

    function drawFrame(nowMs) {
        const t = (nowMs - startTime) / 1000

        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)

        // Cleanup old ripples
        ripples = ripples.filter(r => (nowMs - r.t0) < 2800)

        const cx = (cols - 1) / 2
        const cy = (rows - 1) / 2

        const freq = 2.4
        const freq2 = 4.6
        const omega = 1.35
        const omega2 = 2.10

        for(let r = 0; r < rows; r++) {
            for(let c = 0; c < cols; c++) {
                const idx = cellIndex(c, r)
                const isFilled = filled[idx]

                const nx = (c - cx) / Math.max(1, cx)
                const ny = (r - cy) / Math.max(1, cy)
                const rr = Math.hypot(nx, ny)

                let wave =
                    Math.sin((nx * 1.6 + ny * 2.0) * Math.PI * freq + t * omega) +
                    Math.sin(rr * Math.PI * freq2 - t * omega2)

                wave *= 0.5

                let rippleShift = 0
                let rippleLight = 0
                for(let i = 0; i < ripples.length; i++) {
                    const rp = ripples[i]
                    const dist = Math.hypot(c - rp.cx, r - rp.cy)
                    const age = (nowMs - rp.t0) / 1000
                    const phase = dist - age * rp.speed
                    const envelope = Math.exp(-dist * 0.22) * Math.exp(-age * 0.85)
                    const s = Math.sin(phase * 2.2)
                    rippleShift += s * envelope * (rp.strength / 2)
                    rippleLight += Math.abs(s) * envelope * 54
                }

                if(isFilled) {
                    ctx.fillStyle = "rgba(0,0,0,0.92)"
                }
                else {
                    const baseHue = (t * 52 + (c * 9) + (r * 6) + jitter[idx] * 18 + wave * 55 + rippleShift) % 360
                    const sat = 92
                    const light = 48 + wave * 10 + rippleLight
                    const rgb = hslToRgb(baseHue, sat, clamp(light, 18, 72))
                    ctx.fillStyle = `rgb(${rgb.r} ${rgb.g} ${rgb.b})`
                }

                const x = paddingX + gap + c * (cellSize + gap)
                const y = paddingY + gap + r * (cellSize + gap)

                if(!isFilled && rippleLight > 0.5) {
                    const inset = clamp(0.9 + rippleLight / 26, 1, 3.5)
                    ctx.fillRect(x + inset, y + inset, cellSize - inset * 2, cellSize - inset * 2)
                }
                else {
                    ctx.fillRect(x, y, cellSize, cellSize)
                }
            }
        }

        // Extra ring overlay for obvious “shockwave” feedback
        ctx.globalCompositeOperation = "lighter"
        for(let i = 0; i < ripples.length; i++) {
            const rp = ripples[i]
            const age = Math.max(0, (nowMs - rp.t0) / 1000)
            const centerX = paddingX + gap + rp.cx * (cellSize + gap) + cellSize / 2
            const centerY = paddingY + gap + rp.cy * (cellSize + gap) + cellSize / 2
            const radius = age * rp.speed * (cellSize + gap)

            const hue = (age * 160 + seed * 0.12 + rp.cx * 11 + rp.cy * 7) % 360
            const alpha = clamp(1.15 - age * 0.75, 0, 1)
            if(alpha <= 0) continue

            ctx.lineWidth = clamp(3.5 - age * 1.2, 1.2, 3.5)
            ctx.strokeStyle = `hsla(${hue} 100% 65% / ${alpha})`
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()

            ctx.lineWidth = clamp(7.5 - age * 2.4, 2.0, 7.5)
            ctx.strokeStyle = `hsla(${hue} 100% 60% / ${alpha * 0.18})`
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()
        }
        ctx.globalCompositeOperation = "source-over"
    }

    function tick(nowMs) {
        if(!running) return
        drawFrame(nowMs)
        rafId = requestAnimationFrame(tick)
    }

    function renderStatic(nowMs = performance.now()) {
        startTime = startTime || nowMs
        drawFrame(nowMs)
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
        rebuildGrid()

        if(reduceMotion) {
            startTime = performance.now()
            drawFrame(startTime)
        }
    }

    function start() {
        if(reduceMotion) return
        if(running) return
        running = true
        startTime = startTime || performance.now()
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        ctx = null
        filled = []
        jitter = []
        ripples = []
    }

    return {
        start,
        stop,
        renderStatic,
        destroy,
        setSize,
        rippleAt
    }
}
