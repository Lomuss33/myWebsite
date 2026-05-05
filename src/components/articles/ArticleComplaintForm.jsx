import "./ArticleComplaintForm.scss"
import React, {useEffect, useState} from 'react'
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

    const complaintEmail = dataWrapper.locales.complaintEmailLabel || "trash@lovro-music.de"
    const complaintNote = dataWrapper.locales.complaintNote || ""
    const complaintDestinationLabel = dataWrapper.locales.complaintDestinationLabel || "destination"
    const complaintNowhereLabel = dataWrapper.locales.complaintNowhereLabel || "nowhere"
    const complaintYouWhereLabel = dataWrapper.locales.complaintYouWhereLabel || "You where"
    const complaintKnjigaLabel = dataWrapper.locales.complaintKnjigaLabel || "Knjiga zalbi"
    const complaintAnzeigeLabel = dataWrapper.locales.complaintAnzeigeLabel || "Anzeige raus"
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
            setMessage("")
            setStatusMessage(null)
            return
        }

        if(destination === DESTINATIONS.YOU_WHERE) {
            openThrowoffTab()
            setDestination(DESTINATIONS.NOWHERE)
            setMessage("")
            return
        }

        if(destination === DESTINATIONS.ANZEIGE) {
            setValidationError(null)
            setStatusMessage(null)
            setComplaintPopups(createComplaintPopups(complaintPopupTitle, getPopupGeometry(event.currentTarget)))
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
                <Textarea id={`complaint-form-textarea`}
                          name={`message`}
                          model={message}
                          setModel={setMessage}
                          faIconPrefix={`fa-solid fa-comment-dots`}
                          placeholder={`complaint`}
                          className={`text-4`}
                          required={false}/>

                <aside className={`article-complaint-form-rail`}>
                    <div className={`article-complaint-form-note text-3`}
                         dangerouslySetInnerHTML={{__html: complaintNote}}/>

                    <div className={`article-complaint-form-controls-row`}>
                        <label className={`article-complaint-form-select-wrapper`}>
                            <span className={`article-complaint-form-select-label text-2`}>
                                {complaintDestinationLabel}
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
                        <StandardButton label={`send`}
                                        faIcon={`fa-solid fa-paper-plane`}
                                        type={`submit`}
                                        variant={`primary`}
                                        size={StandardButton.Size.LARGE}
                                        tooltip={`send`}
                                        status={isSending ? StandardButton.Status.DISABLED : StandardButton.Status.ENABLED}/>
                    </div>

                    {isKnjiga && (
                        <p className={`article-complaint-form-destination-email text-3`}>
                            {complaintEmail}
                        </p>
                    )}

                    {statusMessage && (
                        <p className={`article-complaint-form-status text-2`}>
                            {statusMessage}
                        </p>
                    )}

                    {errorMessage && (
                        <p className={`article-complaint-form-error text-2`}>
                            {errorMessage}
                        </p>
                    )}
                </aside>
            </div>

            {complaintPopups.length > 0 && (
                <div className={`article-complaint-form-popup-layer`} aria-hidden={false}>
                    {complaintPopups.map(popup => (
                        <div key={popup.id}
                             className={`article-complaint-form-popup`}
                             style={popup.style}>
                            <div className={`article-complaint-form-popup-header`}>
                                <p className={`article-complaint-form-popup-title text-2`}>
                                    {popup.title}
                                </p>

                                <button type={`button`}
                                        className={`article-complaint-form-popup-close`}
                                        aria-label={language.getString("close")}
                                        onClick={() => {
                                            setComplaintPopups(prev => prev.filter(current => current.id !== popup.id))
                                        }}>
                                    <i className={`fa-solid fa-xmark`}/>
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </form>
    )
}

function createComplaintPopups(title, geometry) {
    return Array.from({length: POPUP_COUNT}, (_, index) => {
        const popupId = `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 9)}`

        return {
            id: popupId,
            title: `${title} ${index + 1}`,
            style: buildRandomPopupStyle(index, geometry)
        }
    })
}

function getPopupGeometry(formEl) {
    if(!formEl || typeof window === "undefined") {
        return {
            width: 0,
            height: 0
        }
    }

    const rect = formEl.getBoundingClientRect()
    return {
        width: Math.max(rect.width, formEl.scrollWidth || 0),
        height: Math.max(rect.height, formEl.scrollHeight || 0)
    }
}

function buildRandomPopupStyle(index, geometry = null) {
    if(typeof window === "undefined") {
        return {
            top: `${32 + index * 18}px`,
            left: `${32 + index * 18}px`
        }
    }

    const areaWidth = Math.max(320, geometry?.width || window.innerWidth)
    const areaHeight = Math.max(260, geometry?.height || window.innerHeight)
    const popupWidth = Math.round(180 + Math.random() * 180)
    const popupHeight = Math.round(120 + Math.random() * 140)
    const maxLeft = Math.max(12, areaWidth - popupWidth - 12)
    const maxTop = Math.max(12, areaHeight - popupHeight - 12)

    return {
        left: `${Math.round(12 + Math.random() * maxLeft)}px`,
        top: `${Math.round(12 + Math.random() * maxTop)}px`,
        width: `${popupWidth}px`,
        minHeight: `${popupHeight}px`,
        "--popup-rotation": `${Math.round((Math.random() - 0.5) * 14)}deg`,
        zIndex: 3000 + index
    }
}

function openThrowoffTab() {
    if(typeof window === "undefined")
        return

    const tab = window.open("about:blank", "_blank")
    if(!tab)
        return

    const html = [
        "<!doctype html>",
        "<html>",
        "<head>",
        "<title>You where</title>",
        "<style>",
        "body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0f172a;color:#f8fafc;font-family:system-ui,sans-serif;padding:24px;text-align:center}",
        "main{max-width:420px;padding:24px;border:1px solid rgba(255,255,255,.16);background:rgba(15,23,42,.92);box-shadow:0 20px 50px rgba(0,0,0,.35)}",
        "h1{margin:0 0 12px;font-size:2rem}",
        "p{margin:0;line-height:1.55;font-size:1rem;color:#cbd5e1}",
        "a{color:#93c5fd}",
        "</style>",
        "</head>",
        "<body>",
        "<main>",
        "<h1>You where</h1>",
        "<p>This tab opened itself in the most annoying possible way. Please return to the complaint box and continue complaining responsibly.</p>",
        "</main>",
        "</body>",
        "</html>"
    ].join("")

    tab.document.open()
    tab.document.write(html)
    tab.document.close()
    tab.focus()
}

export default ArticleComplaintForm
