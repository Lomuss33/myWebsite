import "./ArticleInfoList.scss"
import React, {useEffect, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import Link from "../generic/Link.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import CopyButton from "../buttons/CopyButton.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInfoList({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const isHomeInfoList = dataWrapper.sectionId === "about"
    const homeClass = isHomeInfoList ? `article-info-list-home` : ``

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-info-list ${homeClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleInfoListItems dataWrapper={dataWrapper}
                                  isHomeInfoList={isHomeInfoList}
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
function ArticleInfoListItems({ dataWrapper, selectedItemCategoryId, isHomeInfoList }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    const id = dataWrapper.uniqueId
    const shrinkClass = filteredItems.find(itemWrapper => itemWrapper.locales.text) ?
        `` :
        `article-info-list-items-shrink`
    const homeClass = isHomeInfoList ? `article-info-list-items-home` : ``

    const viewport = useViewport()

    useEffect(() => {
        const containerEl = document.getElementById(id)
        const itemDivs = containerEl?.querySelectorAll(`.article-info-list-item`) || []
        const maxEqualizedHeight = isHomeInfoList ? 105 : 120

        if(!itemDivs.length)
            return

        itemDivs.forEach(div => {
            div.style.height = 'auto'
            div.style.minHeight = '0px'
        })

        let maxHeight = 0
        itemDivs.forEach(div => {
            const height = div.offsetHeight
            if (height > maxHeight) maxHeight = height
        })

        if(maxHeight < maxEqualizedHeight) {
            itemDivs.forEach(div => {
                div.style.minHeight = `${maxHeight}px`
            })
        }
    }, [dataWrapper?.id, viewport.innerWidth, isHomeInfoList])

    return (
        <div className={`article-info-list-items ${shrinkClass} ${homeClass}`}
             id={id}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleInfoListItem itemWrapper={itemWrapper}
                                     isHomeInfoList={isHomeInfoList}
                                     key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInfoListItem({ itemWrapper, isHomeInfoList }) {
    const [linkHovered, setLinkHovered] = useState(false)

    const hoverClass = linkHovered ?
        `article-info-list-item-hovered` :
        ``
    const homeClass = isHomeInfoList ? `article-info-list-item-home` : ``

    const baseTextSize = itemWrapper.locales.text ? 3 : 4
    const titleClass = `text-${baseTextSize + 1}`
    const textClass = `text-${baseTextSize}`

    return (
        <div className={`article-info-list-item ${hoverClass} ${homeClass}`}>
            {itemWrapper.link?.href ? (
                <Link href={itemWrapper.link?.href || null}
                      tooltip={itemWrapper.link?.tooltip}
                      metadata={itemWrapper.link?.metadata}
                      className={`article-info-list-item-avatar-link`}
                      onHoverStatus={setLinkHovered}>
                    <AvatarView src={itemWrapper.img}
                                faIcon={itemWrapper.faIconWithFallback}
                                style={itemWrapper.faIconStyle}
                                alt={itemWrapper.imageAlt}
                                className={`article-info-list-item-avatar`}/>
                </Link>
            ) : (
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-info-list-item-avatar`}/>
            )}

            <div className={`article-info-list-item-content ${homeClass}`}>
                <div className={`article-info-list-item-info-title ${titleClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                <div className={`article-info-list-item-info-body`}>
                    <div className={`article-info-list-item-info-text ${textClass}`}
                         dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>

                    {itemWrapper.link?.href && (
                        <Link href={itemWrapper.link?.href || null}
                              tooltip={itemWrapper.link?.tooltip}
                              metadata={itemWrapper.link?.metadata}
                              className={`${textClass} text-3 article-info-list-item-info-link d-inline`}
                              onHoverStatus={setLinkHovered}>
                            <span className={`article-inline-list-item-label`}
                                  dangerouslySetInnerHTML={{__html: itemWrapper.locales.label || itemWrapper.label || itemWrapper.locales.title}}/>
                        </Link>
                    )}

                    {itemWrapper.copyToClipboardButton && (
                        <CopyButton text={itemWrapper.locales.label || itemWrapper.label || itemWrapper.locales.text}
                                    buttonClassName={`ms-2 ps-1`}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArticleInfoList
