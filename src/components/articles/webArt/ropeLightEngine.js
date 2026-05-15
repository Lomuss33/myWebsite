const TAU = Math.PI * 2

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function mix(a, b, t) {
    return a + (b - a) * t
}

function hsla(hue, saturation, lightness, alpha) {
    return `hsla(${((hue % 360) + 360) % 360} ${saturation}% ${lightness}% / ${alpha})`
}

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
    constructor(x, y, index, glowPhase = Math.random() * TAU) {
        this.pos = new Vector(x, y)
        this.oldPos = new Vector(x, y)
        this.index = index
        this.friction = 0.982
        this.gravity = new Vector(0, 0.46)
        this.mass = 1
        this.pinned = false
        this.glowPhase = glowPhase
    }

    update(pointer) {
        if(this.pinned) return

        const vel = Vector.sub(this.pos, this.oldPos).mult(this.friction).add(this.gravity)
        const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y)
        if(speed > 18) vel.mult(18 / speed)
        this.oldPos.setXY(this.pos.x, this.pos.y)

        const offset = Vector.sub(pointer.pos, this.pos)
        const dist = Math.max(0.001, Math.sqrt(offset.x * offset.x + offset.y * offset.y))
        const force = Math.max((pointer.radius - dist) / pointer.radius, 0)

        this.pos.add(vel)
        if(force > 0) {
            const pull = 1.05 + pointer.energy * 0.76
            this.pos.x += (offset.x / dist) * force * pull
            this.pos.y += (offset.y / dist) * force * pull
            if(force > 0.78) {
                this.pos.x += (pointer.pos.x - this.pos.x) * 0.11
                this.pos.y += (pointer.pos.y - this.pos.y) * 0.11
            }
        }
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
        this.iterations = config.iterations || 12
        this.hue = config.hue || 190
        this.hueSpread = config.hueSpread || 160
        this.swayPhase = config.swayPhase || 0
        this.swayAmp = config.swayAmp || 0
        this.index = config.index || 0
        this.total = config.total || 1
        this.energyPhase = Math.random() * TAU
        this.anchor = new Vector(this.baseX, this.y)
        this.tailAnchor = new Vector(this.baseX, this.y + (this.segments - 1) * this.gap)
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
                i,
                this.swayPhase + i * 0.43
            ))
        }
        for(let i = 0; i < this.segments - 1; i++) {
            this.sticks.push(new Stick(this.dots[i], this.dots[i + 1]))
        }
    }

    update(pointer, nowSec, width, height, hangTarget) {
        const lead = this.dots[0]
        if(lead?.pinned) {
            this.anchor.x = this.baseX
            this.anchor.y = this.y
            lead.pos.setXY(this.anchor.x, this.anchor.y)
            lead.oldPos.setXY(this.anchor.x, this.anchor.y)
        }

        const lastIndex = this.dots.length - 1
        for(let i = 0; i < this.dots.length; i++) {
            if(hangTarget.active && i === lastIndex) continue
            this.dots[i].update(pointer)
        }
        this.applyLooseEndTarget(hangTarget, width, nowSec)
        for(let i = 0; i < this.iterations; i++) {
            for(const stick of this.sticks) stick.update()
            this.applyLooseEndTarget(hangTarget, width, nowSec)
        }
        this.keepInFrame(width, height)
        this.applyLooseEndTarget(hangTarget, width, nowSec)
    }

    applyLooseEndTarget(hangTarget, width, nowSec) {
        if(!hangTarget.active) return
        const tail = this.dots[this.dots.length - 1]
        if(!tail) return

        const centerIndex = this.index - (this.total - 1) / 2
        const bunchSpacing = Math.max(4, Math.min(10, width * 0.018))
        const targetX = hangTarget.x + centerIndex * bunchSpacing + Math.sin(nowSec * 1.2 + this.swayPhase) * 1.8
        const targetY = hangTarget.y + Math.abs(centerIndex) * 3.2 + Math.sin(nowSec * 0.9 + this.energyPhase) * 1.3

        this.tailAnchor.x += (targetX - this.tailAnchor.x) * 0.28
        this.tailAnchor.y += (targetY - this.tailAnchor.y) * 0.28
        tail.pos.setXY(this.tailAnchor.x, this.tailAnchor.y)
        tail.oldPos.setXY(this.tailAnchor.x, this.tailAnchor.y)
    }

    prepareLooseEndTarget() {
        const tail = this.dots[this.dots.length - 1]
        if(!tail) return
        this.tailAnchor.setXY(tail.pos.x, tail.pos.y)
    }

    keepInFrame(width, height) {
        const minX = -12
        const maxX = width + 12
        const minY = -height * 0.08
        const maxY = height + height * 0.08

        for(const dot of this.dots) {
            const nextX = clamp(dot.pos.x, minX, maxX)
            const nextY = clamp(dot.pos.y, minY, maxY)
            if(nextX !== dot.pos.x) {
                dot.oldPos.x += nextX - dot.pos.x
                dot.pos.x = nextX
            }
            if(nextY !== dot.pos.y) {
                dot.oldPos.y += nextY - dot.pos.y
                dot.pos.y = nextY
            }
        }
    }

    colorAt(progress, nowSec, pointer) {
        const wave = Math.sin(nowSec * 0.8 + progress * TAU * 1.45 + this.swayPhase)
        const pulse = Math.sin(nowSec * 2.0 + progress * TAU * 2.2 + this.energyPhase)
        return this.hue + progress * this.hueSpread + wave * 18 + pulse * pointer.energy * 12
    }

    sample(progress) {
        if(this.dots.length <= 0) return new Vector(this.baseX, this.y)
        if(this.dots.length === 1) return this.dots[0].pos

        const t = clamp(progress, 0, 0.999) * (this.dots.length - 1)
        const index = Math.floor(t)
        const nextIndex = Math.min(this.dots.length - 1, index + 1)
        const local = t - index
        const a = this.dots[index].pos
        const b = this.dots[nextIndex].pos
        return new Vector(
            mix(a.x, b.x, local),
            mix(a.y, b.y, local)
        )
    }

    sampleFrame(progress) {
        const point = this.sample(progress)
        const before = this.sample(Math.max(0, progress - 0.012))
        const after = this.sample(Math.min(0.999, progress + 0.012))
        const dx = after.x - before.x
        const dy = after.y - before.y
        const length = Math.max(0.001, Math.sqrt(dx * dx + dy * dy))
        return {
            point,
            normal: new Vector(-dy / length, dx / length)
        }
    }

    drawAura(ctx, nowSec, pointer) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        for(let pass = 0; pass < 3; pass++) {
            ctx.beginPath()
            for(let i = 0; i < this.dots.length; i++) {
                const dot = this.dots[i]
                if(i === 0) ctx.moveTo(dot.pos.x, dot.pos.y)
                else ctx.lineTo(dot.pos.x, dot.pos.y)
            }

            const gradient = ctx.createLinearGradient(
                this.dots[0].pos.x,
                this.dots[0].pos.y,
                this.dots[this.dots.length - 1].pos.x,
                this.dots[this.dots.length - 1].pos.y
            )
            gradient.addColorStop(0, hsla(this.colorAt(0, nowSec, pointer), 82, 54, 0.075 - pass * 0.014))
            gradient.addColorStop(0.5, hsla(this.colorAt(0.5, nowSec, pointer), 76, 50, 0.06 - pass * 0.01))
            gradient.addColorStop(1, hsla(this.colorAt(1, nowSec, pointer), 82, 52, 0.075 - pass * 0.014))
            ctx.strokeStyle = gradient
            ctx.lineWidth = 12 - pass * 3 + pointer.energy * 3
            ctx.shadowBlur = 8 - pass * 1.8
            ctx.shadowColor = hsla(this.hue + nowSec * 8, 80, 48, 0.14)
            ctx.stroke()
        }

        ctx.restore()
    }

    drawCoreRope(ctx, nowSec, pointer) {
        ctx.save()
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        for(let i = 0; i < this.sticks.length; i++) {
            const stick = this.sticks[i]
            const progress = i / Math.max(1, this.sticks.length - 1)
            const hueA = this.colorAt(progress, nowSec, pointer)
            const hueB = this.colorAt(progress + 0.1, nowSec, pointer)
            const gradient = ctx.createLinearGradient(
                stick.startPoint.pos.x,
                stick.startPoint.pos.y,
                stick.endPoint.pos.x,
                stick.endPoint.pos.y
            )
            gradient.addColorStop(0, hsla(hueA, 82, 50, 0.56))
            gradient.addColorStop(0.45, hsla(hueA + 52, 86, 64, 0.68))
            gradient.addColorStop(1, hsla(hueB, 80, 48, 0.54))

            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.45 + Math.sin(nowSec * 1.6 + i * 0.8 + this.swayPhase) * 0.18 + pointer.energy * 0.28
            ctx.shadowBlur = 2.5 + pointer.energy * 3.5
            ctx.shadowColor = hsla(hueA, 80, 52, 0.2)
            ctx.beginPath()
            ctx.moveTo(stick.startPoint.pos.x, stick.startPoint.pos.y)
            ctx.lineTo(stick.endPoint.pos.x, stick.endPoint.pos.y)
            ctx.stroke()

            ctx.strokeStyle = hsla(hueA + 120, 70, 72, 0.09)
            ctx.lineWidth = 0.55
            ctx.shadowBlur = 0
            ctx.beginPath()
            ctx.moveTo(stick.startPoint.pos.x + 1.2, stick.startPoint.pos.y)
            ctx.lineTo(stick.endPoint.pos.x + 1.2, stick.endPoint.pos.y)
            ctx.stroke()
        }

        ctx.restore()
    }

    drawBulbs(ctx, nowSec, pointer) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"

        for(let i = 0; i < this.dots.length; i++) {
            if(i > 0 && i < this.dots.length - 1 && i % 2 !== 0) continue
            const dot = this.dots[i]
            const progress = i / Math.max(1, this.dots.length - 1)
            const hue = this.colorAt(progress, nowSec, pointer)
            const twinkle = 0.82 + 0.18 * Math.sin(nowSec * 1.9 + dot.glowPhase + pointer.energy * 0.8)
            const core = 2.2 + twinkle * 1.45 + pointer.energy * 0.9
            const halo = core * (4.8 + pointer.energy * 0.8)
            const spray = halo * (2.1 + pointer.energy * 0.35)

            const spill = ctx.createRadialGradient(
                dot.pos.x,
                dot.pos.y + spray * 0.12,
                0,
                dot.pos.x,
                dot.pos.y + spray * 0.12,
                spray
            )
            spill.addColorStop(0, hsla(hue, 82, 58, 0.11 + pointer.energy * 0.045))
            spill.addColorStop(0.28, hsla(hue + 22, 78, 48, 0.07 + pointer.energy * 0.025))
            spill.addColorStop(0.68, hsla(hue + 54, 68, 38, 0.022))
            spill.addColorStop(1, hsla(hue + 54, 70, 36, 0))
            ctx.fillStyle = spill
            ctx.beginPath()
            ctx.arc(dot.pos.x, dot.pos.y + spray * 0.12, spray, 0, TAU)
            ctx.fill()

            const outer = ctx.createRadialGradient(dot.pos.x, dot.pos.y, 0, dot.pos.x, dot.pos.y, halo)
            outer.addColorStop(0, hsla(hue, 88, 76, 0.22 + pointer.energy * 0.08))
            outer.addColorStop(0.25, hsla(hue, 84, 54, 0.14 + pointer.energy * 0.04))
            outer.addColorStop(0.68, hsla(hue, 76, 44, 0.046))
            outer.addColorStop(1, hsla(hue, 100, 50, 0))
            ctx.fillStyle = outer
            ctx.beginPath()
            ctx.arc(dot.pos.x, dot.pos.y, halo, 0, TAU)
            ctx.fill()

            const bulb = ctx.createRadialGradient(
                dot.pos.x - core * 0.35,
                dot.pos.y - core * 0.35,
                0,
                dot.pos.x,
                dot.pos.y,
                core
            )
            bulb.addColorStop(0, hsla(hue, 84, 82, 0.78))
            bulb.addColorStop(0.42, hsla(hue, 84, 62, 0.72))
            bulb.addColorStop(1, hsla(hue, 76, 36, 0.42))
            ctx.fillStyle = bulb
            ctx.shadowBlur = 6 + pointer.energy * 5
            ctx.shadowColor = hsla(hue, 84, 58, 0.42)
            ctx.beginPath()
            ctx.arc(dot.pos.x, dot.pos.y, core, 0, TAU)
            ctx.fill()
        }

        ctx.restore()
    }

    drawTripRuns(ctx, nowSec, pointer) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        const runCount = 1
        const tailSteps = 7
        const speed = 0.035 + pointer.energy * 0.025

        for(let run = 0; run < runCount; run++) {
            const head = (nowSec * speed + this.swayPhase * 0.09 + run / runCount) % 1
            const runHue = this.hue + nowSec * 10 + run * 124 + pointer.energy * 18
            const points = []

            for(let i = 0; i < tailSteps; i++) {
                const falloff = 1 - i / (tailSteps - 1)
                const progress = head - i * 0.018
                if(progress < 0.035 || progress > 0.965) continue

                const frame = this.sampleFrame(progress)
                const offset = Math.sin(nowSec * 2.4 + this.swayPhase + run * 1.7 + i * 0.52) * (1 - falloff) * 1.2
                const point = new Vector(
                    frame.point.x + frame.normal.x * offset,
                    frame.point.y + frame.normal.y * offset
                )
                const hue = runHue + falloff * 76 + progress * 120
                points.push({
                    point,
                    hue,
                    falloff,
                    alpha: 0.035 + falloff * (0.16 + pointer.energy * 0.08),
                    size: 1.1 + falloff * 2.6 + pointer.energy * 0.9
                })
            }

            for(let i = 1; i < points.length; i++) {
                const prev = points[i - 1]
                const current = points[i]
                const gradient = ctx.createLinearGradient(prev.point.x, prev.point.y, current.point.x, current.point.y)
                gradient.addColorStop(0, hsla(prev.hue, 82, 58, prev.alpha * 0.25))
                gradient.addColorStop(1, hsla(current.hue, 84, 62, current.alpha * 0.35))
                ctx.strokeStyle = gradient
                ctx.lineWidth = 0.8 + current.falloff * 1.45 + pointer.energy * 0.45
                ctx.shadowBlur = 3 + current.falloff * 5
                ctx.shadowColor = hsla(current.hue, 80, 54, current.alpha * 0.45)
                ctx.beginPath()
                ctx.moveTo(prev.point.x, prev.point.y)
                ctx.lineTo(current.point.x, current.point.y)
                ctx.stroke()
            }

            for(const item of points) {
                const halo = item.size * (2.4 + item.falloff * 1.2)
                const haloGradient = ctx.createRadialGradient(item.point.x, item.point.y, 0, item.point.x, item.point.y, halo)
                haloGradient.addColorStop(0, hsla(item.hue, 82, 72, item.alpha))
                haloGradient.addColorStop(0.35, hsla(item.hue + 36, 80, 54, item.alpha * 0.36))
                haloGradient.addColorStop(1, hsla(item.hue + 96, 100, 52, 0))
                ctx.fillStyle = haloGradient
                ctx.beginPath()
                ctx.arc(item.point.x, item.point.y, halo, 0, TAU)
                ctx.fill()

                ctx.fillStyle = hsla(item.hue + 12, 82, 64, 0.12 + item.alpha)
                ctx.shadowBlur = 3 + item.falloff * 4
                ctx.shadowColor = hsla(item.hue, 80, 54, item.alpha * 0.6)
                ctx.beginPath()
                ctx.arc(item.point.x, item.point.y, item.size, 0, TAU)
                ctx.fill()
            }
        }

        ctx.restore()
    }

    draw(ctx, nowSec, pointer) {
        this.drawAura(ctx, nowSec, pointer)
        this.drawCoreRope(ctx, nowSec, pointer)
        this.drawTripRuns(ctx, nowSec, pointer)
        this.drawBulbs(ctx, nowSec, pointer)
    }
}

function randomNumBetween(min, max) {
    return Math.random() * (max - min) + min
}

const ROOM_LIGHT_HUES = [32, 158, 202, 286, 332]
const ROPE_TOTAL = ROOM_LIGHT_HUES.length

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
    const hangTarget = {
        active: false,
        x: 0,
        y: 0
    }
    const pointer = {
        pos: new Vector(-1000, -1000),
        radius: 50,
        energy: 0,
        active: false
    }

    function drawBackground(nowSec = performance.now() * 0.001) {
        const hueA = 232 + Math.sin(nowSec * 0.12) * 5
        const hueB = 276 + Math.cos(nowSec * 0.1) * 6

        const gradient = ctx.createLinearGradient(0, 0, width, height)
        gradient.addColorStop(0, hsla(hueA, 44, 6, 1))
        gradient.addColorStop(0.52, hsla(248, 46, 4.5, 1))
        gradient.addColorStop(1, hsla(hueB, 44, 6, 1))
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = "screen"
        const upper = ctx.createRadialGradient(width * 0.3, 0, 0, width * 0.3, 0, Math.max(width, height) * 0.72)
        upper.addColorStop(0, hsla(184 + Math.sin(nowSec * 0.2) * 8, 64, 42, 0.045))
        upper.addColorStop(0.48, hsla(304, 54, 38, 0.018))
        upper.addColorStop(1, hsla(240, 100, 50, 0))
        ctx.fillStyle = upper
        ctx.fillRect(0, 0, width, height)

        const lower = ctx.createRadialGradient(width * 0.82, height * 0.86, 0, width * 0.82, height * 0.86, Math.max(width, height) * 0.56)
        lower.addColorStop(0, hsla(318 + Math.cos(nowSec * 0.18) * 8, 62, 42, 0.04))
        lower.addColorStop(1, hsla(318, 100, 50, 0))
        ctx.fillStyle = lower
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = "source-over"
    }

    function createRopes() {
        ropes = []
        const total = ROPE_TOTAL
        for(let i = 0; i < total; i++) {
            const spread = total <= 1 ? 0.5 : i / (total - 1)
            const x = width * (0.12 + spread * 0.76) + randomNumBetween(-width * 0.015, width * 0.015)
            const y = -height * 0.015
            const gap = randomNumBetween(height * 0.047, height * 0.064)
            const rope = new Rope({
                x,
                y,
                gap,
                segments: Math.round(randomNumBetween(10, 13)),
                iterations: 16,
                index: i,
                total,
                hue: (ROOM_LIGHT_HUES[i % ROOM_LIGHT_HUES.length] + randomNumBetween(-8, 8)) % 360,
                hueSpread: randomNumBetween(34, 72),
                swayPhase: randomNumBetween(0, TAU),
                swayAmp: randomNumBetween(width * 0.004, width * 0.014)
            })
            rope.pin(0)
            ropes.push(rope)
        }
    }

    function drawHangTarget(nowSec) {
        if(!hangTarget.active) return

        ctx.save()
        ctx.globalCompositeOperation = "screen"
        const pulse = 0.75 + 0.25 * Math.sin(nowSec * 2.2)
        const radius = Math.max(18, Math.min(width, height) * 0.09)
        const gradient = ctx.createRadialGradient(hangTarget.x, hangTarget.y, 0, hangTarget.x, hangTarget.y, radius)
        gradient.addColorStop(0, hsla(42 + pulse * 18, 76, 58, 0.13))
        gradient.addColorStop(0.35, hsla(184, 58, 46, 0.045))
        gradient.addColorStop(1, hsla(184, 58, 46, 0))
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(hangTarget.x, hangTarget.y, radius, 0, TAU)
        ctx.fill()

        ctx.strokeStyle = hsla(42, 76, 64, 0.22)
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(hangTarget.x, hangTarget.y, 4 + pulse * 2, 0, TAU)
        ctx.stroke()
        ctx.restore()
    }

    function renderFrame(nowMs = performance.now()) {
        const nowSec = nowMs * 0.001
        const energyTarget = pointer.active ? 0.62 : 0.08
        pointer.energy += (energyTarget - pointer.energy) * (pointer.active ? 0.14 : 0.05)
        pointer.radius += ((50 + pointer.energy * 26) - pointer.radius) * 0.12

        drawBackground(nowSec)
        drawHangTarget(nowSec)
        for(const rope of ropes) {
            rope.update(pointer, nowSec, width, height, hangTarget)
            rope.draw(ctx, nowSec, pointer)
        }
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
        drawBackground()
        createRopes()
        renderFrame()
    }

    function setPointer(x, y) {
        pointer.pos.setXY(clamp(x, 0, 1) * width, clamp(y, 0, 1) * height)
        pointer.active = true
        pointer.energy = Math.min(0.72, pointer.energy + 0.18)
    }

    function clearPointer() {
        pointer.pos.setXY(-1000, -1000)
        pointer.active = false
    }

    function toggleHangAt(x, y) {
        if(hangTarget.active) {
            hangTarget.active = false
        }
        else {
            hangTarget.active = true
            hangTarget.x = clamp(x, 0, 1) * width
            hangTarget.y = clamp(y, 0, 1) * height
            for(const rope of ropes) rope.prepareLooseEndTarget()
        }
        renderFrame()
        return hangTarget.active
    }

    function releaseHang() {
        hangTarget.active = false
        renderFrame()
    }

    function reset() {
        hangTarget.active = false
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

    return {
        start,
        stop,
        destroy,
        reset,
        renderStatic,
        setSize,
        setPointer,
        clearPointer,
        toggleHangAt,
        releaseHang
    }
}
