import "./ArtDecorationBandCanvas.scss"
import React, {useEffect, useRef} from 'react'

const CELL_STEP = 37
const CELL_SIZE = 34
const FRAME_INTERVAL_MS = 1000
const MAX_DEVICE_PIXEL_RATIO = 1.25
const SWAPS_PER_TICK_BASE = 34
const SWAPS_PER_TICK_RANGE = 96
const MAX_SWAP_RADIUS = 3
const BAND_PALETTES = [
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6", "#fbbf24"],
    ["#22c55e", "#59c36a", "#3b82f6", "#60a5fa"],
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6"],
    ["#22d3ee", "#60a5fa", "#a855f7", "#fbbf24"],
    ["#ffffff", "#ff6b81", "#ff0033", "#facc15"],
    ["#38bdf8", "#60a5fa", "#8b5cf6", "#f472b6", "#fbbf24"]
]

function getBandPaletteIndex({ index, type }) {
    if(type === "page-bottom")
        return BAND_PALETTES.length - 1

    if(type === "after-header" || type === "page-top")
        return 0

    const numericIndex = Number(index)
    if(Number.isFinite(numericIndex))
        return Math.max(0, Math.min(BAND_PALETTES.length - 1, numericIndex))

    return 0
}

function getBandPalette(paletteIndex) {
    return BAND_PALETTES[paletteIndex] || BAND_PALETTES[BAND_PALETTES.length - 1]
}

function resizeCanvas(canvas, context) {
    const parent = canvas.parentElement
    if(!parent)
        return null

    const width = Math.max(1, parent.offsetWidth || Math.round(parent.getBoundingClientRect().width) || 1)
    const height = Math.max(1, parent.offsetHeight || Math.round(parent.getBoundingClientRect().height) || 1)
    const pixelRatio = Math.max(1, Math.min(MAX_DEVICE_PIXEL_RATIO, (window.devicePixelRatio || 1) * 0.75))
    const canvasWidth = Math.max(1, Math.round(width * pixelRatio))
    const canvasHeight = Math.max(1, Math.round(height * pixelRatio))

    if(canvas.width !== canvasWidth)
        canvas.width = canvasWidth
    if(canvas.height !== canvasHeight)
        canvas.height = canvasHeight

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    context.imageSmoothingEnabled = false

    return { width, height }
}

function createBandState(width, height, paletteIndex) {
    const columns = Math.max(1, Math.ceil(width / CELL_STEP))
    const rows = Math.max(1, Math.ceil(height / CELL_STEP))

    if(columns * rows < 2)
        return null

    const xOffsets = []
    const yOffsets = []
    let offset = (width - columns * CELL_STEP) / 2
    for(let x = 0; x < columns; ++x)
        xOffsets[x] = offset + x * CELL_STEP

    offset = (height - rows * CELL_STEP) / 2
    for(let y = 0; y < rows; ++y)
        yOffsets[y] = offset + y * CELL_STEP

    const palette = getBandPalette(paletteIndex)
    const cells = []
    for(let y = 0; y < rows; ++y) {
        cells[y] = []
        for(let x = 0; x < columns; ++x) {
            const seed = (x + y * 2 + paletteIndex) % palette.length
            cells[y][x] = palette[seed]
        }
    }

    return {
        width,
        height,
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
    const x = bandState.xOffsets[cellX]
    const y = bandState.yOffsets[cellY]

    context.fillStyle = paint.fill
    context.fillRect(x, y, CELL_SIZE, CELL_SIZE)

    context.strokeStyle = paint.stroke
    context.lineWidth = 1
    context.strokeRect(x + 0.5, y + 0.5, CELL_SIZE - 1, CELL_SIZE - 1)
}

function drawBand(context, bandState, isLightMode) {
    context.clearRect(0, 0, bandState.width, bandState.height)

    for(let y = 0; y < bandState.rows; ++y) {
        for(let x = 0; x < bandState.columns; ++x)
            drawCell(context, bandState, x, y, isLightMode)
    }
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

function ArtDecorationBandCanvas({ index = null, type }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const band = canvas?.parentElement
        if(!canvas || !band)
            return

        const context = canvas.getContext("2d", {alpha: true, desynchronized: true})
        if(!context)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let bandState = null
        let dimensions = null
        let lastFrameTime = 0
        let isIntersecting = false
        const paletteIndex = getBandPaletteIndex({ index, type })
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const shouldAnimate = () => isIntersecting && !document.hidden && !isReducedMotion()

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const drawStatic = () => {
            if(!bandState)
                return

            drawBand(context, bandState, getIsLightMode())
        }

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                drawStatic()
                return
            }

            if(bandState && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                const swapCount = Math.max(
                    1,
                    Math.min(
                        bandState.columns * bandState.rows,
                        Math.floor(SWAPS_PER_TICK_BASE + Math.random() * SWAPS_PER_TICK_RANGE)
                    )
                )
                const dirtyCells = []
                const isLightMode = getIsLightMode()

                for(let i = 0; i < swapCount; ++i) {
                    const {fromX, fromY, toX, toY} = pickSwapTarget(bandState)
                    ;[bandState.cells[fromY][fromX], bandState.cells[toY][toX]] =
                        [bandState.cells[toY][toX], bandState.cells[fromY][fromX]]
                    dirtyCells.push([fromX, fromY], [toX, toY])
                }

                for(const [cellX, cellY] of dirtyCells)
                    drawCell(context, bandState, cellX, cellY, isLightMode)
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
            const nextDimensions = resizeCanvas(canvas, context)
            if(!nextDimensions)
                return

            const changed = !dimensions ||
                dimensions.width !== nextDimensions.width ||
                dimensions.height !== nextDimensions.height

            dimensions = nextDimensions
            if(changed || !bandState) {
                bandState = createBandState(dimensions.width, dimensions.height, paletteIndex)
                lastFrameTime = 0
            }

            drawStatic()
            startLoop()
        }

        const scheduleRebuild = () => {
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

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
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(drawStatic)
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isIntersecting = entries.some(entry => entry.isIntersecting)
            if(isIntersecting) startLoop()
            else stopLoop()
        }, {rootMargin: "160px"})

        resizeObserver?.observe(band)
        themeObserver?.observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]})
        intersectionObserver?.observe(band)
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
            resizeObserver?.disconnect()
            themeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
            window.removeEventListener("orientationchange", scheduleRebuild)
            window.visualViewport?.removeEventListener("resize", scheduleRebuild)
            document.removeEventListener("visibilitychange", handleVisibilityChange)
            reducedMotionQuery?.removeEventListener?.("change", scheduleRebuild)
        }
    }, [index, type])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-band-canvas-art"
            aria-hidden={true}
        />
    )
}

export default ArtDecorationBandCanvas
