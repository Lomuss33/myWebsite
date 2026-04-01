import "./PretextDraggableInlineIconText.scss"
import React, { useEffect, useMemo, useRef, useState } from "react"
import {
    layoutDraggableInlineParagraphs,
    parseDraggableInlineHtml,
    readDraggableTypographySnapshot
} from "./pretextDraggableInlineFlow.js"

const POINTER_KEYBOARD_STEP = 12

function PretextDraggableInlineIconText({
    html,
    faIcon,
    iconStyle,
    alt,
    initialXRatio = 0.5,
    className = ""
}) {
    const contentRef = useRef(null)
    const bodyMeasureRef = useRef(null)
    const paragraphMeasureRef = useRef(null)
    const strongMeasureRef = useRef(null)
    const emMeasureRef = useRef(null)
    const strongEmMeasureRef = useRef(null)
    const dragStateRef = useRef(null)

    const [contentWidth, setContentWidth] = useState(0)
    const [typography, setTypography] = useState(null)
    const [xRatio, setXRatio] = useState(() => clamp(initialXRatio, 0, 1))
    const [isDragging, setIsDragging] = useState(false)

    const paragraphs = useMemo(() => {
        return parseDraggableInlineHtml(html)
    }, [html])

    useEffect(() => {
        setXRatio(clamp(initialXRatio, 0, 1))
    }, [initialXRatio, html])

    useEffect(() => {
        const refreshTypography = () => {
            setTypography(readDraggableTypographySnapshot({
                body: bodyMeasureRef.current,
                paragraph: paragraphMeasureRef.current,
                strong: strongMeasureRef.current,
                em: emMeasureRef.current,
                strongEm: strongEmMeasureRef.current
            }))
        }

        refreshTypography()

        if (!document.fonts?.ready) return

        let disposed = false
        document.fonts.ready.then(() => {
            if (!disposed) refreshTypography()
        })

        return () => {
            disposed = true
        }
    }, [])

    useEffect(() => {
        const element = contentRef.current
        if (!element) return

        const observer = new ResizeObserver(entries => {
            const nextWidth = entries[0]?.contentRect?.width || 0
            setContentWidth(Math.max(0, nextWidth))
        })

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        return () => {
            dragStateRef.current = null
        }
    }, [])

    const iconSize = getIconSize(contentWidth)
    const horizontalPadding = 18
    const railGap = getRailGap(typography?.lineHeight)
    const trackMinX = iconSize / 2
    const trackMaxX = Math.max(trackMinX, contentWidth - iconSize / 2)
    const trackWidth = Math.max(1, trackMaxX - trackMinX)
    const iconCenterX = trackMinX + trackWidth * xRatio

    const splitIndex = useMemo(() => {
        return findBalancedParagraphSplit(paragraphs, typography, contentWidth, iconCenterX, iconSize, horizontalPadding)
    }, [contentWidth, horizontalPadding, iconCenterX, iconSize, paragraphs, typography])

    const topParagraphs = useMemo(() => paragraphs.slice(0, splitIndex), [paragraphs, splitIndex])
    const bottomParagraphs = useMemo(() => paragraphs.slice(splitIndex), [paragraphs, splitIndex])

    const flowObstacle = useMemo(() => {
        if (!typography || contentWidth <= 0) return null

        return {
            left: Math.max(0, iconCenterX - iconSize / 2),
            top: 0,
            width: iconSize,
            height: 100000,
            horizontalPadding,
            verticalPadding: 0,
            includeInHeight: false
        }
    }, [contentWidth, horizontalPadding, iconCenterX, iconSize, typography])

    const topLayout = useMemo(() => {
        return layoutDraggableInlineParagraphs(topParagraphs, typography, contentWidth, flowObstacle)
    }, [contentWidth, flowObstacle, topParagraphs, typography])

    const bottomLayout = useMemo(() => {
        return layoutDraggableInlineParagraphs(bottomParagraphs, typography, contentWidth, flowObstacle)
    }, [bottomParagraphs, contentWidth, flowObstacle, typography])

    const hasRenderableContent = topLayout.totalHeight > 0 || bottomLayout.totalHeight > 0
    const totalHeight = hasRenderableContent ? topLayout.totalHeight + railGap + bottomLayout.totalHeight : 0
    const railCenterY = hasRenderableContent ? topLayout.totalHeight + railGap / 2 : 0
    const renderedLines = useMemo(() => {
        const lowerOffset = topLayout.totalHeight + railGap

        return [
            ...topLayout.lines,
            ...bottomLayout.lines.map(line => ({
                ...line,
                key: `lower-${line.key}`,
                y: line.y + lowerOffset
            }))
        ]
    }, [bottomLayout.lines, railGap, topLayout.lines, topLayout.totalHeight])

    const handlePointerDown = event => {
        if (!contentWidth) return

        dragStateRef.current = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startRatio: xRatio
        }
        setIsDragging(true)

        if (event.currentTarget?.setPointerCapture) {
            try {
                event.currentTarget.setPointerCapture(event.pointerId)
            } catch {
                // Ignore capture failures.
            }
        }
    }

    const handlePointerMove = event => {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) return

        const nextRatio = dragState.startRatio + (event.clientX - dragState.startClientX) / trackWidth
        setXRatio(clamp(nextRatio, 0, 1))
    }

    const finishDrag = event => {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) return

        dragStateRef.current = null
        setIsDragging(false)

        if (event.currentTarget?.releasePointerCapture) {
            try {
                event.currentTarget.releasePointerCapture(event.pointerId)
            } catch {
                // Ignore release failures.
            }
        }
    }

    const handleKeyDown = event => {
        if (!contentWidth) return

        if (event.key === "ArrowLeft") {
            event.preventDefault()
            setXRatio(currentRatio => clamp(currentRatio - POINTER_KEYBOARD_STEP / trackWidth, 0, 1))
        } else if (event.key === "ArrowRight") {
            event.preventDefault()
            setXRatio(currentRatio => clamp(currentRatio + POINTER_KEYBOARD_STEP / trackWidth, 0, 1))
        } else if (event.key === "Home") {
            event.preventDefault()
            setXRatio(0)
        } else if (event.key === "End") {
            event.preventDefault()
            setXRatio(1)
        }
    }

    return (
        <div className={`pretext-draggable-inline-icon-text ${className}`}
             style={{
                 "--pretext-draggable-inline-icon-text-icon-size": `${iconSize}px`
             }}>
            <div className={`pretext-draggable-inline-icon-text-measure`}
                 aria-hidden={true}>
                <span ref={bodyMeasureRef}
                      className={`pretext-draggable-inline-icon-text-measure-body text-3`}>
                    Ag
                </span>
                <p ref={paragraphMeasureRef}
                   className={`pretext-draggable-inline-icon-text-measure-paragraph text-3`}>
                    Ag
                </p>
                <strong ref={strongMeasureRef}
                        className={`pretext-draggable-inline-icon-text-measure-strong text-3`}>
                    Ag
                </strong>
                <em ref={emMeasureRef}
                    className={`pretext-draggable-inline-icon-text-measure-em text-3`}>
                    Ag
                </em>
                <strong>
                    <em ref={strongEmMeasureRef}
                        className={`pretext-draggable-inline-icon-text-measure-strong-em text-3`}>
                        Ag
                    </em>
                </strong>
            </div>

            <div ref={contentRef}
                 className={`pretext-draggable-inline-icon-text-canvas`}
                 style={totalHeight > 0 ? { minHeight: `${totalHeight}px` } : undefined}>
                {totalHeight > 0 && (
                    <div className={`pretext-draggable-inline-icon-text-rail`}
                         style={{ top: `${railCenterY}px` }}
                         aria-hidden={true}>
                        <span className={`pretext-draggable-inline-icon-text-rail-line`}/>
                    </div>
                )}

                <button type={`button`}
                        className={`pretext-draggable-inline-icon-text-handle ${isDragging ? "is-dragging" : ""}`}
                        style={{
                            left: `${iconCenterX - iconSize / 2}px`,
                            top: `0px`,
                            height: `${totalHeight}px`,
                            ...(iconStyle || {})
                        }}
                        aria-label={alt || "Draggable inline icon"}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(xRatio * 100)}
                        role={`slider`}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={finishDrag}
                        onPointerCancel={finishDrag}
                        onKeyDown={handleKeyDown}>
                    <span className={`pretext-draggable-inline-icon-text-handle-icon`}>
                        <i className={faIcon}/>
                    </span>
                </button>

                <div className={`pretext-draggable-inline-icon-text-lines text-3`}
                     style={typography ? {
                         lineHeight: `${typography.lineHeight}px`
                     } : undefined}>
                    {renderedLines.map(line => (
                        <div key={line.key}
                             className={`pretext-draggable-inline-icon-text-line`}
                             style={{
                                 top: `${line.y}px`,
                                 left: `${line.x}px`,
                                 height: `${typography?.lineHeight || 0}px`
                             }}>
                            {line.fragments.map(fragment => (
                                <FlowFragment key={fragment.key}
                                              fragment={fragment}/>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function FlowFragment({ fragment }) {
    const classNames = [
        "pretext-draggable-inline-icon-text-fragment",
        fragment.marks?.highlight ? "pretext-draggable-inline-icon-text-fragment-highlight" : "",
        fragment.marks?.strong ? "pretext-draggable-inline-icon-text-fragment-strong" : "",
        fragment.marks?.em ? "pretext-draggable-inline-icon-text-fragment-em" : ""
    ].filter(Boolean).join(" ")

    const content = renderMarkedText(fragment)
    const commonProps = {
        className: classNames,
        style: fragment.leadingGap > 0 ? { marginLeft: `${fragment.leadingGap}px` } : undefined
    }

    if (fragment.href) {
        return (
            <a href={fragment.href}
               target={fragment.target}
               rel={fragment.rel}
               {...commonProps}>
                {content}
            </a>
        )
    }

    return (
        <span {...commonProps}>
            {content}
        </span>
    )
}

function renderMarkedText(fragment) {
    let content = fragment.text

    if (fragment.marks?.em) {
        content = <em>{content}</em>
    }

    if (fragment.marks?.strong) {
        content = <strong>{content}</strong>
    }

    if (fragment.marks?.highlight) {
        content = <span className={`text-primary`}>{content}</span>
    }

    return content
}

function getIconSize(width) {
    if (width <= 576) return 64
    if (width <= 992) return 72
    return 84
}

function getRailGap(lineHeight = 0) {
    return Math.max(8, Math.round(lineHeight * 0.45))
}

function findBalancedParagraphSplit(
    paragraphs,
    typography,
    maxWidth,
    iconCenterX,
    iconSize,
    horizontalPadding
) {
    if (!Array.isArray(paragraphs) || paragraphs.length <= 1) return paragraphs.length
    if (!typography || maxWidth <= 0) return Math.ceil(paragraphs.length / 2)

    const obstacle = {
        left: Math.max(0, iconCenterX - iconSize / 2),
        top: 0,
        width: iconSize,
        height: 100000,
        horizontalPadding,
        verticalPadding: 0,
        includeInHeight: false
    }

    let bestIndex = 1
    let bestScore = Number.POSITIVE_INFINITY

    for (let index = 1; index < paragraphs.length; index++) {
        const topHeight = layoutDraggableInlineParagraphs(paragraphs.slice(0, index), typography, maxWidth, obstacle).totalHeight
        const bottomHeight = layoutDraggableInlineParagraphs(paragraphs.slice(index), typography, maxWidth, obstacle).totalHeight
        const score = Math.abs(topHeight - bottomHeight)

        if (score < bestScore) {
            bestScore = score
            bestIndex = index
        }
    }

    return bestIndex
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

export default PretextDraggableInlineIconText
