import "./NavProfileCard.scss"
import {useEffect, useRef} from "react"
import {Card} from "react-bootstrap"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../../providers/NavigationProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import ImageView from "../../generic/ImageView.jsx"
import StatusCircle from "../../generic/StatusCircle.jsx"
import TextTyper from "../../generic/TextTyper.jsx"
import AudioButton from "../../buttons/AudioButton.jsx"

function NavProfileCard({ profile, expanded }) {
    const language = useLanguage()
    const navigation = useNavigation()
    const utils = useUtils()
    const mediaRef = useRef(null)
    const timeoutsRef = useRef({enter: null, reset: null, cleanup: null})

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

    const navProfileCardNameClass = namePronunciationButtonVisible ?
        `nav-profile-card-name-with-audio-button` :
        ``

    const _onStatusBadgeClicked = () => {
        navigation.navigateToSectionWithId("contact")
    }

    const _isMotionSuppressed = () => {
        if(utils.storage.getWindowVariable("suspendAnimations"))
            return true

        if(typeof window === "undefined" || typeof window.matchMedia !== "function")
            return false

        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }

    const _clearTimeouts = () => {
        const {enter, reset, cleanup} = timeoutsRef.current
        if(enter) clearTimeout(enter)
        if(reset) clearTimeout(reset)
        if(cleanup) clearTimeout(cleanup)
        timeoutsRef.current = {enter: null, reset: null, cleanup: null}
    }

    useEffect(() => {
        return () => {
            _clearTimeouts()
        }
    }, [])

    const _onMediaPointerEnter = () => {
        if(_isMotionSuppressed())
            return

        const el = mediaRef.current
        if(!el)
            return

        _clearTimeouts()
        el.classList.add("nav-profile-card-media-tilt-active")
        el.classList.add("nav-profile-card-media-tilt-transition")
        timeoutsRef.current.enter = setTimeout(() => {
            el.classList.remove("nav-profile-card-media-tilt-transition")
        }, 250)
    }

    const _onMediaPointerMove = (event) => {
        const el = mediaRef.current
        if(!el || !el.classList.contains("nav-profile-card-media-tilt-active"))
            return

        const rect = el.getBoundingClientRect()
        if(!rect.width || !rect.height)
            return

        const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
        const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)
        const middleX = rect.width / 2
        const middleY = rect.height / 2

        const rotationLimit = 6
        const rotateX = (x - middleX) * (rotationLimit / middleX)
        const rotateY = (middleY - y) * (rotationLimit / middleY)

        el.style.transform = `perspective(900px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
    }

    const _onMediaPointerLeave = () => {
        const el = mediaRef.current
        if(!el)
            return

        _clearTimeouts()
        el.classList.add("nav-profile-card-media-tilt-transition")

        timeoutsRef.current.reset = setTimeout(() => {
            el.style.removeProperty("transform")
        }, 250)

        timeoutsRef.current.cleanup = setTimeout(() => {
            el.classList.remove("nav-profile-card-media-tilt-transition")
            el.classList.remove("nav-profile-card-media-tilt-active")
        }, 500)
    }

    return (
        <Card className={`nav-profile-card ${expandedClass}`}>
            <div className={`nav-profile-card-header`}>
                <div className={`nav-profile-card-media`}
                     ref={mediaRef}
                     onPointerEnter={_onMediaPointerEnter}
                     onPointerMove={_onMediaPointerMove}
                     onPointerLeave={_onMediaPointerLeave}>
                    <ImageView src={profilePictureUrl}
                               className={`nav-profile-card-avatar`}
                               hideSpinner={true}
                               alt={name}/>

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

                            <span className={`nav-profile-card-name-line-group`}>
                                {lastName && (
                                    <span className={`nav-profile-card-name-line nav-profile-card-name-line-last`}>
                                        {lastName}
                                    </span>
                                )}

                                {namePronunciationButtonVisible && (
                                    <AudioButton url={namePronunciationAudioUrl}
                                                 tooltip={namePronunciationIpa}
                                                 size={AudioButton.Sizes.DYNAMIC_FOR_NAV_TITLE}/>
                                )}
                            </span>
                        </span>
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

            {!expanded && (
                <div className={`nav-profile-card-compact-name`}>
                    {localizedName}
                </div>
            )}
        </Card>
    )
}

export default NavProfileCard
