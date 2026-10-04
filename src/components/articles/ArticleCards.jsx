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
import {useLanguage} from "../../providers/LanguageProvider.jsx"

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
    const language = useLanguage()
    const dateTarget = itemWrapper.dateStart ?
        formatCertificationDate(itemWrapper.dateStart, language.selectedLanguageId, "long") : meta.dateFallback
    const compactDateTarget = itemWrapper.dateStart ?
        formatCertificationDate(itemWrapper.dateStart, language.selectedLanguageId, "numeric") : meta.dateCompactFallback
    const certificationFields = [
        {
            label: "Issuer",
            value: meta.issuer,
            wideValue: meta.issuerWide,
            compactValue: meta.issuerCompact
        },
        {
            label: meta.dateLabel || "Target",
            value: dateTarget,
            compactValue: compactDateTarget
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
    const certificationAvatarContent = !meta.certificateHref && itemWrapper.link && itemWrapper.link.href ? (
        <Link href={itemWrapper.link.href}
              className={`article-cards-item-education-certification-avatar-link`}>
            {certificationAvatar}
        </Link>
    ) : certificationAvatar

    const certificationCard = (
        <div className={`article-cards-item article-cards-item-education-certification article-cards-item-education-certification-${meta.tone}`}>
            {meta.tone === "ccna" && (
                <span className="article-cards-item-education-certification-status" role="img" aria-label="Incoming certification">
                    INCOMING
                </span>
            )}
            <div className={`article-cards-item-education-certification-frame`}>
                <div className={`article-cards-item-education-certification-heading`}>
                    <div className="article-cards-item-education-certification-avatar-stage">
                        {certificationAvatarContent}
                    </div>

                    <div className={`article-cards-item-education-certification-title-block`}>
                        <span className={`article-cards-item-education-certification-kicker`}>Certification path</span>
                        <h6 className={`article-cards-item-content-title article-cards-item-education-certification-title`}
                            dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>
                    </div>
                </div>

                <div className={`article-cards-item-education-certification-description`}>
                    <span dangerouslySetInnerHTML={{__html: itemWrapper.locales.text}}/>
                </div>

                <div className={`article-cards-item-education-certification-fields`}>
                    {certificationFields.map(field => (
                        <EducationCertificationField key={field.label}
                                                     label={field.label}
                                                     value={field.value}
                                                     wideValue={field.wideValue}
                                                     compactValue={field.compactValue}/>
                    ))}
                </div>
                {meta.certificateHref && (
                    <span className="article-cards-item-education-certification-link-mark" aria-hidden="true">
                        <i className="fa-solid fa-file-pdf"/>
                        <i className="fa-solid fa-arrow-up-right-from-square"/>
                    </span>
                )}
            </div>
        </div>
    )

    if(meta.certificateHref) {
        return (
            <a className="article-cards-item-education-certification-link"
               href={meta.certificateHref}
               target="_blank"
               rel="noopener noreferrer"
               onClick={event => {
                   if(event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
                       return

                   event.preventDefault()
                   window.open(meta.certificateHref, "_blank", "noopener,noreferrer")
               }}
               aria-label="Open AEVO certificate (PDF) in a new tab">
                {certificationCard}
            </a>
        )
    }

    return certificationCard
}

function EducationCertificationField({ label, value, wideValue, compactValue }) {
    if(!value)
        return null

    return (
        <div className={`article-cards-item-education-certification-field`}>
            <span className={`article-cards-item-education-certification-field-label`}>
                {label}
            </span>
            <span className={`article-cards-item-education-certification-field-value${wideValue ? " article-cards-item-education-certification-field-value-has-wide" : ""}${compactValue ? " article-cards-item-education-certification-field-value-has-compact" : ""}`}>
                {compactValue ? (
                    <>
                        <span className="article-cards-item-education-certification-field-value-full"
                              dangerouslySetInnerHTML={{__html: value}}/>
                        <span className="article-cards-item-education-certification-field-value-wide"
                              aria-hidden="true">{wideValue}</span>
                        <span className="article-cards-item-education-certification-field-value-compact"
                              aria-hidden="true">{compactValue}</span>
                    </>
                ) : <span dangerouslySetInnerHTML={{__html: value}}/>}
            </span>
        </div>
    )
}

function formatCertificationDate(date, locale, monthStyle) {
    if(!date)
        return null

    const month = monthStyle === "numeric" ? "2-digit" : "long"
    const day = monthStyle === "numeric" ? "2-digit" : "numeric"
    return new Intl.DateTimeFormat(locale || undefined, {day, month, year: "numeric"})
        .format(date)
        .replace(/\d{4}/, year => `<strong>${year}</strong>`)
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
            issuer: "Industrie- und Handelskammer",
            issuerWide: "IHK — Industrie- und Handelskammer",
            issuerCompact: "IHK",
            certificateHref: "/documents/certificates/AEVO_Ausbilder_Eignungsverordnung_LovroMusic_04092026_Friedberg.pdf",
            focus: "Apprentice training",
            dateLabel: "Achieved",
            dateFallback: "September 4, <strong>2026</strong>",
            dateCompactFallback: "09/04/<strong>2026</strong>"
        }
    }

    if(title.includes("ccna")) {
        return {
            tone: "ccna",
            issuer: "Cisco",
            focus: "Networking",
            dateFallback: "December <strong>2026</strong>",
            dateCompactFallback: "12/<strong>2026</strong>"
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
