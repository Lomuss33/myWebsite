import "./NavProfileCard.scss"
import React, {useState} from "react"
import {Card} from "react-bootstrap"
import {useFloatingFrame} from "../../../hooks/floatingFrame.js"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../../providers/NavigationProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import ImageView from "../../generic/ImageView.jsx"
import StatusCircle from "../../generic/StatusCircle.jsx"
import TextTyper from "../../generic/TextTyper.jsx"
import AudioButton from "../../buttons/AudioButton.jsx"

function NavProfileCard({ profile, expanded, compactRail = false }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const utils = useUtils()
    const floatingFrame = useFloatingFrame()
    const [showAlternateProfilePicture, setShowAlternateProfilePicture] = useState(false)

    const expandedClass = expanded ?
        `` :
        `nav-profile-card-shrink`

    const name = profile.name
    const localizedName = language.getTranslation(profile.locales, "localized_name", null) || name
    const nameParts = localizedName.trim().split(/\s+/)
    const firstName = nameParts[0] || localizedName
    const lastName = nameParts.slice(1).join(" ")

    let loveSentences = language.getTranslation(profile.locales, "love_sentences", [])
    if(utils.storage.getWindowVariable("suspendAnimations") && loveSentences.length > 2)
        loveSentences = [loveSentences[0]]

    const profilePictureUrl = language.parseJsonText(profile.profilePictureUrl)

    const statusCircleVisible = Boolean(profile.statusCircleVisible)
    const statusCircleVariant = statusCircleVisible ?
        profile.statusCircleVariant :
        ""

    const statusCircleHoverMessage = statusCircleVisible ?
        language.getTranslation(profile.locales, profile.statusCircleHoverMessage) :
        null

    const statusCircleSize = expanded ?
        StatusCircle.Sizes.DEFAULT :
        StatusCircle.Sizes.SMALL

    const namePronunciationIpa = language.getTranslation(profile.locales, "name_pronunciation_ipa", null)
    const namePronunciationAudioUrl = language.getTranslation(profile.locales, "name_pronunciation_audio_url", null)
    const namePronunciationButtonVisible = namePronunciationIpa || namePronunciationAudioUrl
    const namePronunciationTooltipLabel = namePronunciationIpa ? `<span class="audio-button-tooltip-lines"><span class="audio-button-tooltip-line audio-button-tooltip-line-top">lǒːʋro  ˈmu.sit͡ɕ</span><span class="audio-button-tooltip-line audio-button-tooltip-line-bottom">LOHV-roh  muu-SEEch</span></span>` : ""

    const navProfileCardNameClass = namePronunciationButtonVisible ?
        `nav-profile-card-name-with-audio-button` :
        ``

    const secondaryProfilePictureUrl = language.parseJsonText(profile.profilePictureAltUrl) || "images/contant/profil.webp"

    const _onStatusBadgeClicked = () => {
        navigation.navigateToSectionWithId("contact")
    }

    const _onMediaClicked = (event) => {
        if(event?.target?.closest?.(".status-circle"))
            return

        setShowAlternateProfilePicture((current) => !current)
    }

    return (
        <Card className={`nav-profile-card ${expandedClass}`}>
            <div className={`nav-profile-card-header`}>
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
                                       alt={name}/>
                        </div>

                        <div className={`nav-profile-card-avatar-face nav-profile-card-avatar-face-back`}>
                            <ImageView src={secondaryProfilePictureUrl}
                                       className={`nav-profile-card-avatar`}
                                       hideSpinner={true}
                                       alt={name}/>
                        </div>
                    </div>

                    {statusCircleVisible && (
                        <StatusCircle className={`nav-profile-card-status-circle`}
                                      variant={statusCircleVariant}
                                      message={statusCircleHoverMessage}
                                      size={statusCircleSize} onClick={_onStatusBadgeClicked}/>
                    )}
                </div>

                <div className={`nav-profile-card-info`}>
                    <h1 className={`nav-profile-card-name ${navProfileCardNameClass}`}>
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

                        {namePronunciationButtonVisible && (
                            <span className={`nav-profile-card-name-audio-button`}>
                                <AudioButton url={namePronunciationAudioUrl}
                                             tooltip={namePronunciationIpa}
                                             tooltipLabel={namePronunciationTooltipLabel}
                                             size={AudioButton.Sizes.DYNAMIC_FOR_NAV_TITLE}/>
                            </span>
                        )}
                    </h1>
                </div>
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
