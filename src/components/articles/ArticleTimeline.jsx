import "./ArticleTimeline.scss"
import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import ImageView from "../generic/ImageView.jsx"
import StandardButton from "../buttons/StandardButton.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {ArticleItemInfoForTimelines, ArticleItemInfoForTimelinesHeader, ArticleItemInfoForTimelinesBody, ArticleItemInfoForTimelinesPreviewFooter} from "./partials/ArticleItemInfoForTimelines.jsx"
import Link from "../generic/Link.jsx"
import {useUtils} from "../../hooks/utils.js"

const FINE_POINTER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)"
const EDUCATION_CRYSTAL_COLORS_BY_ID = {
    6: "#ff2d3f", // Erasmus: red
    2: "#005b3c", // THM: dark green
    3: "#c7d2de", // BWS: metallic silver
    1: "#123a8f", // Provadis: dark blue
    4: "#8b35dc", // EDS: purple
    5: "#c46a2e", // Primary school: vibrant brown
    7: "#39ff14", // Life: bright green
}

function getEducationCrystalColor(itemId) {
    return EDUCATION_CRYSTAL_COLORS_BY_ID[itemId] || "#60a5fa"
}

function buildEducationTimelinePath(listElement) {
    if(!listElement)
        return null

    const listRect = listElement.getBoundingClientRect()
    const avatars = [...listElement.querySelectorAll(":scope > .article-timeline-item .article-timeline-item-avatar-wrapper")]
    if(avatars.length < 2 || listRect.width <= 0 || listRect.height <= 0)
        return null

    const points = avatars.map(avatar => {
        const rect = avatar.getBoundingClientRect()
        return {
            x: rect.left + rect.width / 2 - listRect.left,
            y: rect.top + rect.height / 2 - listRect.top,
            size: Math.min(rect.width, rect.height)
        }
    })
    const segments = []
    for(let index = 0; index < points.length - 1; index++) {
        const start = points[index]
        const end = points[index + 1]
        const deltaY = end.y - start.y
        const deltaX = end.x - start.x
        const idealAmplitude = Math.min(start.size * 1.7, listRect.width * 0.34, 240)
        const safeEdge = 24
        const leftAmplitude = Math.max(0, Math.min(idealAmplitude, Math.min(start.x, end.x) - safeEdge))
        const rightAmplitude = Math.max(0, Math.min(idealAmplitude, listRect.width - Math.max(start.x, end.x) - safeEdge))
        const midpointX = start.x + deltaX * 0.5
        const midpointY = start.y + deltaY * 0.5
        const verticalAmplitude = Math.max(start.size * 0.38, Math.min(deltaY * 0.12, listRect.height * 0.06))
        const phase = index * 0.83 + (index % 2 === 0 ? 0 : Math.PI * 0.31)
        const sampleCount = 96
        const weaveKnots = Array.from({length: sampleCount - 1}, (_, knotIndex) => {
            const step = knotIndex + 1
            const progress = step / sampleCount
            const envelope = Math.sin(Math.PI * progress) ** 0.58
            const xWave = Math.max(-1, Math.min(1,
                0.78 * Math.sin(2 * Math.PI * 3 * progress + phase) +
                0.22 * Math.sin(2 * Math.PI * 5 * progress - phase * 0.65)
            ))
            const yWave =
                0.72 * Math.sin(2 * Math.PI * 2 * progress + phase * 0.5) +
                0.28 * Math.sin(2 * Math.PI * 3 * progress - phase * 0.75)

            return {
                progress,
                x: start.x + deltaX * progress + (xWave < 0 ? leftAmplitude : rightAmplitude) * xWave * envelope,
                y: start.y + deltaY * progress + verticalAmplitude * yWave * envelope
            }
        })
        const curvePoints = [
            {x: start.x, y: start.y},
            ...weaveKnots.map(({x, y}) => ({x, y})),
            {x: end.x, y: end.y}
        ]
        const commands = [`M ${start.x} ${start.y}`]

        // Compact, low-amplitude waves create small rounded swirls while
        // keeping the path close to the avatar-to-avatar route.
        for(let knotIndex = 0; knotIndex < curvePoints.length - 1; knotIndex++) {
            const previous = curvePoints[Math.max(0, knotIndex - 1)]
            const current = curvePoints[knotIndex]
            const next = curvePoints[knotIndex + 1]
            const following = curvePoints[Math.min(curvePoints.length - 1, knotIndex + 2)]
            const tension = 0.9
            const control1 = {
                x: current.x + (next.x - previous.x) * tension / 6,
                y: current.y + (next.y - previous.y) * tension / 6
            }
            const control2 = {
                x: next.x - (following.x - current.x) * tension / 6,
                y: next.y - (following.y - current.y) * tension / 6
            }
            commands.push(`C ${control1.x} ${control1.y}, ${control2.x} ${control2.y}, ${next.x} ${next.y}`)
        }

        segments.push({
            path: commands.join(" "),
            startX: start.x,
            startY: start.y,
            endX: end.x,
            endY: end.y,
            index
        })
    }

    return {
        segments,
        width: listRect.width,
        height: listRect.height
    }
}

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
    const isEducationTimeline = useMemo(() => {
        return Boolean(dataWrapper?.uniqueId?.includes("section-education"))
    }, [dataWrapper?.uniqueId])
    const isPhotographyTimeline = dataWrapper?.settings?.timelineVariant === "art-photography"
    const isDigitalExpressionTimeline = dataWrapper?.settings?.timelineVariant === "art-digital-expression"
    const timelineVariantClass = useMemo(() => {
        const timelineVariant = dataWrapper?.settings?.timelineVariant
        return timelineVariant ? `article-timeline--${timelineVariant}` : ""
    }, [dataWrapper?.settings?.timelineVariant])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-timeline ${isMyArtTimeline ? "article-timeline--my-art" : ""} ${isExperienceTimeline ? "article-timeline--experience" : ""} ${timelineVariantClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTimelineItems dataWrapper={dataWrapper}
                                  selectedItemCategoryId={selectedItemCategoryId}
                                  isMyArtTimeline={isMyArtTimeline}
                                  isExperienceTimeline={isExperienceTimeline}
                                  isEducationTimeline={isEducationTimeline}
                                  isPhotographyTimeline={isPhotographyTimeline}
                                  isDigitalExpressionTimeline={isDigitalExpressionTimeline}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTimelineItems({ dataWrapper, selectedItemCategoryId, isMyArtTimeline = false, isExperienceTimeline = false, isEducationTimeline = false, isPhotographyTimeline = false, isDigitalExpressionTimeline = false }) {
    const language = useLanguage()
    const utils = useUtils()
    const viewport = useViewport()
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const initialVisibleItems = dataWrapper.settings.maxRowsCollapseThreshold || filteredItems.length
    const [visibleItems, setVisibleItems] = useState(initialVisibleItems)
    const listRef = useRef(null)
    const [avatarColumnSizePx, setAvatarColumnSizePx] = useState(null)
    const [artItemHeightsPx, setArtItemHeightsPx] = useState([])
    const [timelineOffsetsPx, setTimelineOffsetsPx] = useState({
        topOffsetPx: null,
        bottomOffsetPx: null
    })
    const [educationTimelinePath, setEducationTimelinePath] = useState(null)
    const [expandedEducationItemIds, setExpandedEducationItemIds] = useState(() => new Set())
    const [activeOverlayItemId, setActiveOverlayItemId] = useState(null)
    const [supportsFinePointer, setSupportsFinePointer] = useState(() => {
        if(typeof window === "undefined" || !isExperienceTimeline)
            return true

        return utils.device.canHoverWithFinePointer()
    })
    const usesTimelineLineOffsets = isMyArtTimeline || isExperienceTimeline || isEducationTimeline
    const usesArtItemHeightMeasurement = isMyArtTimeline
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
        if(!usesArtItemHeightMeasurement)
            return

        setArtItemHeightsPx(Array(visibleItemWrappers.length).fill(null))
    }, [usesArtItemHeightMeasurement, visibleItemWrappers.length, selectedItemCategoryId])

    useLayoutEffect(() => {
        if(!isExperienceTimeline && !isEducationTimeline)
            return

        const listElement = listRef.current
        if(!listElement)
            return

        const _updateOffsets = () => {
            if(isEducationTimeline) {
                const nextPath = buildEducationTimelinePath(listElement)
                setEducationTimelinePath(current => {
                    if(current?.path === nextPath?.path && current?.width === nextPath?.width && current?.height === nextPath?.height)
                        return current
                    return nextPath
                })
            }

            const avatarSelector = isExperienceTimeline ?
                ".article-timeline-item-avatar-wrapper--experience" :
                ".article-timeline-item-avatar-wrapper"
            const avatarElements = listElement.querySelectorAll(avatarSelector)
            if(!avatarElements.length) {
                setTimelineOffsetsPx(currentValue => {
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
            const articleRect = listElement.closest("article")?.getBoundingClientRect()
            const firstRect = avatarElements[0].getBoundingClientRect()
            const lastRect = avatarElements[avatarElements.length - 1].getBoundingClientRect()
            const firstExperienceItem = isExperienceTimeline ?
                listElement.querySelector(".article-timeline-item--experience") :
                null
            const firstExperienceItemRect = firstExperienceItem?.getBoundingClientRect()
            const topOffsetPx = firstExperienceItemRect ?
                Math.max(0, Math.round(
                    (firstExperienceItemRect.top - listRect.top) + firstExperienceItemRect.height * (2 / 3)
                )) :
                Math.max(0, Math.round((firstRect.top - listRect.top) + firstRect.height / 2))
            const bottomOffsetPx = isExperienceTimeline ?
                Math.max(0, Math.round((articleRect?.bottom ?? listRect.bottom) - listRect.bottom)) :
                Math.max(0, Math.round(listRect.bottom - (lastRect.top + lastRect.height / 2)))

            setTimelineOffsetsPx(currentValue => {
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
            const itemSelector = isExperienceTimeline ?
                ".article-timeline-item--experience" :
                ".article-timeline-item"
            const avatarSelector = isExperienceTimeline ?
                ".article-timeline-item-avatar-wrapper--experience" :
                ".article-timeline-item-avatar-wrapper"

            listElement.querySelectorAll(itemSelector).forEach(itemElement => resizeObserver.observe(itemElement))
            listElement.querySelectorAll(avatarSelector).forEach(avatarElement => resizeObserver.observe(avatarElement))
            return () => resizeObserver.disconnect()
        }

        window.addEventListener("resize", _updateOffsets)
        return () => window.removeEventListener("resize", _updateOffsets)
    }, [isExperienceTimeline, isEducationTimeline, visibleItemWrappers.length, selectedItemCategoryId])

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
            if(isPhotographyTimeline)
                return filteredItems.length

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

    const _expandEducationItem = useCallback((itemId) => {
        if(!isEducationTimeline)
            return

        if(expandedEducationItemIds.has(itemId)) {
            setExpandedEducationItemIds(currentIds => {
                const nextIds = new Set(currentIds)
                nextIds.delete(itemId)
                return nextIds
            })
            return
        }
        setExpandedEducationItemIds(currentIds => new Set(currentIds).add(itemId))
    }, [expandedEducationItemIds, isEducationTimeline])

    const _onMyArtItemHeightChange = useCallback((itemIndex, heightPx) => {
        if(!usesArtItemHeightMeasurement)
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
    }, [usesArtItemHeightMeasurement])

    const timelineLineOffsetsStyle = useMemo(() => {
        const style = {}
        if(isExperienceTimeline || isEducationTimeline) {
            if(Number.isFinite(timelineOffsetsPx.topOffsetPx))
                style["--timeline-line-top-offset"] = `${timelineOffsetsPx.topOffsetPx}px`

            if(Number.isFinite(timelineOffsetsPx.bottomOffsetPx))
                style["--timeline-line-bottom-offset"] = `${timelineOffsetsPx.bottomOffsetPx}px`

            return Object.keys(style).length ? style : null
        }

        if(!usesTimelineLineOffsets)
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
    }, [usesTimelineLineOffsets, isExperienceTimeline, isEducationTimeline, artItemHeightsPx, timelineOffsetsPx])

    return (
        <>
            <ul className={`article-timeline-items${isEducationTimeline && educationTimelinePath ? " article-timeline-items-has-education-snake" : ""}`}
                ref={listRef}
                style={timelineLineOffsetsStyle || undefined}>
                {isEducationTimeline && educationTimelinePath && (
                    <svg className="article-timeline-education-snake"
                         viewBox={`0 0 ${educationTimelinePath.width} ${educationTimelinePath.height}`}
                         preserveAspectRatio="none"
                         aria-hidden="true">
                        <defs>
                            {educationTimelinePath.segments.map(segment => (
                                <linearGradient id={`education-timeline-crystal-${segment.index}`}
                                                gradientUnits="userSpaceOnUse"
                                                x1={segment.startX}
                                                y1={segment.startY}
                                                x2={segment.endX}
                                                y2={segment.endY}
                                                key={segment.index}>
                                    <stop offset="0%" stopColor={getEducationCrystalColor(visibleItemWrappers[segment.index]?.id)}/>
                                    <stop offset="100%" stopColor={getEducationCrystalColor(visibleItemWrappers[segment.index + 1]?.id)}/>
                                </linearGradient>
                            ))}
                        </defs>
                        {educationTimelinePath.segments.map(segment => (
                            <path d={segment.path}
                                  stroke={`url(#education-timeline-crystal-${segment.index})`}
                                  key={segment.index}/>
                        ))}
                    </svg>
                )}
                {visibleItemWrappers.map((itemWrapper, key) => (
                    <ArticleTimelineItem itemWrapper={itemWrapper}
                                         itemIndex={key}
                                         isMyArtTimeline={isMyArtTimeline}
                                         isExperienceTimeline={isExperienceTimeline}
                                         isEducationTimeline={isEducationTimeline}
                                         isPhotographyTimeline={isPhotographyTimeline}
                                         isEducationExpanded={expandedEducationItemIds.has(itemWrapper.id)}
                                         nextEducationItemId={visibleItemWrappers[key + 1]?.id}
                                         isDigitalExpressionTimeline={isDigitalExpressionTimeline}
                                         isOverlayActive={isExperienceTimeline && activeOverlayItemId === itemWrapper.id}
                                         usesTapOverlay={usesTapOverlay}
                                         avatarColumnSizePx={isMyArtTimeline ? avatarColumnSizePx : null}
                                         onMyArtItemHeightChange={isMyArtTimeline ? _onMyArtItemHeightChange : null}
                                         onOverlayActivate={_activateOverlay}
                                         onOverlayToggle={_toggleOverlay}
                                         onEducationExpand={_expandEducationItem}
                                          key={key}/>
                ))}
            </ul>

            {Boolean(canExpand) && (
                <div className={`collapsable-menu`}>
                    <StandardButton variant={`contrast`}
                                    className={`article-timeline-see-more-button see-more-button-modern`}
                                    faIcon={`fa-solid fa-caret-down`}
                                    displayIconOnBothSides={true}
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
    isEducationTimeline = false,
    isPhotographyTimeline = false,
    isEducationExpanded = false,
    nextEducationItemId = null,
    isDigitalExpressionTimeline = false,
    isOverlayActive = false,
    usesTapOverlay = false,
    avatarColumnSizePx = null,
    onMyArtItemHeightChange = null,
    onOverlayActivate = null,
    onOverlayToggle = null,
    onEducationExpand = null
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
    const primaryAvatarLink = (isExperienceTimeline || isEducationTimeline) && isNonEmptyHref(itemWrapper.link?.href) ?
        itemWrapper.link :
        null
    const isWritingsTimeline = Boolean(itemWrapper?.articleWrapper?.uniqueId?.includes("section-my-writings"))
    const shouldUsePreviewLinkAvatar = isWritingsTimeline && !canOpenGallery && Boolean(primaryPreviewLink)
    const shouldUseItemLinkAvatar = !canOpenGallery && Boolean(primaryAvatarLink)
    const writingPreviewFooter = isWritingsTimeline ? (
        <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}
                                                  className={`article-timeline-item-info-preview-footer--meta-end`}/>
    ) : null
    const writingMobilePreviewFooter = isWritingsTimeline ? (
        <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}
                                                  excludePrimaryAction={true}
                                                  className={`article-timeline-item-info-preview-footer--mobile-avatar`}/>
    ) : null

    const galleryMetadata = useMemo(() => {
        if(!canOpenGallery)
            return null

        const splitTitle = utils.string.extractFirstPart(itemWrapper.locales?.title || "")
        const title = splitTitle.length < 35 ?
            splitTitle :
            language.getString("get_to_know_more")

        const shouldUseSharedHorizontalGallery = isPhotographyTimeline || isDigitalExpressionTimeline

        return {
            title: title,
            images: screenshots,
            aspectRatio: screenshotsAspectRatio,
            galleryDirection: shouldUseSharedHorizontalGallery ? "horizontal" : undefined,
            galleryFocus: shouldUseSharedHorizontalGallery ? "showcase" : undefined,
        }
    }, [canOpenGallery, isDigitalExpressionTimeline, isPhotographyTimeline, itemWrapper.locales?.title, language, screenshots, screenshotsAspectRatio, utils])

    const previewFooter = !isWritingsTimeline && !isPhotographyTimeline ? (
        <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}
                                                  galleryMetadata={isDigitalExpressionTimeline ? galleryMetadata : null}/>
    ) : null

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
        isExperienceTimeline ?
            "(min-width: 2000px) 184px, (max-width: 575.98px) 96px, (max-width: 767.98px) 104px, (max-width: 991.98px) 164px, (max-width: 1199.98px) 192px, 208px" :
        isEducationTimeline ?
            "(max-width: 575.98px) 110px, (max-width: 767.98px) 140px, (max-width: 991.98px) 156px, 188px" :
            "(max-width: 575.98px) 42px, (max-width: 767.98px) 54px, (max-width: 991.98px) 60px, 72px"
    const shouldInterceptGalleryTap = Boolean(isExperienceTimeline && usesTapOverlay && !isOverlayActive)
    const experienceItemClass = isExperienceTimeline ? "article-timeline-item--experience" : ""
    const overlayActiveClass = isOverlayActive ? "is-overlay-active" : ""
    const visualVariantClass = itemWrapper?.visualVariant ?
        `article-timeline-item--visual-${String(itemWrapper.visualVariant).replace(/[^a-z0-9-]/gi, "").toLowerCase()}` :
        ""
    const shouldRenderDigitalImageStack = Boolean(isDigitalExpressionTimeline && canOpenGallery)
    const shouldSwapDigitalStackOuterLayers = Boolean(
        isDigitalExpressionTimeline &&
        itemWrapper?.id === 2 &&
        primaryPreviewLink?.href?.includes("tattoo-favorites-collection")
    )
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
    const avatarActionLabel = primaryAvatarLink?.tooltip || primaryPreviewLink?.tooltip || overlayActionLabel
    const photographyCountryStyle = isPhotographyTimeline ?
        getPhotographyCountryStyle(itemWrapper?.locales?.country) :
        null
    const educationExpandedClass = isEducationExpanded ? "article-timeline-item--education-expanded" : ""
    const educationExpandedStyle = {
        ...(isEducationTimeline ? {
            "--education-crystal-color": getEducationCrystalColor(itemWrapper.id),
            "--education-next-crystal-color": getEducationCrystalColor(nextEducationItemId ?? itemWrapper.id)
        } : {})
    }

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
        <li className={`article-timeline-item ${experienceItemClass} ${overlayActiveClass} ${visualVariantClass} ${educationExpandedClass}`.trim()}
            ref={itemRef}
            style={educationExpandedStyle}
            data-education-item-id={isEducationTimeline ? itemWrapper.id : undefined}
            data-overlay-item-id={isExperienceTimeline ? itemWrapper.id : undefined}>
            {shouldRenderDigitalImageStack ? (
                <DigitalExpressionImageStack screenshots={screenshots}
                                             galleryMetadata={galleryMetadata}
                                             label={overlayActionLabel}
                                             swapOuterLayers={shouldSwapDigitalStackOuterLayers}/>
            ) : (
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
                    ) : shouldUseItemLinkAvatar || shouldUsePreviewLinkAvatar ? (
                        <Link href={(primaryAvatarLink || primaryPreviewLink).href}
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
            )}

            {writingMobilePreviewFooter}

            <ArticleItemInfoForTimelines className={contentClass}
                                         itemWrapper={itemWrapper}
                                         countryStyle={photographyCountryStyle}
                                         containerRef={contentRef}>
                <ArticleItemInfoForTimelinesHeader itemWrapper={itemWrapper}
                                                   dateInterval={shouldShowDateInterval}
                                                   metaEnd={writingPreviewFooter}
                                                   forceDateInMetaBand={isWritingsTimeline}
                                                   dateOnlyMeta={isPhotographyTimeline}
                                                   showMeta={!isDigitalExpressionTimeline}/>

                <ArticleItemInfoForTimelinesBody itemWrapper={itemWrapper}
                                                 isEducationTimeline={isEducationTimeline}
                                                 isEducationExpanded={isEducationExpanded}
                                                 onEducationExpand={onEducationExpand}/>

                {previewFooter}
                {isPhotographyTimeline && !isWritingsTimeline && (
                    <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}
                                                              className={`article-timeline-item-info-preview-footer--mobile-card`}/>
                )}
            </ArticleItemInfoForTimelines>

            {isPhotographyTimeline && !isWritingsTimeline && (
                <ArticleItemInfoForTimelinesPreviewFooter itemWrapper={itemWrapper}
                                                          className={`article-timeline-item-info-preview-footer--outside`}/>
            )}
        </li>
    )
}

function getPhotographyCountryStyle(country = "") {
    const normalizedCountry = String(country).trim().toLowerCase()

    if(!normalizedCountry)
        return "default"

    if(normalizedCountry.includes("macedon") || normalizedCountry.includes("mazedon") || normalizedCountry.includes("makedon"))
        return "macedonia"
    if(normalizedCountry.includes("greece") || normalizedCountry.includes("griechen") || normalizedCountry.includes("grčka") || normalizedCountry.includes("yunan"))
        return "greece"
    if(normalizedCountry.includes("bulgar") || normalizedCountry.includes("bugars"))
        return "bulgaria"
    if(normalizedCountry.includes("serb") || normalizedCountry.includes("srb") || normalizedCountry.includes("sırb"))
        return "serbia"
    if(normalizedCountry.includes("bosn"))
        return "bosnia-herzegovina"
    if(normalizedCountry.includes("croatia") || normalizedCountry.includes("kroat") || normalizedCountry.includes("hrvat"))
        return "croatia"
    if(normalizedCountry.includes("germany") || normalizedCountry.includes("deutsch") || normalizedCountry.includes("njema") || normalizedCountry.includes("almany"))
        return "germany"

    return "default"
}

function DigitalExpressionImageStack({ screenshots = [], galleryMetadata = null, label = "", swapOuterLayers = false }) {
    const language = useLanguage()
    const sourceImages = screenshots.slice(0, 4)
    const firstImage = sourceImages[0]

    if(!firstImage)
        return <></>

    const layerCount = 4
    const layerImages = Array.from({ length: layerCount }, (_, index) => sourceImages[index] || firstImage)
    if(swapOuterLayers && layerImages.length > 1) {
        const lastIndex = layerImages.length - 1
        const firstLayerImage = layerImages[0]
        layerImages[0] = layerImages[lastIndex]
        layerImages[lastIndex] = firstLayerImage
    }
    const primaryLayerIndex = layerImages.findIndex(src => src === firstImage)
    const sizes = "(max-width: 575.98px) 88px, (max-width: 767.98px) 104px, (max-width: 991.98px) 124px, 148px"

    return (
        <div className={`digital-expression-layer-stack`}>
            <Link href={"#gallery:open"}
                  metadata={galleryMetadata}
                  className={`digital-expression-layer-stack__link`}
                  tooltip={language.getString("open_gallery")}
                  ariaLabel={label}>
                {layerImages.map((src, index) => {
                    const isPrimaryLayer = index === primaryLayerIndex
                    return (
                        <span className={`digital-expression-layer-stack__layer digital-expression-layer-stack__layer--${index + 1}`}
                              aria-hidden={!isPrimaryLayer}
                              key={`${src}-${index}`}>
                            <ImageView src={src}
                                       alt={isPrimaryLayer ? label : ""}
                                       className={`digital-expression-layer-stack__image`}
                                       sizes={sizes}
                                       hideSpinner={!isPrimaryLayer}/>
                        </span>
                    )
                })}
            </Link>
        </div>
    )
}

export default ArticleTimeline

function isNonEmptyHref(href) {
    return typeof href === "string" && href.trim().length > 0
}
