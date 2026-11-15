import React from "react"
import StandardButton from "../../../buttons/StandardButton.jsx"
import CopyButton from "../../../buttons/CopyButton.jsx"
import {
    extractProbeQuerySource,
    getCollapsedText,
    getDisplayText,
    getProbeBadgeInfo,
    PROBE_WHAT,
} from "../dataProbeUtils.js"

export function ProbeItem({
    probe,
    state,
    showRequest = false,
    requestLabel = "Request",
    onRequest = null,
    thirdParty = false,
    extraAction = null,
    extraLabel = null,
    extraIcon = null,
    extraState = null,
    expanded = false,
    onToggleExpand = null,
    onIconClick = null,
}) {
    const status = state?.status || (showRequest ? "idle" : "pending")
    const value = state?.value || null
    const whatText = probe?.what || PROBE_WHAT[probe?.id] || "Explanation unavailable."
    const clickable = Boolean(probe?.id && probe?.title && onIconClick)

    const { badge, badgeClass } = getProbeBadgeInfo(status)

    const fullText = getDisplayText(status, value, { showRequest, thirdParty })
    const collapsedText = getCollapsedText(status, value, { showRequest, thirdParty })
    const hasExtraDetails = Boolean(extraState?.status === "ok" && extraState?.value)
    const hasCollapsedPreview = status === "ok" && fullText !== collapsedText
    const canExpand = hasCollapsedPreview || hasExtraDetails
    const isExpanded = canExpand && expanded
    const requestIcon = thirdParty ? "fa-solid fa-globe" : "fa-solid fa-wand-magic-sparkles"
    const handleActivateIcon = (triggerElement = null) => {
        if (!clickable) return
        onIconClick({
            title: probe.title,
            variableId: probe.id,
            querySource: extractProbeQuerySource(probe),
            scopeLabel: "probe",
            triggerElement
        })
    }
    const handleIconClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        handleActivateIcon(event.currentTarget)
    }
    const handleIconKeyDown = (event) => {
        if (!clickable) return
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            event.stopPropagation()
            handleActivateIcon(event.currentTarget)
        }
    }

    return (
        <div className={`article-data-probe-item status-${status} ${thirdParty ? "item-third-party" : ""} ${isExpanded ? "item-expanded" : ""}`}>
            <div className={`article-data-probe-item-head`}>
                <div className={`article-data-probe-item-icon ${clickable ? "article-data-probe-item-icon-clickable" : ""}`}
                     role={clickable ? "button" : undefined}
                     tabIndex={clickable ? 0 : undefined}
                     aria-label={clickable ? `Search Google for ${probe.title} (${probe.id})` : undefined}
                     onClick={clickable ? handleIconClick : undefined}
                     onKeyDown={clickable ? handleIconKeyDown : undefined}>
                    <i className={`${probe.icon}`}/>
                </div>

                <div className={`article-data-probe-item-head-content`}>
                    <div className={`article-data-probe-item-title`}>{probe.title}</div>
                    <div className={`article-data-probe-item-badge ${badgeClass}`}>{badge}</div>
                </div>
            </div>

            <div className={`article-data-probe-item-body`}>
                <div className={`article-data-probe-item-meta text-3`}>
                    <div className={`article-data-probe-item-meta-row`}>
                        <span className={`article-data-probe-item-meta-key`}>What</span>
                        <span className={`article-data-probe-item-meta-value`}>{whatText}</span>
                    </div>
                    {probe?.how && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>How</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.how}</span>
                        </div>
                    )}
                    {probe?.why && (
                        <div className={`article-data-probe-item-meta-row`}>
                            <span className={`article-data-probe-item-meta-key`}>Why</span>
                            <span className={`article-data-probe-item-meta-value`}>{probe.why}</span>
                        </div>
                    )}
                </div>

                <div className={`article-data-probe-item-value-toolbar`}>
                    <div className={`article-data-probe-item-value-label`}>Details</div>

                    <div className={`article-data-probe-item-value-actions`}>
                        {showRequest && onRequest && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn`}
                                            label={requestLabel}
                                            faIcon={requestIcon}
                                            onClick={onRequest}/>
                        )}

                        {showRequest && extraAction && extraLabel && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn`}
                                            label={extraLabel}
                                            faIcon={extraIcon || "fa-solid fa-bolt"}
                                            onClick={extraAction}/>
                        )}

                        {(status === "ok" && value) && (
                            <CopyButton text={value}
                                        label={`Copy`}
                                        variant={`pill`}
                                        buttonClassName={`article-data-probe-item-copy`}/>
                        )}

                        {canExpand && onToggleExpand && (
                            <StandardButton variant={`contrast`}
                                            className={`article-data-probe-action-btn article-data-probe-expand-btn`}
                                            label={isExpanded ? "Show less" : "Show more"}
                                            faIcon={isExpanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}
                                            onClick={onToggleExpand}/>
                        )}
                    </div>
                </div>

                <pre className={`article-data-probe-item-value ${extraState?.status === "ok" && extraState?.value ? "has-following-extra" : ""}`}>
                    {isExpanded ? fullText : collapsedText}
                </pre>

                {isExpanded && extraState?.status === "ok" && extraState?.value && (
                    <pre className={`article-data-probe-item-value article-data-probe-item-extra`}>{extraState.value}</pre>
                )}
            </div>
        </div>
    )
}
