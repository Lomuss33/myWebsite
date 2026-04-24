import "./Transitionable.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "../../hooks/scheduler.js"

function Transitionable({ children, id, refreshFlag, delayBetweenItems = 100, className = "", animation = "transitionable-item-animation-pop" }) {
    const scheduler = useScheduler()

    const [renderingChildren, setRenderingChildren] = useState([])
    const [currentRefreshFlag, setCurrentRefreshFlag] = useState(null)
    const [transitionsEnabled, setTransitionsEnabled] = useState(false)
    const [refreshCount, setRefreshCount] = useState(0)

    useEffect(() => {
        if(currentRefreshFlag === refreshFlag)
            return

        const previousFlagSplit = currentRefreshFlag?.split("::")
        const currentFlagSplit = refreshFlag?.split("::")

        let forceNoTransition = false
        if(previousFlagSplit && currentFlagSplit && previousFlagSplit.length >= 2 && currentFlagSplit.length >= 2 && previousFlagSplit[0] === currentFlagSplit[0])
            forceNoTransition = true

        setCurrentRefreshFlag(refreshFlag)

        let shouldTransition = transitionsEnabled
        if(refreshCount > 1) shouldTransition = !forceNoTransition
        setTransitionsEnabled(shouldTransition)

        if(shouldTransition) _refreshWithTransition()
        else _refreshWithoutTransition()
    }, [refreshFlag])

    const _refreshWithTransition = () => {
        scheduler.clearAllWithTag(id)
        setRenderingChildren(children)
        setRefreshCount(prev => prev + 1)
    }

    const _refreshWithoutTransition = () => {
        scheduler.clearAllWithTag(id)

        setRenderingChildren(children)
        setRefreshCount(prev => prev + 1)
    }

    return (
        <div className={`transitionable-wrapper`}>
            <div className={`transitionable ${className}`}>
                {renderingChildren.map((child, key) => (
                    <TransitionableItem id={id + "-" + key}
                                        index={key}
                                        key={key}
                                        animation={animation}
                                        transitionsEnabled={transitionsEnabled}
                                        refreshCount={refreshCount}
                                        delayBetweenItems={delayBetweenItems}>
                        {child}
                    </TransitionableItem>
                ))}
            </div>
        </div>
    )
}

Transitionable.Animations = {
    POP: "transitionable-item-animation-pop",
}

function TransitionableItem({ children, id, index, animation, transitionsEnabled, refreshCount, delayBetweenItems }) {
    const scheduler = useScheduler()

    const [isVisible, setIsVisible] = useState(false)

    const animationClass = isVisible ?
        animation :
        `transitionable-item-invisible`

    useEffect(() => {
        if(transitionsEnabled) _showWithTransition()
        else _showWithoutTransition()
    }, [refreshCount])

    const _showWithTransition = () => {
        scheduler.clearAllWithTag(id)

        setIsVisible(false)
        scheduler.schedule(() => {
            setIsVisible(true)
        }, 30 + delayBetweenItems*index, id)
    }

    const _showWithoutTransition = () => {
        scheduler.clearAllWithTag(id)
        setIsVisible(true)
    }

    return (
        <div className={`transitionable-item ${animationClass}`}>
            {children}
        </div>
    )
}

export default Transitionable
