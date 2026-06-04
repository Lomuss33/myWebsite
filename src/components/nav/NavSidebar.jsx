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
const MIN_VIEWPORT_WIDTH_FOR_EXTENDED_RAIL = 1280
const EXTENDED_PROFILE_COMFORT_HEIGHT = 168
const EXTENDED_ROW_COMFORT_HEIGHT = 42
const EXTENDED_MODE_HYSTERESIS = 24
const SHORT_RAIL_HEIGHT_CONFIG = {
    profile: { floor: 32, base: 96 },
    tools: { floor: 20, base: 64 },
    resume: { floor: 20, base: 64 },
    row: { floor: 10, base: 34, max: 46 }
}

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const input = useInput()
    const language = useLanguage()

    const [prefersExtendedRail, setPrefersExtendedRail] = useState(true)
    const [measuredRailHeight, setMeasuredRailHeight] = useState(0)
    const [heightForcesShortRail, setHeightForcesShortRail] = useState(false)
    const cardWrapperRef = useRef(null)
    const sharedRailStackRef = useRef(null)
    const sharedRailSizeCacheRef = useRef({})
    const shortRailSizeCacheRef = useRef({})

    const linkCount = links?.length || 0
    const hasResumeBand = Boolean(profile.resumePdfUrl)
    const isDesktopBreakpoint = viewport.isBreakpoint("lg")
    const widthForcesShortRail = viewport.innerWidth < MIN_VIEWPORT_WIDTH_FOR_EXTENDED_RAIL
    const extendedEnterShortThreshold = EXTENDED_PROFILE_COMFORT_HEIGHT +
        (EXTENDED_ROW_COMFORT_HEIGHT * (linkCount + 1)) +
        DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT
    const extendedExitShortThreshold = extendedEnterShortThreshold + EXTENDED_MODE_HYSTERESIS
    const availableDesktopRailHeight = measuredRailHeight > 0 ?
        measuredRailHeight :
        viewport.innerHeight
    const forcedShortRail = isDesktopBreakpoint && (widthForcesShortRail || heightForcesShortRail)
    const railMode = forcedShortRail ?
        "short" :
        (prefersExtendedRail ? "extended" : "short")
    const railModeClass = railMode === "extended" ?
        `nav-sidebar-extended` :
        `nav-sidebar-short-rail`
    const showShortRailResumeBand = railMode === "short" && hasResumeBand
    const shortRailResumeBandClass = showShortRailResumeBand ?
        `nav-sidebar-short-rail-with-resume-band` :
        ``
    const canToggleRail = isDesktopBreakpoint && !forcedShortRail

    useEffect(() => {
        if(!canToggleRail)
            return

        const keyId = input.lastKeyPressed.id
        if(keyId === "ArrowLeft")
            setPrefersExtendedRail(false)
        else if(keyId === "ArrowRight")
            setPrefersExtendedRail(true)
    }, [canToggleRail, input.lastKeyPressed])

    useEffect(() => {
        const railCard = cardWrapperRef.current
        if(!railCard)
            return

        const _syncMeasuredHeight = () => {
            const nextHeight = railCard.clientHeight || 0
            setMeasuredRailHeight((currentHeight) =>
                currentHeight === nextHeight ? currentHeight : nextHeight
            )
        }

        _syncMeasuredHeight()

        const resizeObserver = new ResizeObserver(() => {
            _syncMeasuredHeight()
        })
        resizeObserver.observe(railCard)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        if(!isDesktopBreakpoint) {
            setHeightForcesShortRail(false)
            return
        }

        setHeightForcesShortRail((currentState) => {
            const nextState = currentState ?
                availableDesktopRailHeight < extendedExitShortThreshold :
                availableDesktopRailHeight < extendedEnterShortThreshold

            return currentState === nextState ? currentState : nextState
        })
    }, [
        availableDesktopRailHeight,
        extendedEnterShortThreshold,
        extendedExitShortThreshold,
        isDesktopBreakpoint
    ])

    useEffect(() => {
        const railCard = cardWrapperRef.current
        if(railMode !== "short" || !railCard)
            return

        const rowCount = Math.max(linkCount, 1)
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

            const shortBaseFixed = profileHeight.base + toolsHeight.base + (hasResumeBand ? resumeHeight.base : 0)
            const shortFloorFixed = profileHeight.floor + toolsHeight.floor + (hasResumeBand ? resumeHeight.floor : 0)
            const shortBaseTotal = shortBaseFixed + (rowHeight.base * rowCount)
            const shortFloorTotal = shortFloorFixed + (rowHeight.floor * rowCount)

            let nextProfileHeight = profileHeight.base
            let nextToolsHeight = toolsHeight.base
            let nextResumeHeight = hasResumeBand ? resumeHeight.base : 0
            let nextRowHeight = rowHeight.base

            if(availableRailHeight >= shortBaseTotal) {
                nextRowHeight = _clamp(
                    (availableRailHeight - shortBaseFixed) / rowCount,
                    rowHeight.base,
                    rowHeight.max
                )
            } else {
                const compressionFactor = _clamp(
                    (availableRailHeight - shortFloorTotal) / Math.max(shortBaseTotal - shortFloorTotal, 1),
                    0,
                    1
                )

                nextProfileHeight = _interpolate(profileHeight.floor, profileHeight.base, compressionFactor)
                nextToolsHeight = _interpolate(toolsHeight.floor, toolsHeight.base, compressionFactor)
                nextResumeHeight = hasResumeBand ?
                    _interpolate(resumeHeight.floor, resumeHeight.base, compressionFactor) :
                    0
                nextRowHeight = _interpolate(rowHeight.floor, rowHeight.base, compressionFactor)

                if(availableRailHeight < shortFloorTotal) {
                    const microScale = _clamp(
                        availableRailHeight / Math.max(shortFloorTotal, 1),
                        0,
                        1
                    )

                    nextProfileHeight *= microScale
                    nextToolsHeight *= microScale
                    nextResumeHeight *= microScale
                    nextRowHeight *= microScale
                }
            }

            _setVariable("--nav-short-rail-visual-density", Math.max(0, nextRowHeight / rowHeight.base), "")
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
            railCard.style.removeProperty("--nav-short-rail-visual-density")
            railCard.style.removeProperty("--nav-short-rail-profile-height")
            railCard.style.removeProperty("--nav-short-rail-row-height")
            railCard.style.removeProperty("--nav-short-rail-tools-height")
            railCard.style.removeProperty("--nav-short-rail-resume-height")
            railCard.style.removeProperty("--nav-link-target-height")
        }
    }, [hasResumeBand, linkCount, railMode])

    useEffect(() => {
        const sharedRailStack = sharedRailStackRef.current
        if(railMode !== "extended" || !sharedRailStack)
            return

        const rowCount = linkCount + 1
        const rowHeightConfig = { min: 30, compactMin: 22, baseline: 48, max: 64 }

        const _setVariable = (name, value, unit = "px") => {
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

            const shouldPreserveSeparator = (availableRailHeight / rowCount) >= rowHeightConfig.min
            const separatorMinHeight = shouldPreserveSeparator ?
                DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT :
                0
            const idealRowHeight = (availableRailHeight - separatorMinHeight) / rowCount
            const rowHeight = Math.min(rowHeightConfig.max, Math.max(rowHeightConfig.compactMin, idealRowHeight))
            const separatorHeight = Math.max(
                separatorMinHeight,
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
    }, [linkCount, railMode])

    const shortRailResumeBand = showShortRailResumeBand ? (
        <div className={`nav-short-rail-resume-band`}>
            <NavToolResumeDownloader showTooltip={true}
                                     menuClassName={"nav-tools-popup-menu"}
                                     toggleClassName={"nav-short-rail-resume-pill"}
                                     toggleCaption={language.getString("nav_tool_resume")}
                                     toggleCaptionLayout={"inline"}/>
        </div>
    ) : null

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${railModeClass} ${shortRailResumeBandClass}`}>
            <Card ref={cardWrapperRef}
                  className={`nav-sidebar-card-wrapper`}>
                {canToggleRail && (
                    <NavToolShrinkToggle expanded={railMode === "extended"}
                                         setExpanded={setPrefersExtendedRail}/>
                )}

                <NavProfileCard profile={profile}
                                railMode={railMode}/>

                {railMode === "extended" ? (
                    <div ref={sharedRailStackRef}
                         className={`nav-sidebar-rail-stack`}>
                        <NavLinkList links={links}
                                     railMode={railMode}/>

                        <div className={`nav-rail-separator`}
                             aria-hidden={true}/>

                        <NavToolList railMode={railMode}/>
                    </div>
                ) : (
                    <>
                        <NavLinkList links={links}
                                     railMode={railMode}/>

                        {shortRailResumeBand}

                        <NavToolList railMode={railMode}/>
                    </>
                )}
            </Card>
        </nav>
    )
}

export default NavSidebar
