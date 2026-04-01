import { layoutNextLine, prepareWithSegments } from "@chenglou/pretext"
import { STORY_TEXT } from "./story.js"
import {
    BG_COLOR,
    MOUSE_IDLE_TIMEOUT,
    TEXT_COLOR,
    getPageOffset,
    getPageScale,
    getResponsiveLayout
} from "./config.js"
import {
    createDragon,
    drawDragon,
    drawFire,
    getDragonExclusions,
    getFireExclusions,
    getFireInfluence,
    hasActiveFire,
    loadDragonSprites,
    spawnFire,
    updateDragon,
    updateDragonScale,
    updateFire
} from "./dragon.js"

const MIN_LINE_WIDTH = 40
const TEXT_EXCLUSION_PAD = 10
const dropCapCache = new Map()

function resolveAssetPath(path) {
    if (!path) return path
    if (/^https?:\/\//i.test(path)) return path

    const baseUrl = import.meta.env.BASE_URL || ""
    const normalizedPath = String(path).replace(/^\/+/, "")
    return `${baseUrl}${normalizedPath}`.replace(/(^|[^:])\/{2,}/g, "$1/")
}

function normalizeAssetBasePath(assetBasePath) {
    return String(assetBasePath || "").replace(/\/+$/, "")
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.decoding = "async"
        image.onload = () => resolve(image)
        const resolvedSrc = resolveAssetPath(src)
        image.onerror = () => reject(new Error(`Failed to load image: ${resolvedSrc}`))
        image.src = resolvedSrc
    })
}

function loadDropCap(assetBasePath) {
    const normalizedAssetBasePath = normalizeAssetBasePath(assetBasePath)
    const source = `${normalizedAssetBasePath}/dropcap.png`
    const cachedDropCap = dropCapCache.get(source)
    if (cachedDropCap) return cachedDropCap

    const dropCapPromise = loadImage(source).catch(error => {
        dropCapCache.delete(source)
        throw error
    })

    dropCapCache.set(source, dropCapPromise)
    return dropCapPromise
}

function subtractRanges(ranges, left, right) {
    const result = []

    for (const range of ranges) {
        if (right <= range.left || left >= range.right) {
            result.push(range)
            continue
        }

        if (left > range.left) result.push({ left: range.left, right: left })
        if (right < range.right) result.push({ left: right, right: range.right })
    }

    return result
}

function getRestPosePositions(startX, startY, scale) {
    const poses = []
    const spacing = 30 * scale

    poses.push({ x: startX, y: startY - 2, angle: 0 })

    for (let index = 1; index < 20; index += 1) {
        const angle = -(index / 19 * (Math.PI / 2) * 1.4)
        const previousPose = poses[index - 1]
        poses.push({
            x: previousPose.x - Math.cos(angle) * spacing,
            y: previousPose.y - Math.sin(angle) * spacing,
            angle
        })
    }

    return poses
}

function createIllustratedManuscript({
    canvas,
    assetBasePath = "/images/writing/manuscript",
    onReady,
    onError
}) {
    const context = canvas?.getContext("2d", { alpha: false })
    if (!canvas || !context) {
        return { destroy() {} }
    }

    const storyContent = STORY_TEXT.slice(1)
    const observedElement = canvas.parentElement || canvas

    let destroyed = false
    let frameScheduled = false
    let frameHandle = null
    let resizeObserver = null
    let ready = false

    let viewportWidth = 1
    let viewportHeight = 1
    let devicePixelRatio = Math.ceil(window.devicePixelRatio || 1)
    let layout = getResponsiveLayout(viewportWidth, viewportHeight)
    let prepared = null
    let lastFontSize = 0
    let textLines = []
    let textDirty = true

    let dropCapImage = null
    let sprites = null
    let dragon = null

    const mouse = { x: 0, y: 0 }
    let pointerDown = false
    let lastMouseMove = -Infinity

    canvas.style.touchAction = "pan-y"

    const drawFallbackFrame = () => {
        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
        context.fillStyle = BG_COLOR
        context.fillRect(0, 0, viewportWidth, viewportHeight)

        context.save()
        context.strokeStyle = "rgba(89, 58, 25, 0.18)"
        context.lineWidth = 1
        context.strokeRect(10.5, 10.5, Math.max(0, viewportWidth - 21), Math.max(0, viewportHeight - 21))
        context.restore()
    }

    const measureCanvas = () => {
        const rect = observedElement.getBoundingClientRect()
        const nextWidth = Math.max(1, Math.round(rect.width || observedElement.clientWidth || canvas.clientWidth || 1))
        const nextHeight = Math.max(1, Math.round(rect.height || observedElement.clientHeight || canvas.clientHeight || 1))
        const nextDevicePixelRatio = Math.ceil(window.devicePixelRatio || 1)
        const hasChanged =
            nextWidth !== viewportWidth ||
            nextHeight !== viewportHeight ||
            nextDevicePixelRatio !== devicePixelRatio

        viewportWidth = nextWidth
        viewportHeight = nextHeight
        devicePixelRatio = nextDevicePixelRatio

        canvas.width = Math.max(1, viewportWidth * devicePixelRatio)
        canvas.height = Math.max(1, viewportHeight * devicePixelRatio)

        return hasChanged
    }

    const updateLayoutState = (forcePrepare = false) => {
        layout = getResponsiveLayout(viewportWidth, viewportHeight)

        if (forcePrepare || !prepared || layout.fontSize !== lastFontSize) {
            prepared = prepareWithSegments(storyContent, layout.font)
            lastFontSize = layout.fontSize
        }

        if (dragon) {
            updateDragonScale(dragon, getPageScale(viewportWidth))
        }

        textDirty = true
    }

    const getDropCap = () => {
        const height = layout.lineHeight * 7
        const width = dropCapImage.naturalWidth * (height / dropCapImage.naturalHeight)
        return { width: width + 12, height, drawWidth: width, drawHeight: height }
    }

    const drawDropCap = () => {
        const dropCap = getDropCap()
        context.drawImage(dropCapImage, layout.margin, layout.margin, dropCap.drawWidth, dropCap.drawHeight)
    }

    const initializeDragon = () => {
        const scale = getPageScale(viewportWidth)
        const offset = getPageOffset(layout, viewportWidth, viewportHeight)
        const dropCap = getDropCap()
        const dragonStartX = offset.x + layout.margin + dropCap.width * 0.8
        const dragonStartY = offset.y + layout.margin - 70 * scale

        dragon = createDragon(dragonStartX, dragonStartY, scale)

        const restPose = getRestPosePositions(dragonStartX, dragonStartY, scale)
        for (let index = 0; index < dragon.segments.length; index += 1) {
            dragon.segments[index].x = restPose[index].x
            dragon.segments[index].y = restPose[index].y
            dragon.segments[index].angle = restPose[index].angle
        }

        textDirty = true
    }

    const updatePointerPosition = event => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left
        mouse.y = event.clientY - rect.top
        lastMouseMove = performance.now()
    }

    const handlePointerMove = event => {
        updatePointerPosition(event)

        if (ready) {
            scheduleFrame()
        }
    }

    const handlePointerDown = event => {
        pointerDown = true
        updatePointerPosition(event)

        if (ready) {
            scheduleFrame()
        }
    }

    const handlePointerUp = () => {
        pointerDown = false
    }

    const handlePointerCancel = () => {
        pointerDown = false
    }

    const handlePointerLeave = event => {
        if (event.pointerType === "mouse") {
            pointerDown = false
        }
    }

    const getAvailableRanges = (y, lineHeight, exclusions, offsetX, offsetY) => {
        let ranges = [{ left: layout.margin, right: layout.pageWidth - layout.margin }]

        for (const exclusion of exclusions) {
            if (y + lineHeight <= exclusion.y || y >= exclusion.y + exclusion.height) continue
            ranges = subtractRanges(ranges, exclusion.x, exclusion.x + exclusion.width)
        }

        const top = y + offsetY
        const bottom = y + lineHeight + offsetY
        const dragonRects = getDragonExclusions(dragon, top, bottom, TEXT_EXCLUSION_PAD)
        for (const rect of dragonRects) {
            ranges = subtractRanges(ranges, rect.left - offsetX, rect.right - offsetX)
        }

        const fireRects = getFireExclusions(dragon, top, bottom, 6)
        for (const rect of fireRects) {
            ranges = subtractRanges(ranges, rect.left - offsetX, rect.right - offsetX)
        }

        return ranges.filter(range => range.right - range.left >= MIN_LINE_WIDTH)
    }

    const layoutText = (exclusions, offsetX, offsetY) => {
        textLines = []
        context.save()
        context.font = layout.font

        let cursor = { segmentIndex: 0, graphemeIndex: 0 }
        let y = layout.margin
        const ascent = layout.fontSize * 0.857
        const baselineOffset = (layout.lineHeight - ascent) / 2

        while (y + layout.lineHeight <= layout.pageHeight - layout.margin) {
            const ranges = getAvailableRanges(y, layout.lineHeight, exclusions, offsetX, offsetY)
            if (ranges.length === 0) {
                y += layout.lineHeight
                continue
            }

            let done = false

            for (const range of ranges) {
                const width = range.right - range.left
                const line = layoutNextLine(prepared, cursor, width)
                if (line === null) {
                    done = true
                    break
                }

                textLines.push({
                    text: line.text,
                    x: range.left,
                    y: y + baselineOffset
                })
                cursor = line.end
            }

            if (done) break
            y += layout.lineHeight
        }

        context.restore()
        textDirty = false
    }

    const drawTextWithFireEffect = (text, x, y, offsetX, offsetY) => {
        const halfAscent = layout.fontSize * 0.857 / 2
        let startX = x

        for (const character of text) {
            const characterWidth = context.measureText(character).width
            const influence = getFireInfluence(dragon, startX + characterWidth / 2 + offsetX, y + halfAscent + offsetY)

            if (influence.strength < 0.01) {
                context.fillStyle = TEXT_COLOR
                context.globalAlpha = 1
                context.fillText(character, startX, y)
            } else {
                const strength = influence.strength

                context.save()
                context.translate(
                    startX + characterWidth / 2 + influence.dx * strength * 45,
                    y + halfAscent + influence.dy * strength * 45
                )
                context.rotate(strength * (influence.dx > 0 ? 1 : -1) * 1.2)
                context.globalAlpha = Math.max(0, 1 - strength * 0.8)
                context.fillStyle = `rgb(${Math.round(42 + strength * 200)},${Math.round(26 + strength * 80)},10)`
                context.fillText(character, -characterWidth / 2, -halfAscent)
                context.restore()
            }

            startX += characterWidth
        }

        context.globalAlpha = 1
        context.fillStyle = TEXT_COLOR
    }

    const drawText = (offsetX, offsetY) => {
        context.save()
        context.font = layout.font
        context.textBaseline = "top"

        if (!hasActiveFire(dragon)) {
            for (const line of textLines) {
                context.fillStyle = TEXT_COLOR
                context.fillText(line.text, Math.round(line.x), Math.round(line.y))
            }
        } else {
            for (const line of textLines) {
                drawTextWithFireEffect(line.text, line.x, line.y, offsetX, offsetY)
            }
        }

        context.restore()
    }

    const render = time => {
        frameScheduled = false

        if (destroyed || !ready || !dragon || !dropCapImage || !sprites) {
            return
        }

        const offset = getPageOffset(layout, viewportWidth, viewportHeight)
        const dropCap = getDropCap()
        const idle = time - lastMouseMove > MOUSE_IDLE_TIMEOUT
        const scale = getPageScale(viewportWidth)
        const restX = offset.x + layout.margin + dropCap.width * 0.8
        const restY = offset.y + layout.margin - 70 * scale

        const moved = updateDragon(dragon, time, mouse.x, mouse.y, idle, restX, restY)

        if (pointerDown) {
            spawnFire(dragon, sprites)
        }

        let hasFire = hasActiveFire(dragon)
        if (hasFire) {
            updateFire(dragon, time)
        }

        hasFire = hasActiveFire(dragon)
        if (moved || hasFire) {
            textDirty = true
        }

        const dropCapExclusions = [{
            x: layout.margin - 4,
            y: layout.margin - 4,
            width: dropCap.width,
            height: dropCap.height
        }]

        if (textDirty) {
            layoutText(dropCapExclusions, offset.x, offset.y)
        }

        context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
        context.fillStyle = BG_COLOR
        context.fillRect(0, 0, viewportWidth, viewportHeight)

        context.save()
        context.translate(offset.x, offset.y)
        drawDropCap()
        drawText(offset.x, offset.y)
        context.restore()

        drawFire(context, dragon)
        drawDragon(context, dragon, sprites)

        scheduleFrame()
    }

    const scheduleFrame = () => {
        if (destroyed || frameScheduled) return

        frameScheduled = true
        frameHandle = requestAnimationFrame(render)
    }

    const initialize = async () => {
        measureCanvas()
        updateLayoutState(true)

        resizeObserver = new ResizeObserver(() => {
            const hasChanged = measureCanvas()
            if (!hasChanged) return

            updateLayoutState()

            if (ready) {
                scheduleFrame()
            }
        })

        resizeObserver.observe(observedElement)

        canvas.addEventListener("pointermove", handlePointerMove)
        canvas.addEventListener("pointerdown", handlePointerDown)
        canvas.addEventListener("pointerup", handlePointerUp)
        canvas.addEventListener("pointercancel", handlePointerCancel)
        canvas.addEventListener("pointerleave", handlePointerLeave)

        const fontsReady = document.fonts?.ready || Promise.resolve()
        const [loadedSprites, loadedDropCap] = await Promise.all([
            loadDragonSprites(assetBasePath),
            loadDropCap(assetBasePath),
            fontsReady
        ])

        if (destroyed) return

        sprites = loadedSprites
        dropCapImage = loadedDropCap

        updateLayoutState(true)
        initializeDragon()
        ready = true
        onReady?.()
        scheduleFrame()
    }

    initialize().catch(error => {
        if (!destroyed) {
            drawFallbackFrame()
            onError?.(error)
            console.error("IllustratedManuscript", error)
        }
    })

    measureCanvas()
    drawFallbackFrame()

    return {
        destroy() {
            destroyed = true
            ready = false
            pointerDown = false

            if (frameHandle !== null) {
                cancelAnimationFrame(frameHandle)
                frameHandle = null
            }

            if (resizeObserver) {
                resizeObserver.disconnect()
                resizeObserver = null
            }

            canvas.removeEventListener("pointermove", handlePointerMove)
            canvas.removeEventListener("pointerdown", handlePointerDown)
            canvas.removeEventListener("pointerup", handlePointerUp)
            canvas.removeEventListener("pointercancel", handlePointerCancel)
            canvas.removeEventListener("pointerleave", handlePointerLeave)
        }
    }
}

export default createIllustratedManuscript
