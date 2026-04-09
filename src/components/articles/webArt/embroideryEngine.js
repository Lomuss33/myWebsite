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

export function createEmbroideryEngine(canvas, options = {}) {
    const refreshDelay = clampInt(options.refreshDelay, 1000, 60000, 8000)
    const radiusMini = Number.isFinite(options.radiusMini) ? options.radiusMini : 0.003
    const radiusMaxi = Number.isFinite(options.radiusMaxi) ? options.radiusMaxi : 0.006
    const dHueStep = clampInt(options.dHueStep, 1, 10, 1)
    const reduceMotion = Boolean(options.reduceMotion)
    const startGroup = options.startGroup || { kx: 15, ky: 0 }
    const seed = clampInt(options.seed, 1, 2147483647, 1)

    const random = mulberry32(seed)

    const mfloor = Math.floor
    const mhypot = Math.hypot
    const msqrt = Math.sqrt
    const m2PI = Math.PI * 2

    const rac3 = msqrt(3)
    const rac3s2 = rac3 / 2

    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let maxx = 1
    let maxy = 1
    let radiush = 1
    let radius = 1
    let evolHue = 0
    let dHue = 1
    let reachable = []

    let running = false
    let rafId = null

    let animState = 0
    let tEndw = 0
    let visitedGroups = []
    let currGroup = null
    let resetRequested = true

    function alea(min, max) {
        if(typeof max === "undefined") return min * random()
        return min + (max - min) * random()
    }

    function intAlea(min, max) {
        if(typeof max === "undefined") {
            max = min
            min = 0
        }
        return mfloor(min + (max - min) * random())
    }

    function arrayShuffle(array) {
        for(let k = array.length - 1; k >= 1; --k) {
            const k1 = intAlea(0, k + 1)
            const tmp = array[k]
            array[k] = array[k1]
            array[k1] = tmp
        }
        return array
    }

    function getKey(kx, ky) {
        return `${kx}:${ky}`
    }

    class Hexagon {
        static dneighbors = [
            { dx: 1, dy: 1 },
            { dx: -1, dy: 2 },
            { dx: -2, dy: 1 },
            { dx: -1, dy: -1 },
            { dx: 1, dy: -2 },
            { dx: 2, dy: -1 }
        ]

        static rot60(k) {
            return { kx: -k.ky, ky: k.kx + k.ky }
        }

        static symm(k) {
            return { kx: k.kx + k.ky, ky: -k.ky }
        }

        constructor(kx, ky) {
            this.kx = kx
            this.ky = ky
            this.key = getKey(kx, ky)
            this.c = {
                x: maxx / 2 + this.ky * radiush * rac3s2,
                y: maxy / 2 - (this.kx + 0.5 * this.ky) * radiush
            }
            this.isVisible =
                this.c.x >= -radius &&
                this.c.x <= maxx + radius &&
                this.c.y >= -radius &&
                this.c.y <= maxy + radius
        }

        draw() {
            const color = ctx.createRadialGradient(
                this.c.x + 0.4 * radius,
                this.c.y - 0.4 * radius,
                0,
                this.c.x,
                this.c.y,
                radius
            )
            color.addColorStop(0, `hsl(${evolHue} 100% 80%)`)
            color.addColorStop(0.5, `hsl(${evolHue} 100% 50%)`)
            color.addColorStop(1.0, `hsl(${evolHue} 100% 30%)`)
            ctx.beginPath()
            ctx.arc(this.c.x, this.c.y, radius, 0, m2PI)
            ctx.fillStyle = color
            ctx.fill()
        }
    }

    class Group extends Map {
        constructor(kx, ky) {
            super()
            let key = "z"
            const addhex = (h) => {
                if(h.key < key) key = h.key
                if(h.isVisible) this.set(h.key, h)
            }

            const h1 = new Hexagon(kx, ky)
            addhex(h1)

            let nh = Hexagon.rot60(h1)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.rot60(nh)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.rot60(nh)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.rot60(nh)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.rot60(nh)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(h1)
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(Hexagon.rot60(h1))
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(Hexagon.rot60(Hexagon.rot60(h1)))
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(h1))))
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(h1)))))
            addhex(new Hexagon(nh.kx, nh.ky))

            nh = Hexagon.symm(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(Hexagon.rot60(h1))))))
            addhex(new Hexagon(nh.kx, nh.ky))

            this.key = key
        }
    }

    function startOver() {
        ctx.lineJoin = "round"
        ctx.lineCap = "round"

        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, maxx, maxy)

        radiush = mhypot(maxx, maxy) * alea(radiusMini, radiusMaxi)
        radius = radiush * rac3s2
        evolHue = intAlea(360)
        dHue = intAlea(2) ? dHueStep : -dHueStep
        return true
    }

    function tick(tStamp) {
        if(!running) return

        if(resetRequested) {
            resetRequested = false
            animState = 0
        }

        const tEnd = performance.now() + 5

        do {
            switch(animState) {
                case 0:
                    if(startOver()) {
                        animState = 1
                    }
                    break

                case 1:
                    visitedGroups = []
                    reachable = [new Group(startGroup.kx, startGroup.ky)]
                    animState = 2
                    break

                case 2:
                    if(reachable.length === 0) {
                        animState = 10
                        tEndw = tStamp + refreshDelay
                        break
                    }
                    currGroup = reachable.shift()
                    if(currGroup.size > 0 && !visitedGroups.includes(currGroup.key)) {
                        animState = 3
                    }
                    break

                case 3: {
                    visitedGroups.push(currGroup.key)
                    evolHue = (evolHue + dHue + 360) % 360
                    currGroup.forEach((hex) => hex.draw())

                    let neighGroups = new Set()
                    const repr = currGroup.values().next().value
                    Hexagon.dneighbors.forEach((dk) => {
                        const ng = new Group(repr.kx + dk.dx, repr.ky + dk.dy)
                        if(ng.size === 0) return
                        if(visitedGroups.includes(ng.key)) return
                        if(reachable.find((r) => r.key === ng.key)) return
                        neighGroups.add(ng)
                    })

                    if(neighGroups.size === 0) {
                        animState = 2
                        break
                    }

                    const neighArray = arrayShuffle([...neighGroups])
                    currGroup = neighArray.pop()
                    reachable.push(...neighArray)
                    break
                }

                case 10:
                    if(tStamp > tEndw) animState = 0
                    break
            }
        } while((animState === 2 || animState === 3) && performance.now() < tEnd)

        rafId = requestAnimationFrame(tick)
    }

    function renderStatic() {
        resetRequested = false
        animState = 0
        startOver()

        visitedGroups = []
        reachable = [new Group(startGroup.kx, startGroup.ky)]
        animState = 2

        let safety = 0
        while(animState !== 10 && safety < 20000) {
            safety += 1
            if(animState === 2) {
                if(reachable.length === 0) {
                    animState = 10
                    break
                }
                currGroup = reachable.shift()
                if(currGroup.size > 0 && !visitedGroups.includes(currGroup.key)) {
                    animState = 3
                }
                continue
            }

            if(animState === 3) {
                visitedGroups.push(currGroup.key)
                evolHue = (evolHue + dHue + 360) % 360
                currGroup.forEach((hex) => hex.draw())

                let neighGroups = new Set()
                const repr = currGroup.values().next().value
                Hexagon.dneighbors.forEach((dk) => {
                    const ng = new Group(repr.kx + dk.dx, repr.ky + dk.dy)
                    if(ng.size === 0) return
                    if(visitedGroups.includes(ng.key)) return
                    if(reachable.find((r) => r.key === ng.key)) return
                    neighGroups.add(ng)
                })

                if(neighGroups.size === 0) {
                    animState = 2
                    continue
                }

                const neighArray = arrayShuffle([...neighGroups])
                currGroup = neighArray.pop()
                reachable.push(...neighArray)
                continue
            }

            break
        }
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

    function reset() {
        resetRequested = true
        if(reduceMotion) {
            renderStatic()
            return
        }
    }

    function destroy() {
        stop()
        ctx = null
    }

    return {
        start,
        stop,
        reset,
        renderStatic,
        destroy,
        setSize
    }
}
