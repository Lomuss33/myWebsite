/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider is responsible for managing feedbacks, modals and UI interactions.
 */

import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useUtils} from "../hooks/utils.js"
import {useScheduler} from "../hooks/scheduler.js"
import {useLanguage} from "./LanguageProvider.jsx"
import {useViewport} from "./ViewportProvider.jsx"
import ActivitySpinner from "../components/loaders/ActivitySpinner.jsx"
import MouseLayer from "../components/mouse/MouseLayer.jsx"
import NotificationsLayer from "../components/notifications/NotificationsLayer.jsx"
import YoutubeVideoModal from "../components/modals/YoutubeVideoModal.jsx"
import ConfirmationWindowModal from "../components/modals/ConfirmationWindowModal.jsx"
import GalleryModal from "../components/modals/GalleryModal.jsx"
import PhoneQrModal from "../components/modals/PhoneQrModal.jsx"
import ResumeEmailModal from "../components/modals/ResumeEmailModal.jsx"

const CURSOR_MODES = {
    MAGIC: "magic",
    MEDIEVAL: "medieval"
}

function FeedbacksProvider({ children, canHaveAnimatedCursor }) {
    const scheduler = useScheduler()
    const language = useLanguage()
    const viewport = useViewport()
    const utils = useUtils()

    const [spinnerActivities, setSpinnerActivities] = useState([])
    const [animatedCursorEnabled, setAnimatedCursorEnabled] = useState(false)
    const [cursorMode, setCursorModeState] = useState(() => {
        if(typeof window === "undefined")
            return CURSOR_MODES.MAGIC

        const savedCursorMode = utils.storage.getPreferredCursorMode()
        return Object.values(CURSOR_MODES).includes(savedCursorMode) ?
            savedCursorMode :
            CURSOR_MODES.MAGIC
    })
    const [animatedCursorLocked, setAnimatedCursorLocked] = useState(false)
    const [displayingNotification, setDisplayingNotification] = useState(null)
    const [displayingYoutubeVideo, setDisplayingYoutubeVideo] = useState(null)
    const [displayingGallery, setDisplayingGallery] = useState(null)
    const [displayingPhoneQr, setDisplayingPhoneQr] = useState(null)
    const [displayingResumeEmail, setDisplayingResumeEmail] = useState(null)
    const [pendingConfirmation, setPendingConfirmation] = useState(null)
    const confirmationIdRef = useRef(0)

    /** @listens canHaveAnimatedCursor|viewport.innerWidth **/
    useEffect(() => {
        setAnimatedCursorEnabled(
            canHaveAnimatedCursor &&
            utils.device.canHoverWithFinePointer() &&
            viewport.isBreakpoint("md")
        )
    }, [canHaveAnimatedCursor, viewport.innerWidth])

    /** @listens cursorMode **/
    useEffect(() => {
        utils.storage.setPreferredCursorMode(cursorMode)
    }, [cursorMode])

    /** @listens animatedCursorEnabled|cursorMode **/
    useEffect(() => {
        if(typeof document === "undefined")
            return

        if(!animatedCursorEnabled) {
            document.documentElement.removeAttribute("data-cursor-mode")
            return
        }

        document.documentElement.setAttribute("data-cursor-mode", cursorMode)
    }, [animatedCursorEnabled, cursorMode])

    const setActivitySpinnerVisible = (visible, activityId, message) => {
        setSpinnerActivities(prev => {
            if (visible) {
                if (prev.some(activity => activity.id === activityId)) return prev
                return [...prev, { id: activityId, message }]
            }
            else {
                return prev.filter(activity => activity.id !== activityId)
            }
        })
    }

    const showActivitySpinnerFor = (milliseconds, activityId, message) => {
        scheduler.clearAllWithTag("spinner-auto-interval")
        setActivitySpinnerVisible(true, activityId, message)
        scheduler.schedule(() => {
            setActivitySpinnerVisible(false, activityId)
        }, milliseconds, "spinner-auto-interval")
    }

    const isShowingActivitySpinner = () => {
        return Boolean(spinnerActivities.length)
    }

    const setCursorMode = (mode) => {
        if(!Object.values(CURSOR_MODES).includes(mode))
            return

        setCursorModeState(mode)
    }

    const toggleCursorMode = (withNotification) => {
        const nextMode = cursorMode === CURSOR_MODES.MEDIEVAL ?
            CURSOR_MODES.MAGIC :
            CURSOR_MODES.MEDIEVAL

        setCursorModeState(nextMode)
        if(!withNotification)
            return

        displayNotification(
            language.getString("cursor_mode"),
            language.getString(
                nextMode === CURSOR_MODES.MEDIEVAL ?
                    "switch_to_medieval_cursor_message" :
                    "switch_to_magic_cursor_message"
            ),
            "default",
            {
                compact: true,
                durationMs: 2200
            }
        )
    }

    const displayNotification = (title, message, type, options = {}) => {
        setDisplayingNotification({
            type: type,
            title: title,
            message: message,
            ...options
        })
    }

    const killNotification = () => {
        setDisplayingNotification(null)
    }

    const displayYoutubeVideo = (url, title, description) => {
        setDisplayingYoutubeVideo({
            url: url,
            title: title,
            description: description
        })
    }

    const closeYoutubeVideo = () => {
        setDisplayingYoutubeVideo(null)
    }

    const displayGallery = (images, type, title) => {
        setDisplayingGallery({
            images: images,
            type: type,
            title: title
        })
    }

    const closeGallery = () => {
        setDisplayingGallery(null)
    }

    const displayPhoneQr = (target) => {
        setDisplayingPhoneQr(target)
    }

    const closePhoneQr = () => {
        setDisplayingPhoneQr(null)
    }

    const displayResumeEmail = (target) => {
        setDisplayingResumeEmail(target)
    }

    const closeResumeEmail = () => {
        setDisplayingResumeEmail(null)
    }

    const showConfirmationDialog = (title, message, faIcon, onConfirm, confirmLabel, onCancel, cancelLabel) => {
        const confirmationId = ++confirmationIdRef.current
        setPendingConfirmation({
            id: confirmationId,
            title: title,
            message: message,
            faIcon: faIcon,
            onConfirm: onConfirm,
            confirmLabel: confirmLabel,
            onCancel: onCancel,
            cancelLabel: cancelLabel
        })
    }

    const isBlockedByOverlay = () => {
        return Boolean(
            isShowingActivitySpinner() ||
            displayingYoutubeVideo ||
            displayingGallery ||
            displayingPhoneQr ||
            displayingResumeEmail ||
            pendingConfirmation
        )
    }

    return (
        <FeedbacksContext.Provider value={{
            setActivitySpinnerVisible,
            showActivitySpinnerFor,
            isShowingActivitySpinner,

            animatedCursorEnabled,
            cursorMode,
            setCursorMode,
            setAnimatedCursorLocked,
            toggleCursorMode,

            displayNotification,
            killNotification,

            displayYoutubeVideo,
            closeYoutubeVideo,

            displayGallery,
            closeGallery,

            displayPhoneQr,
            closePhoneQr,

            displayResumeEmail,
            closeResumeEmail,

            showConfirmationDialog,
            isBlockedByOverlay
        }}>
            <ActivitySpinner activities={spinnerActivities}
                             defaultMessage={language.getString("loading")}/>

            <MouseLayer active={animatedCursorEnabled && cursorMode === CURSOR_MODES.MAGIC}
                        hidden={animatedCursorLocked}
                        isBlockedByOverlay={isBlockedByOverlay()}/>

            <NotificationsLayer target={displayingNotification}
                                onNotificationDismissed={killNotification}/>

            <YoutubeVideoModal target={displayingYoutubeVideo}
                               onDismiss={closeYoutubeVideo}/>

            <ConfirmationWindowModal target={pendingConfirmation}
                                     onDismiss={(dismissedTarget) => {
                                         setPendingConfirmation((current) => {
                                             if(!current) return null
                                             if(dismissedTarget?.id !== current.id) return current
                                             return null
                                         })
                                     }}/>

            <GalleryModal target={displayingGallery}
                          onDismiss={closeGallery}/>

            <PhoneQrModal target={displayingPhoneQr}
                          onDismiss={closePhoneQr}/>

            <ResumeEmailModal target={displayingResumeEmail}
                              onDismiss={closeResumeEmail}/>

            {children}
        </FeedbacksContext.Provider>
    )
}

const FeedbacksContext = createContext(null)
/**
 * @return {{
 *    setActivitySpinnerVisible: Function,
 *    showActivitySpinnerFor: Function,
 *    isShowingActivitySpinner: Function,
 *
 *    animatedCursorEnabled: Boolean,
 *    cursorMode: String,
 *    setCursorMode: Function,
 *    setAnimatedCursorLocked: Function,
 *    toggleCursorMode: Function,
 *
 *    displayNotification: Function,
 *    killNotification: Function,
 *
 *    displayYoutubeVideo: Function,
 *    closeYoutubeVideo: Function,
 *
 *    displayGallery: Function,
 *    closeGallery: Function,
 *
 *    displayPhoneQr: Function,
 *    closePhoneQr: Function,
 *
 *    displayResumeEmail: Function,
 *    closeResumeEmail: Function,
 *
 *    showConfirmationDialog: Function,
 *    isBlockedByOverlay: Function,
 * }}
 */
export const useFeedbacks = () => useContext(FeedbacksContext)

export default FeedbacksProvider
