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
import {useInput} from "../../providers/InputProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

const DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT = 4
const SHORT_RAIL_HEIGHT_CONFIG = {
    profile: { min: 64, base: 96 },
    tools: { min: 46, base: 64 },
    resume: { min: 46, base: 64 },
    row: { min: 22, base: 34, max: 46 }
}

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const input = useInput()
    const language = useLanguage()

    const [expandedOption, setExpandedOption] = useState(true)
    const cardWrapperRef = useRef(null)
    const sharedRailStackRef = useRef(null)
    const sharedRailSizeCacheRef = useRef({})
    const shortRailSizeCacheRef = useRef({})

    const shouldUseCompactRail = viewport.isShortDesktopLayout()
    const shouldForceShrink = !viewport.isBreakpoint("lg") || shouldUseCompactRail
    const expanded = !shouldForceShrink && expandedOption
    const railIsCompact = shouldUseCompactRail || !expanded
    const useSharedDesktopRail = viewport.isBreakpoint("lg") && !shouldUseCompactRail
    const showCompactResumeBand = railIsCompact && Boolean(profile.resumePdfUrl)
    const shrinkClass = expanded ?
        `` :
        `nav-sidebar-shrink`
    const compactRailClass = shouldUseCompactRail ?
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

    useEffect(() => {
        const railCard = cardWrapperRef.current
        if(!shouldUseCompactRail || !railCard)
            return

        const rowCount = Math.max(links?.length || 0, 1)
        const hasResumeBand = showCompactResumeBand
        const {profile: profileHeight, tools: toolsHeight, resume: resumeHeight, row: rowHeight} = SHORT_RAIL_HEIGHT_CONFIG

        const _clamp = (value, min, max) => {
            return Math.min(max, Math.max(min, value))
        }

        const _interpolate = (minimum, maximum, factor) => {
            return minimum + (maximum - minimum) * factor
        }

        const _setVariable = (name, value, unit = "px") => {
            const normalizedValue = unit === "px" ?
                Math.round(value) :
                Number(value.toFixed(3))
            const serializedValue = `${normalizedValue}${unit}`

            if(shortRailSizeCacheRef.current[name] === serializedValue)
                return

            shortRailSizeCacheRef.current[name] = serializedValue
            railCard.style.setProperty(name, serializedValue)
        }

        const _syncShortRailSizing = () => {
            const availableRailHeight = railCard.clientHeight
            if(!availableRailHeight)
                return

            const fixedBaseHeight = profileHeight.base + toolsHeight.base + (hasResumeBand ? resumeHeight.base : 0)
            const fixedMinHeight = profileHeight.min + toolsHeight.min + (hasResumeBand ? resumeHeight.min : 0)
            const baseTotalHeight = fixedBaseHeight + (rowHeight.base * rowCount)
            const minTotalHeight = fixedMinHeight + (rowHeight.min * rowCount)

            let nextProfileHeight = profileHeight.base
            let nextToolsHeight = toolsHeight.base
            let nextResumeHeight = hasResumeBand ? resumeHeight.base : 0
            let nextRowHeight = rowHeight.base

            if(availableRailHeight < baseTotalHeight) {
                const compressionFactor = _clamp(
                    (availableRailHeight - minTotalHeight) / Math.max(baseTotalHeight - minTotalHeight, 1),
                    0,
                    1
                )

                nextProfileHeight = _interpolate(profileHeight.min, profileHeight.base, compressionFactor)
                nextToolsHeight = _interpolate(toolsHeight.min, toolsHeight.base, compressionFactor)
                nextResumeHeight = hasResumeBand ?
                    _interpolate(resumeHeight.min, resumeHeight.base, compressionFactor) :
                    0
                nextRowHeight = _interpolate(rowHeight.min, rowHeight.base, compressionFactor)
            } else {
                const availableRowHeight = Math.max((availableRailHeight - fixedBaseHeight) / rowCount, rowHeight.base)
                nextRowHeight = _clamp(availableRowHeight, rowHeight.base, rowHeight.max)
            }

            // Keep the rail width fixed and only scale the vertical rhythm.
            _setVariable("--nav-short-rail-scale", _clamp(nextRowHeight / rowHeight.base, rowHeight.min / rowHeight.base, 1), "")
            _setVariable("--nav-short-rail-profile-height", nextProfileHeight)
            _setVariable("--nav-short-rail-row-height", nextRowHeight)
            _setVariable("--nav-short-rail-tools-height", nextToolsHeight)
            _setVariable("--nav-short-rail-resume-height", nextResumeHeight)
            _setVariable("--nav-link-target-height", nextRowHeight)
        }

        _syncShortRailSizing()

        const resizeObserver = new ResizeObserver(() => {
            _syncShortRailSizing()
        })
        resizeObserver.observe(railCard)

        return () => {
            resizeObserver.disconnect()
            shortRailSizeCacheRef.current = {}
            railCard.style.removeProperty("--nav-short-rail-scale")
            railCard.style.removeProperty("--nav-short-rail-profile-height")
            railCard.style.removeProperty("--nav-short-rail-row-height")
            railCard.style.removeProperty("--nav-short-rail-tools-height")
            railCard.style.removeProperty("--nav-short-rail-resume-height")
            railCard.style.removeProperty("--nav-link-target-height")
        }
    }, [links?.length, shouldUseCompactRail, showCompactResumeBand])

    useEffect(() => {
        const sharedRailStack = sharedRailStackRef.current
        if(!useSharedDesktopRail || !sharedRailStack)
            return

        const rowCount = (links?.length || 0) + 1
        const rowHeightConfig = expanded ?
            { min: 30, baseline: 48, max: 64 } :
            { min: 28, baseline: 40, max: 54 }

        const _setVariable = (name, value, unit = "px") => {
            if(!sharedRailStack)
                return

            const normalizedValue = unit === "px" ?
                Math.round(value) :
                Number(value.toFixed(3))
            const serializedValue = `${normalizedValue}${unit}`

            if(sharedRailSizeCacheRef.current[name] === serializedValue)
                return

            sharedRailSizeCacheRef.current[name] = serializedValue
            sharedRailStack.style.setProperty(name, serializedValue)
        }

        const _syncSharedRailSizing = () => {
            const availableRailHeight = sharedRailStack.clientHeight
            if(!availableRailHeight || rowCount <= 0)
                return

            const idealRowHeight = (availableRailHeight - DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT) / rowCount
            const rowHeight = Math.min(rowHeightConfig.max, Math.max(rowHeightConfig.min, idealRowHeight))
            const separatorHeight = Math.max(
                DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT,
                availableRailHeight - rowHeight * rowCount
            )

            _setVariable("--nav-link-target-height", rowHeight)
            _setVariable("--nav-tools-height", rowHeight)
            _setVariable("--nav-rail-separator-height", separatorHeight)
        }

        _syncSharedRailSizing()

        const resizeObserver = new ResizeObserver(() => {
            _syncSharedRailSizing()
        })
        resizeObserver.observe(sharedRailStack)

        return () => {
            resizeObserver.disconnect()
            sharedRailSizeCacheRef.current = {}
            sharedRailStack.style.removeProperty("--nav-link-target-height")
            sharedRailStack.style.removeProperty("--nav-tools-height")
            sharedRailStack.style.removeProperty("--nav-rail-separator-height")
        }
    }, [expanded, links?.length, useSharedDesktopRail])

    const compactResumeBand = showCompactResumeBand ? (
        <div className={`nav-short-rail-resume-band`}>
            <NavToolResumeDownloader showTooltip={true}
                                     menuClassName={"nav-tools-popup-menu"}
                                     toggleClassName={"nav-short-rail-resume-pill"}
                                     toggleCaption={language.getString("nav_tool_resume")}
                                     toggleCaptionLayout={"inline"}/>
        </div>
    ) : null

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${shrinkClass} ${compactRailClass} ${compactResumeBandClass}`}>
            <Card ref={cardWrapperRef}
                  className={`nav-sidebar-card-wrapper`}>
                {!shouldForceShrink && (
                    <NavToolShrinkToggle expanded={expandedOption}
                                         setExpanded={setExpandedOption}/>
                )}

                <NavProfileCard profile={profile}
                                expanded={expanded}
                                compactRail={railIsCompact}/>

                {useSharedDesktopRail ? (
                    <>
                        {compactResumeBand}

                        <div ref={sharedRailStackRef}
                             className={`nav-sidebar-rail-stack`}>
                            <NavLinkList links={links}
                                         expanded={expanded}
                                         compactRail={railIsCompact}
                                         shortRail={shouldUseCompactRail}
                                         sharedRailMode={true}/>

                            <div className={`nav-rail-separator`}
                                 aria-hidden={`true`}/>

                            <NavToolList expanded={expanded}
                                         compactRail={railIsCompact}/>
                        </div>
                    </>
                ) : (
                    <>
                        <NavLinkList links={links}
                                     expanded={expanded}
                                     compactRail={railIsCompact}
                                     shortRail={shouldUseCompactRail}
                                     sharedRailMode={false}/>

                        {compactResumeBand}

                        <NavToolList expanded={expanded}
                                     compactRail={railIsCompact}/>
                    </>
                )}
            </Card>
        </nav>
    )
}

export default NavSidebar
