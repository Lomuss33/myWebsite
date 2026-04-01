export const BASE_PAGE_WIDTH = 700
export const BASE_MARGIN = 45
export const BASE_FONT_SIZE = 21
export const BASE_LINE_HEIGHT = 34
export const FONT_STACK = '"IM Fell English", "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, "Georgia", serif'
export const TEXT_COLOR = "#2a1a0a"
export const BG_COLOR = "#f4eee0"

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
    const pageWidth = Math.max(180, Math.min(BASE_PAGE_WIDTH, safeWidth - 40))
    const widthScale = pageWidth / BASE_PAGE_WIDTH
    const pageHeight = Math.max(220, safeHeight - 60)
    const margin = Math.round(BASE_MARGIN * widthScale)
    const fontScale = 0.4 + 0.6 * widthScale
    const fontSize = Math.max(14, Math.round(BASE_FONT_SIZE * fontScale))
    const lineHeight = Math.max(22, Math.round(BASE_LINE_HEIGHT * fontScale))
    const font = `${fontSize}px ${FONT_STACK}`

    return { pageWidth, pageHeight, margin, fontSize, lineHeight, font }
}

export function getPageOffset(layout, viewportWidth, viewportHeight) {
    return {
        x: Math.round((viewportWidth - layout.pageWidth) / 2),
        y: Math.round(Math.max(20, (viewportHeight - layout.pageHeight) / 2))
    }
}

export function getPageScale(viewportWidth) {
    const pageWidth = Math.max(180, Math.min(BASE_PAGE_WIDTH, (viewportWidth || BASE_PAGE_WIDTH) - 40))
    return Math.min(1, pageWidth / BASE_PAGE_WIDTH)
}
