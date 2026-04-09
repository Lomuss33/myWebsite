import "./ArticleFeature.scss"
import React, {useEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import IllustratedManuscript from "../generic/IllustratedManuscript.jsx"
import ImageView from "../generic/ImageView.jsx"
import PretextInteractiveText from "../generic/PretextInteractiveText.jsx"

const FEATURE_TEXT_DEFAULT_MIN_SCALE = 0.74
const FEATURE_TEXT_DEFAULT_MAX_SCALE = 1
const FEATURE_TEXT_ABOUT_INTRO_MAX_SCALE = 1.2
const FEATURE_TEXT_HARD_MAX_SCALE = 2.4
const FEATURE_TEXT_FIT_SEARCH_STEPS = 7
const FEATURE_TEXT_SCALE_EPSILON = 0.01
const FEATURE_TEXT_RESIZE_SETTLE_MS = 160
const FEATURE_TEXT_FIT_TOLERANCE = 4
const MOBILE_VIEW_MEDIA_QUERY = "(max-width: 575.98px)"
const ABOUT_WORD_FIT_WIDTH_RATIO = 0.94

function ArticleFeature({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-feature`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleFeatureItems dataWrapper={dataWrapper}
                                 selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

function ArticleFeatureItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const manuscriptSourceItem = filteredItems.find(item => item.id === 1) || filteredItems[0]
    const shouldHideEmbeddedSourceItem = dataWrapper.settings.featureEmbed === "illustrated_manuscript"
    const embedPosition = dataWrapper.settings.featureEmbedPosition === "after_items" ?
        "after_items" :
        "before_items"
    const renderedItems = shouldHideEmbeddedSourceItem ?
        filteredItems.filter(item => item !== manuscriptSourceItem) :
        filteredItems
    const sectionClass = dataWrapper.sectionId ?
        `article-feature-items-section-${dataWrapper.sectionId}` :
        ``

    const imageStyle = {
        ...(dataWrapper.settings.featureImageAspectRatio ? {
            "--article-feature-image-aspect-ratio": dataWrapper.settings.featureImageAspectRatio
        } : {}),
        ...(dataWrapper.settings.featureImageMobileAspectRatio ? {
            "--article-feature-image-mobile-aspect-ratio": dataWrapper.settings.featureImageMobileAspectRatio
        } : {}),
        ...(dataWrapper.settings.featureImageViewportHeight ? {
            "--article-feature-image-viewport-height": dataWrapper.settings.featureImageViewportHeight
        } : {})
    }

    const renderEmbeddedFeature = () => {
        if (dataWrapper.settings.featureEmbed !== "illustrated_manuscript") {
            return null
        }

        return (
            <div className={`article-feature-embed article-feature-embed-illustrated-manuscript`}>
                <IllustratedManuscript storyHtml={manuscriptSourceItem?.locales?.text || ""}
                                       imageSrc={manuscriptSourceItem?.img || null}
                                       imageAlt={manuscriptSourceItem?.imageAlt || ""}/>
            </div>
        )
    }

    return (
        <div className={`article-feature-items ${sectionClass}`}>
            {embedPosition === "before_items" && renderEmbeddedFeature()}

            {renderedItems.map((itemWrapper, key) => (
                <ArticleFeatureItem itemWrapper={itemWrapper}
                                    imageStyle={imageStyle}
                                    key={key}/>
            ))}

            {embedPosition === "after_items" && renderEmbeddedFeature()}
        </div>
    )
}

function ArticleFeatureItem({ itemWrapper, imageStyle }) {
    const itemRef = useRef(null)
    const mediaRef = useRef(null)
    const squareContentRef = useRef(null)
    const squareMeasureRef = useRef(null)
    const resizeFrameRef = useRef(null)
    const resizeTimeoutRef = useRef(null)
    const baseTypographyRef = useRef(null)
    const [textScale, setTextScale] = useState(1)
    const [isMobileView, setIsMobileView] = useState(() => {
        if (typeof window === "undefined" || !window.matchMedia) return false
        return window.matchMedia(MOBILE_VIEW_MEDIA_QUERY).matches
    })

    const isAboutIntro = itemWrapper.articleWrapper.sectionId === "about" && itemWrapper.id === 1
    const isWritingIntro =
        itemWrapper.articleWrapper.sectionId === "my-writings" &&
        itemWrapper.articleWrapper.id === 2 &&
        itemWrapper.id === 1
    const isHomeStyleIntro = isAboutIntro || isWritingIntro
    const articleSettings = itemWrapper.articleWrapper.settings
    const html = itemWrapper.locales.text || itemWrapper.placeholder
    const featureLayoutMode = articleSettings.featureLayoutMode
    const featureStackOrder = articleSettings.featureStackOrder || "media_text"
    const isManagedSplitLayout = featureLayoutMode === "equal_split_auto_stack"
    const isTextLedSplitLayout = featureLayoutMode === "equal_split_text_led"
    const isFixedViewportImageLayout = featureLayoutMode === "equal_split_fixed_vh_image"
    const isSquareFitLayout = featureLayoutMode === "equal_split_square_fit"
    const isConfiguredInteractiveItem = articleSettings.featureInteractiveItemIds.includes(itemWrapper.id)
    const shouldFitTextToMediaHeight = isSquareFitLayout || (isFixedViewportImageLayout && isHomeStyleIntro)
    const defaultFitMaxScale = isHomeStyleIntro ? FEATURE_TEXT_ABOUT_INTRO_MAX_SCALE : FEATURE_TEXT_DEFAULT_MAX_SCALE
    const textFontSize = computeScaledFontSize(baseTypographyRef, textScale)
    const textLineHeight = computeScaledLineHeight(baseTypographyRef, textScale)
    const typographyVersion = shouldFitTextToMediaHeight && !isTextLedSplitLayout ?
        (isMobileView ? "square-fit-mobile" : Math.round(textScale * 1000)) :
        0

    useEffect(() => {
        if (!shouldFitTextToMediaHeight) {
            setTextScale(1)
            setIsMobileView(false)
            return
        }

        const mobileMediaQuery = window.matchMedia(MOBILE_VIEW_MEDIA_QUERY)

        const syncTextScale = () => {
            resizeFrameRef.current = null

            const mobileView = mobileMediaQuery.matches
            setIsMobileView(currentValue => {
                return currentValue === mobileView ? currentValue : mobileView
            })

            if (mobileView) {
                baseTypographyRef.current = null
                setTextScale(currentScale => {
                    return currentScale === 1 ? currentScale : 1
                })
                return
            }

            const squareContentElement = squareContentRef.current
            const textMeasureElement = squareMeasureRef.current
            const mediaElement = mediaRef.current

            if (!squareContentElement || !textMeasureElement) return

            textMeasureElement.style.fontSize = ""
            textMeasureElement.style.lineHeight = ""
            const computedStyle = window.getComputedStyle(textMeasureElement)
            const baseFontSize = parseFloat(computedStyle.fontSize) || 16
            const baseLineHeight = resolvePixelValue(computedStyle.lineHeight, baseFontSize * 1.55)
            baseTypographyRef.current = {
                fontSize: baseFontSize,
                lineHeight: baseLineHeight
            }

            const squareSize = isSquareFitLayout ?
                Math.min(
                    squareContentElement.clientWidth || squareContentElement.offsetWidth || 0,
                    squareContentElement.clientHeight || squareContentElement.offsetHeight || 0
                ) :
                0
            const mediaHeight = mediaElement?.offsetHeight || 0
            const targetHeight = isSquareFitLayout ?
                squareSize :
                mediaHeight

            if (!targetHeight) return

            const contentWidth =
                squareContentElement.getBoundingClientRect().width ||
                squareContentElement.clientWidth ||
                0
            const wordSafeMaxScale = isHomeStyleIntro ?
                computeWordSafeMaxScale(html, computedStyle, contentWidth) :
                FEATURE_TEXT_HARD_MAX_SCALE
            const effectiveMaxScale = Math.min(
                clamp(
                    Number(articleSettings.featureTextFitMaxScale) || defaultFitMaxScale,
                    0.4,
                    1.4
                ),
                wordSafeMaxScale
            )

            const nextScale = findBestFitScale({
                element: textMeasureElement,
                targetHeight: Math.max(1, targetHeight - FEATURE_TEXT_FIT_TOLERANCE),
                minScale: clamp(
                    Number(articleSettings.featureTextFitMinScale) || FEATURE_TEXT_DEFAULT_MIN_SCALE,
                    0.4,
                    1.2
                ),
                maxScale: effectiveMaxScale,
                baseFontSize,
                baseLineHeight
            })

            textMeasureElement.style.fontSize = ""
            textMeasureElement.style.lineHeight = ""

            const boundedScale = clamp(
                nextScale,
                Number(articleSettings.featureTextFitMinScale) || FEATURE_TEXT_DEFAULT_MIN_SCALE,
                effectiveMaxScale
            )

            setTextScale(currentScale => {
                return Math.abs(boundedScale - currentScale) < FEATURE_TEXT_SCALE_EPSILON ?
                    currentScale :
                    Math.round(boundedScale * 1000) / 1000
            })
        }

        const scheduleSync = (immediate = false) => {
            if (resizeTimeoutRef.current !== null) {
                clearTimeout(resizeTimeoutRef.current)
                resizeTimeoutRef.current = null
            }

            const flushSync = () => {
                resizeTimeoutRef.current = null

                if (resizeFrameRef.current !== null) {
                    cancelAnimationFrame(resizeFrameRef.current)
                }

                resizeFrameRef.current = requestAnimationFrame(syncTextScale)
            }

            if (immediate) {
                flushSync()
                return
            }

            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(resizeFrameRef.current)
                resizeFrameRef.current = null
            }

            resizeTimeoutRef.current = setTimeout(flushSync, FEATURE_TEXT_RESIZE_SETTLE_MS)
        }

        const resizeObserver = new ResizeObserver(() => {
            scheduleSync()
        })
        const handleViewportChange = () => scheduleSync(true)

        ;[itemRef.current, mediaRef.current].forEach(element => {
            if (element) resizeObserver.observe(element)
        })

        if (mobileMediaQuery.addEventListener) {
            mobileMediaQuery.addEventListener("change", handleViewportChange)
        } else {
            mobileMediaQuery.addListener(handleViewportChange)
        }

        scheduleSync(true)

        return () => {
            resizeObserver.disconnect()

            if (mobileMediaQuery.removeEventListener) {
                mobileMediaQuery.removeEventListener("change", handleViewportChange)
            } else {
                mobileMediaQuery.removeListener(handleViewportChange)
            }

            if (resizeFrameRef.current !== null) {
                cancelAnimationFrame(resizeFrameRef.current)
                resizeFrameRef.current = null
            }

            if (resizeTimeoutRef.current !== null) {
                clearTimeout(resizeTimeoutRef.current)
                resizeTimeoutRef.current = null
            }
        }
    }, [html, shouldFitTextToMediaHeight, isSquareFitLayout, articleSettings.featureTextFitMaxScale, articleSettings.featureTextFitMinScale, defaultFitMaxScale])

    const renderVisibleBody = () => {
        if (isAboutIntro) {
            return (
                <PretextInteractiveText html={buildLockedIntroHtml(html)}
                                        revealOnScroll={true}
                                        effectVariant={"gravitySweep"}
                                        pointerScopeSelector={".layout-content"}
                                        pointerScopeIgnoreX={true}
                                        gravityZoneMode={"above_inside_below"}
                                        typographyVersion={typographyVersion}/>
            )
        }

        if (isWritingIntro) {
            return (
                <PretextInteractiveText html={html}
                                        revealOnScroll={true}
                                        effectVariant={"wave"}
                                        terrainVariant={"detailed"}
                                        pointerScopeSelector={".layout-content"}
                                        pointerScopeIgnoreX={true}
                                        typographyVersion={typographyVersion}/>
            )
        }

        if (isConfiguredInteractiveItem) {
            return (
                <PretextInteractiveText html={html}
                                        revealOnScroll={true}
                                        effectVariant={"wave"}
                                        terrainVariant={"detailed"}
                                        pointerScopeSelector={".layout-content"}
                                        pointerScopeIgnoreX={true}
                                        typographyVersion={typographyVersion}/>
            )
        }

        return (
            <div dangerouslySetInnerHTML={{__html: html}}/>
        )
    }

    const itemClassName = [
        "article-feature-item",
        `article-feature-item-id-${itemWrapper.id}`,
        isHomeStyleIntro ? "article-feature-item-home-style-intro" : "",
        isManagedSplitLayout ? "article-feature-item-layout-managed" : "",
        isTextLedSplitLayout ? "article-feature-item-layout-text-led" : "",
        isFixedViewportImageLayout ? "article-feature-item-layout-fixed-vh-image" : "",
        isSquareFitLayout ? "article-feature-item-layout-square-fit" : "",
        (isManagedSplitLayout || isTextLedSplitLayout || isFixedViewportImageLayout || isSquareFitLayout) ? `article-feature-item-stack-${featureStackOrder}` : ""
    ].filter(Boolean).join(" ")

    return (
        <div ref={itemRef}
             className={itemClassName}>
            <div ref={mediaRef}
                 className={`article-feature-item-media`}>
                {itemWrapper.img ? (
                    <ImageView src={itemWrapper.img}
                               alt={itemWrapper.imageAlt}
                               className={`article-feature-item-image`}
                               style={imageStyle}
                               hideSpinner={true}/>
                ) : (
                    <div className={`article-feature-item-image article-feature-item-image-fallback`}
                         style={imageStyle}/>
                )}
            </div>

            <div className={`article-feature-item-content`}>
                {shouldFitTextToMediaHeight && !isTextLedSplitLayout && !isMobileView && (
                    <div ref={squareMeasureRef}
                         className={`article-feature-item-text-measure-square last-p-no-margin text-3`}
                         aria-hidden={true}>
                        <div dangerouslySetInnerHTML={{__html: html}}/>
                    </div>
                )}

                <div ref={shouldFitTextToMediaHeight ? squareContentRef : null}
                     className={`article-feature-item-text article-feature-item-text-adaptive last-p-no-margin text-3`}
                     style={shouldFitTextToMediaHeight && !isMobileView ? {
                         fontSize: `${textFontSize}px`,
                         lineHeight: `${textLineHeight}px`
                     } : undefined}>
                    {renderVisibleBody()}
                </div>
            </div>
        </div>
    )
}

function computeScaledFontSize(baseTypographyRef, textScale) {
    const baseFontSize = baseTypographyRef.current?.fontSize || 16
    return Math.max(10, baseFontSize * textScale)
}

function computeScaledLineHeight(baseTypographyRef, textScale) {
    const baseFontSize = baseTypographyRef.current?.fontSize || 16
    const baseLineHeight = baseTypographyRef.current?.lineHeight || baseFontSize * 1.55

    return Math.max(baseFontSize * textScale * 1.2, baseLineHeight * textScale)
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
    let highHeight = measureScaledTextHeight(
        element,
        high,
        baseFontSize,
        baseLineHeight
    )

    while (highHeight < targetHeight && high < FEATURE_TEXT_HARD_MAX_SCALE) {
        low = high
        best = high
        high = Math.min(FEATURE_TEXT_HARD_MAX_SCALE, high * 1.18)
        highHeight = measureScaledTextHeight(
            element,
            high,
            baseFontSize,
            baseLineHeight
        )
    }

    for (let step = 0; step < FEATURE_TEXT_FIT_SEARCH_STEPS; step += 1) {
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
    element.style.fontSize = `${Math.max(10, baseFontSize * scale)}px`
    element.style.lineHeight = `${Math.max(baseFontSize * scale * 1.2, baseLineHeight * scale)}px`
    return element.offsetHeight
}

function computeWordSafeMaxScale(html, computedStyle, availableWidth) {
    if (!availableWidth) return FEATURE_TEXT_HARD_MAX_SCALE

    const plainText = stripHtmlToText(html)
    const words = plainText.match(/[^\s]+/g) || []
    if (!words.length) return FEATURE_TEXT_HARD_MAX_SCALE

    const font = computedStyle.font || buildCanvasFont(computedStyle)
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    context.font = font

    const widestWord = words.reduce((maxWidth, word) => {
        return Math.max(maxWidth, context.measureText(word).width)
    }, 0)

    if (!widestWord) return FEATURE_TEXT_HARD_MAX_SCALE

    return Math.max(
        FEATURE_TEXT_DEFAULT_MIN_SCALE,
        (availableWidth * ABOUT_WORD_FIT_WIDTH_RATIO) / widestWord
    )
}

function stripHtmlToText(html) {
    const parser = new DOMParser()
    const documentNode = parser.parseFromString(`<div>${html || ""}</div>`, "text/html")
    return documentNode.body.textContent || ""
}

function buildLockedIntroHtml(html) {
    if (!html) return html

    return html.replace(/^\{\{(.*?)\}\}\s*/, (_match, prefix) => {
        return `<span class="pretext-lock">${prefix}</span> `
    })
}

function buildCanvasFont(style) {
    const fontStyle = style.fontStyle || "normal"
    const fontVariant = style.fontVariant || "normal"
    const fontWeight = style.fontWeight || "400"
    const fontStretch = style.fontStretch && style.fontStretch !== "normal" ? `${style.fontStretch} ` : ""
    const fontSize = style.fontSize || "16px"
    const fontFamily = style.fontFamily || "sans-serif"

    return `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch}${fontSize} ${fontFamily}`.trim()
}

function resolvePixelValue(value, fallback) {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

export default ArticleFeature
