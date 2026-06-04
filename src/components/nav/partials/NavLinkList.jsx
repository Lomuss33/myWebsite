import "./NavLinkList.scss"
import React, {useEffect, useRef} from 'react'
import Nav from "../base/Nav.jsx"
import GestureAwareButton from "../../buttons/GestureAwareButton.jsx"

const EXTENDED_RAIL_DENSITY_PROFILE = {
    minRowHeight: 18,
    baselineRowHeight: 48,
    upscaleCeiling: 64,
    iconWidth: { min: 30, baseline: 60, max: 72 },
    iconSize: { min: 0.78, baseline: 1.15, max: 1.34, unit: "rem" },
    fontSize: { min: 0.68, baseline: 0.98, max: 1.08, unit: "rem" },
    paddingInline: { min: 4, baseline: 12, max: 16 },
    gap: { min: 2, baseline: 8, max: 10 },
    hoverScale: { min: 1.02, baseline: 1.08, max: 1.09, unit: "" },
    accentBarWidth: { min: 3, baseline: 4, max: 4 },
    accentBarHeight: { min: 16, baseline: 30, max: 34 },
    accentDotSize: { min: 4, baseline: 6, max: 7 },
    accentDotOffsetX: { min: 7, baseline: 10, max: 12 }
}

const EXTENDED_RAIL_VARIABLE_NAMES = [
    "--nav-link-target-height",
    "--nav-link-icon-width",
    "--nav-link-icon-size",
    "--nav-link-font-size",
    "--nav-link-padding-inline",
    "--nav-link-gap",
    "--nav-link-accent-bar-width",
    "--nav-link-accent-bar-height",
    "--nav-link-accent-dot-size",
    "--nav-link-accent-dot-offset-x",
    "--nav-link-hover-scale"
]

function NavLinkList({ links, railMode }) {
    const containerRef = useRef(null)
    const lastValuesRef = useRef({})
    const isExtendedRail = railMode === "extended"
    const modeClass = isExtendedRail ?
        "nav-link-list-extended" :
        "nav-link-list-short-rail"
    const exactFitClass = isExtendedRail ?
        "nav-link-list-exact-fit" :
        ""

    useEffect(() => {
        const container = containerRef.current
        if(!container)
            return

        const _clearExtendedRailVariables = () => {
            EXTENDED_RAIL_VARIABLE_NAMES.forEach((name) => {
                container.style.removeProperty(name)
            })
            lastValuesRef.current = {}
        }

        if(!isExtendedRail) {
            _clearExtendedRailVariables()
            return
        }

        const sharedRailStack = container.closest(".nav-sidebar-rail-stack")
        const {
            minRowHeight,
            baselineRowHeight,
            upscaleCeiling,
            iconWidth,
            iconSize,
            fontSize,
            paddingInline,
            gap,
            hoverScale,
            accentBarWidth,
            accentBarHeight,
            accentDotSize,
            accentDotOffsetX
        } = EXTENDED_RAIL_DENSITY_PROFILE

        const _setVariable = (name, value, unit = "px") => {
            const normalizedValue = unit === "px" ?
                Math.round(value) :
                Number(value.toFixed(3))
            const nextSerializedValue = `${normalizedValue}${unit}`

            if(lastValuesRef.current[name] === nextSerializedValue)
                return

            lastValuesRef.current[name] = nextSerializedValue
            container.style.setProperty(name, nextSerializedValue)
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

            const rowHeight = container.clientHeight > 0 ?
                container.clientHeight / amountOfItems :
                _readPxVariable(sharedRailStack || container, "--nav-link-target-height", baselineRowHeight)
            if(!rowHeight)
                return

            const shrinkFactor = _clamp(
                (baselineRowHeight - rowHeight) / Math.max(baselineRowHeight - minRowHeight, 1),
                0,
                1
            )
            const growFactor = _clamp(
                (rowHeight - baselineRowHeight) / Math.max(upscaleCeiling - baselineRowHeight, 1),
                0,
                1
            )

            _setVariable("--nav-link-target-height", rowHeight)
            _setVariable(
                "--nav-link-icon-width",
                _getAdaptiveValue(iconWidth.min, iconWidth.baseline, iconWidth.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-icon-size",
                _getAdaptiveValue(iconSize.min, iconSize.baseline, iconSize.max, shrinkFactor, growFactor),
                iconSize.unit
            )
            _setVariable(
                "--nav-link-font-size",
                _getAdaptiveValue(fontSize.min, fontSize.baseline, fontSize.max, shrinkFactor, growFactor),
                fontSize.unit
            )
            _setVariable(
                "--nav-link-padding-inline",
                _getAdaptiveValue(paddingInline.min, paddingInline.baseline, paddingInline.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-gap",
                _getAdaptiveValue(gap.min, gap.baseline, gap.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-accent-bar-width",
                _getAdaptiveValue(accentBarWidth.min, accentBarWidth.baseline, accentBarWidth.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-accent-bar-height",
                _getAdaptiveValue(accentBarHeight.min, accentBarHeight.baseline, accentBarHeight.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-accent-dot-size",
                _getAdaptiveValue(accentDotSize.min, accentDotSize.baseline, accentDotSize.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-accent-dot-offset-x",
                _getAdaptiveValue(accentDotOffsetX.min, accentDotOffsetX.baseline, accentDotOffsetX.max, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-hover-scale",
                _getAdaptiveValue(hoverScale.min, hoverScale.baseline, hoverScale.max, shrinkFactor, growFactor),
                hoverScale.unit
            )
        }

        _syncDensity()

        const resizeObserver = new ResizeObserver(() => {
            _syncDensity()
        })

        resizeObserver.observe(container)
        if(sharedRailStack && sharedRailStack !== container)
            resizeObserver.observe(sharedRailStack)

        return () => {
            resizeObserver.disconnect()
            _clearExtendedRailVariables()
        }
    }, [isExtendedRail, links.length])

    return (
        <div ref={containerRef}
             className={`nav-link-list-shell ${modeClass} ${exactFitClass}`.trim()}>
            <Nav links={links}
                 data={{ railMode }}
                 tag={`nav-link-list`}
                 className={`nav-link-list`}
                 itemComponent={NavLink}/>
        </div>
    )
}

function NavLink({ link, active, onClick }) {
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
