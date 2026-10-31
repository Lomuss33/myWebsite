import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    getOpenAllWebArtTileIds,
    getWebArtStagePreviewHeight,
    isMobileWebArtLayout,
    limitWebArtTileSetForMobile,
    prefersReducedMotion,
    tileSetContainsAll,
    WEB_ART_STAGE_PHASE,
    WEB_ART_STAGE_TRANSITION_FALLBACK_MS
} from "./webArtDomUtils.js"

export function useWebArtStage({
    dataWrapper,
    navigation,
    useCarousel,
    items,
    allTileIds,
    firstCarouselTileId
}) {
    const [showIntroCover, setShowIntroCover] = useState(true)
    const tilesWrapperRef = useRef(null)
    const stageRef = useRef(null)
    const stagePhaseRef = useRef(WEB_ART_STAGE_PHASE.PREVIEW)
    const stageFrameIdsRef = useRef([])
    const stageTransitionTimeoutRef = useRef(null)
    const openTileIdsRef = useRef(new Set())
    const desktopCloseTimeoutRef = useRef(null)
    const [stagePhase, setStagePhaseState] = useState(WEB_ART_STAGE_PHASE.PREVIEW)
    const [stageHeight, setStageHeight] = useState(null)
    const [shouldMountTiles, setShouldMountTiles] = useState(false)
    const readySetRef = useRef(new Set())
    const readyTimeoutsRef = useRef(new Map())
    const [, setReadyCount] = useState(0)
    const [activationIndex, setActivationIndex] = useState(-1)
    const [openTileIds, setOpenTileIds] = useState(() => new Set())
    const [mountedTileIds, setMountedTileIds] = useState(() => new Set())
    const [pinnedSlides, setPinnedSlides] = useState([])
    const pinnedSlidesRef = useRef([])
    const [stagedPinnedSlideIds, setStagedPinnedSlideIds] = useState(() => new Set())
    const stagedPinnedSlideIdsRef = useRef(new Set())
    const [carouselActiveTileId, setCarouselActiveTileId] = useState(null)
    const [sendYoursPreviewOpen, setSendYoursPreviewOpen] = useState(false)

    const trackedReadyIds = useMemo(() => {
        return Array.from(mountedTileIds).filter((uniqueId) => {
            return uniqueId !== "ambient-goldfish" && uniqueId !== "ambient-patronus"
        })
    }, [mountedTileIds])

    const locked = showIntroCover

    useEffect(() => {
        openTileIdsRef.current = openTileIds
    }, [openTileIds])

    const setStagePhase = useCallback((nextPhase) => {
        stagePhaseRef.current = nextPhase
        setStagePhaseState(nextPhase)
    }, [])

    const clearStageTransitionWork = useCallback(() => {
        if(typeof window === "undefined")
            return

        for(const frameId of stageFrameIdsRef.current)
            window.cancelAnimationFrame(frameId)
        stageFrameIdsRef.current = []

        if(stageTransitionTimeoutRef.current !== null) {
            window.clearTimeout(stageTransitionTimeoutRef.current)
            stageTransitionTimeoutRef.current = null
        }
    }, [])

    const onTileReady = useCallback((uniqueId) => {
        if(!uniqueId) return
        if(readySetRef.current.has(uniqueId)) return
        readySetRef.current.add(uniqueId)

        const timeoutId = readyTimeoutsRef.current.get(uniqueId)
        if(timeoutId != null) {
            window.clearTimeout(timeoutId)
            readyTimeoutsRef.current.delete(uniqueId)
        }

        setReadyCount(readySetRef.current.size)
    }, [])

    const mountTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        setMountedTileIds((current) => {
            if(current.has(uniqueId)) return current
            const next = new Set(current)
            next.add(uniqueId)
            return limitWebArtTileSetForMobile(next)
        })
    }, [])

    const closeAllOpenTiles = useCallback(() => {
        setOpenTileIds((current) => {
            if(!current.size) return current
            return new Set()
        })
        setMountedTileIds((current) => {
            if(!current.size) return current
            return new Set()
        })
        setSendYoursPreviewOpen(false)
    }, [])

    const resetArtState = useCallback(() => {
        for(const timeoutId of readyTimeoutsRef.current.values()) {
            window.clearTimeout(timeoutId)
        }
        readyTimeoutsRef.current = new Map()
        readySetRef.current = new Set()
        setReadyCount(0)
        setActivationIndex(-1)
        setShouldMountTiles(false)
        setOpenTileIds(new Set())
        setMountedTileIds(new Set())
        pinnedSlidesRef.current = []
        setPinnedSlides([])
        stagedPinnedSlideIdsRef.current = new Set()
        setStagedPinnedSlideIds(new Set())
        setCarouselActiveTileId(null)
        setSendYoursPreviewOpen(false)
    }, [])

    const completeStageExpand = useCallback(() => {
        clearStageTransitionWork()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.OPEN)
    }, [clearStageTransitionWork, setStagePhase])

    const completeStageCollapse = useCallback(() => {
        clearStageTransitionWork()
        resetArtState()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
    }, [clearStageTransitionWork, resetArtState, setStagePhase])

    const scheduleStageTransitionFallback = useCallback((phase) => {
        if(typeof window === "undefined")
            return

        if(stageTransitionTimeoutRef.current !== null)
            window.clearTimeout(stageTransitionTimeoutRef.current)

        stageTransitionTimeoutRef.current = window.setTimeout(() => {
            stageTransitionTimeoutRef.current = null
            if(stagePhaseRef.current !== phase)
                return

            if(phase === WEB_ART_STAGE_PHASE.EXPANDING)
                completeStageExpand()
            else if(phase === WEB_ART_STAGE_PHASE.COLLAPSING)
                completeStageCollapse()
        }, WEB_ART_STAGE_TRANSITION_FALLBACK_MS)
    }, [completeStageCollapse, completeStageExpand])

    const openAllArtTiles = useCallback(() => {
        const nextTileIds = getOpenAllWebArtTileIds(allTileIds)
        setMountedTileIds(nextTileIds)
        setOpenTileIds(new Set(nextTileIds))
        setSendYoursPreviewOpen(!isMobileWebArtLayout())
    }, [allTileIds])

    const onIntroEnter = useCallback(({ openAll = false } = {}) => {
        clearStageTransitionWork()
        const shouldReduceMotion = prefersReducedMotion()
        const stage = stageRef.current
        const previewHeight = getWebArtStagePreviewHeight(stage)

        if(shouldReduceMotion) {
            setStageHeight(null)
            setStagePhase(WEB_ART_STAGE_PHASE.OPEN)
        }
        else {
            setStageHeight(Math.max(previewHeight, Math.ceil(stage?.offsetHeight || previewHeight)))
            setStagePhase(WEB_ART_STAGE_PHASE.EXPANDING)
        }

        setShowIntroCover(false)
        setShouldMountTiles(true)
        setActivationIndex(items.length - 1)
        if(useCarousel) {
            const firstTileId = firstCarouselTileId
            pinnedSlidesRef.current = []
            setPinnedSlides([])
            stagedPinnedSlideIdsRef.current = new Set()
            setStagedPinnedSlideIds(new Set())
            setCarouselActiveTileId(firstTileId || null)
            setOpenTileIds(new Set(firstTileId ? [firstTileId] : []))
            setMountedTileIds(new Set(firstTileId ? [firstTileId] : []))
            setSendYoursPreviewOpen(false)
        }
        else if(openAll) {
            openAllArtTiles()
        }
        else {
            setOpenTileIds(new Set())
            setMountedTileIds(new Set())
            setSendYoursPreviewOpen(false)
        }

        if(shouldReduceMotion || typeof window === "undefined")
            return

        const firstFrameId = window.requestAnimationFrame(() => {
            const secondFrameId = window.requestAnimationFrame(() => {
                const nextStage = stageRef.current
                const nextPreviewHeight = getWebArtStagePreviewHeight(nextStage)
                const openHeight = Math.max(
                    nextPreviewHeight,
                    Math.ceil(nextStage?.scrollHeight || nextStage?.offsetHeight || nextPreviewHeight)
                )

                setStageHeight(openHeight)
                scheduleStageTransitionFallback(WEB_ART_STAGE_PHASE.EXPANDING)
            })

            stageFrameIdsRef.current.push(secondFrameId)
        })

        stageFrameIdsRef.current.push(firstFrameId)
    }, [clearStageTransitionWork, firstCarouselTileId, items.length, openAllArtTiles, scheduleStageTransitionFallback, setStagePhase, useCarousel])

    useEffect(() => {
        if(typeof window === "undefined") return
        if(!navigation) return
        if(navigation.targetSection?.id !== dataWrapper.sectionId) return
        if(navigation.transitionStatus !== "transition_status_none") return

        const pending = window.__pendingSectionAction
        if(!pending) return
        if(pending.action !== "enter") return
        if(pending.sectionId !== dataWrapper.sectionId) return
        if(pending.targetArticleId && pending.targetArticleId !== dataWrapper.uniqueId) return
        if(Date.now() - (pending.requestedAt || 0) > 5000) {
            delete window.__pendingSectionAction
            return
        }

        delete window.__pendingSectionAction

        onIntroEnter({ openAll: true })
    }, [dataWrapper.uniqueId, dataWrapper.sectionId, navigation, onIntroEnter])

    const openTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        mountTile(uniqueId)
        setOpenTileIds((current) => {
            if(current.has(uniqueId)) return current
            const next = new Set(current)
            next.add(uniqueId)
            return limitWebArtTileSetForMobile(next)
        })
    }, [mountTile])

    const closeTile = useCallback((uniqueId) => {
        if(!uniqueId) return
        setOpenTileIds((current) => {
            if(!current.has(uniqueId)) return current
            const next = new Set(current)
            next.delete(uniqueId)
            return next
        })
        setMountedTileIds((current) => {
            if(!current.has(uniqueId)) return current
            const next = new Set(current)
            next.delete(uniqueId)
            return next
        })
    }, [])

    const openAllTargetTileIds = getOpenAllWebArtTileIds(allTileIds)
    const areAllArtTilesOpen = tileSetContainsAll(openTileIds, openAllTargetTileIds)

    const toggleAllArtTiles = useCallback(() => {
        const nextTargetTileIds = getOpenAllWebArtTileIds(allTileIds)
        if(tileSetContainsAll(openTileIds, nextTargetTileIds)) {
            closeAllOpenTiles()
            return
        }

        openAllArtTiles()
    }, [allTileIds, closeAllOpenTiles, openAllArtTiles, openTileIds])

    useEffect(() => {
        if(typeof window === "undefined" || !window.matchMedia) return
        if(useCarousel) return
        if(showIntroCover || !openTileIds.size) return
        if(!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

        const clearDesktopClose = () => {
            if(desktopCloseTimeoutRef.current == null) return

            window.clearTimeout(desktopCloseTimeoutRef.current)
            desktopCloseTimeoutRef.current = null
        }

        const scheduleDesktopClose = () => {
            clearDesktopClose()
            desktopCloseTimeoutRef.current = window.setTimeout(() => {
                desktopCloseTimeoutRef.current = null
                if(openTileIdsRef.current.size) closeAllOpenTiles()
            }, 180)
        }

        const onBlur = () => scheduleDesktopClose()
        const onFocus = () => clearDesktopClose()
        const onVisibilityChange = () => {
            if(document.hidden) scheduleDesktopClose()
            else clearDesktopClose()
        }

        window.addEventListener("blur", onBlur)
        window.addEventListener("focus", onFocus)
        document.addEventListener("visibilitychange", onVisibilityChange)

        return () => {
            clearDesktopClose()
            window.removeEventListener("blur", onBlur)
            window.removeEventListener("focus", onFocus)
            document.removeEventListener("visibilitychange", onVisibilityChange)
        }
    }, [showIntroCover, openTileIds, closeAllOpenTiles, useCarousel])

    const onIntroHide = useCallback(() => {
        clearStageTransitionWork()
        setShowIntroCover(true)

        if(prefersReducedMotion()) {
            resetArtState()
            setStageHeight(null)
            setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
            return
        }

        const stage = stageRef.current
        const previewHeight = getWebArtStagePreviewHeight(stage)
        const currentHeight = Math.max(
            previewHeight,
            Math.ceil(stage?.offsetHeight || stage?.scrollHeight || previewHeight)
        )

        setStageHeight(currentHeight)
        setStagePhase(WEB_ART_STAGE_PHASE.COLLAPSING)

        if(typeof window === "undefined")
            return

        const frameId = window.requestAnimationFrame(() => {
            const nextPreviewHeight = getWebArtStagePreviewHeight(stageRef.current)
            setStageHeight(nextPreviewHeight)
            scheduleStageTransitionFallback(WEB_ART_STAGE_PHASE.COLLAPSING)
        })

        stageFrameIdsRef.current.push(frameId)
    }, [clearStageTransitionWork, resetArtState, scheduleStageTransitionFallback, setStagePhase])

    const onStageTransitionEnd = useCallback((event) => {
        if(event.target !== event.currentTarget || event.propertyName !== "height")
            return

        if(stagePhaseRef.current === WEB_ART_STAGE_PHASE.EXPANDING)
            completeStageExpand()
        else if(stagePhaseRef.current === WEB_ART_STAGE_PHASE.COLLAPSING)
            completeStageCollapse()
    }, [completeStageCollapse, completeStageExpand])

    const clearUnselectedReadyTimeouts = useCallback((selectedIds) => {
        for(const [tileId, timeoutId] of readyTimeoutsRef.current) {
            if(selectedIds.has(tileId)) continue
            window.clearTimeout(timeoutId)
            readyTimeoutsRef.current.delete(tileId)
        }
    }, [])

    const onCarouselChange = useCallback((_index, slide) => {
        const selectedIds = new Set([
            ...pinnedSlidesRef.current
                .filter(({ id }) => !stagedPinnedSlideIdsRef.current.has(id))
                .map(({ tileId }) => tileId),
            slide.tileId
        ].filter(Boolean))
        clearUnselectedReadyTimeouts(selectedIds)
        setCarouselActiveTileId(slide.tileId)
        setOpenTileIds(selectedIds)
        setMountedTileIds(selectedIds)
        setSendYoursPreviewOpen(false)
    }, [clearUnselectedReadyTimeouts])

    const createCarouselPinHandler = useCallback((carouselSlides) => (slideId) => {
        const slide = carouselSlides.find(({ id: candidateId }) => candidateId === slideId)
        if(!slide?.tileId) return
        const current = pinnedSlidesRef.current
        if(current.some(({ id }) => id === slideId) || current.length >= 3) return
        const next = [...current, { id: slideId, tileId: slide.tileId }]
        const staged = new Set(stagedPinnedSlideIdsRef.current)
        staged.add(slideId)
        stagedPinnedSlideIdsRef.current = staged
        setStagedPinnedSlideIds(staged)
        pinnedSlidesRef.current = next
        setPinnedSlides(next)
    }, [])

    const onCarouselUnpin = useCallback((slideId) => {
        const next = pinnedSlidesRef.current.filter(({ id }) => id !== slideId)
        if(next.length === pinnedSlidesRef.current.length) return
        const staged = new Set(stagedPinnedSlideIdsRef.current)
        staged.delete(slideId)
        stagedPinnedSlideIdsRef.current = staged
        setStagedPinnedSlideIds(staged)
        pinnedSlidesRef.current = next
        setPinnedSlides(next)
    }, [])

    const onCarouselReplacePinned = useCallback((replacedSlideId, selectedSlide, activeSlideId) => {
        const current = pinnedSlidesRef.current
        const replacedIndex = current.findIndex(({ id }) => id === replacedSlideId)
        if(replacedIndex < 0 || !selectedSlide) return

        const next = [...current]
        const selectedIndex = next.findIndex(({ id }) => id === selectedSlide.id)
        if(selectedSlide.id === activeSlideId) {
            next.splice(replacedIndex, 1)
            const staged = new Set(stagedPinnedSlideIdsRef.current)
            staged.delete(replacedSlideId)
            stagedPinnedSlideIdsRef.current = staged
            setStagedPinnedSlideIds(staged)
        } else if(selectedIndex >= 0) {
            ;[next[replacedIndex], next[selectedIndex]] = [next[selectedIndex], next[replacedIndex]]
        } else {
            next[replacedIndex] = { id: selectedSlide.id, tileId: selectedSlide.tileId }
            const staged = new Set(stagedPinnedSlideIdsRef.current)
            staged.delete(replacedSlideId)
            staged.add(selectedSlide.id)
            stagedPinnedSlideIdsRef.current = staged
            setStagedPinnedSlideIds(staged)
        }

        pinnedSlidesRef.current = next
        setPinnedSlides(next)
        const selectedIds = new Set([...next.map(({ tileId }) => tileId), carouselActiveTileId].filter(Boolean))
        clearUnselectedReadyTimeouts(selectedIds)
        setOpenTileIds(selectedIds)
        setMountedTileIds(selectedIds)
        if(selectedSlide.id === activeSlideId) setSendYoursPreviewOpen(false)
    }, [carouselActiveTileId, clearUnselectedReadyTimeouts])

    const onCarouselWindowsSettled = useCallback(() => {
        if(!stagedPinnedSlideIdsRef.current.size) return
        stagedPinnedSlideIdsRef.current = new Set()
        setStagedPinnedSlideIds(new Set())
        const selectedIds = new Set([...pinnedSlidesRef.current.map(({ tileId }) => tileId), carouselActiveTileId].filter(Boolean))
        clearUnselectedReadyTimeouts(selectedIds)
        setOpenTileIds(selectedIds)
        setMountedTileIds(selectedIds)
    }, [carouselActiveTileId, clearUnselectedReadyTimeouts])

    useEffect(() => {
        if(!useCarousel || showIntroCover || !shouldMountTiles) return
        const selectedIds = new Set([
            ...pinnedSlides
                .filter(({ id }) => !stagedPinnedSlideIds.has(id))
                .map(({ tileId }) => tileId),
            carouselActiveTileId
        ].filter(Boolean))
        setOpenTileIds(selectedIds)
        setMountedTileIds(selectedIds)
        clearUnselectedReadyTimeouts(selectedIds)
    }, [carouselActiveTileId, clearUnselectedReadyTimeouts, pinnedSlides, shouldMountTiles, showIntroCover, stagedPinnedSlideIds, useCarousel])

    useEffect(() => {
        clearStageTransitionWork()
        setStageHeight(null)
        setStagePhase(WEB_ART_STAGE_PHASE.PREVIEW)
        setShowIntroCover(true)
        resetArtState()
    }, [clearStageTransitionWork, dataWrapper.uniqueId, resetArtState, setStagePhase])

    useEffect(() => {
        return () => {
            clearStageTransitionWork()
            for(const timeoutId of readyTimeoutsRef.current.values())
                window.clearTimeout(timeoutId)
            readyTimeoutsRef.current.clear()
        }
    }, [clearStageTransitionWork])

    useEffect(() => {
        if(!shouldMountTiles) return
        setActivationIndex(items.length - 1)
    }, [shouldMountTiles, items.length])

    useEffect(() => {
        if(!shouldMountTiles) return

        for(const uid of trackedReadyIds) {
            if(!uid) continue
            if(readySetRef.current.has(uid)) continue
            if(readyTimeoutsRef.current.has(uid)) continue

            const timeoutId = window.setTimeout(() => {
                onTileReady(uid)
            }, 12000)
            readyTimeoutsRef.current.set(uid, timeoutId)
        }
    }, [shouldMountTiles, trackedReadyIds, onTileReady])

    return {
        locked,
        showIntroCover,
        tilesWrapperRef,
        stageRef,
        stagePhase,
        stageHeight,
        shouldMountTiles,
        activationIndex,
        openTileIds,
        mountedTileIds,
        pinnedSlides,
        stagedPinnedSlideIds,
        sendYoursPreviewOpen,
        areAllArtTilesOpen,
        onTileReady,
        openTile,
        closeTile,
        toggleAllArtTiles,
        onIntroEnter,
        onIntroHide,
        onStageTransitionEnd,
        onCarouselChange,
        createCarouselPinHandler,
        onCarouselUnpin,
        onCarouselReplacePinned,
        onCarouselWindowsSettled
    }
}
