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
    if (textLayoutMode === "draggable_inline_icon_flow") {
        const initialXRatioByItemId = {
            1: 0,
            2: 1,
            3: 0.7
        }
        const initialXRatio = initialXRatioByItemId[itemWrapper.id] ?? 0.7

        return (
            <div className={`article-text-item article-text-item-flow-card`}>
                <PretextDraggableInlineIconText html={itemWrapper.locales.text || itemWrapper.placeholder}
                                                faIcon={itemWrapper.faIconWithFallback}
                                                iconStyle={itemWrapper.faIconStyle}
                                                alt={itemWrapper.imageAlt}
                                                initialXRatio={initialXRatio}/>
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

export default ArticleText
