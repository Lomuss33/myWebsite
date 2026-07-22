const TAU = Math.PI * 2
const SQRT3 = Math.sqrt(3)
const SQRT3_OVER_2 = SQRT3 / 2

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function mix(min, max, amount) {
    return min + (max - min) * amount
}

function smoothstep(edge0, edge1, value) {
    const t = clamp((value - edge0) / Math.max(0.000001, edge1 - edge0), 0, 1)
    return t * t * (3 - 2 * t)
}

function normalizeHue(hue) {
    return ((hue % 360) + 360) % 360
}

function randomBetween(random, min, max) {
    return min + random() * (max - min)
}

function randomInt(random, min, max) {
    return min + Math.floor(random() * (max - min))
}

function mulberry32(seed) {
    let value = seed >>> 0

    return function random() {
        value += 0x6d2b79f5
        let t = value
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

function hashFunction(seed) {
    let n0 = 0xefc8249d
    let n = n0
    mash(seed || Math.random())
    n0 = n

    function mash(data) {
        data = `${data}U`
        n = n0
        for(let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i)
            let h = 0.02519603282416938 * n
            n = h >>> 0
            h -= n
            h *= n
            n = h >>> 0
            h -= n
            n += h * 0x100000000
        }
        return (n >>> 0) * 2.3283064365386963e-10
    }

    return mash
}

function noise1D(period, min = 0, max = 1, hash = hashFunction()) {
    let currx
    let y0
    let y1
    const phase = hash(0)

    return function noise(x) {
        const xx = x / period + phase
        const intx = Math.floor(xx)

        if(intx - 1 === currx) {
            currx += 1
            y0 = y1
            y1 = min + (max - min) * hash(currx + 1)
        }
        else if(intx !== currx) {
            currx = intx
            y0 = min + (max - min) * hash(currx)
            y1 = min + (max - min) * hash(currx + 1)
        }

        const frac = xx - currx
        const z = (3 - 2 * frac) * frac * frac
        return z * y1 + (1 - z) * y0
    }
}

function noise1DOneShotModuloTime(period, modulo, step, random = Math.random) {
    let currx = 1 + random()
    let y0 = random()
    let y1 = y0
    let currentPeriod = period
    let prevT

    return function noise(time) {
        if(prevT === undefined) prevT = time
        const dt = clamp(time - prevT, 0, 120)
        prevT = time
        currx += dt / currentPeriod

        while(currx > 1) {
            currx -= 1
            y0 = y1 % 1
            y1 = y0 + step * (2 * random() - 1)
            while(y1 < 0) {
                y0 += 1
                y1 += 1
            }
            currentPeriod = period * (0.8 + 0.4 * random())
        }

        const z = (3 - 2 * currx) * currx * currx
        return ((z * y1 + (1 - z) * y0) % 1) * modulo
    }
}

/*
 * 3D simplex noise adapted from the fast JavaScript implementation by Jonas Wagner,
 * based on work by Stefan Gustavson and Peter Eastman. MIT licensed.
 */
const SIMPLEX_F3 = 1 / 3
const SIMPLEX_G3 = 1 / 6
const SIMPLEX_GRAD3 = new Float32Array([
    1, 1, 0, -1, 1, 0, 1, -1, 0,
    -1, -1, 0, 1, 0, 1, -1, 0, 1,
    1, 0, -1, -1, 0, -1, 0, 1, 1,
    0, -1, 1, 0, 1, -1, 0, -1, -1
])

class SimplexNoise {
    constructor(random = Math.random) {
        this.p = new Uint8Array(256)
        this.perm = new Uint8Array(512)
        this.permMod12 = new Uint8Array(512)

        for(let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(random() * 256)
        }

        for(let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255]
            this.permMod12[i] = this.perm[i] % 12
        }
    }

    noise3D(xin, yin, zin) {
        let n0
        let n1
        let n2
        let n3
        const s = (xin + yin + zin) * SIMPLEX_F3
        const i = Math.floor(xin + s)
        const j = Math.floor(yin + s)
        const k = Math.floor(zin + s)
        const t = (i + j + k) * SIMPLEX_G3
        const x0 = xin - (i - t)
        const y0 = yin - (j - t)
        const z0 = zin - (k - t)
        let i1
        let j1
        let k1
        let i2
        let j2
        let k2

        if(x0 >= y0) {
            if(y0 >= z0) {
                i1 = 1
                j1 = 0
                k1 = 0
                i2 = 1
                j2 = 1
                k2 = 0
            }
            else if(x0 >= z0) {
                i1 = 1
                j1 = 0
                k1 = 0
                i2 = 1
                j2 = 0
                k2 = 1
            }
            else {
                i1 = 0
                j1 = 0
                k1 = 1
                i2 = 1
                j2 = 0
                k2 = 1
            }
        }
        else if(y0 < z0) {
            i1 = 0
            j1 = 0
            k1 = 1
            i2 = 0
            j2 = 1
            k2 = 1
        }
        else if(x0 < z0) {
            i1 = 0
            j1 = 1
            k1 = 0
            i2 = 0
            j2 = 1
            k2 = 1
        }
        else {
            i1 = 0
            j1 = 1
            k1 = 0
            i2 = 1
            j2 = 1
            k2 = 0
        }

        const x1 = x0 - i1 + SIMPLEX_G3
        const y1 = y0 - j1 + SIMPLEX_G3
        const z1 = z0 - k1 + SIMPLEX_G3
        const x2 = x0 - i2 + 2 * SIMPLEX_G3
        const y2 = y0 - j2 + 2 * SIMPLEX_G3
        const z2 = z0 - k2 + 2 * SIMPLEX_G3
        const x3 = x0 - 1 + 3 * SIMPLEX_G3
        const y3 = y0 - 1 + 3 * SIMPLEX_G3
        const z3 = z0 - 1 + 3 * SIMPLEX_G3
        const ii = i & 255
        const jj = j & 255
        const kk = k & 255
        let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0

        if(t0 < 0) n0 = 0
        else {
            const gi0 = this.permMod12[ii + this.perm[jj + this.perm[kk]]] * 3
            t0 *= t0
            n0 = t0 * t0 * (
                SIMPLEX_GRAD3[gi0] * x0 +
                SIMPLEX_GRAD3[gi0 + 1] * y0 +
                SIMPLEX_GRAD3[gi0 + 2] * z0
            )
        }

        let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1
        if(t1 < 0) n1 = 0
        else {
            const gi1 = this.permMod12[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] * 3
            t1 *= t1
            n1 = t1 * t1 * (
                SIMPLEX_GRAD3[gi1] * x1 +
                SIMPLEX_GRAD3[gi1 + 1] * y1 +
                SIMPLEX_GRAD3[gi1 + 2] * z1
            )
        }

        let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2
        if(t2 < 0) n2 = 0
        else {
            const gi2 = this.permMod12[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] * 3
            t2 *= t2
            n2 = t2 * t2 * (
                SIMPLEX_GRAD3[gi2] * x2 +
                SIMPLEX_GRAD3[gi2 + 1] * y2 +
                SIMPLEX_GRAD3[gi2 + 2] * z2
            )
        }

        let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3
        if(t3 < 0) n3 = 0
        else {
            const gi3 = this.permMod12[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] * 3
            t3 *= t3
            n3 = t3 * t3 * (
                SIMPLEX_GRAD3[gi3] * x3 +
                SIMPLEX_GRAD3[gi3 + 1] * y3 +
                SIMPLEX_GRAD3[gi3 + 2] * z3
            )
        }

        return 32 * (n0 + n1 + n2 + n3)
    }
}

function makeHexPath(ctx, x, y, radius) {
    ctx.beginPath()
    for(let i = 0; i < 6; i++) {
        const angle = i * TAU / 6
        const px = x + Math.cos(angle) * radius
        const py = y + Math.sin(angle) * radius
        if(i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
    }
    ctx.closePath()
}

function getBezierControlPoints(p0, p1, p2, p3) {
    const coeffDir = 0.3
    const length = Math.hypot(p2[0] - p1[0], p2[1] - p1[1])
    const controlLength = length * coeffDir
    let dx = p2[0] - p0[0]
    let dy = p2[1] - p0[1]
    let tangentLength = Math.max(0.0001, Math.hypot(dx, dy))
    const x1c = p1[0] + controlLength * dx / tangentLength
    const y1c = p1[1] + controlLength * dy / tangentLength

    dx = p1[0] - p3[0]
    dy = p1[1] - p3[1]
    tangentLength = Math.max(0.0001, Math.hypot(dx, dy))
    const x2c = p2[0] + controlLength * dx / tangentLength
    const y2c = p2[1] + controlLength * dy / tangentLength

    return [[x1c, y1c], [x2c, y2c]]
}

class BlobRibbon {
    constructor(seed, index, random) {
        this.seed = seed
        this.index = index
        this.depth = 0.68 + index * 0.23
        this.scale = 0.29 + index * 0.075
        this.nbDots = randomInt(random, 4, 9)
        this.symm = randomInt(random, 3, 6)
        this.phase = randomBetween(random, 0, 12000)
        this.rotation = randomBetween(random, 0, TAU)
        this.rotationSpeed = randomBetween(random, -0.00008, 0.00008)
        this.fxs = new Array(this.nbDots)
            .fill(0)
            .map((_, dotIndex) => noise1D(randomBetween(random, 9000, 19000), -1, 1, hashFunction(`${seed}:x:${dotIndex}`)))
        this.fys = new Array(this.nbDots)
            .fill(0)
            .map((_, dotIndex) => noise1D(randomBetween(random, 9000, 19000), -1, 1, hashFunction(`${seed}:y:${dotIndex}`)))
        this.fhue = noise1DOneShotModuloTime(randomBetween(random, 1700, 3400), 360, 0.28, random)
        this.points = []
        this.p1 = []
        this.p2 = []
        this.nbDirs = 0
    }

    actu(time, scene) {
        const localTime = time + this.phase
        const basePoints = []
        let maxLength = 0

        for(let k = 0; k < this.nbDots; k++) {
            const x = this.fxs[k](localTime)
            const y = this.fys[k](localTime)
            maxLength = Math.max(maxLength, Math.hypot(x, y))
            basePoints.push([x, y])
        }

        maxLength = Math.max(maxLength, 0.001)
        this.points = []
        const sceneScale = scene.lRef * (this.scale + scene.energy * 0.045) / maxLength
        const rotation = this.rotation + time * this.rotationSpeed + (scene.pointerX - 0.5) * 0.28

        for(let k = 0; k < basePoints.length; k++) {
            const x = basePoints[k][0] * sceneScale
            const y = basePoints[k][1] * sceneScale

            for(let symmetryIndex = 0; symmetryIndex < this.symm; symmetryIndex++) {
                const angle = rotation + symmetryIndex * TAU / this.symm
                const cos = Math.cos(angle)
                const sin = Math.sin(angle)
                this.points.push([
                    x * cos - y * sin,
                    x * sin + y * cos
                ])
            }
        }

        this.points.sort((a, b) => Math.atan2(a[1], a[0]) - Math.atan2(b[1], b[0]))
        this.nbDirs = this.points.length
        this.p1 = []
        this.p2 = []

        for(let k = 0; k < this.nbDirs; k++) {
            const k0 = (k - 1 + this.nbDirs) % this.nbDirs
            const k1 = k
            const k2 = (k1 + 1) % this.nbDirs
            const k3 = (k2 + 1) % this.nbDirs
            const [p1, p2] = getBezierControlPoints(
                this.points[k0],
                this.points[k1],
                this.points[k2],
                this.points[k3]
            )
            this.p1[k2] = p1
            this.p2[k2] = p2
        }

        this.colorHue = normalizeHue(this.fhue(time) + scene.hueBase + this.index * 58)
    }

    getPath(scene) {
        const path = new Path2D()
        if(!this.nbDirs) return path

        let x = scene.xc + this.points[this.nbDirs - 1][0]
        let y = scene.yc + this.points[this.nbDirs - 1][1]
        path.moveTo(x, y)
        for(let k = 0; k < this.nbDirs; k++) {
            path.bezierCurveTo(
                scene.xc + this.p1[k][0],
                scene.yc + this.p1[k][1],
                scene.xc + this.p2[k][0],
                scene.yc + this.p2[k][1],
                scene.xc + this.points[k][0],
                scene.yc + this.points[k][1]
            )
        }

        x = scene.xc + this.points[this.nbDirs - 1][0]
        y = scene.yc - this.points[this.nbDirs - 1][1]
        path.moveTo(x, y)
        for(let k = 0; k < this.nbDirs; k++) {
            path.bezierCurveTo(
                scene.xc + this.p1[k][0],
                scene.yc - this.p1[k][1],
                scene.xc + this.p2[k][0],
                scene.yc - this.p2[k][1],
                scene.xc + this.points[k][0],
                scene.yc - this.points[k][1]
            )
        }

        return path
    }
}

export function createNoiceShaderEngine(canvases, options = {}) {
    const backgroundCanvas = canvases?.backgroundCanvas
    const foregroundCanvas = canvases?.foregroundCanvas

    if(!backgroundCanvas || !foregroundCanvas) {
        throw new Error("Noice requires background and foreground canvas layers.")
    }

    const backgroundCtx = backgroundCanvas.getContext("2d", { alpha: false })
    const foregroundCtx = foregroundCanvas.getContext("2d", { alpha: true })

    if(!backgroundCtx || !foregroundCtx) {
        throw new Error("Noice Canvas 2D context unavailable.")
    }

    const reduceMotion = Boolean(options.reduceMotion)
    let width = 1
    let height = 1
    let pixelRatio = 1
    let running = false
    let frameDrawn = false
    let rafId = null
    let lastFrameTime = 0
    let seed = Math.floor(Math.random() * 0xffffffff)
    let random = mulberry32(seed)
    let simplex = new SimplexNoise(random)
    let hueNoise = new SimplexNoise(random)
    let hueBase = randomInt(random, 0, 360)
    let grid = []
    let radius = 12
    let offsX = 0
    let offsY = 0
    let blobs = []
    let ripples = []
    let energy = 0.22
    let pointer = {
        x: 0.5,
        y: 0.5,
        targetX: 0.5,
        targetY: 0.5,
        presence: 0
    }

    function reseedScene(rebuildGrid = true) {
        seed = (seed + 0x9e3779b9 + Math.floor(Math.random() * 0xffff)) >>> 0
        random = mulberry32(seed)
        simplex = new SimplexNoise(random)
        hueNoise = new SimplexNoise(random)
        hueBase = randomInt(random, 0, 360)
        blobs = new Array(3).fill(0).map((_, index) => (
            new BlobRibbon(`${seed}:blob:${index}`, index, random)
        ))
        if(rebuildGrid) buildGrid()
    }

    function buildGrid() {
        const lRef = Math.max(80, Math.sqrt(width * height))
        radius = clamp(lRef / randomBetween(random, 40, 68), 7, 22)
        let stepY = radius * SQRT3
        let nbx = Math.ceil(width / (radius * 1.5) + 3)
        let nby = Math.ceil(height / stepY + 3)

        while(nbx * nby > 900) {
            radius *= 1.12
            stepY = radius * SQRT3
            nbx = Math.ceil(width / (radius * 1.5) + 3)
            nby = Math.ceil(height / stepY + 3)
        }

        offsX = (width - 1.5 * radius * (nbx - 1)) / 2
        offsY = (height - nby * stepY) / 2
        grid = []

        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                const x = offsX + kx * 1.5 * radius
                let y = offsY + (ky + 0.75) * stepY
                if(kx & 1) y -= radius * SQRT3_OVER_2
                grid.push({ kx, ky, x, y })
            }
        }
    }

    function resetContext(ctx, canvas, clearStyle = null) {
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        if(clearStyle) {
            ctx.fillStyle = clearStyle
            ctx.fillRect(0, 0, width, height)
        }
    }

    function rippleStrengthAt(x, y, time) {
        let strength = 0
        const maxRadius = Math.hypot(width, height) * 0.78

        for(const ripple of ripples) {
            const age = (time - ripple.born) / 1050
            if(age < 0 || age > 1.25) continue
            const wave = age * maxRadius
            const distance = Math.abs(Math.hypot(x - ripple.x * width, y - ripple.y * height) - wave)
            const ring = 1 - smoothstep(0, radius * 2.8, distance)
            strength += ring * (1 - age / 1.25)
        }

        return clamp(strength, 0, 1.4)
    }

    function drawCell(ctx, cell, time) {
        const t = time * 0.00024
        let lightX = simplex.noise3D(cell.kx / 7.5, cell.ky / 7.5, t)
        let lightY = simplex.noise3D(cell.kx / 7.5, cell.ky / 7.5, t - 37.9)
        const lightLength = Math.max(1, Math.hypot(lightX, lightY))
        lightX = lightX / lightLength
        lightY = lightY / lightLength

        const hueDrift = 92 * hueNoise.noise3D(cell.kx / 24, cell.ky / 24, time * 0.000035)
        const depth = simplex.noise3D(cell.kx / 13, cell.ky / 13, time * 0.00016 + 9.4)
        const ripple = rippleStrengthAt(cell.x, cell.y, time)
        const px = cell.x / Math.max(1, width) - pointer.x
        const py = cell.y / Math.max(1, height) - pointer.y
        const pointerDistance = Math.hypot(px, py)
        const hoverLift = pointer.presence * (1 - smoothstep(0.04, 0.45, pointerDistance))
        const lift = clamp(depth * 0.42 + ripple * 0.78 + hoverLift * 0.48 + energy * 0.2, -0.4, 1.45)
        const hue = normalizeHue(hueBase + hueDrift + ripple * 58 + energy * 30)
        const sat = clamp(76 + 18 * hueNoise.noise3D(cell.kx / 31, cell.ky / 31, time * 0.00004), 62, 100)
        const midLight = clamp(36 + lift * 17, 24, 64)
        const highlightLight = clamp(67 + lift * 20, 56, 92)
        const shadowLight = clamp(11 + lift * 7, 7, 28)
        const edgeAlpha = clamp(0.12 + lift * 0.08 + ripple * 0.22, 0.08, 0.38)
        const insetRadius = radius * 0.92
        const gradient = ctx.createRadialGradient(
            cell.x + lightX * radius * 0.45 + (pointer.x - 0.5) * radius * 0.42,
            cell.y + lightY * radius * 0.45 + (pointer.y - 0.5) * radius * 0.42,
            radius * 0.05,
            cell.x,
            cell.y,
            radius * 1.05
        )

        gradient.addColorStop(0, `hsl(${hue}, ${sat}%, ${highlightLight}%)`)
        gradient.addColorStop(0.46, `hsl(${hue}, ${sat}%, ${midLight}%)`)
        gradient.addColorStop(1, `hsl(${hue}, ${sat}%, ${shadowLight}%)`)

        makeHexPath(ctx, cell.x, cell.y, insetRadius)
        ctx.fillStyle = gradient
        ctx.fill()
        ctx.lineWidth = Math.max(0.7, radius * 0.055)
        ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`
        ctx.stroke()

        if(lift > 0.28) {
            makeHexPath(ctx, cell.x - lightX * radius * 0.05, cell.y - lightY * radius * 0.05, insetRadius * 0.72)
            ctx.lineWidth = Math.max(0.45, radius * 0.032)
            ctx.strokeStyle = `hsla(${hue}, 100%, 86%, ${clamp(lift * 0.14, 0, 0.24)})`
            ctx.stroke()
        }
    }

    function drawBackground(time) {
        resetContext(backgroundCtx, backgroundCanvas, "#000")
        const ctx = backgroundCtx
        const pointerPower = 0.4 + pointer.presence * 0.6
        const parallaxX = (pointer.x - 0.5) * width * 0.028 * pointerPower
        const parallaxY = (pointer.y - 0.5) * height * 0.028 * pointerPower
        const floorGradient = ctx.createLinearGradient(0, 0, width, height)
        floorGradient.addColorStop(0, "#060815")
        floorGradient.addColorStop(0.42, "#010102")
        floorGradient.addColorStop(1, "#08020a")

        ctx.fillStyle = floorGradient
        ctx.fillRect(0, 0, width, height)

        ctx.save()
        ctx.translate(parallaxX, parallaxY)
        for(const cell of grid) {
            drawCell(ctx, cell, time)
        }
        ctx.restore()

        const centerGlow = ctx.createRadialGradient(
            width * (0.5 + (pointer.x - 0.5) * 0.08),
            height * (0.5 + (pointer.y - 0.5) * 0.08),
            Math.min(width, height) * 0.08,
            width * 0.5,
            height * 0.5,
            Math.max(width, height) * 0.74
        )
        centerGlow.addColorStop(0, `hsla(${normalizeHue(hueBase + 18)}, 100%, 64%, ${0.08 + energy * 0.08})`)
        centerGlow.addColorStop(0.44, "rgba(255, 255, 255, 0.015)")
        centerGlow.addColorStop(1, "rgba(0, 0, 0, 0.72)")
        ctx.fillStyle = centerGlow
        ctx.fillRect(0, 0, width, height)
    }

    function strokeBlob(ctx, path, blob, depth, time) {
        const hue = normalizeHue(blob.colorHue + energy * 54)
        const glowWidth = mix(8, 20, depth) + energy * 14
        const crispWidth = mix(2.2, 4.8, depth) + energy * 2.4

        ctx.save()
        ctx.globalCompositeOperation = "screen"
        ctx.shadowBlur = 18 + depth * 26 + energy * 32
        ctx.shadowColor = `hsla(${hue}, 100%, 58%, ${0.42 + energy * 0.18})`
        ctx.lineWidth = glowWidth
        ctx.strokeStyle = `hsla(${hue}, 100%, 58%, ${0.16 + depth * 0.08 + energy * 0.12})`
        ctx.stroke(path)

        ctx.shadowBlur = 8 + depth * 14 + energy * 18
        ctx.lineWidth = crispWidth * 1.5
        ctx.strokeStyle = `hsla(${normalizeHue(hue + 34)}, 100%, 70%, ${0.34 + energy * 0.18})`
        ctx.stroke(path)
        ctx.restore()

        ctx.save()
        ctx.translate(-1.8 * depth, 2.2 * depth)
        ctx.lineWidth = crispWidth + 1.2
        ctx.strokeStyle = "rgba(0, 0, 0, 0.34)"
        ctx.stroke(path)
        ctx.restore()

        ctx.save()
        ctx.lineWidth = crispWidth
        ctx.strokeStyle = `hsla(${hue}, 100%, 78%, ${0.72 + energy * 0.2})`
        ctx.shadowBlur = 2.5 + energy * 6
        ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.8)`
        ctx.stroke(path)
        ctx.translate(1.2 * Math.cos(time * 0.001 + depth), -1.2 * Math.sin(time * 0.001 + depth))
        ctx.lineWidth = Math.max(1, crispWidth * 0.45)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.62)"
        ctx.stroke(path)
        ctx.restore()
    }

    function drawForegroundRipples(ctx, time) {
        if(!ripples.length) return

        ctx.save()
        ctx.globalCompositeOperation = "screen"
        for(const ripple of ripples) {
            const age = (time - ripple.born) / 920
            if(age < 0 || age > 1.2) continue
            const alpha = (1 - age / 1.2) * 0.62
            const ringRadius = age * Math.hypot(width, height) * 0.58
            ctx.beginPath()
            ctx.arc(ripple.x * width, ripple.y * height, ringRadius, 0, TAU)
            ctx.lineWidth = Math.max(1, (1 - age / 1.2) * (10 + energy * 18))
            ctx.shadowBlur = 18 + energy * 28
            ctx.shadowColor = `hsla(${ripple.hue}, 100%, 68%, ${alpha})`
            ctx.strokeStyle = `hsla(${ripple.hue}, 100%, 70%, ${alpha})`
            ctx.stroke()
        }
        ctx.restore()
    }

    function drawForeground(time) {
        resetContext(foregroundCtx, foregroundCanvas)
        const ctx = foregroundCtx
        const scene = {
            width,
            height,
            xc: width / 2,
            yc: height / 2,
            lRef: Math.min(width, height),
            energy,
            hueBase,
            pointerX: pointer.x,
            pointerY: pointer.y
        }
        const parallaxX = (pointer.x - 0.5) * width * (0.048 + energy * 0.026)
        const parallaxY = (pointer.y - 0.5) * height * (0.048 + energy * 0.026)
        const tiltX = (pointer.x - 0.5) * 0.035
        const tiltY = (pointer.y - 0.5) * 0.035

        ctx.save()
        ctx.translate(parallaxX, parallaxY)
        ctx.transform(1, tiltY, -tiltX, 1, 0, 0)
        ctx.scale(1 + energy * 0.018, 1 + energy * 0.018)
        ctx.translate(-scene.xc * energy * 0.018, -scene.yc * energy * 0.018)

        for(let index = 0; index < blobs.length; index++) {
            const blob = blobs[index]
            blob.actu(time, scene)
            strokeBlob(ctx, blob.getPath(scene), blob, blob.depth, time)
        }
        ctx.restore()

        drawForegroundRipples(ctx, time)
    }

    function pruneRipples(time) {
        ripples = ripples.filter((ripple) => time - ripple.born < 1400)
    }

    function drawFrame(time = performance.now()) {
        const dt = lastFrameTime ? clamp(time - lastFrameTime, 0, 100) : 16
        lastFrameTime = time

        pointer.x += (pointer.targetX - pointer.x) * 0.09
        pointer.y += (pointer.targetY - pointer.y) * 0.09
        pointer.presence = clamp(pointer.presence - dt * 0.00055, 0, 1)
        energy = clamp(energy - dt * 0.00075, 0.08, 1.35)
        pruneRipples(time)

        drawBackground(time)
        drawForeground(time)
        frameDrawn = true
    }

    function tick(time) {
        if(!running) return
        drawFrame(time)
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        pixelRatio = clamp(Number(devicePixelRatio) || 1, 1, 2)

        for(const canvas of [backgroundCanvas, foregroundCanvas]) {
            canvas.width = Math.max(1, Math.floor(width * pixelRatio))
            canvas.height = Math.max(1, Math.floor(height * pixelRatio))
        }

        backgroundCtx.lineJoin = "round"
        backgroundCtx.lineCap = "round"
        foregroundCtx.lineJoin = "round"
        foregroundCtx.lineCap = "round"
        buildGrid()
        drawFrame(performance.now())
    }

    function setPointer(x, y) {
        pointer.targetX = clamp(x, 0, 1)
        pointer.targetY = clamp(y, 0, 1)
        pointer.presence = 1
        if(!running) drawFrame(performance.now())
    }

    function clearPointer() {
        pointer.targetX = 0.5
        pointer.targetY = 0.5
        if(!running) drawFrame(performance.now())
    }

    function pulsePattern() {
        const now = performance.now()
        const clickX = clamp(pointer.targetX, 0, 1)
        const clickY = clamp(pointer.targetY, 0, 1)
        const rippleHue = normalizeHue(hueBase + randomBetween(random, 30, 110))
        ripples.push({
            x: clickX,
            y: clickY,
            born: now,
            hue: rippleHue
        })
        if(ripples.length > 5) ripples = ripples.slice(-5)
        energy = 1.35
        reseedScene(true)
        pointer.presence = 1
        if(!running || reduceMotion) drawFrame(now)
    }

    function renderStatic() {
        drawFrame(performance.now())
    }

    function hasVisibleFrame() {
        if(!frameDrawn || backgroundCanvas.width < 4 || backgroundCanvas.height < 4) return false

        try {
            const samples = [
                [0.24, 0.24],
                [0.5, 0.24],
                [0.76, 0.24],
                [0.24, 0.5],
                [0.5, 0.5],
                [0.76, 0.5],
                [0.24, 0.76],
                [0.5, 0.76],
                [0.76, 0.76]
            ]
            let visibleSamples = 0
            for(const [xRatio, yRatio] of samples) {
                const x = Math.max(0, Math.min(backgroundCanvas.width - 1, Math.floor(backgroundCanvas.width * xRatio)))
                const y = Math.max(0, Math.min(backgroundCanvas.height - 1, Math.floor(backgroundCanvas.height * yRatio)))
                const data = backgroundCtx.getImageData(x, y, 1, 1).data
                if(data[0] + data[1] + data[2] > 36) visibleSamples += 1
            }
            return visibleSamples >= 3
        }
        catch(err) {
            void err
            return frameDrawn
        }
    }

    function start() {
        if(reduceMotion) {
            drawFrame(performance.now())
            return
        }
        if(running) return
        running = true
        lastFrameTime = performance.now()
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
        blobs = []
        ripples = []
    }

    reseedScene(true)

    return {
        setSize,
        setPointer,
        clearPointer,
        pulsePattern,
        renderStatic,
        hasVisibleFrame,
        start,
        stop,
        destroy
    }
}
