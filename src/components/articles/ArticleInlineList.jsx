import "./ArticleInlineList.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import Link from "../generic/Link.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useUtils} from "../../hooks/utils.js"

const ADAPTIVE_LABEL_MODES = ["full", "short", "icon"]

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInlineList({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_SMALL}
                 dataWrapper={dataWrapper}
                 className={`article-inline-list`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleInlineListItems dataWrapper={dataWrapper}
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
function ArticleInlineListItems({ dataWrapper, selectedItemCategoryId }) {
    const viewport = useViewport()
    const language = useLanguage()
    const utils = useUtils()
    const listRef = useRef(null)
    const measureRefs = useRef({
        full: [],
        short: [],
        icon: []
    })
    const [labelMode, setLabelMode] = useState("full")

    const responsiveMaxItems = viewport.getValueFromBreakpointHash({
        xxl: 5,
        xl: 4,
        md: 3,
        sm: 2,
        default: 2
    })
    const maxItems = Number.isFinite(Number(dataWrapper.settings.inlineListMaxItems)) ?
        Number(dataWrapper.settings.inlineListMaxItems) :
        responsiveMaxItems

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const slicedItems = filteredItems.slice(0, maxItems)
    const isAdaptiveHomeBand = dataWrapper.uniqueId === "article-1-section-about"
    const itemModels = slicedItems.map(itemWrapper => createInlineListItemModel({
        itemWrapper,
        language,
        utils,
        viewport
    }))
    const labelSignature = itemModels
        .map(itemModel => `${itemModel.fullLabel}|${itemModel.shortLabel}|${itemModel.iconLabel}`)
        .join("||")

    const displayAsList = viewport.innerWidth < dataWrapper.settings.displayAsListIfWidthIsLowerThan
    const listClass = displayAsList ?
        `article-inline-list-items-column-mode` :
        ``

    useLayoutEffect(() => {
        if(!isAdaptiveHomeBand) {
            setLabelMode("full")
            return
        }

        const listElement = listRef.current
        if(!listElement || !itemModels.length) {
            setLabelMode("full")
            return
        }

        const syncLabelMode = () => {
            const computedStyles = window.getComputedStyle(listElement)
            const gap = parseFloat(computedStyles.columnGap || computedStyles.gap || 0)
            const listWidth = Math.round(listElement.getBoundingClientRect().width || 0)
            const slots = Math.max(1, itemModels.length)
            const shortSideBuffer = parseFloat(computedStyles.getPropertyValue(`--home-contact-short-side-buffer`)) || 0
            const isSmallViewport = window.matchMedia(`(max-width: 575.98px)`).matches

            let nextMode = "icon"
            for(const mode of ADAPTIVE_LABEL_MODES) {
                const widths = measureRefs.current[mode]
                    .slice(0, slots)
                    .map(element => Math.ceil(element?.getBoundingClientRect()?.width || 0))

                if(widths.length !== slots)
                    continue

                const totalContentWidth = widths.reduce((sum, width) => sum + width, 0)
                const totalGapWidth = gap * Math.max(0, widths.length - 1)
                const outerBufferWidth = mode === "short" && isSmallViewport ?
                    shortSideBuffer * 2 :
                    0
                const requiredWidth = totalContentWidth + totalGapWidth + outerBufferWidth

                if(requiredWidth <= listWidth + 1) {
                    nextMode = mode
                    break
                }
            }

            setLabelMode(previousMode => previousMode === nextMode ? previousMode : nextMode)
        }

        syncLabelMode()

        if(typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", syncLabelMode, { passive: true })
            return () => window.removeEventListener("resize", syncLabelMode)
        }

        const resizeObserver = new ResizeObserver(syncLabelMode)
        resizeObserver.observe(listElement)

        return () => resizeObserver.disconnect()
    }, [isAdaptiveHomeBand, itemModels.length, labelSignature, viewport.innerWidth])

    return (
        <>
            <ul className={`article-inline-list-items ${listClass}`.trim()}
                data-label-mode={labelMode}
                ref={listRef}>
                {itemModels.map((itemModel, key) => (
                    <ArticleInlineListItem itemModel={itemModel}
                                           key={key}
                                           labelMode={labelMode}/>
                ))}
            </ul>

            {isAdaptiveHomeBand && (
                <div aria-hidden={true}
                     className={`article-inline-list-fit-measure`}>
                    {ADAPTIVE_LABEL_MODES.map(mode => (
                        <ul className={`article-inline-list-items article-inline-list-items-fit-measure`}
                            data-label-mode={mode}
                            key={mode}>
                            {itemModels.map((itemModel, index) => (
                                <ArticleInlineListItem itemModel={itemModel}
                                                       key={`${mode}-${index}`}
                                                       labelMode={mode}
                                                       measureOnly={true}
                                                       measureRef={element => {
                                                           measureRefs.current[mode][index] = element
                                                       }}/>
                            ))}
                        </ul>
                    ))}
                </div>
            )}
        </>
    )
}

/**
 * @param {ReturnType<typeof createInlineListItemModel>} itemModel
 * @param {"full"|"short"|"icon"} labelMode
 * @param {Boolean} measureOnly
 * @param {Function|null} measureRef
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInlineListItem({ itemModel, labelMode, measureOnly = false, measureRef = null }) {
    const label = itemModel[`${labelMode}Label`]

    return (
        <li className={`article-inline-list-item text-4`}
            data-fit-measure={measureOnly ? `true` : `false`}
            data-label-mode={labelMode}
            ref={measureRef}>
            {measureOnly ?
                <span className={`article-inline-list-item-measure-content`}>
                    <i className={`article-inline-list-item-icon ${itemModel.iconClassName}`}
                       style={itemModel.iconStyle}/>

                    <span className={`article-inline-list-item-label`}
                          dangerouslySetInnerHTML={{ __html: label }}/>
                </span> :
                <Link href={itemModel.href}
                      tooltip={itemModel.tooltip}
                      metadata={itemModel.metadata}
                      ariaLabel={itemModel.ariaLabel}>
                    <i className={`article-inline-list-item-icon ${itemModel.iconClassName}`}
                       style={itemModel.iconStyle}/>

                    <span className={`article-inline-list-item-label`}
                          dangerouslySetInnerHTML={{ __html: label }}/>
                </Link>}
        </li>
    )
}

export default ArticleInlineList

function createInlineListItemModel({ itemWrapper, language, utils, viewport }) {
    const link = itemWrapper.link
    const isPhoneQrAction = link?.action === "phone_qr"
    const shouldDirectCall = isPhoneQrAction && utils.device.isTouchDevice() && viewport.isMobileLayout()
    const href = isPhoneQrAction && !shouldDirectCall ?
        `#phone-qr:open` :
        link?.href || null
    const fullLabel = itemWrapper.locales.label || itemWrapper.label || itemWrapper.placeholder || ""
    const shortLabel = getInlineListShortLabel({
        itemWrapper,
        link,
        language,
        shouldDirectCall
    })

    return {
        ariaLabel: stripHtml(fullLabel || shortLabel),
        fullLabel,
        shortLabel,
        iconLabel: "",
        href,
        iconClassName: itemWrapper.faIconWithFallback,
        iconStyle: itemWrapper.faIconStyle,
        metadata: link?.metadata,
        tooltip: link?.tooltip
    }
}

function getInlineListShortLabel({ itemWrapper, link, language, shouldDirectCall }) {
    const defaultLabel = itemWrapper.shortLabel || itemWrapper.locales.label || itemWrapper.label || itemWrapper.placeholder || ""

    if(link?.action === "phone_qr")
        return language.getStringOrFallback("call_short", "Call")

    if(link?.href?.startsWith("mailto:"))
        return language.getStringOrFallback("email_short", "Email")

    if(link?.href?.includes("linkedin.com"))
        return language.getStringOrFallback("linkedin_short", "LinkedIn")

    return defaultLabel
}

function stripHtml(value) {
    return String(value || "").replace(/<[^>]*>/g, "").trim()
}
