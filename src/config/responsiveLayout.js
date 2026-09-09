// All whole-page composition decisions live here. Values are CSS pixels/rem,
// independent of device pixel ratio and input capability.
export const layoutLimits = Object.freeze({ minWidthRem: 60, minHeightRem: 30, wideWidthRem: 90, wideRatio: 2.1 })

export function resolveLayout(width, height, rootFontSize = 16) {
    const rem = Math.max(1, rootFontSize || 16)
    if(width < height || width < layoutLimits.minWidthRem * rem || height < layoutLimits.minHeightRem * rem)
        return "mobile"
    return width >= layoutLimits.wideWidthRem * rem && width / height >= layoutLimits.wideRatio ? "ultrawide" : "normal"
}

export function readLayout(previous = null) {
    const width = window.innerWidth
    let height = window.innerHeight
    const editable = document.activeElement?.matches('input, textarea, [contenteditable="true"]')
    // Keyboard/chrome changes must not remount navigation around an active field.
    // Width changes (including rotation) always get a fresh composition.
    if(previous?.mode === "mobile" && previous.width === width && editable && window.matchMedia('(pointer: coarse)').matches)
        height = previous.height
    const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
    return { width, height, mode: resolveLayout(width, height, rootFont) }
}

export function applyLayout(layout) {
    document.documentElement.dataset.layout = layout.mode
    return layout
}
