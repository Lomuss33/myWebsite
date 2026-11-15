import "./ArticleComplaintForm.scss"
import React, {useEffect, useRef, useState} from 'react'
import {createPortal} from "react-dom"
import {useApi} from "../../hooks/api.js"
import {useConstants} from "../../hooks/constants.js"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {
    ALLOWED_REPRODUCIBILITY,
    ALLOWED_SECTIONS,
    collectBrowserDiagnostics,
    evaluateDescriptionQuality
} from "../../utils/bugReportValidator.js"
import Article from "./base/Article.jsx"
import Textarea from "../forms/fields/Textarea.jsx"
import StandardButton from "../buttons/StandardButton.jsx"

export const DESTINATIONS = {
    NOWHERE: "nowhere",
    BUG_REPORT: "bug_report",
    YOU_WHERE: "you_where",
    KNJIGA: "knjiga_zalbi",
    ANZEIGE: "anzeige_raus",
}

const POPUP_COUNT = 30
const NOWHERE_SPARK_COUNT = 54
const NOWHERE_SPARK_COLORS_DARK = ["#60a5fa", "#f97316", "#22c55e", "#a855f7", "#06b6d4", "#f59e0b", "#f472b6"]
const NOWHERE_SPARK_COLORS_LIGHT = ["#1d4ed8", "#d97706", "#0f766e", "#7c3aed", "#0284c7", "#b45309", "#db2777"]

function createDestinationOptions(labels) {
    return [
        { value: DESTINATIONS.NOWHERE, label: labels.nowhereLabel },
        { value: DESTINATIONS.BUG_REPORT, label: labels.bugReportLabel },
        { value: DESTINATIONS.YOU_WHERE, label: labels.youWhereLabel },
        { value: DESTINATIONS.KNJIGA, label: labels.knjigaLabel },
        { value: DESTINATIONS.ANZEIGE, label: labels.anzeigeLabel },
    ]
}

function ArticleComplaintForm({ dataWrapper }) {
    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-complaint-form`}>
            <ArticleComplaintFormContent dataWrapper={dataWrapper}/>
        </Article>
    )
}

function ArticleComplaintFormContent({ dataWrapper }) {
    const api = useApi()
    const constants = useConstants()
    const feedbacks = useFeedbacks()
    const language = useLanguage()
    const navigation = useNavigation()
    const theme = useTheme()
    const viewport = useViewport()
    const selectedThemeId = theme.getSelectedTheme()?.id || "dark"

    const [message, setMessage] = useState("")
    const [destination, setDestination] = useState(DESTINATIONS.NOWHERE)
    const [validationError, setValidationError] = useState(null)
    const [statusMessage, setStatusMessage] = useState(null)
    const [complaintPopups, setComplaintPopups] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [nowhereBursts, setNowhereBursts] = useState([])
    const [isDestinationMenuOpen, setIsDestinationMenuOpen] = useState(false)
    const [isDetailsExpanded, setIsDetailsExpanded] = useState(false)
    const [affectedSection, setAffectedSection] = useState("")
    const [reproducibility, setReproducibility] = useState("sometimes")
    const [steps, setSteps] = useState("")
    const [expectedBehavior, setExpectedBehavior] = useState("")
    const [replyEmail, setReplyEmail] = useState("")
    const [honeypot, setHoneypot] = useState("")
    const [turnstileToken, setTurnstileToken] = useState("")
    const [arrivedViaSaltShaker, setArrivedViaSaltShaker] = useState(false)

    const sendButtonWrapperRef = useRef(null)
    const destinationMenuRef = useRef(null)
    const destinationButtonRef = useRef(null)
    const destinationOptionRefs = useRef(new Map())
    const popupCloseButtonRefs = useRef(new Map())
    const pendingDestinationFocusRef = useRef(null)
    const pendingTimeoutIdsRef = useRef(new Set())
    const mountedRef = useRef(true)
    const previousComplaintPopupCountRef = useRef(0)
    const turnstileContainerRef = useRef(null)
    const turnstileWidgetIdRef = useRef(null)

    const settings = dataWrapper.settings || {}
    const turnstileSiteKey = String(settings.turnstileSiteKey || import.meta.env.VITE_TURNSTILE_SITE_KEY || "").trim()

    const complaintEmail = dataWrapper.locales.complaintEmailLabel || "trash@lovro-music.de"
    const complaintNote = String(dataWrapper.locales.complaintNote || "").trim()
    const complaintDestinationLabel = dataWrapper.locales.complaintDestinationLabel || "destination"
    const complaintNowhereLabel = dataWrapper.locales.complaintNowhereLabel || "nowhere"
    const complaintBugReportLabel = dataWrapper.locales.complaintBugReportLabel || "Report a website bug"
    const complaintFeedbackLabel = dataWrapper.locales.complaintFeedbackLabel || "Send complaint / feedback"
    const complaintYouWhereLabel = dataWrapper.locales.complaintYouWhereLabel || "actual hate"
    const complaintKnjigaLabel = dataWrapper.locales.complaintKnjigaLabel || "Knjiga zalbi"
    const complaintAnzeigeLabel = dataWrapper.locales.complaintAnzeigeLabel || "Anzeige raus"
    const complaintSendLabel = dataWrapper.locales.complaintSendLabel || language.getString("send_message")
    const complaintBugSendLabel = dataWrapper.locales.complaintBugSendLabel || complaintSendLabel
    const complaintYouWhereTitle = dataWrapper.locales.complaintYouWhereTitle || complaintYouWhereLabel
    const complaintYouWhereBody = dataWrapper.locales.complaintYouWhereBody || complaintYouWhereLabel
    const complaintSentTitle = dataWrapper.locales.complaintSentTitle || ""
    const complaintSentBody = dataWrapper.locales.complaintSentBody || ""
    const complaintBugSentTitle = dataWrapper.locales.complaintBugSentTitle || complaintSentTitle
    const complaintBugSentBody = dataWrapper.locales.complaintBugSentBody || complaintSentBody
    const complaintPopupTitle = dataWrapper.locales.complaintPopupTitle || "Anzeige raus"
    const complaintBugPlaceholder = dataWrapper.locales.complaintBugPlaceholder || "complaint"
    const complaintBugBannerTitle = dataWrapper.locales.complaintBugBannerTitle || complaintBugReportLabel
    const complaintBugBannerHint = dataWrapper.locales.complaintBugBannerHint || ""
    const complaintBugDetailsToggleOpen = dataWrapper.locales.complaintBugDetailsToggleOpen || "Add reproduction details"
    const complaintBugDetailsToggleClose = dataWrapper.locales.complaintBugDetailsToggleClose || "Hide reproduction details"
    const complaintBugSectionLabel = dataWrapper.locales.complaintBugSectionLabel || "Affected section"
    const complaintBugSectionAuto = dataWrapper.locales.complaintBugSectionAuto || "Current section (auto)"
    const complaintBugReproducibilityLabel = dataWrapper.locales.complaintBugReproducibilityLabel || "Reproducibility"
    const complaintBugReproAlways = dataWrapper.locales.complaintBugReproAlways || "Every time"
    const complaintBugReproSometimes = dataWrapper.locales.complaintBugReproSometimes || "Sometimes"
    const complaintBugReproOnce = dataWrapper.locales.complaintBugReproOnce || "Once"
    const complaintBugReproUnsure = dataWrapper.locales.complaintBugReproUnsure || "Not sure"
    const complaintBugStepsLabel = dataWrapper.locales.complaintBugStepsLabel || "Steps to reproduce"
    const complaintBugStepsPlaceholder = dataWrapper.locales.complaintBugStepsPlaceholder || ""
    const complaintBugExpectedLabel = dataWrapper.locales.complaintBugExpectedLabel || "Expected vs. actual result"
    const complaintBugExpectedPlaceholder = dataWrapper.locales.complaintBugExpectedPlaceholder || ""
    const complaintBugReplyEmailLabel = dataWrapper.locales.complaintBugReplyEmailLabel || "Reply email (optional)"
    const complaintBugReplyEmailPlaceholder = dataWrapper.locales.complaintBugReplyEmailPlaceholder || ""
    const complaintBugPrivacyNote = dataWrapper.locales.complaintBugPrivacyNote || ""
    const complaintBugQualityHint = dataWrapper.locales.complaintBugQualityHint || ""

    const isBugReportMode = destination === DESTINATIONS.BUG_REPORT
    const activeSubmitLabel = isBugReportMode ? complaintBugSendLabel : complaintSendLabel
    const activePlaceholder = isBugReportMode ? complaintBugPlaceholder : "complaint"

    const destinationOptions = createDestinationOptions({
        nowhereLabel: complaintNowhereLabel,
        bugReportLabel: complaintBugReportLabel,
        youWhereLabel: complaintYouWhereLabel,
        knjigaLabel: complaintKnjigaLabel,
        anzeigeLabel: complaintAnzeigeLabel
    })
    const currentDestinationLabel = destinationOptions.find((option) => option.value === destination)?.label || complaintNowhereLabel
    const destinationMenuId = `${dataWrapper.uniqueId}-destination-menu`
    const destinationTriggerLabelId = `${dataWrapper.uniqueId}-destination-trigger-label`
    const destinationTriggerValueId = `${dataWrapper.uniqueId}-destination-trigger-value`
    const complaintPopupsTitleIdPrefix = `${dataWrapper.uniqueId}-complaint-popup`
    const detailsPanelId = `${dataWrapper.uniqueId}-bug-details-panel`
    const errorMessage = validationError ? language.getString(validationError.errorCode) : null
    const hasComplaintNote = complaintNote.length > 0

    const descriptionQuality = isBugReportMode ?
        evaluateDescriptionQuality(message, {
            affectedSection,
            steps,
            expectedBehavior
        }) :
        { isWeak: false }

    const reproducibilityLabels = {
        always: complaintBugReproAlways,
        sometimes: complaintBugReproSometimes,
        once: complaintBugReproOnce,
        unsure: complaintBugReproUnsure
    }

    useEffect(() => {
        return () => {
            mountedRef.current = false
            clearPendingTimeouts()
        }
    }, [])

    useEffect(() => {
        const pendingFocus = navigation?.pendingArticleFocus
        if(!pendingFocus || pendingFocus.articleUniqueId !== dataWrapper.uniqueId)
            return

        let cancelled = false
        let observer = null
        let rafId = 0

        const isArticleReady = () => {
            if(typeof document === "undefined")
                return false

            const sectionEl = document.getElementById(`section-${dataWrapper.sectionId}`)
            const articleEl = document.getElementById(dataWrapper.uniqueId)
            if(!sectionEl || !articleEl)
                return false

            if(!sectionEl.classList.contains("section-shown"))
                return false

            const contentReady = sectionEl.querySelector(".section-content-page-ready")
            const loadingPlaceholder = sectionEl.querySelector(".section-loading-placeholder")
            return Boolean(contentReady && !loadingPlaceholder)
        }

        const completeArrival = () => {
            if(cancelled || !mountedRef.current)
                return

            const articleEl = document.getElementById(dataWrapper.uniqueId)
            if(!articleEl)
                return

            if(pendingFocus.mode === "report") {
                setDestination(DESTINATIONS.BUG_REPORT)
                setArrivedViaSaltShaker(true)
                setValidationError(null)
                setStatusMessage(null)
            }

            scrollComplaintArticleIntoView(articleEl, dataWrapper.sectionId, Boolean(viewport?.isMobileLayout?.()))

            rafId = window.requestAnimationFrame(() => {
                if(cancelled || !mountedRef.current)
                    return

                const textareaEl = articleEl.querySelector("#complaint-form-textarea")
                const focusTarget = textareaEl || destinationButtonRef.current || articleEl
                focusTarget?.focus?.({ preventScroll: true })
                navigation?.clearPendingArticleFocus?.(pendingFocus.requestId)
            })
        }

        if(isArticleReady()) {
            rafId = window.requestAnimationFrame(completeArrival)
        }
        else if(typeof MutationObserver !== "undefined" && typeof document !== "undefined") {
            const observeTarget = document.getElementById(`section-${dataWrapper.sectionId}`) || document.body
            observer = new MutationObserver(() => {
                if(isArticleReady()) {
                    observer?.disconnect()
                    observer = null
                    rafId = window.requestAnimationFrame(completeArrival)
                }
            })
            observer.observe(observeTarget, {
                attributes: true,
                childList: true,
                subtree: true
            })
        }

        return () => {
            cancelled = true
            observer?.disconnect()
            if(rafId && typeof window !== "undefined") {
                window.cancelAnimationFrame(rafId)
            }
        }
    }, [dataWrapper.sectionId, dataWrapper.uniqueId, navigation, viewport])

    useEffect(() => {
        if(!isDestinationMenuOpen)
            return

        const handlePointerDown = (event) => {
            if(destinationMenuRef.current?.contains(event.target))
                return

            closeDestinationMenu()
        }

        const handleEscape = (event) => {
            if(event.key !== "Escape")
                return

            event.preventDefault()
            closeDestinationMenu({ focusTrigger: true })
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleEscape)

        const focusValue = pendingDestinationFocusRef.current || destination
        const frameId = window.requestAnimationFrame(() => {
            focusDestinationOption(focusValue)
            pendingDestinationFocusRef.current = null
        })

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleEscape)
            window.cancelAnimationFrame(frameId)
        }
    }, [destination, isDestinationMenuOpen])

    useEffect(() => {
        const previousCount = previousComplaintPopupCountRef.current
        previousComplaintPopupCountRef.current = complaintPopups.length

        const handleEscape = (event) => {
            if(event.key !== "Escape")
                return

            event.preventDefault()
            closeTopComplaintPopup()
        }

        if(complaintPopups.length > 0) {
            document.addEventListener("keydown", handleEscape)
        }

        const frameId = window.requestAnimationFrame(() => {
            if(complaintPopups.length > 0) {
                const topmostPopup = complaintPopups[complaintPopups.length - 1]
                if(topmostPopup) {
                    popupCloseButtonRefs.current.get(topmostPopup.id)?.focus()
                }
            }
            else if(previousCount > 0) {
                destinationButtonRef.current?.focus()
            }
        })

        return () => {
            if(complaintPopups.length > 0) {
                document.removeEventListener("keydown", handleEscape)
            }
            window.cancelAnimationFrame(frameId)
        }
    }, [complaintPopups.length])

    const handleDestinationChange = (nextDestination) => {
        setValidationError(null)
        setStatusMessage(null)
        setDestination(nextDestination)
        closeDestinationMenu({ focusTrigger: true })

        if(nextDestination === DESTINATIONS.ANZEIGE || nextDestination === DESTINATIONS.NOWHERE) {
            setComplaintPopups([])
        }
    }

    const handleDestinationTriggerClick = () => {
        if(isDestinationMenuOpen) {
            closeDestinationMenu({ focusTrigger: true })
            return
        }

        openDestinationMenu(destination)
    }

    const handleDestinationTriggerKeyDown = (event) => {
        const key = event.key
        const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "]

        if(key === "Escape") {
            if(isDestinationMenuOpen) {
                event.preventDefault()
                closeDestinationMenu({ focusTrigger: true })
            }
            return
        }

        if(!openKeys.includes(key))
            return

        event.preventDefault()

        const currentIndex = destinationOptions.findIndex((option) => option.value === destination)
        const nextIndex = key === "ArrowUp" ?
            (currentIndex - 1 + destinationOptions.length) % destinationOptions.length :
            currentIndex >= 0 ?
                (currentIndex + 1) % destinationOptions.length :
                0

        const nextValue = key === "Enter" || key === " " ?
            destination :
            destinationOptions[nextIndex]?.value || destination

        openDestinationMenu(nextValue)
    }

    const handleDestinationOptionKeyDown = (event, optionValue) => {
        const key = event.key
        const currentIndex = destinationOptions.findIndex((option) => option.value === optionValue)

        if(key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End") {
            event.preventDefault()

            let nextIndex = currentIndex
            if(key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % destinationOptions.length
            }
            else if(key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + destinationOptions.length) % destinationOptions.length
            }
            else if(key === "Home") {
                nextIndex = 0
            }
            else if(key === "End") {
                nextIndex = destinationOptions.length - 1
            }

            const nextValue = destinationOptions[nextIndex]?.value
            if(nextValue) {
                pendingDestinationFocusRef.current = nextValue
                focusDestinationOption(nextValue)
            }
            return
        }

        if(key === "Enter" || key === " ") {
            event.preventDefault()
            handleDestinationChange(optionValue)
            return
        }

        if(key === "Escape") {
            event.preventDefault()
            closeDestinationMenu({ focusTrigger: true })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if(isSending)
            return

        if(destination === DESTINATIONS.NOWHERE) {
            triggerNowhereBurst(sendButtonWrapperRef.current, selectedThemeId)
            setMessage("")
            setStatusMessage(null)
            return
        }

        if(destination === DESTINATIONS.YOU_WHERE) {
            openThrowoffTab(complaintYouWhereTitle, complaintYouWhereBody)
            setDestination(DESTINATIONS.NOWHERE)
            setMessage("")
            setValidationError(null)
            setStatusMessage(null)
            return
        }

        if(destination === DESTINATIONS.ANZEIGE) {
            setValidationError(null)
            setStatusMessage(null)
            setComplaintPopups(createComplaintPopups(complaintPopupTitle))
            return
        }

        if(destination === DESTINATIONS.BUG_REPORT) {
            await handleBugReportSubmit()
            return
        }

        if(destination !== DESTINATIONS.KNJIGA) {
            return
        }

        const validation = api.validators.validateComplaintRequest(message, complaintEmail)
        if(!validation.success) {
            setValidationError(validation)
            setStatusMessage(null)
            return
        }

        const settings = dataWrapper.settings || {}
        const publicKey = settings.emailJsPublicKey
        const serviceId = settings.emailJsServiceId
        const templateId = settings.emailJsComplaintTemplateId || settings.emailJsTemplateId

        if(!publicKey || !serviceId || !templateId) {
            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
            setStatusMessage(null)
            return
        }

        setValidationError(null)
        setStatusMessage(null)
        setIsSending(true)
        feedbacks.setActivitySpinnerVisible(true, dataWrapper.uniqueId, language.getString("sending_message"))

        try {
            const response = await api.handlers.sendEmailRequest(
                validation.bundle,
                publicKey,
                serviceId,
                templateId
            )

            if(!mountedRef.current)
                return

            if(!response?.success) {
                setValidationError({
                    errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
                })
                return
            }

            setMessage("")
            setStatusMessage([complaintSentTitle, complaintSentBody].filter(Boolean).join(" "))
        }
        catch (_error) {
            if(!mountedRef.current)
                return

            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
        }
        finally {
            feedbacks.setActivitySpinnerVisible(false, dataWrapper.uniqueId)
            if(mountedRef.current) {
                setIsSending(false)
            }
        }
    }

    useEffect(() => {
        if(!isBugReportMode || !turnstileSiteKey || typeof window === "undefined" || typeof document === "undefined") {
            return
        }

        let cancelled = false

        const mountWidget = () => {
            if(cancelled || !mountedRef.current || !turnstileContainerRef.current || !window.turnstile?.render) {
                return
            }

            if(turnstileWidgetIdRef.current !== null && window.turnstile?.remove) {
                try {
                    window.turnstile.remove(turnstileWidgetIdRef.current)
                }
                catch (_error) {
                    // ignore widget cleanup error
                }
                turnstileWidgetIdRef.current = null
            }

            turnstileContainerRef.current.innerHTML = ""
            turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
                sitekey: turnstileSiteKey,
                theme: selectedThemeId === "light" ? "light" : "dark",
                callback: (token) => {
                    if(mountedRef.current) {
                        setTurnstileToken(String(token || ""))
                    }
                },
                "expired-callback": () => {
                    if(mountedRef.current) {
                        setTurnstileToken("")
                    }
                },
                "error-callback": () => {
                    if(mountedRef.current) {
                        setTurnstileToken("")
                    }
                }
            })
        }

        if(window.turnstile?.render) {
            mountWidget()
        }
        else {
            const scriptId = "cloudflare-turnstile-api-script"
            let scriptEl = document.getElementById(scriptId)
            const handleLoad = () => {
                mountWidget()
            }

            if(!scriptEl) {
                scriptEl = document.createElement("script")
                scriptEl.id = scriptId
                scriptEl.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                scriptEl.async = true
                scriptEl.defer = true
                scriptEl.addEventListener("load", handleLoad, { once: true })
                document.head.appendChild(scriptEl)
            }
            else {
                scriptEl.addEventListener("load", handleLoad, { once: true })
            }
        }

        return () => {
            cancelled = true
            if(turnstileWidgetIdRef.current !== null && window.turnstile?.remove) {
                try {
                    window.turnstile.remove(turnstileWidgetIdRef.current)
                }
                catch (_error) {
                    // ignore widget cleanup error
                }
                turnstileWidgetIdRef.current = null
            }
        }
    }, [isBugReportMode, selectedThemeId, turnstileSiteKey])

    async function handleBugReportSubmit() {
        const diagnostics = collectBrowserDiagnostics({
            section: affectedSection || navigation?.activeSectionId || dataWrapper.sectionId || "contact",
            language: language.getSelectedLanguage()?.id || "en",
            theme: selectedThemeId,
            layoutMode: viewport?.getLayoutConstraints?.()?.layoutMode || "",
            cursorMode: feedbacks?.cursorMode || "magic",
            source: arrivedViaSaltShaker ? "salt-shaker" : "complaint-form"
        })

        const resolvedTurnstileToken = String(
            turnstileToken ||
            (typeof window !== "undefined" ? window.__mockTurnstileToken : "") ||
            ""
        ).trim()

        const hasMockTransport = typeof window !== "undefined" && typeof window.__mockBugReportTransport === "function"

        if(turnstileSiteKey && !resolvedTurnstileToken && !hasMockTransport) {
            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
            setStatusMessage(null)
            return
        }

        const validation = api.validators.validateBugReportRequest({
            type: "bug_report",
            description: message,
            affectedSection: affectedSection || diagnostics.section,
            reproducibility,
            steps,
            expectedBehavior,
            replyEmail,
            honeypot,
            turnstileToken: resolvedTurnstileToken,
            diagnostics
        })

        if(!validation.success) {
            setValidationError(validation)
            setStatusMessage(null)
            return
        }

        setValidationError(null)
        setStatusMessage(null)
        setIsSending(true)
        feedbacks.setActivitySpinnerVisible(
            true,
            dataWrapper.uniqueId,
            language.getString("sending_bug_report") || language.getString("sending_message")
        )

        try {
            const response = await api.handlers.submitBugReportRequest(validation.bundle, {
                endpoint: settings.reportApiEndpoint
            })

            if(!mountedRef.current)
                return

            if(!response?.success) {
                setValidationError({
                    errorCode: response?.errorCode || constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
                })
                return
            }

            const reportRefId = response.reportId || "GOS-OK"
            const formattedBody = complaintBugSentBody.includes("{id}") ?
                complaintBugSentBody.replace("{id}", reportRefId) :
                complaintBugSentBody

            setMessage("")
            setSteps("")
            setExpectedBehavior("")
            setIsDetailsExpanded(false)
            setTurnstileToken("")
            if(turnstileWidgetIdRef.current !== null && typeof window !== "undefined" && window.turnstile?.reset) {
                try {
                    window.turnstile.reset(turnstileWidgetIdRef.current)
                }
                catch (_error) {
                    // ignore reset error
                }
            }
            setStatusMessage([complaintBugSentTitle, formattedBody].filter(Boolean).join(" "))
        }
        catch (_error) {
            if(!mountedRef.current)
                return

            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
        }
        finally {
            feedbacks.setActivitySpinnerVisible(false, dataWrapper.uniqueId)
            if(mountedRef.current) {
                setIsSending(false)
            }
        }
    }

    return (
        <form className={`article-complaint-form-shell ${isBugReportMode ? "article-complaint-form-shell-bug-mode" : ""}`}
              noValidate={true}
              onSubmit={handleSubmit}>
            <div className={`article-complaint-form-main`}>
                <div className={`article-complaint-form-message-column`}>
                    <Textarea id={`complaint-form-textarea`}
                              name={`message`}
                              model={message}
                              setModel={setMessage}
                              faIconPrefix={isBugReportMode ? `fa-solid fa-bug` : `fa-solid fa-comment-dots`}
                              placeholder={activePlaceholder}
                              className={`text-4`}
                              required={false}/>
                </div>

                <div ref={sendButtonWrapperRef}
                     className={`article-complaint-form-send-button-wrapper`}>
                    <StandardButton label={activeSubmitLabel}
                                    faIcon={isBugReportMode ? `fa-solid fa-shield-halved` : `fa-solid fa-paper-plane`}
                                    type={`submit`}
                                    className={`article-complaint-form-send-button`}
                                    variant={`primary`}
                                    size={StandardButton.Size.DEFAULT}
                                    tooltip={activeSubmitLabel}
                                    status={isSending ? StandardButton.Status.DISABLED : StandardButton.Status.ENABLED}/>
                </div>

                <aside className={`article-complaint-form-rail`}>
                    {hasComplaintNote && (
                        <p className={`article-complaint-form-note text-2`}>
                            {complaintNote}
                        </p>
                    )}

                    <div className={`article-complaint-form-controls-row`}>
                        <div ref={destinationMenuRef}
                             className={`article-complaint-form-select-wrapper ${isDestinationMenuOpen ? "article-complaint-form-select-wrapper-open" : ""}`}>
                            <button ref={destinationButtonRef}
                                    type={`button`}
                                    className={`article-complaint-form-select-trigger`}
                                    aria-labelledby={`${destinationTriggerLabelId} ${destinationTriggerValueId}`}
                                    aria-controls={destinationMenuId}
                                    aria-haspopup={`listbox`}
                                    aria-expanded={isDestinationMenuOpen}
                                    onClick={handleDestinationTriggerClick}
                                    onKeyDown={handleDestinationTriggerKeyDown}>
                                <span className={`article-complaint-form-select-display`}>
                                    <span id={destinationTriggerLabelId}
                                          className={`article-complaint-form-select-prefix`}>{complaintDestinationLabel}:</span>
                                    <span id={destinationTriggerValueId}
                                          className={`article-complaint-form-select-value text-3`}>{currentDestinationLabel}</span>
                                </span>

                                <span className={`article-complaint-form-select-caret`} aria-hidden={`true`} />
                            </button>

                            {isDestinationMenuOpen && (
                                <div id={destinationMenuId}
                                     className={`article-complaint-form-select-menu`}
                                     role={`listbox`}
                                     aria-label={complaintDestinationLabel}>
                                    {destinationOptions.map((option) => {
                                        const isSelected = option.value === destination

                                        return (
                                            <button key={option.value}
                                                    ref={(node) => {
                                                        if(node) {
                                                            destinationOptionRefs.current.set(option.value, node)
                                                        }
                                                        else {
                                                            destinationOptionRefs.current.delete(option.value)
                                                        }
                                                    }}
                                                    type={`button`}
                                                    role={`option`}
                                                    tabIndex={isSelected ? 0 : -1}
                                                    aria-selected={isSelected}
                                                    className={`article-complaint-form-select-option ${isSelected ? "article-complaint-form-select-option-selected" : ""}`}
                                                    onClick={() => {
                                                        handleDestinationChange(option.value)
                                                    }}
                                                    onKeyDown={(event) => {
                                                        handleDestinationOptionKeyDown(event, option.value)
                                                    }}>
                                                <span className={`article-complaint-form-select-option-label text-3`}>
                                                    {option.label}
                                                </span>

                                                {isSelected && (
                                                    <i className={`fa-solid fa-check article-complaint-form-select-option-icon`} aria-hidden={`true`} />
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                <div className={`article-complaint-form-message-error-slot`}
                     aria-live={`polite`}
                     aria-atomic={`true`}>
                    {errorMessage ? (
                        <p className={`article-complaint-form-message-error text-2`}>
                            {errorMessage}
                        </p>
                    ) : statusMessage ? (
                        <p className={`article-complaint-form-status text-2`}>
                            {statusMessage}
                        </p>
                    ) : (
                        <span className={`article-complaint-form-message-error-placeholder`} aria-hidden={`true`} />
                    )}
                </div>
            </div>

            {(isBugReportMode || arrivedViaSaltShaker) && (
                <section className={`article-complaint-form-report-drawer`}
                         aria-label={complaintBugBannerTitle}>
                    <div className={`article-complaint-form-report-header`}>
                        <div className={`article-complaint-form-report-mode-switch`}
                             role={`group`}
                             aria-label={complaintBugBannerTitle}>
                            <button type={`button`}
                                    className={`article-complaint-form-mode-pill ${destination === DESTINATIONS.BUG_REPORT ? "is-active" : ""}`}
                                    aria-pressed={destination === DESTINATIONS.BUG_REPORT}
                                    onClick={() => handleDestinationChange(DESTINATIONS.BUG_REPORT)}>
                                <i className={`fa-solid fa-bug`} aria-hidden={`true`} />
                                <span>{complaintBugReportLabel}</span>
                            </button>

                            <button type={`button`}
                                    className={`article-complaint-form-mode-pill ${destination === DESTINATIONS.KNJIGA ? "is-active" : ""}`}
                                    aria-pressed={destination === DESTINATIONS.KNJIGA}
                                    onClick={() => handleDestinationChange(DESTINATIONS.KNJIGA)}>
                                <i className={`fa-solid fa-envelope-open-text`} aria-hidden={`true`} />
                                <span>{complaintFeedbackLabel}</span>
                            </button>
                        </div>

                        {isBugReportMode && (
                            <button type={`button`}
                                    className={`article-complaint-form-details-toggle`}
                                    aria-expanded={isDetailsExpanded}
                                    aria-controls={detailsPanelId}
                                    onClick={() => setIsDetailsExpanded((prev) => !prev)}>
                                <span>{isDetailsExpanded ? complaintBugDetailsToggleClose : complaintBugDetailsToggleOpen}</span>
                                <i className={`fa-solid ${isDetailsExpanded ? "fa-chevron-up" : "fa-chevron-down"}`} aria-hidden={`true`} />
                            </button>
                        )}
                    </div>

                    {isBugReportMode && complaintBugBannerHint && (
                        <p className={`article-complaint-form-report-hint text-2`}>
                            {complaintBugBannerHint}
                        </p>
                    )}

                    {isBugReportMode && descriptionQuality.isWeak && (
                        <p className={`article-complaint-form-quality-hint text-2`}
                           role={`status`}>
                            <i className={`fa-solid fa-circle-info`} aria-hidden={`true`} />
                            <span>{complaintBugQualityHint}</span>
                        </p>
                    )}

                    {isBugReportMode && isDetailsExpanded && (
                        <div id={detailsPanelId}
                             className={`article-complaint-form-details-grid`}>
                            <label className={`article-complaint-form-detail-field`}>
                                <span className={`article-complaint-form-detail-label text-2`}>{complaintBugSectionLabel}</span>
                                <select className={`article-complaint-form-detail-input text-2`}
                                        name={`affectedSection`}
                                        value={affectedSection}
                                        onChange={(e) => setAffectedSection(e.target.value)}>
                                    <option value="">{complaintBugSectionAuto}</option>
                                    {ALLOWED_SECTIONS.map((secId) => (
                                        <option key={secId} value={secId}>{secId}</option>
                                    ))}
                                </select>
                            </label>

                            <label className={`article-complaint-form-detail-field`}>
                                <span className={`article-complaint-form-detail-label text-2`}>{complaintBugReproducibilityLabel}</span>
                                <select className={`article-complaint-form-detail-input text-2`}
                                        name={`reproducibility`}
                                        value={reproducibility}
                                        onChange={(e) => setReproducibility(e.target.value)}>
                                    {ALLOWED_REPRODUCIBILITY.map((reproKey) => (
                                        <option key={reproKey} value={reproKey}>
                                            {reproducibilityLabels[reproKey] || reproKey}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className={`article-complaint-form-detail-field`}>
                                <span className={`article-complaint-form-detail-label text-2`}>{complaintBugReplyEmailLabel}</span>
                                <input type={`email`}
                                       className={`article-complaint-form-detail-input text-2`}
                                       name={`replyEmail`}
                                       maxLength={160}
                                       placeholder={complaintBugReplyEmailPlaceholder}
                                       value={replyEmail}
                                       onChange={(e) => setReplyEmail(e.target.value)}/>
                            </label>

                            <label className={`article-complaint-form-detail-field article-complaint-form-detail-field-wide`}>
                                <span className={`article-complaint-form-detail-label text-2`}>{complaintBugStepsLabel}</span>
                                <input type={`text`}
                                       className={`article-complaint-form-detail-input text-2`}
                                       name={`steps`}
                                       maxLength={600}
                                       placeholder={complaintBugStepsPlaceholder}
                                       value={steps}
                                       onChange={(e) => setSteps(e.target.value)}/>
                            </label>

                            <label className={`article-complaint-form-detail-field article-complaint-form-detail-field-wide`}>
                                <span className={`article-complaint-form-detail-label text-2`}>{complaintBugExpectedLabel}</span>
                                <input type={`text`}
                                       className={`article-complaint-form-detail-input text-2`}
                                       name={`expectedBehavior`}
                                       maxLength={400}
                                       placeholder={complaintBugExpectedPlaceholder}
                                       value={expectedBehavior}
                                       onChange={(e) => setExpectedBehavior(e.target.value)}/>
                            </label>
                        </div>
                    )}

                    {isBugReportMode && turnstileSiteKey && (
                        <div ref={turnstileContainerRef}
                             className={`article-complaint-form-turnstile`}
                             data-testid={`grain-of-salt-turnstile`}/>
                    )}

                    {isBugReportMode && complaintBugPrivacyNote && (
                        <p className={`article-complaint-form-privacy-note text-1`}>
                            {complaintBugPrivacyNote}
                        </p>
                    )}

                    <div className={`article-complaint-form-honeypot`} aria-hidden={`true`}>
                        <label>
                            <span>Website URL</span>
                            <input type={`text`}
                                   name={`website_url_confirm`}
                                   tabIndex={-1}
                                   autoComplete={`off`}
                                   value={honeypot}
                                   onChange={(e) => setHoneypot(e.target.value)}/>
                        </label>
                    </div>
                </section>
            )}

            {typeof document !== "undefined" && createPortal(
                <>
                    {complaintPopups.length > 0 && (
                        <div className={`article-complaint-form-popup-layer`}
                             role={`presentation`}
                             onClick={() => {
                                 closeTopComplaintPopup()
                             }}>
                            {complaintPopups.map((popup, index) => {
                                const isTopmost = index === complaintPopups.length - 1
                                const popupTitleId = `${complaintPopupsTitleIdPrefix}-${popup.id}`

                                return (
                                    <div key={popup.id}
                                         className={`article-complaint-form-popup ${isTopmost ? "article-complaint-form-popup-topmost" : ""}`}
                                         role={`dialog`}
                                         aria-modal={false}
                                         aria-labelledby={popupTitleId}
                                         style={popup.style}
                                         onClick={(event) => {
                                             event.stopPropagation()
                                         }}>
                                        <div className={`article-complaint-form-popup-header`}>
                                            <p id={popupTitleId}
                                               className={`article-complaint-form-popup-title text-2`}>
                                                {popup.title}
                                            </p>

                                            <button type={`button`}
                                                    className={`article-complaint-form-popup-close`}
                                                    aria-label={language.getString("close")}
                                                    ref={(node) => {
                                                        if(node) {
                                                            popupCloseButtonRefs.current.set(popup.id, node)
                                                        }
                                                        else {
                                                            popupCloseButtonRefs.current.delete(popup.id)
                                                        }
                                                    }}
                                                    onClick={() => {
                                                        closeComplaintPopup(popup.id)
                                                    }}>
                                                <i className={`fa-solid fa-xmark`}/>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className={`article-complaint-form-burst-layer`} aria-hidden={true}>
                        {nowhereBursts.map((burst) => (
                            <div key={burst.id}
                                 className={`article-complaint-form-burst`}
                                 style={{
                                     left: `${burst.x}px`,
                                     top: `${burst.y}px`
                                 }}>
                                {burst.sparks.map((spark) => (
                                    <span key={spark.id}
                                          className={`article-complaint-form-burst-spark`}
                                          style={{
                                              "--spark-dx": `${spark.dx}px`,
                                              "--spark-dy": `${spark.dy}px`,
                                              "--spark-rotation": `${spark.rotation}deg`,
                                              "--spark-scale": spark.scale,
                                              "--spark-color": spark.color,
                                              "--spark-duration": `${spark.duration}ms`,
                                              "--spark-delay": `${spark.delay}ms`
                                          }}>
                                        *
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </>,
                document.body
            )}
        </form>
    )

    function openDestinationMenu(focusValue = destination) {
        pendingDestinationFocusRef.current = focusValue
        setIsDestinationMenuOpen(true)
    }

    function closeDestinationMenu({ focusTrigger = false } = {}) {
        pendingDestinationFocusRef.current = null
        setIsDestinationMenuOpen(false)

        if(focusTrigger) {
            destinationButtonRef.current?.focus()
        }
    }

    function focusDestinationOption(value) {
        destinationOptionRefs.current.get(value)?.focus()
    }

    function clearPendingTimeouts() {
        if(typeof window === "undefined")
            return

        pendingTimeoutIdsRef.current.forEach((timeoutId) => {
            window.clearTimeout(timeoutId)
        })
        pendingTimeoutIdsRef.current.clear()
    }

    function registerTimeout(callback, delay) {
        if(typeof window === "undefined")
            return null

        const timeoutId = window.setTimeout(() => {
            pendingTimeoutIdsRef.current.delete(timeoutId)
            callback()
        }, delay)

        pendingTimeoutIdsRef.current.add(timeoutId)
        return timeoutId
    }

    function triggerNowhereBurst(target, themeId) {
        if(typeof window === "undefined" || !target)
            return

        const rect = target.getBoundingClientRect()
        const burst = createNowhereBurst(rect, themeId)

        setNowhereBursts((current) => [...current, burst])

        registerTimeout(() => {
            if(!mountedRef.current)
                return

            setNowhereBursts((current) => current.filter((entry) => entry.id !== burst.id))
        }, 1900)
    }

    function closeComplaintPopup(id) {
        setComplaintPopups((current) => current.filter((entry) => entry.id !== id))
    }

    function closeTopComplaintPopup() {
        setComplaintPopups((current) => current.slice(0, -1))
    }
}

function scrollComplaintArticleIntoView(articleEl, sectionId, isMobileLayout) {
    if(typeof window === "undefined" || !articleEl)
        return

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    const scrollBehavior = prefersReducedMotion ? "auto" : "smooth"

    if(!isMobileLayout) {
        const scrollableContainer = document.getElementById(`scrollable-${sectionId}`)
        if(scrollableContainer) {
            const containerRect = scrollableContainer.getBoundingClientRect()
            const articleRect = articleEl.getBoundingClientRect()
            const topOffset = 18
            const targetTop = Math.max(
                0,
                scrollableContainer.scrollTop + (articleRect.top - containerRect.top) - topOffset
            )

            scrollableContainer.scrollTo({
                top: targetTop,
                behavior: scrollBehavior
            })
            return
        }
    }

    const articleRect = articleEl.getBoundingClientRect()
    const topSafeOffset = 16
    const targetWindowY = Math.max(0, window.scrollY + articleRect.top - topSafeOffset)
    window.scrollTo({
        top: targetWindowY,
        behavior: scrollBehavior
    })
}

function createComplaintPopups(title) {
    return Array.from({length: POPUP_COUNT}, (_, index) => {
        const popupId = `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 9)}`

        return {
            id: popupId,
            title: `${title} ${index + 1}`,
            style: buildRandomPopupStyle(index)
        }
    })
}

function buildRandomPopupStyle(index) {
    if(typeof window === "undefined") {
        return {
            width: `${320 + index * 6}px`,
            minHeight: `${150 + index * 4}px`,
            left: `50%`,
            top: `50%`,
            marginLeft: `${index * 14}px`,
            marginTop: `${index * 12}px`
        }
    }

    const popupWidth = Math.round(320 + Math.random() * 180)
    const popupHeight = Math.round(150 + Math.random() * 140)
    const xOffset = Math.round((Math.random() - 0.5) * 44 + index * 12)
    const yOffset = Math.round((Math.random() - 0.5) * 38 + index * 10)

    return {
        width: `${popupWidth}px`,
        minHeight: `${popupHeight}px`,
        "--popup-rotation": `${Math.round((Math.random() - 0.5) * 14)}deg`,
        left: `calc(50% + ${xOffset}px)`,
        top: `calc(50% + ${yOffset}px)`,
        zIndex: 1000 + index
    }
}

function openThrowoffTab(title = "actual hate", body = "Bye, my dear.\nI hope this was annoying enough to finally help you leave the page.") {
    if(typeof window === "undefined")
        return

    const tab = window.open("about:blank", "_blank", "noopener,noreferrer")
    if(!tab)
        return

    const isLightTheme = document.documentElement.getAttribute("data-theme") === "light"
    const lines = String(body)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)

    const surface = isLightTheme ? "#ffffff" : "#0b1324"
    const surfaceSoft = isLightTheme ? "#f4f8fc" : "#111c30"
    const surfaceAccent = isLightTheme ? "#e8f1fb" : "#18263d"
    const border = isLightTheme ? "rgba(15, 23, 42, 0.12)" : "rgba(148, 163, 184, 0.18)"
    const ink = isLightTheme ? "#102033" : "#eef6ff"
    const muted = isLightTheme ? "#4e5f76" : "#a9b9cf"
    const overlay = isLightTheme ? "rgba(15, 23, 42, 0.10)" : "rgba(2, 6, 23, 0.42)"
    const accentA = isLightTheme ? "#1d4ed8" : "#7dd3fc"
    const accentB = isLightTheme ? "#0f766e" : "#8b5cf6"

    const html = [
        "<!doctype html>",
        "<html>",
        "<head>",
        `<title>${escapeHtml(title)}</title>`,
        "<style>",
        `body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;text-align:center;font-family:Inter,Segoe UI,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;background:radial-gradient(circle at top,${overlay} 0,transparent 42%),linear-gradient(180deg,${isLightTheme ? "#f8fbff" : "#020712"} 0%,${isLightTheme ? "#eef4fb" : "#09101d"} 100%);color:${ink}}`,
        `main{width:min(100%,560px);padding:30px 28px;border:1px solid ${border};border-radius:24px;background:linear-gradient(180deg,${surface} 0%,${surfaceSoft} 74%,${surfaceAccent} 100%);box-shadow:0 20px 50px ${isLightTheme ? "rgba(15, 23, 42, 0.12)" : "rgba(0, 0, 0, 0.38)"};position:relative;overflow:hidden}`,
        `main::before{content:"";position:absolute;inset:0 0 auto 0;height:8px;background:linear-gradient(90deg,${accentA} 0%,${accentB} 100%);opacity:.92}`,
        `main::after{content:"";position:absolute;inset:auto -12px -12px auto;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,${isLightTheme ? "rgba(29, 78, 216, 0.08)" : "rgba(125, 211, 252, 0.10)"} 0,transparent 72%);pointer-events:none}`,
        "p{margin:0;line-height:1.55;color:inherit}",
        "p+p{margin-top:14px}",
        `.lead{font-size:clamp(1.35rem,2vw,1.75rem);font-weight:700;color:${ink}}`,
        `.sub{font-size:clamp(1rem,1.45vw,1.08rem);max-width:38ch;margin-inline:auto;color:${muted}}`,
        "</style>",
        "</head>",
        "<body>",
        "<main>",
        ...lines.map((line, index) => `<p class="${index === 0 ? "lead" : "sub"}">${escapeHtml(line)}</p>`),
        "</main>",
        "</body>",
        "</html>"
    ].join("")

    tab.document.open()
    tab.document.write(html)
    tab.document.close()
    tab.focus()
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("\"", "&quot;")
        .replaceAll("'", "&#39;")
}

function createNowhereBurst(rect, themeId = "dark") {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2
    const sparkColors = getNowhereSparkColors(themeId)

    return {
        id,
        x: originX,
        y: originY,
        sparks: Array.from({length: NOWHERE_SPARK_COUNT}, (_, index) => {
            const angle = (Math.PI * 2 * index) / NOWHERE_SPARK_COUNT + (Math.random() - 0.5) * 0.28
            const distance = 88 + Math.random() * 140
            const lift = 18 + Math.random() * 34

            return {
                id: `${id}-${index}`,
                dx: Math.cos(angle) * distance,
                dy: Math.sin(angle) * distance - lift,
                rotation: Math.round((Math.random() - 0.5) * 180),
                scale: (1.15 + Math.random() * 1.2).toFixed(2),
                color: sparkColors[index % sparkColors.length],
                duration: 1100 + Math.round(Math.random() * 380),
                delay: Math.round(Math.random() * 90)
            }
        })
    }
}

function getNowhereSparkColors(themeId) {
    return themeId === "light" ? NOWHERE_SPARK_COLORS_LIGHT : NOWHERE_SPARK_COLORS_DARK
}

export default ArticleComplaintForm
