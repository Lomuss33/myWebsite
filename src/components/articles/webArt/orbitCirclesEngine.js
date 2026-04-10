function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

export function createOrbitCirclesEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    const palette = Array.isArray(options.palette) && options.palette.length > 0 ? options.palette : [
        "#DD0F7E",
        "#009BBE",
        "#A8DA00",
        "#F2E205",
        "#EE5A02"
    ]
    const bgColor = options.bgColor || "#400036"
    const timeScale = Number.isFinite(options.timeScale) ? options.timeScale : 0.0015
    const totalCircles = clamp(Number(options.totalCircles) || 25, 12, 48)

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let center = { x: 0.5, y: 0.5 }
    let circles = []
    let running = false
    let rafId = null
    let startAt = 0
    let pausedAt = null
    let phase = 0

    function setCircles() {
        const length = Math.max(maxx, maxy)
        const separation = length / totalCircles

        const list = []
        let idxColor = 0
        for(let i = 0; i < totalCircles; i++) {
            const color = palette[idxColor % palette.length]
            list.push({
                index: i,
                separation,
                color,
                radio: i * separation
            })
            idxColor += 1
            if(i % palette.length === 0) idxColor = 0
        }
        circles = list
    }

    function renderAt(timeSeconds) {
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, maxx, maxy)

        const PI2 = Math.PI * 2

        for(let i = 0; i < circles.length; i++) {
            const c = circles[i]
            const sin = Math.sin(timeSeconds + c.index + phase)
            const cos = Math.cos(timeSeconds + c.index + phase)

            const posX = cos * c.separation
            const posY = sin * c.separation

            const lineWidth = Math.abs(sin * 22) + 0.5

            ctx.save()
            ctx.beginPath()
            ctx.strokeStyle = c.color
            ctx.translate(center.x, center.y)
            ctx.lineWidth = lineWidth
            ctx.arc(posX, posY, c.radio, 0, PI2, false)
            ctx.stroke()
            ctx.closePath()
            ctx.restore()
        }
    }

    function tick(nowMs) {
        if(!running) return
        const timeSeconds = (nowMs - startAt) * timeScale
        renderAt(timeSeconds)
        rafId = requestAnimationFrame(tick)
    }

    function renderStatic(nowMs = performance.now()) {
        if(startAt === 0) startAt = nowMs
        const timeSeconds = (nowMs - startAt) * timeScale
        renderAt(timeSeconds)
    }

    function setSize(width, height, devicePixelRatio = 1) {
        const w = Math.max(1, Math.floor(width || 1))
        const h = Math.max(1, Math.floor(height || 1))
        const dpr = clamp(Number(devicePixelRatio) || 1, 1, 2)

        maxx = w
        maxy = h
        center = { x: w / 2, y: h / 2 }

        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        setCircles()
        renderAt(0)
    }

    function start() {
        if(reduceMotion) {
            renderAt(0)
            return
        }
        if(running) return
        running = true
        const now = performance.now()
        if(startAt === 0) startAt = now
        if(pausedAt != null) startAt += (now - pausedAt)
        pausedAt = null
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        pausedAt = performance.now()
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function reset() {
        stop()
        startAt = performance.now()
        pausedAt = null
        phase = Math.random() * 6
        renderAt(0)
    }

    function destroy() {
        stop()
        circles = []
        ctx = null
    }

    function setCircleColor(index, color) {
        const i = Math.floor(Number(index))
        if(!Number.isFinite(i)) return
        if(i < 0 || i >= circles.length) return
        circles[i].color = String(color || circles[i].color)
        if(!running) renderStatic()
    }

    function getTotalCircles() {
        return circles.length
    }

    return {
        start,
        stop,
        renderStatic,
        reset,
        setCircleColor,
        getTotalCircles,
        destroy,
        setSize
    }
}
