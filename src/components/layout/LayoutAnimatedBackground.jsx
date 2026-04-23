import "./LayoutAnimatedBackground.scss"
import React, {useEffect, useRef} from 'react'
import Animable from "../capabilities/Animable.jsx"

function LayoutAnimatedBackground() {
    const interactiveRef = useRef(null)
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

        const setDefaultTarget = () => {
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
        }

        const handlePointerMove = event => {
            const state = pointerStateRef.current
            state.targetX = event.clientX
            state.targetY = event.clientY
        }

        const handlePointerLeave = () => {
            setDefaultTarget()
        }

        setDefaultTarget()
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
        window.addEventListener("blur", handlePointerLeave)
        window.addEventListener("resize", setDefaultTarget, { passive: true })

        return () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerleave", handlePointerLeave)
            window.removeEventListener("blur", handlePointerLeave)
            window.removeEventListener("resize", setDefaultTarget)
        }
    }, [])

    const handleEnterFrame = () => {
        const interactiveBubble = interactiveRef.current
        if(!interactiveBubble || typeof window === "undefined")
            return

        const width = window.innerWidth || 0
        const height = window.innerHeight || 0
        const state = pointerStateRef.current

        if(!state.isInitialized) {
            state.targetX = width * 0.5
            state.targetY = height * 0.38
            state.currentX = state.targetX
            state.currentY = state.targetY
            state.isInitialized = true
        }

        state.currentX += (state.targetX - state.currentX) / 18
        state.currentY += (state.targetY - state.currentY) / 18

        interactiveBubble.style.transform = `translate3d(${Math.round(state.currentX)}px, ${Math.round(state.currentY)}px, 0)`
    }

    return (
        <Animable className={`layout-animated-background`}
                  animationId={`layout-animated-background`}
                  onEnterFrame={handleEnterFrame}>
            <svg className={`layout-animated-background__defs`}
                 aria-hidden={`true`}
                 focusable={`false`}
                 xmlns={`http://www.w3.org/2000/svg`}>
                <defs>
                    <filter id={`layout-animated-background-goo`}>
                        <feGaussianBlur in={`SourceGraphic`}
                                        stdDeviation={`10`}
                                        result={`blur`}/>
                        <feColorMatrix in={`blur`}
                                       mode={`matrix`}
                                       values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8`}
                                       result={`goo`}/>
                        <feBlend in={`SourceGraphic`}
                                 in2={`goo`}/>
                    </filter>
                </defs>
            </svg>

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
        </Animable>
    )
}

export default LayoutAnimatedBackground
