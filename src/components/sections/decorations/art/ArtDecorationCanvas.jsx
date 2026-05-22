import "./ArtDecorationCanvas.scss"
import React, {useEffect, useRef} from 'react'

const CELL_STEP = 14
const CELL_SIZE = 13
const ANIMATION_DURATION_MS = 10000
const MIN_EXCHANGES_PER_TICK = 120
const MAX_EXCHANGES_PER_TICK = 2400
const MAX_SWAP_RADIUS = 7
const FRAME_INTERVAL_MS = 16
const MAX_DEVICE_PIXEL_RATIO = 1.15

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

    return pixelRatio
}

function createBandState(band) {
    const nbx = Math.max(1, Math.ceil(band.width / CELL_STEP))
    const nby = Math.max(1, Math.ceil(band.height / CELL_STEP))

    if(nbx * nby < 2)
        return null

    const xDisp = []
    const yDisp = []
    let offs = (band.width - nbx * CELL_STEP) / 2
    for(let kx = 0; kx < nbx; ++kx)
        xDisp[kx] = offs + kx * CELL_STEP

    offs = (band.height - nby * CELL_STEP) / 2
    for(let ky = 0; ky < nby; ++ky)
        yDisp[ky] = offs + ky * CELL_STEP

    const grid = []
    for(let ky = 0; ky < nby; ++ky) {
        grid[ky] = []
        for(let kx = 0; kx < nbx; ++kx) {
            const hue = Math.floor(300 * kx / nbx)
            grid[ky][kx] = `hsl(${hue},100%,50%)`
        }
    }

    return {
        x: band.x,
        y: band.y,
        width: band.width,
        height: band.height,
        nbx,
        nby,
        xDisp,
        yDisp,
        grid
    }
}

function drawCell(context, bandState, kx, ky) {
    context.fillStyle = bandState.grid[ky][kx]
    context.fillRect(
        bandState.x + bandState.xDisp[kx],
        bandState.y + bandState.yDisp[ky],
        CELL_SIZE,
        CELL_SIZE
    )
}

function drawBand(context, bandState) {
    context.save()
    context.beginPath()
    context.rect(bandState.x, bandState.y, bandState.width, bandState.height)
    context.clip()

    for(let ky = 0; ky < bandState.nby; ++ky) {
        for(let kx = 0; kx < bandState.nbx; ++kx)
            drawCell(context, bandState, kx, ky)
    }

    context.restore()
}

function easeInOutCubic(value) {
    return value < 0.5
        ? 4 * value * value * value
        : 1 - Math.pow(-2 * value + 2, 3) / 2
}

function pickSwapTarget(bandState, phase) {
    const kx = Math.floor(Math.random() * bandState.nbx)
    const ky = Math.floor(Math.random() * bandState.nby)
    const maxRadius = Math.max(1, Math.round(1 + phase * MAX_SWAP_RADIUS))
    const useLongJump = Math.random() < phase * 0.7
    let x
    let y

    if(useLongJump) {
        do {
            x = kx + Math.floor((Math.random() * (maxRadius * 2 + 1)) - maxRadius)
            y = ky + Math.floor((Math.random() * (maxRadius * 2 + 1)) - maxRadius)
        } while(x < 0 || x >= bandState.nbx || y < 0 || y >= bandState.nby || (x === kx && y === ky))
    }
    else {
        let dir
        do {
            dir = Math.floor(Math.random() * 4)
            x = kx + [1, 0, -1, 0][dir]
            y = ky + [0, 1, 0, -1][dir]
        } while(x < 0 || x >= bandState.nbx || y < 0 || y >= bandState.nby)
    }

    return {kx, ky, x, y}
}

function xchgBand(context, bandState, phase) {
    const {kx, ky, x, y} = pickSwapTarget(bandState, phase)

    ;[bandState.grid[ky][kx], bandState.grid[y][x]] = [bandState.grid[y][x], bandState.grid[ky][kx]]
    drawCell(context, bandState, kx, ky)
    drawCell(context, bandState, x, y)
}

function ArtDecorationCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const wrapper = canvas?.parentElement
        if(!canvas || !wrapper)
            return

        const context = canvas.getContext("2d", { alpha: true, desynchronized: true })
        if(!context)
            return

        let animationFrameId = null
        let rebuildFrameId = null
        let layout = null
        let bandStates = []
        let lastFrameTime = 0
        let animationStartedAt = performance.now()
        let pausedAt = null
        let pausedMs = 0
        let isIntersecting = false
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null

        const paintThemeCover = () => {
            const isLightMode = document.documentElement.getAttribute("data-theme") === "light"
            const coverColor = isLightMode ? "rgba(255,255,255,0.77)" : "rgba(0,0,0,0.75)"

            context.save()
            context.fillStyle = coverColor

            for(const bandState of bandStates)
                context.fillRect(bandState.x, bandState.y, bandState.width, bandState.height)

            context.restore()
        }

        const isReducedMotion = () => Boolean(reducedMotionQuery?.matches)
        const shouldAnimate = () => isIntersecting && !document.hidden && !isReducedMotion()

        const stopLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const drawStatic = () => {
            if(!layout || bandStates.length === 0)
                return

            context.clearRect(0, 0, layout.width, layout.height)
            for(const bandState of bandStates)
                drawBand(context, bandState)
            paintThemeCover()
        }

        const getElapsedMs = (timestamp) => timestamp - animationStartedAt - pausedMs

        const step = (timestamp) => {
            if(!shouldAnimate()) {
                stopLoop()
                return
            }

            if(layout && bandStates.length > 0 && timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
                lastFrameTime = timestamp
                const phase = Math.min(1, getElapsedMs(timestamp) / ANIMATION_DURATION_MS)
                const diffusionPhase = easeInOutCubic(phase)
                const exchangeBudget = Math.round(
                    MIN_EXCHANGES_PER_TICK +
                    (MAX_EXCHANGES_PER_TICK - MIN_EXCHANGES_PER_TICK) * diffusionPhase
                )
                const exchangesPerBand = Math.max(1, Math.floor(exchangeBudget / bandStates.length))

                for(const bandState of bandStates) {
                    context.save()
                    context.beginPath()
                    context.rect(bandState.x, bandState.y, bandState.width, bandState.height)
                    context.clip()

                    for(let i = 0; i < exchangesPerBand; ++i)
                        xchgBand(context, bandState, diffusionPhase)

                    context.restore()
                }

                paintThemeCover()
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
            if(!nextLayout)
                return

            layout = nextLayout
            resizeCanvas(canvas, context, layout)
            bandStates = layout.bands.map(createBandState).filter(Boolean)
            lastFrameTime = 0
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
                if(pausedAt === null)
                    pausedAt = performance.now()
                stopLoop()
                return
            }

            if(pausedAt !== null) {
                pausedMs += performance.now() - pausedAt
                pausedAt = null
            }

            startLoop()
        }

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleRebuild)
        const mutationObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(scheduleRebuild)
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(() => {
            drawStatic()
            startLoop()
        })
        const intersectionObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver((entries) => {
            isIntersecting = entries.some(entry => entry.isIntersecting)
            if(isIntersecting) startLoop()
            else stopLoop()
        }, { rootMargin: "160px" })

        resizeObserver?.observe(wrapper)
        mutationObserver?.observe(wrapper, { childList: true })
        const sectionBody = wrapper.querySelector(".section-body")
        if(sectionBody)
            mutationObserver?.observe(sectionBody, { childList: true })
        themeObserver?.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
        intersectionObserver?.observe(wrapper)
        window.addEventListener("resize", scheduleRebuild, { passive: true })
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
            mutationObserver?.disconnect()
            themeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("resize", scheduleRebuild)
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
