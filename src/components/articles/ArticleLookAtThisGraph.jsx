import "./ArticleLookAtThisGraph.scss"
import React, {useEffect, useMemo, useRef, useState} from "react"
import Article from "./base/Article.jsx"

const PANEL_COUNT = 3
const PANEL_TITLE_ANCHORS = [18, 50, 82]

function ArticleLookAtThisGraph({ dataWrapper }) {
    const graphs = useMemo(() => buildGraphCatalog(), [])
    const [heightPull, setHeightPull] = useState(100)
    const expandedRatio = clamp(Number(heightPull) / 100, 0, 1)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 forceHideTitle={true}
                 className={`article-look-at-this-graph`}>
            <section className={`look-graph-workspace`}
                     style={{
                         "--look-graph-expanded": roundNumber(expandedRatio, 3)
                     }}
                     aria-labelledby={`${dataWrapper.uniqueId}-look-graph-title`}>
                <div className={`look-graph-rule look-graph-rule-top`}/>

                <header className={`look-graph-header`}>
                    <div className={`look-graph-header-copy`}>
                        <span className={`look-graph-eyebrow text-2`}>Software article</span>
                        <h4 id={`${dataWrapper.uniqueId}-look-graph-title`}
                            className={`look-graph-title`}>
                            {dataWrapper.locales.title}
                        </h4>
                        {dataWrapper.locales.description && (
                            <p className={`look-graph-description text-4`}
                               dangerouslySetInnerHTML={{__html: dataWrapper.locales.description}}/>
                        )}
                    </div>
                </header>

                <div className={`look-graph-composer`}>
                    <div className={`look-graph-stage`}>
                        {Array.from({ length: PANEL_COUNT }, (_, panelIndex) => (
                            <GraphPanel key={`look-graph-panel-${panelIndex}`}
                                        panelIndex={panelIndex}
                                        initialGraphIndex={panelIndex}
                                        graphs={graphs}
                                        expandedRatio={expandedRatio}/>
                        ))}
                    </div>

                    <HeightControl value={heightPull}
                                   onChange={setHeightPull}/>
                </div>

                <div className={`look-graph-rule look-graph-rule-bottom`}/>
            </section>
        </Article>
    )
}

function HeightControl({ value, onChange }) {
    return (
        <div className={`look-graph-height-control`}
             aria-label={`Article height control`}>
            <i className={`fa-solid fa-up-down-left-right look-graph-height-control-icon`}/>
            <input type="range"
                   min="0"
                   max="100"
                   step="1"
                   value={value}
                   onChange={event => onChange(Number(event.target.value))}
                   aria-label={`Pull article height`}
                   data-tooltip={`Pull article height`}
                   className={`look-graph-height-slider`}/>
        </div>
    )
}

function GraphPanel({ panelIndex, initialGraphIndex, graphs, expandedRatio }) {
    const panelRef = useRef(null)
    const canvasRef = useRef(null)
    const [selectedGraphIndex, setSelectedGraphIndex] = useState(initialGraphIndex)
    const graph = graphs[selectedGraphIndex]
    const collapsedRatio = 1 - expandedRatio
    const titleAnchor = 50 + ((PANEL_TITLE_ANCHORS[panelIndex] - 50) * collapsedRatio)
    const titleAlign = panelIndex === 0 ? "left" : panelIndex === 2 ? "right" : "center"
    const yAxisSide = panelIndex === 0 ? "right" : "left"
    const xAxisPlacement = panelIndex === 0 ? "top" : "bottom"

    useEffect(() => {
        const panelElement = panelRef.current
        const canvasElement = canvasRef.current
        if(!panelElement || !canvasElement)
            return

        let animationFrameId = 0

        const draw = () => {
            const rect = canvasElement.getBoundingClientRect()
            const width = Math.max(1, Math.floor(rect.width || 1))
            const height = Math.max(1, Math.floor(rect.height || 1))
            const dpr = Math.min(2, Math.max(1, Number(window.devicePixelRatio) || 1))
            const nextWidth = Math.max(1, Math.round(width * dpr))
            const nextHeight = Math.max(1, Math.round(height * dpr))

            if(canvasElement.width !== nextWidth)
                canvasElement.width = nextWidth
            if(canvasElement.height !== nextHeight)
                canvasElement.height = nextHeight

            const context = canvasElement.getContext("2d")
            if(!context)
                return

            context.setTransform(dpr, 0, 0, dpr, 0, 0)
            context.clearRect(0, 0, width, height)
            drawGraph(context, width, height, graph, panelElement)
        }

        const scheduleDraw = () => {
            if(animationFrameId)
                cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(draw)
        }

        scheduleDraw()

        const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleDraw)
        resizeObserver?.observe(canvasElement)
        window.addEventListener("resize", scheduleDraw)

        return () => {
            if(animationFrameId)
                cancelAnimationFrame(animationFrameId)
            resizeObserver?.disconnect()
            window.removeEventListener("resize", scheduleDraw)
        }
    }, [graph])

    const selectGraph = direction => {
        setSelectedGraphIndex(currentIndex => {
            return (currentIndex + direction + graphs.length) % graphs.length
        })
    }

    return (
        <section ref={panelRef}
                 className={`look-graph-panel look-graph-panel-${panelIndex + 1}`}
                 style={{
                     "--look-graph-panel-index": panelIndex,
                     "--look-graph-title-anchor": `${roundNumber(titleAnchor, 2)}%`,
                     "--look-graph-title-scale": roundNumber(0.84 + (expandedRatio * 0.16), 3)
                 }}>
            <header className={`look-graph-panel-header`}>
                <button type="button"
                        className={`look-graph-panel-control`}
                        onClick={() => selectGraph(-1)}
                        aria-label={`Previous graph`}
                        data-tooltip={`Previous graph`}>
                    <i className={`fa-solid fa-chevron-left`}/>
                </button>

                <div className={`look-graph-panel-heading look-graph-panel-heading-${titleAlign}`}>
                    <span className={`look-graph-panel-kicker text-2`}>Graph {panelIndex + 1}</span>
                    <h5 className={`look-graph-panel-title`}>{graph.title}</h5>
                    <p className={`look-graph-panel-subtitle text-3`}>{graph.subtitle}</p>
                </div>

                <button type="button"
                        className={`look-graph-panel-control`}
                        onClick={() => selectGraph(1)}
                        aria-label={`Next graph`}
                        data-tooltip={`Next graph`}>
                    <i className={`fa-solid fa-chevron-right`}/>
                </button>
            </header>

            <div className={`look-graph-panel-body look-graph-panel-body-y-${yAxisSide}`}>
                {yAxisSide === "left" && (
                    <AxisY axis={graph.yAxis}
                           side={`left`}/>
                )}
                <div className={`look-graph-plot`}>
                    {xAxisPlacement === "top" ? (
                        <AxisX axis={graph.xAxis}
                               placement={`top`}/>
                    ) : (
                        <div className={`look-graph-axis-x look-graph-axis-x-spacer`}
                             aria-hidden={true}/>
                    )}
                    <div className={`look-graph-canvas-frame`}>
                        <canvas ref={canvasRef}
                                className={`look-graph-canvas`}
                                role="img"
                                aria-label={graph.ariaLabel}/>
                    </div>
                    {xAxisPlacement === "bottom" ? (
                        <AxisX axis={graph.xAxis}
                               placement={`bottom`}/>
                    ) : (
                        <div className={`look-graph-axis-x look-graph-axis-x-spacer`}
                             aria-hidden={true}/>
                    )}
                </div>
                {yAxisSide === "right" && (
                    <AxisY axis={graph.yAxis}
                           side={`right`}/>
                )}
            </div>
        </section>
    )
}

function AxisX({ axis, placement }) {
    return (
        <div className={`look-graph-axis-x look-graph-axis-x-${placement}`}>
            <span className={`look-graph-axis-title`}>{axis.label}</span>
            <div className={`look-graph-axis-x-ticks`}>
                {axis.ticks.map((tick, index) => (
                    <span key={`${axis.label}-x-${index}`}
                          className={`look-graph-axis-tick`}>
                        {tick}
                    </span>
                ))}
            </div>
        </div>
    )
}

function AxisY({ axis, side }) {
    return (
        <div className={`look-graph-axis-y look-graph-axis-y-${side}`}>
            <span className={`look-graph-axis-title`}>{axis.label}</span>
            <div className={`look-graph-axis-y-ticks`}>
                {axis.ticks.map((tick, index) => (
                    <span key={`${axis.label}-y-${index}`}
                          className={`look-graph-axis-tick`}>
                        {tick}
                    </span>
                ))}
            </div>
        </div>
    )
}

function buildGraphCatalog() {
    const currentYear = new Date().getFullYear()
    const years = rangeInclusive(2001, currentYear)
    const ageValues = years.map(year => Math.max(0, year - 2001))
    const earningsValues = years.map(year => getIllustrativeEarnings(year))

    return [
        {
            id: "age-line",
            title: "Age from 2001 to today",
            subtitle: "Life progression as a clean line chart",
            ariaLabel: "Line graph showing age progression from 2001 to today",
            xAxis: {
                label: "Year",
                ticks: buildStepTicks(years, 6).map(String)
            },
            yAxis: {
                label: "Age",
                ticks: buildScaleTicks(Math.max(...ageValues), 6, value => `${Math.round(value)}`)
            },
            draw: (context, plotRect, palette) => {
                drawLineGraph(context, plotRect, palette, ageValues)
            }
        },
        {
            id: "life-timeline",
            title: "Life timeline",
            subtitle: "Home, school, Ausbildung, university",
            ariaLabel: "Horizontal timeline showing home, school, Ausbildung and university segments",
            xAxis: {
                label: "Age range",
                ticks: ["0", "6", "12", "18", "20", "24"]
            },
            yAxis: {
                label: "Stage",
                ticks: ["Home", "School", "Ausbildung", "University"]
            },
            draw: drawTimelineGraph
        },
        {
            id: "earnings-bar",
            title: "Yearly earnings",
            subtitle: "Illustrative sample values since birth",
            ariaLabel: "Bar chart showing illustrative yearly earnings since 2001",
            xAxis: {
                label: "Year",
                ticks: buildStepTicks(years, 6).map(String)
            },
            yAxis: {
                label: "Earnings",
                ticks: buildScaleTicks(Math.max(...earningsValues), 5, value => `${Math.round(value).toLocaleString()}`)
            },
            draw: (context, plotRect, palette) => {
                drawBarGraph(context, plotRect, palette, earningsValues)
            }
        }
    ]
}

function drawGraph(context, width, height, graph, panelElement) {
    const palette = readPalette(panelElement)
    const plotRect = {
        left: 18,
        top: 18,
        width: Math.max(1, width - 36),
        height: Math.max(1, height - 36)
    }

    context.save()
    roundRectPath(context, 0.5, 0.5, width - 1, height - 1, 12)
    context.clip()

    context.fillStyle = palette.plotBackground
    roundRect(context, plotRect.left, plotRect.top, plotRect.width, plotRect.height, 10)
    context.fill()

    graph.draw(context, plotRect, palette)
    drawAxisLines(context, plotRect, palette)

    context.restore()
}

function drawLineGraph(context, plotRect, palette, values) {
    const maxY = Math.max(...values, 1)
    drawHorizontalGrid(context, plotRect, palette, 6)

    const points = values.map((value, index) => ({
        x: plotRect.left + (index / Math.max(1, values.length - 1)) * plotRect.width,
        y: plotRect.top + plotRect.height - (value / maxY) * plotRect.height
    }))

    context.strokeStyle = palette.line
    context.lineWidth = 3
    context.lineJoin = "round"
    context.lineCap = "round"
    context.beginPath()
    points.forEach((point, index) => {
        if(index === 0)
            context.moveTo(point.x, point.y)
        else
            context.lineTo(point.x, point.y)
    })
    context.stroke()

    context.fillStyle = palette.line
    points.forEach(point => {
        context.beginPath()
        context.arc(point.x, point.y, 3.5, 0, Math.PI * 2)
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
    const bandY = plotRect.top + plotRect.height * 0.52
    const bandHeight = Math.max(22, Math.min(40, plotRect.height * 0.18))

    drawHorizontalGrid(context, plotRect, palette, 4)

    context.fillStyle = palette.track
    roundRect(context, plotRect.left, bandY - bandHeight / 2, plotRect.width, bandHeight, 999)
    context.fill()

    segments.forEach((segment, index) => {
        const startX = plotRect.left + (segment.start / totalYears) * plotRect.width
        const endX = plotRect.left + (segment.end / totalYears) * plotRect.width
        context.fillStyle = segment.color
        roundRect(context, startX, bandY - bandHeight / 2, Math.max(2, endX - startX), bandHeight, 999)
        context.fill()

        context.fillStyle = palette.text
        context.font = `700 12px system-ui, sans-serif`
        context.textAlign = "center"
        context.fillText(segment.label, (startX + endX) / 2, bandY - bandHeight / 2 - 10 - ((index % 2) * 11))
    })

    const todayX = plotRect.left + (Math.min(24, getAgeInYears(2001)) / totalYears) * plotRect.width
    context.strokeStyle = palette.accent
    context.lineWidth = 2
    context.beginPath()
    context.moveTo(todayX, bandY - bandHeight)
    context.lineTo(todayX, bandY + bandHeight)
    context.stroke()
}

function drawBarGraph(context, plotRect, palette, values) {
    const maxY = Math.max(...values, 1)
    const step = plotRect.width / Math.max(1, values.length)
    const barWidth = step * 0.62

    drawHorizontalGrid(context, plotRect, palette, 5)

    values.forEach((value, index) => {
        const barHeight = (value / maxY) * plotRect.height
        const barX = plotRect.left + (index * step) + ((step - barWidth) / 2)
        const barY = plotRect.top + plotRect.height - barHeight
        context.fillStyle = mixPalette(palette.barStart, palette.barEnd, index / Math.max(1, values.length - 1))
        roundRect(context, barX, barY, barWidth, barHeight, 5)
        context.fill()
    })
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

function drawHorizontalGrid(context, plotRect, palette, rows) {
    context.strokeStyle = palette.grid
    context.lineWidth = 1
    context.setLineDash([4, 4])
    for(let index = 0; index <= rows; index++) {
        const y = plotRect.top + (plotRect.height / rows) * index
        context.beginPath()
        context.moveTo(plotRect.left, y)
        context.lineTo(plotRect.left + plotRect.width, y)
        context.stroke()
    }
    context.setLineDash([])
}

function readPalette(element) {
    const computed = getComputedStyle(element)
    return {
        border: computed.getPropertyValue("--look-graph-border").trim() || "#93c5fd",
        plotBackground: computed.getPropertyValue("--look-graph-plot-background").trim() || "transparent",
        text: computed.getPropertyValue("--look-graph-text").trim() || "#0f172a",
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
    if(values.length <= count)
        return values

    const lastIndex = values.length - 1
    const ticks = []
    for(let index = 0; index < count; index++) {
        const valueIndex = Math.round((lastIndex * index) / Math.max(1, count - 1))
        const value = values[valueIndex]
        if(ticks[ticks.length - 1] !== value)
            ticks.push(value)
    }
    return ticks
}

function buildScaleTicks(maxValue, segments = 5, formatter = value => String(value)) {
    const safeMax = Math.max(1, maxValue)
    return Array.from({ length: segments + 1 }, (_, index) => formatter(safeMax * (index / segments))).reverse()
}

function getIllustrativeEarnings(year) {
    const age = Math.max(0, year - 2001)
    if(age < 16)
        return 0
    if(age < 18)
        return 400 + (age - 16) * 650
    if(age < 20)
        return 2200 + (age - 18) * 1400
    if(age < 24)
        return 1200 + (age - 20) * 900
    return 5200 + (age - 24) * 1800
}

function getAgeInYears(startYear) {
    return new Date().getFullYear() - startYear
}

function rangeInclusive(start, end) {
    return Array.from({ length: Math.max(0, end - start + 1) }, (_, index) => start + index)
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min))
}

function roundNumber(value, decimals = 2) {
    const multiplier = 10 ** decimals
    return Math.round(value * multiplier) / multiplier
}

function mixPalette(start, end, ratio) {
    const safeRatio = clamp(ratio, 0, 1)
    const startRgb = colorToRgb(start)
    const endRgb = colorToRgb(end)
    if(!startRgb || !endRgb)
        return start

    const mixed = startRgb.map((value, index) => Math.round(value + ((endRgb[index] - value) * safeRatio)))
    return `rgb(${mixed[0]} ${mixed[1]} ${mixed[2]})`
}

function colorToRgb(color) {
    if(typeof color !== "string")
        return null

    const trimmed = color.trim()
    if(!trimmed.startsWith("#"))
        return null

    const hex = trimmed.slice(1)
    if(hex.length !== 6)
        return null

    return [
        Number.parseInt(hex.slice(0, 2), 16),
        Number.parseInt(hex.slice(2, 4), 16),
        Number.parseInt(hex.slice(4, 6), 16)
    ]
}

function roundRect(context, x, y, width, height, radius) {
    roundRectPath(context, x, y, width, height, radius)
    context.fill()
}

function roundRectPath(context, x, y, width, height, radius) {
    const safeRadius = Math.min(radius, Math.abs(width) / 2, Math.abs(height) / 2)
    context.beginPath()
    context.moveTo(x + safeRadius, y)
    context.lineTo(x + width - safeRadius, y)
    context.quadraticCurveTo(x + width, y, x + width, y + safeRadius)
    context.lineTo(x + width, y + height - safeRadius)
    context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height)
    context.lineTo(x + safeRadius, y + height)
    context.quadraticCurveTo(x, y + height, x, y + height - safeRadius)
    context.lineTo(x, y + safeRadius)
    context.quadraticCurveTo(x, y, x + safeRadius, y)
    context.closePath()
}

export default ArticleLookAtThisGraph
