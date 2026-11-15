import React from "react"
import StandardButton from "../../../buttons/StandardButton.jsx"
import {LIST_PREVIEW_COUNT} from "../dataProbeUtils.js"

export function ProbeSection({ icon, eyebrow, title, description, accent, actions = null, children, searchId = "", onIconClick = null }) {
    const clickable = Boolean(searchId && onIconClick)
    const handleActivate = (triggerElement = null) => {
        if (!clickable) return
        onIconClick({ title, variableId: searchId, querySource: searchId, scopeLabel: "section", triggerElement })
    }
    const handleClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        handleActivate(event.currentTarget)
    }
    const handleKeyDown = (event) => {
        if (!clickable) return
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            event.stopPropagation()
            handleActivate(event.currentTarget)
        }
    }

    return (
        <section className={`article-data-probe-block ${accent || ""}`}>
            <div className={`article-data-probe-block-header`}>
                <div className={`article-data-probe-block-lead`}>
                    <div className={`article-data-probe-block-icon ${clickable ? "article-data-probe-block-icon-clickable" : ""}`}
                         role={clickable ? "button" : undefined}
                         tabIndex={clickable ? 0 : undefined}
                         aria-label={clickable ? `Search Google for ${title}` : undefined}
                         onClick={clickable ? handleClick : undefined}
                         onKeyDown={clickable ? handleKeyDown : undefined}>
                        <i className={icon}/>
                    </div>

                    <div className={`article-data-probe-block-copy`}>
                        {eyebrow && (
                            <div className={`article-data-probe-block-eyebrow text-4`}>{eyebrow}</div>
                        )}

                        <h5 className={`article-data-probe-block-title mb-0`}>{title}</h5>

                        {description && (
                            <div className={`article-data-probe-block-description text-3`}>{description}</div>
                        )}

                    </div>
                </div>

                {actions && (
                    <div className={`article-data-probe-block-controls`}>
                        {actions}
                    </div>
                )}
            </div>

            <div className={`article-data-probe-block-body`}>
                {children}
            </div>
        </section>
    )
}

export function ProbeListToggle({ expanded, visibleCount, totalCount, onToggle }) {
    if (totalCount <= LIST_PREVIEW_COUNT) return null

    const remaining = Math.max(0, totalCount - visibleCount)
    const label = expanded ? "Show less" : `Show more (${remaining})`

    return (
        <div className={`article-data-probe-list-footer`}>
            <StandardButton variant={`contrast`}
                            className={`article-data-probe-action-btn article-data-probe-list-toggle-btn`}
                            label={label}
                            faIcon={expanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                            onClick={onToggle}/>
        </div>
    )
}
