import "./GestureAwareButton.scss"
import React from 'react'

function GestureAwareButton({
    children,
    className = "",
    onClick = null,
    tooltip = "",
    disabled = false,
    type = "button",
    ariaPressed = null,
    ariaCurrent = null
}) {
    return (
        <button className={`gesture-aware-button ${className}`}
                type={type}
                data-tooltip={tooltip}
                aria-pressed={ariaPressed}
                aria-current={ariaCurrent}
                onClick={onClick}
                disabled={disabled}>
            {children}
        </button>
    )
}

export default GestureAwareButton
