import "./NavLinkList.scss"
import React, {useEffect, useRef} from 'react'
import Nav from "../base/Nav.jsx"
import GestureAwareButton from "../../buttons/GestureAwareButton.jsx"

function NavLinkList({ links, expanded, compactRail = false, shortRail = false, sharedRailMode = false }) {
    const containerRef = useRef(null)
    const lastValuesRef = useRef({})

    const data = {expanded}
    const shrinkClass = expanded ?
        `` :
        `nav-link-list-shrink`
    const useSharedDesktopDensityScale = sharedRailMode && !shortRail
    const useCompactDensityScale = compactRail && !sharedRailMode
    const useShortRailDensityScale = shortRail && !sharedRailMode

    useEffect(() => {
        const container = containerRef.current
        if(!container)
            return
        const railCard = container.closest(".nav-sidebar-card-wrapper")
        const sharedRailStack = container.closest(".nav-sidebar-rail-stack")
        const navTools = railCard?.querySelector(".nav-tools")

        const useCompactRowConfig = useCompactDensityScale || useShortRailDensityScale
        const minRowHeight = sharedRailMode ?
            (expanded ? 24 : 22) :
            useShortRailDensityScale
            ? 16 :
            useCompactRowConfig
            ? (expanded ? 26 : 24)
            : (expanded ? 30 : 28)
        const baselineRowHeight = sharedRailMode ?
            (expanded ? 42 : 34) :
            useShortRailDensityScale
            ? 34 :
            useCompactRowConfig
            ? (expanded ? 40 : 34)
            : (expanded ? 48 : 40)
        const upscaleCeiling = sharedRailMode ?
            (expanded ? 60 : 50) :
            useShortRailDensityScale
            ? 46 :
            useCompactRowConfig
            ? (expanded ? 56 : 46)
            : (expanded ? 64 : 54)

        const _setVariable = (name, value, unit = "px", target = container, cacheScope = "container") => {
            if(!target)
                return

            const normalizedValue = unit === "px"
                ? Math.round(value)
                : Number(value.toFixed(3))
            const nextSerializedValue = `${normalizedValue}${unit}`
            const cacheKey = `${cacheScope}:${name}`

            if(lastValuesRef.current[cacheKey] === nextSerializedValue)
                return

            lastValuesRef.current[cacheKey] = nextSerializedValue
            target.style.setProperty(name, nextSerializedValue)
        }

        const _interpolate = (min, max, factor) => {
            return min + (max - min) * factor
        }

        const _clamp = (value, min, max) => {
            return Math.min(max, Math.max(min, value))
        }

        const _readPxVariable = (element, name, fallback = 0) => {
            if(!element || typeof window === "undefined")
                return fallback

            const rawValue = window.getComputedStyle(element).getPropertyValue(name)
            const parsedValue = parseFloat(rawValue)
            return Number.isFinite(parsedValue) ? parsedValue : fallback
        }

        const _getAdaptiveValue = (minimum, baseline, maximum, shrinkFactor, growFactor) => {
            if(growFactor > 0)
                return _interpolate(baseline, maximum, growFactor)
            return _interpolate(baseline, minimum, shrinkFactor)
        }

        const _syncDensity = () => {
            const amountOfItems = links.length || 0
            if(!amountOfItems)
                return

            const sharedRowHeight = sharedRailMode ?
                _readPxVariable(sharedRailStack || container, "--nav-link-target-height", baselineRowHeight) :
                useShortRailDensityScale ?
                    _readPxVariable(railCard, "--nav-link-target-height", baselineRowHeight) :
                (() => {
                    const totalHeight = container.clientHeight
                    const railHeight = railCard?.clientHeight || 0
                    if(!totalHeight && !railHeight)
                        return 0

                    const currentToolsHeight = navTools?.clientHeight || 0
                    const reservedCompactHeight = useCompactDensityScale ?
                        _readPxVariable(railCard, "--nav-short-rail-profile-height") +
                        _readPxVariable(railCard, "--nav-short-rail-resume-height") +
                        _readPxVariable(railCard, "--nav-short-rail-tools-height") :
                        0
                    const compactAvailableHeight = useCompactDensityScale && railHeight > 0 ?
                        Math.max(railHeight - reservedCompactHeight, 0) :
                        0

                    return useCompactDensityScale && railHeight > 0 ?
                        Math.max(baselineRowHeight, compactAvailableHeight / amountOfItems) :
                        (currentToolsHeight > 0 ? (totalHeight + currentToolsHeight) / (amountOfItems + 1) : totalHeight / amountOfItems)
                })()
            if(!sharedRowHeight)
                return

            const shrinkFactor = _clamp(
                (baselineRowHeight - sharedRowHeight) / Math.max(baselineRowHeight - minRowHeight, 1),
                0,
                1
            )
            const growFactor = _clamp(
                (sharedRowHeight - baselineRowHeight) / Math.max(upscaleCeiling - baselineRowHeight, 1),
                0,
                1
            )

            if(!sharedRailMode && !useShortRailDensityScale) {
                _setVariable("--nav-link-target-height", sharedRowHeight)
                _setVariable("--nav-link-target-height", sharedRowHeight, "px", railCard, "rail-card")
            }
            _setVariable(
                "--nav-link-icon-width",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 30 : 22) :
                    useShortRailDensityScale ? 16 :
                    useCompactRowConfig ? (expanded ? 34 : 22) : (expanded ? 40 : 26),
                    useSharedDesktopDensityScale ? (expanded ? 50 : 32) :
                    useShortRailDensityScale ? 28 :
                    useCompactRowConfig ? (expanded ? 54 : 36) : (expanded ? 60 : 40),
                    useSharedDesktopDensityScale ? (expanded ? 68 : 44) :
                    useShortRailDensityScale ? 38 :
                    useCompactRowConfig ? (expanded ? 64 : 44) : (expanded ? 72 : 48),
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-icon-size",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 0.82 : 0.8) :
                    useShortRailDensityScale ? 0.66 :
                    useCompactRowConfig ? (expanded ? 0.84 : 0.82) : (expanded ? 0.92 : 0.9),
                    useSharedDesktopDensityScale ? (expanded ? 1.04 : 0.94) :
                    useShortRailDensityScale ? 0.88 :
                    useCompactRowConfig ? (expanded ? 1.0 : 0.92) : (expanded ? 1.15 : 1.04),
                    useSharedDesktopDensityScale ? (expanded ? 1.26 : 1.08) :
                    useShortRailDensityScale ? 1.04 :
                    useCompactRowConfig ? (expanded ? 1.16 : 1.04) : (expanded ? 1.34 : 1.18),
                    shrinkFactor,
                    growFactor
                ),
                "rem"
            )
            _setVariable(
                "--nav-link-font-size",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 0.78 : 0.72) :
                    useShortRailDensityScale ? 0.56 :
                    useCompactRowConfig ? 0.7 : 0.76,
                    useSharedDesktopDensityScale ? (expanded ? 0.92 : 0.82) :
                    useShortRailDensityScale ? 0.72 :
                    useCompactRowConfig ? (expanded ? 0.88 : 0.8) : (expanded ? 0.98 : 0.88),
                    useSharedDesktopDensityScale ? (expanded ? 1.04 : 0.9) :
                    useShortRailDensityScale ? 0.82 :
                    useCompactRowConfig ? (expanded ? 0.98 : 0.88) : (expanded ? 1.08 : 0.94),
                    shrinkFactor,
                    growFactor
                ),
                "rem"
            )
            _setVariable(
                "--nav-link-padding-inline",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 4 : 2) :
                    useShortRailDensityScale ? 0 :
                    useCompactRowConfig ? (expanded ? 4 : 2) : (expanded ? 6 : 3),
                    useSharedDesktopDensityScale ? (expanded ? 10 : 4) :
                    useShortRailDensityScale ? 1 :
                    useCompactRowConfig ? (expanded ? 10 : 4) : (expanded ? 12 : 6),
                    useSharedDesktopDensityScale ? (expanded ? 14 : 6) :
                    useShortRailDensityScale ? 4 :
                    useCompactRowConfig ? (expanded ? 14 : 6) : (expanded ? 16 : 8),
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-gap",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 4 : 0) :
                    useShortRailDensityScale ? 0 :
                    useCompactRowConfig ? (expanded ? 2 : 0) : (expanded ? 4 : 0),
                    useSharedDesktopDensityScale ? (expanded ? 6 : 2) :
                    useShortRailDensityScale ? 0 :
                    useCompactRowConfig ? (expanded ? 6 : 2) : (expanded ? 8 : 4),
                    useSharedDesktopDensityScale ? (expanded ? 8 : 4) :
                    useShortRailDensityScale ? 2 :
                    useCompactRowConfig ? (expanded ? 8 : 4) : (expanded ? 10 : 6),
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-accent-bar-width",
                _getAdaptiveValue(
                    useShortRailDensityScale ? 3 :
                    useSharedDesktopDensityScale ? 3 : 4,
                    useShortRailDensityScale ? 4 :
                    useSharedDesktopDensityScale ? 4 : 4,
                    useShortRailDensityScale ? 4 :
                    useSharedDesktopDensityScale ? 4 : 4,
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-accent-bar-height",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? (expanded ? 16 : 14) :
                    useShortRailDensityScale ? 14 : 20,
                    useSharedDesktopDensityScale ? (expanded ? 26 : 22) :
                    useShortRailDensityScale ? 24 : 30,
                    useSharedDesktopDensityScale ? (expanded ? 34 : 28) :
                    useShortRailDensityScale ? 30 : 34,
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-accent-dot-size",
                _getAdaptiveValue(
                    useShortRailDensityScale ? 4 :
                    useSharedDesktopDensityScale ? 4 : 5,
                    useShortRailDensityScale ? 5 :
                    useSharedDesktopDensityScale ? 5 : 6,
                    useShortRailDensityScale ? 6 :
                    useSharedDesktopDensityScale ? 6 : 7,
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-accent-dot-offset-x",
                _getAdaptiveValue(
                    useShortRailDensityScale ? 7 :
                    useSharedDesktopDensityScale ? 7 : 8,
                    useShortRailDensityScale ? 8 :
                    useSharedDesktopDensityScale ? 8 : 10,
                    useShortRailDensityScale ? 9 :
                    useSharedDesktopDensityScale ? 10 : 12,
                    shrinkFactor,
                    growFactor
                )
            )
            container.style.setProperty(
                "--nav-link-hover-scale",
                _getAdaptiveValue(
                    useSharedDesktopDensityScale ? 1.02 :
                    useCompactRowConfig ? 1.015 : 1.03,
                    useSharedDesktopDensityScale ? 1.06 :
                    useCompactRowConfig ? 1.05 : 1.08,
                    useSharedDesktopDensityScale ? 1.08 :
                    useCompactRowConfig ? 1.06 : 1.09,
                    shrinkFactor,
                    growFactor
                ).toFixed(3)
            )
        }

        _syncDensity()
        const resizeObserver = new ResizeObserver(() => {
            _syncDensity()
        })

        resizeObserver.observe(container)
        if(sharedRailMode && sharedRailStack && sharedRailStack !== container)
            resizeObserver.observe(sharedRailStack)

        return () => {
            resizeObserver.disconnect()
            if(!sharedRailMode && !useShortRailDensityScale)
                railCard?.style.removeProperty("--nav-link-target-height")
        }
    }, [compactRail, expanded, links.length, sharedRailMode, shortRail, useCompactDensityScale, useSharedDesktopDensityScale, useShortRailDensityScale])

    return (
        <div ref={containerRef}
             className={`nav-link-list-shell ${shrinkClass}`}>
            <Nav links={links}
                 data={data}
                 tag={`nav-link-list`}
                 className={`nav-link-list`}
                 itemComponent={NavLink}/>
        </div>
    )
}

function NavLink({ link, active, data, onClick }) {
    const activeClass = active ?
        `nav-link-active` :
        ``
    const tooltip = link.tooltip || link.label

    return (
        <GestureAwareButton className={`nav-link ${activeClass}`}
                            hrefToolTip={link.href}
                            tooltip={tooltip}
                            onClick={onClick}>
            <i className={`${link.faIcon}`}/>
            <span dangerouslySetInnerHTML={{__html: link.label}}/>
        </GestureAwareButton>
    )
}

export default NavLinkList
