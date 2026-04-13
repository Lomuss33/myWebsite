import "./ArticleCards.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import Swipeable from "../capabilities/Swipeable.jsx"
import AvatarView from "../generic/AvatarView.jsx"
import DateBadge from "../widgets/DateBadge.jsx"
import CircularButton from "../buttons/CircularButton.jsx"
import Link from "../generic/Link.jsx"
import {useConstants} from "../../hooks/constants.js"
import {useViewport} from "../../providers/ViewportProvider.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleCards({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-cards`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleCardsItems dataWrapper={dataWrapper}
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
function ArticleCardsItems({ dataWrapper, selectedItemCategoryId }) {
    const constants = useConstants()
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const slideCount = Math.max(1, filteredItems.length)
    const breakpoints = Object.fromEntries(
        Object.entries(constants.SWIPER_BREAKPOINTS_FOR_THREE_SLIDES).map(([breakpoint, value]) => ([
            breakpoint,
            {
                ...value,
                slidesPerView: Math.min(value.slidesPerView, slideCount)
            }
        ]))
    )

    return (
        <Swipeable className={`article-cards-items`}
                   breakpoints={breakpoints}
                   slidesPerView={Math.min(3, slideCount)}
                   loop={true}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleCardsItem itemWrapper={itemWrapper} 
                                      key={key}/>
            ))}
        </Swipeable>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticleCardsItem({ itemWrapper }) {
    const viewport = useViewport()
    const largeTexts = viewport.isMobileLayout()

    const titleClass = largeTexts ?
        `eq-h5` : `lead`

    const textClass = largeTexts ?
        `text-3` : `text-2`

    const dateBadgeClass = largeTexts ?
        `text-2` : `text-2`

    return (
        <div className={`article-cards-item`}>
            {itemWrapper.link && itemWrapper.link.href && (
                <Link href={itemWrapper.link.href}
                      className={`article-cards-item-link`}>
                    <CircularButton faIcon={itemWrapper.link.faIcon || `fa-solid fa-arrow-up-right-dots`}
                                    size={CircularButton.Sizes.EXTRA_LARGE}
                                    variant={CircularButton.Variants.TRANSPARENT}
                                    className={`article-cards-item-link-button`}
                                    tooltip={itemWrapper.link.tooltip}/>
                </Link>
            )}

            <div className={`article-cards-item-avatar-wrapper`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIcon}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-cards-item-avatar`}/>
            </div>

            <div className={`article-cards-item-content`}>
                <h6 className={`article-cards-item-content-title ${titleClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>

                <div className={`article-cards-item-content-description ${textClass} mt-1`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>

                {itemWrapper.dateStart && (
                    <DateBadge dateEnd={itemWrapper.dateStartDisplay}
                               variant={DateBadge.Variants.TRANSPARENT}
                               className={`article-cards-item-content-date-badge ${dateBadgeClass}`}/>
                )}
            </div>
        </div>
    )
}

export default ArticleCards
