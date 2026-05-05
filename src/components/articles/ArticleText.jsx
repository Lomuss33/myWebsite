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
        const html = itemWrapper.locales.text || itemWrapper.placeholder
        const initialXRatio = initialXRatioByItemId[itemWrapper.id] ?? 0.7
        const heading = extractFlowCardHeading(html)
        const storyHtml = extractFlowCardStoryHtml(html)
        const impactWords = extractFlowCardImpactWords(html)

        return (
            <div className={`article-text-item article-text-item-flow-card`}
                 data-flow-card-index={itemWrapper.id}>
                <div className={`article-text-flow-card-header`}>
                    {heading && (
                        <p className={`article-text-flow-card-heading`}>
                            {heading}
                        </p>
                    )}
                </div>

                <PretextDraggableInlineIconText html={storyHtml}
                                                faIcon={itemWrapper.faIconWithFallback}
                                                iconStyle={itemWrapper.faIconStyle}
                                                alt={itemWrapper.imageAlt}
                                                initialXRatio={initialXRatio}
                                                className={`article-text-flow-card-story`}/>

                {impactWords.length > 0 && (
                    <div className={`article-text-flow-card-impact-list`}
                         aria-hidden={true}>
                        {impactWords.map(word => (
                            <span key={word}
                                  className={`article-text-flow-card-impact-pill`}>
                                {word}
                            </span>
                        ))}
                    </div>
                )}
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

function extractFlowCardHeading(html = "") {
    const paragraphs = extractParagraphInnerHtmlList(html)
    if (paragraphs.length > 0) {
        return sanitizeInlineText(paragraphs[0])
    }

    const match = html.match(/\{\{([^{}]+)\}\}/)
    return match ? sanitizeInlineText(match[1]) : ""
}

function extractFlowCardStoryHtml(html = "") {
    const paragraphs = extractParagraphInnerHtmlList(html)
    if (paragraphs.length === 0) return html
    if (paragraphs.length === 1) return wrapParagraphs(paragraphs)

    if (paragraphs.length >= 3) {
        return wrapParagraphs(paragraphs.slice(1, -1))
    }

    return wrapParagraphs(paragraphs.slice(0, 1))
}

function extractFlowCardImpactWords(html = "") {
    const paragraphs = extractParagraphInnerHtmlList(html)
    const impactSource = paragraphs.length > 0 ? paragraphs[paragraphs.length - 1] : html
    const matches = [...impactSource.matchAll(/<strong>(.*?)<\/strong>/g)]

    return matches
        .map(([, word]) => sanitizeInlineText(word))
        .filter(Boolean)
        .slice(0, 6)
}

function extractParagraphInnerHtmlList(html = "") {
    if (!html) return []

    const parser = new DOMParser()
    const documentNode = parser.parseFromString(`<div>${html}</div>`, "text/html")
    const root = documentNode.body.firstElementChild
    if (!root) return []

    const paragraphs = Array.from(root.querySelectorAll(":scope > p"))
    if (paragraphs.length === 0) return [root.innerHTML]

    return paragraphs.map(paragraph => paragraph.innerHTML || "")
}

function wrapParagraphs(paragraphs = []) {
    return paragraphs
        .filter(Boolean)
        .map(paragraph => `<p>${paragraph}</p>`)
        .join("")
}

function sanitizeInlineText(text = "") {
    return text
        .replace(/<[^>]*>/g, "")
        .replace(/\{\{|\}\}/g, "")
        .replace(/&mdash;|&#8212;/gi, " ")
        .replace(/&ndash;|&#8211;/gi, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .replace(/\s*:\s*$/, "")
        .trim()
}

export default ArticleText
