import "./NavSidebar.scss"
import React, {useEffect, useRef, useState} from 'react'
import {Card} from "react-bootstrap"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useConstants} from "../../hooks/constants.js"
import NavProfileCard from "./partials/NavProfileCard.jsx"
import NavLinkList from "./partials/NavLinkList.jsx"
import NavToolList from "./partials/NavToolList.jsx"
import NavToolShrinkToggle from "./tools/NavToolShrinkToggle.jsx"
import NavToolResumeDownloader from "./tools/NavToolResumeDownloader.jsx"

const WIDE_DESKTOP_THRESHOLD = 1100
const MANUAL_RAIL_BY_ZONE_DEFAULTS = {
    wide: null,
    narrowDesktop: null
}

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const sidebarCardWrapperRef = useRef(null)

    const [manualRailByZone, setManualRailByZone] = useState(MANUAL_RAIL_BY_ZONE_DEFAULTS)

    const hasResumeBand = Boolean(profile?.resumePdfUrl)
    const hasRailLayout = viewport.isDesktopLayout()
    const desktopWidthZone = !hasRailLayout ?
        null :
        (viewport.innerWidth >= WIDE_DESKTOP_THRESHOLD ? "wide" : "narrowDesktop")
    const manualRail = desktopWidthZone ? manualRailByZone[desktopWidthZone] : null
    const railMode = desktopWidthZone ?
        (manualRail ?? "extended") :
        "extended"
    const railModeClass = railMode === "extended" ?
        `nav-sidebar-extended` :
        `nav-sidebar-short-rail`
    const showShortRailResumeBand = railMode === "short" && hasResumeBand
    const shortRailResumeBandClass = showShortRailResumeBand ?
        `nav-sidebar-short-rail-with-resume-band` :
        ``

    const _setManualRailForZone = (zone, targetRail) => {
        if(!zone)
            return

        setManualRailByZone((currentState) => {
            if(currentState[zone] === targetRail)
                return currentState

            return {
                ...currentState,
                [zone]: targetRail
            }
        })
    }

    const _setManualRail = (targetRail) => {
        _setManualRailForZone(desktopWidthZone, targetRail)
    }

    const _toggleRailMode = () => {
        const targetRail = railMode === "extended" ? "short" : "extended"
        _setManualRail(targetRail)
    }

    const shortRailResumeBand = showShortRailResumeBand ? (
        <div className={`nav-short-rail-resume-band`}>
            <NavToolResumeDownloader showTooltip={true}
                                     menuClassName={"nav-tools-popup-menu"}
                                     toggleClassName={"nav-short-rail-resume-pill"}/>
        </div>
    ) : null

    useEffect(() => {
        const wrapper = sidebarCardWrapperRef.current
        if(!wrapper || railMode !== "short")
            return

        const profileCard = wrapper.querySelector(`.nav-profile-card-short-rail`)
        const resumeBand = wrapper.querySelector(`.nav-short-rail-resume-band`)
        if(!profileCard)
            return

        const updateTogglePosition = () => {
            const profileHeight = profileCard.getBoundingClientRect().height
            const resumeHeight = resumeBand?.getBoundingClientRect().height || 0
            const toggleTop = Math.max(0, profileHeight + (resumeHeight / 2) - 16)
            wrapper.style.setProperty(`--nav-sidebar-toggle-top`, `${toggleTop}px`)
        }

        updateTogglePosition()

        const resizeObserver = typeof ResizeObserver === "function" ?
            new ResizeObserver(updateTogglePosition) :
            null

        resizeObserver?.observe(profileCard)
        if(resumeBand)
            resizeObserver?.observe(resumeBand)

        window.addEventListener(`resize`, updateTogglePosition)

        return () => {
            resizeObserver?.disconnect()
            window.removeEventListener(`resize`, updateTogglePosition)
            wrapper.style.removeProperty(`--nav-sidebar-toggle-top`)
        }
    }, [railMode, showShortRailResumeBand])

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${railModeClass} ${shortRailResumeBandClass}`}>
            <Card className={`nav-sidebar-card-wrapper`} ref={sidebarCardWrapperRef}>
                {hasRailLayout && (
                    <NavToolShrinkToggle expanded={railMode === "extended"}
                                         onToggle={_toggleRailMode}/>
                )}

                <NavProfileCard profile={profile}
                                railMode={railMode}/>

                {railMode === "extended" ? (
                    <div className={`nav-sidebar-rail-stack`}>
                        <NavLinkList links={links}
                                     railMode={railMode}/>

                        <div className={`nav-rail-separator`}
                             aria-hidden={true}/>

                        <NavToolList railMode={railMode}/>
                    </div>
                ) : (
                    <div className={`nav-short-rail-stack`}>
                        {shortRailResumeBand}

                        <NavLinkList links={links}
                                     railMode={railMode}/>

                        <div className={`nav-short-rail-separator`}
                             aria-hidden={true}/>

                        <NavToolList railMode={railMode}/>
                    </div>
                )}
            </Card>
        </nav>
    )
}

export default NavSidebar
