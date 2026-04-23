import "./AudioButton.scss"
import React, {useEffect, useRef, useState} from 'react'
import {useUtils} from "../../hooks/utils.js"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import Tooltip from "../generic/Tooltip.jsx"

function AudioButton({ url = "", tooltip = "", tooltipLabel = "", size = "", buttonClassName = "", tooltipClassName = "" }) {
    const feedbacks = useFeedbacks()
    const utils = useUtils()

    const audioRef = useRef(null)
    const [uniqueId] = useState(utils.string.generateUniqueRandomString("audio-button-"))
    const [status, setStatus] = useState(AudioButton.Status.NONE)
    const [isTooltipVisible, setIsTooltipVisible] = useState(false)

    const isMagicCursorEnabledAndActive = feedbacks.animatedCursorEnabled && feedbacks.animatedCursorActive
    const tooltipHtml = tooltipLabel || tooltip
    const shouldShowStaticTooltip = tooltipHtml && !isMagicCursorEnabledAndActive

    /** @listens url **/ 
    useEffect(() => {
        _reset()
    }, [url])

    const _onClick = () => {
        if(!url) return

        const closureMap = {
            [AudioButton.Status.NONE]: _loadAudio,
            [AudioButton.Status.PLAYING]: _stopAudio,
            [AudioButton.Status.COMPLETED]: _playAudio,
        }

        const closure = closureMap[status]
        closure && closure()
    }

    const _reset = () => {
        audioRef.current?.pause()
        setStatus(AudioButton.Status.NONE)
        audioRef.current = null
    }

    const _loadAudio = () => {
        setStatus(AudioButton.Status.LOADING)
        const resolvedPath = utils.file.resolvePath(url)
        audioRef.current = new Audio(resolvedPath)
        audioRef.current.addEventListener("loadeddata", () => {
            _playAudio()
        })
        audioRef.current.addEventListener("ended", () => {
            _stopAudio()
        })
        audioRef.current.addEventListener("error", () => {
            _reset()
            utils.log.warn("AudioButton", "Couldn't load audio from URL: " + resolvedPath)
        })
    }

    const _playAudio = () => {
        if(!audioRef.current) return
        setStatus(AudioButton.Status.PLAYING)
        audioRef.current.currentTime = 0
        audioRef.current?.play()
    }

    const _stopAudio = () => {
        if(!audioRef.current) return
        setStatus(AudioButton.Status.COMPLETED)
        audioRef.current.currentTime = 0
        audioRef.current?.pause()
    }

    return (
        <div className={`audio-button-wrapper ${size}`}
             onPointerEnter={() => setIsTooltipVisible(true)}
             onPointerLeave={() => setIsTooltipVisible(false)}>
            {shouldShowStaticTooltip && isTooltipVisible && (
                <Tooltip label={tooltipHtml}
                         id={uniqueId + "-tooltip"}
                         className={`audio-button-tooltip text-center ${tooltipClassName}`}/>
            )}

            <button className={`audio-button playBut ${buttonClassName}`}
                    type="button"
                    id={uniqueId}
                    aria-pressed={status === AudioButton.Status.PLAYING}
                    onClick={_onClick}>
                <svg version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     x="0px"
                     y="0px"
                     viewBox="0 0 213.7 213.7"
                     xmlSpace="preserve"
                     aria-hidden="true">
                    <polygon className="triangle"
                             id="XMLID_18_"
                             fill="none"
                             strokeWidth="7"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeMiterlimit="10"
                             points="73.5,62.5 148.5,105.8 73.5,149.1"/>
                    <circle className="circle"
                            id="XMLID_17_"
                            fill="none"
                            strokeWidth="7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit="10"
                            cx="106.8"
                            cy="106.8"
                            r="103.3"/>
                </svg>
            </button>
        </div>
    )
}

AudioButton.Sizes = {
    DEFAULT: "audio-button-wrapper-size-default",
    DYNAMIC_FOR_NAV_TITLE: "audio-button-wrapper-size-dynamic-for-nav-title",
}

AudioButton.Status = {
    NONE: "none",
    LOADING: "loading",
    PLAYING: "playing",
    COMPLETED: "completed",
}

export default AudioButton
