import "./FallingWords.scss"
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import Matter from "matter-js"

const DEFAULT_HIGHLIGHT_PREFIXES = ["\"30under30\"", "CTO", "Mythrill"]
const COLLISION_CATEGORIES = {
    walls: 0x0002,
    words: 0x0004
}

function FallingWords({
    entries,
    text,
    height = 320,
    splitRegex = /\s+/g,
    fontScale = 1,
    highlightPrefixes = DEFAULT_HIGHLIGHT_PREFIXES,
    definitionFallbackText = "Definition coming soon.",
    className = ""
}) {
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

    const containerRef = useRef(null)
    const wordRefs = useRef([])
    const rafRef = useRef(null)
    const cleanupRef = useRef(() => {})
    const engineRef = useRef(null)
    const wordBodiesRef = useRef([])
    const selectedIndexRef = useRef(null)
    const permanentRedIndicesRef = useRef(new Set())
    const [, forceRedRerender] = useState(0)
    const dragListenersCleanupRef = useRef(() => {})
    const dragStateRef = useRef({
        pointerId: null,
        index: null,
        captureTarget: null,
        moved: false,
        tapEligible: false,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        anchorOffsetX: 0,
        anchorOffsetY: 0,
        dragBoxWidth: 0,
        dragBoxHeight: 0,
        dragAngle: 0,
        dragCollisionMask: 0,
        dragBodyScale: 1,
        pointerType: null
    })
    const [layoutVersion, setLayoutVersion] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const _clearWordTransforms = () => {
        for(const element of wordRefs.current) {
            if(!element) continue
            element.style.transform = ""
            element.classList.remove("falling-word-held")
        }
    }

    const _resetDragState = () => {
        dragStateRef.current.pointerId = null
        dragStateRef.current.index = null
        dragStateRef.current.captureTarget = null
        dragStateRef.current.moved = false
        dragStateRef.current.tapEligible = false
        dragStateRef.current.anchorOffsetX = 0
        dragStateRef.current.anchorOffsetY = 0
        dragStateRef.current.dragBoxWidth = 0
        dragStateRef.current.dragBoxHeight = 0
        dragStateRef.current.dragAngle = 0
        dragStateRef.current.dragCollisionMask = 0
        dragStateRef.current.dragBodyScale = 1
        dragStateRef.current.pointerType = null
    }

    useEffect(() => {
        selectedIndexRef.current = selectedIndex
    }, [selectedIndex])

    const effectiveEntries = useMemo(() => {
        if(Array.isArray(entries) && entries.length) {
            return entries
                .map(entry => ({
                    word: String(entry?.word || "").trim(),
                    definition: entry?.definition ?? null
                }))
                .filter(entry => Boolean(entry.word))
        }

        const pattern = splitRegex instanceof RegExp ? splitRegex : /\s+/g
        return String(text || "")
            .split(pattern)
            .map(word => word.trim())
            .filter(Boolean)
            .map(word => ({ word, definition: null }))
    }, [entries, text, splitRegex])

    const words = useMemo(() => effectiveEntries.map(entry => entry.word), [effectiveEntries])

    const _bumpRed = () => forceRedRerender(v => v + 1)

    const _releaseDragCapture = () => {
        const dragState = dragStateRef.current
        if(!dragState?.captureTarget?.releasePointerCapture || dragState.pointerId == null) return

        try {
            dragState.captureTarget.releasePointerCapture(dragState.pointerId)
        } catch {
            // Ignore release failures. Some browsers auto-release capture first.
        }
    }

    const _clearDragTargetHeldClass = () => {
        const dragState = dragStateRef.current
        if(dragState.index == null) return

        const entry = wordBodiesRef.current[dragState.index]
        entry?.el?.classList.remove("falling-word-held")
    }

    const _clearDragListeners = () => {
        dragListenersCleanupRef.current?.()
        dragListenersCleanupRef.current = () => {}
    }

    const _clearDragPhysics = () => {
    }

    const _finalizePointerInteraction = () => {
        const dragState = dragStateRef.current
        const entry = dragState.index == null ? null : wordBodiesRef.current[dragState.index]

        _clearDragTargetHeldClass()
        _clearDragListeners()
        _clearDragPhysics()

        _releaseDragCapture()

        if(entry?.body) {
            if(dragState.dragBodyScale && dragState.dragBodyScale !== 1) {
                Matter.Body.scale(entry.body, 1 / dragState.dragBodyScale, 1 / dragState.dragBodyScale)
            }
            entry.body.collisionFilter.mask = dragState.dragCollisionMask ?? entry.body.collisionFilter.mask
        }

        dragState.captureTarget = null
        dragState.pointerId = null
        dragState.index = null
        dragState.moved = false
        dragState.tapEligible = false
        dragState.anchorOffsetX = 0
        dragState.anchorOffsetY = 0
        dragState.dragBoxWidth = 0
        dragState.dragBoxHeight = 0
        dragState.dragAngle = 0
        dragState.dragCollisionMask = 0
        dragState.dragBodyScale = 1
        dragState.pointerType = null
    }

    const applyPermanentRed = (index) => {
        if(index === null || index === undefined) return
        if(permanentRedIndicesRef.current.has(index)) return

        permanentRedIndicesRef.current.add(index)
        _bumpRed()
    }

    const isCoarsePointer = () => {
        if(typeof window === "undefined") return false
        if(window.matchMedia?.("(pointer: coarse)").matches) return true
        return Boolean(navigator?.maxTouchPoints)
    }

    useEffect(() => {
        if(typeof ResizeObserver === "function") return

        const onResize = () => setLayoutVersion(v => v + 1)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    useEffect(() => {
        if(typeof document === "undefined" || !document.fonts?.ready) return

        let cancelled = false
        document.fonts.ready.then(() => {
            if(cancelled) return
            setLayoutVersion(v => v + 1)
        })

        return () => {
            cancelled = true
        }
    }, [effectiveEntries])

    useEffect(() => {
        const container = containerRef.current
        if(!container || typeof ResizeObserver !== "function") return

        let raf = null
        const observer = new ResizeObserver(() => {
            if(raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => setLayoutVersion(v => v + 1))
        })

        observer.observe(container)
        return () => {
            observer.disconnect()
            if(raf) cancelAnimationFrame(raf)
        }
    }, [])

    useEffect(() => {
        if(selectedIndex === null) return

        const onKeyDown = (event) => {
            if(event.key === "Escape") {
                event.preventDefault()
                _closeSelection()
            }
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [selectedIndex])

    useLayoutEffect(() => {
        cleanupRef.current?.()
        _clearWordTransforms()
        _resetDragState()
        selectedIndexRef.current = null
        setIsReady(false)
        setSelectedIndex(null)

        const container = containerRef.current
        if(!container || words.length === 0) {
            cleanupRef.current = () => {}
            return
        }

        const { width, height: containerHeight } = _getContainerSize()

        if(width <= 0 || containerHeight <= 0) {
            cleanupRef.current = () => {}
            return
        }

        const Engine = Matter.Engine
        const World = Matter.World
        const Bodies = Matter.Bodies
        const Body = Matter.Body
        const engine = Engine.create({})
        engine.gravity.y = isCoarsePointer() ? 0.6 : 1
        engine.positionIterations = isCoarsePointer() ? 12 : 10
        engine.velocityIterations = isCoarsePointer() ? 10 : 8
        engine.constraintIterations = isCoarsePointer() ? 5 : 4
        engineRef.current = engine

        const wallThickness = 200
        const params = {
            isStatic: true,
            render: {visible: false},
            collisionFilter: {
                category: COLLISION_CATEGORIES.walls,
                mask: COLLISION_CATEGORIES.words
            }
        }

        const floor = Bodies.rectangle(
            width / 2,
            containerHeight + wallThickness / 2,
            width + wallThickness * 2,
            wallThickness,
            params
        )
        const wallLeft = Bodies.rectangle(
            -wallThickness / 2,
            containerHeight / 2,
            wallThickness,
            containerHeight + wallThickness * 2,
            params
        )
        const wallRight = Bodies.rectangle(
            width + wallThickness / 2,
            containerHeight / 2,
            wallThickness,
            containerHeight + wallThickness * 2,
            params
        )
        const ceiling = Bodies.rectangle(
            width / 2,
            -wallThickness / 2,
            width + wallThickness * 2,
            wallThickness,
            params
        )

        const wordBodies = effectiveEntries.map((_entry, index) => {
            const el = wordRefs.current[index]
            if(!el) return null

            const bodyWidth = el.offsetWidth || 10
            const bodyHeight = el.offsetHeight || 10
            const lanes = Math.max(7, Math.min(16, Math.floor(width / 120)))
            const lane = index % lanes
            const row = Math.floor(index / lanes)
            const rowCount = Math.max(1, Math.ceil(effectiveEntries.length / lanes))

            const laneWidth = width / lanes
            const xBase = (lane + 0.5) * laneWidth
            const xJitter = (Math.random() - 0.5) * laneWidth * 0.65
            const startX = clamp(
                xBase + xJitter,
                bodyWidth / 2 + 8,
                width - bodyWidth / 2 - 8
            )

            // Spread the initial spawn vertically so the stage reads as a full play area.
            const rowProgress = rowCount > 1 ? row / (rowCount - 1) : 0
            const verticalBand = Math.max(containerHeight * 0.72, 180)
            const startY = clamp(
                18 + rowProgress * verticalBand + (Math.random() - 0.5) * 14,
                10,
                Math.max(10, containerHeight - bodyHeight - 12)
            )

            const body = Bodies.rectangle(startX, startY, bodyWidth, bodyHeight, {
                friction: 0.26,
                frictionStatic: 0.95,
                frictionAir: isCoarsePointer() ? 0.035 : 0.018,
                restitution: 0.06,
                slop: 0.01,
                render: {visible: false},
                collisionFilter: {
                    category: COLLISION_CATEGORIES.words,
                    mask: COLLISION_CATEGORIES.words | COLLISION_CATEGORIES.walls
                }
            })

            // Slight initial horizontal drift to spread stacks without making them look floaty.
            Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.9, y: 0 })

            // Keep bodies from accumulating extreme rotations.
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.02)

            return {body, el, bodyWidth, bodyHeight}
        })

        wordBodiesRef.current = wordBodies

        World.add(engine.world, [
            floor,
            wallLeft,
            wallRight,
            ceiling,
            ...wordBodies.filter(Boolean).map(w => w.body)
        ])

        const fixedStep = 1000 / 60
        const maxAccumulatedTime = fixedStep * 5
        let lastTime = performance.now()
        let accumulator = 0
        const tick = (time) => {
            const delta = Math.max(0, time - lastTime) || fixedStep
            lastTime = time

            if(selectedIndexRef.current === null) {
                accumulator = Math.min(accumulator + delta, maxAccumulatedTime)
                while(accumulator >= fixedStep) {
                    const dragState = dragStateRef.current
                    if(dragState.index != null) {
                        const draggedEntry = wordBodiesRef.current[dragState.index]
                        if(draggedEntry) {
                            const dx = dragState.targetX - draggedEntry.body.position.x
                            const dy = dragState.targetY - draggedEntry.body.position.y
                            const distance = Math.hypot(dx, dy)
                            if(distance > 0.01) {
                                const pullStrength = isCoarsePointer() ? 0.0009 : 0.0012
                                const maxPull = isCoarsePointer() ? 0.08 : 0.1
                                const pullX = clamp(dx * pullStrength, -maxPull, maxPull)
                                const pullY = clamp(dy * pullStrength, -maxPull, maxPull)
                                Matter.Body.applyForce(draggedEntry.body, draggedEntry.body.position, {
                                    x: pullX,
                                    y: pullY
                                })
                            }

                            Matter.Body.setAngularVelocity(draggedEntry.body, draggedEntry.body.angularVelocity * 0.95)
                        }
                    }

                    Matter.Engine.update(engine, fixedStep)
                    accumulator -= fixedStep
                }
            }
            else {
                accumulator = 0
            }

            const activeSelectedIndex = selectedIndexRef.current
            for(let i = 0; i < wordBodies.length; i += 1) {
                const entry = wordBodies[i]
                if(!entry) continue

                const {body, el, bodyWidth, bodyHeight} = entry
                const x = body.position.x
                const y = body.position.y
                const isSelected = activeSelectedIndex === i
                const scale = isSelected ? 1.25 : 1
                el.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0) rotate(${body.angle}rad) scale(${scale})`
            }

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)
        setIsReady(true)

        cleanupRef.current = () => {
            if(rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
            try {
                Matter.World.clear(engine.world, false)
                Matter.Engine.clear(engine)
            } catch {
                // no-op
            }

            engineRef.current = null
            wordBodiesRef.current = []
            _clearWordTransforms()
            _clearDragListeners()
            _clearDragPhysics()
            _resetDragState()
        }

        return () => cleanupRef.current?.()
    }, [words, effectiveEntries, layoutVersion])

    const _getContainerSize = () => {
        const container = containerRef.current
        if(!container) {
            return { width: 0, height: 0 }
        }

        return {
            width: Math.floor(container.clientWidth || container.getBoundingClientRect().width || 0),
            height: Math.floor(container.clientHeight || container.getBoundingClientRect().height || 0)
        }
    }

    const _getWordIndexAtPoint = (clientX, clientY) => {
        if(typeof document === "undefined") return null

        const elements = document.elementsFromPoint?.(clientX, clientY) || []
        for(const element of elements) {
            if(!(element instanceof HTMLElement)) continue
            if(!element.classList.contains("falling-word")) continue

            const index = wordRefs.current.findIndex(node => node === element)
            if(index >= 0) return index
        }

        for(let i = wordRefs.current.length - 1; i >= 0; i -= 1) {
            const element = wordRefs.current[i]
            if(!element) continue

            const rect = element.getBoundingClientRect()
            const insideX = clientX >= rect.left && clientX <= rect.right
            const insideY = clientY >= rect.top && clientY <= rect.bottom
            if(insideX && insideY) return i
        }

        return null
    }

    const _selectWord = (index) => {
        if(index == null) return

        const engine = engineRef.current
        if(!engine) return

        const bodies = wordBodiesRef.current
        const target = bodies[index]
        if(!target) return

        const { width, height } = _getContainerSize()
        if(width <= 0 || height <= 0) return

        const centerX = width / 2
        const centerY = height * 0.35

        Matter.Body.setPosition(target.body, { x: centerX, y: centerY })
        Matter.Body.setVelocity(target.body, { x: 0, y: 0 })
        Matter.Body.setAngle(target.body, 0)
        Matter.Body.setAngularVelocity(target.body, 0)

        selectedIndexRef.current = index
        setSelectedIndex(index)
    }

    const onPointerTap = (event) => {
        const dragState = dragStateRef.current
        if(dragState.pointerId !== event.pointerId) return
        if(dragState.index == null) return
        if(dragState.moved || !dragState.tapEligible) return

        _selectWord(dragState.index)
    }

    const onOverlayPointerUp = (event) => {
        if(event.target !== event.currentTarget) return
        _closeSelection()
    }

    const _closeSelection = () => {
        const index = selectedIndexRef.current
        if(index === null) return

        // After closing the definition popup, keep the word red until refresh.
        applyPermanentRed(index)

        selectedIndexRef.current = null
        setSelectedIndex(null)
    }

    const onPointerDown = (event) => {
        if(selectedIndexRef.current !== null) return
        if(event.pointerType === "mouse" && event.button !== 0) return

        const index = _getWordIndexAtPoint(event.clientX, event.clientY)
        if(index == null) return

        const entry = wordBodiesRef.current[index]
        const engine = engineRef.current
        const container = containerRef.current
        if(!entry || !engine || !container) return
        const targetEl = entry.el
        if(!targetEl) return

        const rect = container.getBoundingClientRect()
        const borderLeft = container.clientLeft || 0
        const borderTop = container.clientTop || 0
        const pointerX = event.clientX - rect.left - borderLeft
        const pointerY = event.clientY - rect.top - borderTop
        const dragBoxWidth = entry.bodyWidth
        const dragBoxHeight = entry.bodyHeight
        const dragAngle = entry.body.angle || 0
        const dragCollisionMask = entry.body.collisionFilter?.mask ?? 0
        const dragBodyScale = isCoarsePointer() ? 1.08 : 1.06

        dragStateRef.current.pointerId = event.pointerId
        dragStateRef.current.index = index
        dragStateRef.current.moved = false
        dragStateRef.current.tapEligible = true
        dragStateRef.current.startX = event.clientX
        dragStateRef.current.startY = event.clientY
        dragStateRef.current.anchorOffsetX = pointerX - entry.body.position.x
        dragStateRef.current.anchorOffsetY = pointerY - entry.body.position.y
        dragStateRef.current.dragBoxWidth = dragBoxWidth
        dragStateRef.current.dragBoxHeight = dragBoxHeight
        dragStateRef.current.dragAngle = dragAngle
        dragStateRef.current.dragCollisionMask = dragCollisionMask
        dragStateRef.current.dragBodyScale = dragBodyScale
        dragStateRef.current.targetX = entry.body.position.x
        dragStateRef.current.targetY = entry.body.position.y
        dragStateRef.current.pointerType = event.pointerType || null
        dragStateRef.current.captureTarget = targetEl

        targetEl.classList.add("falling-word-held")

        try {
            targetEl.setPointerCapture?.(event.pointerId)
        } catch {
            // no-op
        }

        const onGlobalPointerMove = (moveEvent) => onPointerMove(moveEvent)
        const onGlobalPointerUp = (upEvent) => onPointerUp(upEvent)
        const onGlobalPointerCancel = (cancelEvent) => onPointerCancel(cancelEvent)

        window.addEventListener("pointermove", onGlobalPointerMove, { passive: false })
        window.addEventListener("pointerup", onGlobalPointerUp, { passive: false })
        window.addEventListener("pointercancel", onGlobalPointerCancel, { passive: false })
        dragListenersCleanupRef.current = () => {
            window.removeEventListener("pointermove", onGlobalPointerMove)
            window.removeEventListener("pointerup", onGlobalPointerUp)
            window.removeEventListener("pointercancel", onGlobalPointerCancel)
        }

        Matter.Sleeping.set(entry.body, false)
        // Keep the held word colliding with other words so it behaves like a real
        // dragged object instead of an isolated cursor-following sprite.
        entry.body.collisionFilter.mask = dragCollisionMask
        Matter.Body.scale(entry.body, dragBodyScale, dragBodyScale)
        Matter.Body.setVelocity(entry.body, { x: 0, y: 0 })
        Matter.Body.setAngularVelocity(entry.body, 0)
        event.preventDefault()
    }

    const onPointerMove = (event) => {
        const dragState = dragStateRef.current
        if(dragState.pointerId !== event.pointerId) return
        if(dragState.index == null) return

        const entry = wordBodiesRef.current[dragState.index]
        const container = containerRef.current
        if(!entry || !container) return

        const threshold = dragState.pointerType === "touch" ? 14 : 12
        const dx = event.clientX - dragState.startX
        const dy = event.clientY - dragState.startY
        const distance = Math.hypot(dx, dy)
        if(distance > threshold) {
            dragState.tapEligible = false
            dragState.moved = true
        }

        // The body lives in the container's padding-edge frame (top:0/left:0 of an
        // absolutely positioned child sits at the padding edge, inside the border).
        // getBoundingClientRect() returns the border-edge frame, so we subtract the
        // border via clientLeft/clientTop. We also clamp against clientWidth/clientHeight
        // (padding-box) so the bounds match the physics walls — which use the same.
        const rect = container.getBoundingClientRect()
        const borderLeft = container.clientLeft || 0
        const borderTop = container.clientTop || 0
        const innerWidth = container.clientWidth || rect.width
        const innerHeight = container.clientHeight || rect.height
        const pointerX = event.clientX - rect.left - borderLeft
        const pointerY = event.clientY - rect.top - borderTop
        const desiredCenterX = pointerX - dragState.anchorOffsetX
        const desiredCenterY = pointerY - dragState.anchorOffsetY

        // Match the resting word's effective footprint: a body rotated by `angle`
        // occupies an axis-aligned bounding box of (W·|cosθ| + H·|sinθ|) × (W·|sinθ| + H·|cosθ|).
        // Clamping the center to this rotated AABB makes the dragged word stop exactly
        // where a resting rotated word would — visible edges flush with the container walls.
        const angle = dragState.dragAngle || 0
        const cosA = Math.abs(Math.cos(angle))
        const sinA = Math.abs(Math.sin(angle))
        const baseW = dragState.dragBoxWidth || entry.bodyWidth
        const baseH = dragState.dragBoxHeight || entry.bodyHeight
        const halfAabbW = (baseW * cosA + baseH * sinA) / 2
        const halfAabbH = (baseW * sinA + baseH * cosA) / 2
        const nextX = clamp(
            desiredCenterX,
            halfAabbW,
            Math.max(halfAabbW, innerWidth - halfAabbW)
        )
        const nextY = clamp(
            desiredCenterY,
            halfAabbH,
            Math.max(halfAabbH, innerHeight - halfAabbH)
        )
        dragState.targetX = nextX
        dragState.targetY = nextY
        event.preventDefault()
    }

    const onPointerUp = (event) => {
        const dragState = dragStateRef.current
        if(event?.pointerId != null && dragState.pointerId !== event.pointerId) return

        const index = dragState.index
        if(index != null && dragState.moved) {
            _finalizePointerInteraction()
        }
        else if(index != null && dragState.tapEligible) {
            onPointerTap(event)
            _finalizePointerInteraction()
        }
        else {
            _finalizePointerInteraction()
        }
    }

    const onPointerCancel = (event) => {
        const dragState = dragStateRef.current
        if(event?.pointerId != null && dragState.pointerId !== event.pointerId) return

        _finalizePointerInteraction()
    }

    const onLostPointerCapture = (event) => {
        const dragState = dragStateRef.current
        if(event?.pointerId != null && dragState.pointerId !== event.pointerId) return

        _finalizePointerInteraction()
    }

    return (
        <div
            ref={containerRef}
            className={`falling-words ${className} ${isReady ? "falling-words-ready" : ""} ${selectedIndex !== null ? "falling-words-modal-open" : ""}`}
            style={{
                height: typeof height === "number" ? `${height}px` : String(height),
                "--falling-word-font-scale": String(fontScale)
            }}
            aria-label={`Falling words`}
            onPointerDown={onPointerDown}
        >
            {selectedIndex !== null && (
                <div
                    className={`falling-words-overlay`}
                    onPointerUp={onOverlayPointerUp}
                >
                    <div
                        className={`falling-words-modal-card`}
                        role={`dialog`}
                        aria-modal={true}
                        onClick={(event) => event.stopPropagation()}
                        onPointerUp={(event) => event.stopPropagation()}
                    >
                        <div className={`falling-words-modal-title text-1`}>
                            {effectiveEntries[selectedIndex]?.word || ""}
                        </div>
                        <div className={`falling-words-modal-definition text-2`}>
                            {effectiveEntries[selectedIndex]?.definition || definitionFallbackText}
                        </div>
                    </div>
                </div>
            )}

            {words.map((word, index) => {
                const isHighlighted = (highlightPrefixes || []).some(prefix => word.startsWith(prefix))
                const isRedPermanent = permanentRedIndicesRef.current.has(index)
                return (
                    <span
                        key={`${word}-${index}`}
                        ref={(el) => { wordRefs.current[index] = el }}
                        className={`falling-word ${isHighlighted ? "falling-word-highlighted" : ""} ${selectedIndex === index ? "falling-word-selected" : ""} ${isRedPermanent ? "falling-word-red-permanent" : ""}`}
                    >
                        {word}
                    </span>
                )
            })}
        </div>
    )
}

export default FallingWords
