import "./SoftwareSectionDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const FRAME_INTERVAL_MS = 42
const REDUCED_MOTION_FRAME_INTERVAL_MS = 220
const MAX_DEVICE_PIXEL_RATIO = 2
const SOFTWARE_RAIN_CHARS = [
    ..."アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
    ..."0123456789",
    ..."<>[]{}#@$%&*+=?/\\|"
]

function getRandomInt(from, to) {
    return Math.floor(Math.random() * (to - from + 1)) + from
}

function getRandomChar() {
    return SOFTWARE_RAIN_CHARS[getRandomInt(0, SOFTWARE_RAIN_CHARS.length - 1)]
}

function getVisibleCellSize() {
    if(typeof window === "undefined")
        return 18

    const vmax = Math.max(window.innerWidth, window.innerHeight) / 100
    return Math.max(14, Math.min(26, vmax * 2))
}

function createColumns(width, height, cellSize) {
    const columnSpacing = cellSize * 0.58
    const columnCount = Math.max(1, Math.ceil(width / columnSpacing))
    const rowCount = Math.max(1, Math.ceil(height / cellSize))

    return Array.from({ length: columnCount }, (_, columnIndex) => ({
        x: columnIndex * columnSpacing,
        y: getRandomInt(-rowCount, rowCount) * cellSize,
        delay: getRandomInt(14, 72),
        elapsed: getRandomInt(0, 72),
        trailSize: getRandomInt(18, 46),
        chars: Array.from({ length: rowCount + 54 }, getRandomChar)
    }))
}

function measureLayer(canvas) {
    const wrapper = canvas?.parentElement
    if(!wrapper)
        return null

    const wrapperRect = wrapper.getBoundingClientRect()
    const scale = wrapper.offsetWidth > 0 ? wrapperRect.width / wrapper.offsetWidth : 1
    const safeScale = Number.isFinite(scale) && scale > 0 ? scale : 1
    const bandElements = Array.from(wrapper.querySelectorAll(".section-decoration-band"))
    const bandRects = bandElements
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

    const firstBand = bandRects[0]
    const layerLeft = firstBand.x
    const layerWidth = firstBand.width
    const layerHeight = Math.max(
        wrapper.scrollHeight,
        ...bandRects.map(rect => rect.y + rect.height)
    )

    return {
        scale: safeScale,
        left: layerLeft,
        width: layerWidth,
        height: layerHeight,
        bands: bandRects.map(rect => ({
            x: rect.x - layerLeft,
            y: rect.y,
            width: rect.width,
            height: rect.height
        }))
    }
}

function resizeCanvas(canvas, layout) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO)
    const pixelWidth = Math.max(1, Math.round(layout.width * pixelRatio))
    const pixelHeight = Math.max(1, Math.round(layout.height * pixelRatio))

    canvas.style.left = `${layout.left}px`
    canvas.style.width = `${layout.width}px`
    canvas.style.height = `${layout.height}px`

    if(canvas.width !== pixelWidth)
        canvas.width = pixelWidth
    if(canvas.height !== pixelHeight)
        canvas.height = pixelHeight

    const context = canvas.getContext("2d", { alpha: true })
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    return context
}

function drawBandClippedRain(context, layout, columns, cellSize) {
    context.clearRect(0, 0, layout.width, layout.height)

    const bandBackground = document.documentElement.getAttribute("data-theme") === "light" ? "#fff" : "#000"
    context.fillStyle = bandBackground
    for(const band of layout.bands) {
        context.fillRect(band.x, band.y, band.width, band.height)
    }

    context.save()
    context.beginPath()
    for(const band of layout.bands) {
        context.rect(band.x, band.y, band.width, band.height)
    }
    context.clip()

    context.font = `${cellSize}px "Helvetica Neue", Helvetica, Arial, sans-serif`
    context.textAlign = "center"
    context.textBaseline = "top"

    for(const column of columns) {
        for(let trailIndex = 0; trailIndex < column.trailSize; trailIndex++) {
            const y = column.y - trailIndex * cellSize
            if(y < -cellSize || y > layout.height + cellSize)
                continue

            const charIndex = Math.abs(Math.floor(y / cellSize)) % column.chars.length
            const lightness = trailIndex === 0 ? 88 : Math.max(26, 82 - trailIndex * 1.45)
            context.fillStyle = `hsl(136, 100%, ${lightness}%)`
            context.shadowBlur = trailIndex === 0 ? 10 : 0
            context.shadowColor = trailIndex === 0 ? "#9bff9b" : "transparent"
            context.fillText(column.chars[charIndex], column.x + cellSize / 2, y)
        }
    }

    context.restore()
}

function SoftwareSectionDecorationCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        let animationFrameId = null
        let layout = null
        let context = null
        let columns = []
        let cellSize = 18
        let lastFrameTime = 0
        let isVisible = true
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        const rebuild = () => {
            const nextLayout = measureLayer(canvas)
            if(!nextLayout)
                return

            layout = nextLayout
            context = resizeCanvas(canvas, layout)
            cellSize = getVisibleCellSize() / layout.scale
            columns = createColumns(layout.width, layout.height, cellSize)
            drawBandClippedRain(context, layout, columns, cellSize)
        }

        const step = (timestamp) => {
            const frameInterval = reducedMotionQuery?.matches ? REDUCED_MOTION_FRAME_INTERVAL_MS : FRAME_INTERVAL_MS
            if(isVisible && context && layout && timestamp - lastFrameTime >= frameInterval) {
                const delta = timestamp - lastFrameTime
                lastFrameTime = timestamp

                for(const column of columns) {
                    column.elapsed += delta
                    if(column.elapsed < column.delay)
                        continue

                    column.elapsed = 0
                    column.y += cellSize
                    if(column.y - column.trailSize * cellSize > layout.height) {
                        column.y = getRandomInt(-24, 0) * cellSize
                        column.trailSize = getRandomInt(18, 46)
                    }
                    if(Math.random() < 0.28) {
                        const charIndex = Math.abs(Math.floor(column.y / cellSize)) % column.chars.length
                        column.chars[charIndex] = getRandomChar()
                    }
                }

                drawBandClippedRain(context, layout, columns, cellSize)
            }

            animationFrameId = window.requestAnimationFrame(step)
        }

        let rebuildFrameId = null
        const scheduleRebuild = () => {
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null
                rebuild()
            })
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isVisible = entries.some(entry => entry.isIntersecting)
        }, { rootMargin: "180px" })

        resizeObserver?.observe(wrapper)
        mutationObserver?.observe(wrapper, { childList: true, subtree: true })
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild)

        rebuild()
        animationFrameId = window.requestAnimationFrame(step)

        return () => {
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)
            resizeObserver?.disconnect()
            mutationObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="section-decoration-canvas section-decoration-canvas-software"
            aria-hidden={true}
        />
    )
}

export default SoftwareSectionDecorationCanvas
