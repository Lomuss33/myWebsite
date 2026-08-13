import "./ArticleLookAtThisGraph.scss"
import React, {useCallback, useEffect, useRef, useState} from "react"
import Article from "./base/Article.jsx"

const BIRTH_YEAR = 2001
const PANEL_LAYERED_TOPS = [0, 52, 104]
const PANEL_STACKED_TOPS = [0, 270, 540]

const GRAPH_CATALOG = [
    {
        id: "age",
        title: "Age since 2001",
        subtitle: "Years lived, 2001 to today",
        draw: drawAgeGraph
    },
    {
        id: "timeline",
        title: "Life timeline",
        subtitle: "Selected chapters in color",
        draw: drawLifeTimeline
    },
    {
        id: "earnings",
        title: "Yearly earnings",
        subtitle: "An illustrative annual series",
        draw: drawEarningsGraph
    }
]

function ArticleLookAtThisGraph({dataWrapper}) {
    const [selectedGraphs, setSelectedGraphs] = useState([0, 1, 2])
    const [layoutProgress, setLayoutProgress] = useState(0)
    const [isDragging, setIsDragging] = useState(false)

    const selectGraph = (panelIndex, direction) => {
        setSelectedGraphs(current => current.map((graphIndex, index) => {
            if(index !== panelIndex) return graphIndex
            return (graphIndex + direction + GRAPH_CATALOG.length) % GRAPH_CATALOG.length
        }))
    }

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className="article-look-at-this-graph">
            <div className="look-graph-intro-row">
                <p className="look-graph-description">{dataWrapper.locales.description}</p>
                <GraphLayoutLever progress={layoutProgress}
                                  isDragging={isDragging}
                                  setProgress={setLayoutProgress}
                                  setIsDragging={setIsDragging}/>
            </div>

            <div className={`look-graph-stage ${isDragging ? "is-dragging" : ""}`}
                 data-layout={layoutProgress >= 0.5 ? "stacked" : "layered"}>
                {selectedGraphs.map((graphIndex, panelIndex) => {
                    const graph = GRAPH_CATALOG[graphIndex]
                    const top = interpolate(
                        PANEL_LAYERED_TOPS[panelIndex],
                        PANEL_STACKED_TOPS[panelIndex],
                        layoutProgress
                    )

                    return (
                        <GraphPanel key={panelIndex}
                                    panelIndex={panelIndex}
                                    graph={graph}
                                    top={top}
                                    onPrevious={() => selectGraph(panelIndex, -1)}
                                    onNext={() => selectGraph(panelIndex, 1)}/>
                    )
                })}
            </div>
        </Article>
    )
}

function GraphLayoutLever({progress, isDragging, setProgress, setIsDragging}) {
    const leverRef = useRef(null)
    const dragRef = useRef(null)
    const progressRef = useRef(progress)
    const suppressClickRef = useRef(false)
    const isStacked = progress >= 0.5
    progressRef.current = progress

    const moveToEndpoint = (nextProgress) => {
        setIsDragging(false)
        setProgress(nextProgress)
    }

    const toggleEndpoint = () => moveToEndpoint(isStacked ? 0 : 1)

    const handlePointerDown = (event) => {
        if(event.button !== 0) return

        const lever = leverRef.current
        const handle = lever?.querySelector(".look-graph-lever-handle")
        if(!lever || !handle) return

        const travel = Math.max(1, lever.getBoundingClientRect().width - handle.getBoundingClientRect().width - 8)
        dragRef.current = {
            pointerId: event.pointerId,
            startX: event.clientX,
            startProgress: progress,
            travel,
            moved: false
        }
        lever.setPointerCapture(event.pointerId)
        setIsDragging(true)
        event.preventDefault()
    }

    const handlePointerMove = (event) => {
        const drag = dragRef.current
        if(!drag || drag.pointerId !== event.pointerId) return

        const delta = event.clientX - drag.startX
        if(Math.abs(delta) > 3) drag.moved = true
        setProgress(clamp(drag.startProgress + delta / drag.travel, 0, 1))
    }

    const finishPointerInteraction = (event) => {
        const drag = dragRef.current
        if(!drag || drag.pointerId !== event.pointerId) return

        dragRef.current = null
        if(event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
        }

        if(event.type === "pointercancel") {
            moveToEndpoint(progressRef.current >= 0.5 ? 1 : 0)
        }
        else if(drag.moved) {
            suppressClickRef.current = true
            window.setTimeout(() => {
                suppressClickRef.current = false
            }, 0)
            moveToEndpoint(progressRef.current >= 0.5 ? 1 : 0)
        }
        else {
            setIsDragging(false)
        }
    }

    const handleKeyDown = (event) => {
        if(event.key === "ArrowLeft" || event.key === "Home") {
            event.preventDefault()
            moveToEndpoint(0)
        }
        else if(event.key === "ArrowRight" || event.key === "End") {
            event.preventDefault()
            moveToEndpoint(1)
        }
    }

    return (
        <div className="look-graph-layout-control">
            <span className="look-graph-layout-label">Graph layout</span>
            <button ref={leverRef}
                    type="button"
                    className={`look-graph-lever ${isDragging ? "is-dragging" : ""}`}
                    aria-label={`Graph layout: ${isStacked ? "Stacked" : "Layered"}`}
                    aria-pressed={isStacked}
                    onClick={() => {
                        if(suppressClickRef.current) {
                            suppressClickRef.current = false
                            return
                        }
                        toggleEndpoint()
                    }}
                    onKeyDown={handleKeyDown}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={finishPointerInteraction}
                    onPointerCancel={finishPointerInteraction}>
                <span className="look-graph-lever-end look-graph-lever-end--left" aria-hidden="true">L</span>
                <span className="look-graph-lever-end look-graph-lever-end--right" aria-hidden="true">S</span>
                <span className="look-graph-lever-handle"
                      style={{left: `${(4 + progress * 76).toFixed(2)}px`}}>
                    <i className={`fa-solid ${isStacked ? "fa-bars" : "fa-layer-group"}`} aria-hidden="true"/>
                    <span>{isStacked ? "Stacked" : "Layered"}</span>
                </span>
            </button>
        </div>
    )
}

function GraphPanel({panelIndex, graph, top, onPrevious, onNext}) {
    return (
        <section className="look-graph-panel"
                 style={{top: `${top.toFixed(2)}px`, zIndex: panelIndex + 1}}
                 aria-label={`Graph panel ${panelIndex + 1}: ${graph.title}`}>
            <header className="look-graph-panel-header">
                <button type="button"
                        className="look-graph-panel-arrow"
                        aria-label={`Previous graph in panel ${panelIndex + 1}`}
                        onClick={onPrevious}>
                    <i className="fa-solid fa-chevron-left" aria-hidden="true"/>
                </button>

                <div className="look-graph-panel-heading">
                    <strong>{graph.title}</strong>
                    <span>{graph.subtitle}</span>
                </div>

                <button type="button"
                        className="look-graph-panel-arrow"
                        aria-label={`Next graph in panel ${panelIndex + 1}`}
                        onClick={onNext}>
                    <i className="fa-solid fa-chevron-right" aria-hidden="true"/>
                </button>
            </header>

            <div className="look-graph-canvas-wrap">
                <GraphCanvas graph={graph}/>
            </div>
        </section>
    )
}

function GraphCanvas({graph}) {
    const canvasRef = useRef(null)
    const draw = useCallback(() => {
        const canvas = canvasRef.current
        if(!canvas) return

        const rect = canvas.getBoundingClientRect()
        const width = Math.max(1, Math.round(rect.width))
        const height = Math.max(1, Math.round(rect.height))
        const dpr = Math.min(window.devicePixelRatio || 1, 3)
        const pixelWidth = Math.max(1, Math.round(width * dpr))
        const pixelHeight = Math.max(1, Math.round(height * dpr))

        if(canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
            canvas.width = pixelWidth
            canvas.height = pixelHeight
        }

        const context = canvas.getContext("2d")
        if(!context) return

        context.setTransform(dpr, 0, 0, dpr, 0, 0)
        context.clearRect(0, 0, width, height)
        graph.draw(context, width, height, getCanvasPalette(canvas))
    }, [graph])

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return undefined

        draw()
        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(draw)
        const themeObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver(draw)
        resizeObserver?.observe(canvas)
        themeObserver?.observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]})
        window.addEventListener("resize", draw)

        return () => {
            resizeObserver?.disconnect()
            themeObserver?.disconnect()
            window.removeEventListener("resize", draw)
        }
    }, [draw])

    return (
        <canvas ref={canvasRef}
                className="look-graph-canvas"
                role="img"
                aria-label={`${graph.title}. ${graph.subtitle}.`}>
            {graph.title}
        </canvas>
    )
}

function drawAgeGraph(context, width, height, palette) {
    const currentYear = new Date().getFullYear()
    const maxAge = Math.max(1, currentYear - BIRTH_YEAR)
    const plot = makePlot(width, height)
    drawGrid(context, plot, palette, 4)

    context.strokeStyle = palette.blue
    context.lineWidth = 2.5
    context.lineJoin = "round"
    context.beginPath()
    for(let year = BIRTH_YEAR; year <= currentYear; year += 1) {
        const ratio = (year - BIRTH_YEAR) / maxAge
        const x = plot.left + ratio * plot.width
        const y = plot.bottom - ratio * plot.height
        if(year === BIRTH_YEAR) context.moveTo(x, y)
        else context.lineTo(x, y)
    }
    context.stroke()

    const endX = plot.right
    const endY = plot.top
    context.fillStyle = palette.gold
    context.beginPath()
    context.arc(endX, endY, 4.5, 0, Math.PI * 2)
    context.fill()

    drawEdgeLabels(context, plot, String(BIRTH_YEAR), String(currentYear), palette)
    drawYAxisLabels(context, plot, [0, Math.round(maxAge / 2), maxAge], palette)
}

function drawLifeTimeline(context, width, height, palette) {
    const currentYear = new Date().getFullYear()
    const plot = makePlot(width, height, {left: 18, right: 14, top: 18, bottom: 28})
    const endYear = Math.max(currentYear + 1, 2026)
    const chapters = [
        {label: "Growing", start: 2001, end: 2016, color: palette.blue},
        {label: "Exploring", start: 2016, end: 2020, color: palette.violet},
        {label: "Studying", start: 2020, end: 2024, color: palette.gold},
        {label: "Building", start: 2024, end: endYear, color: palette.green}
    ]
    const y = plot.top + plot.height * 0.44
    const barHeight = Math.min(48, Math.max(26, plot.height * 0.38))
    const span = endYear - BIRTH_YEAR

    context.lineCap = "round"
    chapters.forEach((chapter, index) => {
        const x = plot.left + ((chapter.start - BIRTH_YEAR) / span) * plot.width
        const chapterWidth = ((chapter.end - chapter.start) / span) * plot.width
        context.fillStyle = chapter.color
        roundedRect(context, x, y, Math.max(3, chapterWidth - 3), barHeight, 6)
        context.fill()

        if(chapterWidth > 64) {
            context.fillStyle = palette.strong
            context.font = "600 10px system-ui, sans-serif"
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillText(truncateText(context, chapter.label, chapterWidth - 10), x + chapterWidth / 2, y + barHeight / 2)
        }

        if(index > 0) {
            context.fillStyle = palette.surface
            context.beginPath()
            context.arc(x, y + barHeight / 2, 3, 0, Math.PI * 2)
            context.fill()
        }
    })

    drawEdgeLabels(context, plot, String(BIRTH_YEAR), "Today", palette)
}

function drawEarningsGraph(context, width, height, palette) {
    const currentYear = new Date().getFullYear()
    const years = Array.from({length: 7}, (_, index) => currentYear - 6 + index)
    const values = [18, 25, 31, 43, 40, 55, 64]
    const maxValue = 70
    const plot = makePlot(width, height)
    drawGrid(context, plot, palette, 4)

    const slotWidth = plot.width / years.length
    const barWidth = Math.max(5, Math.min(34, slotWidth * 0.58))
    years.forEach((year, index) => {
        const barHeight = (values[index] / maxValue) * plot.height
        const x = plot.left + slotWidth * index + (slotWidth - barWidth) / 2
        const y = plot.bottom - barHeight
        const gradient = context.createLinearGradient(0, y, 0, plot.bottom)
        gradient.addColorStop(0, index === years.length - 1 ? palette.gold : palette.blue)
        gradient.addColorStop(1, palette.violet)
        context.fillStyle = gradient
        roundedRect(context, x, y, barWidth, barHeight, Math.min(6, barWidth / 2))
        context.fill()

        if(slotWidth >= 30 || index % 2 === 0 || index === years.length - 1) {
            context.fillStyle = palette.muted
            context.font = "10px system-ui, sans-serif"
            context.textAlign = "center"
            context.textBaseline = "top"
            context.fillText(String(year).slice(-2), x + barWidth / 2, plot.bottom + 8)
        }
    })

    drawYAxisLabels(context, plot, [0, 35, 70], palette, value => `${value}k`)
}

function makePlot(width, height, custom = {}) {
    const left = custom.left ?? Math.min(42, Math.max(30, width * 0.08))
    const rightPadding = custom.right ?? 14
    const top = custom.top ?? 12
    const bottomPadding = custom.bottom ?? 28
    const right = Math.max(left + 1, width - rightPadding)
    const bottom = Math.max(top + 1, height - bottomPadding)
    return {left, right, top, bottom, width: right - left, height: bottom - top}
}

function drawGrid(context, plot, palette, lineCount) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1
    for(let index = 0; index <= lineCount; index += 1) {
        const y = plot.top + (plot.height / lineCount) * index
        context.beginPath()
        context.moveTo(plot.left, y)
        context.lineTo(plot.right, y)
        context.stroke()
    }
}

function drawEdgeLabels(context, plot, startLabel, endLabel, palette) {
    context.fillStyle = palette.muted
    context.font = "10px system-ui, sans-serif"
    context.textBaseline = "top"
    context.textAlign = "left"
    context.fillText(startLabel, plot.left, plot.bottom + 8)
    context.textAlign = "right"
    context.fillText(endLabel, plot.right, plot.bottom + 8)
}

function drawYAxisLabels(context, plot, values, palette, format = value => String(value)) {
    context.fillStyle = palette.muted
    context.font = "10px system-ui, sans-serif"
    context.textAlign = "right"
    context.textBaseline = "middle"
    values.forEach((value, index) => {
        const y = plot.bottom - (plot.height * index) / Math.max(1, values.length - 1)
        context.fillText(format(value), plot.left - 7, y)
    })
}

function getCanvasPalette(canvas) {
    const isLight = document.documentElement.dataset.theme === "light"
    const computedColor = getComputedStyle(canvas).color
    return {
        blue: isLight ? "#0284c7" : "#38bdf8",
        gold: isLight ? "#ca8a04" : "#facc15",
        green: isLight ? "#16a34a" : "#4ade80",
        violet: isLight ? "#7c3aed" : "#a78bfa",
        grid: isLight ? "rgba(15, 23, 42, 0.13)" : "rgba(226, 232, 240, 0.13)",
        muted: isLight ? "rgba(51, 65, 85, 0.78)" : "rgba(203, 213, 225, 0.78)",
        strong: computedColor || (isLight ? "#0f172a" : "#f8fafc"),
        surface: isLight ? "rgba(248, 250, 252, 0.9)" : "rgba(2, 6, 23, 0.9)"
    }
}

function roundedRect(context, x, y, width, height, radius) {
    const safeRadius = Math.max(0, Math.min(radius, width / 2, height / 2))
    context.beginPath()
    context.roundRect(x, y, width, height, safeRadius)
}

function truncateText(context, text, maxWidth) {
    if(context.measureText(text).width <= maxWidth) return text

    let truncated = text
    while(truncated.length > 1 && context.measureText(`${truncated}…`).width > maxWidth) {
        truncated = truncated.slice(0, -1)
    }
    return `${truncated}…`
}

function interpolate(start, end, progress) {
    return start + (end - start) * progress
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

export default ArticleLookAtThisGraph
