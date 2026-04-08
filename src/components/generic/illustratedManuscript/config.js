export const BASE_PAGE_WIDTH = 700
export const BASE_MARGIN = 20
export const BASE_FONT_SIZE = 21
export const BASE_LINE_HEIGHT = 34
export const FONT_STACK = '"IM Fell English", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Georgia", serif'
export const TEXT_COLOR = "#2a1a0a"
export const BG_COLOR = "#f4eee0"
export const MANUSCRIPT_TEXT_SCALE = 0.58
export const MANUSCRIPT_DROP_CAP_SCALE = 0.42
export const MANUSCRIPT_DRAGON_SCALE = 0.519915 * 0.95
export const MANUSCRIPT_ILLUSTRATION_SCALE = 0.56

export const DRAGON_SEGMENT_COUNT = 20
export const DRAGON_SEGMENT_SPACING = 30
export const DRAGON_SPRITE_SCALE = 0.24
export const WING_SEGMENT_INDEX = 5
export const DRAGON_SEGMENT_WIDTHS = [221, 130, 203, 223, 285, 299, 281, 224, 192, 174, 191, 156, 155, 122, 126, 125, 107, 101, 101, 81]
export const FIRE_COLORS = ["#C4402A", "#E08A30", "#F0C030"]
export const FIRE_STEP_INTERVAL = 80
export const MOUSE_IDLE_TIMEOUT = 2000

export function getResponsiveLayout(viewportWidth, viewportHeight) {
    const safeWidth = Math.max(220, viewportWidth || BASE_PAGE_WIDTH)
    const safeHeight = Math.max(260, viewportHeight || BASE_PAGE_WIDTH)
    const pageWidth = safeWidth
    const widthScale = Math.min(1, pageWidth / BASE_PAGE_WIDTH)
    const pageHeight = safeHeight
    const margin = Math.max(12, Math.round(BASE_MARGIN * (0.7 + widthScale * 0.3)))
    const fontScale = 0.76 + 0.24 * widthScale
    const fontSize = Math.max(11, Math.round(BASE_FONT_SIZE * fontScale * MANUSCRIPT_TEXT_SCALE))
    const lineHeight = Math.max(17, Math.round(BASE_LINE_HEIGHT * fontScale * MANUSCRIPT_TEXT_SCALE))
    const font = `${fontSize}px ${FONT_STACK}`

    return { pageWidth, pageHeight, margin, fontSize, lineHeight, font }
}

export function getPageOffset(layout, viewportWidth, viewportHeight) {
    return {
        x: Math.round((viewportWidth - layout.pageWidth) / 2),
        y: Math.round((viewportHeight - layout.pageHeight) / 2)
    }
}

export function getPageScale(viewportWidth) {
    const pageWidth = Math.max(180, viewportWidth || BASE_PAGE_WIDTH)
    return Math.min(1, pageWidth / BASE_PAGE_WIDTH)
}
