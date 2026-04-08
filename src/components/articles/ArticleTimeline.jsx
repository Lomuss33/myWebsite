import "./ArticleTimeline.scss"
import React, {useEffect, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesBody, ArticleItemInfoForTimelinesPreviewFooter} from "./partials/ArticleItemInfoForTimelines.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimeline({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-timeline`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTimelineItems dataWrapper={dataWrapper}
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
function ArticleTimelineItems({ dataWrapper, selectedItemCategoryId }) {
    const language = useLanguage()
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const initialVisibleItems = dataWrapper.settings.maxRowsCollapseThreshold || filteredItems.length
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems)

    useEffect(() => {
        setVisibleItems(Math.min(initialVisibleItems, filteredItems.length))
    }, [initialVisibleItems, filteredItems.length, selectedItemCategoryId])

    const visibleItemWrappers = filteredItems.slice(0, visibleItems)
    const canExpand = visibleItems < filteredItems.length

    const _expand = () => {
        setVisibleItems(currentValue => {
            return Math.min(currentValue + 3, filteredItems.length)
        })
    }

    return (
        <>
            <ul className={`article-timeline-items`}>
                {visibleItemWrappers.map((itemWrapper, key) => (
                    <ArticleTimelineItem itemWrapper={itemWrapper}
                                         key={key}/>
                ))}
            </ul>

            {Boolean(canExpand) && (
                <div className={`collapsable-menu`}>
                    <StandardButton variant={`contrast`}
                                    faIcon={`fa-solid fa-caret-down`}
                                    label={language.getString("see_more")}
                                    tooltip={language.getString("see_more")}
                                    onClick={_expand}/>
                </div>
            )}
        </>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItem({ itemWrapper }) {
    const avatarSrc = itemWrapper.img || itemWrapper.preview?.screenshots?.[0] || ""
    const avatarFaIcon = itemWrapper.faIcon || itemWrapper.preview?.links?.[0]?.faIcon || itemWrapper.faIconWithFallback
    const shouldShowDateInterval = Boolean(itemWrapper.dateEnd)

    return (
        <li className={`article-timeline-item`}>
            <AvatarView src={avatarSrc}
                        faIcon={avatarFaIcon}
                        style={itemWrapper?.faIconStyle}
                        alt={itemWrapper?.imageAlt}
                        className={`article-timeline-item-avatar`}/>

            <ArticleItemInfoForTimelines className={`article-timeline-item-content`}>
                <ArticleItemInfoForTimelinesHeader itemWrapper={itemWrapper}
                                                   dateInterval={shouldShowDateInterval}/>

                <ArticleItemInfoForTimelinesBody itemWrapper={itemWrapper}/>

                <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}/>
            </ArticleItemInfoForTimelines>
        </li>
    )
}

export default ArticleTimeline
