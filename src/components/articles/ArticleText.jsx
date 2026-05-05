import "./ArticleText.scss"
import React, { useState } from 'react'
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

        return (
            <div className={`article-text-item article-text-item-flow-card`}
                 data-flow-card-index={itemWrapper.id}
                 style={{
                     "--experience-card-hue-shift": `${hueShift}deg`
                 }}>
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

    return (
        <div className={`article-text-item ${positioningClass}`}>
            <div className={`article-text-avatar-view-wrapper`}>
                <AvatarView className={`article-text-avatar-view`}
                            src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}/>
            </div>

            <div className={`article-text-excerpt last-p-no-margin text-3`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text || itemWrapper.placeholder}}/>
        </div>
    )
}

function normalizePretextStoryHtml(html = "") {
    if (!html) return ""

    return html.replace(/\{\{(.*?)\}\}/g, (_, text) => {
        return `<span class="text-primary pretext-lock">${text.trim()}</span>`
    })
}

export default ArticleText
