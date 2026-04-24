/**
 * @author Lovro Music
 * @date 2025-05-10
 * @description This provider manages the navigation between sections and categories in the application.
 */

import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useLocation} from "./LocationProvider.jsx"
import {useLanguage} from "./LanguageProvider.jsx"
import {useConstants} from "../hooks/constants.js"
import {useScheduler} from "../hooks/scheduler.js"
import {useFeedbacks} from "./FeedbacksProvider.jsx"
import {useViewport, getViewportScrollPosition} from "./ViewportProvider.jsx"
import {useUtils} from "../hooks/utils.js"
import {useLayout} from "../hooks/layout.js"

function NavigationProvider({ children, sections, categories }) {
    const language = useLanguage()
    const location = useLocation()
    const feedbacks = useFeedbacks()
    const constants = useConstants()
    const scheduler = useScheduler()
    const viewport = useViewport()
    const utils = useUtils()
    const layout = useLayout()

    const [transitionStatus, setTransitionStatus] = useState(NavigationProvider.TransitionStatus.NONE)
    const [transitionEnabled, setTransitionEnabled] = useState(true)
    const [ignoreNextLocationEvent, setIgnoreNextLocationEvent] = useState(false)
    const [resettingScrollYTo, setResettingScrollYTo] = useState(null)
    const [shouldForceScrollToTopCount, setShouldForceScrollToTopCount] = useState(false)
    const [isAppReady, setIsAppReady] = useState(false)
    const transitionEnabledRef = useRef(true)

    const [targetSection, setTargetSection] = useState(null)
    const [previousSection, setPreviousSection] = useState(null)
    const [nextSection, setNextSection] = useState(null)
    const [scheduledNextSection, setScheduledNextSection] = useState(null)

    const [sectionLinks, setSectionLinks] = useState([])
    const [categoryLinks, setCategoryLinks] = useState([])
    const targetSectionRef = useRef(null)
    const previousSectionRef = useRef(null)
    const nextSectionRef = useRef(null)
    const scheduledNextSectionRef = useRef(null)
    const transitionStatusRef = useRef(NavigationProvider.TransitionStatus.NONE)
    const resettingScrollYToRef = useRef(null)
    const scrollWaitRafRef = useRef(null)

    const canTransitionToNextSection = nextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE

    const _setTransitionEnabled = (value) => {
        transitionEnabledRef.current = value
        setTransitionEnabled(value)
    }

    const _setTargetSectionState = (value) => {
        targetSectionRef.current = value
        setTargetSection(value)
    }

    const _setPreviousSectionState = (value) => {
        previousSectionRef.current = value
        setPreviousSection(value)
    }

    const _setNextSectionState = (value) => {
        nextSectionRef.current = value
        setNextSection(value)
    }

    const _setScheduledNextSectionState = (value) => {
        scheduledNextSectionRef.current = value
        setScheduledNextSection(value)
    }

    const _setTransitionStatusState = (value) => {
        transitionStatusRef.current = value
        setTransitionStatus(value)
    }

    const _setResettingScrollYToState = (value) => {
        resettingScrollYToRef.current = value
        setResettingScrollYTo(value)
    }

    useEffect(() => {
        targetSectionRef.current = targetSection
        previousSectionRef.current = previousSection
        nextSectionRef.current = nextSection
        scheduledNextSectionRef.current = scheduledNextSection
        transitionStatusRef.current = transitionStatus
        resettingScrollYToRef.current = resettingScrollYTo
    }, [targetSection, previousSection, nextSection, scheduledNextSection, transitionStatus, resettingScrollYTo])

    /** @constructs **/
    useEffect(() => {
        _updateLinks(null, null)
    }, [])

    /**
     * Wait until the preloader has finished before starting the first section transition.
     * The preloader adds the post-load body class when its exit animation is done.
     */
    useEffect(() => {
        if(typeof document === "undefined" || !document.body) return

        const syncAppReadyState = () => {
            const bodyAfterLoadingClass = constants.HTML_CLASSES.bodyAfterLoading
            setIsAppReady(document.body.classList.contains(bodyAfterLoadingClass))
        }

        syncAppReadyState()
        if(document.body.classList.contains(constants.HTML_CLASSES.bodyAfterLoading))
            return

        const observer = new MutationObserver(syncAppReadyState)
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["class"]
        })

        return () => observer.disconnect()
    }, [constants.HTML_CLASSES.bodyAfterLoading])

    /**
     * @listens sections|categories|language.getSelectedLanguage()
     */
    useEffect(() => {
        _updateLinks(targetSection, targetSection?.category)
    }, [sections, categories, language.getSelectedLanguage()?.id])

    /**
     * @listens viewport.getBreakpoint()
     */
    useEffect(() => {
        utils.capabilities.scrollTo(0, true)
    }, [viewport.getBreakpoint()])

    /**
     * @listens canTransitionToNextSection
     */
    useEffect(() => {
        if(!canTransitionToNextSection)
            return

        if(viewport.isDesktopLayout()) _startTransition()
        else _adjustScrollBeforeTransition()
    }, [canTransitionToNextSection])

    const _startTransition = () => {
        const currentTargetSection = targetSectionRef.current
        const currentNextSection = nextSectionRef.current
        if(!currentNextSection)
            return

        _setPreviousSectionState(currentTargetSection)
        _setTargetSectionState(currentNextSection)
        _updateLinks(currentNextSection, currentNextSection.category)

        if(!transitionEnabledRef.current) {
            _setTransitionStatusState(NavigationProvider.TransitionStatus.FINISHING)
            return
        }

        _setTransitionStatusState(NavigationProvider.TransitionStatus.RUNNING)
        scheduler.clearAllWithTag("transition-to-next-section")
        scheduler.schedule(() => {
            _setTransitionStatusState(NavigationProvider.TransitionStatus.FINISHING)
        }, constants.SECTION_TRANSITION_TOTAL_TIME, "transition-to-next-section")
    }

    const _adjustScrollBeforeTransition = () => {
        const currentTargetSection = targetSectionRef.current
        const currentNextSection = nextSectionRef.current
        if(!currentNextSection)
            return

        const mobileNavData = layout.getMobileNavData(getViewportScrollPosition().y)
        const didChangeCategory = currentTargetSection?.category?.id !== currentNextSection?.category?.id

        _clearPendingScrollWait()

        if(!mobileNavData.isHeaderHidden) {
            if(didChangeCategory)
                utils.capabilities.scrollTo(0, false)
            _startTransition()
            return
        }

        if(currentNextSection?.category?.sections?.length <= 1) {
            utils.capabilities.scrollTo(0, false)
            _scheduleTransitionStart(0)
            return
        }

        _updateLinks(currentNextSection, currentNextSection?.category)
        utils.capabilities.scrollTo(mobileNavData.contentTop, false)
        _scheduleTransitionStart(mobileNavData.contentTop)
    }

    const _scheduleTransitionStart = (initialScrollY) => {
        _clearPendingScrollWait()
        _setResettingScrollYToState(initialScrollY)

        const startedAt = performance.now()
        const waitForScroll = () => {
            const elapsed = performance.now() - startedAt
            const distance = Math.abs(getViewportScrollPosition().y - initialScrollY)
            if(distance < 10 || elapsed >= 1000) {
                _startTransitionAfterScroll(initialScrollY)
                return
            }

            scrollWaitRafRef.current = requestAnimationFrame(waitForScroll)
        }

        scrollWaitRafRef.current = requestAnimationFrame(waitForScroll)
    }

    const _startTransitionAfterScroll = (initialScrollY) => {
        _clearPendingScrollWait()
        utils.capabilities.scrollTo(initialScrollY, true)
        _setResettingScrollYToState(null)
        _startTransition()
    }

    const _clearPendingScrollWait = () => {
        scheduler.clearAllWithTag("adjust-scroll-top")
        if(scrollWaitRafRef.current !== null) {
            cancelAnimationFrame(scrollWaitRafRef.current)
            scrollWaitRafRef.current = null
        }
    }

    /**
     * @listens transitionStatus
     */
    useEffect(() => {
        const isRunning = transitionStatus === NavigationProvider.TransitionStatus.RUNNING
        const isFinishing = transitionStatus === NavigationProvider.TransitionStatus.FINISHING

        feedbacks.setAnimatedCursorLocked(isRunning)

        if(isFinishing) _finishTransition()
    }, [transitionStatus])

    const _finishTransition = () => {
        const currentScheduledSection = scheduledNextSectionRef.current
        const currentTargetSection = targetSectionRef.current

        if(!currentScheduledSection) {
            _setNextSectionState(null)
            _setScheduledNextSectionState(null)

            setIgnoreNextLocationEvent(true)
            location.goToSection(currentTargetSection)

            scheduler.clearAllWithTag("set-ignore-next-location-event")
            scheduler.schedule(() => {
                setIgnoreNextLocationEvent(false)
            }, 100, "set-ignore-next-location-event")
            _setTransitionStatusState(NavigationProvider.TransitionStatus.NONE)
            return
        }

        _setTransitionStatusState(NavigationProvider.TransitionStatus.NONE)
        _setNextSectionState(currentScheduledSection)
        _setScheduledNextSectionState(null)
    }

    /** @listens scheduledNextSection **/
    useEffect(() => {
        if(!scheduledNextSection) {
            scheduler.clearAllWithTag("scheduled-next-section-spinner")
            scheduler.schedule(() => {
                feedbacks.setActivitySpinnerVisible(false, "scheduled-next-section", language.getString("loading"))
            }, 300, "scheduled-next-section-spinner")
        }
        else {
            feedbacks.setActivitySpinnerVisible(true, "scheduled-next-section", language.getString("loading"))
        }
    }, [scheduledNextSection])

    /** @listens location.getActiveSection() **/
    useEffect(() => {
        if(ignoreNextLocationEvent) {
            setIgnoreNextLocationEvent(false)
            return
        }

        const locationSection = location.getActiveSection()
        if(!locationSection)
            return

        _setTransitionEnabled(true)
        navigateToSection(locationSection)
    }, [location.getActiveSection()?.id, isAppReady])

    /**
     * Seed the first visible section directly once the app is ready.
     * This keeps the screen from staying blank if the transition queue has not
     * been started yet on the initial load.
     */
    useEffect(() => {
        if(!isAppReady)
            return

        const locationSection = location.getActiveSection()
        if(!locationSection)
            return

        if(targetSection || nextSection)
            return

        _setTransitionEnabled(true)
        _setTargetSectionState(locationSection)
        _updateLinks(locationSection, locationSection.category)
    }, [isAppReady, location.getActiveSection()?.id, targetSection?.id, nextSection?.id])

    /** @listens !nextSection && scheduledNextSection **/
    useEffect(() => {
        if(!nextSection && scheduledNextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE) {
            _setNextSectionState(scheduledNextSection)
            _setScheduledNextSectionState(null)
        }
    }, [Boolean(!nextSection && scheduledNextSection && transitionStatus === NavigationProvider.TransitionStatus.NONE)])

    useEffect(() => {
        return () => {
            _clearPendingScrollWait()
        }
    }, [])

    const navigateToSection = (section) => {
        if(!section)
            return

        const targetSectionId = targetSectionRef.current?.id || null
        const nextSectionId = nextSectionRef.current?.id || null
        const scheduledNextSectionId = scheduledNextSectionRef.current?.id || null
        const requestedSectionId = section.id

        if(transitionStatusRef.current === NavigationProvider.TransitionStatus.NONE && !nextSectionId) {
            if(targetSectionId !== requestedSectionId) _setNextSectionState(section)
            else forceScrollToTop()
            return
        }

        if(nextSectionId === requestedSectionId || scheduledNextSectionId === requestedSectionId)
            return

        if(targetSectionId === requestedSectionId && transitionStatusRef.current !== NavigationProvider.TransitionStatus.NONE) {
            _setScheduledNextSectionState(section)
        }
        else {
            _setScheduledNextSectionState(section)
            if(resettingScrollYToRef.current !== null) {
                _startTransitionAfterScroll(resettingScrollYToRef.current)
            }
        }
    }

    const navigateToSectionWithId = (sectionId) => {
        const section = sections.find(({ id }) => id === sectionId)
        navigateToSection(section)
    }

    const navigateToSectionWithLink = (href) => {
        _setTransitionEnabled(true)

        if(href.startsWith("#cat:")) {
            const categoryId = href.replaceAll("#cat:", "")
            const category = categories.find(({ id }) => id === categoryId)
            if(!category)
                return

            const sectionId = location.visitHistoryByCategory[category.id] || category.sections[0].id
            navigateToSectionWithId(sectionId)
        }
        else {
            const sectionId = href.replaceAll("#", "")
            const section = sections.find(({ id }) => id === sectionId)
            navigateToSection(section)
        }
    }

    const isTransitioning = () => {
        return transitionStatus === NavigationProvider.TransitionStatus.RUNNING
    }

    const _updateLinks = (targetSection, targetCategory) => {
        const sectionLinks = sections.map(({ id, categoryId, faIcon, data }) => ({
            id,
            categoryId,
            href: `#${id}`,
            label: language.getTranslation(data?.title?.locales, "title_short_nav"),
            faIcon,
            active: targetSection?.id === id
        }))

        const categoryLinks = categories.map(({ id, faIcon, locales }) => ({
            id,
            href: `#cat:${id}`,
            label: language.getTranslation(locales, "title"),
            faIcon,
            active: targetCategory?.id === id
        }))

        setSectionLinks(sectionLinks)
        setCategoryLinks(categoryLinks)
    }

    const forceScrollToTop = () => {
        if(viewport.isMobileLayout()) {
            const mobileNavData = layout.getMobileNavData(getViewportScrollPosition().y)
            if(mobileNavData.navHeaderElHeight) {
                window.scrollTo({
                    top: mobileNavData.contentTop,
                    behavior: "smooth"
                })
            }
        }

        setShouldForceScrollToTopCount(prev => prev + 1)
    }

    return (
        <NavigationContext.Provider value={{
            targetSection,
            previousSection,
            nextSection,
            scheduledNextSection,
            sectionLinks,
            categoryLinks,
            transitionStatus,
            shouldForceScrollToTopCount,
            navigateToSectionWithLink,
            navigateToSection,
            navigateToSectionWithId,
            isTransitioning,
            forceScrollToTop
        }}>
            {children}
        </NavigationContext.Provider>
    )
}

NavigationProvider.TransitionStatus = {
    NONE: "transition_status_none",
    RUNNING: "transition_status_running",
    FINISHING: "transition_status_finishing",
}

const NavigationContext = createContext(null)
/**
 * @return {{
 *    targetSection: Object,
 *    previousSection: Object,
 *    nextSection: Object,
 *    scheduledNextSection: Object,
 *    sectionLinks: Array,
 *    categoryLinks: Array,
 *    transitionStatus: String,
 *    shouldForceScrollToTopCount: Number,
 *    navigateToSectionWithLink: Function,
 *    navigateToSection: Function,
 *    navigateToSectionWithId: Function,
 *    isTransitioning: Function,
 *    forceScrollToTop: Function,
 * }}
 */
export const useNavigation = () => useContext(NavigationContext)

export default NavigationProvider
