import "./ArticleItemInfoForTimelines.scss"
import React from 'react'
import {useViewport} from "../../../providers/ViewportProvider.jsx"
import {PropList, PropListItem} from "../../generic/PropList.jsx"
import {Tags, Tag} from "../../generic/Tags.jsx"
import ArticleItemPreviewMenu from "./ArticleItemPreviewMenu.jsx"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"

/**
 * @param {*} children
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} smallDateBadge
 * @param {*} containerRef
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelines({ children, itemWrapper, className = "", smallDateBadge = false, containerRef = null }) {
    const dateBadgeClass = smallDateBadge ?
        `article-timeline-item-info-for-timelines-date-badge-small` :
        ``

    return (
        <div className={`article-timeline-item-info-for-timelines ${className} ${dateBadgeClass}`}
             ref={containerRef}>
            {children}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} dateInterval
 * @param {JSX.Element|null} metaEnd
 * @param {Boolean} forceDateInMetaBand
 * @param {Boolean} showMeta
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesHeader({ itemWrapper, className = "", dateInterval = false, metaEnd = null, forceDateInMetaBand = false, showMeta = true }) {
    const viewport = useViewport()
    const shouldForceDateInMetaBand = forceDateInMetaBand ||
        Boolean(itemWrapper?.articleWrapper?.uniqueId?.includes("section-my-writings"))
    const isSmallScreen = !viewport.isBreakpoint("sm")

    const institution = itemWrapper.locales.institution

    const location = isSmallScreen && institution ?
        itemWrapper.shortLocation :
        itemWrapper.fullLocation

    const propListItems = []

    propListItems.push({
        faIcon: `fa-regular fa-clock`,
        type: dateInterval ? PropListItem.Types.INTERVAL : PropListItem.Types.SINGLE,
        value: dateInterval ? [itemWrapper.dateStartDisplay, itemWrapper.dateEndDisplay] : [itemWrapper.dateStartDisplay]
    })

    if(institution || location) {
        propListItems.push({
            faIcon: `fa-regular fa-building`,
            type: institution && location ? PropListItem.Types.DUO : PropListItem.Types.SINGLE,
            value: institution && location ? [institution, location] : [institution || location]
        })
    }

    return (
        <div className={`article-timeline-item-info-for-timelines-header ${className}`}>
            <div className={`article-timeline-item-info-for-timelines-header-title`}>
                <div className={`article-timeline-item-info-for-timelines-header-main`}>
                    <h5 className={``}
                        dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                </div>
            </div>

            {showMeta && (
                <div className={`article-timeline-item-info-for-timelines-header-meta-band`}>
                    <PropList className={`article-timeline-item-info-for-timelines-header-prop-list text-1`}
                              inlineBreakpoint={shouldForceDateInMetaBand ? null : `xl`}>
                        {propListItems.map((item, key) => (
                            <PropListItem key={key}
                                          faIcon={item.faIcon}
                                          type={item.type}
                                          iconSpacing={isSmallScreen ? 22 : 24}
                                          value={item.value}/>
                        ))}
                    </PropList>

                    {metaEnd}
                </div>
            )}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesBody({ itemWrapper, className = "" }) {
    const textClass = `text-3`

    return (
        <div className={`article-timeline-item-info-for-timelines-body ${className}`}>
            <div className={`article-timeline-item-info-for-timelines-body-text ${textClass} last-p-no-margin`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>

            {itemWrapper.locales.list && itemWrapper.locales.list.length > 0 && (
                <ul className={`article-timeline-item-info-for-timelines-body-list list-mobile-small-padding ${textClass}`}>
                    {itemWrapper.locales.list.map((item, key) => (
                        <li className={`article-timeline-item-info-for-timelines-body-list-item`}
                            key={key}
                            dangerouslySetInnerHTML={{__html: item}}/>
                    ))}
                </ul>
            )}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesTagsFooter({ itemWrapper, className = "" }) {
    const tags = itemWrapper.locales.tags || []

    if(tags.length === 0)
        return <></>

    return (
        <div className={`article-timeline-item-info-for-timelines-tags-footer ${className}`}>
            <Tags className={`article-timeline-item-info-for-timelines-tags-footer-tag-list`}>
                {tags.map((tag, key) => (
                    <Tag key={key}
                         text={tag}
                         className={`article-timeline-item-info-for-timelines-tags-footer-tag text-1`}/>
                ))}
            </Tags>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemInfoForTimelinesPreviewFooter({ itemWrapper, className = "" }) {
    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo
    const hasLinks = itemWrapper.preview?.hasLinks

    if(!hasScreenshotsOrVideo && !hasLinks)
        return <></>

    return (
        <div className={`article-timeline-item-info-preview-footer ${className}`}>
            <ArticleItemPreviewMenu itemWrapper={itemWrapper}
                                    spaceBetween={false}/>
        </div>
    )
}

export {
    ArticleItemInfoForTimelines,
    ArticleItemInfoForTimelinesHeader,
    ArticleItemInfoForTimelinesBody,
    ArticleItemInfoForTimelinesTagsFooter,
    ArticleItemInfoForTimelinesPreviewFooter
}
