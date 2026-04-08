import "./ArticlePortfolio.scss"
import React, {useEffect, useMemo, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import Transitionable from "../capabilities/Transitionable.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import ArticleItemPreviewMenu from "./partials/ArticleItemPreviewMenu.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import Link from "../generic/Link.jsx"

const PORTFOLIO_TEXT_FIT_STEPS = 7
const PORTFOLIO_TEXT_SCALE_EPSILON = 0.01
const PORTFOLIO_TEXT_RESIZE_SETTLE_MS = 120

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolio({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-portfolio`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticlePortfolioItems dataWrapper={dataWrapper}
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
function ArticlePortfolioItems({ dataWrapper, selectedItemCategoryId }) {
    const language = useLanguage()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const itemsPerRow = viewport.isBreakpoint("lg") ?
        3 :
        viewport.isBreakpoint("md") ?
            2 :
            1
    const itemsPerRowClass = `article-portfolio-items-${itemsPerRow}-per-row`

    const refreshFlag = dataWrapper.categories?.length ?
        selectedItemCategoryId + "-" + language.getSelectedLanguage()?.id :
        language.getSelectedLanguage()?.id

    if(dataWrapper.categories?.length) {
        return (
            <Transitionable id={dataWrapper.uniqueId}
                            refreshFlag={refreshFlag}
                            delayBetweenItems={100}
                            animation={Transitionable.Animations.POP}
                            className={`article-portfolio-items ${itemsPerRowClass}`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticlePortfolioItem itemWrapper={itemWrapper}
                                          key={itemWrapper?.uniqueId || key}/>
                ))}
            </Transitionable>
        )
    }
    else {
        return (
            <div className={`article-portfolio-items ${itemsPerRowClass} mb-3 mb-lg-2`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticlePortfolioItem itemWrapper={itemWrapper}
                                          key={itemWrapper?.uniqueId || key}/>
                ))}
            </div>
        )
    }
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItem({ itemWrapper }) {
    const cardRef = useRef(null)
    const titleRef = useRef(null)
    const categoryRef = useRef(null)
    const resizeFrameRef = useRef(null)
    const resizeTimeoutRef = useRef(null)
    const baseTypographyRef = useRef(null)
    const [titleScale, setTitleScale] = useState(1)

    useEffect(() => {
        const cardElement = cardRef.current
        const titleElement = titleRef.current
        if (!cardElement || !titleElement) return

        const syncScale = () => {
            resizeFrameRef.current = null

            const titleNode = titleRef.current
            if (!titleNode) return

            titleNode.style.fontSize = ""
            titleNode.style.lineHeight = ""

            const style = window.getComputedStyle(titleNode)
            const baseFontSize = parseFloat(style.fontSize) || 14
            const baseLineHeight = resolvePixelValue(style.lineHeight, baseFontSize * 1.2)
            baseTypographyRef.current = { fontSize: baseFontSize, lineHeight: baseLineHeight }

            // Fit title into up to 3 lines; shrink if it exceeds.
            const targetHeight = Math.max(1, baseLineHeight * 3)
            const nextScale = findBestFitScale({
                element: titleNode,
                targetHeight,
                minScale: 0.55,
                maxScale: 1,
                baseFontSize,
                baseLineHeight
            })

            titleNode.style.fontSize = ""
            titleNode.style.lineHeight = ""

            setTitleScale(current => {
                return Math.abs(nextScale - current) < PORTFOLIO_TEXT_SCALE_EPSILON ?
                    current :
                    Math.round(nextScale * 1000) / 1000
            })
        }

        const scheduleSync = (immediate = false) => {
            if (resizeTimeoutRef.current !== null) {
                clearTimeout(resizeTimeoutRef.current)
                resizeTimeoutRef.current = null
            }

            const flush = () => {
                resizeTimeoutRef.current = null
                if (resizeFrameRef.current !== null) {
                    cancelAnimationFrame(resizeFrameRef.current)
                }
                resizeFrameRef.current = requestAnimationFrame(syncScale)
            }

            if (immediate) {
                flush()
                return
            }

            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(resizeFrameRef.current)
                resizeFrameRef.current = null
            }

            resizeTimeoutRef.current = setTimeout(flush, PORTFOLIO_TEXT_RESIZE_SETTLE_MS)
        }

        const observer = new ResizeObserver(() => scheduleSync())
        ;[cardElement, titleElement, categoryRef.current].forEach(el => {
            if (el) observer.observe(el)
        })

        scheduleSync(true)

        return () => {
            observer.disconnect()
            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(resizeFrameRef.current)
                resizeFrameRef.current = null
            }
            if (resizeTimeoutRef.current !== null) {
                clearTimeout(resizeTimeoutRef.current)
                resizeTimeoutRef.current = null
            }
        }
    }, [itemWrapper?.locales?.title, itemWrapper?.placeholder])

    const scaledTitleFontSize = computeScaledFontSize(baseTypographyRef, titleScale)
    const scaledTitleLineHeight = computeScaledLineHeight(baseTypographyRef, titleScale)
    const previewLinks = itemWrapper?.preview?.links || []
    const websiteLink = previewLinks.find(link => link?.isWebsiteAction && isNonEmptyHref(link?.href)) ||
        (itemWrapper?.link?.isWebsiteAction && isNonEmptyHref(itemWrapper?.link?.href) ? itemWrapper.link : null)
    const githubLink = previewLinks.find(link => isNonEmptyHref(link?.href) && String(link?.href || "").includes("github.com")) || null
    const docsLink = previewLinks.find(link => {
        const href = String(link?.href || "")
        const icon = String(link?.faIcon || "")
        if (!isNonEmptyHref(href)) return false
        return icon.includes("fa-file") || href.includes("docs.google.com") || href.includes("readthedocs") || href.includes("/docs")
    }) || null

    return (
        <div ref={cardRef}
             className={`article-portfolio-item`}
             >
            <ArticlePortfolioItemTitle itemWrapper={itemWrapper}
                                       titleRef={titleRef}
                                       categoryRef={categoryRef}
                                       titleStyle={baseTypographyRef.current ? {
                                           fontSize: `${scaledTitleFontSize}px`,
                                           lineHeight: `${scaledTitleLineHeight}px`
                                       } : undefined}/>
            <ArticlePortfolioItemBody itemWrapper={itemWrapper}/>
            <ArticlePortfolioItemFooter itemWrapper={itemWrapper}/>

            {(githubLink || docsLink) && (
                <DraggableDock cardRef={cardRef}
                               defaultSlot={"bl"}
                               dockId={"actions"}
                               returnDelayMs={3000}
                               className={`article-portfolio-item-actions`}>
                    {githubLink && (
                        <Link href={githubLink.href}
                              tooltip={githubLink.tooltip || "GitHub"}
                              className={`article-portfolio-item-action`}>
                            <i className={`fa-icon ${githubLink.faIcon || "fa-brands fa-github"}`}/>
                        </Link>
                    )}
                    {docsLink && (
                        <Link href={docsLink.href}
                              tooltip={docsLink.tooltip || "Docs"}
                              className={`article-portfolio-item-action`}>
                            <i className={`fa-icon ${docsLink.faIcon || "fa-solid fa-file-lines"}`}/>
                        </Link>
                    )}
                </DraggableDock>
            )}

            <DraggableDock cardRef={cardRef}
                           defaultSlot={"br"}
                           dockId={"avatar"}
                           returnDelayMs={3000}
                           className={`article-portfolio-item-avatar-dock`}>
                {websiteLink ? (
                    <Link href={websiteLink.href}
                          tooltip={websiteLink.tooltip || "Visit online"}
                          className={`article-portfolio-item-avatar-link article-portfolio-item-visit-online-button`}>
                        <span className={`article-portfolio-item-visit-online-label`}>
                            {websiteLink.label || "VISIT ONLINE"}
                        </span>
                        <AvatarView src={itemWrapper.img}
                                    faIcon={itemWrapper.faIcon}
                                    style={itemWrapper.faIconStyle}
                                    alt={itemWrapper.imageAlt}
                                    className={`article-portfolio-item-avatar`}/>
                    </Link>
                ) : (
                    <AvatarView src={itemWrapper.img}
                                faIcon={itemWrapper.faIcon}
                                style={itemWrapper.faIconStyle}
                                alt={itemWrapper.imageAlt}
                                className={`article-portfolio-item-avatar`}/>
                )}
            </DraggableDock>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemTitle({ itemWrapper, titleRef, categoryRef, titleStyle }) {
    return (
        <div className={`article-portfolio-item-title`}>
            <h5 className={`article-portfolio-item-title-main`}
                ref={titleRef}
                style={titleStyle}
                dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

            <div className={`article-portfolio-item-title-category text-2`}
                 ref={categoryRef}
                 dangerouslySetInnerHTML={{__html: itemWrapper.category?.label }}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemBody({ itemWrapper }) {
    return (
        <div className={`article-portfolio-item-body`}>
            <div className={`article-portfolio-item-body-description text-2`}
                 dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePortfolioItemFooter({ itemWrapper }) {
    const hasPreview = itemWrapper.preview
    const hasPreviewLinks = itemWrapper.preview?.hasLinks
    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo

    const previewMenuAvailable = hasPreview && (hasPreviewLinks || hasScreenshotsOrVideo)
    if(!previewMenuAvailable)
        return <></>

    return (
        <div className={`article-portfolio-item-footer`}>
            <ArticleItemPreviewMenu itemWrapper={itemWrapper}
                                    spaceBetween={true}
                                    className={`article-portfolio-item-footer-menu`}/>
        </div>
    )
}

export default ArticlePortfolio

function isNonEmptyHref(href) {
    return typeof href === "string" && href.trim().length > 0
}

function DraggableDock({
    cardRef,
    defaultSlot,
    dockId,
    className = "",
    returnDelayMs = 3000,
    children
}) {
    const dockRef = useRef(null)
    const pointerIdRef = useRef(null)
    const returnTimeoutRef = useRef(null)
    const dragStartRef = useRef(null)
    const targetTransformRef = useRef(null) // {dx, dy}
    const rafRef = useRef(null)
    const [dragging, setDragging] = useState(false)
    const [transform, setTransform] = useState({ dx: 0, dy: 0 })

    const clearReturnTimer = () => {
        if (returnTimeoutRef.current) {
            clearTimeout(returnTimeoutRef.current)
            returnTimeoutRef.current = null
        }
    }

    const scheduleReturn = () => {
        clearReturnTimer()
        returnTimeoutRef.current = setTimeout(() => {
            setTransform({ dx: 0, dy: 0 })
        }, returnDelayMs)
    }

    useEffect(() => {
        return () => {
            clearReturnTimer()
        }
    }, [])

    const getClamp = () => {
        const cardEl = cardRef.current
        const dockEl = dockRef.current
        if (!cardEl || !dockEl) return null

        const cardRect = cardEl.getBoundingClientRect()
        const dockRect = dockEl.getBoundingClientRect()

        // Default position in card coordinates (CSS anchors, no transform).
        const baseX = dockEl.offsetLeft
        const baseY = dockEl.offsetTop

        const style = window.getComputedStyle(cardEl)
        const padL = parseFloat(style.paddingLeft) || 0
        const padR = parseFloat(style.paddingRight) || 0
        const padT = parseFloat(style.paddingTop) || 0
        const padB = parseFloat(style.paddingBottom) || 0
        const offsetVar = parseFloat(style.getPropertyValue("--avatar-offset")) || 0
        const inset = Math.max(offsetVar, Math.min(padL, padR, padT, padB))

        const dockW = dockRect.width
        const dockH = dockRect.height

        const minX = inset
        const minY = inset
        const maxX = Math.max(minX, cardRect.width - inset - dockW)
        const maxY = Math.max(minY, cardRect.height - inset - dockH)

        return {
            minDx: minX - baseX,
            maxDx: maxX - baseX,
            minDy: minY - baseY,
            maxDy: maxY - baseY,
        }
    }

    const stopRaf = () => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }

    const startDampedFollow = () => {
        if (rafRef.current !== null) return

        const step = () => {
            const t = targetTransformRef.current
            if (!t) {
                rafRef.current = null
                return
            }

            setTransform(current => {
                const cur = current || t
                const alpha = 0.22 // lower = heavier
                return {
                    dx: cur.dx + (t.dx - cur.dx) * alpha,
                    dy: cur.dy + (t.dy - cur.dy) * alpha,
                }
            })

            rafRef.current = requestAnimationFrame(step)
        }

        rafRef.current = requestAnimationFrame(step)
    }

    const onPointerDown = (e) => {
        // Only left click / primary touch.
        if (e.button !== undefined && e.button !== 0) return
        if (e.pointerType === "touch") return

        const cardEl = cardRef.current
        const dockEl = dockRef.current
        if (!cardEl || !dockEl) return

        clearReturnTimer()
        stopRaf()

        pointerIdRef.current = e.pointerId
        dockEl.setPointerCapture?.(e.pointerId)

        const clamp = getClamp()
        if (!clamp) return

        dragStartRef.current = {
            startClientX: e.clientX,
            startClientY: e.clientY,
            startDx: transform.dx,
            startDy: transform.dy,
            ...clamp,
        }

        setDragging(false)
        targetTransformRef.current = { dx: transform.dx, dy: transform.dy }
    }

    const onPointerMove = (e) => {
        if (pointerIdRef.current === null || pointerIdRef.current !== e.pointerId) return
        const start = dragStartRef.current
        if (!start) return

        const dx = e.clientX - start.startClientX
        const dy = e.clientY - start.startClientY
        const movedEnough = Math.hypot(dx, dy) > 6
        if (!dragging && movedEnough) setDragging(true)

        const nextDx = clamp(start.startDx + dx, start.minDx, start.maxDx)
        const nextDy = clamp(start.startDy + dy, start.minDy, start.maxDy)

        targetTransformRef.current = { dx: nextDx, dy: nextDy }
        startDampedFollow()
    }

    const onPointerUp = (e) => {
        if (pointerIdRef.current === null || pointerIdRef.current !== e.pointerId) return

        const dockEl = dockRef.current
        try {
            dockEl?.releasePointerCapture?.(e.pointerId)
        }
        catch (_) {
            // Ignore stale pointer capture state during touch/mouse cancellation.
        }

        pointerIdRef.current = null
        dragStartRef.current = null
        stopRaf()

        // If it was a click (not a drag), keep default behavior.
        if (!dragging) {
            // Keep current transform; still return after delay.
            scheduleReturn()
            return
        }

        // Drop where user left it (no magnet/snapping).
        if (targetTransformRef.current) {
            setTransform(targetTransformRef.current)
        }

        setDragging(false)
        scheduleReturn()
    }

    const dockStyle = { transform: `translate3d(${Math.round(transform.dx)}px, ${Math.round(transform.dy)}px, 0)` }

    return (
        <div ref={dockRef}
             className={`article-portfolio-item-draggable-dock ${dragging ? "dock-dragging" : ""} ${className}`}
             style={dockStyle}
             onPointerDown={onPointerDown}
             onPointerMove={onPointerMove}
             onPointerUp={onPointerUp}
             onPointerCancel={onPointerUp}>
            {children}
        </div>
    )
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function resolvePixelValue(value, fallback) {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

function computeScaledFontSize(baseTypographyRef, textScale) {
    const baseFontSize = baseTypographyRef.current?.fontSize || 14
    return Math.max(9, baseFontSize * textScale)
}

function computeScaledLineHeight(baseTypographyRef, textScale) {
    const baseFontSize = baseTypographyRef.current?.fontSize || 14
    const baseLineHeight = baseTypographyRef.current?.lineHeight || baseFontSize * 1.2
    return Math.max(baseFontSize * textScale * 1.05, baseLineHeight * textScale)
}

function findBestFitScale({
    element,
    targetHeight,
    minScale,
    maxScale,
    baseFontSize,
    baseLineHeight
}) {
    const lowBound = Math.min(minScale, maxScale)
    let low = lowBound
    let high = Math.max(minScale, maxScale)
    let best = lowBound

    for (let step = 0; step < PORTFOLIO_TEXT_FIT_STEPS; step += 1) {
        const candidateScale = (low + high) / 2
        const candidateHeight = measureScaledTextHeight(
            element,
            candidateScale,
            baseFontSize,
            baseLineHeight
        )

        if (candidateHeight <= targetHeight) {
            best = candidateScale
            low = candidateScale
            continue
        }

        high = candidateScale
    }

    return best
}

function measureScaledTextHeight(element, scale, baseFontSize, baseLineHeight) {
    element.style.fontSize = `${Math.max(9, baseFontSize * scale)}px`
    element.style.lineHeight = `${Math.max(baseFontSize * scale * 1.05, baseLineHeight * scale)}px`
    return element.offsetHeight
}
