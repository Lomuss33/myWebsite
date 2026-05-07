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
        const heading = itemWrapper.locales.title
        const axisStart = itemWrapper.locales.axisStart
        const axisEnd = itemWrapper.locales.axisEnd
        const hasAxisLabels = Boolean(axisStart || axisEnd)
        const axisBias = Number(((hueRatio - 0.5) * 2).toFixed(3))
        const axisBiasAbs = Number(Math.abs(axisBias).toFixed(3))
        const axisPhase = hueRatio < 0.35 ? "start" : hueRatio > 0.65 ? "end" : "middle"
        const axisAccentOpacity = 0.28 + (axisBiasAbs * 0.32)
        const axisGlowOpacity = 0.56 + (axisBiasAbs * 0.26)
        const accentColor = getExperienceAccentColor(itemWrapper.id, hueRatio)

        return (
            <div className={`article-text-item article-text-item-flow-card`}
                 data-flow-card-index={itemWrapper.id}
                 data-axis-phase={axisPhase}
                 style={{
                     "--experience-card-accent": toRgbCssColor(accentColor),
                     "--experience-card-accent-soft": toRgbCssColor(accentColor, 0.18),
                     "--experience-card-accent-soft-strong": toRgbCssColor(accentColor, 0.34),
                     "--experience-axis-bias": `${axisBias}`,
                     "--experience-axis-bias-abs": `${axisBiasAbs}`,
                     "--experience-axis-accent-opacity": `${axisAccentOpacity}`,
                     "--experience-axis-glow-opacity": `${axisGlowOpacity}`
                 }}>
                <div className={`article-text-flow-card-header`}>
                    {heading && (
                        <h3 className={`article-text-flow-card-heading`}>
                            {heading}
                        </h3>
                    )}
                </div>

                {hasAxisLabels && (
                    <div className={`article-text-flow-card-axis`}
                         aria-hidden={true}>
                        <span className={`article-text-flow-card-axis-label article-text-flow-card-axis-label-start`}>
                            {axisStart || ""}
                        </span>
                        <span className={`article-text-flow-card-axis-label article-text-flow-card-axis-label-end`}>
                            {axisEnd || ""}
                        </span>
                    </div>
                )}

                <PretextDraggableInlineIconText html={html}
                                                faIcon={itemWrapper.faIconWithFallback}
                                                iconStyle={itemWrapper.faIconStyle}
                                                alt={heading || itemWrapper.imageAlt}
                                                initialXRatio={0.5}
                                                onRatioChange={setHueRatio}
                                                getAriaValueText={(xRatio) => getSemanticAxisValueText({
                                                    axisEnd,
                                                    axisPhase: getAxisPhaseFromRatio(xRatio),
                                                    axisStart,
                                                    xRatio
                                                })}
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

function getAxisPhaseFromRatio(xRatio) {
    if (xRatio < 0.35) return "start"
    if (xRatio > 0.65) return "end"
    return "middle"
}

function getExperienceAccentColor(itemId, xRatio) {
    const palettes = {
        1: {
            left: [168, 88, 24],
            middle: [34, 198, 82],
            right: [234, 48, 72]
        },
        2: {
            left: [255, 84, 156],
            middle: [255, 210, 44],
            right: [250, 247, 240]
        },
        3: {
            left: [46, 134, 255],
            middle: [132, 70, 255],
            right: [14, 16, 22]
        }
    }

    const palette = palettes[itemId] || palettes[1]
    const safeRatio = clamp(xRatio, 0, 1)

    if (safeRatio <= 0.5) {
        return interpolateRgb(palette.left, palette.middle, safeRatio * 2)
    }

    return interpolateRgb(palette.middle, palette.right, (safeRatio - 0.5) * 2)
}

function interpolateRgb(start, end, ratio) {
    return start.map((value, index) => {
        return Math.round(value + ((end[index] - value) * ratio))
    })
}

function toRgbCssColor([r, g, b], alpha = null) {
    if (alpha === null) {
        return `rgb(${r} ${g} ${b})`
    }

    return `rgb(${r} ${g} ${b} / ${alpha})`
}

function getSemanticAxisValueText({ axisStart, axisEnd, axisPhase, xRatio }) {
    const percent = Math.round(clamp(xRatio, 0, 1) * 100)

    if (!axisStart || !axisEnd)
        return `${percent} percent`

    const activeSideLabel = axisPhase === "start" ?
        axisStart :
        axisPhase === "end" ?
            axisEnd :
            `${axisStart} and ${axisEnd}`

    return `${axisStart} to ${axisEnd}, ${percent}% toward ${activeSideLabel}`
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
