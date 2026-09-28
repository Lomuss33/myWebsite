import "./Layout.scss"
import React, {useEffect, useRef} from 'react'
import {useViewport} from "../../providers/ViewportProvider.jsx"
import LayoutSaltShaker from "./LayoutSaltShaker.jsx"

function Layout({ id, children }) {
    const viewport = useViewport()
    const contentRef = useRef(null)
    const isMobileLayout = viewport.isMobileLayout()

    useEffect(() => {
        if (isMobileLayout) return

        const layoutContent = contentRef.current
        if (!layoutContent) return

        let wheelGestureOwner = null
        let lastWheelEventAt = 0

        const handleWheel = event => {
            if (!layoutContent.contains(event.target)) return
            // Keep a wheel gesture owned by the surface where it began. This
            // prevents a page scroll from turning into map zoom just because
            // the pointer crosses a map during a trackpad/momentum sequence.
            const now = performance.now()
            const mapTarget = event.target.closest(".location-compare-map")
            if(now - lastWheelEventAt > 240 || wheelGestureOwner === null)
                wheelGestureOwner = mapTarget || "page"
            lastWheelEventAt = now

            if(wheelGestureOwner !== "page" && !mapTarget)
                wheelGestureOwner = "page"
            if(wheelGestureOwner === "page")
                event.__locationCompareWheelOwner = "page"
            else {
                event.__locationCompareWheelOwner = wheelGestureOwner
            }
        }

        layoutContent.addEventListener("wheel", handleWheel, { passive: false, capture: true })
        return () => {
            layoutContent.removeEventListener("wheel", handleWheel, true)
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
