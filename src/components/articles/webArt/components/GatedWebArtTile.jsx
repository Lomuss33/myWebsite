import React, { useCallback } from 'react'
import { makePlaceholderAriaLabel } from "../hooks/webArtDomUtils.js"

export default function GatedWebArtTile({
    label,
    isOpen,
    isStaging = false,
    onToggle,
    shouldRender = true,
    children
}) {
    const onClosedTileClick = useCallback((event) => {
        if(isOpen || isStaging || event.defaultPrevented) return
        if(event.target.closest?.("button")) return
        onToggle?.()
    }, [isOpen, isStaging, onToggle])

    return (
        <div className={`article-web-art-gated-tile ${isOpen ? "article-web-art-gated-tile-open" : "article-web-art-gated-tile-closed"}`}
             aria-busy={isStaging || undefined}
             onClick={isOpen ? undefined : onClosedTileClick}>
            {shouldRender ? children : (
                <div className={`article-web-art-tile article-web-art-tile-placeholder`}
                     aria-label={makePlaceholderAriaLabel(label)}/>
            )}
            <div className={`article-web-art-gated-tile-sheet`} aria-hidden={true}/>
            <button type={"button"}
                    className={`article-web-art-gated-tile-pill ${isOpen ? "article-web-art-gated-tile-pill-open" : "article-web-art-gated-tile-pill-closed"}`}
                    disabled={isStaging}
                    onClick={onToggle}
                    aria-label={`${isOpen ? "Hide" : "Show"} ${label}`}>
                {label}
            </button>
        </div>
    )
}
