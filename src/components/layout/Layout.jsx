import "./Layout.scss"
import React, {useEffect, useRef} from 'react'
import {useViewport} from "../../providers/ViewportProvider.jsx"
import LayoutSaltShaker from "./LayoutSaltShaker.jsx"
import Scrollbar from "smooth-scrollbar"

function Layout({ id, children }) {
    const viewport = useViewport()
    const contentRef = useRef(null)
    const isMobileLayout = viewport.isMobileLayout()

    useEffect(() => {
        if (isMobileLayout) return

        const layoutContent = contentRef.current
        if (!layoutContent) return

        let cachedScrollable = null
        let cachedScrollbar = null

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

            event.preventDefault()

            const deltaX = event.deltaX || 0
            const deltaY = event.deltaY || 0

            if (cachedScrollbar) {
                cachedScrollbar.scrollTo(
                    cachedScrollbar.scrollLeft + deltaX,
                    cachedScrollbar.scrollTop + deltaY,
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

            <div className={`layout-background`}/>

            <LayoutSaltShaker/>

            <div ref={contentRef}
                 className={`layout-content`}>
                {children}
            </div>
        </div>
    )
}

export default Layout
