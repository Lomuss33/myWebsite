import "./LayoutSlideshow.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react"
import {createPortal} from "react-dom"
import Section from "../sections/Section.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"
import {useFeedbacks} from "../../providers/FeedbacksProvider.jsx"

function LayoutSlideshow({ sections, currentSection, previousSection }) {
    const slideshowRef = useRef(null)
    const navigation = useNavigation()
    const feedbacks = useFeedbacks()
    const currentSectionId = currentSection?.id || null
    const previousSectionId = previousSection?.id || null
    const forceScrollToTopCount = navigation.shouldForceScrollToTopCount

    const isTransitioning = navigation.isTransitioning()
    const transitioningClass = isTransitioning ? "layout-slideshow-transitioning" : ""
    const currentSectionIndex = sections.findIndex(({ id }) => id === currentSectionId)
    const previousSectionIndex = sections.findIndex(({ id }) => id === previousSectionId)
    const transitionDirection = _resolveTransitionDirection(currentSectionIndex, previousSectionIndex, sections.length)
    const directionClass = isTransitioning ? `layout-slideshow-direction-${transitionDirection}` : ""
    const destinationLink = navigation.sectionLinks.find(({ id }) => id === currentSectionId)
    const destinationLabel = destinationLink?.tooltip || destinationLink?.label || currentSectionId || ""
    const destinationAriaLabel = destinationLabel.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
    const previousNavigationTarget = _getAdjacentSection(sections, currentSectionIndex, -1)
    const nextNavigationTarget = _getAdjacentSection(sections, currentSectionIndex, 1)
    const canNavigateWithArrows = !isTransitioning && !feedbacks.isBlockedByOverlay()
    const adjacentControlGeometry = useAdjacentControlGeometry(slideshowRef)
    const controlsHost = slideshowRef.current?.closest(".layout-navigation-wrapper") || null

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
        <div className={`layout-slideshow ${transitioningClass} ${directionClass}`.trim()}
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

            {isTransitioning && destinationLink && (
                <div
                    className={`layout-slideshow-transition-guide layout-slideshow-transition-guide-${transitionDirection}`}
                    role="status"
                    aria-label={destinationAriaLabel}
                >
                    <span className="layout-slideshow-transition-destination">
                        <span className="layout-slideshow-transition-cloud-glow" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-sheen" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-1" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-2" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-3" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-cloud-puff layout-slideshow-transition-cloud-puff-4" aria-hidden="true"/>
                        <span className="layout-slideshow-transition-direction" aria-hidden="true">
                            <i className={`fa-solid ${transitionDirection === "forward" ? "fa-arrow-right-long" : "fa-arrow-left-long"}`} aria-hidden="true"/>
                        </span>
                        <span
                            className="layout-slideshow-transition-label"
                            dangerouslySetInnerHTML={{ __html: destinationLabel }}
                        />
                        <i className={destinationLink.faIcon} aria-hidden="true" />
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

        const measure = () => {
            const pageElement = slideshowElement.closest(".layout-navigation-children-inner") || slideshowElement
            const layoutElement = pageElement.closest(".layout-navigation-wrapper")
            const navigationElement = layoutElement?.querySelector(":scope > nav.nav-sidebar")
            const rect = pageElement.getBoundingClientRect()
            const layoutRect = layoutElement?.getBoundingClientRect()
            const navigationRect = navigationElement?.getBoundingClientRect()
            const scrollbarTrack = pageElement.querySelector("section.section-shown .scrollbar-track-y")
            const scrollbarTrackRect = scrollbarTrack?.getBoundingClientRect()
            const diskRadius = 32
            const viewportWidth = window.visualViewport?.width || window.innerWidth
            const viewportHeight = window.visualViewport?.height || window.innerHeight
            const centerY = Math.min(Math.max(rect.top + rect.height / 2, diskRadius), viewportHeight - diskRadius)
            const leftBoundary = navigationRect?.right ?? layoutRect?.left ?? 0
            const rightBoundary = Math.min(layoutRect?.right ?? viewportWidth, viewportWidth)
            const leftGutter = Math.max(0, rect.left - leftBoundary)
            const rightGutter = Math.max(0, rightBoundary - rect.right)
            const leftHookedInset = 8
            const leftHookedFactor = 1 - Math.min(1, leftGutter / (diskRadius * 2))
            const scrollbarCenterX = scrollbarTrackRect ?
                scrollbarTrackRect.left + scrollbarTrackRect.width / 2 :
                rect.right - 4
            const rightHookedInset = Math.max(0, rect.right - scrollbarCenterX)
            const rightHookedFactor = 1 - Math.min(1, rightGutter / (diskRadius * 2))
            const previousCenterX = rect.left + (leftHookedInset * leftHookedFactor) - Math.min(diskRadius, leftGutter / 2)
            const nextCenterX = rect.right - (rightHookedInset * rightHookedFactor) + Math.min(diskRadius, rightGutter / 2)
            const nextOpenShiftX = Math.min(0, rightBoundary - diskRadius - nextCenterX)

            setGeometry({
                "--adjacent-control-center-y": `${centerY}px`,
                "--adjacent-control-previous-center-x": `${previousCenterX}px`,
                "--adjacent-control-next-center-x": `${nextCenterX}px`,
                "--adjacent-control-previous-open-shift-x": "0px",
                "--adjacent-control-next-open-shift-x": `${nextOpenShiftX}px`
            })
        }

        measure()

        const resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(slideshowElement)

        const pageElement = slideshowElement.closest(".layout-navigation-children-inner")
        if(pageElement)
            resizeObserver.observe(pageElement)

        const layoutElement = slideshowElement.closest(".layout-navigation-wrapper")
        const navigationElement = layoutElement?.querySelector(":scope > nav.nav-sidebar")
        if(layoutElement)
            resizeObserver.observe(layoutElement)
        if(navigationElement)
            resizeObserver.observe(navigationElement)

        window.addEventListener("resize", measure)
        window.visualViewport?.addEventListener("resize", measure)
        window.visualViewport?.addEventListener("scroll", measure)

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener("resize", measure)
            window.visualViewport?.removeEventListener("resize", measure)
            window.visualViewport?.removeEventListener("scroll", measure)
        }
    }, [slideshowRef])

    return geometry || {
        "--adjacent-control-center-y": "50vh",
        "--adjacent-control-previous-center-x": "32px",
        "--adjacent-control-next-center-x": "calc(100vw - 32px)",
        "--adjacent-control-previous-open-shift-x": "0px",
        "--adjacent-control-next-open-shift-x": "0px"
    }
}

function AdjacentSectionButton({ direction, target, label, disabled, onClick }) {
    const [isOpen, setIsOpen] = useState(false)
    const isPrevious = direction === "previous"
    const iconClass = isPrevious ? "fa-solid fa-chevron-left" : "fa-solid fa-chevron-right"
    const edgeClass = isPrevious ? "layout-slideshow-adjacent-button-previous" : "layout-slideshow-adjacent-button-next"
    const openClass = isOpen ? "layout-slideshow-adjacent-button-open" : ""
    const ariaLabel = label ? `${isPrevious ? "Previous" : "Next"} section: ${label}` : `${isPrevious ? "Previous" : "Next"} section`
    const targetIconClass = target?.faIcon || ""

    return (
        <button className={`layout-slideshow-adjacent-button ${edgeClass} ${openClass}`.trim()}
                type="button"
                data-direction={direction}
                data-tooltip="Use the arrow keys"
                aria-label={ariaLabel}
                disabled={disabled}
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onClick={onClick}>
            <span className="layout-slideshow-adjacent-hitfield"
                  aria-hidden="true"/>
            <span className="layout-slideshow-adjacent-rail"
                  aria-hidden="true">
                <span className="layout-slideshow-adjacent-rail-core"/>
                <span className="layout-slideshow-adjacent-rail-light"/>
            </span>
            <span className="layout-slideshow-adjacent-panel"
                  aria-hidden="true">
                <span className="layout-slideshow-adjacent-panel-coin">
                    <span className="layout-slideshow-adjacent-panel-shadow"/>
                    <span className="layout-slideshow-adjacent-panel-back"/>
                    <span className="layout-slideshow-adjacent-panel-ring"/>
                    <span className="layout-slideshow-adjacent-panel-sweep"/>
                    <span className="layout-slideshow-adjacent-panel-inner">
                        <i className={iconClass}
                           aria-hidden="true"/>
                    </span>
                    {targetIconClass && (
                        <span className="layout-slideshow-adjacent-target-mark">
                            <i className={targetIconClass}
                               aria-hidden="true"/>
                        </span>
                    )}
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
