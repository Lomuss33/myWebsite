import "./ArticleSkills.scss"
import React, {useEffect, useState} from 'react'
import Article from "./base/Article.jsx"
import {useUtils} from "../../hooks/utils.js"
import Collapsable from "../capabilities/Collapsable.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useConstants} from "../../hooks/constants.js"
import AvatarView from "../generic/AvatarView.jsx"
import {useLocation} from "../../providers/LocationProvider.jsx"
import NumberAnimation from "../generic/NumberAnimation.jsx"
import IllustratedManuscript from "../generic/IllustratedManuscript.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkills({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-skills`}
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
    const avatarClasses = []
    const avatarStyle = {
        ...(itemWrapper.faIconStyle || {}),
        "--article-skills-avatar-image-scale": itemWrapper.avatarImageScale || 1
    }

    if (itemWrapper.articleWrapper.settings.roundIcons) {
        avatarClasses.push(`article-skills-item-avatar-round`)
    }

    if (itemWrapper.articleWrapper.settings.avatarImageMode) {
        avatarClasses.push(`article-skills-item-avatar-mode-${itemWrapper.articleWrapper.settings.avatarImageMode}`)
    }

    return (
        <div className={`article-skills-item`}>
            <div className={`article-skills-item-avatar-wrapper`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIconWithFallback}
                            iconText={itemWrapper.iconText}
                            style={avatarStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-skills-item-avatar ${avatarClasses.join(` `)}`.trim()}/>
            </div>

            <ArticleSkillsItemInfo itemWrapper={itemWrapper}/>
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleSkillsItemInfo({ itemWrapper }) {
    const utils = useUtils()
    const location = useLocation()

    const percentage = itemWrapper.percentage
    const shouldShowItemNumbers = Boolean(itemWrapper.articleWrapper.settings.showItemNumbers) || Boolean(itemWrapper.label)
    const titlePrefix = shouldShowItemNumbers ? `${itemWrapper.id}.` : null
    const titleMeta = itemWrapper.label
    const initialPercentage = location.getActiveSection()?.id === itemWrapper.articleWrapper.sectionId ?
        percentage :
        0

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
        setAnimationPercentage(initialPercentage)
    }, [location.getActiveSection()])

    return (
        <div className={`article-skills-item-info`}>
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

                    {level && (
                        <span className={`article-skills-item-title-suffix text-5`}
                              dangerouslySetInnerHTML={{__html: level}}/>
                    )}
                </div>

                <div className={`article-skills-item-title-right-column`}>
                    {hasPercentage && (
                        <NumberAnimation className={`article-skills-item-title-percentage text-3`}
                                         id={`article-skills-item-title-percentage-${itemWrapper.uniqueId}`}
                                         initialValue={initialPercentage}
                                         targetValue={animationPercentage}
                                         format={`{n}%`}/>
                    )}
                </div>
            </div>

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
        </div>
    )
}

export default ArticleSkills
