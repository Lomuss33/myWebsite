import "./Layout.scss"
import React, {useEffect, useRef} from 'react'
import {useUtils} from "../../hooks/utils.js"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import LayoutAnimatedBackground from "./LayoutAnimatedBackground.jsx"
import LayoutStaticBackground from "./LayoutStaticBackground.jsx"
import LayoutSaltShaker from "./LayoutSaltShaker.jsx"
import Scrollbar from "smooth-scrollbar"

function Layout({ id, children, backgroundStyle }) {
    const utils = useUtils()
    const viewport = useViewport()
    const contentRef = useRef(null)
    const isMobileLayout = viewport.isMobileLayout()

    const isAnimatedBackground = backgroundStyle === "animated"
    const isStaticBackground = backgroundStyle === "static"
    const isPlainBackground = backgroundStyle === "plain"
    const shouldUseAnimatedBackground = isAnimatedBackground && !isMobileLayout && !isLowPowerOrReducedMotion()

    if(!isAnimatedBackground && !isStaticBackground && !isPlainBackground) {
        utils.log.warn(
            "Layout",
            "Invalid backgroundStyle provided on settings.json. The supported values are 'animated', 'static' and 'plain'. Defaulting to 'plain'."
        )
    }

    useEffect(() => {
        if (isMobileLayout) return

        const layoutContent = contentRef.current
        if (!layoutContent) return

        const handleWheel = event => {
            // Keep modern zoom gestures (Ctrl/Cmd + wheel / trackpad pinch-to-zoom) working.
            if (event.ctrlKey || event.metaKey) return

            // Only reroute scrolls that originate within the app content.
            if (!layoutContent.contains(event.target)) return

            const activeScrollable = document.querySelector("section.section-shown .scrollable")
            if (!activeScrollable) return

            event.preventDefault()

            const deltaX = event.deltaX || 0
            const deltaY = event.deltaY || 0
            const scrollbar = Scrollbar.get(activeScrollable)

            if (scrollbar) {
                scrollbar.scrollTo(
                    scrollbar.scrollLeft + deltaX,
                    scrollbar.scrollTop + deltaY,
                    0
                )
                return
            }

            activeScrollable.scrollLeft += deltaX
            activeScrollable.scrollTop += deltaY
        }

        layoutContent.addEventListener("wheel", handleWheel, { passive: false })
        return () => {
            layoutContent.removeEventListener("wheel", handleWheel)
        }
    }, [isMobileLayout])

    return (
        <div id={id}
             className={`layout`}>

            {shouldUseAnimatedBackground && <LayoutAnimatedBackground/>}
            {isStaticBackground && <LayoutStaticBackground/>}

            <LayoutSaltShaker/>

            <div ref={contentRef}
                 className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

function isLowPowerOrReducedMotion() {
    if(typeof window === "undefined") return true

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const saveData = Boolean(navigator?.connection?.saveData)
    const lowHardwareConcurrency = Number.isFinite(navigator?.hardwareConcurrency) && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4
    const lowDeviceMemory = Number.isFinite(navigator?.deviceMemory) && navigator.deviceMemory > 0 && navigator.deviceMemory <= 4

    return Boolean(prefersReducedMotion || saveData || lowHardwareConcurrency || lowDeviceMemory)
}

export default Layout
