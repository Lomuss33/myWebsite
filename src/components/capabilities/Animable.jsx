import "./Animable.scss"
import React, {useEffect, useRef} from 'react'

function Animable({ children, animationId, onEnterFrame, className = "" }) {
    const animationFrameIdRef = useRef(null)
    const ticksRef = useRef(0)
    const lastTickTimeRef = useRef(null)
    const totalElapsedRef = useRef(0)
    const onEnterFrameRef = useRef(onEnterFrame)

    useEffect(() => {
        onEnterFrameRef.current = onEnterFrame
    }, [onEnterFrame])

    /** @constructs **/
    useEffect(() => {
        window.ANIMATION_DATA = window.ANIMATION_DATA || {}
        window.ANIMATION_DATA[animationId] = window.ANIMATION_DATA[animationId] || {}

        ticksRef.current = 0
        lastTickTimeRef.current = null
        totalElapsedRef.current = 0

        const animate = (timespan) => {
            const then = lastTickTimeRef.current ?? timespan
            const dt = (timespan - then) / 1000

            lastTickTimeRef.current = timespan
            totalElapsedRef.current += dt
            ticksRef.current += 1

            const event = {
                timespan,
                ticks: ticksRef.current,
                currentTickElapsed: dt,
                totalElapsed: totalElapsedRef.current
            }

            window.ANIMATION_DATA[animationId].event = event
            if(onEnterFrameRef.current)
                onEnterFrameRef.current(event)

            animationFrameIdRef.current = requestAnimationFrame(animate)
        }

        animationFrameIdRef.current = requestAnimationFrame(animate)
        return () => {
            if(animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current)
                animationFrameIdRef.current = null
            }
        }
    }, [animationId])

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Animable
