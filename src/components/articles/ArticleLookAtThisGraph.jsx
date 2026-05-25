import "./ArticleLookAtThisGraph.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import Article from "./base/Article.jsx"

const PLOT_PADDING = {
    top: 18,
    right: 18,
    bottom: 18,
    left: 18
}

const PANEL_TITLE_TARGETS = [18, 50, 82]

function ArticleLookAtThisGraph({ dataWrapper }) {
    const graphCatalog = useMemo(() => buildGraphCatalog(), [])
    const [graphHeightPull, setGraphHeightPull] = useState(100)
    const compressionRatio = useMemo(() => {
        return roundNumber((Number(graphHeightPull) || 0) / 100, 3)
    }, [graphHeightPull])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-look-at-this-graph`}>
            <div className={`article-look-at-this-graph-shell`}
                 style={{
                     "--look-graph-compression": compressionRatio
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
                                        compressionRatio={compressionRatio}/>
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

function GraphPanel({ panelIndex, initialIndex, graphCatalog, compressionRatio }) {
    const panelRef = useRef(null)
    const canvasRef = useRef(null)
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(initialIndex)
    const selectedGraph = graphCatalog[selectedGraphIndex]
    const headingStyle = useMemo(() => {
        const safeRatio = Math.min(1, Math.max(0, Number(compressionRatio) || 0))
        const anchor = roundNumber(50 + ((PANEL_TITLE_TARGETS[panelIndex] - 50) * (1 - safeRatio)), 2)
        const scale = roundNumber(0.80 + (0.20 * safeRatio), 3)
        const widthPercent = roundNumber(26 + (safeRatio * 16), 2)
        const shiftX = panelIndex === 0 ? "0%" : panelIndex === 2 ? "-100%" : "-50%"

        return {
            left: `${anchor}%`,
            width: `min(${widthPercent}%, calc(100% - 148px))`,
            maxWidth: `calc(100% - 148px)`,
            textAlign: panelIndex === 0 ? "left" : panelIndex === 2 ? "right" : "center",
            alignItems: panelIndex === 0 ? "flex-start" : panelIndex === 2 ? "flex-end" : "center",
            "--look-graph-title-shift": shiftX,
            "--look-graph-title-scale": scale
        }
    }, [compressionRatio, panelIndex])

    useEffect(() => {
        const panelElement = panelRef.current
        const canvasElement = canvasRef.current
        if(!panelElement || !canvasElement) return

        let animationFrameId = 0

        const draw = () => {
            const rect = canvasElement.getBoundingClientRect()
            const width = Math.max(1, Math.floor(rect.width || 1))
            const height = Math.max(1, Math.floor(rect.height || 1))
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

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleDraw)
        resizeObserver?.observe(canvasElement)
        window.addEventListener("resize", scheduleDraw)

        return () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId)
            resizeObserver?.disconnect()
            window.removeEventListener("resize", scheduleDraw)
        }
    }, [selectedGraph])

    const selectGraph = direction => {
        setSelectedGraphIndex(currentIndex => {
            return (currentIndex + direction + graphCatalog.length) % graphCatalog.length
        })
    }

    return (
        <section className={`article-look-at-this-graph-panel`}
                 ref={panelRef}
                 style={{
                     "--look-graph-panel-index": panelIndex
                 }}>
            <div className={`article-look-at-this-graph-panel-header`}>
                <button type="button"
                        className={`article-look-at-this-graph-panel-control`}
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
                        className={`article-look-at-this-graph-panel-control`}
                        onClick={() => selectGraph(1)}
                        aria-label={`Next graph`}
                        data-tooltip={`Next graph`}>
                    <i className={`fa-solid fa-chevron-right`}/>
                    <span className={`visually-hidden`}>Next graph</span>
                </button>
            </div>

            <div className={`article-look-at-this-graph-presentation`}>
                <div className={`article-look-at-this-graph-presentation-surface`}/>
                <AxisXBand axis={selectedGraph.xAxis}
                           className={`article-look-at-this-graph-axis-x article-look-at-this-graph-axis-x-top ${panelIndex === 0 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>
                <AxisYBand axis={selectedGraph.yAxis}
                           side={`left`}
                           className={`article-look-at-this-graph-axis-y article-look-at-this-graph-axis-y-left article-look-at-this-graph-axis-y-left-1 ${panelIndex === 1 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>
                <AxisYBand axis={selectedGraph.yAxis}
                           side={`left`}
                           className={`article-look-at-this-graph-axis-y article-look-at-this-graph-axis-y-left article-look-at-this-graph-axis-y-left-2 ${panelIndex === 2 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>
                <AxisYBand axis={selectedGraph.yAxis}
                           side={`right`}
                           className={`article-look-at-this-graph-axis-y article-look-at-this-graph-axis-y-right ${panelIndex === 0 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>
                <AxisXBand axis={selectedGraph.xAxis}
                           className={`article-look-at-this-graph-axis-x article-look-at-this-graph-axis-x-bottom article-look-at-this-graph-axis-x-bottom-1 ${panelIndex === 1 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>
                <AxisXBand axis={selectedGraph.xAxis}
                           className={`article-look-at-this-graph-axis-x article-look-at-this-graph-axis-x-bottom article-look-at-this-graph-axis-x-bottom-2 ${panelIndex === 2 ? `article-look-at-this-graph-axis-active` : `article-look-at-this-graph-axis-inactive`}`.trim()}/>

                <div className={`article-look-at-this-graph-panel-canvas-frame`}>
                    <canvas ref={canvasRef}
                            className={`article-look-at-this-graph-canvas`}
                            role="img"
                            aria-label={selectedGraph.ariaLabel}/>
                </div>
            </div>
        </section>
    )
}

function AxisXBand({ axis, className }) {
    return (
        <div className={className}>
            <span className={`article-look-at-this-graph-axis-title`}>
                {axis.label}
            </span>
            <div className={`article-look-at-this-graph-axis-x-ticks`}>
                {axis.ticks.map((tick, index) => (
                    <span key={`axis-x-${axis.label}-${index}`}
                          className={`article-look-at-this-graph-axis-tick`}>
                        {tick}
                    </span>
                ))}
            </div>
        </div>
    )
}

function AxisYBand({ axis, side, className }) {
    return (
        <div className={`${className} ${side === "right" ? `article-look-at-this-graph-axis-y-align-right` : ``}`.trim()}>
            <span className={`article-look-at-this-graph-axis-title`}>
                {axis.label}
            </span>
            <div className={`article-look-at-this-graph-axis-y-ticks`}>
                {axis.ticks.map((tick, index) => (
                    <span key={`axis-y-${axis.label}-${index}`}
                          className={`article-look-at-this-graph-axis-tick`}>
                        {tick}
                    </span>
                ))}
            </div>
        </div>
    )
}

function buildGraphCatalog() {
    const yearNow = new Date().getFullYear()
    const years = rangeInclusive(2001, yearNow)
    const ageValues = years.map(year => Math.max(0, year - 2001))
    const earningsValues = years.map(year => getIllustrativeEarnings(year))

    return [
        {
            id: "age-line",
            title: "Age from 2001 to today",
            subtitle: "A simple line chart of life progression",
            ariaLabel: "Line graph showing age progression from 2001 to today",
            xAxis: {
                label: "Year",
                ticks: buildStepTicks(years, 6).map(value => String(value))
            },
            yAxis: {
                label: "Age",
                ticks: buildScaleTicks(Math.max(...ageValues), 6, value => `${Math.round(value)}`)
            },
            draw: (context, plotRect, palette) => {
                drawLineGraph(context, plotRect, palette, {
                    xValues: years,
                    yValues: ageValues
                })
            }
        },
        {
            id: "life-timeline",
            title: "Life timeline",
            subtitle: "Home, school, Ausbildung, university",
            ariaLabel: "Horizontal timeline showing home, school, Ausbildung and university segments",
            xAxis: {
                label: "Years",
                ticks: ["0", "6", "12", "18", "24"]
            },
            yAxis: {
                label: "Stages",
                ticks: ["Home", "School", "Ausbildung", "University"]
            },
            draw: (context, plotRect, palette) => {
                drawTimelineGraph(context, plotRect, palette)
            }
        },
        {
            id: "earnings-bar",
            title: "Yearly earnings",
            subtitle: "Illustrative sample values since birth",
            ariaLabel: "Bar chart showing illustrative yearly earnings since 2001",
            xAxis: {
                label: "Year",
                ticks: buildStepTicks(years, 6).map(value => String(value))
            },
            yAxis: {
                label: "Earnings",
                ticks: buildScaleTicks(Math.max(...earningsValues), 5, value => `${Math.round(value).toLocaleString()}`)
            },
            draw: (context, plotRect, palette) => {
                drawBarGraph(context, plotRect, palette, {
                    xValues: years,
                    yValues: earningsValues
                })
            }
        }
    ]
}

function drawGraphOnCanvas(context, width, height, graph, panelElement) {
    const palette = readPalette(panelElement)
    const plotRect = getPlotRect(width, height)

    context.save()
    context.beginPath()
    roundRectPath(context, 0.5, 0.5, width - 1, height - 1, 12)
    context.clip()

    drawPlotBase(context, plotRect, palette)
    graph.draw(context, plotRect, palette)
    drawAxisLines(context, plotRect, palette)

    context.restore()

    context.strokeStyle = palette.border
    context.lineWidth = 1
    context.strokeRect(0.5, 0.5, width - 1, height - 1)
}

function drawLineGraph(context, plotRect, palette, { xValues, yValues }) {
    const maxY = Math.max(...yValues, 1)
    const minY = 0

    drawHorizontalGrid(context, plotRect, palette, 6)

    const points = xValues.map((_, index) => ({
        x: plotRect.left + (index / Math.max(1, xValues.length - 1)) * plotRect.width,
        y: plotRect.top + plotRect.height - ((yValues[index] - minY) / Math.max(1, maxY - minY)) * plotRect.height
    }))

    context.strokeStyle = palette.line
    context.lineWidth = 3
    context.lineJoin = "round"
    context.lineCap = "round"
    context.beginPath()
    points.forEach((point, index) => {
        if(index === 0) context.moveTo(point.x, point.y)
        else context.lineTo(point.x, point.y)
    })
    context.stroke()

    context.fillStyle = palette.line
    points.forEach(point => {
        context.beginPath()
        context.arc(point.x, point.y, 3.6, 0, Math.PI * 2)
        context.fill()
    })
}

function drawTimelineGraph(context, plotRect, palette) {
    const segments = [
        { label: "Home", start: 0, end: 6, color: palette.segment1 },
        { label: "School", start: 6, end: 18, color: palette.segment2 },
        { label: "Ausbildung", start: 18, end: 20, color: palette.segment3 },
        { label: "University", start: 20, end: 24, color: palette.segment4 }
    ]
    const totalYears = 24
    const bandY = plotRect.top + plotRect.height * 0.5
    const bandHeight = Math.max(20, Math.min(34, plotRect.height * 0.14))

    drawHorizontalGrid(context, plotRect, palette, 4)

    context.fillStyle = palette.track
    roundRect(context, plotRect.left, bandY - (bandHeight / 2), plotRect.width, bandHeight, 999)
    context.fill()

    segments.forEach((segment, index) => {
        const startX = plotRect.left + (segment.start / totalYears) * plotRect.width
        const endX = plotRect.left + (segment.end / totalYears) * plotRect.width
        context.fillStyle = segment.color
        roundRect(context, startX, bandY - (bandHeight / 2), Math.max(2, endX - startX), bandHeight, 999)
        context.fill()

        context.fillStyle = palette.text
        context.font = `700 12px system-ui, sans-serif`
        context.textAlign = "center"
        context.fillText(segment.label, (startX + endX) / 2, bandY - (bandHeight / 2) - 10 - ((index % 2) * 12))
    })

    const todayX = plotRect.left + (Math.min(24, getAgeInYears(2001)) / totalYears) * plotRect.width
    context.strokeStyle = palette.accent
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(todayX, bandY - (bandHeight * 0.95))
    context.lineTo(todayX, bandY + (bandHeight * 0.95))
    context.stroke()

    context.fillStyle = palette.textMuted
    context.font = `600 11px system-ui, sans-serif`
    context.textAlign = "left"
    context.fillText("Today", Math.min(plotRect.left + plotRect.width - 28, todayX + 6), bandY + (bandHeight * 1.35))
}

function drawBarGraph(context, plotRect, palette, { xValues, yValues }) {
    const maxY = Math.max(...yValues, 1)
    const step = plotRect.width / Math.max(1, yValues.length)
    const barWidth = step * 0.62

    drawHorizontalGrid(context, plotRect, palette, 5)

    yValues.forEach((value, index) => {
        const barHeight = (value / maxY) * plotRect.height
        const barX = plotRect.left + (index * step) + ((step - barWidth) / 2)
        const barY = plotRect.top + plotRect.height - barHeight
        const fill = mixPalette(palette.barStart, palette.barEnd, index / Math.max(1, xValues.length - 1))

        context.fillStyle = fill
        roundRect(context, barX, barY, barWidth, barHeight, 5)
        context.fill()
    })
}

function drawPlotBase(context, plotRect, palette) {
    context.fillStyle = palette.plotBackground
    roundRect(context, plotRect.left, plotRect.top, plotRect.width, plotRect.height, 10)
    context.fill()
}

function drawAxisLines(context, plotRect, palette) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1.1
    context.setLineDash([])
    context.beginPath()
    context.moveTo(plotRect.left, plotRect.top)
    context.lineTo(plotRect.left, plotRect.top + plotRect.height)
    context.lineTo(plotRect.left + plotRect.width, plotRect.top + plotRect.height)
    context.stroke()
}

function drawHorizontalGrid(context, plotRect, palette, rowCount) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1
    context.setLineDash([4, 4])
    for(let index = 0; index <= rowCount; index++) {
        const y = plotRect.top + ((plotRect.height / rowCount) * index)
        context.beginPath()
        context.moveTo(plotRect.left, y)
        context.lineTo(plotRect.left + plotRect.width, y)
        context.stroke()
    }
    context.setLineDash([])
}

function getPlotRect(width, height) {
    return {
        left: PLOT_PADDING.left,
        top: PLOT_PADDING.top,
        width: Math.max(1, width - PLOT_PADDING.left - PLOT_PADDING.right),
        height: Math.max(1, height - PLOT_PADDING.top - PLOT_PADDING.bottom)
    }
}

function readPalette(panelElement) {
    const computed = getComputedStyle(panelElement)
    return {
        border: computed.getPropertyValue("--look-graph-border").trim() || "#93c5fd",
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

function buildStepTicks(values, count = 6) {
    if(values.length <= count) return values

    const lastIndex = values.length - 1
    const ticks = []
    for(let index = 0; index < count; index++) {
        const valueIndex = Math.round((lastIndex * index) / Math.max(1, count - 1))
        const value = values[valueIndex]
        if(ticks[ticks.length - 1] !== value) ticks.push(value)
    }
    return ticks
}

function buildScaleTicks(maxValue, segments = 5, formatter = value => String(value)) {
    const safeMax = Math.max(1, maxValue)
    const ticks = []
    for(let index = 0; index <= segments; index++) {
        const value = safeMax * (index / segments)
        ticks.push(formatter(value))
    }
    return ticks.reverse()
}

function mixPalette(start, end, ratio) {
    const safeRatio = Math.min(1, Math.max(0, ratio))
    const startRgb = colorToRgb(start)
    const endRgb = colorToRgb(end)
    if(!startRgb || !endRgb) return start

    const mixed = startRgb.map((value, index) => Math.round(value + ((endRgb[index] - value) * safeRatio)))
    return `rgb(${mixed[0]} ${mixed[1]} ${mixed[2]})`
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

function rangeInclusive(start, end) {
    const values = []
    for(let value = start; value <= end; value++) {
        values.push(value)
    }
    return values
}

function roundNumber(value, precision = 2) {
    const factor = 10 ** Math.max(0, precision)
    return Math.round(value * factor) / factor
}

function roundRect(context, x, y, width, height, radius) {
    context.beginPath()
    roundRectPath(context, x, y, width, height, radius)
}

function roundRectPath(context, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, width / 2, height / 2)
    context.moveTo(x + safeRadius, y)
    context.arcTo(x + width, y, x + width, y + height, safeRadius)
    context.arcTo(x + width, y + height, x, y + height, safeRadius)
    context.arcTo(x, y + height, x, y, safeRadius)
    context.arcTo(x, y, x + width, y, safeRadius)
    context.closePath()
}

export default ArticleLookAtThisGraph
