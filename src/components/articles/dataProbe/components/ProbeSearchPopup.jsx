import React, {useEffect, useRef} from "react"
import {createPortal} from "react-dom"

export function ProbeSearchPopup({ target, onCancel, onGo }) {
    const dialogRef = useRef(null)
    const cancelButtonRef = useRef(null)
    const goButtonRef = useRef(null)
    const titleId = "article-data-probe-search-popup-title"
    const descriptionId = "article-data-probe-search-popup-description"

    useEffect(() => {
        if (!target || !goButtonRef.current) return
        goButtonRef.current.focus()
    }, [target])

    useEffect(() => {
        if (!target) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [target])

    if (!target) return null

    const handleBackdropClick = (event) => {
        if (event.target !== event.currentTarget) return
        onCancel?.()
    }

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            event.preventDefault()
            onCancel?.()
            return
        }

        if (event.key !== "Tab") return

        const focusable = [cancelButtonRef.current, goButtonRef.current].filter(Boolean)
        if (focusable.length === 0) return

        const currentIndex = focusable.indexOf(document.activeElement)
        if (event.shiftKey) {
            if (currentIndex <= 0) {
                event.preventDefault()
                focusable[focusable.length - 1].focus()
            }
            return
        }

        if (currentIndex === focusable.length - 1 || currentIndex === -1) {
            event.preventDefault()
            focusable[0].focus()
        }
    }

    return createPortal(
        <div className={`article-data-probe-search-popup-backdrop`}
             style={target.themeVars}
             onClick={handleBackdropClick}
             onKeyDown={handleKeyDown}>
            <div ref={dialogRef}
                 className={`article-data-probe-search-popup`}
                 role={`dialog`}
                 aria-modal={`true`}
                 aria-labelledby={titleId}
                 aria-describedby={descriptionId}
                 onClick={(event) => event.stopPropagation()}>
                <div className={`article-data-probe-search-popup-eyebrow`}>External search</div>
                <h5 id={titleId}
                    className={`article-data-probe-search-popup-title`}>{target.title}</h5>
                <p id={descriptionId}
                   className={`article-data-probe-search-popup-description`}>{target.description}</p>
                <div className={`article-data-probe-search-popup-query`}>
                    <code>{target.query}</code>
                </div>
                <div className={`article-data-probe-search-popup-actions`}>
                    <button ref={cancelButtonRef}
                            type={`button`}
                            className={`article-data-probe-search-popup-btn article-data-probe-search-popup-btn-cancel`}
                            onClick={onCancel}>
                        Cancel
                    </button>
                    <button ref={goButtonRef}
                            type={`button`}
                            className={`article-data-probe-search-popup-btn article-data-probe-search-popup-btn-go`}
                            onClick={onGo}>
                        Go
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
