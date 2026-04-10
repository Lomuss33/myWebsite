import {useEffect, useMemo, useRef} from "react"

const DEFAULT_OPTIONS = {
    targetSelector: null,
    enterTransitionMs: 250,
    leaveResetMs: 250,
    leaveCleanupMs: 500
}

function canHoverWithFinePointer() {
    if (typeof window === "undefined" || !window.matchMedia) return false
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function animationsSuspended() {
    if (typeof window === "undefined") return false
    return Boolean(window.suspendAnimations)
}

function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function parseRotationLimit(el) {
    if (!el || typeof window === "undefined") return 6

    const computed = window.getComputedStyle(el)
    const raw = computed.getPropertyValue("--ff-rotation-limit")
    const value = Number.parseFloat(raw)
    return Number.isFinite(value) ? value : 6
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

export function useFloatingFrame(options = null) {
    const resolvedOptions = useMemo(() => ({...DEFAULT_OPTIONS, ...(options || {})}), [options])

    const stateRef = useRef({
        enabled: false,
        rafId: null,
        pendingEvent: null,
        timeouts: {enter: null, reset: null, cleanup: null},
        targetEl: null
    })

    useEffect(() => {
        return () => {
            const {rafId, timeouts} = stateRef.current
            if (rafId) cancelAnimationFrame(rafId)
            Object.values(timeouts).forEach(id => {
                if (id) clearTimeout(id)
            })
        }
    }, [])

    const resolveTarget = (hostEl) => {
        if (!hostEl) return null
        if (!resolvedOptions.targetSelector) return hostEl
        return hostEl.querySelector(resolvedOptions.targetSelector)
    }

    const clearTimeouts = () => {
        const timeouts = stateRef.current.timeouts
        Object.keys(timeouts).forEach(key => {
            if (timeouts[key]) clearTimeout(timeouts[key])
            timeouts[key] = null
        })
    }

    const setNeutralVars = (el) => {
        if (!el) return
        el.style.setProperty("--ff-rx", "0deg")
        el.style.setProperty("--ff-ry", "0deg")
        el.style.setProperty("--ff-hl-x", "50%")
        el.style.setProperty("--ff-hl-y", "50%")
        el.style.setProperty("--ff-scale", "1")
    }

    const applyEvent = () => {
        const {pendingEvent, targetEl} = stateRef.current
        stateRef.current.rafId = null
        if (!pendingEvent || !targetEl) return

        const event = pendingEvent
        stateRef.current.pendingEvent = null

        const rect = targetEl.getBoundingClientRect()
        if (!rect.width || !rect.height) return

        const x = clamp(event.clientX - rect.left, 0, rect.width)
        const y = clamp(event.clientY - rect.top, 0, rect.height)
        const middleX = rect.width / 2
        const middleY = rect.height / 2

        const rotationLimit = parseRotationLimit(targetEl)
        const rotateX = (x - middleX) * (rotationLimit / middleX)
        const rotateY = (middleY - y) * (rotationLimit / middleY)

        targetEl.style.setProperty("--ff-rx", `${rotateX.toFixed(3)}deg`)
        targetEl.style.setProperty("--ff-ry", `${rotateY.toFixed(3)}deg`)
        targetEl.style.setProperty("--ff-hl-x", `${((x / rect.width) * 100).toFixed(2)}%`)
        targetEl.style.setProperty("--ff-hl-y", `${((y / rect.height) * 100).toFixed(2)}%`)
    }

    const onPointerEnter = (event) => {
        const hostEl = event.currentTarget
        const enabled = canHoverWithFinePointer() && !prefersReducedMotion() && !animationsSuspended()
        stateRef.current.enabled = enabled
        if (!enabled) return

        const targetEl = resolveTarget(hostEl)
        if (!targetEl) return

        clearTimeouts()

        stateRef.current.targetEl = targetEl
        setNeutralVars(targetEl)
        targetEl.classList.add("floating-frame--active")
        targetEl.classList.add("floating-frame--transition")

        stateRef.current.timeouts.enter = setTimeout(() => {
            targetEl.classList.remove("floating-frame--transition")
        }, resolvedOptions.enterTransitionMs)
    }

    const onPointerMove = (event) => {
        if (!stateRef.current.enabled) return
        const hostEl = event.currentTarget
        const targetEl = stateRef.current.targetEl || resolveTarget(hostEl)
        if (!targetEl || !targetEl.classList.contains("floating-frame--active")) return

        stateRef.current.targetEl = targetEl
        stateRef.current.pendingEvent = {clientX: event.clientX, clientY: event.clientY}

        if (stateRef.current.rafId) return
        stateRef.current.rafId = requestAnimationFrame(applyEvent)
    }

    const onPointerLeave = (event) => {
        if (!stateRef.current.enabled) return
        const hostEl = event.currentTarget
        const targetEl = stateRef.current.targetEl || resolveTarget(hostEl)
        if (!targetEl) return

        clearTimeouts()
        if (stateRef.current.rafId) {
            cancelAnimationFrame(stateRef.current.rafId)
            stateRef.current.rafId = null
        }
        stateRef.current.pendingEvent = null

        targetEl.classList.add("floating-frame--transition")

        stateRef.current.timeouts.reset = setTimeout(() => {
            setNeutralVars(targetEl)
        }, resolvedOptions.leaveResetMs)

        stateRef.current.timeouts.cleanup = setTimeout(() => {
            targetEl.classList.remove("floating-frame--transition")
            targetEl.classList.remove("floating-frame--active")
            stateRef.current.targetEl = null
        }, resolvedOptions.leaveCleanupMs)
    }

    return {
        onPointerEnter,
        onPointerMove,
        onPointerLeave
    }
}
