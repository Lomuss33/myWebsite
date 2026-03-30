import { layoutNextLine, prepareWithSegments } from "@chenglou/pretext"

const LINE_START_CURSOR = { segmentIndex: 0, graphemeIndex: 0 }
const UNBOUNDED_WIDTH = 100000
const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })

const collapsedSpaceWidthCache = new Map()
const graphemeWidthCache = new Map()

/**
 * @param {String} html
 * @return {{ block: "root" | "p", items: Array<{ kind: "body" | "highlight" | "link", text: string, href?: string, target?: string, rel?: string }> }[]}
 */
export function parseInteractiveHtml(html) {
    if (!html) return []

    const parser = new DOMParser()
    const documentNode = parser.parseFromString(`<div>${html}</div>`, "text/html")
    const root = documentNode.body.firstElementChild
    if (!root) return []

    const paragraphs = []
    let rootParagraph = createParagraph("root")

    const pushText = (paragraph, item) => {
        if (!paragraph || !item.text) return

        const lastItem = paragraph.items[paragraph.items.length - 1]
        const canMerge =
            lastItem &&
            lastItem.kind === item.kind &&
            lastItem.href === item.href &&
            lastItem.target === item.target &&
            lastItem.rel === item.rel

        if (canMerge) {
            lastItem.text += item.text
            return
        }

        paragraph.items.push(item)
    }

    const walkNode = (node, paragraph, kind = "body", linkMeta = null) => {
        if (!node) return

        if (node.nodeType === Node.TEXT_NODE) {
            if (!paragraph) return
            pushText(paragraph, {
                kind,
                text: node.textContent || "",
                ...(linkMeta || {})
            })
            return
        }

        if (node.nodeType !== Node.ELEMENT_NODE) return

        const element = /** @type {HTMLElement} */ (node)
        const tagName = element.tagName.toLowerCase()

        if (tagName === "p") {
            const paragraphNode = createParagraph("p")
            Array.from(element.childNodes).forEach(child => {
                walkNode(child, paragraphNode, "body", null)
            })

            if (paragraphNode.items.length > 0) paragraphs.push(paragraphNode)
            return
        }

        if (tagName === "br") {
            if (paragraph?.items.length > 0) paragraphs.push(paragraph)
            rootParagraph = createParagraph("root")
            return
        }

        let nextKind = kind
        let nextLinkMeta = linkMeta

        if (tagName === "a") {
            nextKind = "link"
            nextLinkMeta = {
                href: element.getAttribute("href") || "",
                target: element.getAttribute("target") || undefined,
                rel: element.getAttribute("rel") || undefined
            }
        }
        else if (element.classList.contains("text-primary")) {
            nextKind = "highlight"
            nextLinkMeta = null
        }

        Array.from(element.childNodes).forEach(child => {
            walkNode(child, paragraph, nextKind, nextLinkMeta)
        })
    }

    Array.from(root.childNodes).forEach(child => {
        if (child.nodeType === Node.ELEMENT_NODE && child.nodeName.toLowerCase() === "p") {
            if (rootParagraph.items.length > 0) {
                paragraphs.push(rootParagraph)
                rootParagraph = createParagraph("root")
            }

            walkNode(child, null)
            return
        }

        walkNode(child, rootParagraph)
    })

    if (rootParagraph.items.length > 0) paragraphs.push(rootParagraph)
    return paragraphs
}

/**
 * @param {{ body: HTMLElement | null, paragraph: HTMLElement | null }} elements
 * @return {{ font: string, lineHeight: number, paragraphGap: number } | null}
 */
export function readTypographySnapshot(elements) {
    const bodyElement = elements?.body
    const paragraphElement = elements?.paragraph
    if (!bodyElement || !paragraphElement) return null

    const bodyStyle = window.getComputedStyle(bodyElement)
    const paragraphStyle = window.getComputedStyle(paragraphElement)

    const font = bodyStyle.font || buildCanvasFont(bodyStyle)
    const fontSize = parseFloat(bodyStyle.fontSize) || 16
    const lineHeight = resolvePixelValue(bodyStyle.lineHeight, fontSize * 1.5)
    const paragraphGap = resolvePixelValue(paragraphStyle.marginBottom, fontSize)

    return {
        font,
        lineHeight,
        paragraphGap
    }
}

/**
 * @param {{ items: Array<{ kind: "body" | "highlight" | "link", text: string, href?: string, target?: string, rel?: string }> }[]} paragraphs
 * @param {{ font: string, lineHeight: number, paragraphGap: number }} typography
 * @param {number} maxWidth
 * @return {{ paragraphs: Array<{ key: string, lines: Array<any>, marginBottom: number }>, totalHeight: number }}
 */
export function layoutInteractiveParagraphs(paragraphs, typography, maxWidth) {
    if (!typography || !Array.isArray(paragraphs) || paragraphs.length === 0 || maxWidth <= 0) {
        return {
            paragraphs: [],
            totalHeight: 0
        }
    }

    const preparedParagraphs = paragraphs
        .map((paragraph, paragraphIndex) => {
            return createPreparedParagraph(paragraph, paragraphIndex, typography.font)
        })
        .filter(Boolean)

    let totalHeight = 0

    const laidOutParagraphs = preparedParagraphs.map((paragraph, paragraphIndex) => {
        const lines = layoutPreparedParagraph(paragraph, typography.font, maxWidth)
        const marginBottom =
            paragraph.block === "p" && paragraphIndex !== preparedParagraphs.length - 1 ?
                typography.paragraphGap :
                0

        totalHeight += lines.length * typography.lineHeight + marginBottom

        return {
            key: paragraph.key,
            lines,
            marginBottom
        }
    })

    return {
        paragraphs: laidOutParagraphs,
        totalHeight
    }
}

function createParagraph(block) {
    return { block, items: [] }
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

function createPreparedParagraph(paragraph, paragraphIndex, font) {
    const collapsedSpaceWidth = measureCollapsedSpaceWidth(font)
    let pendingGap = 0

    const items = paragraph.items.reduce((collection, item, itemIndex) => {
        const rawText = item.text || ""
        const hasLeadingWhitespace = /^\s/.test(rawText)
        const hasTrailingWhitespace = /\s$/.test(rawText)
        const trimmedText = rawText.trim()
        const carryGap = pendingGap

        pendingGap = hasTrailingWhitespace ? collapsedSpaceWidth : 0
        if (!trimmedText) return collection

        const prepared = prepareWithSegments(trimmedText, font)
        const fullLine = layoutNextLine(prepared, LINE_START_CURSOR, UNBOUNDED_WIDTH)
        if (!fullLine) return collection

        collection.push({
            key: `paragraph-${paragraphIndex}-item-${itemIndex}`,
            kind: item.kind,
            href: item.href,
            target: item.target,
            rel: item.rel,
            leadingGap: collection.length === 0 ? 0 : (carryGap > 0 || hasLeadingWhitespace ? collapsedSpaceWidth : 0),
            prepared,
            fullText: fullLine.text,
            fullWidth: fullLine.width,
            endCursor: fullLine.end
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

function layoutPreparedParagraph(paragraph, font, maxWidth) {
    const lines = []
    const safeWidth = Math.max(1, maxWidth)

    let itemIndex = 0
    let cursor = null

    while (itemIndex < paragraph.items.length) {
        const fragments = []
        let lineWidth = 0
        let remainingWidth = safeWidth

        lineLoop:
        while (itemIndex < paragraph.items.length) {
            const item = paragraph.items[itemIndex]
            const leadingGap = fragments.length === 0 ? 0 : item.leadingGap

            if (cursor === null) {
                const fullWidth = leadingGap + item.fullWidth
                if (fullWidth <= remainingWidth) {
                    const fragment = createFragment(item, leadingGap, LINE_START_CURSOR, item.endCursor, item.fullText, item.fullWidth, font)
                    fragments.push(fragment)
                    lineWidth += fullWidth
                    remainingWidth = Math.max(0, safeWidth - lineWidth)
                    itemIndex++
                    continue
                }
            }

            if (fragments.length > 0 && leadingGap >= remainingWidth) break lineLoop

            const startCursor = cursor || LINE_START_CURSOR
            const line = layoutNextLine(item.prepared, startCursor, Math.max(1, remainingWidth - leadingGap))
            if (!line || cursorsMatch(startCursor, line.end)) {
                itemIndex++
                cursor = null
                continue
            }

            const fragment = createFragment(item, leadingGap, startCursor, line.end, line.text, line.width, font)
            fragments.push(fragment)
            lineWidth += leadingGap + line.width
            remainingWidth = Math.max(0, safeWidth - lineWidth)

            if (cursorsMatch(line.end, item.endCursor)) {
                itemIndex++
                cursor = null
                continue
            }

            cursor = line.end
            break lineLoop
        }

        if (fragments.length === 0) break

        const firstFragment = fragments[0]
        const lastFragment = fragments[fragments.length - 1]
        lines.push({
            key: createCursorKey(firstFragment.start, lastFragment.end),
            width: lineWidth,
            fragments
        })
    }

    return lines
}

function createFragment(item, leadingGap, start, end, text, width, font) {
    return {
        key: `${item.key}-${createCursorKey(start, end)}`,
        kind: item.kind,
        href: item.href,
        target: item.target,
        rel: item.rel,
        leadingGap,
        text,
        width,
        start,
        end,
        graphemes: measureGraphemes(text, font)
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

function measureGraphemes(text, font) {
    const graphemes = []
    let offsetX = 0

    for (const segment of graphemeSegmenter.segment(text)) {
        const grapheme = segment.segment
        const width = measureGraphemeWidth(grapheme, font)

        graphemes.push({
            text: grapheme,
            width,
            centerX: offsetX + width / 2
        })

        offsetX += width
    }

    return graphemes
}

function measureGraphemeWidth(grapheme, font) {
    const cacheKey = `${font}::${grapheme}`
    const cached = graphemeWidthCache.get(cacheKey)
    if (cached !== undefined) return cached

    const canvas = measureCanvas()
    const context = canvas.getContext("2d")
    context.font = font

    const width = context.measureText(grapheme).width
    graphemeWidthCache.set(cacheKey, width)
    return width
}

function measureCanvas() {
    if (!measureCanvas.canvas) {
        measureCanvas.canvas = document.createElement("canvas")
    }

    return measureCanvas.canvas
}

function cursorsMatch(first, second) {
    return first.segmentIndex === second.segmentIndex && first.graphemeIndex === second.graphemeIndex
}

function createCursorKey(start, end) {
    return `${start.segmentIndex}:${start.graphemeIndex}-${end.segmentIndex}:${end.graphemeIndex}`
}
