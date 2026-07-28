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
    const shouldUseStaticCards = dataWrapper.sectionId === "education" && filteredItems.length <= 2
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

    if(shouldUseStaticCards) {
        return (
            <div className={`article-cards-items article-cards-items-static article-cards-items-static-education`}>
                {filteredItems.map((itemWrapper, key) => (
                    <ArticleCardsItem itemWrapper={itemWrapper}
                                      key={key}/>
                ))}
            </div>
        )
    }

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
    if(isEducationCertificationCard(itemWrapper))
        return <ArticleEducationCertificationCard itemWrapper={itemWrapper}/>

    return <ArticleCardsGenericItem itemWrapper={itemWrapper}/>
}

function ArticleCardsGenericItem({ itemWrapper }) {
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

function ArticleEducationCertificationCard({ itemWrapper }) {
    const meta = getEducationCertificationMeta(itemWrapper)
    const certificationFields = [
        {
            label: "Issuer",
            value: meta.issuer
        },
        {
            label: "Target",
            value: itemWrapper.dateStartDisplay || meta.dateFallback
        },
        {
            label: "Focus",
            value: meta.focus
        }
    ].filter(field => field.value)
    const certificationAvatar = (
        <AvatarView src={itemWrapper.img}
                    faIcon={itemWrapper.faIcon}
                    style={itemWrapper.faIconStyle}
                    alt={itemWrapper.imageAlt}
                    className={`article-cards-item-avatar article-cards-item-education-certification-avatar`}/>
    )

    return (
        <div className={`article-cards-item article-cards-item-education-certification article-cards-item-education-certification-${meta.tone}`}>
            <div className={`article-cards-item-education-certification-frame`}>
                {itemWrapper.link && itemWrapper.link.href ? (
                    <Link href={itemWrapper.link.href}
                          className={`article-cards-item-education-certification-avatar-link`}>
                        {certificationAvatar}
                    </Link>
                ) : certificationAvatar}

                <div className={`article-cards-item-education-certification-title-block`}>
                    <h6 className={`article-cards-item-content-title article-cards-item-education-certification-title`}
                        dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>
                </div>

                <div className={`article-cards-item-education-certification-description`}>
                    <span dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
                </div>

                <div className={`article-cards-item-education-certification-fields`}>
                    {certificationFields.map(field => (
                        <EducationCertificationField key={field.label}
                                                     label={field.label}
                                                     value={field.value}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

function EducationCertificationField({ label, value }) {
    if(!value)
        return null

    return (
        <div className={`article-cards-item-education-certification-field`}>
            <span className={`article-cards-item-education-certification-field-label`}>
                {label}
            </span>
            <span className={`article-cards-item-education-certification-field-value`}
                  dangerouslySetInnerHTML={{__html: value}}/>
        </div>
    )
}

function isEducationCertificationCard(itemWrapper) {
    return itemWrapper?.articleWrapper?.sectionId === "education" &&
        itemWrapper?.articleWrapper?.id === 2
}

function getEducationCertificationMeta(itemWrapper) {
    const title = String(itemWrapper?.locales?.title || "").replace(/<[^>]*>/g, "").toLowerCase()

    if(title.includes("aevo")) {
        return {
            tone: "aevo",
            issuer: "IHK",
            focus: "Apprentice training",
            dateFallback: "Sep 2026"
        }
    }

    if(title.includes("ccna")) {
        return {
            tone: "ccna",
            issuer: "Cisco",
            focus: "Networking",
            dateFallback: "Dec 2026"
        }
    }

    return {
        tone: "default",
        issuer: "Certification Body",
        focus: "Professional growth",
        dateFallback: null
    }
}

export default ArticleCards
