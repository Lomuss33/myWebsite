import "./LayoutSlideshow.scss"
import React, {useEffect, useState} from 'react'
import Section from "../sections/Section.jsx"
import {useNavigation} from "../../providers/NavigationProvider.jsx"

function LayoutSlideshow({ sections, currentSection, previousSection }) {
    const navigation = useNavigation()
    const currentSectionId = currentSection?.id || null
    const previousSectionId = previousSection?.id || null

    const isTransitioning = navigation.isTransitioning()
    const transitioningClass = isTransitioning ?
        `layout-slideshow-transitioning` :
        ``

    const _shouldTransition = (section) => {
        const isCurrentOrPrevious = section.id === currentSectionId || section.id === previousSectionId
        return isCurrentOrPrevious && isTransitioning
    }

    return (
        <div className={`layout-slideshow ${transitioningClass}`}>
            {sections.map((section, index) => (
                <Section key={section.id}
                         section={section}
                         visible={section.id === currentSectionId}
                         shouldTransition={_shouldTransition(section)}/>
            ))}
        </div>
    )
}

export default LayoutSlideshow
