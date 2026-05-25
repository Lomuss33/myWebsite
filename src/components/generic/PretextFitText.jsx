import React, {useEffect, useRef, useState} from "react"
import { layout, prepare } from "@chenglou/pretext"

const PREPARED_TEXT_CACHE = new Map()
const PREPARED_TEXT_CACHE_LIMIT = 400
const DEFAULT_MIN_FONT_SIZE_PX = 11
const DEFAULT_MAX_FONT_SIZE_PX = 22
const DEFAULT_LINE_HEIGHT_RATIO = 1.34
const DEFAULT_BINARY_SEARCH_PRECISION_PX = 0.2

function PretextFitText({
    text,
    as = "div",
    className = "",
    minFontSizePx = DEFAULT_MIN_FONT_SIZE_PX,
    maxFontSizePx = DEFAULT_MAX_FONT_SIZE_PX,
    lineHeightRatio = DEFAULT_LINE_HEIGHT_RATIO
}) {
    const Component = as
    const elementRef = useRef(null)
    const frameRef = useRef(null)
    const [fitState, setFitState] = useState(() => {
        return buildFitState(maxFontSizePx, lineHeightRatio)
    })

    useEffect(() => {
        const element = elementRef.current
        if(!element)
            return

        let resizeObserver = null
        let cancelled = false

        const scheduleMeasure = () => {
            if(cancelled)
                return

            if(frameRef.current != null)
                cancelAnimationFrame(frameRef.current)

            frameRef.current = requestAnimationFrame(() => {
                frameRef.current = null
                if(cancelled) return

                const nextState = measureBestFit({
                    element,
                    text,
                    minFontSizePx,
                    maxFontSizePx,
                    lineHeightRatio
                })

                setFitState(prevState => {
                    if(prevState.fontSizePx === nextState.fontSizePx && prevState.lineHeight === nextState.lineHeight) {
                        return prevState
                    }

                    return nextState
                })
            })
        }

        scheduleMeasure()

        if(typeof ResizeObserver === "function") {
            resizeObserver = new ResizeObserver(scheduleMeasure)
            resizeObserver.observe(element)
        }
        else {
            window.addEventListener("resize", scheduleMeasure)
        }

        return () => {
            cancelled = true

            if(frameRef.current != null) {
                cancelAnimationFrame(frameRef.current)
                frameRef.current = null
            }

            if(resizeObserver) {
                resizeObserver.disconnect()
            }
            else {
                window.removeEventListener("resize", scheduleMeasure)
            }
        }
    }, [text, minFontSizePx, maxFontSizePx, lineHeightRatio])

    return (
        <Component ref={elementRef}
                   className={className}
                   style={{
                       "--pretext-fit-font-size": `${fitState.fontSizePx}px`,
                       "--pretext-fit-line-height": `${fitState.lineHeight}px`
                   }}>
            {text}
        </Component>
    )
}

export default PretextFitText

function measureBestFit({ element, text, minFontSizePx, maxFontSizePx, lineHeightRatio }) {
    const width = element.clientWidth
    const height = element.clientHeight

    if(width <= 0 || height <= 0) {
        return buildFitState(maxFontSizePx, lineHeightRatio)
    }

    const normalizedText = String(text || "").trim()
    if(normalizedText.length === 0) {
        return buildFitState(maxFontSizePx, lineHeightRatio)
    }

    const computedStyles = window.getComputedStyle(element)
    const fontFamily = computedStyles.fontFamily || "sans-serif"
    const fontWeight = computedStyles.fontWeight || "400"
    const fontStyle = computedStyles.fontStyle || "normal"
    const fontVariant = computedStyles.fontVariant || "normal"
    const whiteSpace = computedStyles.whiteSpace === "pre-wrap" ? "pre-wrap" : "normal"
    const wordBreak = computedStyles.wordBreak === "keep-all" ? "keep-all" : "normal"

    const canFitAt = (fontSizePx) => {
        const font = buildCanvasFont({ fontStyle, fontVariant, fontWeight, fontFamily, fontSizePx })
        const prepared = getPreparedText(normalizedText, font, { whiteSpace, wordBreak })
        const lineHeight = fontSizePx * lineHeightRatio
        const result = layout(prepared, width, lineHeight)
        return result.height <= height
    }

    let low = minFontSizePx
    let high = maxFontSizePx
    let best = minFontSizePx

    if(canFitAt(high)) {
        best = high
    }
    else if(!canFitAt(low)) {
        best = low
    }
    else {
        while((high - low) > DEFAULT_BINARY_SEARCH_PRECISION_PX) {
            const mid = (low + high) / 2

            if(canFitAt(mid)) {
                best = mid
                low = mid
            }
            else {
                high = mid
            }
        }
    }

    return buildFitState(best, lineHeightRatio)
}

function buildCanvasFont({ fontStyle, fontVariant, fontWeight, fontFamily, fontSizePx }) {
    return [fontStyle, fontVariant, fontWeight, `${fontSizePx}px`, fontFamily]
        .filter(Boolean)
        .join(" ")
}

function getPreparedText(text, font, options) {
    const cacheKey = `${font}::${options.whiteSpace}::${options.wordBreak}::${text}`

    if(PREPARED_TEXT_CACHE.has(cacheKey)) {
        return PREPARED_TEXT_CACHE.get(cacheKey)
    }

    const prepared = prepare(text, font, options)
    PREPARED_TEXT_CACHE.set(cacheKey, prepared)

    if(PREPARED_TEXT_CACHE.size > PREPARED_TEXT_CACHE_LIMIT) {
        const firstKey = PREPARED_TEXT_CACHE.keys().next().value
        if(firstKey !== undefined)
            PREPARED_TEXT_CACHE.delete(firstKey)
    }

    return prepared
}

function buildFitState(fontSizePx, lineHeightRatio) {
    const roundedFontSize = roundToQuarter(fontSizePx)
    return {
        fontSizePx: roundedFontSize,
        lineHeight: roundToQuarter(roundedFontSize * lineHeightRatio)
    }
}

function roundToQuarter(value) {
    return Math.round(value * 4) / 4
}
