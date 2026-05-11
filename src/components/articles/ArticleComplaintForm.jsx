import "./ArticleComplaintForm.scss"
import React, {useEffect, useRef, useState} from 'react'
import {createPortal} from "react-dom"
import {useApi} from "../../hooks/api.js"
import {useConstants} from "../../hooks/constants.js"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useTheme} from "../../providers/ThemeProvider.jsx"
import Article from "./base/Article.jsx"
import Textarea from "../forms/fields/Textarea.jsx"
import StandardButton from "../buttons/StandardButton.jsx"

const DESTINATIONS = {
    NOWHERE: "nowhere",
    YOU_WHERE: "you_where",
    KNJIGA: "knjiga_zalbi",
    ANZEIGE: "anzeige_raus",
}

const POPUP_COUNT = 30
const NOWHERE_SPARK_COUNT = 54
const NOWHERE_SPARK_COLORS_DARK = ["#60a5fa", "#f97316", "#22c55e", "#a855f7", "#06b6d4", "#f59e0b", "#f472b6"]
const NOWHERE_SPARK_COLORS_LIGHT = ["#1d4ed8", "#d97706", "#0f766e", "#7c3aed", "#0284c7", "#b45309", "#db2777"]

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
    const theme = useTheme()
    const selectedThemeId = theme.getSelectedTheme()?.id || "dark"

    const [message, setMessage] = useState("")
    const [destination, setDestination] = useState(DESTINATIONS.NOWHERE)
    const [validationError, setValidationError] = useState(null)
    const [statusMessage, setStatusMessage] = useState(null)
    const [complaintPopups, setComplaintPopups] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [nowhereBursts, setNowhereBursts] = useState([])
    const sendButtonWrapperRef = useRef(null)
    const destinationMenuRef = useRef(null)
    const [isDestinationMenuOpen, setIsDestinationMenuOpen] = useState(false)

    const complaintEmail = dataWrapper.locales.complaintEmailLabel || "trash@lovro-music.de"
    const complaintNote = dataWrapper.locales.complaintNote || ""
    const complaintDestinationLabel = dataWrapper.locales.complaintDestinationLabel || "destination"
    const complaintNowhereLabel = dataWrapper.locales.complaintNowhereLabel || "nowhere"
    const complaintYouWhereLabel = dataWrapper.locales.complaintYouWhereLabel || "actual hate"
    const complaintKnjigaLabel = dataWrapper.locales.complaintKnjigaLabel || "Knjiga zalbi"
    const complaintAnzeigeLabel = dataWrapper.locales.complaintAnzeigeLabel || "Anzeige raus"
    const complaintSendLabel = dataWrapper.locales.complaintSendLabel || language.getString("send_message")
    const complaintYouWhereTitle = dataWrapper.locales.complaintYouWhereTitle || complaintYouWhereLabel
    const complaintYouWhereBody = dataWrapper.locales.complaintYouWhereBody || complaintYouWhereLabel
    const complaintSentTitle = dataWrapper.locales.complaintSentTitle || ""
    const complaintSentBody = dataWrapper.locales.complaintSentBody || ""
    const complaintPopupTitle = dataWrapper.locales.complaintPopupTitle || "Anzeige raus"

    const destinationOptions = [
        { value: DESTINATIONS.NOWHERE, label: complaintNowhereLabel },
        { value: DESTINATIONS.YOU_WHERE, label: complaintYouWhereLabel },
        { value: DESTINATIONS.KNJIGA, label: complaintKnjigaLabel },
        { value: DESTINATIONS.ANZEIGE, label: complaintAnzeigeLabel },
    ]
    const currentDestinationLabel = destinationOptions.find((option) => option.value === destination)?.label || complaintNowhereLabel

    useEffect(() => {
        if(destination !== DESTINATIONS.NOWHERE)
            return

        setMessage("")
        setValidationError(null)
        setStatusMessage(null)
        setComplaintPopups([])
    }, [destination])

    useEffect(() => {
        return () => {
            setComplaintPopups([])
        }
    }, [])

    useEffect(() => {
        if(!isDestinationMenuOpen)
            return

        const handlePointerDown = (event) => {
            if(destinationMenuRef.current?.contains(event.target))
                return

            setIsDestinationMenuOpen(false)
        }

        const handleEscape = (event) => {
            if(event.key !== "Escape")
                return

            setIsDestinationMenuOpen(false)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        document.addEventListener("keydown", handleEscape)

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [isDestinationMenuOpen])

    const handleDestinationChange = (nextDestination) => {
        setValidationError(null)

        setDestination(nextDestination)
        setStatusMessage(null)
        setIsDestinationMenuOpen(false)

        if(nextDestination === DESTINATIONS.ANZEIGE) {
            setComplaintPopups([])
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
            return
        }

        if(destination === DESTINATIONS.ANZEIGE) {
            setValidationError(null)
            setStatusMessage(null)
            setComplaintPopups(createComplaintPopups(complaintPopupTitle))
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

        const publicKey = dataWrapper.settings.emailJsPublicKey
        const serviceId = dataWrapper.settings.emailJsServiceId
        const templateId = dataWrapper.settings.emailJsComplaintTemplateId || dataWrapper.settings.emailJsTemplateId

        if(!publicKey || !serviceId || !templateId) {
            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
            setStatusMessage(null)
            return
        }

        setValidationError(null)
        setIsSending(true)
        feedbacks.setActivitySpinnerVisible(true, dataWrapper.uniqueId, language.getString("sending_message"))

        const response = await api.handlers.sendEmailRequest(
            validation.bundle,
            publicKey,
            serviceId,
            templateId
        )

        feedbacks.setActivitySpinnerVisible(false, dataWrapper.uniqueId)
        setIsSending(false)

        if(!response.success) {
            setValidationError({
                errorCode: constants.ErrorCodes.MESSAGE_SUBMIT_FAILED
            })
            setStatusMessage(null)
            return
        }

        setMessage("")
        setStatusMessage(
            [complaintSentTitle, complaintSentBody].filter(Boolean).join(" ")
        )
    }

    const errorMessage = validationError ? language.getString(validationError.errorCode) : null
    return (
        <form className={`article-complaint-form-shell`}
              noValidate={true}
              onSubmit={handleSubmit}>
            <div className={`article-complaint-form-main`}>
                <div className={`article-complaint-form-message-column`}>
                    <Textarea id={`complaint-form-textarea`}
                              name={`message`}
                              model={message}
                              setModel={setMessage}
                              faIconPrefix={`fa-solid fa-comment-dots`}
                              placeholder={`complaint`}
                              className={`text-4`}
                              required={false}/>
                </div>

                <div ref={sendButtonWrapperRef}
                     className={`article-complaint-form-send-button-wrapper`}>
                    <StandardButton label={complaintSendLabel}
                                    faIcon={`fa-solid fa-paper-plane`}
                                    type={`submit`}
                                    className={`article-complaint-form-send-button`}
                                    variant={`primary`}
                                    size={StandardButton.Size.DEFAULT}
                                    tooltip={complaintSendLabel}
                                    status={isSending ? StandardButton.Status.DISABLED : StandardButton.Status.ENABLED}/>
                </div>

                <aside className={`article-complaint-form-rail`}>
                    <div className={`article-complaint-form-note text-2`}
                         dangerouslySetInnerHTML={{__html: complaintNote}}/>

                    <div className={`article-complaint-form-controls-row`}>
                        <div ref={destinationMenuRef}
                             className={`article-complaint-form-select-wrapper ${isDestinationMenuOpen ? "article-complaint-form-select-wrapper-open" : ""}`}>
                            <button type={`button`}
                                    className={`article-complaint-form-select-trigger`}
                                    aria-label={complaintDestinationLabel}
                                    aria-haspopup={`listbox`}
                                    aria-expanded={isDestinationMenuOpen}
                                    onClick={() => {
                                        setIsDestinationMenuOpen((current) => !current)
                                    }}>
                                <span className={`article-complaint-form-select-display`} aria-hidden={`true`}>
                                    <span className={`article-complaint-form-select-prefix`}>Send to:</span>
                                    <span className={`article-complaint-form-select-value text-3`}>{currentDestinationLabel}</span>
                                </span>

                                <span className={`article-complaint-form-select-caret`} aria-hidden={`true`} />
                            </button>

                            {isDestinationMenuOpen && (
                                <div className={`article-complaint-form-select-menu`}
                                     role={`listbox`}
                                     aria-label={complaintDestinationLabel}>
                                    {destinationOptions.map((option) => {
                                        const isSelected = option.value === destination

                                        return (
                                            <button key={option.value}
                                                    type={`button`}
                                                    role={`option`}
                                                    aria-selected={isSelected}
                                                    className={`article-complaint-form-select-option ${isSelected ? "article-complaint-form-select-option-selected" : ""}`}
                                                    onClick={() => {
                                                        handleDestinationChange(option.value)
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

                <div className={`article-complaint-form-message-error-slot`}>
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

            {typeof document !== "undefined" && createPortal(
                <>
                    {complaintPopups.length > 0 && (
                        <div className={`article-complaint-form-popup-layer`}
                             aria-hidden={false}
                             onClick={() => {
                                 closeTopComplaintPopup()
                             }}>
                            {complaintPopups.map((popup, index) => {
                                const isTopmost = index === complaintPopups.length - 1

                                return (
                                    <div key={popup.id}
                                         className={`article-complaint-form-popup ${isTopmost ? "article-complaint-form-popup-topmost" : ""}`}
                                         style={popup.style}
                                         onClick={(event) => {
                                             event.stopPropagation()
                                         }}>
                                        <div className={`article-complaint-form-popup-header`}>
                                            <p className={`article-complaint-form-popup-title text-2`}>
                                                {popup.title}
                                            </p>

                                            <button type={`button`}
                                                    className={`article-complaint-form-popup-close`}
                                                    aria-label={language.getString("close")}
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

    function triggerNowhereBurst(target, themeId) {
        if(typeof window === "undefined" || !target)
            return

        const rect = target.getBoundingClientRect()
        const burst = createNowhereBurst(rect, themeId)

        setNowhereBursts((current) => [...current, burst])

        window.setTimeout(() => {
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

    const tab = window.open("about:blank", "_blank")
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
