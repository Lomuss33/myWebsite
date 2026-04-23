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

function createNoise1DOneShot(period, min = 0, max = 1, random = Math.random) {
    let currx = random()
    let y0 = min + (max - min) * random()
    let y1 = min + (max - min) * random()
    const dx = 1 / Math.max(2, period)

    return function nextNoise() {
        currx += dx
        if(currx > 1) {
            currx -= 1
            y0 = y1
            y1 = min + (max - min) * random()
        }

        const z = (3 - 2 * currx) * currx * currx
        return z * y1 + (1 - z) * y0
    }
}

const RAC3 = Math.sqrt(3)
const RAC3S2 = RAC3 / 2
const TWO_PI = Math.PI * 2

class HexCell {
    constructor(kx, ky) {
        this.kx = kx
        this.ky = ky
        this.neighbours = new Array(6).fill(undefined)
        this.occupied = false
        this.vertices = null
        this.middles = null
        this.xc = 0
        this.yc = 0
    }
}

export function createHexFlowBallsEngine(canvas, options = {}) {
    const seed = clampInt(options.seed, 1, 2147483647, 1)
    const reduceMotion = Boolean(options.reduceMotion)
    const nbCells = clampInt(options.nbCells, 3, 12, 5)
    const rayBallMin = clamp(Number(options.rayBallMin) || 0.3, 0.1, 0.95)
    const rayBallMax = clamp(Number(options.rayBallMax) || 0.8, rayBallMin, 0.98)
    const ballSpeed = clamp(Number(options.speed) || 0.03, 0.005, 0.08)

    const random = mulberry32(seed)
    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let running = false
    let rafId = null

    let grid = []
    let balls = []
    let rayHex = 10
    let apoHex = 10
    let nbx = 1
    let nby = 1
    let orgx = 0
    let orgy = 0

    let gridCanvas = null
    let gridCtx = null
    let globalBgHue = random() * 360
    let globalBgNoise = createNoise1DOneShot(420, -0.4, 0.4, random)
    let darkGrid = false

    function buildGrid() {
        const rayHexX = Math.floor((maxx - 6) / (nbCells + Math.floor((nbCells + 1) / 2)))
        const rayHexY = Math.floor((maxy - 6) / RAC3S2 / (nbCells * 2 + 1))
        rayHex = Math.max(8, Math.min(rayHexX, rayHexY))
        apoHex = rayHex * RAC3S2

        nbx = Math.max(3, Math.floor(((maxx / rayHex) - 0.5) / 1.5))
        nby = Math.max(3, Math.floor(maxy / rayHex / RAC3 - 0.5))

        orgx = (maxx - rayHex * (1.5 * nbx + 0.5)) / 2 + rayHex
        orgy = (maxy - (rayHex * RAC3 * (nby + 0.5))) / 2 + rayHex * RAC3

        grid = new Array(nby).fill(null).map((_, ky) => {
            return new Array(nbx).fill(null).map((__, kx) => new HexCell(kx, ky))
        })

        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                computeCellGeometry(grid[ky][kx])
            }
        }

        renderGridCanvas()
    }

    function computeCellGeometry(cell) {
        const xc = orgx + cell.kx * 1.5 * rayHex
        let yc = orgy + cell.ky * rayHex * RAC3
        if(cell.kx & 1) yc -= rayHex * RAC3S2

        cell.xc = xc
        cell.yc = yc

        const radius = rayHex + 0.5
        const verts = [
            [xc + radius, yc],
            [xc + radius / 2, yc + radius * RAC3S2],
            [xc - radius / 2, yc + radius * RAC3S2],
            [xc - radius, yc],
            [xc - radius / 2, yc - radius * RAC3S2],
            [xc + radius / 2, yc - radius * RAC3S2]
        ]

        cell.vertices = verts
        cell.middles = new Array(6).fill(null).map((_, side) => {
            const next = (side + 1) % 6
            return [
                (verts[side][0] + verts[next][0]) / 2,
                (verts[side][1] + verts[next][1]) / 2
            ]
        })
    }

    function neighbour(cell, side) {
        const known = cell.neighbours[side]
        if(known !== undefined) return known

        let kx
        let ky
        if(cell.kx & 1) {
            kx = cell.kx + [1, 0, -1, -1, 0, 1][side]
            ky = cell.ky + [0, 1, 0, -1, -1, -1][side]
        }
        else {
            kx = cell.kx + [1, 0, -1, -1, 0, 1][side]
            ky = cell.ky + [1, 1, 1, 0, -1, 0][side]
        }

        if(kx < 0 || ky < 0 || kx >= nbx || ky >= nby) {
            cell.neighbours[side] = false
            return false
        }

        const neigh = grid[ky][kx]
        cell.neighbours[side] = neigh
        neigh.neighbours[(side + 3) % 6] = cell
        return neigh
    }

    function renderGridCanvas() {
        gridCanvas = document.createElement("canvas")
        gridCanvas.width = maxx
        gridCanvas.height = maxy
        gridCtx = gridCanvas.getContext("2d")
        if(!gridCtx) return

        gridCtx.clearRect(0, 0, maxx, maxy)
        gridCtx.lineCap = "round"
        gridCtx.lineJoin = "round"
        const strokeStyle = darkGrid ? "rgba(0,0,0,0.82)" : "rgba(255,255,255,0.82)"

        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                const cell = grid[ky][kx]
                const verts = cell.vertices
                gridCtx.beginPath()
                gridCtx.moveTo(verts[0][0], verts[0][1])
                for(let i = 1; i < 6; i++) gridCtx.lineTo(verts[i][0], verts[i][1])
                gridCtx.closePath()
                gridCtx.strokeStyle = strokeStyle
                gridCtx.lineWidth = 1.2
                gridCtx.stroke()
            }
        }
    }

    function createBall() {
        const ball = {
            radius: apoHex * (rayBallMin + (rayBallMax - rayBallMin) * random()),
            cell: null,
            comesFrom: 0,
            state: 0,
            hue: Math.floor(random() * 360),
            hueNoise: createNoise1DOneShot(1000, -1, 1, random),
            dir: 0,
            dC: 0,
            alphaCross: 0
        }

        let tries = 300
        while(tries-- > 0) {
            const kx = Math.floor(random() * nbx)
            const ky = Math.floor(random() * nby)
            const cell = grid[ky][kx]
            const comesFrom = Math.floor(random() * 6)
            if(cell.occupied) continue
            if(!neighbour(cell, comesFrom)) continue
            ball.cell = cell
            ball.comesFrom = comesFrom
            cell.occupied = true
            return ball
        }

        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                const cell = grid[ky][kx]
                if(cell.occupied) continue
                for(let side = 0; side < 6; side++) {
                    if(neighbour(cell, side)) {
                        ball.cell = cell
                        ball.comesFrom = side
                        cell.occupied = true
                        return ball
                    }
                }
            }
        }

        return ball
    }

    function reset() {
        buildGrid()
        for(let ky = 0; ky < nby; ky++) {
            for(let kx = 0; kx < nbx; kx++) {
                grid[ky][kx].occupied = false
            }
        }

        const nbBalls = Math.max(1, Math.floor((nbx * nby) / 3))
        balls = new Array(nbBalls).fill(null).map(() => createBall()).filter((ball) => Boolean(ball.cell))
        globalBgHue = random() * 360
        globalBgNoise = createNoise1DOneShot(360, -0.6, 0.6, random)
    }

    function fillBackground(nowMs) {
        let meanHue = globalBgHue
        if(balls.length > 0) {
            let sumSin = 0
            let sumCos = 0
            for(const ball of balls) {
                const angle = ball.hue * Math.PI / 180
                sumSin += Math.sin(angle)
                sumCos += Math.cos(angle)
            }
            meanHue = (Math.atan2(sumSin, sumCos) * 180 / Math.PI + 360) % 360
        }

        globalBgHue = (meanHue + globalBgNoise() * 16 + nowMs * 0.002) % 360
        ctx.fillStyle = `hsl(${globalBgHue}, 100%, 50%)`
        ctx.fillRect(0, 0, maxx, maxy)
    }

    function drawBall(ball) {
        const fill = `hsl(${ball.hue},100%,50%)`
        ctx.fillStyle = fill

        switch(ball.state) {
            case 0: {
                ctx.beginPath()
                ctx.arc(ball.cell.xc, ball.cell.yc, ball.radius, 0, TWO_PI)
                ctx.fill()

                let nextDir = ball.comesFrom
                let nextCell = false
                let tries = 0
                while(tries++ < 30) {
                    nextDir = (ball.comesFrom + 3 + [-2, -1, -1, 0, 0, 0, 1, 1, 2][Math.floor(random() * 9)] + 6) % 6
                    nextCell = neighbour(ball.cell, nextDir)
                    if(nextCell && !nextCell.occupied) break
                    nextCell = false
                }

                if(!nextCell) {
                    nextDir = ball.comesFrom
                    nextCell = neighbour(ball.cell, nextDir)
                    if(nextCell && nextCell.occupied) return
                }

                if(!nextCell) return
                ball.state = 1
                ball.dC = 0
                ball.dir = nextDir
                nextCell.occupied = true
                break
            }

            case 1: {
                ball.dC += rayHex * ballSpeed
                if(ball.dC + ball.radius >= apoHex) {
                    ball.dC = apoHex - ball.radius
                    ball.state = 2
                    ball.alphaCross = 0
                }
                const xc = ball.cell.xc + [RAC3S2, 0, -RAC3S2, -RAC3S2, 0, RAC3S2][ball.dir] * ball.dC
                const yc = ball.cell.yc + [0.5, 1, 0.5, -0.5, -1, -0.5][ball.dir] * ball.dC
                ctx.beginPath()
                ctx.arc(xc, yc, ball.radius, 0, TWO_PI)
                ctx.fill()
                break
            }

            case 2: {
                ball.alphaCross += ballSpeed / 2
                if(ball.alphaCross >= 1) {
                    ball.alphaCross = 1
                    ball.state = 3
                    ball.dC = apoHex + ball.radius
                }

                const side = ball.dir
                const mid = ball.cell.middles[side]
                const dirx = [RAC3S2, 0, -RAC3S2, -RAC3S2, 0, RAC3S2][side]
                const diry = [0.5, 1, 0.5, -0.5, -1, -0.5][side]
                const r1 = ball.radius * Math.sqrt(Math.max(0, 1 - ball.alphaCross * ball.alphaCross))
                const r2 = ball.radius * ball.alphaCross

                ctx.beginPath()
                if(r1 > 0.5) ctx.arc(mid[0] - r1 * dirx, mid[1] - r1 * diry, r1, 0, TWO_PI)
                if(r2 > 0.5) ctx.arc(mid[0] + r2 * dirx, mid[1] + r2 * diry, r2, 0, TWO_PI)
                ctx.fill()
                break
            }

            case 3: {
                ball.dC += rayHex * ballSpeed
                if(ball.dC >= 2 * apoHex) {
                    ball.dC = 2 * apoHex
                }
                const dirx = [RAC3S2, 0, -RAC3S2, -RAC3S2, 0, RAC3S2][ball.dir]
                const diry = [0.5, 1, 0.5, -0.5, -1, -0.5][ball.dir]
                const xc = ball.cell.xc + dirx * ball.dC
                const yc = ball.cell.yc + diry * ball.dC
                ctx.beginPath()
                ctx.arc(xc, yc, ball.radius, 0, TWO_PI)
                ctx.fill()

                if(ball.dC >= 2 * apoHex) {
                    ball.cell.occupied = false
                    ball.cell = neighbour(ball.cell, ball.dir)
                    ball.comesFrom = (ball.dir + 3) % 6
                    ball.state = 0
                }
                break
            }
        }
    }

    function drawFrame(nowMs) {
        fillBackground(nowMs)
        if(gridCanvas) ctx.drawImage(gridCanvas, 0, 0)

        for(const ball of balls) {
            ball.hue = (ball.hue + ball.hueNoise() + 360) % 360
            drawBall(ball)
        }
    }

    function tick(nowMs) {
        if(!running) return
        drawFrame(nowMs)
        rafId = requestAnimationFrame(tick)
    }

    function renderStatic(nowMs = performance.now()) {
        drawFrame(nowMs)
    }

    function toggleGridContrast() {
        darkGrid = !darkGrid
        renderGridCanvas()
        drawFrame(performance.now())
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
        balls = []
        grid = []
        gridCanvas = null
        gridCtx = null
        ctx = null
    }

    return {
        start,
        stop,
        reset,
        destroy,
        renderStatic,
        setSize,
        toggleGridContrast
    }
}
