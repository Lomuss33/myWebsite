import {
    layoutNextRichInlineLineRange,
    materializeRichInlineLineRange,
    prepareRichInline
} from "@chenglou/pretext/rich-inline"

const preparedParagraphCache = new Map()
const PREPARED_PARAGRAPH_CACHE_LIMIT = 160

export function parseDraggableInlineHtml(html) {
    if (!html) return []

    const parser = new DOMParser()
    const documentNode = parser.parseFromString(`<div>${html}</div>`, "text/html")
    const root = documentNode.body.firstElementChild
    if (!root) return []

    const paragraphs = []
    let rootParagraph = createParagraph("root")

    const pushRun = (paragraph, run) => {
        if (!paragraph || !run.text) return

        const previousRun = paragraph.runs[paragraph.runs.length - 1]
        const canMerge =
            previousRun &&
            previousRun.href === run.href &&
            previousRun.target === run.target &&
            previousRun.rel === run.rel &&
            Boolean(previousRun.locked) === Boolean(run.locked) &&
            marksEqual(previousRun.marks, run.marks)

        if (canMerge) {
            previousRun.text += run.text
            return
        }

        paragraph.runs.push(run)
    }

    const walkNode = (node, paragraph, context = createDefaultContext()) => {
        if (!node) return

        if (node.nodeType === Node.TEXT_NODE) {
            if (!paragraph) return
            pushRun(paragraph, {
                text: node.textContent || "",
                href: context.href,
                target: context.target,
                rel: context.rel,
                locked: context.locked,
                marks: { ...context.marks }
            })
            return
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return

        const element = /** @type {HTMLElement} */ (node)
        const tagName = element.tagName.toLowerCase()

        if (tagName === "p") {
            const paragraphNode = createParagraph("p")
            Array.from(element.childNodes).forEach(child => {
                walkNode(child, paragraphNode, createDefaultContext())
            })

            if (paragraphNode.runs.length > 0) paragraphs.push(paragraphNode)
            return
        }

        if (tagName === "br") {
            if (paragraph?.runs.length > 0) paragraphs.push(paragraph)
            rootParagraph = createParagraph("root")
            return
        }

        const nextContext = {
            href: context.href,
            target: context.target,
            rel: context.rel,
            locked: context.locked,
            marks: { ...context.marks }
        }

        if (tagName === "a") {
            nextContext.href = element.getAttribute("href") || ""
            nextContext.target = element.getAttribute("target") || undefined
            nextContext.rel = element.getAttribute("rel") || undefined
        }

        if (tagName === "strong" || tagName === "b") {
            nextContext.marks.strong = true
        }

        if (tagName === "em" || tagName === "i") {
            nextContext.marks.em = true
        }

        if (element.classList.contains("text-primary")) {
            nextContext.marks.highlight = true
        }

        if (element.classList.contains("pretext-lock") || element.dataset?.pretextLock != null) {
            nextContext.locked = true
        }

        Array.from(element.childNodes).forEach(child => {
            walkNode(child, paragraph, nextContext)
        })
    }

    Array.from(root.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && child.nodeName.toLowerCase() === "p") {
            if (rootParagraph.runs.length > 0) {
                paragraphs.push(rootParagraph)
                rootParagraph = createParagraph("root")
            }

            walkNode(child, null, createDefaultContext())
            return
        }

        walkNode(child, rootParagraph, createDefaultContext())
    })

    if (rootParagraph.runs.length > 0) paragraphs.push(rootParagraph)
    return paragraphs
}

export function readDraggableTypographySnapshot(elements) {
    const bodyElement = elements?.body
    const paragraphElement = elements?.paragraph
    const strongElement = elements?.strong
    const emElement = elements?.em
    const strongEmElement = elements?.strongEm

    if (!bodyElement || !paragraphElement || !strongElement || !emElement || !strongEmElement) {
        return null
    }

    const bodyStyle = window.getComputedStyle(bodyElement)
    const paragraphStyle = window.getComputedStyle(paragraphElement)
    const strongStyle = window.getComputedStyle(strongElement)
    const emStyle = window.getComputedStyle(emElement)
    const strongEmStyle = window.getComputedStyle(strongEmElement)

    const fontSize = parseFloat(bodyStyle.fontSize) || 16
    const lineHeight = resolvePixelValue(bodyStyle.lineHeight, fontSize * 1.5)
    const paragraphGap = resolvePixelValue(paragraphStyle.marginBottom, fontSize)

    return {
        fonts: {
            body: {
                font: bodyStyle.font || buildCanvasFont(bodyStyle),
                letterSpacing: resolveLetterSpacing(bodyStyle.letterSpacing)
            },
            strong: {
                font: strongStyle.font || buildCanvasFont(strongStyle),
                letterSpacing: resolveLetterSpacing(strongStyle.letterSpacing)
            },
            em: {
                font: emStyle.font || buildCanvasFont(emStyle),
                letterSpacing: resolveLetterSpacing(emStyle.letterSpacing)
            },
            strongEm: {
                font: strongEmStyle.font || buildCanvasFont(strongEmStyle),
                letterSpacing: resolveLetterSpacing(strongEmStyle.letterSpacing)
            }
        },
        lineHeight,
        paragraphGap
    }
}

export function layoutDraggableInlineParagraphs(paragraphs, typography, maxWidth, obstacle) {
    if (!typography || !Array.isArray(paragraphs) || paragraphs.length === 0 || maxWidth <= 0) {
        return {
            lines: [],
            totalHeight: 0
        }
    }

    const preparedParagraphs = paragraphs
        .map((paragraph, paragraphIndex) => {
            return createPreparedParagraph(paragraph, paragraphIndex, typography)
        })
        .filter(Boolean)

    const lines = []
    let offsetY = 0

    preparedParagraphs.forEach((paragraph, paragraphIndex) => {
        const paragraphLayout = layoutPreparedParagraph(paragraph, typography, maxWidth, obstacle, offsetY, paragraphIndex)
        lines.push(...paragraphLayout.lines)
        offsetY = paragraphLayout.nextOffsetY

        const marginBottom =
            paragraph.block === "p" && paragraphIndex !== preparedParagraphs.length - 1 ?
                typography.paragraphGap :
                0

        offsetY += marginBottom
    })

    const obstacleBottom =
        obstacle && obstacle.includeInHeight !== false ?
            obstacle.top + obstacle.height :
            0

    return {
        lines,
        totalHeight: Math.max(offsetY, obstacleBottom)
    }
}

function layoutPreparedParagraph(paragraph, typography, maxWidth, obstacle, offsetY, paragraphIndex) {
    const lines = []
    const safeWidth = Math.max(1, maxWidth)
    let lineTop = offsetY
    let cursor = undefined

    while (true) {
        const bandTop = lineTop
        const bandBottom = lineTop + typography.lineHeight
        const slots = getTextLineSlots(safeWidth, bandTop, bandBottom, obstacle)
        let consumedOnBand = false
        const startingCursorKey = createRichCursorKey(cursor)

        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
            const slot = slots[slotIndex]
            const slotWidth = slot.right - slot.left
            const lineRange = layoutNextRichInlineLineRange(paragraph.prepared, slotWidth, cursor)
            if (!lineRange) continue

            const line = materializeRichInlineLineRange(paragraph.prepared, lineRange)
            if (line.fragments.length === 0) {
                cursor = line.end
                continue
            }

            consumedOnBand = true
            lines.push({
                key: `paragraph-${paragraphIndex}-band-${lines.length}`,
                x: slot.left,
                y: lineTop,
                width: line.width,
                fragments: line.fragments.map(fragment => {
                    const item = paragraph.items[fragment.itemIndex]
                    return createFragment(item, fragment)
                })
            })
            cursor = line.end
        }

        lineTop += typography.lineHeight

        if (!consumedOnBand && startingCursorKey === createRichCursorKey(cursor)) {
            break
        }

        if (!cursor) {
            break
        }
    }

    return {
        lines,
        nextOffsetY: lineTop
    }
}

function createPreparedParagraph(paragraph, paragraphIndex, typography) {
    const items = paragraph.runs.map((run, runIndex) => {
        const fontConfig = getFontForMarks(typography.fonts, run.marks)

        return {
            key: `paragraph-${paragraphIndex}-run-${runIndex}`,
            marks: run.marks,
            href: run.href,
            target: run.target,
            rel: run.rel,
            locked: run.locked,
            text: run.text || "",
            font: fontConfig.font,
            letterSpacing: fontConfig.letterSpacing
        }
    })

    if (items.length === 0) return null

    const cacheKey = createPreparedParagraphCacheKey(paragraph, typography)
    const cachedPrepared = readCachedValue(preparedParagraphCache, cacheKey)
    if (cachedPrepared) {
        return {
            key: `paragraph-${paragraphIndex}`,
            block: paragraph.block,
            items,
            prepared: cachedPrepared
        }
    }

    const prepared = prepareRichInline(items.map(item => ({
        text: item.text,
        font: item.font,
        letterSpacing: item.letterSpacing,
        break: item.locked || item.href ? "never" : "normal"
    })))

    writeCachedValue(preparedParagraphCache, cacheKey, prepared, PREPARED_PARAGRAPH_CACHE_LIMIT)

    return {
        key: `paragraph-${paragraphIndex}`,
        block: paragraph.block,
        items,
        prepared
    }
}

function getFontForMarks(fonts, marks = {}) {
    if (marks.strong && marks.em) return fonts.strongEm
    if (marks.strong) return fonts.strong
    if (marks.em) return fonts.em
    return fonts.body
}

function getTextLineSlots(maxWidth, bandTop, bandBottom, obstacle) {
    const base = { left: 0, right: maxWidth }

    if (!obstacle) return [base]

    const blocked = getRectIntervalsForBand(
        [obstacle],
        bandTop,
        bandBottom,
        obstacle.horizontalPadding,
        obstacle.verticalPadding
    )

    return carveTextLineSlots(base, blocked, obstacle.minimumSlotWidth).sort((first, second) => first.left - second.left)
}

function getRectIntervalsForBand(rects, bandTop, bandBottom, horizontalPadding, verticalPadding) {
    const intervals = []

    for (let index = 0; index < rects.length; index++) {
        const rect = rects[index]
        if (bandBottom <= rect.top - verticalPadding || bandTop >= rect.top + rect.height + verticalPadding) {
            continue
        }

        intervals.push({
            left: rect.left - horizontalPadding,
            right: rect.left + rect.width + horizontalPadding
        })
    }

    return intervals
}

function carveTextLineSlots(base, blocked, minimumSlotWidth = 24) {
    let slots = [base]

    for (let blockedIndex = 0; blockedIndex < blocked.length; blockedIndex++) {
        const interval = blocked[blockedIndex]
        const next = []

        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
            const slot = slots[slotIndex]
            if (interval.right <= slot.left || interval.left >= slot.right) {
                next.push(slot)
                continue
            }

            if (interval.left > slot.left) {
                next.push({ left: slot.left, right: interval.left })
            }

            if (interval.right < slot.right) {
                next.push({ left: interval.right, right: slot.right })
            }
        }

        slots = next
    }

    return slots.filter(slot => slot.right - slot.left >= minimumSlotWidth)
}

function createFragment(item, fragment) {
    return {
        key: `${item.key}-${createCursorKey(fragment.start, fragment.end)}`,
        href: item.href,
        target: item.target,
        rel: item.rel,
        marks: item.marks,
        leadingGap: fragment.gapBefore,
        text: fragment.text,
        width: fragment.occupiedWidth
    }
}

function createParagraph(block) {
    return { block, runs: [] }
}

function createDefaultContext() {
    return {
        href: undefined,
        target: undefined,
        rel: undefined,
        locked: false,
        marks: {
            highlight: false,
            strong: false,
            em: false
        }
    }
}

function marksEqual(first, second) {
    return (
        first?.highlight === second?.highlight &&
        first?.strong === second?.strong &&
        first?.em === second?.em
    )
}

function buildCanvasFont(style) {
    const fontStyle = style.fontStyle || "normal"
    const fontVariant = style.fontVariant || "normal"
    const fontWeight = style.fontWeight || "400"
    const fontStretch = style.fontStretch && style.fontStretch !== "normal" ? `${style.fontStretch} ` : ""
    const fontSize = style.fontSize || "16px"
    const fontFamily = style.fontFamily || "sans-serif"

    return `${fontStyle} ${fontVariant} ${fontWeight} ${fontStretch}${fontSize} ${fontFamily}`.trim()
}

function resolvePixelValue(value, fallback) {
    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : fallback
}

function resolveLetterSpacing(value) {
    if (value === "normal") return 0

    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function createCursorKey(start, end) {
    return `${start.segmentIndex}:${start.graphemeIndex}-${end.segmentIndex}:${end.graphemeIndex}`
}

function createRichCursorKey(cursor) {
    if (!cursor) return "null"
    return `${cursor.itemIndex}:${cursor.segmentIndex}:${cursor.graphemeIndex}`
}

function createPreparedParagraphCacheKey(paragraph, typography) {
    return JSON.stringify({
        block: paragraph.block,
        fonts: {
            body: typography.fonts.body,
            strong: typography.fonts.strong,
            em: typography.fonts.em,
            strongEm: typography.fonts.strongEm
        },
        runs: paragraph.runs.map(run => ({
            href: run.href || "",
            target: run.target || "",
            rel: run.rel || "",
            locked: Boolean(run.locked),
            marks: run.marks,
            text: run.text || ""
        }))
    })
}

function readCachedValue(cache, key) {
    const cachedValue = cache.get(key)
    if (cachedValue === undefined) return null

    cache.delete(key)
    cache.set(key, cachedValue)
    return cachedValue
}

function writeCachedValue(cache, key, value, limit) {
    cache.set(key, value)

    if (cache.size <= limit) return

    const oldestKey = cache.keys().next().value
    if (oldestKey !== undefined) {
        cache.delete(oldestKey)
    }
}
