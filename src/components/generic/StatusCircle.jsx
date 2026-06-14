import "./StatusCircle.scss"
import React, {useId} from 'react'
import HoverStaticTooltip from "../widgets/HoverStaticTooltip.jsx"

function StatusCircle({ variant, message, size = "status-circle-size-default", className = "", onClick = null }) {
    const uniqueId = `status-circle-${useId().replaceAll(":", "")}`

    return (
        <div className={`status-circle ${className} ${size} status-circle-variant-${variant}`}
             id={uniqueId}>
            <HoverStaticTooltip label={message}
                                className={`status-circle-tooltip text-center`}
                                id={uniqueId + "-tooltip"}
                                targetId={uniqueId}
                                onDesktopClick={onClick}
                                toggleBehaviorOnTouchScreens={true}/>

            <div className={`status-circle-pulse`}/>
            <div className={`status-circle-body`}/>
        </div>
    )
}

StatusCircle.Sizes = {
    SMALL: "status-circle-size-small",
    DEFAULT: "status-circle-size-default"
}

export default StatusCircle
