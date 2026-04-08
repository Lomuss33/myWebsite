import "./Layout.scss"
import React, {useEffect, useRef} from 'react'
import {useUtils} from "../../hooks/utils.js"
import LayoutAnimatedBackground from "./LayoutAnimatedBackground.jsx"
import LayoutStaticBackground from "./LayoutStaticBackground.jsx"
import Scrollbar from "smooth-scrollbar"

function Layout({ id, children, backgroundStyle }) {
    const utils = useUtils()
    const contentRef = useRef(null)

    const isAnimatedBackground = backgroundStyle === "animated"
    const isStaticBackground = backgroundStyle === "static"
    const isPlainBackground = backgroundStyle === "plain"

    if(!isAnimatedBackground && !isStaticBackground && !isPlainBackground) {
        utils.log.warn(
            "Layout",
            "Invalid backgroundStyle provided on settings.json. The supported values are 'animated', 'static' and 'plain'. Defaulting to 'plain'."
        )
    }

    useEffect(() => {
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
    }, [])

    return (
        <div id={id}
             className={`layout`}>

            {isAnimatedBackground && <LayoutAnimatedBackground/>}
            {isStaticBackground && <LayoutStaticBackground/>}

            <div ref={contentRef}
                 className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout