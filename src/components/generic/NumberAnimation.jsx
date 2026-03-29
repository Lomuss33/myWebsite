import "./NumberAnimation.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "../../hooks/scheduler.js"

function NumberAnimation({ targetValue, id, initialValue = 0, updateDelay = 10, format = `{n}`, className = "" }) {
    const scheduler = useScheduler()

    const [currentValue, setCurrentValue] = useState(initialValue)
    const displayValue = format.replace(/{n}/g, currentValue.toString())

    useEffect(() => {
        scheduler.clearAllWithTag(id)

        if(targetValue === currentValue) {
            setCurrentValue(targetValue)
            return
        }

        const direction = targetValue > currentValue ? 1 : -1
        const step = Math.max(1, Math.ceil(Math.abs(targetValue - currentValue) / updateDelay))

        let value = currentValue
        let lastTickTime = new Date().getTime()
        let tickInterval = 1000/30

        scheduler.interval(() => {
            const now = new Date().getTime()
            const elapsed = now - lastTickTime
            lastTickTime = now

            const dt = elapsed / tickInterval
            value += direction * Math.max(1, Math.round(step * dt))

            const hasReachedTarget = direction > 0 ?
                value >= targetValue :
                value <= targetValue

            if(hasReachedTarget) {
                setCurrentValue(targetValue)
                scheduler.clearAllWithTag(id)
                return
            }

            setCurrentValue(value)
        }, tickInterval, id)
    }, [currentValue, id, scheduler, targetValue, updateDelay])

    return (
        <span className={`number-animation ${className}`}
              dangerouslySetInnerHTML={{__html: displayValue}}/>
    )
}

export default NumberAnimation
