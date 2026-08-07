import "./ArticleInlineList.scss"
import React, {useLayoutEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import Link from "../generic/Link.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useUtils} from "../../hooks/utils.js"

const ADAPTIVE_LABEL_MODES = ["full", "short", "icon"]
const HOME_CONTACT_FULL_SIDE_BUFFER_RATIO = 0.015
const HOME_CONTACT_FULL_SIDE_BUFFER_MIN = 0
const HOME_CONTACT_FULL_SIDE_BUFFER_MAX = 24
const HOME_CONTACT_SHORT_SIDE_BUFFER_RATIO = 0.045
const HOME_CONTACT_SHORT_SIDE_BUFFER_MIN = 14
const HOME_CONTACT_SHORT_SIDE_BUFFER_MAX = 38
const DEFAULT_HOME_CONTACT_LAYOUT = {
    mode: "full",
    sideBuffer: 0
}

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
    const [contactLayout, setContactLayout] = useState(DEFAULT_HOME_CONTACT_LAYOUT)

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
        viewport,
        isHomeContactBand: isAdaptiveHomeBand
    }))
    const labelSignature = itemModels
        .map(itemModel => `${itemModel.fullLabel}|${itemModel.shortLabel}|${itemModel.iconLabel}`)
        .join("||")

    const displayAsList = viewport.innerWidth < dataWrapper.settings.displayAsListIfWidthIsLowerThan
    const listClass = displayAsList ?
        `article-inline-list-items-column-mode` :
        ``
    const labelMode = isAdaptiveHomeBand ? contactLayout.mode : "full"

    useLayoutEffect(() => {
        if(!isAdaptiveHomeBand) {
            setContactLayout(DEFAULT_HOME_CONTACT_LAYOUT)
            return
        }

        const listElement = listRef.current
        if(!listElement || !itemModels.length) {
            setContactLayout(DEFAULT_HOME_CONTACT_LAYOUT)
            return
        }

        const syncLabelMode = () => {
            const computedStyles = window.getComputedStyle(listElement)
            const gap = parseFloat(computedStyles.columnGap || computedStyles.gap || 0)
            const listWidth = Math.round(listElement.clientWidth || listElement.getBoundingClientRect().width || 0)
            const slots = Math.max(1, itemModels.length)

            let nextLayout = getHomeContactModeLayout({
                mode: "icon",
                listWidth
            })

            for(const mode of ADAPTIVE_LABEL_MODES) {
                const widths = measureRefs.current[mode]
                    .slice(0, slots)
                    .map(element => Math.ceil(element?.offsetWidth || element?.getBoundingClientRect()?.width || 0))

                if(widths.length !== slots)
                    continue

                const totalContentWidth = widths.reduce((sum, width) => sum + width, 0)
                const totalGapWidth = gap * Math.max(0, widths.length - 1)
                const layout = getHomeContactModeLayout({
                    mode,
                    listWidth
                })
                const requiredWidth = totalContentWidth + totalGapWidth + (layout.sideBuffer * 2)

                if(requiredWidth <= listWidth + 1) {
                    nextLayout = layout
                    break
                }
            }

            setContactLayout(previousLayout => (
                previousLayout.mode === nextLayout.mode &&
                previousLayout.sideBuffer === nextLayout.sideBuffer
            ) ? previousLayout : nextLayout)
        }

        syncLabelMode()
        const delayedSyncId = window.setTimeout(syncLabelMode, 120)

        if(typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", syncLabelMode, { passive: true })
            return () => {
                window.clearTimeout(delayedSyncId)
                window.removeEventListener("resize", syncLabelMode)
            }
        }

        const resizeObserver = new ResizeObserver(syncLabelMode)
        resizeObserver.observe(listElement)

        return () => {
            window.clearTimeout(delayedSyncId)
            resizeObserver.disconnect()
        }
    }, [isAdaptiveHomeBand, itemModels.length, labelSignature, viewport.innerWidth])

    return (
        <>
            <ul className={`article-inline-list-items ${listClass}`.trim()}
                data-label-mode={labelMode}
                ref={listRef}
                style={isAdaptiveHomeBand ? {
                    "--home-contact-mode-side-buffer": `${contactLayout.sideBuffer}px`
                } : undefined}>
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
                <span className={`article-inline-list-item-control article-inline-list-item-measure-content`}>
                    <ArticleInlineListItemContent itemModel={itemModel}
                                                  label={label}/>
                </span> :
                <Link href={itemModel.href}
                      className={`article-inline-list-item-control`}
                      tooltip={itemModel.tooltip}
                      metadata={itemModel.metadata}
                      ariaLabel={itemModel.ariaLabel}>
                    <ArticleInlineListItemContent itemModel={itemModel}
                                                  label={label}/>
                </Link>}
        </li>
    )
}

/**
 * @param {ReturnType<typeof createInlineListItemModel>} itemModel
 * @param {String} label
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInlineListItemContent({ itemModel, label }) {
    return (
        <span className={`article-inline-list-item-pill`}>
            <i className={`article-inline-list-item-icon ${itemModel.iconClassName}`}
               style={itemModel.iconStyle}/>

            <span className={`article-inline-list-item-label`}
                  dangerouslySetInnerHTML={{ __html: label }}/>
        </span>
    )
}

export default ArticleInlineList

function createInlineListItemModel({ itemWrapper, language, utils, viewport, isHomeContactBand = false }) {
    const link = itemWrapper.link
    const isPhoneQrAction = link?.action === "phone_qr"
    const shouldDirectCall = isPhoneQrAction && utils.device.isTouchDevice() && viewport.isMobileLayout()
    const href = isPhoneQrAction && !shouldDirectCall ?
        `#phone-qr:open` :
        link?.href || null
    const defaultFullLabel = itemWrapper.locales.label || itemWrapper.label || itemWrapper.placeholder || ""
    const fullLabel = isHomeContactBand ?
        getHomeContactFullLabel({ label: defaultFullLabel, link }) :
        defaultFullLabel
    const shortLabel = getInlineListShortLabel({
        itemWrapper,
        link,
        language,
        isHomeContactBand,
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

function getInlineListShortLabel({ itemWrapper, link, language, isHomeContactBand, shouldDirectCall }) {
    const defaultLabel = itemWrapper.shortLabel || itemWrapper.locales.label || itemWrapper.label || itemWrapper.placeholder || ""

    if(isHomeContactBand && link?.action === "phone_qr")
        return "Call me"

    if(link?.action === "phone_qr")
        return language.getStringOrFallback("call_short", "Call")

    if(isHomeContactBand && link?.href?.startsWith("mailto:"))
        return "Email me"

    if(link?.href?.startsWith("mailto:"))
        return language.getStringOrFallback("email_short", "Email")

    if(isHomeContactBand && link?.href?.includes("linkedin.com"))
        return "My LinkedIn"

    if(link?.href?.includes("linkedin.com"))
        return language.getStringOrFallback("linkedin_short", "LinkedIn")

    return defaultLabel
}

function getHomeContactModeLayout({ mode, listWidth }) {
    if(mode === "full") {
        return {
            mode,
            sideBuffer: clampNumber(
                Math.round(listWidth * HOME_CONTACT_FULL_SIDE_BUFFER_RATIO),
                HOME_CONTACT_FULL_SIDE_BUFFER_MIN,
                HOME_CONTACT_FULL_SIDE_BUFFER_MAX
            )
        }
    }

    if(mode === "short") {
        return {
            mode,
            sideBuffer: clampNumber(
                Math.round(listWidth * HOME_CONTACT_SHORT_SIDE_BUFFER_RATIO),
                HOME_CONTACT_SHORT_SIDE_BUFFER_MIN,
                HOME_CONTACT_SHORT_SIDE_BUFFER_MAX
            )
        }
    }

    return {
        mode: "icon",
        sideBuffer: 0
    }
}

function getHomeContactFullLabel({ label, link }) {
    if(link?.href?.startsWith("mailto:"))
        return `Email ${label}`

    if(link?.action === "phone_qr")
        return `Tel. ${label}`

    if(link?.href?.includes("linkedin.com"))
        return `Personal ${label}`

    return label
}

function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function stripHtml(value) {
    return String(value || "").replace(/<[^>]*>/g, "").trim()
}
