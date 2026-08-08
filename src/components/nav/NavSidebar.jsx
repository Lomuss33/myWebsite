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

const DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT = 4
const WIDE_DESKTOP_THRESHOLD = 1100
const EXTENDED_HEIGHT_RECOMMEND_PROFILE = 152
const EXTENDED_HEIGHT_RECOMMEND_ROW = 40
const EXTENDED_HEIGHT_RECOMMEND_SEPARATOR = 4
const HEIGHT_RECOMMENDATION_HYSTERESIS = 20
const EXTENDED_PROFILE_COMPRESSION_CONFIG = {
    profileHeight: { min: 96, base: 164 },
    avatarSize: { min: 74, base: 118 },
    roleHeight: { min: 0, base: 28 },
    actionScale: { min: 0.82, base: 1 },
    paddingTop: { min: 8, base: 16 }
}
const SHORT_RAIL_HEIGHT_CONFIG = {
    profile: { floor: 96, base: EXTENDED_PROFILE_COMPRESSION_CONFIG.profileHeight.base },
    row: { floor: 16, base: 34, max: 64 }
}
const MANUAL_RAIL_BY_ZONE_DEFAULTS = {
    wide: null,
    narrowDesktop: null
}
const EXTENDED_PROFILE_VARIABLE_NAMES = [
    "--nav-extended-profile-height",
    "--nav-extended-avatar-size",
    "--nav-extended-role-height",
    "--nav-extended-role-opacity",
    "--nav-extended-action-scale",
    "--nav-extended-padding-top"
]
const SHORT_RAIL_VARIABLE_NAMES = [
    "--nav-sidebar-toggle-top",
    "--nav-short-rail-visual-density",
    "--nav-short-rail-profile-height",
    "--nav-short-rail-row-height",
    "--nav-short-rail-tools-height",
    "--nav-short-rail-resume-height",
    "--nav-short-rail-separator-height",
    "--nav-link-target-height",
    "--nav-short-rail-link-icon-width",
    "--nav-short-rail-link-icon-size"
]
const SHARED_RAIL_VARIABLE_NAMES = [
    "--nav-link-target-height",
    "--nav-tools-height",
    "--nav-rail-separator-height"
]

function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function lerpNumber(minimum, maximum, factor) {
    return minimum + (maximum - minimum) * factor
}

function serializeCssVariableValue(value, unit = "px") {
    const normalizedValue = unit === "px" ?
        Math.round(value) :
        Number(value.toFixed(3))

    return `${normalizedValue}${unit}`
}

function setCachedCssVariable(element, cache, name, value, unit = "px") {
    const serializedValue = serializeCssVariableValue(value, unit)

    if(cache[name] === serializedValue)
        return

    cache[name] = serializedValue
    element.style.setProperty(name, serializedValue)
}

function clearCachedCssVariables(element, cacheRef, variableNames) {
    variableNames.forEach((name) => {
        element.style.removeProperty(name)
    })
    cacheRef.current = {}
}

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()

    const [manualRailByZone, setManualRailByZone] = useState(MANUAL_RAIL_BY_ZONE_DEFAULTS)
    const [measuredRailHeight, setMeasuredRailHeight] = useState(0)
    const cardWrapperRef = useRef(null)
    const sharedRailStackRef = useRef(null)
    const sharedRailSizeCacheRef = useRef({})
    const shortRailSizeCacheRef = useRef({})
    const extendedProfileSizeCacheRef = useRef({})

    const linkCount = links?.length || 0
    const hasResumeBand = Boolean(profile?.resumePdfUrl)
    const hasRailLayout = viewport.isDesktopLayout()
    const desktopWidthZone = !hasRailLayout ?
        null :
        (viewport.innerWidth >= WIDE_DESKTOP_THRESHOLD ? "wide" : "narrowDesktop")
    const extendedRowCount = linkCount + 1
    const extendedHeightRecommendThreshold = EXTENDED_HEIGHT_RECOMMEND_PROFILE +
        (EXTENDED_HEIGHT_RECOMMEND_ROW * extendedRowCount) +
        EXTENDED_HEIGHT_RECOMMEND_SEPARATOR
    const extendedHeightExitThreshold = extendedHeightRecommendThreshold + HEIGHT_RECOMMENDATION_HYSTERESIS
    const availableDesktopRailHeight = measuredRailHeight > 0 ?
        measuredRailHeight :
        viewport.innerHeight
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
        const railCard = cardWrapperRef.current
        if(!railCard)
            return

        const _clearExtendedProfileVariables = () => {
            clearCachedCssVariables(railCard, extendedProfileSizeCacheRef, EXTENDED_PROFILE_VARIABLE_NAMES)
        }

        if(railMode !== "extended") {
            _clearExtendedProfileVariables()
            return
        }

        const compressionRange = Math.max(
            extendedHeightExitThreshold - extendedHeightRecommendThreshold,
            1
        )
        const extendedVisualCompression = clampNumber(
            (availableDesktopRailHeight - extendedHeightRecommendThreshold) / compressionRange,
            0,
            1
        )

        const _setVariable = (name, value, unit = "px") =>
            setCachedCssVariable(railCard, extendedProfileSizeCacheRef.current, name, value, unit)

        _setVariable(
            "--nav-extended-profile-height",
            lerpNumber(
                EXTENDED_PROFILE_COMPRESSION_CONFIG.profileHeight.min,
                EXTENDED_PROFILE_COMPRESSION_CONFIG.profileHeight.base,
                extendedVisualCompression
            )
        )
        _setVariable(
            "--nav-extended-avatar-size",
            lerpNumber(
                EXTENDED_PROFILE_COMPRESSION_CONFIG.avatarSize.min,
                EXTENDED_PROFILE_COMPRESSION_CONFIG.avatarSize.base,
                extendedVisualCompression
            )
        )
        _setVariable(
            "--nav-extended-role-height",
            lerpNumber(
                EXTENDED_PROFILE_COMPRESSION_CONFIG.roleHeight.min,
                EXTENDED_PROFILE_COMPRESSION_CONFIG.roleHeight.base,
                extendedVisualCompression
            )
        )
        _setVariable("--nav-extended-role-opacity", extendedVisualCompression, "")
        _setVariable(
            "--nav-extended-action-scale",
            lerpNumber(
                EXTENDED_PROFILE_COMPRESSION_CONFIG.actionScale.min,
                EXTENDED_PROFILE_COMPRESSION_CONFIG.actionScale.base,
                extendedVisualCompression
            ),
            ""
        )
        _setVariable(
            "--nav-extended-padding-top",
            lerpNumber(
                EXTENDED_PROFILE_COMPRESSION_CONFIG.paddingTop.min,
                EXTENDED_PROFILE_COMPRESSION_CONFIG.paddingTop.base,
                extendedVisualCompression
            )
        )

        return () => {
            _clearExtendedProfileVariables()
        }
    }, [
        availableDesktopRailHeight,
        extendedHeightExitThreshold,
        extendedHeightRecommendThreshold,
        railMode
    ])

    useEffect(() => {
        const railCard = cardWrapperRef.current
        if(railMode !== "short" || !railCard)
            return

        const rowCount = Math.max(linkCount, 1)
        const {
            profile: profileHeight,
            row: rowHeight
        } = SHORT_RAIL_HEIGHT_CONFIG

        const _setVariable = (name, value, unit = "px") =>
            setCachedCssVariable(railCard, shortRailSizeCacheRef.current, name, value, unit)

        const _syncShortRailSizing = () => {
            const availableRailHeight = railCard.clientHeight
            if(!availableRailHeight)
                return

            const controlRowCount = rowCount + 1 + (hasResumeBand ? 1 : 0)
            const availableAfterProfileFloor = Math.max(availableRailHeight - profileHeight.floor, 0)
            const shouldPreserveSeparator =
                (availableAfterProfileFloor / Math.max(controlRowCount + 1, 1)) >= rowHeight.floor
            const nextSeparatorHeight = shouldPreserveSeparator ?
                DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT :
                0
            const shortBaseTotal = profileHeight.base + nextSeparatorHeight + (rowHeight.base * controlRowCount)
            const shortFloorTotal = profileHeight.floor + nextSeparatorHeight + (rowHeight.floor * controlRowCount)

            let nextProfileHeight = profileHeight.base
            let nextRowHeight = rowHeight.base

            if(availableRailHeight >= shortBaseTotal) {
                const idealControlHeight = (availableRailHeight - profileHeight.base - nextSeparatorHeight) / controlRowCount
                nextRowHeight = clampNumber(
                    idealControlHeight,
                    rowHeight.base,
                    rowHeight.max
                )
            } else {
                const compressionFactor = clampNumber(
                    (availableRailHeight - shortFloorTotal) / Math.max(shortBaseTotal - shortFloorTotal, 1),
                    0,
                    1
                )

                nextProfileHeight = lerpNumber(profileHeight.floor, profileHeight.base, compressionFactor)
                nextRowHeight = lerpNumber(rowHeight.floor, rowHeight.base, compressionFactor)

                if(availableRailHeight < shortFloorTotal) {
                    const microScale = clampNumber(
                        availableRailHeight / Math.max(shortFloorTotal, 1),
                        0,
                        1
                    )

                    nextProfileHeight *= microScale
                    nextRowHeight *= microScale
                }
            }

            const nextToolsHeight = nextRowHeight
            const nextResumeHeight = hasResumeBand ? nextRowHeight : 0
            const nextToggleTop = nextProfileHeight + (nextResumeHeight / 2) - 16
            const nextVisualDensity = Math.max(0, nextRowHeight / rowHeight.base)
            const railWidth = railCard.clientWidth || 108
            const linkButtonWidth = railWidth
            const shrinkFactor = clampNumber(
                (rowHeight.base - nextRowHeight) / Math.max(rowHeight.base - rowHeight.floor, 1),
                0,
                1
            )
            const growFactor = clampNumber(
                (nextRowHeight - rowHeight.base) / Math.max(rowHeight.max - rowHeight.base, 1),
                0,
                1
            )
            const getAdaptiveValue = (minimum, baseline, maximum, widthCap = Number.POSITIVE_INFINITY) => {
                const heightDrivenValue = growFactor > 0 ?
                    lerpNumber(baseline, maximum, growFactor) :
                    lerpNumber(baseline, minimum, shrinkFactor)

                return Math.min(heightDrivenValue, widthCap)
            }

            _setVariable("--nav-sidebar-toggle-top", nextToggleTop)
            _setVariable("--nav-short-rail-visual-density", nextVisualDensity, "")
            _setVariable("--nav-short-rail-profile-height", nextProfileHeight)
            _setVariable("--nav-short-rail-row-height", nextRowHeight)
            _setVariable("--nav-short-rail-tools-height", nextToolsHeight)
            _setVariable("--nav-short-rail-resume-height", nextResumeHeight)
            _setVariable("--nav-short-rail-separator-height", nextSeparatorHeight)
            _setVariable("--nav-link-target-height", nextRowHeight)
            _setVariable(
                "--nav-short-rail-link-icon-width",
                getAdaptiveValue(18, 24, 34, linkButtonWidth * 0.42)
            )
            _setVariable(
                "--nav-short-rail-link-icon-size",
                getAdaptiveValue(0.92, 1.2, 1.55, (linkButtonWidth * 0.0185)),
                "rem"
            )
        }

        _syncShortRailSizing()

        const resizeObserver = new ResizeObserver(() => {
            _syncShortRailSizing()
        })
        resizeObserver.observe(railCard)

        return () => {
            resizeObserver.disconnect()
            clearCachedCssVariables(railCard, shortRailSizeCacheRef, SHORT_RAIL_VARIABLE_NAMES)
        }
    }, [hasResumeBand, linkCount, railMode])

    useEffect(() => {
        const sharedRailStack = sharedRailStackRef.current
        if(railMode !== "extended" || !sharedRailStack)
            return

        const linkAndToolRowCount = linkCount + 1
        const rowHeightConfig = { min: 30, compactMin: 22, baseline: 48, max: 64 }

        const _setVariable = (name, value, unit = "px") =>
            setCachedCssVariable(sharedRailStack, sharedRailSizeCacheRef.current, name, value, unit)

        const _syncSharedRailSizing = () => {
            const availableRailHeight = sharedRailStack.clientHeight
            if(!availableRailHeight || linkAndToolRowCount <= 0)
                return

            // Keep tall-screen overflow inside the page-link grid row: the
            // separator stays thin, while the link list receives extra space.
            const shouldPreserveSeparator = (availableRailHeight / linkAndToolRowCount) >= rowHeightConfig.min
            const separatorHeight = shouldPreserveSeparator ?
                DESKTOP_RAIL_SEPARATOR_MIN_HEIGHT :
                0
            const idealControlHeight = (availableRailHeight - separatorHeight) / linkAndToolRowCount
            const controlHeight = Math.min(
                rowHeightConfig.max,
                Math.max(rowHeightConfig.compactMin, idealControlHeight)
            )

            _setVariable("--nav-link-target-height", controlHeight)
            _setVariable("--nav-tools-height", controlHeight)
            _setVariable("--nav-rail-separator-height", separatorHeight)
        }

        _syncSharedRailSizing()

        const resizeObserver = new ResizeObserver(() => {
            _syncSharedRailSizing()
        })
        resizeObserver.observe(sharedRailStack)

        return () => {
            resizeObserver.disconnect()
            clearCachedCssVariables(sharedRailStack, sharedRailSizeCacheRef, SHARED_RAIL_VARIABLE_NAMES)
        }
    }, [linkCount, railMode])

    const shortRailResumeBand = showShortRailResumeBand ? (
        <div className={`nav-short-rail-resume-band`}>
            <NavToolResumeDownloader showTooltip={true}
                                     menuClassName={"nav-tools-popup-menu"}
                                     toggleClassName={"nav-short-rail-resume-pill"}/>
        </div>
    ) : null

    return (
        <nav className={`nav-sidebar ${constants.HTML_CLASSES.scrollbarDecorator} ${railModeClass} ${shortRailResumeBandClass}`}>
            <Card ref={cardWrapperRef}
                  className={`nav-sidebar-card-wrapper`}>
                {hasRailLayout && (
                    <NavToolShrinkToggle expanded={railMode === "extended"}
                                         onToggle={_toggleRailMode}/>
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
