import "./PretextInteractiveText.scss"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import Link from "./Link.jsx"
import {
    getFragmentGraphemes,
    layoutInteractiveParagraphs,
    parseInteractiveHtml,
    readTypographySnapshot
} from "./pretextRichLayout.js"

const MAX_FRAME_DT = 1 / 30
const GRAVITY_ACCELERATION = 1500
const SETTLE_THRESHOLD = 26
const RETURN_RATE = 22
const RETURN_ROTATE_RATE = 18
const RELEASE_DELAY_MAX = 0.022
const TOUCH_TAP_MAX_MOVEMENT = 14
const TOUCH_TAP_HOLD_MS = 900
const TAP_RIPPLE_DURATION_MS = 420
const TAP_RIPPLE_FADE_MS = 420
const TAP_RIPPLE_SPEED_PX_PER_MS = 0.30
const TAP_RIPPLE_BAND_PX = 28
const WAVE_EFFECT_STRENGTH_MULTIPLIER = 2.4
const GRAVITY_RELEASE_ROW_OFFSET = -0.12

function PretextInteractiveText({
    html,
    className = "",
    replayOnHover = false,
    revealOnScroll = true,
    effectVariant = "wave",
    terrainVariant = "standard",
    typographyVersion = 0,
    pointerScopeSelector = null,
    pointerScopeIgnoreX = false,
    gravityZoneMode = "standard"
}) {
    const rootRef = useRef(null)
    const contentRef = useRef(null)
    const bodyMeasureRef = useRef(null)
    const paragraphMeasureRef = useRef(null)
    const pointerFrameRef = useRef(null)
    const gravityFrameRef = useRef(null)
    const gravityLastFrameTimeRef = useRef(null)
    const tapRippleFrameRef = useRef(null)
    const touchGestureRef = useRef(null)
    const touchTapTimeoutRef = useRef(null)
    const pendingPointerRef = useRef(createInactiveInteractionState())
    const pointerStateRef = useRef(createInactiveInteractionState())
    const visibleGraphemesRef = useRef([])
    const contentSizeRef = useRef({ width: 0, height: 0 })
    const lineHeightRef = useRef(0)
    const gravityStatesRef = useRef(new Map())
    const lastGoodWidthRef = useRef(0)

    const reduceMotion = useReducedMotion()
    const isInView = useInView(rootRef, { amount: 0.3, once: false })

    const [contentWidth, setContentWidth] = useState(0)
    const [typography, setTypography] = useState(null)
    const [pointerState, setPointerState] = useState(createInactiveInteractionState())
    const [tapRippleState, setTapRippleState] = useState(createInactiveTapRippleState())
    const [tapRippleNow, setTapRippleNow] = useState(0)
    const [revealCycle, setRevealCycle] = useState(0)
    const [, setFrameVersion] = useState(0)

    const paragraphs = useMemo(() => {
        return parseInteractiveHtml(html)
    }, [html])

    const terrain = useMemo(() => {
        return createWaveProfile(terrainVariant)
    }, [terrainVariant])

    const layout = useMemo(() => {
        return layoutInteractiveParagraphs(paragraphs, typography, contentWidth)
    }, [contentWidth, paragraphs, typography])

    const effectiveLineHeight = typography?.lineHeight || 0
    const contentSize = useMemo(() => {
        return {
            width: contentWidth,
            height: layout.totalHeight
        }
    }, [contentWidth, layout.totalHeight])

    const visibleGraphemes = useMemo(() => {
        if (effectVariant !== "gravitySweep") return []
        return collectVisibleGraphemes(layout.paragraphs, effectiveLineHeight)
    }, [effectVariant, effectiveLineHeight, layout.paragraphs])

    useEffect(() => {
        pointerStateRef.current = pointerState
    }, [pointerState])

    useEffect(() => {
        visibleGraphemesRef.current = visibleGraphemes
    }, [visibleGraphemes])

    useEffect(() => {
        contentSizeRef.current = contentSize
    }, [contentSize])

    useEffect(() => {
        lineHeightRef.current = effectiveLineHeight
    }, [effectiveLineHeight])

    useEffect(() => {
        const refreshTypography = () => {
            setTypography(readTypographySnapshot({
                body: bodyMeasureRef.current,
                paragraph: paragraphMeasureRef.current
            }))
        }

        refreshTypography()

        if (!document.fonts?.ready) return

        let disposed = false
        document.fonts.ready.then(() => {
            if (!disposed) refreshTypography()
        })

        return () => {
            disposed = true
        }
    }, [typographyVersion])

    useEffect(() => {
        const element = contentRef.current
        const rootElement = rootRef.current
        if (!element || !rootElement) return

        const resolveStableWidth = (measuredWidth = 0) => {
            // Prefer layout widths (not affected by transforms during slide transitions).
            const contentWidth =
                element.clientWidth ||
                element.offsetWidth ||
                element.getBoundingClientRect?.().width ||
                0
            const rootWidth =
                rootElement.clientWidth ||
                rootElement.offsetWidth ||
                rootElement.getBoundingClientRect?.().width ||
                0
            const parentWidth =
                rootElement.parentElement?.clientWidth ||
                rootElement.parentElement?.offsetWidth ||
                rootElement.parentElement?.getBoundingClientRect?.().width ||
                0

            const best = Math.max(measuredWidth || 0, contentWidth, rootWidth, parentWidth)
            return best
        }

        let rafHandle = null
        let retryCount = 0
        const MAX_RETRIES = 12
        const MIN_STABLE_WIDTH = 120

        const scheduleWidthRetry = () => {
            if (rafHandle !== null) return
            if (retryCount >= MAX_RETRIES) return

            rafHandle = requestAnimationFrame(() => {
                rafHandle = null
                retryCount += 1
                const nextWidth = resolveStableWidth(0)
                if (nextWidth >= MIN_STABLE_WIDTH) {
                    lastGoodWidthRef.current = nextWidth
                    setContentWidth(nextWidth)
                    return
                }
                scheduleWidthRetry()
            })
        }

        const observer = new ResizeObserver(entries => {
            const measuredWidth = entries[0]?.contentRect?.width || 0
            const nextWidth = resolveStableWidth(measuredWidth)

            if (nextWidth >= MIN_STABLE_WIDTH) {
                lastGoodWidthRef.current = nextWidth
                setContentWidth(Math.max(0, nextWidth))
                return
            }

            // During transitions/layout shifts we can observe a transient tiny width.
            // Retry a few frames until layout stabilizes.
            scheduleWidthRetry()
        })

        observer.observe(element)
        observer.observe(rootElement)
        // On html/lang changes, keep last good width and retry in case layout shifts.
        if (lastGoodWidthRef.current >= MIN_STABLE_WIDTH) {
            setContentWidth(lastGoodWidthRef.current)
        }
        scheduleWidthRetry()

        return () => observer.disconnect()
    }, [html, typographyVersion])

    useEffect(() => {
        if (!revealOnScroll || isInView) {
            setRevealCycle(currentCycle => currentCycle || 1)
        }
    }, [isInView, revealOnScroll])

    useEffect(() => {
        return () => {
            if (pointerFrameRef.current !== null) {
                cancelAnimationFrame(pointerFrameRef.current)
            }

            if (gravityFrameRef.current !== null) {
                cancelAnimationFrame(gravityFrameRef.current)
            }

            if (tapRippleFrameRef.current !== null) {
                cancelAnimationFrame(tapRippleFrameRef.current)
            }

            if (touchTapTimeoutRef.current !== null) {
                clearTimeout(touchTapTimeoutRef.current)
                touchTapTimeoutRef.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (!pointerScopeSelector) return

        const rootElement = rootRef.current
        if (!rootElement) return

        const scopeElement =
            rootElement.closest(pointerScopeSelector) ||
            document.querySelector(pointerScopeSelector)

        if (!scopeElement) return

        const handleWindowPointerMove = event => {
            if (!event || event.pointerType === "touch") return

            const clientX = event.clientX ?? 0
            const clientY = event.clientY ?? 0
            const scopeRect = scopeElement.getBoundingClientRect()
            const rootRect = rootElement.getBoundingClientRect()

            const isWithinScope =
                clientY >= scopeRect.top &&
                clientY <= scopeRect.bottom &&
                (pointerScopeIgnoreX || (clientX >= scopeRect.left && clientX <= scopeRect.right))

            if (!isWithinScope) {
                schedulePointerUpdate(createInactiveInteractionState())
                return
            }

            const withinHitboxX = clientX >= rootRect.left && clientX <= rootRect.right
            const viewportWidth = Math.max(window.innerWidth || 0, 1)
            const normalizedViewportX = clamp(clientX / viewportWidth, 0, 1)
            const isAboveHitbox = clientY < rootRect.top
            const isBelowHitbox = clientY > rootRect.bottom
            const isWithinHitboxY = !isAboveHitbox && !isBelowHitbox
            const withinHitbox = withinHitboxX && isWithinHitboxY

            if (gravityZoneMode === "above_inside_below" && isBelowHitbox) {
                schedulePointerUpdate(createInactiveInteractionState())
                return
            }

            if (gravityZoneMode === "standard" && !isWithinHitboxY) {
                schedulePointerUpdate(createInactiveInteractionState())
                return
            }

            const localY =
                gravityZoneMode === "above_inside_below" && isAboveHitbox ?
                    -Math.max(1, rootRect.height * 0.35) :
                    clientY - rootRect.top
            let localX = normalizedViewportX * rootRect.width
            let intensity = 1
            let mode = "inside"

            if (pointerScopeIgnoreX) {
                if (withinHitboxX) {
                    // When you're actually over the text box, make it feel "right under" the mouse.
                    localX = clamp(clientX - rootRect.left, 0, rootRect.width)
                    intensity = 1.25
                } else {
                    // Outside the hitbox (but still in the same row): anchor to the nearest edge.
                    localX = clientX < rootRect.left ? 0 : rootRect.width
                    intensity = 0.7
                }
            }

            if (gravityZoneMode === "above_inside_below" && isAboveHitbox) {
                mode = "above"
                intensity = Math.max(intensity, 1.1)
            }

            const relative = {
                x: localX,
                y: localY,
                intensity,
                mode
            }

            schedulePointerUpdate(createActiveInteractionState(relative))

            if (effectVariant === "gravitySweep" && !reduceMotion) {
                scheduleGravityLoop()
            }
        }

        window.addEventListener("pointermove", handleWindowPointerMove, { passive: true })
        return () => {
            window.removeEventListener("pointermove", handleWindowPointerMove)
        }
    }, [pointerScopeSelector, pointerScopeIgnoreX, effectVariant, reduceMotion, gravityZoneMode])

    useEffect(() => {
        if (effectVariant !== "gravitySweep" || reduceMotion) {
            cancelGravityLoop(gravityFrameRef, gravityLastFrameTimeRef)
            gravityStatesRef.current.clear()
            return
        }

        cancelGravityLoop(gravityFrameRef, gravityLastFrameTimeRef)
        gravityStatesRef.current.clear()

        visibleGraphemes.forEach(grapheme => {
            ensureGravityState(gravityStatesRef.current, grapheme.key, grapheme.baselineX, grapheme.baselineY, effectiveLineHeight)
        })

        setFrameVersion(currentVersion => currentVersion + 1)
    }, [effectVariant, reduceMotion, html, contentWidth, effectiveLineHeight, layout.totalHeight, revealCycle, visibleGraphemes])

    useEffect(() => {
        if (effectVariant !== "gravitySweep" || reduceMotion) return

        const visibleKeys = new Set(visibleGraphemes.map(grapheme => grapheme.key))
        visibleGraphemes.forEach(grapheme => {
            ensureGravityState(gravityStatesRef.current, grapheme.key, grapheme.baselineX, grapheme.baselineY, effectiveLineHeight)
        })

        for (const [key] of gravityStatesRef.current.entries()) {
            if (!visibleKeys.has(key)) {
                gravityStatesRef.current.delete(key)
            }
        }
    }, [effectVariant, reduceMotion, visibleGraphemes, effectiveLineHeight])

    const stepGravityFrame = currentTime => {
        gravityFrameRef.current = null

        const previousTime = gravityLastFrameTimeRef.current ?? currentTime
        const dt = Math.min((currentTime - previousTime) / 1000, MAX_FRAME_DT)
        gravityLastFrameTimeRef.current = currentTime

        runGravityFrame(
            gravityStatesRef.current,
            visibleGraphemesRef.current,
            pointerStateRef.current,
            contentSizeRef.current,
            lineHeightRef.current,
            dt
        )

        setFrameVersion(currentVersion => currentVersion + 1)

        if (shouldRunGravityLoop(pointerStateRef.current, gravityStatesRef.current)) {
            gravityFrameRef.current = requestAnimationFrame(stepGravityFrame)
            return
        }

        gravityLastFrameTimeRef.current = null
    }

    const scheduleGravityLoop = () => {
        if (effectVariant !== "gravitySweep" || reduceMotion) return
        if (gravityFrameRef.current !== null) return
        gravityFrameRef.current = requestAnimationFrame(stepGravityFrame)
    }

    useEffect(() => {
        if (effectVariant !== "gravitySweep" || reduceMotion) return

        if (shouldRunGravityLoop(pointerState, gravityStatesRef.current)) {
            scheduleGravityLoop()
        }
    }, [effectVariant, reduceMotion, pointerState, visibleGraphemes, contentSize, effectiveLineHeight])

    useEffect(() => {
        if (effectVariant === "wave" && !reduceMotion) return

        stopTapRippleLoop()
        setTapRippleState(currentRipple => {
            return currentRipple.active ?
                createInactiveTapRippleState(currentRipple.token) :
                currentRipple
        })
    }, [effectVariant, reduceMotion])

    const schedulePointerUpdate = nextPointer => {
        pendingPointerRef.current = nextPointer
        pointerStateRef.current = nextPointer

        if (pointerFrameRef.current !== null) return

        pointerFrameRef.current = requestAnimationFrame(() => {
            pointerFrameRef.current = null
            setPointerState(pendingPointerRef.current)
        })
    }

    const clearTouchTapPointer = () => {
        if (touchTapTimeoutRef.current !== null) {
            clearTimeout(touchTapTimeoutRef.current)
            touchTapTimeoutRef.current = null
        }

        schedulePointerUpdate(createInactiveInteractionState())
    }

    const stopTapRippleLoop = () => {
        if (tapRippleFrameRef.current !== null) {
            cancelAnimationFrame(tapRippleFrameRef.current)
            tapRippleFrameRef.current = null
        }
    }

    const startTapRippleLoop = nextRippleState => {
        stopTapRippleLoop()

        setTapRippleNow(nextRippleState.startedAt)

        const stepTapRippleFrame = now => {
            tapRippleFrameRef.current = null
            setTapRippleNow(now)

            if (now - nextRippleState.startedAt >= TAP_RIPPLE_DURATION_MS) {
                setTapRippleState(currentRipple => {
                    return currentRipple.token === nextRippleState.token ?
                        createInactiveTapRippleState(nextRippleState.token) :
                        currentRipple
                })
                return
            }

            tapRippleFrameRef.current = requestAnimationFrame(stepTapRippleFrame)
        }

        tapRippleFrameRef.current = requestAnimationFrame(stepTapRippleFrame)
    }

    const handlePointerMove = event => {
        if (shouldBypassGestureHandling(event)) {
            schedulePointerUpdate(createInactiveInteractionState())
            return
        }

        if (event.pointerType === "touch") {
            const activeGesture = touchGestureRef.current
            if (activeGesture && activeGesture.pointerId === event.pointerId) {
                const nextPointer = getRelativePointerPosition(event)
                activeGesture.lastX = nextPointer.x
                activeGesture.lastY = nextPointer.y
                activeGesture.moved = activeGesture.moved || getPointerTravelDistance(activeGesture, nextPointer) > TOUCH_TAP_MAX_MOVEMENT
            }

            return
        }

        const nextPointer = getRelativePointerPosition(event)
        schedulePointerUpdate(createActiveInteractionState(nextPointer))

        if (effectVariant === "gravitySweep" && !reduceMotion) {
            scheduleGravityLoop()
        }
    }

    const handlePointerLeave = event => {
        if (event.pointerType === "touch") {
            return
        }

        touchGestureRef.current = null

        if (touchTapTimeoutRef.current !== null) {
            clearTimeout(touchTapTimeoutRef.current)
            touchTapTimeoutRef.current = null
        }

        schedulePointerUpdate(createInactiveInteractionState())
    }

    const handlePointerDown = event => {
        if (shouldBypassGestureHandling(event)) {
            return
        }

        if (event.pointerType === "touch") {
            const nextPointer = getRelativePointerPosition(event)

            if (event.currentTarget?.setPointerCapture) {
                try {
                    event.currentTarget.setPointerCapture(event.pointerId)
                } catch {
                    // Ignore capture failures on browsers that reject touch capture here.
                }
            }

            touchGestureRef.current = {
                pointerId: event.pointerId,
                startX: nextPointer.x,
                startY: nextPointer.y,
                lastX: nextPointer.x,
                lastY: nextPointer.y,
                moved: false
            }

            if (effectVariant === "gravitySweep") {
                clearTouchTapPointer()
            }

            return
        }

        const nextPointer = getRelativePointerPosition(event)
        const nextInteractionState = createActiveInteractionState(nextPointer)
        schedulePointerUpdate(nextInteractionState)
    }

    const handlePointerUp = event => {
        if (shouldBypassGestureHandling(event)) {
            return
        }

        if (event.pointerType !== "touch") return

        if (event.currentTarget?.releasePointerCapture) {
            try {
                event.currentTarget.releasePointerCapture(event.pointerId)
            } catch {
                // Ignore capture release failures if the pointer is no longer captured.
            }
        }

        const activeGesture = touchGestureRef.current
        touchGestureRef.current = null

        if (!activeGesture || activeGesture.pointerId !== event.pointerId) return

        const nextPointer = getRelativePointerPosition(event)
        const tapDistance = getPointerTravelDistance(activeGesture, nextPointer)
        if (activeGesture.moved || tapDistance > TOUCH_TAP_MAX_MOVEMENT) {
            clearTouchTapPointer()
            return
        }

        if (effectVariant === "wave") {
            if (reduceMotion) return

            const nextRippleState = {
                active: true,
                x: nextPointer.x,
                y: nextPointer.y,
                startedAt: performance.now(),
                token: tapRippleState.token + 1
            }

            setTapRippleState(nextRippleState)
            startTapRippleLoop(nextRippleState)
            return
        }

        if (effectVariant !== "gravitySweep" || reduceMotion) return

        schedulePointerUpdate(createActiveInteractionState(nextPointer))
        scheduleGravityLoop()

        if (touchTapTimeoutRef.current !== null) {
            clearTimeout(touchTapTimeoutRef.current)
        }

        touchTapTimeoutRef.current = setTimeout(() => {
            touchTapTimeoutRef.current = null
            schedulePointerUpdate(createInactiveInteractionState())
        }, TOUCH_TAP_HOLD_MS)
    }

    const handlePointerCancel = event => {
        if (shouldBypassGestureHandling(event)) {
            return
        }

        if (event.pointerType === "touch") {
            if (event.currentTarget?.releasePointerCapture) {
                try {
                    event.currentTarget.releasePointerCapture(event.pointerId)
                } catch {
                    // Ignore capture release failures if the pointer is no longer captured.
                }
            }

            touchGestureRef.current = null
            clearTouchTapPointer()
        }
    }

    const handlePointerEnter = () => {
        if (!replayOnHover || revealCycle === 0) return
        setRevealCycle(currentCycle => currentCycle + 1)
    }

    let paragraphOffsetY = 0
    let globalLineIndex = -1

    return (
        <div ref={rootRef}
             className={`pretext-interactive-text ${className}`}
             onPointerMove={handlePointerMove}
             onPointerLeave={handlePointerLeave}
             onPointerDown={handlePointerDown}
             onPointerUp={handlePointerUp}
             onPointerCancel={handlePointerCancel}
             onPointerEnter={handlePointerEnter}>
            <div className={`pretext-interactive-text-measure`}
                 aria-hidden={true}>
                <span ref={bodyMeasureRef}
                      className={`pretext-interactive-text-measure-body text-3`}>
                    Ag
                </span>

                <p ref={paragraphMeasureRef}
                   className={`pretext-interactive-text-measure-paragraph text-3`}>
                    Ag
                </p>
            </div>

            <div ref={contentRef}
                 className={`pretext-interactive-text-content`}
                 style={typography ? {
                     minHeight: `${layout.totalHeight}px`,
                     lineHeight: `${typography.lineHeight}px`
                 } : null}>
                {layout.paragraphs.map(paragraph => {
                    const paragraphTop = paragraphOffsetY
                    paragraphOffsetY += paragraph.lines.length * effectiveLineHeight + paragraph.marginBottom

                    return (
                        <div key={paragraph.key}
                             className={`pretext-interactive-text-paragraph`}
                             style={{ marginBottom: `${paragraph.marginBottom}px` }}>
                            {paragraph.lines.map((line, lineIndex) => {
                                globalLineIndex += 1
                                const lineTop = paragraphTop + lineIndex * effectiveLineHeight
                                const lineRenderKey = `${paragraph.key}-${line.key}-${lineIndex}-${revealCycle}`

                                return (
                                    <AnimatedLine key={lineRenderKey}
                                                  line={line}
                                                  lineHeight={effectiveLineHeight}
                                                  lineTop={lineTop}
                                                  lineIndex={globalLineIndex}
                                                  effectVariant={effectVariant}
                                                  gravityStates={gravityStatesRef.current}
                                                  tapRippleNow={tapRippleNow}
                                                  tapRippleState={tapRippleState}
                                                  terrain={terrain}
                                                  terrainVariant={terrainVariant}
                                                  contentSize={contentSize}
                                                  pointerState={pointerState}
                                                  revealCycle={revealCycle}
                                                  reduceMotion={reduceMotion}/>
                            )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

function AnimatedLine({
    line,
    lineHeight,
    lineTop,
    lineIndex,
    effectVariant,
    gravityStates,
    tapRippleNow,
    tapRippleState,
    terrain,
    terrainVariant,
    contentSize,
    pointerState,
    revealCycle,
    reduceMotion
}) {
    const revealReady = revealCycle > 0
    const direction = lineIndex % 2 === 0 ? -1 : 1
    // Desktop/mouse hover should stay on coarse pretext fragments for performance.
    // Touch/pointer tapping should stay a simple short fragment animation.
    const isWaveHovering =
        effectVariant === "wave" &&
        !reduceMotion &&
        pointerState.active

    let fragmentOffsetX = 0

    return (
        <motion.div className={`pretext-interactive-text-line`}
                    style={{ height: `${lineHeight}px` }}
                    initial={reduceMotion || !revealReady ? false : {
                        opacity: 0,
                        x: direction * 18,
                        y: 12 + (lineIndex % 3) * 4,
                        rotate: direction * 1.5,
                        filter: "blur(5px)"
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        filter: "blur(0px)"
                    }}
                    transition={reduceMotion ? { duration: 0 } : {
                        delay: lineIndex * 0.055,
                        duration: 0.5 + (lineIndex % 4) * 0.03,
                        ease: [0.16, 1, 0.3, 1]
                    }}>
            {line.fragments.map(fragment => {
                const fragmentLeft = fragmentOffsetX + fragment.leadingGap
                fragmentOffsetX = fragmentLeft + fragment.width

                const commonProps = {
                    className: `pretext-interactive-text-fragment pretext-interactive-text-fragment-${fragment.kind}`
                }
                if (effectVariant === "wave") {
                    const waveSamplePoint = resolveWaveSamplePoint(
                        pointerState,
                        tapRippleState,
                        fragmentLeft,
                        lineTop,
                        fragment.width,
                        lineHeight
                    )
                    const fragmentMotionState = combineWaveOffsets(
                        isWaveHovering ?
                            computeWaveHoverOffset(
                                pointerState,
                                waveSamplePoint.x,
                                waveSamplePoint.y,
                                terrain,
                                contentSize,
                                terrainVariant
                            ) :
                            { x: 0, y: 0, rotate: 0, scale: 1 },
                        computeWaveTapRippleOffset(
                            tapRippleState,
                            tapRippleNow,
                            waveSamplePoint.x,
                            waveSamplePoint.y,
                            terrain,
                            contentSize,
                            terrainVariant
                        )
                    )
                    const fragmentTransition = reduceMotion ? { duration: 0 } : {
                        type: "spring",
                        stiffness: Math.max(220, 340 - lineIndex * 8),
                        damping: 26 + (lineIndex % 3),
                        mass: 0.34
                    }
                    const spaceMotionProps = {
                        animate: fragmentMotionState,
                        transition: fragmentTransition
                    }

                if (fragment.kind === "link") {
                    if (isInternalPretextHref(fragment.href)) {
                        const fragmentElement = (
                            <Link key={fragment.key}
                                  href={fragment.href}
                                  className={commonProps.className}>
                                {fragment.text}
                            </Link>
                        )

                        return renderFragmentWithLeadingSpace(fragment, fragmentElement)
                    }

                    const fragmentElement = (
                        <motion.a key={fragment.key}
                                  href={fragment.href}
                                  target={fragment.target}
                                  rel={fragment.rel}
                                  {...commonProps}
                                  animate={fragmentMotionState}
                                  transition={fragmentTransition}>
                                {fragment.text}
                            </motion.a>
                        )

                        return renderFragmentWithLeadingSpace(fragment, fragmentElement, "wave", spaceMotionProps)
                    }

                    const fragmentElement = (
                        <motion.span key={fragment.key}
                                     {...commonProps}
                                     animate={fragmentMotionState}
                                     transition={fragmentTransition}>
                            {fragment.text}
                        </motion.span>
                    )

                    return renderFragmentWithLeadingSpace(fragment, fragmentElement, "wave", spaceMotionProps)
                }

                if (fragment.kind === "link") {
                    if (isInternalPretextHref(fragment.href)) {
                        const fragmentElement = (
                            <Link key={fragment.key}
                                  href={fragment.href}
                                  className={commonProps.className}>
                                {fragment.text}
                            </Link>
                        )

                        return renderFragmentWithLeadingSpace(fragment, fragmentElement)
                    }

                    const fragmentElement = (
                        <a key={fragment.key}
                           href={fragment.href}
                           target={fragment.target}
                           rel={fragment.rel}
                           {...commonProps}>
                            {fragment.text}
                        </a>
                    )

                    return renderFragmentWithLeadingSpace(fragment, fragmentElement)
                }

                const fragmentBody = getFragmentGraphemes(fragment).map((grapheme, graphemeIndex) => {
                    const graphemeKey = `${fragment.key}-g-${graphemeIndex}`
                    const gravityState = gravityStates.get(graphemeKey)
                    const gravityStyle = reduceMotion || !gravityState ?
                        undefined :
                        {
                            transform: `translate3d(${gravityState.x}px, ${gravityState.y}px, 0) rotate(${gravityState.rotate}deg)`
                        }

                    return (
                        <span key={graphemeKey}
                              className={`pretext-interactive-text-grapheme`}
                              style={gravityStyle}>
                            {grapheme.text}
                        </span>
                    )
                })

                const fragmentElement = (
                    <span key={fragment.key}
                          {...commonProps}>
                        {fragmentBody}
                    </span>
                )

                return renderFragmentWithLeadingSpace(fragment, fragmentElement)
            })}
        </motion.div>
    )
}

function renderFragmentWithLeadingSpace(fragment, fragmentElement, mode = "default", motionProps = null) {
    if (fragment.leadingGap <= 0) return fragmentElement

    const spaceKey = `${fragment.key}-space`
    const spaceClassName = `pretext-interactive-text-space`
    const spaceText = " "

    if (mode === "wave" && motionProps) {
        return [
            <motion.span key={spaceKey}
                         className={spaceClassName}
                         animate={motionProps.animate}
                         transition={motionProps.transition}>
                {spaceText}
            </motion.span>,
            fragmentElement
        ]
    }

    return [
        <span key={spaceKey}
              className={spaceClassName}>
            {spaceText}
        </span>,
        fragmentElement
    ]
}

function collectVisibleGraphemes(paragraphs, lineHeight) {
    if (!lineHeight) return []

    const graphemes = []
    let paragraphOffsetY = 0

    paragraphs.forEach(paragraph => {
        const paragraphTop = paragraphOffsetY
        paragraphOffsetY += paragraph.lines.length * lineHeight + paragraph.marginBottom

        paragraph.lines.forEach((line, lineIndex) => {
            const lineTop = paragraphTop + lineIndex * lineHeight
            let fragmentOffsetX = 0

            line.fragments.forEach(fragment => {
                if (fragment.locked) {
                    fragmentOffsetX = fragmentOffsetX + fragment.leadingGap + fragment.width
                    return
                }

                const fragmentLeft = fragmentOffsetX + fragment.leadingGap
                fragmentOffsetX = fragmentLeft + fragment.width
                const fragmentGraphemes = getFragmentGraphemes(fragment)

                fragmentGraphemes.forEach((grapheme, graphemeIndex) => {
                    graphemes.push({
                        key: `${fragment.key}-g-${graphemeIndex}`,
                        baselineX: fragmentLeft + grapheme.centerX,
                        baselineY: lineTop + lineHeight / 2,
                        // Release slightly above the visual row so the fall starts before the
                        // cursor reaches the lower half of the line.
                        releaseThresholdY: lineTop + lineHeight * GRAVITY_RELEASE_ROW_OFFSET
                    })
                })
            })
        })
    })

    return graphemes
}

function ensureGravityState(gravityStates, graphemeKey, baselineX, baselineY, lineHeight) {
    const existingState = gravityStates.get(graphemeKey)
    if (existingState) {
        existingState.baselineX = baselineX
        existingState.baselineY = baselineY
        existingState.column = getGravityColumnIndex(baselineX, lineHeight)
        return existingState
    }

    const nextState = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        rotate: 0,
        angularVelocity: 0,
        released: false,
        settled: true,
        column: getGravityColumnIndex(baselineX, lineHeight),
        landingY: baselineY,
        baselineX,
        baselineY,
        targetX: hashToSignedRange(graphemeKey, "landing-x", 1.5),
        targetRotate: hashToSignedRange(graphemeKey, "landing-rotate", 8),
        gravityScale: 0.94 + hashStringToUnitFloat(graphemeKey, "gravity-scale") * 0.14,
        bounceFactor: 0.18 + hashStringToUnitFloat(graphemeKey, "bounce-factor") * 0.1,
        releaseDelay: hashStringToUnitFloat(graphemeKey, "release-delay") * RELEASE_DELAY_MAX,
        releaseElapsed: 0
    }

    gravityStates.set(graphemeKey, nextState)
    return nextState
}

function runGravityFrame(gravityStates, visibleGraphemes, pointerState, contentSize, lineHeight, dt) {
    if (!lineHeight || visibleGraphemes.length === 0) return

    const releasedColumns = buildGravityColumns(visibleGraphemes, pointerState, contentSize, lineHeight)

    visibleGraphemes.forEach(grapheme => {
        const gravityState = ensureGravityState(gravityStates, grapheme.key, grapheme.baselineX, grapheme.baselineY, lineHeight)
        const releasedData = releasedColumns.get(grapheme.key)

        gravityState.baselineX = grapheme.baselineX
        gravityState.baselineY = grapheme.baselineY

        if (releasedData) {
            if (!gravityState.released) {
                gravityState.released = true
                gravityState.settled = false
                gravityState.releaseElapsed = 0
                gravityState.vy = 0
                gravityState.angularVelocity = hashToSignedRange(grapheme.key, "release-spin", 18)
            }

            gravityState.column = releasedData.column
            gravityState.landingY = releasedData.landingY
            gravityState.targetX = releasedData.targetX
            gravityState.targetRotate = releasedData.targetRotate
            gravityState.releaseElapsed += dt

            if (gravityState.releaseElapsed < gravityState.releaseDelay) {
                gravityState.x += (gravityState.targetX - gravityState.x) * Math.min(1, 8 * dt)
                gravityState.rotate += (0 - gravityState.rotate) * Math.min(1, 10 * dt)
                return
            }

            gravityState.settled = false
            gravityState.x += (gravityState.targetX - gravityState.x) * Math.min(1, 10 * dt)
            gravityState.vy += GRAVITY_ACCELERATION * gravityState.gravityScale * dt
            gravityState.y += gravityState.vy * dt
            gravityState.rotate += gravityState.angularVelocity * dt
            gravityState.angularVelocity *= 0.985

            const landingOffsetY = gravityState.landingY - gravityState.baselineY
            if (gravityState.y >= landingOffsetY) {
                gravityState.y = landingOffsetY

                if (Math.abs(gravityState.vy) > SETTLE_THRESHOLD) {
                    gravityState.vy = -gravityState.vy * gravityState.bounceFactor
                    gravityState.angularVelocity *= 0.65
                    return
                }

                gravityState.vy = 0
                gravityState.settled = true
                gravityState.angularVelocity = 0
                gravityState.x += (gravityState.targetX - gravityState.x) * Math.min(1, 12 * dt)
                gravityState.rotate += (gravityState.targetRotate - gravityState.rotate) * Math.min(1, 12 * dt)

                if (
                    Math.abs(gravityState.x - gravityState.targetX) < 0.2 &&
                    Math.abs(gravityState.rotate - gravityState.targetRotate) < 0.2
                ) {
                    gravityState.x = gravityState.targetX
                    gravityState.rotate = gravityState.targetRotate
                }
            }

            return
        }

        gravityState.released = false
        gravityState.settled = false
        gravityState.vx = 0
        gravityState.vy = 0
        gravityState.angularVelocity = 0
        gravityState.releaseElapsed = 0

        gravityState.x += (0 - gravityState.x) * RETURN_RATE * dt
        gravityState.y += (0 - gravityState.y) * RETURN_RATE * dt
        gravityState.rotate += (0 - gravityState.rotate) * RETURN_ROTATE_RATE * dt

        if (
            Math.abs(gravityState.x) < 0.4 &&
            Math.abs(gravityState.y) < 0.4 &&
            Math.abs(gravityState.rotate) < 0.35
        ) {
            gravityState.x = 0
            gravityState.y = 0
            gravityState.rotate = 0
            gravityState.settled = true
        }
    })
}

function buildGravityColumns(visibleGraphemes, pointerState, contentSize, lineHeight) {
    const releasedByColumn = new Map()
    const releasedLookup = new Map()

    if (!pointerState.active) return releasedLookup

    const releaseEntireText = pointerState.mode === "above"
    const releaseCutoffY = releaseEntireText ? Number.NEGATIVE_INFINITY : pointerState.y

    visibleGraphemes.forEach(grapheme => {
        if (grapheme.releaseThresholdY < releaseCutoffY) return

        const column = getGravityColumnIndex(grapheme.baselineX, lineHeight)
        if (!releasedByColumn.has(column)) {
            releasedByColumn.set(column, [])
        }

        releasedByColumn.get(column).push({
            ...grapheme,
            column
        })
    })

    const contentHeight = Math.max(contentSize?.height || lineHeight, lineHeight)
    const floorBaseY = contentHeight - lineHeight * 0.35
    const stackStep = lineHeight * 0.34
    const columnWidth = clamp(lineHeight * 0.58, 12, 16)

    for (const [column, graphemes] of releasedByColumn.entries()) {
        graphemes.sort((first, second) => {
            if (second.baselineY !== first.baselineY) {
                return second.baselineY - first.baselineY
            }

            return first.key.localeCompare(second.key)
        })

        const averageBaselineX = graphemes.reduce((total, grapheme) => {
            return total + grapheme.baselineX
        }, 0) / graphemes.length

        const columnCenterX = column * columnWidth + columnWidth / 2
        const columnAnchorX = clamp(
            averageBaselineX * 0.82 + columnCenterX * 0.18,
            column * columnWidth,
            (column + 1) * columnWidth
        )

        graphemes.forEach((grapheme, index) => {
            const compressedDepth = getCompressedStackDepth(index, stackStep, lineHeight)
            const landingY = floorBaseY - compressedDepth + hashToSignedRange(grapheme.key, "landing-y", 0.45)

            releasedLookup.set(grapheme.key, {
                column,
                landingY,
                targetX: (columnAnchorX - grapheme.baselineX) + hashToSignedRange(grapheme.key, "landing-x", 0.18),
                targetRotate: hashToSignedRange(grapheme.key, "landing-rotate", 3)
            })
        })
    }

    return releasedLookup
}

function getGravityColumnIndex(baselineX, lineHeight) {
    const columnWidth = clamp(lineHeight * 0.58, 12, 16)
    return Math.floor(baselineX / columnWidth)
}

function getCompressedStackDepth(index, baseStep, lineHeight) {
    let depth = 0

    for (let stackIndex = 0; stackIndex < index; stackIndex++) {
        const compression = 1 / (1 + stackIndex * 0.14)
        depth += Math.max(lineHeight * 0.13, baseStep * compression)
    }

    return depth
}

function hashToSignedRange(value, salt, magnitude) {
    return (hashStringToUnitFloat(value, salt) - 0.5) * magnitude * 2
}

function shouldRunGravityLoop(pointerState, gravityStates) {
    if (pointerState.active) {
        return true
    }

    for (const gravityState of gravityStates.values()) {
        if (Math.abs(gravityState.x) > 0.4 || Math.abs(gravityState.y) > 0.4 || Math.abs(gravityState.rotate) > 0.35) {
            return true
        }

        if (Math.abs(gravityState.vy) > 1 || Math.abs(gravityState.angularVelocity) > 1) {
            return true
        }
    }

    return false
}

function getPointerTravelDistance(gestureState, pointerPosition) {
    const dx = pointerPosition.x - gestureState.startX
    const dy = pointerPosition.y - gestureState.startY
    return Math.hypot(dx, dy)
}

function cancelGravityLoop(gravityFrameRef, gravityLastFrameTimeRef) {
    if (gravityFrameRef.current !== null) {
        cancelAnimationFrame(gravityFrameRef.current)
        gravityFrameRef.current = null
    }

    gravityLastFrameTimeRef.current = null
}

function computeWaveHoverOffset(pointerState, x, y, terrain, contentSize, terrainVariant) {
    if (!pointerState.active) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const intensity = clamp(pointerState.intensity ?? 1, 0.2, 2)

    const config = terrainVariant === "detailed" ? {
        radius: 140,
        influenceAmplitude: 0.62 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        lateralAmplitude: 5.2 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        verticalAmplitude: 7.4 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        slopeAmplitude: 3.2 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        scaleAmplitude: 0.012 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        rotationAmplitude: 2.1 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        falloffPower: 2.7
    } : {
        radius: 162,
        influenceAmplitude: 0.96 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        lateralAmplitude: 8 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        verticalAmplitude: 12 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        slopeAmplitude: 4.5 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        scaleAmplitude: 0.018 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        rotationAmplitude: 3.1 * WAVE_EFFECT_STRENGTH_MULTIPLIER * intensity,
        falloffPower: 2.3
    }

    return sampleWaveOffset(pointerState, x, y, terrain, contentSize, config)
}

function computeWaveTapRippleOffset(tapRippleState, now, x, y, terrain, contentSize, terrainVariant) {
    if (!tapRippleState.active || now <= tapRippleState.startedAt) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const age = now - tapRippleState.startedAt
    if (age >= TAP_RIPPLE_DURATION_MS) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const progress = clamp(age / TAP_RIPPLE_DURATION_MS, 0, 1)
    const decay = 1 - clamp(age / TAP_RIPPLE_FADE_MS, 0, 1)
    const waveFront = age * TAP_RIPPLE_SPEED_PX_PER_MS
    const distance = Math.hypot(x - tapRippleState.x, y - tapRippleState.y)
    const ringInfluence = Math.exp(-((distance - waveFront) ** 2) / (2 * TAP_RIPPLE_BAND_PX ** 2))
    const influence = ringInfluence * decay

    if (influence < 0.0008) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const config = terrainVariant === "detailed" ? {
        lateralAmplitude: 9 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        verticalAmplitude: 12 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        slopeAmplitude: 5.5 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        scaleAmplitude: 0.022 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        rotationAmplitude: 3.8 * WAVE_EFFECT_STRENGTH_MULTIPLIER
    } : {
        lateralAmplitude: 8.2 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        verticalAmplitude: 10.4 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        slopeAmplitude: 5 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        scaleAmplitude: 0.019 * WAVE_EFFECT_STRENGTH_MULTIPLIER,
        rotationAmplitude: 3.4 * WAVE_EFFECT_STRENGTH_MULTIPLIER
    }

    const normalizedPoint = normalizeTerrainPoint(x, y, contentSize)
    const elevation = sampleWaveHeight(normalizedPoint.x, normalizedPoint.y, terrain)
    const gradient = sampleWaveGradient(normalizedPoint.x, normalizedPoint.y, terrain)
    const troughPull = elevation < 0 ? Math.abs(elevation) : 0
    const xOffset = (gradient.x * config.lateralAmplitude - troughPull * gradient.x * 2.4) * influence
    const yOffset = (-elevation * config.verticalAmplitude - gradient.y * config.slopeAmplitude) * influence

    return {
        x: xOffset,
        y: yOffset,
        rotate: clamp((gradient.x * 0.8 - gradient.y * 0.5 - elevation * 0.35) * config.rotationAmplitude * influence, -6, 6),
        scale: 1 + elevation * config.scaleAmplitude * influence * (1 - progress * 0.2)
    }
}

function combineWaveOffsets(hoverOffset, tapRippleOffset) {
    return {
        x: hoverOffset.x + tapRippleOffset.x,
        y: hoverOffset.y + tapRippleOffset.y,
        rotate: clamp(hoverOffset.rotate + tapRippleOffset.rotate, -6, 6),
        scale: clamp(hoverOffset.scale + tapRippleOffset.scale - 1, 0.94, 1.08)
    }
}

function resolveWaveSamplePoint(pointerState, tapRippleState, left, top, width, height) {
    if (pointerState.active) {
        return {
            x: clamp(pointerState.x, left, left + width),
            y: clamp(pointerState.y, top, top + height)
        }
    }

    if (tapRippleState.active) {
        return {
            x: clamp(tapRippleState.x, left, left + width),
            y: clamp(tapRippleState.y, top, top + height)
        }
    }

    return {
        x: left + width / 2,
        y: top + height / 2
    }
}

function sampleWaveOffset(interactionState, x, y, terrain, contentSize, config) {
    const dx = x - interactionState.x
    const dy = y - interactionState.y
    const distance = Math.hypot(dx, dy)
    const radius = config.radius

    if (distance > radius) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const distanceRatio = Math.min(distance / radius, 1)
    const influence = (1 - distanceRatio) ** config.falloffPower * config.influenceAmplitude

    const normalizedPoint = normalizeTerrainPoint(x, y, contentSize)
    const elevation = sampleWaveHeight(normalizedPoint.x, normalizedPoint.y, terrain)
    const gradient = sampleWaveGradient(normalizedPoint.x, normalizedPoint.y, terrain)

    const troughPull = elevation < 0 ? Math.abs(elevation) : 0
    const xOffset = (gradient.x * config.lateralAmplitude - troughPull * gradient.x * 2.4) * influence
    const yOffset = (-elevation * config.verticalAmplitude - gradient.y * config.slopeAmplitude) * influence

    return {
        x: xOffset,
        y: yOffset,
        rotate: clamp((gradient.x * 0.8 - gradient.y * 0.5 - elevation * 0.35) * config.rotationAmplitude * influence, -6, 6),
        scale: 1 + elevation * config.scaleAmplitude * influence
    }
}

function sampleWaveGradient(x, y, terrain) {
    const epsilon = 0.035

    return {
        x: (sampleWaveHeight(x + epsilon, y, terrain) - sampleWaveHeight(x - epsilon, y, terrain)) / (epsilon * 2),
        y: (sampleWaveHeight(x, y + epsilon, terrain) - sampleWaveHeight(x, y - epsilon, terrain)) / (epsilon * 2)
    }
}

function sampleWaveHeight(x, y, terrain) {
    const primary = terrain.waves.reduce((total, wave) => {
        const projection = x * wave.dirX + y * wave.dirY
        return total + Math.sin(projection * wave.frequency + wave.phase) * wave.amplitude
    }, 0)

    const cross =
        Math.cos((x * terrain.crossDirX + y * terrain.crossDirY) * terrain.crossFrequency + terrain.crossPhase) *
        terrain.crossAmplitude

    const radialDistance = Math.hypot(x - terrain.rippleX, y - terrain.rippleY)
    const ripple =
        Math.sin(radialDistance * terrain.rippleFrequency - terrain.ripplePhase) *
        Math.exp(-(radialDistance ** 2) / (2 * terrain.rippleDecay ** 2)) *
        terrain.rippleAmplitude

    return primary + cross + ripple
}

function normalizeTerrainPoint(x, y, contentSize) {
    const width = Math.max(contentSize?.width || 1, 1)
    const height = Math.max(contentSize?.height || 1, 1)
    const scale = Math.max(width, height)

    return {
        x: ((x - width / 2) / scale) * 2,
        y: ((y - height / 2) / scale) * 2
    }
}

function createInactiveInteractionState() {
    return {
        active: false,
        x: 0,
        y: 0,
        intensity: 1,
        mode: "inside"
    }
}

function createInactiveTapRippleState(token = 0) {
    return {
        active: false,
        x: 0,
        y: 0,
        startedAt: 0,
        token
    }
}

function createActiveInteractionState(position) {
    return {
        active: true,
        x: position.x,
        y: position.y,
        intensity: clamp(position.intensity ?? 1, 0.2, 2),
        mode: position.mode || "inside"
    }
}

function createWaveProfile(variant = "standard") {
    const random = createPrng(Math.random() * 1000000)

    if (variant === "detailed") {
        return {
            waves: Array.from({ length: 3 }, () => {
                const angle = random() * Math.PI
                return {
                    dirX: Math.cos(angle),
                    dirY: Math.sin(angle),
                    frequency: 4.8 + random() * 2.2,
                    phase: random() * Math.PI * 2,
                    amplitude: 0.06 + random() * 0.03
                }
            }),
            crossDirX: Math.cos(0.8 + random() * 0.6),
            crossDirY: Math.sin(0.8 + random() * 0.6),
            crossFrequency: 5.2 + random() * 1.7,
            crossPhase: random() * Math.PI * 2,
            crossAmplitude: 0.038 + random() * 0.018,
            rippleX: -0.2 + random() * 0.4,
            rippleY: -0.2 + random() * 0.4,
            rippleFrequency: 9 + random() * 2.4,
            ripplePhase: random() * Math.PI * 2,
            rippleDecay: 1.05 + random() * 0.2,
            rippleAmplitude: 0.03 + random() * 0.014
        }
    }

    return {
        waves: Array.from({ length: 2 }, () => {
            const angle = random() * Math.PI
            return {
                dirX: Math.cos(angle),
                dirY: Math.sin(angle),
                frequency: 3.1 + random() * 1.3,
                phase: random() * Math.PI * 2,
                amplitude: 0.055 + random() * 0.025
            }
        }),
        crossDirX: Math.cos(0.5 + random() * 0.5),
        crossDirY: Math.sin(0.5 + random() * 0.5),
        crossFrequency: 3.7 + random() * 1,
        crossPhase: random() * Math.PI * 2,
        crossAmplitude: 0.03 + random() * 0.012,
        rippleX: -0.15 + random() * 0.3,
        rippleY: -0.15 + random() * 0.3,
        rippleFrequency: 6.4 + random() * 1.4,
        ripplePhase: random() * Math.PI * 2,
        rippleDecay: 1.15 + random() * 0.16,
        rippleAmplitude: 0.022 + random() * 0.01
    }
}

function shouldBypassGestureHandling(event) {
    const target = event?.target
    if (!(target instanceof Element)) return false

    return Boolean(target.closest("a[href], button, [role='button']"))
}

function isInternalPretextHref(href) {
    return typeof href === "string" && href.startsWith("#")
}

function hashStringToUnitFloat(value, salt) {
    const input = `${salt}:${value}`
    let hash = 2166136261

    for (let index = 0; index < input.length; index++) {
        hash ^= input.charCodeAt(index)
        hash = Math.imul(hash, 16777619)
    }

    return (hash >>> 0) / 4294967295
}

function createPrng(seed) {
    let state = Math.floor(seed) || 1

    return () => {
        state = (state * 1664525 + 1013904223) % 4294967296
        return state / 4294967296
    }
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value))
}

function getRelativePointerPosition(event) {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const clientX = event.clientX ?? 0
    const clientY = event.clientY ?? 0

    // X should not depend on the element's horizontal position.
    // Map viewport X proportionally into the element's local width.
    const viewportWidth = Math.max(window.innerWidth || 0, 1)
    const normalizedViewportX = clamp(clientX / viewportWidth, 0, 1)

    return {
        x: normalizedViewportX * rect.width,
        y: clientY - rect.top
    }
}

export default PretextInteractiveText
