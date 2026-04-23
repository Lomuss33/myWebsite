import "./PhoneQrModal.scss"
import React, {useEffect, useLayoutEffect, useMemo, useState} from "react"
import QRCodeGenerator from "qrcode"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {ModalWrapper, ModalWrapperBody, ModalWrapperTitle} from "./base/ModalWrapper"
import StandardButton from "../buttons/StandardButton.jsx"

const MAX_QR_SIZE = 320

function PhoneQrModal({ target, onDismiss }) {
    const language = useLanguage()
    const viewport = useViewport()
    const [shouldDismiss, setShouldDismiss] = useState(false)
    const [qrMarkup, setQrMarkup] = useState("")
    const [qrSize, setQrSize] = useState(0)

    useEffect(() => {
        setShouldDismiss(false)
    }, [target])

    const qrValue = useMemo(() => {
        if(target?.phoneNumberRaw)
            return `tel:${target.phoneNumberRaw}`

        if(target?.qrValue)
            return String(target.qrValue).trim()

        return ""
    }, [target])

    const title = target?.title || language.getStringOrFallback("scan_to_call_title", "Scan to Call")
    const displayNumber = target?.phoneNumberDisplay || target?.phoneNumberRaw || ""
    const okayLabel = language.getStringOrFallback("okay", "Okay")
    const instruction = language.getStringOrFallback(
        "scan_to_call_message",
        "Scan this QR code with your phone camera to open the number in the dialer."
    )

    useEffect(() => {
        if(!target) {
            document.body.classList.remove("phone-qr-backdrop-active")
            return
        }

        document.body.classList.add("phone-qr-backdrop-active")
        return () => {
            document.body.classList.remove("phone-qr-backdrop-active")
        }
    }, [target])

    useEffect(() => {
        let cancelled = false

        const generateQr = async () => {
            if(!qrValue) {
                setQrMarkup("")
                return
            }

            try {
                const svg = await QRCodeGenerator.toString(qrValue, {
                    type: "svg",
                    errorCorrectionLevel: "Q",
                    margin: 4,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                })

                if(!cancelled)
                    setQrMarkup(svg)
            }
            catch (error) {
                if(!cancelled)
                    setQrMarkup("")
            }
        }

        generateQr()
        return () => {
            cancelled = true
        }
    }, [qrValue])

    useLayoutEffect(() => {
        if(!target) {
            setQrSize(0)
            return
        }

        const modalRoot = document.getElementById("phone-qr-modal")
        const modalBody = modalRoot?.querySelector(".phone-qr-modal-body")
        const modalDialog = modalRoot?.querySelector(".modal-dialog")
        const modalHeader = modalRoot?.querySelector(".modal-header")
        const modalMessage = modalRoot?.querySelector(".phone-qr-modal-message")
        const modalNumber = modalRoot?.querySelector(".phone-qr-modal-number")
        const modalActions = modalRoot?.querySelector(".phone-qr-modal-actions")

        if(!modalBody || !modalDialog)
            return

        const bodyStyles = window.getComputedStyle(modalBody)
        const dialogStyles = window.getComputedStyle(modalDialog)

        const bodyPaddingX = (parseFloat(bodyStyles.paddingLeft) || 0) + (parseFloat(bodyStyles.paddingRight) || 0)
        const bodyPaddingY = (parseFloat(bodyStyles.paddingTop) || 0) + (parseFloat(bodyStyles.paddingBottom) || 0)
        const bodyGap = parseFloat(bodyStyles.gap || bodyStyles.rowGap || "0") || 0
        const dialogMarginY = (parseFloat(dialogStyles.marginTop) || 0) + (parseFloat(dialogStyles.marginBottom) || 0)

        const chromeHeight =
            (modalHeader?.getBoundingClientRect().height || 0) +
            (modalMessage?.getBoundingClientRect().height || 0) +
            (modalNumber?.getBoundingClientRect().height || 0) +
            (modalActions?.getBoundingClientRect().height || 0) +
            bodyPaddingY +
            (bodyGap * 3)

        const widthBudget = Math.max(0, modalBody.clientWidth - bodyPaddingX)
        const heightBudget = Math.max(0, viewport.innerHeight - dialogMarginY - chromeHeight)
        const nextSize = Math.floor(Math.min(widthBudget, heightBudget, MAX_QR_SIZE))

        setQrSize(nextSize)
    }, [target, viewport.innerWidth, viewport.innerHeight, instruction, displayNumber])

    if(!target)
        return <></>

    const modalClass = shouldDismiss ? `` : `fade`
    const qrCodeStyle = qrSize ? {
        width: `${qrSize}px`,
        height: `${qrSize}px`
    } : undefined

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`phone-qr-modal`}
                      className={`modal-md ${modalClass}`}
                      dialogClassName={`modal-dialog-centered modal-dialog-scrollable`}
                      shouldDismiss={shouldDismiss}
                      onDismiss={onDismiss}>
            <ModalWrapperTitle title={title}
                               faIcon={`fa-solid fa-phone`}
                               tooltip={language.getString("close_window")}
                               onClose={null}/>

            <ModalWrapperBody className={`phone-qr-modal-body`}>
                <p className={`phone-qr-modal-message text-3`}>
                    {instruction}
                </p>

                <div className={`phone-qr-modal-code`}
                     style={qrCodeStyle}>
                    {qrMarkup && (
                        <div className={`phone-qr-modal-code-image`}
                             role={`img`}
                             aria-label={`QR code for ${displayNumber}`}
                             dangerouslySetInnerHTML={{__html: qrMarkup}}/>
                    )}
                </div>

                <div className={`phone-qr-modal-number text-2`}>
                    <span>{displayNumber}</span>
                </div>

                <div className={`phone-qr-modal-actions`}>
                    <StandardButton label={okayLabel}
                                    tooltip={okayLabel}
                                    variant={`outline-secondary`}
                                    onClick={_onClose}/>
                </div>
            </ModalWrapperBody>
        </ModalWrapper>
    )
}

export default PhoneQrModal
