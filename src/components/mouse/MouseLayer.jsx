import "./MouseLayer.scss"
import React, {useEffect, useRef} from 'react'
import {useConstants} from "../../hooks/constants.js"

const CIRCLE_SIZE_IN_PIXELS = 75
const MIN_SCALE = 1.0
const MAX_SCALE = 3.0
const MIN_OPACITY = 0.1
const MAX_OPACITY = 0.6
const MAX_IDLE_TIME_IN_SECONDS = 0.5

function MouseLayer({ active, isBlockedByOverlay, hidden }) {
    const constants = useConstants()

    const circleRef = useRef(null)
    const iconRef = useRef(null)
    const tooltipRef = useRef(null)
    const animationFrameIdRef = useRef(null)
    const lastAnimationTimeRef = useRef(null)
    const animationPropsRef = useRef({
        hidden,
        isBlockedByOverlay
    })
    const deferredTargetUpdateRef = useRef(null)
    const stateRef = useRef({
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0,
        currentScale: 1,
        currentOpacity: 0,
        stoppedFor: 0,
        isInitialized: false,
        isClicked: false,
        currentFaIcon: null,
        tooltipLabel: "",
        targetElementParameters: null
    })

    const cancelAnimationLoop = () => {
        if (animationFrameIdRef.current !== null) {
            cancelAnimationFrame(animationFrameIdRef.current)
            animationFrameIdRef.current = null
        }

        lastAnimationTimeRef.current = null
    }

    const ensureAnimationLoop = () => {
        if (typeof window === "undefined" || !active || animationFrameIdRef.current !== null) {
            return
        }

        lastAnimationTimeRef.current = null
        animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    const setDefaultTarget = () => {
        const width = window.innerWidth || 0
        const height = window.innerHeight || 0
        const state = stateRef.current

        if (!state.isInitialized) {
            state.currentX = width * 0.5
            state.currentY = height * 0.38
        }

        state.targetX = width * 0.5
        state.targetY = height * 0.38
        state.isInitialized = true
    }

    const updateTargetParameters = (parameters) => {
        stateRef.current.targetElementParameters = parameters
    }

    const animate = (timespan) => {
        const dt = lastAnimationTimeRef.current === null
            ? 1
            : Math.max(0.25, Math.min(3, (timespan - lastAnimationTimeRef.current) / 17))

        lastAnimationTimeRef.current = timespan

        const shouldContinueAnimating = updateVisualState({
            circle: circleRef.current,
            icon: iconRef.current,
            tooltip: tooltipRef.current,
            hidden: animationPropsRef.current.hidden,
            isBlockedByOverlay: animationPropsRef.current.isBlockedByOverlay,
            dt
        })

        if (shouldContinueAnimating) {
            animationFrameIdRef.current = requestAnimationFrame(animate)
            return
        }

        animationFrameIdRef.current = null
        lastAnimationTimeRef.current = null
    }

    useEffect(() => {
        animationPropsRef.current.hidden = hidden
        animationPropsRef.current.isBlockedByOverlay = isBlockedByOverlay

        if (active) {
            ensureAnimationLoop()
            return
        }

        cancelAnimationLoop()
    }, [active, hidden, isBlockedByOverlay])

    useEffect(() => {
        return () => {
            cancelAnimationLoop()
        }
    }, [])

    useEffect(() => {
        if (typeof window === "undefined" || !active) {
            return
        }

        const handlePointerMove = (event) => {
            const state = stateRef.current
            state.targetX = event.clientX
            state.targetY = event.clientY
            updateTargetParameters(resolveMouseTargetParameters({
                event,
                constants
            }))
            ensureAnimationLoop()
        }

        const handlePointerDown = (event) => {
            if (event.button !== 0) {
                return
            }

            stateRef.current.isClicked = true
            updateTargetParameters(resolveMouseTargetParameters({
                event,
                constants
            }))
            ensureAnimationLoop()
        }

        const handlePointerUp = (event) => {
            const state = stateRef.current
            state.isClicked = false
            updateTargetParameters(resolveMouseTargetParameters({
                event,
                constants
            }))
            ensureAnimationLoop()

            if (deferredTargetUpdateRef.current !== null) {
                window.clearTimeout(deferredTargetUpdateRef.current)
            }

            deferredTargetUpdateRef.current = window.setTimeout(() => {
                deferredTargetUpdateRef.current = null

                const hoveredElement = document.elementFromPoint(event.clientX, event.clientY)
                updateTargetParameters(resolveMouseTargetParameters({
                    target: hoveredElement,
                    constants
                }))
                ensureAnimationLoop()
            }, 60)
        }

        const handlePointerLeave = () => {
            stateRef.current.isClicked = false
            updateTargetParameters(null)
            setDefaultTarget()
            ensureAnimationLoop()
        }

        setDefaultTarget()
        ensureAnimationLoop()

        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerdown", handlePointerDown, { passive: true })
        window.addEventListener("pointerup", handlePointerUp, { passive: true })
        window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
        window.addEventListener("blur", handlePointerLeave)
        window.addEventListener("resize", setDefaultTarget, { passive: true })

        return () => {
            if (deferredTargetUpdateRef.current !== null) {
                window.clearTimeout(deferredTargetUpdateRef.current)
                deferredTargetUpdateRef.current = null
            }

            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerdown", handlePointerDown)
            window.removeEventListener("pointerup", handlePointerUp)
            window.removeEventListener("pointerleave", handlePointerLeave)
            window.removeEventListener("blur", handlePointerLeave)
            window.removeEventListener("resize", setDefaultTarget)
        }
    }, [active, constants])

    if (!active) {
        return null
    }

    const hiddenClass = hidden ? `invisible` : ``

    return (
        <div className={`mouse-layer ${hiddenClass}`}>
            <div ref={circleRef}
                 className={`mouse-layer-circle`}
                 id={`mouse-layer-circle`}
                 style={{ opacity: 0 }}>
                <i ref={iconRef}
                   className={`mouse-layer-circle-fa-icon mouse-layer-circle-fa-icon-hidden fa-solid fa-circle`}/>
            </div>

            <div ref={tooltipRef}
                 id={`mouse-layer-tooltip`}
                 className={`custom-tooltip custom-tooltip-hidden`}>
                <span/>
            </div>
        </div>
    )

    function updateVisualState({ circle, icon, tooltip, hidden, isBlockedByOverlay, dt }) {
        if (!circle || !icon || !tooltip) {
            return false
        }

        const state = stateRef.current
        const params = isBlockedByOverlay ? null : state.targetElementParameters

        if (!state.isInitialized) {
            setDefaultTarget()
            state.currentX = state.targetX
            state.currentY = state.targetY
        }

        state.currentX = tweenNumber(state.currentX, state.targetX, 0.15 * dt, 1)
        state.currentY = tweenNumber(state.currentY, state.targetY, 0.15 * dt, 1)

        const isPositioned =
            Math.abs(state.currentX - state.targetX) <= 0.75 &&
            Math.abs(state.currentY - state.targetY) <= 0.75

        state.stoppedFor = isPositioned
            ? state.stoppedFor + dt / 60
            : 0

        const shouldPreserveCircle = Boolean(params?.preserveCircle)
        const shouldFadeOut = state.stoppedFor > MAX_IDLE_TIME_IN_SECONDS && !params && !shouldPreserveCircle

        let targetScale = MIN_SCALE
        if (params && !shouldPreserveCircle) {
            targetScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) / 2
        }
        if (state.isClicked) {
            targetScale = MAX_SCALE
        }
        if (hidden) {
            targetScale = 0
        }

        let targetOpacity = shouldFadeOut ? 0 : MIN_OPACITY
        if (params && !shouldPreserveCircle) {
            targetOpacity = (MAX_OPACITY - MIN_OPACITY) / 2
        }
        if (state.isClicked) {
            targetOpacity += (MAX_OPACITY - MIN_OPACITY) / 2
        }
        if (hidden) {
            targetOpacity = 0
        }

        state.currentScale = tweenNumber(state.currentScale, targetScale, 0.2, 0.1)
        state.currentOpacity = tweenNumber(state.currentOpacity, targetOpacity, 0.2, 0.025)

        circle.style.transform = `translate3d(${state.currentX - CIRCLE_SIZE_IN_PIXELS / 2}px, ${state.currentY - CIRCLE_SIZE_IN_PIXELS / 2}px, 0) scale(${state.currentScale / 3})`
        circle.style.opacity = state.currentOpacity.toString()
        circle.classList.toggle('mouse-layer-circle-highlight', Boolean(params) && !shouldPreserveCircle)

        const faIcon = params?.faIcon || null
        if (faIcon !== state.currentFaIcon) {
            state.currentFaIcon = faIcon
            icon.className = `mouse-layer-circle-fa-icon ${faIcon ? "" : "mouse-layer-circle-fa-icon-hidden"} ${faIcon || "fa-solid fa-circle"}`
        }

        const nextLabel = params?.dataTooltip === "hidden"
            ? ""
            : (params?.dataTooltip || "")

        if (nextLabel !== state.tooltipLabel) {
            state.tooltipLabel = nextLabel
            tooltip.querySelector("span").innerHTML = nextLabel
            tooltip.classList.toggle("custom-tooltip-hidden", !nextLabel)
        }

        if (nextLabel) {
            const tooltipBounds = tooltip.getBoundingClientRect()
            const targetX = state.currentX - tooltipBounds.width / 2
            const targetY = state.currentY - tooltipBounds.height - (CIRCLE_SIZE_IN_PIXELS * state.currentScale / 3) / 2 - 5
            tooltip.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
        }

        const isScaleSettled = state.currentScale === targetScale
        const isOpacitySettled = state.currentOpacity === targetOpacity
        const isWaitingForIdleFade =
            !hidden &&
            !params &&
            !shouldPreserveCircle &&
            state.stoppedFor <= MAX_IDLE_TIME_IN_SECONDS

        return !isPositioned || !isScaleSettled || !isOpacitySettled || Boolean(nextLabel) || isWaitingForIdleFade
    }
}

function tweenNumber(currentValue, targetValue, multiplier, diffBreakpoint) {
    const diff = targetValue - currentValue
    if (Math.abs(diff) > diffBreakpoint) {
        return currentValue + diff * multiplier
    }

    return targetValue
}

function resolveMouseTargetParameters({ event = null, target = null, constants }) {
    const path = getElementPath(event, target)
    if (!path.length) {
        return null
    }

    // Resolve against ancestor elements instead of the raw event target so nested
    // icons/spans inside one control do not make the cursor flicker between states.
    const explicitTarget = path.find((element) =>
        element.hasAttribute("data-tooltip") || element.hasAttribute("data-cursor-preserve")
    )
    if (explicitTarget) {
        return {
            type: explicitTarget.hasAttribute("data-cursor-preserve") ? "passive" : "custom",
            preserveCircle: explicitTarget.hasAttribute("data-cursor-preserve"),
            dataTooltip: explicitTarget.getAttribute("data-tooltip") || null
        }
    }

    const semanticTarget = path.find((element) => element.matches("button, a"))
    if (semanticTarget) {
        return {
            type: semanticTarget.matches("button") ? "button" : "link",
            dataTooltip: semanticTarget.getAttribute("data-tooltip") || null
        }
    }

    for (const element of path) {
        const trackableTarget = constants.TRACKABLE_CLASSES.find((item) => element.classList.contains(item.name))
        if (trackableTarget) {
            return {
                ...trackableTarget,
                faIcon: trackableTarget.faIcon || trackableTarget.icon || null,
                dataTooltip: element.getAttribute("data-tooltip") || null
            }
        }
    }

    return null
}

function getElementPath(event, target) {
    if (event?.composedPath) {
        return event.composedPath().filter((item) => item instanceof Element)
    }

    const seedTarget = target instanceof Element
        ? target
        : event?.target instanceof Element
            ? event.target
            : null

    if (!seedTarget) {
        return []
    }

    const path = []
    let currentElement = seedTarget
    while (currentElement) {
        path.push(currentElement)
        currentElement = currentElement.parentElement
    }

    return path
}

export default MouseLayer
