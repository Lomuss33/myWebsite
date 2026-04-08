import { layoutNextLine, prepareWithSegments } from "@chenglou/pretext"

const LINE_START_CURSOR = { segmentIndex: 0, graphemeIndex: 0 }
const UNBOUNDED_WIDTH = 100000

const collapsedSpaceWidthCache = new Map()
const sentenceSegmenter =
    typeof Intl !== "undefined" && Intl.Segmenter ?
        new Intl.Segmenter(undefined, { granularity: "sentence" }) :
        null

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
            body: bodyStyle.font || buildCanvasFont(bodyStyle),
            strong: strongStyle.font || buildCanvasFont(strongStyle),
            em: emStyle.font || buildCanvasFont(emStyle),
            strongEm: strongEmStyle.font || buildCanvasFont(strongEmStyle)
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
    let itemIndex = 0
    let cursor = null

    while (itemIndex < paragraph.items.length) {
        const bandTop = lineTop
        const bandBottom = lineTop + typography.lineHeight
        const slots = getTextLineSlots(safeWidth, bandTop, bandBottom, obstacle)
        let consumedOnBand = false
        const previousItemIndex = itemIndex
        const previousCursor = cursor

        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
            if (itemIndex >= paragraph.items.length) break

            const slot = slots[slotIndex]
            const laidOut = layoutNextFragments(paragraph.items, itemIndex, cursor, slot.right - slot.left)

            itemIndex = laidOut.itemIndex
            cursor = laidOut.cursor

            if (laidOut.fragments.length === 0) continue

            consumedOnBand = true
            lines.push({
                key: `paragraph-${paragraphIndex}-band-${lines.length}`,
                x: slot.left,
                y: lineTop,
                width: laidOut.width,
                fragments: laidOut.fragments
            })
        }

        lineTop += typography.lineHeight

        if (!consumedOnBand && previousItemIndex === itemIndex && cursorsMatchNullable(previousCursor, cursor)) {
            break
        }
    }

    return {
        lines,
        nextOffsetY: lineTop
    }
}

function layoutNextFragments(items, startItemIndex, startCursor, maxWidth) {
    const safeWidth = Math.max(1, maxWidth)
    const fragments = []
    let itemIndex = startItemIndex
    let cursor = startCursor
    let lineWidth = 0
    let remainingWidth = safeWidth

    while (itemIndex < items.length) {
        const item = items[itemIndex]
        const leadingGap = fragments.length === 0 ? 0 : item.leadingGap

        if (cursor === null) {
            const fullWidth = leadingGap + item.fullWidth
            if (fullWidth <= remainingWidth) {
                fragments.push(createFragment(item, leadingGap, LINE_START_CURSOR, item.endCursor, item.fullText, item.fullWidth))
                lineWidth += fullWidth
                remainingWidth = Math.max(0, safeWidth - lineWidth)
                itemIndex += 1
                continue
            }

            // Word-safe wrapping:
            // If a whole token doesn't fit and we already have content on this line,
            // move it to the next line instead of splitting into characters.
            if (fragments.length > 0) {
                break
            }

            // If the next token is a full word that doesn't fit, don't split it into characters.
            // We prefer letting the line overflow horizontally rather than cutting a word in half.
            // Only do this when the word is longer than the entire line width.
            if (fragments.length === 0 && leadingGap === 0 && item.fullText && item.fullWidth > safeWidth) {
                fragments.push(createFragment(item, 0, LINE_START_CURSOR, item.endCursor, item.fullText, item.fullWidth))
                lineWidth += item.fullWidth
                remainingWidth = Math.max(0, safeWidth - lineWidth)
                itemIndex += 1
                cursor = null
                continue
            }
        }

        if (fragments.length > 0 && leadingGap >= remainingWidth) {
            break
        }

        const startCursorForItem = cursor || LINE_START_CURSOR
        const line = layoutNextLine(item.prepared, startCursorForItem, Math.max(1, remainingWidth - leadingGap))

        if (!line || cursorsMatch(startCursorForItem, line.end)) {
            itemIndex += 1
            cursor = null
            continue
        }

        fragments.push(createFragment(item, leadingGap, startCursorForItem, line.end, line.text, line.width))
        lineWidth += leadingGap + line.width
        remainingWidth = Math.max(0, safeWidth - lineWidth)

        if (cursorsMatch(line.end, item.endCursor)) {
            itemIndex += 1
            cursor = null
            continue
        }

        cursor = line.end
        break
    }

    return {
        fragments,
        width: lineWidth,
        itemIndex,
        cursor
    }
}

function createPreparedParagraph(paragraph, paragraphIndex, typography) {
    const collapsedSpaceWidth = measureCollapsedSpaceWidth(typography.fonts.body)
    let pendingGap = 0

    const items = paragraph.runs.reduce((collection, run, runIndex) => {
        const pieces = splitRunIntoPieces(run.text || "")

        pieces.forEach((rawPiece, pieceIndex) => {
            const hasLeadingWhitespace = /^\s/.test(rawPiece)
            const hasTrailingWhitespace = /\s$/.test(rawPiece)
            const trimmedText = rawPiece.trim()
            const carryGap = pendingGap

            pendingGap = hasTrailingWhitespace ? collapsedSpaceWidth : 0
            if (!trimmedText) return

            const font = getFontForMarks(typography.fonts, run.marks)
            const prepared = prepareWithSegments(trimmedText, font)
            const fullLine = layoutNextLine(prepared, LINE_START_CURSOR, UNBOUNDED_WIDTH)
            if (!fullLine) return

            collection.push({
                key: `paragraph-${paragraphIndex}-run-${runIndex}-piece-${pieceIndex}`,
                marks: run.marks,
                href: run.href,
                target: run.target,
                rel: run.rel,
                leadingGap: collection.length === 0 ? 0 : (carryGap > 0 || hasLeadingWhitespace ? collapsedSpaceWidth : 0),
                prepared,
                fullText: fullLine.text,
                fullWidth: fullLine.width,
                endCursor: fullLine.end
            })
        })

        return collection
    }, [])

    if (items.length === 0) return null

    return {
        key: `paragraph-${paragraphIndex}`,
        block: paragraph.block,
        items
    }
}

function splitRunIntoPieces(text) {
    if (!text) return []

    // Word-safe wrapping: we never want to split a word across line slots.
    // By splitting runs into word tokens (with trailing whitespace), the layout
    // engine can only wrap between words.
    const tokens = text.match(/[^\s]+\s*/g)
    return tokens?.length ? tokens : [text]
}

function splitIntoSentencePieces(text) {
    if (!text) return []

    if (sentenceSegmenter) {
        const segments = Array.from(sentenceSegmenter.segment(text), segment => segment.segment)
        if (segments.length > 0) return segments
    }

    const matches = text.match(/[^.!?]+(?:[.!?]+(?=\s|$))?\s*|[.!?]+\s*/g)
    return matches?.length ? matches : [text]
}

function splitIntoClausePieces(text) {
    if (!text) return []

    const matches = text.match(/[^,;:—–]+(?:[,;:—–]+(?=\s|$)|[,;:—–]+)?\s*|[,;:—–]+\s*/g)
    return matches?.length ? matches : [text]
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

    return carveTextLineSlots(base, blocked).sort((first, second) => first.left - second.left)
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

function carveTextLineSlots(base, blocked) {
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

    return slots.filter(slot => slot.right - slot.left >= 24)
}

function createFragment(item, leadingGap, start, end, text, width) {
    return {
        key: `${item.key}-${createCursorKey(start, end)}`,
        href: item.href,
        target: item.target,
        rel: item.rel,
        marks: item.marks,
        leadingGap,
        text,
        width
    }
}

function measureCollapsedSpaceWidth(font) {
    const cached = collapsedSpaceWidthCache.get(font)
    if (cached !== undefined) return cached

    const joinedWidth = measureSingleLineWidth("A A", font)
    const compactWidth = measureSingleLineWidth("AA", font)
    const collapsedWidth = Math.max(0, joinedWidth - compactWidth)

    collapsedSpaceWidthCache.set(font, collapsedWidth)
    return collapsedWidth
}

function measureSingleLineWidth(text, font) {
    const prepared = prepareWithSegments(text, font)
    const line = layoutNextLine(prepared, LINE_START_CURSOR, UNBOUNDED_WIDTH)
    return line?.width || 0
}

function createParagraph(block) {
    return { block, runs: [] }
}

function createDefaultContext() {
    return {
        href: undefined,
        target: undefined,
        rel: undefined,
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

function cursorsMatch(first, second) {
    return first.segmentIndex === second.segmentIndex && first.graphemeIndex === second.graphemeIndex
}

function cursorsMatchNullable(first, second) {
    if (first === null && second === null) return true
    if (first === null || second === null) return false
    return cursorsMatch(first, second)
}

function createCursorKey(start, end) {
    return `${start.segmentIndex}:${start.graphemeIndex}-${end.segmentIndex}:${end.graphemeIndex}`
}
