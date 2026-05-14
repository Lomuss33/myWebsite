function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value))
}

function smoothstep01(value) {
    const x = clamp(value, 0, 1)
    return x * x * (3 - 2 * x)
}

export function createAndroidRobotEngine(canvas, options = {}) {
    const reduceMotion = Boolean(options.reduceMotion)
    let ctx = canvas.getContext("2d", { alpha: true })
    if(!ctx) throw new Error("Canvas 2D context not available")

    let width = 1
    let height = 1
    let running = false
    let rafId = null
    let lastFrameAt = 0
    let time = 0
    let blink = 0
    let target = { x: 0, y: 0 }
    let pointer = { x: 0, y: 0 }
    let clickCount = 0
    let lastClickAt = 0
    let angryUntil = 0
    let laughUntil = 0
    let mouthMode = "smile"
    let mouthUntil = 0
    let bounceUntil = 0
    let collapseState = null
    let reappearUntil = 0
    let popState = null
    let bubbles = []

    function emitPop(text, durationMs = 1200) {
        const now = performance.now()
        popState = {
            text,
            startAt: now,
            durationMs
        }
    }

    function emitBubbles(count, tone = "fun") {
        const spawnCount = Math.max(1, Math.floor(count || 1))
        for(let i = 0; i < spawnCount; i++) {
            const burst = tone === "burst"
            const angle = burst
                ? ((Math.PI * 2 * i) / spawnCount) + Math.random() * 0.2
                : (-Math.PI * 0.5) + (Math.random() - 0.5) * 1.8
            const speed = burst ? 0.9 + Math.random() * 0.6 : 0.28 + Math.random() * 0.32
            const size = 5 + Math.random() * 7
            bubbles.push({
                x: 0.5 + (burst ? Math.cos(angle) * 0.15 : (Math.random() - 0.5) * 0.18),
                y: 0.52 + (burst ? Math.sin(angle) * 0.15 : (Math.random() - 0.5) * 0.18),
                vx: Math.cos(angle) * speed * 0.012,
                vy: Math.sin(angle) * speed * 0.012 - (burst ? 0.002 : 0.006),
                size,
                life: 0,
                maxLife: 0.9,
                tone
            })
        }
    }

    function updateEffects(dt, now) {
        if(!reduceMotion) {
            pointer.x += (target.x - pointer.x) * clamp(dt * 8, 0, 1)
            pointer.y += (target.y - pointer.y) * clamp(dt * 8, 0, 1)
        }
        else {
            pointer.x = target.x
            pointer.y = target.y
        }

        if(blink > 0) blink = Math.max(0, blink - dt * 6)
        else if(Math.random() > 0.985 && !reduceMotion) blink = 1

        const nextBubbles = []
        for(const bubble of bubbles) {
            bubble.life += dt
            if(bubble.life >= bubble.maxLife) continue
            bubble.x += bubble.vx * (dt * 60)
            bubble.y += bubble.vy * (dt * 60)
            bubble.vy -= 0.0004 * (dt * 60)
            nextBubbles.push(bubble)
        }
        bubbles = nextBubbles

        if(collapseState && now >= collapseState.endAt) {
            collapseState = null
            reappearUntil = now + 600
        }

        if(now > mouthUntil) {
            mouthMode = "smile"
        }
    }

    function drawBubble(bubble) {
        const alpha = 1 - smoothstep01(bubble.life / bubble.maxLife)
        const scale = 0.65 + smoothstep01(bubble.life / bubble.maxLife) * 0.55
        const x = bubble.x * width
        const y = bubble.y * height
        const radius = bubble.size * scale

        const gradient = ctx.createRadialGradient(
            x - radius * 0.35, y - radius * 0.35, radius * 0.1,
            x, y, radius
        )

        if(bubble.tone === "angry") {
            gradient.addColorStop(0, `rgba(255, 218, 218, ${0.9 * alpha})`)
            gradient.addColorStop(1, `rgba(255, 70, 70, ${0.28 * alpha})`)
        }
        else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${0.82 * alpha})`)
            gradient.addColorStop(1, `rgba(37, 211, 102, ${0.24 * alpha})`)
        }

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
    }

    function draw(now = performance.now()) {
        const isAngry = now < angryUntil
        const isLaughing = now < laughUntil
        const bounceMix = now < bounceUntil ? 1 - ((bounceUntil - now) / 600) : 1
        const bounceScale = now < bounceUntil
            ? 1 + (Math.sin(bounceMix * Math.PI * 2) * 0.04) * (1 - bounceMix)
            : 1

        let opacity = 1
        let scale = bounceScale
        if(collapseState) {
            const progress = smoothstep01((now - collapseState.startAt) / Math.max(1, collapseState.endAt - collapseState.startAt))
            opacity = 1 - progress
            scale *= 1 - progress * 0.1
        }
        else if(now < reappearUntil) {
            const progress = 1 - ((reappearUntil - now) / 600)
            opacity = smoothstep01(progress)
            scale *= 0.92 + 0.08 * opacity
        }

        const eyeColor = isAngry ? "#ff4d4d" : "#25d366"
        const baseW = 280
        const baseH = 320
        const fit = Math.min(width / baseW, height / baseH)
        const drawW = baseW * fit
        const drawH = baseH * fit
        const offsetX = (width - drawW) / 2
        const offsetY = (height - drawH) / 2

        ctx.clearRect(0, 0, width, height)

        for(const bubble of bubbles) drawBubble(bubble)

        if(popState) {
            const progress = (now - popState.startAt) / popState.durationMs
            if(progress >= 1) {
                popState = null
            }
            else {
                const alphaIn = progress < 0.3 ? progress / 0.3 : 1 - ((progress - 0.3) / 0.7)
                const yShift = 16 - 22 * progress
                const pillWidth = Math.max(68, popState.text.length * 7.6)
                const pillHeight = 24
                const px = width / 2
                const py = Math.max(24, height - 42 + yShift)

                ctx.save()
                ctx.globalAlpha = clamp(alphaIn, 0, 1)
                ctx.fillStyle = "rgba(255, 255, 255, 0.18)"
                ctx.strokeStyle = "rgba(255, 255, 255, 0.32)"
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.roundRect(px - pillWidth / 2, py - pillHeight / 2, pillWidth, pillHeight, 999)
                ctx.fill()
                ctx.stroke()
                ctx.fillStyle = "#eafff6"
                ctx.font = "700 12px system-ui, sans-serif"
                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillText(popState.text, px, py + 0.5)
                ctx.restore()
            }
        }

        if(opacity <= 0.001) return

        ctx.save()
        ctx.globalAlpha = opacity
        ctx.translate(offsetX + drawW / 2, offsetY + drawH / 2)
        ctx.scale(fit * scale, fit * scale)
        ctx.translate(-baseW / 2, -baseH / 2)

        const floatY = reduceMotion ? 0 : Math.sin(time * 1.2) * 8
        const cx = baseW / 2
        const cy = baseH / 2 + 20
        const bodyX = cx + pointer.x * 5
        const bodyY = cy + floatY + 30
        const headX = cx + pointer.x * 25
        const headY = cy + floatY - 50 + (pointer.y * 15)
        const faceX = headX + pointer.x * 10
        const faceY = headY + pointer.y * 8
        const faceHeight = 60

        const glowGradient = ctx.createRadialGradient(cx, cy + 10, 10, cx, cy + 10, 110)
        glowGradient.addColorStop(0, `rgba(37, 211, 102, ${isAngry ? 0.06 : 0.16})`)
        glowGradient.addColorStop(1, "rgba(37, 211, 102, 0)")
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(cx, cy + 10, 110, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "rgba(0, 0, 0, 0.12)"
        ctx.beginPath()
        ctx.ellipse(cx, cy + 90, 40 + (reduceMotion ? 0 : Math.sin(time) * 5), 10, 0, 0, Math.PI * 2)
        ctx.fill()

        let bodyGradient = ctx.createRadialGradient(bodyX - 20, bodyY - 20, 10, bodyX, bodyY, 60)
        bodyGradient.addColorStop(0, "#ffffff")
        bodyGradient.addColorStop(1, "#d1d9e6")
        ctx.fillStyle = bodyGradient
        ctx.beginPath()
        ctx.ellipse(bodyX, bodyY, 50, 45, 0, 0, Math.PI * 2)
        ctx.fill()

        const logoX = bodyX + pointer.x * 10
        const logoY = bodyY + pointer.y * 5
        ctx.fillStyle = "#25d366"
        ctx.beginPath()
        ctx.arc(logoX, logoY, 15, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(logoX - 3, logoY - 3, 4, 0, Math.PI * 2)
        ctx.fill()

        let headGradient = ctx.createRadialGradient(headX - 30, headY - 20, 20, headX, headY, 80)
        headGradient.addColorStop(0, "#ffffff")
        headGradient.addColorStop(1, "#cbd5e1")
        ctx.fillStyle = headGradient
        ctx.beginPath()
        ctx.roundRect(headX - 60, headY - 45, 120, 90, 40)
        ctx.fill()

        ctx.fillStyle = "#0f172a"
        ctx.beginPath()
        ctx.roundRect(faceX - 45, faceY - (faceHeight / 2), 90, faceHeight, 22)
        ctx.fill()

        const eyeY = faceY + (pointer.y * 5) - 2
        ctx.fillStyle = eyeColor
        ctx.shadowBlur = 12
        ctx.shadowColor = eyeColor
        if(blink <= 0.2) {
            ctx.beginPath()
            ctx.ellipse(faceX - 22 + (pointer.x * 5), eyeY, 7, 10, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.ellipse(faceX + 22 + (pointer.x * 5), eyeY, 7, 10, 0, 0, Math.PI * 2)
            ctx.fill()
        }
        ctx.shadowBlur = 0

        ctx.strokeStyle = eyeColor
        ctx.lineWidth = 4
        const mouthFloat = pointer.y * 6
        const baseY = faceY + 14 + mouthFloat
        if(mouthMode === "sad") {
            ctx.beginPath()
            ctx.moveTo(faceX - 18, baseY + 8)
            ctx.quadraticCurveTo(faceX, baseY - 2, faceX + 18, baseY + 8)
            ctx.stroke()
        }
        else if(mouthMode === "wow") {
            ctx.beginPath()
            ctx.arc(faceX, baseY + 4, 6, 0, Math.PI * 2)
            ctx.stroke()
        }
        else if(mouthMode === "oh") {
            ctx.beginPath()
            ctx.arc(faceX, baseY + 4, 4, 0, Math.PI * 2)
            ctx.stroke()
        }
        else {
            const smileDepth = (isLaughing ? 12 : 8) + Math.abs(pointer.y * 4)
            ctx.beginPath()
            ctx.moveTo(faceX - 18, baseY)
            ctx.quadraticCurveTo(faceX, baseY + smileDepth, faceX + 18, baseY)
            ctx.stroke()
        }

        ctx.strokeStyle = "#cbd5e1"
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.moveTo(headX - 40, headY - 40)
        ctx.lineTo(headX - 55, headY - 65)
        ctx.moveTo(headX + 40, headY - 40)
        ctx.lineTo(headX + 55, headY - 65)
        ctx.stroke()

        ctx.restore()
    }

    function tick(now) {
        if(!running) return
        if(lastFrameAt === 0) lastFrameAt = now
        const dt = clamp((now - lastFrameAt) / 1000, 0, 0.05)
        lastFrameAt = now
        if(!reduceMotion) time += dt
        updateEffects(dt, now)
        draw(now)
        rafId = requestAnimationFrame(tick)
    }

    function renderStatic(now = performance.now()) {
        updateEffects(0, now)
        draw(now)
    }

    function setSize(nextWidth, nextHeight, devicePixelRatio = 1) {
        width = Math.max(1, Math.floor(nextWidth || 1))
        height = Math.max(1, Math.floor(nextHeight || 1))
        const dpr = clamp(Number(devicePixelRatio) || 1, 1, 2)
        canvas.width = Math.floor(width * dpr)
        canvas.height = Math.floor(height * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        renderStatic()
    }

    function start() {
        if(running) return
        if(reduceMotion) {
            renderStatic()
            return
        }
        running = true
        lastFrameAt = 0
        rafId = requestAnimationFrame(tick)
    }

    function stop() {
        running = false
        if(rafId != null) cancelAnimationFrame(rafId)
        rafId = null
        lastFrameAt = 0
    }

    function destroy() {
        stop()
        bubbles = []
        popState = null
        ctx = null
    }

    function setPointer(x, y) {
        target.x = clamp((Number(x) || 0.5) - 0.5, -1, 1)
        target.y = clamp((Number(y) || 0.5) - 0.5, -1, 1)
        if(reduceMotion && !running) renderStatic()
    }

    function clearPointer() {
        target.x = 0
        target.y = 0
        if(reduceMotion && !running) renderStatic()
    }

    function poke() {
        const now = performance.now()
        if(now - lastClickAt > 1500) clickCount = 0
        clickCount += 1
        lastClickAt = now
        bounceUntil = now + 600

        const funTexts = ["You tickle me", "Haha", "Nice", "Okay", "Wow", "Ah"]
        const angryTexts = ["Enough!", "I'm angry", "Stop", "Sad"]
        const collapseTexts = ["Ouch!", "I'm done"]

        if(clickCount >= 8) {
            angryUntil = now + 1200
            collapseState = { startAt: now, endAt: now + 1200 }
            clickCount = 0
            emitBubbles(18, "burst")
            mouthMode = "oh"
            mouthUntil = now + 1400
            emitPop(collapseTexts[Math.floor(Math.random() * collapseTexts.length)], 1400)
        }
        else if(clickCount >= 5) {
            angryUntil = now + 1500
            mouthMode = "sad"
            mouthUntil = now + 1500
            emitBubbles(8, "angry")
            emitPop(angryTexts[Math.floor(Math.random() * angryTexts.length)], 1500)
        }
        else {
            laughUntil = now + 1200
            mouthMode = Math.random() > 0.6 ? "wow" : "smile"
            mouthUntil = now + 1200
            emitBubbles(4, "fun")
            emitPop(funTexts[Math.floor(Math.random() * funTexts.length)], 1200)
        }

        if(reduceMotion && !running) renderStatic()
    }

    return {
        start,
        stop,
        destroy,
        renderStatic,
        setSize,
        setPointer,
        clearPointer,
        poke
    }
}
