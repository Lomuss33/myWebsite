import "./LayoutBufferGarden.scss"
import React, {useEffect, useRef} from 'react'

const ULTRAWIDE_MEDIA =
    "(min-width: 1680px), (min-width: 1360px) and (min-aspect-ratio: 2 / 1)"

const MIN_VISIBLE_BUFFER_WIDTH = 24
const NORMAL_TARGET_AREA_PER_FLOWER = 8500
const REDUCED_TARGET_AREA_PER_FLOWER = 18000

const MIN_FLOWERS = 48
const MAX_FLOWERS = 260
const LOW_PERF_MAX_FLOWERS = 130

const NORMAL_FRAME_INTERVAL = 1000 / 30
const REDUCED_FRAME_INTERVAL = 1000 / 8

const NORMAL_TIME_SCALE = 1
const REDUCED_TIME_SCALE = 0.08

const MAX_DEVICE_PIXEL_RATIO = 1.5
const REDUCED_MAX_DEVICE_PIXEL_RATIO = 1

const DARK_PALETTE = {
    washA: "rgba(22, 96, 72, 0.24)",
    washB: "rgba(96, 42, 134, 0.22)",
    washC: "rgba(6, 10, 14, 0)",
    petals: [
        [88, 210, 224],
        [226, 76, 168],
        [148, 111, 229],
        [78, 122, 226],
        [228, 104, 132],
        [213, 160, 76],
        [70, 155, 106],
        [180, 92, 205],
    ],
    centers: [
        [230, 214, 130],
        [184, 224, 212],
        [238, 170, 198],
        [210, 190, 246],
    ],
    stems: [
        [38, 110, 78],
        [52, 86, 116],
        [83, 67, 120],
        [76, 102, 74],
    ],
    specks: [
        [80, 170, 150],
        [130, 116, 205],
        [196, 85, 148],
        [205, 160, 96],
    ],
}

const LIGHT_PALETTE = {
    washA: "rgba(198, 220, 210, 0.38)",
    washB: "rgba(224, 198, 228, 0.34)",
    washC: "rgba(255, 255, 255, 0)",
    petals: [
        [172, 195, 218],
        [220, 176, 196],
        [190, 178, 220],
        [212, 196, 152],
        [164, 188, 166],
        [224, 210, 222],
        [188, 210, 210],
        [230, 206, 184],
    ],
    centers: [
        [206, 180, 122],
        [188, 174, 210],
        [194, 200, 182],
        [214, 184, 174],
    ],
    stems: [
        [142, 162, 150],
        [160, 154, 170],
        [150, 166, 178],
        [172, 164, 142],
    ],
    specks: [
        [178, 190, 196],
        [204, 180, 196],
        [188, 202, 186],
        [206, 196, 174],
    ],
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
}

function easeOutCubic(value) {
    return 1 - Math.pow(1 - value, 3)
}

function easeOutBack(value) {
    const overshoot = 1.42
    const shifted = value - 1

    return 1 + (overshoot + 1) * Math.pow(shifted, 3) + overshoot * Math.pow(shifted, 2)
}

function easeInQuad(value) {
    return value * value
}

function hashRandom(seed) {
    const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123

    return value - Math.floor(value)
}

function random(seed, min = 0, max = 1) {
    return min + clamp(hashRandom(seed), 0, 1) * (max - min)
}

function randomInt(seed, min, max) {
    return Math.floor(random(seed, min, max + 1))
}

function colorString(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}

function pickColor(colors, seed) {
    return colors[randomInt(seed, 0, colors.length - 1)]
}

function getIsLightTheme() {
    return document.documentElement.getAttribute("data-theme") === "light"
}

function getIsLowPerf() {
    return document.documentElement.classList.contains("low-perf")
}

function getVisibleArea(regions) {
    return regions.reduce((total, region) => total + region.width * region.height, 0)
}

function getRegionIndex(regions, seed) {
    const visibleArea = getVisibleArea(regions)
    let targetArea = random(seed, 0, visibleArea)

    for(let index = 0; index < regions.length; index += 1) {
        targetArea -= regions[index].width * regions[index].height

        if(targetArea <= 0)
            return index
    }

    return Math.max(0, regions.length - 1)
}

function createFlowerSlot(index, regions, palette, isLightTheme) {
    const seed = 101 + index * 37.173
    const radiusSeed = random(seed + 4)
    const largerBloom = radiusSeed > 0.86
    const alphaBase = isLightTheme
        ? random(seed + 9, 0.18, 0.46) * random(seed + 91, 0.84, 1)
        : random(seed + 9, 0.22, 0.68) * random(seed + 91, 0.82, 1)
    const growRatio = random(seed + 13, 0.16, 0.32)
    const holdRatio = random(seed + 17, 0.34, 0.52)

    return {
        seed,
        regionIndex: getRegionIndex(regions, seed + 1),
        xFactor: random(seed + 2, 0.02, 0.98),
        yFactor: random(seed + 3, 0.03, 0.97),
        radius: largerBloom
            ? random(seed + 5, 7.5, 12)
            : random(seed + 5, 2.4, 7.5),
        petalCount: randomInt(seed + 6, 5, 9),
        petalStretch: random(seed + 7, 0.82, 1.36),
        rotation: random(seed + 8, 0, Math.PI * 2),
        hueOffset: random(seed + 10, -0.05, 0.05),
        alphaBase,
        cycleSeconds: random(seed + 11, 7.5, 28),
        growRatio,
        holdRatio,
        decayRatio: Math.max(0.18, 1 - growRatio - holdRatio),
        phaseOffset: random(seed + 12, 0, 28),
        swayAmplitude: random(seed + 14, 0.018, 0.13),
        swaySpeed: random(seed + 15, 0.45, 2.2),
        driftX: random(seed + 16, -1.4, 1.4),
        driftY: random(seed + 18, -0.8, 0.8),
        hasInnerRing: random(seed + 19) > 0.56,
        hasFallingPetals: random(seed + 20) > 0.68,
        petalColor: colorString(pickColor(palette.petals, seed + 21)),
        centerColor: colorString(pickColor(palette.centers, seed + 22)),
        stemColor: colorString(pickColor(palette.stems, seed + 23)),
    }
}

function createSpeckSlot(index, regions, palette, isLightTheme) {
    const seed = 809 + index * 19.913

    return {
        seed,
        regionIndex: getRegionIndex(regions, seed + 1),
        xFactor: random(seed + 2, 0.01, 0.99),
        yFactor: random(seed + 3, 0.02, 0.98),
        radius: random(seed + 4, 0.65, 2.2),
        alpha: isLightTheme
            ? random(seed + 5, 0.05, 0.16)
            : random(seed + 5, 0.05, 0.2),
        phaseOffset: random(seed + 6, 0, Math.PI * 2),
        flickerSpeed: random(seed + 7, 0.16, 0.74),
        color: colorString(pickColor(palette.specks, seed + 8)),
        isStem: random(seed + 9) > 0.74,
        stemLength: random(seed + 10, 3, 12),
        stemTilt: random(seed + 11, -0.8, 0.8),
    }
}

function createField(regions, isLightTheme, reducedMotion, lowPerf) {
    const visibleArea = getVisibleArea(regions)
    const palette = isLightTheme ? LIGHT_PALETTE : DARK_PALETTE

    if(visibleArea <= 0) {
        return {
            palette,
            flowers: [],
            specks: [],
        }
    }

    const maxFlowers = lowPerf ? LOW_PERF_MAX_FLOWERS : MAX_FLOWERS
    const targetArea = reducedMotion ? REDUCED_TARGET_AREA_PER_FLOWER : NORMAL_TARGET_AREA_PER_FLOWER
    const flowerCount = clamp(
        Math.round(visibleArea / targetArea),
        MIN_FLOWERS,
        maxFlowers
    )
    const speckCount = clamp(
        Math.round(visibleArea / 3600),
        Math.min(64, flowerCount),
        lowPerf ? 240 : 560
    )
    const flowers = new Array(flowerCount)
    const specks = new Array(speckCount)

    for(let index = 0; index < flowerCount; index += 1)
        flowers[index] = createFlowerSlot(index, regions, palette, isLightTheme)

    for(let index = 0; index < speckCount; index += 1)
        specks[index] = createSpeckSlot(index, regions, palette, isLightTheme)

    return {
        palette,
        flowers,
        specks,
    }
}

function drawAmbientRegion(context, region, palette, isLightTheme) {
    const gradient = context.createLinearGradient(
        region.x,
        region.y,
        region.x + region.width,
        region.y + region.height
    )

    gradient.addColorStop(0, palette.washC)
    gradient.addColorStop(0.38, palette.washA)
    gradient.addColorStop(0.72, palette.washB)
    gradient.addColorStop(1, palette.washC)

    context.fillStyle = gradient
    context.fillRect(region.x, region.y, region.width, region.height)

    const radialGradient = context.createRadialGradient(
        region.x + region.width * 0.5,
        region.y + region.height * 0.52,
        0,
        region.x + region.width * 0.5,
        region.y + region.height * 0.52,
        Math.max(region.width, region.height) * 0.78
    )

    radialGradient.addColorStop(
        0,
        isLightTheme ? "rgba(210, 220, 214, 0.18)" : "rgba(44, 112, 86, 0.12)"
    )
    radialGradient.addColorStop(
        0.48,
        isLightTheme ? "rgba(226, 216, 232, 0.12)" : "rgba(96, 42, 126, 0.1)"
    )
    radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

    context.fillStyle = radialGradient
    context.fillRect(region.x, region.y, region.width, region.height)

    context.globalAlpha = isLightTheme ? 0.12 : 0.22
    context.strokeStyle = isLightTheme ? "rgb(158, 174, 164)" : "rgb(48, 128, 94)"
    context.lineWidth = 1

    const laneCount = Math.max(3, Math.min(10, Math.round(region.width / 90)))

    for(let index = 0; index < laneCount; index += 1) {
        const x = region.x + region.width * ((index + 0.5) / laneCount)

        context.beginPath()
        context.moveTo(x, region.y + region.height)
        context.bezierCurveTo(
            x + (index % 2 === 0 ? 12 : -12),
            region.y + region.height * 0.72,
            x + (index % 3 === 0 ? -18 : 18),
            region.y + region.height * 0.32,
            x + (index % 2 === 0 ? 4 : -4),
            region.y
        )
        context.stroke()
    }

    context.globalAlpha = 1
}

function drawSpecks(context, state, regionIndex, time) {
    for(let index = 0; index < state.specks.length; index += 1) {
        const speck = state.specks[index]

        if(speck.regionIndex !== regionIndex)
            continue

        const region = state.regions[regionIndex]
        const x = region.x + speck.xFactor * region.width
        const y = region.y + speck.yFactor * region.height
        const twinkle = 0.72 + Math.sin(time * speck.flickerSpeed + speck.phaseOffset) * 0.28

        context.globalAlpha = speck.alpha * twinkle
        context.fillStyle = speck.color
        context.strokeStyle = speck.color

        if(speck.isStem) {
            context.lineWidth = Math.max(0.55, speck.radius * 0.78)
            context.beginPath()
            context.moveTo(x, y + speck.stemLength * 0.5)
            context.quadraticCurveTo(
                x + speck.stemTilt * 4,
                y,
                x + speck.stemTilt * 2,
                y - speck.stemLength * 0.5
            )
            context.stroke()
        }
        else {
            context.beginPath()
            context.arc(x, y, speck.radius, 0, Math.PI * 2)
            context.fill()
        }
    }

    context.globalAlpha = 1
}

function getLifecycle(slot, time, timeScale) {
    const cycle = (time * timeScale + slot.phaseOffset) % slot.cycleSeconds
    const progress = cycle / slot.cycleSeconds
    const holdStart = slot.growRatio
    const decayStart = slot.growRatio + slot.holdRatio

    if(progress < holdStart) {
        const growProgress = progress / slot.growRatio
        const scale = clamp(easeOutBack(growProgress), 0, 1.18)

        return {
            scale,
            alpha: easeOutCubic(growProgress),
            decayProgress: 0,
        }
    }

    if(progress < decayStart) {
        const holdProgress = (progress - holdStart) / slot.holdRatio
        const breathe = Math.sin(holdProgress * Math.PI * 2 + slot.seed) * 0.035

        return {
            scale: 1 + breathe,
            alpha: 1,
            decayProgress: 0,
        }
    }

    const decayProgress = clamp((progress - decayStart) / slot.decayRatio, 0, 1)
    const decayEase = easeInQuad(decayProgress)

    return {
        scale: Math.max(0, 1 - decayEase * 0.46),
        alpha: Math.max(0, 1 - decayEase),
        decayProgress,
    }
}

function drawPetal(context, radius, stretch) {
    const base = radius * 0.16
    const tip = radius * (0.88 + stretch * 0.22)
    const width = radius * (0.22 + stretch * 0.14)

    context.beginPath()
    context.moveTo(base, 0)
    context.bezierCurveTo(
        radius * 0.42,
        -width,
        tip * 0.9,
        -width * 0.56,
        tip,
        0
    )
    context.bezierCurveTo(
        tip * 0.9,
        width * 0.56,
        radius * 0.42,
        width,
        base,
        0
    )
    context.closePath()
    context.fill()
}

function drawFallingPetals(context, slot, radius, decayProgress) {
    if(!slot.hasFallingPetals || decayProgress <= 0)
        return

    const petalCount = slot.radius > 5.5 ? 2 : 1

    context.fillStyle = slot.petalColor

    for(let index = 0; index < petalCount; index += 1) {
        const angle = slot.rotation + random(slot.seed + 30 + index, -1.3, 1.3)
        const fall = decayProgress * radius * random(slot.seed + 33 + index, 2.4, 5.2)
        const drift = decayProgress * radius * random(slot.seed + 36 + index, -3.8, 3.8)

        context.save()
        context.translate(
            Math.cos(angle) * radius + drift,
            Math.sin(angle) * radius + fall
        )
        context.rotate(angle + decayProgress * random(slot.seed + 40 + index, 1.2, 3.4))
        context.scale(1, 0.48)
        context.beginPath()
        context.ellipse(0, 0, radius * 0.18, radius * 0.28, 0, 0, Math.PI * 2)
        context.fill()
        context.restore()
    }
}

function drawFlower(context, slot, region, time, timeScale, isLightTheme) {
    const lifecycle = getLifecycle(slot, time, timeScale)

    if(lifecycle.alpha <= 0.002 || lifecycle.scale <= 0.002)
        return

    const depthScale = 0.62 + slot.yFactor * 0.58
    const radius = Math.min(15, slot.radius * depthScale) * lifecycle.scale
    const sway = Math.sin(time * slot.swaySpeed + slot.phaseOffset) * slot.swayAmplitude
    const x = region.x + slot.xFactor * region.width + Math.sin(time * 0.11 + slot.seed) * slot.driftX
    const y = region.y + slot.yFactor * region.height + Math.cos(time * 0.08 + slot.seed) * slot.driftY
    const alpha = slot.alphaBase * lifecycle.alpha
    const centerAlpha = Math.min(isLightTheme ? 0.52 : 0.78, alpha * 1.85)
    const petalStep = (Math.PI * 2) / slot.petalCount

    context.save()
    context.translate(x, y)
    context.rotate(slot.rotation + sway)

    context.globalAlpha = isLightTheme ? alpha * 0.56 : alpha * 0.64
    context.fillStyle = slot.petalColor
    context.beginPath()
    context.arc(0, 0, radius * 1.45, 0, Math.PI * 2)
    context.fill()

    context.globalAlpha = alpha * 0.72
    context.strokeStyle = slot.stemColor
    context.lineWidth = Math.max(0.35, radius * 0.08)
    context.beginPath()
    context.moveTo(0, radius * 0.42)
    context.quadraticCurveTo(
        radius * 0.32,
        radius * 0.82,
        radius * 0.14,
        radius * 1.35
    )
    context.stroke()

    context.globalAlpha = alpha
    context.fillStyle = slot.petalColor

    for(let index = 0; index < slot.petalCount; index += 1) {
        context.save()
        context.rotate(index * petalStep)
        drawPetal(context, radius, slot.petalStretch)
        context.restore()
    }

    if(slot.hasInnerRing) {
        context.globalAlpha = alpha * 0.68

        for(let index = 0; index < slot.petalCount; index += 1) {
            context.save()
            context.rotate(index * petalStep + petalStep * 0.5)
            context.scale(0.58, 0.58)
            drawPetal(context, radius, slot.petalStretch * 0.88)
            context.restore()
        }
    }

    context.globalAlpha = centerAlpha
    context.fillStyle = slot.centerColor
    context.beginPath()
    context.arc(0, 0, Math.max(0.55, radius * 0.2), 0, Math.PI * 2)
    context.fill()

    context.globalAlpha = alpha * 0.72 * (1 - lifecycle.decayProgress)
    drawFallingPetals(context, slot, radius, lifecycle.decayProgress)

    context.restore()
    context.globalAlpha = 1
}

function drawFrame(context, state, timestamp) {
    const time = (timestamp - state.startedAt) / 1000
    const timeScale = state.reducedMotion ? REDUCED_TIME_SCALE : NORMAL_TIME_SCALE

    context.clearRect(0, 0, state.width, state.height)

    if(!state.active || state.regions.length === 0)
        return

    for(let regionIndex = 0; regionIndex < state.regions.length; regionIndex += 1) {
        const region = state.regions[regionIndex]

        context.save()
        context.beginPath()
        context.rect(region.x, region.y, region.width, region.height)
        context.clip()

        drawAmbientRegion(context, region, state.palette, state.isLightTheme)
        drawSpecks(context, state, regionIndex, time)

        for(let index = 0; index < state.flowers.length; index += 1) {
            const flower = state.flowers[index]

            if(flower.regionIndex === regionIndex)
                drawFlower(context, flower, region, time, timeScale, state.isLightTheme)
        }

        context.restore()
    }
}

function LayoutBufferGarden() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current

        if(!canvas || typeof window === "undefined")
            return undefined

        const context = canvas.getContext("2d", {alpha: true})
        const wrapper = canvas.closest(".layout-navigation-wrapper")

        if(!context || !wrapper)
            return undefined

        const ultrawideQuery = window.matchMedia?.(ULTRAWIDE_MEDIA) || null
        const reducedMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null
        let animationFrameId = null
        let rebuildFrameId = null
        let lastFrameTimestamp = 0
        let resizeObserver = null
        let themeObserver = null
        let mounted = true
        const observedElements = new Set()
        let state = {
            active: false,
            dpr: 1,
            width: 0,
            height: 0,
            layoutKey: "",
            regions: [],
            palette: DARK_PALETTE,
            flowers: [],
            specks: [],
            isLightTheme: getIsLightTheme(),
            reducedMotion: reducedMotionQuery?.matches === true,
            lowPerf: getIsLowPerf(),
            startedAt: performance.now(),
        }

        const isUltrawide = () => {
            if(ultrawideQuery)
                return ultrawideQuery.matches

            return window.innerWidth >= 1680 ||
                (window.innerWidth >= 1360 && window.innerWidth / window.innerHeight >= 2)
        }

        const isReducedMotion = () => reducedMotionQuery?.matches === true

        const getPixelRatio = (reducedMotion, lowPerf) => {
            const cap = reducedMotion || lowPerf
                ? REDUCED_MAX_DEVICE_PIXEL_RATIO
                : MAX_DEVICE_PIXEL_RATIO

            return Math.max(1, Math.min(cap, window.devicePixelRatio || 1))
        }

        const measureRegions = () => {
            const wrapperRect = wrapper.getBoundingClientRect()
            const nav = wrapper.querySelector("nav.nav-sidebar")
            const page = wrapper.querySelector(".layout-navigation-children-inner")
            const navRect = nav?.getBoundingClientRect()
            const pageRect = page?.getBoundingClientRect()
            const width = Math.max(0, wrapperRect.width)
            const height = Math.max(0, wrapperRect.height)

            observeElement(nav)
            observeElement(page)

            if(!navRect || !pageRect || width <= 0 || height <= 0) {
                return {
                    width,
                    height,
                    regions: [],
                }
            }

            const navRight = clamp(navRect.right - wrapperRect.left, 0, width)
            const pageLeft = clamp(pageRect.left - wrapperRect.left, 0, width)
            const pageRight = clamp(pageRect.right - wrapperRect.left, 0, width)
            const regions = []
            const leftWidth = Math.max(0, pageLeft - navRight)
            const rightWidth = Math.max(0, width - pageRight)

            if(leftWidth >= MIN_VISIBLE_BUFFER_WIDTH) {
                regions.push({
                    x: navRight,
                    y: 0,
                    width: leftWidth,
                    height,
                })
            }

            if(rightWidth >= MIN_VISIBLE_BUFFER_WIDTH) {
                regions.push({
                    x: pageRight,
                    y: 0,
                    width: rightWidth,
                    height,
                })
            }

            return {
                width,
                height,
                regions,
            }
        }

        const syncCanvasSize = (width, height, dpr) => {
            const nextWidth = Math.max(1, Math.round(width * dpr))
            const nextHeight = Math.max(1, Math.round(height * dpr))

            if(canvas.width !== nextWidth)
                canvas.width = nextWidth

            if(canvas.height !== nextHeight)
                canvas.height = nextHeight

            context.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const getLayoutKey = (active, measurements, isLightTheme, reducedMotion, lowPerf, dpr) => {
            const regionKey = measurements.regions
                .map(region => [
                    Math.round(region.x),
                    Math.round(region.y),
                    Math.round(region.width),
                    Math.round(region.height),
                ].join(":"))
                .join("|")

            return [
                active ? "active" : "inactive",
                isLightTheme ? "light" : "dark",
                reducedMotion ? "reduced" : "normal",
                lowPerf ? "low" : "standard",
                dpr,
                Math.round(measurements.width),
                Math.round(measurements.height),
                regionKey,
            ].join(";")
        }

        const cancelLoop = () => {
            if(animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId)
                animationFrameId = null
            }
        }

        const requestLoop = () => {
            if(animationFrameId !== null || document.hidden || !state.active || state.regions.length === 0)
                return

            animationFrameId = window.requestAnimationFrame(tick)
        }

        const rebuild = (force = false) => {
            const active = isUltrawide()
            const measurements = measureRegions()
            const isLightTheme = getIsLightTheme()
            const reducedMotion = isReducedMotion()
            const lowPerf = getIsLowPerf()
            const dpr = getPixelRatio(reducedMotion, lowPerf)
            const layoutKey = getLayoutKey(active, measurements, isLightTheme, reducedMotion, lowPerf, dpr)

            syncCanvasSize(measurements.width, measurements.height, dpr)

            if(force || layoutKey !== state.layoutKey) {
                const field = active
                    ? createField(measurements.regions, isLightTheme, reducedMotion, lowPerf)
                    : {
                        palette: isLightTheme ? LIGHT_PALETTE : DARK_PALETTE,
                        flowers: [],
                        specks: [],
                    }

                state = {
                    ...state,
                    active,
                    dpr,
                    width: measurements.width,
                    height: measurements.height,
                    layoutKey,
                    regions: measurements.regions,
                    palette: field.palette,
                    flowers: field.flowers,
                    specks: field.specks,
                    isLightTheme,
                    reducedMotion,
                    lowPerf,
                }
            }

            drawFrame(context, state, performance.now())

            if(state.active && state.regions.length > 0 && !document.hidden)
                requestLoop()
            else
                cancelLoop()
        }

        const scheduleRebuild = (force = false) => {
            if(rebuildFrameId !== null)
                return

            rebuildFrameId = window.requestAnimationFrame(() => {
                rebuildFrameId = null

                if(mounted)
                    rebuild(force)
            })
        }

        function tick(timestamp) {
            animationFrameId = null

            if(!mounted || document.hidden)
                return

            const nextReducedMotion = isReducedMotion()
            const nextLowPerf = getIsLowPerf()
            const nextDpr = getPixelRatio(nextReducedMotion, nextLowPerf)

            if(nextDpr !== state.dpr || nextReducedMotion !== state.reducedMotion || nextLowPerf !== state.lowPerf) {
                scheduleRebuild(true)
                requestLoop()
                return
            }

            const frameInterval = state.reducedMotion
                ? REDUCED_FRAME_INTERVAL
                : state.lowPerf
                    ? NORMAL_FRAME_INTERVAL * 1.5
                    : NORMAL_FRAME_INTERVAL

            if(timestamp - lastFrameTimestamp >= frameInterval) {
                drawFrame(context, state, timestamp)
                lastFrameTimestamp = timestamp
            }

            requestLoop()
        }

        const onVisibilityChange = () => {
            if(document.hidden) {
                cancelLoop()
                return
            }

            scheduleRebuild()
        }

        const addMediaListener = (query, listener) => {
            if(!query)
                return () => {}

            if(typeof query.addEventListener === "function") {
                query.addEventListener("change", listener)

                return () => query.removeEventListener("change", listener)
            }

            query.addListener(listener)

            return () => query.removeListener(listener)
        }

        const removeUltrawideListener = addMediaListener(ultrawideQuery, () => scheduleRebuild(true))
        const removeReducedMotionListener = addMediaListener(reducedMotionQuery, () => scheduleRebuild(true))
        const onWindowResize = () => scheduleRebuild()

        function observeElement(element) {
            if(!resizeObserver || !element || observedElements.has(element))
                return

            resizeObserver.observe(element)
            observedElements.add(element)
        }

        if(typeof ResizeObserver === "function") {
            resizeObserver = new ResizeObserver(() => scheduleRebuild())
            observeElement(wrapper)
            observeElement(wrapper.querySelector("nav.nav-sidebar"))
            observeElement(wrapper.querySelector(".layout-navigation-children-inner"))
        }

        if(typeof MutationObserver === "function") {
            themeObserver = new MutationObserver(() => scheduleRebuild(true))
            themeObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ["data-theme", "class"],
            })
        }

        window.addEventListener("resize", onWindowResize)
        document.addEventListener("visibilitychange", onVisibilityChange)
        scheduleRebuild(true)

        return () => {
            mounted = false
            cancelLoop()

            if(rebuildFrameId !== null)
                window.cancelAnimationFrame(rebuildFrameId)

            resizeObserver?.disconnect()
            themeObserver?.disconnect()
            removeUltrawideListener()
            removeReducedMotionListener()
            window.removeEventListener("resize", onWindowResize)
            document.removeEventListener("visibilitychange", onVisibilityChange)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`layout-buffer-garden`}
            aria-hidden={true}/>
    )
}

export default LayoutBufferGarden
