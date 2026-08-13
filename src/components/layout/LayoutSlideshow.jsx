import "./LayoutSlideshow.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react"
import {createPortal} from "react-dom"
import Section from "../sections/Section.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"
import {useLanguage} from "../../providers/LanguageProvider.jsx"

function LayoutSlideshow({ sections, currentSection, previousSection }) {
    const slideshowRef = useRef(null)
    const cloudTimersRef = useRef([])
    const paperTimersRef = useRef([])
    const [cloudGuide, setCloudGuide] = useState(null)
    const [paperSwitch, setPaperSwitch] = useState(null)
    const navigation = useNavigation()
    const feedbacks = useFeedbacks()
    const currentSectionId = currentSection?.id || null
    const previousSectionId = previousSection?.id || null
    const forceScrollToTopCount = navigation.shouldForceScrollToTopCount

    const isTransitioning = navigation.isTransitioning()
    const transitioningClass = isTransitioning ? "layout-slideshow-transitioning" : ""
    const paperSwitchingClass = paperSwitch ? `layout-slideshow-paper-switching layout-slideshow-paper-${paperSwitch.phase}` : ""
    const currentSectionIndex = sections.findIndex(({ id }) => id === currentSectionId)
    const previousSectionIndex = sections.findIndex(({ id }) => id === previousSectionId)
    const transitionDirection = _resolveTransitionDirection(currentSectionIndex, previousSectionIndex, sections.length)
    const directionClass = isTransitioning ? `layout-slideshow-direction-${transitionDirection}` : ""
    const destinationLink = navigation.sectionLinks.find(({ id }) => id === currentSectionId)
    const destinationLabel = destinationLink?.tooltip || destinationLink?.label || currentSectionId || ""
    const destinationAriaLabel = destinationLabel.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    const previousNavigationTarget = _getAdjacentSection(sections, currentSectionIndex, -1)
    const nextNavigationTarget = _getAdjacentSection(sections, currentSectionIndex, 1)
    const canNavigateWithArrows = !isTransitioning && !paperSwitch && !feedbacks.isBlockedByOverlay()
    const adjacentControlGeometry = useAdjacentControlGeometry(slideshowRef)
    const controlsHost = slideshowRef.current?.closest(".layout-navigation-wrapper") || null

    useEffect(() => {
        const clearPaperTimers = () => {
            paperTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
            paperTimersRef.current = []
        }

        if(isTransitioning && currentSectionId) {
            clearPaperTimers()
            setPaperSwitch({sectionId: currentSectionId, phase: "covering"})
            return clearPaperTimers
        }

        if(!paperSwitch || paperSwitch.phase !== "covering")
            return clearPaperTimers

        const beginPaperReveal = () => {
            clearPaperTimers()
            paperTimersRef.current.push(window.setTimeout(() => {
                setPaperSwitch((sheet) => sheet ? {...sheet, phase: "revealing"} : null)
                paperTimersRef.current.push(window.setTimeout(() => {
                    setPaperSwitch(null)
                }, 580))
            }, 140))
        }

        const revealWhenReady = () => {
            const sectionElement = document.getElementById(`section-${paperSwitch.sectionId}`)
            const isDestinationReady = sectionElement?.classList.contains("section-shown") &&
                !sectionElement.querySelector(".section-loading-placeholder")

            if(!isDestinationReady)
                return false

            beginPaperReveal()
            return true
        }

        if(revealWhenReady())
            return clearPaperTimers

        const observer = new MutationObserver(() => {
            if(revealWhenReady())
                observer.disconnect()
        })
        observer.observe(slideshowRef.current, {attributes: true, childList: true, subtree: true})
        paperTimersRef.current.push(window.setTimeout(() => {
            observer.disconnect()
            beginPaperReveal()
        }, 6000))

        return () => {
            observer.disconnect()
            clearPaperTimers()
        }
    }, [isTransitioning, currentSectionId, paperSwitch?.sectionId])

    useEffect(() => {
        const clearCloudTimers = () => {
            cloudTimersRef.current.forEach((timerId) => window.clearTimeout(timerId))
            cloudTimersRef.current = []
        }

        if(isTransitioning && destinationLink) {
            clearCloudTimers()
            setCloudGuide({
                sectionId: currentSectionId,
                link: destinationLink,
                label: destinationLabel,
                ariaLabel: destinationAriaLabel,
                direction: transitionDirection,
                phase: "visible"
            })
            return clearCloudTimers
        }

        if(!cloudGuide || cloudGuide.phase !== "visible")
            return clearCloudTimers

        const finishWhenReady = () => {
            const sectionElement = document.getElementById(`section-${cloudGuide.sectionId}`)
            const isPageReady = sectionElement?.classList.contains("section-shown") &&
                !sectionElement.querySelector(".section-loading-placeholder")

            if(!isPageReady)
                return false

            clearCloudTimers()
            cloudTimersRef.current.push(window.setTimeout(() => {
                setCloudGuide((guide) => guide ? {...guide, phase: "leaving"} : null)
                cloudTimersRef.current.push(window.setTimeout(() => {
                    setCloudGuide(null)
                }, 440))
            }, 620))
            return true
        }

        if(finishWhenReady())
            return clearCloudTimers

        const observer = new MutationObserver(() => {
            if(finishWhenReady())
                observer.disconnect()
        })
        observer.observe(slideshowRef.current, {attributes: true, childList: true, subtree: true})

        return () => {
            observer.disconnect()
            clearCloudTimers()
        }
    }, [isTransitioning, currentSectionId, destinationLabel, transitionDirection, cloudGuide?.sectionId])

    const _shouldTransition = (section) => {
        const isCurrentOrPrevious = section.id === currentSectionId || section.id === previousSectionId
        return isCurrentOrPrevious && isTransitioning
    }

    const _getNavigationLabel = (section) => {
        if(!section)
            return ""

        const link = navigation.sectionLinks.find(({ id }) => id === section.id)
        return (link?.label || section.id || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    }

    const _navigateToAdjacentSection = (section) => {
        if(!section || !canNavigateWithArrows)
            return

        navigation.navigateToSectionWithLink(`#${section.id}`)
    }

    useEffect(() => {
        const onKeyDown = (event) => {
            if(event.defaultPrevented || event.repeat)
                return

            if(event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
                return

            if(event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                return

            if(_isEditableNavigationTarget(event.target))
                return

            const section = event.key === "ArrowLeft" ? previousNavigationTarget : nextNavigationTarget
            if(!section || !canNavigateWithArrows)
                return

            event.preventDefault()
            navigation.navigateToSectionWithLink(`#${section.id}`)
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [
        previousNavigationTarget?.id,
        nextNavigationTarget?.id,
        canNavigateWithArrows,
        navigation.navigateToSectionWithLink
    ])

    return (
        <div className={`layout-slideshow ${transitioningClass} ${directionClass} ${paperSwitchingClass}`.trim()}
             ref={slideshowRef}
             style={adjacentControlGeometry}>
            {sections.map((section) => (
                <Section
                    key={section.id}
                    section={section}
                    visible={section.id === currentSectionId}
                    shouldTransition={_shouldTransition(section)}
                    forceScrollToTopCount={section.id === currentSectionId ? forceScrollToTopCount : null}
                />
            ))}

            {paperSwitch && (
                <div className={`layout-slideshow-paper-sheet layout-slideshow-paper-sheet-${paperSwitch.phase}`}
                     aria-hidden="true">
                    <span className="layout-slideshow-paper-sheet-edge"/>
                </div>
            )}

            {controlsHost && createPortal(
                <div className="layout-slideshow-adjacent-controls"
                     style={adjacentControlGeometry}>
                    <AdjacentSectionButton direction="previous"
                                           target={previousNavigationTarget}
                                           label={_getNavigationLabel(previousNavigationTarget)}
                                           disabled={!previousNavigationTarget || !canNavigateWithArrows}
                                           onClick={() => _navigateToAdjacentSection(previousNavigationTarget)}/>

                    <AdjacentSectionButton direction="next"
                                           target={nextNavigationTarget}
                                           label={_getNavigationLabel(nextNavigationTarget)}
                                           disabled={!nextNavigationTarget || !canNavigateWithArrows}
                                           onClick={() => _navigateToAdjacentSection(nextNavigationTarget)}/>
                </div>,
                controlsHost
            )}

            {cloudGuide && (
                <div
                    className={`layout-slideshow-transition-guide layout-slideshow-transition-guide-${cloudGuide.direction} layout-slideshow-transition-guide-${cloudGuide.phase}`}
                    role="status"
                    aria-label={cloudGuide.ariaLabel}
                >
                    <span className="layout-slideshow-transition-destination">
                        <span className="layout-slideshow-transition-cloud-glow" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-sheen" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-1" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-2" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-3" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-4" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-direction" aria-hidden="true">
                            <i className={`fa-solid ${cloudGuide.direction === "forward" ? "fa-arrow-right-long" : "fa-arrow-left-long"}`} aria-hidden="true"/>
                        </span>
                        <span
                            className="layout-slideshow-transition-label"
                            dangerouslySetInnerHTML={{ __html: cloudGuide.label }}
                        />
                        <i className={cloudGuide.link.faIcon} aria-hidden="true"/>
                    </span>
                </div>
            )}
        </div>
    )
}

function useAdjacentControlGeometry(slideshowRef) {
    const [geometry, setGeometry] = useState(null)

    useLayoutEffect(() => {
        const slideshowElement = slideshowRef.current
        if(!slideshowElement)
            return undefined

        let measureFrameId = null
        let settleFrameId = null
        let isDisposed = false

        const measure = () => {
            const pageElement = slideshowElement.closest(".layout-navigation-children-inner") || slideshowElement
            const layoutElement = pageElement.closest(".layout-navigation-wrapper")
            const navigationElement = layoutElement?.querySelector(":scope > nav.nav-sidebar")
            const scrollViewport = slideshowElement.querySelector("section.section-shown .scrollable")
            const rect = (scrollViewport || pageElement).getBoundingClientRect()
            const layoutRect = layoutElement?.getBoundingClientRect()
            const navigationRect = navigationElement?.getBoundingClientRect()
            const controlsElement = layoutElement?.querySelector(".layout-slideshow-adjacent-controls")
            const coinElement = controlsElement?.querySelector(".layout-slideshow-adjacent-panel-coin")
            const resolvedCoinSize = coinElement ? Number.parseFloat(window.getComputedStyle(coinElement).width) : 48
            const responsiveCoinSize = Number.isFinite(resolvedCoinSize) && resolvedCoinSize > 0 ? resolvedCoinSize : 48
            const diskRadius = Math.max(22, responsiveCoinSize * 0.65)
            const viewportWidth = window.visualViewport?.width || window.innerWidth
            const viewportHeight = window.visualViewport?.height || window.innerHeight
            const visibleTop = Math.max(0, rect.top)
            const visibleBottom = Math.min(viewportHeight, rect.bottom)
            const centerY = visibleBottom > visibleTop ?
                visibleTop + (visibleBottom - visibleTop) / 2 :
                Math.min(Math.max(rect.top + rect.height / 2, diskRadius), viewportHeight - diskRadius)
            const leftBackgroundEdge = navigationRect?.right ?? layoutRect?.left ?? rect.left
            const rightBackgroundEdge = Math.min(layoutRect?.right ?? viewportWidth, viewportWidth)
            const leftGutter = Math.max(0, rect.left - leftBackgroundEdge)
            const rightGutter = Math.max(0, rightBackgroundEdge - rect.right)
            const hookedInset = 5
            const leftDetachFactor = Math.min(1, leftGutter / diskRadius)
            const rightDetachFactor = Math.min(1, rightGutter / diskRadius)
            const previousCenterX = rect.left + hookedInset * (1 - leftDetachFactor) - diskRadius * leftDetachFactor
            const nextCenterX = rect.right - hookedInset * (1 - rightDetachFactor) + diskRadius * rightDetachFactor
            const hoverEdgeClearance = 5
            const nextOpenShiftX = Math.min(0, rightBackgroundEdge - diskRadius - hoverEdgeClearance - nextCenterX)

            if(![centerY, previousCenterX, nextCenterX, nextOpenShiftX].every(Number.isFinite))
                return

            setGeometry({
                "--adjacent-control-opacity": "1",
                "--adjacent-control-center-y": `${centerY}px`,
                "--adjacent-control-previous-center-x": `${previousCenterX}px`,
                "--adjacent-control-next-center-x": `${nextCenterX}px`,
                "--adjacent-control-previous-open-shift-x": "0px",
                "--adjacent-control-next-open-shift-x": `${nextOpenShiftX}px`
            })
        }

        const scheduleMeasure = () => {
            if(measureFrameId !== null)
                return

            measureFrameId = window.requestAnimationFrame(() => {
                measureFrameId = null
                measure()
            })
        }

        const settleMeasurements = (framesRemaining = 24) => {
            if(isDisposed)
                return

            measure()
            if(framesRemaining <= 1)
                return

            settleFrameId = window.requestAnimationFrame(() => settleMeasurements(framesRemaining - 1))
        }

        settleMeasurements()

        const resizeObserver = new ResizeObserver(scheduleMeasure)
        resizeObserver.observe(slideshowElement)

        const pageElement = slideshowElement.closest(".layout-navigation-children-inner")
        if(pageElement)
            resizeObserver.observe(pageElement)

        const layoutElement = slideshowElement.closest(".layout-navigation-wrapper")
        const navigationElement = layoutElement?.querySelector(":scope > nav.nav-sidebar")
        const scrollViewport = slideshowElement.querySelector("section.section-shown .scrollable")
        if(layoutElement)
            resizeObserver.observe(layoutElement)
        if(navigationElement)
            resizeObserver.observe(navigationElement)
        if(scrollViewport)
            resizeObserver.observe(scrollViewport)

        const mutationObserver = new MutationObserver(scheduleMeasure)
        const mutationOptions = {
            attributes: true,
            attributeFilter: ["class", "style"]
        }
        mutationObserver.observe(layoutElement || pageElement, mutationOptions)
        if(pageElement !== layoutElement)
            mutationObserver.observe(pageElement, mutationOptions)
        if(navigationElement)
            mutationObserver.observe(navigationElement, mutationOptions)
        mutationObserver.observe(slideshowElement, {
            attributes: true,
            attributeFilter: ["class"],
            subtree: true
        })

        const settleAfterFonts = () => settleMeasurements(8)
        document.fonts?.ready.then(settleAfterFonts)

        window.addEventListener("load", settleAfterFonts)
        window.addEventListener("resize", scheduleMeasure)
        layoutElement?.addEventListener("transitionend", scheduleMeasure)
        window.visualViewport?.addEventListener("resize", scheduleMeasure)
        window.visualViewport?.addEventListener("scroll", scheduleMeasure)

        return () => {
            isDisposed = true
            resizeObserver.disconnect()
            mutationObserver.disconnect()
            if(measureFrameId !== null)
                window.cancelAnimationFrame(measureFrameId)
            if(settleFrameId !== null)
                window.cancelAnimationFrame(settleFrameId)
            window.removeEventListener("load", settleAfterFonts)
            window.removeEventListener("resize", scheduleMeasure)
            layoutElement?.removeEventListener("transitionend", scheduleMeasure)
            window.visualViewport?.removeEventListener("resize", scheduleMeasure)
            window.visualViewport?.removeEventListener("scroll", scheduleMeasure)
        }
    }, [slideshowRef])

    return geometry || {
        "--adjacent-control-opacity": "0",
        "--adjacent-control-center-y": "50vh",
        "--adjacent-control-previous-center-x": "32px",
        "--adjacent-control-next-center-x": "calc(100vw - 32px)",
        "--adjacent-control-previous-open-shift-x": "0px",
        "--adjacent-control-next-open-shift-x": "0px"
    }
}

function AdjacentSectionButton({ direction, target, label, disabled, onClick }) {
    const language = useLanguage()
    const isPrevious = direction === "previous"
    const iconClass = isPrevious ? "fa-solid fa-chevron-left" : "fa-solid fa-chevron-right"
    const edgeClass = isPrevious ? "layout-slideshow-adjacent-button-previous" : "layout-slideshow-adjacent-button-next"
    const ariaLabel = label ? `${isPrevious ? "Previous" : "Next"} section: ${label}` : `${isPrevious ? "Previous" : "Next"} section`
    const targetIconClass = target?.faIcon || ""

    return (
        <button className={`layout-slideshow-adjacent-button ${edgeClass}`}
                type="button"
                data-direction={direction}
                data-tooltip={language.getString("adjacent_page_navigation_hint")}
                aria-label={ariaLabel}
                disabled={disabled}
                onClick={onClick}>
            <span className="layout-slideshow-adjacent-hitfield"
                  aria-hidden="true"/>
            <span className="layout-slideshow-adjacent-panel"
                  aria-hidden="true">
                <span className="layout-slideshow-adjacent-rest-arrow">
                    <span/>
                    <span/>
                </span>
                <span className="layout-slideshow-adjacent-panel-coin">
                    <span className="layout-slideshow-adjacent-panel-shadow"/>
                    <span className="layout-slideshow-adjacent-panel-back"/>
                    <span className="layout-slideshow-adjacent-panel-ring"/>
                    <span className="layout-slideshow-adjacent-panel-sheen"/>
                    <span className="layout-slideshow-adjacent-panel-inner">
                        <i className={`layout-slideshow-adjacent-panel-icon layout-slideshow-adjacent-panel-icon-default ${iconClass}`}
                           aria-hidden="true"/>
                        {targetIconClass && (
                            <i className={`layout-slideshow-adjacent-panel-icon layout-slideshow-adjacent-panel-icon-target ${targetIconClass}`}
                               aria-hidden="true"/>
                        )}
                    </span>
                </span>
            </span>
            {target && (
                <span className="layout-slideshow-adjacent-button-label">
                    {label}
                </span>
            )}
        </button>
    )
}

function _getAdjacentSection(sections, currentSectionIndex, offset) {
    if(!Array.isArray(sections) || sections.length <= 1 || currentSectionIndex < 0)
        return null

    const nextIndex = (currentSectionIndex + offset + sections.length) % sections.length
    return sections[nextIndex]
}

function _resolveTransitionDirection(currentSectionIndex, previousSectionIndex, sectionCount) {
    if(currentSectionIndex < 0 || previousSectionIndex < 0)
        return "forward"

    if(previousSectionIndex === sectionCount - 1 && currentSectionIndex === 0)
        return "forward"

    if(previousSectionIndex === 0 && currentSectionIndex === sectionCount - 1)
        return "backward"

    return currentSectionIndex < previousSectionIndex ? "backward" : "forward"
}

function _isEditableNavigationTarget(target) {
    if(!target || !(target instanceof Element))
        return false

    const tagName = target.tagName?.toLowerCase()
    if(tagName === "input" || tagName === "textarea" || tagName === "select")
        return true

    if(target.isContentEditable)
        return true

    return Boolean(target.closest?.('[contenteditable="true"], input, textarea, select, [role="textbox"]'))
}

export default LayoutSlideshow
