import "./PretextInteractiveText.scss"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import {
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

function PretextInteractiveText({
    html,
    className = "",
    replayOnHover = false,
    revealOnScroll = true,
    effectVariant = "wave",
    terrainVariant = "standard",
    typographyVersion = 0
}) {
    const rootRef = useRef(null)
    const contentRef = useRef(null)
    const bodyMeasureRef = useRef(null)
    const paragraphMeasureRef = useRef(null)
    const pointerFrameRef = useRef(null)
    const gravityFrameRef = useRef(null)
    const gravityLastFrameTimeRef = useRef(null)
    const touchGestureRef = useRef(null)
    const touchTapTimeoutRef = useRef(null)
    const pendingPointerRef = useRef(createInactiveInteractionState())
    const pointerStateRef = useRef(createInactiveInteractionState())
    const visibleGraphemesRef = useRef([])
    const contentSizeRef = useRef({ width: 0, height: 0 })
    const lineHeightRef = useRef(0)
    const gravityStatesRef = useRef(new Map())

    const reduceMotion = useReducedMotion()
    const isInView = useInView(rootRef, { amount: 0.3, once: false })

    const [contentWidth, setContentWidth] = useState(0)
    const [typography, setTypography] = useState(null)
    const [pointerState, setPointerState] = useState(createInactiveInteractionState())
    const [burstState, setBurstState] = useState(() => ({
        token: 0,
        ...createInactiveInteractionState()
    }))
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
        return collectVisibleGraphemes(layout.paragraphs, effectiveLineHeight)
    }, [effectiveLineHeight, layout.paragraphs])

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
        if (!element) return

        const observer = new ResizeObserver(entries => {
            const nextWidth = entries[0]?.contentRect?.width || 0
            setContentWidth(Math.max(0, nextWidth))
        })

        observer.observe(element)
        return () => observer.disconnect()
    }, [])

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

            if (touchTapTimeoutRef.current !== null) {
                clearTimeout(touchTapTimeoutRef.current)
                touchTapTimeoutRef.current = null
            }
        }
    }, [])

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

    const handlePointerMove = event => {
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

        if (effectVariant !== "wave") return

        setBurstState(currentBurst => ({
            token: currentBurst.token + 1,
            ...nextInteractionState
        }))
    }

    const handlePointerUp = event => {
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
        if (effectVariant !== "gravitySweep" || reduceMotion) return

        const nextPointer = getRelativePointerPosition(event)
        const tapDistance = getPointerTravelDistance(activeGesture, nextPointer)
        if (activeGesture.moved || tapDistance > TOUCH_TAP_MAX_MOVEMENT) {
            clearTouchTapPointer()
            return
        }

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

                                return (
                                    <AnimatedLine key={`${line.key}-${revealCycle}`}
                                                  line={line}
                                                  lineHeight={effectiveLineHeight}
                                                  lineTop={lineTop}
                                                  lineIndex={globalLineIndex}
                                                  burstState={burstState}
                                                  effectVariant={effectVariant}
                                                  gravityStates={gravityStatesRef.current}
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
    burstState,
    effectVariant,
    gravityStates,
    terrain,
    terrainVariant,
    contentSize,
    pointerState,
    revealCycle,
    reduceMotion
}) {
    const revealReady = revealCycle > 0
    const direction = lineIndex % 2 === 0 ? -1 : 1

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

                const fragmentBody = fragment.graphemes.map((grapheme, graphemeIndex) => {
                    const graphemeKey = `${fragment.key}-g-${graphemeIndex}`

                    if (effectVariant === "gravitySweep") {
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
                    }

                    const positionX = fragmentLeft + grapheme.centerX
                    const positionY = lineTop + lineHeight / 2
                    const motionState = reduceMotion ?
                        { x: 0, y: 0, rotate: 0, scale: 1 } :
                        computeWaveHoverOffset(pointerState, positionX, positionY, terrain, contentSize, terrainVariant)

                    const initialState = reduceMotion || burstState.token === 0 ?
                        false :
                        computeWaveBurstOffset(burstState, positionX, positionY, terrain, contentSize, terrainVariant)

                    return (
                        <motion.span key={`${graphemeKey}-${burstState.token}`}
                                     className={`pretext-interactive-text-grapheme`}
                                     initial={initialState}
                                     animate={motionState}
                                     transition={reduceMotion ? { duration: 0 } : {
                                         type: "spring",
                                         stiffness: Math.max(260, 410 - lineIndex * 9),
                                         damping: 28 + (lineIndex % 3),
                                         mass: 0.2 + (graphemeIndex % 4) * 0.03
                                     }}>
                            {grapheme.text}
                        </motion.span>
                    )
                })

                const commonProps = {
                    className: `pretext-interactive-text-fragment pretext-interactive-text-fragment-${fragment.kind}`,
                    style: fragment.leadingGap > 0 ? { marginLeft: `${fragment.leadingGap}px` } : null
                }

                if (fragment.kind === "link") {
                    return (
                        <a key={fragment.key}
                           href={fragment.href}
                           target={fragment.target}
                           rel={fragment.rel}
                           {...commonProps}>
                            {fragmentBody}
                        </a>
                    )
                }

                return (
                    <span key={fragment.key}
                          {...commonProps}>
                        {fragmentBody}
                    </span>
                )
            })}
        </motion.div>
    )
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
                const fragmentLeft = fragmentOffsetX + fragment.leadingGap
                fragmentOffsetX = fragmentLeft + fragment.width

                fragment.graphemes.forEach((grapheme, graphemeIndex) => {
                    graphemes.push({
                        key: `${fragment.key}-g-${graphemeIndex}`,
                        baselineX: fragmentLeft + grapheme.centerX,
                        baselineY: lineTop + lineHeight / 2,
                        releaseThresholdY: lineTop
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

    visibleGraphemes.forEach(grapheme => {
        if (grapheme.releaseThresholdY < pointerState.y) return

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

    const config = terrainVariant === "detailed" ? {
        radius: 154,
        influenceAmplitude: 0.84,
        lateralAmplitude: 8.5,
        verticalAmplitude: 12,
        slopeAmplitude: 5,
        scaleAmplitude: 0.021,
        rotationAmplitude: 3.4,
        falloffPower: 2.55
    } : {
        radius: 162,
        influenceAmplitude: 0.96,
        lateralAmplitude: 8,
        verticalAmplitude: 12,
        slopeAmplitude: 4.5,
        scaleAmplitude: 0.018,
        rotationAmplitude: 3.1,
        falloffPower: 2.3
    }

    return sampleWaveOffset(pointerState, x, y, terrain, contentSize, config)
}

function computeWaveBurstOffset(burstState, x, y, terrain, contentSize, terrainVariant) {
    if (!burstState.token) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const config = terrainVariant === "detailed" ? {
        radius: 196,
        influenceAmplitude: 1.06,
        lateralAmplitude: 12.5,
        verticalAmplitude: 17,
        slopeAmplitude: 7,
        scaleAmplitude: 0.033,
        rotationAmplitude: 5.2,
        falloffPower: 2.45
    } : {
        radius: 198,
        influenceAmplitude: 1.18,
        lateralAmplitude: 12,
        verticalAmplitude: 16,
        slopeAmplitude: 6,
        scaleAmplitude: 0.03,
        rotationAmplitude: 4.8,
        falloffPower: 2.2
    }

    return sampleWaveOffset(burstState, x, y, terrain, contentSize, config)
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
        y: 0
    }
}

function createActiveInteractionState(position) {
    return {
        active: true,
        x: position.x,
        y: position.y
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
    const offset = getDocumentOffset(element)
    const pageX = event.pageX ?? event.clientX + window.scrollX
    const pageY = event.pageY ?? event.clientY + window.scrollY

    return {
        x: pageX - offset.left,
        y: pageY - offset.top
    }
}

function getDocumentOffset(element) {
    let left = 0
    let top = 0
    let current = element

    while (current) {
        left += current.offsetLeft - current.scrollLeft + current.clientLeft
        top += current.offsetTop - current.scrollTop + current.clientTop
        current = current.offsetParent
    }

    return { left, top }
}

export default PretextInteractiveText
