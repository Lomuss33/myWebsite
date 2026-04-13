import "./ArticleTestimonials.scss"
import React, {useState} from 'react'
import Article from "./base/Article.jsx"
import Swipeable from "../capabilities/Swipeable.jsx"
import {Balloon, BalloonQuote} from "../generic/Balloon"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import Link from "../generic/Link.jsx"
import AvatarView from "../generic/AvatarView.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleTestimonials({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-testimonials`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}>
            <ArticleTestimonialsItems dataWrapper={dataWrapper}
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
function ArticleTestimonialsItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)
    const slideCount = Math.max(1, filteredItems.length)

    // Mobile + tight tablets: 2-up, wider views: 3-up (if enough items exist).
    const breakpoints = {
        0:    { id: "bp-0", slidesPerView: Math.min(2, slideCount) },
        1050: { id: "bp-1", slidesPerView: Math.min(3, slideCount) }
    }

    return (
        <Swipeable className={`article-testimonials-items`}
                   breakpoints={breakpoints}
                   slidesPerView={Math.min(3, slideCount)}
                   spaceBetween={16}
                   loop={true}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleTestimonialsItem itemWrapper={itemWrapper}
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
function ArticleTestimonialsItem({ itemWrapper }) {
    const viewport = useViewport()
    const isMobileLayout = viewport.isMobileLayout()

    const quoteTextClass = isMobileLayout ?
        `text-3` :
        `text-1`

    const nameTextClass = isMobileLayout ?
        `text-5` :
        `text-4`

    const roleTextClass = isMobileLayout ?
        `text-2` :
        `text-1`

    return (
        <div className={`article-testimonials-item`}>
            <Balloon className={`article-testimonials-item-balloon`}>
                <BalloonQuote className={`${quoteTextClass}`}
                              text={itemWrapper.locales.text || itemWrapper.placeholder}/>
            </Balloon>

            <div className={`article-testimonials-item-info`}>
                <AvatarView src={itemWrapper.img}
                            faIcon={itemWrapper.faIcon}
                            style={itemWrapper.faIconStyle}
                            alt={itemWrapper.imageAlt}
                            className={`article-testimonials-item-avatar`}/>

                <Link href={itemWrapper.link?.href}
                      tooltip={itemWrapper.link?.tooltip}
                      className={`article-testimonials-item-name ${nameTextClass}`}>
                    <span dangerouslySetInnerHTML={{__html: itemWrapper.locales.label || itemWrapper.label || "---"}}/>
                </Link>

                <div className={`article-testimonials-item-role ${roleTextClass}`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || "---"}}/>
            </div>
        </div>
    )
}

export default ArticleTestimonials
