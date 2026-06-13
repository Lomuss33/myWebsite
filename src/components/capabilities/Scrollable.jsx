import "./Scrollable.scss"
import React, {useEffect} from 'react'
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useConstants} from "../../hooks/constants.js"

function Scrollable({ children, id, shouldResetScroll, setShouldResetScroll, className = "" }) {
    const constants = useConstants()
    const viewport = useViewport()
    const isMobileLayout = viewport.isMobileLayout()

    const mobileNativeClass = isMobileLayout ?
        `scrollable-mobile-native` :
        ``

    useEffect(() => {
        if(!shouldResetScroll)
            return

        const resetFrameId = window.requestAnimationFrame(() => {
            const div = document.getElementById(id)
            if(isMobileLayout) {
                window.scrollTo({ top: 0, left: 0, behavior: "auto" })
            }
            else if(div) {
                div.scrollLeft = 0
                div.scrollTop = 0
            }

            setShouldResetScroll(false)
        })

        return () => {
            window.cancelAnimationFrame(resetFrameId)
        }
    }, [id, shouldResetScroll, isMobileLayout, setShouldResetScroll])

    return (
        <div className={`scrollable-wrapper ${constants.HTML_CLASSES.scrollbarDecorator} ${className}`}>
            <div className={`scrollable ${mobileNativeClass}`}
                 id={id}>
                <div className={`scrollable-content`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Scrollable
