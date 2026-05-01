import React, {useEffect, useId, useRef, useState} from 'react'

function MobileTubeMenu({
    className = "",
    menuClassName = "",
    tooltipLabel = "",
    ariaLabel = "",
    toggleContent,
    children
}) {
    const [isOpen, setIsOpen] = useState(false)
    const rootRef = useRef(null)
    const toggleRef = useRef(null)
    const menuId = useId()

    useEffect(() => {
        if(!isOpen)
            return

        const _closeMenu = () => {
            setIsOpen(false)
        }

        const _onPointerDown = (event) => {
            if(rootRef.current?.contains(event.target))
                return

            _closeMenu()
        }

        const _onKeyDown = (event) => {
            if(event.key !== "Escape")
                return

            event.preventDefault()
            _closeMenu()
            toggleRef.current?.focus()
        }

        document.addEventListener("pointerdown", _onPointerDown)
        document.addEventListener("keydown", _onKeyDown)

        return () => {
            document.removeEventListener("pointerdown", _onPointerDown)
            document.removeEventListener("keydown", _onKeyDown)
        }
    }, [isOpen])

    const closeMenu = () => {
        setIsOpen(false)

        if(document.activeElement instanceof HTMLElement)
            document.activeElement.blur()
    }

    return (
        <div
            ref={rootRef}
            className={`${className} ${isOpen ? "show" : ""}`.trim()}
        >
            <button
                ref={toggleRef}
                type={`button`}
                aria-haspopup={`menu`}
                aria-expanded={isOpen}
                aria-controls={menuId}
                aria-label={ariaLabel || tooltipLabel || undefined}
                className={`btn-option-picker-toggle btn btn-transparent ${isOpen ? "show" : ""}`.trim()}
                data-tooltip={tooltipLabel}
                onClick={() => {
                    setIsOpen((current) => !current)
                }}
            >
                <span className={`btn-option-picker-toggle-row`}>
                    {toggleContent}
                </span>
            </button>

            <div
                id={menuId}
                role={`menu`}
                aria-hidden={!isOpen}
                className={`${menuClassName} ${isOpen ? "show" : ""}`.trim()}
            >
                {typeof children === "function" ?
                    children({ closeMenu, isOpen }) :
                    children
                }
            </div>
        </div>
    )
}

export default MobileTubeMenu
