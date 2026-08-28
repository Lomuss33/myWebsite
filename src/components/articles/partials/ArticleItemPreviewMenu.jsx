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
function ArticleItemPreviewMenu({ itemWrapper, className = "", spaceBetween, excludePrimaryAction = false }) {
    const utils = useUtils()

    const hasScreenshotsOrVideo = itemWrapper.preview?.hasScreenshotsOrYoutubeVideo
    const hasGallery = Boolean(itemWrapper.preview?.screenshots?.length)
    const hasLinks = itemWrapper.preview?.hasLinks
    const links = itemWrapper.preview?.links || []
    const validLinks = links.filter(link => isNonEmptyHref(link?.href))
    const primaryLink = validLinks.find(link => link?.faIcon === (itemWrapper.faIcon || itemWrapper.faIconWithFallback)) ||
        validLinks[0] ||
        null
    const menuLinks = excludePrimaryAction && !hasGallery && primaryLink ?
        validLinks.filter(link => link !== primaryLink) :
        validLinks
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
                    {(!excludePrimaryAction || !hasGallery) && <ItemPreviewMenuGalleryButton itemWrapper={itemWrapper}/>}
                    {hasLinks && !spaceBetween && (
                        <>
                            {menuLinks.map((link, key) => (
                                <ItemPreviewMenuCustomLinkButton link={link}
                                                                 itemWrapper={itemWrapper}
                                                                 key={key}/>
                            ))}
                        </>
                    )}
                </div>
            )}

            {hasLinks && spaceBetween && (
                <div className={`article-item-preview-menu-button-list ${linksListClass}`}>
                    {menuLinks
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
                                                             itemWrapper={itemWrapper}
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
              openYoutubeInModal={true}
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
    const isPhotographyTimeline = itemWrapper?.articleWrapper?.settings?.timelineVariant === "art-photography"
    const actionLabel = isPhotographyTimeline ?
        "Open local photo album" :
        language.getString("open_gallery")
    const actionIcon = isPhotographyTimeline ?
        "fa-regular fa-folder-open" :
        "fa-solid fa-camera"

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
              tooltip={actionLabel}
              ariaLabel={actionLabel}>
            <CircularButton variant={CircularButton.Variants.DARK}
                            size={CircularButton.Sizes.EXTRA_EXTRA_LARGE}
                            className={`article-item-preview-menu-circular-button`}
                            tooltip={actionLabel}
                            faIcon={actionIcon}/>
        </Link>
    )
}

function ItemPreviewMenuCustomLinkButton({ link, itemWrapper }) {
    const href = link.href
    const presentation = getCustomLinkPresentation(link, itemWrapper)
    const tooltip = presentation.tooltip
    const faIcon = presentation.faIcon
    const isWebsiteAction = Boolean(link.isWebsiteAction)
    const label = presentation.label
    const linkClassName = isWebsiteAction ?
        `article-item-preview-menu-link article-item-preview-menu-link-website` :
        `article-item-preview-menu-link`

    return (
        <Link href={href}
              className={linkClassName}
              tooltip={tooltip}
              ariaLabel={tooltip || label}>
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

function getCustomLinkPresentation(link, itemWrapper) {
    const isPhotographyTimeline = itemWrapper?.articleWrapper?.settings?.timelineVariant === "art-photography"
    const siteName = isPhotographyTimeline ?
        getExternalAlbumSiteName(link?.href) :
        null
    const isExternalAlbum = Boolean(siteName)
    const label = isExternalAlbum ?
        `${siteName} album` :
        (link.label || "visit Online")
    const tooltip = isExternalAlbum ?
        `Open ${siteName} album` :
        link.tooltip
    const faIcon = isExternalAlbum ?
        "fa-solid fa-arrow-up-right-from-square" :
        link.faIcon

    return {
        label,
        tooltip,
        faIcon
    }
}

function getExternalAlbumSiteName(href) {
    if(typeof href !== "string" || !href.trim())
        return null

    try {
        const hostName = new URL(href).hostname.replace(/^www\./, "")

        if(hostName.includes("vsco.co"))
            return "VSCO"

        return hostName.split(".")[0]?.toUpperCase() || null
    }
    catch {
        return null
    }
}
