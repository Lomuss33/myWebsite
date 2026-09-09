// All whole-page composition decisions live here. Values are CSS pixels/rem,
// independent of device pixel ratio and input capability.
export const layoutLimits = Object.freeze({ wideWidthRem: 90, wideRatio: 2.1 })

export function resolveLayout(width, height, rootFontSize = 16) {
    const rem = Math.max(1, rootFontSize || 16)
    if(width < height)
        return "mobile"
    return width >= layoutLimits.wideWidthRem * rem && width / height >= layoutLimits.wideRatio ? "ultrawide" : "normal"
}

export function readLayout() {
    const width = window.innerWidth
    const height = window.innerHeight
    const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return { width, height, mode: resolveLayout(width, height, rootFont) }
}

export function applyLayout(layout) {
    document.documentElement.dataset.layout = layout.mode
    return layout
}
