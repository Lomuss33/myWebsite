import "./NavProfileCard.scss"
import React, {useCallback, useEffect, useId, useRef, useState} from "react"
import {Card} from "react-bootstrap"
import {useFloatingFrame} from "../../../hooks/floatingFrame.js"
import {useLanguage} from "../../../providers/LanguageProvider.jsx"
import {useUtils} from "../../../hooks/utils.js"
import ImageView from "../../generic/ImageView.jsx"
import TextTyper from "../../generic/TextTyper.jsx"
import AudioButton from "../../buttons/AudioButton.jsx"
import NavToolResumeDownloader from "../tools/NavToolResumeDownloader.jsx"

const PROFILE_AVATAR_SIZES = "(max-width: 991.98px) 96px, 144px"
const PROFILE_FRAME_SPIN_DURATION_MS = 3600
const PROFILE_FRAME_RETURN_DELAY_MS = 1000
const PROFILE_FRAME_RETURN_DURATION_MS = 420
const PROFILE_FRAME_TAP_SPIN_DURATION_MS = 1400
const DESKTOP_RESUME_MENU_POPPER_CONFIG = {
    modifiers: [
        {
            name: "offset",
            options: {
                offset: [0, -13]
            }
        }
    ]
}

function normalizeFrameAngle(angle) {
    const normalized = angle % 360
    return normalized < 0 ? normalized + 360 : normalized
}

function profileFrameMotionSuspended() {
    if(typeof window === "undefined") return true
    if(window.suspendAnimations) return true
    if(!window.matchMedia) return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function profileFrameUsesTapInteraction(event = null) {
    if(event?.pointerType === "touch" || event?.pointerType === "pen")
        return true

    if(typeof window === "undefined" || !window.matchMedia)
        return false

    return window.matchMedia("(hover: none), (pointer: coarse)").matches
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
    const metalFrameGradientId = useId()
    const headerRef = useRef(null)
    const mediaRef = useRef(null)
    const metalFrameRef = useRef(null)
    const nameHeadingRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameRef = useRef(null)
    const profileFrameAnimationRef = useRef(null)
    const profileFrameSpinStartAngleRef = useRef(0)
    const profileFrameRunningRef = useRef(false)
    const profileFrameAngleRef = useRef(0)
    const profileFrameReturnTimeoutRef = useRef(null)
    const profileFrameTapSpinTimeoutRef = useRef(null)
    const profileFrameTapClickPendingRef = useRef(false)
    const profileFrameIgnoreNextDocumentClickRef = useRef(false)
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
    const pronunciationTooltipLabel = language.getString("pronunciation")
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

    const setProfileFrameAngle = useCallback((angle) => {
        const metalFrameElement = metalFrameRef.current
        const normalizedAngle = normalizeFrameAngle(angle)
        profileFrameAngleRef.current = normalizedAngle
        if(metalFrameElement)
            metalFrameElement.style.transform = `translateZ(0) rotate(${normalizedAngle.toFixed(3)}deg)`
    }, [])

    const parseProfileFrameMatrixAngle = useCallback(() => {
        const metalFrameElement = metalFrameRef.current
        if(!metalFrameElement || typeof window === "undefined") return profileFrameAngleRef.current

        const transform = window.getComputedStyle(metalFrameElement).transform
        if(!transform || transform === "none") return profileFrameAngleRef.current

        try {
            const matrix = new DOMMatrixReadOnly(transform)
            return normalizeFrameAngle(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI))
        } catch {
            return profileFrameAngleRef.current
        }
    }, [])

    const getCurrentProfileFrameAngle = useCallback(() => {
        const animation = profileFrameAnimationRef.current
        if(profileFrameRunningRef.current && animation) {
            const currentTime = Number(animation.currentTime || 0)
            const cycleProgress = ((currentTime % PROFILE_FRAME_SPIN_DURATION_MS) / PROFILE_FRAME_SPIN_DURATION_MS)
            return normalizeFrameAngle(profileFrameSpinStartAngleRef.current + (cycleProgress * 360))
        }

        if(animation) return parseProfileFrameMatrixAngle()

        return profileFrameAngleRef.current
    }, [parseProfileFrameMatrixAngle])

    const clearProfileFrameReturnTimeout = useCallback(() => {
        if(profileFrameReturnTimeoutRef.current)
            clearTimeout(profileFrameReturnTimeoutRef.current)

        profileFrameReturnTimeoutRef.current = null
    }, [])

    const clearProfileFrameTapSpinTimeout = useCallback(() => {
        if(profileFrameTapSpinTimeoutRef.current)
            clearTimeout(profileFrameTapSpinTimeoutRef.current)

        profileFrameTapSpinTimeoutRef.current = null
    }, [])

    const cancelProfileFrameAnimation = useCallback((captureAngle = true) => {
        const animation = profileFrameAnimationRef.current
        const currentAngle = captureAngle ? getCurrentProfileFrameAngle() : profileFrameAngleRef.current

        if(animation)
            animation.cancel()

        profileFrameAnimationRef.current = null
        setProfileFrameAngle(currentAngle)
        return currentAngle
    }, [getCurrentProfileFrameAngle, setProfileFrameAngle])

    const lockProfileFrameAtDefault = useCallback(() => {
        const mediaElement = mediaRef.current
        const animation = profileFrameAnimationRef.current

        if(animation)
            animation.cancel()

        profileFrameAnimationRef.current = null
        profileFrameRunningRef.current = false
        profileFrameSpinStartAngleRef.current = 0
        mediaElement?.removeAttribute(`data-profile-frame-running`)
        mediaElement?.setAttribute(`data-profile-frame-paused`, `true`)
        setProfileFrameAngle(0)
    }, [setProfileFrameAngle])

    const startProfileFrameSpin = useCallback(() => {
        const mediaElement = mediaRef.current
        const metalFrameElement = metalFrameRef.current
        if(!mediaElement || !metalFrameElement) return

        clearProfileFrameTapSpinTimeout()
        clearProfileFrameReturnTimeout()
        const startAngle = cancelProfileFrameAnimation(true)

        if(profileFrameMotionSuspended()) {
            lockProfileFrameAtDefault()
            return
        }

        profileFrameRunningRef.current = true
        profileFrameSpinStartAngleRef.current = startAngle
        mediaElement.setAttribute(`data-profile-frame-running`, `true`)
        mediaElement.removeAttribute(`data-profile-frame-paused`)

        const animation = metalFrameElement.animate(
            [
                {transform: `translateZ(0) rotate(${startAngle}deg)`},
                {transform: `translateZ(0) rotate(${startAngle + 360}deg)`}
            ],
            {
                duration: PROFILE_FRAME_SPIN_DURATION_MS,
                iterations: Infinity,
                easing: "linear"
            }
        )

        profileFrameAnimationRef.current = animation
    }, [cancelProfileFrameAnimation, clearProfileFrameReturnTimeout, clearProfileFrameTapSpinTimeout, lockProfileFrameAtDefault])

    const returnProfileFrameToDefault = useCallback(() => {
        const mediaElement = mediaRef.current
        const metalFrameElement = metalFrameRef.current
        if(!mediaElement || !metalFrameElement) return

        clearProfileFrameReturnTimeout()
        const startAngle = cancelProfileFrameAnimation(true)
        profileFrameRunningRef.current = false
        mediaElement.removeAttribute(`data-profile-frame-running`)
        mediaElement.setAttribute(`data-profile-frame-paused`, `true`)

        if(profileFrameMotionSuspended() || startAngle < 0.001) {
            lockProfileFrameAtDefault()
            return
        }

        const animation = metalFrameElement.animate(
            [
                {transform: `translateZ(0) rotate(${startAngle}deg)`},
                {transform: "translateZ(0) rotate(0deg)"}
            ],
            {
                duration: PROFILE_FRAME_RETURN_DURATION_MS,
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                fill: "forwards"
            }
        )

        profileFrameAnimationRef.current = animation
        animation.finished.then(() => {
            if(profileFrameAnimationRef.current !== animation) return
            lockProfileFrameAtDefault()
        }).catch(() => {})
    }, [cancelProfileFrameAnimation, clearProfileFrameReturnTimeout, lockProfileFrameAtDefault])

    const pauseProfileFrameSpin = useCallback(() => {
        const mediaElement = mediaRef.current
        if(!mediaElement) return

        clearProfileFrameTapSpinTimeout()
        clearProfileFrameReturnTimeout()
        const currentAngle = cancelProfileFrameAnimation(true)
        profileFrameRunningRef.current = false
        mediaElement.removeAttribute(`data-profile-frame-running`)
        mediaElement.setAttribute(`data-profile-frame-paused`, `true`)
        setProfileFrameAngle(currentAngle)

        profileFrameReturnTimeoutRef.current = setTimeout(() => {
            profileFrameReturnTimeoutRef.current = null
            returnProfileFrameToDefault()
        }, PROFILE_FRAME_RETURN_DELAY_MS)
    }, [cancelProfileFrameAnimation, clearProfileFrameReturnTimeout, clearProfileFrameTapSpinTimeout, returnProfileFrameToDefault, setProfileFrameAngle])

    const startProfileFrameTapSpin = useCallback(() => {
        if(profileFrameMotionSuspended()) {
            lockProfileFrameAtDefault()
            return
        }

        startProfileFrameSpin()
        profileFrameTapSpinTimeoutRef.current = setTimeout(() => {
            profileFrameTapSpinTimeoutRef.current = null
            if(profileFrameRunningRef.current)
                pauseProfileFrameSpin()
        }, PROFILE_FRAME_TAP_SPIN_DURATION_MS)
    }, [lockProfileFrameAtDefault, pauseProfileFrameSpin, startProfileFrameSpin])

    useEffect(() => {
        setShowAlternateProfilePicture(
            getPageLoadRandomValue("nav-profile-card:avatar") < alternateProfilePictureDefaultChance
        )
    }, [safeProfile.profilePictureAltUrl, alternateProfilePictureDefaultChance])

    useEffect(() => {
        const onDocumentClicked = () => {
            if(profileFrameIgnoreNextDocumentClickRef.current) {
                profileFrameIgnoreNextDocumentClickRef.current = false
                return
            }

            if(profileFrameRunningRef.current)
                pauseProfileFrameSpin()
        }

        setProfileFrameAngle(0)
        document.addEventListener(`click`, onDocumentClicked)

        return () => {
            const mediaElement = mediaRef.current
            document.removeEventListener(`click`, onDocumentClicked)
            clearProfileFrameReturnTimeout()
            clearProfileFrameTapSpinTimeout()
            cancelProfileFrameAnimation(false)
            mediaElement?.removeAttribute(`data-profile-frame-running`)
            mediaElement?.removeAttribute(`data-profile-frame-paused`)
            setProfileFrameAngle(0)
        }
    }, [cancelProfileFrameAnimation, clearProfileFrameReturnTimeout, clearProfileFrameTapSpinTimeout, pauseProfileFrameSpin, setProfileFrameAngle])

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

    const _onMediaPointerDown = (event) => {
        if(!profileFrameUsesTapInteraction(event))
            return

        profileFrameTapClickPendingRef.current = true
        profileFrameIgnoreNextDocumentClickRef.current = true
        startProfileFrameTapSpin()
    }

    const _onMediaClicked = (event) => {
        if(profileFrameTapClickPendingRef.current) {
            profileFrameTapClickPendingRef.current = false
        } else if(!profileFrameUsesTapInteraction(event)) {
            pauseProfileFrameSpin()
        }

        setShowAlternateProfilePicture((current) => !current)
    }

    const _onMediaPointerEnter = (event) => {
        floatingFrame.onPointerEnter(event)
        if(!profileFrameUsesTapInteraction(event))
            startProfileFrameSpin()
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
                                             tooltipLabel={pronunciationTooltipLabel}
                                             size={AudioButton.Sizes.DEFAULT}
                                             buttonClassName={`nav-profile-card-desktop-audio-button`}
                                             tooltipClassName={`nav-profile-card-desktop-audio-tooltip`}/>
                            </div>
                        )}
                    </div>
                )}

                <div className={`nav-profile-card-media floating-frame`}
                     ref={mediaRef}
                     onPointerDown={_onMediaPointerDown}
                     onPointerEnter={_onMediaPointerEnter}
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
                    <div className={`nav-profile-card-metal-frame`}
                         aria-hidden={true}>
                        <div className={`nav-profile-card-metal-frame-rotor`}
                             ref={metalFrameRef}>
                            <svg className={`nav-profile-card-metal-frame-track`}
                                 viewBox={`0 0 100 100`}
                                 focusable={false}
                                 aria-hidden={true}>
                                <defs>
                                    <linearGradient id={metalFrameGradientId}
                                                    x1={`0`}
                                                    y1={`0`}
                                                    x2={`0`}
                                                    y2={`100`}
                                                    gradientUnits={`userSpaceOnUse`}>
                                        <stop offset={`0%`}
                                              stopColor={`var(--nav-short-rail-frame-red)`}/>
                                        <stop offset={`33%`}
                                              stopColor={`var(--nav-short-rail-frame-red)`}/>
                                        <stop offset={`33.4%`}
                                              stopColor={`var(--nav-short-rail-frame-white)`}/>
                                        <stop offset={`66%`}
                                              stopColor={`var(--nav-short-rail-frame-white)`}/>
                                        <stop offset={`66.4%`}
                                              stopColor={`var(--nav-short-rail-frame-blue)`}/>
                                        <stop offset={`100%`}
                                              stopColor={`var(--nav-short-rail-frame-blue)`}/>
                                    </linearGradient>
                                </defs>
                                <path stroke={`url(#${metalFrameGradientId})`}
                                      d={`M 50 8 C 58 15 66 8 72 16 C 78 24 88 21 88 32 C 88 41 98 45 90 52 C 82 59 91 68 80 75 C 71 81 72 92 60 88 C 51 85 45 96 38 87 C 32 79 21 84 20 72 C 19 62 8 60 15 50 C 21 42 10 34 21 27 C 30 22 27 11 38 14 C 44 16 46 5 50 8 Z`}/>
                            </svg>
                        </div>
                    </div>

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
