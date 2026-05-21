import "./Animable.scss"
import React, {useEffect, useRef} from 'react'

function Animable({ children, animationId, onEnterFrame, className = "", maxFramesPerSecond = 30 }) {
    const animationFrameIdRef = useRef(null)
    const ticksRef = useRef(0)
    const lastTickTimeRef = useRef(null)
    const lastCallbackTimeRef = useRef(null)
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
        lastCallbackTimeRef.current = null
        totalElapsedRef.current = 0

        const animate = (timespan) => {
            const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
            const frameInterval = 1000 / (reducedMotion ? 8 : Math.max(1, maxFramesPerSecond))
            const lastCallbackTime = lastCallbackTimeRef.current

            if(lastCallbackTime !== null && timespan - lastCallbackTime < frameInterval) {
                animationFrameIdRef.current = requestAnimationFrame(animate)
                return
            }

            const then = lastTickTimeRef.current ?? timespan
            const dt = (timespan - then) / 1000

            lastTickTimeRef.current = timespan
            lastCallbackTimeRef.current = timespan
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

        const start = () => {
            if(animationFrameIdRef.current !== null || document.hidden)
                return

            lastTickTimeRef.current = null
            lastCallbackTimeRef.current = null
            animationFrameIdRef.current = requestAnimationFrame(animate)
        }

        const stop = () => {
            if(animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current)
                animationFrameIdRef.current = null
            }
        }

        const onVisibilityChange = () => {
            if(document.hidden) stop()
            else start()
        }

        document.addEventListener("visibilitychange", onVisibilityChange)
        start()
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange)
            stop()
        }
    }, [animationId, maxFramesPerSecond])

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Animable
