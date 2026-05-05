import "./PretextDraggableInlineIconText.scss"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { parseDraggableInlineHtml } from "./pretextDraggableInlineFlow.js"

const POINTER_KEYBOARD_STEP = 0.05

function PretextDraggableInlineIconText({
    html,
    faIcon,
    iconStyle,
    alt,
    initialXRatio = 0.5,
    className = "",
    onRatioChange = null
}) {
    const railRef = useRef(null)
    const dragStateRef = useRef(null)
    const xRatioRef = useRef(clamp(initialXRatio, 0, 1))

    const [xRatio, setXRatio] = useState(() => clamp(initialXRatio, 0, 1))
    const [isDragging, setIsDragging] = useState(false)

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
        return () => {
            dragStateRef.current = null
        }
    }, [])

    useEffect(() => {
        if (!isDragging) return

        const handlePointerMove = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            setXRatio(getRatioFromClientX(event.clientX, railRef.current))
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
    }, [isDragging])

    const handlePointerDown = event => {
        if (!hasRail) return

        event.preventDefault()

        const nextRatio = getRatioFromClientX(event.clientX, railRef.current)
        setXRatio(nextRatio)

        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId
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
                         onPointerDown={handlePointerDown}>
                        <div className={`pretext-draggable-inline-icon-text-rail`}
                             aria-hidden={true}>
                            <span className={`pretext-draggable-inline-icon-text-rail-line`}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-progress`}
                                  style={{ width: `${xRatio * 100}%` }}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-dot pretext-draggable-inline-icon-text-rail-dot-start`}/>
                            <span className={`pretext-draggable-inline-icon-text-rail-dot pretext-draggable-inline-icon-text-rail-dot-end`}/>
                        </div>

                        <button type={`button`}
                                className={`pretext-draggable-inline-icon-text-handle ${isDragging ? "is-dragging" : ""}`}
                                style={{
                                    left: `${xRatio * 100}%`,
                                    ...(iconStyle || {})
                                }}
                                aria-label={alt || "Hue slider"}
                                aria-orientation={`horizontal`}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.round(xRatio * 100)}
                                aria-valuetext={`${Math.round(xRatio * 100)} percent`}
                                role={`slider`}
                                onPointerDown={handlePointerDown}
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

function getRatioFromClientX(clientX, element) {
    if (!element) return 0.5

    const bounds = element.getBoundingClientRect()
    if (bounds.width <= 0) return 0.5

    return clamp((clientX - bounds.left) / bounds.width, 0, 1)
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
