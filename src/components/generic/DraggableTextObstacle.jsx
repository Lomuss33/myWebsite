import { memo, useCallback, useEffect, useRef, useState } from "react"
import { animate, useReducedMotion } from "motion/react"

// A movable DOM illustration or word whose bounds can drive a text exclusion.
function DraggableTextObstacle({ children, className = "", boundaryRef, barrierRef, resistanceRef, resistance = 0, resistanceRampSeconds = 3, onBoundsChange, shapeSelector }) {
    const surfaceRef = useRef(null)
    const dragRef = useRef(null)
    const positionRef = useRef({ x: 0, y: 0 })
    const animationRef = useRef(null)
    const moveFrameRef = useRef(0)
    const pendingPointRef = useRef(null)
    const reducedMotion = useReducedMotion()
    const [dragging, setDragging] = useState(false)

    const place = useCallback((x, y) => {
        const surface = surfaceRef.current
        if (!surface) return
        if (x === 0 && y === 0) {
            positionRef.current = { x: 0, y: 0 }
            surface.style.transform = "none"
            onBoundsChange(null)
            return
        }
        const word = (shapeSelector && surface.querySelector(shapeSelector)) || surface
        // Read geometry before writing the transform. Re-read-free bounds after
        // the write avoid forcing layout on every pointer update.
        const current = word.getBoundingClientRect()
        const base = { left: current.left - positionRef.current.x, top: current.top - positionRef.current.y, width: current.width, height: current.height }
        const boundary = boundaryRef.current?.getBoundingClientRect()
        const barrier = barrierRef?.current?.getBoundingClientRect()
        const next = resolveTextObstaclePosition(base, { x, y }, boundary, barrier)
        positionRef.current = next
        surface.style.transform = `translate(${next.x}px, ${next.y}px)`
        onBoundsChange(next.x || next.y ? { left: base.left + next.x, top: base.top + next.y, width: base.width, height: base.height } : null)
    }, [barrierRef, boundaryRef, onBoundsChange, shapeSelector])

    useEffect(() => {
        const finish = event => {
            const drag = dragRef.current
            if (!drag || (event.pointerId != null && event.pointerId !== drag.pointerId)) return
            if (moveFrameRef.current) cancelAnimationFrame(moveFrameRef.current)
            moveFrameRef.current = 0
            const pendingPoint = pendingPointRef.current
            pendingPointRef.current = null
            if (pendingPoint) applyMove(pendingPoint)
            if (event.type === "pointerup") applyMove(event)
            dragRef.current = null
            const surface = surfaceRef.current
            if (surface?.hasPointerCapture?.(drag.pointerId)) {
                try { surface.releasePointerCapture(drag.pointerId) } catch { /* Pointer may already have been released by the browser. */ }
            }
            setDragging(false)
            const from = { ...positionRef.current }
            const excursion = Math.hypot(from.x, from.y)
            animationRef.current = animate(0, 1, {
                ...(reducedMotion ? { duration: 0 } : { duration: Math.min(5, Math.max(1.6, 1.6 + excursion / 70)), ease: "linear" }),
                onUpdate: progress => place(from.x * (1 - progress), from.y * (1 - progress)),
                onComplete: () => place(0, 0)
            })
        }
        const applyMove = event => {
            const drag = dragRef.current
            if (!drag || event.pointerId !== drag.pointerId) return
            const surface = surfaceRef.current
            const shape = (shapeSelector && surface.querySelector(shapeSelector)) || surface
            // Sustained pulling can overcome some resistance, while preserving
            // a firm drag feel for the entire gesture.
            const progress = resistanceRampSeconds > 0
                ? Math.min(1, (performance.now() - drag.startedAt) / (resistanceRampSeconds * 1000))
                : 0
            const effectiveResistance = resistance * (1 - 0.4 * progress)
            const delta = resistTextDrag(shape.getBoundingClientRect(), resistanceRef?.current?.getBoundingClientRect(),
                event.clientX - drag.clientX, event.clientY - drag.clientY, effectiveResistance)
            drag.clientX = event.clientX
            drag.clientY = event.clientY
            place(positionRef.current.x + delta.x, positionRef.current.y + delta.y)
        }
        const move = event => {
            if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) return
            event.preventDefault()
            pendingPointRef.current = { pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY }
            if (moveFrameRef.current) return
            moveFrameRef.current = requestAnimationFrame(() => {
                moveFrameRef.current = 0
                const point = pendingPointRef.current
                pendingPointRef.current = null
                if (point) applyMove(point)
            })
        }
        window.addEventListener("pointermove", move, { passive: false })
        window.addEventListener("pointerup", finish)
        window.addEventListener("pointercancel", finish)
        window.addEventListener("lostpointercapture", finish)
        window.addEventListener("blur", finish)
        return () => {
            animationRef.current?.stop()
            if (moveFrameRef.current) cancelAnimationFrame(moveFrameRef.current)
            window.removeEventListener("pointermove", move)
            window.removeEventListener("pointerup", finish)
            window.removeEventListener("pointercancel", finish)
            window.removeEventListener("lostpointercapture", finish)
            window.removeEventListener("blur", finish)
        }
    }, [place, reducedMotion, resistanceRef, resistance, resistanceRampSeconds, shapeSelector])

    useEffect(() => {
        const reset = () => {
            animationRef.current?.stop()
            if (moveFrameRef.current) cancelAnimationFrame(moveFrameRef.current)
            moveFrameRef.current = 0
            pendingPointRef.current = null
            const drag = dragRef.current
            dragRef.current = null
            if (drag && surfaceRef.current?.hasPointerCapture?.(drag.pointerId)) {
                try { surfaceRef.current.releasePointerCapture(drag.pointerId) } catch { /* Pointer may already have been released by the browser. */ }
            }
            setDragging(false)
            place(0, 0)
        }
        window.addEventListener("resize", reset)
        return () => window.removeEventListener("resize", reset)
    }, [place])

    return <div ref={surfaceRef} className={`${className} ${dragging ? "is-dragging" : ""}`}
                style={{ touchAction: "none", position: "relative", zIndex: 5 }}
                onPointerDown={event => {
                    if (!event.isPrimary || (event.pointerType === "mouse" && event.button !== 0)) return
                    if (event.target.closest?.("button, a, input")) return
                    event.preventDefault()
                    animationRef.current?.stop()
                    dragRef.current = { pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY, startedAt: performance.now(), ...positionRef.current }
                    try { event.currentTarget.setPointerCapture(event.pointerId) } catch { /* Window listeners remain as a fallback. */ }
                    setDragging(true)
                }}>{children}</div>
}

export default memo(DraggableTextObstacle)

export function resolveTextObstaclePosition(base, desired, boundary, barrier, padding = 6) {
    let x = desired.x
    let y = desired.y
    if (boundary) {
        x = Math.max(boundary.left - base.left, Math.min(x, boundary.right - base.left - base.width))
        y = Math.max(boundary.top - base.top, Math.min(y, boundary.bottom - base.top - base.height))
    }
    if (!barrier) return { x, y }
    const left = base.left + x
    const top = base.top + y
    if (left + base.width <= barrier.left - padding || left >= barrier.right + padding || top + base.height <= barrier.top - padding || top >= barrier.bottom + padding) return { x, y }
    const candidates = [
        { x, y: barrier.top - padding - base.height - base.top },
        { x, y: barrier.bottom + padding - base.top },
        { x: barrier.left - padding - base.width - base.left, y },
        { x: barrier.right + padding - base.left, y }
    ].filter(candidate => !boundary || (
        base.left + candidate.x >= boundary.left && base.left + candidate.x + base.width <= boundary.right &&
        base.top + candidate.y >= boundary.top && base.top + candidate.y + base.height <= boundary.bottom
    ))
    candidates.sort((a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y))
    return candidates[0] || { x: 0, y: 0 }
}

// Swept rectangle contact: even a single fast pointer move meets resistance
// at the copy's edge instead of jumping through it at full speed.
export function resistTextDrag(shape, region, dx, dy, resistance) {
    if (!region || resistance <= 0) return { x: dx, y: dy }
    let entry = 0
    let exit = 1
    for (const [position, delta, min, max] of [
        [shape.left, dx, region.left - shape.width, region.right],
        [shape.top, dy, region.top - shape.height, region.bottom]
    ]) {
        if (delta === 0) {
            if (position < min || position > max) return { x: dx, y: dy }
            continue
        }
        const first = (min - position) / delta
        const last = (max - position) / delta
        entry = Math.max(entry, Math.min(first, last))
        exit = Math.min(exit, Math.max(first, last))
    }
    if (entry > exit || exit < 0 || entry > 1) return { x: dx, y: dy }
    const freePart = Math.max(0, Math.min(1, entry))
    const factor = freePart + (1 - freePart) * Math.max(0.04, 1 - resistance)
    return { x: dx * factor, y: dy * factor }
}
