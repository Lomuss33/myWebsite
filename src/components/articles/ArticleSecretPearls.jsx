import "./ArticleSecretPearls.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import Article from "./base/Article.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function ArticleSecretPearls({ dataWrapper }) {
    const language = useLanguage()
    const selectedLanguageId = language.selectedLanguageId || "en"
    const [isRevealed, setIsRevealed] = useState(false)
    const [openPearlIds, setOpenPearlIds] = useState(() => new Set())
    const items = dataWrapper.orderedItems.slice(0, 4)
    const pearlLabels = ["source", "contain", "allow", "feel"]
    const showLessLabel = {
        en: "Show less",
        de: "Weniger anzeigen",
        hr: "Prikaži manje",
        tr: "Daha az göster"
    }[selectedLanguageId] || "Show less"

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-secret-pearls ${isRevealed ? "article-secret-pearls-open" : "article-secret-pearls-closed"}`}
                 forceHideTitle={!isRevealed}>
            {!isRevealed ? (
                <div className={`article-secret-pearls-gate`}>
                    <button type={"button"}
                            className={`article-secret-pearls-gate-button`}
                            onClick={() => setIsRevealed(true)}
                            aria-expanded={isRevealed}
                            aria-label={"Reveal Secret pearls"}>
                        <span className={`article-secret-pearls-gate-button-kicker`}>Secret</span>
                    </button>
                </div>
            ) : (
                <div className={`article-secret-pearls-body`}>
                    {dataWrapper.locales.description && (
                        <p className={`article-secret-pearls-description text-4`}
                           dangerouslySetInnerHTML={{__html: dataWrapper.locales.description}}/>
                    )}

                    <div className={`article-secret-pearls-grid`}>
                        {items.map((itemWrapper, index) => {
                            const pearlId = itemWrapper.uniqueId || `pearl-${index}`
                            const label = pearlLabels[index] || `pearl ${index + 1}`
                            const isOpen = openPearlIds.has(pearlId)
                            const togglePearl = () => {
                                setOpenPearlIds((current) => {
                                    const next = new Set(current)
                                    if(next.has(pearlId)) next.delete(pearlId)
                                    else next.add(pearlId)
                                    return next
                                })
                            }

                            return (
                                <GatedPearlTile key={pearlId}
                                                label={label}
                                                isOpen={isOpen}
                                                onToggle={togglePearl}>
                                    {isOpen ? (
                                        index === 0 ? (
                                            <SacredPearlTile/>
                                        ) : index === 1 ? (
                                            <BluePearlTile/>
                                        ) : index === 2 ? (
                                            <PearlUniverseTile/>
                                        ) : index === 3 ? (
                                            <LayeredPearlTile/>
                                        ) : (
                                            <SecretPearlPlaceholderTile itemWrapper={itemWrapper}
                                                                       index={index}/>
                                        )
                                    ) : (
                                        <div className={`article-secret-pearls-tile article-secret-pearls-tile-placeholder`}
                                             aria-label={`${label} pearl tile hidden`}/>
                                    )}
                                </GatedPearlTile>
                            )
                        })}
                    </div>

                    <div className={`article-secret-pearls-footer`}>
                        <StandardButton variant={`contrast`}
                                        className={`article-secret-pearls-show-less-button`}
                                        type={"button"}
                                        faIcon={`fa-solid fa-caret-up`}
                                        label={showLessLabel}
                                        tooltip={showLessLabel}
                                        size={StandardButton.Size.LARGE}
                                        onClick={() => {
                                            setOpenPearlIds(new Set())
                                            setIsRevealed(false)
                                        }}/>
                    </div>
                </div>
            )}
        </Article>
    )
}

function GatedPearlTile({ label, isOpen, onToggle, children }) {
    return (
        <div className={`article-secret-pearls-gated-tile ${isOpen ? "article-secret-pearls-gated-tile-open" : "article-secret-pearls-gated-tile-closed"}`}>
            {children}
            <div className={`article-secret-pearls-gated-tile-sheet`} aria-hidden={true}/>
            <button type={"button"}
                    className={`article-secret-pearls-gated-tile-pill ${isOpen ? "article-secret-pearls-gated-tile-pill-open" : "article-secret-pearls-gated-tile-pill-closed"}`}
                    onClick={onToggle}
                    aria-label={`${isOpen ? "Hide" : "Show"} ${label}`}>
                {label}
            </button>
        </div>
    )
}

function SecretPearlPlaceholderTile({ itemWrapper, index }) {
    return (
        <div className={`article-secret-pearls-tile`}>
            <div className={`article-secret-pearls-tile-glow`} aria-hidden={true}/>
            <div className={`article-secret-pearls-tile-index`}>
                {index + 1}
            </div>
            <div className={`article-secret-pearls-tile-copy`}>
                <span className={`article-secret-pearls-tile-label`}>
                    {itemWrapper.locales.title || `Pearl ${index + 1}`}
                </span>
                <span className={`article-secret-pearls-tile-subtitle`}>
                    web art item
                </span>
            </div>
        </div>
    )
}

function useCompactPearlMode() {
    const [isCompact, setIsCompact] = useState(false)

    useEffect(() => {
        if(typeof window === "undefined" || !window.matchMedia) return undefined

        const mediaQuery = window.matchMedia("(max-width: 700px), (pointer: coarse)")
        const update = () => setIsCompact(mediaQuery.matches)
        update()

        if(mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", update)
            return () => mediaQuery.removeEventListener("change", update)
        }

        mediaQuery.addListener?.(update)
        return () => mediaQuery.removeListener?.(update)
    }, [])

    return isCompact
}

function SacredPearlTile() {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const visibleRef = useRef(true)
    const [didFail, setDidFail] = useState(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => ({
        vaporParticleCount: 700,
        floralPointCount: 160,
        petalLayerCount: 7,
        rootsAmount: 127,
        rootTubeSegments: 70,
        rootRadialSegments: 7,
        maxPixelRatio: 1.25,
        reduceMotion
    }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let ro = null
        let io = null
        let frameId = 0
        let fallbackResizeHandler = null

        const getSafePixelRatio = () => {
            const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
            return Math.min(isCoarsePointer ? 1 : 1.25, Math.max(1, window.devicePixelRatio || 1))
        }

        const updateSize = () => {
            const engine = engineRef.current
            if(!engine) return
            const rect = tile.getBoundingClientRect()
            const width = Math.max(1, Math.round(rect.width || tile.clientWidth || 1))
            const height = Math.max(1, Math.round(rect.height || tile.clientHeight || width || 1))
            engine.setSize(width, height, getSafePixelRatio())
        }

        const load = async () => {
            try {
                const mod = await import("./webArt/sacredPearlEngine.js")
                if(canceled) return

                const engine = mod.createSacredPearlEngine(canvas, config)
                engineRef.current = engine
                engine.setInteractionEnabled(true)
                updateSize()
                frameId = window.requestAnimationFrame(() => {
                    if(canceled || engineRef.current !== engine) return
                    updateSize()
                    engine.reset()
                    if(visibleRef.current) engine.start()
                })

                if("ResizeObserver" in window) {
                    ro = new ResizeObserver(updateSize)
                    ro.observe(tile)
                }
                else {
                    fallbackResizeHandler = updateSize
                    window.addEventListener("resize", fallbackResizeHandler, { passive: true })
                }

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
                else {
                    visibleRef.current = true
                    engine.start()
                }
            }
            catch {
                setDidFail(true)
            }
        }

        load()

        return () => {
            canceled = true
            if(frameId) window.cancelAnimationFrame(frameId)
            ro?.disconnect()
            io?.disconnect()
            if(fallbackResizeHandler) window.removeEventListener("resize", fallbackResizeHandler)
            engineRef.current?.destroy?.()
            engineRef.current = null
        }
    }, [config])

    return (
        <div ref={tileRef}
             className={`article-secret-pearls-tile article-secret-pearls-tile-sacred-pearl ${didFail ? "article-secret-pearls-tile-sacred-pearl-failed" : ""}`}
             role={"img"}
            aria-label={"Sacred Pearl web art"}>
            <canvas ref={canvasRef}
                    className={`article-secret-pearls-sacred-pearl-canvas`}/>
        </div>
    )
}

function BluePearlTile() {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const visibleRef = useRef(true)
    const [didFail, setDidFail] = useState(false)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => ({
        particleCount: 91,
        reflectionProbeSize: 6,
        maxPixelRatio: 1.25,
        showCore: false,
        reduceMotion
    }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let ro = null
        let io = null
        let frameId = 0
        let fallbackResizeHandler = null

        const getSafePixelRatio = () => {
            const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
            return Math.min(isCoarsePointer ? 1 : 1.25, Math.max(1, window.devicePixelRatio || 1))
        }

        const updateSize = () => {
            const engine = engineRef.current
            if(!engine) return
            const rect = tile.getBoundingClientRect()
            const width = Math.max(1, Math.round(rect.width || tile.clientWidth || 1))
            const height = Math.max(1, Math.round(rect.height || tile.clientHeight || width || 1))
            engine.setSize(width, height, getSafePixelRatio())
        }

        const load = async () => {
            try {
                const mod = await import("./webArt/bluePearlEngine.js")
                if(canceled) return

                const engine = mod.createBluePearlEngine(canvas, config)
                engineRef.current = engine
                engine.setInteractionEnabled(true)
                updateSize()
                frameId = window.requestAnimationFrame(() => {
                    if(canceled || engineRef.current !== engine) return
                    updateSize()
                    engine.reset()
                    if(visibleRef.current) engine.start()
                })

                if("ResizeObserver" in window) {
                    ro = new ResizeObserver(updateSize)
                    ro.observe(tile)
                }
                else {
                    fallbackResizeHandler = updateSize
                    window.addEventListener("resize", fallbackResizeHandler, { passive: true })
                }

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
                else {
                    visibleRef.current = true
                    engine.start()
                }
            }
            catch {
                setDidFail(true)
            }
        }

        load()

        return () => {
            canceled = true
            if(frameId) window.cancelAnimationFrame(frameId)
            ro?.disconnect()
            io?.disconnect()
            if(fallbackResizeHandler) window.removeEventListener("resize", fallbackResizeHandler)
            engineRef.current?.destroy?.()
            engineRef.current = null
        }
    }, [config])

    return (
        <div ref={tileRef}
             className={`article-secret-pearls-tile article-secret-pearls-tile-blue-pearl ${didFail ? "article-secret-pearls-tile-blue-pearl-failed" : ""}`}
             role={"img"}
             aria-label={"Blue pearl web art"}>
            <canvas ref={canvasRef}
                    className={`article-secret-pearls-blue-pearl-canvas`}/>
            <StarHedronPearl/>
            <div className={`article-secret-pearls-blue-pearl-shade`} aria-hidden={true}/>
        </div>
    )
}

function StarHedronPearl() {
    const pentagons = Array.from({length: 12}, (_, pentagonIndex) => (
        <div key={pentagonIndex}
             className={`article-secret-pearls-star-hedron-pentagon ${pentagonIndex < 10 ? "article-secret-pearls-star-hedron-side" : "article-secret-pearls-star-hedron-lid"}`}>
            {Array.from({length: 5}, (_, triangleIndex) => (
                <span key={triangleIndex}
                      className={`article-secret-pearls-star-hedron-triangle`}/>
            ))}
        </div>
    ))

    return (
        <div className={`article-secret-pearls-star-hedron-wrapper`} aria-hidden={true}>
            <div className={`article-secret-pearls-star-hedron-scene`}>
                <div className={`article-secret-pearls-star-hedron-pivot`}>
                    <div className={`article-secret-pearls-star-hedron`}>
                        {pentagons}
                    </div>
                </div>
            </div>
        </div>
    )
}

function PearlUniverseTile() {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const visibleRef = useRef(true)
    const [didFail, setDidFail] = useState(false)
    const layers = useMemo(() => Array.from({length: 42}, (_, index) => index), [])
    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])
    const config = useMemo(() => ({
        maxPixelRatio: 1.15,
        reduceMotion
    }), [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let ro = null
        let io = null
        let frameId = 0
        let fallbackResizeHandler = null

        const getSafePixelRatio = () => {
            const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
            return Math.min(isCoarsePointer ? 1 : 1.15, Math.max(1, window.devicePixelRatio || 1))
        }

        const updateSize = () => {
            const engine = engineRef.current
            if(!engine) return
            const rect = tile.getBoundingClientRect()
            const width = Math.max(1, Math.round(rect.width || tile.clientWidth || 1))
            const height = Math.max(1, Math.round(rect.height || tile.clientHeight || width || 1))
            engine.setSize(width, height, getSafePixelRatio())
        }

        const load = async () => {
            try {
                const mod = await import("./webArt/highDimensionalPearlEngine.js")
                if(canceled) return

                const engine = mod.createHighDimensionalPearlEngine(canvas, config)
                engineRef.current = engine
                engine.setInteractionEnabled(true)
                updateSize()
                frameId = window.requestAnimationFrame(() => {
                    if(canceled || engineRef.current !== engine) return
                    updateSize()
                    engine.reset()
                    if(visibleRef.current) engine.start()
                })

                if("ResizeObserver" in window) {
                    ro = new ResizeObserver(updateSize)
                    ro.observe(tile)
                }
                else {
                    fallbackResizeHandler = updateSize
                    window.addEventListener("resize", fallbackResizeHandler, { passive: true })
                }

                if("IntersectionObserver" in window) {
                    io = new IntersectionObserver((entries) => {
                        for(const entry of entries) {
                            visibleRef.current = Boolean(entry.isIntersecting)
                            if(visibleRef.current) engine.start()
                            else engine.stop()
                        }
                    }, { threshold: 0.2 })
                    io.observe(tile)
                }
                else {
                    visibleRef.current = true
                    engine.start()
                }
            }
            catch {
                setDidFail(true)
            }
        }

        load()

        return () => {
            canceled = true
            if(frameId) window.cancelAnimationFrame(frameId)
            ro?.disconnect()
            io?.disconnect()
            if(fallbackResizeHandler) window.removeEventListener("resize", fallbackResizeHandler)
            engineRef.current?.destroy?.()
            engineRef.current = null
        }
    }, [config])

    return (
        <div ref={tileRef}
             className={`article-secret-pearls-tile article-secret-pearls-tile-universe-pearl ${didFail ? "article-secret-pearls-tile-universe-pearl-failed" : ""}`}
             role={"img"}
             aria-label={"Pearl universe theory web art"}>
            <canvas ref={canvasRef}
                    className={`article-secret-pearls-universe-canvas`}/>
            <div className={`article-secret-pearls-universe-layered-background`} aria-hidden={true}>
                {layers.map((index) => (
                    <span key={index}
                          style={{"--layer-index": index}}/>
                ))}
            </div>
            <div className={`article-secret-pearls-universe-glow`} aria-hidden={true}/>
        </div>
    )
}

function LayeredPearlTile() {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const dragRef = useRef({
        pointerId: null,
        startX: 0,
        startY: 0,
        rotateX: 0,
        rotateY: 0,
        zoom: 1,
        isDragging: false
    })
    const isCompact = useCompactPearlMode()
    const pearlRings = useMemo(() => ([
        ...(isCompact ? [
            {count: 28, radiusX: 12, radiusY: 5, size: 14.6, z: 5.9, speed: 12, tilt: -34},
            {count: 33, radiusX: 18, radiusY: 9, size: 13.5, z: 7, speed: -15, tilt: 20},
            {count: 37, radiusX: 24, radiusY: 13, size: 12.6, z: 8.1, speed: 18, tilt: 48},
            {count: 40, radiusX: 30, radiusY: 18, size: 11.4, z: 9.1, speed: -22, tilt: -62},
            {count: 44, radiusX: 36, radiusY: 24, size: 10.4, z: 9.8, speed: 26, tilt: 72},
            {count: 48, radiusX: 42, radiusY: 31, size: 9.5, z: 10.4, speed: -30, tilt: 7}
        ] : [
            {count: 62, radiusX: 11, radiusY: 4, size: 21.1, z: 9.8, speed: 10, tilt: -34},
            {count: 72, radiusX: 17, radiusY: 8, size: 19.5, z: 11.7, speed: -13, tilt: 20},
            {count: 82, radiusX: 23, radiusY: 13, size: 17.9, z: 13.7, speed: 16, tilt: 48},
            {count: 90, radiusX: 29, radiusY: 18, size: 16.4, z: 15.6, speed: -20, tilt: -62},
            {count: 98, radiusX: 35, radiusY: 23, size: 15.2, z: 17.6, speed: 24, tilt: 72},
            {count: 104, radiusX: 40, radiusY: 29, size: 13.3, z: 19.5, speed: -29, tilt: -8},
            {count: 110, radiusX: 45, radiusY: 35, size: 11.9, z: 20.8, speed: 34, tilt: 38},
            {count: 112, radiusX: 49, radiusY: 40, size: 10.8, z: 22, speed: -38, tilt: -78}
        ])
    ]), [isCompact])
    const pearls = useMemo(() => pearlRings.flatMap((ring, ringIndex) => (
        Array.from({length: ring.count}, (_, index) => {
            const angle = (index / ring.count) * Math.PI * 2
            const depth = Math.sin(angle + ringIndex * 0.72)

            return {
                id: `${ringIndex}-${index}`,
                ring: ringIndex,
                radiusX: ring.radiusX,
                radiusY: ring.radiusY,
                size: Math.max(3.5, ring.size + depth * ring.z),
                depth,
                angle,
                speed: ring.speed,
                tilt: ring.tilt,
                wave: Math.sin(angle * 3 + ringIndex) * 27,
                wave2: Math.cos(angle * 5 - ringIndex) * 21,
                phase: angle + ringIndex * 0.91,
                hueShift: ringIndex * 32
            }
        })
    )), [pearlRings])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return undefined

        const context = canvas.getContext("2d", { alpha: true })
        if(!context) return undefined

        let frameId = 0
        let width = 1
        let height = 1
        let pixelRatio = 1
        let resizeObserver = null
        const drawPearls = []
        const getIsLightTheme = () => (
            document.documentElement.getAttribute("data-theme") === "light"
            || document.body.getAttribute("data-theme") === "light"
        )

        const resize = () => {
            const rect = tile.getBoundingClientRect()
            const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
            pixelRatio = Math.min(isCoarsePointer ? 1 : 1.25, Math.max(1, window.devicePixelRatio || 1))
            width = Math.max(1, Math.round(rect.width || tile.clientWidth || 1))
            height = Math.max(1, Math.round(rect.height || tile.clientHeight || width || 1))
            canvas.width = Math.round(width * pixelRatio)
            canvas.height = Math.round(height * pixelRatio)
            canvas.style.width = "100%"
            canvas.style.height = "100%"
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const drawRingGuides = (time, centerX, centerY, zoom, rotateX, rotateY) => {
            context.save()
            context.translate(centerX, centerY)
            context.scale(zoom, zoom)
            context.rotate(rotateY * 0.18 + Math.sin(time * 0.3) * 0.04)
            context.globalAlpha = 0.34
            context.lineWidth = Math.max(0.7, Math.min(width, height) * 0.003)
            for(let index = 0; index < pearlRings.length; index++) {
                const ring = pearlRings[index]
                const rx = width * ring.radiusX * 0.009
                const ry = height * ring.radiusY * 0.009 * (0.72 + Math.cos(rotateX) * 0.28)
                context.beginPath()
                context.strokeStyle = `hsla(${210 + index * 27}, 82%, 78%, ${0.15 + index * 0.012})`
                context.ellipse(0, 0, rx, ry, ring.tilt * Math.PI / 180, 0, Math.PI * 2)
                context.stroke()
            }
            context.restore()
        }

        const render = (now = performance.now()) => {
            const time = now * 0.001
            const drag = dragRef.current
            const zoom = drag.currentZoom ?? drag.zoom ?? 1
            const rotateX = ((drag.currentRotateX ?? drag.rotateX ?? 0) * Math.PI) / 180
            const rotateY = ((drag.currentRotateY ?? drag.rotateY ?? 0) * Math.PI) / 180
            const centerX = width * 0.5
            const centerY = height * 0.5
            const unit = Math.min(width, height)
            const isLightTheme = getIsLightTheme()

            context.clearRect(0, 0, width, height)
            context.fillStyle = isLightTheme ? "rgb(251, 253, 255)" : "rgb(1, 1, 5)"
            context.fillRect(0, 0, width, height)

            const background = context.createRadialGradient(centerX, centerY, unit * 0.08, centerX, centerY, unit * 0.62)
            background.addColorStop(0, isLightTheme ? "rgba(255, 255, 255, 0.72)" : "rgba(147, 197, 253, 0.045)")
            background.addColorStop(0.42, isLightTheme ? "rgba(226, 232, 255, 0.54)" : "rgba(79, 70, 229, 0.025)")
            background.addColorStop(1, "rgba(0, 0, 0, 0)")
            context.fillStyle = background
            context.fillRect(0, 0, width, height)

            drawRingGuides(time, centerX, centerY, zoom, rotateX, rotateY)

            drawPearls.length = 0
            for(const pearl of pearls) {
                const speed = Math.max(6, Math.abs(pearl.speed))
                const direction = pearl.speed >= 0 ? 1 : -1
                const angle = pearl.angle + direction * time * (Math.PI * 2 / speed)
                const tilt = pearl.tilt * Math.PI / 180
                const ringX = Math.cos(angle) * width * pearl.radiusX * 0.009
                const ringY = Math.sin(angle) * height * pearl.radiusY * 0.009
                const cosT = Math.cos(tilt)
                const sinT = Math.sin(tilt)
                const localX = ringX * cosT - ringY * sinT
                const localY = ringX * sinT + ringY * cosT
                const waveX = Math.sin(time * 1.65 + pearl.phase) * pearl.wave * 0.28
                const waveY = Math.cos(time * 1.95 + pearl.phase) * pearl.wave2 * 0.28
                const depth = Math.sin(angle + pearl.ring * 0.72)
                const depthPx = depth * unit * 0.085
                const xRotated = (localX + waveX) * Math.cos(rotateY) + depthPx * Math.sin(rotateY)
                const depthRotated = depthPx * Math.cos(rotateY) - (localX + waveX) * Math.sin(rotateY)
                const yRotated = (localY + waveY) * Math.cos(rotateX) - depthRotated * Math.sin(rotateX)

                drawPearls.push({
                    x: centerX + xRotated * zoom,
                    y: centerY + yRotated * zoom,
                    depth: depthRotated,
                    size: Math.max(2, pearl.size * (0.72 + (depth + 1) * 0.18) * zoom),
                    hue: 205 + pearl.hueShift,
                    alpha: 0.56 + (depth + 1) * 0.18
                })
            }

            drawPearls.sort((a, b) => a.depth - b.depth)
            context.save()
            context.globalCompositeOperation = "screen"
            for(const pearl of drawPearls) {
                const gradient = context.createRadialGradient(
                    pearl.x - pearl.size * 0.28,
                    pearl.y - pearl.size * 0.28,
                    pearl.size * 0.08,
                    pearl.x,
                    pearl.y,
                    pearl.size
                )
                gradient.addColorStop(0, `hsla(${pearl.hue}, 100%, 98%, ${Math.min(1, pearl.alpha + 0.18)})`)
                gradient.addColorStop(0.38, `hsla(${pearl.hue + 18}, 88%, 82%, ${pearl.alpha})`)
                gradient.addColorStop(1, `hsla(${pearl.hue + 58}, 82%, 52%, 0.08)`)
                context.beginPath()
                context.fillStyle = gradient
                context.shadowColor = `hsla(${pearl.hue}, 90%, 72%, 0.42)`
                context.shadowBlur = pearl.size * 0.75
                context.arc(pearl.x, pearl.y, pearl.size, 0, Math.PI * 2)
                context.fill()
            }
            context.restore()

            frameId = window.requestAnimationFrame(render)
        }

        resize()
        if("ResizeObserver" in window) {
            resizeObserver = new ResizeObserver(resize)
            resizeObserver.observe(tile)
        }
        else {
            window.addEventListener("resize", resize, { passive: true })
        }
        frameId = window.requestAnimationFrame(render)

        return () => {
            if(frameId) window.cancelAnimationFrame(frameId)
            resizeObserver?.disconnect()
            if(!resizeObserver) window.removeEventListener("resize", resize)
        }
    }, [pearlRings, pearls])

    const handlePointerDown = (event) => {
        const tile = tileRef.current
        if(!tile) return

        dragRef.current = {
            ...dragRef.current,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY,
            isDragging: false
        }
    }

    const handlePointerMove = (event) => {
        const tile = tileRef.current
        const drag = dragRef.current
        if(!tile || drag.pointerId !== event.pointerId) return

        const dx = event.clientX - drag.startX
        const dy = event.clientY - drag.startY

        if(!drag.isDragging) {
            if(Math.abs(dx) < 8 && Math.abs(dy) < 8) return

            drag.isDragging = true
            tile.setPointerCapture?.(event.pointerId)
        }

        const nextRotateY = Math.max(-42, Math.min(42, drag.rotateY + dx * 0.18))
        const nextRotateX = Math.max(-18, Math.min(18, drag.rotateX - dy * 0.04))
        const nextZoom = Math.max(0.68, Math.min(1.65, drag.zoom - dy * 0.0045))

        drag.currentRotateX = nextRotateX
        drag.currentRotateY = nextRotateY
        drag.currentZoom = nextZoom
    }

    const handlePointerEnd = (event) => {
        const tile = tileRef.current
        const drag = dragRef.current
        if(drag.pointerId !== event.pointerId) return

        dragRef.current = {
            ...drag,
            pointerId: null,
            isDragging: false,
            rotateX: drag.currentRotateX ?? drag.rotateX,
            rotateY: drag.currentRotateY ?? drag.rotateY,
            zoom: drag.currentZoom ?? drag.zoom
        }
        tile?.releasePointerCapture?.(event.pointerId)
    }

    return (
        <div ref={tileRef}
             className={`article-secret-pearls-tile article-secret-pearls-tile-layered-pearl`}
             role={"img"}
             aria-label={"Connected pearl ring web art"}
             onPointerDown={handlePointerDown}
             onPointerMove={handlePointerMove}
             onPointerUp={handlePointerEnd}
             onPointerLeave={handlePointerEnd}
             onPointerCancel={handlePointerEnd}>
            <canvas ref={canvasRef}
                    className={`article-secret-pearls-layered-pearl-canvas`}
                    aria-hidden={true}/>
        </div>
    )
}

export default ArticleSecretPearls
