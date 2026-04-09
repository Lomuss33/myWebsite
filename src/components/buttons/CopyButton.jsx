import "./CopyButton.scss"
import React, {useEffect, useState} from "react"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"
import {useScheduler} from "../../hooks/scheduler.js"
import {useUtils} from "../../hooks/utils.js"
import HoverStaticTooltip from "../widgets/HoverStaticTooltip.jsx"

function CopyButton({ text = "", label = "", buttonClassName = "", variant = "icon" }) {
    const viewport = useViewport()
    const language = useLanguage()
    const scheduler = useScheduler()
    const utils = useUtils()

    const [didCopy, setDidCopy] = useState(false)
    const [forceReset, setForceReset] = useState(0)
    const [uniqueId, setUniqueId] = useState(utils.string.generateUniqueRandomString("audio-button-"))

    const isTouchScreen = utils.device.isTouchDevice()
    const tooltipText = language.getString(didCopy ? "copied_to_clipboard" : "copy_to_clipboard")
    const faIcon = didCopy ? "fa-solid fa-check" : "fa-solid fa-copy"
    const isCopiedToClipboard = viewport.isCopiedToClipboard(text)
    const displayLabel = (label || "").trim()

    useEffect(() => {
        if(!isCopiedToClipboard && didCopy) {
            setDidCopy(false)
            if(isTouchScreen) setForceReset(prev => prev + 1)
        }
    }, [isCopiedToClipboard])

    const _onClick = async () => {
        await viewport.copyToClipboard(text)
        setDidCopy(true)

        const tag = "copy-button-" + text
        scheduler.clearAllWithTag(tag)
        scheduler.schedule(() => {
            setDidCopy(false)
            if(isTouchScreen) setForceReset(prev => prev + 1)
        }, 1000, tag)
    }

    return (
        <div className={`copy-button-wrapper ${buttonClassName}`}>
            <HoverStaticTooltip label={tooltipText}
                                className={`copy-button-tooltip text-center text-4`}
                                id={uniqueId + "-tooltip"}
                                forceResetFlag={forceReset}
                                forceVisible={didCopy}
                                targetId={uniqueId}/>

            <button className={`copy-button copy-button-${variant}`}
                    id={uniqueId}
                    type={`button`}
                    onClick={_onClick}>
                <i className={`${faIcon}`}/>
                {displayLabel && (
                    <span className={`copy-button-label`}>{displayLabel}</span>
                )}
            </button>
        </div>
    )
}

export default CopyButton
