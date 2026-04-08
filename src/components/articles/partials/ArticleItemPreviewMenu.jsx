import "./ArticleItemPreviewMenu.scss"
import React from 'react'
import Link from "../../generic/Link.jsx"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import CircularButton from "../../buttons/CircularButton.jsx"
import StandardButton from "../../buttons/StandardButton.jsx"
import {useUtils} from "../../../hooks/utils.js"

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @param {String} className
 * @param {Boolean} spaceBetween
 * @return {JSX.Element}
 * @constructor
 */
function ArticleItemPreviewMenu({ itemWrapper, className = "", spaceBetween }) {
    const utils = useUtils()

    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo
    const hasLinks = itemWrapper.preview?.hasLinks
    const links = itemWrapper.preview?.links || []
    const validLinks = links.filter(link => isNonEmptyHref(link?.href))
    const orderedLinks = links.slice().sort((a, b) => {
        return Number(a.isWebsiteAction) - Number(b.isWebsiteAction)
    })

    const isGithubLink = (link) => String(link?.href || "").includes("github.com")
    const isDocsLink = (link) => {
        const href = String(link?.href || "")
        const icon = String(link?.faIcon || "")
        return icon.includes("fa-file") || href.includes("docs.google.com") || href.includes("readthedocs") || href.includes("/docs")
    }

    const linksListClass = utils.string.if(
        hasScreenshotsOrVideo && spaceBetween,
        `justify-content-end`)

    return (
        <div className={`article-item-preview-menu ${className}`}>
            {(hasScreenshotsOrVideo || !spaceBetween) && (
                <div className={`article-item-preview-menu-button-list`}>
                    <ItemPreviewMenuYoutubeButton itemWrapper={itemWrapper}/>
                    <ItemPreviewMenuGalleryButton itemWrapper={itemWrapper}/>
                    {hasLinks && !spaceBetween && (
                        <>
                            {validLinks.map((link, key) => (
                                <ItemPreviewMenuCustomLinkButton link={link}
                                                                 key={key}/>
                            ))}
                        </>
                    )}
                </div>
            )}

            {hasLinks && spaceBetween && (
                <div className={`article-item-preview-menu-button-list ${linksListClass}`}>
                    {validLinks
                        // In portfolio cards, the website action is promoted into the avatar dock.
                        // Keep it here in non-spaceBetween layouts (e.g. modal/compact menus).
                        .filter(link => {
                            if (!spaceBetween) return true
                            if (link?.isWebsiteAction) return false
                            // In portfolio cards, GitHub/Docs are shown as the small icons near the avatar.
                            if (isGithubLink(link) || isDocsLink(link)) return false
                            return true
                        })
                        .map((link, key) => (
                            <ItemPreviewMenuCustomLinkButton link={link}
                                                             key={key}/>
                        ))}
                </div>
            )}
        </div>
    )
}

function ItemPreviewMenuYoutubeButton({ itemWrapper }) {
    const language = useLanguage()
    const utils = useUtils()

    const title = itemWrapper.locales.title?.length < 30 ?
        itemWrapper.locales.title :
        language.getString("get_to_know_more")

    const href = itemWrapper.preview?.youtubeVideo
    const metadata = {
        title: title,
        description: utils.string.extractFirstPeriod(itemWrapper.locales.text),
    }

    if(!href)
        return <></>

    return (
        <Link href={href}
              metadata={metadata}
              className={`article-item-preview-menu-link`}
              tooltip={language.getString("watch_video")}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={language.getString("watch_video")}
                            faIcon={`fa-brands fa-youtube`}/>
        </Link>
    )
}

function ItemPreviewMenuGalleryButton({ itemWrapper }) {
    const language = useLanguage()
    const utils = useUtils()

    const screenshots = itemWrapper.preview?.screenshots
    const screenshotsAspectRatio = itemWrapper.preview?.screenshotsAspectRatio

    const splitTitle = utils.string.extractFirstPart(itemWrapper.locales.title || "")
    const title = splitTitle.length < 35 ?
        splitTitle :
        language.getString("get_to_know_more")

    const metadata = {
        title: title,
        images: screenshots,
        aspectRatio: screenshotsAspectRatio,
    }

    if(!screenshots || screenshots.length === 0)
        return <></>

    return (
        <Link href={"#gallery:open"}
              metadata={metadata}
              className={`article-item-preview-menu-link`}
              tooltip={language.getString("watch_video")}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={language.getString("open_gallery")}
                            faIcon={`fa-solid fa-camera`}/>
        </Link>
    )
}

function ItemPreviewMenuCustomLinkButton({ link }) {
    const href = link.href
    const tooltip = link.tooltip
    const faIcon = link.faIcon
    const isWebsiteAction = Boolean(link.isWebsiteAction)
    const label = link.label || "visit Online"
    const linkClassName = isWebsiteAction ?
        `article-item-preview-menu-link article-item-preview-menu-link-website` :
        `article-item-preview-menu-link`

    return (
        <Link href={href}
              className={linkClassName}
              tooltip={tooltip}>
            {isWebsiteAction ? (
                <>
                    <StandardButton variant={`dark`}
                                    size={StandardButton.Size.LARGE}
                                    className={`article-item-preview-menu-website-button`}
                                    tooltip={tooltip}
                                    label={label}
                                    faIcon={faIcon}
                                    displayIconAsSuffix={true}/>

                    <CircularButton variant={CircularButton.Variants.DARK}
                                    size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                                    className={`article-item-preview-menu-circular-button article-item-preview-menu-website-button-compact`}
                                    tooltip={tooltip}
                                    faIcon={faIcon}/>
                </>
            ) : (
                <CircularButton variant={CircularButton.Variants.DARK}
                                size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                                className={`article-item-preview-menu-circular-button`}
                                tooltip={tooltip}
                                faIcon={faIcon}/>
            )}
        </Link>
    )
}

export default ArticleItemPreviewMenu

function isNonEmptyHref(href) {
    return typeof href === "string" && href.trim().length > 0
}
