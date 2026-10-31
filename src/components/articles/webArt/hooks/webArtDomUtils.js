export const WEB_ART_STAGE_PREVIEW_HEIGHT = 248
export const WEB_ART_STAGE_TRANSITION_FALLBACK_MS = 460
export const WEB_ART_STAGE_PHASE = {
    PREVIEW: "preview",
    EXPANDING: "expanding",
    OPEN: "open",
    COLLAPSING: "collapsing"
}

export const INITIAL_WEB_ART_ITEM_MOUNT_COUNT = 2
export const MOBILE_WEB_ART_OPEN_TILE_LIMIT = 6

export function scheduleIdleWork(work, { timeoutMs = 1200 } = {}) {
    if(typeof window === "undefined") {
        work()
        return () => {}
    }

    if("requestIdleCallback" in window) {
        const id = window.requestIdleCallback(() => work(), { timeout: timeoutMs })
        return () => window.cancelIdleCallback(id)
    }

    const id = window.setTimeout(() => work(), 0)
    return () => window.clearTimeout(id)
}

export function measureTileContentSize(element) {
    if(!element) {
        return { width: 1, height: 1 }
    }

    const rect = element.getBoundingClientRect()
    const parentRect = element.parentElement?.getBoundingClientRect?.()
    const fallbackWidth = parentRect?.width || element.parentElement?.clientWidth || 1
    const fallbackHeight = parentRect?.height || element.parentElement?.clientHeight || fallbackWidth
    const width = Math.max(1, Math.round(rect.width || element.clientWidth || fallbackWidth || 1))
    const height = Math.max(1, Math.round(rect.height || element.clientHeight || fallbackHeight || width || 1))
    return { width, height }
}

export function syncTileEngineSize(tile, engine, devicePixelRatio = 1) {
    const { width, height } = measureTileContentSize(tile)
    const isCoarsePointer = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)")?.matches
    const safeDevicePixelRatio = Math.min(isCoarsePointer ? 1 : 1.5, Math.max(1, Number(devicePixelRatio) || 1))
    if((width < 32 || height < 32) && typeof window !== "undefined") {
        window.requestAnimationFrame(() => {
            const retrySize = measureTileContentSize(tile)
            if(retrySize.width >= 32 && retrySize.height >= 32) {
                engine?.setSize?.(retrySize.width, retrySize.height, safeDevicePixelRatio)
            }
        })
        return
    }
    engine?.setSize?.(width, height, safeDevicePixelRatio)
}

export function prefersReducedMotion() {
    if(typeof window === "undefined" || !window.matchMedia) return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function getWebArtStagePreviewHeight(stage) {
    if(!stage || typeof window === "undefined")
        return WEB_ART_STAGE_PREVIEW_HEIGHT

    const rawValue = window.getComputedStyle(stage).getPropertyValue("--article-web-art-stage-preview-height")
    const parsedValue = Number.parseFloat(rawValue)
    if(Number.isFinite(parsedValue) && parsedValue > 0)
        return Math.ceil(parsedValue)

    return WEB_ART_STAGE_PREVIEW_HEIGHT
}

export function isMobileWebArtLayout() {
    if(typeof window === "undefined" || !window.matchMedia)
        return false

    return window.matchMedia("(pointer: coarse), (max-width: 767px)").matches
}

export function limitWebArtTileSetForMobile(tileIds, isMobile = isMobileWebArtLayout()) {
    const next = new Set(tileIds)
    if(!isMobile)
        return next

    while(next.size > MOBILE_WEB_ART_OPEN_TILE_LIMIT) {
        next.delete(next.values().next().value)
    }

    return next
}

export function getOpenAllWebArtTileIds(tileIds, isMobile = isMobileWebArtLayout()) {
    if(!isMobile)
        return new Set(tileIds)

    const next = new Set()
    for(const tileId of tileIds) {
        if(next.size >= MOBILE_WEB_ART_OPEN_TILE_LIMIT)
            break
        next.add(tileId)
    }

    return next
}

export function tileSetContainsAll(tileIds, targetTileIds) {
    if(targetTileIds.size === 0)
        return false

    for(const tileId of targetTileIds) {
        if(!tileIds.has(tileId))
            return false
    }

    return true
}

export function makePlaceholderAriaLabel(label) {
    return `Web art ${String(label || "tile").toLowerCase()} tile loading`
}

export function getNormalizedPointerPosition(surface, event, fallback = { x: 0.5, y: 0.5 }) {
    if(!surface || !event) return fallback
    const rect = surface.getBoundingClientRect()
    return {
        x: Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width))),
        y: Math.max(0, Math.min(1, (event.clientY - rect.top) / Math.max(1, rect.height)))
    }
}

export function getLocalPointerPosition(surface, event, fallback = { x: 0, y: 0 }) {
    if(!surface || !event) return fallback
    const rect = surface.getBoundingClientRect()
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}
