import "./PretextDraggableInlineIconText.scss"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { parseDraggableInlineHtml } from "./pretextDraggableInlineFlow.js"

const POINTER_KEYBOARD_STEP = 0.05
const TOUCH_DRAG_THRESHOLD = 6
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
    const motionRef = useRef({targetRatio: xRatioRef.current, frameId: null, lastFrameTime: null, release: null})
    const reducedMotionRef = useRef(false)

    const [xRatio, setXRatio] = useState(() => clamp(initialXRatio, 0, 1))
    const [isDragging, setIsDragging] = useState(false)

    const updateRatio = useCallback(value => {
        const nextRatio = clamp(value, 0, 1)
        xRatioRef.current = nextRatio
        setXRatio(nextRatio)
    }, [])

    const stopMotion = useCallback(() => {
        const motion = motionRef.current
        if (motion.frameId !== null) cancelAnimationFrame(motion.frameId)
        motion.frameId = null
        motion.lastFrameTime = null
        motion.release = null
        motion.targetRatio = xRatioRef.current
    }, [])

    const moveTowardRatio = useCallback((value, settle = false) => {
        const motion = motionRef.current
        const targetRatio = clamp(value, 0, 1)
        const currentRatio = xRatioRef.current
        const movingTowardCenter = currentRatio < 0.5 ? targetRatio > currentRatio :
            currentRatio > 0.5 && targetRatio < currentRatio
        if (movingTowardCenter) {
            // Return freely to the center. If the gesture crosses it, only
            // the remaining travel into the opposite half gets resistance.
            stopMotion()
            const inwardRatio = currentRatio < 0.5 ? Math.min(targetRatio, 0.5) : Math.max(targetRatio, 0.5)
            updateRatio(inwardRatio)
            if (inwardRatio === targetRatio) return
        }
        motion.targetRatio = targetRatio
        motion.release = settle ? {
            startRatio: xRatioRef.current,
            startTime: performance.now(),
            duration: clamp(Math.abs(motion.targetRatio - xRatioRef.current) * 500, 120, 420)
        } : null

        if (reducedMotionRef.current) {
            const target = motion.targetRatio
            stopMotion()
            updateRatio(target)
            return
        }
        if (motion.frameId !== null || motion.targetRatio === xRatioRef.current) return

        motion.lastFrameTime = performance.now()
        const advance = timestamp => {
            motion.frameId = null
            const currentRatio = xRatioRef.current
            let nextRatio
            if (motion.release) {
                // Finish the gesture with a short glide, rather than dropping
                // its final target or snapping directly to the pointer on up.
                const progress = clamp((timestamp - motion.release.startTime) / motion.release.duration, 0, 1)
                const eased = 1 - (1 - progress) ** 3
                nextRatio = progress === 1 ? motion.targetRatio :
                    motion.release.startRatio + (motion.targetRatio - motion.release.startRatio) * eased
            } else {
                const elapsed = clamp((timestamp - motion.lastFrameTime) / 1000, 0, 0.05)
                const distance = motion.targetRatio - currentRatio
                const step = getDragSpeed(currentRatio) * elapsed
                nextRatio = Math.abs(distance) <= step ? motion.targetRatio :
                    currentRatio + Math.sign(distance) * step
            }
            // Keep the previous frame's timestamp; pointer events must not
            // keep resetting the clock and starving movement on slow frames.
            motion.lastFrameTime = timestamp
            updateRatio(nextRatio)
            if (nextRatio !== motion.targetRatio) {
                motion.frameId = requestAnimationFrame(advance)
            } else {
                motion.lastFrameTime = null
                motion.release = null
            }
        }
        motion.frameId = requestAnimationFrame(advance)
    }, [stopMotion, updateRatio])

    const cancelPointerDrag = useCallback(() => {
        stopMotion()
        const dragState = dragStateRef.current
        if (!dragState) return

        dragStateRef.current = null
        releasePointerCapture(dragState)
        setIsDragging(false)
    }, [stopMotion])

    const updatePointerTarget = useCallback((event, commit = false) => {
        const dragState = dragStateRef.current
        if (!dragState || dragState.pointerId !== event.pointerId) return

        if (dragState.pendingTouch) {
            const deltaX = Math.abs(event.clientX - dragState.startClientX)
            const deltaY = Math.abs(event.clientY - dragState.startClientY)
            if (deltaY > TOUCH_DRAG_THRESHOLD && deltaY > deltaX) {
                cancelPointerDrag()
                return
            }
            if (!commit && deltaX < TOUCH_DRAG_THRESHOLD) return
            dragState.pendingTouch = false
            setIsDragging(true)
        }

        const pointerRatio = getPointerRatioFromClientX(event.clientX - dragState.grabOffsetPx, railRef.current)
        const pointerDelta = dragState.lastPointerRatio === null ? 0 : pointerRatio - dragState.lastPointerRatio
        const currentRatio = xRatioRef.current
        const pullingInward = currentRatio < 0.5 ? pointerDelta > 0 : currentRatio > 0.5 && pointerDelta < 0
        if (pullingInward) {
            // An outward drag can leave the handle behind the pointer. Rebase
            // on reversal so pulling inward never makes it jump farther out.
            dragState.targetRatio = clamp(currentRatio + pointerDelta, 0, 1)
            dragState.ratioOffset = dragState.targetRatio - pointerRatio
        } else {
            dragState.targetRatio = clamp(pointerRatio + dragState.ratioOffset, 0, 1)
        }
        dragState.lastPointerRatio = pointerRatio
        moveTowardRatio(dragState.targetRatio)
    }, [cancelPointerDrag, moveTowardRatio])

    const finishPointerDrag = useCallback(event => {
        if (dragStateRef.current?.pointerId !== event.pointerId) return
        if (event.type !== 'pointerup') {
            cancelPointerDrag()
            return
        }
        updatePointerTarget(event, true)
        const dragState = dragStateRef.current
        if (!dragState) return
        dragStateRef.current = null
        releasePointerCapture(dragState)
        setIsDragging(false)
        moveTowardRatio(dragState.targetRatio, true)
    }, [cancelPointerDrag, moveTowardRatio, updatePointerTarget])

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const updatePreference = () => {
            reducedMotionRef.current = query.matches
            if (query.matches && motionRef.current.frameId !== null) {
                const target = motionRef.current.targetRatio
                stopMotion()
                updateRatio(target)
            }
        }
        updatePreference()
        query.addEventListener('change', updatePreference)
        return () => query.removeEventListener('change', updatePreference)
    }, [stopMotion, updateRatio])

    const paragraphs = useMemo(() => {
        return parseDraggableInlineHtml(html)
    }, [html])

    const introParagraph = paragraphs[0] || null
    const bodyParagraphs = introParagraph ? paragraphs.slice(1) : []
    const hasRail = Boolean(introParagraph && bodyParagraphs.length > 0)

    useEffect(() => {
        cancelPointerDrag()
        updateRatio(initialXRatio)
    }, [initialXRatio, html, cancelPointerDrag, updateRatio])

    useEffect(() => {
        onRatioChange?.(xRatio)
    }, [onRatioChange, xRatio])

    useEffect(() => {
        const onVisibilityChange = () => {
            if (document.hidden) cancelPointerDrag()
        }
        // Subscribe before a drag starts, including very quick clicks and
        // release outside the rail when pointer capture is unavailable.
        window.addEventListener("pointermove", updatePointerTarget)
        window.addEventListener("pointerup", finishPointerDrag)
        window.addEventListener("pointercancel", finishPointerDrag)
        window.addEventListener("blur", cancelPointerDrag)
        document.addEventListener('visibilitychange', onVisibilityChange)

        return () => {
            const dragState = dragStateRef.current
            dragStateRef.current = null
            stopMotion()
            releasePointerCapture(dragState)
            window.removeEventListener("pointermove", updatePointerTarget)
            window.removeEventListener("pointerup", finishPointerDrag)
            window.removeEventListener("pointercancel", finishPointerDrag)
            window.removeEventListener("blur", cancelPointerDrag)
            document.removeEventListener('visibilitychange', onVisibilityChange)
        }
    }, [cancelPointerDrag, finishPointerDrag, stopMotion, updatePointerTarget])

    const handlePointerDown = event => {
        if (!hasRail || dragStateRef.current || event.button !== 0 || event.isPrimary === false) return

        const isTouch = event.pointerType === 'touch'
        stopMotion()
        if (!isTouch) event.preventDefault()
        const handle = railRef.current?.querySelector('button.pretext-draggable-inline-icon-text-handle')
        const startedOnHandle = Boolean(event.target.closest?.("button.pretext-draggable-inline-icon-text-handle"))
        const handleRect = handle?.getBoundingClientRect()
        const grabOffsetPx = startedOnHandle && handleRect ? event.clientX - (handleRect.left + handleRect.width / 2) : 0

        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            grabOffsetPx,
            lastPointerRatio: startedOnHandle ? getPointerRatioFromClientX(event.clientX - grabOffsetPx, railRef.current) : null,
            ratioOffset: 0,
            pendingTouch: isTouch,
            targetRatio: xRatioRef.current
        }
        capturePointer(event)
        if (!isTouch) {
            handle?.focus({preventScroll: true})
            setIsDragging(true)
            if (!startedOnHandle) updatePointerTarget(event, true)
        }
    }

    const handleKeyDown = event => {
        if (!hasRail) return

        if (event.key === "ArrowLeft") {
            event.preventDefault()
            cancelPointerDrag()
            updateRatio(xRatioRef.current - POINTER_KEYBOARD_STEP)
            return
        }

        if (event.key === "ArrowRight") {
            event.preventDefault()
            cancelPointerDrag()
            updateRatio(xRatioRef.current + POINTER_KEYBOARD_STEP)
            return
        }

        if (event.key === "Home") {
            event.preventDefault()
            cancelPointerDrag()
            updateRatio(0)
            return
        }

        if (event.key === "End") {
            event.preventDefault()
            cancelPointerDrag()
            updateRatio(1)
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
                         onPointerCancel={finishPointerDrag}
                         onLostPointerCapture={finishPointerDrag}>
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
    // Pointer coordinates use painted pixels, while the CSS inset uses layout
    // pixels. Account for a scaled page/card without the handle's hover scale.
    const scale = element?.offsetWidth ? element.getBoundingClientRect().width / element.offsetWidth : 1
    return handle ? (handle.offsetWidth / 2 + 2) * scale : 0
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
