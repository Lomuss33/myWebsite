import "./ArticleTimeline.scss"
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesBody, ArticleItemInfoForTimelinesPreviewFooter} from "./partials/ArticleItemInfoForTimelines.jsx"
import Link from "../generic/Link.jsx"
import {useUtils} from "../../hooks/utils.js"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimeline({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const isMyArtTimeline = useMemo(() => {
        return Boolean(dataWrapper?.uniqueId?.includes("section-my-art"))
    }, [dataWrapper?.uniqueId])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-timeline ${isMyArtTimeline ? "article-timeline--my-art" : ""}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTimelineItems dataWrapper={dataWrapper}
                                  selectedItemCategoryId={selectedItemCategoryId}
                                  isMyArtTimeline={isMyArtTimeline}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItems({ dataWrapper, selectedItemCategoryId, isMyArtTimeline = false }) {
    const language = useLanguage()
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const initialVisibleItems = dataWrapper.settings.maxRowsCollapseThreshold || filteredItems.length
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems)
    const listRef = useRef(null)
    const [avatarColumnSizePx, setAvatarColumnSizePx] = useState(null)
    const [artItemHeightsPx, setArtItemHeightsPx] = useState([])

    useEffect(() => {
        setVisibleItems(Math.min(initialVisibleItems, filteredItems.length))
    }, [initialVisibleItems, filteredItems.length, selectedItemCategoryId])

    const visibleItemWrappers = filteredItems.slice(0, visibleItems)
    const canExpand = visibleItems < filteredItems.length

    useEffect(() => {
        if(!isMyArtTimeline)
            return

        setArtItemHeightsPx(Array(visibleItemWrappers.length).fill(null))
    }, [isMyArtTimeline, visibleItemWrappers.length, selectedItemCategoryId])

    useLayoutEffect(() => {
        if(!isMyArtTimeline)
            return

        const el = listRef.current
        if(!el)
            return

        const _readAvatarColumnSize = () => {
            const computed = getComputedStyle(el)
            const raw = computed.getPropertyValue("--avatar-size") || ""
            const parsed = parseFloat(raw)
            if(!Number.isFinite(parsed))
                return null
            return parsed
        }

        const _update = () => {
            const nextValue = _readAvatarColumnSize()
            setAvatarColumnSizePx(currentValue => currentValue === nextValue ? currentValue : nextValue)
        }

        _update()

        if(typeof ResizeObserver !== "undefined") {
            const ro = new ResizeObserver(() => _update())
            ro.observe(el)
            return () => ro.disconnect()
        }

        window.addEventListener("resize", _update)
        return () => window.removeEventListener("resize", _update)
    }, [isMyArtTimeline])

    const _expand = () => {
        setVisibleItems(currentValue => {
            return Math.min(currentValue + 3, filteredItems.length)
        })
    }

    const _onMyArtItemHeightChange = useCallback((itemIndex, heightPx) => {
        if(!isMyArtTimeline)
            return

        if(!Number.isFinite(heightPx) || heightPx <= 0)
            return

        setArtItemHeightsPx(currentHeights => {
            if(itemIndex < 0 || itemIndex >= currentHeights.length)
                return currentHeights

            if(currentHeights[itemIndex] === heightPx)
                return currentHeights

            const nextHeights = [...currentHeights]
            nextHeights[itemIndex] = heightPx
            return nextHeights
        })
    }, [isMyArtTimeline])

    const timelineLineOffsetsStyle = useMemo(() => {
        if(!isMyArtTimeline)
            return null

        const firstHeight = artItemHeightsPx[0]
        const lastHeight = artItemHeightsPx[artItemHeightsPx.length - 1]

        const topOffset = Number.isFinite(firstHeight) ? Math.round(firstHeight / 2) : null
        const bottomOffset = Number.isFinite(lastHeight) ? Math.round(lastHeight / 2) : null

        const style = {}

        if(Number.isFinite(topOffset))
            style["--timeline-line-top-offset"] = `${topOffset}px`

        if(Number.isFinite(bottomOffset))
            style["--timeline-line-bottom-offset"] = `${bottomOffset}px`

        return style
    }, [isMyArtTimeline, artItemHeightsPx])

    return (
        <>
            <ul className={`article-timeline-items`}
                ref={listRef}
                style={timelineLineOffsetsStyle || undefined}>
                {visibleItemWrappers.map((itemWrapper, key) => (
                    <ArticleTimelineItem itemWrapper={itemWrapper}
                                         itemIndex={key}
                                         isMyArtTimeline={isMyArtTimeline}
                                         avatarColumnSizePx={avatarColumnSizePx}
                                         onMyArtItemHeightChange={_onMyArtItemHeightChange}
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
function ArticleTimelineItem({ itemWrapper, itemIndex = 0, isMyArtTimeline = false, avatarColumnSizePx = null, onMyArtItemHeightChange = null }) {
    const language = useLanguage()
    const utils = useUtils()

    const avatarSrc = itemWrapper.img || itemWrapper.preview?.screenshots?.[0] || ""
    const avatarFaIcon = itemWrapper.faIcon || itemWrapper.preview?.links?.[0]?.faIcon || itemWrapper.faIconWithFallback
    const shouldShowDateInterval = Boolean(itemWrapper.dateEnd)
    const contentRef = useRef(null)
    const [myArtAvatarSizePx, setMyArtAvatarSizePx] = useState(null)

    const screenshots = itemWrapper.preview?.screenshots || []
    const screenshotsAspectRatio = itemWrapper.preview?.screenshotsAspectRatio
    const canOpenGallery = Boolean(screenshots?.length)

    const galleryMetadata = useMemo(() => {
        if(!canOpenGallery)
            return null

        const splitTitle = utils.string.extractFirstPart(itemWrapper.locales?.title || "")
        const title = splitTitle.length < 35 ?
            splitTitle :
            language.getString("get_to_know_more")

        return {
            title: title,
            images: screenshots,
            aspectRatio: screenshotsAspectRatio,
        }
    }, [canOpenGallery, itemWrapper.locales?.title, language, screenshots, screenshotsAspectRatio, utils])

    useLayoutEffect(() => {
        if(!isMyArtTimeline)
            return

        const el = contentRef.current
        if(!el)
            return

        const _compute = () => {
            const rect = el.getBoundingClientRect()
            const heightPx = Math.round(rect.height)

            if(Number.isFinite(heightPx) && heightPx > 0) {
                onMyArtItemHeightChange?.(itemIndex, heightPx)
            }

            const computedAvatarSize = Math.round(heightPx * 0.7)
            const clampedAvatarSize = (Number.isFinite(avatarColumnSizePx) && avatarColumnSizePx > 0) ?
                Math.min(computedAvatarSize, Math.round(avatarColumnSizePx)) :
                computedAvatarSize

            if(!Number.isFinite(clampedAvatarSize) || clampedAvatarSize <= 0)
                return

            setMyArtAvatarSizePx(currentValue => currentValue === clampedAvatarSize ? currentValue : clampedAvatarSize)
        }

        _compute()

        if(typeof ResizeObserver !== "undefined") {
            const ro = new ResizeObserver(() => _compute())
            ro.observe(el)
            return () => ro.disconnect()
        }

        window.addEventListener("resize", _compute)
        return () => window.removeEventListener("resize", _compute)
    }, [isMyArtTimeline, itemIndex, avatarColumnSizePx, onMyArtItemHeightChange])

    const avatarStyle = useMemo(() => {
        const baseStyle = itemWrapper?.faIconStyle && typeof itemWrapper.faIconStyle === "object" ?
            itemWrapper.faIconStyle :
            {}

        if(!isMyArtTimeline || !Number.isFinite(myArtAvatarSizePx))
            return baseStyle

        return {
            ...baseStyle,
            width: `${myArtAvatarSizePx}px`,
            height: `${myArtAvatarSizePx}px`,
            fontSize: `${Math.round(myArtAvatarSizePx / 2.35)}px`
        }
    }, [itemWrapper?.faIconStyle, isMyArtTimeline, myArtAvatarSizePx])
    const avatarSizes = isMyArtTimeline ?
        "(max-width: 575.98px) 88px, (max-width: 767.98px) 120px, (max-width: 991.98px) 144px, 168px" :
        "(max-width: 575.98px) 42px, (max-width: 767.98px) 54px, (max-width: 991.98px) 60px, 72px"

    return (
        <li className={`article-timeline-item`}>
            <div className={`article-timeline-item-avatar-wrapper`}>
                {canOpenGallery ? (
                    <Link href={"#gallery:open"}
                          metadata={galleryMetadata}
                          className={`article-timeline-item-avatar-link`}
                          tooltip={language.getString("open_gallery")}>
                        <AvatarView src={avatarSrc}
                                     faIcon={avatarFaIcon}
                                     style={avatarStyle}
                                     alt={itemWrapper?.imageAlt}
                                     sizes={avatarSizes}
                                     className={`article-timeline-item-avatar article-timeline-item-avatar--button`}/>
                    </Link>
                ) : (
                    <AvatarView src={avatarSrc}
                                faIcon={avatarFaIcon}
                                style={avatarStyle}
                                alt={itemWrapper?.imageAlt}
                                sizes={avatarSizes}
                                className={`article-timeline-item-avatar`}/>
                )}
            </div>

            <ArticleItemInfoForTimelines className={`article-timeline-item-content`}
                                         containerRef={contentRef}>
                <ArticleItemInfoForTimelinesHeader itemWrapper={itemWrapper}
                                                   dateInterval={shouldShowDateInterval}/>

                <ArticleItemInfoForTimelinesBody itemWrapper={itemWrapper}/>

                <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}/>
            </ArticleItemInfoForTimelines>
        </li>
    )
}

export default ArticleTimeline
