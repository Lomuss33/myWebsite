import "./ArticleInlineList.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import Link from "../generic/Link.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useUtils} from "../../hooks/utils.js"

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
function ArticleInlineListItems({ dataWrapper, selectedItemCategoryId}) {
    const viewport = useViewport()

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

    const displayAsList = viewport.innerWidth < dataWrapper.settings.displayAsListIfWidthIsLowerThan
    const listClass = displayAsList ?
        `article-inline-list-items-column-mode` :
        ``

    return (
        <ul className={`article-inline-list-items ${listClass}`}>
            {slicedItems.map((itemWrapper, key) => (
                <ArticleInlineListItem itemWrapper={itemWrapper}
                                       key={key}/>
            ))}
        </ul>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInlineListItem({ itemWrapper }) {
    const viewport = useViewport()
    const language = useLanguage()
    const utils = useUtils()

    const link = itemWrapper.link
    const isPhoneQrAction = link?.action === "phone_qr"
    const shouldDirectCall = isPhoneQrAction && utils.device.isTouchDevice() && viewport.isMobileLayout()
    const href = isPhoneQrAction && !shouldDirectCall ?
        `#phone-qr:open` :
        link?.href || null
    const label = getInlineListItemLabel({
        itemWrapper,
        link,
        language,
        innerWidth: viewport.innerWidth,
        shouldDirectCall
    })
    const ariaLabel = stripHtml(label)

    return (
        <li className={`article-inline-list-item text-4`}>
            <Link href={href}
                  tooltip={link?.tooltip}
                  metadata={link?.metadata}
                  ariaLabel={ariaLabel}>
                <i className={`article-inline-list-item-icon ${itemWrapper.faIconWithFallback}`}
                   style={itemWrapper.faIconStyle}/>

                <span className={`article-inline-list-item-label`}
                      dangerouslySetInnerHTML={{__html: label}}/>
            </Link>
        </li>
    )
}

export default ArticleInlineList

function getInlineListItemLabel({ itemWrapper, link, language, innerWidth, shouldDirectCall }) {
    const defaultLabel = itemWrapper.locales.label || itemWrapper.label || itemWrapper.placeholder
    const isCompactMobile = innerWidth <= 640

    if(!isCompactMobile)
        return defaultLabel

    if(link?.action === "phone_qr")
        return shouldDirectCall ?
            language.getStringOrFallback("call_short", "Call") :
            language.getStringOrFallback("scan_short", "Scan")

    if(link?.href?.startsWith("mailto:"))
        return language.getStringOrFallback("email_short", "Email")

    if(link?.href?.includes("linkedin.com"))
        return "LinkedIn"

    return itemWrapper.shortLabel || defaultLabel
}

function stripHtml(value) {
    return String(value || "").replace(/<[^>]*>/g, "").trim()
}
