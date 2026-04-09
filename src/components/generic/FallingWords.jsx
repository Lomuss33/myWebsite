import "./FallingWords.scss"
import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from "react"
import Matter from "matter-js"

const DEFAULT_HIGHLIGHT_PREFIXES = ["\"30under30\"", "CTO", "Mythrill"]

function FallingWords({
    text,
    height = 320,
    highlightPrefixes = DEFAULT_HIGHLIGHT_PREFIXES
}) {
    const containerRef = useRef(null)
    const wordRefs = useRef([])
    const rafRef = useRef(null)
    const cleanupRef = useRef(() => {})
    const [layoutVersion, setLayoutVersion] = useState(0)
    const [isReady, setIsReady] = useState(false)

    const words = useMemo(() => {
        return String(text || "")
            .split(/\s+/g)
            .map(word => word.trim())
            .filter(Boolean)
    }, [text])

    useEffect(() => {
        const onResize = () => setLayoutVersion(v => v + 1)
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
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

    useLayoutEffect(() => {
        cleanupRef.current?.()
        setIsReady(false)

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
        const Mouse = Matter.Mouse
        const MouseConstraint = Matter.MouseConstraint

        const engine = Engine.create({})
        engine.gravity.y = 1

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

        const wordElements = wordRefs.current.filter(Boolean)
        const wordBodies = wordElements.map((el, index) => {
            const bodyWidth = el.offsetWidth || 10
            const bodyHeight = el.offsetHeight || 10
            const startX = width * (0.35 + Math.random() * 0.3)
            const startY = -40 - index * 18

            const body = Bodies.rectangle(startX, startY, bodyWidth, bodyHeight, {
                friction: 0.18,
                frictionAir: 0.02,
                restitution: 0.2,
                render: {visible: false}
            })

            return {body, el, bodyWidth, bodyHeight}
        })

        const mouse = Mouse.create(container)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {visible: false}
            }
        })

        mouse.element.removeEventListener("mousewheel", mouse.mousewheel)
        mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel)

        World.add(engine.world, [
            floor,
            wallLeft,
            wallRight,
            ceiling,
            mouseConstraint,
            ...wordBodies.map(w => w.body)
        ])

        let lastTime = performance.now()
        const tick = (time) => {
            const delta = Math.min(33.333, time - lastTime) || 16.667
            lastTime = time

            Matter.Engine.update(engine, delta)

            for(const {body, el, bodyWidth, bodyHeight} of wordBodies) {
                const x = body.position.x
                const y = body.position.y
                el.style.transform = `translate3d(${x - bodyWidth / 2}px, ${y - bodyHeight / 2}px, 0) rotate(${body.angle}rad)`
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
        }

        return () => cleanupRef.current?.()
    }, [words, layoutVersion])

    return (
        <div
            ref={containerRef}
            className={`falling-words ${isReady ? "falling-words-ready" : ""}`}
            style={{height: typeof height === "number" ? `${height}px` : String(height)}}
            aria-label={`Falling words`}
        >
            {words.map((word, index) => {
                const isHighlighted = (highlightPrefixes || []).some(prefix => word.startsWith(prefix))
                return (
                    <span
                        key={`${word}-${index}`}
                        ref={(el) => { wordRefs.current[index] = el }}
                        className={`falling-word ${isHighlighted ? "falling-word-highlighted" : ""}`}
                    >
                        {word}
                    </span>
                )
            })}
        </div>
    )
}

export default FallingWords
