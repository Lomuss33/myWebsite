import { useEffect, useMemo, useRef } from 'react'
import { prefersReducedMotion, scheduleIdleWork, syncTileEngineSize } from "./webArtDomUtils.js"

export function useReducedMotionFlag() {
    return useMemo(() => prefersReducedMotion(), [])
}

export function useCanvasArtEngine({
    readyId,
    activate = true,
    locked = false,
    onReady,
    config,
    createEngine,
    maxDpr = 1.5,
    idleTimeoutMs = 220,
    intersectionThreshold = 0.25,
    renderStaticOnInit = true,
    startWhenLocked = false,
    onAfterInit = null,
    onResize = null,
    onLocked = null,
    shouldStartOnIntersect = null
}) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const lockedRef = useRef(locked)
    const callbacksRef = useRef({
        createEngine,
        onAfterInit,
        onResize,
        onLocked,
        shouldStartOnIntersect
    })

    useEffect(() => {
        lockedRef.current = locked
    }, [locked])

    useEffect(() => {
        callbacksRef.current = {
            createEngine,
            onAfterInit,
            onResize,
            onLocked,
            shouldStartOnIntersect
        }
    })

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(readyId)
        }

        const cancelWork = scheduleIdleWork(async () => {
            try {
                engine = await callbacksRef.current.createEngine(canvas, config, { tile })
                if(canceled || !engine) {
                    if(!canceled) markReady()
                    return
                }

                engineRef.current = engine

                const updateSize = () => {
                    const rawDpr = typeof window !== "undefined" ? (window.devicePixelRatio || 1) : 1
                    const dpr = maxDpr != null ? Math.min(maxDpr, rawDpr) : rawDpr
                    syncTileEngineSize(tile, engine, dpr)
                }

                updateSize()
                if(renderStaticOnInit) {
                    engine.renderStatic?.()
                }

                const initResult = callbacksRef.current.onAfterInit?.(engine, {
                    tile,
                    canvas,
                    updateSize,
                    isCanceled: () => canceled
                })
                if(initResult === false) {
                    markReady()
                    return
                }

                if((!lockedRef.current || startWhenLocked) && visibleRef.current) {
                    engine.start?.()
                }
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    callbacksRef.current.onResize?.(engine)
                })
                ro.observe(tile)

                if(intersectionThreshold != null && typeof window !== "undefined" && "IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(callbacksRef.current.shouldStartOnIntersect) {
                                const customDecision = callbacksRef.current.shouldStartOnIntersect(
                                    engine,
                                    visibleRef.current,
                                    lockedRef.current
                                )
                                if(customDecision === "handled") continue
                            }

                            if(lockedRef.current && !startWhenLocked) {
                                callbacksRef.current.onLocked?.(engine)
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: intersectionThreshold })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: idleTimeoutMs })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [
        activate,
        config,
        idleTimeoutMs,
        intersectionThreshold,
        maxDpr,
        onReady,
        readyId,
        renderStaticOnInit,
        startWhenLocked
    ])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            callbacksRef.current.onLocked?.(engine)
            engine.clearPointer?.()
            engine.clearMouse?.()
            engine.setHeld?.(false)
            engine.setHoverActive?.(false)
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    return {
        tileRef,
        canvasRef,
        engineRef,
        visibleRef
    }
}
