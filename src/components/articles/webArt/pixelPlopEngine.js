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

class Cell {
    constructor(kx, ky, step, side, hue) {
        this.kx = kx
        this.ky = ky
        this.x = step * kx + (step - side) / 2
        this.y = step * ky + (step - side) / 2
        this.hue = hue
    }

    draw(ctx, side) {
        ctx.fillStyle = `hsl(${this.hue},100%,50%)`
        ctx.fillRect(this.x, this.y, side, side)
    }

    addHue(ctx, side, hue) {
        this.hue = (this.hue + hue + 360) % 360
        this.draw(ctx, side)
    }
}

class Plop {
    constructor(kx, ky, tstamp, grid, dims, random, dradius) {
        this.kx = kx
        this.ky = ky
        this.grid = grid
        this.nbx = dims.nbx
        this.nby = dims.nby
        this.random = random
        this.hue = Math.floor(60 + random() * 240)
        this.radius = 0
        this.list0 = [{ u: 1, v: 0 }]
        this.list1 = [{ u: 1, v: 1 }]
        grid[ky][kx].pendingHue = (grid[ky][kx].pendingHue || 0) + this.hue
        this.tstamp = tstamp
        this.dradius = dradius || (0.5 + random() * 0.5)
        this.radiusMax = 0
        this.second = Boolean(dradius)
        if(!this.second) this.radiusSecond = 2 + random()

        let r1 = Math.hypot(kx, ky)
        if(r1 > this.radiusMax) this.radiusMax = r1
        r1 = Math.hypot(this.nbx - kx, ky)
        if(r1 > this.radiusMax) this.radiusMax = r1
        r1 = Math.hypot(this.nbx - kx, this.nby - ky)
        if(r1 > this.radiusMax) this.radiusMax = r1
        r1 = Math.hypot(kx, this.nby - ky)
        if(r1 > this.radiusMax) this.radiusMax = r1
        this.radiusMax += 1
    }

    run(tstamp, queue) {
        if(tstamp - this.tstamp < 25) return
        this.tstamp += 25

        this.radius += this.dradius
        if(!this.second && this.radius >= this.radiusSecond) {
            queue.push({ kx: this.kx, ky: this.ky, speed: this.dradius })
            this.second = true
        }

        let count = this.list0.length
        for(let i = 0; i < count; i++) this.prop0(this.list0[i].u, this.list0[i].v)
        this.list0.splice(0, count)

        count = this.list1.length
        for(let i = 0; i < count; i++) this.prop1(this.list1[i].u, this.list1[i].v)
        this.list1.splice(0, count)
    }

    prop0(u, v) {
        if(Math.hypot(u, v) <= this.radius) {
            this.include(this.kx + u, this.ky + v)
            this.include(this.kx - v, this.ky + u)
            this.include(this.kx - u, this.ky - v)
            this.include(this.kx + v, this.ky - u)
            this.prop0(u + 1, v)
            if(u === v + 2) this.prop0(u, v + 1)
        }
        else {
            this.list0.push({ u, v })
        }
    }

    prop1(u, v) {
        if(Math.hypot(u, v) <= this.radius) {
            this.include(this.kx + v, this.ky + u)
            this.include(this.kx - u, this.ky + v)
            this.include(this.kx - v, this.ky - u)
            this.include(this.kx + u, this.ky - v)
            this.prop1(u + 1, v)
            if(u === v + 1) this.prop1(u, v + 1)
        }
        else {
            this.list1.push({ u, v })
        }
    }

    include(x, y) {
        if(x < 0 || y < 0 || x >= this.nbx || y >= this.nby) return
        const cell = this.grid[y][x]
        cell.pendingHue = (cell.pendingHue || 0) + this.hue
    }
}

export function createPixelPlopEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 1)
    const reduceMotion = Boolean(options.reduceMotion)
    const step = clampInt(options.step, 4, 16, 6)
    const side = clampInt(options.side, 2, step, 5)
    const autoSeedIntervalMs = clampInt(options.autoSeedIntervalMs, 250, 4000, 900)
    const maxAmbientPlops = clampInt(options.maxAmbientPlops, 1, 24, 3)

    const random = mulberry32(seed)
    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let nbx = 1
    let nby = 1
    let grid = []
    let queue = []
    let plops = []
    let running = false
    let rafId = null
    let lastAutoSeed = 0

    function createGrid() {
        nbx = Math.max(3, Math.ceil(maxx / step))
        nby = Math.max(3, Math.ceil(maxy / step))
        const hue = Math.floor(random() * 360)

        grid = new Array(nby).fill(null).map((_, ky) => {
            return new Array(nbx).fill(null).map((__, kx) => new Cell(kx, ky, step, side, hue))
        })

        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)
        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                grid[ky][kx].draw(ctx, side)
            }
        }
    }

    function flushPending() {
        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                const cell = grid[ky][kx]
                if(!cell.pendingHue) continue
                cell.addHue(ctx, side, cell.pendingHue)
                cell.pendingHue = 0
            }
        }
    }

    function enqueueBurst(kx, ky, speed) {
        const x = clampInt(kx, 0, nbx - 1, 0)
        const y = clampInt(ky, 0, nby - 1, 0)
        queue.push({ kx: x, ky: y, speed })
    }

    function seedBurst() {
        enqueueBurst(Math.floor(random() * nbx), Math.floor(random() * nby))
    }

    function burstAt(px, py) {
        const x = clampInt(Math.round(((Number(px) || 0) - (step - side) / 2 - side / 2) / step), 0, nbx - 1, 0)
        const y = clampInt(Math.round(((Number(py) || 0) - (step - side) / 2 - side / 2) / step), 0, nby - 1, 0)
        enqueueBurst(x, y)
    }

    function reset() {
        queue = []
        plops = []
        createGrid()
        lastAutoSeed = 0
    }

    function renderStatic() {
        if(!grid.length) createGrid()
        flushPending()
    }

    function tick(now) {
        if(!running) return

        if(now - lastAutoSeed > autoSeedIntervalMs) {
            if(plops.length < maxAmbientPlops && queue.length === 0) seedBurst()
            lastAutoSeed = now
        }

        while(queue.length > 0) {
            const click = queue.shift()
            plops.push(new Plop(click.kx, click.ky, now, grid, { nbx, nby }, random, click.speed))
        }

        for(let i = plops.length - 1; i >= 0; i--) {
            plops[i].run(now, queue)
            if(plops[i].radius >= plops[i].radiusMax) {
                plops.splice(i, 1)
            }
        }

        flushPending()
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
        ctx.imageSmoothingEnabled = false

        reset()
    }

    function start() {
        if(reduceMotion) {
            renderStatic()
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
        grid = []
        queue = []
        plops = []
        ctx = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        renderStatic,
        setSize,
        seedBurst,
        burstAt
    }
}
