function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function clampInt(value, min, max, fallback) {
    const n = Number(value)
    if(!Number.isFinite(n)) return fallback
    return Math.max(min, Math.min(max, Math.floor(n)))
}

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

function createNoise1DOneShot(periodMin, periodMax, min, max, random) {
    let currx = random()
    let y0 = min + (max - min) * random()
    let y1 = min + (max - min) * random()
    let period = periodMin + (periodMax - periodMin) * random()
    let dx = 1 / period

    return function nextNoise() {
        currx += dx
        if(currx > 1) {
            currx -= 1
            period = periodMin + (periodMax - periodMin) * random()
            dx = 1 / period
            y0 = y1
            y1 = min + (max - min) * random()
        }

        const z = (3 - 2 * currx) * currx * currx
        return z * y1 + (1 - z) * y0
    }
}

function convertedWinding(value) {
    const v = clamp(Number.isFinite(value) ? value : 0.5, 0, 1)
    const min = 0.5
    const max = 0.04
    return max * v + min * (1 - v)
}

function angle3Points(p0, p1, p2) {
    const dx0 = p0[0] - p1[0]
    const dy0 = p0[1] - p1[1]
    const dx2 = p2[0] - p1[0]
    const dy2 = p2[1] - p1[1]
    const pv = dx0 * dy2 - dx2 * dy0
    const ps = dx0 * dx2 + dy0 * dy2
    return Math.atan2(pv, ps)
}

class RandomPath {
    constructor(bounds, options, random) {
        this.random = random
        this.winding = convertedWinding(options.winding)
        this.step = Math.max(1, Number(options.step) || 10)
        this.margin = clampInt(options.margin, 8, 48, 20)
        this.minAngle = 0.75

        this.reset(bounds)
    }

    reset(bounds) {
        this.xmin = this.margin
        this.ymin = this.margin
        this.xmax = Math.max(this.xmin + 10, bounds.width - this.margin)
        this.ymax = Math.max(this.ymin + 10, bounds.height - this.margin)
        this.lRef = Math.max(10, Math.min(this.xmax - this.xmin, this.ymax - this.ymin))
        this.minDist = this.lRef * this.winding

        this.p0 = this.randomPoint()
        do {
            this.p1 = this.randomPoint()
        } while(Math.hypot(this.p1[0] - this.p0[0], this.p1[1] - this.p0[1]) < this.minDist)

        this.p2 = this.nextPoint(this.p0, this.p1)
        this.p3 = this.nextPoint(this.p1, this.p2)

        this.tp1 = RandomPath.bezierTangents(this.p0, this.p1, this.p2)
        this.tp2 = RandomPath.bezierTangents(this.p1, this.p2, this.p3)
        this.coeffs = RandomPath.bezierControlToParam([this.p1, this.tp1[1], this.tp2[0], this.p2])
        this.alpha = 0
        this.currentPosition = this.p1.slice()
    }

    randomPoint() {
        return [
            this.xmin + (this.xmax - this.xmin) * this.random(),
            this.ymin + (this.ymax - this.ymin) * this.random()
        ]
    }

    move() {
        const speed = Math.hypot(
            this.coeffs[1][0] + this.alpha * (2 * this.coeffs[2][0] + this.alpha * 3 * this.coeffs[3][0]),
            this.coeffs[1][1] + this.alpha * (2 * this.coeffs[2][1] + this.alpha * 3 * this.coeffs[3][1])
        )

        const dAlpha = this.step / Math.max(0.0001, speed)
        if(this.alpha + dAlpha > 1) {
            this.nextSegment()
        }
        else {
            this.alpha += dAlpha
            this.currentPosition = this.getPosition(this.alpha)
        }
    }

    nextSegment() {
        this.minDist = this.lRef * this.winding
        this.p0 = this.p1
        this.p1 = this.p2
        this.p2 = this.p3
        this.p3 = this.nextPoint(this.p1, this.p2)
        this.tp1 = this.tp2
        this.tp2 = RandomPath.bezierTangents(this.p1, this.p2, this.p3)
        this.coeffs = RandomPath.bezierControlToParam([this.p1, this.tp1[1], this.tp2[0], this.p2])

        const runAt1 = Math.hypot(this.p1[0] - this.currentPosition[0], this.p1[1] - this.currentPosition[1])
        if(runAt1 >= this.step) {
            this.alpha = 0
        }
        else {
            const dist = this.step - runAt1
            const speed = Math.hypot(this.coeffs[1][0], this.coeffs[1][1])
            this.alpha = Math.min(dist / Math.max(0.0001, speed), 1)
        }
        this.currentPosition = this.getPosition(this.alpha)
    }

    getPosition(alpha) {
        return [
            this.coeffs[0][0] + alpha * (this.coeffs[1][0] + alpha * (this.coeffs[2][0] + alpha * this.coeffs[3][0])),
            this.coeffs[0][1] + alpha * (this.coeffs[1][1] + alpha * (this.coeffs[2][1] + alpha * this.coeffs[3][1]))
        ]
    }

    nextPoint(p0, p1) {
        let tries = 10000
        while(tries-- > 0) {
            const point = this.randomPoint()
            const d0 = Math.hypot(point[0] - p0[0], point[1] - p0[1])
            const d1 = Math.hypot(point[0] - p1[0], point[1] - p1[1])

            if(d0 < this.minDist) continue
            if(d1 < this.minDist || d1 > 3 * this.minDist) continue
            if(Math.abs(angle3Points(p0, p1, point)) < this.minAngle) continue
            return point
        }

        return this.randomPoint()
    }

    static bezierTangents(p0, p1, p2) {
        const coeff = 0.6
        const dx0 = p0[0] - p1[0]
        const dy0 = p0[1] - p1[1]
        const l0 = Math.hypot(dx0, dy0)
        const dx2 = p2[0] - p1[0]
        const dy2 = p2[1] - p1[1]
        const l2 = Math.hypot(dx2, dy2)

        let xmid = dx0 / l0 + dx2 / l2
        let ymid = dy0 / l0 + dy2 / l2
        const lmid = Math.hypot(xmid, ymid)
        xmid /= lmid
        ymid /= lmid

        const lproj1 = ymid * dx0 - xmid * dy0
        const lproj2 = ymid * dx2 - xmid * dy2

        return [
            [p1[0] + coeff * lproj1 * ymid, p1[1] - coeff * lproj1 * xmid],
            [p1[0] + coeff * lproj2 * ymid, p1[1] - coeff * lproj2 * xmid]
        ]
    }

    static bezierControlToParam(bezier) {
        return [
            [bezier[0][0], bezier[0][1]],
            [
                -3 * bezier[0][0] + 3 * bezier[1][0],
                -3 * bezier[0][1] + 3 * bezier[1][1]
            ],
            [
                3 * bezier[0][0] - 6 * bezier[1][0] + 3 * bezier[2][0],
                3 * bezier[0][1] - 6 * bezier[1][1] + 3 * bezier[2][1]
            ],
            [
                -bezier[0][0] + 3 * bezier[1][0] - 3 * bezier[2][0] + bezier[3][0],
                -bezier[0][1] + 3 * bezier[1][1] - 3 * bezier[2][1] + bezier[3][1]
            ]
        ]
    }
}

export function createTortuosityTraceEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 1)
    const reduceMotion = Boolean(options.reduceMotion)
    const radius = clampInt(options.radius, 2, 36, 30)
    const speed = Math.max(0, Number(options.speed) || 0)
    const loopsBase = Math.max(1, Math.round(1 + speed * 100))
    const strokeCycleMs = clampInt(options.strokeCycleMs, 250, 4000, 1000)

    const random = mulberry32(seed)

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let running = false
    let rafId = null

    let path = null
    let hue = 0
    let hueNoise = null
    let lastFrameMs = 0

    function clear() {
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)
    }

    function reset() {
        clear()
        path = new RandomPath({ width: maxx, height: maxy }, options, random)
        hue = Math.floor(random() * 360)
        hueNoise = createNoise1DOneShot(100, 200, -2, 2, random)
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.lineWidth = 1
        ctx.strokeStyle = "#000"
    }

    function drawStep(nowMs) {
        if(!path) return

        const loops = reduceMotion ? 1 : loopsBase
        for(let i = 0; i < loops; i++) {
            hue += hueNoise()
            if(hue > 360) hue -= 360
            else if(hue < 0) hue += 360

            path.move()

            const strokeOn = Math.floor(nowMs / strokeCycleMs) % 2 === 0
            ctx.fillStyle = `hsl(${hue},100%,50%)`
            ctx.beginPath()
            ctx.arc(path.currentPosition[0], path.currentPosition[1], radius, 0, Math.PI * 2)
            if(strokeOn) ctx.stroke()
            ctx.fill()
        }
    }

    function tick(nowMs) {
        if(!running) return
        lastFrameMs = nowMs
        drawStep(nowMs)
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
        canvas.style.width = `${w}px`
        canvas.style.height = `${h}px`
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        reset()
    }

    function renderStatic(nowMs = performance.now()) {
        if(!path) reset()
        drawStep(nowMs)
    }

    function start() {
        if(running) return
        if(reduceMotion) {
            renderStatic()
            return
        }

        running = true
        lastFrameMs = performance.now()
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        path = null
        hueNoise = null
        ctx = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        renderStatic,
        setSize
    }
}
