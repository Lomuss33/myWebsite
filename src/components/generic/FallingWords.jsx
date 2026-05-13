import "./FallingWords.scss"
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import Matter from "matter-js"

const DEFAULT_HIGHLIGHT_PREFIXES = ["\"30under30\"", "CTO", "Mythrill"]

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
    const redHoldIndicesRef = useRef(new Set())
    const permanentRedIndicesRef = useRef(new Set())
    const redHoldTimersRef = useRef(new Map())
    const [, forceRedRerender] = useState(0)
    const dragStateRef = useRef({
        pointerId: null,
        index: null,
        moved: false,
        tapEligible: false,
        startX: 0,
        startY: 0,
        targetX: 0,
        targetY: 0,
        offsetX: 0,
        offsetY: 0,
        pointerType: null,
        lastDragAt: 0
    })
    const suppressNextClickUntilRef = useRef(0)
    const [layoutVersion, setLayoutVersion] = useState(0)
    const [isReady, setIsReady] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(null)

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

    const _clearRedHold = (index) => {
        const timers = redHoldTimersRef.current
        const existingTimer = timers.get(index)
        if(existingTimer) clearTimeout(existingTimer)
        timers.delete(index)

        if(redHoldIndicesRef.current.delete(index)) {
            _bumpRed()
        }
    }

    const applyRedHold = (index, holdMs) => {
        if(index === null || index === undefined) return
        if(permanentRedIndicesRef.current.has(index)) return

        const timers = redHoldTimersRef.current
        const previous = timers.get(index)
        if(previous) clearTimeout(previous)

        redHoldIndicesRef.current.add(index)
        _bumpRed()

        const timeoutId = setTimeout(() => {
            timers.delete(index)
            if(redHoldIndicesRef.current.delete(index)) {
                _bumpRed()
            }
        }, holdMs)
        timers.set(index, timeoutId)
    }

    const applyPermanentRed = (index) => {
        if(index === null || index === undefined) return

        _clearRedHold(index)
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
        const onResize = () => setLayoutVersion(v => v + 1)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])

    useEffect(() => {
        const container = containerRef.current
        if(!container) return

        const onTouchMove = (event) => {
            event.preventDefault()
        }

        container.addEventListener("touchmove", onTouchMove, { passive: false })
        return () => {
            container.removeEventListener("touchmove", onTouchMove)
        }
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
        engineRef.current = engine

        const wallThickness = 200
        const params = {
            isStatic: true,
            render: {visible: false}
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
                friction: 0.18,
                frictionAir: isCoarsePointer() ? 0.05 : 0.02,
                restitution: 0.2,
                render: {visible: false}
            })

            // Slight initial horizontal drift to spread stacks.
            Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 })

            // Keep bodies from accumulating extreme rotations.
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.035)

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
                        const draggedEntry = wordBodies[dragState.index]
                        if(draggedEntry) {
                            const nextX = dragState.targetX
                            const nextY = dragState.targetY
                            const velocityScale = 1000 / fixedStep
                            const velocityX = (nextX - draggedEntry.body.position.x) / velocityScale
                            const velocityY = (nextY - draggedEntry.body.position.y) / velocityScale

                            Matter.Sleeping.set(draggedEntry.body, false)
                            Matter.Body.setPosition(draggedEntry.body, { x: nextX, y: nextY })
                            Matter.Body.setVelocity(draggedEntry.body, { x: velocityX, y: velocityY })
                            Matter.Body.setAngle(draggedEntry.body, draggedEntry.body.angle * 0.88)
                            Matter.Body.setAngularVelocity(draggedEntry.body, 0)
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
                el.style.transform = `translate3d(${x - bodyWidth / 2}px, ${y - bodyHeight / 2}px, 0) rotate(${body.angle}rad) scale(${scale})`
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

            const timers = redHoldTimersRef.current
            for(const timeoutId of timers.values()) {
                clearTimeout(timeoutId)
            }
            timers.clear()
            redHoldIndicesRef.current.clear()

            engineRef.current = null
            wordBodiesRef.current = []
        }

        return () => cleanupRef.current?.()
    }, [words, effectiveEntries, layoutVersion])

    const _shouldIgnoreClick = () => {
        const { lastDragAt } = dragStateRef.current
        return Date.now() - lastDragAt < 250
    }

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

    const _selectWord = (index, { ignoreDragGate = false } = {}) => {
        if(index == null) return
        if(!ignoreDragGate && _shouldIgnoreClick()) return

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

    const onWordPointerUp = (event) => {
        const dragState = dragStateRef.current
        if(dragState.pointerId !== event.pointerId) return
        if(dragState.index == null) return
        if(dragState.moved || !dragState.tapEligible) return

        suppressNextClickUntilRef.current = Date.now() + 650
        _selectWord(dragState.index, { ignoreDragGate: true })
    }

    const onOverlayPointerUp = (event) => {
        if(event.pointerType !== "touch") return
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

        const rawTarget = event.target
        const targetEl = typeof Element !== "undefined" && rawTarget instanceof Element
            ? rawTarget.closest?.("span.falling-word")
            : rawTarget?.parentElement?.closest?.("span.falling-word")
        if(!targetEl) return

        const index = wordRefs.current.findIndex(node => node === targetEl)
        if(index < 0) return

        const entry = wordBodiesRef.current[index]
        const engine = engineRef.current
        const container = containerRef.current
        if(!entry || !engine || !container) return

        const rect = container.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top

        dragStateRef.current.pointerId = event.pointerId
        dragStateRef.current.index = index
        dragStateRef.current.moved = false
        dragStateRef.current.tapEligible = true
        dragStateRef.current.startX = event.clientX
        dragStateRef.current.startY = event.clientY
        dragStateRef.current.offsetX = entry.body.position.x - pointerX
        dragStateRef.current.offsetY = entry.body.position.y - pointerY
        dragStateRef.current.targetX = entry.body.position.x
        dragStateRef.current.targetY = entry.body.position.y
        dragStateRef.current.pointerType = event.pointerType || null

        _clearRedHold(index)
        targetEl.classList.add("falling-word-held")

        try {
            targetEl.setPointerCapture?.(event.pointerId)
        } catch {
            // no-op
        }

        Matter.Sleeping.set(entry.body, false)
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

        const threshold = dragState.pointerType === "touch" ? 12 : 6
        const tapThreshold = dragState.pointerType === "touch" ? 6 : 2
        const dx = event.clientX - dragState.startX
        const dy = event.clientY - dragState.startY
        const distance = Math.hypot(dx, dy)
        if(distance > tapThreshold) dragState.tapEligible = false
        if(distance > threshold) dragState.moved = true

        const rect = container.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top
        const nextX = clamp(
            pointerX + dragState.offsetX,
            entry.bodyWidth / 2 + 8,
            rect.width - entry.bodyWidth / 2 - 8
        )
        const nextY = clamp(
            pointerY + dragState.offsetY,
            entry.bodyHeight / 2 + 8,
            rect.height - entry.bodyHeight / 2 - 8
        )
        dragState.targetX = nextX
        dragState.targetY = nextY
        event.preventDefault()
    }

    const onPointerUp = (event) => {
        const dragState = dragStateRef.current
        if(event?.pointerId != null && dragState.pointerId !== event.pointerId) return

        const index = dragState.index
        if(index != null) {
            const entry = wordBodiesRef.current[index]
            entry?.el?.classList.remove("falling-word-held")
        }

        if(index != null && dragState.moved) {
            dragState.lastDragAt = Date.now()
            applyRedHold(index, 4000)
        }

        dragState.pointerId = null
        dragState.index = null
        dragState.moved = false
        dragState.tapEligible = false
        dragState.pointerType = null
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
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            {selectedIndex !== null && (
                <div
                    className={`falling-words-overlay`}
                    onPointerUp={onOverlayPointerUp}
                    onClick={_closeSelection}
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
                const isRedHold = !isRedPermanent && redHoldIndicesRef.current.has(index)
                return (
                    <span
                        key={`${word}-${index}`}
                        ref={(el) => { wordRefs.current[index] = el }}
                        className={`falling-word ${isHighlighted ? "falling-word-highlighted" : ""} ${selectedIndex === index ? "falling-word-selected" : ""} ${isRedHold ? "falling-word-red-hold" : ""} ${isRedPermanent ? "falling-word-red-permanent" : ""}`}
                        onPointerUp={onWordPointerUp}
                        onClick={() => {
                            if(Date.now() < suppressNextClickUntilRef.current) return
                            if(dragStateRef.current.index != null) return
                            _selectWord(index)
                        }}
                    >
                        {word}
                    </span>
                )
            })}
        </div>
    )
}

export default FallingWords
