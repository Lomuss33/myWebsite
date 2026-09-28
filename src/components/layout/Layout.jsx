import "./Layout.scss"
import React, {useEffect, useRef} from 'react'
import {useViewport} from "../../providers/ViewportProvider.jsx"
import LayoutSaltShaker from "./LayoutSaltShaker.jsx"
import Scrollbar from "smooth-scrollbar"

function Layout({ id, children }) {
    const viewport = useViewport()
    const contentRef = useRef(null)
    const wheelFrameRef = useRef(0)
    const wheelTargetRef = useRef(null)
    const isMobileLayout = viewport.isMobileLayout()

    useEffect(() => {
        if (isMobileLayout) return

        const layoutContent = contentRef.current
        if (!layoutContent) return

        let cachedScrollable = null
        let cachedScrollbar = null
        let wheelTargetElement = null

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const animateWheelScroll = () => {
            wheelFrameRef.current = 0
            const activeScrollable = wheelTargetElement
            if(!activeScrollable?.isConnected || wheelTargetRef.current === null) return

            const currentY = cachedScrollbar ? cachedScrollbar.scrollTop : activeScrollable.scrollTop
            const distance = wheelTargetRef.current - currentY

            if(reduceMotion || Math.abs(distance) < 0.6) {
                if(cachedScrollbar)
                    cachedScrollbar.setPosition(cachedScrollbar.scrollLeft, wheelTargetRef.current)
                else
                    activeScrollable.scrollTop = wheelTargetRef.current
                wheelTargetRef.current = null
                wheelTargetElement = null
                return
            }

            const nextY = currentY + distance * 0.28
            if(cachedScrollbar)
                cachedScrollbar.setPosition(cachedScrollbar.scrollLeft, nextY)
            else
                activeScrollable.scrollTop = nextY

            wheelFrameRef.current = window.requestAnimationFrame(animateWheelScroll)
        }

        const resolveActive = () => {
            if (cachedScrollable && cachedScrollable.isConnected &&
                cachedScrollable.closest("section.section-shown")) {
                return cachedScrollable
            }
            cachedScrollable = document.querySelector("section.section-shown .scrollable")
            cachedScrollbar = cachedScrollable ? Scrollbar.get(cachedScrollable) : null
            return cachedScrollable
        }

        const handleWheel = event => {
            if (event.ctrlKey || event.metaKey) return
            if (!layoutContent.contains(event.target)) return

            const activeScrollable = resolveActive()
            if (!activeScrollable) return

            let deltaY = event.deltaY || 0
            if(event.deltaMode === WheelEvent.DOM_DELTA_LINE) deltaY *= 16
            if(event.deltaMode === WheelEvent.DOM_DELTA_PAGE) deltaY *= activeScrollable.clientHeight * 0.85
            deltaY = Math.max(-220, Math.min(220, deltaY))
            if(Math.abs(deltaY) < 0.5) return

            const currentY = cachedScrollbar ? cachedScrollbar.scrollTop : activeScrollable.scrollTop
            const limitY = cachedScrollbar?.limit?.y ?? Math.max(0, activeScrollable.scrollHeight - activeScrollable.clientHeight)
            const requestedY = wheelTargetRef.current ?? currentY
            const targetY = Math.max(0, Math.min(limitY, requestedY + deltaY))

            // At an edge, let the browser keep its normal scroll chaining.
            if(targetY === requestedY && currentY === requestedY) return

            event.preventDefault()
            wheelTargetElement = activeScrollable
            wheelTargetRef.current = targetY

            if(reduceMotion) {
                if(cachedScrollbar)
                    cachedScrollbar.setPosition(cachedScrollbar.scrollLeft, targetY)
                else
                    activeScrollable.scrollTop = targetY
                wheelTargetRef.current = null
                wheelTargetElement = null
            } else if(!wheelFrameRef.current) {
                wheelFrameRef.current = window.requestAnimationFrame(animateWheelScroll)
            }
        }

        layoutContent.addEventListener("wheel", handleWheel, { passive: false })
        return () => {
            layoutContent.removeEventListener("wheel", handleWheel)
            if(wheelFrameRef.current) window.cancelAnimationFrame(wheelFrameRef.current)
            wheelFrameRef.current = 0
            wheelTargetRef.current = null
            wheelTargetElement = null
        }
    }, [isMobileLayout])

    return (
        <div id={id}
             className={`layout`}>
            <LayoutSaltShaker/>

            <div ref={contentRef}
                 className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout
