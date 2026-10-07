import assert from 'node:assert/strict'
import test from 'node:test'
import {containStickerX, measureStickerSpace} from '../src/components/sections/decorations/projectStickerGeometry.js'

test('rotated stickers remain inside narrow and wide panes beside their own card', () => {
    for(const pageWidth of [96, 180, 240, 280, 390, 768, 1366, 3440]) {
        const columns = pageWidth >= 768 ? 3 : 1
        const cardWidth = (pageWidth - 32) / columns
        for(let column = 0; column < columns; column++) {
            const cardLeft = 16 + cardWidth * column
            const width = Math.min(104, Math.max(40, cardWidth * .16), cardWidth * .26)
            for(const rotation of [-10, -8, 0, 7, 11]) {
                for(const proposed of [cardLeft - width, cardLeft + width * .62, cardLeft + cardWidth]) {
                    const x = containStickerX({left: proposed, width, height: width, rotation,
                        pageWidth, cardLeft, cardWidth, gutter: 10})
                    const angle = rotation * Math.PI / 180
                    const extent = (Math.abs(Math.cos(angle)) * width + Math.abs(Math.sin(angle)) * width - width) / 2
                    assert.ok(x - extent >= -1e-8)
                    assert.ok(x + width + extent <= pageWidth + 1e-8)
                    assert.ok(x - extent >= cardLeft - width * .12 - 1e-8)
                    assert.ok(x + width + extent <= cardLeft + cardWidth + width * .12 + 1e-8)
                }
            }
        }
    }
})

test('overlay coordinates preserve fractional dimensions and independent axis scaling', () => {
    const original = globalThis.getComputedStyle
    globalThis.getComputedStyle = () => ({width: '279.487px', height: '3000.125px'})
    try {
        const rect = {left: 12.3, top: 19.5, width: 419.2305, height: 2400.1}
        const space = measureStickerSpace({getBoundingClientRect: () => rect})
        assert.equal(space.width, 279.487)
        assert.equal(space.rect, rect)
        assert.ok(Math.abs(space.scaleX - 1.5) < 1e-8)
        assert.ok(Math.abs(space.scaleY - .8) < 1e-8)
        assert.equal(measureStickerSpace({getBoundingClientRect: () => ({width: 0, height: 0})}), null)
    }
    finally {globalThis.getComputedStyle = original}
})
