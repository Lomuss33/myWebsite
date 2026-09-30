import "./PretextDraggableInlineIconText.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { parseDraggableInlineHtml } from "./pretextDraggableInlineFlow.js"

const POINTER_KEYBOARD_STEP = 0.05
const DRAG_EDGE_SPEED = 0.025
const DRAG_CENTER_SPEED = 2.3

function PretextDraggableInlineIconText({
    html,
    faIcon,
    iconStyle,
    alt,
    initialXRatio = 0.5,
    className = "",
    onRatioChange = null,
    getAriaValueText = null
}) {
    const railRef = useRef(null)
    const dragStateRef = useRef(null)
    const xRatioRef = useRef(clamp(initialXRatio, 0, 1))

    const [xRatio, setXRatio] = useState(() => clamp(initialXRatio, 0, 1))
    const [isDragging, setIsDragging] = useState(false)

    const finishPointerDrag = useCallback(event => {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) return

        if (dragState.frameId !== null) cancelAnimationFrame(dragState.frameId)
        releasePointerCapture(dragState)
        dragStateRef.current = null
        setIsDragging(false)
    }, [])

    const paragraphs = useMemo(() => {
        return parseDraggableInlineHtml(html)
    }, [html])

    const introParagraph = paragraphs[0] || null
    const bodyParagraphs = introParagraph ? paragraphs.slice(1) : []
    const hasRail = Boolean(introParagraph && bodyParagraphs.length > 0)

    useEffect(() => {
        const nextRatio = clamp(initialXRatio, 0, 1)
        xRatioRef.current = nextRatio
        setXRatio(nextRatio)
    }, [initialXRatio, html])

    useEffect(() => {
        xRatioRef.current = xRatio
        onRatioChange?.(xRatio)
    }, [onRatioChange, xRatio])

    useEffect(() => {
        if (!isDragging) return

        const advanceDrag = timestamp => {
            const dragState = dragStateRef.current
            if (!dragState) return

            dragState.frameId = null
            const elapsedSeconds = clamp((timestamp - dragState.lastFrameTime) / 1000, 0, 0.05)
            dragState.lastFrameTime = timestamp

            const currentRatio = xRatioRef.current
            const distance = dragState.targetRatio - currentRatio
            if (distance === 0) return

            const step = getDragSpeed(currentRatio) * elapsedSeconds
            const nextRatio = Math.abs(distance) <= step ? dragState.targetRatio : currentRatio + Math.sign(distance) * step
            xRatioRef.current = nextRatio
            setXRatio(nextRatio)
            if (nextRatio !== dragState.targetRatio) scheduleDragFrame(dragState)
        }

        const scheduleDragFrame = dragState => {
            if (dragState.frameId !== null) return
            dragState.lastFrameTime = performance.now()
            dragState.frameId = requestAnimationFrame(advanceDrag)
        }

        const handlePointerMove = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            const travelWidth = getRailTravelWidth(railRef.current)
            const pointerDelta = travelWidth > 0 ? (event.clientX - dragState.startClientX) / travelWidth : 0
            dragState.targetRatio = clamp(dragState.startRatio + pointerDelta, 0, 1)
            scheduleDragFrame(dragState)
        }

        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", finishPointerDrag)
        window.addEventListener("pointercancel", finishPointerDrag)
        if (dragStateRef.current) scheduleDragFrame(dragStateRef.current)

        return () => {
            const dragState = dragStateRef.current
            if (dragState && dragState.frameId !== null) {
                cancelAnimationFrame(dragState.frameId)
                dragState.frameId = null
            }
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", finishPointerDrag)
            window.removeEventListener("pointercancel", finishPointerDrag)
        }
    }, [finishPointerDrag, isDragging])

    const handlePointerDown = event => {
        if (!hasRail || dragStateRef.current) return

        event.preventDefault()

        const startedOnHandle = Boolean(event.target.closest?.("button.pretext-draggable-inline-icon-text-handle"))
        const targetRatio = startedOnHandle ? xRatioRef.current : getPointerRatioFromClientX(event.clientX, railRef.current)

        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startRatio: targetRatio,
            targetRatio,
            frameId: null,
            lastFrameTime: 0
        }
        capturePointer(event)
        setIsDragging(true)
    }

    const handleKeyDown = event => {
        if (!hasRail) return

        if (event.key === "ArrowLeft") {
            event.preventDefault()
            setXRatio(currentRatio => clamp(currentRatio - POINTER_KEYBOARD_STEP, 0, 1))
            return
        }

        if (event.key === "ArrowRight") {
            event.preventDefault()
            setXRatio(currentRatio => clamp(currentRatio + POINTER_KEYBOARD_STEP, 0, 1))
            return
        }

        if (event.key === "Home") {
            event.preventDefault()
            setXRatio(0)
            return
        }

        if (event.key === "End") {
            event.preventDefault()
            setXRatio(1)
        }
    }

    const ariaValueText = getAriaValueText?.(xRatio) || `${Math.round(xRatio * 100)} percent`
    const railPosition = getRailPositionValue(xRatio)

    return (
        <div className={`pretext-draggable-inline-icon-text ${isDragging ? "is-dragging" : ""} ${className}`.trim()}>
            {introParagraph && (
                <ParagraphBlock paragraph={introParagraph}
                                className={`pretext-draggable-inline-icon-text-intro text-3`}/>
            )}

            {hasRail && (
                <div className={`pretext-draggable-inline-icon-text-rail-block`}>
                    <div ref={railRef}
                         className={`pretext-draggable-inline-icon-text-rail-hit-area`}
                         onPointerDown={handlePointerDown}
                         onPointerUp={finishPointerDrag}
                         onPointerCancel={finishPointerDrag}>
                        <div className={`pretext-draggable-inline-icon-text-rail`}
                             aria-hidden={true}>
                            <span className={`pretext-draggable-inline-icon-text-rail-line`}/>
                        </div>

                        <button type={`button`}
                                className={`pretext-draggable-inline-icon-text-handle ${isDragging ? "is-dragging" : ""}`}
                                style={{
                                    left: railPosition,
                                    ...(iconStyle || {})
                                }}
                                aria-label={alt || "Hue slider"}
                                aria-orientation={`horizontal`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(xRatio * 100)}
                                aria-valuetext={ariaValueText}
                                role={`slider`}
                                onKeyDown={handleKeyDown}>
                            <span className={`pretext-draggable-inline-icon-text-handle-icon`}>
                                <i className={faIcon}/>
                            </span>
                        </button>
                    </div>
                </div>
            )}

            {bodyParagraphs.length > 0 && (
                <div className={`pretext-draggable-inline-icon-text-body`}>
                    {bodyParagraphs.map((paragraph, index) => (
                        <ParagraphBlock key={`body-${index}`}
                                        paragraph={paragraph}
                                        className={`pretext-draggable-inline-icon-text-paragraph text-3`}/>
                    ))}
                </div>
            )}
        </div>
    )
}

function ParagraphBlock({ paragraph, className = "" }) {
    return (
        <p className={className}>
            {paragraph.runs.map((run, index) => (
                <FlowFragment key={`${paragraph.block}-${index}-${run.text}`}
                              fragment={{
                                  href: run.href,
                                  marks: run.marks,
                                  rel: run.rel,
                                  target: run.target,
                                  text: run.text
                              }}/>
            ))}
        </p>
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

    if (fragment.href) {
        return (
            <a href={fragment.href}
               target={fragment.target}
               rel={fragment.rel}
               className={classNames}>
                {content}
            </a>
        )
    }

    return (
        <span className={classNames}>
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

function getPointerRatioFromClientX(clientX, element) {
    if (!element) return 0.5

    const bounds = element.getBoundingClientRect()
    const safeInset = getRailSafeInset(element)
    const travelWidth = bounds.width - safeInset * 2
    if (travelWidth <= 0) return 0.5

    return clamp((clientX - bounds.left - safeInset) / travelWidth, 0, 1)
}

function getRailSafeInset(element) {
    const handle = element?.querySelector("button.pretext-draggable-inline-icon-text-handle")
    return handle ? handle.offsetWidth / 2 + 2 : 0
}

function getRailTravelWidth(element) {
    if (!element) return 0
    return Math.max(0, element.getBoundingClientRect().width - getRailSafeInset(element) * 2)
}

function getDragSpeed(handleRatio) {
    const distanceFromCenter = Math.abs(handleRatio - 0.5) * 2
    const edgeFalloff = (1 - distanceFromCenter ** 3) ** 4
    return DRAG_EDGE_SPEED + DRAG_CENTER_SPEED * edgeFalloff
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function getRailPositionValue(xRatio) {
    const safeRatio = clamp(xRatio, 0, 1)
    return `calc(var(--pretext-draggable-inline-icon-text-handle-safe-inset, 0px) + ${safeRatio} * (100% - (var(--pretext-draggable-inline-icon-text-handle-safe-inset, 0px) * 2)))`
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
