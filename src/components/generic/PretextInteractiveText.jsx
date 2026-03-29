import "./PretextInteractiveText.scss"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import {
    layoutInteractiveParagraphs,
    parseInteractiveHtml,
    readTypographySnapshot
} from "./pretextRichLayout.js"

function PretextInteractiveText({
    html,
    className = "",
    replayOnHover = false,
    revealOnScroll = true,
    terrainVariant = "standard"
}) {
    const rootRef = useRef(null)
    const contentRef = useRef(null)
    const bodyMeasureRef = useRef(null)
    const paragraphMeasureRef = useRef(null)
    const pointerFrameRef = useRef(null)
    const pendingPointerRef = useRef(createInactiveInteractionState())

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

    const paragraphs = useMemo(() => {
        return parseInteractiveHtml(html)
    }, [html])

    const terrain = useMemo(() => {
        return createWaveProfile(terrainVariant)
    }, [terrainVariant])

    const layout = useMemo(() => {
        return layoutInteractiveParagraphs(paragraphs, typography, contentWidth)
    }, [contentWidth, paragraphs, typography])

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
    }, [])

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
        }
    }, [])

    const schedulePointerUpdate = nextPointer => {
        pendingPointerRef.current = nextPointer

        if (pointerFrameRef.current !== null) return

        pointerFrameRef.current = requestAnimationFrame(() => {
            pointerFrameRef.current = null
            setPointerState(pendingPointerRef.current)
        })
    }

    const handlePointerMove = event => {
        const nextPointer = getRelativePointerPosition(event)
        schedulePointerUpdate(createActiveInteractionState(nextPointer))
    }

    const handlePointerLeave = () => {
        schedulePointerUpdate(createInactiveInteractionState())
    }

    const handlePointerDown = event => {
        const nextPointer = getRelativePointerPosition(event)
        const nextInteractionState = createActiveInteractionState(nextPointer)
        schedulePointerUpdate(nextInteractionState)
        setBurstState(currentBurst => ({
            token: currentBurst.token + 1,
            ...nextInteractionState
        }))
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
                    paragraphOffsetY += paragraph.lines.length * (typography?.lineHeight || 0) + paragraph.marginBottom

                    return (
                        <div key={paragraph.key}
                             className={`pretext-interactive-text-paragraph`}
                             style={{ marginBottom: `${paragraph.marginBottom}px` }}>
                            {paragraph.lines.map((line, lineIndex) => {
                                globalLineIndex += 1
                                const lineTop = paragraphTop + lineIndex * (typography?.lineHeight || 0)

                                return (
                                    <AnimatedLine key={`${line.key}-${revealCycle}`}
                                                  line={line}
                                                  lineHeight={typography?.lineHeight || 0}
                                                  lineTop={lineTop}
                                                  lineIndex={globalLineIndex}
                                                  burstState={burstState}
                                                  terrain={terrain}
                                                  terrainVariant={terrainVariant}
                                                  contentSize={{
                                                      width: contentWidth,
                                                      height: layout.totalHeight
                                                  }}
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
                    const positionX = fragmentLeft + grapheme.centerX
                    const positionY = lineTop + lineHeight / 2
                    const hoverOffset = reduceMotion ?
                        { x: 0, y: 0, rotate: 0, scale: 1 } :
                        computeHoverOffset(pointerState, positionX, positionY, terrain, contentSize, terrainVariant)

                    const burstOffset = reduceMotion ?
                        { x: 0, y: 0, rotate: 0, scale: 1 } :
                        computeBurstOffset(burstState, positionX, positionY, terrain, contentSize, terrainVariant)

                    return (
                        <motion.span key={`${fragment.key}-g-${graphemeIndex}-${burstState.token}`}
                                     className={`pretext-interactive-text-grapheme`}
                                     initial={reduceMotion || burstState.token === 0 ? false : burstOffset}
                                     animate={hoverOffset}
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

function computeHoverOffset(pointerState, x, y, terrain, contentSize, terrainVariant) {
    if (!pointerState.active) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const config = terrainVariant === "detailed" ? {
        radius: 156,
        influenceAmplitude: 0.72,
        lateralAmplitude: 7,
        verticalAmplitude: 10,
        slopeAmplitude: 4,
        scaleAmplitude: 0.018,
        rotationAmplitude: 3
    } : {
        radius: 148,
        influenceAmplitude: 0.62,
        lateralAmplitude: 5.5,
        verticalAmplitude: 8,
        slopeAmplitude: 3.2,
        scaleAmplitude: 0.012,
        rotationAmplitude: 2.2
    }

    return sampleTerrainOffset(pointerState, x, y, terrain, contentSize, {
        ...config
    })
}

function computeBurstOffset(burstState, x, y, terrain, contentSize, terrainVariant) {
    if (!burstState.token) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const config = terrainVariant === "detailed" ? {
        radius: 198,
        influenceAmplitude: 0.95,
        lateralAmplitude: 11,
        verticalAmplitude: 15,
        slopeAmplitude: 6,
        scaleAmplitude: 0.028,
        rotationAmplitude: 4.5
    } : {
        radius: 188,
        influenceAmplitude: 0.82,
        lateralAmplitude: 9,
        verticalAmplitude: 12,
        slopeAmplitude: 5,
        scaleAmplitude: 0.022,
        rotationAmplitude: 3.6
    }

    const terrainOffset = sampleTerrainOffset(burstState, x, y, terrain, contentSize, {
        ...config
    })

    return {
        ...terrainOffset,
        y: terrainOffset.y
    }
}

function sampleTerrainOffset(interactionState, x, y, terrain, contentSize, config) {
    const dx = x - interactionState.x
    const dy = y - interactionState.y
    const distance = Math.hypot(dx, dy)
    const radius = config.radius

    if (distance > radius) {
        return { x: 0, y: 0, rotate: 0, scale: 1 }
    }

    const distanceRatio = Math.min(distance / radius, 1)
    const influence = (1 - distanceRatio) ** 3 * config.influenceAmplitude

    const normalizedPoint = normalizeTerrainPoint(x, y, contentSize)
    const elevation = sampleWaveHeight(normalizedPoint.x, normalizedPoint.y, terrain)
    const gradient = sampleWaveGradient(normalizedPoint.x, normalizedPoint.y, terrain)

    const troughPull = elevation < 0 ? Math.abs(elevation) : 0
    const xOffset =
        (gradient.x * config.lateralAmplitude - troughPull * gradient.x * 2.4) * influence

    const yOffset =
        (-elevation * config.verticalAmplitude - gradient.y * config.slopeAmplitude) * influence

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
                    amplitude: 0.05 + random() * 0.025
                }
            }),
            crossDirX: Math.cos(0.8 + random() * 0.6),
            crossDirY: Math.sin(0.8 + random() * 0.6),
            crossFrequency: 5.2 + random() * 1.7,
            crossPhase: random() * Math.PI * 2,
            crossAmplitude: 0.03 + random() * 0.015,
            rippleX: -0.2 + random() * 0.4,
            rippleY: -0.2 + random() * 0.4,
            rippleFrequency: 9 + random() * 2.4,
            ripplePhase: random() * Math.PI * 2,
            rippleDecay: 1.05 + random() * 0.2,
            rippleAmplitude: 0.025 + random() * 0.012
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
                amplitude: 0.04 + random() * 0.018
            }
        }),
        crossDirX: Math.cos(0.5 + random() * 0.5),
        crossDirY: Math.sin(0.5 + random() * 0.5),
        crossFrequency: 3.7 + random() * 1,
        crossPhase: random() * Math.PI * 2,
        crossAmplitude: 0.022 + random() * 0.01,
        rippleX: -0.15 + random() * 0.3,
        rippleY: -0.15 + random() * 0.3,
        rippleFrequency: 6.4 + random() * 1.4,
        ripplePhase: random() * Math.PI * 2,
        rippleDecay: 1.15 + random() * 0.16,
        rippleAmplitude: 0.016 + random() * 0.008
    }
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
