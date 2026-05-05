import "./ArticleTimeline.scss"
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesBody, ArticleItemInfoForTimelinesPreviewFooter} from "./partials/ArticleItemInfoForTimelines.jsx"
import Link from "../generic/Link.jsx"
import {useUtils} from "../../hooks/utils.js"

const FINE_POINTER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)"

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
    const isExperienceTimeline = useMemo(() => {
        return Boolean(dataWrapper?.uniqueId?.includes("section-experience"))
    }, [dataWrapper?.uniqueId])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-timeline ${isMyArtTimeline ? "article-timeline--my-art" : ""} ${isExperienceTimeline ? "article-timeline--experience" : ""}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTimelineItems dataWrapper={dataWrapper}
                                  selectedItemCategoryId={selectedItemCategoryId}
                                  isMyArtTimeline={isMyArtTimeline}
                                  isExperienceTimeline={isExperienceTimeline}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItems({ dataWrapper, selectedItemCategoryId, isMyArtTimeline = false, isExperienceTimeline = false }) {
    const language = useLanguage()
    const utils = useUtils()
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const initialVisibleItems = dataWrapper.settings.maxRowsCollapseThreshold || filteredItems.length
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems)
    const listRef = useRef(null)
    const [avatarColumnSizePx, setAvatarColumnSizePx] = useState(null)
    const [artItemHeightsPx, setArtItemHeightsPx] = useState([])
    const [experienceTimelineOffsetsPx, setExperienceTimelineOffsetsPx] = useState({
        topOffsetPx: null,
        bottomOffsetPx: null
    })
    const [activeOverlayItemId, setActiveOverlayItemId] = useState(null)
    const [supportsFinePointer, setSupportsFinePointer] = useState(() => {
        if(typeof window === "undefined" || !isExperienceTimeline)
            return true

        return utils.device.canHoverWithFinePointer()
    })
    const usesMeasuredTimelineOffsets = isMyArtTimeline || isExperienceTimeline
    const usesTapOverlay = isExperienceTimeline && !supportsFinePointer

    useEffect(() => {
        setVisibleItems(Math.min(initialVisibleItems, filteredItems.length))
    }, [initialVisibleItems, filteredItems.length, selectedItemCategoryId])

    const visibleItemWrappers = filteredItems.slice(0, visibleItems)
    const canExpand = visibleItems < filteredItems.length

    useEffect(() => {
        if(!isExperienceTimeline || typeof window === "undefined" || !window.matchMedia)
            return

        const mediaQuery = window.matchMedia(FINE_POINTER_MEDIA_QUERY)
        const update = () => setSupportsFinePointer(mediaQuery.matches)

        update()

        if(mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", update)
            return () => mediaQuery.removeEventListener("change", update)
        }

        mediaQuery.addListener(update)
        return () => mediaQuery.removeListener(update)
    }, [isExperienceTimeline])

    useEffect(() => {
        if(usesTapOverlay)
            return

        setActiveOverlayItemId(null)
    }, [usesTapOverlay])

    useEffect(() => {
        if(activeOverlayItemId === null)
            return

        const isActiveItemVisible = visibleItemWrappers.some(itemWrapper => itemWrapper.id === activeOverlayItemId)
        if(!isActiveItemVisible)
            setActiveOverlayItemId(null)
    }, [activeOverlayItemId, visibleItemWrappers])

    useEffect(() => {
        if(!usesTapOverlay || activeOverlayItemId === null)
            return

        const handlePointerDown = event => {
            const listElement = listRef.current
            const target = event.target

            if(!listElement || !(target instanceof Element)) {
                setActiveOverlayItemId(null)
                return
            }

            if(!listElement.contains(target)) {
                setActiveOverlayItemId(null)
                return
            }

            const targetItem = target.closest(".article-timeline-item--experience")
            if(!targetItem) {
                setActiveOverlayItemId(null)
                return
            }

            const targetItemId = Number(targetItem.getAttribute("data-overlay-item-id"))
            if(targetItemId === activeOverlayItemId)
                return
        }

        document.addEventListener("pointerdown", handlePointerDown, true)
        return () => document.removeEventListener("pointerdown", handlePointerDown, true)
    }, [usesTapOverlay, activeOverlayItemId])

    useEffect(() => {
        if(!usesMeasuredTimelineOffsets)
            return

        setArtItemHeightsPx(Array(visibleItemWrappers.length).fill(null))
    }, [usesMeasuredTimelineOffsets, visibleItemWrappers.length, selectedItemCategoryId])

    useLayoutEffect(() => {
        if(!isExperienceTimeline)
            return

        const listElement = listRef.current
        if(!listElement)
            return

        const _updateOffsets = () => {
            const avatarElements = listElement.querySelectorAll(".article-timeline-item-avatar-wrapper--experience")
            if(!avatarElements.length) {
                setExperienceTimelineOffsetsPx(currentValue => {
                    if(currentValue.topOffsetPx === null && currentValue.bottomOffsetPx === null)
                        return currentValue

                    return {
                        topOffsetPx: null,
                        bottomOffsetPx: null
                    }
                })
                return
            }

            const listRect = listElement.getBoundingClientRect()
            const firstRect = avatarElements[0].getBoundingClientRect()
            const lastRect = avatarElements[avatarElements.length - 1].getBoundingClientRect()
            const topOffsetPx = Math.max(0, Math.round((firstRect.top - listRect.top) + firstRect.height / 2))
            const bottomOffsetPx = Math.max(0, Math.round(listRect.bottom - (lastRect.top + lastRect.height / 2)))

            setExperienceTimelineOffsetsPx(currentValue => {
                if(currentValue.topOffsetPx === topOffsetPx && currentValue.bottomOffsetPx === bottomOffsetPx)
                    return currentValue

                return {
                    topOffsetPx,
                    bottomOffsetPx
                }
            })
        }

        _updateOffsets()

        if(typeof ResizeObserver !== "undefined") {
            const resizeObserver = new ResizeObserver(() => _updateOffsets())
            resizeObserver.observe(listElement)
            listElement.querySelectorAll(".article-timeline-item--experience").forEach(itemElement => resizeObserver.observe(itemElement))
            listElement.querySelectorAll(".article-timeline-item-avatar-wrapper--experience").forEach(avatarElement => resizeObserver.observe(avatarElement))
            return () => resizeObserver.disconnect()
        }

        window.addEventListener("resize", _updateOffsets)
        return () => window.removeEventListener("resize", _updateOffsets)
    }, [isExperienceTimeline, visibleItemWrappers.length, selectedItemCategoryId])

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

    const _activateOverlay = useCallback((itemId) => {
        if(!usesTapOverlay)
            return

        setActiveOverlayItemId(itemId)
    }, [usesTapOverlay])

    const _toggleOverlay = useCallback((itemId) => {
        if(!usesTapOverlay)
            return

        setActiveOverlayItemId(currentItemId => currentItemId === itemId ? null : itemId)
    }, [usesTapOverlay])

    const _onMyArtItemHeightChange = useCallback((itemIndex, heightPx) => {
        if(!usesMeasuredTimelineOffsets)
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
    }, [usesMeasuredTimelineOffsets])

    const timelineLineOffsetsStyle = useMemo(() => {
        const style = {}
        if(isExperienceTimeline) {
            if(Number.isFinite(experienceTimelineOffsetsPx.topOffsetPx))
                style["--timeline-line-top-offset"] = `${experienceTimelineOffsetsPx.topOffsetPx}px`

            if(Number.isFinite(experienceTimelineOffsetsPx.bottomOffsetPx))
                style["--timeline-line-bottom-offset"] = `${experienceTimelineOffsetsPx.bottomOffsetPx}px`

            return Object.keys(style).length ? style : null
        }

        if(!usesMeasuredTimelineOffsets)
            return null

        const firstHeight = artItemHeightsPx[0]
        const lastHeight = artItemHeightsPx[artItemHeightsPx.length - 1]
        const topOffset = Number.isFinite(firstHeight) ? Math.round(firstHeight / 2) : null
        const bottomOffset = Number.isFinite(lastHeight) ? Math.round(lastHeight / 2) : null

        if(Number.isFinite(topOffset))
            style["--timeline-line-top-offset"] = `${topOffset}px`

        if(Number.isFinite(bottomOffset))
            style["--timeline-line-bottom-offset"] = `${bottomOffset}px`

        return style
    }, [usesMeasuredTimelineOffsets, isExperienceTimeline, artItemHeightsPx, experienceTimelineOffsetsPx])

    return (
        <>
            <ul className={`article-timeline-items`}
                ref={listRef}
                style={timelineLineOffsetsStyle || undefined}>
                {visibleItemWrappers.map((itemWrapper, key) => (
                    <ArticleTimelineItem itemWrapper={itemWrapper}
                                         itemIndex={key}
                                         isMyArtTimeline={isMyArtTimeline}
                                         isExperienceTimeline={isExperienceTimeline}
                                         isOverlayActive={isExperienceTimeline && activeOverlayItemId === itemWrapper.id}
                                         usesTapOverlay={usesTapOverlay}
                                         avatarColumnSizePx={avatarColumnSizePx}
                                         onMyArtItemHeightChange={_onMyArtItemHeightChange}
                                         onOverlayActivate={_activateOverlay}
                                         onOverlayToggle={_toggleOverlay}
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
function ArticleTimelineItem({
    itemWrapper,
    itemIndex = 0,
    isMyArtTimeline = false,
    isExperienceTimeline = false,
    isOverlayActive = false,
    usesTapOverlay = false,
    avatarColumnSizePx = null,
    onMyArtItemHeightChange = null,
    onOverlayActivate = null,
    onOverlayToggle = null
}) {
    const language = useLanguage()
    const utils = useUtils()

    const avatarSrc = itemWrapper.img || itemWrapper.preview?.screenshots?.[0] || ""
    const avatarFaIcon = itemWrapper.faIcon || itemWrapper.preview?.links?.[0]?.faIcon || itemWrapper.faIconWithFallback
    const shouldShowDateInterval = Boolean(itemWrapper.dateEnd)
    const itemRef = useRef(null)
    const contentRef = useRef(null)
    const [myArtAvatarSizePx, setMyArtAvatarSizePx] = useState(null)

    const screenshots = itemWrapper.preview?.screenshots || []
    const screenshotsAspectRatio = itemWrapper.preview?.screenshotsAspectRatio
    const canOpenGallery = Boolean(screenshots?.length)
    const previewLinks = itemWrapper.preview?.links || []
    const primaryPreviewLink = previewLinks.find(link => isNonEmptyHref(link?.href) && link?.faIcon === avatarFaIcon) ||
        previewLinks.find(link => isNonEmptyHref(link?.href)) ||
        null
    const isWritingsTimeline = Boolean(itemWrapper?.articleWrapper?.uniqueId?.includes("section-my-writings"))
    const shouldUsePreviewLinkAvatar = isWritingsTimeline && !canOpenGallery && Boolean(primaryPreviewLink)

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
        if(!isMyArtTimeline && !isExperienceTimeline)
            return

        const el = isExperienceTimeline ? itemRef.current : contentRef.current
        if(!el)
            return

        const _compute = () => {
            const rect = el.getBoundingClientRect()
            const heightPx = Math.round(rect.height)

            if(Number.isFinite(heightPx) && heightPx > 0) {
                onMyArtItemHeightChange?.(itemIndex, heightPx)
            }

            if(!isMyArtTimeline)
                return

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
    }, [isMyArtTimeline, isExperienceTimeline, itemIndex, avatarColumnSizePx, onMyArtItemHeightChange])

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
    const shouldInterceptGalleryTap = Boolean(isExperienceTimeline && usesTapOverlay && !isOverlayActive)
    const experienceItemClass = isExperienceTimeline ? "article-timeline-item--experience" : ""
    const overlayActiveClass = isOverlayActive ? "is-overlay-active" : ""
    const avatarWrapperClass = isExperienceTimeline ?
        "article-timeline-item-avatar-wrapper article-timeline-item-avatar-wrapper--experience" :
        "article-timeline-item-avatar-wrapper"
    const avatarLinkClass = isExperienceTimeline ?
        "article-timeline-item-avatar-link article-timeline-item-avatar-link--experience" :
        "article-timeline-item-avatar-link"
    const contentClass = isExperienceTimeline ?
        "article-timeline-item-content article-timeline-item-content--experience" :
        "article-timeline-item-content"
    const overlayActionLabel = itemWrapper?.imageAlt || itemWrapper.locales?.title || language.getString("get_to_know_more")
    const avatarActionLabel = primaryPreviewLink?.tooltip || overlayActionLabel

    const _onGalleryAvatarClick = () => {
        if(!shouldInterceptGalleryTap)
            return

        onOverlayActivate?.(itemWrapper.id)
    }

    const _onStaticAvatarClick = () => {
        if(!usesTapOverlay)
            return

        onOverlayToggle?.(itemWrapper.id)
    }

    return (
        <li className={`article-timeline-item ${experienceItemClass} ${overlayActiveClass}`.trim()}
            ref={itemRef}
            data-overlay-item-id={isExperienceTimeline ? itemWrapper.id : undefined}>
            <div className={avatarWrapperClass}>
                {canOpenGallery ? (
                    <Link href={"#gallery:open"}
                          metadata={galleryMetadata}
                          className={avatarLinkClass}
                          tooltip={language.getString("open_gallery")}
                          ariaLabel={overlayActionLabel}
                          intercept={shouldInterceptGalleryTap}
                          onClick={_onGalleryAvatarClick}>
                        <AvatarView src={avatarSrc}
                                     faIcon={avatarFaIcon}
                                     style={avatarStyle}
                                     alt={itemWrapper?.imageAlt}
                                     sizes={avatarSizes}
                                     className={`article-timeline-item-avatar article-timeline-item-avatar--button ${isExperienceTimeline ? "article-timeline-item-avatar--experience" : ""}`.trim()}/>
                    </Link>
                ) : shouldUsePreviewLinkAvatar ? (
                    <Link href={primaryPreviewLink.href}
                          className={avatarLinkClass}
                          tooltip={avatarActionLabel}
                          ariaLabel={avatarActionLabel}>
                        <AvatarView src={avatarSrc}
                                     faIcon={avatarFaIcon}
                                     style={avatarStyle}
                                     alt={itemWrapper?.imageAlt}
                                     sizes={avatarSizes}
                                     className={`article-timeline-item-avatar article-timeline-item-avatar--button ${isExperienceTimeline ? "article-timeline-item-avatar--experience" : ""}`.trim()}/>
                    </Link>
                ) : (
                    <button type={"button"}
                            className={`article-timeline-item-avatar-button-reset ${isExperienceTimeline ? "article-timeline-item-avatar-button-reset--experience" : ""}`.trim()}
                            aria-label={overlayActionLabel}
                            aria-pressed={usesTapOverlay ? isOverlayActive : undefined}
                            onClick={_onStaticAvatarClick}>
                        <AvatarView src={avatarSrc}
                                    faIcon={avatarFaIcon}
                                    style={avatarStyle}
                                    alt={itemWrapper?.imageAlt}
                                    sizes={avatarSizes}
                                    className={`article-timeline-item-avatar article-timeline-item-avatar--button ${isExperienceTimeline ? "article-timeline-item-avatar--experience" : ""}`.trim()}/>
                    </button>
                )}
            </div>

            <ArticleItemInfoForTimelines className={contentClass}
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

function isNonEmptyHref(href) {
    return typeof href === "string" && href.trim().length > 0
}
