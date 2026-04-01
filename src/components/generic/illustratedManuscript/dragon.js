import {
    DRAGON_SEGMENT_COUNT,
    DRAGON_SEGMENT_SPACING,
    DRAGON_SPRITE_SCALE,
    WING_SEGMENT_INDEX,
    DRAGON_SEGMENT_WIDTHS,
    FIRE_COLORS,
    FIRE_STEP_INTERVAL
} from "./config.js"

const spriteCache = new Map()

function hash(seed) {
    const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
    return value - Math.floor(value)
}

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
        image.onerror = () => reject(new Error(`Failed to load image: ${resolvedSrc}`))
        const resolvedSrc = resolveAssetPath(src)
        image.src = resolvedSrc
    })
}

function scaleSprite(image, scale) {
    const devicePixelRatio = window.devicePixelRatio || 1
    const width = Math.round(image.width * scale)
    const height = Math.round(image.height * scale)
    const canvas = document.createElement("canvas")

    canvas.width = Math.max(1, Math.round(width * devicePixelRatio))
    canvas.height = Math.max(1, Math.round(height * devicePixelRatio))

    const context = canvas.getContext("2d")
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    return { canvas, width, height }
}

async function buildSpritePack(assetBasePath) {
    const normalizedAssetBasePath = normalizeAssetBasePath(assetBasePath)
    const images = await Promise.all([
        loadImage(`${normalizedAssetBasePath}/dragon-sprites/head.png`),
        loadImage(`${normalizedAssetBasePath}/dragon-sprites/tongue.png`),
        loadImage(`${normalizedAssetBasePath}/dragon-sprites/wing-front.png`),
        loadImage(`${normalizedAssetBasePath}/dragon-sprites/wing-back.png`),
        ...Array.from({ length: 19 }, (_, index) => {
            return loadImage(`${normalizedAssetBasePath}/dragon-sprites/body-${index + 1}.png`)
        })
    ])

    const scale = DRAGON_SPRITE_SCALE
    const head = scaleSprite(images[0], scale)
    const tongue = scaleSprite(images[1], scale)
    const wingFront = scaleSprite(images[2], scale)
    const wingBack = scaleSprite(images[3], scale)
    const bodySegments = images.slice(4).map(image => scaleSprite(image, scale))

    return {
        headCanvas: head.canvas,
        headDim: { w: head.width, h: head.height },
        tongueCanvas: tongue.canvas,
        tongueDim: { w: tongue.width, h: tongue.height },
        wingFrontCanvas: wingFront.canvas,
        wingFrontDim: { w: wingFront.width, h: wingFront.height },
        wingBackCanvas: wingBack.canvas,
        wingBackDim: { w: wingBack.width, h: wingBack.height },
        bodyCanvases: bodySegments.map(segment => segment.canvas),
        bodyDims: bodySegments.map(segment => ({ w: segment.width, h: segment.height }))
    }
}

export function loadDragonSprites(assetBasePath) {
    const cacheKey = `${normalizeAssetBasePath(assetBasePath)}::${Math.ceil(window.devicePixelRatio || 1)}`
    const cachedSprites = spriteCache.get(cacheKey)
    if (cachedSprites) return cachedSprites

    const spritePromise = buildSpritePack(assetBasePath).catch(error => {
        spriteCache.delete(cacheKey)
        throw error
    })

    spriteCache.set(cacheKey, spritePromise)
    return spritePromise
}

function getSegmentWidth(index) {
    return index < DRAGON_SEGMENT_WIDTHS.length ?
        DRAGON_SEGMENT_WIDTHS[index] * DRAGON_SPRITE_SCALE :
        10
}

function normalizeAngle(angle) {
    let normalizedAngle = angle

    while (normalizedAngle > Math.PI) normalizedAngle -= Math.PI * 2
    while (normalizedAngle < -Math.PI) normalizedAngle += Math.PI * 2

    return normalizedAngle
}

function rotateAngleTowards(currentAngle, targetAngle, maxStep) {
    const angleDifference = normalizeAngle(targetAngle - currentAngle)

    if (Math.abs(angleDifference) <= maxStep) {
        return currentAngle + angleDifference
    }

    return currentAngle + Math.sign(angleDifference) * maxStep
}

export function createDragon(startX, startY, scale = 1) {
    const segments = []

    for (let index = 0; index < DRAGON_SEGMENT_COUNT; index += 1) {
        segments.push({
            x: startX,
            y: startY + index * DRAGON_SEGMENT_SPACING * scale,
            angle: -Math.PI / 2,
            width: getSegmentWidth(index) * scale
        })
    }

    return {
        segments,
        jitterSeed: Math.random() * 1000,
        lastStepTime: 0,
        stepInterval: 80,
        fire: [],
        fireLastStep: 0,
        scale
    }
}

export function updateDragonScale(dragon, scale) {
    dragon.scale = scale

    for (let index = 0; index < dragon.segments.length; index += 1) {
        dragon.segments[index].width = getSegmentWidth(index) * scale
    }
}

function getRestPose(startX, startY, scale) {
    const poses = []
    const spacing = DRAGON_SEGMENT_SPACING * scale
    poses.push({ x: startX, y: startY - 2, angle: 0 })

    for (let index = 1; index < DRAGON_SEGMENT_COUNT; index += 1) {
        const angle = -(index / (DRAGON_SEGMENT_COUNT - 1) * (Math.PI / 2) * 1.4)
        const previousPose = poses[index - 1]
        poses.push({
            x: previousPose.x - Math.cos(angle) * spacing,
            y: previousPose.y - Math.sin(angle) * spacing,
            angle
        })
    }

    return poses
}

export function updateDragon(dragon, time, mouseX, mouseY, options = {}) {
    const {
        idle = false,
        restX = 0,
        restY = 0,
        desiredHeadAngle = null,
        maxHeadTurn = 0.16
    } = options

    if (time - dragon.lastStepTime < dragon.stepInterval) return false

    dragon.lastStepTime = time
    dragon.jitterSeed = Math.random() * 1000

    if (idle) {
        const restPose = getRestPose(restX, restY, dragon.scale)
        const lerp = 0.12

        for (let index = 0; index < dragon.segments.length; index += 1) {
            const segment = dragon.segments[index]
            const target = restPose[index]

            segment.x += (target.x - segment.x) * lerp
            segment.y += (target.y - segment.y) * lerp

            const angleDifference = normalizeAngle(target.angle - segment.angle)
            segment.angle += angleDifference * lerp
        }

        return true
    }

    const head = dragon.segments[0]
    const deltaX = mouseX - head.x
    const deltaY = mouseY - head.y
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    if (distance > 4) {
        const speed = Math.min(distance, Math.max(12, distance * 0.15))
        head.x += (deltaX / distance) * speed
        head.y += (deltaY / distance) * speed
    }

    const nextHeadAngle = desiredHeadAngle ?? Math.atan2(deltaY, deltaX)
    head.angle = desiredHeadAngle === null ?
        nextHeadAngle :
        rotateAngleTowards(head.angle, nextHeadAngle, maxHeadTurn)

    const maxBend = 0.25

    for (let index = 1; index < dragon.segments.length; index += 1) {
        const previousSegment = dragon.segments[index - 1]
        const segment = dragon.segments[index]
        let angle = Math.atan2(previousSegment.y - segment.y, previousSegment.x - segment.x)
        const difference = normalizeAngle(angle - previousSegment.angle)

        if (difference > maxBend) angle = previousSegment.angle + maxBend
        else if (difference < -maxBend) angle = previousSegment.angle - maxBend

        segment.angle = angle

        const spacing = DRAGON_SEGMENT_SPACING * dragon.scale
        segment.x = previousSegment.x - Math.cos(segment.angle) * spacing
        segment.y = previousSegment.y - Math.sin(segment.angle) * spacing
    }

    return true
}

export function getDragonExclusions(dragon, top, bottom, padding) {
    const rects = []

    for (const segment of dragon.segments) {
        const radius = segment.width / 2 + padding
        if (segment.y + radius < top || segment.y - radius > bottom) continue

        const middleY = (top + bottom) / 2
        const distanceToMiddle = Math.abs(segment.y - middleY)
        const halfHeight = (bottom - top) / 2
        const gap = Math.max(0, distanceToMiddle - halfHeight)
        if (gap >= radius) continue

        const halfWidth = Math.sqrt(radius * radius - gap * gap)
        rects.push({ left: segment.x - halfWidth, right: segment.x + halfWidth })
    }

    if (rects.length <= 1) return rects

    rects.sort((first, second) => first.left - second.left)
    const merged = [rects[0]]

    for (let index = 1; index < rects.length; index += 1) {
        const rect = rects[index]
        const lastMergedRect = merged[merged.length - 1]

        if (rect.left <= lastMergedRect.right) {
            lastMergedRect.right = Math.max(lastMergedRect.right, rect.right)
            continue
        }

        merged.push(rect)
    }

    return merged
}

export function getDragonInfluence(dragon, x, y) {
    let deltaX = 0
    let deltaY = 0
    let totalWeight = 0

    for (const segment of dragon.segments) {
        const ex = x - segment.x
        const ey = y - segment.y
        const distance = Math.sqrt(ex * ex + ey * ey)
        const effectRadius = segment.width * 0.55 + 24 * dragon.scale

        if (distance > effectRadius || distance < 0.1) continue

        const falloff = 1 - distance / effectRadius
        const weight = falloff * falloff * 0.75
        const normalX = ex / distance
        const normalY = ey / distance

        deltaX += normalX * weight
        deltaY += normalY * weight
        totalWeight += weight
    }

    if (totalWeight < 0.001) {
        return { dx: 0, dy: 0, strength: 0 }
    }

    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    return {
        dx: magnitude > 0 ? deltaX / magnitude : 0,
        dy: magnitude > 0 ? deltaY / magnitude : 0,
        strength: Math.min(totalWeight, 0.9)
    }
}

export function spawnFire(dragon, sprites) {
    const head = dragon.segments[0]
    const scale = dragon.scale
    const headWidth = sprites?.headDim?.w || 0
    const mouthOffset = (headWidth ? headWidth * DRAGON_SPRITE_SCALE * 0.55 : 30) * scale
    const fireX = head.x + Math.cos(head.angle) * mouthOffset
    const fireY = head.y + Math.sin(head.angle) * mouthOffset
    const count = 3 + Math.floor(Math.random() * 3)

    for (let index = 0; index < count; index += 1) {
        const spread = (Math.random() - 0.5) * 0.25
        const speed = (35 + Math.random() * 20) * scale
        const angle = head.angle + spread

        dragon.fire.push({
            x: fireX + (Math.random() - 0.5) * 4,
            y: fireY + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: (8 + Math.random() * 12) * scale,
            life: 1,
            maxLife: 12 + Math.floor(Math.random() * 6),
            frame: 0,
            color: Math.floor(Math.random() * 3)
        })
    }
}

export function hasActiveFire(dragon) {
    return dragon.fire.length > 0
}

export function updateFire(dragon, time) {
    if (time - dragon.fireLastStep < FIRE_STEP_INTERVAL) return

    dragon.fireLastStep = time

    for (let index = dragon.fire.length - 1; index >= 0; index -= 1) {
        const particle = dragon.fire[index]
        particle.frame += 1
        particle.life = 1 - particle.frame / particle.maxLife
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vx *= 0.95
        particle.vy *= 0.95

        const gravity = Math.max(0, (particle.frame - 4) / particle.maxLife)
        particle.vy -= gravity * 1.5

        if (particle.life < 0.25) particle.size *= 0.75
        else if (particle.frame < 3) particle.size *= 1.15

        if (particle.life <= 0 || particle.size < 1.5) {
            dragon.fire.splice(index, 1)
        }
    }
}

export function getFireInfluence(dragon, x, y) {
    let deltaX = 0
    let deltaY = 0
    let totalWeight = 0

    for (const particle of dragon.fire) {
        const ex = x - particle.x
        const ey = y - particle.y
        const distance = Math.sqrt(ex * ex + ey * ey)
        if (distance > 60 || distance < 0.1) continue

        const falloff = 1 - distance / 60
        const weight = falloff * falloff * particle.life
        const normalX = ex / distance
        const normalY = ey / distance

        deltaX += normalX * weight
        deltaY += normalY * weight
        totalWeight += weight
    }

    if (totalWeight < 0.001) {
        return { dx: 0, dy: 0, strength: 0 }
    }

    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    return {
        dx: magnitude > 0 ? deltaX / magnitude : 0,
        dy: magnitude > 0 ? deltaY / magnitude : 0,
        strength: Math.min(totalWeight, 1.5)
    }
}

export function getFireExclusions(dragon, top, bottom, padding) {
    const rects = []

    for (const particle of dragon.fire) {
        const radius = particle.size / 2 + padding
        if (particle.y + radius < top || particle.y - radius > bottom) continue

        const middleY = (top + bottom) / 2
        const distanceToMiddle = Math.abs(particle.y - middleY)
        const halfHeight = (bottom - top) / 2
        const gap = Math.max(0, distanceToMiddle - halfHeight)
        if (gap >= radius) continue

        const halfWidth = Math.sqrt(radius * radius - gap * gap)
        rects.push({ left: particle.x - halfWidth, right: particle.x + halfWidth })
    }

    if (rects.length <= 1) return rects

    rects.sort((first, second) => first.left - second.left)
    const merged = [rects[0]]

    for (let index = 1; index < rects.length; index += 1) {
        const rect = rects[index]
        const lastMergedRect = merged[merged.length - 1]

        if (rect.left <= lastMergedRect.right) {
            lastMergedRect.right = Math.max(lastMergedRect.right, rect.right)
            continue
        }

        merged.push(rect)
    }

    return merged
}

export function drawDragon(context, dragon, sprites) {
    if (!sprites) return

    const segments = dragon.segments
    const seed = dragon.jitterSeed
    const time = performance.now() / 1000
    const scale = dragon.scale

    if (sprites.wingBackCanvas) {
        const segment = segments[WING_SEGMENT_INDEX]
        const jitterX = (hash(seed + WING_SEGMENT_INDEX * 37) - 0.5) * 1.5
        const jitterY = (hash(seed + WING_SEGMENT_INDEX * 37 + 100) - 0.5) * 1.5
        const jitterRotate = (hash(seed + WING_SEGMENT_INDEX * 37 + 200) - 0.5) * 0.04
        const wingFlap = Math.sin(time * 3) * 0.4

        context.save()
        context.translate(segment.x + jitterX, segment.y + jitterY)
        context.rotate(segment.angle + jitterRotate + wingFlap)
        context.scale(scale, scale)
        context.drawImage(
            sprites.wingBackCanvas,
            -sprites.wingBackDim.w,
            -sprites.wingBackDim.h,
            sprites.wingBackDim.w,
            sprites.wingBackDim.h
        )
        context.restore()
    }

    for (let index = segments.length - 1; index >= 0; index -= 1) {
        const segment = segments[index]
        const jitterX = (hash(seed + index * 37) - 0.5) * 1.5
        const jitterY = (hash(seed + index * 37 + 100) - 0.5) * 1.5
        const jitterRotate = (hash(seed + index * 37 + 200) - 0.5) * 0.04

        context.save()
        context.translate(segment.x + jitterX, segment.y + jitterY)
        context.rotate(segment.angle + jitterRotate)
        context.scale(scale, scale)

        if (index === 0) {
            if (sprites.tongueCanvas) {
                context.drawImage(
                    sprites.tongueCanvas,
                    sprites.headDim.w * 0.3,
                    -sprites.tongueDim.h / 2,
                    sprites.tongueDim.w,
                    sprites.tongueDim.h
                )
            }

            if (sprites.headCanvas) {
                context.drawImage(
                    sprites.headCanvas,
                    -sprites.headDim.w * 0.45,
                    -sprites.headDim.h / 2,
                    sprites.headDim.w,
                    sprites.headDim.h
                )
            }
        } else {
            const bodyIndex = index - 1
            const bodyCanvas = sprites.bodyCanvases[bodyIndex]
            const bodyDim = sprites.bodyDims[bodyIndex]

            if (bodyCanvas && bodyDim) {
                context.drawImage(bodyCanvas, -bodyDim.w / 2, -bodyDim.h / 2, bodyDim.w, bodyDim.h)
            }

            if (index === WING_SEGMENT_INDEX && sprites.wingFrontCanvas) {
                const wingFlap = Math.sin(time * 3 + 0.5) * 0.4
                context.save()
                context.rotate(-wingFlap)
                context.drawImage(
                    sprites.wingFrontCanvas,
                    -sprites.wingFrontDim.w,
                    -sprites.wingFrontDim.h,
                    sprites.wingFrontDim.w,
                    sprites.wingFrontDim.h
                )
                context.restore()
            }
        }

        context.restore()
    }
}

function jitterLine(context, x1, y1, x2, y2, seed, jitter) {
    for (let step = 1; step <= 4; step += 1) {
        const progress = step / 4
        const jitterX = (hash(seed + step * 13) - 0.5) * jitter
        const jitterY = (hash(seed + step * 29) - 0.5) * jitter
        context.lineTo(x1 + (x2 - x1) * progress + jitterX, y1 + (y2 - y1) * progress + jitterY)
    }
}

export function drawFire(context, dragon) {
    for (const particle of dragon.fire) {
        const angle = Math.atan2(particle.vy, particle.vx)
        context.save()
        context.translate(particle.x, particle.y)
        context.rotate(angle)
        context.globalAlpha = Math.min(1, particle.life * 1.5)

        const decay = 1 - particle.life
        context.fillStyle = FIRE_COLORS[decay < 0.33 ? 0 : decay < 0.66 ? 1 : 2]

        const radius = particle.size / 2
        const seedBase = particle.color * 31 + particle.frame * 0.3
        const jitter = radius * 0.35
        const jitterFn = step => (hash(seedBase + step * 17) - 0.5) * radius * 0.4
        const corners = [
            [radius * 1.2 + jitterFn(0), jitterFn(1)],
            [jitterFn(2), -radius * 0.7 + jitterFn(3)],
            [-radius + jitterFn(4), jitterFn(5)],
            [jitterFn(6), radius * 0.7 + jitterFn(7)]
        ]

        context.beginPath()
        context.moveTo(corners[0][0], corners[0][1])

        for (let index = 0; index < 4; index += 1) {
            const nextCorner = corners[(index + 1) % 4]
            jitterLine(
                context,
                corners[index][0],
                corners[index][1],
                nextCorner[0],
                nextCorner[1],
                seedBase + index * 100,
                jitter
            )
        }

        context.closePath()
        context.fill()
        context.globalAlpha = 1
        context.restore()
    }
}
