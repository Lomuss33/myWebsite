import "./NavLinkList.scss"
import React, {useEffect, useRef} from 'react'
import Nav from "../base/Nav.jsx"
import GestureAwareButton from "../../buttons/GestureAwareButton.jsx"

function NavLinkList({ links, expanded }) {
    const containerRef = useRef(null)

    const data = {expanded}
    const shrinkClass = expanded ?
        `` :
        `nav-link-list-shrink`

    useEffect(() => {
        const container = containerRef.current
        if(!container)
            return

        const minRowHeight = expanded ? 30 : 28
        const baselineRowHeight = expanded ? 48 : 40
        const upscaleCeiling = expanded ? 64 : 54

        const _setVariable = (name, value, unit = "px") => {
            container.style.setProperty(name, `${value}${unit}`)
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
                _getAdaptiveValue(expanded ? 40 : 26, expanded ? 60 : 40, expanded ? 72 : 48, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-icon-size",
                _getAdaptiveValue(expanded ? 0.92 : 0.9, expanded ? 1.15 : 1.04, expanded ? 1.34 : 1.18, shrinkFactor, growFactor),
                "rem"
            )
            _setVariable(
                "--nav-link-font-size",
                _getAdaptiveValue(0.76, expanded ? 0.98 : 0.88, expanded ? 1.08 : 0.94, shrinkFactor, growFactor),
                "rem"
            )
            _setVariable(
                "--nav-link-padding-inline",
                _getAdaptiveValue(expanded ? 6 : 3, expanded ? 12 : 6, expanded ? 16 : 8, shrinkFactor, growFactor)
            )
            _setVariable(
                "--nav-link-gap",
                _getAdaptiveValue(expanded ? 4 : 0, expanded ? 8 : 4, expanded ? 10 : 6, shrinkFactor, growFactor)
            )
            container.style.setProperty(
                "--nav-link-hover-scale",
                _getAdaptiveValue(1.03, 1.08, 1.09, shrinkFactor, growFactor).toFixed(3)
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
    }, [expanded, links.length])

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
