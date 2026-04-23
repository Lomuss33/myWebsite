import "./Tooltip.scss"
import React, {useEffect, useState} from 'react'
import {useScheduler} from "../../hooks/scheduler.js"

function Tooltip({ id = null, className = "", label = "" }) {
    const scheduler = useScheduler()

    const [displayingLabel, setDisplayingLabel] = useState("")
    const [isShowing, setIsShowing] = useState(false)

    const visibleClass = isShowing ? `` : `custom-tooltip-hidden`
    const tag = id ? "tooltip-" + id : "custom-tooltip"

    /** @listens label **/ 
    useEffect(() => {
        scheduler.clearAllWithTag(tag)
        setIsShowing(false)

        if(!label) {
            setDisplayingLabel("")
            return
        }

        setDisplayingLabel(label)
        scheduler.schedule(() => {
            setIsShowing(true)
        }, 100, tag)

        return () => {
            scheduler.clearAllWithTag(tag)
        }
    }, [label])

    return (
        <div id={id}
             className={`custom-tooltip ${className} ${visibleClass}`}>
            <span dangerouslySetInnerHTML={{__html: displayingLabel}}/>
        </div>
    )
}

export default Tooltip
