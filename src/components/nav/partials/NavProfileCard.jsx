import "./NavProfileCard.scss"
import React, {useEffect, useState} from "react"
import {Card} from "react-bootstrap"
import {useFloatingFrame} from "../../../hooks/floatingFrame.js"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import ImageView from "../../generic/ImageView.jsx"
import TextTyper from "../../generic/TextTyper.jsx"
import AudioButton from "../../buttons/AudioButton.jsx"

const PROFILE_AVATAR_SIZES = "(max-width: 991.98px) 96px, 144px"

function NavProfileCard({
    profile,
    expanded,
    compactRail = false,
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

    const expandedClass = expanded ?
        `` :
        `nav-profile-card-shrink`

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
    const namePronunciationButtonVisible = showNameAudioButton && (namePronunciationIpa || namePronunciationAudioUrl)
    const namePronunciationTooltipLabel = namePronunciationIpa ? `<span class="audio-button-tooltip-lines"><span class="audio-button-tooltip-line audio-button-tooltip-line-top">lǒːʋro  ˈmu.sit͡ɕ</span><span class="audio-button-tooltip-line audio-button-tooltip-line-bottom">LOHV-roh  muu-SEEch</span></span>` : ""

    const navProfileCardNameClass = namePronunciationButtonVisible ?
        `nav-profile-card-name-with-audio-button` :
        ``
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

    const _onMediaClicked = (event) => {
        setShowAlternateProfilePicture((current) => !current)
    }

    return (
        <Card className={`nav-profile-card ${expandedClass}`}>
            <div className={navProfileCardHeaderClass}>
                {mobileActionStackBeforeInfo && (
                    <div className={`nav-profile-card-mobile-action-stack nav-profile-card-mobile-action-stack-middle`}>
                        {mobileActionStackBeforeInfo}
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
                    <h1 className={`nav-profile-card-name ${navProfileCardNameClass}`}>
                        {namePronunciationButtonVisible && (
                            <span className={`nav-profile-card-name-audio-button`}>
                                <AudioButton url={namePronunciationAudioUrl}
                                             tooltip={namePronunciationIpa}
                                             tooltipLabel={namePronunciationTooltipLabel}
                                             size={AudioButton.Sizes.DYNAMIC_FOR_NAV_TITLE}/>
                            </span>
                        )}

                        <span className={`nav-profile-card-name-text`}>
                            <span className={`nav-profile-card-name-line nav-profile-card-name-line-first`}>
                                {firstName}
                            </span>

                            {lastName && (
                                <span className={`nav-profile-card-name-line nav-profile-card-name-line-last`}>
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

            {expanded && loveSentences?.length > 1 && (
                <TextTyper strings={loveSentences}
                           id={`role-typer`}
                           randomOrder={true}
                           className={`nav-profile-card-role`}/>
            )}

            {expanded && loveSentences?.length === 1 && (
                <div className={`nav-profile-card-role`}>
                    {loveSentences[0]}
                </div>
            )}

            {!expanded && !compactRail && (
                <div className={`nav-profile-card-compact-name`}>
                    {localizedName}
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
