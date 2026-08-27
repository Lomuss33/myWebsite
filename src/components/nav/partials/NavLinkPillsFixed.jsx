import "./NavLinkPillsFixed.scss"
import React, {useEffect, useRef} from 'react'
import NavLinkPills from "./NavLinkPills.jsx"

function NavLinkPillsFixed({ links, className = "", id = "nav-link-pills-fixed" }) {
    const slotRef = useRef(null)
    const wrapperRef = useRef(null)
    const shouldShow = links.length >= 2

    useEffect(() => {
        const wrapperEl = wrapperRef.current
        const slotEl = slotRef.current
        const layoutWrapperEl = wrapperEl?.closest(".layout-navigation-wrapper")

        if(!wrapperEl || !slotEl || !layoutWrapperEl)
            return

        const syncHeight = () => {
            const height = Math.round(wrapperEl.getBoundingClientRect().height)
            layoutWrapperEl.style.setProperty("--nav-link-pills-fixed-height", `${height}px`)
            slotEl.style.setProperty("--nav-link-pills-slot-height", `${height}px`)
        }

        syncHeight()

        const resizeObserver = new ResizeObserver(syncHeight)
        resizeObserver.observe(wrapperEl)

        const intersectionObserver = new IntersectionObserver(([entry]) => {
            const viewportTop = entry.rootBounds?.top || 0
            const shouldStick = entry.boundingClientRect.top <= viewportTop
            wrapperEl.classList.toggle("nav-link-pills-fixed-wrapper-stuck", shouldStick)
        }, { threshold: [0, 1] })
        intersectionObserver.observe(slotEl)

        return () => {
            resizeObserver.disconnect()
            intersectionObserver.disconnect()
            wrapperEl.classList.remove("nav-link-pills-fixed-wrapper-stuck")
            slotEl.style.removeProperty("--nav-link-pills-slot-height")
            layoutWrapperEl.style.removeProperty("--nav-link-pills-fixed-height")
        }
    }, [])

    return (
        <div ref={slotRef}
             className={`nav-link-pills-sticky-slot`}>
            <div ref={wrapperRef}
                 className={`nav-link-pills-fixed-wrapper nav-link-pills-fixed-wrapper-${shouldShow ? "shown" : "hidden"}`}>
                <NavLinkPills id={id}
                              className={className}
                              links={links}/>
            </div>
        </div>
    )
}

export default NavLinkPillsFixed
