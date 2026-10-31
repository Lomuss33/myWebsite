import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useCanvasArtEngine, useReducedMotionFlag } from "../hooks/useCanvasArtEngine.js"
import { useLocalPointer, useNormalizedPointer } from "../hooks/useNormalizedPointer.js"
import { scheduleIdleWork, syncTileEngineSize } from "../hooks/webArtDomUtils.js"

export function DistanceTile({ itemWrapper, index, activate, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 54013 + (Number(itemWrapper.id) || 11) * 7331,
        reduceMotion
    }), [itemWrapper.id, reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../distanceFieldEngine.js")
            return mod.createDistanceFieldEngine(canvas, cfg)
        }
    })

    const pointerPosition = useNormalizedPointer(tileRef)

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Distance web art tile ${index + 1}`}
                disabled={locked}
                onPointerEnter={locked ? undefined : (() => {
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.start?.()
                })}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.boostPopulation?.()
                })}
                onPointerUp={locked ? undefined : ((event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                })}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onFocus={locked ? undefined : (() => {
                    engineRef.current?.setHoverActive?.(true)
                    engineRef.current?.start?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHoverActive?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.boostPopulation?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Distance
            </span>
        </button>
    )
}

export function AndroidTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const backgroundCanvasRef = useRef(null)
    const canvasRef = useRef(null)
    const backgroundEngineRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const reduceMotion = useReducedMotionFlag()

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const backgroundCanvas = backgroundCanvasRef.current
        const canvas = canvasRef.current
        if(!tile || !backgroundCanvas || !canvas) return

        let canceled = false
        let backgroundEngine = null
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = scheduleIdleWork(async () => {
            try {
                const bgMod = await import("../androidBackgroundEngine.js")
                const mod = await import("../androidRobotEngine.js")
                if(canceled) return

                backgroundEngine = bgMod.createAndroidBackgroundEngine(backgroundCanvas, { reduceMotion })
                backgroundEngineRef.current = backgroundEngine
                engine = mod.createAndroidRobotEngine(canvas, { reduceMotion })
                engineRef.current = engine

                const updateSize = () => {
                    const devicePixelRatio = Math.min(1.5, window.devicePixelRatio || 1)
                    syncTileEngineSize(tile, backgroundEngine, devicePixelRatio)
                    syncTileEngineSize(tile, engine, devicePixelRatio)
                }

                updateSize()
                backgroundEngine.renderStatic?.()
                engine.renderStatic?.()
                if(!locked) backgroundEngine.start?.()
                if(!locked) engine.start?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                backgroundEngine.stop?.()
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) {
                                backgroundEngine.start?.()
                                engine.start?.()
                            }
                            else {
                                backgroundEngine.stop?.()
                                engine.stop?.()
                            }
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
            }
            catch(err) {
                void err
                markReady()
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            backgroundEngine?.destroy?.()
            engine?.destroy?.()
            backgroundEngineRef.current = null
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady, reduceMotion])

    useEffect(() => {
        const engine = engineRef.current
        const backgroundEngine = backgroundEngineRef.current
        if(!engine || !backgroundEngine) return
        if(locked) {
            engine.clearPointer?.()
            backgroundEngine.stop?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) {
            backgroundEngine.start?.()
            engine.start?.()
        }
    }, [locked])

    const pointerPosition = useNormalizedPointer(tileRef)

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-android`}
                aria-label={`Android web art tile ${index + 1}`}
                disabled={locked}
                onPointerEnter={locked ? undefined : (() => {
                    engineRef.current?.start?.()
                })}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerLeave={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onFocus={locked ? undefined : (() => {
                    engineRef.current?.start?.()
                })}
                onBlur={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onClick={locked ? undefined : (() => {
                    engineRef.current?.poke?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.poke?.()
                    }
                })}>
            <canvas ref={backgroundCanvasRef}
                    className={`article-web-art-android-bg-canvas`}
                    aria-hidden={true}/>
            <div className={`article-web-art-android-glow`} aria-hidden={true}/>
            <canvas ref={canvasRef}
                    className={`article-web-art-android-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Android
            </span>
        </button>
    )
}

export function ShapeFieldTile({ itemWrapper, index, activate, locked, onReady }) {
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 1729 + (Number(itemWrapper.id) || 8) * 4242,
        reduceMotion,
        gap: 18,
        radiusRatio: 0.4,
        restScale: 0.28,
        minHoverScale: 1.65,
        maxHoverScale: 5.4,
        waveWidth: 260
    }), [itemWrapper.id, reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: 0.2,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../shapeFieldEngine.js")
            return mod.createShapeFieldEngine(canvas, cfg)
        },
        onAfterInit: (engine) => {
            engine.triggerWave?.()
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        }
    })

    const getLocalPoint = useLocalPointer(canvasRef)

    const onPointerMove = (event) => {
        const point = getLocalPoint(event)
        engineRef.current?.setPointer?.(point.x, point.y)
    }

    const onPointerDown = (event) => {
        const point = getLocalPoint(event)
        engineRef.current?.setPointer?.(point.x, point.y)
        engineRef.current?.triggerWave?.(point.x, point.y)
    }

    const onKeyDown = (event) => {
        if(event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        engineRef.current?.triggerWave?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-shape`}
                aria-label={`Shape web art tile ${index + 1}`}
                disabled={locked}
                onPointerMove={locked ? undefined : onPointerMove}
                onPointerDown={locked ? undefined : onPointerDown}
                onPointerLeave={locked ? undefined : (() => engineRef.current?.clearPointer?.())}
                onBlur={locked ? undefined : (() => engineRef.current?.clearPointer?.())}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Shape
            </span>
        </button>
    )
}

export function HourglassTile({ itemWrapper, index, activate, locked, onReady }) {
    const [gravity, setGravity] = useState(1.15)
    const [neckRatio, setNeckRatio] = useState(0.065)

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config: null,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: 0.2,
        renderStaticOnInit: false,
        createEngine: async (canvas) => {
            const mod = await import("../hourglassEngine.js")
            return mod.createHourglassEngine(canvas)
        },
        onAfterInit: (engine) => {
            const state = engine.getState?.()
            if(state) {
                setGravity(state.gravity)
                setNeckRatio(state.neckRatio)
            }
        }
    })

    const onKeyDown = (event) => {
        if(event.key !== "Enter" && event.key !== " ") return
        event.preventDefault()
        engineRef.current?.flip?.()
    }

    const stopControlEvent = (event) => {
        event.stopPropagation()
    }

    const onGravityChange = (event) => {
        const nextValue = Number(event.target.value)
        setGravity(nextValue)
        engineRef.current?.setGravity?.(nextValue)
    }

    const onNeckRatioChange = (event) => {
        const nextValue = Number(event.target.value)
        setNeckRatio(nextValue)
        engineRef.current?.setNeckRatio?.(nextValue)
        if(!locked && visibleRef.current) engineRef.current?.start?.()
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-hourglass`}
             role={locked ? undefined : "button"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Hourglass web art tile ${index + 1}`}
             onClick={locked ? undefined : (() => engineRef.current?.flip?.())}
             onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <div className={`article-web-art-hourglass-controls`}
                 onClick={stopControlEvent}
                 onPointerDown={stopControlEvent}
                 onPointerUp={stopControlEvent}
                 onKeyDown={stopControlEvent}>
                <label className={`article-web-art-hourglass-control article-web-art-hourglass-control-left`}>
                    <span className={`article-web-art-hourglass-control-name`}>
                        <span>Neck</span>
                        <output>{Math.round(neckRatio * 100)}%</output>
                    </span>
                    <input className={`article-web-art-hourglass-slider`}
                           type={"range"}
                           min={"0.025"}
                           max={"0.17"}
                           step={"0.001"}
                           value={neckRatio}
                           onChange={onNeckRatioChange}
                           disabled={locked}
                           aria-label={"Hourglass neck size"}/>
                </label>
                <label className={`article-web-art-hourglass-control article-web-art-hourglass-control-right`}>
                    <span className={`article-web-art-hourglass-control-name`}>
                        <span>Gravity</span>
                        <output>{gravity.toFixed(2)}×</output>
                    </span>
                    <input className={`article-web-art-hourglass-slider`}
                           type={"range"}
                           min={"0.5"}
                           max={"1.9"}
                           step={"0.01"}
                           value={gravity}
                           onChange={onGravityChange}
                           disabled={locked}
                           aria-label={"Hourglass gravity"}/>
                </label>
            </div>
            <span className={`article-web-art-tile-label`}>
                Hourglass
            </span>
        </div>
    )
}

export function NoiceTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const backgroundCanvasRef = useRef(null)
    const foregroundCanvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const visibleRef = useRef(true)
    const [fallbackActive, setFallbackActive] = useState(false)
    const reduceMotion = useReducedMotionFlag()

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const backgroundCanvas = backgroundCanvasRef.current
        const foregroundCanvas = foregroundCanvasRef.current
        if(!tile || !backgroundCanvas || !foregroundCanvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const activateFallback = (reason) => {
            if(canceled) return
            setFallbackActive(true)
            if(import.meta.env.DEV && reason) {
                console.warn("Noice web art fallback active", reason)
            }
            markReady()
        }

        const commitVisibleFrame = () => {
            if(canceled) return false
            engine?.renderStatic?.()
            if(engine?.hasVisibleFrame && !engine.hasVisibleFrame()) {
                activateFallback("Canvas rendered no visible Noice frame")
                return false
            }
            setFallbackActive(false)
            markReady()
            return true
        }

        const cancelWork = scheduleIdleWork(async () => {
            try {
                const mod = await import("../noiceShaderEngine.js")
                if(canceled) return

                engine = mod.createNoiceShaderEngine({
                    backgroundCanvas,
                    foregroundCanvas
                }, { reduceMotion })
                engineRef.current = engine

                const updateSize = () => syncTileEngineSize(tile, engine, Math.min(1.5, window.devicePixelRatio || 1))

                updateSize()
                const hasReadyFrame = commitVisibleFrame()
                if(!hasReadyFrame) return
                if(!locked) engine.start?.()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine?.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(locked) {
                                engine.stop?.()
                                continue
                            }

                            if(visibleRef.current) engine.start?.()
                            else engine.stop?.()
                        }
                    }, { threshold: 0.25 })
                    io.observe(tile)
                }
            }
            catch(err) {
                activateFallback(err)
            }
        }, { timeoutMs: 220 })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy?.()
            engineRef.current = null
        }
    }, [activate, itemWrapper.uniqueId, locked, onReady, reduceMotion])

    useEffect(() => {
        const engine = engineRef.current
        if(!engine) return
        if(locked) {
            engine.clearPointer?.()
            engine.stop?.()
            return
        }
        if(visibleRef.current) engine.start?.()
    }, [locked])

    const pointerPosition = useNormalizedPointer(tileRef)

    const pulse = (event) => {
        const pos = pointerPosition(event)
        engineRef.current?.setPointer?.(pos.x, pos.y)
        engineRef.current?.pulsePattern?.()
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-noice ${fallbackActive ? "article-web-art-tile-noice-fallback-active" : ""}`}
                aria-label={`Noice web art tile ${index + 1}`}
                disabled={locked}
                onPointerMove={locked ? undefined : ((event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    pulse(event)
                })}
                onMouseLeave={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.pulsePattern?.()
                        engineRef.current?.start?.()
                    }
                })}>
            {fallbackActive && (
                <div className={`article-web-art-noice-fallback`} aria-hidden={true}>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-a`}/>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-b`}/>
                    <span className={`article-web-art-noice-fallback-line article-web-art-noice-fallback-line-c`}/>
                </div>
            )}
            <canvas ref={backgroundCanvasRef}
                    className={`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-bg-canvas ${fallbackActive ? "article-web-art-canvas-hidden" : ""}`}/>
            <canvas ref={foregroundCanvasRef}
                    className={`article-web-art-canvas article-web-art-noice-canvas article-web-art-noice-fg-canvas ${fallbackActive ? "article-web-art-canvas-hidden" : ""}`}/>
            <span className={`article-web-art-tile-label`}>
                Noice
            </span>
        </button>
    )
}

export function DeepTile({ itemWrapper, index, activate, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const reduceMotion = useReducedMotionFlag()
    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../deepShaderEngine.js")
            return mod.createDeepShaderEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        },
        onLocked: () => {
            pointerIdRef.current = null
        }
    })

    const pointerPosition = useNormalizedPointer(canvasRef)

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-deep`}
                aria-label={`Deep web art tile ${index + 1}`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.start?.()
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    if(pointerIdRef.current == null && event.pointerType !== "mouse") return
                    const pos = pointerPosition(event)
                    if(pointerIdRef.current != null) engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Deep
            </span>
        </button>
    )
}

export function EmbroideryTile({ itemWrapper, index, activate, locked, onReady }) {
    const hoverRef = useRef(true)
    const isClickTile = Number(itemWrapper?.id) === 5
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => {
        const id = Number(itemWrapper.id) || (index + 1)
        const radiusMini = 0.0026 + id * 0.00008
        const radiusMaxi = 0.0054 + id * 0.00014
        const dHueStep = (id % 2) ? 1 : 2
        const startGroup = {
            kx: 11 + id * 2,
            ky: id % 2
        }

        return {
            refreshDelay: isClickTile ? 0 : 8000,
            radiusMini,
            radiusMaxi,
            dHueStep,
            startGroup,
            seed: 1337 + id * 1009,
            reduceMotion
        }
    }, [isClickTile, itemWrapper.id, index, reduceMotion])

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../embroideryEngine.js")
            return mod.createEmbroideryEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        },
        shouldStartOnIntersect: (engine, isVisible) => {
            if(isClickTile) {
                if(!isVisible) engine.stop()
                return "handled"
            }
            if(isVisible && hoverRef.current) engine.start()
            else engine.stop()
            return "handled"
        }
    })

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        if(isClickTile) {
            engineRef.current?.stop?.()
            engineRef.current?.reset?.()
            engineRef.current?.start?.()
            return
        }

        engineRef.current?.reset()
        engineRef.current?.renderStatic?.()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={(locked || isClickTile) ? undefined : _start}
                onMouseLeave={(locked || isClickTile) ? undefined : _stop}
                onFocus={(locked || isClickTile) ? undefined : _start}
                onBlur={(locked || isClickTile) ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                {isClickTile ? "Click" : (Number.isFinite(Number(itemWrapper?.id)) ? Number(itemWrapper.id) : (index + 1))}
            </span>
        </button>
    )
}

export function SpiralDotsTile({ itemWrapper, index, activate, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const pointerActiveRef = useRef(false)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 9001 + (Number(itemWrapper.id) || 1) * 1337,
        reduceMotion,
        dotsCount: 180,
        dotsMouseDistanceSensitivity: 115,
        dotsMaxEscapeRouteLength: 60,
        introDurationMs: 950
    }), [itemWrapper.id, reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: null,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../spiralDotsEngine.js")
            return mod.createSpiralDotsEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.rebuildDots()
            engine.renderStatic?.()
        }
    })

    const _mousePosFromEvent = useLocalPointer(canvasRef, { x: -10000, y: -10000 })

    const _start = () => {
        engineRef.current?.start()
    }

    const _stop = () => {
        engineRef.current?.clearMouse()
        engineRef.current?.start()
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-hover-only article-web-art-tile-hover-dots`}
             role={"img"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Spiral dots web art tile ${index + 1}`}
             onPointerDown={locked ? undefined : (event) => {
                 if(event.pointerType === "mouse") return
                 const tile = tileRef.current
                 if(!tile) return
                 pointerActiveRef.current = true
                 pointerIdRef.current = event.pointerId
                 try { tile.setPointerCapture(event.pointerId) } catch (e) { void e }
                 _start()
                 const pos = _mousePosFromEvent(event)
                 engineRef.current?.setMouse(pos.x, pos.y)
             }}
             onPointerMove={locked ? undefined : (event) => {
                 if(!pointerActiveRef.current) return
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 const pos = _mousePosFromEvent(event)
                 engineRef.current?.setMouse(pos.x, pos.y)
             }}
             onPointerUp={locked ? undefined : (event) => {
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 _stop()
             }}
             onPointerCancel={locked ? undefined : () => {
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 _stop()
             }}
             onMouseEnter={locked ? undefined : _start}
             onMouseLeave={locked ? undefined : _stop}
             onMouseMove={locked ? undefined : (event) => {
                 const pos = _mousePosFromEvent(event)
                 engineRef.current?.setMouse(pos.x, pos.y)
             }}
             onFocus={locked ? undefined : _start}
             onBlur={locked ? undefined : _stop}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hover
            </span>
        </div>
    )
}

export function GridWaveTile({ itemWrapper, index, activate, locked, onReady }) {
    const hoverRef = useRef(true)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 424242 + (Number(itemWrapper.id) || 2) * 2027,
        reduceMotion,
        targetCellSize: 14,
        gapPx: 1.4
    }), [itemWrapper.id, reduceMotion])

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../gridWaveEngine.js")
            return mod.createGridWaveEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        },
        shouldStartOnIntersect: (engine, isVisible) => {
            if(isVisible && hoverRef.current) engine.start()
            else engine.stop()
            return "handled"
        }
    })

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _posFromEvent = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface) return { x: 0, y: 0 }
        const rect = surface.getBoundingClientRect()

        if(typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
            return { x: rect.width / 2, y: rect.height / 2 }
        }

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    const _ripple = (event) => {
        const pos = _posFromEvent(event)
        engineRef.current?.rippleAt(pos.x, pos.y)
        engineRef.current?.renderStatic?.()
        if(hoverRef.current && visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _ripple(null)
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Grid wave web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _ripple}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Wave
            </span>
        </button>
    )
}

export function ThreeTunnelTile({ itemWrapper, index, activate, locked, onReady }) {
    const hoverRef = useRef(true)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        reduceMotion,
        ringCount: 13,
        cubesPerRing: 12,
        ringSpacing: 62,
        tunnelRadius: 54,
        speed: 6.4,
        exposure: 1.58
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 300,
        intersectionThreshold: 0.25,
        renderStaticOnInit: false,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../threeTunnelEngine.js")
            return mod.createThreeTunnelEngine(canvas, cfg)
        },
        onAfterInit: (engine) => {
            engine.reset()
        },
        onResize: (engine) => {
            engine.reset()
        },
        shouldStartOnIntersect: (engine, isVisible) => {
            if(isVisible && hoverRef.current) engine.start()
            else engine.stop()
            return "handled"
        }
    })

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        engineRef.current?.nextPalette?.()
        engineRef.current?.reset()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-3d-tunnel`}
                aria-label={`3D tunnel web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <div className={`article-web-art-tunnel-room-shade`}
                 aria-hidden={true}/>
            <span className={`article-web-art-tile-label`}>
                3D
            </span>
        </button>
    )
}

export function ThreePolygonDemo5Tile({ itemWrapper, index, activate, locked, onReady }) {
    const hoverRef = useRef(true)
    const pointerIdRef = useRef(null)
    const holdTimerRef = useRef(null)
    const holdActiveRef = useRef(false)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        reduceMotion,
        nbObjects: 12,
        animationDuration: 7,
        animationDelay: 0.1,
        cameraZ: 75,
        fitFactor: 1.04
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: 1.2,
        idleTimeoutMs: 300,
        intersectionThreshold: 0.25,
        renderStaticOnInit: false,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../threePolygonDemo5Engine.js")
            return mod.createThreePolygonDemo5Engine(canvas, cfg)
        },
        onAfterInit: (engine, { updateSize, isCanceled }) => {
            engine.reset()
            window.requestAnimationFrame(() => {
                if(isCanceled() || engineRef.current !== engine) return
                updateSize()
                engine.reset()
            })
        },
        shouldStartOnIntersect: (engine, isVisible) => {
            if(isVisible && hoverRef.current) engine.start()
            else engine.stop()
            return "handled"
        }
    })

    useEffect(() => {
        return () => {
            if(holdTimerRef.current != null) window.clearTimeout(holdTimerRef.current)
        }
    }, [])

    const _boost = () => {
        engineRef.current?.boost?.()
        if(visibleRef.current) engineRef.current?.start()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _boost()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Polygon demo 5 web art tile ${index + 1}`}
                disabled={locked}
                onKeyDown={locked ? undefined : onKeyDown}
                onPointerDown={locked ? undefined : (event) => {
                    if(event.button != null && event.button !== 0) return
                    pointerIdRef.current = event.pointerId
                    holdActiveRef.current = false
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    if(visibleRef.current) engineRef.current?.start()
                    if(holdTimerRef.current != null) window.clearTimeout(holdTimerRef.current)
                    holdTimerRef.current = window.setTimeout(() => {
                        if(pointerIdRef.current == null) return
                        holdActiveRef.current = true
                        engineRef.current?.setHeld?.(true)
                    }, 140)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    if(holdActiveRef.current) {
                        holdActiveRef.current = false
                        engineRef.current?.setHeld?.(false)
                    }
                    else {
                        _boost()
                    }
                }}
                onPointerCancel={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                })}
                onLostPointerCapture={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                })}
                onMouseEnter={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onMouseLeave={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                    else engineRef.current?.stop()
                })}
                onFocus={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onBlur={locked ? undefined : (() => {
                    if(holdTimerRef.current != null) {
                        window.clearTimeout(holdTimerRef.current)
                        holdTimerRef.current = null
                    }
                    pointerIdRef.current = null
                    holdActiveRef.current = false
                    engineRef.current?.setHeld?.(false)
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                    else engineRef.current?.stop()
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Poly
            </span>
        </button>
    )
}

export function OrbitCirclesTile({ itemWrapper, index, activate, locked, onReady }) {
    const hoverRef = useRef(true)
    const ringColorIndexRef = useRef(0)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        reduceMotion,
        palette: ["#DD0F7E", "#009BBE", "#A8DA00", "#F2E205", "#EE5A02"],
        bgColor: "#200018",
        totalCircles: 22,
        timeScale: 0.0017
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef, visibleRef } = useCanvasArtEngine({
        readyId: itemWrapper.uniqueId,
        activate,
        locked,
        onReady,
        config,
        maxDpr: null,
        idleTimeoutMs: 1200,
        intersectionThreshold: 0.25,
        renderStaticOnInit: false,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../orbitCirclesEngine.js")
            return mod.createOrbitCirclesEngine(canvas, cfg)
        },
        onAfterInit: (engine) => {
            engine.reset()
            engine.renderStatic?.()
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        },
        shouldStartOnIntersect: (engine, isVisible) => {
            if(isVisible && hoverRef.current) engine.start()
            else engine.stop()
            return "handled"
        }
    })

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start?.()
        else engineRef.current?.stop?.()
    }

    const _restart = () => {
        const engine = engineRef.current
        if(!engine) return

        const totalRings = Math.max(1, engine.getTotalCircles?.() || 1)
        const ringIndex = ringColorIndexRef.current % totalRings
        const nextColor = `#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, "0")}`

        engine.setCircleColor?.(ringIndex, nextColor)
        ringColorIndexRef.current += 1

        if(visibleRef.current) engine.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            _restart()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Orbit circles web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Orbit
            </span>
        </button>
    )
}

export function TortuosityTraceTile({ readyId, locked, onReady }) {
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 20250414,
        reduceMotion,
        winding: 0.5,
        step: 10,
        speed: 0,
        radius: 30,
        strokeCycleMs: 1000
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 200,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../tortuosityTraceEngine.js")
            return mod.createTortuosityTraceEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.reset?.()
        }
    })

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            reset()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Trace web art tile`}
                disabled={locked}
                onClick={locked ? undefined : reset}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Trace
            </span>
        </button>
    )
}

export function HexFlowBallsTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 20250415,
        reduceMotion,
        nbCells: 5,
        rayBallMin: 0.3,
        rayBallMax: 0.8,
        speed: 0.03
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../hexFlowBallsEngine.js")
            return mod.createHexFlowBallsEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.renderStatic?.()
        }
    })

    const pointerPosition = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0.5, y: 0.5 }
        const rect = tile.getBoundingClientRect()
        return {
            x: rect.width > 0 ? (event.clientX - rect.left) / rect.width : 0.5,
            y: rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5
        }
    }

    const boostHex = () => {
        engineRef.current?.burst?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            boostHex()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Hex flow web art tile`}
                disabled={locked}
                onClick={locked ? undefined : boostHex}
                onPointerDown={locked ? undefined : (event => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerMove={locked ? undefined : (event => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onPointerUp={locked ? undefined : (event => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                })}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onMouseMove={locked ? undefined : (event => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                })}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hex
            </span>
        </button>
    )
}

export function PixelPlopTile({ readyId, locked, onReady }) {
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        seed: 20250416,
        reduceMotion,
        step: 6,
        side: 5
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../pixelPlopEngine.js")
            return mod.createPixelPlopEngine(canvas, cfg)
        },
        onResize: (engine) => {
            engine.reset?.()
        }
    })

    const seed = () => {
        engineRef.current?.seedBurst?.()
        engineRef.current?.start?.()
    }

    const burstAtEvent = (event) => {
        const surface = canvasRef.current || tileRef.current
        if(!surface || typeof event?.clientX !== "number" || typeof event?.clientY !== "number") {
            seed()
            return
        }

        const rect = surface.getBoundingClientRect()
        engineRef.current?.burstAt?.(event.clientX - rect.left, event.clientY - rect.top)
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            seed()
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Pixel plop web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : ((event) => {
                    if(event.button != null && event.button !== 0) return
                    burstAtEvent(event)
                })}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Plop
            </span>
        </button>
    )
}

export function JuliaLinesTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const pointerActiveRef = useRef(false)
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        reduceMotion,
        seed: 20250417
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../juliaLinesEngine.js")
            return mod.createJuliaLinesEngine(canvas, cfg)
        }
    })

    const pointerPosition = useNormalizedPointer(tileRef, { x: 0.4, y: 0.5 })

    const reset = () => {
        engineRef.current?.reset?.()
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        const step = event.shiftKey ? 0.01 : 0.04
        if(event.key === "ArrowUp") {
            event.preventDefault()
            engineRef.current?.nudge?.(0, -step)
        }
        else if(event.key === "ArrowDown") {
            event.preventDefault()
            engineRef.current?.nudge?.(0, step)
        }
        else if(event.key === "ArrowLeft") {
            event.preventDefault()
            engineRef.current?.nudge?.(-step, 0)
        }
        else if(event.key === "ArrowRight") {
            event.preventDefault()
            engineRef.current?.nudge?.(step, 0)
        }
        else if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            reset()
        }
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-hover-only`}
             role={"img"}
             tabIndex={locked ? -1 : 0}
             aria-label={`Julia lines web art tile`}
             onPointerDown={locked ? undefined : (event) => {
                 const tile = tileRef.current
                 if(!tile) return
                 pointerActiveRef.current = true
                 pointerIdRef.current = event.pointerId
                 try { tile.setPointerCapture(event.pointerId) } catch(err) { void err }
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onPointerMove={locked ? undefined : (event) => {
                 if(pointerActiveRef.current && pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onPointerUp={locked ? undefined : (event) => {
                 if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 engineRef.current?.clearPointer?.()
             }}
             onPointerCancel={locked ? undefined : () => {
                 pointerActiveRef.current = false
                 pointerIdRef.current = null
                 engineRef.current?.clearPointer?.()
             }}
             onMouseMove={locked ? undefined : (event) => {
                 const pos = pointerPosition(event)
                 engineRef.current?.setPointer?.(pos.x, pos.y)
             }}
             onMouseLeave={locked ? undefined : (() => {
                 engineRef.current?.clearPointer?.()
             })}
             onBlur={locked ? undefined : (() => {
                 engineRef.current?.clearPointer?.()
             })}
             onKeyDown={locked ? undefined : onKeyDown}
             onClick={locked ? undefined : reset}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Julia
            </span>
        </div>
    )
}

export function FallingRingsTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const reduceMotion = useReducedMotionFlag()
    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../fallingRingsEngine.js")
            return mod.createFallingRingsEngine(canvas, cfg)
        }
    })

    const setHeld = (held) => {
        engineRef.current?.setHeld?.(held)
        engineRef.current?.start?.()
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setHeld(true)
        }
    }

    const onKeyUp = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            setHeld(false)
        }
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Falling rings web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    setHeld(true)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onPointerCancel={locked ? undefined : () => {
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onLostPointerCapture={locked ? undefined : () => {
                    pointerIdRef.current = null
                    setHeld(false)
                }}
                onMouseEnter={locked ? undefined : (() => {
                    engineRef.current?.setHovered?.(true)
                })}
                onMouseLeave={locked ? undefined : (() => {
                    engineRef.current?.setHovered?.(false)
                    if(pointerIdRef.current == null) return
                    pointerIdRef.current = null
                    setHeld(false)
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    setHeld(false)
                })}
                onKeyDown={locked ? undefined : onKeyDown}
                onKeyUp={locked ? undefined : onKeyUp}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Fall
            </span>
        </button>
    )
}

export function PrismFieldTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const pointerTypeRef = useRef("mouse")
    const reduceMotion = useReducedMotionFlag()

    const config = useMemo(() => ({
        reduceMotion,
        objectRadius: 2.5,
        objectDepth: 1,
        lookAtZ: 40,
        pointerInfluence: 1,
        pointerDepth: 18,
        pointerSmoothing: 0.22,
        interactionRadiusRatio: 0.78,
        interactionLift: 4.5,
        interactionScale: 0.15,
        interactionEmissiveBoost: 0.72
    }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../prismFieldEngine.js")
            return mod.createPrismFieldEngine(canvas, cfg)
        }
    })

    const pointerPosition = useNormalizedPointer(tileRef)

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Prism field web art tile`}
                disabled={locked}
                onClick={locked ? undefined : (() => {
                    engineRef.current?.reset?.()
                    engineRef.current?.start?.()
                })}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    pointerTypeRef.current = event.pointerType || "mouse"
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    if((event.pointerType || pointerTypeRef.current) === "mouse") {
                        engineRef.current?.clearPointer?.()
                    }
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    if(pointerTypeRef.current === "mouse") {
                        engineRef.current?.clearPointer?.()
                    }
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerTypeRef.current = "mouse"
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.reset?.()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Prism
            </span>
        </button>
    )
}

export function RopeLightTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const pointerStartRef = useRef(null)
    const didDragRef = useRef(false)
    const reduceMotion = useReducedMotionFlag()
    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../ropeLightEngine.js")
            return mod.createRopeLightEngine(canvas, cfg)
        }
    })

    const pointerPosition = useNormalizedPointer(tileRef)

    const toggleHang = (event) => {
        if(didDragRef.current) {
            didDragRef.current = false
            return
        }
        const pos = event ? pointerPosition(event) : { x: 0.5, y: 0.18 }
        engineRef.current?.toggleHangAt?.(pos.x, pos.y)
        engineRef.current?.start?.()
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable`}
                aria-label={`Rope light web art tile`}
                disabled={locked}
                onClick={locked ? undefined : toggleHang}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    didDragRef.current = false
                    pointerStartRef.current = pointerPosition(event)
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    engineRef.current?.setPointer?.(pointerStartRef.current.x, pointerStartRef.current.y)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    const start = pointerStartRef.current
                    if(start && Math.hypot(pos.x - start.x, pos.y - start.y) > 0.025) {
                        didDragRef.current = true
                    }
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch(err) { void err }
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    engineRef.current?.clearPointer?.()
                }}
                onPointerCancel={locked ? undefined : ((event) => {
                    try { event.currentTarget.releasePointerCapture(event.pointerId) } catch(err) { void err }
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    didDragRef.current = false
                    engineRef.current?.clearPointer?.()
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    pointerStartRef.current = null
                    didDragRef.current = false
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        toggleHang()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Rope
            </span>
        </button>
    )
}

const SOUP_CUBE_FACE_TRANSFORMS = [
    "rotateX(270deg) translateZ(0.5em)",
    "rotateY(0deg) translateZ(0.5em)",
    "rotateY(90deg) translateZ(0.5em)",
    "rotateY(180deg) translateZ(0.5em)",
    "rotateY(270deg) translateZ(0.5em)",
    "rotateX(90deg) translateZ(0.5em)"
]

const SOUP_CUBE_INDICES = Array.from({ length: 28 }, (_, index) => index)

function SoupCubeBackdrop() {
    return (
        <div className={`article-web-art-soup-backdrop`} aria-hidden={true}>
            {SOUP_CUBE_INDICES.map((index) => (
                <div key={index}
                     className={`article-web-art-soup-cube`}
                     style={{
                         animationDelay: `${index * 0.06}s`,
                         fontSize: `${index + 1}em`,
                         "--soup-cube-depth": `${index / Math.max(1, SOUP_CUBE_INDICES.length - 1)}`
                     }}>
                    {SOUP_CUBE_FACE_TRANSFORMS.map((transform, faceIndex) => (
                        <span key={faceIndex}
                              className={`article-web-art-soup-face`}
                              style={{ transform }}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

export function SoupShaderTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const reduceMotion = useReducedMotionFlag()
    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../soupShaderEngine.js")
            return mod.createSoupShaderEngine(canvas, cfg)
        }
    })

    const pointerPosition = useNormalizedPointer(tileRef)

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-soup-tile`}
                aria-label={`Soup shader web art tile`}
                disabled={locked}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                    engineRef.current?.setHeld?.(true)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    engineRef.current?.setHeld?.(false)
                    engineRef.current?.clearPointer?.()
                })}>
            <SoupCubeBackdrop/>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Soup
            </span>
        </button>
    )
}

export function TardisTile({ readyId, locked, onReady }) {
    const pointerIdRef = useRef(null)
    const lastPointerRef = useRef(null)
    const rippleIdRef = useRef(0)
    const [boosting, setBoosting] = useState(false)
    const [ripples, setRipples] = useState([])
    const reduceMotion = useReducedMotionFlag()
    const config = useMemo(() => ({ reduceMotion }), [reduceMotion])

    const { tileRef, canvasRef, engineRef } = useCanvasArtEngine({
        readyId,
        locked,
        onReady,
        config,
        maxDpr: 1.5,
        idleTimeoutMs: 220,
        intersectionThreshold: 0.25,
        startWhenLocked: true,
        createEngine: async (canvas, cfg) => {
            const mod = await import("../tardisWormholeEngine.js")
            return mod.createTardisWormholeEngine(canvas, cfg)
        },
        onLocked: () => {
            setBoosting(false)
            lastPointerRef.current = null
        }
    })

    useEffect(() => {
        if(ripples.length === 0) return
        const timeoutId = window.setTimeout(() => {
            setRipples((current) => current.slice(1))
        }, 1000)
        return () => {
            window.clearTimeout(timeoutId)
        }
    }, [ripples])

    const pointerPosition = (event) => {
        const tile = tileRef.current
        const surface = canvasRef.current || tile
        if(!tile || !surface) return { x: 0.5, y: 0.5, px: 0, py: 0, dx: 0, dy: 0 }
        const surfaceRect = surface.getBoundingClientRect()
        const tileRect = tile.getBoundingClientRect()
        const px = Math.max(0, Math.min(tileRect.width, event.clientX - tileRect.left))
        const py = Math.max(0, Math.min(tileRect.height, event.clientY - tileRect.top))
        const surfacePx = Math.max(0, Math.min(surfaceRect.width, event.clientX - surfaceRect.left))
        const surfacePy = Math.max(0, Math.min(surfaceRect.height, event.clientY - surfaceRect.top))
        const prev = lastPointerRef.current
        const dx = prev ? surfacePx - prev.px : 0
        const dy = prev ? surfacePy - prev.py : 0
        lastPointerRef.current = { px: surfacePx, py: surfacePy }
        return {
            x: surfaceRect.width > 0 ? surfacePx / surfaceRect.width : 0.5,
            y: surfaceRect.height > 0 ? surfacePy / surfaceRect.height : 0.5,
            px,
            py,
            dx,
            dy
        }
    }

    const spawnRipple = (px, py) => {
        const id = rippleIdRef.current++
        setRipples((current) => [...current, { id, x: px, y: py }])
    }

    const triggerBoost = (event) => {
        const pos = pointerPosition(event)
        spawnRipple(pos.px, pos.py)
        engineRef.current?.boost?.()
        engineRef.current?.start?.()
        setBoosting(true)
        window.setTimeout(() => {
            setBoosting(false)
        }, 650)
    }

    return (
        <button type={"button"}
                ref={tileRef}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-tardis ${boosting ? "article-web-art-tile-tardis-boost" : ""}`}
                aria-label={`Tardis wormhole web art tile`}
                disabled={locked}
                onClick={locked ? undefined : triggerBoost}
                onContextMenu={locked ? undefined : ((event) => {
                    event.preventDefault()
                    const pos = pointerPosition(event)
                    spawnRipple(pos.px, pos.py)
                    engineRef.current?.reverseBurst?.()
                    engineRef.current?.start?.()
                })}
                onWheel={locked ? undefined : ((event) => {
                    engineRef.current?.addScrollBoost?.(event.deltaY * 0.003)
                })}
                onPointerDown={locked ? undefined : (event) => {
                    pointerIdRef.current = event.pointerId
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch(err) { void err }
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                }}
                onPointerMove={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                    if((event.buttons & 1) === 1) {
                        engineRef.current?.drag?.(pos.dx)
                    }
                }}
                onPointerUp={locked ? undefined : (event) => {
                    if(pointerIdRef.current != null && event.pointerId !== pointerIdRef.current) return
                    pointerIdRef.current = null
                }}
                onPointerCancel={locked ? undefined : (() => {
                    pointerIdRef.current = null
                })}
                onMouseMove={locked ? undefined : (event) => {
                    const pos = pointerPosition(event)
                    engineRef.current?.setPointer?.(pos.x, pos.y, pos.dx, pos.dy)
                }}
                onMouseLeave={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onBlur={locked ? undefined : (() => {
                    pointerIdRef.current = null
                    lastPointerRef.current = null
                    engineRef.current?.clearPointer?.()
                })}
                onKeyDown={locked ? undefined : ((event) => {
                    if(event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        engineRef.current?.boost?.()
                        engineRef.current?.start?.()
                    }
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <div className={`article-web-art-tardis-overlay`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-scanlines`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-grain`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-speed-lines`} aria-hidden={true}/>
            <div className={`article-web-art-tardis-boost-vignette`} aria-hidden={true}/>
            {ripples.map((ripple) => (
                <div key={ripple.id}
                     className={`article-web-art-tardis-ripple`}
                     style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }}
                     aria-hidden={true}/>
            ))}
            <span className={`article-web-art-tile-label`}>
                Tardis
            </span>
        </button>
    )
}
