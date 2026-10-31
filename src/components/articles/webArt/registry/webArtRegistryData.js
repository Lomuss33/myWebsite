export const DESIRED_WEB_ART_ITEM_ORDER = [
    4, 5, 3, 6, 1, 2, 7, 8, 9, 10, 11, 12, 13, 14, 15
]

export const ITEM_TILE_LABELS_BY_ID = {
    1: "Hover",
    2: "Wave",
    3: "3D",
    4: "Poly",
    5: "Click",
    6: "Orbit",
    7: "Spin",
    8: "Shape",
    9: "Hourglass",
    10: "Noice",
    11: "Distance",
    12: "Android",
    13: "Pulse",
    14: "Bars",
    15: "Deep"
}

export const AMBIENT_TILE_SPECS = [
    { key: "ambient-trace", suffix: "ambient-trace", label: "Trace", placeholderKey: "trace", trackedReady: true },
    { key: "ambient-hex", suffix: "ambient-hex", label: "Hex", placeholderKey: "hex", trackedReady: true },
    { key: "ambient-plop", suffix: "ambient-plop", label: "Plop", placeholderKey: "plop", trackedReady: true },
    { key: "ambient-julia", suffix: "ambient-julia", label: "Julia", placeholderKey: "julia", trackedReady: true },
    { key: "ambient-mines", suffix: "ambient-mines", label: "Bomb", placeholderKey: "mines", trackedReady: true },
    { key: "ambient-rings", suffix: "ambient-rings", label: "Fall", placeholderKey: "rings", trackedReady: true },
    { key: "ambient-prism", suffix: "ambient-prism", label: "Prism", placeholderKey: "prism", trackedReady: true },
    { key: "ambient-rope", suffix: "ambient-rope", label: "Rope", placeholderKey: "rope", trackedReady: true },
    { key: "ambient-soup", suffix: "ambient-soup", label: "Soup", placeholderKey: "soup", trackedReady: true },
    { key: "ambient-tardis", suffix: "ambient-tardis", label: "Tardis", placeholderKey: "tardis", trackedReady: true },
    { key: "ambient-goldfish", staticTileId: "ambient-goldfish", label: "Fish", placeholderKey: null, trackedReady: false },
    { key: "ambient-patronus", staticTileId: "ambient-patronus", label: "Patronus", placeholderKey: null, trackedReady: false }
]

export const CAROUSEL_SLIDE_SWAPS = [
    ["Wave", "Julia"],
    ["Julia", "Poly"],
    ["Plop", "Click"]
]

export function orderWebArtItems(rawItems = []) {
    const byId = new Map(rawItems.map((item) => [Number(item?.id), item]))
    const ordered = []

    for(const id of DESIRED_WEB_ART_ITEM_ORDER) {
        const item = byId.get(id)
        if(item) ordered.push(item)
    }

    for(const item of rawItems) {
        if(!item) continue
        const id = Number(item?.id)
        if(DESIRED_WEB_ART_ITEM_ORDER.includes(id)) continue
        ordered.push(item)
    }

    return ordered
}

export function getItemTileLabel(itemWrapper, index) {
    const itemId = Number(itemWrapper?.id)
    if(ITEM_TILE_LABELS_BY_ID[itemId]) {
        return ITEM_TILE_LABELS_BY_ID[itemId]
    }
    return String(index + 1)
}

export function resolveAmbientTileId(articleUniqueId, spec) {
    if(spec.staticTileId) return spec.staticTileId
    return `${articleUniqueId}-${spec.suffix}`
}

export function buildAllWebArtTileIds(articleUniqueId, orderedItems = []) {
    const ids = orderedItems.map((item) => item?.uniqueId).filter(Boolean)
    const byKey = new Map(AMBIENT_TILE_SPECS.map((spec) => [spec.key, resolveAmbientTileId(articleUniqueId, spec)]))
    // Preserve exact insertion order from original ArticleWebArt
    ids.push(
        byKey.get("ambient-trace"),
        byKey.get("ambient-hex"),
        byKey.get("ambient-plop"),
        byKey.get("ambient-julia"),
        byKey.get("ambient-mines"),
        byKey.get("ambient-prism"),
        byKey.get("ambient-rings"),
        byKey.get("ambient-rope"),
        byKey.get("ambient-soup"),
        byKey.get("ambient-tardis"),
        byKey.get("ambient-goldfish"),
        byKey.get("ambient-patronus")
    )
    return new Set(ids.filter(Boolean))
}

export function applyCarouselSlideSwaps(slides, swaps = CAROUSEL_SLIDE_SWAPS) {
    const next = [...slides]
    for(const [firstLabel, secondLabel] of swaps) {
        const firstIndex = next.findIndex(({ label }) => label === firstLabel)
        const secondIndex = next.findIndex(({ label }) => label === secondLabel)
        if(firstIndex < 0 || secondIndex < 0) continue
        const firstSlide = next[firstIndex]
        next[firstIndex] = next[secondIndex]
        next[secondIndex] = firstSlide
    }
    return next
}
