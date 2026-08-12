import "./LayoutSlideshow.scss"
import React from 'react'
import Section from "../sections/Section.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

function LayoutSlideshow({ sections, currentSection, previousSection }) {
    const navigation = useNavigation()
    const currentSectionId = currentSection?.id || null
    const previousSectionId = previousSection?.id || null
    const forceScrollToTopCount = navigation.shouldForceScrollToTopCount

    const isTransitioning = navigation.isTransitioning()
    const transitioningClass = isTransitioning ?
        `layout-slideshow-transitioning` :
        ``
    const currentSectionIndex = sections.findIndex(({ id }) => id === currentSectionId)
    const previousSectionIndex = sections.findIndex(({ id }) => id === previousSectionId)
    const transitionDirection = currentSectionIndex < previousSectionIndex ? "backward" : "forward"
    const directionClass = isTransitioning ?
        `layout-slideshow-direction-${transitionDirection}` :
        ``
    const destinationLink = navigation.sectionLinks.find(({ id }) => id === currentSectionId)
    const destinationLabel = destinationLink?.label || currentSectionId || ""
    const destinationAriaLabel = destinationLabel.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()

    const _shouldTransition = (section) => {
        const isCurrentOrPrevious = section.id === currentSectionId || section.id === previousSectionId
        return isCurrentOrPrevious && isTransitioning
    }

    return (
        <div className={`layout-slideshow ${transitioningClass} ${directionClass}`.trim()}>
            {isTransitioning && destinationLink && (
                <div className={`layout-slideshow-transition-guide layout-slideshow-transition-guide-${transitionDirection}`}
                     role="status"
                     aria-label={destinationAriaLabel}>
                    <span className="layout-slideshow-transition-progress" aria-hidden="true"/>
                    <span className="layout-slideshow-transition-destination">
                        <span className="layout-slideshow-transition-direction" aria-hidden="true">
                            {transitionDirection === "forward" ? "→" : "←"}
                        </span>
                        <i className={destinationLink.faIcon} aria-hidden="true"/>
                        <span dangerouslySetInnerHTML={{__html: destinationLabel}}/>
                    </span>
                </div>
            )}
            {sections.map((section) => (
                <Section key={section.id}
                         section={section}
                         visible={section.id === currentSectionId}
                         shouldTransition={_shouldTransition(section)}
                         forceScrollToTopCount={section.id === currentSectionId ? forceScrollToTopCount : null}/>
            ))}
        </div>
    )
}

export default LayoutSlideshow
