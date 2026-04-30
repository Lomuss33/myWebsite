const LIGHT_IMG_SRC = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACnVBMVEUAAAD40ED40D740Dv40En40Dr40FH40Df40D/40D340Dn40Dz40Dj40AD40Ff40Db40DT40EH40EL40ED40ED40Dv40D/4zz/4zz74zz/4zz/40D74zz/4zz/4zz/40UH40kD40UL40kH4zz/4zz340D34zz740kH41UT410f410j410j410f40D/40D/4zz/40ED40EH400T410f42Er4103410/411D41UT40kH40D/4z0D4zz/41UX410j42E7411L42Ff42Vv42Vz42En41kb40UH4zz/40Dz40ED41UT42Ej4107411b42l743WT432r4323432r410/42En4zz340Dn400H410f42mD432v44nf45IP45Yn45IT44nj432r411b400L40D/4zz/41UT42Er411P432v44oD46Zv47q/48Lj46Zr432n40UH410f42Ff44nf48r/499T4997499T48r744nf43WP40D741EH42Vv4+O34+PP4+O347q745IL432j40UD432345Yj48LX49934+PP4+Pj4993477T45Ib432z411D400D40D/40UH432n45IP47a7432j42Vv410/400H40Dr4zz340UD410b410346Zj48r343WP42Ff410f40D/41kT42Er42l744nv46Zf42l3411L410r41kX40ED410f42E7411b421/45IL45Ib432n421740UH40D340Dz4zz741EP410j410743WT432f432v43mj43GT42Ej41kT4zz740ED41EX411P42Ff42Fv411f410j41kX400P41034107411D42E340D740UH410j41kb41ET400H40D/40ED4z0D4zz74zz340D////+WdN8lAAAA3nRSTlMAAAAAAAAAAAAAAAAAAAAAAAAAAgMCBAcJDAkDCA0SFRsbGxMDBQscJSwwMS0SDAUFFyExQExUVyIYDQULJzlOZHeDhDonFwoDASE5VXGNpbO4tFM5BwEcMJa3zdjb2Mu2cBwDESM+Y7bU4ebo4bUUK3bL6vDy7+rKogIZgPb49ebXsBu02+jx9/jw6Nu0VRsBGbDX5q9/UhkCCRUqS+HqoHMqESI9i9Thi2E9IhEvTG+V1tq0kxsDAQchN1Ggr7SvoDghChUjYXJ/cjgnIUlSVEkFGi8qIhsFFAcICAaJi/ApAAAAAWJLR0Te6W7imwAAAAd0SU1FB+YMHBEUINvSacMAAAIKSURBVCjPY2AgBBgZmZiFRYQZgQBVnEVUTFxCUlJSSlxMlAVJjplVWkZWTl5BUUleWVZGhZkZYZKqmpy6hqaWtpaOhrqunj7MREZGA1lDI2MTUzNzM1MTYwtLK2uIFCOjiI2hrZ29g6OTs5Ojg72Lq5u7Bxs7SMZTXNfL28fXzz8gMMjfzzc4xEI3NIwVrEUyPMLeNzIqOiY2Lj4hMtE+Ikk2mYkRKCOekpqW7peRmZWdk52bmeeXnqYhJ84BkpHKLzAt9C/KKi4pLSvPragsNNXMl/JkZGCqUqvWMqsJiMkuqa2rL2tobKox06qWTOZg4EiWbNY2d25pbWvv6Ozo6u7pde7T6pf04GTgmGAzEahn0uSGsvqO+rIpjVOnTdeaoTaTmYGLfdbsOXMLKyvmzS/rKps/r2jBwrmL5KWAfmViEl+8ZGn6srzlK6Z0T1mxPG/lqtVr1oLdxp0sqbRu/YaNeUWbNm8q2rJ1w/p12yS38wDDh3PHTrldu/dsWLZ33/4DB5dt2HPosO7OMFBwM/KKHjl6bPf64yemOZ88dXz96TPyR6T5+EFByi6ganP07LrV585fmH5x6bqzs21UmZhg0XDJXe7ykjnrtK5cvXZdzv0GMycs6jiZpXdKLs532+Z2M0VSXAQ5KTAKeorcuu1uc+TO3e07hNDSCCMjNyczKz8nN8FkxgAAgH2hXtQzzA4AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMTItMjhUMTc6MjA6MzIrMDA6MDA1MNVoAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTEyLTI4VDE3OjIwOjMyKzAwOjAwRG1t1AAAAABJRU5ErkJggg=="

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y)
    }

    add(value) {
        this.x += value.x
        this.y += value.y
        return this
    }

    mult(value) {
        this.x *= value
        this.y *= value
        return this
    }

    setXY(x, y) {
        this.x = x
        this.y = y
        return this
    }

    dist(other) {
        const dx = this.x - other.x
        const dy = this.y - other.y
        return Math.sqrt(dx * dx + dy * dy)
    }
}

class Dot {
    constructor(x, y, lightImg, hue, glowPhase = Math.random() * Math.PI * 2, lightSize = 15) {
        this.pos = new Vector(x, y)
        this.oldPos = new Vector(x, y)
        this.friction = 0.982
        this.gravity = new Vector(0, 0.52)
        this.mass = 1
        this.pinned = false
        this.lightImg = lightImg
        this.lightSize = lightSize
        this.hue = hue
        this.glowPhase = glowPhase
    }

    update(pointer) {
        if(this.pinned) return

        const vel = Vector.sub(this.pos, this.oldPos).mult(this.friction).add(this.gravity)
        this.oldPos.setXY(this.pos.x, this.pos.y)

        const offset = Vector.sub(pointer.pos, this.pos)
        const dist = Math.max(0.001, Math.sqrt(offset.x * offset.x + offset.y * offset.y))
        const force = Math.max((pointer.radius - dist) / pointer.radius, 0)

        this.pos.add(vel)
        if(force > 0) {
            const pull = 1.35 + pointer.energy * 0.85
            this.pos.x += (offset.x / dist) * force * pull
            this.pos.y += (offset.y / dist) * force * pull
            if(force > 0.82) {
                this.pos.x += (pointer.pos.x - this.pos.x) * 0.18
                this.pos.y += (pointer.pos.y - this.pos.y) * 0.18
            }
        }
    }

    drawLight(ctx, nowSec, intensity = 1) {
        const twinkle = 0.8 + 0.2 * Math.sin(nowSec * 2.2 + this.glowPhase)
        const glow = this.lightSize * (0.72 + intensity * 0.12) * twinkle
        const gradient = ctx.createRadialGradient(this.pos.x, this.pos.y, 0, this.pos.x, this.pos.y, glow)
        gradient.addColorStop(0, `hsla(${this.hue} 100% 92% / ${0.46 * intensity})`)
        gradient.addColorStop(0.42, `hsla(${this.hue} 92% 74% / ${0.16 * intensity})`)
        gradient.addColorStop(1, `hsla(${this.hue} 88% 62% / 0)`)
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, glow, 0, Math.PI * 2)
        ctx.fill()

        if(this.lightImg?.complete) {
            ctx.drawImage(
                this.lightImg,
                this.pos.x - this.lightSize / 2,
                this.pos.y - this.lightSize / 2,
                this.lightSize,
                this.lightSize
            )
        }
    }

    draw(ctx) {
        ctx.fillStyle = "rgba(34, 37, 44, 0.92)"
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.mass * 1.35, 0, Math.PI * 2)
        ctx.fill()
    }
}

class Stick {
    constructor(p1, p2) {
        this.startPoint = p1
        this.endPoint = p2
        this.length = this.startPoint.pos.dist(this.endPoint.pos)
        this.tension = 0.3
    }

    update() {
        const dx = this.endPoint.pos.x - this.startPoint.pos.x
        const dy = this.endPoint.pos.y - this.startPoint.pos.y
        const dist = Math.max(0.001, Math.sqrt(dx * dx + dy * dy))
        const diff = (dist - this.length) / dist
        const offsetX = diff * dx * this.tension
        const offsetY = diff * dy * this.tension
        const totalMass = this.startPoint.mass + this.endPoint.mass
        const m1 = this.endPoint.mass / totalMass
        const m2 = this.startPoint.mass / totalMass

        if(!this.startPoint.pinned) {
            this.startPoint.pos.x += offsetX * m1
            this.startPoint.pos.y += offsetY * m1
        }
        if(!this.endPoint.pinned) {
            this.endPoint.pos.x -= offsetX * m2
            this.endPoint.pos.y -= offsetY * m2
        }
    }
}

class Rope {
    constructor(config) {
        this.x = config.x
        this.baseX = config.x
        this.y = config.y
        this.segments = config.segments || 10
        this.gap = config.gap || 15
        this.lightImg = config.lightImg
        this.iterations = config.iterations || 12
        this.hue = config.hue || 32
        this.swayPhase = config.swayPhase || 0
        this.swayAmp = config.swayAmp || 0
        this.dots = []
        this.sticks = []
        this.create()
    }

    pin(index) {
        if(this.dots[index]) this.dots[index].pinned = true
    }

    create() {
        for(let i = 0; i < this.segments; i++) {
            this.dots.push(new Dot(
                this.x,
                this.y + i * this.gap,
                this.lightImg,
                (this.hue + i * 9) % 360,
                this.swayPhase + i * 0.37,
                13 + Math.min(10, i * 0.75)
            ))
        }
        for(let i = 0; i < this.segments - 1; i++) {
            this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]))
        }
    }

    update(pointer, nowSec) {
        const lead = this.dots[0]
        if(lead?.pinned) {
            const sway = Math.sin(nowSec * 1.3 + this.swayPhase) * this.swayAmp
            lead.pos.setXY(this.baseX + sway, this.y)
            lead.oldPos.setXY(this.baseX + sway, this.y)
        }

        for(const dot of this.dots) dot.update(pointer)
        for(let i = 0; i < this.iterations; i++) {
            for(const stick of this.sticks) stick.update()
        }
    }

    draw(ctx, nowSec, pointer) {
        ctx.save()
        ctx.lineCap = "round"
        for(let i = 0; i < this.sticks.length; i++) {
            const stick = this.sticks[i]
            const gradient = ctx.createLinearGradient(
                stick.startPoint.pos.x,
                stick.startPoint.pos.y,
                stick.endPoint.pos.x,
                stick.endPoint.pos.y
            )
            gradient.addColorStop(0, "rgba(78, 70, 58, 0.88)")
            gradient.addColorStop(1, "rgba(55, 48, 40, 0.72)")
            ctx.strokeStyle = gradient
            ctx.shadowColor = "rgba(255, 214, 153, 0.06)"
            ctx.shadowBlur = 2
            ctx.lineWidth = 1.1 + i * 0.08
            ctx.beginPath()
            ctx.moveTo(stick.startPoint.pos.x, stick.startPoint.pos.y)
            ctx.lineTo(stick.endPoint.pos.x, stick.endPoint.pos.y)
            ctx.stroke()
        }
        ctx.restore()

        for(let i = 0; i < this.dots.length; i++) {
            const dot = this.dots[i]
            if(i > 0 && i < this.dots.length - 1 && i % 2 !== 0) continue
            dot.draw(ctx)
            dot.drawLight(ctx, nowSec, 0.55 + pointer.energy * 0.18)
        }

        this.dots[this.dots.length - 1]?.drawLight(ctx, nowSec, 0.7 + pointer.energy * 0.25)
    }
}

function randomNumBetween(min, max) {
    return Math.random() * (max - min) + min
}

const ROPE_TOTAL = 5

export function createRopeLightEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    let ctx = canvas.getContext("2d", { alpha: false })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let width = 1
    let height = 1
    let running = false
    let rafId = null
    let then = 0
    let ropes = []
    const pointer = {
        pos: new Vector(-1000, -1000),
        radius: 52,
        energy: 0
    }

    const lightImg = new Image()
    lightImg.src = LIGHT_IMG_SRC

    function createRopes() {
        ropes = []
        const total = ROPE_TOTAL
        for(let i = 0; i < total; i++) {
            const spread = total <= 1 ? 0.5 : i / (total - 1)
            const x = width * (0.16 + spread * 0.68) + randomNumBetween(-width * 0.018, width * 0.018)
            const y = 0
            const gap = randomNumBetween(height * 0.05, height * 0.07)
            const rope = new Rope({
                x,
                y,
                gap,
                segments: Math.round(randomNumBetween(9, 12)),
                iterations: 16,
                hue: randomNumBetween(36, 48),
                swayPhase: randomNumBetween(0, Math.PI * 2),
                swayAmp: randomNumBetween(width * 0.003, width * 0.01),
                lightImg
            })
            rope.pin(0)
            ropes.push(rope)
        }
    }

    function renderFrame(nowMs = performance.now()) {
        const nowSec = nowMs * 0.001
        pointer.energy += (1 - pointer.energy) * 0.16
        pointer.radius += ((52 + pointer.energy * 34) - pointer.radius) * 0.14

        ctx.fillStyle = "rgba(9, 11, 20, 0.36)"
        ctx.fillRect(0, 0, width, height)
        for(const rope of ropes) {
            rope.update(pointer, nowSec)
            rope.draw(ctx, nowSec, pointer)
        }
        pointer.energy *= 0.92
    }

    function tick(nowMs) {
        if(!running) return
        if(!then) then = nowMs
        const interval = 1000 / 60
        const delta = nowMs - then
        if(delta >= interval) {
            then = nowMs - (delta % interval)
            renderFrame(nowMs)
        }
        rafId = requestAnimationFrame(tick)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = Math.max(1, Number(devicePixelRatio) || 1)

        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.fillStyle = "#090b14"
        ctx.fillRect(0, 0, width, height)
        createRopes()
        renderFrame()
    }

    function setPointer(x, y) {
        pointer.pos.setXY(x * width, y * height)
        pointer.energy = Math.min(1, pointer.energy + 0.34)
    }

    function clearPointer() {
        pointer.pos.setXY(-1000, -1000)
        pointer.energy = 0
    }

    function reset() {
        createRopes()
        renderFrame()
    }

    function renderStatic() {
        renderFrame()
    }

    function start() {
        if(reduceMotion) {
            renderFrame()
            return
        }
        if(running) return
        running = true
        then = 0
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
    }

    function destroy() {
        stop()
        ropes = []
        ctx = null
    }

    if(lightImg.complete) {
        renderStatic()
    }
    else {
        lightImg.onload = () => {
            if(ctx) renderStatic()
        }
    }

    return {
        start,
        stop,
        destroy,
        reset,
        renderStatic,
        setSize,
        setPointer,
        clearPointer
    }
}
