import "./NavProfileCard.scss"
import React, {useEffect, useRef, useState} from "react"
import {Card} from "react-bootstrap"
import {useFloatingFrame} from "../../../hooks/floatingFrame.js"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import ImageView from "../../generic/ImageView.jsx"
import TextTyper from "../../generic/TextTyper.jsx"
import AudioButton from "../../buttons/AudioButton.jsx"
import NavToolResumeDownloader from "../tools/NavToolResumeDownloader.jsx"

const PROFILE_AVATAR_SIZES = "(max-width: 991.98px) 96px, 144px"
const DESKTOP_RESUME_MENU_POPPER_CONFIG = {
    modifiers: [
        {
            name: "offset",
            options: {
                offset: [-12, 2]
            }
        }
    ]
}

function NavProfileCard({
    profile,
    railMode = "extended",
    mobileActionStack = null,
    mobileActionStackBeforeInfo = null,
    mobileActionStackAfterInfo = null,
    showNameAudioButton = true
}) {
    const language = useLanguage()
    const utils = useUtils()
    const floatingFrame = useFloatingFrame()
    const safeProfile = profile || {}
    const alternateProfilePictureDefaultChance = normalizeDefaultChance(safeProfile.profilePictureAltDefaultChance)
    const [showAlternateProfilePicture, setShowAlternateProfilePicture] = useState(false)
    const [stackMobileName, setStackMobileName] = useState(false)
    const headerRef = useRef(null)
    const nameHeadingRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const isExtendedRail = railMode === "extended"
    const railModeClass = isExtendedRail ?
        `` :
        `nav-profile-card-short-rail`

    const name = safeProfile.name || "Profile"
    const localizedName = language.getTranslation(safeProfile.locales, "localized_name", null) || name
    const normalizedName = String(localizedName || "").trim()
    const nameParts = normalizedName ? normalizedName.split(/\s+/) : [name]
    const firstName = nameParts[0] || localizedName
    const lastName = nameParts.slice(1).join(" ")

    let loveSentences = language.getTranslation(safeProfile.locales, "love_sentences", [])
    if(!Array.isArray(loveSentences)) loveSentences = []
    if(utils.storage.getWindowVariable("suspendAnimations") && loveSentences.length > 2)
        loveSentences = [loveSentences[0]]

    const profilePictureUrl = language.parseJsonText(safeProfile.profilePictureUrl)

    const namePronunciationIpa = language.getTranslation(safeProfile.locales, "name_pronunciation_ipa", null)
    const namePronunciationAudioUrl = language.getTranslation(safeProfile.locales, "name_pronunciation_audio_url", null)
    const hasPronunciationAudio = Boolean(namePronunciationIpa || namePronunciationAudioUrl)
    const mobileActionStackVisible = Boolean(mobileActionStackBeforeInfo || mobileActionStackAfterInfo || mobileActionStack)
    const desktopActionStackVisible = isExtendedRail && !mobileActionStackVisible &&
        (hasPronunciationAudio || safeProfile.resumePdfUrl)
    const namePronunciationButtonVisible = showNameAudioButton && !desktopActionStackVisible && hasPronunciationAudio
    const namePronunciationTooltipLabel = namePronunciationIpa ? `<span class="audio-button-tooltip-lines"><span class="audio-button-tooltip-line audio-button-tooltip-line-top">lǒːʋro  ˈmu.sit͡ɕ</span><span class="audio-button-tooltip-line audio-button-tooltip-line-bottom">LOHV-roh  muu-SEEch</span></span>` : ""

    const navProfileCardNameClass = [
        namePronunciationButtonVisible ? `nav-profile-card-name-with-audio-button` : ``,
        stackMobileName ? `nav-profile-card-name-mobile-stacked` : ``
    ].filter(Boolean).join(` `)
    const hasMobileActionStackBeforeInfo = Boolean(mobileActionStackBeforeInfo)
    const hasMobileActionStackAfterInfo = Boolean(mobileActionStackAfterInfo || mobileActionStack)
    const navProfileCardHeaderClass = [
        `nav-profile-card-header`,
        hasMobileActionStackBeforeInfo ? `nav-profile-card-header-has-mobile-before-info` : ``,
        hasMobileActionStackAfterInfo ? `nav-profile-card-header-has-mobile-after-info` : ``
    ].filter(Boolean).join(` `)

    const secondaryProfilePictureUrl = language.parseJsonText(safeProfile.profilePictureAltUrl) || "images/contant/profil.webp"

    useEffect(() => {
        setShowAlternateProfilePicture(
            getPageLoadRandomValue("nav-profile-card:avatar") < alternateProfilePictureDefaultChance
        )
    }, [safeProfile.profilePictureAltUrl, alternateProfilePictureDefaultChance])

    useEffect(() => {
        const headerElement = headerRef.current
        const headingElement = nameHeadingRef.current
        const firstNameElement = firstNameRef.current
        const lastNameElement = lastNameRef.current

        if(!headerElement || !headingElement || !firstNameElement || !lastNameElement) {
            setStackMobileName(false)
            return undefined
        }

        let animationFrameId = 0
        let resizeObserver = null
        const fontSet = document.fonts
        const scheduleMeasurement = () => {
            if(animationFrameId)
                cancelAnimationFrame(animationFrameId)

            animationFrameId = requestAnimationFrame(() => {
                const computedStyle = window.getComputedStyle(headingElement)
                const isMobileLayout = computedStyle.position === "absolute"

                if(!isMobileLayout) {
                    headingElement.style.removeProperty(`--mobile-title-center-x`)
                    headingElement.style.removeProperty(`--mobile-title-dynamic-width`)
                    setStackMobileName((current) => current ? false : current)
                    return
                }

                const headerRect = headerElement.getBoundingClientRect()
                const firstNameRect = firstNameElement.getBoundingClientRect()
                const lastNameRect = lastNameElement.getBoundingClientRect()
                const mediaElement = headerElement.querySelector(`.nav-profile-card-media`)
                const middleActionStackElement = headerElement.querySelector(`.nav-profile-card-mobile-action-stack-middle`)
                const middleActionStackRect = middleActionStackElement?.getBoundingClientRect()
                const rightActionStackElement = headerElement.querySelector(`.nav-profile-card-mobile-action-stack-right`)
                const rightActionStackRect = rightActionStackElement?.getBoundingClientRect()
                const nameLineLeftEdge = Math.min(firstNameRect.left, lastNameRect.left)
                let mobileAvatarOffsetX = 0

                if(mediaElement && middleActionStackRect && Number.isFinite(nameLineLeftEdge) && nameLineLeftEdge > middleActionStackRect.right) {
                    const avatarBandCenterX = (middleActionStackRect.right + nameLineLeftEdge) / 2
                    const mediaLayoutCenterX = headerRect.left + mediaElement.offsetLeft + (mediaElement.offsetWidth / 2)
                    mobileAvatarOffsetX = avatarBandCenterX - mediaLayoutCenterX
                    mediaElement.style.setProperty(`--mobile-avatar-offset-x`, `${mobileAvatarOffsetX}px`)
                } else {
                    mediaElement?.style.removeProperty(`--mobile-avatar-offset-x`)
                }

                const mediaSafeRight = mediaElement ?
                    headerRect.left + mediaElement.offsetLeft + mediaElement.offsetWidth + mobileAvatarOffsetX :
                    headerRect.left
                const surnameGap = parseFloat(window.getComputedStyle(lastNameElement).paddingLeft) || 0
                const collisionPadding = 6
                const comfortPadding = 10
                const centerX = firstNameRect.left + (firstNameRect.width / 2)
                const safeLeftEdge = Math.max(
                    headerRect.left + collisionPadding,
                    mediaSafeRight + collisionPadding,
                    (middleActionStackRect?.right || headerRect.left) + collisionPadding
                )
                const safeRightEdge = rightActionStackRect ?
                    Math.min(headerRect.right, rightActionStackRect.left - collisionPadding) :
                    headerRect.right - collisionPadding
                const requiredLeftSpace = (firstNameRect.width / 2) + comfortPadding
                const requiredRightSpace = (firstNameRect.width / 2) + surnameGap + lastNameRect.width + comfortPadding
                const requiredTotalWidth = firstNameRect.width + surnameGap + lastNameRect.width + (comfortPadding * 2)
                const availableLeftSpace = Math.max(0, centerX - safeLeftEdge)
                const availableRightSpace = Math.max(0, safeRightEdge - centerX)
                const availableTotalWidth = Math.max(0, safeRightEdge - safeLeftEdge)
                const corridorCenterX = (safeLeftEdge + safeRightEdge) / 2
                const shouldStack = requiredLeftSpace > availableLeftSpace ||
                    requiredRightSpace > availableRightSpace ||
                    requiredTotalWidth > availableTotalWidth

                if(shouldStack) {
                    headingElement.style.setProperty(`--mobile-title-center-x`, `${corridorCenterX - headerRect.left}px`)
                    headingElement.style.setProperty(`--mobile-title-dynamic-width`, `${availableTotalWidth}px`)
                } else {
                    headingElement.style.removeProperty(`--mobile-title-center-x`)
                    headingElement.style.removeProperty(`--mobile-title-dynamic-width`)
                }

                setStackMobileName((current) => current !== shouldStack ? shouldStack : current)
            })
        }

        scheduleMeasurement()
        resizeObserver = new ResizeObserver(() => {
            scheduleMeasurement()
        })
        resizeObserver.observe(headerElement)
        resizeObserver.observe(headingElement)
        resizeObserver.observe(firstNameElement)
        resizeObserver.observe(lastNameElement)

        window.addEventListener(`resize`, scheduleMeasurement)

        if(fontSet?.addEventListener)
            fontSet.addEventListener(`loadingdone`, scheduleMeasurement)
        else
            fontSet?.ready?.then(scheduleMeasurement).catch(() => {})

        return () => {
            if(animationFrameId)
                cancelAnimationFrame(animationFrameId)

            headingElement.style.removeProperty(`--mobile-title-center-x`)
            headingElement.style.removeProperty(`--mobile-title-dynamic-width`)
            headerElement.querySelector(`.nav-profile-card-media`)?.style.removeProperty(`--mobile-avatar-offset-x`)
            resizeObserver?.disconnect()
            window.removeEventListener(`resize`, scheduleMeasurement)
            fontSet?.removeEventListener?.(`loadingdone`, scheduleMeasurement)
        }
    }, [firstName, lastName])

    const _onMediaClicked = (event) => {
        floatingFrame.togglePaused(event.currentTarget)
        setShowAlternateProfilePicture((current) => !current)
    }

    return (
        <Card className={`nav-profile-card ${railModeClass}`}>
            <div className={navProfileCardHeaderClass} ref={headerRef}>
                {mobileActionStackBeforeInfo && (
                    <div className={`nav-profile-card-mobile-action-stack nav-profile-card-mobile-action-stack-middle`}>
                        {mobileActionStackBeforeInfo}
                    </div>
                )}

                {desktopActionStackVisible && (
                    <div className={`nav-profile-card-desktop-action-stack`}>
                        {safeProfile.resumePdfUrl && (
                            <div className={`nav-profile-card-desktop-action nav-profile-card-desktop-action-resume nav-tools-item-resume`}>
                                <NavToolResumeDownloader dropdownClassName={`nav-profile-card-desktop-resume-dropdown`}
                                                         dropdownDrop={"end"}
                                                         menuClassName={`nav-profile-card-desktop-resume-menu`}
                                                         menuPopperConfig={DESKTOP_RESUME_MENU_POPPER_CONFIG}
                                                         toggleClassName={`nav-profile-card-desktop-resume-toggle`}
                                                         hideCaret={true}
                                                         showTooltip={true}/>
                            </div>
                        )}

                        {hasPronunciationAudio && (
                            <div className={`nav-profile-card-desktop-action nav-profile-card-desktop-action-audio`}>
                                <AudioButton url={namePronunciationAudioUrl}
                                             tooltip={namePronunciationIpa}
                                             tooltipLabel={namePronunciationTooltipLabel}
                                             size={AudioButton.Sizes.DEFAULT}
                                             buttonClassName={`nav-profile-card-desktop-audio-button`}
                                             tooltipClassName={`nav-profile-card-desktop-audio-tooltip`}/>
                            </div>
                        )}
                    </div>
                )}

                <div className={`nav-profile-card-media floating-frame`}
                     onPointerEnter={floatingFrame.onPointerEnter}
                     onPointerMove={floatingFrame.onPointerMove}
                     onPointerLeave={floatingFrame.onPointerLeave}
                     onClick={_onMediaClicked}
                     role="button"
                     tabIndex={0}
                     onKeyDown={(event) => {
                         if(event.key === "Enter" || event.key === " ") {
                             event.preventDefault()
                             _onMediaClicked(event)
                         }
                     }}
                     aria-label={`Toggle profile picture`}
                     aria-pressed={showAlternateProfilePicture}>
                    <div className={`nav-profile-card-avatar-switch ${showAlternateProfilePicture ? "nav-profile-card-avatar-switch-secondary" : "nav-profile-card-avatar-switch-primary"}`}>
                        <div className={`nav-profile-card-avatar-face nav-profile-card-avatar-face-front`}>
                            <ImageView src={profilePictureUrl}
                                       className={`nav-profile-card-avatar`}
                                       hideSpinner={true}
                                       alt={name}
                                       loading={`eager`}
                                       sizes={PROFILE_AVATAR_SIZES}/>
                        </div>

                        <div className={`nav-profile-card-avatar-face nav-profile-card-avatar-face-back`}>
                            <ImageView src={secondaryProfilePictureUrl}
                                       className={`nav-profile-card-avatar`}
                                       hideSpinner={true}
                                       alt={name}
                                       loading={`eager`}
                                       fetchPriority={`low`}
                                       sizes={PROFILE_AVATAR_SIZES}/>
                        </div>
                    </div>
                </div>

                <div className={`nav-profile-card-info`}>
                    <h1 className={`nav-profile-card-name ${navProfileCardNameClass}`} ref={nameHeadingRef}>
                        {namePronunciationButtonVisible && (
                            <span className={`nav-profile-card-name-audio-button`}>
                                <AudioButton url={namePronunciationAudioUrl}
                                             tooltip={namePronunciationIpa}
                                             tooltipLabel={namePronunciationTooltipLabel}
                                             size={AudioButton.Sizes.DYNAMIC_FOR_NAV_TITLE}/>
                            </span>
                        )}

                        <span className={`nav-profile-card-name-text`}>
                            <span className={`nav-profile-card-name-line nav-profile-card-name-line-first`} ref={firstNameRef}>
                                {firstName}
                            </span>

                            {lastName && (
                                <span className={`nav-profile-card-name-line nav-profile-card-name-line-last`} ref={lastNameRef}>
                                    {lastName}
                                </span>
                            )}
                        </span>
                    </h1>
                </div>

                {(mobileActionStackAfterInfo || mobileActionStack) && (
                    <div className={`nav-profile-card-mobile-action-stack nav-profile-card-mobile-action-stack-right`}>
                        {mobileActionStackAfterInfo || mobileActionStack}
                    </div>
                )}
            </div>

            {isExtendedRail && loveSentences?.length > 1 && (
                <TextTyper strings={loveSentences}
                           id={`role-typer`}
                           randomOrder={true}
                           className={`nav-profile-card-role`}/>
            )}

            {isExtendedRail && loveSentences?.length === 1 && (
                <div className={`nav-profile-card-role`}>
                    {loveSentences[0]}
                </div>
            )}
        </Card>
    )
}

export default NavProfileCard

function normalizeDefaultChance(value, fallback = 0) {
    const numericValue = Number(value)
    if(!Number.isFinite(numericValue))
        return fallback

    return Math.min(1, Math.max(0, numericValue))
}

function getPageLoadRandomValue(key) {
    if(typeof window === "undefined")
        return Math.random()

    const cacheKey = "__pageLoadRandomImageDefaults"
    const scopedCache = window[cacheKey] || (window[cacheKey] = {})

    if(typeof scopedCache[key] === "number")
        return scopedCache[key]

    scopedCache[key] = Math.random()
    return scopedCache[key]
}
