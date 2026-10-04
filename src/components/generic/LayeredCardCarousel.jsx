import "./LayeredCardCarousel.scss"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react"

const CAROUSEL_PREVIEW_HUES = [190, 214, 268, 322, 164, 232, 286, 340]

/** A presentation shell: callers own each card's content and activation lifecycle. */
function LayeredCardCarousel({slides, onChange, onPin, onUnpin, onReplacePinned, onWindowsSettled, pinnedIds = [], maxPinned = 3, labels = {}, enabled = true}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [history, setHistory] = useState([0])
    const [entryDirection, setEntryDirection] = useState("initial")
    const pointerStartRef = useRef(null)
    const indexRef = useRef(null)
    const lastInteractedSlideIdRef = useRef(null)
    const [lastInteractedSlideId, setLastInteractedSlideId] = useState(null)
    const onWindowsSettledRef = useRef(onWindowsSettled)
    const settleFrameIdsRef = useRef([])
    const settleTimeoutRef = useRef(null)
    const [indexColumns, setIndexColumns] = useState(1)
    const count = slides.length
    onWindowsSettledRef.current = onWindowsSettled
    const currentIndex = count ? Math.min(activeIndex, count - 1) : 0
    const active = slides[currentIndex]
    const nextIndex = count > 1 ? (currentIndex + 1) % count : null
    const previousIndex = count > 1 ? (currentIndex - 1 + count) % count : null
    const visiblePinned = pinnedIds.map((id) => slides.find((slide) => slide.id === id))
        .filter((slide) => slide && slide.id !== active?.id)
    const isPinned = Boolean(active && pinnedIds.includes(active.id))
    const canPin = Boolean(onPin && active?.pinnable !== false && (isPinned || pinnedIds.length < maxPinned))
    const recentAges = new Map()
    for(let position = history.length - 1; position >= 0; position--) {
        const index = history[position]
        if(!recentAges.has(index)) recentAges.set(index, history.length - 1 - position)
    }

    useLayoutEffect(() => {
        const rail = indexRef.current
        if(!rail || !count) return

        const fitColumns = () => {
            const touchFriendly = rail.clientWidth <= 560 || window.matchMedia?.("(pointer: coarse)")?.matches
            const minimumCellWidth = touchFriendly ? 44 : 26
            const maxColumns = Math.max(1, Math.min(count, Math.floor((rail.clientWidth + 4) / minimumCellWidth)))
            let columns = maxColumns
            while(columns > Math.ceil(maxColumns / 2) && count % columns !== 0) columns--
            if(count % columns !== 0) columns = Math.ceil(count / Math.ceil(count / maxColumns))
            setIndexColumns(columns)
        }

        const observer = new ResizeObserver(fitColumns)
        observer.observe(rail)
        fitColumns()
        return () => observer.disconnect()
    }, [count])

    useEffect(() => () => {
        for(const frameId of settleFrameIdsRef.current) window.cancelAnimationFrame(frameId)
        if(settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current)
    }, [])

    if(!count) return null

    const markInteractedSlide = (slideId) => {
        lastInteractedSlideIdRef.current = slideId
        setLastInteractedSlideId(slideId)
    }

    const scheduleWindowsSettled = () => {
        for(const frameId of settleFrameIdsRef.current) window.cancelAnimationFrame(frameId)
        settleFrameIdsRef.current = []
        if(settleTimeoutRef.current !== null) window.clearTimeout(settleTimeoutRef.current)
        settleTimeoutRef.current = null

        if(typeof window === "undefined") {
            onWindowsSettledRef.current?.()
            return
        }

        const settleDelay = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ? 80 : 680
        const firstFrameId = window.requestAnimationFrame(() => {
            const secondFrameId = window.requestAnimationFrame(() => {
                settleFrameIdsRef.current = []
                settleTimeoutRef.current = window.setTimeout(() => {
                    settleTimeoutRef.current = null
                    onWindowsSettledRef.current?.()
                }, settleDelay)
            })
            settleFrameIdsRef.current = [secondFrameId]
        })
        settleFrameIdsRef.current = [firstFrameId]
    }

    const commitSelect = (index, {preserveInteractionTarget = false} = {}) => {
        if(!enabled || index === null || index === currentIndex || !slides[index]) return
        setEntryDirection(index === nextIndex ? "next" : index === previousIndex ? "previous" : "jump")
        setActiveIndex(index)
        setHistory((current) => [...current, index].slice(-8))
        if(!preserveInteractionTarget) markInteractedSlide(slides[index].id)
        onChange?.(index, slides[index])
    }

    const select = (index) => {
        if(!enabled || index === null || !slides[index]) return
        const selected = slides[index]
        const interactionTargetId = lastInteractedSlideIdRef.current || active?.id
        const targetIsPinned = interactionTargetId && interactionTargetId !== active?.id && pinnedIds.includes(interactionTargetId)

        if(targetIsPinned) {
            if(selected.id === interactionTargetId) return
            onReplacePinned?.(interactionTargetId, selected, active?.id)
            scheduleWindowsSettled()
            setHistory((current) => [...current, index].slice(-8))
            markInteractedSlide(selected.id === active?.id ? active.id : selected.id)
            return
        }

        if(index === currentIndex) {
            markInteractedSlide(selected.id)
            return
        }
        commitSelect(index)
    }

    const addNextWindow = () => {
        if(!enabled || !onPin) return
        for(let offset = 1; offset < count; offset++) {
            const candidate = (currentIndex + offset) % count
            if(slides[candidate].id === active?.id || slides[candidate].pinnable === false || pinnedIds.includes(slides[candidate].id)) continue
            if(pinnedIds.length < maxPinned) onPin(slides[candidate].id)
            else commitSelect(candidate)
            markInteractedSlide(slides[candidate].id)
            if(pinnedIds.length < maxPinned) scheduleWindowsSettled()
            return
        }
    }

    const onPointerDown = (event) => {
        pointerStartRef.current = null
        if(!enabled || event.pointerType === "mouse" || !event.isPrimary ||
            event.target.closest(".layered-card-carousel-pin, .layered-card-carousel-unpin, .article-web-art-gated-tile-pill, a, input, select, textarea")) return
        pointerStartRef.current = {id: event.pointerId, x: event.clientX, y: event.clientY}
    }

    const onPointerUp = (event) => {
        const start = pointerStartRef.current
        pointerStartRef.current = null
        if(!start || start.id !== event.pointerId || !enabled) return
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if(Math.abs(dx) < 58 || Math.abs(dx) < Math.abs(dy) * 1.35) return
        select(dx > 0 ? previousIndex : nextIndex)
    }

    const onPinClick = () => {
        if(!active || !canPin) return
        if(isPinned) {
            onUnpin?.(active.id)
            scheduleWindowsSettled()
            return
        }
        onPin?.(active.id)
        scheduleWindowsSettled()
        for(let offset = 1; offset < count; offset++) {
            const candidate = (currentIndex + offset) % count
            if(slides[candidate].pinnable === false || pinnedIds.includes(slides[candidate].id)) continue
            commitSelect(candidate, {preserveInteractionTarget: true})
            break
        }
    }

    const onIndexKeyDown = (event, index) => {
        const target = {
            ArrowLeft: (index - 1 + count) % count,
            ArrowRight: (index + 1) % count,
            Home: 0,
            End: count - 1
        }[event.key]
        if(target === undefined) return
        event.preventDefault()
        event.currentTarget.parentElement.children[target]?.focus()
        select(target)
    }

    const onPinnedUnpinClick = (event, slideId) => {
        if(event.detail === 0) {
            event.currentTarget.closest(".layered-card-carousel")
                ?.querySelector(".layered-card-carousel-index-button.is-current")?.focus()
        }
        onUnpin?.(slideId)
        scheduleWindowsSettled()
        if(lastInteractedSlideIdRef.current === slideId) markInteractedSlide(active?.id || null)
    }

    const renderSide = (index, side) => index === null ? null : (
        <button type="button"
                className={`layered-card-carousel-side layered-card-carousel-side-${side}`}
                style={{"--carousel-preview-hue": CAROUSEL_PREVIEW_HUES[index % CAROUSEL_PREVIEW_HUES.length]}}
                onClick={() => select(index)}
                disabled={!enabled}
                aria-label={`${side === "next" ? labels.next || "Next artwork" : labels.previous || "Previous artwork"}: ${index + 1}, ${slides[index].label}`}>
            <span className="layered-card-carousel-side-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
            </span>
            <span className="layered-card-carousel-side-label" aria-hidden="true">{slides[index].label}</span>
        </button>
    )

    return (
        <div className={`layered-card-carousel${visiblePinned.length ? " layered-card-carousel-multiview" : ""}`}
            aria-label={labels.gallery || "Artwork gallery"}>
            <div className="layered-card-carousel-workspace" data-view-count={visiblePinned.length + 1}>
                {renderSide(previousIndex, "previous")}
                {renderSide(nextIndex, "next")}
                {/* Keep each live tile under this keyed parent when its role changes. */}
                {[active, ...visiblePinned].map((slide) => {
                    const index = slides.indexOf(slide)
                    const isCurrent = slide.id === active.id
                    return (
                        <div key={slide.id}
                             className={[
                                 isCurrent ? `layered-card-carousel-current layered-card-carousel-current-${entryDirection}` : "layered-card-carousel-pinned",
                                 isCurrent && slide.transition === "fade" ? "layered-card-carousel-current-fade" : "",
                                 (lastInteractedSlideId || active?.id) === slide.id ? "is-last-interacted" : ""
                             ].filter(Boolean).join(" ")}
                             role="group"
                             aria-label={isCurrent
                                 ? `${index + 1} / ${count}: ${slide.label}`
                                 : `${labels.pinned || "Open artwork"}: ${slide.label}`}
                             onPointerDownCapture={() => markInteractedSlide(slide.id)}
                             onFocusCapture={() => markInteractedSlide(slide.id)}
                             onClickCapture={() => markInteractedSlide(slide.id)}
                             onPointerDown={isCurrent ? onPointerDown : undefined}
                             onPointerUp={isCurrent ? onPointerUp : undefined}
                             onPointerCancel={isCurrent ? () => { pointerStartRef.current = null } : undefined}>
                            {slide.content}
                            {isCurrent && enabled && onPin && slide.pinnable !== false && (
                                <button type="button" className={`layered-card-carousel-pin${isPinned ? " is-pinned" : ""}`}
                                        onClick={onPinClick}
                                        disabled={!canPin}
                                        aria-label={isPinned ? labels.unpin || "Remove from simultaneous view" : canPin ? labels.pin || "Add to simultaneous view" : labels.pinLimit || "Three extra artworks are already open"}
                                        title={isPinned ? labels.unpin || "Remove from simultaneous view" : canPin ? labels.pin || "Add to simultaneous view" : labels.pinLimit || "Three extra artworks are already open"}>
                                    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                        <rect x="3.5" y="3.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                                        {isPinned ? <path d="M6.5 10h7"/> : <path d="M6.5 10h7M10 6.5v7"/>}
                                    </svg>
                                </button>
                            )}
                            {!isCurrent && (
                                <button type="button" className="layered-card-carousel-unpin"
                                        onClick={(event) => onPinnedUnpinClick(event, slide.id)}
                                        aria-label={`${labels.unpin || "Remove from simultaneous view"}: ${slide.label}`}>
                                    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                        <path d="M5 5 15 15M15 5 5 15"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    )
                })}
                {visiblePinned.length === 2 && onPin && (
                    <button type="button"
                            className="layered-card-carousel-add-slot"
                            onClick={addNextWindow}
                            disabled={!enabled || !slides.some((slide) => slide.id !== active?.id && slide.pinnable !== false && !pinnedIds.includes(slide.id))}
                            aria-label={labels.addNext || labels.pin || "Add next artwork"}
                            title={labels.addNext || labels.pin || "Add next artwork"}>
                        <span className="layered-card-carousel-add-slot-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" focusable="false">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                        </span>
                        <span className="layered-card-carousel-add-slot-label" aria-hidden="true">{labels.addNext || "Add artwork"}</span>
                    </button>
                )}
            </div>
            <nav ref={indexRef} className="layered-card-carousel-index"
                 style={{"--carousel-index-columns": indexColumns}}
                 aria-label={labels.jump || "Choose artwork"}>
                {slides.map((slide, index) => {
                    const age = recentAges.get(index) ?? -1
                    const trail = age > 0 && age <= 5
                    return (
                        <button key={slide.id}
                                type="button"
                                className={`layered-card-carousel-index-button${index === currentIndex ? " is-current" : ""}${trail ? " is-recent" : ""}`}
                                style={{
                                    "--carousel-index-delay": `${Math.min(index, 18) * 20}ms`,
                                    ...(trail ? {"--carousel-trail-percent": `${Math.max(12, 100 - age * 18)}%`} : {})
                                }}
                                onClick={() => select(index)}
                                onKeyDown={(event) => onIndexKeyDown(event, index)}
                                tabIndex={index === currentIndex ? 0 : -1}
                                disabled={!enabled}
                                aria-current={index === currentIndex ? "true" : undefined}
                                aria-label={`${labels.jumpTo || "Show artwork"} ${index + 1}: ${slide.label}`}>
                            {index + 1}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}

export default LayeredCardCarousel
