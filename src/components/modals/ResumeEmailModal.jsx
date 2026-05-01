import "./ResumeEmailModal.scss"
import React, {useEffect, useState} from "react"
import {useApi} from "../../hooks/api.js"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useUtils} from "../../hooks/utils.js"
import {ModalWrapper, ModalWrapperBody, ModalWrapperTitle} from "./base/ModalWrapper"
import {RowFormGroupAlert} from "../forms/containers/RowForm.jsx"
import Input from "../forms/fields/Input.jsx"
import StandardButton from "../buttons/StandardButton.jsx"

function ResumeEmailModal({ target, onDismiss }) {
    const api = useApi()
    const feedbacks = useFeedbacks()
    const language = useLanguage()
    const utils = useUtils()

    const [shouldDismiss, setShouldDismiss] = useState(false)
    const [recipientEmail, setRecipientEmail] = useState("")
    const [validationError, setValidationError] = useState(null)

    useEffect(() => {
        setShouldDismiss(false)
        setRecipientEmail("")
        setValidationError(null)
    }, [target])

    if(!target)
        return <></>

    const modalId = "resume-email-modal"
    const title = language.getString("email_resume")
    const sendLabel = language.getString("send_resume")
    const cancelLabel = language.getString("cancel")
    const errorMessage = validationError ?
        language.getString(validationError.errorCode).replace("{x}", validationError.errorParameter) :
        null

    const _close = () => {
        setShouldDismiss(true)
    }

    const _onSubmit = async (e) => {
        e.preventDefault && e.preventDefault()
        e.stopPropagation && e.stopPropagation()

        const validation = api.validators.validateResumeEmailRequest(
            recipientEmail?.trim(),
            target.resumePdfUrlAbsolute,
            target.resumeCvUrlAbsolute
        )

        if(!validation.success) {
            setValidationError(validation)
            return
        }

        setValidationError(null)
        feedbacks.setActivitySpinnerVisible(true, modalId, language.getString("sending_resume"))

        const fakeEmailRequests = utils.storage.getWindowVariable("fakeEmailRequests") || false
        const apiResponse = fakeEmailRequests ?
            await api.handlers.dummyRequest() :
            await api.handlers.sendEmailRequest(
                validation.bundle,
                target.publicKey,
                target.serviceId,
                target.templateId
            )

        feedbacks.setActivitySpinnerVisible(false, modalId)

        if(!apiResponse?.success) {
            feedbacks.displayNotification(
                language.getString("error"),
                language.getString("error_sending_resume"),
                "error"
            )
            return
        }

        feedbacks.displayNotification(
            language.getString("resume_sent"),
            language.getString("resume_sent_message"),
            "default"
        )
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={modalId}
                      className={`modal-md ${shouldDismiss ? "" : "fade"}`}
                      dialogClassName={`modal-dialog-centered modal-dialog-scrollable`}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-solid fa-envelope`}
                               tooltip={language.getString("close_window")}
                               onClose={_close}/>

            <ModalWrapperBody className={`resume-email-modal-body`}>
                <form className={`resume-email-modal-form`}
                      onSubmit={_onSubmit}>
                    {validationError && (
                        <RowFormGroupAlert variant={`danger`}
                                           message={errorMessage}/>
                    )}

                    <div className={`resume-email-modal-field`}>
                        <Input id={`resume-email-recipient`}
                               name={`recipient-email`}
                               type={`email`}
                               model={recipientEmail}
                               setModel={setRecipientEmail}
                               faIconPrefix={`fa-solid fa-envelope`}
                               placeholder={language.getString("email")}
                               className={`text-3`}
                               required={true}/>
                    </div>

                    <div className={`resume-email-modal-actions`}>
                        <StandardButton label={cancelLabel}
                                        tooltip={cancelLabel}
                                        variant={`outline-secondary`}
                                        type={`button`}
                                        onClick={_close}/>

                        <StandardButton label={sendLabel}
                                        tooltip={sendLabel}
                                        type={`submit`}
                                        faIcon={`fa-solid fa-paper-plane`}/>
                    </div>
                </form>
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

export default ResumeEmailModal
