import {
    layoutNextRichInlineLineRange,
    materializeRichInlineLineRange,
    prepareRichInline
} from "@chenglou/pretext/rich-inline"

const graphemeSegmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" })
const graphemeWidthCache = new Map()
const preparedParagraphCache = new Map()
const PREPARED_PARAGRAPH_CACHE_LIMIT = 160

/**
 * @param {String} html
 * @return {{ block: "root" | "p", items: Array<{ kind: "body" | "highlight" | "link", text: string, locked?: boolean, href?: string, target?: string, rel?: string }> }[]}
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
            Boolean(lastItem.locked) === Boolean(item.locked) &&
            lastItem.href === item.href &&
            lastItem.target === item.target &&
            lastItem.rel === item.rel

        if (canMerge) {
            lastItem.text += item.text
            return
        }

        paragraph.items.push(item)
    }

    const walkNode = (node, paragraph, kind = "body", linkMeta = null, locked = false) => {
        if (!node) return

        if (node.nodeType === Node.TEXT_NODE) {
            if (!paragraph) return
            pushText(paragraph, {
                kind,
                text: node.textContent || "",
                locked: locked || undefined,
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
        let nextLocked = locked

        if (tagName === "a") {
            nextKind = "link"
            nextLinkMeta = {
                href: element.getAttribute("href") || "",
                target: element.getAttribute("target") || undefined,
                rel: element.getAttribute("rel") || undefined
            }
        } else if (element.classList.contains("text-primary")) {
            nextKind = "highlight"
            nextLinkMeta = null
        }

        if (element.classList.contains("pretext-lock") || element.dataset?.pretextLock != null) {
            nextLocked = true
        }

        Array.from(element.childNodes).forEach(child => {
            walkNode(child, paragraph, nextKind, nextLinkMeta, nextLocked)
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
 * @return {{ font: string, lineHeight: number, paragraphGap: number, letterSpacing: number } | null}
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
        paragraphGap,
        letterSpacing: resolveLetterSpacing(bodyStyle.letterSpacing)
    }
}

/**
 * @param {{ items: Array<{ kind: "body" | "highlight" | "link", text: string, locked?: boolean, href?: string, target?: string, rel?: string }> }[]} paragraphs
 * @param {{ font: string, lineHeight: number, paragraphGap: number, letterSpacing: number }} typography
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
            return createPreparedParagraph(paragraph, paragraphIndex, typography)
        })
        .filter(Boolean)

    let totalHeight = 0

    const laidOutParagraphs = preparedParagraphs.map((paragraph, paragraphIndex) => {
        const lines = layoutPreparedParagraph(paragraph, typography, maxWidth)
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

export function getFragmentGraphemes(fragment) {
    if (!fragment) return []
    if (fragment.graphemes) return fragment.graphemes

    fragment.graphemes = measureGraphemes(fragment.text, fragment.font, fragment.letterSpacing)
    return fragment.graphemes
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

function resolveLetterSpacing(value) {
    if (value === "normal") return 0

    const parsed = parseFloat(value)
    return Number.isFinite(parsed) ? parsed : 0
}

function createPreparedParagraph(paragraph, paragraphIndex, typography) {
    const items = paragraph.items.map((item, itemIndex) => ({
        key: `paragraph-${paragraphIndex}-item-${itemIndex}`,
        kind: item.kind,
        locked: item.locked || item.kind === "link",
        href: item.href,
        target: item.target,
        rel: item.rel,
        text: item.text || "",
        font: typography.font,
        letterSpacing: typography.letterSpacing
    }))

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
        break: item.locked ? "never" : "normal"
    })))

    writeCachedValue(preparedParagraphCache, cacheKey, prepared, PREPARED_PARAGRAPH_CACHE_LIMIT)

    return {
        key: `paragraph-${paragraphIndex}`,
        block: paragraph.block,
        items,
        prepared
    }
}

function layoutPreparedParagraph(paragraph, typography, maxWidth) {
    const lines = []
    const safeWidth = Math.max(1, maxWidth)
    let cursor = undefined

    while (true) {
        const lineRange = layoutNextRichInlineLineRange(paragraph.prepared, safeWidth, cursor)
        if (!lineRange) break

        const line = materializeRichInlineLineRange(paragraph.prepared, lineRange)
        const fragments = line.fragments.map(fragment => {
            const item = paragraph.items[fragment.itemIndex]
            return createFragment(item, fragment)
        })

        if (fragments.length === 0) {
            cursor = line.end
            continue
        }

        lines.push({
            key: fragments.map(fragment => fragment.key).join("__"),
            width: line.width,
            fragments
        })

        cursor = line.end
    }

    return lines
}

function createFragment(item, fragment) {
    return {
        key: `${item.key}-${createCursorKey(fragment.start, fragment.end)}`,
        kind: item.kind,
        locked: item.locked,
        href: item.href,
        target: item.target,
        rel: item.rel,
        leadingGap: fragment.gapBefore,
        text: fragment.text,
        width: fragment.occupiedWidth,
        start: fragment.start,
        end: fragment.end,
        font: item.font,
        letterSpacing: item.letterSpacing,
        graphemes: null
    }
}

function measureGraphemes(text, font, letterSpacing = 0) {
    const rawSegments = Array.from(graphemeSegmenter.segment(text), segment => segment.segment)
    const graphemes = []
    let offsetX = 0

    rawSegments.forEach((grapheme, index) => {
        const width =
            measureGraphemeWidth(grapheme, font) +
            (index < rawSegments.length - 1 ? letterSpacing : 0)

        graphemes.push({
            text: grapheme,
            width,
            centerX: offsetX + width / 2
        })

        offsetX += width
    })

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

function createCursorKey(start, end) {
    return `${start.segmentIndex}:${start.graphemeIndex}-${end.segmentIndex}:${end.graphemeIndex}`
}

function createPreparedParagraphCacheKey(paragraph, typography) {
    return JSON.stringify({
        font: typography.font,
        letterSpacing: typography.letterSpacing,
        block: paragraph.block,
        items: paragraph.items.map(item => ({
            kind: item.kind,
            locked: Boolean(item.locked),
            href: item.href || "",
            target: item.target || "",
            rel: item.rel || "",
            text: item.text || ""
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
