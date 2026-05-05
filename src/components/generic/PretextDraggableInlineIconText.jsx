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
    const xRatioRef = useRef(clamp(initialXRatio, 0, 1))
    const frameRef = useRef(0)

    const [contentWidth, setContentWidth] = useState(0)
    const [typography, setTypography] = useState(null)
    const [xRatio, setXRatio] = useState(() => clamp(initialXRatio, 0, 1))
    const [isDragging, setIsDragging] = useState(false)

    const paragraphs = useMemo(() => {
        return parseDraggableInlineHtml(html)
    }, [html])

    useEffect(() => {
        const nextRatio = clamp(initialXRatio, 0, 1)
        xRatioRef.current = nextRatio
        setXRatio(nextRatio)
    }, [initialXRatio, html])

    useEffect(() => {
        xRatioRef.current = xRatio
    }, [xRatio])

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
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current)
                frameRef.current = 0
            }
        }
    }, [])

    const iconSize = getIconSize(contentWidth)
    const obstacleWidth = getObstacleWidth(typography?.lineHeight, iconSize)
    const obstaclePadding = getObstaclePadding(typography?.lineHeight, contentWidth)
    const minimumSlotWidth = getMinimumSlotWidth(typography?.lineHeight, contentWidth)
    const spineWidth = getSpineWidth(obstacleWidth)
    const trackInset = Math.max(iconSize / 2, obstacleWidth / 2 + obstaclePadding + 18)
    const trackMinX = trackInset
    const trackMaxX = Math.max(trackMinX, contentWidth - trackInset)
    const trackWidth = Math.max(1, trackMaxX - trackMinX)
    const iconCenterX = trackMinX + trackWidth * xRatio
    const railZoneHeight = getRailZoneHeight(typography?.lineHeight)

    useEffect(() => {
        if (!isDragging) return

        const handlePointerMove = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            if (dragState.mode === "track") {
                scheduleRatioUpdate(getRatioFromClientX(event.clientX, contentRef.current, trackMinX, trackWidth))
                return
            }

            const nextRatio = dragState.startRatio + (event.clientX - dragState.startClientX) / trackWidth
            scheduleRatioUpdate(clamp(nextRatio, 0, 1))
        }

        const finishPointerDrag = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            releasePointerCapture(dragState)
            dragStateRef.current = null
            setIsDragging(false)
        }

        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", finishPointerDrag)
        window.addEventListener("pointercancel", finishPointerDrag)

        return () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", finishPointerDrag)
            window.removeEventListener("pointercancel", finishPointerDrag)
        }
    }, [isDragging, trackMinX, trackWidth])

    const flowObstacle = useMemo(() => {
        if (!typography || contentWidth <= 0) return null

        return {
            left: Math.max(0, iconCenterX - obstacleWidth / 2),
            top: 0,
            width: obstacleWidth,
            height: 100000,
            horizontalPadding: obstaclePadding,
            minimumSlotWidth,
            verticalPadding: 0,
            includeInHeight: false
        }
    }, [contentWidth, iconCenterX, minimumSlotWidth, obstaclePadding, obstacleWidth, typography])

    const textLayout = useMemo(() => {
        return layoutDraggableInlineParagraphs(paragraphs, typography, contentWidth, flowObstacle)
    }, [contentWidth, flowObstacle, paragraphs, typography])

    const hasRenderableContent = textLayout.totalHeight > 0
    const textOffsetY = hasRenderableContent ? railZoneHeight : 0
    const totalHeight = hasRenderableContent ? railZoneHeight + textLayout.totalHeight : 0
    const railCenterY = hasRenderableContent ? railZoneHeight / 2 : 0

    const handleHandlePointerDown = event => {
        if (!contentWidth) return

        event.preventDefault()

        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId,
            mode: "handle",
            startClientX: event.clientX,
            startRatio: xRatioRef.current
        }
        capturePointer(event)
        setIsDragging(true)
    }

    const handleTrackPointerDown = event => {
        if (!contentWidth) return

        event.preventDefault()

        const nextRatio = getRatioFromClientX(event.clientX, contentRef.current, trackMinX, trackWidth)
        xRatioRef.current = nextRatio
        setXRatio(nextRatio)
        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId,
            mode: "track"
        }
        capturePointer(event)
        setIsDragging(true)
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
        <div className={`pretext-draggable-inline-icon-text ${isDragging ? "is-dragging" : ""} ${className}`}
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
                    <div className={`pretext-draggable-inline-icon-text-spine`}
                         style={{
                             left: `${iconCenterX - spineWidth / 2}px`,
                             width: `${spineWidth}px`,
                             height: `${totalHeight}px`
                         }}
                         aria-hidden={true}/>
                )}

                {totalHeight > 0 && (
                    <div className={`pretext-draggable-inline-icon-text-rail-hit-area`}
                         style={{ top: `${railCenterY}px` }}
                         onPointerDown={handleTrackPointerDown}>
                        <div className={`pretext-draggable-inline-icon-text-rail`}
                             aria-hidden={true}>
                            <span className={`pretext-draggable-inline-icon-text-rail-line`}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-progress`}
                                  style={{ width: `${iconCenterX}px` }}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-dot pretext-draggable-inline-icon-text-rail-dot-start`}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-dot pretext-draggable-inline-icon-text-rail-dot-end`}/>
                        </div>
                    </div>
                )}

                {totalHeight > 0 && (
                    <button type={`button`}
                            className={`pretext-draggable-inline-icon-text-handle ${isDragging ? "is-dragging" : ""}`}
                            style={{
                                left: `${iconCenterX - iconSize / 2}px`,
                                top: `${Math.max(0, railCenterY - iconSize / 2)}px`,
                                ...(iconStyle || {})
                            }}
                            aria-label={alt || "Draggable inline icon"}
                            aria-orientation={`horizontal`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(xRatio * 100)}
                            role={`slider`}
                            onPointerDown={handleHandlePointerDown}
                            onKeyDown={handleKeyDown}>
                        <span className={`pretext-draggable-inline-icon-text-handle-icon`}>
                            <i className={faIcon}/>
                        </span>
                    </button>
                )}

                <div className={`pretext-draggable-inline-icon-text-lines ${isDragging ? "is-dragging" : ""} text-3`}
                     style={typography ? {
                         lineHeight: `${typography.lineHeight}px`
                     } : undefined}>
                    {textLayout.lines.map(line => (
                        <div key={line.key}
                             className={`pretext-draggable-inline-icon-text-line`}
                             style={{
                                 top: `${line.y + textOffsetY}px`,
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

    function scheduleRatioUpdate(nextRatio) {
        const clampedRatio = clamp(nextRatio, 0, 1)
        xRatioRef.current = clampedRatio

        if (frameRef.current) return

        frameRef.current = requestAnimationFrame(() => {
            frameRef.current = 0
            setXRatio(currentRatio => {
                if (Math.abs(currentRatio - xRatioRef.current) < 0.0005) return currentRatio
                return xRatioRef.current
            })
        })
    }
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
    if (width <= 576) return 66
    if (width <= 992) return 74
    return 84
}

function getRailZoneHeight(lineHeight = 0) {
    return Math.max(34, Math.round(lineHeight * 1.22))
}

function getObstacleWidth(lineHeight = 0, iconSize = 0) {
    const lineBasedWidth = lineHeight > 0 ? Math.round(lineHeight * 0.52) : 18
    const iconBasedWidth = iconSize > 0 ? Math.round(iconSize * 0.22) : 18
    return Math.max(16, Math.min(24, Math.max(lineBasedWidth, iconBasedWidth)))
}

function getObstaclePadding(lineHeight = 0, contentWidth = 0) {
    const lineBasedPadding = lineHeight > 0 ? Math.round(lineHeight * 0.28) : 10
    if (contentWidth <= 576) return Math.max(8, lineBasedPadding - 1)
    if (contentWidth <= 992) return Math.max(10, lineBasedPadding)
    return Math.max(12, lineBasedPadding)
}

function getSpineWidth(obstacleWidth) {
    return Math.max(10, Math.round(obstacleWidth * 0.72))
}

function getMinimumSlotWidth(lineHeight = 0, contentWidth = 0) {
    const lineBasedWidth = lineHeight > 0 ? Math.round(lineHeight * 2.6) : 68
    const maxAllowedWidth = Math.max(52, Math.round(contentWidth * 0.32))
    return Math.min(maxAllowedWidth, Math.max(56, lineBasedWidth))
}

function getRatioFromClientX(clientX, element, trackMinX, trackWidth) {
    if (!element) return 0

    const bounds = element.getBoundingClientRect()
    const localX = clientX - bounds.left
    return clamp((localX - trackMinX) / trackWidth, 0, 1)
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function capturePointer(event) {
    if (!event.currentTarget?.setPointerCapture) return

    try {
        event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
        // Ignore pointer-capture failures.
    }
}

function releasePointerCapture(dragState) {
    if (!dragState?.captureTarget?.releasePointerCapture) return

    try {
        dragState.captureTarget.releasePointerCapture(dragState.pointerId)
    } catch {
        // Ignore release failures.
    }
}

export default PretextDraggableInlineIconText
