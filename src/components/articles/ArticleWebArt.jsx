import "./ArticleWebArt.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import patronusSvgMarkup from "./webArt/patronus.svg?raw"

function _scheduleIdleWork(work, { timeoutMs = 1200 } = {}) {
    if(typeof window === "undefined") {
        work()
        return () => {}
    }

    if("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => work(), { timeout: timeoutMs })
        return () => window.cancelIdleCallback(id)
    }

    const id = window.setTimeout(() => work(), 0)
    return () => window.clearTimeout(id)
}

function ArticleWebArt({ dataWrapper, id }) {
    const language = useLanguage()
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const rawItems = useMemo(() => dataWrapper.orderedItems.slice(0, 6), [dataWrapper.orderedItems])
    const items = useMemo(() => {
        // Desired visual order: Poly, 5, 3D, Orbit, Hover, Wave
        // Matches ids: 4 (Poly), 5 (Embroidery), 3 (3D tunnel), 6 (Orbit), 1 (Hover), 2 (Wave)
        const desiredOrder = [4, 5, 3, 6, 1, 2]
        const byId = new Map(rawItems.map((item) => [Number(item?.id), item]))
        const ordered = []

        for(const id of desiredOrder) {
            const item = byId.get(id)
            if(item) ordered.push(item)
        }

        for(const item of rawItems) {
            if(!item) continue
            const id = Number(item?.id)
            if(desiredOrder.includes(id)) continue
            ordered.push(item)
        }

        return ordered
    }, [rawItems])
    const tilesWrapperRef = useRef(null)
    const [gridCols, setGridCols] = useState(1)
    const [shouldMountTiles, setShouldMountTiles] = useState(false)
    const readySetRef = useRef(new Set())
    const readyTimeoutsRef = useRef(new Map())
    const [readyCount, setReadyCount] = useState(0)
    const [activationIndex, setActivationIndex] = useState(-1)
    const allReady = readyCount >= items.length
    const locked = !allReady

    let submitTileLabel = language.getString("send_yours")
    if(typeof submitTileLabel === "string" && submitTileLabel.startsWith("locale:")) {
        const langId = language.selectedLanguageId || "en"
        submitTileLabel = {
            en: "Send yours!",
            de: "Sende deine!",
            hr: "Pošalji svoju!",
            tr: "Sen de gönder!",
        }[langId] || "Send yours!"
    }

    let clickTileLabel = language.getString("click")
    if(typeof clickTileLabel === "string" && clickTileLabel.startsWith("locale:")) {
        const langId = language.selectedLanguageId || "en"
        clickTileLabel = {
            en: "Click",
            de: "Klicken",
            hr: "Klikni",
            tr: "Tıkla",
        }[langId] || "Click"
    }
    const displayTileCount = items.length + 3 // + fish tile + patronus tile + CTA tile
    const spacerCount = useMemo(() => {
        const cols = Math.max(1, Number(gridCols) || 1)
        const remainder = displayTileCount % cols
        if(remainder === 0) return 0
        return cols - remainder
    }, [displayTileCount, gridCols])

    const onTileReady = useCallback((uniqueId) => {
        if(!uniqueId) return
        if(readySetRef.current.has(uniqueId)) return
        readySetRef.current.add(uniqueId)

        const timeoutId = readyTimeoutsRef.current.get(uniqueId)
        if(timeoutId != null) {
            window.clearTimeout(timeoutId)
            readyTimeoutsRef.current.delete(uniqueId)
        }

        setReadyCount(readySetRef.current.size)
    }, [])

    useEffect(() => {
        const el = tilesWrapperRef.current
        if(!el) return

        const computeCols = () => {
            const style = window.getComputedStyle(el)
            const template = style.gridTemplateColumns || ""
            const tokens = template.split(" ").map((t) => t.trim()).filter(Boolean)

            // With repeat(auto-fit, ...), computed style can include collapsed tracks as 0px.
            const cols = tokens
                .map((t) => Number.parseFloat(t))
                .filter((n) => Number.isFinite(n) && n > 1)
                .length

            setGridCols(cols || 1)
        }

        computeCols()
        const ro = new ResizeObserver(() => {
            computeCols()
        })
        ro.observe(el)

        return () => {
            ro.disconnect()
        }
    }, [])

    useEffect(() => {
        readySetRef.current = new Set()
        for(const timeoutId of readyTimeoutsRef.current.values()) {
            window.clearTimeout(timeoutId)
        }
        readyTimeoutsRef.current = new Map()
        setReadyCount(0)
        setShouldMountTiles(false)
        setActivationIndex(-1)

        const raf = requestAnimationFrame(() => {
            setShouldMountTiles(true)
        })

        return () => {
            cancelAnimationFrame(raf)
        }
    }, [dataWrapper.uniqueId])

    useEffect(() => {
        if(!shouldMountTiles) return

        // Prefetch modules quickly so the heavy tiles don't feel "stuck" on network/parse.
        const cancelPrefetch = _scheduleIdleWork(() => {
            void import("./webArt/spiralDotsEngine.js")
            void import("./webArt/gridWaveEngine.js")
            void import("./webArt/embroideryEngine.js")
            void import("./webArt/orbitCirclesEngine.js")
            void import("./webArt/threeTunnelEngine.js")
            void import("./webArt/threePolygonDemo5Engine.js")
        }, { timeoutMs: 250 })

        // Stagger-start tile initialization (avoid a single big long task), but don't wait for each to finish.
        let canceled = false
        setActivationIndex(-1)

        const raf = requestAnimationFrame(() => {
            if(canceled) return
            let i = -1
            const interval = window.setInterval(() => {
                if(canceled) return
                i += 1
                setActivationIndex((prev) => Math.max(prev, i))
                if(i >= items.length - 1) window.clearInterval(interval)
            }, 220)
        })

        return () => {
            canceled = true
            cancelPrefetch?.()
            cancelAnimationFrame(raf)
        }
    }, [shouldMountTiles, items.length])

    useEffect(() => {
        if(!shouldMountTiles) return

        // Safety timeouts so a single WebGL hiccup can't keep everything locked forever.
        for(const itemWrapper of items) {
            const uid = itemWrapper?.uniqueId
            if(!uid) continue
            if(readySetRef.current.has(uid)) continue
            if(readyTimeoutsRef.current.has(uid)) continue

            const timeoutId = window.setTimeout(() => {
                onTileReady(uid)
            }, 12000)
            readyTimeoutsRef.current.set(uid, timeoutId)
        }
    }, [shouldMountTiles, items, onTileReady])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-web-art`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <div className={`article-web-art-items ${locked ? "article-web-art-items-locked" : ""}`}
                 ref={tilesWrapperRef}
                 aria-busy={locked}>
                {!shouldMountTiles && (
                    <>
                        {items.map((itemWrapper, index) => (
                            <div key={itemWrapper.uniqueId}
                                 className={`article-web-art-tile article-web-art-tile-placeholder`}
                                 aria-label={`Web art tile ${index + 1} loading`}/>
                        ))}

                        <GoldfishTile />
                        <PatronusTile />
                        <SendYourFunAnimationTile label={submitTileLabel} clickLabel={clickTileLabel}/>

                        {new Array(spacerCount).fill(null).map((_, i) => (
                            <div key={`spacer-${i}`}
                                 className={`article-web-art-tile article-web-art-tile-spacer`}
                                 aria-hidden={true}/>
                        ))}
                    </>
                )}

                {shouldMountTiles && (
                    <>
                        {items.map((itemWrapper, index) => (
                            <WebArtTile itemWrapper={itemWrapper}
                                        index={index}
                                        locked={locked}
                                        activate={index <= activationIndex}
                                        onReady={onTileReady}
                                        key={itemWrapper.uniqueId}/>
                        ))}

                        <GoldfishTile />
                        <PatronusTile />
                        <SendYourFunAnimationTile label={submitTileLabel} clickLabel={clickTileLabel}/>

                        {new Array(spacerCount).fill(null).map((_, i) => (
                            <div key={`spacer-${i}`}
                                 className={`article-web-art-tile article-web-art-tile-spacer`}
                                 aria-hidden={true}/>
                        ))}
                    </>
                )}
            </div>
        </Article>
    )
}

function WebArtTile({ itemWrapper, index, activate, locked, onReady }) {
    if(Number(itemWrapper.id) === 1) {
        return <SpiralDotsTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 2) {
        return <GridWaveTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 3) {
        return <ThreeTunnelTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 4) {
        return <ThreePolygonDemo5Tile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    if(Number(itemWrapper.id) === 6) {
        return <OrbitCirclesTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
    }

    return <EmbroideryTile itemWrapper={itemWrapper} index={index} activate={activate} locked={locked} onReady={onReady}/>
}

function EmbroideryTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)
    const isClickTile = Number(itemWrapper?.id) === 5

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

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
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/embroideryEngine.js")
                if(canceled) return

                engine = mod.createEmbroideryEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => {
                    const rect = tile.getBoundingClientRect()
                    engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
                }

                updateSize()
                engine.renderStatic?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(isClickTile) {
                                if(!visibleRef.current) engine.stop()
                                continue
                            }

                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.05 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = false
        engineRef.current?.stop()
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
        if(hoverRef.current && visibleRef.current) engineRef.current?.start()
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

function SpiralDotsTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)
    const pointerIdRef = useRef(null)
    const pointerActiveRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 9001 + (Number(itemWrapper.id) || 1) * 1337,
            reduceMotion,
            dotsCount: 180,
            dotsMouseDistanceSensitivity: 115,
            dotsMaxEscapeRouteLength: 120,
            introDurationMs: 950
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/spiralDotsEngine.js")
                if(canceled) return

                engine = mod.createSpiralDotsEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => {
                    const rect = tile.getBoundingClientRect()
                    engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
                }

                updateSize()
                engine.renderStatic?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.rebuildDots()
                    engine.renderStatic?.()
                })
                ro.observe(tile)
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _mousePosFromEvent = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: -10000, y: -10000 }
        const rect = tile.getBoundingClientRect()
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }

    const _start = () => {
        engineRef.current?.start()
    }

    const _stop = () => {
        engineRef.current?.clearMouse()
        engineRef.current?.stop()
    }

    const onMouseEnter = () => {
        _start()
    }

    const onMouseLeave = () => {
        _stop()
    }

    const onMouseMove = (event) => {
        const pos = _mousePosFromEvent(event)
        engineRef.current?.setMouse(pos.x, pos.y)
    }

    const onFocus = () => {
        _start()
    }

    const onBlur = () => {
        _stop()
    }

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-hover-only`}
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
             onMouseEnter={locked ? undefined : onMouseEnter}
             onMouseLeave={locked ? undefined : onMouseLeave}
             onMouseMove={locked ? undefined : onMouseMove}
             onFocus={locked ? undefined : onFocus}
             onBlur={locked ? undefined : onBlur}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hover
            </span>
        </div>
    )
}

function GridWaveTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            seed: 424242 + (Number(itemWrapper.id) || 2) * 2027,
            reduceMotion,
            targetCellSize: 14,
            gapPx: 1.4
        }
    }, [itemWrapper.id, reduceMotion])

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
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/gridWaveEngine.js")
                if(canceled) return

                engine = mod.createGridWaveEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => {
                    const rect = tile.getBoundingClientRect()
                    engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
                }

                updateSize()
                engine.renderStatic?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.05 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = false
        engineRef.current?.stop()
    }

    const _posFromEvent = (event) => {
        const tile = tileRef.current
        if(!tile) return { x: 0, y: 0 }
        const rect = tile.getBoundingClientRect()

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

function ThreeTunnelTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            ringCount: 9,
            cubesPerRing: 10,
            ringSpacing: 82,
            tunnelRadius: 58,
            speed: 4.6,
            exposure: 1.45
        }
    }, [reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null
        let ro = null
        let io = null
        let cancelWork = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const load = async () => {
            const mod = await import("./webArt/threeTunnelEngine.js")
            if(canceled) return
            engine = mod.createThreeTunnelEngine(canvas, config)
            engineRef.current = engine

            const updateSize = () => {
                const rect = tile.getBoundingClientRect()
                const dpr = Math.min(1.5, window.devicePixelRatio || 1)
                engine.setSize(rect.width, rect.height, dpr)
            }

            updateSize()
            engine.reset()
            markReady()

            ro = new ResizeObserver(() => {
                updateSize()
                engine.reset()
            })
            ro.observe(tile)

            if("IntersectionObserver" in window) {
                io = new IntersectionObserver((entries) => {
                    for(const entry of entries) {
                        visibleRef.current = Boolean(entry.isIntersecting)
                        if(visibleRef.current && hoverRef.current) engine.start()
                        else engine.stop()
                    }
                }, { threshold: 0.05 })
                io.observe(tile)
            }

            const cleanup = () => {
                io?.disconnect()
                ro?.disconnect()
                engine.destroy()
                engineRef.current = null
            }

            return cleanup
        }

        let cleanup = null
        cancelWork = _scheduleIdleWork(() => {
            load().then((fn) => {
                cleanup = fn || null
            }).catch(() => {
                markReady()
            })
        }, { timeoutMs: 300 })

        return () => {
            canceled = true
            cancelWork?.()
            cleanup?.()
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = false
        engineRef.current?.stop()
    }

    const _restart = () => {
        engineRef.current?.nextPalette?.()
        engineRef.current?.reset()
        if(hoverRef.current && visibleRef.current) engineRef.current?.start()
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

function ThreePolygonDemo5Tile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            nbObjects: 14,
            animationDuration: 7,
            animationDelay: 0.1,
            cameraZ: 75,
            fitFactor: 0.93
        }
    }, [reduceMotion])

    useEffect(() => {
        if(!activate) return

        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let cleanup = null
        let cancelWork = null

        const markReady = () => {
            if(didReadyRef.current) return
            didReadyRef.current = true
            onReady?.(itemWrapper.uniqueId)
        }

        const load = async () => {
            const mod = await import("./webArt/threePolygonDemo5Engine.js")
            if(canceled) return

            const engine = mod.createThreePolygonDemo5Engine(canvas, config)
            engineRef.current = engine

            const updateSize = () => {
                const rect = tile.getBoundingClientRect()
                const dpr = Math.min(1.5, window.devicePixelRatio || 1)
                engine.setSize(rect.width, rect.height, dpr)
            }

            updateSize()
            engine.reset()
            markReady()

            const ro = new ResizeObserver(() => {
                updateSize()
            })
            ro.observe(tile)

            let io = null
            if("IntersectionObserver" in window) {
                io = new IntersectionObserver((entries) => {
                    for(const entry of entries) {
                        visibleRef.current = Boolean(entry.isIntersecting)
                        if(visibleRef.current && hoverRef.current) engine.start()
                        else engine.stop()
                    }
                }, { threshold: 0.05 })
                io.observe(tile)
            }

            cleanup = () => {
                io?.disconnect()
                ro.disconnect()
                engine.destroy()
                engineRef.current = null
            }
        }

        cancelWork = _scheduleIdleWork(() => {
            load().catch(() => {
                markReady()
            })
        }, { timeoutMs: 300 })

        return () => {
            canceled = true
            cancelWork?.()
            cleanup?.()
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _restart = () => {
        engineRef.current?.reset()
        if(hoverRef.current && visibleRef.current) engineRef.current?.start()
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
                aria-label={`Polygon demo 5 web art tile ${index + 1}`}
                disabled={locked}
                onClick={locked ? undefined : _restart}
                onKeyDown={locked ? undefined : onKeyDown}
                onMouseEnter={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onMouseLeave={locked ? undefined : (() => {
                    hoverRef.current = false
                    engineRef.current?.stop()
                })}
                onFocus={locked ? undefined : (() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                })}
                onBlur={locked ? undefined : (() => {
                    hoverRef.current = false
                    engineRef.current?.stop()
                })}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Poly
            </span>
        </button>
    )
}

function OrbitCirclesTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)
    const didReadyRef = useRef(false)
    const paletteIndexRef = useRef(0)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            palette: ["#DD0F7E", "#009BBE", "#A8DA00", "#F2E205", "#EE5A02"],
            bgColor: "#200018",
            totalCircles: 22,
            timeScale: 0.0017
        }
    }, [reduceMotion])

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
            onReady?.(itemWrapper.uniqueId)
        }

        const cancelWork = _scheduleIdleWork(async () => {
            try {
                const mod = await import("./webArt/orbitCirclesEngine.js")
                if(canceled) return

                engine = mod.createOrbitCirclesEngine(canvas, config)
                engineRef.current = engine

                const updateSize = () => {
                    const rect = tile.getBoundingClientRect()
                    engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
                }

                updateSize()
                engine.reset()
                engine.renderStatic?.()
                markReady()

                ro = new ResizeObserver(() => {
                    updateSize()
                    engine.renderStatic?.()
                })
                ro.observe(tile)

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current && hoverRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.05 })
                    io.observe(tile)
                }
            }
            catch(e) {
                markReady()
            }
        })

        return () => {
            canceled = true
            cancelWork?.()
            io?.disconnect()
            ro?.disconnect()
            engine?.destroy()
            engineRef.current = null
        }
    }, [activate, config, itemWrapper.uniqueId, onReady])

    const _start = () => {
        hoverRef.current = true
        if(visibleRef.current) engineRef.current?.start()
    }

    const _stop = () => {
        hoverRef.current = false
        engineRef.current?.stop()
    }

    const _restart = () => {
        const engine = engineRef.current
        if(!engine) return

        const palettes = [
            { palette: ["#A8DA00", "#76C700", "#D9FF6A"], bgColor: "#06130a" }, // green
            { palette: ["#DD0F7E", "#FF4FAE", "#7B2CFF"], bgColor: "#200018" }, // pink/purple
            { palette: ["#009BBE", "#00D5FF", "#2B7BFF"], bgColor: "#001018" }, // cyan/blue
            { palette: ["#F2E205", "#FFB703", "#EE5A02"], bgColor: "#1a0f00" }, // yellow/orange
            { palette: ["#8A2BFF", "#C300FF", "#FF00C8"], bgColor: "#07000f" }, // violet/neon
        ]

        const next = palettes[paletteIndexRef.current % palettes.length]
        paletteIndexRef.current = (paletteIndexRef.current + 1) % palettes.length
        engine.setPalette?.(next.palette, next.bgColor)

        if(hoverRef.current && visibleRef.current) engine.start?.()
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

function SendYourFunAnimationTile({ label, clickLabel }) {
    const navigation = useNavigation()

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const onClick = () => {
        navigation.navigateToSectionWithId("contact")
    }

    const onKeyDown = (event) => {
        if(event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            onClick()
        }
    }

    return (
        <button type={"button"}
                className={`article-web-art-tile article-web-art-tile-clickable article-web-art-tile-cta`}
                aria-label={label}
                onClick={onClick}
                onKeyDown={onKeyDown}>
            <div className={`loader ${reduceMotion ? "loader-reduce-motion" : ""}`}
                 aria-hidden={true}>
                <div className={`loader-inner`}>
                    <div className={`loader-line-wrap`}>
                        <div className={`loader-line`}/>
                    </div>
                    <div className={`loader-line-wrap`}>
                        <div className={`loader-line`}/>
                    </div>
                    <div className={`loader-line-wrap`}>
                        <div className={`loader-line`}/>
                    </div>
                    <div className={`loader-line-wrap`}>
                        <div className={`loader-line`}/>
                    </div>
                    <div className={`loader-line-wrap`}>
                        <div className={`loader-line`}/>
                    </div>
                </div>
            </div>
            <div className={`article-web-art-tile-cta-content`}>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-top`}>{label}</div>
                <div className={`article-web-art-tile-cta-title article-web-art-tile-cta-title-bottom`}>{clickLabel}</div>
            </div>
        </button>
    )
}

function GoldfishTile() {
    const tileRef = useRef(null)
    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const holdRef = useRef(false)
    const holdStartRef = useRef(0)
    const pointerIdRef = useRef(null)
    const rafRef = useRef(null)
    const rateRef = useRef(1)
    const releaseRafRef = useRef(null)

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const smoothstep01 = (t) => {
            const x = Math.max(0, Math.min(1, t))
            return x * x * (3 - 2 * x)
        }

        const collectAnimations = () => {
            const nodes = tile.querySelectorAll(
                ".fish-wrapper, .fish-parts, .fish-top-fin, .fish-back-bottom-fin, .fish-back-fin, .fish-front-bottom-fin"
            )
            const all = []
            for(const node of nodes) {
                const anims = node.getAnimations ? node.getAnimations() : []
                for(const a of anims) all.push(a)
            }
            return all
        }

        const setRate = (rate) => {
            const r = Math.max(1, Math.min(3, Number(rate) || 1))
            rateRef.current = r
            const anims = collectAnimations()
            for(const a of anims) {
                a.playbackRate = r
            }
        }

        const stopHold = () => {
            holdRef.current = false
            pointerIdRef.current = null
            tile.classList.remove("article-web-art-tile-goldfish-held")
            if(rafRef.current != null) cancelAnimationFrame(rafRef.current)
            rafRef.current = null

            const from = rateRef.current
            const dur = 260
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

        const tick = () => {
            if(!holdRef.current) return
            const t = performance.now() - holdStartRef.current
            // Smooth ramp from 1x -> 3x over ~5 seconds.
            const mult = 1 + 2 * smoothstep01(t / 5000)
            setRate(mult)
            rafRef.current = requestAnimationFrame(tick)
        }

        const onPointerDown = (e) => {
            if(reduceMotion) return
            if(e.button != null && e.button !== 0) return
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

        const onPointerUp = () => {
            stopHold()
        }

        const onPointerCancel = () => {
            stopHold()
        }

        const onLostCapture = () => {
            stopHold()
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
            stopHold()
            if(releaseRafRef.current != null) cancelAnimationFrame(releaseRafRef.current)
            releaseRafRef.current = null
        }
    }, [reduceMotion])

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

function PatronusTile() {
    const tileRef = useRef(null)
    const layerRefs = useRef([])
    const progressRef = useRef(0)
    const manualUntilRef = useRef(0)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    useEffect(() => {
        const tile = tileRef.current
        if(!tile) return

        const layers = layerRefs.current.filter(Boolean)
        if(!layers.length) return

        let hovered = false
        let touchActive = false
        let touchPointerId = null
        let rafId = null

        const apply = (x, y) => {
            const tiltY = (x - 0.5) * 30
            for(let index = 0; index < layers.length; index++) {
                const layer = layers[index]
                const depthX = index * 18
                const depthY = index * 8
                const moveX = (x - 0.5) * depthX
                const moveY = (y - 0.5) * depthY
                layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateY(${tiltY}deg)`
            }
        }

        const applyLimited = (xRaw, yRaw) => {
            // Vertical movement: reduce by ~30%. Horizontal movement: expand by ~10%.
            const dx = Math.max(-0.55, Math.min(0.55, (xRaw - 0.5) * 1.10))
            const dy = Math.max(-0.35, Math.min(0.35, (yRaw - 0.5) * 0.70))
            apply(0.5 + dx, 0.5 + dy)
        }

        const onMove = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            hovered = true
            manualUntilRef.current = performance.now() + 650
            applyLimited(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)))
        }

        const _posFromPointer = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            return {
                x: Math.max(0, Math.min(1, x)),
                y: Math.max(0, Math.min(1, y))
            }
        }

        const onPointerDown = (e) => {
            if(e.pointerType === "mouse") return
            touchActive = true
            touchPointerId = e.pointerId
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onPointerMove = (e) => {
            if(!touchActive) return
            if(touchPointerId != null && e.pointerId !== touchPointerId) return
            hovered = true
            manualUntilRef.current = performance.now() + 900
            const pos = _posFromPointer(e)
            applyLimited(pos.x, pos.y)
        }

        const endTouch = (e) => {
            if(touchPointerId != null && e?.pointerId != null && e.pointerId !== touchPointerId) return
            touchActive = false
            touchPointerId = null
            hovered = false
            if(rafId != null) cancelAnimationFrame(rafId)
            rafId = null
        }

        const onEnter = () => {
            hovered = true
            if(reduceMotion) return
            if(rafId != null) return
            rafId = requestAnimationFrame(tick)
        }

        const onLeave = () => {
            hovered = false
            if(rafId != null) cancelAnimationFrame(rafId)
            rafId = null
        }

        const tick = () => {
            if(!hovered) return
            if(!reduceMotion && performance.now() >= manualUntilRef.current) {
                progressRef.current += 0.008
                const x = Math.sin(progressRef.current) * 0.5 + 0.5
                applyLimited(x, 0.5)
            }
            rafId = requestAnimationFrame(tick)
        }

        tile.addEventListener("mouseenter", onEnter)
        tile.addEventListener("mousemove", onMove)
        tile.addEventListener("mouseleave", onLeave)
        tile.addEventListener("pointerdown", onPointerDown)
        tile.addEventListener("pointermove", onPointerMove)
        tile.addEventListener("pointerup", endTouch)
        tile.addEventListener("pointercancel", endTouch)
        applyLimited(0.5, 0.5)

        return () => {
            tile.removeEventListener("mouseenter", onEnter)
            tile.removeEventListener("mousemove", onMove)
            tile.removeEventListener("mouseleave", onLeave)
            tile.removeEventListener("pointerdown", onPointerDown)
            tile.removeEventListener("pointermove", onPointerMove)
            tile.removeEventListener("pointerup", endTouch)
            tile.removeEventListener("pointercancel", endTouch)
            if(rafId != null) cancelAnimationFrame(rafId)
        }
    }, [reduceMotion])

    return (
        <div ref={tileRef}
             className={`article-web-art-tile article-web-art-tile-patronus`}
             role={"img"}
             aria-label={`Patronus parallax tile`}>
            <div className={`patronus-card`}>
                <div className={`patronus-layer patronus-bg`}
                     ref={(el) => { layerRefs.current[0] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1gjk_fcB6iho1oHmzY-10eSKIE9TpQisx&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[1] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1TK9pzfnoR_AHoyGopthRaQZsQWjbwMHH&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[2] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1yKj48wNNwg17-JecguxMASwDNvp65tCb&sz=w1000"}/>
                </div>
                <div className={`patronus-layer patronus-svg`}
                     ref={(el) => { layerRefs.current[3] = el }}
                     dangerouslySetInnerHTML={{
                         __html: patronusSvgMarkup
                     }}/>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[4] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1jkpUucNkaQOPCLClpZKMdTdEzAYEszsn&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[5] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1G58IxzEgQnnWnd1vAdRmtQHfWpvb1Ipt&sz=w1000"}/>
                </div>
                <div className={`patronus-layer`}
                     ref={(el) => { layerRefs.current[6] = el }}>
                    <img alt={""}
                         src={"https://drive.google.com/thumbnail?id=1I7mg1tYxTI3EBpbNoRAXhzSua6n0XDDF&sz=w1000"}/>
                </div>
            </div>
            <span className={`article-web-art-tile-label`}>
                Patronus
            </span>
        </div>
    )
}

export default ArticleWebArt
