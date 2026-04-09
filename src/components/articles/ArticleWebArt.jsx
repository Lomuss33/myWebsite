import "./ArticleWebArt.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

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
            refreshDelay: 8000,
            radiusMini,
            radiusMaxi,
            dHueStep,
            startGroup,
            seed: 1337 + id * 1009,
            reduceMotion
        }
    }, [itemWrapper.id, index, reduceMotion])

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
                onMouseEnter={locked ? undefined : _start}
                onMouseLeave={locked ? undefined : _stop}
                onFocus={locked ? undefined : _start}
                onBlur={locked ? undefined : _stop}
                onKeyDown={locked ? undefined : onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                {Number.isFinite(Number(itemWrapper?.id)) ? Number(itemWrapper.id) : (index + 1)}
            </span>
        </button>
    )
}

function SpiralDotsTile({ itemWrapper, index, activate, locked, onReady }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const didReadyRef = useRef(false)

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
            nbObjects: 18,
            animationDuration: 7,
            animationDelay: 0.1,
            cameraZ: 75
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
    return (
        <div className={`article-web-art-tile article-web-art-tile-goldfish`}
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
        </div>
    )
}

function PatronusTile() {
    const tileRef = useRef(null)
    const layerRefs = useRef([])

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
        let rafId = null
        let progress = 0

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

        const onMove = (e) => {
            const rect = tile.getBoundingClientRect()
            const x = (e.clientX - rect.left) / Math.max(1, rect.width)
            const y = (e.clientY - rect.top) / Math.max(1, rect.height)
            hovered = true
            apply(Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)))
        }

        const onLeave = () => {
            hovered = false
        }

        const animate = () => {
            if(reduceMotion) return
            if(hovered) {
                rafId = requestAnimationFrame(animate)
                return
            }
            progress += 0.008
            const x = Math.sin(progress) * 0.5 + 0.5
            const y = 0.5
            apply(x, y)
            rafId = requestAnimationFrame(animate)
        }

        tile.addEventListener("mousemove", onMove)
        tile.addEventListener("mouseleave", onLeave)
        if(!reduceMotion) rafId = requestAnimationFrame(animate)
        else apply(0.5, 0.5)

        return () => {
            tile.removeEventListener("mousemove", onMove)
            tile.removeEventListener("mouseleave", onLeave)
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
                         __html: `
<svg width="100%" height="100%" viewBox="0 0 750 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
  <filter id='inset-shadow'>
    <feOffset dx='0' dy='0' />
    <feGaussianBlur stdDeviation='5' result='offset-blur' />
    <feComposite operator='out' in='SourceGraphic' in2='offset-blur' result='inverse' />
    <feFlood flood-color='white' flood-opacity='1' result='color' />
    <feComposite operator='in' in='color' in2='inverse' result='shadow' />
    <feComposite operator='over' in='shadow' in2='SourceGraphic' />
  </filter>
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="0" result="turbulence">
      <animate attributeName="baseFrequency" from="0.02" to="0.06" dur="10s" repeatCount="indefinite" />
    </feTurbulence>
    <feColorMatrix in="turbulence" type="matrix" values="1 1 1 0 0 1 1 1 0 0 1 1 1 0 0 0 0 0 1 0" result="colorNoise" />
    <feComposite operator="in" in2="SourceGraphic" in="colorNoise" result="monoNoise" />
    <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
  </filter>
  <filter id="smokeFilter" x="0" y="0" width="100%" height="100%">
    <feTurbulence id="turbulence" type="fractalNoise" baseFrequency="0.01" numOctaves="40">
      <animate attributeName="baseFrequency" from="0.01" to="0.02" dur="10s" repeatCount="indefinite" />
      <animate attributeName="seed" from="0" to="1" dur="30s" repeatCount="indefinite" />
    </feTurbulence>
    <feDisplacementMap in="SourceGraphic" scale="40" xChannelSelector="R" yChannelSelector="G" />
  </filter>
  <g id="effect" transform="matrix(1,0,0,1,15.1726,-41.0841)">
    <path d="M290.42,254.479C284.663,262.21 282.91,269.7 283.625,276.208C281.596,275.964 278.379,275.392 275.894,274.076C271.974,272.001 268.285,269.233 264.826,258.396C264.434,274.66 279.987,279.918 284.679,281.135C284.944,281.954 285.237,282.757 285.577,283.529C286.856,286.428 288.896,289.231 291.175,291.778C288.414,293.007 279.352,296.209 272.205,289.062C270.392,296.768 287.962,301.355 294.473,295.156C297.436,297.965 300.405,300.267 302.409,301.744C305.542,304.053 309.077,307.361 310.876,309.093C310.281,309.488 309.685,309.893 309.083,310.38C309.083,310.38 303.214,305.164 296.366,307.12C301.257,318.206 307.779,315.271 309.083,320.162C310.387,325.053 309.735,326.685 307.779,331.902C305.823,337.119 303.54,362.878 315.604,378.203C327.669,393.528 340.059,397.441 339.733,405.919C339.407,414.397 342.017,452.873 339.082,458.09C336.147,463.307 333.212,470.481 333.212,470.481L343.32,469.502C343.32,469.502 343.646,464.937 345.603,462.002C347.559,459.067 348.212,455.482 348.212,450.917C348.212,446.352 350.168,429.069 351.146,421.243C352.124,413.417 357.016,402.331 357.016,402.331C357.016,402.331 362.886,455.807 360.603,459.068C358.321,462.329 354.082,470.155 354.082,470.155L365.82,469.829C365.82,469.829 363.864,465.262 365.82,462.002C367.777,458.741 367.45,455.155 367.124,452.547C366.798,449.938 369.081,406.245 372.015,400.376C389.297,404.615 399.078,400.376 399.078,400.376C399.078,400.376 407.555,412.767 413.424,414.397C419.293,416.027 411.469,452.874 410.164,457.439C408.86,462.004 404.294,468.852 404.294,468.852L416.36,469.178C416.36,469.178 414.077,456.136 416.36,450.919C418.642,445.702 429.403,413.746 429.077,410.812C428.751,407.877 428.098,404.942 429.403,405.921C430.707,406.899 442.12,417.66 443.098,424.508C444.076,431.355 446.033,458.418 445.706,460.701C445.38,462.984 443.098,469.833 443.098,469.833L454.836,468.201C454.836,468.201 453.858,436.573 450.923,428.096C447.988,419.618 449.293,408.205 447.989,405.596C446.685,402.988 439.511,396.791 437.881,388.639C436.251,380.487 437.881,366.466 436.577,359.618C444.729,365.487 448.968,362.554 448.968,362.554C448.968,362.554 442.12,347.555 435.273,343.316C428.426,339.077 409.186,337.119 399.078,339.076C388.97,341.033 374.622,343.641 367.775,341.685C360.928,339.728 342.994,342.337 339.408,335.164C335.821,327.99 331.582,321.796 335.495,319.513C339.408,317.23 348.864,313.317 349.19,306.143C338.103,306.143 332.233,310.056 332.233,310.056C332.233,310.056 331.673,309.621 330.839,309.079C332.642,307.343 336.165,304.049 339.291,301.746C341.295,300.269 344.264,297.966 347.228,295.158C353.738,301.357 371.309,296.77 369.496,289.064C362.349,296.211 353.287,293.009 350.526,291.78C352.806,289.233 354.845,286.43 356.124,283.531C356.465,282.759 356.757,281.956 357.022,281.137C361.713,279.92 377.267,274.662 376.875,258.398C373.417,269.235 369.727,272.002 365.807,274.078C363.321,275.394 360.104,275.966 358.076,276.21C358.791,269.702 357.038,262.211 351.281,254.48C356.844,267.196 355.47,276.887 351.959,283.895C350.494,282.549 347.735,279.505 346.901,275.001C345.259,279.015 347.949,285.767 349.599,287.84C348.52,289.369 347.363,290.724 346.211,291.91C344.614,290.389 340.713,285.991 339.983,278.69C339.061,269.467 339.523,264.855 334.22,261.166C337.909,268.314 337.448,274.079 337.217,279.151C337.024,283.394 342.106,291.589 343.79,294.183C342.134,295.606 340.62,296.662 339.523,297.364C336.42,299.35 333.281,302.049 331.016,304.138C333.609,298.416 336.108,288.908 330.07,280.072C331.787,291.661 330.904,302.047 326.498,306.963C323.49,305.923 319.53,305.397 315.17,306.927C310.792,301.997 309.918,291.633 311.631,280.072C305.593,288.908 308.092,298.416 310.685,304.138C308.42,302.049 305.281,299.35 302.178,297.364C301.081,296.662 299.567,295.606 297.911,294.183C299.595,291.589 304.677,283.394 304.484,279.151C304.253,274.079 303.792,268.313 307.481,261.166C302.178,264.855 302.641,269.467 301.718,278.69C300.988,285.991 297.087,290.389 295.49,291.91C294.338,290.724 293.181,289.369 292.102,287.84C293.753,285.766 296.443,279.015 294.8,275.001C293.966,279.505 291.208,282.55 289.742,283.895C286.23,276.886 284.856,267.195 290.42,254.479Z" style="stroke:rgba(122,166,203,1);fill-rule:nonzero; stroke-width: 1px; fill: rgba(122,166,203,0.2)" />
  </g>
  <g id="patronus" transform="matrix(1,0,0,1,15.1726,-41.0841)">
    <path d="M290.42,254.479C284.663,262.21 282.91,269.7 283.625,276.208C281.596,275.964 278.379,275.392 275.894,274.076C271.974,272.001 268.285,269.233 264.826,258.396C264.434,274.66 279.987,279.918 284.679,281.135C284.944,281.954 285.237,282.757 285.577,283.529C286.856,286.428 288.896,289.231 291.175,291.778C288.414,293.007 279.352,296.209 272.205,289.062C270.392,296.768 287.962,301.355 294.473,295.156C297.436,297.965 300.405,300.267 302.409,301.744C305.542,304.053 309.077,307.361 310.876,309.093C310.281,309.488 309.685,309.893 309.083,310.38C309.083,310.38 303.214,305.164 296.366,307.12C301.257,318.206 307.779,315.271 309.083,320.162C310.387,325.053 309.735,326.685 307.779,331.902C305.823,337.119 303.54,362.878 315.604,378.203C327.669,393.528 340.059,397.441 339.733,405.919C339.407,414.397 342.017,452.873 339.082,458.09C336.147,463.307 333.212,470.481 333.212,470.481L343.32,469.502C343.32,469.502 343.646,464.937 345.603,462.002C347.559,459.067 348.212,455.482 348.212,450.917C348.212,446.352 350.168,429.069 351.146,421.243C352.124,413.417 357.016,402.331 357.016,402.331C357.016,402.331 362.886,455.807 360.603,459.068C358.321,462.329 354.082,470.155 354.082,470.155L365.82,469.829C365.82,469.829 363.864,465.262 365.82,462.002C367.777,458.741 367.45,455.155 367.124,452.547C366.798,449.938 369.081,406.245 372.015,400.376C389.297,404.615 399.078,400.376 399.078,400.376C399.078,400.376 407.555,412.767 413.424,414.397C419.293,416.027 411.469,452.874 410.164,457.439C408.86,462.004 404.294,468.852 404.294,468.852L416.36,469.178C416.36,469.178 414.077,456.136 416.36,450.919C418.642,445.702 429.403,413.746 429.077,410.812C428.751,407.877 428.098,404.942 429.403,405.921C430.707,406.899 442.12,417.66 443.098,424.508C444.076,431.355 446.033,458.418 445.706,460.701C445.38,462.984 443.098,469.833 443.098,469.833L454.836,468.201C454.836,468.201 453.858,436.573 450.923,428.096C447.988,419.618 449.293,408.205 447.989,405.596C446.685,402.988 439.511,396.791 437.881,388.639C436.251,380.487 437.881,366.466 436.577,359.618C444.729,365.487 448.968,362.554 448.968,362.554C448.968,362.554 442.12,347.555 435.273,343.316C428.426,339.077 409.186,337.119 399.078,339.076C388.97,341.033 374.622,343.641 367.775,341.685C360.928,339.728 342.994,342.337 339.408,335.164C335.821,327.99 331.582,321.796 335.495,319.513C339.408,317.23 348.864,313.317 349.19,306.143C338.103,306.143 332.233,310.056 332.233,310.056C332.233,310.056 331.673,309.621 330.839,309.079C332.642,307.343 336.165,304.049 339.291,301.746C341.295,300.269 344.264,297.966 347.228,295.158C353.738,301.357 371.309,296.77 369.496,289.064C362.349,296.211 353.287,293.009 350.526,291.78C352.806,289.233 354.845,286.43 356.124,283.531C356.465,282.759 356.757,281.956 357.022,281.137C361.713,279.92 377.267,274.662 376.875,258.398C373.417,269.235 369.727,272.002 365.807,274.078C363.321,275.394 360.104,275.966 358.076,276.21C358.791,269.702 357.038,262.211 351.281,254.48C356.844,267.196 355.47,276.887 351.959,283.895C350.494,282.549 347.735,279.505 346.901,275.001C345.259,279.015 347.949,285.767 349.599,287.84C348.52,289.369 347.363,290.724 346.211,291.91C344.614,290.389 340.713,285.991 339.983,278.69C339.061,269.467 339.523,264.855 334.22,261.166C337.909,268.314 337.448,274.079 337.217,279.151C337.024,283.394 342.106,291.589 343.79,294.183C342.134,295.606 340.62,296.662 339.523,297.364C336.42,299.35 333.281,302.049 331.016,304.138C333.609,298.416 336.108,288.908 330.07,280.072C331.787,291.661 330.904,302.047 326.498,306.963C323.49,305.923 319.53,305.397 315.17,306.927C310.792,301.997 309.918,291.633 311.631,280.072C305.593,288.908 308.092,298.416 310.685,304.138C308.42,302.049 305.281,299.35 302.178,297.364C301.081,296.662 299.567,295.606 297.911,294.183C299.595,291.589 304.677,283.394 304.484,279.151C304.253,274.079 303.792,268.313 307.481,261.166C302.178,264.855 302.641,269.467 301.718,278.69C300.988,285.991 297.087,290.389 295.49,291.91C294.338,290.724 293.181,289.369 292.102,287.84C293.753,285.766 296.443,279.015 294.8,275.001C293.966,279.505 291.208,282.55 289.742,283.895C286.23,276.886 284.856,267.195 290.42,254.479Z" style="fill:rgba(122,166,203,0.8);fill-rule:nonzero;" />
  </g>
</svg>
                         `
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
        </div>
    )
}

export default ArticleWebArt
