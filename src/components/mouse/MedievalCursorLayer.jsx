import "./MedievalCursorLayer.scss"
import React, {useEffect, useRef} from 'react'

const CURSOR_IMAGES = {
    default: "/medieval-style-cursor/Medieval-Arming sword normal.cur",
    pointer: "/medieval-style-cursor/Medieval-Gauntlet link select.cur",
    text: "/medieval-style-cursor/Medieval-Quill pen.cur",
    help: "/medieval-style-cursor/Medieval-Arming sword helmet help select.cur",
    notAllowed: "/medieval-style-cursor/Medieval-Shield unavailable.cur",
    move: "/medieval-style-cursor/Medieval-Greek cross move.cur",
    crosshair: "/medieval-style-cursor/Medieval-Maltese cross precision select.cur",
    ewResize: "/medieval-style-cursor/Medieval-Arrow horizontal resize.cur",
    nsResize: "/medieval-style-cursor/Medieval-Arrow veritical resize.cur",
    nwseResize: "/medieval-style-cursor/Medieval-Arrow diagonal resize 1.cur",
    neswResize: "/medieval-style-cursor/Medieval-Arrow diagonal resize 2.cur",
    progress: "/medieval-style-cursor/Medieval-Arming sword blacksmith work in background.cur"
}

const POINTER_SELECTORS = [
    "a[href]", "button", "summary", "label[for]",
    "[role=\"button\"]", ".btn", ".dropdown-toggle", ".dropdown-item",
    ".btn-option-picker-toggle", ".nav-tools-item",
    ".article-feature-item-image-switch",
    ".article-info-list-item-avatar-link",
    ".article-stack-item-home-bubble-button",
    ".article-web-art-tile",
    ".copy-button", ".audio-button",
    ".layout-salt-shaker.layout-salt-shaker-interactive",
    ".nav-profile-card-media",
    ".pretext-interactive-text-fragment",
    ".article-timeline-item-avatar--button",
    ".article-web-art-tile-cta",
    ".article-web-art-tile-clickable",
    ".article-web-art-gated-tile-pill",
    ".article-web-art-intro-cover-button",
    ".article-web-art-intro-cover-button-secondary",
    ".article-info-list-item-avatar-button",
    ".article-web-art-minesweeper-cell",
    ".article-web-art-minesweeper-reset",
    ".article-feature-item-image-switch",
    ".nav-profile-card-avatar-switch",
    ".nav-profile-card-media",
    ".nav-profile-card-mobile-action-language button",
    ".nav-profile-card-mobile-action-resume button"
]

const TEXT_SELECTORS = [
    "input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]):not([type=\"file\"]):not([type=\"color\"])",
    "textarea",
    "[contenteditable=\"\"]",
    "[contenteditable=\"true\"]",
    ".input-field-wrapper",
    ".input-field-wrapper-attach"
]

const HELP_SELECTORS = [
    ".status-circle",
    ".layout-salt-shaker:not(.layout-salt-shaker-interactive)",
    ".layout-salt-shaker-tooltip",
    ".audio-button-tooltip",
    ".copy-button-tooltip"
]

const MOVE_SELECTORS = [
    ".scrollbar-thumb-y",
    ".falling-word",
    ".pretext-draggable-inline-icon-text.is-dragging",
    ".pretext-draggable-inline-icon-text-rail-hit-area",
    ".pretext-draggable-inline-icon-text-handle"
]

const CROSSHAIR_SELECTORS = [
    ".article-web-art-tile-hover-only",
    ".article-web-art-tile-tardis",
    ".article-web-art-tile-cta-preview",
    ".article-web-art-tile-cta-preview-hex",
    ".article-web-art-tile-cta-preview-core",
    ".article-web-art-tile-cta-preview-node",
    ".article-web-art-tardis-cursor",
    ".article-web-art-tardis-cursor-dot",
    ".article-web-art-tile-cta-contact-pill",
    ".article-web-art-minesweeper-action-selector",
    ".article-web-art-minesweeper-mode"
]

const UNAVAILABLE_SELECTORS = [
    ":disabled",
    "[aria-disabled=\"true\"]"
]

const EW_RESIZE_SELECTORS = [
    ".article-web-art-tile-resize-ew",
    ".pretext-draggable-inline-icon-text",
    ".pretext-draggable-inline-icon-text.is-dragging",
    ".pretext-draggable-inline-icon-text-rail-hit-area",
    ".pretext-draggable-inline-icon-text-handle"
]

const NS_RESIZE_SELECTORS = [".article-web-art-tile-resize-ns"]
const NWSE_RESIZE_SELECTORS = [".article-web-art-tile-resize-nwse"]
const NESW_RESIZE_SELECTORS = [".article-web-art-tile-resize-nesw"]

const PROGRESS_SELECTORS = [
    ".article-web-art-items-locked .article-web-art-tile:not(.article-web-art-tile-cta)",
    ".article-web-art-tile-placeholder",
    ".article-web-art-tile-progress",
    ".article-web-art-intro-cover-button[disabled]",
    ".article-web-art-tile[disabled]",
    ".article-web-art-tile-cta-open .loader",
    ".article-web-art-tile-cta .loader",
    ".article-web-art-tile-cta .loader-inner",
    ".article-web-art-tile-cta .loader-line-wrap",
    ".article-web-art-tile-cta .loader-line",
    ".article-web-art-intro-cover-button-secondary-active",
    ".article-web-art-intro-cover-button[aria-busy=\"true\"]"
]

function resolveCursorType(element) {
    if (!element || !(element instanceof Element)) return "default"

    let current = element
    while (current && current !== document.documentElement) {
        if (matchesAny(current, PROGRESS_SELECTORS)) return "progress"
        if (matchesAny(current, UNAVAILABLE_SELECTORS)) return "notAllowed"
        if (matchesAny(current, EW_RESIZE_SELECTORS)) return "ewResize"
        if (matchesAny(current, NS_RESIZE_SELECTORS)) return "nsResize"
        if (matchesAny(current, NWSE_RESIZE_SELECTORS)) return "nwseResize"
        if (matchesAny(current, NESW_RESIZE_SELECTORS)) return "neswResize"
        if (matchesAny(current, CROSSHAIR_SELECTORS)) return "crosshair"
        if (matchesAny(current, MOVE_SELECTORS)) return "move"
        if (matchesAny(current, TEXT_SELECTORS)) return "text"
        if (matchesAny(current, HELP_SELECTORS)) return "help"
        if (matchesAny(current, POINTER_SELECTORS)) return "pointer"
        current = current.parentElement
    }

    return "default"
}

function matchesAny(element, selectors) {
    for (let i = 0; i < selectors.length; i++) {
        try {
            if (element.matches(selectors[i])) return true
        } catch (e) {
            // invalid selector, skip
        }
    }
    return false
}

function MedievalCursorLayer({ active }) {
    const cursorRef = useRef(null)
    const currentTypeRef = useRef("default")
    const posRef = useRef({ x: 0, y: 0, hasPosition: false })
    const rafRef = useRef(null)
    const activeRef = useRef(active)

    activeRef.current = active

    useEffect(() => {
        if (typeof window === "undefined") return

        const cursorEl = cursorRef.current
        if (!cursorEl) return

        const updatePosition = () => {
            cursorEl.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
            rafRef.current = null
        }

        const scheduleUpdate = () => {
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(updatePosition)
            }
        }

        const handlePointerEvent = (e) => {
            posRef.current.x = e.clientX
            posRef.current.y = e.clientY
            posRef.current.hasPosition = true

            scheduleUpdate()

            if (!activeRef.current) return

            const cursorType = resolveCursorType(e.target)
            if (cursorType !== currentTypeRef.current) {
                currentTypeRef.current = cursorType
                cursorEl.src = CURSOR_IMAGES[cursorType]
            }
        }

        document.addEventListener("pointermove", handlePointerEvent, { passive: true })
        document.addEventListener("pointerdown", handlePointerEvent, { passive: true })

        return () => {
            document.removeEventListener("pointermove", handlePointerEvent)
            document.removeEventListener("pointerdown", handlePointerEvent)
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        const cursorEl = cursorRef.current
        if (!cursorEl) return

        if (active && posRef.current.hasPosition) {
            cursorEl.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
        }

        if (active) {
            const target = document.elementFromPoint(posRef.current.x, posRef.current.y)
            const cursorType = target ? resolveCursorType(target) : "default"
            currentTypeRef.current = cursorType
            cursorEl.src = CURSOR_IMAGES[cursorType]
        }
    }, [active])

    return (
        <img ref={cursorRef}
             className={`medieval-cursor-layer ${active ? "medieval-cursor-layer-active" : ""}`}
             src={CURSOR_IMAGES.default}
             alt=""
             draggable={false}/>
    )
}

export default MedievalCursorLayer
