import "./NavLinkPillsFixed.scss"
import React, {useEffect, useRef} from 'react'
import NavLinkPills from "./NavLinkPills.jsx"

function NavLinkPillsFixed({ links, className = "", id = "nav-link-pills-fixed" }) {
    const wrapperRef = useRef(null)
    const shouldShow = links.length >= 2

    useEffect(() => {
        const wrapperEl = wrapperRef.current
        const layoutWrapperEl = wrapperEl?.closest(".layout-navigation-wrapper")

        if(!wrapperEl || !layoutWrapperEl)
            return

        const syncHeight = () => {
            layoutWrapperEl.style.setProperty("--nav-link-pills-fixed-height", `${Math.round(wrapperEl.getBoundingClientRect().height)}px`)
        }

        syncHeight()

        const resizeObserver = new ResizeObserver(syncHeight)
        resizeObserver.observe(wrapperEl)

        return () => {
            resizeObserver.disconnect()
            layoutWrapperEl.style.removeProperty("--nav-link-pills-fixed-height")
        }
    }, [])

    return (
        <div ref={wrapperRef}
             className={`nav-link-pills-fixed-wrapper nav-link-pills-fixed-wrapper-${shouldShow ? "shown" : "hidden"}`}>
            <NavLinkPills id={id}
                          className={className}
                          links={links}/>
        </div>
    )
}

export default NavLinkPillsFixed
