import "./LayoutAnimatedBackground.scss"
import React, {useEffect, useRef} from 'react'

const POINTER_EASING = 18
const POINTER_SETTLE_DISTANCE = 0.5

function LayoutAnimatedBackground() {
    const interactiveRef = useRef(null)
    const animationFrameIdRef = useRef(null)
    const renderedPositionRef = useRef({
        x: null,
        y: null
    })
    const pointerStateRef = useRef({
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        isInitialized: false
    })

    useEffect(() => {
        if(typeof window === "undefined")
            return

        const setInteractivePosition = (x, y) => {
            const interactiveBubble = interactiveRef.current
            if(!interactiveBubble)
                return

            const roundedX = Math.round(x)
            const roundedY = Math.round(y)

            if(renderedPositionRef.current.x === roundedX && renderedPositionRef.current.y === roundedY)
                return

            interactiveBubble.style.transform = `translate3d(${roundedX}px, ${roundedY}px, 0)`
            renderedPositionRef.current.x = roundedX
            renderedPositionRef.current.y = roundedY
        }

        const cancelAnimationLoop = () => {
            if(animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current)
                animationFrameIdRef.current = null
            }
        }

        const animate = () => {
            const state = pointerStateRef.current
            const dx = state.targetX - state.currentX
            const dy = state.targetY - state.currentY
            const isSettled =
                Math.abs(dx) <= POINTER_SETTLE_DISTANCE &&
                Math.abs(dy) <= POINTER_SETTLE_DISTANCE

            if(isSettled) {
                state.currentX = state.targetX
                state.currentY = state.targetY
                setInteractivePosition(state.currentX, state.currentY)
                animationFrameIdRef.current = null
                return
            }

            state.currentX += dx / POINTER_EASING
            state.currentY += dy / POINTER_EASING
            setInteractivePosition(state.currentX, state.currentY)

            animationFrameIdRef.current = requestAnimationFrame(animate)
        }

        const ensureAnimationLoop = () => {
            if(animationFrameIdRef.current !== null)
                return

            animationFrameIdRef.current = requestAnimationFrame(animate)
        }

        const setDefaultTarget = ({ animateToTarget = true } = {}) => {
            const width = window.innerWidth || 0
            const height = window.innerHeight || 0
            const state = pointerStateRef.current

            if(!state.isInitialized) {
                state.currentX = width * 0.5
                state.currentY = height * 0.38
            }

            state.targetX = width * 0.5
            state.targetY = height * 0.38
            state.isInitialized = true

            if(!animateToTarget) {
                state.currentX = state.targetX
                state.currentY = state.targetY
                setInteractivePosition(state.currentX, state.currentY)
                return
            }

            ensureAnimationLoop()
        }

        const handlePointerMove = event => {
            const state = pointerStateRef.current
            state.targetX = event.clientX
            state.targetY = event.clientY
            ensureAnimationLoop()
        }

        const handlePointerLeave = () => {
            setDefaultTarget()
        }

        setDefaultTarget({ animateToTarget: false })
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
        window.addEventListener("blur", handlePointerLeave)
        window.addEventListener("resize", setDefaultTarget, { passive: true })

        return () => {
            cancelAnimationLoop()
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerleave", handlePointerLeave)
            window.removeEventListener("blur", handlePointerLeave)
            window.removeEventListener("resize", setDefaultTarget)
        }
    }, [])

    return (
        <div className={`layout-animated-background`}>
            <div className={`layout-animated-background__scene`}>
                <div className={`layout-animated-background__ambient`}/>

                <div className={`layout-animated-background__gradients-container`}>
                    <div className={`layout-animated-background__orb layout-animated-background__orb--1`}/>
                    <div className={`layout-animated-background__orb layout-animated-background__orb--2`}/>
                    <div className={`layout-animated-background__orb layout-animated-background__orb--3`}/>
                    <div className={`layout-animated-background__orb layout-animated-background__orb--4`}/>
                    <div className={`layout-animated-background__orb layout-animated-background__orb--5`}/>
                    <div ref={interactiveRef}
                         className={`layout-animated-background__interactive`}/>
                </div>

                <div className={`layout-animated-background__vignette`}/>
            </div>
        </div>
    )
}

export default LayoutAnimatedBackground
