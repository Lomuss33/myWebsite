import "./NavLinkList.scss"
import React, {useEffect, useRef} from 'react'
import Nav from "../base/Nav.jsx"
import GestureAwareButton from "../../buttons/GestureAwareButton.jsx"

function NavLinkList({ links, expanded, compactRail = false }) {
    const containerRef = useRef(null)

    const data = {expanded}
    const shrinkClass = expanded ?
        `` :
        `nav-link-list-shrink`

    useEffect(() => {
        const container = containerRef.current
        if(!container)
            return

        const minRowHeight = compactRail
            ? (expanded ? 26 : 24)
            : (expanded ? 30 : 28)
        const baselineRowHeight = compactRail
            ? (expanded ? 40 : 34)
            : (expanded ? 48 : 40)
        const upscaleCeiling = compactRail
            ? (expanded ? 56 : 46)
            : (expanded ? 64 : 54)

        const _setVariable = (name, value, unit = "px") => {
            container.style.setProperty(name, `${value}${unit}`)
        }

        const _setSidebarVariable = (name, value, unit = "px") => {
            const sidebarCard = container.closest(".nav-sidebar-card-wrapper")
            if(!sidebarCard)
                return
            sidebarCard.style.setProperty(name, `${value}${unit}`)
        }

        const _interpolate = (min, max, factor) => {
            return min + (max - min) * factor
        }

        const _clamp = (value, min, max) => {
            return Math.min(max, Math.max(min, value))
        }

        const _getAdaptiveValue = (minimum, baseline, maximum, shrinkFactor, growFactor) => {
            if(growFactor > 0)
                return _interpolate(baseline, maximum, growFactor)
            return _interpolate(baseline, minimum, shrinkFactor)
        }

        const _syncDensity = () => {
            const amountOfItems = links.length || 0
            const totalHeight = container.clientHeight
            if(!totalHeight || !amountOfItems)
                return

            const rawRowHeight = totalHeight / amountOfItems
            _setSidebarVariable("--nav-link-target-height", rawRowHeight)
            const shrinkFactor = _clamp(
                (baselineRowHeight - rawRowHeight) / Math.max(baselineRowHeight - minRowHeight, 1),
                0,
                1
            )
            const growFactor = _clamp(
                (rawRowHeight - baselineRowHeight) / Math.max(upscaleCeiling - baselineRowHeight, 1),
                0,
                1
            )

            _setVariable("--nav-link-target-height", rawRowHeight)
            _setVariable(
                "--nav-link-icon-width",
                _getAdaptiveValue(
                    compactRail ? (expanded ? 34 : 22) : (expanded ? 40 : 26),
                    compactRail ? (expanded ? 54 : 36) : (expanded ? 60 : 40),
                    compactRail ? (expanded ? 64 : 44) : (expanded ? 72 : 48),
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-icon-size",
                _getAdaptiveValue(
                    compactRail ? (expanded ? 0.84 : 0.82) : (expanded ? 0.92 : 0.9),
                    compactRail ? (expanded ? 1.0 : 0.92) : (expanded ? 1.15 : 1.04),
                    compactRail ? (expanded ? 1.16 : 1.04) : (expanded ? 1.34 : 1.18),
                    shrinkFactor,
                    growFactor
                ),
                "rem"
            )
            _setVariable(
                "--nav-link-font-size",
                _getAdaptiveValue(
                    compactRail ? 0.7 : 0.76,
                    compactRail ? (expanded ? 0.88 : 0.8) : (expanded ? 0.98 : 0.88),
                    compactRail ? (expanded ? 0.98 : 0.88) : (expanded ? 1.08 : 0.94),
                    shrinkFactor,
                    growFactor
                ),
                "rem"
            )
            _setVariable(
                "--nav-link-padding-inline",
                _getAdaptiveValue(
                    compactRail ? (expanded ? 4 : 2) : (expanded ? 6 : 3),
                    compactRail ? (expanded ? 10 : 4) : (expanded ? 12 : 6),
                    compactRail ? (expanded ? 14 : 6) : (expanded ? 16 : 8),
                    shrinkFactor,
                    growFactor
                )
            )
            _setVariable(
                "--nav-link-gap",
                _getAdaptiveValue(
                    compactRail ? (expanded ? 2 : 0) : (expanded ? 4 : 0),
                    compactRail ? (expanded ? 6 : 2) : (expanded ? 8 : 4),
                    compactRail ? (expanded ? 8 : 4) : (expanded ? 10 : 6),
                    shrinkFactor,
                    growFactor
                )
            )
            container.style.setProperty(
                "--nav-link-hover-scale",
                _getAdaptiveValue(
                    compactRail ? 1.015 : 1.03,
                    compactRail ? 1.05 : 1.08,
                    compactRail ? 1.06 : 1.09,
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
        return () => {
            resizeObserver.disconnect()
        }
    }, [compactRail, expanded, links.length])

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
    const tooltip = data.expanded ?
        null :
        link.label

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
