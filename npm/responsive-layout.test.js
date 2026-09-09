import test from 'node:test'
import assert from 'node:assert/strict'
import {resolveLayout} from '../src/config/responsiveLayout.js'

test('only portrait displays use mobile composition', () => {
    for(const [w,h] of [[240,320],[320,568],[768,1024],[1080,1920],[1920,3840]])
        assert.equal(resolveLayout(w,h), 'mobile', `${w}x${h}`)
})
test('normal windows do not become ultrawide just by exceeding 1680px', () => {
    for(const [w,h] of [[568,320],[959,768],[1200,479],[960,768],[1024,1024],[1366,768],[1679,1050],[1680,1050],[1920,1080],[3840,2160]])
        assert.equal(resolveLayout(w,h), 'normal', `${w}x${h}`)
})
test('ultrawide requires both space and proportion', () => {
    assert.equal(resolveLayout(1440, 600), 'ultrawide')
    assert.equal(resolveLayout(1439, 600), 'normal')
    assert.equal(resolveLayout(2100, 1000), 'ultrawide')
    assert.equal(resolveLayout(2099.5, 1000), 'normal')
    assert.equal(resolveLayout(5120, 1440), 'ultrawide')
})
test('larger preferred text never makes a landscape window mobile', () => {
    assert.equal(resolveLayout(1366,768,24), 'normal')
    assert.equal(resolveLayout(1920,1080,24), 'normal')
})

test('landscape and square remain non-mobile at small sizes and large fonts', () => {
    for(const [w,h] of [[320,240],[568,320],[640,480],[800,800],[1440,400]])
        for(const font of [16,24,32]) assert.notEqual(resolveLayout(w,h,font), 'mobile')
})
