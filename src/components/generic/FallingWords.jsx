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
    definitionFallbackText = "Definition coming soon."
}) {
    const containerRef = useRef(null)
    const wordRefs = useRef([])
    const rafRef = useRef(null)
    const cleanupRef = useRef(() => {})
    const engineRef = useRef(null)
    const mouseConstraintRef = useRef(null)
    const mouseConstraintEnabledRef = useRef(false)
    const wordBodiesRef = useRef([])
    const selectedIndexRef = useRef(null)
    const dragStateRef = useRef({ isDown: false, moved: false, x: 0, y: 0, lastDragAt: 0 })
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

        const rect = container.getBoundingClientRect()
        const width = Math.floor(rect.width)
        const containerHeight = Math.floor(rect.height)

        if(width <= 0 || containerHeight <= 0) {
            cleanupRef.current = () => {}
            return
        }

        const Engine = Matter.Engine
        const World = Matter.World
        const Bodies = Matter.Bodies
        const Body = Matter.Body
        const Mouse = Matter.Mouse
        const MouseConstraint = Matter.MouseConstraint

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
            const startX = width * (0.35 + Math.random() * 0.3)
            // Spawn within the visible stage so words are immediately visible.
            const startY = Math.min(containerHeight * 0.25, 70) + (index % 6) * 14

            const body = Bodies.rectangle(startX, startY, bodyWidth, bodyHeight, {
                friction: 0.18,
                frictionAir: isCoarsePointer() ? 0.05 : 0.02,
                restitution: 0.2,
                render: {visible: false}
            })

            // Keep bodies from accumulating extreme rotations.
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04)

            return {body, el, bodyWidth, bodyHeight}
        })

        wordBodiesRef.current = wordBodies

        const mouse = Mouse.create(container)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {visible: false}
            }
        })
        mouseConstraintRef.current = mouseConstraint
        mouseConstraintEnabledRef.current = true

        mouse.element.removeEventListener("mousewheel", mouse.mousewheel)
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)

        World.add(engine.world, [
            floor,
            wallLeft,
            wallRight,
            ceiling,
            mouseConstraint,
            ...wordBodies.filter(Boolean).map(w => w.body)
        ])

        let lastTime = performance.now()
        const tick = (time) => {
            const delta = Math.min(33.333, time - lastTime) || 16.667
            lastTime = time

            if(selectedIndexRef.current === null) {
                Matter.Engine.update(engine, delta)
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
            engineRef.current = null
            mouseConstraintRef.current = null
            mouseConstraintEnabledRef.current = false
            wordBodiesRef.current = []
        }

        return () => cleanupRef.current?.()
    }, [words, effectiveEntries, layoutVersion])

    useEffect(() => {
        const engine = engineRef.current
        const mouseConstraint = mouseConstraintRef.current
        if(!engine || !mouseConstraint) return

        const world = engine.world
        const shouldEnable = selectedIndex === null
        if(shouldEnable === mouseConstraintEnabledRef.current) return

        try {
            if(shouldEnable) {
                Matter.World.add(world, mouseConstraint)
                mouseConstraintEnabledRef.current = true
            }
            else {
                Matter.World.remove(world, mouseConstraint)
                mouseConstraintEnabledRef.current = false
            }
        } catch {
            // no-op
        }
    }, [selectedIndex])

    const _shouldIgnoreClick = () => {
        const { lastDragAt } = dragStateRef.current
        return Date.now() - lastDragAt < 250
    }

    const _selectWord = (index) => {
        if(index == null) return
        if(_shouldIgnoreClick()) return

        const engine = engineRef.current
        if(!engine) return

        const bodies = wordBodiesRef.current
        const target = bodies[index]
        if(!target) return

        const rect = containerRef.current?.getBoundingClientRect()
        if(!rect) return

        const centerX = rect.width / 2
        const centerY = rect.height * 0.35

        Matter.Body.setPosition(target.body, { x: centerX, y: centerY })
        Matter.Body.setVelocity(target.body, { x: 0, y: 0 })
        Matter.Body.setAngle(target.body, 0)
        Matter.Body.setAngularVelocity(target.body, 0)

        setSelectedIndex(index)
    }

    const _closeSelection = () => {
        const index = selectedIndexRef.current
        if(index === null) return

        const bodies = wordBodiesRef.current
        const target = bodies[index]
        const rect = containerRef.current?.getBoundingClientRect()
        if(target && rect) {
            const x = rect.width / 2 + (Math.random() - 0.5) * 40
            const y = Math.min(70, rect.height * 0.18)
            Matter.Body.setPosition(target.body, { x, y })
            Matter.Body.setVelocity(target.body, { x: (Math.random() - 0.5) * 4, y: 6 })
            Matter.Body.setAngularVelocity(target.body, (Math.random() - 0.5) * 0.08)
        }

        setSelectedIndex(null)
    }

    const onPointerDown = (event) => {
        dragStateRef.current.isDown = true
        dragStateRef.current.moved = false
        dragStateRef.current.x = event.clientX
        dragStateRef.current.y = event.clientY
    }

    const onPointerMove = (event) => {
        if(!dragStateRef.current.isDown) return
        const dx = event.clientX - dragStateRef.current.x
        const dy = event.clientY - dragStateRef.current.y
        if(Math.hypot(dx, dy) > 6) dragStateRef.current.moved = true
    }

    const onPointerUp = () => {
        if(dragStateRef.current.isDown && dragStateRef.current.moved) {
            dragStateRef.current.lastDragAt = Date.now()
        }
        dragStateRef.current.isDown = false
        dragStateRef.current.moved = false
    }

    return (
        <div
            ref={containerRef}
            className={`falling-words ${isReady ? "falling-words-ready" : ""} ${selectedIndex !== null ? "falling-words-modal-open" : ""}`}
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
                <div className={`falling-words-overlay`} onClick={_closeSelection}>
                    <div
                        className={`falling-words-modal-card`}
                        role={`dialog`}
                        aria-modal={true}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={`falling-words-modal-definition text-2`}>
                            {effectiveEntries[selectedIndex]?.definition || definitionFallbackText}
                        </div>
                    </div>
                </div>
            )}

            {words.map((word, index) => {
                const isHighlighted = (highlightPrefixes || []).some(prefix => word.startsWith(prefix))
                return (
                    <span
                        key={`${word}-${index}`}
                        ref={(el) => { wordRefs.current[index] = el }}
                        className={`falling-word ${isHighlighted ? "falling-word-highlighted" : ""} ${selectedIndex === index ? "falling-word-selected" : ""}`}
                        onClick={() => _selectWord(index)}
                    >
                        {word}
                    </span>
                )
            })}
        </div>
    )
}

export default FallingWords
