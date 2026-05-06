import "./Link.scss"
import React from 'react'
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useLocation} from "../../providers/LocationProvider.jsx"
import {useUtils} from "../../hooks/utils.js"
import {useScheduler} from "../../hooks/scheduler.js"

function Link({
    id = null,
    className = "",
    href,
    children,
    tooltip = null,
    metadata = null,
    ariaLabel = null,
    onClick = null,
    onClickTimeout = 0,
    onHoverStatus = null,
    intercept = false,
    onPointerDown = null,
    onPointerUp = null,
    onPointerCancel = null,
    onMouseDown = null,
    onMouseUp = null,
}) {
    const feedbacks = useFeedbacks()
    const language = useLanguage()
    const location = useLocation()
    const scheduler = useScheduler()
    const utils = useUtils()

    const hrefClass = !href ?
        `link-no-href` :
        ``

    const _onMouseEnter = (e) => {
        onHoverStatus && onHoverStatus(true)
    }

    const _onMouseLeave = (e) => {
        onHoverStatus && onHoverStatus(false)
    }

    const _onClick = (e) => {
        onClick && onClick(e)

        const hasHref = typeof href === "string" && href.length > 0
        if(intercept || !hasHref) {
            e.preventDefault()
            return
        }

        if(href.includes('mailto') || href.includes('tel:'))
            return

        e.preventDefault()

        if(!onClickTimeout) {
            _open()
            return
        }

        scheduler.clearAllWithTag("link-timeout")
        scheduler.schedule(() => {
            _open()
        }, onClickTimeout, "link-timeout")
    }

    const _open = () => {
        if(!href)
            return

        if(href.startsWith("#cat:"))
            location.goToCategoryWithId(href.replaceAll("#cat:", ""))
        else if(href.startsWith("#phone-qr:open"))
            _openPhoneQr()
        else if(href.startsWith("#gallery:open"))
            _openGalleryLink()
        else if(href.startsWith("#"))
            _goToSectionHash(href.slice(1))
        else if(href.includes("youtube.com/embed") || href.includes("youtube.com/watch?v="))
            _openYoutubeLink()
        else
            _openExternalLink()
    }

    const _goToSectionHash = (hashContent) => {
        const colonIndex = hashContent.indexOf(":")
        if(colonIndex > 0) {
            const sectionId = hashContent.slice(0, colonIndex)
            const action = hashContent.slice(colonIndex + 1)
            if(sectionId && action) {
                if(typeof window !== "undefined") {
                    window.__pendingSectionAction = {
                        sectionId,
                        action,
                        requestedAt: Date.now()
                    }
                }
                location.goToSectionWithId(sectionId)
                return
            }
        }
        location.goToSectionWithId(hashContent)
    }

    const _openYoutubeLink = () => {
        feedbacks.displayYoutubeVideo(
            href,
            metadata?.title || language.getString("watch_video"),
            metadata?.description
        )
    }

    const _openGalleryLink = () => {
        if(!metadata || !metadata.images?.length)
            return

        feedbacks.displayGallery(
            metadata.images,
            metadata.aspectRatio || "1:1",
            metadata.title || language.getString("gallery")
        )
    }

    const _openPhoneQr = () => {
        feedbacks.displayPhoneQr({
            title: metadata?.modalTitle || language.getString("scan_to_call_title"),
            phoneNumberDisplay: metadata?.phoneNumberDisplay || metadata?.phoneNumberRaw || "",
            phoneNumberRaw: metadata?.phoneNumberRaw || ""
        })
    }

    const _openExternalLink = () => {
        const shortenedHref = utils.string.limitTextSize(href, 45)
        const formattedUrl = `<br><span class="text-secondary"><i class="fa-solid fa-arrow-up-right-from-square me-2"></i><b>${shortenedHref}</b></span><br><br>`
        const text = language.getString("leaving_site").replace("{url}", formattedUrl) +
            language.getString("confirm_to_continue")

        feedbacks.showConfirmationDialog(
            language.getString("open_link"),
            text,
            "fa-solid fa-arrow-up-right-from-square",
            () => { utils.url.open(href) },
            language.getString("proceed"),
            null,
            language.getString("cancel"),
        )
    }

    return (
        <a href={href}
           id={id}
           className={`${className} ${hrefClass}`}
           aria-label={ariaLabel || undefined}
           onClick={_onClick}
           onMouseEnter={_onMouseEnter}
           onMouseLeave={_onMouseLeave}
           onPointerDown={onPointerDown}
           onPointerUp={onPointerUp}
           onPointerCancel={onPointerCancel}
           onMouseDown={onMouseDown}
           onMouseUp={onMouseUp}
           data-tooltip={tooltip}
           draggable={false}>
            {children}
        </a>
    )
}

export default Link
