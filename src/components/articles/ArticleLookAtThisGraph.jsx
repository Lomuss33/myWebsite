import "./ArticleLookAtThisGraph.scss"
import React, {useEffect, useMemo, useRef, useState} from 'react'
import Article from "./base/Article.jsx"

const GRAPH_PADDING = {
    top: 22,
    right: 22,
    bottom: 76,
    left: 84
}

function ArticleLookAtThisGraph({ dataWrapper }) {
    const graphCatalog = useMemo(() => buildGraphCatalog(), [])
    const [graphHeightPull, setGraphHeightPull] = useState(100)
    const graphHeightRatio = useMemo(() => {
        return roundNumber((Number(graphHeightPull) || 0) / 100, 3)
    }, [graphHeightPull])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-look-at-this-graph`}>
            <div className={`article-look-at-this-graph-shell`}
                 style={{
                     "--look-graph-height-ratio": graphHeightRatio
                 }}>
                <div className={`article-look-at-this-graph-body`}>
                    {dataWrapper.locales.description && (
                        <p className={`article-look-at-this-graph-description text-4`}
                           dangerouslySetInnerHTML={{__html: dataWrapper.locales.description}}/>
                    )}

                    <div className={`article-look-at-this-graph-panels`}>
                        {[0, 1, 2].map((initialIndex, panelIndex) => (
                            <GraphPanel key={`look-at-this-graph-panel-${panelIndex}`}
                                        panelIndex={panelIndex}
                                        initialIndex={initialIndex}
                                        graphCatalog={graphCatalog}
                                        graphHeightRatio={graphHeightRatio}/>
                        ))}
                    </div>
                </div>

                <div className={`article-look-at-this-graph-height-control`}
                     aria-label={`Article height control`}>
                    <i className={`fa-solid fa-up-down-left-right article-look-at-this-graph-height-control-icon`}/>
                    <input type="range"
                           min="0"
                           max="100"
                           step="1"
                           value={graphHeightPull}
                           onChange={event => setGraphHeightPull(Number(event.target.value))}
                           aria-label={`Pull article height`}
                           data-tooltip={`Pull article height`}
                           className={`article-look-at-this-graph-height-slider`}/>
                </div>
            </div>
        </Article>
    )
}

function GraphPanel({ panelIndex, initialIndex, graphCatalog, graphHeightRatio }) {
    const panelRef = useRef(null)
    const canvasRef = useRef(null)
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(initialIndex)
    const selectedGraph = graphCatalog[selectedGraphIndex]
    const headingStyle = useMemo(() => {
        const compressedRatio = Math.min(1, Math.max(0, Number(graphHeightRatio) || 0))
        const scale = roundNumber(0.80 + (0.20 * compressedRatio), 3)
        const targetAnchor = panelIndex === 0 ? 22 : panelIndex === 2 ? 78 : 50
        const anchor = roundNumber(50 + ((targetAnchor - 50) * (1 - compressedRatio)), 2)
        const shiftX = panelIndex === 0 ? "0%" : panelIndex === 2 ? "-100%" : "-50%"

        return {
            left: `${anchor}%`,
            alignItems: panelIndex === 0 ? "flex-start" : panelIndex === 2 ? "flex-end" : "center",
            textAlign: panelIndex === 0 ? "left" : panelIndex === 2 ? "right" : "center",
            "--look-graph-heading-shift-x": shiftX,
            "--look-graph-heading-scale": scale,
            "--look-graph-heading-anchor": `${anchor}%`
        }
    }, [graphHeightRatio, panelIndex])

    const selectGraph = direction => {
        setSelectedGraphIndex(currentIndex => {
            const nextIndex = (currentIndex + direction + graphCatalog.length) % graphCatalog.length
            return nextIndex
        })
    }

    useEffect(() => {
        const panelElement = panelRef.current
        const canvasElement = canvasRef.current
        if(!panelElement || !canvasElement) return

        let animationFrameId = 0
        const draw = () => {
            const rect = canvasElement.getBoundingClientRect()
            const width = Math.max(1, Math.floor(rect.width || panelElement.clientWidth || 1))
            const height = Math.max(1, Math.floor(rect.height || panelElement.clientHeight || 1))
            const dpr = Math.min(2, Math.max(1, Number(window.devicePixelRatio) || 1))

            const nextWidth = Math.max(1, Math.round(width * dpr))
            const nextHeight = Math.max(1, Math.round(height * dpr))
            if(canvasElement.width !== nextWidth) canvasElement.width = nextWidth
            if(canvasElement.height !== nextHeight) canvasElement.height = nextHeight

            const context = canvasElement.getContext("2d")
            if(!context) return

            context.setTransform(dpr, 0, 0, dpr, 0, 0)
            context.clearRect(0, 0, width, height)
            drawGraphOnCanvas(context, width, height, selectedGraph, panelElement)
        }

        const scheduleDraw = () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(draw)
        }

        scheduleDraw()

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => scheduleDraw())
        resizeObserver?.observe(panelElement)

        window.addEventListener("resize", scheduleDraw)

        return () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId)
            resizeObserver?.disconnect()
            window.removeEventListener("resize", scheduleDraw)
        }
    }, [selectedGraph, graphCatalog])

    return (
        <section className={`article-look-at-this-graph-panel`}
                 ref={panelRef}
                style={{
                    "--look-graph-panel-index": panelIndex
                }}>
            <div className={`article-look-at-this-graph-panel-header`}>
                <button type="button"
                        className={`article-look-at-this-graph-panel-control article-look-at-this-graph-panel-control-prev`}
                        onClick={() => selectGraph(-1)}
                        aria-label={`Previous graph`}
                        data-tooltip={`Previous graph`}>
                    <i className={`fa-solid fa-chevron-left`}/>
                    <span className={`visually-hidden`}>Previous graph</span>
                </button>

                <div className={`article-look-at-this-graph-panel-heading`}
                     style={headingStyle}>
                    <span className={`article-look-at-this-graph-panel-kicker text-2`}>
                        Panel {panelIndex + 1}
                    </span>
                    <h5 className={`article-look-at-this-graph-panel-title`}>
                        {selectedGraph.title}
                    </h5>
                    <p className={`article-look-at-this-graph-panel-subtitle text-3`}>
                        {selectedGraph.subtitle}
                    </p>
                </div>

                <button type="button"
                        className={`article-look-at-this-graph-panel-control article-look-at-this-graph-panel-control-next`}
                        onClick={() => selectGraph(1)}
                        aria-label={`Next graph`}
                        data-tooltip={`Next graph`}>
                    <i className={`fa-solid fa-chevron-right`}/>
                    <span className={`visually-hidden`}>Next graph</span>
                </button>
            </div>

            <div className={`article-look-at-this-graph-panel-canvas-frame`}>
                <canvas ref={canvasRef}
                        className={`article-look-at-this-graph-canvas`}
                        role="img"
                        aria-label={selectedGraph.ariaLabel}/>
            </div>
        </section>
    )
}

function buildGraphCatalog() {
    const yearNow = new Date().getFullYear()
    const years = rangeInclusive(2001, yearNow)
    const currentAge = getAgeInYears(2001)

    return [
        {
            id: "age-line",
            title: "Age from 2001 to today",
            subtitle: "A simple line chart of life progression",
            ariaLabel: "Line graph showing age progression from 2001 to today",
            draw: (context, width, height, palette) => {
                const values = years.map(year => ({
                    year,
                    value: year === yearNow ? currentAge : Math.max(0, year - 2001)
                }))
                drawLineGraph(context, width, height, palette, {
                    xLabel: "Year",
                    yLabel: "Age",
                    xValues: values.map(entry => entry.year),
                    yValues: values.map(entry => entry.value),
                    valueFormatter: value => `${Math.round(value)}`
                })
            }
        },
        {
            id: "life-timeline",
            title: "Life timeline",
            subtitle: "Home, school, Ausbildung, university",
            ariaLabel: "Horizontal timeline showing home, school, Ausbildung and university segments",
            draw: (context, width, height, palette) => {
                drawTimelineGraph(context, width, height, palette)
            }
        },
        {
            id: "earnings-bar",
            title: "Yearly earnings",
            subtitle: "Illustrative sample values since birth",
            ariaLabel: "Bar chart showing illustrative yearly earnings since 2001",
            draw: (context, width, height, palette) => {
                const values = years.map(year => ({
                    year,
                    value: getIllustrativeEarnings(year)
                }))
                drawBarGraph(context, width, height, palette, {
                    xLabel: "Year",
                    yLabel: "€",
                    xValues: values.map(entry => entry.year),
                    yValues: values.map(entry => entry.value),
                    valueFormatter: value => `${Math.round(value).toLocaleString()}`
                })
            }
        }
    ]
}

function drawGraphOnCanvas(context, width, height, graph, panelElement) {
    const palette = readPalette(panelElement)
    context.save()
    context.beginPath()
    roundRectPath(context, 0.5, 0.5, width - 1, height - 1, 12)
    context.clip()

    graph.draw(context, width, height, palette)

    context.restore()

    context.strokeStyle = palette.border
    context.lineWidth = 1
    context.strokeRect(0.5, 0.5, width - 1, height - 1)
}

function drawLineGraph(context, width, height, palette, { xLabel, yLabel, xValues, yValues, valueFormatter }) {
    const plot = getPlotRect(width, height)
    const maxY = Math.max(...yValues, 1)
    const minY = 0
    const years = xValues

    drawPlotBase(context, width, height, palette, plot, xLabel, yLabel)
    drawHorizontalGrid(context, palette, plot, 6)

    context.strokeStyle = palette.line
    context.lineWidth = 3
    context.lineJoin = "round"
    context.lineCap = "round"

    const points = xValues.map((year, index) => ({
        x: plot.left + (index / Math.max(1, xValues.length - 1)) * plot.width,
        y: plot.top + plot.height - ((yValues[index] - minY) / Math.max(1, maxY - minY)) * plot.height
    }))

    context.beginPath()
    points.forEach((point, index) => {
        if(index === 0) context.moveTo(point.x, point.y)
        else context.lineTo(point.x, point.y)
    })
    context.stroke()

    context.fillStyle = palette.line
    points.forEach(point => {
        context.beginPath()
        context.arc(point.x, point.y, 3.8, 0, Math.PI * 2)
        context.fill()
    })

    context.fillStyle = palette.textMuted
    context.font = `600 11px system-ui, sans-serif`
    context.textAlign = "center"
    const yearStep = Math.max(1, Math.ceil(years.length / 6))
    years.forEach((year, index) => {
        if(index % yearStep !== 0 && index !== years.length - 1) return
        const x = points[index].x
        context.fillText(String(year), x, plot.top + plot.height + 18)
    })

    context.textAlign = "right"
    context.fillStyle = palette.textMuted
    for(let i = 0; i <= 6; i++) {
        const value = maxY * (i / 6)
        const y = plot.top + plot.height - (i / 6) * plot.height
        context.fillText(valueFormatter(value), plot.left - 10, y + 4)
    }
}

function drawTimelineGraph(context, width, height, palette) {
    const plot = getPlotRect(width, height)
    const segments = [
        { label: "Home", start: 0, end: 6, color: palette.segment1 },
        { label: "School", start: 6, end: 18, color: palette.segment2 },
        { label: "Ausbildung", start: 18, end: 20, color: palette.segment3 },
        { label: "University", start: 20, end: 24, color: palette.segment4 }
    ]
    const totalYears = 24

    drawPlotBase(context, width, height, palette, plot, "Years", "Life stages")
    drawHorizontalGrid(context, palette, plot, 4)

    const bandY = plot.top + plot.height * 0.5
    const bandHeight = Math.max(18, Math.min(30, height * 0.12))
    const bandRadius = 999

    context.fillStyle = palette.track
    roundRect(context, plot.left, bandY - bandHeight / 2, plot.width, bandHeight, bandRadius)
    context.fill()

    segments.forEach((segment, index) => {
        const startX = plot.left + (segment.start / totalYears) * plot.width
        const endX = plot.left + (segment.end / totalYears) * plot.width
        context.fillStyle = segment.color
        roundRect(context, startX, bandY - bandHeight / 2, Math.max(1, endX - startX), bandHeight, bandRadius)
        context.fill()

        context.fillStyle = palette.text
        context.font = `700 12px system-ui, sans-serif`
        context.textAlign = "center"
        context.fillText(segment.label, (startX + endX) / 2, bandY - bandHeight / 2 - 10 - (index % 2) * 12)
    })

    const todayRatio = Math.min(1, Math.max(0, getAgeInYears(2001) / totalYears))
    const todayX = plot.left + todayRatio * plot.width
    context.strokeStyle = palette.accent
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(todayX, bandY - bandHeight * 0.9)
    context.lineTo(todayX, bandY + bandHeight * 0.9)
    context.stroke()

    context.fillStyle = palette.textMuted
    context.font = `600 11px system-ui, sans-serif`
    context.textAlign = "left"
    context.fillText("Today", Math.min(plot.left + plot.width - 28, todayX + 6), bandY + bandHeight * 1.35)

    context.textAlign = "center"
    ;[0, 6, 12, 18, 24].forEach(year => {
        const x = plot.left + (year / totalYears) * plot.width
        context.fillText(String(year), x, plot.top + plot.height + 18)
    })
}

function drawBarGraph(context, width, height, palette, { xLabel, yLabel, xValues, yValues, valueFormatter }) {
    const plot = getPlotRect(width, height)
    const maxY = Math.max(...yValues, 1)

    drawPlotBase(context, width, height, palette, plot, xLabel, yLabel)
    drawHorizontalGrid(context, palette, plot, 5)

    const barWidth = plot.width / Math.max(1, yValues.length) * 0.62
    const step = plot.width / Math.max(1, yValues.length)

    yValues.forEach((value, index) => {
        const barHeight = (value / maxY) * plot.height
        const barX = plot.left + index * step + (step - barWidth) / 2
        const barY = plot.top + plot.height - barHeight
        const hueMix = index / Math.max(1, yValues.length - 1)
        const fill = mixPalette(palette.barStart, palette.barEnd, hueMix)

        context.fillStyle = fill
        roundRect(context, barX, barY, barWidth, barHeight, 5)
        context.fill()
    })

    context.fillStyle = palette.textMuted
    context.font = `600 10px system-ui, sans-serif`
    context.textAlign = "center"
    const labelStep = Math.max(1, Math.ceil(xValues.length / 7))
    xValues.forEach((year, index) => {
        if(index % labelStep !== 0 && index !== xValues.length - 1) return
        const x = plot.left + index * step + step / 2
        context.fillText(String(year), x, plot.top + plot.height + 18)
    })

    context.textAlign = "right"
    for(let i = 0; i <= 5; i++) {
        const value = maxY * (i / 5)
        const y = plot.top + plot.height - (i / 5) * plot.height
        context.fillText(valueFormatter(value), plot.left - 10, y + 4)
    }
}

function drawPlotBase(context, width, height, palette, plot, xLabel, yLabel) {
    context.fillStyle = palette.plotBackground
    roundRect(context, plot.left, plot.top, plot.width, plot.height, 10)
    context.fill()

    context.fillStyle = palette.textMuted
    context.font = `700 10px system-ui, sans-serif`
    context.save()
    context.translate(20, plot.top + plot.height / 2)
    context.rotate(-Math.PI / 2)
    context.textAlign = "center"
    context.fillText(yLabel, 0, 0)
    context.restore()

    context.textAlign = "center"
    context.fillText(xLabel, plot.left + plot.width / 2, height - 10)
}

function drawHorizontalGrid(context, palette, plot, rowCount) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1
    context.setLineDash([4, 4])
    for(let i = 0; i <= rowCount; i++) {
        const y = plot.top + (plot.height / rowCount) * i
        context.beginPath()
        context.moveTo(plot.left, y)
        context.lineTo(plot.left + plot.width, y)
        context.stroke()
    }
    context.setLineDash([])
}

function getPlotRect(width, height) {
    return {
        left: GRAPH_PADDING.left,
        top: GRAPH_PADDING.top,
        width: Math.max(1, width - GRAPH_PADDING.left - GRAPH_PADDING.right),
        height: Math.max(1, height - GRAPH_PADDING.top - GRAPH_PADDING.bottom)
    }
}

function readPalette(panelElement) {
    const computed = getComputedStyle(panelElement)
    return {
        border: computed.getPropertyValue("--look-graph-border").trim() || "#93c5fd",
        surfaceTop: computed.getPropertyValue("--look-graph-surface-top").trim() || "#f8fbff",
        surfaceBottom: computed.getPropertyValue("--look-graph-surface-bottom").trim() || "#eef4fb",
        plotBackground: computed.getPropertyValue("--look-graph-plot-background").trim() || "transparent",
        text: computed.getPropertyValue("--look-graph-text").trim() || "#0f172a",
        textMuted: computed.getPropertyValue("--look-graph-text-muted").trim() || "#475569",
        grid: computed.getPropertyValue("--look-graph-grid").trim() || "rgba(15, 23, 42, 0.12)",
        line: computed.getPropertyValue("--look-graph-line").trim() || "#2563eb",
        accent: computed.getPropertyValue("--look-graph-accent").trim() || "#f97316",
        track: computed.getPropertyValue("--look-graph-track").trim() || "rgba(148, 163, 184, 0.38)",
        segment1: computed.getPropertyValue("--look-graph-segment-1").trim() || "#60a5fa",
        segment2: computed.getPropertyValue("--look-graph-segment-2").trim() || "#34d399",
        segment3: computed.getPropertyValue("--look-graph-segment-3").trim() || "#f59e0b",
        segment4: computed.getPropertyValue("--look-graph-segment-4").trim() || "#a855f7",
        barStart: computed.getPropertyValue("--look-graph-bar-start").trim() || "#0ea5e9",
        barEnd: computed.getPropertyValue("--look-graph-bar-end").trim() || "#f97316"
    }
}

function mixPalette(start, end, ratio) {
    const safeRatio = Math.min(1, Math.max(0, ratio))
    const startRgb = colorToRgb(start)
    const endRgb = colorToRgb(end)
    if(!startRgb || !endRgb) return start

    const mix = startRgb.map((value, index) => Math.round(value + (endRgb[index] - value) * safeRatio))
    return `rgb(${mix[0]} ${mix[1]} ${mix[2]})`
}

function colorToRgb(color) {
    if(typeof color !== "string") return null

    const trimmed = color.trim()
    if(trimmed.startsWith("#")) {
        const hex = trimmed.slice(1)
        if(hex.length === 3) {
            return hex.split("").map(part => Number.parseInt(`${part}${part}`, 16))
        }

        if(hex.length === 6) {
            return [
                Number.parseInt(hex.slice(0, 2), 16),
                Number.parseInt(hex.slice(2, 4), 16),
                Number.parseInt(hex.slice(4, 6), 16)
            ]
        }
    }

    const match = trimmed.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if(!match) return null

    return [Number(match[1]), Number(match[2]), Number(match[3])]
}

function getIllustrativeEarnings(year) {
    if(year < 2019) return 0
    if(year === 2019) return 1200
    if(year === 2020) return 4200
    if(year === 2021) return 6900
    if(year === 2022) return 9400
    if(year === 2023) return 12800
    if(year === 2024) return 15900
    if(year === 2025) return 18900
    return 10200
}

function getAgeInYears(birthYear) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const yearFraction = (today.getMonth() + (today.getDate() / 31)) / 12
    return Math.max(0, (currentYear - birthYear) + yearFraction)
}

function roundNumber(value, precision = 2) {
    const safePrecision = Math.max(0, precision)
    const factor = 10 ** safePrecision
    return Math.round(value * factor) / factor
}

function rangeInclusive(start, end) {
    const values = []
    for(let value = start; value <= end; value++) {
        values.push(value)
    }
    return values
}

function roundRect(context, x, y, width, height, radius) {
    context.beginPath()
    roundRectPath(context, x, y, width, height, radius)
}

function roundRectPath(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2)
    context.moveTo(x + r, y)
    context.arcTo(x + width, y, x + width, y + height, r)
    context.arcTo(x + width, y + height, x, y + height, r)
    context.arcTo(x, y + height, x, y, r)
    context.arcTo(x, y, x + width, y, r)
    context.closePath()
}

export default ArticleLookAtThisGraph
