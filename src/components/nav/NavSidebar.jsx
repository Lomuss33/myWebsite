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
    profile: { floor: 58, base: 110 },
    row: { floor: 16, base: 34, max: 84 }
}
const MANUAL_RAIL_BY_ZONE_DEFAULTS = {
    wide: null,
    narrowDesktop: null
}

function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function lerpNumber(minimum, maximum, factor) {
    return minimum + (maximum - minimum) * factor
}

function NavSidebar({ profile, links }) {
    const constants = useConstants()
    const viewport = useViewport()
    const input = useInput()

    const [manualRailByZone, setManualRailByZone] = useState(MANUAL_RAIL_BY_ZONE_DEFAULTS)
    const [measuredRailHeight, setMeasuredRailHeight] = useState(0)
    const [heightPrefersShort, setHeightPrefersShort] = useState(false)
    const [stickyShortRail, setStickyShortRail] = useState(false)
    const cardWrapperRef = useRef(null)
    const sharedRailStackRef = useRef(null)
    const sharedRailSizeCacheRef = useRef({})
    const shortRailSizeCacheRef = useRef({})
    const extendedProfileSizeCacheRef = useRef({})

    const linkCount = links?.length || 0
    const hasResumeBand = Boolean(profile.resumePdfUrl)
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
    const recommendedRail = desktopWidthZone === "narrowDesktop" ?
        "short" :
        (desktopWidthZone === "wide" && heightPrefersShort ? "short" : "extended")
    const manualRail = desktopWidthZone ? manualRailByZone[desktopWidthZone] : null
    const railMode = desktopWidthZone ?
        (manualRail ?? (stickyShortRail ? "short" : recommendedRail)) :
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
        setStickyShortRail(targetRail === "short")
        _setManualRail(targetRail)
    }

    useEffect(() => {
        if(!hasRailLayout || !desktopWidthZone)
            return

        const keyId = input.lastKeyPressed.id
        if(keyId !== "ArrowLeft" && keyId !== "ArrowRight")
            return

        const targetRail = keyId === "ArrowLeft" ? "short" : "extended"
        setStickyShortRail(targetRail === "short")
        setManualRailByZone((currentState) => {
            if(currentState[desktopWidthZone] === targetRail)
                return currentState

            return {
                ...currentState,
                [desktopWidthZone]: targetRail
            }
        })
    }, [desktopWidthZone, hasRailLayout, input.lastKeyPressed])

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
        if(desktopWidthZone !== "wide") {
            setHeightPrefersShort((currentState) => currentState ? false : currentState)
            return
        }

        setHeightPrefersShort((currentState) => {
            const nextState = currentState ?
                availableDesktopRailHeight < extendedHeightExitThreshold :
                availableDesktopRailHeight < extendedHeightRecommendThreshold

            return currentState === nextState ? currentState : nextState
        })
    }, [
        availableDesktopRailHeight,
        desktopWidthZone,
        extendedHeightExitThreshold,
        extendedHeightRecommendThreshold
    ])

    useEffect(() => {
        if(!desktopWidthZone)
            return

        if(recommendedRail !== "short" || manualRail)
            return

        setStickyShortRail(true)
    }, [desktopWidthZone, manualRail, recommendedRail])

    useEffect(() => {
        const railCard = cardWrapperRef.current
        if(!railCard)
            return

        const variableNames = [
            "--nav-extended-profile-height",
            "--nav-extended-avatar-size",
            "--nav-extended-role-height",
            "--nav-extended-role-opacity",
            "--nav-extended-action-scale",
            "--nav-extended-padding-top"
        ]
        const _clearExtendedProfileVariables = () => {
            variableNames.forEach((name) => {
                railCard.style.removeProperty(name)
            })
            extendedProfileSizeCacheRef.current = {}
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

        const _setVariable = (name, value, unit = "px") => {
            const normalizedValue = unit === "px" ?
                Math.round(value) :
                Number(value.toFixed(3))
            const serializedValue = `${normalizedValue}${unit}`

            if(extendedProfileSizeCacheRef.current[name] === serializedValue)
                return

            extendedProfileSizeCacheRef.current[name] = serializedValue
            railCard.style.setProperty(name, serializedValue)
        }

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

            const controlRowCount = rowCount + 1 + (hasResumeBand ? 1 : 0)
            const shortBaseTotal = profileHeight.base + (rowHeight.base * controlRowCount)
            const shortFloorTotal = profileHeight.floor + (rowHeight.floor * controlRowCount)

            let nextProfileHeight = profileHeight.base
            let nextRowHeight = rowHeight.base

            if(availableRailHeight >= shortBaseTotal) {
                nextRowHeight = clampNumber(
                    (availableRailHeight - profileHeight.base) / controlRowCount,
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
            const nextVisualDensity = Math.max(0, nextRowHeight / rowHeight.base)
            const railWidth = railCard.clientWidth || 108
            const linkButtonWidth = railWidth
            const toolButtonWidth = Math.max((railWidth - 2) / 2, 1)
            const resumeButtonWidth = railWidth
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

            _setVariable("--nav-short-rail-visual-density", nextVisualDensity, "")
            _setVariable("--nav-short-rail-profile-height", nextProfileHeight)
            _setVariable("--nav-short-rail-row-height", nextRowHeight)
            _setVariable("--nav-short-rail-tools-height", nextToolsHeight)
            _setVariable("--nav-short-rail-resume-height", nextResumeHeight)
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
            _setVariable(
                "--nav-short-rail-tool-icon-box-size",
                getAdaptiveValue(15, 22, 28, toolButtonWidth * 0.58)
            )
            _setVariable(
                "--nav-short-rail-tool-icon-font-size",
                getAdaptiveValue(0.72, 0.84, 1.02, toolButtonWidth * 0.021),
                "rem"
            )
            _setVariable(
                "--nav-short-rail-resume-icon-box-size",
                getAdaptiveValue(18, 26, 34, resumeButtonWidth * 0.34)
            )
            _setVariable(
                "--nav-short-rail-resume-icon-font-size",
                getAdaptiveValue(0.9, 1.16, 1.42, resumeButtonWidth * 0.0215),
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
            shortRailSizeCacheRef.current = {}
            railCard.style.removeProperty("--nav-short-rail-visual-density")
            railCard.style.removeProperty("--nav-short-rail-profile-height")
            railCard.style.removeProperty("--nav-short-rail-row-height")
            railCard.style.removeProperty("--nav-short-rail-tools-height")
            railCard.style.removeProperty("--nav-short-rail-resume-height")
            railCard.style.removeProperty("--nav-link-target-height")
            railCard.style.removeProperty("--nav-short-rail-link-icon-width")
            railCard.style.removeProperty("--nav-short-rail-link-icon-size")
            railCard.style.removeProperty("--nav-short-rail-tool-icon-box-size")
            railCard.style.removeProperty("--nav-short-rail-tool-icon-font-size")
            railCard.style.removeProperty("--nav-short-rail-resume-icon-box-size")
            railCard.style.removeProperty("--nav-short-rail-resume-icon-font-size")
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
