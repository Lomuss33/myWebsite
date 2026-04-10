// Licence CC BY-NC-SA 4.0
// Attribution — You must give appropriate credit.
// Non Commercial — You may not use the material for commercial purposes.
//
// Effect component source: threejs-components "tunnel1" background.

import React, {useEffect, useRef} from "react"

const TUNNEL_MODULE_URL =
    "https://cdn.jsdelivr.net/npm/threejs-components@0.0.30/build/backgrounds/tunnel1.min.js"

function TextareaTunnelBackground({ enabled = true, loadDelayMs = 1200 }) {
    const canvasRef = useRef(null)
    const appRef = useRef(null)

    useEffect(() => {
        if(!enabled)
            return

        const canvasEl = canvasRef.current
        if(!canvasEl)
            return

        const reduceMotion = window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        if(reduceMotion)
            return

        const saveData = navigator?.connection?.saveData
        if(saveData)
            return

        let isAlive = true
        let resizeObserver = null
        let onWindowResize = null
        let worldSizeTimeout = null
        let intersectionObserver = null
        let idleHandle = null
        let didInit = false
        let loadTimer = null

        const init = async () => {
            if(didInit)
                return
            didInit = true

            const mod = await import(/* @vite-ignore */ TUNNEL_MODULE_URL)
            if(!isAlive)
                return

            const TunnelComponent = mod?.default || mod
            const app = TunnelComponent(canvasEl, {enablePointer: false})
            appRef.current = app

            // High-contrast monochrome tunnel shading.
            app.tunnel.setColors([0x000000, 0x1a1a1a, 0x6a6a6a, 0xcfcfcf, 0xffffff])
            app.tunnel.uniforms.uNoiseScaleX.value = 3.0
            app.tunnel.uniforms.uNoiseTresholds.value[0] = 0.88
            app.tunnel.uniforms.uNoiseTresholds.value[1] = 0.82
            app.tunnel.uniforms.uNoiseTresholds.value[2] = 0.76
            app.tunnel.uniforms.uNoiseTresholds.value[3] = 0.70
            app.tunnel.uniforms.uNoiseTresholds.value[4] = 0.64

            if(app?.bloomPass) {
                app.bloomPass.strength = 0.35
                app.bloomPass.threshold = 0.22
            }
            if(app?.tunnel?.uniforms?.uSpeed) {
                app.tunnel.uniforms.uSpeed.value = 0.6
            }

            // Smooth "random" drift (no mouse tracking).
            const radius = 2.5
            let angleFrom = Math.random() * Math.PI * 2
            let angleTo = Math.random() * Math.PI * 2
            let segmentStart = performance.now()
            let segmentDuration = 2500 + Math.random() * 2500

            const lerpAngle = (a, b, t) => {
                const tau = Math.PI * 2
                let delta = (b - a) % tau
                if(delta > Math.PI) delta -= tau
                if(delta < -Math.PI) delta += tau
                return a + delta * t
            }

            const smoothstep = (t) => t * t * (3 - 2 * t)

            const prevOnBeforeRender = app.three?.onBeforeRender
            if(app.three) {
                app.three.onBeforeRender = (frame) => {
                    const now = performance.now()
                    const elapsed = now - segmentStart
                    if(elapsed >= segmentDuration) {
                        angleFrom = angleTo
                        angleTo = Math.random() * Math.PI * 2
                        segmentStart = now
                        segmentDuration = 2500 + Math.random() * 2500
                    }

                    const rawT = Math.max(0, Math.min(1, (now - segmentStart) / segmentDuration))
                    const t = smoothstep(rawT)
                    const baseAngle = lerpAngle(angleFrom, angleTo, t)
                    const wobble = 0.12 * Math.sin(now / 1300) + 0.06 * Math.sin(now / 700 + 1.7)
                    const a = baseAngle + wobble
                    const r = radius * (1 + 0.06 * Math.sin(now / 1800 + 0.9))

                    if(appRef.current?.tunnelTarget) {
                        appRef.current.tunnelTarget.x = Math.cos(a) * r
                        appRef.current.tunnelTarget.y = Math.sin(a) * r
                        appRef.current.tunnelTarget.z = 0
                    }

                    prevOnBeforeRender && prevOnBeforeRender(frame)

                    // Add a tiny rotation drift too (keeps it "alive" without mouse input).
                    if(appRef.current?.tunnel?.rotation) {
                        appRef.current.tunnel.rotation.x = 0.14 * Math.sin(now / 1600) + 0.06 * Math.sin(now / 820 + 0.4)
                        appRef.current.tunnel.rotation.y = 0.14 * Math.cos(now / 1700 + 0.7) + 0.06 * Math.sin(now / 760 + 1.1)
                    }
                }
            }

            const parentEl = canvasEl.parentElement
            if(parentEl && "ResizeObserver" in window) {
                resizeObserver = new ResizeObserver(() => {
                    appRef.current?.three?.updateWorldSize?.()
                })
                resizeObserver.observe(parentEl)
            }
            else {
                onWindowResize = () => appRef.current?.three?.updateWorldSize?.()
                window.addEventListener("resize", onWindowResize, {passive: true})
            }

            appRef.current?.three?.updateWorldSize?.()

            // Some sections mount while hidden/animating in; re-check size briefly.
            const recheckSize = (attempt = 0) => {
                if(!isAlive)
                    return

                appRef.current?.three?.updateWorldSize?.()
                if(attempt >= 10)
                    return

                worldSizeTimeout = window.setTimeout(() => recheckSize(attempt + 1), 500)
            }
            recheckSize(0)
        }

        const scheduleInit = () => {
            if(didInit)
                return

            const doSchedule = () => {
                // Deliberately load late; this is a purely cosmetic effect.
                loadTimer = window.setTimeout(() => {
                    init().catch(() => {})
                }, loadDelayMs)
            }

            if("requestIdleCallback" in window) {
                idleHandle = window.requestIdleCallback(doSchedule, {timeout: 3500})
            }
            else {
                doSchedule()
            }
        }

        if("IntersectionObserver" in window) {
            intersectionObserver = new IntersectionObserver((entries) => {
                const isIntersecting = entries?.some?.(e => e.isIntersecting)
                if(isIntersecting)
                    scheduleInit()
            }, {threshold: 0.1})
            intersectionObserver.observe(canvasEl)
        }
        else {
            // Fallback: load after a delay if we can't observe visibility.
            scheduleInit()
        }

        return () => {
            isAlive = false
            if(resizeObserver) resizeObserver.disconnect()
            if(onWindowResize) window.removeEventListener("resize", onWindowResize)
            if(worldSizeTimeout) window.clearTimeout(worldSizeTimeout)
            if(intersectionObserver) intersectionObserver.disconnect()
            if(loadTimer) window.clearTimeout(loadTimer)
            if(idleHandle && "cancelIdleCallback" in window) window.cancelIdleCallback(idleHandle)

            try {
                appRef.current?.dispose?.()
            } finally {
                appRef.current = null
            }
        }
    }, [enabled, loadDelayMs])

    if(!enabled)
        return null

    return (
        <canvas
            ref={canvasRef}
            className="form-textarea-tunnel-canvas"
            aria-hidden="true"
            tabIndex={-1}
        />
    )
}

export default TextareaTunnelBackground
