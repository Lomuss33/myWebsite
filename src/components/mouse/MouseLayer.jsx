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

    useEffect(() => {
        if(typeof window === "undefined" || !active)
            return

        const setDefaultTarget = () => {
            const width = window.innerWidth || 0
            const height = window.innerHeight || 0
            const state = stateRef.current

            if(!state.isInitialized) {
                state.currentX = width * 0.5
                state.currentY = height * 0.38
            }

            state.targetX = width * 0.5
            state.targetY = height * 0.38
            state.isInitialized = true
        }

        const updateTargetFromElement = (element) => {
            stateRef.current.targetElementParameters = _generateMouseTargetParameters(element, constants)
        }

        const handlePointerMove = (event) => {
            const state = stateRef.current
            state.targetX = event.clientX
            state.targetY = event.clientY
            updateTargetFromElement(event.target)
        }

        const handlePointerDown = (event) => {
            if(event.button !== 0)
                return

            stateRef.current.isClicked = true
            updateTargetFromElement(event.target)
        }

        const handlePointerUp = (event) => {
            const state = stateRef.current
            state.isClicked = false
            updateTargetFromElement(event.target)

            if(deferredTargetUpdateRef.current !== null) {
                window.clearTimeout(deferredTargetUpdateRef.current)
            }

            deferredTargetUpdateRef.current = window.setTimeout(() => {
                deferredTargetUpdateRef.current = null

                const hoveredElement = document.elementFromPoint(event.clientX, event.clientY)
                updateTargetFromElement(hoveredElement)
            }, 60)
        }

        const handlePointerLeave = () => {
            stateRef.current.isClicked = false
            stateRef.current.targetElementParameters = null
            setDefaultTarget()
        }

        setDefaultTarget()
        window.addEventListener("pointermove", handlePointerMove, { passive: true })
        window.addEventListener("pointerdown", handlePointerDown, { passive: true })
        window.addEventListener("pointerup", handlePointerUp, { passive: true })
        window.addEventListener("pointerleave", handlePointerLeave, { passive: true })
        window.addEventListener("blur", handlePointerLeave)
        window.addEventListener("resize", setDefaultTarget, { passive: true })

        return () => {
            if(deferredTargetUpdateRef.current !== null) {
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

    useEffect(() => {
        if(typeof window === "undefined" || !active)
            return

        let lastTime = null

        const animate = (timespan) => {
            const dt = lastTime === null ? 1 : Math.max(0.25, Math.min(3, (timespan - lastTime) / 17))
            lastTime = timespan

            _updateVisualState({
                circle: circleRef.current,
                icon: iconRef.current,
                tooltip: tooltipRef.current,
                hidden,
                isBlockedByOverlay,
                dt
            })

            animationFrameIdRef.current = requestAnimationFrame(animate)
        }

        animationFrameIdRef.current = requestAnimationFrame(animate)
        return () => {
            if(animationFrameIdRef.current !== null) {
                cancelAnimationFrame(animationFrameIdRef.current)
                animationFrameIdRef.current = null
            }
        }
    }, [active, hidden, isBlockedByOverlay])

    if(!active) {
        return null
    }

    const hiddenClass = hidden ? `invisible` : ``

    return (
        <div className={`mouse-layer ${hiddenClass}`}>
            <div ref={circleRef}
                 className={`mouse-layer-circle`}
                 id={`mouse-layer-circle`}
                 style={{opacity: 0}}>
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

    function _updateVisualState({ circle, icon, tooltip, hidden, isBlockedByOverlay, dt }) {
        if(!circle || !icon || !tooltip)
            return

        const state = stateRef.current
        const params = isBlockedByOverlay ? null : state.targetElementParameters

        if(!state.isInitialized) {
            const width = window.innerWidth || 0
            const height = window.innerHeight || 0
            state.currentX = width * 0.5
            state.currentY = height * 0.38
            state.targetX = state.currentX
            state.targetY = state.currentY
            state.isInitialized = true
        }

        state.currentX = _tweenNumber(state.currentX, state.targetX, 0.15 * dt, 1)
        state.currentY = _tweenNumber(state.currentY, state.targetY, 0.15 * dt, 1)

        const isPositioned =
            Math.abs(state.currentX - state.targetX) <= 0.75 &&
            Math.abs(state.currentY - state.targetY) <= 0.75

        state.stoppedFor = isPositioned
            ? state.stoppedFor + dt / 60
            : 0

        const shouldPreserveCircle = Boolean(params?.preserveCircle)
        const shouldFadeOut = state.stoppedFor > MAX_IDLE_TIME_IN_SECONDS && !params && !shouldPreserveCircle

        let targetScale = MIN_SCALE
        if(params && !shouldPreserveCircle)
            targetScale = MIN_SCALE + (MAX_SCALE - MIN_SCALE) / 2
        if(state.isClicked)
            targetScale = MAX_SCALE
        if(hidden)
            targetScale = 0

        let targetOpacity = shouldFadeOut ? 0 : MIN_OPACITY
        if(params && !shouldPreserveCircle)
            targetOpacity = (MAX_OPACITY - MIN_OPACITY) / 2
        if(state.isClicked)
            targetOpacity += (MAX_OPACITY - MIN_OPACITY) / 2
        if(hidden)
            targetOpacity = 0

        state.currentScale = _tweenNumber(state.currentScale, targetScale, 0.2, 0.1)
        state.currentOpacity = _tweenNumber(state.currentOpacity, targetOpacity, 0.2, 0.025)

        circle.style.transform = `translate3d(${state.currentX - CIRCLE_SIZE_IN_PIXELS / 2}px, ${state.currentY - CIRCLE_SIZE_IN_PIXELS / 2}px, 0) scale(${state.currentScale / 3})`
        circle.style.opacity = state.currentOpacity.toString()
        circle.classList.toggle('mouse-layer-circle-highlight', Boolean(params) && !shouldPreserveCircle)

        const faIcon = params?.faIcon || null
        if(faIcon !== state.currentFaIcon) {
            state.currentFaIcon = faIcon
            icon.className = `mouse-layer-circle-fa-icon ${faIcon ? "" : "mouse-layer-circle-fa-icon-hidden"} ${faIcon || "fa-solid fa-circle"}`
        }

        const nextLabel = params?.dataTooltip === "hidden"
            ? ""
            : (params?.dataTooltip || "")

        if(nextLabel !== state.tooltipLabel) {
            state.tooltipLabel = nextLabel
            tooltip.querySelector("span").innerHTML = nextLabel
            tooltip.classList.toggle("custom-tooltip-hidden", !nextLabel)
        }

        if(nextLabel) {
            const tooltipBounds = tooltip.getBoundingClientRect()
            const targetX = state.currentX - tooltipBounds.width / 2
            const targetY = state.currentY - tooltipBounds.height - (CIRCLE_SIZE_IN_PIXELS * state.currentScale / 3) / 2 - 5
            tooltip.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
        }
    }
}

function _tweenNumber(currentValue, targetValue, multiplier, diffBreakpoint) {
    const diff = targetValue - currentValue
    if(Math.abs(diff) > diffBreakpoint) {
        return currentValue + diff * multiplier
    }

    return targetValue
}

function _generateMouseTargetParameters(target, constants) {
    if(!(target instanceof Element))
        return null

    let parameters = null
    if(target.getAttribute("data-cursor-preserve"))
        parameters = {type: "passive", preserveCircle: true}
    if(target.matches("a"))
        parameters = {type: "link"}
    if(target.matches("button"))
        parameters = {type: "button"}
    if(target.getAttribute("data-tooltip"))
        parameters = {type: "custom"}

    const trackableTarget = constants.TRACKABLE_CLASSES.find(item => {
        return target.classList.contains(item.name)
    })

    parameters = parameters || trackableTarget
    if(!parameters)
        return null

    return {
        ...parameters,
        dataTooltip: target.getAttribute('data-tooltip') || null
    }
}

export default MouseLayer
