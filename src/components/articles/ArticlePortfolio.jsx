import "./ArticlePortfolio.scss"
import React, {useEffect, useRef, useState} from 'react'
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
    const actionsCount = Number(Boolean(githubLink)) + Number(Boolean(docsLink))
    const leftControlsGapCount = Math.max(0, actionsCount - 1)

    return (
        <div ref={cardRef}
             className={`article-portfolio-item`}
             style={{
                 "--portfolio-left-controls-count": actionsCount,
                 "--portfolio-left-controls-gap-count": leftControlsGapCount
             }}
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
                <div className={`article-portfolio-item-actions`}>
                    <div className={`article-portfolio-item-actions-grid`}>
                        {githubLink && (
                            <Link href={githubLink.href}
                                  tooltip={githubLink.tooltip || "GitHub"}
                                  className={`article-portfolio-item-control-btn article-portfolio-item-control-btn-icon`}>
                                <i className={`fa-icon ${githubLink.faIcon || "fa-brands fa-github"}`}/>
                            </Link>
                        )}
                        {docsLink && (
                            <Link href={docsLink.href}
                                  tooltip={docsLink.tooltip || "Docs"}
                                  className={`article-portfolio-item-control-btn article-portfolio-item-control-btn-icon`}>
                                <i className={`fa-icon ${docsLink.faIcon || "fa-solid fa-file-lines"}`}/>
                            </Link>
                        )}
                    </div>
                </div>
            )}

            <div className={`article-portfolio-item-visit-dock`}>
                {websiteLink ? (
                    <Link href={websiteLink.href}
                          tooltip={websiteLink.tooltip || "Visit online"}
                          className={`article-portfolio-item-control-btn article-portfolio-item-control-btn-visit`}>
                        <i className={`fa-solid fa-arrow-up-right-from-square article-portfolio-item-control-btn-external-icon`}/>
                        <span className={`article-portfolio-item-control-btn-label`}>
                            {websiteLink.label || "VISIT ONLINE"}
                        </span>
                        <AvatarView src={itemWrapper.img}
                                    faIcon={itemWrapper.faIcon}
                                    style={itemWrapper.faIconStyle}
                                    alt={itemWrapper.imageAlt}
                                    className={`article-portfolio-item-control-avatar`}/>
                    </Link>
                ) : (
                    <div className={`article-portfolio-item-control-btn-avatar-only`}
                         data-tooltip={`No public link`}>
                        <AvatarView src={itemWrapper.img}
                                    faIcon={itemWrapper.faIcon}
                                    style={itemWrapper.faIconStyle}
                                    alt={itemWrapper.imageAlt}
                                    className={`article-portfolio-item-control-avatar`}/>
                    </div>
                )}
            </div>
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
