import "./ArtDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const CELL_STEP = 37
const CELL_SIZE = 34
const FRAME_INTERVAL_MS = 1000
const MAX_DEVICE_PIXEL_RATIO = 1.25
const SWAPS_PER_TICK_BASE = 220
const SWAPS_PER_TICK_RANGE = 520
const MAX_SWAP_RADIUS = 3
const BAND_PALETTES = [
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6", "#fbbf24"],
    ["#22c55e", "#59c36a", "#3b82f6", "#60a5fa"],
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6"],
    ["#22d3ee", "#60a5fa", "#a855f7", "#fbbf24"],
    ["#ffffff", "#ff6b81", "#ff0033", "#facc15"],
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6", "#fbbf24"]
]

function measureLayout(canvas) {
    const wrapper = canvas?.parentElement
    if(!wrapper)
        return null

    const wrapperRect = wrapper.getBoundingClientRect()
    const scale = wrapper.offsetWidth > 0 ? wrapperRect.width / wrapper.offsetWidth : 1
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1
    const bandRects = Array.from(wrapper.querySelectorAll(".section-decoration-band"))
        .map((band) => {
            const rect = band.getBoundingClientRect()
            return {
                x: (rect.left - wrapperRect.left) / safeScale,
                y: (rect.top - wrapperRect.top) / safeScale,
                width: rect.width / safeScale,
                height: rect.height / safeScale
            }
        })
        .filter(rect => rect.width > 0 && rect.height > 0)

    if(bandRects.length === 0)
        return null

    const left = bandRects[0].x
    const width = bandRects[0].width
    const height = Math.max(...bandRects.map(rect => rect.y + rect.height))

    return {
        left,
        width,
        height,
        bands: bandRects.map(rect => ({
            x: rect.x - left,
            y: rect.y,
            width: rect.width,
            height: rect.height
        }))
    }
}

function layoutsMatch(a, b) {
    if(!a || !b)
        return false

    if(a.width !== b.width || a.height !== b.height || a.left !== b.left)
        return false

    if(a.bands.length !== b.bands.length)
        return false

    for(let i = 0; i < a.bands.length; ++i) {
        const bandA = a.bands[i]
        const bandB = b.bands[i]
        if(
            bandA.x !== bandB.x ||
            bandA.y !== bandB.y ||
            bandA.width !== bandB.width ||
            bandA.height !== bandB.height
        )
            return false
    }

    return true
}

function resizeCanvas(canvas, context, layout) {
    const pixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
    const width = Math.max(1, Math.round(layout.width * pixelRatio))
    const height = Math.max(1, Math.round(layout.height * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.top = "0px"
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.height}px`

    if(canvas.width !== width)
        canvas.width = width
    if(canvas.height !== height)
        canvas.height = height

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    context.imageSmoothingEnabled = false
}

function getBandPalette(index) {
    return BAND_PALETTES[index] || BAND_PALETTES[BAND_PALETTES.length - 1]
}

function createBandState(band, index) {
    const columns = Math.max(1, Math.ceil(band.width / CELL_STEP))
    const rows = Math.max(1, Math.ceil(band.height / CELL_STEP))

    if(columns * rows < 2)
        return null

    const xOffsets = []
    const yOffsets = []
    let offset = (band.width - columns * CELL_STEP) / 2
    for(let x = 0; x < columns; ++x)
        xOffsets[x] = offset + x * CELL_STEP

    offset = (band.height - rows * CELL_STEP) / 2
    for(let y = 0; y < rows; ++y)
        yOffsets[y] = offset + y * CELL_STEP

    const palette = getBandPalette(index)
    const cells = []
    for(let y = 0; y < rows; ++y) {
        cells[y] = []
        for(let x = 0; x < columns; ++x) {
            const seed = (x + y * 2 + index) % palette.length
            cells[y][x] = palette[seed]
        }
    }

    return {
        index,
        x: band.x,
        y: band.y,
        width: band.width,
        height: band.height,
        columns,
        rows,
        xOffsets,
        yOffsets,
        cells,
        palette
    }
}

function getTilePaint(color, isLightMode) {
    if(isLightMode) {
        return {
            fill: color,
            stroke: "rgba(255, 255, 255, 0.28)"
        }
    }

    return {
        fill: color,
        stroke: "rgba(255, 255, 255, 0.18)"
    }
}

function drawCell(context, bandState, cellX, cellY, isLightMode) {
    const color = bandState.cells[cellY][cellX]
    const paint = getTilePaint(color, isLightMode)
    const x = bandState.x + bandState.xOffsets[cellX]
    const y = bandState.y + bandState.yOffsets[cellY]

    context.fillStyle = paint.fill
    context.fillRect(x, y, CELL_SIZE, CELL_SIZE)

    context.strokeStyle = paint.stroke
    context.lineWidth = 1
    context.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1)
}

function drawBand(context, bandState, isLightMode) {
    context.save()
    context.beginPath()
    context.rect(bandState.x, bandState.y, bandState.width, bandState.height)
    context.clip()

    for(let y = 0; y < bandState.rows; ++y) {
        for(let x = 0; x < bandState.columns; ++x)
            drawCell(context, bandState, x, y, isLightMode)
    }

    context.restore()
}

function getIsLightMode() {
    return document.documentElement.getAttribute("data-theme") === "light"
}

function pickSwapTarget(bandState) {
    const fromX = Math.floor(Math.random() * bandState.columns)
    const fromY = Math.floor(Math.random() * bandState.rows)
    const radius = Math.max(1, Math.floor(Math.random() * MAX_SWAP_RADIUS) + 1)

    let toX = fromX
    let toY = fromY

    while(toX === fromX && toY === fromY) {
        toX = fromX + Math.floor(Math.random() * (radius * 2 + 1)) - radius
        toY = fromY + Math.floor(Math.random() * (radius * 2 + 1)) - radius
    }

    toX = Math.max(0, Math.min(bandState.columns - 1, toX))
    toY = Math.max(0, Math.min(bandState.rows - 1, toY))

    return {fromX, fromY, toX, toY}
}

function ArtDecorationCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        const context = canvas.getContext("2d", {alpha: true, desynchronized: true})
        if(!context)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let rebuildRetryTimeoutId = null
        let bandStates = []
        let layout = null
        let lastFrameTime = 0
        let isIntersecting = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const shouldAnimate = () => isIntersecting && !document.hidden && !isReducedMotion()

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const clearRebuildRetry = () => {
            if(rebuildRetryTimeoutId !== null) {
                window.clearTimeout(rebuildRetryTimeoutId)
                rebuildRetryTimeoutId = null
            }
        }

        const queueRebuildRetry = () => {
            if(rebuildRetryTimeoutId !== null)
                return

            rebuildRetryTimeoutId = window.setTimeout(() => {
                rebuildRetryTimeoutId = null
                scheduleRebuild()
            }, 160)
        }

        const drawStatic = () => {
            if(!layout || bandStates.length === 0)
                return

            const isLightMode = getIsLightMode()
            context.clearRect(0, 0, layout.width, layout.height)
            for(const bandState of bandStates)
                drawBand(context, bandState, isLightMode)
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(layout && bandStates.length > 0 && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                const isLightMode = getIsLightMode()

                for(const bandState of bandStates) {
                    const swapsPerBand = Math.max(
                        1,
                        Math.floor((SWAPS_PER_TICK_BASE + Math.random() * SWAPS_PER_TICK_RANGE) / bandStates.length)
                    )
                    const dirtyCells = []

                    context.save()
                    context.beginPath()
                    context.rect(bandState.x, bandState.y, bandState.width, bandState.height)
                    context.clip()

                    for(let i = 0; i < swapsPerBand; ++i) {
                        const {fromX, fromY, toX, toY} = pickSwapTarget(bandState)
                        ;[bandState.cells[fromY][fromX], bandState.cells[toY][toX]] =
                            [bandState.cells[toY][toX], bandState.cells[fromY][fromX]]
                        dirtyCells.push([fromX, fromY], [toX, toY])
                    }

                    for(const [cellX, cellY] of dirtyCells)
                        drawCell(context, bandState, cellX, cellY, isLightMode)

                    context.restore()
                }
            }

            animationFrameId = window.requestAnimationFrame(step)
        }

        const startLoop = () => {
            if(!shouldAnimate()) {
                drawStatic()
                return
            }

            if(animationFrameId === null)
                animationFrameId = window.requestAnimationFrame(step)
        }

        const rebuild = () => {
            const nextLayout = measureLayout(canvas)
            if(!nextLayout) {
                queueRebuildRetry()
                return
            }

            const layoutChanged = !layoutsMatch(layout, nextLayout)
            layout = nextLayout
            resizeCanvas(canvas, context, layout)

            if(layoutChanged || bandStates.length === 0) {
                bandStates = layout.bands.map((band, index) => createBandState(band, index)).filter(Boolean)
            }

            if(bandStates.length === 0) {
                queueRebuildRetry()
                return
            }

            clearRebuildRetry()
            if(layoutChanged)
                lastFrameTime = 0
            drawStatic()
            startLoop()
        }

        const scheduleRebuild = () => {
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)
            clearRebuildRetry()

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null
                rebuild()
            })
        }

        const handleVisibilityChange = () => {
            if(document.hidden) {
                stopLoop()
                return
            }

            startLoop()
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(drawStatic)
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isIntersecting = entries.some(entry => entry.isIntersecting)
            if(isIntersecting) startLoop()
            else stopLoop()
        }, {rootMargin: "160px"})

        resizeObserver?.observe(wrapper)
        mutationObserver?.observe(wrapper, {childList: true})
        const sectionBody = wrapper.querySelector(".section-body")
        if(sectionBody)
            mutationObserver?.observe(sectionBody, {childList: true})
        themeObserver?.observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]})
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild, {passive: true})
        window.addEventListener("orientationchange", scheduleRebuild, {passive: true})
        window.visualViewport?.addEventListener("resize", scheduleRebuild, {passive: true})
        document.addEventListener("visibilitychange", handleVisibilityChange)
        reducedMotionQuery?.addEventListener?.("change", scheduleRebuild)

        rebuild()

        if(!intersectionObserver) {
            isIntersecting = true
            startLoop()
        }

        return () => {
            stopLoop()
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)
            clearRebuildRetry()
            resizeObserver?.disconnect()
            mutationObserver?.disconnect()
            themeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            window.removeEventListener("orientationchange", scheduleRebuild)
            window.visualViewport?.removeEventListener("resize", scheduleRebuild)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-canvas section-decoration-canvas-art"
            aria-hidden={true}
        />
    )
}

export default ArtDecorationCanvas
