import "./Section.scss"
import React, {memo, useEffect, useRef, useState} from 'react'
import {useScheduler} from "../../hooks/scheduler.js"
import Scrollable from "../capabilities/Scrollable.jsx"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useInput} from "../../providers/InputProvider.jsx"
import {useViewport} from "../../providers/ViewportProvider.jsx"
import SectionContent from "./SectionContent.jsx"
import NavToolFullscreenToggle from "../nav/tools/NavToolFullscreenToggle.jsx"

const SECTION_STATUS = {
    SHOWING: "showing",
    SHOWN: "shown",
    HIDING: "hiding",
    HIDDEN: "hidden",
    WILL_HIDE: "will-hide",
    WILL_SHOW: "will-show"
}

const Section = memo(function Section({ section, visible, shouldTransition, forceScrollToTopCount = null }) {
    const [status, setStatus] = useState(SECTION_STATUS.HIDDEN)
    const [shouldResetScroll, setShouldResetScroll] = useState(false)
    const hasInitializedForceScrollRef = useRef(false)

    const isHidden = status === SECTION_STATUS.HIDDEN
    const shouldRenderSection = !isHidden
    const shouldRenderFocusManager = status !== SECTION_STATUS.HIDDEN

    useEffect(() => {
        if(!hasInitializedForceScrollRef.current) {
            hasInitializedForceScrollRef.current = true
            return
        }

        if(visible)
            setShouldResetScroll(true)
    }, [forceScrollToTopCount, visible])

    return (
        <>
            <SectionTransitionManager section={section}
                                      visible={visible}
                                      shouldTransition={shouldTransition}
                                      status={status}
                                      setStatus={setStatus}/>

            {shouldRenderSection && (
                <>
                    <SectionRenderer section={section}
                                     status={status}
                                     shouldResetScroll={shouldResetScroll}
                                     setShouldResetScroll={setShouldResetScroll}/>

                    {shouldRenderFocusManager && (
                        <SectionFocusManager section={section}
                                             status={status}/>
                    )}
                </>
            )}
        </>
    )
})

function SectionRenderer({ section, status, shouldResetScroll, setShouldResetScroll}) {
    const viewport = useViewport()
    const layoutConstraints = viewport.getLayoutConstraints()
    const canToggleFullscreen = layoutConstraints.canToggleFullscreen

    const statusClassName = `section-${status}`

    return (
        <section className={`section ${statusClassName}`}
                 id={`section-${section.id}`}>
            {canToggleFullscreen && (
                <NavToolFullscreenToggle className={`section-fullscreen-toggle`}/>
            )}

            <Scrollable id={`scrollable-${section.id}`}
                        className={`section-scrollable`}
                        shouldResetScroll={shouldResetScroll}
                        setShouldResetScroll={setShouldResetScroll}>
                <SectionContent section={section}/>
            </Scrollable>
        </section>
    )
}

function SectionTransitionManager({ section, visible, shouldTransition, status, setStatus }) {
    const scheduler = useScheduler()

    const schedulerTag = section?.id + "-transition"

    useEffect(() => {
        if(!shouldTransition) {
            if(visible) _showInstantly()
            else _hideInstantly()
        }
        else {
            if(visible) _tweenIn()
            else _tweenOut()
        }
    }, [visible, shouldTransition])

    const _hideInstantly = () => {
        scheduler.clearAllWithTag(schedulerTag)
        setStatus(SECTION_STATUS.HIDDEN)
    }

    const _showInstantly = () => {
        scheduler.clearAllWithTag(schedulerTag)
        setStatus(SECTION_STATUS.SHOWN)
    }

    const _tweenOut = () => {
        scheduler.clearAllWithTag(schedulerTag)
        setStatus(SECTION_STATUS.WILL_HIDE)
        scheduler.schedule(() => { setStatus(SECTION_STATUS.HIDING) }, 0, schedulerTag)
        scheduler.schedule(() => { setStatus(SECTION_STATUS.HIDDEN) }, 420, schedulerTag)
    }

    const _tweenIn = () => {
        scheduler.clearAllWithTag(schedulerTag)
        setStatus(SECTION_STATUS.WILL_SHOW)
        scheduler.schedule(() => { setStatus(SECTION_STATUS.SHOWING) }, 0, schedulerTag)
        scheduler.schedule(() => { setStatus(SECTION_STATUS.SHOWN) }, 420, schedulerTag)
    }
}

function SectionFocusManager({ section, status }) {
    const feedbacks = useFeedbacks()
    const input = useInput()
    const viewport = useViewport()

    const isFocusingForbidden = viewport.isMobileLayout() ||
        feedbacks.isBlockedByOverlay() ||
        status !== SECTION_STATUS.SHOWN

    useEffect(() => {
        if(status === SECTION_STATUS.SHOWN) _focus()
        else if(status !== SECTION_STATUS.HIDDEN) _blur()
    }, [status])

    useEffect(() => {
        if(status !== SECTION_STATUS.SHOWN)
            return

        const keyId = input.lastKeyPressed?.id
        if(keyId === "ArrowUp" || keyId === "ArrowDown")
            _focus(true)
    }, [input.lastKeyPressed])

    const _getScrollableElement = () => {
        const sectionEl = document.getElementById(`section-${section.id}`)
        if(!sectionEl)
            return null

        return document.getElementById(`section-${section.id}`).querySelector('.scrollable')
    }

    const _focus = () => {
        const sectionScrollableEl = _getScrollableElement()
        if(!sectionScrollableEl)
            return

        if(!isFocusingForbidden)
            sectionScrollableEl.focus()
    }

    const _blur = () => {
        const sectionScrollableEl = _getScrollableElement()
        if(!sectionScrollableEl)
            return

        if(!isFocusingForbidden)
            sectionScrollableEl.blur()
    }
}

export default Section
