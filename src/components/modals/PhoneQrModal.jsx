import "./PhoneQrModal.scss"
import React, {useEffect, useMemo, useState} from "react"
import QRCodeGenerator from "qrcode"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {ModalWrapper, ModalWrapperBody, ModalWrapperTitle} from "./base/ModalWrapper"
import StandardButton from "../buttons/StandardButton.jsx"

function PhoneQrModal({ target, onDismiss }) {
    const language = useLanguage()
    const [shouldDismiss, setShouldDismiss] = useState(false)
    const [qrDataUrl, setQrDataUrl] = useState("")

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

    useEffect(() => {
        let cancelled = false
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
                setQrDataUrl("")
                return
            }

            try {
                const url = await QRCodeGenerator.toDataURL(qrValue, {
                    errorCorrectionLevel: "Q",
                    margin: 4,
                    width: 512,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                })

                if(!cancelled)
                    setQrDataUrl(url)
            }
            catch (error) {
                if(!cancelled)
                    setQrDataUrl("")
            }
        }

        generateQr()
        return () => {
            cancelled = true
        }
    }, [qrValue])

    if(!target)
        return <></>

    const modalClass = shouldDismiss ? `` : `fade`
    const title = target.title || language.getStringOrFallback("scan_to_call_title", "Scan to Call")
    const displayNumber = target.phoneNumberDisplay || target.phoneNumberRaw || ""
    const okayLabel = language.getStringOrFallback("okay", "Okay")
    const instruction = language.getStringOrFallback(
        "scan_to_call_message",
        "Scan this QR code with your phone camera to open the number in the dialer."
    )

    const _onClose = () => {
        setShouldDismiss(true)
    }

    return (
        <ModalWrapper id={`phone-qr-modal`}
                      className={`modal-md ${modalClass}`}
                      dialogClassName={`modal-dialog-centered`}
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

                <div className={`phone-qr-modal-code`}>
                    {qrDataUrl && (
                        <img className={`phone-qr-modal-code-image`}
                             src={qrDataUrl}
                             alt={`QR code for ${displayNumber}`}
                             draggable={false}/>
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
