import "./LayeredCardCarousel.scss"
import React, {useEffect, useRef, useState} from "react"
import {flushSync} from "react-dom"

/** A presentation shell: callers own each card's content and activation lifecycle. */
function LayeredCardCarousel({slides, onChange, onPin, onUnpin, pinnedIds = [], maxPinned = 3, labels = {}, enabled = true}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [history, setHistory] = useState([0])
    const [entryDirection, setEntryDirection] = useState("initial")
    const pointerStartRef = useRef(null)
    const layoutTransitionRef = useRef(null)
    const indexRef = useRef(null)
    const [indexColumns, setIndexColumns] = useState(1)
    const count = slides.length
    const currentIndex = count ? Math.min(activeIndex, count - 1) : 0
    const active = slides[currentIndex]
    const nextIndex = count > 1 ? (currentIndex + 1) % count : null
    const previousIndex = count > 1 ? (currentIndex - 1 + count) % count : null
    const visiblePinned = pinnedIds.map((id) => slides.find((slide) => slide.id === id))
        .filter((slide) => slide && slide.id !== active?.id)
    const isPinned = Boolean(active && pinnedIds.includes(active.id))
    const canPin = Boolean(onPin && active?.pinnable !== false && (isPinned || pinnedIds.length < maxPinned))

    useEffect(() => {
        const rail = indexRef.current
        if(!rail || !count) return

        const fitColumns = () => {
            const maxColumns = Math.max(1, Math.min(count, Math.floor((rail.clientWidth + 4) / 26)))
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

    if(!count) return null

    const runLayoutTransition = (update, animate = true) => {
        if(!animate || typeof document.startViewTransition !== "function" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            update()
            return
        }

        document.documentElement.dataset.webArtLayoutTransition = "true"
        let transition
        try {
            transition = document.startViewTransition(() => flushSync(update))
        } catch {
            delete document.documentElement.dataset.webArtLayoutTransition
            update()
            return
        }
        layoutTransitionRef.current = transition
        transition.finished.finally(() => {
            if(layoutTransitionRef.current === transition) {
                delete document.documentElement.dataset.webArtLayoutTransition
                layoutTransitionRef.current = null
            }
        }).catch(() => {})
    }

    const commitSelect = (index) => {
        if(!enabled || index === null || index === currentIndex || !slides[index]) return
        setEntryDirection(index === nextIndex ? "next" : index === previousIndex ? "previous" : "jump")
        setActiveIndex(index)
        setHistory((current) => [...current, index].slice(-8))
        onChange?.(index, slides[index])
    }

    const select = (index) => {
        if(!enabled || index === null || index === currentIndex || !slides[index]) return
        runLayoutTransition(() => commitSelect(index), pinnedIds.length > 0)
    }

    const onPointerDown = (event) => {
        if(!enabled || event.pointerType === "mouse") return
        pointerStartRef.current = {x: event.clientX, y: event.clientY}
    }

    const onPointerUp = (event) => {
        const start = pointerStartRef.current
        pointerStartRef.current = null
        if(!start || !enabled) return
        const dx = event.clientX - start.x
        const dy = event.clientY - start.y
        if(Math.abs(dx) < 58 || Math.abs(dx) < Math.abs(dy) * 1.35) return
        select(dx > 0 ? previousIndex : nextIndex)
    }

    const onPinClick = () => {
        if(!active || !canPin) return
        if(isPinned) {
            runLayoutTransition(() => onUnpin?.(active.id))
            return
        }
        runLayoutTransition(() => {
            onPin?.(active.id)
            for(let offset = 1; offset < count; offset++) {
                const candidate = (currentIndex + offset) % count
                if(slides[candidate].pinnable === false || pinnedIds.includes(slides[candidate].id)) continue
                commitSelect(candidate)
                break
            }
        })
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
        runLayoutTransition(() => onUnpin?.(slideId))
    }

    const renderSide = (index, side) => index === null ? null : (
        <button key={`${side}-${slides[index].id}`}
                type="button"
                className={`layered-card-carousel-side layered-card-carousel-side-${side}`}
                style={{"--carousel-preview-hue": (index * 37 + 195) % 360}}
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
                <div className="layered-card-carousel-stage"
                     onPointerDown={onPointerDown}
                     onPointerUp={onPointerUp}
                     onPointerCancel={() => { pointerStartRef.current = null }}>
                    {renderSide(previousIndex, "previous")}
                    {renderSide(nextIndex, "next")}
                    <div className={`layered-card-carousel-current layered-card-carousel-current-${entryDirection}`} key={active.id}
                         style={{viewTransitionName: `web-art-window-${currentIndex}`, viewTransitionClass: "web-art-window"}}
                         role="group"
                         aria-label={`${currentIndex + 1} / ${count}: ${active.label}`}>
                        {active.content}
                        {enabled && onPin && active.pinnable !== false && (
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
                    </div>
                </div>
                {visiblePinned.map((slide) => (
                    <div className="layered-card-carousel-pinned" key={slide.id}
                         style={{viewTransitionName: `web-art-window-${slides.indexOf(slide)}`, viewTransitionClass: "web-art-window"}}
                         role="group" aria-label={`${labels.pinned || "Open artwork"}: ${slide.label}`}>
                        {slide.content}
                        <button type="button" className="layered-card-carousel-unpin"
                                onClick={(event) => onPinnedUnpinClick(event, slide.id)}
                                aria-label={`${labels.unpin || "Remove from simultaneous view"}: ${slide.label}`}>
                            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                <path d="M5 5 15 15M15 5 5 15"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <nav ref={indexRef} className="layered-card-carousel-index"
                 style={{"--carousel-index-columns": indexColumns}}
                 aria-label={labels.jump || "Choose artwork"}>
                {slides.map((slide, index) => {
                    const age = [...history].reverse().indexOf(index)
                    const trail = age > 0 && age <= 5
                    return (
                        <button key={slide.id}
                                type="button"
                                className={`layered-card-carousel-index-button${index === currentIndex ? " is-current" : ""}${trail ? " is-recent" : ""}`}
                                style={trail ? {"--carousel-trail-percent": `${Math.max(12, 100 - age * 18)}%`} : undefined}
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
