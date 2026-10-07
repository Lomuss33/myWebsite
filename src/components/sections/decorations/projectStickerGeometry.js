// Measure the overlay's own coordinate space, including fractional CSS sizing
// and inherited scale/zoom. Its origin can differ from the section border box.
export function measureStickerSpace(layer) {
    const rect = layer.getBoundingClientRect()
    const style = getComputedStyle(layer)
    const width = parseFloat(style.width)
    const height = parseFloat(style.height)
    if(!(rect.width > 0 && rect.height > 0 && width > 0 && height > 0))
        return null
    return {rect, width, scaleX: rect.width / width, scaleY: rect.height / height}
}

export function containStickerX({left, width, height, rotation, pageWidth, cardLeft, cardWidth, gutter}) {
    const angle = rotation * Math.PI / 180
    const rotatedWidth = Math.abs(Math.cos(angle)) * width + Math.abs(Math.sin(angle)) * height
    const overhang = Math.max(0, (rotatedWidth - width) / 2)
    const inset = Math.min(gutter, Math.max(0, (pageWidth - rotatedWidth) / 2))
    const overlap = width * 0.12
    const min = Math.max(inset + overhang, cardLeft - overlap + overhang)
    const max = Math.min(pageWidth - inset - width - overhang,
        cardLeft + cardWidth + overlap - width - overhang)
    return min <= max ? Math.max(min, Math.min(max, left)) :
        Math.max(inset + overhang, Math.min(pageWidth - inset - width - overhang,
            cardLeft + (cardWidth - width) / 2))
}
