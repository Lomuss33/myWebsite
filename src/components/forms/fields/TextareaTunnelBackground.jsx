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
        let onGlobalPointerMove = null
        let rafId = 0
        let lastPointer = null
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
            const app = TunnelComponent(canvasEl, {enablePointer: true})
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

            // Make the tunnel react to the pointer anywhere on the screen, not just over the canvas.
            // We map viewport pointer coords into the canvas rect so the internal handler "thinks"
            // the canvas covers the whole screen.
            onGlobalPointerMove = (e) => {
                lastPointer = {x: e.clientX, y: e.clientY}
                if(rafId)
                    return

                rafId = window.requestAnimationFrame(() => {
                    rafId = 0
                    if(!lastPointer)
                        return

                    const rect = canvasEl.getBoundingClientRect()
                    const vw = window.innerWidth || 1
                    const vh = window.innerHeight || 1
                    const nx = Math.max(0, Math.min(1, lastPointer.x / vw))
                    const ny = Math.max(0, Math.min(1, lastPointer.y / vh))
                    const mappedX = rect.left + nx * rect.width
                    const mappedY = rect.top + ny * rect.height

                    try {
                        canvasEl.dispatchEvent(new PointerEvent("pointermove", {
                            clientX: mappedX,
                            clientY: mappedY,
                            pointerId: 1,
                            pointerType: "mouse",
                            isPrimary: true,
                            bubbles: true,
                        }))
                    } catch {
                        // Older browsers / environments without PointerEvent.
                        try {
                            canvasEl.dispatchEvent(new MouseEvent("mousemove", {
                                clientX: mappedX,
                                clientY: mappedY,
                                bubbles: true,
                            }))
                        } catch {
                            // Ignore: environment doesn't support synthetic mouse events.
                        }
                    }
                })
            }

            window.addEventListener("pointermove", onGlobalPointerMove, {passive: true})

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
            if(onGlobalPointerMove) window.removeEventListener("pointermove", onGlobalPointerMove)
            if(rafId) window.cancelAnimationFrame(rafId)
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
