/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider acts as a router for the application, managing the active section and category based on the URL hash.
 */

import React, {createContext, useContext, useEffect, useRef, useState} from 'react'

function LocationProvider({ children, sections, categories }) {
    const [activeSectionId, setActiveSectionId] = useState(null)
    const [visitHistoryByCategory, setVisitHistoryByCategory] = useState({})
    const [visitedSectionsCount, setVisitedSectionsCount] = useState(0)
    const [hasResolvedInitialRoute, setHasResolvedInitialRoute] = useState(false)

    const sectionsRef = useRef(sections)
    const activeSectionIdRef = useRef(activeSectionId)
    const hasResolvedInitialRouteRef = useRef(hasResolvedInitialRoute)

    useEffect(() => {
        sectionsRef.current = sections
        activeSectionIdRef.current = activeSectionId
        hasResolvedInitialRouteRef.current = hasResolvedInitialRoute
    }, [sections, activeSectionId, hasResolvedInitialRoute])

    /** @constructs **/
    useEffect(() => {
        window.addEventListener('popstate', _onHashEvent)
        window.addEventListener('hashchange', _onHashEvent)
        _resolveCurrentSection(true)

        return () => {
            window.removeEventListener('popstate', _onHashEvent)
            window.removeEventListener('hashchange', _onHashEvent)
        }
    }, [])

    /** @listens sections|categories **/ 
    useEffect(() => {
        _resolveCurrentSection(true)
    }, [sections, categories])

    const getActiveSection = () => {
        return sections.find(section => section.id === activeSectionId)
    }

    const getActiveCategory = () => {
        const activeSection = getActiveSection()
        if(!activeSection)
            return null
        return activeSection.category
    }

    const isSectionActive = (section) => {
        return activeSectionId === section.id
    }

    const isCategoryActive = (category) => {
        const activeSection = getActiveSection()
        if(!activeSection)
            return false
        return activeSection.category.id === category.id
    }

    const goToSection = (section) => {
        if(!section || activeSectionIdRef.current === section.id)
            return
        window.location.hash = section.id
    }

    const goToSectionWithId = (sectionId) => {
        const section = sections.find(section => section.id === sectionId)
        if(section) {
            goToSection(section)
        }
    }

    const goToCategory = (category) => {
        if(!category)
            return

        const targetSectionId = visitHistoryByCategory[category.id]
        const targetSection = sections.find(section => section.id === targetSectionId)

        goToSection(targetSection || category.sections[0])
    }

    const goToCategoryWithId = (categoryId) => {
        const category = categories.find(category => category.id === categoryId)
        if(category) {
            goToCategory(category)
        }
    }

    const _onHashEvent = () => {
        _resolveCurrentSection(false)
    }

    const _resolveCurrentSection = (isInitialResolve) => {
        const currentSections = sectionsRef.current || []
        if(currentSections.length === 0)
            return

        const hash = window.location.hash.replace("#", "")
        const targetSection = currentSections.find(section => section.id === hash)
        const fallbackSection = currentSections[0]
        const nextSection = targetSection || fallbackSection

        if(!nextSection)
            return

        const nextSectionId = nextSection.id
        const didChangeSection = activeSectionIdRef.current !== nextSectionId

        if(!targetSection && fallbackSection) {
            const nextUrl = `${window.location.pathname}${window.location.search}#${fallbackSection.id}`
            if(window.location.hash !== `#${fallbackSection.id}`) {
                window.history.replaceState({}, "", nextUrl)
            }
        }

        if(!hasResolvedInitialRouteRef.current || didChangeSection || isInitialResolve) {
            _setActiveSection(nextSectionId)
            setHasResolvedInitialRoute(true)
        }
    }

    const _setActiveSection = (sectionId) => {
        if(!sectionId)
            return

        activeSectionIdRef.current = sectionId
        setActiveSectionId(sectionId)

        const section = sectionsRef.current.find(section => section.id === sectionId)
        const category = section?.category
        setVisitedSectionsCount(prevState => prevState + 1)

        if(section && category) {
            setVisitHistoryByCategory(prevState => ({
                ...prevState,
                [category.id]: section.id
            }))
        }
    }

    return (
        <LocationContext.Provider value={{
            getActiveSection,
            getActiveCategory,
            isSectionActive,
            isCategoryActive,
            goToSection,
            goToSectionWithId,
            goToCategory,
            goToCategoryWithId,
            visitedSectionsCount,
            visitHistoryByCategory
        }}>
            {children}
        </LocationContext.Provider>
    )
}

const LocationContext = createContext(null)
/**
 * @return {{
 *    getActiveSection: Function,
 *    getActiveCategory: Function,
 *    isSectionActive: Function,
 *    isCategoryActive: Function,
 *    goToSection: Function,
 *    goToSectionWithId: Function,
 *    goToCategory: Function,
 *    goToCategoryWithId: Function,
 *    visitedSectionsCount: Number,
 *    visitHistoryByCategory: Object
 * }}
 */
export const useLocation = () => useContext(LocationContext)

export default LocationProvider
