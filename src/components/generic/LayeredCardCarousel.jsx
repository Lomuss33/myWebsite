import "./LayeredCardCarousel.scss"
import React, {useRef, useState} from "react"

/** A presentation shell: callers own each card's content and activation lifecycle. */
function LayeredCardCarousel({slides, onChange, onPin, onUnpin, pinnedIds = [], maxPinned = 3, labels = {}, enabled = true}) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [history, setHistory] = useState([0])
    const [entryDirection, setEntryDirection] = useState("initial")
    const pointerStartRef = useRef(null)
    const count = slides.length
    const currentIndex = count ? Math.min(activeIndex, count - 1) : 0
    const active = slides[currentIndex]
    const nextIndex = count > 1 ? (currentIndex + 1) % count : null
    const visitedIndex = [...history].reverse().find((index) => index !== currentIndex && index < count)
    const lastSeenIndex = visitedIndex ?? (count > 1 ? (currentIndex - 1 + count) % count : null)
    const visiblePinned = pinnedIds.map((id) => slides.find((slide) => slide.id === id))
        .filter((slide) => slide && slide.id !== active?.id)
    const isPinned = Boolean(active && pinnedIds.includes(active.id))
    const canPin = Boolean(onPin && active?.pinnable !== false && (isPinned || pinnedIds.length < maxPinned))

    if(!count) return null

    const select = (index) => {
        if(!enabled || index === null || index === currentIndex || !slides[index]) return
        setEntryDirection(index === nextIndex ? "next" : index === lastSeenIndex ? "last" : "jump")
        setActiveIndex(index)
        setHistory((current) => [...current, index].slice(-8))
        onChange?.(index, slides[index])
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
        select(dx > 0 ? nextIndex : lastSeenIndex)
    }

    const onPinClick = () => {
        if(!active || !canPin) return
        if(isPinned) {
            onUnpin?.(active.id)
            return
        }
        onPin?.(active.id)
        for(let offset = 1; offset < count; offset++) {
            const candidate = (currentIndex + offset) % count
            if(slides[candidate].pinnable === false || pinnedIds.includes(slides[candidate].id)) continue
            select(candidate)
            break
        }
    }

    const renderSide = (index, side) => index === null ? null : (
        <button key={`${side}-${slides[index].id}`}
                type="button"
                className={`layered-card-carousel-side layered-card-carousel-side-${side}`}
                style={{"--carousel-preview-hue": (index * 37 + 195) % 360}}
                onClick={() => select(index)}
                disabled={!enabled}
                aria-label={`${side === "next" ? labels.next || "Next artwork" : visitedIndex === undefined ? labels.previous || "Previous artwork" : labels.last || "Last viewed artwork"}: ${index + 1}, ${slides[index].label}`}>
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
                    {renderSide(nextIndex, "next")}
                    {renderSide(lastSeenIndex, "last")}
                    <div className={`layered-card-carousel-current layered-card-carousel-current-${entryDirection}`} key={active.id}
                         role="group"
                         aria-label={`${currentIndex + 1} / ${count}: ${active.label}`}>
                        {active.content}
                    </div>
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
                {visiblePinned.map((slide) => (
                    <div className="layered-card-carousel-pinned" key={slide.id}
                         role="group" aria-label={`${labels.pinned || "Open artwork"}: ${slide.label}`}>
                        {slide.content}
                        <button type="button" className="layered-card-carousel-unpin"
                                onClick={() => onUnpin?.(slide.id)}
                                aria-label={`${labels.unpin || "Remove from simultaneous view"}: ${slide.label}`}>
                            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                                <path d="M5 5 15 15M15 5 5 15"/>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
            <nav className="layered-card-carousel-index"
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
