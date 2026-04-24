import "./ArticleInfoList.scss"
import React, {useEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import Link from "../generic/Link.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import CopyButton from "../buttons/CopyButton.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInfoList({ dataWrapper }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const isHomeInfoList = dataWrapper.sectionId === "about"
    const isContactInfoList = dataWrapper.sectionId === "contact"
    const homeClass = isHomeInfoList ? `article-info-list-home` : ``
    const contactClass = isContactInfoList ? `article-info-list-contact` : ``

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-info-list ${homeClass} ${contactClass}`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleInfoListItems dataWrapper={dataWrapper}
                                  isHomeInfoList={isHomeInfoList}
                                  isContactInfoList={isContactInfoList}
                                  selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @param {Boolean} isContactInfoList
 * @return {JSX.Element}
 * @constructor
 */
function ArticleInfoListItems({ dataWrapper, selectedItemCategoryId, isHomeInfoList, isContactInfoList }) {
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

        if(isContactInfoList)
            return

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
    }, [dataWrapper?.id, viewport.innerWidth, isHomeInfoList, isContactInfoList])

    return (
        <div className={`article-info-list-items ${shrinkClass} ${homeClass}`}
             id={dataWrapper.uniqueId}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleInfoListItem itemWrapper={itemWrapper}
                                     isHomeInfoList={isHomeInfoList}
                                     isContactInfoList={isContactInfoList}
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
function ArticleInfoListItem({ itemWrapper, isHomeInfoList, isContactInfoList }) {
    const [linkHovered, setLinkHovered] = useState(false)
    const [isPressed, setIsPressed] = useState(false)
    const [isBubbleOpen, setIsBubbleOpen] = useState(false)
    const [isBubblePinned, setIsBubblePinned] = useState(false)
    const bubbleRef = useRef(null)
    const bubbleToggleRef = useRef(null)

    const hoverClass = linkHovered ?
        `article-info-list-item-hovered` :
        ``
    const homeClass = isHomeInfoList ? `article-info-list-item-home` : ``
    const pressedClass = isPressed ? `article-info-list-item-pressed` : ``
    const bubbleClass = isBubbleOpen ? `article-info-list-item-avatar-bubble-open` : ``

    const baseTextSize = isHomeInfoList
        ? (itemWrapper.locales.text ? 1 : 2)
        : (itemWrapper.locales.text ? 3 : 4)
    const titleClass = `text-${baseTextSize + 1}`
    const textClass = `text-${baseTextSize}`

    const copyValue = (itemWrapper.label || itemWrapper.locales.text || itemWrapper.locales.title || "").trim()
    const titleMarkup = itemWrapper.locales.title || itemWrapper.placeholder
    const proofBubbleMarkup = itemWrapper.locales.proofBubble || null
    const hasProofBubble = Boolean(isHomeInfoList && proofBubbleMarkup)

    useEffect(() => {
        if (!hasProofBubble || !isBubblePinned)
            return

        const handlePointerDown = (event) => {
            const target = event.target

            if (bubbleRef.current?.contains(target) || bubbleToggleRef.current?.contains(target))
                return

            setIsBubblePinned(false)
            setIsBubbleOpen(false)
        }

        const handleKeyDown = (event) => {
            if (event.key !== "Escape")
                return

            setIsBubblePinned(false)
            setIsBubbleOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [hasProofBubble, isBubblePinned])

    const handleBubbleMouseEnter = () => {
        setLinkHovered(true)

        if (!hasProofBubble)
            return

        setIsBubbleOpen(true)
    }

    const handleBubbleMouseLeave = () => {
        setLinkHovered(false)

        if (!hasProofBubble || isBubblePinned)
            return

        setIsBubbleOpen(false)
    }

    const handleBubbleToggle = (event) => {
        if (!hasProofBubble)
            return

        event.preventDefault()
        event.stopPropagation()

        setIsBubblePinned((currentState) => {
            const nextState = !currentState
            setIsBubbleOpen(nextState)
            return nextState
        })
    }

    return (
        <div className={`article-info-list-item ${hoverClass} ${pressedClass} ${homeClass}`}>
            <div className={`article-info-list-item-avatar-shell ${bubbleClass}`}
                 onMouseEnter={handleBubbleMouseEnter}
                 onMouseLeave={handleBubbleMouseLeave}>
                {itemWrapper.link?.href ? (
                    <Link href={itemWrapper.link?.href || null}
                          tooltip={itemWrapper.link?.tooltip}
                          metadata={itemWrapper.link?.metadata}
                          className={`article-info-list-item-avatar-link`}
                          onPointerDown={() => setIsPressed(true)}
                          onPointerUp={() => setIsPressed(false)}
                          onPointerCancel={() => setIsPressed(false)}
                          onMouseDown={() => setIsPressed(true)}
                          onMouseUp={() => setIsPressed(false)}
                          onClick={() => setIsPressed(false)}
                          onHoverStatus={setLinkHovered}>
                        <AvatarView src={itemWrapper.img}
                                    faIcon={itemWrapper.faIconWithFallback}
                                    style={itemWrapper.faIconStyle}
                                    alt={itemWrapper.imageAlt}
                                    className={`article-info-list-item-avatar`}/>
                    </Link>
                ) : hasProofBubble ? (
                    <button type="button"
                            className={`article-info-list-item-avatar-button`}
                            aria-expanded={isBubbleOpen}
                            aria-label={`Show proof of work for ${itemWrapper.locales.title || itemWrapper.placeholder}`}
                            onClick={handleBubbleToggle}
                            ref={bubbleToggleRef}>
                        <AvatarView src={itemWrapper.img}
                                    faIcon={itemWrapper.faIconWithFallback}
                                    style={itemWrapper.faIconStyle}
                                    alt={itemWrapper.imageAlt}
                                    className={`article-info-list-item-avatar`}/>
                    </button>
                ) : (
                    <AvatarView src={itemWrapper.img}
                                faIcon={itemWrapper.faIconWithFallback}
                                style={itemWrapper.faIconStyle}
                                alt={itemWrapper.imageAlt}
                                className={`article-info-list-item-avatar`}/>
                )}

            </div>

            <div className={`article-info-list-item-content ${homeClass}`}>
                <div className={`article-info-list-item-info-title ${titleClass}`}>
                    {renderInfoListTitle(titleMarkup)}
                </div>

                <div className={`article-info-list-item-info-body`}>
                    {hasProofBubble && (
                        <div className={`article-info-list-item-text-bubble ${bubbleClass}`}
                             role="note"
                             aria-hidden={!isBubbleOpen}
                             ref={bubbleRef}>
                            <div className={`article-info-list-item-text-bubble-inner`}
                                 dangerouslySetInnerHTML={{__html: proofBubbleMarkup}}/>
                        </div>
                    )}

                    {isContactInfoList ? (
                        <div className={`article-info-list-item-info-text ${textClass}`}>
                            <span dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>

                            {itemWrapper.copyToClipboardButton && copyValue && (
                                <CopyButton text={copyValue}
                                            label={copyValue}
                                            variant={`inline`}
                                            buttonClassName={`article-info-list-item-inline-copy`}/>
                            )}
                        </div>
                    ) : (
                        <>
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
                                <CopyButton text={(itemWrapper.label || itemWrapper.locales.label || itemWrapper.locales.text || "").trim()}
                                            buttonClassName={`ms-2 ps-1`}/>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

function renderInfoListTitle(titleMarkup) {
    const title = `${titleMarkup || ``}`.replace(/&amp;/g, `&`).trim()

    if (!title.includes(`&`)) {
        return <span dangerouslySetInnerHTML={{__html: title}} />
    }

    const [leftSide, ...rest] = title.split(`&`)
    const rightSide = rest.join(`&`).trim()
    const mainSide = leftSide.trim()

    return (
        <span className={`article-info-list-item-info-title-split`}>
            <span className={`article-info-list-item-info-title-main`}
                  dangerouslySetInnerHTML={{__html: mainSide}}/>

            <span className={`article-info-list-item-info-title-ampersand`} aria-hidden="true">&amp;</span>

            <span className={`article-info-list-item-info-title-rest`}
                  dangerouslySetInnerHTML={{__html: rightSide}}/>
        </span>
    )
}

export default ArticleInfoList
