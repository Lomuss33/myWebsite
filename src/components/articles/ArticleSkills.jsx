import "./ArticleSkills.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import Article from "./base/Article.jsx"
import {useUtils} from "../../hooks/utils.js"
import Collapsable from "../capabilities/Collapsable.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useConstants} from "../../hooks/constants.js"
import AvatarView from "../generic/AvatarView.jsx"
import NumberAnimation from "../generic/NumberAnimation.jsx"
import IllustratedManuscript from "../generic/IllustratedManuscript.jsx"

const isEducationLanguagePopupCard = (itemWrapper, utils) => {
    return itemWrapper.articleWrapper.sectionId === "education" &&
        itemWrapper.articleWrapper.settings.avatarImageMode === "flag" &&
        utils.number.isValidNumber(itemWrapper.percentage)
}

const resolveEducationLanguagePopupRows = (itemWrapper) => {
    if(Array.isArray(itemWrapper.locales.list) && itemWrapper.locales.list.length > 0)
        return itemWrapper.locales.list

    if(itemWrapper.locales.text)
        return [itemWrapper.locales.text]

    return []
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkills({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const articleClassName = `article-skills article-skills-${dataWrapper.uniqueId}`

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={articleClassName}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleSkillsItems dataWrapper={dataWrapper}
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
function ArticleSkillsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const utils = useUtils()
    const viewport = useViewport()

    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const embedPosition = dataWrapper.settings.featureEmbedPosition === "before_items" ?
        "before_items" :
        "after_items"
    const manuscriptSourceItem = dataWrapper.settings.featureEmbedSourceItemId ?
        filteredItems.find(item => item.id === dataWrapper.settings.featureEmbedSourceItemId) || filteredItems[0] :
        filteredItems[0]
    const shouldRenderEmbeddedFeature =
        dataWrapper.settings.featureEmbed === "illustrated_manuscript" &&
        Boolean(manuscriptSourceItem)
    const renderedItems = filteredItems.filter(itemWrapper => {
        if (!shouldRenderEmbeddedFeature) return true
        if (!dataWrapper.settings.featureEmbedHideSourceItem) return true

        return itemWrapper !== manuscriptSourceItem
    })
    const customBreakpoint = viewport.getCustomBreakpoint(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES)
    const customBreakpointId = customBreakpoint?.id
    const customBreakpointRowThreshold = customBreakpoint?.slidesPerView || 1

    const maxItemsPerRow = utils.number.clamp(dataWrapper.settings.maxItemsPerRow, 1, customBreakpointRowThreshold)
    const maxRowsCollapseThreshold = dataWrapper.settings.maxRowsCollapseThreshold

    const itemsPerRowClass = `article-skills-items-${Math.min(customBreakpointRowThreshold, maxItemsPerRow)}-per-row`

    const initialVisibleItemsCount = maxRowsCollapseThreshold ?
        maxItemsPerRow * maxRowsCollapseThreshold :
        renderedItems.length
    const sectionClass = dataWrapper.sectionId ?
        `article-skills-items-section-${dataWrapper.sectionId}` :
        ``

    const renderEmbeddedFeature = () => {
        if (!shouldRenderEmbeddedFeature) {
            return null
        }

        return (
            <div className={`article-skills-embed article-skills-embed-illustrated-manuscript`}>
                <IllustratedManuscript storyHtml={manuscriptSourceItem?.locales?.text || ""}
                                       imageSrc={manuscriptSourceItem?.img || null}
                                       imageAlt={manuscriptSourceItem?.imageAlt || ""}/>
            </div>
        )
    }

    const renderSkillItem = (itemWrapper, key) => (
        <ArticleSkillsItem itemWrapper={itemWrapper}
                           key={key}/>
    )

    const renderResponsiveBalancedColumns = () => {
        const columns = viewport.innerWidth >= 1050 ? 2 : 1
        const columnItems = Array.from({ length: columns }, () => [])

        renderedItems.forEach((itemWrapper, index) => {
            columnItems[index % columns].push(itemWrapper)
        })

        return (
            <div className={`article-skills-columns article-skills-columns-${columns}`}>
                {embedPosition === "before_items" && renderEmbeddedFeature()}

                {columnItems.map((items, columnIndex) => (
                    <div className={`article-skills-column`}
                         key={`column-${columnIndex}`}>
                        {items.map((itemWrapper, itemIndex) => renderSkillItem(itemWrapper, `${columnIndex}-${itemIndex}`))}
                    </div>
                ))}

                {embedPosition === "after_items" && renderEmbeddedFeature()}
            </div>
        )
    }

    if (dataWrapper.settings.columnLayout === "responsive_balanced_two") {
        return renderResponsiveBalancedColumns()
    }

    if (shouldRenderEmbeddedFeature && renderedItems.length === 0) {
        return (
            <div className={`article-skills-items ${itemsPerRowClass} ${sectionClass}`.trim()}>
                {renderEmbeddedFeature()}
            </div>
        )
    }

    return (
        <Collapsable className={`article-skills-items ${itemsPerRowClass} ${sectionClass}`.trim()}
                     id={dataWrapper.uniqueId}
                     breakpointId={customBreakpointId}
                     initialVisibleItems={initialVisibleItemsCount}>
            {embedPosition === "before_items" && renderEmbeddedFeature()}

            {renderedItems.map((itemWrapper, key) => renderSkillItem(itemWrapper, key))}

            {embedPosition === "after_items" && renderEmbeddedFeature()}
        </Collapsable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItem({ itemWrapper }) {
    const utils = useUtils()
    const viewport = useViewport()
    const avatarClasses = []
    const avatarStyle = {
        ...(itemWrapper.faIconStyle || {}),
        "--article-skills-avatar-image-scale": itemWrapper.avatarImageScale || 1
    }
    const isEducationLanguageCard = isEducationLanguagePopupCard(itemWrapper, utils)
    const popupRows = isEducationLanguageCard ? resolveEducationLanguagePopupRows(itemWrapper) : []
    const isPopupEnabled = popupRows.length > 0
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [isPopupPinned, setIsPopupPinned] = useState(false)
    const popupRef = useRef(null)
    const popupToggleRef = useRef(null)
    const popupInnerRef = useRef(null)
    const popupCopyRef = useRef(null)
    const [popupExpandedHeight, setPopupExpandedHeight] = useState(0)
    const popupClass = isPopupOpen ? `article-skills-item-popup-open` : ``
    const usesExpandablePopupLayout = isEducationLanguageCard

    if (itemWrapper.articleWrapper.settings.roundIcons) {
        avatarClasses.push(`article-skills-item-avatar-round`)
    }

    if (itemWrapper.articleWrapper.settings.avatarImageMode) {
        avatarClasses.push(`article-skills-item-avatar-mode-${itemWrapper.articleWrapper.settings.avatarImageMode}`)
    }

    useEffect(() => {
        if(!isPopupOpen)
            setPopupExpandedHeight(0)
    }, [isPopupOpen])

    useLayoutEffect(() => {
        if(!isPopupEnabled || !isPopupOpen)
            return

        let frameId = 0

        const measurePopupHeight = () => {
            const popupInnerEl = popupInnerRef.current
            const popupCopyEl = popupCopyRef.current
            if(!popupInnerEl || !popupCopyEl)
                return

            const innerStyles = window.getComputedStyle(popupInnerEl)
            const innerVerticalInsets = [
                innerStyles.paddingTop,
                innerStyles.paddingBottom,
                innerStyles.borderTopWidth,
                innerStyles.borderBottomWidth
            ].reduce((total, value) => total + parseFloat(value || 0), 0)
            const nextExpandedHeight = Math.ceil(popupCopyEl.getBoundingClientRect().height + innerVerticalInsets)
            setPopupExpandedHeight(currentHeight => currentHeight === nextExpandedHeight ? currentHeight : nextExpandedHeight)
        }

        frameId = window.requestAnimationFrame(measurePopupHeight)

        return () => {
            window.cancelAnimationFrame(frameId)
        }
    }, [isPopupEnabled, isPopupOpen, popupRows, viewport.innerWidth])

    useEffect(() => {
        if(!isPopupEnabled || !isPopupPinned)
            return

        const handlePointerDown = (event) => {
            const target = event.target

            if(popupRef.current?.contains(target) || popupToggleRef.current?.contains(target))
                return

            setIsPopupPinned(false)
            setIsPopupOpen(false)
        }

        const handleKeyDown = (event) => {
            if(event.key !== "Escape")
                return

            setIsPopupPinned(false)
            setIsPopupOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isPopupEnabled, isPopupPinned])

    const handlePopupMouseEnter = () => {
        if(!isPopupEnabled)
            return

        setIsPopupOpen(true)
    }

    const handlePopupMouseLeave = () => {
        if(!isPopupEnabled || isPopupPinned)
            return

        setIsPopupOpen(false)
    }

    const handlePopupToggle = (event) => {
        if(!isPopupEnabled)
            return

        event.preventDefault()
        event.stopPropagation()

        setIsPopupPinned((currentState) => {
            const nextState = !currentState
            setIsPopupOpen(nextState)
            return nextState
        })
    }

    const avatar = (
        <AvatarView src={itemWrapper.img}
                    faIcon={itemWrapper.faIconWithFallback}
                    iconText={itemWrapper.iconText}
                    style={avatarStyle}
                    alt={itemWrapper.imageAlt}
                    className={`article-skills-item-avatar ${avatarClasses.join(` `)}`.trim()}/>
    )

    return (
        <div className={`article-skills-item ${isEducationLanguageCard ? `article-skills-item-education-language` : ``} ${popupClass}`.trim()}
             onMouseLeave={handlePopupMouseLeave}>
            <div className={`article-skills-item-avatar-wrapper`}>
                {isPopupEnabled ? (
                    <div className={`article-skills-item-popup-trigger-shell ${popupClass}`.trim()}>
                        <button type="button"
                                className={`article-skills-item-popup-trigger`}
                                aria-expanded={isPopupOpen}
                                aria-label={`Show more phrases for ${itemWrapper.locales.title || itemWrapper.placeholder}`}
                                onMouseEnter={handlePopupMouseEnter}
                                onFocus={handlePopupMouseEnter}
                                onClick={handlePopupToggle}
                                ref={popupToggleRef}>
                            {avatar}
                        </button>
                    </div>
                ) : avatar}
            </div>

            <ArticleSkillsItemInfo itemWrapper={itemWrapper}
                                   isEducationLanguageCard={isEducationLanguageCard}
                                   isPopupOpen={isPopupOpen}
                                   isPopupEnabled={isPopupEnabled}
                                   usesExpandablePopupLayout={usesExpandablePopupLayout}
                                   popupExpandedHeight={popupExpandedHeight}
                                   popupRows={popupRows}
                                   popupRef={popupRef}
                                   popupInnerRef={popupInnerRef}
                                   popupCopyRef={popupCopyRef}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItemInfo({
    itemWrapper,
    isEducationLanguageCard = false,
    isPopupOpen = false,
    isPopupEnabled = false,
    usesExpandablePopupLayout = false,
    popupExpandedHeight = 0,
    popupRows = [],
    popupRef,
    popupInnerRef,
    popupCopyRef
}) {
    const utils = useUtils()

    const percentage = itemWrapper.percentage
    const shouldShowItemNumbers = Boolean(itemWrapper.articleWrapper.settings.showItemNumbers) || Boolean(itemWrapper.label)
    const titlePrefix = shouldShowItemNumbers ? `${itemWrapper.id}.` : null
    const titleMeta = itemWrapper.label
    const initialPercentage = 0

    const [animationPercentage, setAnimationPercentage] = useState(initialPercentage)

    const level = itemWrapper.locales.level
    const description = itemWrapper.locales.text
    const experienceTime = itemWrapper.dateStartDisplayAsExperienceTime

    const hasPercentage = utils.number.isValidNumber(percentage)

    const progressStyle = {
        width: `${utils.string.toDisplayPercentage(animationPercentage)}`,
        opacity: hasPercentage ? 0.25 + Math.max(percentage, 0)/75 : 0
    }

    let descriptionClass = `text-3`
    if(hasPercentage) descriptionClass = `text-2`
    if(!experienceTime) descriptionClass += ` mt-1`

    useEffect(() => {
        setAnimationPercentage(percentage)
    }, [percentage])

    const defaultBodyContent = (
        <>
            {hasPercentage && (
                <div className="article-skills-item-progress progress">
                    <div className="progress-bar"
                         role="progressbar"
                         aria-valuenow={animationPercentage}
                         aria-valuemin={0}
                         aria-valuemax={100}
                         style={progressStyle}/>
                </div>
            )}

            {experienceTime && (
                <div className={`article-skills-item-experience text-2`}>
                    <span dangerouslySetInnerHTML={{__html: experienceTime}}/>
                </div>
            )}

            {description && (
                <div className={`article-skills-item-description ${descriptionClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
            )}
        </>
    )

    const popupBody = isPopupEnabled ? (
        <div className={`article-skills-item-popup-body ${usesExpandablePopupLayout ? `article-skills-item-popup-body-expand` : ``} ${isPopupOpen ? `article-skills-item-popup-open` : ``}`.trim()}
             role="note"
             aria-hidden={!isPopupOpen}
             style={usesExpandablePopupLayout ? {
                 "--education-language-popup-expanded-height": `${popupExpandedHeight}px`
             } : undefined}
             ref={popupRef}>
            <div className={`article-skills-item-popup-body-inner`}
                 ref={popupInnerRef}>
                <div className={`article-skills-item-popup-copy`}
                     ref={popupCopyRef}>
                    {popupRows.map((row, index) => (
                        <div className={`article-skills-item-popup-row`}
                             key={`${itemWrapper.uniqueId}-popup-row-${index}`}
                             dangerouslySetInnerHTML={{__html: row}}/>
                    ))}
                </div>
            </div>
        </div>
    ) : null

    return (
        <div className={`article-skills-item-info ${isEducationLanguageCard ? `article-skills-item-info-education-language` : ``}`.trim()}>
            <div className={`article-skills-item-title text-5`}>
                <div className={`article-skills-item-title-left-column`}>
                    {titlePrefix && (
                        <span className={`article-skills-item-title-prefix`}
                              dangerouslySetInnerHTML={{__html: titlePrefix}}/>
                    )}

                    <span className={`article-skills-item-title-main`}
                          dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                    {titleMeta && (
                        <span className={`article-skills-item-title-label text-4`}
                              dangerouslySetInnerHTML={{__html: titleMeta}}/>
                    )}

                    {isEducationLanguageCard && (level || hasPercentage) ? (
                        <div className={`article-skills-item-title-rating`} role="group" aria-label={`${level || ``}${level && hasPercentage ? `, ` : ``}${hasPercentage ? `${percentage}%` : ``}`}>
                            {level && (
                                <span className={`article-skills-item-title-suffix text-5`}
                                      dangerouslySetInnerHTML={{__html: level}}/>
                            )}
                            {level && hasPercentage && <span className={`article-skills-item-title-rating-separator`} aria-hidden="true"/>}
                            {hasPercentage && (
                                <span className={`article-skills-item-title-rating-percentage`}>
                                    <NumberAnimation className={`article-skills-item-title-percentage text-3`}
                                                     id={`article-skills-item-title-percentage-${itemWrapper.uniqueId}`}
                                                     initialValue={initialPercentage}
                                                     targetValue={animationPercentage}
                                                     format={`{n}%`}/>
                                </span>
                            )}
                        </div>
                    ) : level && (
                        <span className={`article-skills-item-title-suffix text-5`}
                              dangerouslySetInnerHTML={{__html: level}}/>
                    )}
                </div>

                {!isEducationLanguageCard && (
                    <div className={`article-skills-item-title-right-column`}>
                        {hasPercentage && (
                        <NumberAnimation className={`article-skills-item-title-percentage text-3`}
                                         id={`article-skills-item-title-percentage-${itemWrapper.uniqueId}`}
                                         initialValue={initialPercentage}
                                         targetValue={animationPercentage}
                                         format={`{n}%`}/>
                        )}
                    </div>
                )}
            </div>

            {isEducationLanguageCard ? (
                <div className={`article-skills-item-body ${usesExpandablePopupLayout ? `article-skills-item-body-expand` : ``} ${isPopupOpen ? `article-skills-item-popup-open` : ``}`.trim()}>
                    <div className={`article-skills-item-body-default ${isPopupOpen ? `article-skills-item-popup-open` : ``}`.trim()}>
                        {defaultBodyContent}
                    </div>

                    {popupBody}
                </div>
            ) : defaultBodyContent}
        </div>
    )
}

export default ArticleSkills
