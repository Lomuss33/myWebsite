import "./ArticleText.scss"
import React, { useEffect, useRef, useState } from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import PretextDraggableInlineIconText from "../generic/PretextDraggableInlineIconText.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleText({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-text`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTextItems dataWrapper={dataWrapper}
                              selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const keepImageRowClass = dataWrapper.settings.keepImageRow ? `article-text-items-keep-image-row` : ``
    const textLayoutModeClass = dataWrapper.settings.textLayoutMode !== "default" ?
        `article-text-items-mode-${dataWrapper.settings.textLayoutMode}` :
        ``

    return (
        <div className={`article-text-items ${keepImageRowClass} ${textLayoutModeClass}`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTextItem itemWrapper={itemWrapper}
                                 textLayoutMode={dataWrapper.settings.textLayoutMode}
                                 key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTextItem({ itemWrapper, textLayoutMode }) {
    const [hueRatio, setHueRatio] = useState(0.5)

    if (textLayoutMode === "draggable_inline_icon_flow") {
        const html = normalizePretextStoryHtml(itemWrapper.locales.text || itemWrapper.placeholder)
        const hueShift = Math.round((hueRatio - 0.5) * 120)
        const eyebrow = itemWrapper.locales.eyebrow
        const heading = itemWrapper.locales.title
        const impactPills = Array.isArray(itemWrapper.locales.list) ? itemWrapper.locales.list : []

        return (
            <div className={`article-text-item article-text-item-flow-card`}
                 data-flow-card-index={itemWrapper.id}
                 style={{
                     "--experience-card-hue-shift": `${hueShift}deg`
                 }}>
                <div className={`article-text-flow-card-header`}>
                    {eyebrow && (
                        <p className={`article-text-flow-card-eyebrow`}>
                            {eyebrow}
                        </p>
                    )}

                    {heading && (
                        <h3 className={`article-text-flow-card-heading`}>
                            {heading}
                        </h3>
                    )}

                    {impactPills.length > 0 && (
                        <div className={`article-text-flow-card-impact-list`}>
                            {impactPills.map((pill, index) => (
                                <span className={`article-text-flow-card-impact-pill`}
                                      key={`${itemWrapper.uniqueId}-pill-${index}`}>
                                    {pill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <PretextDraggableInlineIconText html={html}
                                                faIcon={itemWrapper.faIconWithFallback}
                                                iconStyle={itemWrapper.faIconStyle}
                                                alt={itemWrapper.imageAlt}
                                                initialXRatio={0.5}
                                                onRatioChange={setHueRatio}
                                                className={`article-text-flow-card-story`}/>
            </div>
        )
    }

    const positioningClass = itemWrapper.id % 2 === 0 ?
        `article-text-item-reverse` :
        ``
    const eyebrow = itemWrapper.locales.eyebrow
    const heading = itemWrapper.locales.title
    const detailPills = Array.isArray(itemWrapper.locales.list) ? itemWrapper.locales.list : []
    const hasMeta = Boolean(eyebrow || heading || detailPills.length > 0)
    const hueShift = Math.round((hueRatio - 0.5) * 120)

    return (
        <div className={`article-text-item ${positioningClass}`}
             data-card-index={itemWrapper.id}
             style={{
                 "--experience-card-hue-shift": `${hueShift}deg`
             }}>
            <ArticleTextAvatarRail itemWrapper={itemWrapper}
                                   hueRatio={hueRatio}
                                   setHueRatio={setHueRatio}/>

            <div className={`article-text-item-content`}>
                {hasMeta && (
                    <div className={`article-text-item-header`}>
                        {eyebrow && (
                            <p className={`article-text-item-eyebrow`}>
                                {eyebrow}
                            </p>
                        )}

                        {heading && (
                            <h3 className={`article-text-item-heading`}>
                                {heading}
                            </h3>
                        )}

                        {detailPills.length > 0 && (
                            <div className={`article-text-item-pill-list`}>
                                {detailPills.map((pill, index) => (
                                    <span className={`article-text-item-pill`}
                                          key={`${itemWrapper.uniqueId}-detail-pill-${index}`}>
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className={`article-text-excerpt last-p-no-margin text-3`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>
            </div>
        </div>
    )
}

function ArticleTextAvatarRail({ itemWrapper, hueRatio, setHueRatio }) {
    const railRef = useRef(null)
    const dragStateRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        if (!isDragging) return

        const handlePointerMove = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            setHueRatio(getRatioFromClientX(event.clientX, railRef.current))
        }

        const finishPointerDrag = event => {
            const dragState = dragStateRef.current
            if (!dragState || dragState.pointerId !== event.pointerId) return

            releasePointerCapture(dragState)
            dragStateRef.current = null
            setIsDragging(false)
        }

        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", finishPointerDrag)
        window.addEventListener("pointercancel", finishPointerDrag)

        return () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", finishPointerDrag)
            window.removeEventListener("pointercancel", finishPointerDrag)
        }
    }, [isDragging, setHueRatio])

    const handlePointerDown = event => {
        event.preventDefault()

        setHueRatio(getRatioFromClientX(event.clientX, railRef.current))
        dragStateRef.current = {
            captureTarget: event.currentTarget,
            pointerId: event.pointerId
        }
        capturePointer(event)
        setIsDragging(true)
    }

    const handleKeyDown = event => {
        if (event.key === "ArrowLeft") {
            event.preventDefault()
            setHueRatio(currentRatio => clamp(currentRatio - 0.05, 0, 1))
            return
        }

        if (event.key === "ArrowRight") {
            event.preventDefault()
            setHueRatio(currentRatio => clamp(currentRatio + 0.05, 0, 1))
            return
        }

        if (event.key === "Home") {
            event.preventDefault()
            setHueRatio(0)
            return
        }

        if (event.key === "End") {
            event.preventDefault()
            setHueRatio(1)
        }
    }

    return (
        <div className={`article-text-avatar-view-wrapper`}>
            <div ref={railRef}
                 className={`article-text-avatar-rail ${isDragging ? "is-dragging" : ""}`}
                 onPointerDown={handlePointerDown}>
                <span className={`article-text-avatar-rail-line`}/>
                <span className={`article-text-avatar-rail-progress`}
                      style={{ width: `${hueRatio * 100}%` }}/>
                <span className={`article-text-avatar-rail-dot article-text-avatar-rail-dot-start`}/>
                <span className={`article-text-avatar-rail-dot article-text-avatar-rail-dot-end`}/>
                <button type={`button`}
                        className={`article-text-avatar-rail-handle ${isDragging ? "is-dragging" : ""}`}
                        style={{ left: `${hueRatio * 100}%` }}
                        aria-label={itemWrapper.imageAlt}
                        aria-orientation={`horizontal`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(hueRatio * 100)}
                        aria-valuetext={`${Math.round(hueRatio * 100)} percent`}
                        role={`slider`}
                        onPointerDown={handlePointerDown}
                        onKeyDown={handleKeyDown}>
                    <AvatarView className={`article-text-avatar-view`}
                                src={itemWrapper.img}
                                faIcon={itemWrapper.faIconWithFallback}
                                style={itemWrapper.faIconStyle}
                                alt={itemWrapper.imageAlt}/>
                </button>
            </div>
        </div>
    )
}

function normalizePretextStoryHtml(html = "") {
    if (!html) return ""

    return html.replace(/\{\{(.*?)\}\}/g, (_, text) => {
        return `<span class="text-primary pretext-lock">${text.trim()}</span>`
    })
}

function getRatioFromClientX(clientX, element) {
    if (!element) return 0.5

    const bounds = element.getBoundingClientRect()
    if (bounds.width <= 0) return 0.5

    return clamp((clientX - bounds.left) / bounds.width, 0, 1)
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function capturePointer(event) {
    if (!event.currentTarget?.setPointerCapture) return

    try {
        event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
        // Ignore pointer-capture failures.
    }
}

function releasePointerCapture(dragState) {
    if (!dragState?.captureTarget?.releasePointerCapture) return

    try {
        dragState.captureTarget.releasePointerCapture(dragState.pointerId)
    } catch {
        // Ignore release failures.
    }
}

export default ArticleText
