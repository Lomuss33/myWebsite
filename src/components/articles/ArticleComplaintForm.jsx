import "./ArticleComplaintForm.scss"
import React, {useEffect, useRef, useState} from 'react'
import {createPortal} from "react-dom"
import {useApi} from "../../hooks/api.js"
import {useConstants} from "../../hooks/constants.js"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
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
const NOWHERE_SPARK_COLORS = ["#2563eb", "#ef4444", "#22c55e", "#7c3aed", "#06b6d4", "#f59e0b", "#ec4899"]

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

    const [message, setMessage] = useState("")
    const [destination, setDestination] = useState(DESTINATIONS.NOWHERE)
    const [validationError, setValidationError] = useState(null)
    const [statusMessage, setStatusMessage] = useState(null)
    const [complaintPopups, setComplaintPopups] = useState([])
    const [isSending, setIsSending] = useState(false)
    const [nowhereBursts, setNowhereBursts] = useState([])
    const sendButtonWrapperRef = useRef(null)

    const complaintEmail = dataWrapper.locales.complaintEmailLabel || "trash@lovro-music.de"
    const complaintNote = dataWrapper.locales.complaintNote || ""
    const complaintDestinationLabel = dataWrapper.locales.complaintDestinationLabel || "destination"
    const complaintNowhereLabel = dataWrapper.locales.complaintNowhereLabel || "nowhere"
    const complaintYouWhereLabel = dataWrapper.locales.complaintYouWhereLabel || "actual hate"
    const complaintKnjigaLabel = dataWrapper.locales.complaintKnjigaLabel || "Knjiga zalbi"
    const complaintAnzeigeLabel = dataWrapper.locales.complaintAnzeigeLabel || "Anzeige raus"
    const complaintYouWhereTitle = dataWrapper.locales.complaintYouWhereTitle || complaintYouWhereLabel
    const complaintYouWhereBody = dataWrapper.locales.complaintYouWhereBody || complaintYouWhereLabel
    const complaintSentTitle = dataWrapper.locales.complaintSentTitle || ""
    const complaintSentBody = dataWrapper.locales.complaintSentBody || ""
    const complaintPopupTitle = dataWrapper.locales.complaintPopupTitle || "Anzeige raus"

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

    const handleDestinationChange = (nextDestination) => {
        setValidationError(null)

        setDestination(nextDestination)
        setStatusMessage(null)

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
            triggerNowhereBurst(sendButtonWrapperRef.current)
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
    const isKnjiga = destination === DESTINATIONS.KNJIGA

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

                    <div className={`article-complaint-form-message-error-slot`}>
                        {errorMessage ? (
                            <p className={`article-complaint-form-message-error text-2`}>
                                {errorMessage}
                            </p>
                        ) : (
                            <span className={`article-complaint-form-message-error-placeholder`} aria-hidden={`true`} />
                        )}
                    </div>

                </div>

                <aside className={`article-complaint-form-rail`}>
                    <div className={`article-complaint-form-note text-3`}
                         dangerouslySetInnerHTML={{__html: complaintNote}}/>

                    <div className={`article-complaint-form-controls-row`}>
                        <label className={`article-complaint-form-select-wrapper`}>
                            <span className={`article-complaint-form-select-label text-2`}>
                                {isKnjiga ? complaintEmail : complaintDestinationLabel}
                            </span>

                            <select className={`article-complaint-form-select text-3`}
                                    value={destination}
                                    onChange={(event) => handleDestinationChange(event.target.value)}>
                                <option value={DESTINATIONS.NOWHERE}>{complaintNowhereLabel}</option>
                                <option value={DESTINATIONS.YOU_WHERE}>{complaintYouWhereLabel}</option>
                                <option value={DESTINATIONS.KNJIGA}>{complaintKnjigaLabel}</option>
                                <option value={DESTINATIONS.ANZEIGE}>{complaintAnzeigeLabel}</option>
                            </select>
                        </label>
                        <div ref={sendButtonWrapperRef}
                             className={`article-complaint-form-send-button-wrapper`}>
                            <StandardButton label={`send`}
                                            faIcon={`fa-solid fa-paper-plane`}
                                            type={`submit`}
                                            className={`article-complaint-form-send-button`}
                                            variant={`primary`}
                                            size={StandardButton.Size.LARGE}
                                            tooltip={`send`}
                                            status={isSending ? StandardButton.Status.DISABLED : StandardButton.Status.ENABLED}/>
                        </div>
                    </div>

                    {statusMessage && (
                        <p className={`article-complaint-form-status text-2`}>
                            {statusMessage}
                        </p>
                    )}
                </aside>
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

    function triggerNowhereBurst(target) {
        if(typeof window === "undefined" || !target)
            return

        const rect = target.getBoundingClientRect()
        const burst = createNowhereBurst(rect)

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

    const lines = String(body)
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)

    const html = [
        "<!doctype html>",
        "<html>",
        "<head>",
        `<title>${escapeHtml(title)}</title>`,
        "<style>",
        "body{margin:0;min-height:100vh;display:grid;place-items:center;background:radial-gradient(circle at top,rgba(37,99,235,.12) 0,transparent 42%),linear-gradient(180deg,#fbfdff 0%,#eef4fb 100%);color:#0f172a;font-family:Georgia,'Times New Roman',serif;padding:24px;text-align:center}",
        "main{width:min(100%,560px);padding:28px 26px;border:1px solid rgba(15,23,42,.12);background:rgba(255,255,255,.88);box-shadow:0 18px 45px rgba(15,23,42,.10)}",
        "p{margin:0;line-height:1.45;color:#1e293b}",
        "p+p{margin-top:14px}",
        ".lead{font-size:clamp(1.35rem,2vw,1.7rem);font-style:italic;color:#0f172a}",
        ".sub{font-size:clamp(1rem,1.45vw,1.1rem);max-width:34ch;margin-inline:auto;color:#334155}",
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

function createNowhereBurst(rect) {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2

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
                color: NOWHERE_SPARK_COLORS[index % NOWHERE_SPARK_COLORS.length],
                duration: 1100 + Math.round(Math.random() * 380),
                delay: Math.round(Math.random() * 90)
            }
        })
    }
}

export default ArticleComplaintForm
