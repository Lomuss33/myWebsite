import React, { useEffect, useMemo, useRef } from 'react'
import { prefersReducedMotion } from "../hooks/webArtDomUtils.js"

export default function GoldfishTile({ readyId, locked = false, onReady }) {
    const tileRef = useRef(null)
    const reduceMotion = useMemo(() => prefersReducedMotion(), [])

    const holdRef = useRef(false)
    const holdStartRef = useRef(0)
    const pointerIdRef = useRef(null)
    const rafRef = useRef(null)
    const rateRef = useRef(1)
    const releaseRafRef = useRef(null)
    const burstRafRef = useRef(null)
    const burstTimeoutRef = useRef(null)
    const animationsRef = useRef([])

    useEffect(() => {
        onReady?.(readyId)
    }, [onReady, readyId])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const smoothstep01 = (t) => {
            const x = Math.max(0, Math.min(1, t))
            return x * x * (3 - 2 * x)
        }

        const collectAnimations = () => {
            if(animationsRef.current.length)
                return animationsRef.current.filter((animation) => animation.playState !== "idle")

            const nodes = tile.querySelectorAll(
                ".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"
            )
            const all = []
            for(const node of nodes) {
                const anims = node.getAnimations ? node.getAnimations() : []
                for(const a of anims) all.push(a)
            }
            animationsRef.current = all
            return animationsRef.current
        }

        const setRate = (rate) => {
            const r = Math.max(1, Math.min(5.2, Number(rate) || 1))
            rateRef.current = r
            const anims = collectAnimations()
            for(const a of anims) {
                a.playbackRate = a.animationName === "wiggle-end" ? Math.min(r, 2.6) : r
            }
        }

        const clearBurst = () => {
            if(burstRafRef.current != null) cancelAnimationFrame(burstRafRef.current)
            if(burstTimeoutRef.current != null) window.clearTimeout(burstTimeoutRef.current)
            burstRafRef.current = null
            burstTimeoutRef.current = null
        }

        const triggerClickBurst = () => {
            clearBurst()
            setRate(5.2)
            burstTimeoutRef.current = window.setTimeout(() => {
                const from = rateRef.current
                const start = performance.now()
                const dur = 320
                const burstRelease = () => {
                    const t = (performance.now() - start) / dur
                    const k = smoothstep01(t)
                    setRate(from + (1 - from) * k)
                    if(t < 1) burstRafRef.current = requestAnimationFrame(burstRelease)
                    else burstRafRef.current = null
                }
                burstRafRef.current = requestAnimationFrame(burstRelease)
                burstTimeoutRef.current = null
            }, 2000)
        }

        const stopHold = () => {
            const pointerId = pointerIdRef.current
            holdRef.current = false
            pointerIdRef.current = null
            tile.classList.remove("article-web-art-tile-goldfish-held")
            if(rafRef.current != null) cancelAnimationFrame(rafRef.current)
            rafRef.current = null

            if(pointerId != null && tile.hasPointerCapture?.(pointerId)) {
                try { tile.releasePointerCapture(pointerId) } catch (err) { void err }
            }

            const from = rateRef.current
            const dur = 360
            const start = performance.now()
            if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)

            const tickRelease = () => {
                const t = (performance.now() - start) / dur
                const k = smoothstep01(t)
                setRate(from + (1 - from) * k)
                if(t < 1) releaseRafRef.current = requestAnimationFrame(tickRelease)
                else releaseRafRef.current = null
            }
            releaseRafRef.current = requestAnimationFrame(tickRelease)
        }

        const cancelHold = () => {
            if(!holdRef.current) return
            stopHold()
        }

        const tick = () => {
            if(!holdRef.current) return
            const t = performance.now() - holdStartRef.current
            const mult = 1.2 + 4.0 * smoothstep01(t / 2400)
            setRate(mult)
            rafRef.current = requestAnimationFrame(tick)
        }

        const onPointerDown = (e) => {
            if(reduceMotion || locked) return
            if(e.button != null && e.button !== 0) return
            if(holdRef.current && pointerIdRef.current !== e.pointerId) return

            clearBurst()
            holdRef.current = true
            holdStartRef.current = performance.now()
            pointerIdRef.current = e.pointerId
            tile.classList.add("article-web-art-tile-goldfish-held")

            try { tile.setPointerCapture(e.pointerId) } catch (err) { void err }
            if(releaseRafRef.current != null) {
                cancelAnimationFrame(releaseRafRef.current)
                releaseRafRef.current = null
            }
            if(rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
        }

        const onPointerUp = (e) => {
            if(pointerIdRef.current !== e.pointerId) return
            const heldForMs = performance.now() - holdStartRef.current
            stopHold()
            if(heldForMs < 220) {
                triggerClickBurst()
            }
        }

        const onPointerCancel = (e) => {
            if(pointerIdRef.current !== e.pointerId) return
            cancelHold()
        }

        const onLostCapture = (e) => {
            if(pointerIdRef.current !== e.pointerId) return
            cancelHold()
        }

        tile.addEventListener("pointerdown", onPointerDown)
        tile.addEventListener("pointerup", onPointerUp)
        tile.addEventListener("pointercancel", onPointerCancel)
        tile.addEventListener("lostpointercapture", onLostCapture)

        return () => {
            tile.removeEventListener("pointerdown", onPointerDown)
            tile.removeEventListener("pointerup", onPointerUp)
            tile.removeEventListener("pointercancel", onPointerCancel)
            tile.removeEventListener("lostpointercapture", onLostCapture)
            cancelHold()
            clearBurst()
            if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)
            releaseRafRef.current = null
            animationsRef.current = []
        }
    }, [locked, reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return
        tile.classList.toggle("article-web-art-tile-goldfish-locked", locked)
    }, [locked])

    return (
        <div className={`article-web-art-tile article-web-art-tile-goldfish`}
             ref={tileRef}
             role={"img"}
             aria-label={`Goldfish animation tile`}>
            <div className={`fish-stage`}>
                <div className={`fish-wrapper`}>
                    <div className={`fish-container`}>
                        <div className={`fish-parts`}>
                            <div className={`fish-body front`}/>
                            <div className={`fish-body back`}/>
                            <div className={`fish-back-bottom-fin front`}/>
                            <div className={`fish-back-bottom-fin back`}/>
                            <div className={`fish-back-fin`}/>
                            <div className={`fish-front-bottom-fin front`}/>
                            <div className={`fish-front-bottom-fin back`}/>
                            <div className={`fish-top-fin`}/>
                        </div>
                    </div>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Fish
            </span>
        </div>
    )
}
