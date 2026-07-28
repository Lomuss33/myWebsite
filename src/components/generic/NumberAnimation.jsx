import "./NumberAnimation.scss"
import React, {useEffect, useRef, useState} from 'react'

function NumberAnimation({ targetValue, id, initialValue = 0, updateDelay = 10, durationMs = 700, format = `{n}`, className = "" }) {
    const [currentValue, setCurrentValue] = useState(() => normalizeNumber(initialValue))
    const currentValueRef = useRef(normalizeNumber(initialValue))
    const displayValue = format.replace(/{n}/g, currentValue.toString())

    useEffect(() => {
        const normalizedTarget = normalizeNumber(targetValue)
        const normalizedDurationMs = Math.max(0, Number(durationMs) || 0)
        const startValue = currentValueRef.current

        if(startValue === normalizedTarget || normalizedDurationMs === 0 || prefersReducedMotion()) {
            currentValueRef.current = normalizedTarget
            setCurrentValue(normalizedTarget)
            return
        }

        let animationFrameId = null
        const startedAt = performance.now()

        const step = (timestamp) => {
            const progress = Math.min(1, (timestamp - startedAt) / normalizedDurationMs)
            const easedProgress = easeOutCubic(progress)
            const nextValue = normalizeNumber(startValue + (normalizedTarget - startValue) * easedProgress)

            currentValueRef.current = nextValue
            setCurrentValue(nextValue)

            if(progress < 1) {
                animationFrameId = window.requestAnimationFrame(step)
                return
            }

            currentValueRef.current = normalizedTarget
            setCurrentValue(normalizedTarget)
        }

        animationFrameId = window.requestAnimationFrame(step)

        return () => {
            if(animationFrameId !== null)
                window.cancelAnimationFrame(animationFrameId)
        }
    }, [durationMs, id, targetValue, updateDelay])

    return (
        <span className={`number-animation ${className}`}
              dangerouslySetInnerHTML={{__html: displayValue}}/>
    )
}

function normalizeNumber(value) {
    const numericValue = Number(value)
    if(!Number.isFinite(numericValue))
        return 0

    return Math.round(numericValue)
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3)
}

function prefersReducedMotion() {
    return typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
}

export default NumberAnimation
