import "./Collapsable.scss"
import React, {useEffect, useRef, useState} from 'react'
import {useUtils} from "../../hooks/utils.js"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function Collapsable({
    children,
    id,
    breakpointId,
    initialVisibleItems = 0,
    initialVisibleRows = 0,
    itemsPerStep = 0,
    className = "",
    trailingItemComponent = null,
    contentId = null
}) {
    const utils = useUtils()
    const language = useLanguage()

    const [visibleItems, setVisibleItems] = useState(0)
    const [columnCount, setColumnCount] = useState(1)
    const contentRef = useRef(null)

    const totalItems = children?.length
    const resolvedBreakpointId = breakpointId || (initialVisibleRows ? `columns-${columnCount}` : undefined)
    const resolvedInitialVisibleItems = initialVisibleRows ?
        Math.min(totalItems, columnCount * initialVisibleRows) :
        initialVisibleItems
    const canExpand = visibleItems && totalItems && visibleItems < totalItems

    useEffect(() => {
        Collapsable.savedStates = Collapsable.savedStates || {}
        Collapsable.savedStates[id] = Collapsable.savedStates[id] || {}

        const savedVisibleItems = Collapsable.savedStates[id][resolvedBreakpointId]
        const initialAmount = savedVisibleItems ?? resolvedInitialVisibleItems
        _updateVisibleItemsCount(initialAmount)
    }, [id, resolvedBreakpointId, resolvedInitialVisibleItems, totalItems])

    useEffect(() => {
        const contentElement = contentRef.current
        if(!contentElement || typeof window === "undefined")
            return

        const updateColumnCount = () => {
            const nextColumnCount = getGridColumnCount(contentElement)
            setColumnCount(currentCount => currentCount === nextColumnCount ? currentCount : nextColumnCount)
        }

        updateColumnCount()

        const resizeObserver = new ResizeObserver(() => {
            updateColumnCount()
        })
        resizeObserver.observe(contentElement)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const _updateVisibleItemsCount = (visibleItems) => {
        const clamped = utils.number.clamp(visibleItems, 0, totalItems)
        setVisibleItems(clamped)
        Collapsable.savedStates[id][resolvedBreakpointId] = clamped
    }

    const _expand = () => {
        const increment = itemsPerStep || totalItems
        _updateVisibleItemsCount(visibleItems + increment)
    }

    return (
        <div className={`collapsable`}>
            <div className={`collapsable-content ${className}`}
                 id={contentId || undefined}
                 ref={contentRef}>
                {children?.slice(0, visibleItems).map((child, key) => (
                    <div className={`collapsable-item`} key={key}>
                        {child}
                    </div>
                ))}

                {trailingItemComponent && (() => {
                    const Component = trailingItemComponent
                    return <Component hasMore={visibleItems < totalItems}/>
                })()}
            </div>

            {Boolean(canExpand) && (
                <div className={`collapsable-menu`}>
                    <StandardButton variant={`contrast`}
                                    faIcon={`fa-solid fa-caret-down`}
                                    label={language.getString("see_more")}
                                    tooltip={language.getString("see_more")}
                                    onClick={_expand}/>
                </div>
            )}
        </div>
    )
}

function getGridColumnCount(element) {
    if(!element || typeof window === "undefined")
        return 1

    const gridTemplateColumns = window.getComputedStyle(element).gridTemplateColumns

    if(!gridTemplateColumns || gridTemplateColumns === "none")
        return 1

    const columnTracks = splitTopLevelWhitespace(gridTemplateColumns)
    return Math.max(1, columnTracks.length)
}

function splitTopLevelWhitespace(value) {
    const segments = []
    let currentSegment = ""
    let depth = 0

    for(const character of value.trim()) {
        if(character === "(")
            depth += 1
        else if(character === ")")
            depth = Math.max(0, depth - 1)

        if(/\s/.test(character) && depth === 0) {
            if(currentSegment) {
                segments.push(currentSegment)
                currentSegment = ""
            }
            continue
        }

        currentSegment += character
    }

    if(currentSegment)
        segments.push(currentSegment)

    return segments
}

export default Collapsable
