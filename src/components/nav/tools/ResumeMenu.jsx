import React, {useId, useLayoutEffect, useRef, useState} from 'react'
import {createPortal} from 'react-dom'
import './ResumeMenu.scss'

export default function ResumeMenu({toggleClassName = "", toggleCaption = null, toggleCaptionLayout = "stack", className = '', tooltipLabel, ariaLabel, toggleContent, children}) {
    const [open, setOpen] = useState(false)
    const toggle = useRef(null)
    const panel = useRef(null)
    const keyboardOpen = useRef(false)
    const id = useId()
    const closeMenu = () => {
        setOpen(false)
        toggle.current?.focus({preventScroll: true})
    }
    useLayoutEffect(() => {
        if (!open) return
        const menu = panel.current
        const place = () => {
            const rect = toggle.current.getBoundingClientRect()
            const viewport = window.visualViewport
            const left = viewport?.offsetLeft || 0
            const top = viewport?.offsetTop || 0
            const width = viewport?.width || window.innerWidth
            const height = viewport?.height || window.innerHeight
            const margin = 8
            const gap = 6
            const minX = left + margin
            const minY = top + margin
            const maxY = top + height - margin
            const rootFontSize = Number.parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
            const maxMenuWidth = Math.max(1, Math.min(rootFontSize * 12, width - margin * 2))
            menu.style.maxWidth = maxMenuWidth + 'px'
            const above = Math.max(0, rect.top - gap - minY)
            const below = Math.max(0, maxY - rect.bottom - gap)
            // Measure full content even when the previous placement was scroll-limited.
            const naturalHeight = menu.scrollHeight + menu.offsetHeight - menu.clientHeight
            const opensBelow = below >= naturalHeight || below >= above
            const available = opensBelow ? below : above
            menu.style.maxHeight = Math.max(1, available) + 'px'
            const box = menu.getBoundingClientRect()
            const y = opensBelow ? rect.bottom + gap : rect.top - gap - box.height
            menu.style.left = Math.max(minX, Math.min(rect.left, left + width - margin - box.width)) + 'px'
            menu.style.top = Math.max(minY, Math.min(y, maxY - box.height)) + 'px'
        }
        const outside = event => {
            if (!menu.contains(event.target) && !toggle.current.contains(event.target)) setOpen(false)
        }
        const escape = event => {
            if (event.key === 'Escape') { event.preventDefault(); closeMenu() }
        }
        place()
        if (keyboardOpen.current) menu.querySelector('[role="menuitem"]')?.focus()
        const observer = new ResizeObserver(place)
        observer.observe(menu)
        observer.observe(toggle.current)
        window.addEventListener('resize', place)
        window.addEventListener('scroll', place, true)
        window.visualViewport?.addEventListener('resize', place)
        window.visualViewport?.addEventListener('scroll', place)
        document.addEventListener('pointerdown', outside)
        document.addEventListener('keydown', escape)
        return () => {
            observer.disconnect()
            window.removeEventListener('resize', place)
            window.removeEventListener('scroll', place, true)
            window.visualViewport?.removeEventListener('resize', place)
            window.visualViewport?.removeEventListener('scroll', place)
            document.removeEventListener('pointerdown', outside)
            document.removeEventListener('keydown', escape)
        }
    }, [open])
    const navigate = event => {
        const items = [...panel.current.querySelectorAll('[role="menuitem"]:not(:disabled)')]
        const index = items.indexOf(document.activeElement)
        let next
        if (event.key === 'ArrowDown') next = (index + 1) % items.length
        if (event.key === 'ArrowUp') next = (index - 1 + items.length) % items.length
        if (event.key === 'Home') next = 0
        if (event.key === 'End') next = items.length - 1
        if (next !== undefined && items.length) { event.preventDefault(); items[next].focus() }
        if (event.key === 'Tab') {
            // Return to the trigger before native Tab continues through the page.
            toggle.current?.focus({preventScroll: true})
            setOpen(false)
        }
    }
    return <div className={`resume-menu ${className}`}>
        <button ref={toggle} type="button" className={`btn-option-picker-toggle btn btn-transparent ${toggleClassName} ${open ? "show" : ""} ${toggleCaption ? "btn-option-picker-toggle-with-caption" : ""} ${toggleCaption && toggleCaptionLayout === "inline" ? "btn-option-picker-toggle-caption-inline" : ""}`}
                aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined}
                aria-label={ariaLabel || tooltipLabel} data-tooltip={open ? 'hidden' : tooltipLabel}
                onClick={event => { keyboardOpen.current = event.detail === 0; setOpen(value => !value) }}
                onKeyDown={event => {
                    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                        event.preventDefault(); keyboardOpen.current = true; setOpen(true)
                    }
                }}>
            <span className="btn-option-picker-toggle-row">{toggleContent}</span>
            {toggleCaption && <span className="btn-option-picker-toggle-caption">{toggleCaption}</span>}
        </button>
        {open && createPortal(<div ref={panel} id={id} role="menu" aria-label={ariaLabel || tooltipLabel}
            className="mobile-resume-popover" onKeyDown={navigate}>
            {typeof children === 'function' ? children({closeMenu, isOpen: open}) : children}
        </div>, document.body)}
    </div>
}
