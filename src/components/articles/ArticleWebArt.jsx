import "./ArticleWebArt.scss"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import {createEmbroideryEngine} from "./webArt/embroideryEngine.js"
import {createSpiralDotsEngine} from "./webArt/spiralDotsEngine.js"
import {createGridWaveEngine} from "./webArt/gridWaveEngine.js"
import {createOrbitCirclesEngine} from "./webArt/orbitCirclesEngine.js"

function ArticleWebArt({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const items = dataWrapper.orderedItems.slice(0, 6)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-web-art`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <div className={`article-web-art-items`}>
                {items.map((itemWrapper, index) => (
                    <WebArtTile itemWrapper={itemWrapper}
                                index={index}
                                key={itemWrapper.uniqueId}/>
                ))}
            </div>
        </Article>
    )
}

function WebArtTile({ itemWrapper, index }) {
    if(Number(itemWrapper.id) === 1) {
        return <SpiralDotsTile itemWrapper={itemWrapper} index={index}/>
    }

    if(Number(itemWrapper.id) === 2) {
        return <GridWaveTile itemWrapper={itemWrapper} index={index}/>
    }

    if(Number(itemWrapper.id) === 3) {
        return <ThreeTunnelTile itemWrapper={itemWrapper} index={index}/>
    }

    if(Number(itemWrapper.id) === 4) {
        return <ThreePolygonDemo5Tile itemWrapper={itemWrapper} index={index}/>
    }

    if(Number(itemWrapper.id) === 6) {
        return <OrbitCirclesTile itemWrapper={itemWrapper} index={index}/>
    }

    return <EmbroideryTile itemWrapper={itemWrapper} index={index}/>
}

function EmbroideryTile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)

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
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        const engine = createEmbroideryEngine(canvas, config)
        engineRef.current = engine

        const updateSize = () => {
            const rect = tile.getBoundingClientRect()
            engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
        }

        updateSize()
        engine.renderStatic?.()

        const ro = new ResizeObserver(() => {
            updateSize()
            engine.renderStatic?.()
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

        return () => {
            io?.disconnect()
            ro.disconnect()
            engine.destroy()
            engineRef.current = null
        }
    }, [config])

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
                onClick={_restart}
                onMouseEnter={_start}
                onMouseLeave={_stop}
                onFocus={_start}
                onBlur={_stop}
                onKeyDown={onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                {index + 1}
            </span>
        </button>
    )
}

function SpiralDotsTile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)

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
            dotsMaxEscapeRouteLength: 120
        }
    }, [itemWrapper.id, reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        const engine = createSpiralDotsEngine(canvas, config)
        engineRef.current = engine

        const updateSize = () => {
            const rect = tile.getBoundingClientRect()
            engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
        }

        updateSize()

        const ro = new ResizeObserver(() => {
            updateSize()
            engine.rebuildDots()
        })
        ro.observe(tile)

        return () => {
            ro.disconnect()
            engine.destroy()
            engineRef.current = null
        }
    }, [config])

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
             tabIndex={0}
             aria-label={`Spiral dots web art tile ${index + 1}`}
             onMouseEnter={onMouseEnter}
             onMouseLeave={onMouseLeave}
             onMouseMove={onMouseMove}
             onFocus={onFocus}
             onBlur={onBlur}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Hover
            </span>
        </div>
    )
}

function GridWaveTile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)

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
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        const engine = createGridWaveEngine(canvas, config)
        engineRef.current = engine

        const updateSize = () => {
            const rect = tile.getBoundingClientRect()
            engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
        }

        updateSize()
        engine.renderStatic?.()

        const ro = new ResizeObserver(() => {
            updateSize()
            engine.renderStatic?.()
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

        return () => {
            io?.disconnect()
            ro.disconnect()
            engine.destroy()
            engineRef.current = null
        }
    }, [config])

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
                onClick={_ripple}
                onMouseEnter={_start}
                onMouseLeave={_stop}
                onFocus={_start}
                onBlur={_stop}
                onKeyDown={onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Wave
            </span>
        </button>
    )
}

function ThreeTunnelTile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            ringCount: 11,
            cubesPerRing: 12,
            ringSpacing: 82,
            tunnelRadius: 58,
            speed: 4.6,
            exposure: 1.45
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let engine = null

        const load = async () => {
            const mod = await import("./webArt/threeTunnelEngine.js")
            if(canceled) return
            engine = mod.createThreeTunnelEngine(canvas, config)
            engineRef.current = engine

            const updateSize = () => {
                const rect = tile.getBoundingClientRect()
                engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
            }

            updateSize()
            engine.reset()

            const ro = new ResizeObserver(() => {
                updateSize()
                engine.reset()
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

            const cleanup = () => {
                io?.disconnect()
                ro.disconnect()
                engine.destroy()
                engineRef.current = null
            }

            return cleanup
        }

        let cleanup = null
        load().then((fn) => {
            cleanup = fn || null
        })

        return () => {
            canceled = true
            cleanup?.()
        }
    }, [config])

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
                onClick={_restart}
                onMouseEnter={_start}
                onMouseLeave={_stop}
                onFocus={_start}
                onBlur={_stop}
                onKeyDown={onKeyDown}>
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

function ThreePolygonDemo5Tile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)

    const reduceMotion = useMemo(() => {
        if(typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    const config = useMemo(() => {
        return {
            reduceMotion,
            nbObjects: 25,
            animationDuration: 7,
            animationDelay: 0.1,
            cameraZ: 75
        }
    }, [reduceMotion])

    useEffect(() => {
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        let canceled = false
        let cleanup = null

        const load = async () => {
            const mod = await import("./webArt/threePolygonDemo5Engine.js")
            if(canceled) return

            const engine = mod.createThreePolygonDemo5Engine(canvas, config)
            engineRef.current = engine

            const updateSize = () => {
                const rect = tile.getBoundingClientRect()
                engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
            }

            updateSize()
            engine.reset()

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

        load()

        return () => {
            canceled = true
            cleanup?.()
        }
    }, [config])

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
                onClick={_restart}
                onKeyDown={onKeyDown}
                onMouseEnter={() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                }}
                onMouseLeave={() => {
                    hoverRef.current = false
                    engineRef.current?.stop()
                }}
                onFocus={() => {
                    hoverRef.current = true
                    if(visibleRef.current) engineRef.current?.start()
                }}
                onBlur={() => {
                    hoverRef.current = false
                    engineRef.current?.stop()
                }}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Poly
            </span>
        </button>
    )
}

function OrbitCirclesTile({ itemWrapper, index }) {
    const tileRef = useRef(null)
    const canvasRef = useRef(null)
    const engineRef = useRef(null)
    const hoverRef = useRef(false)
    const visibleRef = useRef(true)

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
        const tile = tileRef.current
        const canvas = canvasRef.current
        if(!tile || !canvas) return

        const engine = createOrbitCirclesEngine(canvas, config)
        engineRef.current = engine

        const updateSize = () => {
            const rect = tile.getBoundingClientRect()
            engine.setSize(rect.width, rect.height, window.devicePixelRatio || 1)
        }

        updateSize()
        engine.reset()

        const ro = new ResizeObserver(() => {
            updateSize()
            engine.renderStatic?.()
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

        return () => {
            io?.disconnect()
            ro.disconnect()
            engine.destroy()
            engineRef.current = null
        }
    }, [config])

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
                onClick={_restart}
                onMouseEnter={_start}
                onMouseLeave={_stop}
                onFocus={_start}
                onBlur={_stop}
                onKeyDown={onKeyDown}>
            <canvas ref={canvasRef}
                    className={`article-web-art-canvas`}/>
            <span className={`article-web-art-tile-label`}>
                Orbit
            </span>
        </button>
    )
}

export default ArticleWebArt
