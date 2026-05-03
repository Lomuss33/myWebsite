import "./ArticleStack.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import Transitionable from "../capabilities/Transitionable.jsx"
import Collapsable from "../capabilities/Collapsable.jsx"
import Link from "../generic/Link.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"

const HOME_STACK_BREAKPOINTS = {
    0: { id: "home-stack-bp-0", columns: 1 },
    560: { id: "home-stack-bp-560", columns: 2 },
    980: { id: "home-stack-bp-980", columns: 3 }
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStack({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const isHomeStack = dataWrapper.sectionId === "about"
    const isCompactStack = dataWrapper.sectionId === "my-art"
    const homeClass = isHomeStack ? `article-stack-home` : ``
    const compactClass = isCompactStack ? `article-stack-compact` : ``

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-stack ${homeClass} ${compactClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleStackItems dataWrapper={dataWrapper}
                               isHomeStack={isHomeStack}
                               isCompactStack={isCompactStack}
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
function ArticleStackItems({ dataWrapper, selectedItemCategoryId, isHomeStack, isCompactStack }) {
    const language = useLanguage()
    const theme = useTheme()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const refreshFlag = selectedItemCategoryId + "::" + language.getSelectedLanguage()?.id + "-" + theme.getSelectedTheme()?.id
    const homeClass = isHomeStack ? `article-stack-items-home` : ``
    const compactClass = isCompactStack ? `article-stack-items-compact` : ``
    const stackClassName = `article-stack-items ${homeClass} ${compactClass}`.trim()
    const homeBreakpoint = isHomeStack ?
        viewport.getCustomBreakpoint(HOME_STACK_BREAKPOINTS) || HOME_STACK_BREAKPOINTS[0] :
        null
    const initialVisibleItems = isHomeStack ?
        Math.min(filteredItems.length, homeBreakpoint?.columns || filteredItems.length) :
        filteredItems.length
    const renderedItems = filteredItems.map((itemWrapper, key) => (
        <ArticleStackItem itemWrapper={itemWrapper}
                          isHomeStack={isHomeStack}
                          isCompactStack={isCompactStack}
                          key={key}/>
    ))

    if(isHomeStack) {
        return (
            <Collapsable className={stackClassName}
                         id={dataWrapper.uniqueId}
                         breakpointId={homeBreakpoint.id}
                         initialVisibleItems={initialVisibleItems}>
                {renderedItems}
            </Collapsable>
        )
    }

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={30}
                            animation={Transitionable.Animations.POP}
                            className={stackClassName}>
                {renderedItems}
            </Transitionable>
        )
    }

    return (
        <div className={stackClassName}>
            {renderedItems}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleStackItem({ itemWrapper, isHomeStack, isCompactStack }) {
    const title = itemWrapper.locales.title || itemWrapper.placeholder
    const segmentedTitle = _splitTitle(title)
    const homeClass = isHomeStack ? `article-stack-item-home` : ``
    const compactClass = isCompactStack ? `article-stack-item-compact` : ``
    const linkHref = itemWrapper.link?.href
    const linkTooltip = itemWrapper.link?.tooltip
    const emojiIconText = itemWrapper.iconText

    const content = (
        <div className={`article-stack-item ${homeClass} ${compactClass}`}>
            <AvatarView src={itemWrapper.img}
                        faIcon={itemWrapper.faIconWithFallback}
                        iconText={emojiIconText}
                        style={itemWrapper.faIconStyle}
                        alt={itemWrapper.imageAlt}
                        className={`article-stack-item-avatar`}/>

            <div className={`article-stack-item-title`}>
                {segmentedTitle.prefix && (
                    <div className={`article-stack-item-title-prefix`}
                         dangerouslySetInnerHTML={{__html: segmentedTitle.prefix}}/>
                )}

                <div className={`article-stack-item-title-main`}
                     dangerouslySetInnerHTML={{__html: segmentedTitle.value}}/>
            </div>

            {itemWrapper.dateStartDisplayAsExperienceTime && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.dateStartDisplayAsExperienceTime}}/>
            )}

            {itemWrapper.locales.text && (
                <div className={`article-stack-item-experience`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </div>
    )

    if(linkHref) {
        return (
            <Link href={linkHref}
                  tooltip={linkTooltip}
                  className={`article-stack-item-link`}>
                {content}
            </Link>
        )
    }

    return content
}

function _splitTitle(title) {
    const normalizedTitle = title || ""
    const separatorIndex = normalizedTitle.indexOf(":")
    if(separatorIndex === -1) {
        return {
            prefix: "",
            value: normalizedTitle
        }
    }

    return {
        prefix: normalizedTitle.slice(0, separatorIndex).trim(),
        value: normalizedTitle.slice(separatorIndex + 1).trim()
    }
}

export default ArticleStack
