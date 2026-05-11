import "./NavSidebar.scss"
import React, {useEffect, useState} from 'react'
import {Card} from "react-bootstrap"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useConstants} from "../../hooks/constants.js"
import NavProfileCard from "./partials/NavProfileCard.jsx"
import NavLinkList from "./partials/NavLinkList.jsx"
import NavToolList from "./partials/NavToolList.jsx"
import NavToolShrinkToggle from "./tools/NavToolShrinkToggle.jsx"
import NavToolResumeDownloader from "./tools/NavToolResumeDownloader.jsx"
import {useInput} from "../../providers/InputProvider.jsx"

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const input = useInput()

    const [expandedOption, setExpandedOption] = useState(true)

    const shouldUseCompactRail = viewport.isShortDesktopLayout()
    const shouldForceShrink = !viewport.isBreakpoint("lg") || shouldUseCompactRail
    const expanded = !shouldForceShrink && expandedOption
    const railIsCompact = shouldUseCompactRail || !expanded
    const showCompactResumeBand = railIsCompact && Boolean(profile.resumePdfUrl)
    const shrinkClass = expanded ?
        `` :
        `nav-sidebar-shrink`
    const compactRailClass = railIsCompact ?
        `nav-sidebar-short-rail` :
        ``
    const compactResumeBandClass = showCompactResumeBand ?
        `nav-sidebar-short-rail-with-resume-band` :
        ``

    useEffect(() => {
        if(shouldForceShrink)
            return

        const keyId = input.lastKeyPressed.id
        if(keyId === "ArrowLeft") setExpandedOption(false)
        else if(keyId === "ArrowRight") setExpandedOption(true)
    }, [input.lastKeyPressed, shouldForceShrink])

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${shrinkClass} ${compactRailClass} ${compactResumeBandClass}`}>
            <Card className={`nav-sidebar-card-wrapper`}>
                {!shouldForceShrink && (
                    <NavToolShrinkToggle expanded={expandedOption}
                                         setExpanded={setExpandedOption}/>
                )}

                <NavProfileCard profile={profile}
                                expanded={expanded}
                                compactRail={railIsCompact}/>

                <NavLinkList links={links}
                             expanded={expanded}
                             compactRail={railIsCompact}/>

                {showCompactResumeBand && (
                    <div className={`nav-short-rail-resume-band`}>
                        <NavToolResumeDownloader showTooltip={false}
                                                 menuClassName={"nav-tools-popup-menu"}
                                                 toggleClassName={"nav-short-rail-resume-pill"}/>
                    </div>
                )}

                <NavToolList expanded={expanded}
                             compactRail={railIsCompact}/>
            </Card>
        </nav>
    )
}

export default NavSidebar
