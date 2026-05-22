import "./ArticleSecretPearls.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import Article from "./base/Article.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function ArticleSecretPearls({ dataWrapper }) {
    const language = useLanguage()
    const selectedLanguageId = language.selectedLanguageId || "en"
    const [isRevealed, setIsRevealed] = useState(false)
    const items = dataWrapper.orderedItems.slice(0, 4)
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
                        {items.map((itemWrapper, index) => (
                            index === 0 ? (
                                <SacredPearlTile key={itemWrapper.uniqueId}
                                                 itemWrapper={itemWrapper}/>
                            ) : index === 1 ? (
                                <BluePearlTile key={itemWrapper.uniqueId}
                                              itemWrapper={itemWrapper}/>
                            ) : index === 2 ? (
                                <PearlUniverseTile key={itemWrapper.uniqueId}
                                                   itemWrapper={itemWrapper}/>
                            ) : index === 3 ? (
                                <LayeredPearlTile key={itemWrapper.uniqueId}
                                                  itemWrapper={itemWrapper}/>
                            ) : (
                                <SecretPearlPlaceholderTile key={itemWrapper.uniqueId}
                                                           itemWrapper={itemWrapper}
                                                           index={index}/>
                            )
                        ))}
                    </div>

                    <div className={`article-secret-pearls-footer`}>
                        <StandardButton variant={`contrast`}
                                        className={`article-secret-pearls-show-less-button`}
                                        type={"button"}
                                        faIcon={`fa-solid fa-caret-up`}
                                        label={showLessLabel}
                                        tooltip={showLessLabel}
                                        size={StandardButton.Size.LARGE}
                                        onClick={() => setIsRevealed(false)}/>
                    </div>
                </div>
            )}
        </Article>
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

function SacredPearlTile({ itemWrapper }) {
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
        vaporParticleCount: 1800,
        floralPointCount: 1600,
        petalLayerCount: 7,
        rootsAmount: 12,
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
            <div className={`article-secret-pearls-sacred-pearl-shade`} aria-hidden={true}/>
            <span className={`article-secret-pearls-sacred-pearl-title`}>
                {itemWrapper.locales.title || "Sacred Pearl"}
            </span>
        </div>
    )
}

function BluePearlTile({ itemWrapper }) {
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
        particleCount: 70,
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
            <span className={`article-secret-pearls-blue-pearl-title`}>
                {itemWrapper.locales.title || "Pearl 2"}
            </span>
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

function PearlUniverseTile({ itemWrapper }) {
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
            <span className={`article-secret-pearls-universe-title`}>
                {itemWrapper.locales.title || "Pearl Universe"}
            </span>
        </div>
    )
}

function LayeredPearlTile({ itemWrapper }) {
    const tileRef = useRef(null)
    const dragRef = useRef({
        pointerId: null,
        startX: 0,
        startY: 0,
        rotateX: 0,
        rotateY: 0
    })
    const [dragStyle, setDragStyle] = useState({
        "--pearl-field-rotate-x": "0deg",
        "--pearl-field-rotate-y": "0deg"
    })
    const pearlRings = useMemo(() => ([
        {count: 112, radiusX: 14, radiusY: 5, size: 16.2, z: 7.5, speed: 10, tilt: -34},
        {count: 128, radiusX: 21, radiusY: 10, size: 15, z: 9, speed: -13, tilt: 20},
        {count: 144, radiusX: 28, radiusY: 16, size: 13.8, z: 10.5, speed: 16, tilt: 48},
        {count: 160, radiusX: 35, radiusY: 22, size: 12.6, z: 12, speed: -20, tilt: -62},
        {count: 176, radiusX: 41, radiusY: 29, size: 11.7, z: 13.5, speed: 24, tilt: 72},
        {count: 192, radiusX: 46, radiusY: 36, size: 10.2, z: 15, speed: -29, tilt: -8}
    ]), [])
    const pearls = useMemo(() => pearlRings.flatMap((ring, ringIndex) => (
        Array.from({length: ring.count}, (_, index) => {
            const angle = (index / ring.count) * Math.PI * 2
            const depth = Math.sin(angle + ringIndex * 0.72)

            return {
                id: `${ringIndex}-${index}`,
                ring: ringIndex,
                x: 50 + Math.cos(angle) * ring.radiusX,
                y: 50 + Math.sin(angle) * ring.radiusY,
                size: Math.max(3.5, ring.size + depth * ring.z),
                depth,
                angle: `${angle}rad`,
                speed: `${ring.speed}s`,
                delay: `${-(index / ring.count) * Math.abs(ring.speed)}s`,
                tilt: `${ring.tilt}deg`,
                wave: Math.sin(angle * 3 + ringIndex) * 18,
                wave2: Math.cos(angle * 5 - ringIndex) * 14
            }
        })
    )), [pearlRings])

    const handlePointerDown = (event) => {
        const tile = tileRef.current
        if(!tile) return

        dragRef.current = {
            ...dragRef.current,
            pointerId: event.pointerId,
            startX: event.clientX,
            startY: event.clientY
        }
        tile.setPointerCapture?.(event.pointerId)
    }

    const handlePointerMove = (event) => {
        const drag = dragRef.current
        if(drag.pointerId !== event.pointerId) return

        const dx = event.clientX - drag.startX
        const dy = event.clientY - drag.startY
        const nextRotateY = Math.max(-42, Math.min(42, drag.rotateY + dx * 0.18))
        const nextRotateX = Math.max(-36, Math.min(36, drag.rotateX - dy * 0.18))

        setDragStyle({
            "--pearl-field-rotate-x": `${nextRotateX}deg`,
            "--pearl-field-rotate-y": `${nextRotateY}deg`
        })
    }

    const handlePointerEnd = (event) => {
        const tile = tileRef.current
        const drag = dragRef.current
        if(drag.pointerId !== event.pointerId) return

        dragRef.current = {
            ...drag,
            pointerId: null,
            rotateX: Number.parseFloat(dragStyle["--pearl-field-rotate-x"]) || 0,
            rotateY: Number.parseFloat(dragStyle["--pearl-field-rotate-y"]) || 0
        }
        tile?.releasePointerCapture?.(event.pointerId)
    }

    return (
        <div ref={tileRef}
             className={`article-secret-pearls-tile article-secret-pearls-tile-layered-pearl`}
             style={dragStyle}
             role={"img"}
             aria-label={"Connected pearl ring web art"}
             onPointerDown={handlePointerDown}
             onPointerMove={handlePointerMove}
             onPointerUp={handlePointerEnd}
             onPointerCancel={handlePointerEnd}>
            <div className={`article-secret-pearls-layered-pearl-field`} aria-hidden={true}>
                <div className={`article-secret-pearls-universe-rings article-secret-pearls-layered-pearl-rings`}/>
                <div className={`article-secret-pearls-universe-orbit`}/>
                {pearls.map((pearl) => (
                    <span key={pearl.id}
                          className={`article-secret-pearls-universe-drop article-secret-pearls-universe-drop-ring-${pearl.ring}`}
                          style={{
                              "--pearl-x": `${pearl.x}%`,
                              "--pearl-y": `${pearl.y}%`,
                              "--pearl-size": `${pearl.size}px`,
                              "--pearl-delay": pearl.delay,
                              "--pearl-depth": pearl.depth,
                              "--pearl-angle": pearl.angle,
                              "--pearl-speed": pearl.speed,
                              "--pearl-tilt": pearl.tilt,
                              "--pearl-wave": `${pearl.wave}px`,
                              "--pearl-wave-neg": `${pearl.wave * -0.8}px`,
                              "--pearl-wave-strong": `${pearl.wave * 1.15}px`,
                              "--pearl-wave-reverse": `${pearl.wave * -1.2}px`,
                              "--pearl-wave-2": `${pearl.wave2}px`,
                              "--pearl-wave-2-strong": `${pearl.wave2 * 1.3}px`,
                              "--pearl-wave-2-reverse": `${pearl.wave2 * -0.75}px`
                          }}/>
                ))}
            </div>
            <span className={`article-secret-pearls-layered-pearl-title`}>
                {itemWrapper.locales.title || "Pearl Rings"}
            </span>
        </div>
    )
}

export default ArticleSecretPearls
